// Data

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});

const POSTER_300W_URL = 'https://image.tmdb.org/t/p/w300/';
const POSTER_500W_URL = 'https://image.tmdb.org/t/p/w500/';
const POSTER_780W_URL = 'https://image.tmdb.org/t/p/w780/';
const POSTER_1280W_URL = 'https://image.tmdb.org/t/p/w1280/';

const contentIsLiked = (content, button, contentType) => {
    let likedContent = likedContentList(contentType);

    if(likedContent[content.id]) {
        button.classList.add('my-list--button--liked');
        button.classList.add('my-list--button');
    } else {
        button.classList.remove('my-list--button--liked');
        button.classList.add('my-list--button');
    } 
}

const likedContentList = (contentType) => {
    const item = JSON.parse(localStorage.getItem(`liked_${contentType}`));
    let content;

    if (item) {
        content = item;
    } else {
        content = {};

    }
    return content;
}

const likeContent = (content, contentType) => {
    let likedContent = likedContentList(contentType);

    if(likedContent[content.id]) {
        likedContent[content.id] = undefined;
    } else {
        likedContent[content.id] = content;  
    } 
    localStorage.setItem(`liked_${contentType}`, JSON.stringify(likedContent));
    console.log(JSON.parse(localStorage.getItem(`liked_${contentType}`)));
    if (location.hash == '' || location.hash == '#'){
        getLikedContent('both'); 
    } else if (location.hash == '#tvs') {
        getLikedContent('tv'); 
    } else if (location.hash == '#movies') {
        getLikedContent('movie');
    }
}

// Utils

const capitalizeFirstLetter = (string) => {
    const capitalizedString = string[0].toUpperCase() + string.slice(1);
    return capitalizedString;
}

const setSectionName = (sectionName) => {
    sectionTitle.innerHTML = sectionName;
    movieSerieModal.innerHTML = sectionName;
}

const getMovieRuntime = (runtimeParameter) => {
    let runtimeMinutes = runtimeParameter
    let hoursAccumulator = 0;
    while (runtimeMinutes > 60) {
        runtimeMinutes = runtimeMinutes - 60;
        hoursAccumulator++;
    }
    const runtimeHours = 
        (hoursAccumulator !== 0)
            ? `${hoursAccumulator}h ${runtimeMinutes}m`
            : `${runtimeMinutes}m`
    return runtimeHours;
}

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const printTopContentPosters = (movies, contentType) => {

    const topMainContainer = document.createElement('section');
    topMainContainer.classList.add('top-movies__main-container');
    const topContainerTitle = document.createElement('h2');
    topContainerTitle.classList.add('top-movies__title');
    let content;
    (contentType === 'movie') ? content = 'movies' : content = 'TV shows';
    topContainerTitle.innerHTML =  `Ten most popular ${content} today`;
    topMainContainer.appendChild(topContainerTitle);

    const topScrollContainer = document.createElement('div');
    topScrollContainer.classList.add('top-movies__scroll-container');
    
    for (let movieNumber = 1; movieNumber < 11; movieNumber++) {
        
        const topMovieContainer = document.createElement('article');
        topMovieContainer.classList.add('top__image');
        topMovieContainer.classList.add(`topContent--${movieNumber}`);

        const moviePosition = document.createElement('p');
        const moviePositionText = document.createTextNode(movieNumber);
        moviePosition.appendChild(moviePositionText);

        const movieImg = document.createElement('img');
        movieImg.setAttribute('alt', movies[movieNumber].title);
        movieImg.setAttribute('src',
            `${POSTER_300W_URL}${movies[movieNumber].poster_path}`
        );
        movieImg.addEventListener('click', () => printContentPreview(contentType, movies[movieNumber].id));

        topMovieContainer.appendChild(moviePosition);
        topMovieContainer.appendChild(movieImg);
        topScrollContainer.appendChild(topMovieContainer);
        topMainContainer.appendChild(topScrollContainer);
        genericVScrollContainer.appendChild(topMainContainer);
    
    }
}

