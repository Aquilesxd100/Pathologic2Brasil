const articleTodos = document.querySelector(".guias-todos");
const articlePesquisa = document.querySelector(".resultado-pesquisa");
// ---------------------------- ADD GUIA ---------------------------------------- //
const guias = ["combate", "mapa", "comida", "podinzins", "receitas", "dinheiro"];
// ------------------------------------------------------------------------------ //
// Página Todos os Guias //
if (articleTodos) {
    guias.forEach((guia) => {
        articleTodos.innerHTML += `
        <a href='${guia}.html' target='_self'>
            <img src="_imagens/_guias/cards/${guia}.png" class="card"/>
        </a>
    `;
    })
}
// Resultado Pesquisa //
if (articlePesquisa) {
    if(!window.location.search) {
        window.open("./index.html", "_self");
    }
    // --------------------------- Banco de Dados ----------------------- //
    const bancoDados = [
        {
            guia: "combate",
            tags: ["luta", "matar", "odong", "bandido", "briga", "soldado", "incendiário", "incendiario", "assassino", "stealth", "furtivo", "arma", "faca", "pistola", "revólver", "revolver", "rifle", "gazua", "eliminar", "stamina", "vigor", "morte", "sobreviver", "morrer", "morre", "combate", "vida", "saude", "saúde", "sangue", "ferir", "ferido", "soco", "socar", "facada", "bater", "atirar", "tiro", "desviar", "acertar"]
        },
        /*         economia: ["dinheiro", "moeda", "moedas", "rico", "grana", "ouro", "riqueza", "riquezas", "preço", "preços", "preco", "precos", "valor", "valores", "economia", "crise", "anel", "jóia", "joia", "anéis", "anel", "mercador", "vendedor", "mercante", "loja", "venda", "vender", "compra", "comprar", "mercado", "lucro", "barato", "caro", "desconto", "oferta", "demanda", "finança", "finanças", "estoque", "financa", "troca", "armazem", "armazém", "duplicar", "duplica", "metade", "dupar", "dup", "enriquecer", "colar", "pendante", "amuleto", "relógio", "relogio", "item", "itens", "mercearia", "farmacia", "farmácia", "alfaiate"], */
        {
            guia: "mapa",
            tags: ["mapa", "local", "localização", "localizacao", "localizacão", "localizaçao", "local", "erva", "ervas", "planta", "plantas", "secreto", "secretos", "segredo", "segredos", "escondido", "escondidos", "baú", "bau", "almas", "alma", "crianças", "criancas", "itens", "item", "mercador", "noite", "madrugada", "gps", "distrito", "distritos", "área", "area", "áreas", "zona", "zonas", "caminho", "entrada", "saída", "saida"]
        },
        {
            guia: "comida",
            tags: ["comida", "fome", "energia", "vida", "saúde", "saude", "carne", "pão", "pao", "bife", "peixe", "mercador", "ticket", "tickets", "bilhete", "bilhetes", "papel", "bala", "doce", "loja", "estoque", "armazém", "mercado", "crise", "sobreviver", "sobrevivência", "sobrevivencia", "fruta", "frutas", "morrer", "morte", "mercearia"]
        },
        {
            guia: "podinzins",
            tags: ["crianças", "criança", "crianca", "criansa", "menino", "menina", "pozinho", "secreto", "escondido", "potinho", "caixinha", "caixa", "cura", "alma", "infantil", "meia", "praga", "peste", "remedio", "pilula", "pilulas", "pílulas", "pilula", "remédio", "misterio", "segredo", "panaceia", "raro", "raridade", "misterioso", "garota", "garoto", "baus", "báus", "bau"]
        },
        {
            guia: "receitas",
            tags: ["fome", "energia", "vida", "saúde", "saude", "ingrediente", "ingredientes", "poção", "pocao", "pocão", "receita", "receitas", "panaceia", "cura", "analgesico", "analgesicos", "analgésico", "analgésicos", "infusão", "infusões", "infusao", "infusoes", "erva", "ervas", "combinação", "combinacao", "combinações", "combinacoes", "fusão", "fusões", "plantas", "planta", "brilha", "barulho", "som", "remedio", "remédio", "nervos", "ossos", "sangue", "amarelo", "amarela", "branco", "branca", "laranja", "elixir", "imunidade", "bebida"]
        },
        {
            guia: "dinheiro",
            tags: ["dinheiro", "moeda", "moedas", "rico", "grana", "ouro", "riqueza", "riquezas", "preço", "preços", "preco", "precos", "valor", "valores", "economia", "crise", "anel", "jóia", "joia", "anéis", "anel", "mercador", "vendedor", "mercante", "loja", "venda", "vender", "compra", "comprar", "mercado", "lucro", "barato", "caro", "desconto", "oferta", "demanda", "finança", "finanças", "estoque", "financa", "troca", "armazem", "armazém", "duplicar", "duplica", "metade", "dupar", "dup", "enriquecer", "colar", "pendante", "amuleto", "relógio", "relogio", "item", "itens", "mercearia", "farmacia", "farmácia", "alfaiate", "orgaos", "orgãos", "órgãos", "órgão", "orgao", "órgaos", "sangue", "coracao", "coração", "pulmão", "pulmao", "figado", "rim", "cerebro", "cérebro", "cirurgia", "ilegal", "farm", "farmar", "bandido", "bandidos", "assasino", "caçar", "caça", "cicatriz", "tabu", "bisturi", "cirurgião", "cirurgiao", "menku", "menkhu"]
        },
    ];
    // -------------------------------------------------------------------- //
    const resulParams = new URLSearchParams(window.location.search);
    const resultadoPesquisa = resulParams.get(`resultados`);
    const inputPesquisa = document.querySelector(`#input`);
    const inputPesquisaMobile = document.querySelector(`#input-mobile`);
    inputPesquisa.value = resultadoPesquisa;
    inputPesquisaMobile.value = resultadoPesquisa;
    let resultadoGuias = [];
    for (guiasBanco of bancoDados) {
        const checkTags = guiasBanco.tags.some((tag) => resultadoPesquisa.search(tag) !== -1);
        if (checkTags === true) {
            resultadoGuias.push(guiasBanco.guia)
        }
    }
    if (resultadoGuias.length === 0) {
        articlePesquisa.innerHTML = `
            <h2>Nenhum guia relacionado a pesquisa foi encontrado.</h2>
        `;
    }
    else {
        resultadoGuias.forEach((guia) => {
            articlePesquisa.innerHTML += `
                <a href='${guia}.html' target='_self'>
                    <img src="_imagens/_guias/cards/${guia}.png" class="card"/>
                </a>
            `
        })
    }
}

