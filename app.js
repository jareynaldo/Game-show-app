const keyboard = document.querySelectorAll(`button`);
const mainDiv = document.querySelector(`#phrase`);
const ul = document.querySelector(`#ul`);
const reset = document.querySelector(`.btn__reset`);
const overlay = document.querySelector(`#overlay`)
const imgs = document.querySelectorAll(`img`);
const start = document.querySelector(`.start`).firstElementChild;
const createdBtn = document.querySelectorAll('.btn__reset')[1];
const phrases = [ `whos house is this`, `the cat ate it`, `who is joe`, `your person`, `who knows`];
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
        return `true`;
    } else {
        return returnValue;
       }
}

function missedAnswer (found){
    if(found === `true`){
        for(j = 0; j < imgs.length ; j++){
            if(imgs[j].src === 'file:///C:/Treehouse%20techdegree/Unit-6-Game-Show-App/Game-show-app/images/liveHeart.png'){
                imgs[j].src='file:///C:/Treehouse%20techdegree/Unit-6-Game-Show-App/Game-show-app/images/lostHeart.png';
                missed += 1;
                break;
            }
        }
    }
}
function newBtn(name){ 
    let addedBtn = document.createElement(`a`);
    addedBtn.textContent= name;
    addedBtn.className= `btn__reset`;
    overlay.appendChild(addedBtn);
    return addedBtn;
}
function checkNewBtn(target){ 
    target.addEventListener(`click`, () => { 
        console.log(`yes`);
        overlay.className = `start`;
    })
}


function checkWin (){ 
    const letters = document.querySelectorAll(`.show`);
    const correct = document.querySelectorAll(`.letter`);
    if (letters.length === correct.length){ 
        overlay.className = `win`;
        start.textContent=`Congrats! you won.`;
        let newBtn1 = addedBtn(`see if you can do it twice`);
        checkNewBtn(newBtn1);
    }
    if (missed >= 5){ 
        overlay.className = `lose`;
        start.textContent=`sorry about that, you lost :(.`;
        reset.style.display =`none`;
        let newBtn1 = newBtn(`Try again`);
        checkNewBtn(newBtn1);
    }
}

for (let i = 0; i < keyboard.length ; i++){
    keyboard[i].addEventListener(`click`, (e) => { 
        let letterFound = ``;
            if(e.target === keyboard[i]){
                let targeted = e.target;
                targeted.className = `chosen`;
                letterFound += checkLetter(targeted.textContent);
                missedAnswer(letterFound);
                checkWin(); 
                 keyboard[i].disabled = true;
            }
    })
}
