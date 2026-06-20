function getCurrentPageLanguageCode() {
    const currentPageLanguageCode = 
        window.location.href
        .replace('/Pathologic2Brasil', '') // Github Pages
        .split("/")[3]
        .toUpperCase();

    switch (currentPageLanguageCode) {
        case LanguageEnum.English:
            return LanguageEnum.English
        break;
        case LanguageEnum.PortugueseBR: // Pages in portuguese doesn't have a language code in the URL
        default:
            return LanguageEnum.PortugueseBR
        break;        
    }
};

 /* Adaptador Prefixos CSS */
 function adaptadorPrefixos(elemento, transformacao, filtro, clipinset) {
    if (transformacao !== "") {
      document.getElementById(elemento).style.MozTransform=transformacao;
      document.getElementById(elemento).style.webkitTransform=transformacao;
      document.getElementById(elemento).style.msTransform=transformacao;
      document.getElementById(elemento).style.OTransform=transformacao;
    }
    if (filtro !== "") {
      document.getElementById(elemento).style.MozFilter=filtro;
      document.getElementById(elemento).style.webkitFilter=filtro;
      document.getElementById(elemento).style.msFilter=filtro;
      document.getElementById(elemento).style.OFilter=filtro;
    }
    if (clipinset !== "") {
      document.getElementById(elemento).style.MozClipPath=clipinset;
      document.getElementById(elemento).style.webkitClipPath=clipinset;
      document.getElementById(elemento).style.msClipPath=clipinset;
      document.getElementById(elemento).style.OClipPath=clipinset;
    }
}