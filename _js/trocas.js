// ------------------------------ Elementos ---------------------------------- //
const mainDiv = document.querySelector('div.app-trocas');
const divFundoEfeito = document.querySelector('div.fundo-efeito');
const conteudoDiv = document.querySelector('div.app-trocas div');
const cardsDiv = document.querySelector('div.cards-container');
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
const audioPlayer = document.querySelector('audio.player');
const divPreCarregamento = document.querySelector("div.pre-carregamento");
const divPreLoadDesktop = document.querySelector('div.pre-desktop');
const divPreLoadMobile = document.querySelector('div.pre-mobile');
let contadorValor = 0;
let acumuladorItens = [];
let showInfoID = "";
// --------------------------- Função de Auxilio ------------------------------- //
let telaAnterior = () => {};
let delayAnimacao = () => {};
let delayAnimacaoAuxiliar = () => {};
let delayAnimacaoAuxiliar2 = () => {};
window.addEventListener("resize", () => {
    balaoInfosAdicionais.style.opacity="0";
    preCarregamentoAPP();
});
// ---------------------------- Banco de Dados --------------------------------- //
const listaCriancas = ['garota_podinzin', 'junior', 'suspensorios', 'popular', 'chiquinha', 'menina_estepe'];

const listaAdultos = ['bebado', 'guarda', 'homem_estepe', 'mulher_estepe', 'dancarina_das_ervas', 'mulher_humilde', 'homem_padrao', 'mulher_estilosa', 'homem_estiloso', 'mulher_classe'];

const listaInfectados = ['bebado_infectado', 'homem_estepe_infectado', 'mulher_estepe_infectado', 'mulher_humilde_infectado', 'homem_padrao_infectado', 'mulher_estilosa_infectado', 'homem_estiloso_infectado', 'mulher_classe_infectado'];

