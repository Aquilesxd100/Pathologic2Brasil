var telaLargura = window.innerWidth;
function mapaZoom(tipo) {
    let telaOrientacao = window.orientation;
    telaLargura = window.innerWidth;
    if (telaLargura <= 800) {
        if (tipo === "abrir") {
            document.getElementById("body").classList.add("travamento-scroll");
            document.getElementById("mapa-zoom").style.opacity="1";
            document.getElementById("mapa-zoom").style.pointerEvents="fill";
            document.getElementById("mapa-botao-fechar").style.top="0vh";
            document.getElementById("mapa-botao-fechar2").style.right="-1vh";
        }
    }
    if (tipo !== "abrir") {
        document.getElementById("body").classList.remove("travamento-scroll");
        document.getElementById("mapa-zoom").style.opacity="0";
        document.getElementById("mapa-zoom").style.pointerEvents="none";
        document.getElementById("mapa-botao-fechar").style.top="-11.5vh";
        document.getElementById("mapa-botao-fechar2").style.right="-24vh";
    }
}
var ultimaSecaoInfo = "";
function secaoInfos(secao, titulo) {
    telaLargura = window.innerWidth;
    function opacidadeConteudo() {
        document.getElementById(secao).style.opacity="1";
    }
    if (ultimaSecaoInfo !== "" && ultimaSecaoInfo !== secao) {
        document.getElementById(ultimaSecaoInfo).style.opacity="0";
        document.getElementById(ultimaSecaoInfo).style.display="none";
    }
    document.getElementById(secao).style.display="flex";
    if (secao === "depositos-secretos" && telaLargura <= 800) {
        document.getElementById("info-marcador").style.maxHeight="7500px";
    }
    else {
        document.getElementById("info-marcador").style.maxHeight="4000px";
    }
    document.getElementById("marcador-titulo").innerHTML=titulo;
    document.getElementById("marcador-titulo-div").style.padding="20px 0 24px 0";
    document.getElementById("marcador-titulo").style.letterSpacing="0.05vw";
    if (telaLargura <= 800) {
        document.getElementById("marcador-titulo").style.fontSize="27px";
    }
    else {
        document.getElementById("marcador-titulo").style.fontSize="40px";
    }
    setTimeout(opacidadeConteudo, 300);
    ultimaSecaoInfo = secao;
}