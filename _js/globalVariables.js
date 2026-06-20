const LanguageEnum = {
    PortugueseBR: "PTBR",
    English: "EN"
};

const registeredGuideList = [
  { [LanguageEnum.PortugueseBR]: "combate",    [LanguageEnum.English]: "combat" }, 
  { [LanguageEnum.PortugueseBR]: "mapa",       [LanguageEnum.English]: "map" }, 
  { [LanguageEnum.PortugueseBR]: "comida",     [LanguageEnum.English]: "food" }, 
  { [LanguageEnum.PortugueseBR]: "podinzins",  [LanguageEnum.English]: "shmowders" }, 
  { [LanguageEnum.PortugueseBR]: "receitas",   [LanguageEnum.English]: "recipes" }, 
  { [LanguageEnum.PortugueseBR]: "dinheiro",   [LanguageEnum.English]: "money" }
];

const registeredPageList = registeredGuideList.concat([
  { [LanguageEnum.PortugueseBR]: "tudo",       [LanguageEnum.English]: "all" },
  { [LanguageEnum.PortugueseBR]: "trocas",     [LanguageEnum.English]: "trading" }, 
  { [LanguageEnum.PortugueseBR]: "resultados", [LanguageEnum.English]: "results" }
]);