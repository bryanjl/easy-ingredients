
//MESSAGE LISTENERS---------------------------------

//message from background.js that page has loaded
//if ingreidents classname found loadPageBtns called
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === 'page_loaded'){
        const allElements = document.querySelectorAll('*');

        for(let i = 0; i < allElements.length; i++) {
            if(allElements[i].className.toString().match(/ingredient/g)){
                loadPageBtns(request.data);
                break;
            }   
        }   
    }
});


//listen for message from popup.js "get_ingredients"
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === 'get_ingredients') {
        scrollToIngredients();
    }
});

//listen for message from popup.js "get_recipe"
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === 'get_recipe') {
        scrollToDirections();
    }
});

//--------------------------------------------------------------------




//PAGE FUNCTIONS ----------------------------------------------------


//find the ingredients classname and scroll section into view
function scrollToIngredients(){
    const allElements = document.querySelectorAll('*');

    for(let i = 0; i < allElements.length; i++){
        //search for classnames that include 'ingredients'
        if (allElements[i].className.toString().match(/ingredient/g)){
             //check to see if it contains 'sidebar' --> add 'search'
            if (allElements[i].className.toString().match(/sidebar|search/g)){
                continue;
            }else{
                let classArr = allElements[i].className.toString().split(' ');
                let ingredURL = document.getElementsByClassName(classArr[0]);
    
                ingredURL.item(0).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
                break;
            }  
        }
    }
}

//find the direction/instruction classname and scroll section into view
function scrollToDirections() {
    //Get all html from page
    const allElements = document.querySelectorAll('*');

    for(let i = 0; i < allElements.length; i++){
        if(allElements[i].className.toString().match(/direction|instruction/g)){
            let classArr = allElements[i].className.toString().split(' ');
            let directionURL = document.getElementsByClassName(classArr[0]);
    
            directionURL.item(0).scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
            break;
        }
    }
}

//---------------------------------------------------------------------


//loads the buttons for the website if user_data.show_btns = true
function loadPageBtns(user_data) {
    if(user_data.btn_disp){
        //container for buttons on page
        let container = document.createElement('div');
        container.id = 'btns-container';

        //ingredients button
        let ingredientsBtn = document.createElement('button');
        ingredientsBtn.id = 'ingredients-btn';
        ingredientsBtn.classList.add('page-btns');
        ingredientsBtn.classList.add('animated');
        ingredientsBtn.classList.add('bounceInLeft');
        ingredientsBtn.innerText = 'Get Ingredients';
        ingredientsBtn.addEventListener('click', () => {
            scrollToIngredients();
        });
        ingredientsBtn.addEventListener('mouseover', () => {
            ingredientsBtn.classList.remove('animated');
        });


        //load event handler for click on recipe 
        //recipe button
        let recipesBtn = document.createElement('button');
        recipesBtn.id = 'recipes-btn';
        recipesBtn.classList.add('page-btns');
        recipesBtn.classList.add('animated');
        recipesBtn.classList.add('bounceInLeft');
        recipesBtn.innerText = 'Get Recipe';
        recipesBtn.addEventListener('click', () => {
            scrollToDirections();
        });
        recipesBtn.addEventListener('mouseover', () => {
            recipesBtn.classList.remove('animated');
        });

        container.appendChild(ingredientsBtn);
        container.appendChild(recipesBtn);

        document.body.appendChild(container);
    }  
}


//------------------------------------------------------------------




