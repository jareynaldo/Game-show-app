const keyboard = document.querySelector(`#qwerty`);
const div = document.querySelector(`#phrase`);
const ul = document.querySelector(`#ul`);
const start = document.querySelector(`#btn_reset`);
const overlay = document.querySelector(`#overlay`)
const phrases = [ `your Mom`, `my mom`, `our mom`, `who is joe`, `what is deez`];
let missed = 0;

function rando(){ 
 let number = Math.floor(Math.random() * 5);
 return number;
};

// to start
document.addEventListener(`click`, () => { 
    overlay.style.display = `none`;
});
//pick a phrase
function getRandomPhraseAsArray(){
  let picked = phrases[rando()];
  let returned = picked.split(``);
  return returned;
} 

function addPhraseToDisplay (argg) { 
    let theWord = argg;
 for(let i = 0; i < theWord.length; i++ ){
     let letter = document.createElement(`li`);
     letter.textContent= theWord[i];
     ul.appendChild(letter);
     if(letter.textContent !== ` `){ 
        letter.className = `letter`;
    }
 }
};
let phraseArray = getRandomPhraseAsArray()
addPhraseToDisplay(phraseArray);

function checkLetter (argg){ 
const letters = document.getElementsByClassName(`letter`);
for(let i = 0; i < letters.length; i++){
     if(letters[i].textContent === argg.textContent){ 
         letter[i].className = `show`
         let returnLetter = letter[i].textContent;
         return returnLetter;
     } else { 
         return `null`;
     }
}};

keyboard.addEventListener(`click`, (e) => { 
    let button = document.querySelectorAll(`button`);
    for(i = 0; i < button.length; i++){
        if(e.target === button[i]);{
            let targeted = e.target.textContent;
            targeted.className = `chosen`;
        letterFound = checkLetter(targeted);
        }
}
});
