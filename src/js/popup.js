const ingredBtn = document.getElementById('ingredients-btn');

ingredBtn.addEventListener('click', () => {
    console.log('ingredients button clicked');

    chrome.runtime.sendMessage({ message: 'get_ingredients' });

});