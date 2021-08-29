const showBtnRadio = document.getElementById('show');
const hideBtnRadio = document.getElementById('hide');
const lightBtnRadio = document.getElementById('light');
const darkBtnRadio = document.getElementById('dark');

//EVENT LISTENERS TO UPDATE USER SETTING CHANGES
//saves changes as soon as user clicks the radio button
showBtnRadio.addEventListener('click', () => {
    chrome.storage.sync.set({ btn_disp: true });
});

hideBtnRadio.addEventListener('click', () => {
    chrome.storage.sync.set({ btn_disp: false });
});

lightBtnRadio.addEventListener('click', () => {
    chrome.storage.sync.set({ light_mode: true });
    getUserData(); //call to update css file
});

darkBtnRadio.addEventListener('click', () => {
    chrome.storage.sync.set({ light_mode: false });
    getUserData(); //call to update css file
});



//Get the saved user settings from chrome storage
//check the approriate checkboxes and go to toggle dark mode
const getUserData = () => {
    chrome.storage.sync.get(['btn_disp', 'light_mode'], (result) => {
        user_data = result;
        result.btn_disp ? showBtnRadio.checked = true : hideBtnRadio.checked = true;
        result.light_mode ? lightBtnRadio.checked = true: darkBtnRadio.checked = true;
        darkModeToggle(); //apply appropriate css file
    });
}


//check which option for light and dark mode
//apply css for either dark or light mode
const darkModeToggle = () => {
    const darkMode = '../css/dark_options_styles.css';
    const lightMode = '../css/light_options_styles.css';

    let pageStyles = '';

    user_data.light_mode ? pageStyles = lightMode : pageStyles = darkMode;

    const head  = document.getElementsByTagName('head')[0];
    let link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = pageStyles;
    link.media = 'all';
    head.appendChild(link);
}

//user_data object
let user_data = {};

//get initial userData for checkboxes
getUserData();


