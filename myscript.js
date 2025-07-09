const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
let interval = null;

function shuffleText(element) {
  const originalText = element.dataset.value;
  const textLength = originalText.length;
  let iteration = 0;

  clearInterval(interval);

  interval = setInterval(() => {
    element.innerText = originalText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return originalText[index];
        }
        return characters[Math.floor(Math.random() * characters.length)];
      })
      .join("");

    if (iteration >= textLength) {
      clearInterval(interval);
      element.innerText = originalText; // Ensure the final text is the original text
    }

    iteration += 1 / textLength; // Adjust the speed of the shuffle
  }, 40); // Adjust the interval time to make the shuffle slower
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.querySelectorAll(".shuffle-text").forEach(shuffleText);
  }, 600); // Delay of 1500ms before starting the shuffle effect

  // Ensure the audio plays automatically
  const audioPlayer = document.getElementById('audioPlayer');
  audioPlayer.play().catch(error => {
    console.log('Autoplay was prevented:', error);
  });

  // Add event listener for play button
  document.getElementById('playButton').addEventListener('click', playAudio);
});

function playAudio() {
  const audioPlayer = document.getElementById('audioPlayer');
  const playButton = document.getElementById('playButton');
  const playIcon = playButton.querySelector('i');

  if (audioPlayer.paused) {
    audioPlayer.play();
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
  } else {
    audioPlayer.pause();
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
  }
}

function hamburg() {
  const navbar = document.querySelector(".dropdown");
  navbar.style.left = "0";
}

function cancel() {
  const navbar = document.querySelector(".dropdown");
  navbar.style.left = "-250px";
}

function downloadCV() {
  const link = document.createElement('a');
  link.href = 'assests/GOUTHAM JOSH (3).pdf'; // Replace with the actual path to your CV file
  link.download = 'GOUTHAM JOSH CV.pdf'; // The name of the file to be downloaded
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

