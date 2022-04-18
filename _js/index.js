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
/* Barra de Pesquisa */
let barraPesquisaAbertura = 0;
    function barraPesquisa() {
        if (barraPesquisaAbertura === 0) {
            document.getElementById("barrapesquisa").src="_imagens/barra_pesquisa.png";
            document.getElementById("barrapesquisa").style.left="77.2vw";
            barraPesquisaAbertura = 1;
        }
        else {
            document.getElementById("barrapesquisa").src="_imagens/icone_pesquisa.png";
            document.getElementById("barrapesquisa").style.left="93vw";
            barraPesquisaAbertura = 0;  
        }
    }
/* Hover */
    function menuHoverIn(barra) {  
        document.getElementById(barra).style.color = "#FFFFFF";
    } 
    function menuHoverOut(barra) {
        document.getElementById(barra).style.color = "#EEEEEE";
    }