const printContentHero = async (contentHero, contentType) => {
    const contentImgUrl = 
        (screenWidth <= 425)
            ? `${POSTER_780W_URL}${contentHero.poster_path}`
            : `${POSTER_1280W_URL}${contentHero.backdrop_path}`;
    heroContainer.style.backgroundImage =
    `linear-gradient(to bottom, 
        rgb(0, 0, 0, 0),
        rgba(0, 0, 0, 0.100) 60%,
        rgba(0, 0, 0)), 
        url(${contentImgUrl}`;
    heroContainer.addEventListener('click', () => {printContentPreview(contentType, contentHero.id)});

    const contentTitle = 
        (contentType == 'tv')
            ? contentHero.name
            : contentHero.title;
    
    heroMyListButtonContainer.innerHTML = "";
    const myListButton = document.createElement('p');
    myListButton.classList.add('my-list--button');
    const myListText = 'My list';
    const myListDisplayText = document.createTextNode(myListText);
    
    heroMyListButtonContainer.appendChild(myListButton);
    heroMyListButtonContainer.appendChild(myListDisplayText);
    
    contentIsLiked(contentHero, myListButton, contentType);

    myListButton.addEventListener('click', (event) => {
        event.stopPropagation();
        myListButton.classList.toggle('my-list--button--liked');
        likeContent(contentHero, contentType);
    });

    getMovieDetails(contentType, contentHero.id, '/keywords')
        .then(content => {
            let contentKeywords = 
                (contentType == 'tv')
                    ? content.results
                    : content.keywords;
        
            movieDescriptionContainer.innerHTML = "";     
        
            for (let keywordNumber = 0; keywordNumber < 3; keywordNumber++) {
                
                const keywordText = contentKeywords[keywordNumber].name
                const keywordTitleCapitalizedText = capitalizeFirstLetter(keywordText)
                const keywordTitleText = document.createTextNode(keywordTitleCapitalizedText);
                const keywordTitle = document.createElement('li');
                
                keywordTitle.appendChild(keywordTitleText);
                movieDescriptionContainer.appendChild(keywordTitle);
            }
        })

    getMovieDetails(contentType, contentHero.id, '/images')
        .then(images => {
            console.log(images);
            const englishLogo = images.logos.find(logo => {
                if(logo.iso_639_1 == "en")
                return true;
            })
            console.log(englishLogo);

            heroMovieLogo.setAttribute('alt', contentTitle)
            heroMovieLogo.setAttribute('src', 
                `${POSTER_500W_URL}${englishLogo.file_path}`
            )
        })
}

const printContentPreview = async (contentType, contentId) => {
    getMovieDetails(contentType, contentId)
        .then(content => {

            moviePreviewModal.classList.remove('inactive');
            moviePreviewModal.addEventListener('click', () => {
                location.hash = `#${contentType}=${content.id}`;
            });
        
            contentImageContainer.innerHTML = "";

            const contentImg = document.createElement('img');
            contentImg.setAttribute('alt', 
            (contentType === 'tv')
                ? content.name       
                : content.title
            );
            contentImg.setAttribute('src',
                `${POSTER_300W_URL}${content.poster_path}`
            );
        
            contentImageContainer.appendChild(contentImg)
        
            detailsButtonText = 
                (contentType === 'tv')
                    ? 'Episodes'       
                    : 'Details';
            moreDetailsPreviewButton.textContent = `${detailsButtonText} & more`;

            contentInfoTitle.textContent = 
                (contentType === 'tv')
                    ? content.name       
                    : content.title;
            contentInfoDescription.textContent = content.overview;

            const contentYear = 
                (contentType === 'tv')
                    ? content.last_air_date.slice(0, 4)       
                    : content.release_date.slice(0, 4);

            const numberOfSeasons = 
                (content.number_of_seasons > 1)
                    ? 'seasons'
                    : 'season';

            const contentLasts = 
                (contentType === 'tv')
                    ? `${content.number_of_seasons} ${numberOfSeasons}`
                    : getMovieRuntime(content.runtime);

            contentInfoFeatures.innerHTML = "";
            const contentYearText = document.createTextNode(contentYear);
            const contentLastsText = document.createTextNode(contentLasts);
            
            const contentYearItem = document.createElement('li');
            const contentLastsItem = document.createElement('li');

            contentYearItem.appendChild(contentYearText);
            contentLastsItem.appendChild(contentLastsText);
            contentInfoFeatures.appendChild(contentYearItem);
            contentInfoFeatures.appendChild(contentLastsItem);

            
            previewMyListButtonContainer.innerHTML = "";
            const myListButton = document.createElement('button');
            myListButton.classList.add('my-list--button');
            const myListDisplay = document.createElement('p');
            const myListText = 'My list'
            const myListDisplayText = document.createTextNode(myListText);
            
            myListDisplay.appendChild(myListDisplayText);
            previewMyListButtonContainer.appendChild(myListButton);
            previewMyListButtonContainer.appendChild(myListDisplay);
            
            contentIsLiked(content, myListButton, contentType);

            myListButton.addEventListener('click', (event) => {
                event.stopPropagation();
                myListButton.classList.toggle('my-list--button--liked');
                likeContent(content, contentType);
                getContentHero(contentType);
            });
        })
}

