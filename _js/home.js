/* Ultimos Guias - Botoes */
var resolucaoL2 = window.innerWidth;
var resolucaoA = window.innerHeight;
function botaoUltimosGuias(botao) {
    if (resolucaoL2 > 800) {
        if (botao === "botao-direita") {
            if (posicaoShowcase < 2) { /* <--- Novo Guia? Adicione AQUI */
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
            if (posicaoShowcase < 4) { /* <--- Novo Guia? Adicione AQUI */
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
const guias = document.querySelectorAll("#showcase img");
var posicaoShowcase = 0;
function showCase() {
    let checkResolucao = window.innerWidth;
    if (resolucaoL2 !== checkResolucao) {
        posicaoShowcase = 0;   
        resolucaoL2 = window.innerWidth;
    }
    posicaoShowcase++;
    if (resolucaoL2 > 800) {
        if (posicaoShowcase > guias.length - 3) {
            posicaoShowcase = 0;        
        }
        showcaseElemento.style.transform = 'translateX(' + (-posicaoShowcase * 33.5) + '%)'; 
        showcaseElemento.style.msTransform = 'translateX(' + (-posicaoShowcase * 33.5) + '%)'; 
        showcaseElemento.style.MozTransform = 'translateX(' + (-posicaoShowcase * 33.5) + '%)'; 
        showcaseElemento.style.OTransform = 'translateX(' + (-posicaoShowcase * 33.5) + '%)';
        showcaseElemento.style.webkitTransform = 'translateX(' + (-posicaoShowcase * 33.5) + '%)';
    }
    else if (resolucaoL2 <= 800) {
        if (posicaoShowcase > guias.length - 1) {
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
        document.getElementById("displayinfo").style.color="#00DD00";
        document.getElementById("displayinfo").style.top="8%"
        if (elemento === "dinheiro") {
            document.getElementById("displayinfo").innerHTML = "Fique rico e cause inveja<br class='modo-mobile'> até mesmo nos Kain!";
        }
        if (elemento === "podinzin") {
            document.getElementById("displayinfo").innerHTML = "Consiga todos os pozinzins<br class='modo-mobile'> escondidos e salve vidas!";
        }
        if (elemento === "mapa") {
            if (resolucaoL2 <= 800) {
                document.getElementById("displayinfo").style.top="28%";
            }
            document.getElementById("displayinfo").innerHTML = "Descubra todos os segredos da Estepe!";
        }
        if (elemento === "comida") {
            if (resolucaoL2 <= 800) {
                document.getElementById("displayinfo").style.top="28%";
            }
            document.getElementById("displayinfo").innerHTML = "Nunca mais passe fome!";
        }
        if (elemento === "pocoes") {
            document.getElementById("displayinfo").innerHTML = "Aprenda TUDO sobre a criação<br class='modo-mobile'> de Infusões e 'Poções'!";
        }
        if (elemento === "combate") {
            if (resolucaoL2 <= 800) {
                document.getElementById("displayinfo").style.top="28%";
            }
            document.getElementById("displayinfo").innerHTML = "Deixe de ser a caça e vire o caçador!";
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
                document.getElementById("displayinfo").style.top="28%";
                document.getElementById("displayinfo").style.color="#FF0000"; 
                document.getElementById("displayinfo").innerHTML = "Escolha uma das opções primeiro!";
            }
        }
    }
    else {
         window.open(link, '_self');
    }
}