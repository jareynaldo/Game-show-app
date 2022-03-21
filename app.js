const keyboard = document.querySelectorAll(`button`);
const mainDiv = document.querySelector(`#phrase`);
const ul = document.querySelector(`#ul`);
const start = document.querySelector(`#btn_reset`);
const overlay = document.querySelector(`#overlay`)
const imgs = document.querySelectorAll(`img`);
const phrases = [ `who is there`, `we are home`, `our house`, `this boat`, `what else`];
let missed = 0;


function rando(){ 
 let number = Math.floor(Math.random() * 5);
 return number;
}

// to start
document.addEventListener(`click`, () => { 
    overlay.style.display = `none`;
});
//pick a phrase
function getRandomPhraseAsArray(){
    return  phrases[rando()].split(``);
} 

function addPhraseToDisplay (theWord) { 
    // let theWord = argg;
 for(let i = 0; i < theWord.length; i++ ){
     let letter = document.createElement(`li`);
     letter.textContent= theWord[i];
     ul.appendChild(letter);
     if(theWord[i] !== ` `){ 
        letter.className = `letter`;
    } else { 
        letter.className = `space`;
    }
 }
}
let phraseArray = getRandomPhraseAsArray();
addPhraseToDisplay(phraseArray);


function checkLetter (argg){ 
    const letters = ul.children;
     let returnValue = ``;
     let word = [];
     for(var i = 0; i < letters.length - 1; i++){ 
        word[i] = letters[i].textContent;
     }
     for(let j = 0; j < letters.length; j++){
            if(letters[j].textContent === argg){
                letters[j].className += ` show`;
                returnValue += letters[j];   
            }   
        }
    if(returnValue === ``) { 
        return 'yes';
    } else {
        return returnValue;
       }
}

function missedAnswer (letterFound){
    if(letterFound === 'yes'){
        for(j = 0; j < imgs.length - 1; j++){
            if(imgs[j].src === 'file:///C:/Treehouse%20techdegree/Unit-6-Game-Show-App/Game-show-app/images/liveHeart.png'){
                imgs[j].src='file:///C:/Treehouse%20techdegree/Unit-6-Game-Show-App/Game-show-app/images/lostHeart.png';
                missed += 1;
                break;
            }
        }
    }
}


for (let i = 0; i < keyboard.length - 1; i++){
    keyboard[i].addEventListener(`click`, (e) => { 
        let letterFound = ``;
            if(e.target === keyboard[i]){
                let targeted = e.target;
                targeted.className = `chosen`;
                letterFound += checkLetter(targeted.textContent);
            }
         missedAnswer(letterFound);
    })
}
