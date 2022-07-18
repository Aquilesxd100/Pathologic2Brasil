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