const printContentDetails = async (contentType, contentId) => {
    getMovieDetails(contentType, contentId)
        .then(content => {
            const contentImgUrl = `${POSTER_500W_URL}${content.backdrop_path}`;
            contentDetailsImageContainer.style.backgroundImage = `url(${contentImgUrl}`;

            contentDetailsTitle.textContent = 
                (contentType === 'tv')
                    ? content.name       
                    : content.title;
            contentDetailsDescription.textContent = content.overview;

            const contentYear = 
                (contentType === 'tv')
                    ? content.last_air_date.slice(0, 4)       
                    : content.release_date.slice(0, 4);
            const contentLasts = 
                (contentType === 'tv')
                    ? `${content.number_of_seasons} season/s`
                    : getMovieRuntime(content.runtime);
            console.log(contentLasts);

            contentDetailsFeatures.innerHTML = "";
            const contentYearText = document.createTextNode(contentYear);
            const contentLastsText = document.createTextNode(contentLasts);
            
            const contentYearItem = document.createElement('li');
            const contentLastsItem = document.createElement('li');

            contentYearItem.appendChild(contentYearText);
            contentLastsItem.appendChild(contentLastsText);
            contentDetailsFeatures.appendChild(contentYearItem);
            contentDetailsFeatures.appendChild(contentLastsItem);

            
            detailsMyListButtonContainer.innerHTML = "";
            const myListButton = document.createElement('p');
            myListButton.classList.add('my-list--button');
            detailsMyListButtonContainer.appendChild(myListButton)
            
            contentIsLiked(content, myListButton, contentType);
            
            myListButton.addEventListener('click', (event) => {
                event.stopPropagation();
                myListButton.classList.toggle('my-list--button--liked');
                likeContent(content, contentType);
            });
        });
    getMovieDetails(contentType, contentId, '/credits')
        .then(extraInfo => {
            contentDetailsStarring.textContent = `${extraInfo.cast[0].name}, ${extraInfo.cast[1].name}, ${extraInfo.cast[2].name}` ;

            (contentType === 'tv')
                ? contentDetailsDirectingTitle.textContent = 'Created by: '
                : contentDetailsDirectingTitle.textContent = 'Direction: ';

            const findCrew = (department) => {
                const directing = extraInfo.crew.find(content => content.known_for_department === department)
                return directing;
            }

            const directing = 
                (contentType === 'tv')
                    ? findCrew('Writing')
                    : findCrew('Directing');

            console.log(directing.name);
            contentDetailsDirectingText.textContent = `${directing.name}`;

        });
}

