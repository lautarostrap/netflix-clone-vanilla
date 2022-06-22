window.addEventListener(
    'DOMContentLoaded',
    () => {
        navigator();
        window.history.pushState({ loadUrl: window.location.href }, null, '');
    },
    false,
);
window.addEventListener('DOMContentloaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    location.hash.startsWith('#config')
    ? configPage()       :
    location.hash.startsWith('#search=')
    ? searchPage()       :
    location.hash.startsWith('#movie=')
    ? movieDetailsPage() :
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
    homeVScrollContainer.classList.remove('inactive');
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

    homeVScrollContainer.innerHTML = "";

    getContentHero();
    getTopContentPreview('movie');
    getTopContentPreview('tv');
}
function profilesPage() {
    console.log('Profiles!')

    profilesSection.classList.remove('inactive');
    detailSection.classList.add('inactive');
    configSection.classList.add('inactive');
    homeHeader.classList.add('inactive');
    homeVScrollContainer.classList.add('inactive');
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
    homeVScrollContainer.classList.add('inactive');
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
    homeVScrollContainer.classList.add('inactive');
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
}
function categoriesPage() {
    console.log('Categories!')
}

// Buttons

moreButton.addEventListener('click', () => {
    location.hash = '#config';
  });

backButton.addEventListener('click', () => {
    const stateLoad = window.history.state ? window.history.state.loadUrl : '';
    if (stateLoad.includes('#')) {
        window.location.hash = '';
    } else {
        window.history.back();
    }
});