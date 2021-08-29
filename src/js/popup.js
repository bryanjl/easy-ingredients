const ingredBtn = document.getElementById('ingredients-btn');
const recipeBtn = document.getElementById('recipe-btn');

//ingredients button event listener
//sends message to content script
ingredBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: 'get_ingredients' });
    });
});

//recipe button event listener
//sends message to content script
recipeBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: 'get_recipe' });
    });
});