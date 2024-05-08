var resolucaoL = window.innerWidth;
var resolucaoA = window.innerHeight;
const linguagemNavegador = navigator.language || navigator.userLanguage || ""; 
const paginaEstaEmPortugues = linguagemNavegador.includes("pt");

const guiasRegistrados = [
  { nomePtBr: "combate", nomeEn: "combat" }, 
  { nomePtBr: "mapa", nomeEn: "map" }, 
  { nomePtBr: "comida", nomeEn: "food" }, 
  { nomePtBr: "podinzins", nomeEn: "shmowders" }, 
  { nomePtBr: "receitas", nomeEn: "recipes" }, 
  { nomePtBr: "dinheiro", nomeEn: "money" }
];

const paginasRegistradas = guiasRegistrados.concat([
  { nomePtBr: "tudo", nomeEn: "all" },
  { nomePtBr: "trocas", nomeEn: "trading" }, 
  { nomePtBr: "resultado", nomeEn: "results" }
])

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
            input2.value = "";
            rotacao90("indicador-direita", "indicador-esquerda");
            fecharMenuLateral();
        }
        else {
            input.value = "";
        }
    });
/* Modal de Privacidade */
    const modalPrivacidade = document.querySelector(".modal-privacidade");

    if (!localStorage.getItem("alertaPrivacidade")) {
        abrirModalPrivacidade();
    }

    function abrirModalPrivacidade() {
        if (!paginaEstaEmPortugues) {
            const modalPrivacidadeP = document.querySelector(".modal-privacidade p");
            modalPrivacidadeP.innerText = `This website uses cookies and similar technologies to provide services, 
            functionalities and to understand your interaction with it.
            By using this website you agree with the use of this information to better improve your experience.`;
        }
        modalPrivacidade.style.display="inherit";
        setTimeout(
            () => {
                modalPrivacidade.style.transform="translateY(0px)";
                adaptadorPrefixos("modal-privacidade", "translateY(0px)");  
            },
            150
        );
    }

    function fecharModalPrivacidade() {
        localStorage.setItem("alertaPrivacidade", "emitido");
        const qntPxAhMoverModal = resolucaoL > 900 ? "150px" : "250px";
        modalPrivacidade.style.transform=`translateY(${qntPxAhMoverModal})`;
        adaptadorPrefixos(modalPrivacidade, `translateY(${qntPxAhMoverModal})`);
        setTimeout(
            () => {
                modalPrivacidade.style.display="none";  
            },
            950
        );
    }
/* Mudanca de Linguagem */
    const linguagemWebsite = window.location.href.includes("/en")
        ? "ingles"
        : "portugues";
        
    const botaoLinguagemSelecionada = document.querySelector(`.linguagem-${linguagemWebsite}`);
    botaoLinguagemSelecionada.classList.add("botao-linguagem-selecionada");

    function mudarLinguagem(tipoLinguagem) {
        if (linguagemWebsite === tipoLinguagem) return;

        const urlSiteAtual = window.location.href;
        // Trata a URL de direcionamento do usuário baseado
        // se esta em modo de desenvolvimento local ou não
        const ehModoDesenvolvimento = !urlSiteAtual.includes("www");

        let urlAhRedirecionar = null;
        // Trata a URL para direcionamento para versão em inglês ou português da página

        // Trata a estrutura da URL
        switch (tipoLinguagem) {
            case "portugues":
                urlAhRedirecionar = ehModoDesenvolvimento
                  ? urlSiteAtual.replace("Pathologic2Brasil/en/", "Pathologic2Brasil/")
                  : urlAhRedirecionar = urlSiteAtual.replace(".br/en/", ".br/")

                // Trata o nome da pagina na URL se encontra-la na lista
                const paginaEn = paginasRegistradas.find((guia) =>
                  urlSiteAtual.includes(guia.nomeEn)
                )
                if (paginaEn)
                  urlAhRedirecionar = urlAhRedirecionar.replace(paginaEn.nomeEn, paginaEn.nomePtBr)
            break;
            case "ingles":
                urlAhRedirecionar = ehModoDesenvolvimento
                  ? urlAhRedirecionar = urlSiteAtual.replace("Pathologic2Brasil/", "Pathologic2Brasil/en/")
                  : urlAhRedirecionar = urlSiteAtual.replace(".br/", ".br/en/")

                // Trata o nome da pagina na URL se encontra-la na lista
                const paginaPtBr = paginasRegistradas.find((guia) =>
                  urlSiteAtual.includes(guia.nomePtBr)
                )
                if (paginaPtBr)
                  urlAhRedirecionar = urlAhRedirecionar.replace(paginaPtBr.nomePtBr, paginaPtBr.nomeEn)  
            break;
        }

        abrirLink(urlAhRedirecionar);
    }
/* Barra de Pesquisa */
    const input = document.getElementById("input");
    const input2 = document.getElementById("input-mobile");
    const checkPesquisa = document.querySelector(".resultado-pesquisa");
    var aberturaPesquisa = checkPesquisa ? 1 : 0;
    window.addEventListener("submit",  (evento) => {
        if ((aberturaPesquisa === 0 && resolucaoL >= 800.1) || (input.value === "" && input2.value === "")) {
            evento.preventDefault();
        }
    })

    const placeHolderPesquisa = linguagemWebsite === "portugues"
        ? "Pesquisar..."
        : "Search..."

    input.placeholder = input.value === "" ? placeHolderPesquisa : "";
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
            document.getElementById("input").setAttribute("placeholder", placeHolderPesquisa);
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
                input.setAttribute("placeholder", placeHolderPesquisa);
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
function botaoTipo2Lento(elemento, elemento2, elemento3) {
    elemento2 = document.querySelector(elemento2);
    elemento3 = document.querySelector(elemento3);
    elemento.classList.add('botao2-lento');
    elemento2 && elemento2.classList.add('botao2-lento');
    elemento3 && elemento3.classList.add('botao2-lento');
    setTimeout(() => {
        elemento.classList.remove('botao2-lento'); 
        elemento2 && elemento2.classList.remove('botao2-lento'); 
        elemento3 && elemento2.classList.remove('botao2-lento'); 
    }, 300)
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