const printMyListHorizontalSection = async (contentInfo, contentType) => {
        (localStorage.getItem('liked_tv') == null && localStorage.getItem('liked_movie') == null)
            ? myListContainer.classList.add('inactive')
            : myListContainer.classList.remove('inactive');

        contentInfo.forEach(contentItem => {
            getMovieDetails(contentType, contentItem.id, '/images')
                .then(images => {
                    const englishBackdrop = images.backdrops.find(backdrop => {
                        if(backdrop.iso_639_1 == "en")
                        return true;
                    })
                    const genericContentContainer = document.createElement('article');
                    genericContentContainer.classList.add('movie__image');

                    const contentImage = 
                        (screenWidth <= 425)
                            ? `${POSTER_500W_URL}${contentItem.poster_path}`
                            : `${POSTER_500W_URL}${englishBackdrop.file_path}`;

                    const movieImg = document.createElement('img');
                    movieImg.setAttribute('alt', contentItem.title);
                    movieImg.setAttribute('src', contentImage);
                    movieImg.addEventListener('click', () => printContentPreview(contentType, contentItem.id));

                    genericContentContainer.appendChild(movieImg);
                    myListScrollContainer.appendChild(genericContentContainer);
                })
        })
}
const printGenericHorizontalSection = async (
    sectionTitle, 
    sectionClass,
    sectionToInsert,
    contentInfo, 
    contentType) => {

        const genericHContainer = document.createElement('section');
        genericHContainer.classList.add(`${sectionClass}__main-container`);
        const genericHContainerTitle = document.createElement('h2');
        genericHContainerTitle.classList.add(`${sectionClass}__title`);

        const contentTypeTitle = 
            (contentType === 'movie')
                ? 'movies' 
                : 'TV shows';


        (sectionTitle === 'My list')
            ? genericHContainerTitle.innerHTML = sectionTitle
            : genericHContainerTitle.innerHTML =  `Best ${sectionTitle} ${contentTypeTitle}`;

            
        genericHContainer.appendChild(genericHContainerTitle);

        const genericHScrollContainer = document.createElement('div');
        genericHScrollContainer.classList.add(`${sectionClass}__scroll-container`);

        contentInfo.forEach(contentItem => {
            getMovieDetails(contentType, contentItem.id, '/images')
                .then(images => {
                    const englishBackdrop = images.backdrops.find(backdrop => {
                        if(backdrop.iso_639_1 == "en")
                        return true;
                    })
                
                    const genericContentContainer = document.createElement('article');
                    genericContentContainer.classList.add('movie__image');

                    const contentImage = 
                        (screenWidth <= 425)
                            ? `${POSTER_500W_URL}${contentItem.poster_path}`
                            : `${POSTER_500W_URL}${englishBackdrop.file_path}`;

                    const movieImg = document.createElement('img');
                    movieImg.setAttribute('alt', contentItem.title);
                    movieImg.setAttribute('src', contentImage);
                    movieImg.addEventListener('click', () => printContentPreview(contentType, contentItem.id));

                    genericContentContainer.appendChild(movieImg);
                    genericHScrollContainer.appendChild(genericContentContainer);
                    genericHContainer.appendChild(genericHScrollContainer);
                    sectionToInsert.appendChild(genericHContainer);
                })
        })
}

const printGenericVerticalSection = async (contentType, contentArray) => {
    searchContentContainer.innerHTML = "";
    topSearchedContentContainer.classList.add('inactive');
    topSearchedContentContainer.innerHTML = "";

    contentArray.forEach(content => {
        const contentContainer = document.createElement('article');
        contentContainer.classList.add('searched-content__image');
    
        const contentImage = document.createElement('img');
        contentImage.setAttribute('alt', content.title);

        if(!content.poster_path) {
            contentImage.setAttribute('src', 
                (contentType === 'movie')
                    ? `https://via.placeholder.com/300x450/b81d24/ffffff?text=${content.title}`
                    : `https://via.placeholder.com/300x450/b81d24/ffffff?text=${content.name}`
            );
        } else {
            contentImage.setAttribute('src', 
                `${POSTER_300W_URL}${content.poster_path}`
            );
        }
        
        contentImage.addEventListener('click', () => printContentPreview(contentType, content.id));

        contentContainer.appendChild(contentImage);
        searchContentContainer.appendChild(contentContainer)
    })
    
}

