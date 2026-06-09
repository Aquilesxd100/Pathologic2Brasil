const cardsGuias = document.querySelectorAll("#showcase img");

/* Ultimos Guias - Botoes */
var resolucaoL2 = window.innerWidth;
var resolucaoA = window.innerHeight;
const siteTaEmPortugues = getCurrentPageLanguageCode() === LanguageEnum.PortugueseBR;

function botaoUltimosGuias(botao) {
    if (resolucaoL2 > 800) {
        if (botao === "botao-direita") {
            if (posicaoShowcase < (cardsGuias.length - 3)) { /* <--- Modificador Novo Guia */
                posicaoShowcase = posicaoShowcase + 1;
                showcaseElemento.style.transform = 'translateX(' + (-posicaoShowcase * 33.5) + '%)';
                showcaseElemento.style.msTransform = 'translateX(' + (-posicaoShowcase * 33.5) + '%)';
                showcaseElemento.style.MozTransform = 'translateX(' + (-posicaoShowcase * 33.5) + '%)';
                showcaseElemento.style.OTransform = 'translateX(' + (-posicaoShowcase * 33.5) + '%)';
                showcaseElemento.style.webkitTransform = 'translateX(' + (-posicaoShowcase * 33.5) + '%)';
                clearInterval(loopShowCase);
                loopShowCase = setInterval(showCase, 4000);
            } 
        }
        else if (botao === "botao-esquerda") {
            if (posicaoShowcase !== 0) {
                posicaoShowcase = posicaoShowcase - 1;
                showcaseElemento.style.transform = 'translateX(' + (-posicaoShowcase * 33.5) + '%)';
                showcaseElemento.style.msTransform = 'translateX(' + (-posicaoShowcase * 33.5) + '%)';
                showcaseElemento.style.MozTransform = 'translateX(' + (-posicaoShowcase * 33.5) + '%)';
                showcaseElemento.style.OTransform = 'translateX(' + (-posicaoShowcase * 33.5) + '%)';
                showcaseElemento.style.webkitTransform = 'translateX(' + (-posicaoShowcase * 33.5) + '%)';
                clearInterval(loopShowCase);
                loopShowCase = setInterval(showCase, 4000);
            } 
        }
    }
    else if (resolucaoL2 <= 800) {
        if (botao === "botao-direita") {
            if (posicaoShowcase < cardsGuias.length - 1) { /* <--- Modificador Novo Guia */
                posicaoShowcase = posicaoShowcase + 1;
                showcaseElemento.style.transform = 'translateX(' + (-posicaoShowcase * 100) + '%)';
                showcaseElemento.style.msTransform = 'translateX(' + (-posicaoShowcase * 100) + '%)';
                showcaseElemento.style.MozTransform = 'translateX(' + (-posicaoShowcase * 100) + '%)';
                showcaseElemento.style.OTransform = 'translateX(' + (-posicaoShowcase * 100) + '%)';
                showcaseElemento.style.webkitTransform = 'translateX(' + (-posicaoShowcase * 100) + '%)';
                clearInterval(loopShowCase);
                loopShowCase = setInterval(showCase, 4000);
            } 
        }
        else if (botao === "botao-esquerda") {
            if (posicaoShowcase !== 0) {
                posicaoShowcase = posicaoShowcase - 1;
                showcaseElemento.style.transform = 'translateX(' + (-posicaoShowcase * 100) + '%)';
                showcaseElemento.style.msTransform = 'translateX(' + (-posicaoShowcase * 100) + '%)';
                showcaseElemento.style.MozTransform = 'translateX(' + (-posicaoShowcase * 100) + '%)';
                showcaseElemento.style.OTransform = 'translateX(' + (-posicaoShowcase * 100) + '%)';
                showcaseElemento.style.webkitTransform = 'translateX(' + (-posicaoShowcase * 100) + '%)';
                clearInterval(loopShowCase);
                loopShowCase = setInterval(showCase, 4000);
            } 
        }
    }
}
/* Ultimos Guias - Showcase */
const showcaseElemento = document.getElementById("showcase");
var posicaoShowcase = 0;
function showCase() {
    let checkResolucao = window.innerWidth;
    if (resolucaoL2 !== checkResolucao) {
        posicaoShowcase = 0;   
        resolucaoL2 = window.innerWidth;
    }
    posicaoShowcase++;
    if (resolucaoL2 > 800) {
        if (posicaoShowcase > cardsGuias.length - 3) {
            posicaoShowcase = 0;        
        }
        showcaseElemento.style.transform = 'translateX(' + (-posicaoShowcase * 33.5) + '%)'; 
        showcaseElemento.style.msTransform = 'translateX(' + (-posicaoShowcase * 33.5) + '%)'; 
        showcaseElemento.style.MozTransform = 'translateX(' + (-posicaoShowcase * 33.5) + '%)'; 
        showcaseElemento.style.OTransform = 'translateX(' + (-posicaoShowcase * 33.5) + '%)';
        showcaseElemento.style.webkitTransform = 'translateX(' + (-posicaoShowcase * 33.5) + '%)';
    }
    else if (resolucaoL2 <= 800) {
        if (posicaoShowcase > cardsGuias.length - 1) {
            posicaoShowcase = 0;        
        }
        showcaseElemento.style.transform = 'translateX(' + (-posicaoShowcase * 100) + '%)'; 
        showcaseElemento.style.msTransform = 'translateX(' + (-posicaoShowcase * 100) + '%)'; 
        showcaseElemento.style.MozTransform = 'translateX(' + (-posicaoShowcase * 100) + '%)';
        showcaseElemento.style.OTransform = 'translateX(' + (-posicaoShowcase * 100) + '%)';
        showcaseElemento.style.webkitTransform = 'translateX(' + (-posicaoShowcase * 100) + '%)';   
    }
}
var loopShowCase = setInterval(showCase, 4000);
/* Acesso Rapido */
function acessoRapidoHover(tipo, elemento) {
    if (tipo === "on") {
        let conteudoGuiaAcessoRapido;
        document.getElementById("displayinfo").style.color="#00DD00";
        document.getElementById("displayinfo").style.top="8%"
        if (elemento === "dinheiro") {
            conteudoGuiaAcessoRapido = siteTaEmPortugues
                ?
                    "Fique rico e cause inveja<br class='modo-mobile'> até mesmo nos Kain!"
                :
                    "Get rich and make even the Kains jealous!"

            if (
                resolucaoL2 <= 800 
                && !siteTaEmPortugues
            ) {
                document.getElementById("displayinfo").style.top="28%";
            }

            document.getElementById("displayinfo").innerHTML = conteudoGuiaAcessoRapido;
        }
        if (elemento === "podinzin") {
            conteudoGuiaAcessoRapido = siteTaEmPortugues
            ?
                "Consiga todos os pozinzins<br class='modo-mobile'> escondidos e salve vidas!"
            :
                "Get all the hidden Shmowders<br class='modo-mobile'> and save lives!"

            document.getElementById("displayinfo").innerHTML = conteudoGuiaAcessoRapido;
        }
        if (elemento === "mapa") {
            conteudoGuiaAcessoRapido = siteTaEmPortugues
            ?
                "Descubra todos os segredos da Estepe!"
            :
                "Find out all the secrets from the Steppe!"

            if (resolucaoL2 <= 800) {
                document.getElementById("displayinfo").style.top="28%";
            }
            document.getElementById("displayinfo").innerHTML = conteudoGuiaAcessoRapido;
        }
        if (elemento === "comida") {
            conteudoGuiaAcessoRapido = siteTaEmPortugues
            ?
                "Nunca mais passe fome!"
            :
                "Never be hungry again!"

            if (resolucaoL2 <= 800) {
                document.getElementById("displayinfo").style.top="28%";
            }
            document.getElementById("displayinfo").innerHTML = conteudoGuiaAcessoRapido;
        }
        if (elemento === "pocoes") {
            conteudoGuiaAcessoRapido = siteTaEmPortugues
            ?
                "Aprenda TUDO sobre a criação<br class='modo-mobile'> de Infusões e 'Poções'!"
            :
                `Learn EVERYTHING about the<br class='modo-mobile'> brewing of tincture and "potions"!`

            document.getElementById("displayinfo").innerHTML = conteudoGuiaAcessoRapido;
        }
        if (elemento === "combate") {
            conteudoGuiaAcessoRapido = siteTaEmPortugues
            ?
                "Deixe de ser a caça e vire o caçador!"
            :
                "Stop being the prey and become the hunter!"

            if (resolucaoL2 <= 800) {
                document.getElementById("displayinfo").style.top="28%";
            }
            document.getElementById("displayinfo").innerHTML = conteudoGuiaAcessoRapido;
        }
    }
    else {
        if (resolucaoL2 >= 800) {
        document.getElementById("displayinfo").innerHTML = "";
        document.getElementById("displayinfo").style.color="#FFFFFF";
        }
    }
}
var acessoRapidoReset = ["", ""];
function acessoRapidoMobile(elemento, link) {
    if (resolucaoL2 <= 800) {
        if (elemento !== "link") {
            if (elemento === acessoRapidoReset[0]) {
                return;
            }
            document.getElementById(elemento).style.transform="scale(108%)";
            document.getElementById(elemento).style.filter="brightness(120%)";
            adaptadorPrefixos(elemento, "scale(108%)", "brightness(120%)", "");
            if (acessoRapidoReset[0] !== "") {
                document.getElementById(acessoRapidoReset[0]).style.transform="scale(100%)";
                document.getElementById(acessoRapidoReset[0]).style.filter="brightness(70%)";
                adaptadorPrefixos(acessoRapidoReset[0], "scale(100%)", "brightness(70%)", "");
            }
            acessoRapidoReset[0] = elemento;
            acessoRapidoReset[1] = link;
        }   
        else {
            if (acessoRapidoReset[1] !== "") {
                window.open(acessoRapidoReset[1], '_self');
            }
            if (acessoRapidoReset[1] === "") {
                const avisoSelecaoOpcao = siteTaEmPortugues
                    ? "Escolha uma das opções primeiro."
                    : "Choose an option first."

                document.getElementById("displayinfo").style.top="28%";
                document.getElementById("displayinfo").style.color="#FF0000"; 
                document.getElementById("displayinfo").innerHTML = avisoSelecaoOpcao;
            }
        }
    }
    else {
         window.open(link, '_self');
    }
}