const text = "camillof.dev";
const typingText = document.getElementById("typing-text");
const typingSound = document.getElementById("typing-sound");
let index = 0;
let isWriting = false;

async function typeText() {
  isWriting = true;
  while (index < text.length) {
    await addChar(text.charAt(index));
    index++;
  }
  isWriting = false;

  typingSound.pause();
  typingSound.currentTime = 0;
}

function addChar(actualChar) {
  return new Promise((resolve) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789?!@#$%^&*()_+-=[]{}|;:,.<>/?\\";

    const currentText = typingText.textContent;
    const shuffleCount = 3;
    let count = 0;

    const shuffle = () => {
      if (count < shuffleCount) {
        let randomChar = characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
        typingText.textContent = currentText + randomChar;
        count++;
        setTimeout(shuffle, 150);
      } else {
        typingText.textContent = currentText + actualChar;
        resolve();
      }
    };

    shuffle();
  });
}

function startTypingSound() {
  if (isWriting) {
    typingSound.play();
  }
}

window.onload = typeText;
window.addEventListener("click", startTypingSound, { once: true });
