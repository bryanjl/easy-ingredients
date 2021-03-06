//user settings object -> get intial settings for extension
let user_data = {};


//update cached user_data object when changes are made
//changes can only occur from the options page
chrome.storage.onChanged.addListener((changes, namespace) => {
    updateUserData();
});

//inject the script into page
//only inject on complete load
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    
    //listening for the 'complete' message from tabs
    if(changeInfo.status === 'complete'){
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['./src/js/content.js']
        })
            .then(() => {
                console.log('INJECTED');
            })
            .catch(err => console.log(err));

        chrome.scripting.insertCSS({
            target: {tabId: tabId},
            files: ['./src/css/page_btn_styles.css']
        })
            .then(() => {
                sendToForeground();
            })    
            .catch(err => console.log(err));
    }
});

//page loaded message sends 
//foreground script has been injected and loads buttons if needed
function sendToForeground() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { 
            message: 'page_loaded', 
            data: user_data 
        });
    });
}

//updates the user_data object (on startup and changes made on options page)
//if no result is found  set default settings. (first install)
const updateUserData = () => {
    chrome.storage.sync.get(['btn_disp', 'light_mode'], (result) => {
            user_data = result;
    });
}

//intial cahching of the user_data object
updateUserData();