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
  /* Mudança Resolução */
    window.addEventListener('resize', () => {
        barraMobile.classList.remove("barra-fixa");
        pontoFixo = barraMobile.offsetTop;
        resolucaoL = window.innerWidth;
        resolucaoA = window.innerHeight;
        checkRolagemMenu();
        if (resolucaoL >= 800.1) {
            rotacao90("indicador-direita", "indicador-esquerda");
            fecharMenuLateral();
        }
    });
/* Barra de Pesquisa */
    const input = document.getElementById("input");
    const checkPesquisa = document.querySelector(".resultado-pesquisa");
    var aberturaPesquisa = checkPesquisa ? 1 : 0;
    window.addEventListener("submit",  (evento) => {
        if (aberturaPesquisa === 0 || input.value === "") {
            evento.preventDefault();
        }
    })
    input.placeholder = input.value === "" ? "Pesquisar..." : "";
    function aberturaPesquisaDesktop() {
        if (aberturaPesquisa === 0) {
            document.getElementById("funcao-pesquisa-barra").style.right="3.8vw";
            document.getElementById("funcao-pesquisa-barra").style.clipPath="inset(0vw 0vw 0vw 0vw)";
            adaptadorPrefixos("funcao-pesquisa-barra", "", "", "inset(0vw 0vw 0vw 0vw)");
            document.getElementById("input").style.display="block";
            setTimeout(() => {
                document.getElementById("input").style.opacity="1";
            }, 30)        
            aberturaPesquisa = 1;
        }
        else if (aberturaPesquisa === 1) {
            document.getElementById("input").value="";
            document.getElementById("input").setAttribute("placeholder", "Pesquisar...");
            document.getElementById("funcao-pesquisa-barra").style.right="-11.38vw";
            document.getElementById("funcao-pesquisa-barra").style.clipPath="inset(0vw 15.65vw 0vw 0vw)";
            adaptadorPrefixos("funcao-pesquisa-barra", "", "", "inset(0vw 15.65vw 0vw 0vw)");
            document.getElementById("input").style.opacity="0";
            document.getElementById("input").style.display="none"; 
            aberturaPesquisa = 0;
        }
    }
    function inputPesquisa(tipo) {
        if (tipo === "click") {
            document.querySelector("input#input").setAttribute("placeholder", "");
        }
        else if (tipo === "clickmobile") {
            document.querySelector("input#input-mobile").setAttribute("placeholder", "");
        }
    }
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
        input.addEventListener("blur", () => {
            if (input.value === "") {
                input.setAttribute("placeholder", "Pesquisar...");
            }
        })
    });
    function botaoPesquisa() {
        if (aberturaPesquisa === 1) {
            function botaoPesquisaOff() {
                document.getElementById("botaopesquisa").classList.remove("botao2-pesquisa");
            }
            document.getElementById("botaopesquisa").classList.add("botao2-pesquisa");
            setTimeout(botaoPesquisaOff, 300);
            }        
        }    
    function botaoPesquisaMobile() {
        function botaoPesquisaMobileOff() {
            document.getElementById("botaopesquisamobile").classList.remove("botao2-pesquisa-mobile");
        }
        document.getElementById("botaopesquisamobile").classList.add("botao2-pesquisa-mobile");
        setTimeout(botaoPesquisaMobileOff, 380);
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
    document.querySelector("div.fundo-lateral").style.display="block";
    document.querySelector("html").classList.add("rolagem-off");
}
function fecharMenuLateral() {
    document.getElementById("botao-lateral-fechar").style.transform = "translateX(-45vw)";
    adaptadorPrefixos("botao-lateral-fechar", "translateX(-45vw)", "", "");
    document.getElementById("menu-lateral").style.width = "0";
    document.querySelector("div.fundo-lateral").style.display="none";
    document.querySelector("html").classList.remove("rolagem-off");
}
/* Fixagem Menu Mobile*/
const barraMobile = document.getElementById("funcao-pesquisa-mobile-mais-menu");
var pontoFixo = barraMobile.offsetTop;
window.onscroll = function() {checkRolagemMenu()};
function checkRolagemMenu() {
    if (resolucaoL <= 800) {
        if (window.pageYOffset >= pontoFixo) {
            barraMobile.classList.add("barra-fixa");
            document.getElementById("corpo").style.paddingTop="16%";
          } 
          else {
            barraMobile.classList.remove("barra-fixa");
            document.getElementById("corpo").removeAttribute("style");
          }
    }
    else {
        document.getElementById("corpo").removeAttribute("style");  
    }
}
/* Fixagem Menu Mobile Depois do Carregamento*/
var checkBarraFixa = setInterval(() => {
    if (document.readyState === 'complete') {
        barraMobile.classList.remove("barra-fixa");
        pontoFixo = barraMobile.offsetTop;
        checkRolagemMenu();
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