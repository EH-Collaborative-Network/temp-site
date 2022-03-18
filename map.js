let el = "interactive-map"


let roboto;
let theta = 0;
let speed = .002;
let baseDiameter = 5;
let pulseAmplitude = 16;
let locations = [
	["Al Quds Bard, Palestine", 403, 162],
	["American University of Central Asia, Kyrgyzstan", 301.6666564941406, 131],
	["Arizona State University, USA", 814, 154],
	["Bard College Annandale, USA", 706, 134],
	["Bard College Berlin, Germany", 463.6666564941406, 104],
	["Birkbeck College at the University of London, UK", 500.6666564941406, 107],
	["Central European University, Hungary/Austria", 463, 113],
	["European Humanities University, Lithuania", 437.6666564941406, 103],
	["Hampton University, USA", 713, 145],
	["Recovering Voices, Smithsonian Institution, USA", 711.6666564941406, 139],
	["Universidad de Los Andes, Colombia", 704, 237],
	["University of Thessaly, Greece", 473,140]
]
let sensitivityZoom = 0
p5.prototype.orbitControl = function(sensitivityX, sensitivityY) {
    this._assert3d('orbitControl');
    p5._validateParameters('orbitControl', arguments);

    const mouseInCanvas =
        this.mouseX < this.width &&
        this.mouseX > 0 &&
        this.mouseY < this.height &&
        this.mouseY > 0;
    if (!mouseInCanvas) return;

    const cam = this._renderer._curCamera;

    if (typeof sensitivityX === 'undefined') {
        sensitivityX = 1;
    }
    if (typeof sensitivityY === 'undefined') {
        sensitivityY = sensitivityX;
    }


    if (this.contextMenuDisabled !== true) {
        this.canvas.oncontextmenu = () => false;
        this._setProperty('contextMenuDisabled', true);
    }

    if (this.wheelDefaultDisabled !== true) {
        this.canvas.onwheel = () => false;
        this._setProperty('wheelDefaultDisabled', true);
    }

    const scaleFactor = this.height < this.width ? this.height : this.width;

    if (this._mouseWheelDeltaY !== this._pmouseWheelDeltaY) {
        if (this._mouseWheelDeltaY > 0) {
            this._renderer._curCamera._orbit(0, 0, sensitivityZoom * scaleFactor);
        } else {
            this._renderer._curCamera._orbit(0, 0, -sensitivityZoom * scaleFactor);
        }
    }

    if (this.mouseIsPressed) {
        if (this.mouseButton === this.LEFT) {
            const deltaTheta = -sensitivityX * (this.mouseX - this.pmouseX) / scaleFactor;
            const deltaPhi =
                sensitivityY * (this.mouseY - this.pmouseY) / scaleFactor;
            this._renderer._curCamera._orbit(deltaTheta, deltaPhi, 0);
        } else if (this.mouseButton === this.RIGHT) {
            const local = cam._getLocalAxes();

            const xmag = Math.sqrt(local.x[0] * local.x[0] + local.x[2] * local.x[2]);
            if (xmag !== 0) {
                local.x[0] /= xmag;
                local.x[2] /= xmag;
            }

            const ymag = Math.sqrt(local.y[0] * local.y[0] + local.y[2] * local.y[2]);
            if (ymag !== 0) {
                local.y[0] /= ymag;
                local.y[2] /= ymag;
            }

            const dx = -1 * sensitivityX * (this.mouseX - this.pmouseX);
            const dz = -1 * sensitivityY * (this.mouseY - this.pmouseY);

            cam.setPosition(
                cam.eyeX + dx * local.x[0] + dz * local.z[0],
                cam.eyeY,
                cam.eyeZ + dx * local.x[2] + dz * local.z[2]
            );
        }
    }
    return this;
};
let img;
let star;
let positions = [];
let graphics;

function setup() {
	let c;
    if(window.innerWidth <= 768){
     c = createCanvas((window.innerWidth / 100 * 100 - 20), (window.innerHeight / 100 * 72), WEBGL); 
    }else{
     c = createCanvas((window.innerWidth / 100 * 82 - 100), (window.innerHeight / 100 * 72), WEBGL); 
    }
    c.parent(el)
    camera(0, 0, 200 + sin(frameCount * 0.01) * 5, 0, 0, 0, 0, 1, 0);
    graphics = createGraphics(1000, 500);

}

function preload() {
    roboto = loadFont("fonts/WOFF/SharpSansDispNo1-Medium.woff")
    img = loadImage('assets/darkblue2.png');

}
let x = locations[0][1];
let y = locations[0][2];
let count = 1;
let pts = [

]


function draw() {
    background(0);
    let diam = baseDiameter + sin(theta * 4) * pulseAmplitude;
    graphics.image(img, 0, 0, 1000, 500);
    graphics.fill(0, 130, 151, 200)
    graphics.noStroke()
    for (let i = 0; i < locations.length; i++) {
        graphics.ellipse(locations[i][1], locations[i][2], diam, diam)
    }

    if(count < locations.length){
	   if (frameCount % 2 == 0) {
	   	    let d = dist(locations[count][1], locations[count][2], locations[count-1][1], locations[count-1][2])
	   	    let rateX = Math.abs(locations[count][1] - locations[count-1][1])/d
	   	    let rateY = Math.abs(locations[count][2] - locations[count-1][2])/d
		   	if(dist(x,y,locations[count][1], locations[count][2]) < 5){
		   		count = count + 1;
		   	}else{
		        if (x > locations[count][1]) {
		            x = x - rateX;
		        }
		        if (y > locations[count][2]) {
		            y = y - rateY;
		        }
		        if (x < locations[count][1]) {
		            x = x + rateX;
		        }
		        if (y < locations[count][2]) {
		            y = y + rateY;
		        }
		        pts.push([x,y])
	        }
	    }
	}
 	for (let i = 0; i < pts.length; i++) {
        graphics.ellipse(pts[i][0], pts[i][1], 1, 1)
    }
    noStroke();
    texture(graphics);

    orbitControl();


    push()
    rotateY(millis() / 10000);
    rotateZ(millis() / 15000);

    sphere(200);
    fill(255)
    strokeWeight(2)
    stroke("#008297") 

    pop()

    fill(255)
    theta += speed;

}

function windowResized() {
	if(window.innerWidth <= 768){
  		resizeCanvas((window.innerWidth / 100 * 100 - 20), (window.innerHeight / 100 * 72));
  		    camera(0, 0, 200 + sin(frameCount * 0.01) * 5, 0, 0, 0, 0, 1, 0);

	}else{
  		resizeCanvas((window.innerWidth / 100 * 82 - 100), (window.innerHeight / 100 * 72));
  		    camera(0, 0, 200 + sin(frameCount * 0.01) * 5, 0, 0, 0, 0, 1, 0);

	}
}
