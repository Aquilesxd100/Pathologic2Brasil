// |--------------------------| 💊 Painkiller Rotation Button 💊 |------------------------|

var painkillerCombinationsRotationTimeoutId = null;

function playPausePainkillerCombinationsRotation(playPauseButton) {
    animateElementClick(playPauseButton, 'painkiller-play-pause-button-click-animation');

    playPauseButton.classList.toggle('paused-rotation');

    clearTimeout(painkillerCombinationsRotationTimeoutId);

    const rotationShouldPlay = document.querySelector('button#painkiller-play-pause-button.paused-rotation') == null;

    if (rotationShouldPlay) {
        painkillerCombinationsRotationTimeoutId = setTimeout(rotatePainkillerCombination, 2000);
    }
};

(function () {
    const TinctureEnum = {
        Yas: 0,
        Medrel: 1,
        Zurkh: 2
    };

    const OrganEnum = {
        Kidney: 0,
        Liver: 1,
        Heart: 2,
        Brain: 3,
        Blood: 4
    };

    const isPageInPortuguese = getCurrentPageLanguageCode() == LanguageEnum.PortugueseBR;    

    function getImgPathByFileName(fileName) {
        const basePath =
            isPageInPortuguese
            ? './assets/shared/img/items/'
            : '../assets/shared/img/items/';

        return basePath + fileName + '.jpg';
    };

    function getItemName(item) {
        return isPageInPortuguese ? item.namePtBr : item.nameEn;
    };    

// |-------------------------| 🧪 Recipe/Combination Items 🧪 |---------------------------|

    const tincturesList = [
        { type: TinctureEnum.Yas, fileName: 'yas', namePtBr: 'Infusão "Yas"', nameEn: '"Yas" Tincture' },
        { type: TinctureEnum.Medrel, fileName: 'medrel', namePtBr: 'Infusão "Medrel"', nameEn: '"Medrel" Tincture' },
        { type: TinctureEnum.Zurkh, fileName: 'zurkh', namePtBr: 'Infusão "Zurkh"', nameEn: '"Zurkh" Tincture' }
    ];

    const healthyOrgansList = [
        { type: OrganEnum.Kidney, fileName: 'rim', namePtBr: 'Rim', nameEn: 'Kidney' },
        { type: OrganEnum.Liver, fileName: 'figado', namePtBr: 'Fígado', nameEn: 'Liver' },
        { type: OrganEnum.Heart, fileName: 'coracao', namePtBr: 'Coração', nameEn: 'Heart' },
        { type: OrganEnum.Brain, fileName: 'cerebro', namePtBr: 'Cérebro', nameEn: 'Brain' },
        { type: OrganEnum.Blood, fileName: 'sangue', namePtBr: 'Sangue', nameEn: 'Blood' }
    ]; 

    const painkillersList = [
        { tinctureType: TinctureEnum.Yas, fileName: 'analgesico-yas', namePtBr: 'Analgésico "Yas"', nameEn: '"Yas" Painkiller' },
        { tinctureType: TinctureEnum.Medrel, fileName: 'analgesico-medrel', namePtBr: 'Analgésico "Medrel"', nameEn: '"Medrel" Painkiller' },
        { tinctureType: TinctureEnum.Zurkh, fileName: 'analgesico-zurkh', namePtBr: 'Analgésico "Zurkh"', nameEn: '"Zurkh" Painkiller' }
    ];    

    const commonHerbsList = [
        { fileName: 'blacktwyre', namePtBr: 'Twyre Negra', nameEn: 'Black Twyre' },
        { fileName: 'bloodtwyre', namePtBr: 'Twyre Sangrenta', nameEn: 'Blood Twyre' },
        { fileName: 'twyre', namePtBr: 'Twyre Marrom', nameEn: 'Brown Twyre' }
    ];

    const rareHerbsList = [
        { fileName: 'ashenswish', namePtBr: 'Sibilo Cinzento', nameEn: 'Ashen Swish' },
        { fileName: 'whitewhip', namePtBr: 'Chicote Branco', nameEn: 'White Whip' },
        { fileName: 'swevery', namePtBr: 'Swevery', nameEn: 'Swevery' }
    ];   

    const infectedOrgansList = [
        { fileName: 'rim-infectado', namePtBr: 'Rim Infectado', nameEn: 'Infected Kidney' },
        { fileName: 'figado-infectado', namePtBr: 'Fígado Infectado', nameEn: 'Infected Liver' },
        { fileName: 'coracao-infectado', namePtBr: 'Coração Infectado', nameEn: 'Infected Heart' },
        { fileName: 'cerebro-infectado', namePtBr: 'Cérebro Infectado', nameEn: 'Infected Brain' },
        { fileName: 'sangue-infectado', namePtBr: 'Sangue Infectado', nameEn: 'Infected Blood' }
    ];

// |---------------------| 🔄 Ingredients/Combinations Rotation 🔄 |----------------------|

    function rotateImagesByClassNameAndItemList(imgClassName, itemsList) {
        const imagesList = document.getElementsByClassName(imgClassName);
        const imageBeingShown = imagesList[0];
        const itemBeingShownImgSource = imageBeingShown.getAttribute('src');
        const itemBeingShownFileName = itemBeingShownImgSource.split('/').pop().replace('.jpg', '');

        var idxNextItemToShow = 0;

        for (var idx = 0; idx < itemsList.length; idx++) {
            if (itemBeingShownFileName === itemsList[idx].fileName) {
                const isShowingTheLastItem =
                    idx === itemsList.length - 1;

                idxNextItemToShow =
                    isShowingTheLastItem
                    ? 0
                    : idx + 1;

                break;
            }
        }

        const nextItemToShow = itemsList[idxNextItemToShow];

        for (var idxImage = 0; idxImage < imagesList.length; idxImage++) {
            const image = imagesList[idxImage];

            image.setAttribute('src', getImgPathByFileName(nextItemToShow.fileName));
            image.setAttribute('alt', getItemName(nextItemToShow));
        }
    };

    function rotateIngredientsCombinationsImgs() {
        rotateImagesByClassNameAndItemList('rotating-common-herb-img', commonHerbsList);
        rotateImagesByClassNameAndItemList('rotating-rare-herb-img', rareHerbsList);
        rotateImagesByClassNameAndItemList('rotating-tincture-img', tincturesList);
        rotateImagesByClassNameAndItemList('rotating-infected-organ-img', infectedOrgansList);
        rotateImagesByClassNameAndItemList('rotating-healthy-organ-img', healthyOrgansList);

        setTimeout(rotateIngredientsCombinationsImgs, 1100);
    };

    setTimeout(rotateIngredientsCombinationsImgs, 1100);

// |-------------------------| 💊 Painkiller Combinations 💊 |----------------------------|

    const painkillerCombinationsList = [
        {
            organType: OrganEnum.Kidney,
            effectsDescriptionsByTincture: [
                { tinctureType: TinctureEnum.Yas, effectDescriptionPtBr: '+10% Imunidade', effectDescriptionEn: '+10% Immunity' },
                { tinctureType: TinctureEnum.Medrel, effectDescriptionPtBr: '+7.5% Imunidade', effectDescriptionEn: '+7.5% Immunity' },
                { tinctureType: TinctureEnum.Zurkh, effectDescriptionPtBr: '+5% Imunidade', effectDescriptionEn: '+5% Immunity' }
            ]
        },
        {
            organType: OrganEnum.Liver,
            effectsDescriptionsByTincture: [
                { tinctureType: TinctureEnum.Medrel, effectDescriptionPtBr: '+45% Regeneração de Exaustão (ao dormir)', effectDescriptionEn: '+45% Exhaustion regeneration (while sleeping)' },
                { tinctureType: TinctureEnum.Zurkh, effectDescriptionPtBr: '+30% Regeneração de Exaustão (ao dormir)', effectDescriptionEn: '+30% Exhaustion regeneration (while sleeping)' },
                { tinctureType: TinctureEnum.Yas, effectDescriptionPtBr: '+15% Regeneração de Exaustão (ao dormir)', effectDescriptionEn: '+15% Exhaustion regeneration (while sleeping)' }
            ]
        },
        {
            organType: OrganEnum.Heart,
            effectsDescriptionsByTincture: [
                { tinctureType: TinctureEnum.Yas, effectDescriptionPtBr: '-15% Fome', effectDescriptionEn: '-15% Hunger' },
                { tinctureType: TinctureEnum.Zurkh, effectDescriptionPtBr: '-10% Fome', effectDescriptionEn: '-10% Hunger' },
                { tinctureType: TinctureEnum.Medrel, effectDescriptionPtBr: '-5% Fome', effectDescriptionEn: '-5% Hunger' }
            ]
        },
        {
            organType: OrganEnum.Brain,
            effectsDescriptionsByTincture: [
                { tinctureType: TinctureEnum.Medrel, effectDescriptionPtBr: '-15% Exaustão', effectDescriptionEn: '-15% Exhaustion' },
                { tinctureType: TinctureEnum.Zurkh, effectDescriptionPtBr: '-10% Exaustão', effectDescriptionEn: '-10% Exhaustion' },
                { tinctureType: TinctureEnum.Yas, effectDescriptionPtBr: '-5% Exaustão', effectDescriptionEn: '-5% Exhaustion' }
            ]
        },
        {
            organType: OrganEnum.Blood,
            effectsDescriptionsByTincture: [
                { tinctureType: TinctureEnum.Zurkh, effectDescriptionPtBr: '-20% de Sede', effectDescriptionEn: '-20% Thirst' },
                { tinctureType: TinctureEnum.Yas, effectDescriptionPtBr: '-15% de Sede', effectDescriptionEn: '-15% Thirst' },
                { tinctureType: TinctureEnum.Medrel, effectDescriptionPtBr: '-10% de Sede', effectDescriptionEn: '-10% Thirst' }
            ]
        }
    ];

    const painkillerCombinationsTable = document.getElementById('painkiller-combinations-table');
    const painkillerCombinationRowsList = painkillerCombinationsTable.querySelectorAll('tr');

    function getNextPainkillerCombinationToShow() {
        const organBeingShownImg = painkillerCombinationsTable.querySelector('tr:first-child td:nth-child(2) img');  
        const organBeingShownImgSource = organBeingShownImg.getAttribute('src');

        const organBeingShownFileName = organBeingShownImgSource.split('/').pop().replace('.jpg', '');

        const organBeingShownType = 
            healthyOrgansList.filter(
                function (organ) {
                    return organ.fileName === organBeingShownFileName;
                }
            )[0].type;

        var idxNextPainkillerCombinationToShow = 0;

        for (var idx = 0; idx < healthyOrgansList.length; idx++) {
            if (organBeingShownType === healthyOrgansList[idx].type) {
                const isShowingTheLastOrgan = 
                    idx === healthyOrgansList.length - 1;

                idxNextPainkillerCombinationToShow = 
                    isShowingTheLastOrgan
                    ? 0
                    : idx + 1;

                break;
            }
        }

        return painkillerCombinationsList[idxNextPainkillerCombinationToShow];
    };

    function rotatePainkillerCombination() {
        const nextPainkillerCombinationToShow = getNextPainkillerCombinationToShow();

        const organToShow = 
            healthyOrgansList.filter(
                function (organ) {
                    return organ.type === nextPainkillerCombinationToShow.organType;
                }
            )[0];

        for (var idxTableRow = 0; idxTableRow < painkillerCombinationRowsList.length; idxTableRow++) {
            const tableRow = painkillerCombinationRowsList[idxTableRow];
      
            const cellTinctureImg = tableRow.querySelector('td:nth-child(1) img');
            const cellOrganImg = tableRow.querySelector('td:nth-child(2) img');
            const cellPainkillerImg = tableRow.querySelector('td:nth-child(4) img');
            const effectCell = tableRow.querySelector('td:last-child');

            const combinationEffect = 
                nextPainkillerCombinationToShow.effectsDescriptionsByTincture[idxTableRow];                

            const tinctureToShowOnRow = 
                tincturesList.filter(
                    function (tincture) {
                        return tincture.type === combinationEffect.tinctureType;
                    }
                )[0];   
                
            const painkillerToShowOnRow = 
                painkillersList.filter(
                    function (painkiller) {
                        return painkiller.tinctureType === combinationEffect.tinctureType;
                    }
                )[0];                       

            cellTinctureImg.setAttribute('src', getImgPathByFileName(tinctureToShowOnRow.fileName));
            cellTinctureImg.setAttribute('alt', getItemName(tinctureToShowOnRow));
            
            cellOrganImg.setAttribute('src', getImgPathByFileName(organToShow.fileName));
            cellOrganImg.setAttribute('alt', getItemName(organToShow));

            cellPainkillerImg.setAttribute('src', getImgPathByFileName(painkillerToShowOnRow.fileName));
            cellPainkillerImg.setAttribute('alt', getItemName(painkillerToShowOnRow));

            effectCell.innerHTML = 
                isPageInPortuguese 
                ? combinationEffect.effectDescriptionPtBr
                : combinationEffect.effectDescriptionEn;                                        
        }

        painkillerCombinationsRotationTimeoutId = setTimeout(rotatePainkillerCombination, 2000);           
    };

    // Allows the function to be called before its declaration
    window.rotatePainkillerCombination = rotatePainkillerCombination;

    painkillerCombinationsRotationTimeoutId = setTimeout(rotatePainkillerCombination, 2000);
})();
