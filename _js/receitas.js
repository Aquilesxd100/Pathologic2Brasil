var telaLargura = window.innerWidth;
var contador2 = 0;
var contador3 = [0, 0, 0, 0];
var contador6 = 0;
const ervasComunsClasse = document.getElementsByClassName("ervas-comuns1");
function rotacaoItens() {
    let ervasComuns = ["blacktwyre", "bloodtwyre", "twyre"];
    let ervasRaras = ["ashenswish", "whitewhip", "swevery"];
    let telaAltura = window.innerHeight;
    if (contador2 === 2) {
        contador2 = 0;
    }
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
    setTimeout(rotacaoItens, 1100);
    }

rotacaoItens(); 
