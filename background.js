//on extension install set default properties
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        btn_disp: true,
        user_colors: 'default'
    }, () => {
        console.log('Default settings applied');
    });
});

//get the user data
let user_data;
chrome.storage.sync.get(['btn_disp', 'user_colors'], (result) => {
    user_data = result;
    // console.log('this is the data', user_data);
});


//get the current settings to be used for foreground
//listen for message request and send back object of user settings
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === 'get_user_data'){
        sendResponse(user_data);
    }
});




//access the local storage for properties on chrome
// chrome.storage.local.get(['name', 'age'], data => {

// });

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    //inject the script into page
    //only inject on complete load

    //listening for the 'complete' message from tabs

    if(changeInfo.status === 'complete' && /^http/.test(tab.url)){

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

//page loaded -> load buttons
function sendToForeground() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: 'page_loaded', data: user_data }, (response) => {
            console.log('page_loaded message sent');
        });
    });
    
}