/* Barra de Navegação */
/* Links */
function homeLink () {
    window.location.href="https://www.google.com/";
}
function trocasLink () {
    window.location.href="https://www.google.com/";
}
function diversosLink () {
    window.location.href="https://www.google.com/";
}
function maisTutoriais_GuiasLink () {
    window.location.href="https://www.google.com/";
}
/* Hover */
    document.getElementById("barra1").addEventListener('mouseenter', () => homeHoverX());
    document.getElementById("barra1").addEventListener('mouseleave', () => homeHoverN());
    function homeHoverX() {  
        document.getElementById("home").style.color = "#FFFFFF";
    } 
    function homeHoverN() {
        document.getElementById("home").style.color = "#DDDDDD";
    }