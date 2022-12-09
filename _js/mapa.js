var telaLargura = window.innerWidth;
const html = document.querySelector("html");
const mapa_Zoom = document.getElementById("mapa-zoom");
const botaoFechar = document.getElementById("mapa-botao-fechar");
const botaoFechar2 = document.getElementById("mapa-botao-fechar2");
const infoMarcador = document.getElementById("info-marcador");
const marcadorTitulo = document.getElementById("marcador-titulo");
const marcadorDivTitulo = document.getElementById("marcador-titulo-div");
function mapaZoom(tipo) {
    telaLargura = window.innerWidth;
    if (telaLargura <= 800) {
        if (tipo === "abrir") {
            html.classList.add("travamento-scroll");
            mapa_Zoom.style.opacity="1";
            mapa_Zoom.style.pointerEvents="fill";
            botaoFechar.style.top="0vh";
            botaoFechar2.style.right="-1vh";
        }
    }
    if (tipo !== "abrir") {
        html.classList.remove("travamento-scroll");
        mapa_Zoom.style.opacity="0";
        mapa_Zoom.style.pointerEvents="none";
        botaoFechar.style.top="-11.5vh";
        botaoFechar2.style.right="-24vh";
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
        infoMarcador.style.maxHeight="7500px";
    }
    else {
        infoMarcador.style.maxHeight="4000px";
    }
    marcadorTitulo.innerHTML=titulo;
    marcadorDivTitulo.style.padding="20px 0 24px 0";
    marcadorTitulo.style.letterSpacing="0.05vw";
    if (telaLargura <= 800) {
        marcadorTitulo.style.fontSize="27px";
    }
    else {
        marcadorTitulo.style.fontSize="40px";
    }
    setTimeout(opacidadeConteudo, 300);
    ultimaSecaoInfo = secao;
}