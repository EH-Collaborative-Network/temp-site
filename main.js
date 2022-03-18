function showNav(){
  if(document.querySelector("nav").classList.contains("open")){
    document.querySelector("nav").classList.remove("open")
  }else{
    document.querySelector("nav").classList.add("open")
  }
}