/* Função RESET */
var resetType = ["", "", ""];
var resetT = "";
function reset() {
    if (resetType === "PesquisaAbertura") {
        document.getElementById("botaohidepesquisa").style.transition="transform 0s";
        document.getElementById("barrapesquisa").style.transition="clip-path 0s";
        resetType = ["", ""];
    }
    else if (resetType === "BotaoPesquisa") {
        document.getElementById("botaopesquisa").style.top="0.3vw";
        document.getElementById("botaopesquisa").style.width="4.85vw";
        document.getElementById("botaopesquisa").style.height="4.1vw";
        resetT = "botaopesquisa";
        setTimeout(resetTransition, 200);
    }
    else if (resetType[0] === "BotaoMenu") {
        document.getElementById(resetType[1]).style.transform="translateY(0vw)";
        document.getElementById(resetType[2]).style.transform="translateY(0vw)";
    }
    else if (resetType[0] === "BotaoUltimosGuias") {
        document.getElementById(resetType[1]).style.top="5.8vw";
        document.getElementById(resetType[1]).style.height="32%";
        document.getElementById(resetType[1]).style.width="8%";
        document.getElementById(resetType[1]).style.right=resetType[2];
        resetT = resetType[1];
        setTimeout(resetTransition, 200);
    }
    resetType = ["", ""];
}
function resetTransition() {
    document.getElementById(resetT).style.transition="none";
}
/* Barra de Pesquisa */
let resultadoPesquisa = "";
let barraPesquisaAbertura = "fechada";
  function inputPesquisa(tipo) {
    if (tipo === "click") {
        document.getElementById("pesquisar").style.transition="opacity 0s";
        document.getElementById("pesquisar").style.opacity="0";
    }
    else {
      document.getElementById("input").style.display="block";
      document.getElementById("pesquisar").style.transition="opacity 0.3s";
      document.getElementById("pesquisar").style.opacity="1";
    }
  }
  function botaoPesquisa(tipo) {
    if (tipo === "hide_show") {
         if (barraPesquisaAbertura === "fechada") {
            document.getElementById("botaohidepesquisa").style.transition="transform 0.5s";
            document.getElementById("botaohidepesquisa").style.transform="translateX(-15vw)";
            document.getElementById("barrapesquisa").style.transition="clip-path 0.5s";
            document.getElementById("barrapesquisa").style.clipPath="inset(0vw 0vw 0vw 0vw)";
            setTimeout(inputPesquisa, 270);
            barraPesquisaAbertura = "aberta";
         }
         else {
            document.getElementById("botaohidepesquisa").style.transition="transform 0.5s";
            document.getElementById("botaohidepesquisa").style.transform="translateX(0vw)";
            document.getElementById("barrapesquisa").style.transition="clip-path 0.5s";
            document.getElementById("barrapesquisa").style.clipPath="inset(0vw 0vw 0vw 15.5vw)";
            document.getElementById("input").style.display="none";
            document.getElementById("pesquisar").style.opacity="0";
            document.getElementById("pesquisar").style.transition="opacity 0s";
            document.getElementById("input").value="";
            barraPesquisaAbertura = "fechada"; 
         }
         resetType = "PesquisaAbertura";
         setTimeout(reset, 500); 
    }
    else if (barraPesquisaAbertura === "aberta") {
        if (tipo === "pesquisar") {
            document.getElementById("botaopesquisa").style.transition="top 0.08s, width 0.08s, height 0.08s";
            document.getElementById("botaopesquisa").style.top="0.4vw";
            document.getElementById("botaopesquisa").style.width="4.48vw";
            document.getElementById("botaopesquisa").style.height="3.9vw";
            resetType = "BotaoPesquisa";
            resultadoPesquisa = document.getElementById("input").value; 
            setTimeout(reset, 200);
        }
        if (tipo === "hoverON") {
            document.getElementById("botaopesquisa").style.filter="brightness(82%)";
        }
        if (tipo === "hoverOFF") {
            document.getElementById("botaopesquisa").style.filter="brightness(100%)";
        }
    }        
  }
/* Barra de Navegação */
/* Botões Menu */
function homeBotao() {
    document.getElementById("barra1").style.transition="transform 0.08s";
    document.getElementById("barra1").style.transform="translateY(0.15vw)";
    document.getElementById("home").style.transition="transform 0.08s";
    document.getElementById("home").style.transform="translateY(0.15vw)";
    resetType = ["BotaoMenu", "barra1", "home"];
    setTimeout(reset, 200);
    window.location.href="index.html";
}
function trocasBotao() {
    document.getElementById("barra2").style.transition="transform 0.08s";
    document.getElementById("barra2").style.transform="translateY(0.15vw)";
    document.getElementById("trocas").style.transition="transform 0.08s";
    document.getElementById("trocas").style.transform="translateY(0.15vw)";
    resetType = ["BotaoMenu", "barra2", "trocas"];
    setTimeout(reset, 200);
    window.location.href="https://www.google.com";
}
function diversosBotao() {
    document.getElementById("barra3").style.transition="transform 0.08s";
    document.getElementById("barra3").style.transform="translateY(0.15vw)";
    document.getElementById("diversos").style.transition="transform 0.08s";
    document.getElementById("diversos").style.transform="translateY(0.15vw)";
    resetType = ["BotaoMenu", "barra3", "diversos"];
    setTimeout(reset, 200);
    window.location.href="https://www.google.com";
}
function maisTutoriais_GuiasBotao() {
    document.getElementById("barra4").style.transition="transform 0.08s";
    document.getElementById("barra4").style.transform="translateY(0.15vw)";
    document.getElementById("mais").style.transition="transform 0.08s";
    document.getElementById("mais").style.transform="translateY(0.15vw)";
    resetType = ["BotaoMenu", "barra4", "mais"];
    setTimeout(reset, 200);
    window.location.href="https://www.google.com";
}
/* Hover Botões Menu */
    function menuHoverIn(barra) {  
        document.getElementById(barra).style.color = "#FFFFFF";
        if (barra === "mais") {
            menuSubMenu("on");
        }
    } 
    function menuHoverOut(barra) {
        document.getElementById(barra).style.color = "#EEEEEE";
        if (barra === "mais") {
            menuSubMenu("off");
        }
    }
/* Sub Menus */
let mostrar = "";
function menuSubMenu(mostrar) {
  if (mostrar === "on") {
    document.getElementById("submenu").style.display="block";
    document.getElementById("barra4").style.filter="brightness(125%)";
  }
  if (mostrar === "off") {
     document.getElementById("submenu").style.display="none";
     document.getElementById("barra4").style.filter="brightness(100%)";
  }
}
function hoverSubMenu(submenu) {
    document.getElementById(submenu).style.color="#FFFFFF";
}
function hoverSubMenuOff(submenu) {
    document.getElementById(submenu).style.color="#DDDDDD";
}


/* Ultimos Guias - Botoes */
function botaoUltimosGuias(botao, direcao, direcao2) {
    document.getElementById(botao).style.transition="top 0.08s, height 0.08s, width 0.08s,  right 0.08s";
    document.getElementById(botao).style.top="6.2vw";
    document.getElementById(botao).style.height="29%";
    document.getElementById(botao).style.width="7%";
    document.getElementById(botao).style.right=direcao;
    resetType = ["BotaoUltimosGuias", botao, direcao2];
    setTimeout(reset, 200);
}


