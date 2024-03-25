const text = "camillof.dev";
const typingText = document.getElementById("typing-text");
const typingSound = document.getElementById("typing-sound");
let index = 0;

async function typeText() {
  while (index < text.length) {
    await shuffleChar(index, text.charAt(index));
    index++;
  }

  typingSound.pause();
  typingSound.currentTime = 0;
}

function shuffleChar(position, actualChar) {
  return new Promise((resolve) => {
    const shuffleCount = 3;
    let count = 0;

    const shuffle = () => {
      if (count < shuffleCount) {
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789?!@#$%^&*()_+-=[]{}|;:,.<>/?\\";
        let randomChar = characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
        typingText.textContent =
          typingText.textContent.substring(0, position) +
          randomChar +
          typingText.textContent.substring(position + 1);
        count++;
        setTimeout(shuffle, 150);
      } else {
        typingText.textContent =
          typingText.textContent.substring(0, position) +
          actualChar +
          typingText.textContent.substring(position + 1);
        resolve();
      }
    };

    shuffle();
  });
}

function startTypingSound() {
  typingSound.play();
}

window.onload = typeText;
window.addEventListener("click", startTypingSound, {once : true});
