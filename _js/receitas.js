var telaLargura = window.innerWidth;
var contador3 = [0, 0, 0, 0, 0, 0];
var contador5 = [0, 0, 0, 0];
var analgesicosRotacao = setInterval(rotacaoItens2, 2000);
const ervasComunsClasse = document.getElementsByClassName("ervas-comuns1");
const orgaosSangueClasse = document.getElementsByClassName("orgao-sangue-infectado-combinacao");
const orgaosSangueClasse2 = document.getElementsByClassName("orgao-sangue-combinacao");
const analgesicosCoresInfusoes = document.getElementsByClassName("analgesicos-infusao-cor");
const analgesicosCoresAnalgesicos = document.getElementsByClassName("analgesicos-analgesico-cor");
const analgesicosEfeitos = document.getElementsByClassName("analgesicos-efeito");

const paginaEstaEmPortugues2 = !window.location.href.includes("/en");

const caminhoBaseIcone = (!paginaEstaEmPortugues2 ? "../" : "") + "_imagens/_icones/";

function rotacaoItens() {
    let ervasComuns = ["blacktwyre", "bloodtwyre", "twyre"];
    let ervasRaras = ["ashenswish", "whitewhip", "swevery"];
    let infusoesNormais = ["medrel", "zurkh", "yas"];
    let orgaosSangueInfectado = ["rim_infectado", "figado_infectado", "coracao_infectado", "cerebro_infectado", "sangue_infectado"];
    let orgaosSangueSaudavel = ["rim", "figado", "coracao", "cerebro", "sangue"];
    let checkContadores = [contador3[0], contador3[1], contador3[2], contador3[3], contador3[4], contador3[5], contador5[0], contador5[1], contador5[2], contador5[3]];
    let telaAltura = window.innerHeight;
    for (let c = 0; c < Object.keys(checkContadores).length; c++) {
            if (c => 7) {
                if (checkContadores[c] === 5) {
                    contador5[c - 6] = 0;
                }
            }
            if (c <= 6) {
                if (checkContadores[c] === 3) {
                    contador3[c] = 0;
                }
            }
    }
    if (document.getElementById("ervas-comuns").getBoundingClientRect().top < telaAltura && document.getElementById("ervas-comuns").getBoundingClientRect().bottom > 0) {
        document.getElementById("ervas-comuns").innerHTML="<img src='" + caminhoBaseIcone + ervasComuns[contador3[0]] + ".jpg'>";
        contador3[0] = contador3[0] + 1;
    }
    if (document.getElementById("ervas-raras").getBoundingClientRect().top < telaAltura && document.getElementById("ervas-raras").getBoundingClientRect().bottom > 0) {
        document.getElementById("ervas-raras").innerHTML="<img src='" + caminhoBaseIcone + ervasRaras[contador3[1]] + ".jpg'>";
        contador3[1] = contador3[1] + 1;
    }
    if (document.getElementById("ervas-todas").getBoundingClientRect().top < telaAltura && document.getElementById("ervas-todas").getBoundingClientRect().bottom > 0) {
        document.getElementById("ervas-todas").innerHTML="<img src='" + caminhoBaseIcone + ervasComuns[contador3[2]] + ".jpg'>";
        contador3[2] = contador3[2] + 1;
    }  
    for (let c = 0; c < 3; c++) {
        if (ervasComunsClasse[c].getBoundingClientRect().top < telaAltura && ervasComunsClasse[c].getBoundingClientRect().bottom > 0) {
            for (let c2 = 0; c2 < 3; c2++) {
                ervasComunsClasse[c2].innerHTML="<img src='" + caminhoBaseIcone + ervasComuns[contador3[3]] + ".jpg'>";
            }
            contador3[3] = contador3[3] + 1;
            c = 3;
        } 
    }
    if (document.getElementById("infusoes-normais").getBoundingClientRect().top < telaAltura && document.getElementById("infusoes-normais").getBoundingClientRect().bottom > 0) {
        document.getElementById("infusoes-normais").innerHTML="<img src='" + caminhoBaseIcone + infusoesNormais[contador3[4]] + ".jpg'>";
        contador3[4] = contador3[4] + 1;
    }  
    if (document.getElementById("orgao-sangue-infectado").getBoundingClientRect().top < telaAltura && document.getElementById("orgao-sangue-infectado").getBoundingClientRect().bottom > 0) {
        document.getElementById("orgao-sangue-infectado").innerHTML="<img src='" + caminhoBaseIcone + orgaosSangueInfectado[contador5[0]] + ".jpg'>";
        contador5[0] = contador5[0] + 1;
    }  
    for (let c = 0; c < 3; c++) {
        if (orgaosSangueClasse[c].getBoundingClientRect().top < telaAltura && orgaosSangueClasse[c].getBoundingClientRect().bottom > 0) {
            for (let c2 = 0; c2 < 3; c2++) {
                orgaosSangueClasse[c2].innerHTML="<img src='" + caminhoBaseIcone + orgaosSangueInfectado[contador5[1]] + ".jpg'>";
            }
            contador5[1] = contador5[1] + 1;
            c = 5;
        } 
    }
    if (document.getElementById("infusoes-normais2").getBoundingClientRect().top < telaAltura && document.getElementById("infusoes-normais2").getBoundingClientRect().bottom > 0) {
        document.getElementById("infusoes-normais2").innerHTML="<img src='" + caminhoBaseIcone + infusoesNormais[contador3[5]] + ".jpg'>";
        contador3[5] = contador3[5] + 1;
    }  
    if (document.getElementById("orgao-sangue-saudavel").getBoundingClientRect().top < telaAltura && document.getElementById("orgao-sangue-saudavel").getBoundingClientRect().bottom > 0) {
        document.getElementById("orgao-sangue-saudavel").innerHTML="<img src='" + caminhoBaseIcone + orgaosSangueSaudavel[contador5[2]] + ".jpg'>";
        contador5[2] = contador5[2] + 1;
    }  
    setTimeout(rotacaoItens, 1100);
}
function rotacaoItens2() {
    let corAnalgesicoCombinacaoMelhor = ["yas", "medrel", "yas", "medrel", "zurkh"];
    let corAnalgesicoCombinacaoMedio = ["medrel", "zurkh", "zurkh", "zurkh", "yas"];
    let corAnalgesicoCombinacaoPior = ["zurkh", "yas", "medrel", "yas", "medrel"];

    let efeitoAnalgesicoCombinacaoMelhor = 
        paginaEstaEmPortugues2
            ? ["+10% Imunidade", "<span>+45% Regeneração de Exaustão <span class='sem-quebra'>(ao dormir)</span></span>", "-15% Fome", "-15% Exaustão", "-20% de Sede"]
            : ["+10% Immunity", "<span>+45% Exhaustion regeneration <span class='sem-quebra'>(while sleeping)</span></span>", "-15% Hunger", "-15% Exhaustion", "-20% Thirst"];

    let efeitoAnalgesicoCombinacaoMedio = 
        paginaEstaEmPortugues2
            ? ["+7.5% Imunidade", "<span>+30% Regeneração de Exaustão <span class='sem-quebra'>(ao dormir)</span></span>", "-10% Fome", "-10% Exaustão", "-15% de Sede"]
            : ["+7.5% Immunity", "<span>+30% Exhaustion regeneration <span class='sem-quebra'>(while sleeping)</span></span>", "-10% Hunger", "-10% Exhaustion", "-15% Thirst"];

    let efeitoAnalgesicoCombinacaoPior = 
        paginaEstaEmPortugues2
            ? ["+5% Imunidade", "<span>+15% Regeneração de Exaustão <span class='sem-quebra'>(ao dormir)</span></span>", "-5% Fome", "-5% Exaustão", "-10% de Sede"]
            :  ["+5% Immunity", "<span>+15% Exhaustion regeneration <span class='sem-quebra'>(while sleeping)</span></span>", "-5% Hunger", "-5% Exhaustion", "-10% Thirst"];

    let orgaosSangueSaudavel = ["rim", "figado", "coracao", "cerebro", "sangue"];
    let telaAltura = window.innerHeight;
    if (contador5[3] === 5) {
        contador5[3] = 0;
    }
    for (let c = 0; c < 3; c++) {
        if (orgaosSangueClasse2[c].getBoundingClientRect().top < telaAltura && orgaosSangueClasse2[c].getBoundingClientRect().bottom > 0) {
            for (let c2 = 0; c2 < 3; c2++) {
                orgaosSangueClasse2[c2].innerHTML="<img src='" + caminhoBaseIcone + orgaosSangueSaudavel[contador5[3]] + ".jpg'>";
            }
            analgesicosCoresInfusoes[0].innerHTML="<img src='" + caminhoBaseIcone + corAnalgesicoCombinacaoMelhor[contador5[3]] + ".jpg'>";
            analgesicosCoresAnalgesicos[0].innerHTML="<img src='" + caminhoBaseIcone + "analgesico_" + corAnalgesicoCombinacaoMelhor[contador5[3]] + ".jpg'>";
            analgesicosEfeitos[0].innerHTML="<h2>" + efeitoAnalgesicoCombinacaoMelhor[contador5[3]] + "</h2>";   
            analgesicosCoresInfusoes[1].innerHTML="<img src='" + caminhoBaseIcone + corAnalgesicoCombinacaoMedio[contador5[3]] + ".jpg'>";
            analgesicosCoresAnalgesicos[1].innerHTML="<img src='" + caminhoBaseIcone + "analgesico_" + corAnalgesicoCombinacaoMedio[contador5[3]] + ".jpg'>";
            analgesicosEfeitos[1].innerHTML="<h2>" + efeitoAnalgesicoCombinacaoMedio[contador5[3]] + "</h2>";
            analgesicosCoresInfusoes[2].innerHTML="<img src='" + caminhoBaseIcone + corAnalgesicoCombinacaoPior[contador5[3]] + ".jpg'>";
            analgesicosCoresAnalgesicos[2].innerHTML="<img src='" + caminhoBaseIcone + "analgesico_" + corAnalgesicoCombinacaoPior[contador5[3]] + ".jpg'>";
            analgesicosEfeitos[2].innerHTML="<h2>" + efeitoAnalgesicoCombinacaoPior[contador5[3]] + "</h2>";
            contador5[3] = contador5[3] + 1;
            c = 5;
        }
    }
}
function analgesicosRotacaoBotao(tipo) {
    if (tipo === "ON") {
        analgesicosRotacao = setInterval(rotacaoItens2, 2000);
        document.getElementById("botao-tabela-pause").style.display="block";
        document.getElementById("botao-tabela-play").style.display="none";
    }
    else if (tipo === "OFF") {
        clearInterval(analgesicosRotacao);
        document.getElementById("botao-tabela-play").style.display="block";
        document.getElementById("botao-tabela-pause").style.display="none";
    }
}
setTimeout(rotacaoItens, 1100);
