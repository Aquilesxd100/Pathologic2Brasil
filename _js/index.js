 var resolucaoL = window.innerWidth;
 var resolucaoA = window.innerHeight;
 /* Abertura de Link */
    function abrirLink(link) {
    window.location.href=link;
    }
    function abrirLinkFora(link) {
        window.open(link, '_blank').focus();
    }
 /* Adaptador Prefixos CSS */
 function adaptadorPrefixos (elemento, transformacao, filtro, clipinset) {
    if (transformacao !== "") {
      document.getElementById(elemento).style.MozTransform=transformacao;
      document.getElementById(elemento).style.webkitTransform=transformacao;
      document.getElementById(elemento).style.msTransform=transformacao;
      document.getElementById(elemento).style.OTransform=transformacao;
    }
    if (filtro !== "") {
      document.getElementById(elemento).style.MozFilter=filtro;
      document.getElementById(elemento).style.webkitFilter=filtro;
      document.getElementById(elemento).style.msFilter=filtro;
      document.getElementById(elemento).style.OFilter=filtro;
    }
    if (clipinset !== "") {
      document.getElementById(elemento).style.MozClipPath=clipinset;
      document.getElementById(elemento).style.webkitClipPath=clipinset;
      document.getElementById(elemento).style.msClipPath=clipinset;
      document.getElementById(elemento).style.OClipPath=clipinset;
    }
  }
/* Barra de Pesquisa */
    var aberturaPesquisa = 0;
    function aberturaPesquisaDesktop() {
        if (aberturaPesquisa === 0) {
            document.getElementById("funcao-pesquisa-barra").style.right="3.8vw";
            document.getElementById("funcao-pesquisa-barra").style.clipPath="inset(0vw 0vw 0vw 0vw)";
            adaptadorPrefixos("funcao-pesquisa-barra", "", "", "inset(0vw 0vw 0vw 0vw)");
            document.getElementById("pesquisar").style.display="block";
            document.getElementById("input").style.display="block";
            document.getElementById("pesquisar").classList.add("pesquisa-up");        
            aberturaPesquisa = 1;
        }
        else if (aberturaPesquisa === 1) {
            document.getElementById("input").value="";
            document.getElementById("funcao-pesquisa-barra").style.right="-11.38vw";
            document.getElementById("funcao-pesquisa-barra").style.clipPath="inset(0vw 15.65vw 0vw 0vw)";
            adaptadorPrefixos("funcao-pesquisa-barra", "", "", "inset(0vw 15.65vw 0vw 0vw)");
            document.getElementById("pesquisar").style.display="none";
            document.getElementById("input").style.display="none"; 
            document.getElementById("pesquisar").classList.remove("pesquisa-up"); 
            aberturaPesquisa = 0;
        }
    }
    var resultadoPesquisa = "";
    function inputPesquisa(tipo) {
        if (tipo === "click") {
            document.getElementById("pesquisar").classList.remove("pesquisa-up"); 
            document.getElementById("pesquisar").style.opacity="0";
        }
        else if (tipo === "clickmobile") {
            document.getElementById("pesquisar-mobile").style.opacity="0";
        }
        else {
        document.getElementById("input").style.display="block";
        document.getElementById("pesquisar").style.opacity="1";
        }
    }
    document.getElementById("botaopesquisa").addEventListener("mouseover", botaoPesquisaHover);
    document.getElementById("botaopesquisa").addEventListener("mouseout", botaoPesquisaHoverOff);
    function botaoPesquisaHover() {
        if (aberturaPesquisa === 1) {
            document.getElementById("botaopesquisa").style.filter="brightness(75%)";
            adaptadorPrefixos("botaopesquisa", "", "brightness(75%)", "");
            document.getElementById("botaopesquisa").style.cursor="url('../_recursos/cursor_link.cur'), auto";
        }
    }
    function botaoPesquisaHoverOff() {
        if (aberturaPesquisa === 1) {
            document.getElementById("botaopesquisa").style.filter="brightness(100%)";
            adaptadorPrefixos("botaopesquisa", "", "brightness(100%)", "");
            document.getElementById("botaopesquisa").style.cursor="url('../_recursos/cursor.cur'), auto"; 
        }
    }
    function botaoPesquisa() {
        if (aberturaPesquisa === 1) {
            function botaoPesquisaOff() {
                document.getElementById("botaopesquisa").classList.remove("botao2-pesquisa");
            }
            document.getElementById("botaopesquisa").classList.add("botao2-pesquisa");
            setTimeout(botaoPesquisaOff, 300);
                resultadoPesquisa = document.getElementById("input").value; 
            }        
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
    adaptadorPrefixos("barra4", "", "brightness(125%)", "");
  }
  if (mostrar === "off") {
     document.getElementById("submenu").style.display="none";
     document.getElementById("barra4").style.filter="brightness(100%)";
     adaptadorPrefixos("barra4", "", "brightness(100%)", "");
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
    adaptadorPrefixos("botao-lateral-fechar", "translateX(0vw)", "", "");
    document.getElementById("menu-lateral").style.width = "65vw";
    document.getElementById("corpo").style.filter = "brightness(45%)";
    adaptadorPrefixos("corpo", "", "brightness(45%)", "");
    document.getElementById("corpo").style.pointerEvents = "none";
    document.getElementById("banner").style.filter = "brightness(45%)";
    adaptadorPrefixos("banner", "", "brightness(45%)", "");
    document.getElementById("banner").style.pointerEvents = "none";
    document.getElementById("funcao-pesquisa-mobile-mais-menu").style.filter = "brightness(45%)";
    adaptadorPrefixos("funcao-pesquisa-mobile-mais-menu", "", "brightness(45%)", "");
    document.getElementById("funcao-pesquisa-mobile-mais-menu").style.pointerEvents = "none";
    document.getElementById("body").classList.add("rolagem-off");
  }
