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
const imgNPCMobile = document.querySelector('img.imagem-npc-mobile');
var resolucaoL2 = window.innerWidth;
const paginaEstaEmPortugues2 = !window.location.href.includes("/en");

let contadorValor = 0;
let acumuladorItens = [];
let showInfoID = "";
let telaAtual = "tela1";
let mobile = (resolucaoL2 > 800) ? false : true;
// --------------------------- Função de Auxilio ------------------------------- //
let telaAnterior = () => {};
let delayAnimacao = () => {};
let delayAnimacaoAuxiliar = () => {};
let delayAnimacaoAuxiliar2 = () => {};
window.addEventListener("resize", () => {
    const checkMudanca = mobile;
    mobile = (resolucaoL2 > 800) ? false : true;
    (mobile !== checkMudanca) && adaptatividadeAPP();
    balaoInfosAdicionais.style.opacity="0";
    preCarregamentoAPP();
});
const getCaminhoTratado = (caminho) => {
    return (
        (paginaEstaEmPortugues2 ? "" : "../")
        + caminho
    );
}
// ---------------------------- Banco de Dados --------------------------------- //
const listaCriancas = ['garota_podinzin', 'junior', 'suspensorios', 'popular', 'chiquinha', 'menina_estepe'];

const listaAdultos = ['bebado', 'guarda', 'homem_estepe', 'mulher_estepe', 'dancarina_das_ervas', 'mulher_humilde', 'homem_padrao', 'mulher_estilosa', 'homem_estiloso', 'mulher_classe'];

const listaInfectados = ['bebado_infectado', 'homem_estepe_infectado', 'mulher_estepe_infectado', 'mulher_humilde_infectado', 'homem_padrao_infectado', 'mulher_estilosa_infectado', 'homem_estiloso_infectado', 'mulher_classe_infectado'];

const listaNomesImgItens = ["agulha", "alfinete", "analgesico_caseiro", "anel", "antibiotico", "antibiotico_caseiro", "anzois_de_pesca", "avelas", "antibiotico_mais", "ayran", "bandagem", "besouro", "bolas_de_gude", "botao", "bracelete", "cafe", "carne_defumada", "castanhas", "dedal", "embrulho", "faca", "ferromycinium", "ferromycinium_mais", "fios", "formao", "fuso_de_fiar", "garrafa_de_agua", "garrote", "gazua", "giz", "infusao", "infusao_mais", "infusao_qualquer", "limao", "maca", "mola", "monomycinium", "morfina", "municao_escopeta", "municao_revolver", "municao_rifle", "navalha", "neomycinium", "neomycinium_mais", "nome_em_rascunho", "nozes_amarelas", "ovo", "palito_de_fosforo", "passas", "pedra_de_amolar", "peixe", "peixe_defumado", "pemmican", "pinca", "podinzin", "qurut", "reforco_de_imunidade", "relogio_de_bolso", "sabao", "sino", "sucata_metalica", "talisma", "tesoura", "torrada", "tres_nozes", "unha", "vela"];

class Item {
    nomePtBr = "";
    nomeEn = "";
    valor = {
        minimo: 0,
        maximo: 0
    };

    constructor (
        nomePtBr, 
        nomeEn, 
        valorMaximo,
        valorMinimo = null
    ) {
        this.nomePtBr = nomePtBr;
        this.nomeEn = nomeEn;
        this.valor.maximo = valorMaximo;
        this.valor.minimo = valorMinimo ?? null;
    }
};

// Registro de todos os itens com valores dinâmicos
class Itens {
    static TresNozes = (vlr, vlrMin) => new Item("Três Nozes", "Walnuts", vlr, vlrMin);
    static Castanhas = (vlr, vlrMin) => new Item("Castanhas", "Chestnuts",  vlr, vlrMin);
    static NozesAmarelas = (vlr, vlrMin) => new Item("Nozes Amarelas", "Peanuts", vlr, vlrMin);
    static Passas = (vlr, vlrMin) => new Item("Passas", "Raisins", vlr, vlrMin);
    static Avelas = (vlr, vlrMin) => new Item("Avelãs", "Hazelnuts", vlr, vlrMin);
    static Besouro = (vlr, vlrMin) => new Item("Besouro", "Beetle", vlr, vlrMin);
    static Giz = (vlr, vlrMin) => new Item("Giz", "Chalk", vlr, vlrMin);
    static Botao = (vlr, vlrMin) => new Item("Botão", "Button", vlr, vlrMin);
    static BolasGude = (vlr, vlrMin) => new Item("Bolas de Gude", "Marbles", vlr, vlrMin);
    static NomeRascunho = (vlr, vlrMin) => new Item("Nome em Rascunho", "Scrap Name", vlr, vlrMin);
    static Embrulho = (vlr, vlrMin) => new Item("Embrulho", "Package", vlr, vlrMin);
    static Anzois = (vlr, vlrMin) => new Item("Anzóis de Pesca", "Fishing Hooks", vlr, vlrMin);
    static Tesoura = (vlr, vlrMin) => new Item("Tesoura", "Scissors", vlr, vlrMin);
    static Navalha = (vlr, vlrMin) => new Item("Navalha", "Razor", vlr, vlrMin);

