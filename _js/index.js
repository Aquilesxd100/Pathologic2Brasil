/* Função RESET */
var resetType = ["", "", ""];
var resetT = "";
function reset() {
    if (resetType === "BotaoPesquisa") {
        document.getElementById("botaopesquisa").style.top="0.3vw";
        document.getElementById("botaopesquisa").style.width="4.85vw";
        document.getElementById("botaopesquisa").style.height="4.1vw";
        resetT = "botaopesquisa";
        setTimeout(resetTransition, 200);
    }
    else if (resetType === "BotaoPesquisaMobile") {
        document.getElementById("botaopesquisamobile").style.top="3vw";
        document.getElementById("botaopesquisamobile").style.width="12vw";
        document.getElementById("botaopesquisamobile").style.height="11vw";
        document.getElementById("botaopesquisamobile").style.filter="brightness(100%)";
        resetT = "botaopesquisamobile";
        setTimeout(resetTransition, 200);
    }
    else if (resetType === "BotaoMenuMobile") {
        document.getElementById("botao-menu-mobile").style.top="0%";
        document.getElementById("botao-menu-mobile").style.width="17vw";
        document.getElementById("botao-menu-mobile").style.height="10.5vw";
        document.getElementById("botao-menu-mobile").style.transform="translateX(0%)";
        document.getElementById("botao-menu-mobile").style.filter="brightness(100%)";
        resetT = "botao-menu-mobile";
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
var resultadoPesquisa = "";
  function inputPesquisa(tipo) {
    if (tipo === "click") {
        document.getElementById("pesquisar").style.transition="opacity 0s";
        document.getElementById("pesquisar").style.opacity="0";
    }
    else if (tipo === "clickmobile") {
        document.getElementById("pesquisar-mobile").style.opacity="0";
    }
    else {
      document.getElementById("input").style.display="block";
      document.getElementById("pesquisar").style.transition="opacity 0.3s";
      document.getElementById("pesquisar").style.opacity="1";
    }
  }
  function botaoPesquisa(tipo) {
            document.getElementById("botaopesquisa").style.transition="top 0.08s, width 0.08s, height 0.08s";
            document.getElementById("botaopesquisa").style.top="0.4vw";
            document.getElementById("botaopesquisa").style.width="4.48vw";
            document.getElementById("botaopesquisa").style.height="3.9vw";
            resetType = "BotaoPesquisa";
            resultadoPesquisa = document.getElementById("input").value; 
            setTimeout(reset, 160);
    }        
  function botaoPesquisaMobile() {
    document.getElementById("botaopesquisamobile").style.transition="top 0.08s, width 0.08s, height 0.08s, filter 0.08s";
    document.getElementById("botaopesquisamobile").style.top="3.3vw";
    document.getElementById("botaopesquisamobile").style.width="11vw";
    document.getElementById("botaopesquisamobile").style.height="10.1vw";
    document.getElementById("botaopesquisamobile").style.filter="brightness(70%)";
    resetType = "BotaoPesquisaMobile";
    resultadoPesquisa = document.getElementById("input").value; 
    setTimeout(reset, 200);
  }
/* Pesquisa Mobile - maxlength */
document.getElementById("input-mobile").addEventListener("input", checkMaxlenght);
function checkMaxlenght() {
    let caracteres = document.getElementById("input-mobile").value;
    let caracteresPesquisa = caracteres.length;
    if (caracteresPesquisa > 11) {
        caracteres = caracteres.substring(0, 11);
        document.getElementById("input-mobile").value=caracteres;
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
function videosBotao() {
    document.getElementById("barra3").style.transition="transform 0.08s";
    document.getElementById("barra3").style.transform="translateY(0.15vw)";
    document.getElementById("videos").style.transition="transform 0.08s";
    document.getElementById("videos").style.transform="translateY(0.15vw)";
    resetType = ["BotaoMenu", "barra3", "videos"];
    setTimeout(reset, 200);
    window.open("https://www.youtube.com/channel/UCk1Ax5j6moXGrPf13pV1e4g", '_blank').focus();
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
var mostrar = "";
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
/* Botão Menu Mobile */
function botaoMenuMobile() {
    document.getElementById("botao-menu-mobile").style.transition="top 0.08s, width 0.08s, height 0.08s, filter 0.08s, transform 0.08s";
    document.getElementById("botao-menu-mobile").style.top="2%";
    document.getElementById("botao-menu-mobile").style.transform="translateX(3%)";
    document.getElementById("botao-menu-mobile").style.width="15.6vw";
    document.getElementById("botao-menu-mobile").style.height="9.6vw";
    document.getElementById("botao-menu-mobile").style.filter="brightness(70%)";
    resetType = "BotaoMenuMobile";
    setTimeout(reset, 200);
    document.getElementById("menu-lateral").style.width = "323px";
  }
function fecharMenuLateral() {
    document.getElementById("menu-lateral").style.width = "0";
}
/* Menu Mobile */
/* Fixagem Menu Topo */
var barraMobile = document.getElementById("funcao-pesquisa-mobile-mais-menu");
var pontoFixo = barraMobile.offsetTop;
window.onscroll = function() {checkRolagemMenu()};
function checkRolagemMenu() {
let resolucaoLargura = window.innerWidth;
    if (window.pageYOffset >= pontoFixo) {
      barraMobile.classList.add("barra-fixa");
      if (resolucaoLargura <= 800) {
        document.getElementById("corpo").style.paddingTop="16.5%";
      }
    } 
    else {
      barraMobile.classList.remove("barra-fixa");
      if (resolucaoLargura <= 800) {
        document.getElementById("corpo").style.paddingTop="0%";
      }
    }
  }
/* Ultimos Guias - Botoes */
function botaoUltimosGuias(botao, direcao, direcao2) {
    document.getElementById(botao).style.transition="top 0.08s, height 0.08s, width 0.08s,  right 0.08s";
    document.getElementById(botao).style.top="6.2vw";
    document.getElementById(botao).style.height="29%";
    document.getElementById(botao).style.width="7%";
    document.getElementById(botao).style.right=direcao;
    resetType = ["BotaoUltimosGuias", botao, direcao2];
    if (botao === "botao-direita") {
        if (posicaoShowcase < 2) { /* <--- Novo Guia? Adicione AQUI */
            posicaoShowcase = posicaoShowcase + 1;
            showcaseElemento.style.transform = 'translateX(' + (-posicaoShowcase * 33.5) + '%)';
            clearInterval(loopShowCase);
            loopShowCase = setInterval(showCase, 4000);
        } 
    }
    else if (botao === "botao-esquerda") {
        if (posicaoShowcase !== 0) {
            posicaoShowcase = posicaoShowcase - 1;
            showcaseElemento.style.transform = 'translateX(' + (-posicaoShowcase * 33.5) + '%)';
            clearInterval(loopShowCase);
            loopShowCase = setInterval(showCase, 4000);
        } 
    }
    setTimeout(reset, 200);
}
/* Ultimos Guias - Showcase */
const showcaseElemento = document.getElementById("showcase");
const guias = document.querySelectorAll("#showcase img");
var posicaoShowcase = 0;
function showCase() {
    posicaoShowcase++;
    if (posicaoShowcase > guias.length - 3) { /* <--- Novo Guia? Adicione AQUI */
        posicaoShowcase = 0;        
    }
    showcaseElemento.style.transform = 'translateX(' + (-posicaoShowcase * 33.5) + '%)'; 
}
var loopShowCase = setInterval(showCase, 4000);
/* Acesso Rapido */
function acessoRapidoHover(tipo, elemento) {
    if (tipo === "on") {
        document.getElementById("displayinfo").style.color="#00DD00";
        if (elemento === "dinheiro") {
            document.getElementById("displayinfo").innerHTML = "Fique rico e cause inveja até mesmo nos Kain!";
        }
        if (elemento === "podinzin") {
            document.getElementById("displayinfo").innerHTML = "Consiga todos os pozinzins escondidos e salve vidas!";
        }
        if (elemento === "mapa") {
            document.getElementById("displayinfo").innerHTML = "Descubra todos os segredos da Estepe!";
        }
        if (elemento === "comida") {
            document.getElementById("displayinfo").innerHTML = "Nunca mais passe fome!";
        }
        if (elemento === "pocoes") {
            document.getElementById("displayinfo").innerHTML = "Aprenda TUDO sobre a criação de Infusões e 'Poções'!";
        }
        if (elemento === "combate") {
            document.getElementById("displayinfo").innerHTML = "Deixe de ser a caça e vire o caçador!";
        }
    }
    else {
        document.getElementById("displayinfo").innerHTML = "";
        document.getElementById("displayinfo").style.color="#FFFFFF";
    }
}
