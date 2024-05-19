const articleTodos = document.querySelector(".guias-todos");
const articlePesquisa = document.querySelector(".resultado-pesquisa");

// 'guiasRegistrados' é um array de objetos que contém o nome do guia em português e inglês
// declarado no index.js

// ------------------------------------------------------------------------------ //
// Página Todos os Guias //
if (articleTodos) {
    guiasRegistrados.forEach((guia) => {
      const nomeGuia = paginaEstaEmPortugues
        ? guia.nomePtBr
        : guia.nomeEn;

      const caminhoImgGuia = paginaEstaEmPortugues
        ? `_imagens/_guias/cards/${nomeGuia}.png`
        : `../_imagens/_guias/cardsEn/${nomeGuia}.png`;

        articleTodos.innerHTML += `
            <a href='${nomeGuia}.html' target='_self'>
                <img src="${caminhoImgGuia}" class="card"/>
            </a>
        `
    })
}
// Resultado Pesquisa //
if (articlePesquisa) {
    if(!window.location.search) {
        window.open("./index.html", "_self");
    }
    // --------------------------- Banco de Dados ----------------------- //
    const guiasComTags = [
        {
            nomePtBr: "combate",
            nomeEn: "combat",
            brTags: ["luta", "matar", "odong", "bandido", "briga", "soldado", "incendiário", "incendiario", "assassino", "stealth", "furtivo", "arma", "faca", "pistola", "revólver", "revolver", "rifle", "gazua", "eliminar", "stamina", "vigor", "morte", "sobreviver", "morrer", "morre", "combate", "vida", "saude", "saúde", "sangue", "ferir", "ferido", "soco", "socar", "facada", "bater", "atirar", "tiro", "desviar", "acertar"],
            enTags: ["fight", "kill", "odong", "bandit", "thief", "attack", "soldier", "incendiary", "arsonist", "assassin", "stealth", "weapon", "knife", "pistol", "gun", "revolver", "rifle", "lockpick", "eliminate", "stamina", "energy", "vigor", "death", "survival", "survive", "dying", "combat", "hp", "life", "live", "health", "blood", "hurt", "punch", "burglar", "hit", "shoot", "dodge"]
        },
        /*         economia: ["dinheiro", "moeda", "moedas", "rico", "grana", "ouro", "riqueza", "riquezas", "preço", "preços", "preco", "precos", "valor", "valores", "economia", "crise", "anel", "jóia", "joia", "anéis", "anel", "mercador", "vendedor", "mercante", "loja", "venda", "vender", "compra", "comprar", "mercado", "lucro", "barato", "caro", "desconto", "oferta", "demanda", "finança", "finanças", "estoque", "financa", "troca", "armazem", "armazém", "duplicar", "duplica", "metade", "dupar", "dup", "enriquecer", "colar", "pendante", "amuleto", "relógio", "relogio", "item", "itens", "mercearia", "farmacia", "farmácia", "alfaiate"], */
        {
            nomePtBr: "mapa",
            nomeEn: "map",
            brTags: ["mapa", "local", "localização", "localizacao", "localizacão", "localizaçao", "local", "erva", "ervas", "planta", "plantas", "secreto", "secretos", "segredo", "segredos", "escondido", "escondidos", "baú", "bau", "almas", "alma", "crianças", "criancas", "itens", "item", "mercador", "noite", "madrugada", "gps", "distrito", "distritos", "área", "area", "áreas", "zona", "zonas", "caminho", "entrada", "saída", "saida"],
            enTags: ["map", "local", "localization", "spot", "herb", "herbs", "plant", "plants", "secret", "secrets", "hidden", "chest", "cache", "soul", "half", "children", "child", "item", "items", "merchant", "seller", "night", "midnight", "gps", "district", "area", "zone", "zones", "way", "path", "entrance", "exit", "treasure", "kid", "kids"]
        },
        {
            nomePtBr: "comida",
            nomeEn: "food",
            brTags: ["comida", "fome", "energia", "vida", "saúde", "saude", "carne", "pão", "pao", "bife", "peixe", "mercador", "ticket", "tickets", "bilhete", "bilhetes", "papel", "bala", "doce", "loja", "estoque", "armazém", "mercado", "crise", "sobreviver", "sobrevivência", "sobrevivencia", "fruta", "frutas", "morrer", "morte", "mercearia"],
            enTags: ["food", "hungry", "hunger", "starve", "starving", "energy", "life", "health", "meat", "bread", "steak", "fish", "merchant", "seller", "ticket", "candy", "tickets", "paper", "store", "market", "stock", "warehouse", "crisis", "survival", "survive", "fruit", "fruits", "dying", "death", "grocery"]
        },
        {
            nomePtBr: "podinzins",
            nomeEn: "shmowders",
            brTags: ["crianças", "criança", "crianca", "criansa", "menino", "menina", "pozinho", "secreto", "escondido", "potinho", "caixinha", "caixa", "cura", "alma", "infantil", "meia", "praga", "peste", "remedio", "pilula", "pilulas", "pílulas", "pilula", "remédio", "misterio", "segredo", "panaceia", "raro", "raridade", "misterioso", "garota", "garoto", "baus", "báus", "bau"],
            enTags: ["children", "kid", "kids", "boy", "girl", "girls", "shmowders", "shmowder", "secret", "hidden", "box", "heal", "cure", "medicine", "soul", "childishness", "half", "plague", "sick", "sickness", "pill", "pills", "mistery", "mysterious", "chest", "chests", "cache", "caches", "treasure", "panacea"]
        },
        {
            nomePtBr: "receitas",
            nomeEn: "recipes",
            brTags: ["fome", "energia", "vida", "saúde", "saude", "ingrediente", "ingredientes", "poção", "pocao", "pocão", "receita", "receitas", "panaceia", "cura", "analgesico", "analgesicos", "analgésico", "analgésicos", "infusão", "infusões", "infusao", "infusoes", "erva", "ervas", "combinação", "combinacao", "combinações", "combinacoes", "fusão", "fusões", "plantas", "planta", "brilha", "barulho", "som", "remedio", "remédio", "nervos", "ossos", "sangue", "amarelo", "amarela", "branco", "branca", "laranja", "elixir", "imunidade", "bebida"],
            enTags: ["starve", "hungry", "hunger", "life", "health", "ingredient", "ingredients", "potion", "potions", "recipe", "recipes", "cure", "panacea", "cure", "medicine", "tinctures", "tinctures", "herb", "herbs", "combination", "fusion", "blood", "bone", "bones", "nerve", "nerves", "plant", "plants", "glowing", "glow", "white", "grey", "orange", "yellow", "drink", "imunity", "elixir", "sound", "analgesic"]
        },
        {
            nomePtBr: "dinheiro",
            nomeEn: "money",
            brTags: ["dinheiro", "moeda", "moedas", "rico", "grana", "ouro", "riqueza", "riquezas", "preço", "preços", "preco", "precos", "valor", "valores", "economia", "crise", "anel", "jóia", "joia", "anéis", "anel", "mercador", "vendedor", "mercante", "loja", "venda", "vender", "compra", "comprar", "mercado", "lucro", "barato", "caro", "desconto", "oferta", "demanda", "finança", "finanças", "estoque", "financa", "troca", "armazem", "armazém", "duplicar", "duplica", "metade", "dupar", "dup", "enriquecer", "colar", "pendante", "amuleto", "relógio", "relogio", "item", "itens", "mercearia", "farmacia", "farmácia", "alfaiate", "orgaos", "orgãos", "órgãos", "órgão", "orgao", "órgaos", "sangue", "coracao", "coração", "pulmão", "pulmao", "figado", "rim", "cerebro", "cérebro", "cirurgia", "ilegal", "farm", "farmar", "bandido", "bandidos", "assasino", "caçar", "caça", "cicatriz", "tabu", "bisturi", "cirurgião", "cirurgiao", "menku", "menkhu"],
            enTags: ["money", "coin", "coins", "currency", "rich", "cash", "wealth", "price", "prices", "value", "economy", "crisis", "ring", "jewelry", "merchant", "market", "grocery", "store", "seller", "profit", "sell", "buy", "offer", "cheap", "expensive", "finance", "watch", "half", "stock", "warehouse", "necklace", "organs", "black", "item", "items", "farm", "scar", "hunt", "scalpel", "assassin", "brain", "liver", "lung", "heart", "pharmacy", "kidney", "trade", "bandit", "robber", "steal", "stole", "enrich"]
        },
    ];
    // -------------------------------------------------------------------- //
    const resulParams = new URLSearchParams(window.location.search);
    const resultadoPesquisa = (
      resulParams.get(
        paginaEstaEmPortugues 
          ? "pesquisa"
          : "search"
      )
    ) ?? "".toLowerCase();
    const inputPesquisa = document.querySelector(`#input`);
    const inputPesquisaMobile = document.querySelector(`#input-mobile`);
    inputPesquisa.value = resultadoPesquisa;
    inputPesquisaMobile.value = resultadoPesquisa;
    let guiasEncontrados = [];
    for (guiaBanco of guiasComTags) {
        const temTagDoGuia = paginaEstaEmPortugues
          ? guiaBanco.brTags.some((tag) => resultadoPesquisa.indexOf(tag) !== -1)
          : guiaBanco.enTags.some((tag) => resultadoPesquisa.indexOf(tag) !== -1)
          
        if (temTagDoGuia) 
            guiasEncontrados.push(guiaBanco)
        
    }
    if (!guiasEncontrados.length) {
        articlePesquisa.innerHTML = `
            <h2>
            ${
              paginaEstaEmPortugues
                ? "Nenhum guia relacionado a pesquisa foi encontrado."
                : "No related guide was found."
            }
            </h2>
        `;
    }
    else {
        guiasEncontrados.forEach((guia) => {
          const nomeGuia = paginaEstaEmPortugues
            ? guia.nomePtBr
            : guia.nomeEn;

          const caminhoImgGuia = paginaEstaEmPortugues
            ? `_imagens/_guias/cards/${nomeGuia}.png`
            : `../_imagens/_guias/cardsEn/${nomeGuia}.png`;

            articlePesquisa.innerHTML += `
                <a href='${nomeGuia}.html' target='_self'>
                    <img src="${caminhoImgGuia}" class="card"/>
                </a>
            `
        })
    }
}

