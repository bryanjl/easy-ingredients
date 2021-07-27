

console.log('INJECTED');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === 'get_ingredients') {
        console.log(`forground.js recieved message ${request.message}`);
        
        const allElements = document.querySelectorAll('*');
        //console.log(allElements);

        for(let i = 0; i < allElements.length; i++){

            //search for classnames that include 'ingredients'
            //go to first element with this classname, grab it, scroll to view
            //!!!!Doesn't work on all sites --> some random classes named ingredients!!!!!
            // ----------------->Maybe use a filter to make sure they are <li> children??
            if (allElements[i].className.toString().match(/ingredient/g)){

                let classArr = allElements[i].className.toString().split(' ')
                let ingredURL = document.getElementsByClassName(classArr[0]);
                ingredURL.item(0).scrollIntoView(true);
                
                break;
            }
        }
    }
    return true;
});



