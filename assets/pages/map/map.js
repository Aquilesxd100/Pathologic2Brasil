// |------------------------| 📌 Selected Marker Summary 📌 |------------------------|

const MapMarkerEnum = {
    NightMerchant: 1,
    SecretStash: 2,
    ChildrenStash: 3,
    BloodyRoots: 4,
    HerbsZone: 5,
    ChildrenZone: 6
};

function showMarkerSummary(mapMarker, showMarkerSummaryButton) {
    animateElementClick(showMarkerSummaryButton, 'marker-option-click-animation');

    const markerSummaryArticleToShow = document.getElementById(getMarkerSummaryArticleId(mapMarker));
    const shownMarkerSummaryArticle = document.querySelector('article.selected-marker-summary');    

    const isSummaryAlreadyBeingShown = shownMarkerSummaryArticle === markerSummaryArticleToShow;

    if (isSummaryAlreadyBeingShown) {
        return;
    }    

    if (shownMarkerSummaryArticle !== null) {
        shownMarkerSummaryArticle.classList.remove('selected-marker-summary');
    }

    addClassToElementWithTransition(markerSummaryArticleToShow, 'selected-marker-summary')

    const markerSummarySectionHeader = document.querySelector('section#selected-marker-summary-section header');
    markerSummarySectionHeader.classList.add('marker-selected');

    const markerSummarySectionTitleElement = document.querySelector('#selected-marker-summary-section header h2');
    markerSummarySectionTitleElement.innerHTML = getMarkerTitle(mapMarker);

    scrollToMarkerSummary();
};

// Workaround to activate the transition even when the element has "display: none"
function addClassToElementWithTransition(element, className) {
    element.style.display = 'block';

    forceElementStylesUpdate(element);
    element.classList.add(className);

    element.style.display = '';
}

function scrollToMarkerSummary() {
    const markerSummarySectionHeader = document.querySelector('section#selected-marker-summary-section header');

    var scrollTargetPosition = markerSummarySectionHeader.getBoundingClientRect().top + window.pageYOffset;

    const isMobileScreen = getIsMobileScreen();

    if (isMobileScreen) { // The top bar stays fixed over the page while scrolling
        const topBarMobile = document.getElementById('top-bar-mobile');

        scrollTargetPosition -= topBarMobile.offsetHeight;
    }

    window.scrollTo(0, scrollTargetPosition);
};

function getMarkerSummaryArticleId(mapMarker) {
    switch (mapMarker) {
        case MapMarkerEnum.NightMerchant:
            return 'night-merchant-article';
        case MapMarkerEnum.SecretStash:
            return 'secret-stash-article';
        case MapMarkerEnum.ChildrenStash:
            return 'children-stash-article';
        case MapMarkerEnum.BloodyRoots:
            return 'blood-roots-article';
        case MapMarkerEnum.HerbsZone:
            return 'herb-zones-article';
        case MapMarkerEnum.ChildrenZone:
            return 'children-zones-article';
    }
};

function getMarkerTitle(mapMarker) {
    const isPageInPortuguese = getCurrentPageLanguageCode() == LanguageEnum.PortugueseBR;

    var markerName = '';

    switch (mapMarker) {
        case MapMarkerEnum.NightMerchant:
            markerName =
                isPageInPortuguese
                ? 'Mercador Noturno'
                : 'Dead Items Store';
        break;
        case MapMarkerEnum.SecretStash:
            markerName =
                isPageInPortuguese
                ? 'Depósitos Secretos'
                : 'Hidden Caches';
        break;
        case MapMarkerEnum.ChildrenStash:
            markerName =
                isPageInPortuguese
                ? 'Baús Escondidos'
                : 'Children Caches';
        break;
        case MapMarkerEnum.BloodyRoots:
            markerName =
                isPageInPortuguese
                ? 'Raízes Sangrentas'
                : 'Bloody Roots';
        break;
        case MapMarkerEnum.HerbsZone:
            markerName =
                isPageInPortuguese
                ? 'Zonas com Ervas'
                : 'Herb Zones';
        break;
        case MapMarkerEnum.ChildrenZone:
            markerName =
                isPageInPortuguese
                ? 'Zonas com Crianças'
                : 'Children Zones';
        break;
    }

    return markerName;
};

// |--------------------------| 🔍 Fullscreen Map Modal 🔍 |-------------------------|

function openFullscreenMapModal() {
    const isMobileScreen = getIsMobileScreen();

    if (!isMobileScreen) { // The map is only opened in fullscreen on mobile screens
        return;
    }

    document.documentElement.classList.add('scroll-lock');

    const mapFullscreenWrapper = document.getElementById('map-fullscreen-wrapper-mobile');
    mapFullscreenWrapper.classList.add('showing-fullscreen-map');
};

function closeFullscreenMapModal() {
    document.documentElement.classList.remove('scroll-lock');

    const mapFullscreenWrapper = document.getElementById('map-fullscreen-wrapper-mobile');
    mapFullscreenWrapper.classList.remove('showing-fullscreen-map');
};

// |----------------------------| 📐 Resize Listener 📐 |----------------------------|

var resizeTimeoutDisableTransition = null;

window.addEventListener('resize', function () {
    const mapFullscreenWrapper = document.getElementById('map-fullscreen-wrapper-mobile');

    if (resizeTimeoutDisableTransition != null) {
        clearTimeout(resizeTimeoutDisableTransition); // Doesn't accumulate timeouts
    }

    // Keeps the close button from sliding across the screen while the screen is resized
    mapFullscreenWrapper.classList.add('disable-transition');

    // Delay re-activating the transition to correctly disable it on resize
    resizeTimeoutDisableTransition = setTimeout(
        function() {
            mapFullscreenWrapper.classList.remove('disable-transition');
        }, 
        500
    );
});

// |---------------------| 🐞 Landscape Orientation Bug Fix 🐞 |---------------------|
// Sometimes when changing the orientation to Landscape the dynamic units bugged out 
// for the fullscreen view of the map

const landscapeMediaQuery = window.matchMedia('(orientation: landscape)');
var windowLandscapeHeightPx = window.visualViewport.width;

landscapeMediaQuery.addEventListener('change', function (_) {
    const isPortraitScreen = !landscapeMediaQuery.matches;

    const mapFullscreenWrapper = document.getElementById('map-fullscreen-wrapper-mobile');

    // Only the landscape height can be bugged
    if (isPortraitScreen) {
        windowLandscapeHeightPx = window.visualViewport.width; // Portrait values are reliable
        mapFullscreenWrapper.classList.remove('landscape-height-bug-fix');

        return;
    }

    // Bugged when the window height is bigger than expected
    const isScreenLandscapeHeightBugged = window.visualViewport.height > windowLandscapeHeightPx;

    if (isScreenLandscapeHeightBugged) {
        mapFullscreenWrapper.style.setProperty('--landscape-map-bug-fix-height', (windowLandscapeHeightPx - 80) + 'px');

        mapFullscreenWrapper.classList.add('landscape-height-bug-fix'); // The class uses the CSS custom property 
    } 
});
