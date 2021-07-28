
console.log('INJECTED');

//insert css file to be used by forground script

//insertingCSS.then(null, onError);

// loadPageBtns();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === 'page_loaded'){
        console.log('here I am');
        const allElements = document.querySelectorAll('*');

        for(let i = 0; i < allElements.length; i++) {
            if(allElements[i].className.toString().match(/ingredient/g)){
                loadPageBtns();
                
                break;
            }   
        }   
    }
    sendResponse({});
    // return true;
});



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

                //method to load buttons on page
                loadPageBtns();

                    //check to see if it contains 'sidebar' --> add 'search'
                if (allElements[i].className.toString().match(/sidebar/g)){
                    continue;
                }else{
                    let classArr = allElements[i].className.toString().split(' ');
                    let ingredURL = document.getElementsByClassName(classArr[0]);
                    console.log(ingredURL.item(0));
                    ingredURL.item(0).scrollIntoView(true);
                
                    break;
                }

                
            }
        }
    }
    return true;
});

function loadPageBtns() {
    let container = document.createElement('div');
    container.id = 'btns-container';

    let ingredientsBtn = document.createElement('button');
    ingredientsBtn.id = 'ingredients-btn';
    ingredientsBtn.classList.add('page-btns');
    ingredientsBtn.innerText = 'Get Ingredients';

    let recipesBtn = document.createElement('button');
    recipesBtn.id = 'recipes-btn';
    recipesBtn.classList.add('page-btns');
    recipesBtn.innerText = 'Get Recipe';

    container.appendChild(ingredientsBtn);
    container.appendChild(recipesBtn);

    document.body.appendChild(container);
}

