(function () {
	/**
	 * Checks whether a script with the specified file name is present on the current page.
	 * @param {string} scriptName - The script file name to search for (ex: "app.js").
	 * @returns {boolean} Returns `true` if a matching script is found; otherwise, `false`.
	 */	
	function isScriptPresent(scriptName) {
		const scriptsOnCurrentPage = document.querySelectorAll('script');

		for (var idx = 0; idx < scriptsOnCurrentPage.length; idx++) {
			if (scriptsOnCurrentPage[idx].src.split('/').pop() === scriptName) {
				return true
			}			
		}

		return false;
	}

	/**
	 * Checks whether a style page with the specified file name is present on the current page.
	 * @param {string} stylePageName - The style page file name to search for (ex: "main.css").
	 * @returns {boolean} Returns `true` if a matching style page is found; otherwise, `false`.
	 */	
	function isStylePagePresent(stylePageName) {
		const linksOnCurrentPage = document.querySelectorAll('link');

		for (var idx = 0; idx < linksOnCurrentPage.length; idx++) {
			const linkSrcFileName = linksOnCurrentPage[idx].href.split('/').pop();

			if (
				linksOnCurrentPage[idx].type === 'text/css'
				&& linkSrcFileName === stylePageName
			) {
				return true
			}			
		}

		return false;
	}	

	/**
	 * Utility wrapper for XMLHttpRequest operations.
	 */	
	const XmlHttpRequest = {
		/**
		 * Sends an asynchronous HTTP GET request.
		 *
		 * @param {string} url - The URL to send the request to.
		 * @param {Function} responseSuccessCallback - Callback executed when the request completes successfully, returning the response text.
		 *
		 * @example
		 * XmlHttpRequest.GET("/api/users", function (response) {
		 *     console.log(response);
		 * });
		 */		
		GET: 
			function (url, responseSuccessCallback) {
				const htmlRequest = new XMLHttpRequest();

				htmlRequest.open("GET", url);

				htmlRequest.onreadystatechange = function() { 
					if (this.readyState !== 4 || this.status !== 200)  {
						return;
					} // Only proceed after the response is loaded

					responseSuccessCallback(this.responseText);
				};

				htmlRequest.send();
			}
	}

	// Validate whether the global required scripts and style page for this component are present
	if (!isScriptPresent('globalVariables.js') || !isScriptPresent('utils.js') || !isStylePagePresent('main.css')) {
		throw Error(
			"The P2B-Template requires the following scripts and style page to be present in the DOM: 'globalVariables.js', 'utils.js' and 'main.css'. Please, make sure the scripts are included before the 'P2B-Template.js' script."
		);
	}

    const basePath = window.location.origin + '/P2B-Template';

	const resourcesToLoad = {
		htmlContent: null,
		stylesContent: null	
	};

	XmlHttpRequest.GET(
		getHTMLTemplatePath(),
		function (response) {
			resourcesToLoad.htmlContent = response;

			const isTemplateReadyToLoad = 
				resourcesToLoad.htmlContent != null && resourcesToLoad.stylesContent != null;

			if (isTemplateReadyToLoad) {
				loadP2BTemplate(resourcesToLoad.htmlContent, resourcesToLoad.stylesContent);
			}				
		} 
	);

	XmlHttpRequest.GET(
		(basePath + '/Styles.css'),
		function (response) {
			resourcesToLoad.stylesContent = response;

			const isTemplateReadyToLoad = 
				resourcesToLoad.htmlContent != null && resourcesToLoad.stylesContent != null;

			if (isTemplateReadyToLoad) {
				loadP2BTemplate(resourcesToLoad.htmlContent, resourcesToLoad.stylesContent);
			}				
		} 
	);	 

	/**
	 * Loads the P2B Template.
	 * @param {string} htmlContent - The HTML content of the Template.
	 * @param {string} stylesContent - The Style content of the Template.
	 */		
	function loadP2BTemplate(htmlContent, stylesContent) {
		const templateElement = createP2BTemplate(htmlContent, stylesContent);

		const currentPagePlaceholderElement = document.querySelector("p2b-template");
		const currentPageElements = [];
		for (var idx = 0; idx < currentPagePlaceholderElement.children.length; idx++) {
			currentPageElements.push(currentPagePlaceholderElement.children[idx])
		}		

		const templateMainElement = templateElement.querySelector("main");

		// Copy the Current Page content to the New Template
		for (var idx = 0; idx < currentPageElements.length; idx++) {
			templateMainElement.appendChild(currentPageElements[idx]);
		}

		// Replace the Placeholder Template with the real one
		currentPagePlaceholderElement.parentNode.replaceChild(templateElement, currentPagePlaceholderElement);
	}    

	/**
	 * Creates a new P2B Template with its own stylesheet and script.
	 * @param {string} htmlContent - The HTML content of the Template.
	 * @param {string} stylesContent - The Style content of the Template.
	 * @return {HTMLElement} The created template element.
	 */	
	function createP2BTemplate(htmlContent, stylesContent) {
		const templateElement = document.createElement("p2b-template");

		// Fills the template resource path placeholders of images, fonts, etc...
		stylesContent = stylesContent.replace(/{BASE-PATH}/g, basePath);

		// HTML Content
		templateElement.innerHTML = htmlContent;

		// Styles
		const styles = document.createElement("style");
		styles.innerHTML = stylesContent;

		templateElement.appendChild(styles);
		
		// Script
		const script = document.createElement("script");
		script.src = basePath + "/Script.js";
		
		templateElement.appendChild(script);

		return templateElement;
	} 
    
	/**
	 * Gets the path for the template based on the page language.
	 * @return {string} The path for the template.
	 */
	function getHTMLTemplatePath() {
		var path = basePath;

		const currentPageLanguage = getCurrentPageLanguageCode();

		switch (currentPageLanguage) {
			case LanguageEnum.English:
				path += "/EN-Index.html"
			break;
			case LanguageEnum.PortugueseBR:
				path += "/PTBR-Index.html"
			break;			
		}

		return path;
	} 
})();