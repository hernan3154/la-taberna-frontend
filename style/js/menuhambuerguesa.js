function toggleMenu(){
    var menu = document.getElementById('menu-bar');
    menu.classList.toggle('menu-visible');
    menu.classList.toggle('menu-hidden')
}


// funcion para abrir y cerrar el menu  hamburguesa
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}
