// |-----------------------------| Utility Functions |-----------------------------|	

function getIsMobileScreen() {
   return window.innerWidth <= 800;
}

// Force the browser to apply the element's current styles.
// This prevents bugs when working with 'transitions' and 'display: none'.
function forceElementStylesUpdate(element) {
    element.offsetHeight;
}

function animateElementClick(element, animationClassName) {
    element.classList.add(animationClassName);

    const animationDurationPropertyValue = getComputedStyle(element).animationDuration;

    var animationDurationMs = 
        animationDurationPropertyValue.includes('ms')
        ? Number(animationDurationPropertyValue.replace('ms', ''))
        : Number(animationDurationPropertyValue.replace('s', '')) * 1000;

    setTimeout(
        function () {
            element.classList.remove(animationClassName);
        }, 
        animationDurationMs
    );
};

// |------------------------------| Language Change |------------------------------|	

function changePageLanguageTo(codeLanguageToSwitchTo) {
    const currentPageLanguageCode = getCurrentPageLanguageCode();

    if (currentPageLanguageCode === codeLanguageToSwitchTo) return;

    const currentPageQueries = window.location.search;

    const currentUrl = 
        window.location.href
            .replace(currentPageQueries, '') // Remove queries to prevent bugs
            .replace('index.html', ''); // Remove index.html to prevent bugs

    const currentPageName = currentUrl.split('/').pop().replace('.html', ''); // https://aquilesxd100.github.io/Pathologic2Brasil/en/results.html

    const currentPage = 
        registeredPagesList.filter(
            function (page) {
                return page.name === currentPageName;
            }
        )[0];

    const pageToSwitchTo = 
        registeredPagesList.filter(
            function (page) {
                return (
                    page.type === currentPage?.type
                    && page.languageCode === codeLanguageToSwitchTo
                );
            }
        )[0];           

    const isHomePage = !currentPage;

    const baseUrlEndIndex =
        currentPageLanguageCode === LanguageEnum.PortugueseBR // The Portuguese version doesn't include a language code in the URL
        ? 
            isHomePage 
            ? currentUrl.length - 1
            : currentUrl.indexOf('/' + currentPage?.name) 
        : currentUrl.indexOf('/' + currentPageLanguageCode.toLowerCase());

    // Creation of Url to Redirect

    const baseUrl = currentUrl.substring(0, baseUrlEndIndex);

    const languageCodeUrlSegment = 
        codeLanguageToSwitchTo === LanguageEnum.PortugueseBR
        ? ''
        : '/' + codeLanguageToSwitchTo.toLowerCase();

    const pageUrlSegment = 
        isHomePage
        ? ''
        : '/' + pageToSwitchTo?.name + '.html';

    const queriesUrlSegment = 
        currentPageQueries !== ''
        ? 
            codeLanguageToSwitchTo === LanguageEnum.PortugueseBR
            ? currentPageQueries.replace('search', 'pesquisa')
            : currentPageQueries.replace('pesquisa', 'search')
        : '';
    
    const urlToRedirect = 
        (baseUrl + languageCodeUrlSegment + pageUrlSegment + queriesUrlSegment);

    window.location.href = urlToRedirect;
};

// |------------------------------| Top Bar Mobile |-----------------------------|	

(function () {
    const header = document.querySelector('header');
    const topBarMobile = document.getElementById("top-bar-mobile");
    
    function updateTopBarMobilePosition() {
        const topBarPosition = 
            header.offsetHeight - getComputedStyle(topBarMobile).marginTop.replace('px', '') - topBarMobile.offsetHeight;
        
        const hasUserScrolledPastTopBar = window.pageYOffset >= topBarPosition;   

        hasUserScrolledPastTopBar
        ? header.classList.add('top-bar-mobile-fixed')
        : header.classList.remove('top-bar-mobile-fixed');
    }

    var isMobileScreen = getIsMobileScreen();
    if (isMobileScreen) {
        window.addEventListener("scroll", updateTopBarMobilePosition, { passive: true });

        updateTopBarMobilePosition();
    }

    window.addEventListener('resize', function () {
        isMobileScreen = getIsMobileScreen();

        isMobileScreen
        ? window.addEventListener("scroll", updateTopBarMobilePosition, { passive: true })
        : window.removeEventListener("scroll", updateTopBarMobilePosition);

        if (isMobileScreen) {
            window.addEventListener("scroll", updateTopBarMobilePosition, { passive: true }); // It doesn't accumulate listeners
            updateTopBarMobilePosition();
        } else {
            window.removeEventListener("scroll", updateTopBarMobilePosition, { passive: true });
        }
    })
})();

// |-------------------------------| Menu Mobile |-------------------------------|	

