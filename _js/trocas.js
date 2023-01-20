// ------------------------------ Elementos ---------------------------------- //
const mainDiv = document.querySelector('div.app-trocas');
const cardsDiv = document.querySelector('div.cards-container');
const cardsTipoNPC = document.querySelectorAll('.tipo-npc');
const tituloPadrao = document.querySelector('div.titulo-grande');
const tela3Div = document.querySelector('div.tela-3');
const podeTerDiv = document.querySelector('div.pode-ter');
const interesseDiv = document.querySelector('div.interesse');
const displayItensPodeTer = document.querySelector('div.display-itens-pode-ter');
const displayItensInteresse = document.querySelector('div.display-itens-interesse');
// --------------------------- Função de Auxilio ------------------------------- //
let telaAnterior = () => {};
// ---------------------------- Banco de Dados --------------------------------- //
const bancoDadosTrocas = [
    {
        nome: "popular",
        interesse: {  },
        podeter: {  }
    },
    {
        nome: "suspensorios",
        interesse: {item:["Sino", "Sucata Metálica", "Alfinete", "Giz", "Bolas de Gude", "Três Nozes", "Talismã", "Nome em Rascunho", "Nozes Amarelas", "Avelãs", "Castanhas", "Passas", "Botão", "Besouro"], valor:[4, 4, 2, 2, 2, 2, 5, 4, 2, 5, 3, 4, 4, 3]},
        podeter: {item:["Ferromycinium mais", "Munição Revolver", "Unha", "Ovo", "Monomycinium", "Neomycinium"], valor:[9, 4, 6, 5, 8, 8]}
    },
]
// ------------------------------ 1º Tela ---------------------------------- //
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
// ------------------------------ 2º Tela ---------------------------------- //
function menuSecundario(elemento, tipo) {
/*     cardsTipoNPC.forEach((item) => {
        
        if (item !== elemento) {
            item.style.display='none';
        }
    }); */  
    mudancaTela("tela-2");
    switch (tipo) {
        case 'criancas' :
            telaAnterior = () => { menuSecundario(undefined, "criancas") };
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
    listaCriancas.forEach((crianca) => cardsDiv.innerHTML += `
        <img src='./_imagens/app_trocas/criancas/${crianca}.jpg' class='subtipo-npc subtipo-criancas' onclick="mostrarPessoa(this, '${crianca}')" />
    `);
    tituloPadrao.innerHTML = '<h1>Criancas</h1><button class="botao-voltar" onclick="telaPrincipal()"></button>';
};
// ------------------------------ 3º Tela ---------------------------------- //
function mostrarPessoa(elemento, tipoNPC) {
    mudancaTela("tela-3");
    mainDiv.style.backgroundImage=`url('_imagens/app_trocas/criancas/fundos/${tipoNPC}_fundo.jpg')`;
    mainDiv.classList.add("fundo-npc");
    bancoDadosTrocas.forEach((pessoa) => {
        if (pessoa.nome === tipoNPC) {
            pessoa.interesse.item.forEach((itemNome) => {
                const itemNomeFiltrado = filtrarNomeItem(itemNome);
                displayItensInteresse.innerHTML += `
                    <img src='./_imagens/app_trocas/itens/${itemNomeFiltrado}.jpg' class="item-interesse" />
                `;
            });
            pessoa.podeter.item.forEach((itemNome) => {
                const itemNomeFiltrado = filtrarNomeItem(itemNome);
                console.log(itemNomeFiltrado)
                displayItensPodeTer.innerHTML += `
                    <img src='./_imagens/app_trocas/itens/${itemNomeFiltrado}.jpg' class="item-interesse" />
                `;
            });
        }
    });
}
// --------------------------- Funções de Suporte --------------------------- //
function mudancaTela(tipoTela) {
    switch(tipoTela) {
        case "tela-1":
            tituloPadrao.classList.remove("titulo-com-botao");
        break;
        case "tela-2":
            tela3Div.style.display="none";
            cardsDiv.style.display="flex"; 
            tituloPadrao.style.display="block";
            mainDiv.classList.remove("fundo-npc");
            tituloPadrao.classList.add("titulo-com-botao");
            cardsDiv.innerHTML = ``;
            displayItensInteresse.innerHTML =``;
            displayItensPodeTer.innerHTML =``;
            mainDiv.style.backgroundImage = `url('_imagens/app_trocas/fundo_aplicativo.jpg')`;
        break;
        case "tela-3":
            cardsDiv.style.display="none"; 
            tituloPadrao.style.display="none";
            tela3Div.style.display="block";
        break;
    };
};
function filtrarNomeItem(nome) {
    nome = nome.toLowerCase();
    nome = nome.replace(/ /g, "_");
    nome = nome.replace(/á/g, "a");
    nome = nome.replace(/ê/g, "e");
    nome = nome.replace(/ç/g, "c");
    nome = nome.replace(/ã/g, "a");
    return nome
}