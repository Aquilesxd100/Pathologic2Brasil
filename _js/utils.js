function getCurrentPageLanguageCode() {
    const currentPageLanguageCode = 
        window.location.href
        .replace('/Pathologic2Brasil', '') // Github Pages
        .split("/")[3]
        .toUpperCase();

    switch (currentPageLanguageCode) {
        case LanguageEnum.English:
            return LanguageEnum.English
        case LanguageEnum.PortugueseBR: // Pages in portuguese doesn't have a language code in the URL
        default:
            return LanguageEnum.PortugueseBR     
    }
};

function getIsMobileScreen() {
   return window.innerWidth <= 800;
}

function animateElementClick(element, animationClassName) {
    element.classList.add(animationClassName);

    const animationDurationPropertyValue = getComputedStyle(element).animationDuration;

    var animationDurationMs = 
        animationDurationPropertyValue.indexOf('ms') != -1
        ? Number(animationDurationPropertyValue.replace('ms', ''))
        : Number(animationDurationPropertyValue.replace('s', '')) * 1000;

    setTimeout(
        function () {
            element.classList.remove(animationClassName);
        }, 
        animationDurationMs
    );
};