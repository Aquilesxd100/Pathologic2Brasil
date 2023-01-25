// ------------------------------ Elementos ---------------------------------- //
const mainDiv = document.querySelector('div.app-trocas');
const conteudoDiv = document.querySelector('div.app-trocas div');
const cardsDiv = document.querySelector('div.cards-container');
const cardsTipoNPC = document.querySelectorAll('.tipo-npc');
const tituloPadrao = document.querySelector('div.titulo-grande');
const tela3Div = document.querySelector('div.tela-3');
const podeTerDiv = document.querySelector('div.pode-ter');
const interesseDiv = document.querySelector('div.interesse');
const displayItensPodeTer = document.querySelector('div.display-itens-pode-ter');
const displayItensInteresse = document.querySelector('div.display-itens-interesse');
const contadorMarcador = document.querySelector('div.contador h2');
const balaoInfosAdicionais = document.querySelector('div.info-item');
const balaoInfosAdicionaisSubDiv = document.querySelector('div.info-item div');
const balaoInfosTitulo = document.querySelector('h3.titulo-item');
const balaoInfosValor = document.querySelector('h3.valor-item');
let contadorValor = 0;
let acumuladorItens = [];
let showInfoID = "";
// --------------------------- Função de Auxilio ------------------------------- //
let telaAnterior = () => {};
window.addEventListener("resize", () => {
    balaoInfosAdicionais.style.opacity="0";
})
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
            pessoa.interesse.item.forEach((itemNome, indice) => {
                const itemNomeFiltrado = filtrarNomeItem(itemNome);
                displayItensInteresse.innerHTML += `
                    <div class="item-interesse">
                        <img src='./_imagens/app_trocas/itens/${itemNomeFiltrado}.jpg' onclick="contador('${pessoa.interesse.valor[indice]}', '${itemNomeFiltrado}'); informacoesExtraOff(); informacoesExtra('${itemNome}', '${pessoa.interesse.valor[indice]}', this)" onmouseover="informacoesExtra('${itemNome}', '${pessoa.interesse.valor[indice]}', this)" onmouseout="informacoesExtraOff()" />
                        <h4 id='${itemNomeFiltrado}'></h4>
                        <img class="botao-diminuir" id='botao-diminuir-${itemNomeFiltrado}' src='./_imagens/app_trocas/botao-fechar-item.png' onclick="acumuladorQnt('${itemNomeFiltrado}', '-${pessoa.interesse.valor[indice]}')"/>
                    </div>
                `;
                acumuladorItens.push({ id: itemNomeFiltrado, valor: 0 });
            });
            pessoa.podeter.item.forEach((itemNome, indice) => {
                const itemNomeFiltrado = filtrarNomeItem(itemNome);
                displayItensPodeTer.innerHTML += `
                    <div class="item-interesse">
                        <img src='./_imagens/app_trocas/itens/${itemNomeFiltrado}.jpg' onclick="contador('-${pessoa.podeter.valor[indice]}', '${itemNomeFiltrado}'); informacoesExtraOff(); informacoesExtra('${itemNome}', '${pessoa.podeter.valor[indice]}', this)" onmouseover="informacoesExtra('${itemNome}', '${pessoa.podeter.valor[indice]}', this)" onmouseout="informacoesExtraOff()" />
                        <h4 id='${itemNomeFiltrado}'></h4>
                        <img class="botao-diminuir" id='botao-diminuir-${itemNomeFiltrado}' src='./_imagens/app_trocas/botao-fechar-item.png' onclick="acumuladorQnt('${itemNomeFiltrado}', '${pessoa.podeter.valor[indice]}')"/>
                    </div>
                `;
                acumuladorItens.push({ id: itemNomeFiltrado, valor: 0 });
            });
        }
    });
}
// ------------------------------ Contador ---------------------------------- //
function contador(numero, id) {
    let contadorTemporario = contadorValor + Number(numero);
    if (contadorTemporario <= 99 && contadorTemporario >= (0 - 99)) {
        contadorValor = contadorValor + Number(numero);
        if (acumuladorItens.length && id) {
            acumuladorQnt(id);
        }
    } 
    contadorMarcador.innerText = contadorValor;
    if (contadorValor >= 1) {
        contadorMarcador.style.color="#00FF00"
        contadorMarcador.innerText = "+" + contadorValor;
    }
    else if (contadorValor < 0) {
        contadorMarcador.style.color="#FF0000"
    }
    else {
        contadorMarcador.style.color="#FFFFFF"
    }
}
function resetContador() {
    const botoesDiminuir = document.getElementsByClassName("botao-diminuir") || [];
    for (elemento of botoesDiminuir) {
        elemento.style.display="none";
    }
    acumuladorItens = acumuladorItens.map((item) => {
        const elementoH1 = document.getElementById(item.id);
        elementoH1.innerText = "";
        return item = {
            id: item.id,
            valor: 0
        };
    });
    contadorValor = 0;  
    contador(0);
}
// --------------------------- Acumulador --------------------------- //
function acumuladorQnt(idItem, dimAcumul) {
    const botaoDiminuirID = "botao-diminuir-" + idItem || undefined;
    const elementoH1 = document.getElementById(idItem);
    const diminuirContador = document.getElementById(botaoDiminuirID);
    const posicaoIndex = acumuladorItens.findIndex((item) => item.id === idItem);
    let contadorTemp = contadorValor + Number(dimAcumul) || 0;
    let valorResul = acumuladorItens[posicaoIndex].valor;
    if (contadorTemp <= 99 && contadorTemp > (0 - 99) && dimAcumul) {
        contador(dimAcumul);
        valorResul = valorResul - 1;
    }
    else if (!dimAcumul) {
        valorResul = valorResul + 1;
    }
    acumuladorItens[posicaoIndex].valor = valorResul;
    diminuirContador.style.display = (valorResul !== 0) ? "block" : "none";
    elementoH1.innerText = (valorResul !== 0) ? valorResul : "";
}
// --------------------------- Funções de Suporte --------------------------- //
function mudancaTela(tipoTela) {
    switch(tipoTela) {
        case "tela-1":
            tituloPadrao.classList.remove("titulo-com-botao");
        break;
        case "tela-2":
            acumuladorItens = [];
            resetContador();
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
// ------------------------ Informações Extra Desktop ------------------------ //
function informacoesExtra(nomeItem, valorItem, elemento) {
    if (resolucaoL < 801) {
        return;
    }
    showInfoID = nomeItem + Math.random();
    setTimeout(informacoesExtraOn, 1200, nomeItem, valorItem, elemento, showInfoID);
}
const informacoesExtraOn = function(nomeItem, valorItem, elemento, id) {
    if (showInfoID === id) {
        balaoInfosTitulo.innerHTML = `${nomeItem}`;
        balaoInfosValor.innerHTML = `${valorItem}`;
        ajustarTamanhoFonte(nomeItem);
        ajustarPosicaoJanela(elemento);
        balaoInfosAdicionais.style.opacity="1";
        showInfoID = "";
    }
}
function informacoesExtraOff() {
    showInfoID = "";
    balaoInfosAdicionais.style.opacity="0";
}
function ajustarTamanhoFonte(itemNome) {
    if (itemNome.length > 9 && itemNome.search(" ") === -1) {
        balaoInfosTitulo.style.fontSize = "calc(1.1vw + 4px)";
    }
    else if (itemNome.search(" ") >= 12) {
        balaoInfosTitulo.style.fontSize = "calc(0.6vw + 9px)";
    }
    else if (itemNome.length > 9) {
        balaoInfosTitulo.style.fontSize = "calc(1.15vw + 6px)";
    }
    else {
        balaoInfosTitulo.style.fontSize = "calc(1.25vw + 10px)";
    }
}
function ajustarPosicaoJanela(elementoItem) {
    const containerRect = mainDiv.getBoundingClientRect();
    const elementoRect =  elementoItem.getBoundingClientRect();
    const balaoRect = balaoInfosAdicionais.getBoundingClientRect();
    const posicaoLeft = elementoRect.left - containerRect.left;
    const posicaoTop = elementoRect.top - containerRect.top;
    if (posicaoTop <= containerRect.height * 0.25 && posicaoLeft >= containerRect.width * 0.5) {
        balaoInfosAdicionais.style.top=`calc(${posicaoTop + "px"} + ${(balaoRect.height * 0.2) + "px"})`;
        balaoInfosAdicionais.style.left=`calc(${posicaoLeft + "px"} - (25.8% + 21px))`;
        balaoInfosAdicionais.style.transform="scaleY(-1)";
        balaoInfosAdicionaisSubDiv.style.transform="scaleY(-1)";
    }
    else if (posicaoLeft >= containerRect.width * 0.5) {
        balaoInfosAdicionais.style.top=`calc(${posicaoTop + "px"} - ${(balaoRect.height * 0.8) + "px"})`;
        balaoInfosAdicionais.style.left=`calc(${posicaoLeft + "px"} - (25.8% + 21px))`;
        balaoInfosAdicionais.style.transform="scaleY(1)";
        balaoInfosAdicionaisSubDiv.style.transform="scaleY(1)";
    }
    else if (posicaoTop <= containerRect.height * 0.25) {
        console.log("passei");
        balaoInfosAdicionais.style.top=`calc(${posicaoTop + "px"} + ${(balaoRect.height * 0.2) + "px"})`;
        balaoInfosAdicionais.style.left=`calc(${posicaoLeft + "px"} + ${elementoItem.width + "px"}`;
        balaoInfosAdicionais.style.transform="scale(-1)";
        balaoInfosAdicionaisSubDiv.style.transform="scale(-1)";
    }
    else {
        balaoInfosAdicionais.style.top=`calc(${posicaoTop + "px"} - ${(balaoRect.height * 0.8) + "px"})`;
        balaoInfosAdicionais.style.left=`calc(${posicaoLeft + "px"} + ${elementoItem.width + "px"}`;
        balaoInfosAdicionais.style.transform="scale(-1, 1)";
        balaoInfosAdicionaisSubDiv.style.transform="scale(-1, 1)";
    }
}