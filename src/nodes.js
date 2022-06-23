const $ = (id) => document.querySelector(id);
const selectorToString = (selector) => {
    const nodeList = document.querySelectorAll(selector);
    const stringedSelector = [...nodeList];
    return stringedSelector;
}

// Sections

const profilesSection = $('.main--routes-container'); 
const detailSection = $('.movie-detail__main-container'); 
const configSection = $('.more__main-container');
const genericVScrollContainer = $('.generic__vScrollContainer');

// Containers
const homeHeader = $('.header__home');
const profilesHeader = $('.header__profile-selection');
const notFoundHeader = $('.header__not-found');
const movieDetailHeader = $('.header__movie-detail');
const configHeader = $('.header__more');
const moviesSeriesHeader = $('.header__movies-series');

const contentDetailsImageContainer = $('.movie__image-container');
const contentDetailsFeatures = $('.movie__features');

const footer = $('.footer')

const heroContainer = $('.hero-movie'); 
const genreContainer = $('.genre-movies__main-container'); 
const topContainer = $('.top-movies__main-container'); 
const notFoundContainer = $('.not-found__main-container');

const topMovieContainer = $('.top__image');
const topScrollContainer = $('.top-movies__scroll-container');

const contentImageContainer = $('.movie-preview__image');
const contentInfoContainer = $('.movie__info');

const contentInfoTitle = $('.movie__info--title');
const contentInfoFeatures = $('.movie__info--features');
const contentInfoDescription = $('.movie__info--description');

const contentInfoRelease = $('.info--release');
const contentInfoLasts = $('.info--lasts');

const movieDescriptionContainer = $('.hero-movie__description-container')

// Elements

const topTitle = $('.top-movies__title');
const contentDetailsTitle = $('.movie__title');
const contentDetailsDescription = $('.overview');
const contentDetailsStarring = $('.starring p');
const contentDetailsDirectingText = $('.direction p');
const contentDetailsDirectingTitle = $('.direction strong');

const moreButton = selectorToString('.profile__more-button');
const backButton = selectorToString('.back--button');
const seriesButton = selectorToString('.series--button');
const moviesButton = selectorToString('.movies--button');
const categoriesButton = selectorToString('.categories--button');
const closeButton = $('.movie__close');
const moreDetailsPreviewButton = $('.more__container p');

const sectionTitle = $('.navbar-left h2');

// Modals

const moviePreviewModal = $('.movie-preview__main-container')
const movieSerieModal = $('.modal--movie-serie')
