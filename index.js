const text = "camillof.dev";
const typingText = document.getElementById("typing-text");
let index = 0;

function typeText() {
    if (index < text.length) {
        typingText.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeText, 150);
    }
}

window.onload = typeText;
