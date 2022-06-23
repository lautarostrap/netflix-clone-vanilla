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

// Utils

const getMovieRuntime = (runtimeParameter) => {
    let runtimeMinutes = runtimeParameter
    let hoursAccumulator = 0;
    while (runtimeMinutes > 60) {
        runtimeMinutes = runtimeMinutes - 60;
        hoursAccumulator++;
    }
    const runtimeHours = `${hoursAccumulator}h ${runtimeMinutes}m`
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
        homeVScrollContainer.appendChild(topMainContainer);
    
    }
}

const printContentHero = async (contentHero, contentType) => {
    const contentImgUrl = `${POSTER_500W_URL}${contentHero.poster_path}`;
    heroContainer.style.backgroundImage =
    `linear-gradient(to bottom, 
        rgb(0, 0, 0, 0),
        rgba(0, 0, 0, 0.100) 60%,
        rgba(0, 0, 0)), 
        url(${contentImgUrl}`;
    heroContainer.addEventListener('click', () => {printContentPreview(contentType, contentHero.id)});

    getMovieDetails(contentType, contentHero.id)
        .then(content => {
            let contentGenre = content.genres;
        
            movieDescriptionContainer.innerHTML = "";     
        
            for (let categoryNumber = 0; categoryNumber < 3; categoryNumber++) {
                const categoryTitleText = document.createTextNode(contentGenre[categoryNumber].name);
                const categoryTitle = document.createElement('li');
                
                categoryTitle.appendChild(categoryTitleText);
                movieDescriptionContainer.appendChild(categoryTitle);
            }
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
        
            contentInfoTitle.textContent = 
                (contentType === 'tv')
                    ? content.name       
                    : content.title;
            contentInfoDescription.textContent = content.overview;

            const contentYear = 
                (contentType === 'tv')
                    ? content.last_air_date.slice(0, 4)       
                    : content.release_date.slice(0, 4);
            const contentLasts = 
                (contentType === 'tv')
                    ? `${content.number_of_seasons} season/s`
                    : getMovieRuntime(content.runtime);
            console.log(contentLasts);

            contentInfoFeatures.innerHTML = "";
            const contentYearText = document.createTextNode(contentYear);
            const contentLastsText = document.createTextNode(contentLasts);
            
            const contentYearItem = document.createElement('li');
            const contentLastsItem = document.createElement('li');

            contentYearItem.appendChild(contentYearText);
            contentLastsItem.appendChild(contentLastsText);
            contentInfoFeatures.appendChild(contentYearItem);
            contentInfoFeatures.appendChild(contentLastsItem);
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

const printGenericHScrollSection = async (
    sectionTitle, 
    sectionToInsert,
    contentInfo, 
    contentType) => {
        const genericHContainer = document.createElement('section');
        genericHContainer.classList.add('genre-movies__main-container');
        const genericHContainerTitle = document.createElement('h2');
        genericHContainerTitle.classList.add('genre-movies__title');

        const contentTypeTitle = 
            (contentType === 'movie')
                ? 'movies' 
                : 'TV shows';

        genericHContainerTitle.innerHTML =  `Best ${sectionTitle} ${contentTypeTitle}`;
        genericHContainer.appendChild(genericHContainerTitle);

        const genericHScrollContainer = document.createElement('div');
        genericHScrollContainer.classList.add('genre-movies__scroll-container');
        
        contentInfo.forEach(contentItem => {
            
            const genericContentContainer = document.createElement('article');
            genericContentContainer.classList.add('movie__image');

            const movieImg = document.createElement('img');
            movieImg.setAttribute('alt', contentItem.title);
            movieImg.setAttribute('src',
                `${POSTER_300W_URL}${contentItem.poster_path}`
            );
            movieImg.addEventListener('click', () => printContentPreview(contentType, contentItem.id));

            genericContentContainer.appendChild(movieImg);
            genericHScrollContainer.appendChild(genericContentContainer);
            genericHContainer.appendChild(genericHScrollContainer);
            sectionToInsert.appendChild(genericHContainer);
    
        })
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

const getContentHero = async () => {
    
    const randomContentTypeNumber = getRandomNumber(1, 2);
    let randomPosterNumber = getRandomNumber(1, 10);
    
    const randomContentType =
        (randomContentTypeNumber === 1) 
            ? 'movie' 
            : 'tv';
    const { data } = await api(`/discover/${randomContentType}`, {
        params: {
            sort_by: 'vote_average.desc',
            'vote_count.gte': 10000,
        },
    });

    const contentHero =
        (data.results[randomPosterNumber])
            ? data.results[randomPosterNumber]
            : data.results[randomPosterNumber-1];
    
    printContentHero(contentHero, randomContentType);
}

const getSectionContent = async (contentType, genreId) => {
    try {
        const { data } = await api(`/discover/${contentType}`, {
            params: {
                with_genres: genreId,
            }});
            console.log(data.results);
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

