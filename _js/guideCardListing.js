/* Used in the Results Page and All Guides to list the matching guides */
(function () {
    const isAllGuidesPage = 
        window.location.href.indexOf('/tudo') != -1 
        || window.location.href.indexOf('/all') != -1;

    const currentPageLanguageCode = getCurrentPageLanguageCode();
    const isPageInPortuguese = currentPageLanguageCode === LanguageEnum.PortugueseBR;

    // 'registeredGuidesList' is an array of guides declared in the globalVariables.js file

    const registeredGuidesCurrentLanguage =
        registeredGuidesList.filter(function (guide) {
            return guide.languageCode === currentPageLanguageCode;
        })    

    // ------------------------------------------------------------------------------ //
    // All Guides Page //
    // ------------------------------------------------------------------------------ //
    if (isAllGuidesPage) {
        const allGuidesContainer = document.getElementById('guides-cards-wrapper');

        for (var idx = 0; idx < registeredGuidesCurrentLanguage.length; idx++) {
            const guideName = registeredGuidesCurrentLanguage[idx].name;                  

            const guideImgPath = 
                isPageInPortuguese
                ? '_imagens/_guias/cards/' + guideName + '.png'
                : '../_imagens/_guias/cardsEn/' + guideName + '.png';

            allGuidesContainer.innerHTML += 
                "<a href='" + guideName + ".html' target='_self'>" +
                    "<img src='" + guideImgPath + "' class='card'/>" +
                "</a>";                                   
        }

        return;
    }

    // ------------------------------------------------------------------------------ //
    // Search Result Page //
    // ------------------------------------------------------------------------------ //
    if (!window.location.search) { // Redirect the user to the main page if there is no search query
        window.open('./index.html', '_self');
    }

    // -------------------------------------------------------------------- //
    const searchValue = 
        window.location.search.replace(
            (isPageInPortuguese ? '?pesquisa=' : '?search='), 
            ''
        );

    const foundGuides = [];

    for (var idx = 0; idx < registeredGuidesCurrentLanguage.length; idx++) {
        const guide = registeredGuidesCurrentLanguage[idx];

        const hasAMatchingTag = 
            guide.tags.filter(
                function (tag) { 
                    return tag.indexOf(searchValue) !== -1 
                }
            ).length > 0;
        
        if (hasAMatchingTag) {
            foundGuides.push(guide)      
        }                   
    }    

    const searchResultContainer = document.getElementById('guides-cards-wrapper');

    if (!foundGuides.length) {
        searchResultContainer.innerHTML = 
            '<p>' + 
            (
                isPageInPortuguese
                ? 'Nenhum guia relacionado a pesquisa foi encontrado.'
                : 'No related guide was found.' 
            ) +
            '</p>';
    }
    else {
        for (var idx = 0; idx < foundGuides.length; idx++) {
            const guideName = foundGuides[idx].name;                  

            const guideImgPath = 
                isPageInPortuguese
                ? '_imagens/_guias/cards/' + guideName + '.png'
                : '../_imagens/_guias/cardsEn/' + guideName + '.png';


            searchResultContainer.innerHTML +=
                "<a href='" + guideName + ".html' target='_self'>" +
                    "<img src='" + guideImgPath + "' class='card'/>" +
                "</a>";                                   
        }
    }
})()