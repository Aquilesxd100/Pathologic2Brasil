var resolucaoL = window.innerWidth;

(function () {
    // Adds a Favicon to the header of the document
    const headElement = document.querySelector('head');

    const linkFaviconElement = document.createElement('link');
    linkFaviconElement.rel = 'icon'
    linkFaviconElement.type = 'image/x-icon';
    linkFaviconElement.href = window.location.origin + '/P2B-Template/resources/favicon.ico';

    headElement.appendChild(linkFaviconElement);
})()

/* Mudança Resolução */
window.addEventListener('resize', () => {
    barraMobile.classList.remove("barra-fixa");
    pontoFixo = barraMobile.offsetTop;
    resolucaoL = window.innerWidth;
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
    function mudarLinguagem(codeLanguageToSwitchTo) {
        const currentPageLanguageCode = getCurrentPageLanguageCode();

        if (currentPageLanguageCode === codeLanguageToSwitchTo) return;

        const currentPageQueries = (new URL(window.location.href)).search; 
        const currentUrl = 
            window.location.href
                .replace(currentPageQueries, '') // Remove queries to prevent bugs
                .replace('index.html', ''); // Remove index.html to prevent bugs

        const currentPageName = currentUrl.split('/').pop().replace('.html', ''); // https://aquilesxd100.github.io/Pathologic2Brasil/en/results.html
        const currentPageNamesByLanguageCode = 
            registeredPageList.find((page) => 
                page[currentPageLanguageCode] === currentPageName
            );

        const isHomePage = !currentPageNamesByLanguageCode;

        const baseUrlEndIndex =
            currentPageLanguageCode === LanguageEnum.PortugueseBR // The Portuguese version doesn't include a language code in the URL
            ? 
                isHomePage 
                ? currentUrl.length - 1
                : currentUrl.indexOf('/' + currentPageNamesByLanguageCode[currentPageLanguageCode]) 
            : currentUrl.indexOf('/' + currentPageLanguageCode.toLowerCase());

        // Creation of Url to Redirect

        const baseUrl = currentUrl.substring(0, baseUrlEndIndex) ;

        const languageCodeUrlSegment = 
            codeLanguageToSwitchTo === LanguageEnum.PortugueseBR
            ? ''
            : '/' + codeLanguageToSwitchTo.toLowerCase();

        const pageUrlSegment = 
            isHomePage
            ? ''
            : '/' + currentPageNamesByLanguageCode[codeLanguageToSwitchTo] + '.html';

        const queriesUrlSegment = 
            currentPageQueries !== ''
            ? 
                codeLanguageToSwitchTo === LanguageEnum.PortugueseBR
                ? currentPageQueries.replace('search', 'pesquisa')
                : currentPageQueries.replace('pesquisa', 'search')
            : '';
        
        const urlToRedirect = 
            (baseUrl + languageCodeUrlSegment + pageUrlSegment + queriesUrlSegment);

        abrirLink(urlToRedirect);
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

    const placeHolderPesquisa = getCurrentPageLanguageCode() === LanguageEnum.PortugueseBR
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

/* Pagina de Resultados */
// REVISAR ISSO TUDO, PRECISA SER ADAPTADO
(function () {
    const isSearchResultPage = window.location.href.includes("/resultados") || window.location.href.includes("/result");
    const isAllPage = window.location.href.includes("/tudo") || window.location.href.includes("/all");

    if (isSearchResultPage || isAllPage) {
        const articleTodos = document.querySelector(".guias-todos");
        const articlePesquisa = document.querySelector(".resultado-pesquisa");

        // 'guiasRegistrados' é um array de objetos que contém o nome do guia em português e inglês
        // declarado no index.js

        // ------------------------------------------------------------------------------ //
        // Página Todos os Guias //
        if (articleTodos) {
            const currentPageLanguageCode = getCurrentPageLanguageCode();

            registeredGuideList.forEach((guia) => {
                const nomeGuia = guia[currentPageLanguageCode];                  

                const caminhoImgGuia = paginaEstaEmPortugues
                    ? `_imagens/_guias/cards/${nomeGuia}.png`
                    : `../_imagens/_guias/cardsEn/${nomeGuia}.png`;

                    articleTodos.innerHTML += `
                        <a href='${nomeGuia}.html' target='_self'>
                            <img src="${caminhoImgGuia}" class="card"/>
                        </a>
                    `
                })
        }
        // Resultado Pesquisa //
        if (articlePesquisa) {
            if(!window.location.search) {
                window.open("./index.html", "_self");
            }
            // --------------------------- Banco de Dados ----------------------- //
            const guiasComTags = [
                {
                    nomePtBr: "combate",
                    nomeEn: "combat",
                    brTags: ["luta", "matar", "odong", "bandido", "briga", "soldado", "incendiário", "incendiario", "assassino", "stealth", "furtivo", "arma", "faca", "pistola", "revólver", "revolver", "rifle", "gazua", "eliminar", "stamina", "vigor", "morte", "sobreviver", "morrer", "morre", "combate", "vida", "saude", "saúde", "sangue", "ferir", "ferido", "soco", "socar", "facada", "bater", "atirar", "tiro", "desviar", "acertar"],
                    enTags: ["fight", "kill", "odong", "bandit", "thief", "attack", "soldier", "incendiary", "arsonist", "assassin", "stealth", "weapon", "knife", "pistol", "gun", "revolver", "rifle", "lockpick", "eliminate", "stamina", "energy", "vigor", "death", "survival", "survive", "dying", "combat", "hp", "life", "live", "health", "blood", "hurt", "punch", "burglar", "hit", "shoot", "dodge"]
                },
                /*         economia: ["dinheiro", "moeda", "moedas", "rico", "grana", "ouro", "riqueza", "riquezas", "preço", "preços", "preco", "precos", "valor", "valores", "economia", "crise", "anel", "jóia", "joia", "anéis", "anel", "mercador", "vendedor", "mercante", "loja", "venda", "vender", "compra", "comprar", "mercado", "lucro", "barato", "caro", "desconto", "oferta", "demanda", "finança", "finanças", "estoque", "financa", "troca", "armazem", "armazém", "duplicar", "duplica", "metade", "dupar", "dup", "enriquecer", "colar", "pendante", "amuleto", "relógio", "relogio", "item", "itens", "mercearia", "farmacia", "farmácia", "alfaiate"], */
                {
                    nomePtBr: "mapa",
                    nomeEn: "map",
                    brTags: ["mapa", "local", "localização", "localizacao", "localizacão", "localizaçao", "local", "erva", "ervas", "planta", "plantas", "secreto", "secretos", "segredo", "segredos", "escondido", "escondidos", "baú", "bau", "almas", "alma", "crianças", "criancas", "itens", "item", "mercador", "noite", "madrugada", "gps", "distrito", "distritos", "área", "area", "áreas", "zona", "zonas", "caminho", "entrada", "saída", "saida"],
                    enTags: ["map", "local", "localization", "spot", "herb", "herbs", "plant", "plants", "secret", "secrets", "hidden", "chest", "cache", "soul", "half", "children", "child", "item", "items", "merchant", "seller", "night", "midnight", "gps", "district", "area", "zone", "zones", "way", "path", "entrance", "exit", "treasure", "kid", "kids"]
                },
                {
                    nomePtBr: "comida",
                    nomeEn: "food",
                    brTags: ["comida", "fome", "energia", "vida", "saúde", "saude", "carne", "pão", "pao", "bife", "peixe", "mercador", "ticket", "tickets", "bilhete", "bilhetes", "papel", "bala", "doce", "loja", "estoque", "armazém", "mercado", "crise", "sobreviver", "sobrevivência", "sobrevivencia", "fruta", "frutas", "morrer", "morte", "mercearia"],
                    enTags: ["food", "hungry", "hunger", "starve", "starving", "energy", "life", "health", "meat", "bread", "steak", "fish", "merchant", "seller", "ticket", "candy", "tickets", "paper", "store", "market", "stock", "warehouse", "crisis", "survival", "survive", "fruit", "fruits", "dying", "death", "grocery"]
                },
                {
                    nomePtBr: "podinzins",
                    nomeEn: "shmowders",
                    brTags: ["crianças", "criança", "crianca", "criansa", "menino", "menina", "pozinho", "secreto", "escondido", "potinho", "caixinha", "caixa", "cura", "alma", "infantil", "meia", "praga", "peste", "remedio", "pilula", "pilulas", "pílulas", "pilula", "remédio", "misterio", "segredo", "panaceia", "raro", "raridade", "misterioso", "garota", "garoto", "baus", "báus", "bau"],
                    enTags: ["children", "kid", "kids", "boy", "girl", "girls", "shmowders", "shmowder", "secret", "hidden", "box", "heal", "cure", "medicine", "soul", "childishness", "half", "plague", "sick", "sickness", "pill", "pills", "mistery", "mysterious", "chest", "chests", "cache", "caches", "treasure", "panacea"]
                },
                {
                    nomePtBr: "receitas",
                    nomeEn: "recipes",
                    brTags: ["fome", "energia", "vida", "saúde", "saude", "ingrediente", "ingredientes", "poção", "pocao", "pocão", "receita", "receitas", "panaceia", "cura", "analgesico", "analgesicos", "analgésico", "analgésicos", "infusão", "infusões", "infusao", "infusoes", "erva", "ervas", "combinação", "combinacao", "combinações", "combinacoes", "fusão", "fusões", "plantas", "planta", "brilha", "barulho", "som", "remedio", "remédio", "nervos", "ossos", "sangue", "amarelo", "amarela", "branco", "branca", "laranja", "elixir", "imunidade", "bebida"],
                    enTags: ["starve", "hungry", "hunger", "life", "health", "ingredient", "ingredients", "potion", "potions", "recipe", "recipes", "cure", "panacea", "cure", "medicine", "tinctures", "tinctures", "herb", "herbs", "combination", "fusion", "blood", "bone", "bones", "nerve", "nerves", "plant", "plants", "glowing", "glow", "white", "grey", "orange", "yellow", "drink", "imunity", "elixir", "sound", "analgesic"]
                },
                {
                    nomePtBr: "dinheiro",
                    nomeEn: "money",
                    brTags: ["dinheiro", "moeda", "moedas", "rico", "grana", "ouro", "riqueza", "riquezas", "preço", "preços", "preco", "precos", "valor", "valores", "economia", "crise", "anel", "jóia", "joia", "anéis", "anel", "mercador", "vendedor", "mercante", "loja", "venda", "vender", "compra", "comprar", "mercado", "lucro", "barato", "caro", "desconto", "oferta", "demanda", "finança", "finanças", "estoque", "financa", "troca", "armazem", "armazém", "duplicar", "duplica", "metade", "dupar", "dup", "enriquecer", "colar", "pendante", "amuleto", "relógio", "relogio", "item", "itens", "mercearia", "farmacia", "farmácia", "alfaiate", "orgaos", "orgãos", "órgãos", "órgão", "orgao", "órgaos", "sangue", "coracao", "coração", "pulmão", "pulmao", "figado", "rim", "cerebro", "cérebro", "cirurgia", "ilegal", "farm", "farmar", "bandido", "bandidos", "assasino", "caçar", "caça", "cicatriz", "tabu", "bisturi", "cirurgião", "cirurgiao", "menku", "menkhu"],
                    enTags: ["money", "coin", "coins", "currency", "rich", "cash", "wealth", "price", "prices", "value", "economy", "crisis", "ring", "jewelry", "merchant", "market", "grocery", "store", "seller", "profit", "sell", "buy", "offer", "cheap", "expensive", "finance", "watch", "half", "stock", "warehouse", "necklace", "organs", "black", "item", "items", "farm", "scar", "hunt", "scalpel", "assassin", "brain", "liver", "lung", "heart", "pharmacy", "kidney", "trade", "bandit", "robber", "steal", "stole", "enrich"]
                },
            ];
            // -------------------------------------------------------------------- //
            const resulParams = new URLSearchParams(window.location.search);
            const resultadoPesquisa = resulParams.get(paginaEstaEmPortugues ? "pesquisa" : "search") ?? "";

            const inputPesquisa = document.querySelector(`#input`);
            const inputPesquisaMobile = document.querySelector(`#input-mobile`);
            inputPesquisa.value = resultadoPesquisa;
            inputPesquisaMobile.value = resultadoPesquisa;

            let guiasEncontrados = [];
            for (guiaBanco of guiasComTags) {
                const temTagDoGuia = paginaEstaEmPortugues
                ? guiaBanco.brTags.some((tag) => resultadoPesquisa.indexOf(tag) !== -1)
                : guiaBanco.enTags.some((tag) => resultadoPesquisa.indexOf(tag) !== -1)
                
                if (temTagDoGuia) 
                    guiasEncontrados.push(guiaBanco)
                
            }
            if (!guiasEncontrados.length) {
                articlePesquisa.innerHTML = `
                    <h2>
                    ${
                    paginaEstaEmPortugues
                        ? "Nenhum guia relacionado a pesquisa foi encontrado."
                        : "No related guide was found."
                    }
                    </h2>
                `;
            }
            else {
                guiasEncontrados.forEach((guia) => {
                    const nomeGuia = paginaEstaEmPortugues
                        ? guia.nomePtBr
                        : guia.nomeEn;

                    const caminhoImgGuia = paginaEstaEmPortugues
                        ? `_imagens/_guias/cards/${nomeGuia}.png`
                        : `../_imagens/_guias/cardsEn/${nomeGuia}.png`;

                        articlePesquisa.innerHTML += `
                            <a href='${nomeGuia}.html' target='_self'>
                                <img src="${caminhoImgGuia}" class="card"/>
                            </a>
                        `
                    }
                );
            }
        }
    }
})()