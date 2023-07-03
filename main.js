const wordList = [
    {
        word: "search",
        hint: "The act of finding something"
    },
    {
        word: "jpeg",
        hint: "a small format of an image"
    },
    {
        word: "svg",
        hint: "a vector image format"
    },
    {
        word: "idea",
        hint: "a thought or suggestion"
    },
    {
        word: "air",
        hint: "the invisible gaseous formation"
    },
    {
        word: "rocket",
        hint: "a space vehicle"
    },
    {
        word: "mars",
        hint: "the second smallest planet"
    },
    {
        word: "apple",
        hint: "mobile manufacture brand"
    },
    {
        word: "email",
        hint: "related to sending message"
    },
    {
        word: "html",
        hint: "markup language for web development"
    },



]
const inputs = document.querySelector(".inputs"),
    resetBtn = document.querySelector(".reset-btn"),
    wrongLetter = document.querySelector(".wrong-letters"),
    hint = document.querySelector(".hint span"),
    guessLeft = document.querySelector(".guess-left span"),
    typingInput = document.querySelector(".typing-input");

let word, maxGuesses, corrects = [], incorrects = [];
function randomWord() {
    let randomObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = randomObj.word;
    maxGuesses = 6; corrects = []; incorrects = [];
    console.log(word);
    hint.innerText = randomObj.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrects;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;
}
randomWord();
function initGame(e) {
    let key = e.target.value;
    if (key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key}`)
        && !corrects.includes(key)) {
        console.log(key);
        if (word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] === key) {
                    corrects.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;
            incorrects.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrects;
    }
    typingInput.value = "";
    setTimeout(() => {
        if (corrects.length === word.length) {
            alert(`Congrats! You found the word.`);
            randomWord();
        }
        else if (maxGuesses < 1) {
            alert("Game over! you don't have remaining guesses");
            for (let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    });
}
resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());