
//Save user settings for showing and hiding page buttons
const saveBtn = document.getElementById('save-btn');

saveBtn.addEventListener('click', () => {

    if(document.getElementById('show_btns').checked){
        chrome.storage.sync.set({ btn_disp: true });   
    } else {
        chrome.storage.sync.set({ btn_disp: false });
    }
});

// chrome.storage.sync.get({})