const text = "camillof.dev";
const typingText = document.getElementById("typing-text");
const typingSound = document.getElementById("typing-sound");
let index = 0;

function typeText() {
  if (index === 0) {
    typingSound.play();
  }

  if (index < text.length) {
    typingText.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeText, 150);
  } else {
    typingSound.pause();
    typingSound.currentTime = 0;
  }
}

window.onload = typeText;
