let el = "interactive-map"


let roboto;
let theta = 0;
let speed = .002;
let baseDiameter = 5;
let pulseAmplitude = 16;
let locations = {
  "Al Quds Bard, Palestine": [],
  "American University of Central Asia, Kyrgyzstan": [],
  "Arizona State University, USA": [],
  "Bard College Annandale, USA": [],
  "Bard College Berlin, Germany": [],
  "Birkbeck College at the University of London, UK": [],
  "Central European University, Hungary/Austria": [],
  "European Humanities University, Lithuania": [],
  "Hampton University, USA": [],
  "Recovering Voices, Smithsonian Institution, USA": [],
  "Universidad de Los Andes, Colombia": [],
  "University of Thessaly, Greece": [],
}
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

    let c = createCanvas((window.innerWidth / 100 * 82 - 100), (window.innerHeight / 100 * 72), WEBGL); 
    c.parent(el)
    camera(0, 0, 200 + sin(frameCount * 0.01) * 5, 0, 0, 0, 0, 1, 0);
    graphics = createGraphics(1000, 500);

}

function preload() {
    roboto = loadFont("fonts/WOFF/SharpSansDispNo1-Medium.woff")
    img = loadImage('assets/darkblue2.png');

}
let x = 700;
let y = 126;
let x1 = 700;
let y1 = 126;
let pairs = [
    [700, 126]
]
let pairs1 = [
    [700, 126]
]

function draw() {
    background(0);
    let diam = baseDiameter + sin(theta * 4) * pulseAmplitude;
    graphics.image(img, 0, 0, 1000, 500);
    graphics.fill(0, 130, 151, 200)
    graphics.noStroke()
    graphics.ellipse(700, 126, diam, diam)
    graphics.ellipse(488, 112, diam, diam)
    graphics.ellipse(399, 160, diam, diam)
    for (let i = 0; i < pairs.length; i++) {
        graphics.ellipse(pairs[i][0], pairs[i][1], 1, 1)
    }
    for (let i = 0; i < pairs1.length; i++) {
        graphics.ellipse(pairs1[i][0], pairs1[i][1], 1, 1)
    }
    if (frameCount % 2 == 0) {
        if (x > 488 || y > 112) {
            pairs.push([x, y])
        }
        if (x > 488) {
            x = x - 1;
        }
        if (y > 112) {
            y = y - 1;
        }
    }

    if (frameCount % 2 == 0) {
        if (x1 > 399 || y1 < 160) {
            pairs1.push([x1, y1])
        }
        if (x1 > 399) {
            x1 = x1 - 1;
        }
        if (y1 < 160) {
            y1 = y1 + 1;
        }

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
  resizeCanvas((window.innerWidth / 100 * 82 - 100), (window.innerHeight / 100 * 72));
}