    static Gazua = (vlr, vlrMin) => new Item("Gazua", "Lockpick", vlr, vlrMin);
    static Faca = (vlr, vlrMin) => new Item("Faca", "Knife", vlr, vlrMin);
    static Revolver = (vlr, vlrMin) => new Item("Revólver", "Revolver", vlr, vlrMin);
    static Rifle = (vlr, vlrMin) => new Item("Rifle", "Rifle", vlr, vlrMin);
    static MunicaoRifle = (vlr, vlrMin) => new Item("Munição Rifle", "Rifle Ammo", vlr, vlrMin);
    static MunicaoRevolver = (vlr, vlrMin) => new Item("Munição Revólver", "Revolver Ammo", vlr, vlrMin);
    static MunicaoEscopeta = (vlr, vlrMin) => new Item("Munição Escopeta", "Shotgun Ammo", vlr, vlrMin);

    static PalitoFosforo = (vlr, vlrMin) => new Item("Palito de Fósforo", "Match", vlr, vlrMin);
    static Unha = (vlr, vlrMin) => new Item("Unha", "Fingernail", vlr, vlrMin);
    static GarrafaDeAgua = (vlr, vlrMin) => new Item("Garrafa de Água", "Water Bottle", vlr, vlrMin);
    static Sino = (vlr, vlrMin) => new Item("Sino", "Bell", vlr, vlrMin);
    static Vela = (vlr, vlrMin) => new Item("Vela", "Candle", vlr, vlrMin);
    static Sabao = (vlr, vlrMin) => new Item("Sabão", "Soap", vlr, vlrMin);
    
    static Dedal = (vlr, vlrMin) => new Item("Dedal", "Thimble", vlr, vlrMin);
    static Agulha = (vlr, vlrMin) => new Item("Agulha", "Needle", vlr, vlrMin);
    static Fios = (vlr, vlrMin) => new Item("Fios", "Thread", vlr, vlrMin);
    static FusoFiar = (vlr, vlrMin) => new Item("Fuso de Fiar", "Spindle", vlr, vlrMin);
    static Alfinete = (vlr, vlrMin) => new Item("Alfinete", "Safety Pin", vlr, vlrMin);
    static Mola = (vlr, vlrMin) => new Item("Mola", "Spring", vlr, vlrMin);
    static SucataMetalica = (vlr, vlrMin) => new Item("Sucata Metálica", "Metal Scrap", vlr, vlrMin);
    static Pinca = (vlr, vlrMin) => new Item("Pinça", "Tweezers", vlr, vlrMin);
    static PedraAmolar = (vlr, vlrMin) => new Item("Pedra de Amolar", "Grindstone", vlr, vlrMin);
    static Formao = (vlr, vlrMin) => new Item("Formão", "Chisel", vlr, vlrMin);

    static Bandagem = (vlr, vlrMin) => new Item("Bandagem", "Bandage", vlr, vlrMin);
    static Garrote = (vlr, vlrMin) => new Item("Garrote", "Tourniquet", vlr, vlrMin);
    static ReforcoImunidade = (vlr, vlrMin) => new Item("Reforço de Imunidade", "Immunity Boosters", vlr, vlrMin);
    static Morfina = (vlr, vlrMin) => new Item("Morfina", "Morphine", vlr, vlrMin);
    static Podinzin = (vlr, vlrMin) => new Item("Podinzin", "Shmowder", vlr, vlrMin);
    static Infusao = (vlr, vlrMin) => new Item("Infusão", "Tincture", vlr, vlrMin);
    static InfusaoMais = (vlr, vlrMin) => new Item("Infusão mais", "Tincture mais", vlr, vlrMin);
    static InfusaoQualquer = (vlr, vlrMin) => new Item("Infusão Qualquer", "Any Tincture", vlr, vlrMin);
    static Antibiotico = (vlr, vlrMin) => new Item("Antibiótico", "Antibiotic", vlr, vlrMin);
    static AntibioticoMais = (vlr, vlrMin) => new Item("Antibiótico mais", "Antibiotic mais", vlr, vlrMin);
    static AntibioticoCaseiro = (vlr, vlrMin) => new Item("Antibiótico Caseiro", "Homemade Antibiotic", vlr, vlrMin);
    static AnalgesicoCaseiro = (vlr, vlrMin) => new Item("Analgésico Caseiro", "Painkiller", vlr, vlrMin);
    static Ferromycinium = (vlr, vlrMin) => new Item("Ferromycinium", "Ferromycinium", vlr, vlrMin);
    static FerromyciniumMais = (vlr, vlrMin) => new Item("Ferromycinium mais", "Ferromycinium mais", vlr, vlrMin);
    static Monomycinium = (vlr, vlrMin) => new Item("Monomycinium", "Monomycinium", vlr, vlrMin);
    static Neomycinium = (vlr, vlrMin) => new Item("Neomycinium", "Neomycinium", vlr, vlrMin);
    static NeomyciniumMais = (vlr, vlrMin) => new Item("Neomycinium mais", "Neomycinium mais", vlr, vlrMin);

    static RelogioBolso = (vlr, vlrMin) => new Item("Relógio de Bolso", "Pocket Watch", vlr, vlrMin);
    static Anel = (vlr, vlrMin) => new Item("Anel", "Ring", vlr, vlrMin);
    static Bracelete = (vlr, vlrMin) => new Item("Bracelete", "Bracelet", vlr, vlrMin);
    static Talisma = (vlr, vlrMin) => new Item("Talismã", "Charm", vlr, vlrMin);

