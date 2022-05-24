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
    document.getElementById("botao-lateral-fechar").style.transform = "translateX(0vw)";
    document.getElementById("botao-menu-mobile").style.transition="top 0.08s, width 0.08s, height 0.08s, filter 0.08s, transform 0.08s";
    document.getElementById("botao-menu-mobile").style.top="2%";
    document.getElementById("botao-menu-mobile").style.transform="translateX(3%)";
    document.getElementById("botao-menu-mobile").style.width="15.6vw";
    document.getElementById("botao-menu-mobile").style.height="9.6vw";
    document.getElementById("botao-menu-mobile").style.filter="brightness(70%)";
    resetType = "BotaoMenuMobile";
    setTimeout(reset, 200);
    document.getElementById("menu-lateral").style.width = "65vw";
    document.getElementById("corpo").style.filter = "brightness(45%)";
    document.getElementById("corpo").style.pointerEvents = "none";
    document.getElementById("banner").style.filter = "brightness(45%)";
    document.getElementById("banner").style.pointerEvents = "none";
    document.getElementById("funcao-pesquisa-mobile-mais-menu").style.filter = "brightness(45%)";
    document.getElementById("funcao-pesquisa-mobile-mais-menu").style.pointerEvents = "none";
  }
function fecharMenuLateral() {
    document.getElementById("botao-lateral-fechar").style.transform = "translateX(-45vw)";
    document.getElementById("menu-lateral").style.width = "0";
    document.getElementById("corpo").style.filter = "brightness(100%)";
    document.getElementById("corpo").style.pointerEvents = "";
    document.getElementById("banner").style.filter = "brightness(100%)";
    document.getElementById("banner").style.pointerEvents = "";
    document.getElementById("funcao-pesquisa-mobile-mais-menu").style.filter = "brightness(100%)";
    document.getElementById("funcao-pesquisa-mobile-mais-menu").style.pointerEvents = "";
}
/* Menu Mobile */
/* Fixagem Menu Topo */
const barraMobile = document.getElementById("funcao-pesquisa-mobile-mais-menu");
var pontoFixo = barraMobile.offsetTop;
window.onscroll = function() {checkRolagemMenu()};
function checkRolagemMenu() {
    let resolucaoLargura = window.innerWidth;
    if (window.pageYOffset >= pontoFixo) {
      barraMobile.classList.add("barra-fixa");
      if (resolucaoLargura <= 800) {
        document.getElementById("corpo").style.paddingTop="17%";
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
var resolucaoL = window.innerWidth;
function botaoUltimosGuias(botao) {
    if (resolucaoL > 800) {
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
    }
    else if (resolucaoL <= 800) {
        if (botao === "botao-direita") {
            if (posicaoShowcase < 4) { /* <--- Novo Guia? Adicione AQUI */
                posicaoShowcase = posicaoShowcase + 1;
                showcaseElemento.style.transform = 'translateX(' + (-posicaoShowcase * 100) + '%)';
                clearInterval(loopShowCase);
                loopShowCase = setInterval(showCase, 4000);
            } 
        }
        else if (botao === "botao-esquerda") {
            if (posicaoShowcase !== 0) {
                posicaoShowcase = posicaoShowcase - 1;
                showcaseElemento.style.transform = 'translateX(' + (-posicaoShowcase * 100) + '%)';
                clearInterval(loopShowCase);
                loopShowCase = setInterval(showCase, 4000);
            } 
        }
    }
}
/* Ultimos Guias - Showcase */
const showcaseElemento = document.getElementById("showcase");
const guias = document.querySelectorAll("#showcase img");
var posicaoShowcase = 0;
function showCase() {
    posicaoShowcase++;
    if (resolucaoL > 800) {
        if (posicaoShowcase > guias.length - 3) {
            posicaoShowcase = 0;        
        }
        showcaseElemento.style.transform = 'translateX(' + (-posicaoShowcase * 33.5) + '%)'; 
    }
    else if (resolucaoL <= 800) {
        if (posicaoShowcase > guias.length - 1) {
            posicaoShowcase = 0;        
        }
        showcaseElemento.style.transform = 'translateX(' + (-posicaoShowcase * 100) + '%)'; 
    }
}
var loopShowCase = setInterval(showCase, 4000);
/* Acesso Rapido */
function acessoRapidoHover(tipo, elemento) {
    if (tipo === "on") {
        document.getElementById("displayinfo").style.color="#00DD00";
        document.getElementById("displayinfo").style.top="8%"
        if (elemento === "dinheiro") {
            document.getElementById("displayinfo").innerHTML = "Fique rico e cause inveja<br class='modo-mobile'> até mesmo nos Kain!";
        }
        if (elemento === "podinzin") {
            document.getElementById("displayinfo").innerHTML = "Consiga todos os pozinzins<br class='modo-mobile'> escondidos e salve vidas!";
        }
        if (elemento === "mapa") {
            if (resolucaoL <= 800) {
                document.getElementById("displayinfo").style.top="28%";
            }
            document.getElementById("displayinfo").innerHTML = "Descubra todos os segredos da Estepe!";
        }
        if (elemento === "comida") {
            if (resolucaoL <= 800) {
                document.getElementById("displayinfo").style.top="28%";
            }
            document.getElementById("displayinfo").innerHTML = "Nunca mais passe fome!";
        }
        if (elemento === "pocoes") {
            document.getElementById("displayinfo").innerHTML = "Aprenda TUDO sobre a criação<br class='modo-mobile'> de Infusões e 'Poções'!";
        }
        if (elemento === "combate") {
            if (resolucaoL <= 800) {
                document.getElementById("displayinfo").style.top="28%";
            }
            document.getElementById("displayinfo").innerHTML = "Deixe de ser a caça e vire o caçador!";
        }
    }
    else {
        if (resolucaoL >= 800) {
        document.getElementById("displayinfo").innerHTML = "";
        document.getElementById("displayinfo").style.color="#FFFFFF";
        }
    }
}
var acessoRapidoReset = ["", ""];
function acessoRapidoMobile(elemento, link) {
    if (elemento !== "link") {
        if (elemento === acessoRapidoReset[0]) {
            return;
        }
        document.getElementById(elemento).style.transform="scale(108%)";
        document.getElementById(elemento).style.filter="brightness(120%)";
        if (acessoRapidoReset[0] !== "") {
            document.getElementById(acessoRapidoReset[0]).style.transform="scale(100%)";
            document.getElementById(acessoRapidoReset[0]).style.filter="brightness(70%)";
        }
        acessoRapidoReset[0] = elemento;
        acessoRapidoReset[1] = link;
    }
    else {
        /* link */
    }
}
function botaoTipo1(elemento, elemento2, elemento3, elemento4) {
    function botaoTipo1Off() {
        document.getElementById(elemento).classList.remove("botao1");
        document.getElementById(elemento2).classList.remove("botao1");
        if (elemento3 !== undefined) {
            document.getElementById(elemento3).classList.remove("botao1");
            if (elemento4 !== undefined) {
                document.getElementById(elemento4).classList.remove("botao1");
            }
        }
    }
    document.getElementById(elemento).classList.add("botao1");
    document.getElementById(elemento2).classList.add("botao1");
    if (elemento3 !== undefined) {
        document.getElementById(elemento3).classList.add("botao1");
        if (elemento4 !== undefined) {
            document.getElementById(elemento4).classList.add("botao1");
        }
    }
    setTimeout(botaoTipo1Off, 220);
}
function botaoTipo1ComBrilho(elemento, elemento2, elemento3, elemento4) {
    function botaoTipo1ComBrilhoOff() {
        document.getElementById(elemento).classList.remove("botao1-com-brilho");
        document.getElementById(elemento2).classList.remove("botao1-com-brilho");
        if (elemento3 !== undefined) {
            document.getElementById(elemento3).classList.remove("botao1-com-brilho");
            if (elemento4 !== undefined) {
                document.getElementById(elemento4).classList.remove("botao1-com-brilho");
            }
        }
    }
    document.getElementById(elemento).classList.add("botao1-com-brilho");
    document.getElementById(elemento2).classList.add("botao1-com-brilho");
    if (elemento3 !== undefined) {
        document.getElementById(elemento3).classList.add("botao1-com-brilho");
        if (elemento4 !== undefined) {
            document.getElementById(elemento4).classList.add("botao1-com-brilho");
        }
    }
    setTimeout(botaoTipo1ComBrilhoOff, 220);
}
function botaoTipo2(elemento, elemento2) {
    function botaoTipo2Off() {
        document.getElementById(elemento).classList.remove("botao2");
        if (elemento2 !== undefined) {
            document.getElementById(elemento2).classList.remove("botao2");
        }
    }
    document.getElementById(elemento).classList.add("botao2");
    if (elemento2 !== undefined) {
        document.getElementById(elemento2).classList.add("botao2");
    }
    setTimeout(botaoTipo2Off, 220);
}
function botaoTipo2ComBrilho(elemento, elemento2) {
    function botaoTipo2ComBrilhoOff() {
        document.getElementById(elemento).classList.remove("botao2-com-brilho");
        if (elemento2 !== undefined) {
            document.getElementById(elemento2).classList.remove("botao2-com-brilho");
        }
    }
    document.getElementById(elemento).classList.add("botao2-com-brilho");
    if (elemento2 !== undefined) {
        document.getElementById(elemento2).classList.add("botao2-com-brilho");
    }
    setTimeout(botaoTipo2ComBrilhoOff, 220);
}
var rotacao = 0;
function rotacao90(elemento, elemento2) {
    if (rotacao === 0) {
        document.getElementById(elemento).classList.add("rotacao90direita");
        document.getElementById(elemento2).classList.add("rotacao90esquerda");
        document.getElementById(elemento).classList.remove("rotacao90direitavolta");
        document.getElementById(elemento2).classList.remove("rotacao90esquerdavolta");
        document.getElementById("sub-menu-lateral").style.top="67.5vw";
        rotacao = 1;
    }
    else if (rotacao === 1) {
        document.getElementById(elemento).classList.add("rotacao90direitavolta");
        document.getElementById(elemento2).classList.add("rotacao90esquerdavolta");
        document.getElementById(elemento).classList.remove("rotacao90direita");
        document.getElementById(elemento2).classList.remove("rotacao90esquerda");
        document.getElementById("sub-menu-lateral").style.top="16vw";
        rotacao = 0;
    }
}