function handleResize(){
    var canv = document.getElementById("canv");
    var mn = Math.min(window.innerWidth, window.innerHeight);
    canv.width = mn;
    canv.height = mn;
}