    static Limao = (vlr, vlrMin) => new Item("Limão", "Lemon", vlr, vlrMin);
    static Cafe = (vlr, vlrMin) => new Item("Café", "Coffee", vlr, vlrMin);
    static Ayran = (vlr, vlrMin) => new Item("Ayran", "Tan", vlr, vlrMin);
    static Ovo = (vlr, vlrMin) => new Item("Ovo", "Egg", vlr, vlrMin);
    static Maca = (vlr, vlrMin) => new Item("Maça", "Apple", vlr, vlrMin);
    static Qurut = (vlr, vlrMin) => new Item("Qurut", "Kashk", vlr, vlrMin);
    static Pemmican = (vlr, vlrMin) => new Item("Pemmican", "Pemmican", vlr, vlrMin);
    static Torrada = (vlr, vlrMin) => new Item("Torrada", "Toast", vlr, vlrMin);
    static PeixeDefumado = (vlr, vlrMin) => new Item("Peixe Defumado", "Smoked Fish", vlr, vlrMin);
    static CarneDefumada = (vlr, vlrMin) => new Item("Carne Defumada", "Smoked Meat", vlr, vlrMin);
}

const bancoDadosTrocas = {
    criancas: [
        {
            nome: "popular",
            interesse: [
                Itens.Anzois(3), Itens.Tesoura(4), Itens.Navalha(5), Itens.Agulha(2), Itens.PalitoFosforo(1), Itens.Talisma(6), Itens.RelogioBolso(7)
            ],
            podeTer: [
                Itens.ReforcoImunidade(8), Itens.Unha(6), Itens.PeixeDefumado(7), Itens.MunicaoRifle(8)
            ]
        },
        {
            nome: "suspensorios",
            interesse: [
                Itens.Sino(4), Itens.SucataMetalica(4), Itens.Alfinete(2), Itens.Giz(2), Itens.BolasGude(2), Itens.TresNozes(2), Itens.Talisma(5), Itens.NomeRascunho(4), Itens.NozesAmarelas(2), Itens.Avelas(5), Itens.Castanhas(3), Itens.Passas(4), Itens.Botao(4), Itens.Besouro(3)
            ],
            podeTer: [
                Itens.FerromyciniumMais(9), Itens.MunicaoRevolver(4), Itens.Unha(6), Itens.Ovo(5), Itens.Monomycinium(8), Itens.Neomycinium(8)
            ]
        },   
        {
            nome: "garota_podinzin",
            interesse: [
                Itens.FusoFiar(5), Itens.Sino(6), Itens.TresNozes(5), Itens.Castanhas(4), Itens.NozesAmarelas(2), Itens.Avelas(2), Itens.Anel(7), Itens.Besouro(2), Itens.Passas(3), Itens.Botao(4), Itens.BolasGude(3), Itens.Giz(3), Itens.Alfinete(3)
            ],
            podeTer: [
                Itens.Ferromycinium(8), Itens.Ovo(5), Itens.Unha(6), Itens.Morfina(6), Itens.ReforcoImunidade(6), Itens.Podinzin(35)
            ]
        },
        {
            nome: "menina_estepe",
            interesse: [
                Itens.Dedal(3), Itens.Fios(3), Itens.Agulha(1), Itens.Vela(4), Itens.Tesoura(4), Itens.BolasGude(4), Itens.Anzois(2), Itens.Talisma(6), Itens.Besouro(5)
            ],
            podeTer: [
                Itens.Neomycinium(8), Itens.Embrulho(8), Itens.Unha(6), Itens.Pinca(2), Itens.Qurut(6), Itens.MunicaoEscopeta(6)
            ]
        },   
        {
            nome: "junior",
            interesse: [
                Itens.Mola(3), Itens.SucataMetalica(1), Itens.Tesoura(3), Itens.Dedal(4), Itens.Alfinete(2), Itens.BolasGude(3), Itens.TresNozes(2), Itens.NozesAmarelas(4), Itens.Avelas(3), Itens.Castanhas(2), Itens.Passas(5), Itens.Besouro(3)
            ],
            podeTer: [
                Itens.Ovo(5), Itens.Agulha(3), Itens.ReforcoImunidade(6), Itens.Sabao(2), Itens.Morfina(6), Itens.Unha(6), Itens.Maca(6)
            ]
        },    
        {
            nome: "chiquinha",
            interesse: [
                Itens.Vela(4), Itens.PalitoFosforo(1), Itens.Fios(2), Itens.Dedal(3), Itens.Tesoura(3), Itens.Agulha(3), Itens.Alfinete(4), Itens.Botao(4), Itens.Anel(6), Itens.Talisma(6), Itens.Bracelete(6), Itens.FusoFiar(4)
            ],
            podeTer: [
                Itens.NeomyciniumMais(9), Itens.Morfina(10), Itens.Unha(6), Itens.PeixeDefumado(7), Itens.Ferromycinium(8)
            ]
        }                                
    ],
    adultos: [
        {
            nome: "dancarina_das_ervas",
            interesse: [
                Itens.Sino(6), Itens.Vela(5), Itens.Fios(4), Itens.Infusao(4), Itens.InfusaoMais(6), Itens.Dedal(3), Itens.PalitoFosforo(1)
            ],
            podeTer: [
                Itens.Pemmican(6), Itens.FusoFiar(3), Itens.PedraAmolar(2), Itens.Talisma(4), Itens.Tesoura(2), Itens.Navalha(3), Itens.Qurut(4), Itens.Giz(2), Itens.Besouro(2)
            ]
        },
        {
            nome: "mulher_estepe",
            interesse: [
                Itens.Sino(4), Itens.Sabao(4), Itens.FusoFiar(6), Itens.ReforcoImunidade(4), Itens.Garrote(4), Itens.Bandagem(6), Itens.Talisma(5), Itens.Bracelete(6), Itens.Anel(6)
            ],
            podeTer: [
                Itens.Agulha(3), Itens.Alfinete(5), Itens.BolasGude(2), Itens.Fios(3), Itens.Qurut(4), Itens.Pemmican(6), Itens.Dedal(4)
            ]
        },
        {
            nome: "homem_estepe",
            interesse: [
                Itens.Mola(2), Itens.Pinca(4), Itens.SucataMetalica(3), Itens.Vela(4), Itens.Talisma(6)
            ],
            podeTer: [
                Itens.Pemmican(6), Itens.Anzois(2), Itens.PalitoFosforo(2), Itens.Formao(3), Itens.Avelas(2), Itens.PedraAmolar(4)
            ]
        },
        {
            nome: "homem_padrao",
            interesse: [
                Itens.PedraAmolar(3), Itens.Formao(2), Itens.Navalha(4), Itens.PalitoFosforo(1), Itens.Talisma(6), Itens.RelogioBolso(8)
            ],
            podeTer: [
                Itens.Vela(3), Itens.NozesAmarelas(2), Itens.Mola(3), Itens.SucataMetalica(4), Itens.Torrada(5)
            ]
        },
        {
            nome: "guarda",
            interesse: [
                Itens.Gazua(12, 1), Itens.Faca(24, 1)
            ],
            podeTer: [
                Itens.Torrada(5), Itens.ReforcoImunidade(4), Itens.Morfina(5), Itens.MunicaoRevolver(4)
            ]
        },
        {
            nome: "mulher_humilde",
            interesse: [
                Itens.Sabao(3), Itens.Garrote(3), Itens.Bandagem(4), Itens.FusoFiar(5), Itens.ReforcoImunidade(3), Itens.Talisma(6), Itens.Bracelete(6), Itens.Anel(6)
            ],
            podeTer: [
                Itens.Fios(5), Itens.Agulha(3), Itens.Limao(3), Itens.Ovo(4), Itens.Dedal(3), Itens.Alfinete(4)
            ]
        },
        {
            nome: "bebado",
            interesse: [
                Itens.GarrafaDeAgua(1)
            ],
            podeTer: [
                Itens.Garrote(3), Itens.Bandagem(4)
            ]
        },
        {
            nome: "homem_estiloso",
            interesse: [
                Itens.Unha(4), Itens.Navalha(3), Itens.PalitoFosforo(1), Itens.RelogioBolso(8)
            ],
            podeTer: [
               Itens.Cafe(7), Itens.TresNozes(2), Itens.Qurut(5)
            ]
        },
        {
            nome: "mulher_estilosa",
            interesse: [
                Itens.Sabao(4), Itens.ReforcoImunidade(3), Itens.FusoFiar(4), Itens.Garrote(3), Itens.Bandagem(5), Itens.Talisma(6), Itens.Bracelete(7), Itens.Anel(7)
            ],
            podeTer: [
                Itens.CarneDefumada(8), Itens.Fios(4), Itens.Castanhas(2), Itens.Agulha(3), Itens.Dedal(5), Itens.Alfinete(3)
            ]
        },
        {
            nome: "mulher_classe",
            interesse: [
                Itens.Dedal(2), Itens.Fios(2), Itens.Vela(3), Itens.ReforcoImunidade(3), Itens.Garrote(3), Itens.Bandagem(4), Itens.Unha(5), Itens.FusoFiar(3), Itens.Anel(10), Itens.Bracelete(10)
            ],
            podeTer: [
                Itens.Alfinete(2), Itens.Passas(3), Itens.Maca(4)
            ]
        }                                                                   
    ],
    infectados: [
        {
            nome: "mulher_humilde_infectado",
            interesse: [
                Itens.Morfina(4), Itens.ReforcoImunidade(3), Itens.Infusao(2), Itens.InfusaoMais(3), Itens.Antibiotico(7), Itens.AntibioticoMais(10), Itens.AnalgesicoCaseiro(8, 3), Itens.AntibioticoCaseiro(9, 5)
            ],
            podeTer: [
                Itens.Sabao(1), Itens.Anel(3), Itens.Dedal(1), Itens.Ovo(3)
            ]
        },
        {
            nome: "mulher_estepe_infectado",
            interesse: [
                Itens.Infusao(3), Itens.InfusaoMais(4), Itens.AntibioticoCaseiro(11, 7), Itens.AnalgesicoCaseiro(10, 5)
            ],
            podeTer: [
                Itens.PeixeDefumado(7), Itens.Talisma(3), Itens.Anel(4), Itens.Unha(1), Itens.Pemmican(6), Itens.Qurut(4), Itens.BolasGude(1), Itens.Agulha(3)
            ]
        },
        {
            nome: "homem_estepe_infectado",
            interesse: [
                Itens.Infusao(3), Itens.InfusaoMais(4), Itens.AntibioticoCaseiro(10, 6), Itens.AnalgesicoCaseiro(7, 3)
            ],
            podeTer: [
                Itens.Pemmican(5), Itens.Anzois(1), Itens.PalitoFosforo(1), Itens.Embrulho(4), Itens.Ayran(3)
            ]
        },
        {
            nome: "mulher_estilosa_infectado",
            interesse: [
                Itens.ReforcoImunidade(3), Itens.Morfina(4), Itens.Antibiotico(7), Itens.AntibioticoMais(10), Itens.Infusao(2), Itens.InfusaoMais(3), Itens.AntibioticoCaseiro(9, 5), Itens.AnalgesicoCaseiro(8, 3)
            ],
            podeTer: [
                Itens.Dedal(1), Itens.Ovo(3), Itens.Sabao(1), Itens.Anel(3)
            ]
        },
        {
            nome: "mulher_classe_infectado",
            interesse: [
                Itens.ReforcoImunidade(3), Itens.Morfina(4), Itens.Antibiotico(7), Itens.AntibioticoMais(10)
            ],
            podeTer: [
                Itens.Passas(2), Itens.Bracelete(4), Itens.Alfinete(1), Itens.Anel(4), Itens.Maca(3)
            ]
        },
        {
            nome: "homem_padrao_infectado",
            interesse: [
                Itens.InfusaoQualquer(3), Itens.ReforcoImunidade(3), Itens.Morfina(4), Itens.AntibioticoCaseiro(9, 5), Itens.Antibiotico(7), Itens.AntibioticoMais(10), Itens.AnalgesicoCaseiro(8, 3)
            ],
            podeTer: [
                Itens.NozesAmarelas(1), Itens.RelogioBolso(4), Itens.Navalha(1), Itens.Torrada(5), Itens.Vela(1), Itens.Mola(1), Itens.SucataMetalica(2)
            ]
        },
        {
            nome: "bebado_infectado",
            interesse: [
                Itens.InfusaoQualquer(3), Itens.ReforcoImunidade(3), Itens.Morfina(4), Itens.AntibioticoCaseiro(9, 5), Itens.Antibiotico(7), Itens.AntibioticoMais(10), Itens.AnalgesicoCaseiro(8, 3)
            ],
            podeTer: [
                Itens.NozesAmarelas(1), Itens.RelogioBolso(4), Itens.Navalha(1), Itens.Torrada(5), Itens.Vela(1), Itens.Mola(1), Itens.SucataMetalica(2)
            ]
        },
        {
            nome: "homem_estiloso_infectado",
            interesse: [
                Itens.ReforcoImunidade(3), Itens.Morfina(4), Itens.Antibiotico(7), Itens.AntibioticoMais(10)
            ],
            podeTer: [
                Itens.Maca(3), Itens.TresNozes(1), Itens.Cafe(6), Itens.RelogioBolso(3)
            ]
        }                                                                
    ]
};

