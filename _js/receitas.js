var telaLargura = window.innerWidth;
var contador2 = 0;
var contador3 = 0;
var contador6 = 0;
function rotacaoItens() {
    let ervasComuns = ["twyre", "bloodtwyre", "blacktwyre"];
    let telaAltura = window.innerHeight;
    if (contador2 === 2) {
        contador2 = 0;
    }
    if (contador3 === 3) {
        contador3 = 0;
    }
    if (contador6 === 6) {
        contador6 = 0;
    }
    if (document.getElementById("ervas-comuns").getBoundingClientRect().top < telaAltura && document.getElementById("ervas-comuns").getBoundingClientRect().bottom > 0) {
        document.getElementById("ervas-comuns").innerHTML="<img src='_imagens/_icones/" + ervasComuns[contador3] + ".jpg'>";
        contador3 = contador3 + 1;
    }


     
    setTimeout(rotacaoItens, 1100);
}
rotacaoItens(); 
