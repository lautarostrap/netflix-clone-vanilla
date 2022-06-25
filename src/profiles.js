// Data

const apiRAndM = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
});

const baseRAndMURL = 'https://rickandmortyapi.com/api';

const printRAndMCharacters = async () => {
    const { data } = await apiRAndM('/character');
    const characters = data.results;

    console.log(characters);
    console.log(profileImageMore);
    console.log(profileContainerMore);

    for(let i = 1; i < 6; i ++) {
        profileImage[i-1].setAttribute('alt', characters[i-1].name);
        profileImage[i-1].setAttribute('src', 
            `${baseRAndMURL}/character/avatar/${i}.jpeg`
        );
        profileName[i-1].innerHTML = characters[i-1].name;
        profileContainer[i-1].addEventListener('click', () => {
            moreButton.forEach(button => {
                button.setAttribute('alt', characters[i-1].name)
                button.setAttribute('src',
                `${baseRAndMURL}/character/avatar/${i}.jpeg`)
            })
            profileContainerMore[i-1].classList.add('main--profile--selected');
            location.hash = "#home";
        });

        profileImageMore[i-1].setAttribute('alt', characters[i-1].name);
        profileImageMore[i-1].setAttribute('src', 
            `${baseRAndMURL}/character/avatar/${i}.jpeg`
        );
        profileNameMore[i-1].innerHTML = characters[i-1].name;
        profileContainerMore[i-1].addEventListener('click', () => {
            profileContainerMore.forEach(container => container.classList.remove('main--profile--selected'));
            profileContainerMore[i-1].classList.add('main--profile--selected');
            moreButton.forEach(button => {
                button.setAttribute('alt', characters[i-1].name)
                button.setAttribute('src',
                `${baseRAndMURL}/character/avatar/${i}.jpeg`)
            })
        });
    }
}