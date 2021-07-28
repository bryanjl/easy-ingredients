//service worker
//a file runs when needed and closes when not being used
//must use chrom storage api to have persistant background js --> lo0cal storage

//manifest v2 had persistant background js
//manifest v3 you MUST save to local storage to get access to properties

// chrome.runtime.onInstalled.addListener(() => {
    //this is the default state of the extension

    
    //use the local storage of chrome to set a property
    //runs only once at install of extension
//     chrome.storage.local.set({
//         name: 'Bryan',
//         age: 34
//     });
// });


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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === 'get_ingredients') {
        console.log(`background.js recieved message ${request.message}`);

        chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { message: 'get_ingredients' }, (response) => {
                console.log('message sent from background');
            });
        });
        
    }
    return true;
});

function sendToForeground() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: 'page_loaded' }, (response) => {
            console.log('page_loaded message sent');
        });
    });
    
}