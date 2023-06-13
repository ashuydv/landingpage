var phrases = [
  "Tokenomics Feedback",
  "Beta Testing",
  "Pre - ICO Market Research",
];

var currentPhraseIndex = 0;
var currentPhrase = phrases[currentPhraseIndex];
var charIndex = 0;
var eraseMode = false;
var t;

function typewriterEffect() {
  var animElement = document.getElementById("anim");
  var shuffleElement = document.getElementById("shuffle");

  if (!eraseMode && charIndex <= currentPhrase.length) {
    animElement.textContent = currentPhrase.substring(0, charIndex);
    charIndex++;
  } else if (eraseMode && charIndex >= 0) {
    animElement.textContent = currentPhrase.substring(0, charIndex);
    charIndex--;
  } else {
    shuffleElement.innerHTML = "";
    clearInterval(t);

    eraseMode = !eraseMode;

    if (!eraseMode) {
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      currentPhrase = phrases[currentPhraseIndex];
    }

    var delay = eraseMode ? 500 : 1000;
    setTimeout(startTypewriterEffect, delay);
    return;
  }

  shuffleElement.textContent = getRandomChar();
}

function startTypewriterEffect() {
  var animElement = document.getElementById("anim");
  animElement.innerHTML = "";
  charIndex = eraseMode ? currentPhrase.length : 0;
  t = setInterval(typewriterEffect, 60);
}

function getRandomChar() {
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@$%&";
  return chars[Math.floor(Math.random() * chars.length)];
}

startTypewriterEffect();