const printTopSearchContent = async (contentType, content) => {
    // contentArray.forEach(content => {
        
        let titleText =
            (contentType === 'movie')
                    ? content.title
                    : content.name;
        console.log(titleText);

        const contentItem = document.createElement('div');
        contentItem.classList.add('search__content-item');
        const contentItemLeft = document.createElement('div');
        const contentImage = document.createElement('img');
        contentImage.setAttribute('alt', titleText)
        contentImage.setAttribute('src', 
            `${POSTER_300W_URL}${content.backdrop_path}`
        )
        const contentTitle = document.createElement('p');
        const contentTitleText = document.createTextNode(titleText);
        contentTitle.appendChild(contentTitleText);

        contentItem.addEventListener('click', () => printContentPreview(contentType, content.id));

        const contentItemButton = document.createElement('button');
    
        contentItemLeft.appendChild(contentImage);
        contentItemLeft.appendChild(contentTitle);
        contentItem.appendChild(contentItemLeft);
        contentItem.appendChild(contentItemButton);
        topSearchedContentContainer.appendChild(contentItem)



    // })

}

// API

const getMovieDetails = async (contentType, contentId, extraInfo) => {

    try {
        let res = await api(`/${contentType}/${contentId}${extraInfo}`);
         return new Promise((resolve) => {resolve(res.data)});
     }
     catch (err) {
         console.error(err);
     }
}

const getTopContentPreview = async (contentType) => {
    const { data } = await api(`/trending/${contentType}/day`);
    const content = data.results;
    
    
    printTopContentPosters(content, contentType);
    // console.log(movies[1].title);
}

const getContentHero = async (contentTypeParam) => {

    const randomContentTypeNumber = getRandomNumber(1, 2);

    const randomContentType = 
        (!contentTypeParam && randomContentTypeNumber === 1)
            ? 'movie'
            : 'tv';

    const contentType = contentTypeParam || randomContentType;
    
    const randomPosterNumber =
        (contentType === 'movie')
            ? getRandomNumber(12, 13)
            : getRandomNumber(4, 6);

    const { data } = await api(`/discover/${contentType}`, {
        params: {
            sort_by: 'vote_average.desc',
            'vote_count.gte': 10000,
        },
    });

    const contentHero = data.results[randomPosterNumber];
            
    printContentHero(contentHero, contentType);
}

const getSectionContent = async (contentType, genreId, filter) => {
    try {
        const { data } = await api(`/discover/${contentType}`, {
            params: {
                with_genres: genreId,
                sort_by: filter,
            }});
         return new Promise((resolve) => {resolve(data.results)});
     }
     catch (err) {
         console.error(err);
     }
}

const getContentBySearch = async (contentType, query) => {
    try {
        const { data } = await api(`/search/${contentType}`, {
            params: {
                query,
            },
        })
         return new Promise((resolve) => {resolve(data.results)});
     }
     catch (err) {
         console.error(err);
     }
}

const getRandomGenre = async (contentTypeParameter) => {
    let randomContentTypeNumber = getRandomNumber(1, 2);
    
    const randomContentType = contentTypeParameter || (randomContentTypeNumber === 1) ? 'movie' : 'tv';

    try {
        const { data } = await api(`/genre/${randomContentType}/list`);
        const randomGenreIndex = getRandomNumber(1, data.genres.length);
        return new Promise((resolve) => {resolve(data.genres[randomGenreIndex])});
     }
     catch (err) {
         console.error(err);
     }
}

const getLikedContent = (contentType) => {
    myListScrollContainer.innerHTML = "";
    if(contentType === 'both') {
        let likedMovies = Object.values(likedContentList('movie'));
        let likedSeries = Object.values(likedContentList('tv'));
        printMyListHorizontalSection(likedMovies, 'movie')
        printMyListHorizontalSection(likedSeries, 'tv')
        console.log(contentType);
    } else {
        let likedContent = Object.values(likedContentList(contentType));
        printMyListHorizontalSection(likedContent, contentType)
        console.log(contentType);
    }
}