const keyboard = document.querySelectorAll(`button`);
const mainDiv = document.querySelector(`#phrase`);
const unorderedList = document.querySelector(`#ul`);
const reset = document.querySelector(`.btn__reset`);
const overlay = document.querySelector(`#overlay`)
const imgs = document.querySelectorAll(`img`);
const start = document.querySelector(`.start`).firstElementChild;
const createdBtn = document.querySelectorAll('.btn__reset')[1];
const phrases = [ `what does the dog say`, `what are those`, `your mom`, `wozers`, `totally crazy`];
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
 for(let i = 0; i < theWord.length; i++ ){
     let letter = document.createElement(`li`);
     letter.textContent= theWord[i];
     unorderedList.appendChild(letter);
     if(theWord[i] !== ` `){ 
        letter.className = `letter`;
    } else { 
        letter.className = `space`;
    }
 }
}
let phraseArray = getRandomPhraseAsArray();
addPhraseToDisplay(phraseArray);

// will check if the letter chosen is the same as a phrase that
// already exist 

function checkLetter (argg){ 
    const letters = unorderedList.children;
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
        return false;
    } else {
        return returnValue;
       }
}
// will change the pictures to their apropriate phase
function missedAnswer (found){
    if(!found){
        imgs[missed].src="images/lostHeart.png";
        missed += 1;
    }
}
function resetPicture (){
    missed -= 5;
    for(j = 0; j < imgs.length ; j++){
        imgs[missed].src="images/liveHeart.png";
        missed++;
        
    }
}

//     will create new button, check if the new btn has been clicked, and reset the
//      old phrase to a new one
function newBtn(name){ 
    let btnClass = document.querySelectorAll(`.btn__reset`);
    if(btnClass.length < 2){
        reset.style.display =`none`;
        let addedBtn = document.createElement(`a`);
        addedBtn.textContent= name;
        addedBtn.className= `btn__reset`;
        overlay.appendChild(addedBtn);
        return addedBtn;
    }
}
function checkNewBtn(target){ 
    target.addEventListener(`click`, () => { 
        overlay.className = `start`;
    })
}
function resetEverything(){ 
    let resetButton = document.getElementsByClassName(`chosen`);
    let deletingElements = unorderedList.children;
    for(let z = 0; z < deletingElements.length;){
        unorderedList.removeChild(unorderedList.firstChild);
    }
    for( let x = 0; x < resetButton.length; ){ 
        resetButton[x].disabled = false;
        resetButton[x].className=``;
    }
    let phraseArray = getRandomPhraseAsArray();
    addPhraseToDisplay(phraseArray);
    resetPicture();
    missed -= 5;
}
// checks if the game has been won or lost and resets the game
function checkWin (){ 
    const letters = document.querySelectorAll(`.show`);
    const correct = document.querySelectorAll(`.letter`);
    if (letters.length === correct.length){ 
        overlay.className = `win`;
        start.textContent=`Congrats! you won.`;
        let newBtn1 = newBtn(`see if you can do it twice`);
        resetEverything();
        checkNewBtn(newBtn1);
    }
    if (missed >= 5){ 
        overlay.className = `lose`;
        start.textContent=`sorry about that, you lost :(.`;
        let newBtn2 = newBtn(`Try again`);
        resetEverything();
        checkNewBtn(newBtn2);
    }
}

// to check if new evetns are happeing and basically uses all of the 
// above functions to put it all togther 

for (let i = 0; i < keyboard.length ; i++){
    keyboard[i].addEventListener(`click`, (e) => { 
            if(e.target === keyboard[i]){
                let targeted = e.target;
                targeted.className = `chosen`;
                let letterFound = checkLetter(targeted.textContent);
                missedAnswer(letterFound);
                checkWin(); 
                 keyboard[i].disabled = true;
            }
    })
}
