// |---------------------------| Latest Guides Carousel |--------------------------|	

const numberOfCarouselCards = document.querySelectorAll('div#cards-wrapper img').length;
var carouselDisplayPosition = 0;
var carouselTimeoutId = setTimeout(advanceCardGuidesCarouselAutomatically, 4000);

function showNextGuide(nextGuideButton) {
    animateElementClick(nextGuideButton, 'latest-guides-button-click-animation');

    const isMobileScreen = getIsMobileScreen();

    const isAlreadyShowingTheLastGuide = 
        carouselDisplayPosition >= (
            (numberOfCarouselCards - 1) // The Display Position starts at zero
            - (isMobileScreen ? 0 : 2)  // Mobile Screens show one guide at a time
        );                              // Desktop Screens show three guides at a time

    if (isAlreadyShowingTheLastGuide) {
        return;
    }

    // Resets the Carousel's automatic advance timing
    clearTimeout(carouselTimeoutId);
    carouselTimeoutId = setTimeout(advanceCardGuidesCarouselAutomatically, 4000);

    carouselDisplayPosition += 1;
    updateCarouselByPosition(carouselDisplayPosition);
};

function showPreviousGuide(previousGuideButton) {
    animateElementClick(previousGuideButton, 'latest-guides-button-click-animation');

    const isAlreadyShowingTheFirstGuide = carouselDisplayPosition == 0;

    if (isAlreadyShowingTheFirstGuide) {
        return;
    }

    // Resets the Carousel's automatic advance timing
    clearTimeout(carouselTimeoutId);
    carouselTimeoutId = setTimeout(advanceCardGuidesCarouselAutomatically, 4000);    

    carouselDisplayPosition -= 1;
    updateCarouselByPosition(carouselDisplayPosition);     
};

function advanceCardGuidesCarouselAutomatically() {
    const isMobileScreen = getIsMobileScreen();

    const isAlreadyShowingTheLastGuide = 
        carouselDisplayPosition >= (
            (numberOfCarouselCards - 1) // 
            - (isMobileScreen ? 0 : 2) //
        );  
        
    carouselDisplayPosition = 
        isAlreadyShowingTheLastGuide
        ? 0
        : (carouselDisplayPosition + 1);

    updateCarouselByPosition(carouselDisplayPosition);    

    carouselTimeoutId = setTimeout(advanceCardGuidesCarouselAutomatically, 4000);
};

function updateCarouselByPosition(carouselDisplayPosition) {
    const isMobileScreen = getIsMobileScreen();
    const cardsWrapper = document.getElementById('cards-wrapper');

    if (isMobileScreen) {
        cardsWrapper.style.right = 
            'calc(' +
                (90 * carouselDisplayPosition) + '%' +    // Width of each card 
                ' + ' +
                ((5 + 5) * carouselDisplayPosition) + '%' + // Margin Left and Right of each card
            ')'; 

        return;
    }
    
    cardsWrapper.style.right = 
        'calc(' +
            (33 * carouselDisplayPosition) + '%' +    // Width of each card
            ' - ' +                                   // exacly like it's
            (12 * carouselDisplayPosition) + 'rem' +  // on the CSS file
            ' + ' +
            ((0.5 + 0.5) * carouselDisplayPosition) + '%' + // Margin Left and Right of each card
        ')'; 
};

// |-----------------------------| Quick Access Panel |----------------------------|	

var selectedQuickAccessOptionIdMobile = null;

