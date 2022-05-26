/* Abertura de Link */
function abrirLink(link) {
   window.location.href=link;
}
function abrirLinkFora(link) {
    window.open(link, '_blank').focus();
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
    function botaoPesquisa() {
        function botaoPesquisaOff() {
            document.getElementById("botaopesquisa").classList.remove("botao2-pesquisa");
        }
        document.getElementById("botaopesquisa").classList.add("botao2-pesquisa");
        setTimeout(botaoPesquisaOff, 300);
            resultadoPesquisa = document.getElementById("input").value; 
    }        
  function botaoPesquisaMobile() {
    function botaoPesquisaMobileOff() {
        document.getElementById("botaopesquisamobile").classList.remove("botao2-pesquisa-mobile");
    }
    document.getElementById("botaopesquisamobile").classList.add("botao2-pesquisa-mobile");
    setTimeout(botaoPesquisaMobileOff, 380);
    resultadoPesquisa = document.getElementById("input").value; 
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
/* Fixagem Menu Mobile*/
const barraMobile = document.getElementById("funcao-pesquisa-mobile-mais-menu");
var pontoFixo = barraMobile.offsetTop;
window.onscroll = function() {checkRolagemMenu()};
function checkRolagemMenu() {
    let resolucaoLargura = window.innerWidth;
    if (window.pageYOffset >= pontoFixo) {
      barraMobile.classList.add("barra-fixa");
      if (resolucaoLargura <= 800) {
        document.getElementById("corpo").style.paddingTop="16%";
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
    if (resolucaoL <= 800) {
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
    else {
         /* link */
    }
}
/* Botões */
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
function botaoTipo1Lento(elemento, elemento2) {
    function botaoTipo1LentoOff() {
        document.getElementById(elemento).classList.remove("botao1lento");
        document.getElementById(elemento2).classList.remove("botao1lento");
    }
    document.getElementById(elemento).classList.add("botao1lento");
    document.getElementById(elemento2).classList.add("botao1lento");
    setTimeout(botaoTipo1LentoOff, 420);
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
function botaoTipo2MenosBrilho(elemento, elemento2) {
    function botaoTipo2MenosBrilhoOff() {
        document.getElementById(elemento).classList.remove("botao2-menos-brilho");
        if (elemento2 !== undefined) {
            document.getElementById(elemento2).classList.remove("botao2-menos-brilho");
        }
    }
    document.getElementById(elemento).classList.add("botao2-menos-brilho");
    if (elemento2 !== undefined) {
        document.getElementById(elemento2).classList.add("botao2-menos-brilho");
    }
    setTimeout(botaoTipo2MenosBrilhoOff, 220);
}
var rotacao = 0;
function rotacao90(elemento, elemento2) {
    if (rotacao === 0) {
        document.getElementById(elemento).classList.add("rotacao90direita");
        document.getElementById(elemento2).classList.add("rotacao90esquerda");
        document.getElementById(elemento).classList.remove("rotacao90direitavolta");
        document.getElementById(elemento2).classList.remove("rotacao90esquerdavolta");
        document.getElementById("sub-menu-lateral").style.top="67.5vw";
        document.getElementById("lateral4").style.filter="brightness(125%)";
        rotacao = 1;
    }
    else if (rotacao === 1) {
        document.getElementById(elemento).classList.add("rotacao90direitavolta");
        document.getElementById(elemento2).classList.add("rotacao90esquerdavolta");
        document.getElementById(elemento).classList.remove("rotacao90direita");
        document.getElementById(elemento2).classList.remove("rotacao90esquerda");
        document.getElementById("sub-menu-lateral").style.top="16vw";
        document.getElementById("lateral4").style.filter="brightness(100%)";
        rotacao = 0;
    }
}