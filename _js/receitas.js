var telaLargura = window.innerWidth;
var contador2 = 0;
var contador3 = [0, 0, 0, 0, 0];
var contador5 = [0, 0];
var contador6 = 0;
const ervasComunsClasse = document.getElementsByClassName("ervas-comuns1");
const orgaosSangueClasse = document.getElementsByClassName("orgão-sangue-infectado-combinacao");
function rotacaoItens() {
    let ervasComuns = ["blacktwyre", "bloodtwyre", "twyre"];
    let ervasRaras = ["ashenswish", "whitewhip", "swevery"];
    let infusoesNormais = ["medrel", "zurkh", "yas"];
    let orgaosSangueInfectado = ["rim_infectado", "figado_infectado", "coracao_infectado", "cerebro_infectado", "sangue_infectado"];
    let telaAltura = window.innerHeight;
    if (contador3[0] === 3) {
        contador3[0] = 0;
    }
    if (contador3[1] === 3) {
        contador3[1] = 0;
    }
    if (contador3[2] === 3) {
        contador3[2] = 0;
    }
    if (contador3[3] === 3) {
        contador3[3] = 0;
    }
    if (contador3[4] === 3) {
        contador3[4] = 0;
    }
    if (contador5[0] === 5) {
        contador5[0] = 0;
    }
    if (contador5[1] === 5) {
        contador5[1] = 0;
    }
    if (contador6 === 6) {
        contador6 = 0;
    }
    
    if (document.getElementById("ervas-comuns").getBoundingClientRect().top < telaAltura && document.getElementById("ervas-comuns").getBoundingClientRect().bottom > 0) {
        document.getElementById("ervas-comuns").innerHTML="<img src='_imagens/_icones/" + ervasComuns[contador3[0]] + ".jpg'>";
        contador3[0] = contador3[0] + 1;
    }
    if (document.getElementById("ervas-raras").getBoundingClientRect().top < telaAltura && document.getElementById("ervas-raras").getBoundingClientRect().bottom > 0) {
        document.getElementById("ervas-raras").innerHTML="<img src='_imagens/_icones/" + ervasRaras[contador3[1]] + ".jpg'>";
        contador3[1] = contador3[1] + 1;
    }
    if (document.getElementById("ervas-todas").getBoundingClientRect().top < telaAltura && document.getElementById("ervas-todas").getBoundingClientRect().bottom > 0) {
        document.getElementById("ervas-todas").innerHTML="<img src='_imagens/_icones/" + ervasComuns[contador3[2]] + ".jpg'>";
        contador3[2] = contador3[2] + 1;
    }  
    for (let c = 0; c < 3; c++) {
        if (ervasComunsClasse[c].getBoundingClientRect().top < telaAltura && ervasComunsClasse[c].getBoundingClientRect().bottom > 0) {
            ervasComunsClasse[0].innerHTML="<img src='_imagens/_icones/" + ervasComuns[contador3[3]] + ".jpg'>";
            ervasComunsClasse[1].innerHTML="<img src='_imagens/_icones/" + ervasComuns[contador3[3]] + ".jpg'>";
            ervasComunsClasse[2].innerHTML="<img src='_imagens/_icones/" + ervasComuns[contador3[3]] + ".jpg'>";
            contador3[3] = contador3[3] + 1;
            c = 3;
        } 
    }
    if (document.getElementById("infusoes-normais").getBoundingClientRect().top < telaAltura && document.getElementById("infusoes-normais").getBoundingClientRect().bottom > 0) {
        document.getElementById("infusoes-normais").innerHTML="<img src='_imagens/_icones/" + infusoesNormais[contador3[4]] + ".jpg'>";
        contador3[4] = contador3[4] + 1;
    }  
    if (document.getElementById("orgão-sangue-infectado").getBoundingClientRect().top < telaAltura && document.getElementById("orgão-sangue-infectado").getBoundingClientRect().bottom > 0) {
        document.getElementById("orgão-sangue-infectado").innerHTML="<img src='_imagens/_icones/" + orgaosSangueInfectado[contador5[0]] + ".jpg'>";
        contador5[0] = contador5[0] + 1;
    }  
    for (let c = 0; c < 3; c++) {
        if (orgaosSangueClasse[c].getBoundingClientRect().top < telaAltura && orgaosSangueClasse[c].getBoundingClientRect().bottom > 0) {
            orgaosSangueClasse[0].innerHTML="<img src='_imagens/_icones/" + orgaosSangueInfectado[contador5[1]] + ".jpg'>";
            orgaosSangueClasse[1].innerHTML="<img src='_imagens/_icones/" + orgaosSangueInfectado[contador5[1]] + ".jpg'>";
            orgaosSangueClasse[2].innerHTML="<img src='_imagens/_icones/" + orgaosSangueInfectado[contador5[1]] + ".jpg'>";
            contador5[1] = contador5[1] + 1;
            c = 5;
        } 
    }
    setTimeout(rotacaoItens, 1100);
    }
rotacaoItens(); 