function fecharMenuLateral() {
    document.getElementById("botao-lateral-fechar").style.transform = "translateX(-45vw)";
    adaptadorPrefixos("botao-lateral-fechar", "translateX(-45vw)", "", "");
    document.getElementById("menu-lateral").style.width = "0";
    document.getElementById("corpo").style.filter = "brightness(100%)";
    adaptadorPrefixos("corpo", "", "brightness(100%)", "");
    document.getElementById("corpo").style.pointerEvents = "visible";
    document.getElementById("banner").style.filter = "brightness(100%)";
    adaptadorPrefixos("banner", "", "brightness(100%)", "");
    document.getElementById("banner").style.pointerEvents = "visible";
    document.getElementById("funcao-pesquisa-mobile-mais-menu").style.filter = "brightness(100%)";
    adaptadorPrefixos("funcao-pesquisa-mobile-mais-menu", "", "brightness(100%)", "");
    document.getElementById("funcao-pesquisa-mobile-mais-menu").style.pointerEvents = "visible";
    document.getElementById("body").classList.remove("rolagem-off");
}
/* Fixagem Menu Mobile*/
const barraMobile = document.getElementById("funcao-pesquisa-mobile-mais-menu");
var pontoFixo = barraMobile.offsetTop;
window.onscroll = function() {checkRolagemMenu()};
function checkRolagemMenu() {
    let resolucaoLargura = window.innerWidth;
    if (resolucaoLargura !== resolucaoL) {
        resolucaoL = window.innerWidth;
        barraMobile.classList.remove("barra-fixa");
        pontoFixo = barraMobile.offsetTop;
    }
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
/* Fixagem Menu Mobile Depois do Carregamento*/
var checkBarraFixa = setInterval(() => {
    if (document.readyState === 'complete') {
        barraMobile.classList.remove("barra-fixa");
        pontoFixo = barraMobile.offsetTop; 
        clearInterval(checkBarraFixa);
    }
}, 100);
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
function botaoTipo2Discreto(elemento, elemento2) {
    function botaoTipo2DiscretoOff() {
        document.getElementById(elemento).classList.remove("botao2-discreto");
        if (elemento2 !== undefined) {
            document.getElementById(elemento2).classList.remove("botao2-discreto");
        }
    }
    document.getElementById(elemento).classList.add("botao2-discreto");
    if (elemento2 !== undefined) {
        document.getElementById(elemento2).classList.add("botao2-discreto");
    }
    setTimeout(botaoTipo2DiscretoOff, 220);
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
        adaptadorPrefixos("lateral4", "", "brightness(125%)", "");
        rotacao = 1;
    }
    else if (rotacao === 1) {
        document.getElementById(elemento).classList.add("rotacao90direitavolta");
        document.getElementById(elemento2).classList.add("rotacao90esquerdavolta");
        document.getElementById(elemento).classList.remove("rotacao90direita");
        document.getElementById(elemento2).classList.remove("rotacao90esquerda");
        document.getElementById("sub-menu-lateral").style.top="16vw";
        document.getElementById("lateral4").style.filter="brightness(100%)";
        adaptadorPrefixos("lateral4", "", "brightness(100%)", "");
        rotacao = 0;
    }
}