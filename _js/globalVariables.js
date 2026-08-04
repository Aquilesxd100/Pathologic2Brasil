const LanguageEnum = {
    PortugueseBR: "PTBR",
    English: "EN"
};

const PageTypeEnum = {
    Combat: 1,
    Map: 2,
    Food: 3,
    Shmowders: 4,
    Recipes: 5,
    Money: 6,

    All: 7,
    Trading: 8,
    Results: 9
};

const registeredGuidesList = [
    { type: PageTypeEnum.Combat, languageCode: LanguageEnum.PortugueseBR, name: "combate", tags: ["luta", "matar", "odong", "bandido", "briga", "soldado", "incendiário", "incendiario", "assassino", "stealth", "furtivo", "arma", "faca", "pistola", "revólver", "revolver", "rifle", "gazua", "eliminar", "stamina", "vigor", "morte", "sobreviver", "morrer", "morre", "combate", "vida", "saude", "saúde", "sangue", "ferir", "ferido", "soco", "socar", "facada", "bater", "atirar", "tiro", "desviar", "acertar"] },
    { type: PageTypeEnum.Combat, languageCode: LanguageEnum.English, name: "combat", tags: ["fight", "kill", "odong", "bandit", "thief", "attack", "soldier", "incendiary", "arsonist", "assassin", "stealth", "weapon", "knife", "pistol", "gun", "revolver", "rifle", "lockpick", "eliminate", "stamina", "energy", "vigor", "death", "survival", "survive", "dying", "combat", "hp", "life", "live", "health", "blood", "hurt", "punch", "burglar", "hit", "shoot", "dodge"] },

    { type: PageTypeEnum.Map, languageCode: LanguageEnum.PortugueseBR, name: "mapa", tags: ["mapa", "local", "localização", "localizacao", "localizacão", "localizaçao", "local", "erva", "ervas", "planta", "plantas", "secreto", "secretos", "segredo", "segredos", "escondido", "escondidos", "baú", "bau", "almas", "alma", "crianças", "criancas", "itens", "item", "mercador", "noite", "madrugada", "gps", "distrito", "distritos", "área", "area", "áreas", "zona", "zonas", "caminho", "entrada", "saída", "saida"] },
    { type: PageTypeEnum.Map, languageCode: LanguageEnum.English, name: "map", tags: ["map", "local", "localization", "spot", "herb", "herbs", "plant", "plants", "secret", "secrets", "hidden", "chest", "cache", "soul", "half", "children", "child", "item", "items", "merchant", "seller", "night", "midnight", "gps", "district", "area", "zone", "zones", "way", "path", "entrance", "exit", "treasure", "kid", "kids"] },

    { type: PageTypeEnum.Food, languageCode: LanguageEnum.PortugueseBR, name: "comida", tags: ["comida", "fome", "energia", "vida", "saúde", "saude", "carne", "pão", "pao", "bife", "peixe", "mercador", "ticket", "tickets", "bilhete", "bilhetes", "papel", "bala", "doce", "loja", "estoque", "armazém", "mercado", "crise", "sobreviver", "sobrevivência", "sobrevivencia", "fruta", "frutas", "morrer", "morte", "mercearia"] },
    { type: PageTypeEnum.Food, languageCode: LanguageEnum.English, name: "food", tags: ["food", "hungry", "hunger", "starve", "starving", "energy", "life", "health", "meat", "bread", "steak", "fish", "merchant", "seller", "ticket", "candy", "tickets", "paper", "store", "market", "stock", "warehouse", "crisis", "survival", "survive", "fruit", "fruits", "dying", "death", "grocery"] },

    { type: PageTypeEnum.Shmowders, languageCode: LanguageEnum.PortugueseBR, name: "podinzins", tags: ["crianças", "criança", "crianca", "criansa", "menino", "menina", "pozinho", "secreto", "escondido", "potinho", "caixinha", "caixa", "cura", "alma", "infantil", "meia", "praga", "peste", "remedio", "pilula", "pilulas", "pílulas", "pilula", "remédio", "misterio", "segredo", "panaceia", "raro", "raridade", "misterioso", "garota", "garoto", "baus", "báus", "bau"] },
    { type: PageTypeEnum.Shmowders, languageCode: LanguageEnum.English, name: "shmowders", tags: ["children", "kid", "kids", "boy", "girl", "girls", "shmowders", "shmowder", "secret", "hidden", "box", "heal", "cure", "medicine", "soul", "childishness", "half", "plague", "sick", "sickness", "pill", "pills", "mistery", "mysterious", "chest", "chests", "cache", "caches", "treasure", "panacea"] },

    { type: PageTypeEnum.Recipes, languageCode: LanguageEnum.PortugueseBR, name: "receitas", tags: ["fome", "energia", "vida", "saúde", "saude", "ingrediente", "ingredientes", "poção", "pocao", "pocão", "receita", "receitas", "panaceia", "cura", "analgesico", "analgesicos", "analgésico", "analgésicos", "infusão", "infusões", "infusao", "infusoes", "erva", "ervas", "combinação", "combinacao", "combinações", "combinacoes", "fusão", "fusões", "plantas", "planta", "brilha", "barulho", "som", "remedio", "remédio", "nervos", "ossos", "sangue", "amarelo", "amarela", "branco", "branca", "laranja", "elixir", "imunidade", "bebida"] },
    { type: PageTypeEnum.Recipes, languageCode: LanguageEnum.English, name: "recipes", tags: ["starve", "hungry", "hunger", "life", "health", "ingredient", "ingredients", "potion", "potions", "recipe", "recipes", "cure", "panacea", "cure", "medicine", "tinctures", "tinctures", "herb", "herbs", "combination", "fusion", "blood", "bone", "bones", "nerve", "nerves", "plant", "plants", "glowing", "glow", "white", "grey", "orange", "yellow", "drink", "imunity", "elixir", "sound", "analgesic"] },

    { type: PageTypeEnum.Money, languageCode: LanguageEnum.PortugueseBR, name: "dinheiro", tags: ["dinheiro", "moeda", "moedas", "rico", "grana", "ouro", "riqueza", "riquezas", "preço", "preços", "preco", "precos", "valor", "valores", "economia", "crise", "anel", "jóia", "joia", "anéis", "anel", "mercador", "vendedor", "mercante", "loja", "venda", "vender", "compra", "comprar", "mercado", "lucro", "barato", "caro", "desconto", "oferta", "demanda", "finança", "finanças", "estoque", "financa", "troca", "armazem", "armazém", "duplicar", "duplica", "metade", "dupar", "dup", "enriquecer", "colar", "pendante", "amuleto", "relógio", "relogio", "item", "itens", "mercearia", "farmacia", "farmácia", "alfaiate", "orgaos", "orgãos", "órgãos", "órgão", "orgao", "órgaos", "sangue", "coracao", "coração", "pulmão", "pulmao", "figado", "rim", "cerebro", "cérebro", "cirurgia", "ilegal", "farm", "farmar", "bandido", "bandidos", "assasino", "caçar", "caça", "cicatriz", "tabu", "bisturi", "cirurgião", "cirurgiao", "menku", "menkhu"] },
    { type: PageTypeEnum.Money, languageCode: LanguageEnum.English, name: "money", tags: ["money", "coin", "coins", "currency", "rich", "cash", "wealth", "price", "prices", "value", "economy", "crisis", "ring", "jewelry", "merchant", "market", "grocery", "store", "seller", "profit", "sell", "buy", "offer", "cheap", "expensive", "finance", "watch", "half", "stock", "warehouse", "necklace", "organs", "black", "item", "items", "farm", "scar", "hunt", "scalpel", "assassin", "brain", "liver", "lung", "heart", "pharmacy", "kidney", "trade", "bandit", "robber", "steal", "stole", "enrich"] }
];

const registeredPagesList = registeredGuidesList.concat([
    { type: PageTypeEnum.All, languageCode: LanguageEnum.PortugueseBR, name: "tudo" },
    { type: PageTypeEnum.All, languageCode: LanguageEnum.English, name: "all" },

    { type: PageTypeEnum.Trading, languageCode: LanguageEnum.PortugueseBR, name: "trocas" },
    { type: PageTypeEnum.Trading, languageCode: LanguageEnum.English, name: "trading" },

    { type: PageTypeEnum.Results, languageCode: LanguageEnum.PortugueseBR, name: "resultados" },
    { type: PageTypeEnum.Results, languageCode: LanguageEnum.English, name: "results" }
]);