function openMenuMobile(openMenuMobileButton) {
    const menuMobileWrapper = document.getElementById('menu-mobile-wrapper');

    // Animate the Close Button and the Wrapper through this class
    menuMobileWrapper.classList.add('menu-mobile-open'); 
        
    animateElementClick(openMenuMobileButton, 'open-menu-mobile-button-click-animation');
};

function closeMenuMobile() {
    const menuMobileWrapper = document.getElementById('menu-mobile-wrapper');

    // Animate the Close Button and the Wrapper through this class
    menuMobileWrapper.classList.remove('menu-mobile-open');
};

function showHideMoreOptionsMenuMobile(showHideButton) {
    const isMoreOptionsMenuOpen = 
        showHideButton.classList.contains('more-mobile-menu-open');

    isMoreOptionsMenuOpen
    ? showHideButton.classList.remove('more-mobile-menu-open')
    : showHideButton.classList.add('more-mobile-menu-open');

    animateElementClick(showHideButton, 'navigation-button-mobile-click-animation')    
};

// |------------------------------| Search System |------------------------------|	

function showHideDesktopSearchBar() {
    const isSearchBarClosed = document.querySelector('.search-bar-closed') !== null;

    const searchBarWrapper = document.getElementById('search-bar-wrapper-desktop');

    if (isSearchBarClosed) {
        searchBarWrapper.classList.remove('search-bar-closed');
    } else {
        const searchInput = document.querySelector('#search-input-desktop');
        searchInput.value = '';

        searchBarWrapper.classList.add('search-bar-closed');
    }
};

(function () {
    const currentPageLanguageCode = getCurrentPageLanguageCode();
    const currentPageSearchParams = new URL(document.location.toString()).searchParams;

    const searchInputDesktop = document.querySelector('#search-input-desktop');
    const searchInputMobile = document.querySelector('#search-input-mobile');   
    
    // Fill the search inputs values with the search param
    const searchQueryValue = 
        currentPageLanguageCode == LanguageEnum.PortugueseBR
        ? currentPageSearchParams.get('pesquisa')
        : currentPageSearchParams.get('search')

    if (searchQueryValue?.length) {
        const searchBarWrapper = document.getElementById('search-bar-wrapper-desktop'); 

        // Open the search bar without triggering the transition
        searchBarWrapper.classList.add('disable-transition');
        searchBarWrapper.classList.remove('search-bar-closed');  

        forceElementStylesUpdate(searchBarWrapper);
        
        searchBarWrapper.classList.remove('disable-transition');

        // Set the search input values
        searchInputDesktop.value = searchQueryValue;
        searchInputMobile.value = searchQueryValue;        
    }

    // Keep both input values lowercase and ensure they have the same value
    document.querySelectorAll('#search-input-desktop, #search-input-mobile').forEach(
        function (input) {
            input.addEventListener('input', function (event) {                
                const updatedInputValue = event.currentTarget.value.toLowerCase();

                searchInputDesktop.value = updatedInputValue;
                searchInputMobile.value = updatedInputValue;
            });
        }
    );    
})();

function search(event) {
    const isDesktopScreen = !getIsMobileScreen();

    // The desktop search button shouldn't work when it's closed
    const isDesktopAndSearchBarIsClosed = 
        isDesktopScreen
        && document.querySelector('.search-bar-closed') !== null;

    if (!isDesktopAndSearchBarIsClosed) {
        isDesktopScreen
        ? animateElementClick(event.currentTarget, 'search-button-desktop-click-animation')
        : animateElementClick(event.currentTarget, 'search-button-mobile-click-animation');       
    }    

    const searchInput = event.currentTarget.parentElement.querySelector('input');
    const isInputEmpty = !searchInput.value.trim().length;

    if (isDesktopAndSearchBarIsClosed || isInputEmpty) {
        event.preventDefault();
    }
};

// |--------------------------| Privacy Notice Modal |---------------------------|

(function () {
    if (!localStorage.getItem("userReceivedPrivacyNotice")) {
        const privacyNoticeModalDiv = document.getElementById('privacy-notice-modal');

        privacyNoticeModalDiv.classList.remove('hide');
      
        forceElementStylesUpdate(privacyNoticeModalDiv);

        privacyNoticeModalDiv.classList.add('show-privacy-notice');       
    }
})();

function closePrivacyModal() {
    localStorage.setItem('userReceivedPrivacyNotice', 'True');

    const privacyNoticeModalDiv = document.getElementById('privacy-notice-modal');

    privacyNoticeModalDiv.classList.remove('show-privacy-notice');

    setTimeout(
        function() {
            privacyNoticeModalDiv.classList.add('hide');
        }, 
        800
    );
};