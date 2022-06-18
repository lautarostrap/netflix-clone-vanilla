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
    location.hash.startsWith('#category=')
    ? categoriesPage()   :
    homePage()

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function homePage() {
    console.log('Home!')
}
function configPage() {
    console.log('Config!')
}
function searchPage() {
    console.log('Search!')
}
function movieDetailsPage() {
    console.log('Details!')
}
function categoriesPage() {
    console.log('Categories!')
}