window.addEventListener(
    'DOMContentLoaded',
    () => {
        navigator();
        window.history.pushState({ loadUrl: window.location.href }, null, '');
    },
    false,
);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    location.hash.startsWith('#config')
    ? configPage()       :
    location.hash.startsWith('#search=')
    ? searchPage()       :
    location.hash.startsWith('#movie=') || location.hash.startsWith('#tv=')
    ? movieDetailsPage() :
    location.hash.startsWith('#movies') || location.hash.startsWith('#tvs')
    ? moviesOrShowsPage() :
    location.hash.startsWith('#profiles')
    ? profilesPage() :
    location.hash.startsWith('#category=')
    ? categoriesPage()   :
    homePage()

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function homePage() {
    console.log('Home!')

    profilesSection.classList.add('inactive');
    detailSection.classList.add('inactive');
    configSection.classList.add('inactive');
    homeHeader.classList.remove('inactive');
    genericVScrollContainer.classList.remove('inactive');
    profilesHeader.classList.add('inactive');
    notFoundHeader.classList.add('inactive');
    movieDetailHeader.classList.add('inactive');
    configHeader.classList.add('inactive');
    moviesSeriesHeader.classList.add('inactive');
    footer.classList.add('inactive');
    heroContainer.classList.remove('inactive');
    genreContainer.classList.remove('inactive');
    // topContainer.classList.remove('inactive');
    notFoundContainer.classList.add('inactive');
    moviePreviewModal.classList.add('inactive');

    genericVScrollContainer.innerHTML = "";

    getContentHero();
    getTopContentPreview('movie');
    getTopContentPreview('tv'); 
    
    getRandomGenre('movie')
        .then(genre => {
            getSectionContent('movie', genre.id)
                .then(contentArray => {
                    printGenericHScrollSection(
                        genre.name,
                        genericVScrollContainer,
                        contentArray,
                        'movie',
                    );
                })
        })
    getRandomGenre('tv')
        .then(genre => {
            getSectionContent('tv', genre.id)
                .then(contentArray => {
                    printGenericHScrollSection(
                        genre.name,
                        genericVScrollContainer,
                        contentArray,
                        'tv',
                    );
                })
        })
    getRandomGenre('movie')
        .then(genre => {
            getSectionContent('movie', genre.id)
                .then(contentArray => {
                    printGenericHScrollSection(
                        genre.name,
                        genericVScrollContainer,
                        contentArray,
                        'movie',
                    );
                })
        })
    getRandomGenre('movie')
        .then(genre => {
            getSectionContent('movie', genre.id)
                .then(contentArray => {
                    printGenericHScrollSection(
                        genre.name,
                        genericVScrollContainer,
                        contentArray,
                        'movie',
                    );
                })
        })
    getRandomGenre('tv')
        .then(genre => {
            getSectionContent('tv', genre.id)
                .then(contentArray => {
                    printGenericHScrollSection(
                        genre.name,
                        genericVScrollContainer,
                        contentArray,
                        'tv',
                    );
                })
        })

}
function profilesPage() {
    console.log('Profiles!')

    profilesSection.classList.remove('inactive');
    detailSection.classList.add('inactive');
    configSection.classList.add('inactive');
    homeHeader.classList.add('inactive');
    genericVScrollContainer.classList.add('inactive');
    profilesHeader.classList.remove('inactive');
    notFoundHeader.classList.add('inactive');
    movieDetailHeader.classList.add('inactive');
    configHeader.classList.add('inactive');
    moviesSeriesHeader.classList.add('inactive');
    footer.classList.add('inactive');
    heroContainer.classList.add('inactive');
    genreContainer.classList.add('inactive');
    // topContainer.classList.add('inactive');
    notFoundContainer.classList.add('inactive');
    moviePreviewModal.classList.add('inactive');
}
function configPage() {
    console.log('Config!')

    profilesSection.classList.add('inactive');
    detailSection.classList.add('inactive');
    configSection.classList.remove('inactive');
    homeHeader.classList.add('inactive');
    genericVScrollContainer.classList.add('inactive');
    profilesHeader.classList.add('inactive');
    notFoundHeader.classList.add('inactive');
    movieDetailHeader.classList.add('inactive');
    configHeader.classList.remove('inactive');
    moviesSeriesHeader.classList.add('inactive');
    footer.classList.add('inactive');
    heroContainer.classList.add('inactive');
    genreContainer.classList.add('inactive');
    // topContainer.classList.add('inactive');
    notFoundContainer.classList.add('inactive');
    moviePreviewModal.classList.add('inactive');
}
function searchPage() {
    console.log('Search!')
}
function movieDetailsPage() {
    console.log('Details!')

    profilesSection.classList.add('inactive');
    detailSection.classList.remove('inactive');
    configSection.classList.add('inactive');
    homeHeader.classList.add('inactive');
    genericVScrollContainer.classList.add('inactive');
    profilesHeader.classList.add('inactive');
    notFoundHeader.classList.add('inactive');
    movieDetailHeader.classList.remove('inactive');
    configHeader.classList.add('inactive');
    moviesSeriesHeader.classList.add('inactive');
    footer.classList.add('inactive');
    heroContainer.classList.add('inactive');
    genreContainer.classList.add('inactive');
    // topContainer.classList.add('inactive');
    notFoundContainer.classList.add('inactive');
    moviePreviewModal.classList.add('inactive');

    const [contentTypeRaw, contentId] = location.hash.split('=');
    const contentType = contentTypeRaw.substring(1);
    printContentDetails(contentType, contentId);
}
function categoriesPage() {
    console.log('Categories!')
}
function moviesOrShowsPage() {
    console.log('movies/shows!')

    profilesSection.classList.add('inactive');
    detailSection.classList.add('inactive');
    configSection.classList.add('inactive');
    homeHeader.classList.add('inactive');
    genericVScrollContainer.classList.remove('inactive');
    profilesHeader.classList.add('inactive');
    notFoundHeader.classList.add('inactive');
    movieDetailHeader.classList.add('inactive');
    configHeader.classList.add('inactive');
    moviesSeriesHeader.classList.remove('inactive');
    footer.classList.add('inactive');
    heroContainer.classList.remove('inactive');
    genreContainer.classList.remove('inactive');
    // topContainer.classList.remove('inactive');
    notFoundContainer.classList.add('inactive');
    moviePreviewModal.classList.add('inactive');

    
    genericVScrollContainer.innerHTML = "";
    
    const contentTypeRaw = location.hash;
    const contentType = contentTypeRaw.slice(1, -1);
    console.log(contentType);
    

    const sectionName = 
        (contentType === 'tv')
            ? 'Series'
            : 'Movies';
    setSectionName(sectionName);

    getContentHero(contentType);
    
    getTopContentPreview(contentType); 
    
    getRandomGenre(contentType)
        .then(genre => {
            getSectionContent(contentType, genre.id)
                .then(contentArray => {
                    printGenericHScrollSection(
                        genre.name,
                        genericVScrollContainer,
                        contentArray,
                        contentType,
                    );
                })
        })
    getRandomGenre(contentType)
        .then(genre => {
            getSectionContent(contentType, genre.id)
                .then(contentArray => {
                    printGenericHScrollSection(
                        genre.name,
                        genericVScrollContainer,
                        contentArray,
                        contentType,
                    );
                })
        })
    getRandomGenre(contentType)
        .then(genre => {
            getSectionContent(contentType, genre.id)
                .then(contentArray => {
                    printGenericHScrollSection(
                        genre.name,
                        genericVScrollContainer,
                        contentArray,
                        contentType,
                    );
                })
        })
}

    // Buttons
// Functions

const toggleInactive = (node) => {
    node.classList.toggle('inactive');
}

//Listeners

moreButton.forEach(button => button.addEventListener('click', () => {
    location.hash = '#config';
  }));

// backButton.forEach(button => button.addEventListener('click', () => {
//     const stateLoad = window.history.state ? window.history.state.loadUrl : '';
//     if (stateLoad.includes('#')) {
//         console.log('Debería ir al home');
//         window.location.hash = '';
//     } else {
//         console.log('Debería sólo retroceder');
//         window.history.back();
//        } 
// }));
backButton.forEach(button => button.addEventListener('click', () => {
    if (document.domain !== 'localhost') {
        console.log(document.domain);
        window.location.hash = '';
    } else {
        console.log('Debería sólo retroceder');
        window.history.back();
    } 
}));
seriesButton.forEach(button => button.addEventListener('click', () => {
    location.hash = '#tvs';
}));
moviesButton.forEach(button => button.addEventListener('click', () => {
    location.hash = '#movies';
}));

closeButton.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleInactive(moviePreviewModal)
});

