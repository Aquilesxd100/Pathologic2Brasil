let resetType = ["", ""];
function reset() {
    if (resetType === "PesquisaAbertura") {
        document.getElementById("botaohidepesquisa").style.transition="transform 0s";
        document.getElementById("barrapesquisa").style.transition="clip-path 0s";
        resetType = ["", ""];
    }
    else if (resetType === "BotaoMenu") {
        if (resetType === "BotaoMenu", "Botao1") {
            document.getElementById("barra1").style.transform="translateY(0vw)";
            document.getElementById("home").style.transform="translateY(0vw)";
        }
        if (resetType === "BotaoMenu", "Botao2") {
            document.getElementById("barra2").style.transform="translateY(0vw)";
            document.getElementById("trocas").style.transform="translateY(0vw)";
        }
        if (resetType === "BotaoMenu", "Botao3") {
            document.getElementById("barra3").style.transform="translateY(0vw)";
            document.getElementById("diversos").style.transform="translateY(0vw)";
        }
        if (resetType === "BotaoMenu", "Botao4") {
            document.getElementById("barra4").style.transform="translateY(0vw)";
            document.getElementById("mais").style.transform="translateY(0vw)";
        }
    }
    resetType = ["", ""];
}
/* Barra de Navegação */
/* Links */
function homeBotao() {
    document.getElementById("barra1").style.transition="transform 0.08s";
    document.getElementById("barra1").style.transform="translateY(0.15vw)";
    document.getElementById("home").style.transition="transform 0.08s";
    document.getElementById("home").style.transform="translateY(0.15vw)";
    resetType = "BotaoMenu", "Botao1";
    setTimeout(reset, 200);
    window.location.href="index.html";
}
function trocasBotao() {
    document.getElementById("barra2").style.transition="transform 0.08s";
    document.getElementById("barra2").style.transform="translateY(0.15vw)";
    document.getElementById("trocas").style.transition="transform 0.08s";
    document.getElementById("trocas").style.transform="translateY(0.15vw)";
    resetType = "BotaoMenu", "Botao2";
    setTimeout(reset, 200);
    window.location.href="https://www.google.com";
}
function diversosBotao() {
    document.getElementById("barra3").style.transition="transform 0.08s";
    document.getElementById("barra3").style.transform="translateY(0.15vw)";
    document.getElementById("diversos").style.transition="transform 0.08s";
    document.getElementById("diversos").style.transform="translateY(0.15vw)";
    resetType = "BotaoMenu", "Botao3";
    setTimeout(reset, 200);
    window.location.href="https://www.google.com";
}
function maisTutoriais_GuiasBotao() {
    document.getElementById("barra4").style.transition="transform 0.08s";
    document.getElementById("barra4").style.transform="translateY(0.15vw)";
    document.getElementById("mais").style.transition="transform 0.08s";
    document.getElementById("mais").style.transform="translateY(0.15vw)";
    resetType = "BotaoMenu", "Botao4";
    setTimeout(reset, 200);
    window.location.href="https://www.google.com";
}
/* Barra de Pesquisa */
let barraPesquisaAbertura = "fechada";
    function botaoPesquisa(tipo) {
        if (tipo === "hide_show") {
            if (barraPesquisaAbertura === "fechada") {
                document.getElementById("botaohidepesquisa").style.transition="transform 0.5s";
                document.getElementById("botaohidepesquisa").style.transform="translateX(-15vw)";
                document.getElementById("barrapesquisa").style.transition="clip-path 0.5s";
                document.getElementById("barrapesquisa").style.clipPath="inset(0vw 0vw 0vw 0vw)";
                barraPesquisaAbertura = "aberta";
            }
            else {
                document.getElementById("botaohidepesquisa").style.transition="transform 0.5s";
                document.getElementById("botaohidepesquisa").style.transform="translateX(0vw)";
                document.getElementById("barrapesquisa").style.transition="clip-path 0.5s";
                document.getElementById("barrapesquisa").style.clipPath="inset(0vw 0vw 0vw 15.5vw)";
                barraPesquisaAbertura = "fechada";  
            }
            resetType = "PesquisaAbertura";
            setTimeout(reset, 500); 
        }
        
    }
/* Hover */
    function menuHoverIn(barra) {  
        document.getElementById(barra).style.color = "#FFFFFF";
    } 
    function menuHoverOut(barra) {
        document.getElementById(barra).style.color = "#EEEEEE";
    }