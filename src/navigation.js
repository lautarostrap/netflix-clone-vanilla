window.addEventListener(
    'DOMContentLoaded',
    () => {
        navigator();
        window.history.pushState({ loadUrl: window.location.href }, null, '');
    },
    false,
);
window.addEventListener('hashchange', navigator, false);

let screenWidth = window.screen.width;

function navigator() {
    console.log('width: '+ screenWidth)

    location.hash === ''
    ? profilesPage()     :
    location.hash.startsWith('#config')
    ? configPage()       :
    location.hash.startsWith('#search')
    ? searchPage()       :
    location.hash.startsWith('#movie=') || location.hash.startsWith('#tv=')
    ? movieDetailsPage() :
    location.hash.startsWith('#movies') || location.hash.startsWith('#tvs')
    ? moviesOrShowsPage():
    location.hash.startsWith('#category-')
    ? categoriesPage()   :
    location.hash.startsWith('#home')
    ? homePage() :
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
    searchHeader.classList.add('inactive');
    genericVScrollContainer.classList.remove('inactive');
    searchVScrollContainer.classList.add('inactive');
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

    getLikedContent('both');

    getTopContentPreview('movie');
    getTopContentPreview('tv'); 
    
    getRandomGenre('movie')
        .then(genre => {
            getSectionContent('movie', genre.id)
                .then(contentArray => {
                    printGenericHorizontalSection(
                        genre.name,
                        'genre-movies',
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
                    printGenericHorizontalSection(
                        genre.name,
                        'genre-movies',
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
                    printGenericHorizontalSection(
                        genre.name,
                        'genre-movies',
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
                    printGenericHorizontalSection(
                        genre.name,
                        'genre-movies',
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
                    printGenericHorizontalSection(
                        genre.name,
                        'genre-movies',
                        genericVScrollContainer,
                        contentArray,
                        'tv',
                    );
                })
        })

}
function profilesPage() {
    console.log('Profiles!')
    printRAndMCharacters();

    profilesSection.classList.remove('inactive');
    detailSection.classList.add('inactive');
    configSection.classList.add('inactive');
    homeHeader.classList.add('inactive');
    searchHeader.classList.add('inactive');
    genericVScrollContainer.classList.add('inactive');
    searchVScrollContainer.classList.add('inactive');
    myListContainer.classList.add('inactive');
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
    searchHeader.classList.add('inactive');
    genericVScrollContainer.classList.add('inactive');
    searchVScrollContainer.classList.add('inactive');
    myListContainer.classList.add('inactive');
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

    printRAndMCharacters();
}
function searchPage() {
    console.log('Search!')

    profilesSection.classList.add('inactive');
    detailSection.classList.add('inactive');
    configSection.classList.add('inactive');
    homeHeader.classList.add('inactive');
    searchHeader.classList.remove('inactive');
    genericVScrollContainer.classList.add('inactive');
    searchVScrollContainer.classList.remove('inactive');
    myListContainer.classList.add('inactive');
    profilesHeader.classList.add('inactive');
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

    searchContentContainer.innerHTML = "";
    
    const [_, undecodedQuery] = location.hash.split('=');
    const query = decodeURI(undecodedQuery);

    if(query == '') {
        topSearchedContentContainer.classList.remove('inactive');
        for(let i = 0; i < 10; i++) {
            getSectionContent('movie', null, 'popularity.desc')
                .then(moviesArray => {
                    console.log('movie: ' + i)
                    printTopSearchContent('movie', moviesArray[i]);
                })
            getSectionContent('tv', null, 'popularity.desc')
                .then(seriesArray => {
                    console.log('serie: ' + i)
                    printTopSearchContent('tv', seriesArray[i]);
            });
        }
    } else {
        getContentBySearch('movie', query)
        .then(moviesArray => {
            console.log('query movie: ' + query)
            printGenericVerticalSection('movie', moviesArray);
            getContentBySearch('tv', query)
                .then(seriesArray => {
                    console.log('query series: ' + query)
                    printGenericVerticalSection('tv', seriesArray);
                })
        })
    }
    searchVScrollContainerTitle.innerHTML = "Top search";
    searchVScrollContainer.style.marginTop = "108px";
}
function movieDetailsPage() {
    console.log('Details!')

    profilesSection.classList.add('inactive');
    detailSection.classList.remove('inactive');
    configSection.classList.add('inactive');
    homeHeader.classList.add('inactive');
    searchHeader.classList.add('inactive');
    genericVScrollContainer.classList.add('inactive');
    searchVScrollContainer.classList.add('inactive');
    myListContainer.classList.add('inactive');
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

    profilesSection.classList.add('inactive');
    detailSection.classList.add('inactive');
    configSection.classList.add('inactive');
    homeHeader.classList.add('inactive');
    searchHeader.classList.add('inactive');
    genericVScrollContainer.classList.add('inactive');
    searchVScrollContainer.classList.remove('inactive');
    myListContainer.classList.add('inactive');
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

    const [_, contentAndCategoryId, rawCategoryTitle] = location.hash.split('-');
    const [contentType, categoryId] = contentAndCategoryId.split('=');
    const categoryTitle = decodeURI(rawCategoryTitle);

    const contentTypeName =
        (contentType === 'tv')
            ? 'Tv shows'
            : 'Movies';

    getContentWithFilters(
        contentType,
        {
            with_genres: categoryId,
            sort_by: 'popularity.desc',
        }
    ).then(contentArray => {
        printContentHero(contentArray[0], contentType);
        })

    getContentWithFilters(
        contentType,
        {
            with_genres: categoryId,
        }
    ).then(contentArray => {
        printGenericVerticalSection(contentType, contentArray);
        })

    searchVScrollContainerTitle.innerHTML = `Best ${categoryTitle} ${contentTypeName}`
    searchVScrollContainer.style.marginTop = 0;

    movieSerieModalButton.innerHTML = contentTypeName;
    setSectionName(contentTypeName);
    categoriesMovieSerieButtonText.innerHTML = categoryTitle;
}
function moviesOrShowsPage() {
    console.log('movies/shows!')

    profilesSection.classList.add('inactive');
    detailSection.classList.add('inactive');
    configSection.classList.add('inactive');
    homeHeader.classList.add('inactive');
    searchHeader.classList.add('inactive');
    genericVScrollContainer.classList.remove('inactive');
    searchVScrollContainer.classList.add('inactive');
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

    categoriesMovieSerieButtonText.innerHTML = 'All categories';
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

    (contentType === 'tv')
        ? getLikedContent('tv')
        : getLikedContent('movie');    

    getTopContentPreview(contentType); 
    
    getRandomGenre(contentType)
        .then(genre => {
            getSectionContent(contentType, genre.id)
                .then(contentArray => {
                    printGenericHorizontalSection(
                        genre.name,
                        'genre-movies',
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
                    printGenericHorizontalSection(
                        genre.name,
                        'genre-movies',
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
                    printGenericHorizontalSection(
                        genre.name,
                        'genre-movies',
                        genericVScrollContainer,
                        contentArray,
                        contentType,
                    );
                })
        })
}

    // Buttons
// Functions

const toggleModal = (node) => {
    node.classList.toggle('inactive');

    (!node.classList.contains('inactive'))
        ? body.style.overflow = "hidden"
        : body.style.overflow = "auto";
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
        window.location.hash = '#home';
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
searchButton.forEach(button => button.addEventListener('click', () => {
    location.hash = '#search=';
}));

closeButton.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleModal(moviePreviewModal);
});

searchInput.addEventListener('input', (event) => {
    location.hash = '#search=' + event.target.value;
});

categoriesHomeButton.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleModal(categoriesModal);
    printGenreList()
})
categoriesMovieSerieButton.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleModal(categoriesModal);

    const hash = location.hash;
    if (hash.length < 8) {
        const hashLength = hash.length;
        const contentType = location.hash.slice(1, hashLength -1);
        printGenreList(contentType);
    } else {
        const [_, contentAndCategoryId] = location.hash.split('-');
        const [contentType, categoryId] = contentAndCategoryId.split('=');
        printGenreList(contentType);
    }

})

movieSerieModalClose.addEventListener('click', () => toggleModal(categoriesModal));