// ------------------------------ 1º Tela ---------------------------------- //
function telaPrincipal() {
    const listaElementos = cardsDiv.querySelectorAll('img');
    for (c = listaElementos.length - 1, c2 = 0; c >= 0; c--, c2++) {
        listaElementos[c].style.transition=`opacity ${c2 * 0.14 + 0.2}s`;
        adaptadorPrefixos2(listaElementos[c], `opacity ${c2 * 0.14 + 0.2}s`)
        listaElementos[c].style.opacity="0";
    }
    tituloPadrao.classList.remove('opacidade-on');
    tituloPadrao.classList.add('opacidade-off-medio');
    delayAnimacao = () => {
        cardsDiv.classList.remove('flex-central');
        cardsDiv.classList.remove('flex-around');
        mudancaTela("tela-1");
        cardsDiv.classList.add('opacidade-off');
        cardsDiv.innerHTML = `
            <div class="tipo-npc" onclick="menuSecundario(this, 'Criancas', 'Children')">
                <img src='${getCaminhoTratado("./_imagens/app_trocas/cards/criancas.jpg")}'>
                <h3>${paginaEstaEmPortugues2 ? "Criancas" : "Children"}</h3>
            </div>
            <div class="tipo-npc" onclick="menuSecundario(this, 'Adultos', 'Adults')">
                <img src='${getCaminhoTratado("./_imagens/app_trocas/cards/adultos.jpg")}'>
                <h3>${paginaEstaEmPortugues2 ? "Adultos" : "Adults"}</h3>
            </div>
            <div class="tipo-npc" onclick="menuSecundario(this, 'Infectados', 'Infected')">
                <img src='${getCaminhoTratado("./_imagens/app_trocas/cards/infectados.jpg")}'>
                <h3>${paginaEstaEmPortugues2 ? "Infectados" : "Infected"}</h3>
            </div>
        `;
        tituloPadrao.innerHTML = 
            `<h1>
                ${
                    paginaEstaEmPortugues2 
                    ? "Com quem deseja trocar?" 
                    : "Who do you want to trade with?"
                }
            </h1>`;
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
function menuSecundario(elemento, tipo, tituloTipoEn) {
    const cardsTipoNPC = document.querySelectorAll('.tipo-npc');
    setTimeout((() => { informacoesExtraOff(); }), 1100);
    if (elemento !== undefined) {
        cardsTipoNPC.forEach((item) => { 
            item.classList.add('ponteiro-off');      
            if (item !== elemento) {
                (!mobile) && item.classList.add('cards-principais');
            }
            else {
                (!mobile) ? item.classList.add('cards-principais-selecao') : botaoTipo2Lento(item);
            }
        });
    }
    else { 
        !mobile && divFundoEfeito.classList.add('fundo-pessoa-off');     
        imgNPCMobile.style.opacity="0";
        tela3Div.style.transition="opacity 0.4s";
        adaptadorPrefixos2(tela3Div, "opacity 0.4s");
        tela3Div.style.opacity="0";
    }
    delayAnimacaoAuxiliar = (elemento) => {
        (elemento && !mobile) && elemento.classList.add('opacidade-off-medio');
        (elemento && mobile) && cardsTipoNPC.forEach((div) => div.classList.add('opacidade-off-medio'));
        tituloPadrao.classList.add('opacidade-off-medio');
    }
    (!mobile) ? setTimeout(delayAnimacaoAuxiliar, 500, elemento) : setTimeout(delayAnimacaoAuxiliar, 300, elemento);
    delayAnimacao = (tipo, tipoEn) => {
        mudancaTela("tela-2");
        cardsDiv.classList.add('flex-central');
        cardsDiv.classList.add('flex-around');
        tituloPadrao.innerHTML = `<h1>${paginaEstaEmPortugues2 ? tipo : tipoEn}</h1><button class="botao-voltar" onclick="telaPrincipal(); botaoTipo2Lento(this)"></button>`;
        tipo = tipo.toLowerCase();
        switch (tipo) {
            case 'criancas' :
                telaAnterior = () => { menuSecundario(undefined, "Criancas", "Children") };
                listaCriancas.forEach((crianca) => cardsDiv.innerHTML += `
                    <img                    
                        src='${getCaminhoTratado(`./_imagens/app_trocas/criancas/${crianca}.jpg`)}' 
                        class='subtipo-npc subtipo-criancas' 
                        onclick="mostrarPessoa(this, '${crianca}', '${tipo}')" 
                    />
                `);
            break;
            case 'adultos' :
                telaAnterior = () => { menuSecundario(undefined, "Adultos", "Adults") };
                listaAdultos.forEach((adulto) => cardsDiv.innerHTML += `
                    <img 
                        src='${getCaminhoTratado(`./_imagens/app_trocas/adultos/${adulto}.jpg`)}' 
                        class='subtipo-npc subtipo-adultos' 
                        onclick="mostrarPessoa(this, '${adulto}', '${tipo}')" 
                    />
                `);
            break;
            case 'infectados' :
                telaAnterior = () => { menuSecundario(undefined, "Infectados", "Infected") };
                listaInfectados.forEach((infectado) => cardsDiv.innerHTML += `
                    <img 
                        src='${getCaminhoTratado(`./_imagens/app_trocas/infectados/${infectado}.jpg`)}'
                        class='subtipo-npc subtipo-infectados' 
                        onclick="mostrarPessoa(this, '${infectado}', '${tipo}')" 
                    />
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
                adaptadorPrefixos2(pessoa, `opacity ${indice * 0.14 + 0.2}s`);
                pessoa.style.opacity="1";
            })
        }
        setTimeout(delayAnimacaoAuxiliar2, 10);
    }
    (elemento !== undefined) ? setTimeout(delayAnimacao, 1000, tipo, tituloTipoEn) : setTimeout(delayAnimacao, 400, tipo, tituloTipoEn);
};
// ------------------------------ 3º Tela ---------------------------------- //
function mostrarPessoa(elemento, nomeNPC, tipoNPC) {
    const cardsPessoasIMG = document.querySelectorAll('div.cards-container img');
    tituloPadrao.classList.remove('opacidade-on');
    tituloPadrao.classList.add('opacidade-off-medio');
    imgNPCMobile.src = getCaminhoTratado(`./_imagens/app_trocas/${tipoNPC}/${nomeNPC}.jpg`);
    imgNPCMobile.style.display = "block";
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
            adaptadorPrefixos2(item, 'transform 0.5s', 'scale(1.1)', 'grayscale(0)');
        }
    });
    delayAnimacao = () => {
        imgNPCMobile.style.opacity="1";
        elemento.style.transition='opacity 0.5s';
        adaptadorPrefixos2(elemento, 'opacity 0.5s');
        elemento.style.opacity='0';
        cardsDiv.classList.remove('flex-central');
        cardsDiv.classList.remove('flex-around');
        if (!mobile) {
            mainDiv.classList.add("fundo-npc");
            mainDiv.style.backgroundImage = `url(${getCaminhoTratado(`_imagens/app_trocas/${tipoNPC}/fundos/${nomeNPC}_fundo.jpg`)})`;
        }
    };
    setTimeout(delayAnimacao, 450, elemento)
    delayAnimacaoAuxiliar = (tipoNpc, nomePessoa) => {
        // Mantém tipagem básica do JS
        let pessoa = bancoDadosTrocas.criancas[0];

        pessoa = bancoDadosTrocas[tipoNpc].find((pessoa) =>
            pessoa.nome === nomePessoa
        );
        
        pessoa.interesse.forEach((item) => {
            const nomeImg = getNomeItemSemAcentosEspacos(item.nomePtBr);
            const nomeItem =
                paginaEstaEmPortugues2
                ? item.nomePtBr
                : item.nomeEn;

            const nomeItemTratado = getNomeItemSemAcentosEspacos(nomeItem);

            displayItensInteresse.innerHTML += `
                <div class="item-interesse">
                    <img 
                        src='${getCaminhoTratado(`./_imagens/app_trocas/itens/${nomeImg}.jpg'`)}'
                        onclick="
                            contador('${item.valor.maximo}', '${nomeItemTratado}');
                            informacoesExtraOff(); 
                            informacoesExtra('${nomeItem}', '${item.valor.minimo ?? ""}', '${item.valor.maximo}', this)
                        " 
                        onmouseover="informacoesExtra('${nomeItem}', '${item.valor.minimo ?? ""}', '${item.valor.maximo}', this)"
                        onmouseout="informacoesExtraOff()" 
                    />
                    <div id='${nomeItemTratado}'>
                        <h4></h4>
                    </div>
                    <img 
                        class="botao-diminuir" 
                        id='botao-diminuir-${nomeItemTratado}' 
                        src='${getCaminhoTratado("./_imagens/app_trocas/botao-fechar-item.png")}'
                        onclick="acumuladorQnt('${nomeItemTratado}', '-${item.valor.maximo}')"
                    />
                </div>
            `;
            acumuladorItens.push({ id: nomeItemTratado, valor: 0 });
        });
        pessoa.podeTer.forEach((item) => {
            const nomeImg = getNomeItemSemAcentosEspacos(item.nomePtBr);
            const nomeItem =
                paginaEstaEmPortugues2
                ? item.nomePtBr
                : item.nomeEn;

            const nomeItemTratado = getNomeItemSemAcentosEspacos(nomeItem);

            displayItensPodeTer.innerHTML += `
                <div class="item-interesse">
                    <img 
                        src='${getCaminhoTratado(`./_imagens/app_trocas/itens/${nomeImg}.jpg`)}'
                        onclick="
                            contador('-${item.valor.maximo}', '${nomeItemTratado}'); 
                            informacoesExtraOff(); 
                            informacoesExtra('${nomeItem}', '${item.valor.minimo ?? ""}', '${item.valor.maximo}', this)
                        " 
                        onmouseover="informacoesExtra('${nomeItem}', '${item.valor.minimo ?? ""}', '${item.valor.maximo}', this)" 
                        onmouseout="informacoesExtraOff()"
                    />
                    <div id='${nomeItemTratado}'>
                        <h4></h4>
                    </div>
                    <img 
                        class="botao-diminuir" 
                        id='botao-diminuir-${nomeItemTratado}' 
                        src='${getCaminhoTratado("./_imagens/app_trocas/botao-fechar-item.png")}'
                        onclick="acumuladorQnt('${nomeItemTratado}', '${item.valor.maximo}')"
                    />
                </div>
            `;
            acumuladorItens.push({ id: nomeItemTratado, valor: 0 });
        });
        telaAtual = [`${nomePessoa}`, `${tipoNpc}`];

        mudancaTela("tela-3");  
    };
    setTimeout(delayAnimacaoAuxiliar, 950, tipoNPC, nomeNPC);
    delayAnimacaoAuxiliar2 = () => {
        tela3Div.style.transition="opacity 0.3s";
        adaptadorPrefixos2(tela3Div, "opacity 0.3s");
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
        const elementoH1 = document.querySelector(`div#${item.id} h4`);
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
    const elementoH1 = document.querySelector(`div#${idItem} h4`);
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
            telaAtual = "tela1";
            cardsDiv.classList.remove('flex-row');
            tituloPadrao.classList.remove("titulo-com-botao");
        break;
        case "tela-2":
            telaAtual = "tela2";
            resetClassesAnimacao();
            acumuladorItens = [];
            resetContador();
            imgNPCMobile.style.display="none";
            tela3Div.style.display="none";
            cardsDiv.style.display="flex"; 
            cardsDiv.classList.add('flex-row');
            tituloPadrao.style.display="block";
            mainDiv.classList.remove('tela-3-mobile');
            mainDiv.classList.remove("fundo-npc");
            divFundoEfeito.classList.remove('fundo-pessoa-off');
            tituloPadrao.classList.add("titulo-com-botao");
            cardsDiv.innerHTML = ``;
            displayItensInteresse.innerHTML =``;
            displayItensPodeTer.innerHTML =``;
            if (!mobile) {
                mainDiv.style.backgroundImage = `url(${getCaminhoTratado('_imagens/app_trocas/fundo_aplicativo.jpg')})`;
            }
        break;
        case "tela-3":
            mainDiv.classList.add('tela-3-mobile');
            cardsDiv.style.display="none"; 
            tituloPadrao.style.display="none";
            (!mobile) ? tela3Div.style.display="block" : tela3Div.style.display="flex";
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

function getNomeItemSemAcentosEspacos(nome) {
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
        audioPlayer.src = getCaminhoTratado("_audio/lixeira.mp3");
        audioPlayer.play();
    }
    else if (tipo === "add-item") {
        audioPlayer.src = getCaminhoTratado(`_audio/colocando_item${(Math.random() * 4 + 1).toFixed(0)}.mp3`);;
        audioPlayer.play();
    }
    else if (tipo === "rem-item") {
        audioPlayer.src = getCaminhoTratado(`_audio/tirando_item${(Math.random() * 2 + 1).toFixed(0)}.mp3`);
        audioPlayer.play();
    }
}

function preCarregamentoAPP() {
    const elementosPreLoadMobile = divPreLoadMobile.querySelectorAll('img');
    const elementosPreLoadDesktop = divPreLoadDesktop.querySelectorAll('img');
    if (!elementosPreLoadDesktop.length && resolucaoL2 > 800) {
        listaInfectados.forEach((infectado) => divPreLoadDesktop.innerHTML += `
            <img src='${getCaminhoTratado(`./_imagens/app_trocas/infectados/${infectado}.jpg`)}' />
            <img src='${getCaminhoTratado(`./_imagens/app_trocas/infectados/fundos/${infectado}_fundo.jpg`)}' />
        `);
        listaCriancas.forEach((crianca) => divPreLoadDesktop.innerHTML += `
            <img src='${getCaminhoTratado(`./_imagens/app_trocas/criancas/${crianca}.jpg`)}' />
            <img src='${getCaminhoTratado(`./_imagens/app_trocas/criancas/fundos/${crianca}_fundo.jpg`)}' />
        `);
        listaAdultos.forEach((adulto) => divPreLoadDesktop.innerHTML += `
            <img src='${getCaminhoTratado(`./_imagens/app_trocas/adultos/${adulto}.jpg`)}' />
            <img src='${getCaminhoTratado(`./_imagens/app_trocas/adultos/fundos/${adulto}_fundo.jpg`)}' />
        `);
        listaNomesImgItens.forEach((item) => divPreLoadDesktop.innerHTML += `
            <img src='${getCaminhoTratado(`./_imagens/app_trocas/itens/${item}.jpg`)}' />
        `);
    }
    else if (!elementosPreLoadMobile.length && resolucaoL2 <= 800) {
        listaInfectados.forEach((infectado) => divPreLoadMobile.innerHTML += `
            <img src='${getCaminhoTratado(`./_imagens/app_trocas/infectados/${infectado}.jpg`)}' />
        `);
        listaCriancas.forEach((crianca) => divPreLoadMobile.innerHTML += `
            <img src='${getCaminhoTratado(`./_imagens/app_trocas/criancas/${crianca}.jpg`)}' />
        `);
        listaAdultos.forEach((adulto) => divPreLoadDesktop.innerHTML += `
            <img src='${getCaminhoTratado(`./_imagens/app_trocas/adultos/${adulto}.jpg`)}' />
        `);
        listaNomesImgItens.forEach((item) => divPreLoadDesktop.innerHTML += `
            <img src='${getCaminhoTratado(`./_imagens/app_trocas/itens/${item}.jpg`)}' />
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
function adaptatividadeAPP() {
    switch(telaAtual) {
        case "tela1":
            mobile && mainDiv.removeAttribute('style');
        break;
        case "tela2":
            mobile && mainDiv.removeAttribute('style');
        break;
        default:
            if (!mobile) {
                imgNPCMobile.style.display="none";
                tela3Div.style.display=('block');
                mainDiv.classList.add("fundo-npc");
                mainDiv.style.backgroundImage=`url('${getCaminhoTratado(`_imagens/app_trocas/${(telaAtual[1])}/fundos/${telaAtual[0]}_fundo.jpg`)}')`;
            }
            else {
                imgNPCMobile.style.display="block";
                mainDiv.removeAttribute('style');
                mainDiv.classList.remove('fundo-npc');
                tela3Div.style.display=('flex');
            }
        break;
    }
}
function adaptadorPrefixos2(elemento, transition, transformacao, filtro) {
    if (transformacao && transformacao !== "") {
      elemento.style.MozTransform=transformacao;
      elemento.style.webkitTransform=transformacao;
      elemento.style.msTransform=transformacao;
      elemento.style.OTransform=transformacao;
    }
    if (filtro && filtro !== "") {
      elemento.style.MozFilter=filtro;
      elemento.style.webkitFilter=filtro;
      elemento.style.msFilter=filtro;
      elemento.style.OFilter=filtro;
    }
    if (transition && transition !== "") {
      elemento.style.MozTransition=transition;
      elemento.style.webkitTransition=transition;
      elemento.style.msTransition=transition;
      elemento.style.OTransition=transition;
    }
  }
// ------------------------ Informações Extra Desktop ------------------------ //
function informacoesExtra(nomeItem, vlrMinItem, vlrMaxItem, elemento) {
    if (resolucaoL2 < 801) {
        return;
    }
    nomeItem = (nomeItem.search("mais") !== -1) ? nomeItem.substring(0, nomeItem.search("mais")) + "(+)" : nomeItem;
    showInfoID = nomeItem + Math.random();
    setTimeout(informacoesExtraOn, 1200, nomeItem, vlrMinItem, vlrMaxItem, elemento, showInfoID);
}
const informacoesExtraOn = function(nomeItem, vlrMinItem, vlrMaxItem, elemento, id) {
    if (showInfoID === id) {
        balaoInfosTitulo.innerHTML = `${nomeItem}`;

        // Trata valores com variação a fim de mostrar em tela
        balaoInfosValor.innerHTML = `${
            (
                vlrMinItem 
                ? (vlrMinItem + "-") 
                : ""
            ) 
            + vlrMaxItem            
        }`;
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
        adaptadorPrefixos2(balaoInfosAdicionais, '', "scaleY(-1)");
        balaoInfosAdicionaisSubDiv.style.transform="scaleY(-1)";
        adaptadorPrefixos2(balaoInfosAdicionaisSubDiv, '', "scaleY(-1)");
    }
    else if (posicaoLeft >= containerRect.width * 0.5) {
        balaoInfosAdicionais.style.top=`calc(${posicaoTop + "px"} - ${(balaoRect.height * 0.8) + "px"})`;
        balaoInfosAdicionais.style.left=`calc(${posicaoLeft + "px"} - (25.8% + 21px))`;
        balaoInfosAdicionais.style.transform="scaleY(1)";
        adaptadorPrefixos2(balaoInfosAdicionais, '', "scaleY(1)");
        balaoInfosAdicionaisSubDiv.style.transform="scaleY(1)";
        adaptadorPrefixos2(balaoInfosAdicionaisSubDiv, '', "scaleY(1)");
    }
    else if (posicaoTop <= containerRect.height * 0.25) {
        balaoInfosAdicionais.style.top=`calc(${posicaoTop + "px"} + ${(balaoRect.height * 0.2) + "px"})`;
        balaoInfosAdicionais.style.left=`calc(${posicaoLeft + "px"} + ${elementoItem.width + "px"}`;
        balaoInfosAdicionais.style.transform="scale(-1)";
        adaptadorPrefixos2(balaoInfosAdicionais, '', "scale(-1)");
        balaoInfosAdicionaisSubDiv.style.transform="scale(-1)";
        adaptadorPrefixos2(balaoInfosAdicionaisSubDiv, '', "scale(-1)");
    }
    else {
        balaoInfosAdicionais.style.top=`calc(${posicaoTop + "px"} - ${(balaoRect.height * 0.8) + "px"})`;
        balaoInfosAdicionais.style.left=`calc(${posicaoLeft + "px"} + ${elementoItem.width + "px"}`;
        balaoInfosAdicionais.style.transform="scale(-1, 1)";
        adaptadorPrefixos2(balaoInfosAdicionais, '', "scale(-1, 1)");
        balaoInfosAdicionaisSubDiv.style.transform="scale(-1, 1)";
        adaptadorPrefixos2(balaoInfosAdicionaisSubDiv, '', "scale(-1, 1)");
    }
}