function showNav(el){
  if(document.querySelector("#desktop-nav").classList.contains("open")){
    document.querySelector("#desktop-nav").classList.remove("open")
    el.classList.remove("open")
    document.getElementById("mobile-menu-trigger").ariaExpanded = "false"
  }else{
    document.querySelector("#desktop-nav").classList.add("open")
    el.classList.add("open")
    document.getElementById("mobile-menu-trigger").ariaExpanded = "true"
  }
}