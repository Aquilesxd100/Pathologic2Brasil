const mainDiv = document.querySelector('div.app-trocas');
const cardsDiv = document.querySelector('div.cards-container');
const cardsTipoNPC = document.querySelectorAll('.tipo-npc');
const tituloPadrao = document.querySelector('div.titulo-grande');
let telaAnterior = () => {};
function telaPrincipal() {
    mudancaTela("tela-1");
    cardsDiv.innerHTML = `
        <div class="tipo-npc" onclick="menuSecundario(this, 'criancas')">
            <img src="./_imagens/app_trocas/cards/criancas.jpg">
            <h3>Criancas</h3>
        </div>
        <div class="tipo-npc" onclick="menuSecundario(this, 'adultos')">
            <img src="./_imagens/app_trocas/cards/adultos.jpg">
            <h3>Adultos</h3>
        </div>
        <div class="tipo-npc" onclick="menuSecundario(this, 'criancas')">
            <img src="./_imagens/app_trocas/cards/infectados.jpg">
            <h3>Infectados</h3>
        </div>
    `;
    tituloPadrao.innerHTML = '<h1>Com quem deseja trocar?</h1>';
}
function menuSecundario(elemento, tipo) {
/*     cardsTipoNPC.forEach((item) => {
        
        if (item !== elemento) {
            item.style.display='none';
        }
    }); */  
    mudancaTela("tela-2");
    switch (tipo) {
        case 'criancas' :
            mostrarCriancas();
        break;
        case 'adultos' :

        break;
        case 'infectados' :

        break;
    }
};

function mostrarCriancas() {
    const listaCriancas = ['garota_podinzin', 'junior', 'suspensorios', 'popular', 'chiquinha', 'menina_estepe'];
    telaAnterior = mostrarCriancas;
    mudancaTela("tela-2");
    listaCriancas.forEach((crianca) => cardsDiv.innerHTML += `
        <img src='./_imagens/app_trocas/criancas/${crianca}.jpg' class='subtipo-npc subtipo-criancas' onclick="mostrarPessoa(this, '${crianca}')" />
    `);
    tituloPadrao.innerHTML = '<h1>Criancas</h1><button class="botao-voltar" onclick="telaPrincipal()"></button>';
};
function mostrarPessoa(elemento, tipoNPC) {
    mainDiv.style.backgroundImage=`url('_imagens/app_trocas/criancas/fundos/${tipoNPC}_fundo.jpg')`;
    mainDiv.classList.add("fundo-npc");
    mainDiv.innerHTML = `
        <div class="contador">
            <h2>0</h2>
        </div>
        <button class="botao-voltar" onclick="telaAnterior()"></button>
        <button class="botao-reset" onclick="resetContador()"></button>
    `;
}
// --------------------------- Funções de Suporte --------------------------- //
function mudancaTela(tipoTela) {
    switch(tipoTela) {
        case "tela-1":
            tituloPadrao.classList.remove("titulo-com-botao");
        break;
        case "tela-2":
            mainDiv.classList.remove("fundo-npc");
            tituloPadrao.classList.add("titulo-com-botao");
            cardsDiv.innerHTML = '';
            mainDiv.style.backgroundImage = `url('_imagens/app_trocas/fundo_aplicativo.jpg')`;
        break;
    }
}