const listaItens = ["agulha", "alfinete", "analgesico_caseiro", "anel", "antibiotico", "antibiotico_caseiro", "anzois_de_pesca", "avelas", "antibiotico_mais", "ayran", "bandagem", "besouro", "bolas_de_gude", "botao", "bracelete", "cafe", "carne_defumada", "castanhas", "dedal", "embrulho", "faca", "ferromycinium", "ferromycinium_mais", "fios", "formao", "fuso_de_fiar", "garrafa_de_agua", "garrote", "gazua", "giz", "infusao", "infusao_mais", "infusao_qualquer", "limao", "maca", "mola", "monomycinium", "morfina", "municao_escopeta", "municao_revolver", "municao_rifle", "navalha", "neomycinium", "neomycinium_mais", "nome_em_rascunho", "nozes_amarelas", "ovo", "palito_de_fosforo", "passas", "pedra_de_amolar", "peixe", "peixe_defumado", "pemmican", "pinca", "podinzin", "qurut", "reforco_de_imunidade", "relogio_de_bolso", "sabao", "sino", "sucata_metalica", "talisma", "tesoura", "torrada", "tres_nozes", "unha", "vela"];
const bancoDadosTrocas = [
    {
        tipoPessoa: "criancas",
        lista: [
            {
                nome: "popular",
                interesse: {item:["Anzóis de Pesca", "Tesoura", "Navalha", "Agulha", "Palito de Fósforo", "Talismã", "Relógio de Bolso"], valor:[3, 4, 5, 2, 1, 6, 7]},
                podeter: {item:["Reforço de Imunidade", "Unha", "Peixe Defumado", "Munição Rifle"], valor:[8, 6, 7, 8]},
            },
            {
                nome: "suspensorios",
                interesse: {item:["Sino", "Sucata Metálica", "Alfinete", "Giz", "Bolas de Gude", "Três Nozes", "Talismã", "Nome em Rascunho", "Nozes Amarelas", "Avelãs", "Castanhas", "Passas", "Botão", "Besouro"], valor:[4, 4, 2, 2, 2, 2, 5, 4, 2, 5, 3, 4, 4, 3]},
                podeter: {item:["Ferromycinium mais", "Munição Revolver", "Unha", "Ovo", "Monomycinium", "Neomycinium"], valor:[9, 4, 6, 5, 8, 8]}
            },
            {
                nome: "garota_podinzin",
                interesse: {item:["Fuso de Fiar", "Sino", "Três Nozes", "Castanhas", "Nozes Amarelas", "Avelãs", "Anel", "Besouro", "Passas", "Botão", "Bolas de Gude", "Giz", "Alfinete"], valor:[5, 6, 5, 4, 2, 2, 7, 2, 3, 4, 3, 3, 3]},
                podeter: {item:["Ferromycinium", "Ovo", "Unha", "Morfina", "Reforço de Imunidade", "Podinzin"], valor:[8, 5, 6, 6, 6, 35]},
            },
            {
                nome: "menina_estepe",
                interesse: {item:["Dedal", "Fios", "Agulha", "Vela", "Tesoura", "Bolas de Gude", "Anzóis de Pesca", "Talismã", "Besouro"], valor:[3, 3, 1, 4, 4, 4, 2, 6, 5]},
                podeter: {item:["Neomycinium", "Embrulho", "Unha", "Pinça", "Qurut", "Munição Escopeta"], valor:[8, 8, 6, 2, 6, 6]},
            },
            {
                nome: "junior",
                interesse: {item:["Mola", "Sucata Metálica", "Tesoura", "Dedal", "Alfinete", "Bolas de Gude", "Três Nozes", "Nozes Amarelas", "Avelãs", "Castanhas", "Passas", "Besouro"], valor:[3, 1, 3, 4, 2, 3, 2, 4, 3, 2, 5, 3]},
                podeter: {item:["Ovo", "Agulha", "Reforço de Imunidade", "Sabão", "Morfina", "Unha", "Maça"], valor:[5, 3, 6, 2, 6, 6, 6]},
            },
            {
                nome: "chiquinha",
                interesse: {item:["Vela", "Palito de Fósforo", "Fios", "Dedal", "Tesoura", "Agulha", "Alfinete", "Botão", "Anel", "Talismã", "Bracelete", "Fuso de Fiar"], valor:[4, 1, 2, 3, 3, 3, 4, 4, 6, 6, 6, 4]},
                podeter: {item:["Neomycinium mais", "Morfina", "Unha", "Peixe Defumado", "Ferromycinium"], valor:[9, 10, 6, 7, 8]},
            }
        ]
    },
    {
        tipoPessoa: "adultos",
        lista: [
            {
                nome: "dancarina_das_ervas",
                interesse: {item:["Sino", "Vela", "Fios", "Infusão", "Infusão mais", "Dedal", "Palito de Fósforo"], valor:[6, 5, 4, 4, 6, 3, 1]},
                podeter: {item:["Pemmican", "Fuso de Fiar", "Pedra de Amolar", "Talismã", "Tesoura", "Navalha", "Qurut", "Giz", "Besouro"], valor:[6, 3, 2, 4, 2, 3, 4, 2, 2]},
            },   
            {
                nome: "mulher_estepe",
                interesse: {item:["Sino", "Sabão", "Fuso de Fiar", "Reforço de Imunidade", "Garrote", "Bandagem", "Talismã", "Bracelete", "Anel"], valor:[4, 4, 6, 4, 4, 6, 5, 6, 6]},
                podeter: {item:["Agulha", "Alfinete", "Bolas de Gude", "Fios", "Qurut", "Pemmican", "Dedal"], valor:[3, 5, 2, 3, 4, 6, 4]},
            },   
            {
                nome: "homem_estepe",
                interesse: {item:["Mola", "Pinça", "Sucata Metálica", "Vela", "Talismã"], valor:[2, 4, 3, 4, 6]},
                podeter: {item:["Pemmican", "Anzóis de Pesca", "Palito de Fósforo", "Formão", "Avelãs", "Pedra de Amolar"], valor:[6, 2, 2, 3, 2, 4]},
            },
            {
                nome: "homem_padrao",
                interesse: {item:["Pedra de Amolar", "Formão", "Navalha", "Palito de Fósforo", "Talismã", "Relógio de Bolso"], valor:[3, 2, 4, 1, 6, 8]},
                podeter: {item:["Vela", "Nozes Amarelas", "Mola", "Sucata Metálica", "Torrada"], valor:[3, 2, 3, 4, 5]},
            },
            {
                nome: "guarda",
                interesse: {item:["Gazua", "Faca"], valor:[12, 24]},
                podeter: {item:["Torrada", "Reforço de Imunidade", "Morfina", "Munição Revolver"], valor:[5, 4, 5, 4]},
            },
            {
                nome: "mulher_humilde",
                interesse: {item:["Sabão", "Garrote", "Bandagem", "Fuso de Fiar", "Reforço de Imunidade", "Talismã", "Bracelete", "Anel"], valor:[3, 3, 4, 5, 3, 6, 6, 6]},
                podeter: {item:["Fios", "Agulha", "Limão", "Ovo", "Dedal", "Alfinete"], valor:[5, 3, 3, 4, 3, 4]},
            },
            {
                nome: "bebado",
                interesse: {item:["Garrafa de Água"], valor:[1]},
                podeter: {item:["Garrote", "Bandagem"], valor:[3, 4]},
            },
            {
                nome: "homem_estiloso",
                interesse: {item:["Unha", "Navalha", "Palito de Fósforo", "Relógio de Bolso"], valor:[4, 3, 1, 8]},
                podeter: {item:["Café", "Três Nozes", "Qurut"], valor:[7, 2, 5]},
            },
            {
                nome: "mulher_estilosa",
                interesse: {item:["Sabão", "Reforço de Imunidade", "Fuso de Fiar", "Garrote", "Bandagem", "Talismã", "Bracelete", "Anel"], valor:[4, 3, 4, 3, 5, 6, 7, 7]},
                podeter: {item:["Carne Defumada", "Fios", "Castanhas", "Agulha", "Dedal", "Alfinete"], valor:[8, 4, 2, 3, 5, 3]},
            },
            {
                nome: "mulher_classe",
                interesse: {item:["Dedal", "Fios", "Vela", "Reforço de Imunidade", "Garrote", "Bandagem", "Unha", "Fuso de Fiar", "Anel", "Bracelete"], valor:[2, 2, 3, 3, 3, 4, 5, 3, 10, 10]},
                podeter: {item:["Alfinete", "Passas", "Maça"], valor:[2, 3, 4]},
            },           
        ]
    },
    {
        tipoPessoa: "infectados",
        lista : [
            {
                nome: "mulher_humilde_infectado",
                interesse: {item:["Morfina", "Reforço de Imunidade", "Infusão", "Infusão mais", "Antibiótico", "Antibiótico mais", "Analgésico Caseiro", "Antibiótico Caseiro"], valor:[4, 3, 2, 3, 7, 10, 8, 9]},
                podeter: {item:["Sabão", "Anel", "Dedal", "Ovo"], valor:[1, 3, 1, 3]},
            },
            {
                nome: "mulher_estepe_infectado",
                interesse: {item:["Infusão", "Infusão mais", "Antibiótico Caseiro", "Analgésico Caseiro"], valor:[3, 4, 11, 10]},
                podeter: {item:["Peixe Defumado", "Talismã", "Anel", "Unha", "Pemmican", "Qurut", "Bolas de Gude", "Agulha"], valor:[7, 3, 4, 1, 6, 4, 1, 3]},
            },
            {
                nome: "homem_estepe_infectado",
                interesse: {item:["Infusão", "Infusão mais", "Antibiótico Caseiro", "Analgésico Caseiro"], valor:[3, 4, 10, 7]},
                podeter: {item:["Pemmican", "Anzóis de Pesca", "Palito de Fósforo", "Embrulho", "Ayran"], valor:[5, 1, 1, 4, 3]},
            },
            {
                nome: "mulher_estilosa_infectado",
                interesse: {item:["Reforço de Imunidade", "Morfina", "Antibiótico", "Antibiótico mais", "Infusão", "Infusão mais", "Antibiótico Caseiro", "Analgésico Caseiro"], valor:[3, 4, 7, 10, 2, 3, 9, 8]},
                podeter: {item:["Dedal", "Ovo", "Sabão", "Anel"], valor:[1, 3, 1, 3]},
            },  
            {
                nome: "mulher_classe_infectado",
                interesse: {item:["Reforço de Imunidade", "Morfina", "Antibiótico", "Antibiótico mais"], valor:[3, 4, 7, 10]},
                podeter: {item:["Passas", "Bracelete", "Alfinete", "Anel", "Maça"], valor:[2, 4, 1, 4, 3]},
            }, 
            {
                nome: "homem_padrao_infectado",
                interesse: {item:["Infusão Qualquer", "Reforço de Imunidade", "Morfina", "Antibiótico Caseiro", "Antibiótico", "Antibiótico mais", "Analgésico Caseiro"], valor:[3, 3, 4, 9, 7, 10, 8]},
                podeter: {item:["Nozes Amarelas", "Relógio de Bolso", "Navalha", "Torrada", "Vela", "Mola", "Sucata Metálica"], valor:[1, 4, 1, 5, 1, 1, 2]},
            },          
            {
                nome: "bebado_infectado",
                interesse: {item:["Infusão Qualquer", "Reforço de Imunidade", "Morfina", "Antibiótico Caseiro", "Antibiótico", "Antibiótico mais", "Analgésico Caseiro"], valor:[3, 3, 4, 9, 7, 10, 8]},
                podeter: {item:["Nozes Amarelas", "Relógio de Bolso", "Navalha", "Torrada", "Vela", "Mola", "Sucata Metálica"], valor:[1, 4, 1, 5, 1, 1, 2]},
            }, 
            {
                nome: "homem_estiloso_infectado",
                interesse: {item:["Reforço de Imunidade", "Morfina", "Antibiótico", "Antibiótico mais"], valor:[3, 4, 7, 10]},
                podeter: {item:["Maça", "Três Nozes", "Café", "Relógio de Bolso"], valor:[3, 1, 6, 3]},
            }
        ]
    }
]
// ------------------------------ 1º Tela ---------------------------------- //
function telaPrincipal() {
    const listaElementos = cardsDiv.querySelectorAll('img');
    for (c = listaElementos.length - 1, c2 = 0; c >= 0; c--, c2++) {
        listaElementos[c].style.transition=`opacity ${c2 * 0.14 + 0.2}s`;
        listaElementos[c].style.opacity="0";
    }
    tituloPadrao.classList.remove('opacidade-on');
    tituloPadrao.classList.add('opacidade-off-medio');
    delayAnimacao = () => {
        cardsDiv.classList.remove('flex-central');
        mudancaTela("tela-1");
        cardsDiv.classList.add('opacidade-off');
        cardsDiv.innerHTML = `
            <div class="tipo-npc" onclick="menuSecundario(this, 'Criancas')">
                <img src="./_imagens/app_trocas/cards/criancas.jpg">
                <h3>Criancas</h3>
            </div>
            <div class="tipo-npc" onclick="menuSecundario(this, 'Adultos')">
                <img src="./_imagens/app_trocas/cards/adultos.jpg">
                <h3>Adultos</h3>
            </div>
            <div class="tipo-npc" onclick="menuSecundario(this, 'Infectados')">
                <img src="./_imagens/app_trocas/cards/infectados.jpg">
                <h3>Infectados</h3>
            </div>
        `;
        tituloPadrao.innerHTML = '<h1>Com quem deseja trocar?</h1>';
        cardsDiv.classList.add('opacidade-on');
        cardsDiv.classList.remove('opacidade-off');
        tituloPadrao.classList.add('opacidade-on');
        tituloPadrao.classList.remove('opacidade-off-medio');
        setTimeout(delayAnimacaoAuxiliar, 500);
    };
    listaElementos.length === 6 && setTimeout(delayAnimacao, 500);
    listaElementos.length === 8 && setTimeout(delayAnimacao, 550);
    listaElementos.length === 10 && setTimeout(delayAnimacao, 600);
    delayAnimacaoAuxiliar = () => {
        tituloPadrao.classList.remove('opacidade-on');
        cardsDiv.classList.remove('opacidade-on');
    };
}
// ------------------------------ 2º Tela ---------------------------------- //
function menuSecundario(elemento, tipo) {
    const cardsTipoNPC = document.querySelectorAll('.tipo-npc');
    if (elemento !== undefined) {
        cardsTipoNPC.forEach((item) => { 
            item.classList.add('ponteiro-off');      
            if (item !== elemento) {
                item.classList.add('cards-principais');
            }
            else {
                item.classList.add('cards-principais-selecao');
            }
        });
    }
    else {      
        divFundoEfeito.classList.add('fundo-pessoa-off');
        tela3Div.style.transition="opacity 0.4s";
        tela3Div.style.opacity="0";
    }
    delayAnimacaoAuxiliar = (elemento) => {
        elemento && elemento.classList.add('opacidade-off-medio');
        tituloPadrao.classList.add('opacidade-off-medio');
    }
    setTimeout(delayAnimacaoAuxiliar, 500, elemento);
    delayAnimacao = (tipo) => {
        mudancaTela("tela-2");
        cardsDiv.classList.add('flex-central');
        tituloPadrao.innerHTML = `<h1>${tipo}</h1><button id="botao-voltar" class="botao-voltar" onclick="telaPrincipal(); botaoTipo2Lento(this)"></button>`;
        tipo = tipo.toLowerCase();
        switch (tipo) {
            case 'criancas' :
                telaAnterior = () => { menuSecundario(undefined, "Criancas") };
                listaCriancas.forEach((crianca) => cardsDiv.innerHTML += `
                    <img src='./_imagens/app_trocas/criancas/${crianca}.jpg' class='subtipo-npc subtipo-criancas' onclick="mostrarPessoa(this, '${crianca}', '${tipo}')" />
                `);
            break;
            case 'adultos' :
                telaAnterior = () => { menuSecundario(undefined, "Adultos") };
                listaAdultos.forEach((adulto) => cardsDiv.innerHTML += `
                    <img src='./_imagens/app_trocas/adultos/${adulto}.jpg' class='subtipo-npc subtipo-adultos' onclick="mostrarPessoa(this, '${adulto}', '${tipo}')" />
                `);
            break;
            case 'infectados' :
                telaAnterior = () => { menuSecundario(undefined, "Infectados") };
                listaInfectados.forEach((infectado) => cardsDiv.innerHTML += `
                    <img src='./_imagens/app_trocas/infectados/${infectado}.jpg' class='subtipo-npc subtipo-infectados' onclick="mostrarPessoa(this, '${infectado}', '${tipo}')" />
                `);
            break;
        }
        tituloPadrao.classList.add('opacidade-off');
        delayAnimacaoAuxiliar2 = () => {
            const listaElementos = cardsDiv.querySelectorAll('img');
            tituloPadrao.classList.remove('opacidade-off');
            tituloPadrao.classList.add('opacidade-on');
            listaElementos.forEach((pessoa, indice) => {
                pessoa.style.transition=`opacity ${indice * 0.14 + 0.2}s`;
                pessoa.style.opacity="1";
            })
        }
        setTimeout(delayAnimacaoAuxiliar2, 10);
    }
    (elemento !== undefined) ? setTimeout(delayAnimacao, 1000, tipo) : setTimeout(delayAnimacao, 400, tipo);
};
// ------------------------------ 3º Tela ---------------------------------- //
function mostrarPessoa(elemento, nomeNPC, tipoNPC) {
    const cardsPessoasIMG = document.querySelectorAll('div.cards-container img');
    tituloPadrao.classList.remove('opacidade-on');
    tituloPadrao.classList.add('opacidade-off-medio');
    cardsPessoasIMG.forEach((item) => { 
        item.classList.add('ponteiro-off');       
        if (item !== elemento) {
            item.removeAttribute("style");
            item.classList.add('opacidade-off-medio');
        }
        else {
            item.style.transform='scale(1.04)';
            item.style.transition='transform 0.5s';
            item.style.filter='grayscale(0)';
            item.style.transform='scale(1.1)';
        }
    });
    delayAnimacao = () => {
        elemento.style.transition='opacity 0.5s';
        elemento.style.opacity='0';
        cardsDiv.classList.remove('flex-central');
        mainDiv.classList.add("fundo-npc");
        mainDiv.style.backgroundImage=`url('_imagens/app_trocas/${(tipoNPC)}/fundos/${nomeNPC}_fundo.jpg')`;
    };
    setTimeout(delayAnimacao, 450, elemento)
    delayAnimacaoAuxiliar = (nomePessoa) => {
        bancoDadosTrocas.forEach((tipoPessoa) => tipoPessoa.lista.forEach((pessoa) => {
            if (pessoa.nome === nomePessoa) {
                pessoa.interesse.item.forEach((itemNome, indice) => {
                    const itemNomeFiltrado = filtrarNomeItem(itemNome);
                    displayItensInteresse.innerHTML += `
                        <div class="item-interesse">
                            <img src='./_imagens/app_trocas/itens/${itemNomeFiltrado}.jpg' onclick="contador('${pessoa.interesse.valor[indice]}', '${itemNomeFiltrado}'); informacoesExtraOff(); informacoesExtra('${itemNome}', '${pessoa.interesse.valor[indice]}', this, '${nomePessoa}')" onmouseover="informacoesExtra('${itemNome}', '${pessoa.interesse.valor[indice]}', this, '${nomePessoa}')" onmouseout="informacoesExtraOff()" />
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
                            <img src='./_imagens/app_trocas/itens/${itemNomeFiltrado}.jpg' onclick="contador('-${pessoa.podeter.valor[indice]}', '${itemNomeFiltrado}'); informacoesExtraOff(); informacoesExtra('${itemNome}', '${pessoa.podeter.valor[indice]}', this, '${nomePessoa}')" onmouseover="informacoesExtra('${itemNome}', '${pessoa.podeter.valor[indice]}', this, '${nomePessoa}')" onmouseout="informacoesExtraOff()" />
                            <h4 id='${itemNomeFiltrado}'></h4>
                            <img class="botao-diminuir" id='botao-diminuir-${itemNomeFiltrado}' src='./_imagens/app_trocas/botao-fechar-item.png' onclick="acumuladorQnt('${itemNomeFiltrado}', '${pessoa.podeter.valor[indice]}')"/>
                        </div>
                    `;
                    acumuladorItens.push({ id: itemNomeFiltrado, valor: 0 });
                });
            }
        }));  
        mudancaTela("tela-3");  
    };
    setTimeout(delayAnimacaoAuxiliar, 950, nomeNPC);
    delayAnimacaoAuxiliar2 = () => {
        tela3Div.style.transition="opacity 0.3s";
        tela3Div.style.opacity="1";
    };
    setTimeout(delayAnimacaoAuxiliar2, 980);
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
        somEfeito('rem-item')
        contador(dimAcumul);
        valorResul = valorResul - 1;
    }
    else if (!dimAcumul) {
        somEfeito('add-item')
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
            resetClassesAnimacao();
            acumuladorItens = [];
            resetContador();
            tela3Div.style.display="none";
            cardsDiv.style.display="flex"; 
            tituloPadrao.style.display="block";
            mainDiv.classList.remove("fundo-npc");
            divFundoEfeito.classList.remove('fundo-pessoa-off');
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
function resetClassesAnimacao() {
    const cardsPrincipaisSelecao = document.querySelectorAll('.cards-principais-selecao');
    const ponteiroOff = document.querySelectorAll('.ponteiro-off');
    const opacidadeOffMedio = document.querySelectorAll('.opacidade-off-medio');
    const cardsPrincipais = document.querySelector('.cards-principais');
    const elementosClassMult = [{elementos: cardsPrincipaisSelecao, classe: "cards-principais-selecao"}, {elementos: ponteiroOff, classe: "ponteiro-off"}, {elementos: opacidadeOffMedio, classe: "opacidade-off-medio"}, {elemento: cardsPrincipais, classe: "cards-principais"}];
    elementosClassMult.forEach((objeto) => {
        if (objeto.elementos !== undefined) {
            objeto.elementos.forEach((elemento) => elemento.classList.remove(objeto.classe));
        }
    });
}
function filtrarNomeItem(nome) {
    nome = nome.toLowerCase();
    nome = nome.replace(/ /g, "_");
    nome = nome.replace(/á/g, "a");
    nome = nome.replace(/ê/g, "e");
    nome = nome.replace(/é/g, "e");
    nome = nome.replace(/ç/g, "c");
    nome = nome.replace(/ã/g, "a");
    nome = nome.replace(/ó/g, "o");
    return nome;
}
function somEfeito(tipo) {
    if (tipo === "lixeira") {
        audioPlayer.src = "_audio/lixeira.mp3";
        audioPlayer.play();
    }
    else if (tipo === "add-item") {
        audioPlayer.src = `_audio/colocando_item${(Math.random() * 4 + 1).toFixed(0)}.mp3`;
        audioPlayer.play();
    }
    else if (tipo === "rem-item") {
        audioPlayer.src = `_audio/tirando_item${(Math.random() * 2 + 1).toFixed(0)}.mp3`;
        audioPlayer.play();
    }
}
function checkValorDinamico(nomeNPC, nomeItem, valorItem) {
    const trocasDinamicas = [
        {nomePessoa: "guarda",
        itens: [
            {item: "gazua", valor: "1-12"},
            {item: "faca", valor: "1-24"}
        ]},

        {nomePessoa: "mulher_humilde_infectado",
        itens: [
            {item: "analgesico_caseiro", valor: "3-8"},
            {item: "antibiotico_caseiro", valor: "5-9"}
        ]},

        {nomePessoa: "mulher_estepe_infectado",
        itens: [
            {item: "analgesico_caseiro", valor: "5-10"},
            {item: "antibiotico_caseiro", valor: "7-11"}
        ]},

        {nomePessoa: "homem_estepe_infectado",
        itens: [
            {item: "analgesico_caseiro", valor: "3-7"},
            {item: "antibiotico_caseiro", valor: "6-10"}
        ]},

        {nomePessoa: "mulher_estilosa_infectado",
        itens: [
            {item: "analgesico_caseiro", valor: "3-8"},
            {item: "antibiotico_caseiro", valor: "5-9"}
        ]},

        {nomePessoa: "homem_padrao_infectado",
        itens: [
            {item: "analgesico_caseiro", valor: "3-8"},
            {item: "antibiotico_caseiro", valor: "5-9"}
        ]},

        {nomePessoa: "bebado_infectado",
        itens: [
            {item: "analgesico_caseiro", valor: "3-8"},
            {item: "antibiotico_caseiro", valor: "5-9"}
        ]},
        ];
        const pesqValorDinamico = (trocasDinamicas.filter((obj) => obj.nomePessoa === nomeNPC && obj.itens.some((objeto) => objeto.item === nomeItem)).map((elemento) => elemento.itens[elemento.itens.findIndex((objeto) => objeto.item === nomeItem)].valor));
        return (pesqValorDinamico.length) ? pesqValorDinamico : valorItem;
};
function preCarregamentoAPP() {
    const elementosPreLoadMobile = divPreLoadMobile.querySelectorAll('img');
    const elementosPreLoadDesktop = divPreLoadDesktop.querySelectorAll('img');
    if (!elementosPreLoadDesktop.length && resolucaoL > 800) {
        listaInfectados.forEach((infectado) => divPreLoadDesktop.innerHTML += `
            <img src='./_imagens/app_trocas/infectados/${infectado}.jpg' />
            <img src='./_imagens/app_trocas/infectados/fundos/${infectado}_fundo.jpg' />
        `);
        listaCriancas.forEach((crianca) => divPreLoadDesktop.innerHTML += `
            <img src='./_imagens/app_trocas/criancas/${crianca}.jpg' />
            <img src='./_imagens/app_trocas/criancas/fundos/${crianca}_fundo.jpg' />
        `);
        listaAdultos.forEach((adulto) => divPreLoadDesktop.innerHTML += `
            <img src='./_imagens/app_trocas/adultos/${adulto}.jpg' />
            <img src='./_imagens/app_trocas/adultos/fundos/${adulto}_fundo.jpg' />
        `);
        listaItens.forEach((item) => divPreLoadDesktop.innerHTML += `
            <img src='./_imagens/app_trocas/itens/${item}.jpg' />
        `);
    }
    if (document.readyState === 'complete') {
        divPreCarregamento.style.display="none"; 
    }
    else {
        divPreCarregamento.style.display="flex"; 
        setTimeout(preCarregamentoAPP, 100);
    }
}
preCarregamentoAPP();
// ------------------------ Informações Extra Desktop ------------------------ //
function informacoesExtra(nomeItem, valorItem, elemento, nomeNPC) {
    if (resolucaoL < 801) {
        return;
    }
    nomeItem = (nomeItem.search("mais") !== -1) ? nomeItem.substring(0, nomeItem.search("mais")) + "(+)" : nomeItem;
    showInfoID = nomeItem + Math.random();
    setTimeout(informacoesExtraOn, 1200, nomeItem, valorItem, elemento, showInfoID, nomeNPC);
}
const informacoesExtraOn = function(nomeItem, valorItem, elemento, id, nomeNPC) {
    if (showInfoID === id) {
        valorItem = checkValorDinamico(nomeNPC, filtrarNomeItem(nomeItem), valorItem);
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