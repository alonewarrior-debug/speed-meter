// ========================================
// 3D TYPING SPEED TEST
// ========================================


// DOM
const textDisplay =
    document.getElementById("textDisplay");

const textInput =
    document.getElementById("textInput");

const timerElement =
    document.getElementById("timer");

const wpmElement =
    document.getElementById("wpm");

const accuracyElement =
    document.getElementById("accuracy");

const errorsElement =
    document.getElementById("errors");

const progressElement =
    document.getElementById("progress");

const startBtn =
    document.getElementById("startBtn");

const resetBtn =
    document.getElementById("resetBtn");

const result =
    document.getElementById("result");

const finalWpm =
    document.getElementById("finalWpm");

const finalAccuracy =
    document.getElementById("finalAccuracy");

const finalErrors =
    document.getElementById("finalErrors");

const tryAgainBtn =
    document.getElementById("tryAgainBtn");

const typingCard =
    document.getElementById("typingCard");


// ========================================
// TEXT DATABASE
// ========================================

const texts = [

    "The quick brown fox jumps over the lazy dog.",

    "Success comes from consistent effort and daily practice.",

    "Learning JavaScript becomes easier when you build real projects.",

    "Great things happen when you stay focused and keep moving forward.",

    "Programming is the art of solving problems with logic creativity and patience.",

    "Every expert was once a beginner who decided to keep practicing.",

    "The best way to learn coding is to create projects and experiment with new ideas."

];


// ========================================
// VARIABLES
// ========================================

let currentText = "";

let timer = 60;

let timerInterval = null;

let testStarted = false;

let errors = 0;

let totalTyped = 0;


// ========================================
// RANDOM TEXT
// ========================================

function getRandomText() {

    const index =
        Math.floor(
            Math.random() * texts.length
        );

    return texts[index];

}


// ========================================
// DISPLAY TEXT
// ========================================

function displayText() {

    textDisplay.innerHTML = "";

    currentText =
        getRandomText();

    currentText
        .split("")
        .forEach(character => {

            const span =
                document.createElement("span");

            span.textContent =
                character;

            textDisplay.appendChild(
                span
            );

        });

    const first =
        textDisplay.querySelector("span");

    if (first) {

        first.classList.add(
            "current"
        );

    }

}


// ========================================
// START
// ========================================

function startTest() {

    if (testStarted) {
        return;
    }

    testStarted = true;

    timer = 60;

    errors = 0;

    totalTyped = 0;

    timerElement.textContent =
        timer;

    wpmElement.textContent =
        "0";

    accuracyElement.textContent =
        "100";

    errorsElement.textContent =
        "0";

    progressElement.style.width =
        "0%";

    result.classList.add(
        "hidden"
    );

    textInput.disabled = false;

    textInput.value = "";

    textInput.focus();

    startBtn.disabled = true;

    startBtn.textContent =
        "⌨️ TYPING...";

    startTimer();

}


// ========================================
// TIMER
// ========================================

function startTimer() {

    timerInterval =
        setInterval(() => {

            timer--;

            timerElement.textContent =
                timer;

            const progress =
                ((60 - timer) / 60) * 100;

            progressElement.style.width =
                `${progress}%`;

            if (timer <= 0) {

                finishTest();

            }

        }, 1000);

}


// ========================================
// INPUT
// ========================================

textInput.addEventListener(
    "input",
    function () {

        if (!testStarted) {
            return;
        }

        const typedText =
            textInput.value;

        const characters =
            textDisplay.querySelectorAll(
                "span"
            );

        errors = 0;

        totalTyped =
            typedText.length;


        characters.forEach(
            (character, index) => {

                character.classList.remove(
                    "correct",
                    "incorrect",
                    "current"
                );

                const typedCharacter =
                    typedText[index];


                if (
                    typedCharacter ===
                    character.textContent
                ) {

                    character.classList.add(
                        "correct"
                    );

                }

                else if (
                    typedCharacter !==
                    undefined
                ) {

                    character.classList.add(
                        "incorrect"
                    );

                    errors++;

                }


                if (
                    index ===
                    typedText.length
                ) {

                    character.classList.add(
                        "current"
                    );

                }

            }
        );


        errorsElement.textContent =
            errors;


        updateStats();


        if (
            typedText.length >=
            currentText.length
        ) {

            finishTest();

        }

    }
);


// ========================================
// STATS
// ========================================

function updateStats() {

    const elapsed =
        60 - timer;

    if (elapsed <= 0) {
        return;
    }


    const words =
        totalTyped / 5;

    const minutes =
        elapsed / 60;

    const wpm =
        Math.round(
            words / minutes
        );


    wpmElement.textContent =
        isFinite(wpm)
            ? wpm
            : 0;


    const accuracy =
        totalTyped === 0
            ? 100
            : Math.max(
                0,
                Math.round(
                    (
                        (totalTyped - errors) /
                        totalTyped
                    ) * 100
                )
            );


    accuracyElement.textContent =
        accuracy;

}


// ========================================
// FINISH
// ========================================

function finishTest() {

    clearInterval(
        timerInterval
    );

    testStarted = false;

    textInput.disabled = true;

    startBtn.disabled = false;

    startBtn.textContent =
        "▶ START TEST";


    const elapsed =
        Math.max(
            1,
            60 - timer
        );


    const words =
        totalTyped / 5;

    const minutes =
        elapsed / 60;

    const wpm =
        Math.round(
            words / minutes
        );


    const accuracy =
        totalTyped === 0
            ? 100
            : Math.max(
                0,
                Math.round(
                    (
                        (totalTyped - errors) /
                        totalTyped
                    ) * 100
                )
            );


    finalWpm.textContent =
        isFinite(wpm)
            ? wpm
            : 0;

    finalAccuracy.textContent =
        `${accuracy}%`;

    finalErrors.textContent =
        errors;


    result.classList.remove(
        "hidden"
    );

}


// ========================================
// RESET
// ========================================

function resetTest() {

    clearInterval(
        timerInterval
    );

    testStarted = false;

    timer = 60;

    errors = 0;

    totalTyped = 0;


    timerElement.textContent =
        "60";

    wpmElement.textContent =
        "0";

    accuracyElement.textContent =
        "100";

    errorsElement.textContent =
        "0";

    progressElement.style.width =
        "0%";


    textInput.value = "";

    textInput.disabled = true;


    startBtn.disabled = false;

    startBtn.textContent =
        "▶ START TEST";


    result.classList.add(
        "hidden"
    );


    displayText();

}


// ========================================
// BUTTONS
// ========================================

startBtn.addEventListener(
    "click",
    startTest
);

resetBtn.addEventListener(
    "click",
    resetTest
);

tryAgainBtn.addEventListener(
    "click",
    resetTest
);


// ========================================
// 3D MOUSE TILT
// ========================================

document.addEventListener(
    "mousemove",
    function (event) {

        const x =
            (window.innerWidth / 2 -
                event.clientX) / 35;

        const y =
            (window.innerHeight / 2 -
                event.clientY) / 35;


        typingCard.style.transform =
            `rotateY(${x}deg)
             rotateX(${y}deg)`;

    }
);


// ========================================
// RESET 3D POSITION
// ========================================

document.addEventListener(
    "mouseleave",
    function () {

        typingCard.style.transform =
            "rotateY(0deg) rotateX(0deg)";

    }
);


// ========================================
// INITIALIZE
// ========================================

resetTest();