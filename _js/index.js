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
    function botaoPesquisa(tipo) {
        if (tipo === "hide_show") {
            if (barraPesquisaAbertura === 0) {
                document.getElementById("botaohidepesquisa").style.left="77.8vw";
                document.getElementById("barrapesquisa").style.clipPath="inset(0vw 0vw 0vw 0vw)";
                barraPesquisaAbertura = 1;
            }
            else {
                document.getElementById("botaohidepesquisa").style.left="92.8vw";
                document.getElementById("barrapesquisa").style.clipPath="inset(0vw 0vw 0vw 15.5vw)";
                barraPesquisaAbertura = 0;  
            } 
        }
        
    }
/* Hover */
    function menuHoverIn(barra) {  
        document.getElementById(barra).style.color = "#FFFFFF";
    } 
    function menuHoverOut(barra) {
        document.getElementById(barra).style.color = "#EEEEEE";
    }