(function () {
    const isPageInPortuguese = getCurrentPageLanguageCode() == LanguageEnum.PortugueseBR;

    const quickAccessDescriptionDisplayParagraphElement = document.querySelector('div#description-display p');  

    quickAccessDescriptionDisplayParagraphElement.innerHTML = getQuickAccessDescriptionPlaceholder();  

    const quickAccessOptionsAnchorsElements = document.querySelectorAll('div#options-display a');

    for (var idx = 0; idx < quickAccessOptionsAnchorsElements.length; idx++) {
        // Desktop Hover (Also triggered by touch on mobile)
        quickAccessOptionsAnchorsElements[idx].addEventListener('mousemove', function(event) {

            quickAccessDescriptionDisplayParagraphElement.classList.add('showing-option-description');

            quickAccessDescriptionDisplayParagraphElement.innerHTML = getQuickAccessDescriptionByOptionId(event.currentTarget.id);
        });

        // Desktop Mouse Out
        quickAccessOptionsAnchorsElements[idx].addEventListener('mouseout', function() {

            quickAccessDescriptionDisplayParagraphElement.classList.remove('showing-option-description');

            quickAccessDescriptionDisplayParagraphElement.innerHTML = '';          
        });

        // Mobile Click
        quickAccessOptionsAnchorsElements[idx].addEventListener('click', function(event) {
            const isMobileScreen = getIsMobileScreen();

            if (isMobileScreen) {
                event.preventDefault(); // Prevent the <a> from directly redirecting the page on mobile screens

                quickAccessDescriptionDisplayParagraphElement.classList.remove('error-option-description');
                quickAccessDescriptionDisplayParagraphElement.classList.add('showing-option-description');

                selectedQuickAccessOptionIdMobile = event.currentTarget.id;
                quickAccessDescriptionDisplayParagraphElement.innerHTML = getQuickAccessDescriptionByOptionId(event.currentTarget.id);
            }
        });         
    }

    function getQuickAccessDescriptionByOptionId(quickAccessOptionId) {
        var description = '';

        switch (quickAccessOptionId) {
            case 'money-option':
                description =
                    isPageInPortuguese
                    ? 'Fique rico e cause inveja até mesmo nos Kain!'
                    : 'Get rich and make even the Kains jealous!';
            break;
            case 'shmowder-option':
                description =
                    isPageInPortuguese
                    ? 'Consiga todos os pozinzins escondidos e salve vidas!'
                    : 'Get all the hidden Shmowders and save lives!';
            break;
            case 'map-option':
                description =
                    isPageInPortuguese
                    ? 'Descubra todos os segredos da Estepe!'
                    : 'Find out all the secrets from the Steppe!';
            break;  
            case 'food-option':
                description =
                    isPageInPortuguese
                    ? 'Nunca mais passe fome!'
                    : 'Never be hungry again!';
            break;   
            case 'recipes-option':
                description =
                    isPageInPortuguese
                    ? 'Aprenda TUDO sobre a criação de Infusões e "Poções"!'
                    : 'Learn EVERYTHING about the brewing of tincture and "potions"!';
            break;     
            case 'combat-option':
                description =
                    isPageInPortuguese
                    ? 'Deixe de ser a caça e vire o caçador!'
                    : 'Stop being the prey and become the hunter!';
            break;                                             
        }

        return description;
    }     
})();

function getQuickAccessDescriptionPlaceholder() {
    const isPageInPortuguese = getCurrentPageLanguageCode() == LanguageEnum.PortugueseBR;
    const isMobileScreen = getIsMobileScreen();
    
    if (isPageInPortuguese) {
        return (
            isMobileScreen
                ? "Toque em cima de uma das opções para saber mais!"
                : "Passe o mouse por cima de uma das opções para saber mais!"
        );
    }

    return (
        isMobileScreen
            ? "Click on one of the options to learn more!"
            : "Hover over an option to learn more!"
    ); 
}

function openSelectedOptionLinkMobile(openSelectedOptionButton) {
    animateElementClick(openSelectedOptionButton, 'quick-access-mobile-button-click-animation');

    const isPageInPortuguese = getCurrentPageLanguageCode() == LanguageEnum.PortugueseBR;

    const quickAccessDescriptionDisplayElement = document.querySelector('div#description-display p');  

    if (selectedQuickAccessOptionIdMobile == null) {
        quickAccessDescriptionDisplayElement.classList.add('error-option-description');

        quickAccessDescriptionDisplayElement.innerHTML = 
            isPageInPortuguese
            ? 'Escolha uma das opções primeiro.'
            : 'Choose an option first.';

        return;
    }

    var selectedGuideLink = '';

    const quickAccessOptionsAnchorElements = document.querySelectorAll('div#options-display a');

    for (var idx = 0; idx < quickAccessOptionsAnchorElements.length; idx++) { 
        const optionAnchorElement = quickAccessOptionsAnchorElements[idx];

        if (optionAnchorElement.id === selectedQuickAccessOptionIdMobile) {
            selectedGuideLink = optionAnchorElement.href;
            break;
        }
    }       

    window.open(selectedGuideLink, '_self');
}

// |------------------------------| Resize Listener |------------------------------|	

window.addEventListener('resize', function () {
    // Resets the Carousel's automatic advance timer
    clearTimeout(carouselTimeoutId);
    carouselTimeoutId = setTimeout(advanceCardGuidesCarouselAutomatically, 4000);
    
    carouselDisplayPosition = 0;
    updateCarouselByPosition(carouselDisplayPosition);    
    
    selectedQuickAccessOptionIdMobile = null;

    const quickAccessDescriptionDisplayElement = document.querySelector('div#description-display p');   
    
    quickAccessDescriptionDisplayElement.classList.remove('error-option-description');
    quickAccessDescriptionDisplayElement.classList.remove('showing-option-description');
    quickAccessDescriptionDisplayElement.innerHTML = getQuickAccessDescriptionPlaceholder();
});