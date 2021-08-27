//user settings object -> get intial settings for extension
let user_data = {};

//updates the user_data object (on startup and changes made to settings)
const updateUserData = () => {
    chrome.storage.sync.get(['btn_disp', 'user_colors'], (result) => {
        user_data = result;
        console.log('this is the user_data intialization in bg script', user_data);
    });
}

//intial cahching of the user_data object
updateUserData();

//update cached user_data object when changes are made
//changes can only occur from the options page
chrome.storage.onChanged.addListener((changes, namespace) => {
    updateUserData();
    console.log('changes applied');
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    //inject the script into page
    //only inject on complete load

    //listening for the 'complete' message from tabs

    // console.log('im here...',tabId, changeInfo, tab);

    if(changeInfo.status === 'complete'){
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['./src/js/foreground.js']
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
                console.log('page_btn_styles.css injected');
                sendToForeground();
            })    
            .catch(err => console.log(err));
    }
        
        });

//page loaded message sends 
//foreground script has been injected and loads buttons if needed
function sendToForeground() {
    console.log(user_data, 'sent from sendtoforground');
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: 'page_loaded', data: user_data }, (response) => {
            console.log('page_loaded message sent');
        });
        console.log('its me');
    });
    
}