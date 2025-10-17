// === Mobile Navigation Toggle ===
function hamburg() {
  document.querySelector(".dropdown").classList.add("open");
}

function cancel() {
  document.querySelector(".dropdown").classList.remove("open");
}

// === Typing Animation ===
const typingText = document.querySelector(".typing-text span");
const roles = ["BCA Student", "Bot Developer", "Telegram Enthusiast",":)"];
let index = 0;

function typingEffect() {
  typingText.textContent = roles[index];
  index = (index + 1) % roles.length;
}
setInterval(typingEffect, 2250);

// === Shuffle Text Animation ===
document.querySelectorAll(".shuffle-text").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let iteration = 0;
    const originalText = el.dataset.value;
    const interval = setInterval(() => {
      el.innerText = originalText
        .split("")
        .map((letter, i) => {
          if (i < iteration) return originalText[i];
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");
      if (iteration >= originalText.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 50);
  });
});

// === Music Controls ===
const tracks = [
  new Audio("assests/music1.mp3"),
  new Audio("assests/music2.mp3"),
  new Audio("assests/music3.mp3")
];

let currentTrack = null;

const playButtons = [
  document.getElementById("playButton1"),
  document.getElementById("playButton2"),
  document.getElementById("playButton3")
];

const nowPlaying = document.querySelector(".now-playing");
const equalizer = document.querySelector(".music-equalizer");

function stopAllTracks() {
  tracks.forEach((track) => {
    track.pause();
    track.currentTime = 0;
  });
  playButtons.forEach(btn => btn.innerHTML = '<i class="fa-solid fa-play"></i>  ' + (playButtons.indexOf(btn) + 1));
  nowPlaying.textContent = "";
  equalizer.style.opacity = 0.3;
}

playButtons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    if (currentTrack !== tracks[i]) {
      stopAllTracks();
      currentTrack = tracks[i];
      currentTrack.play();
      btn.innerHTML = '<i class="fa-solid fa-pause"></i>  ' + (i + 1);
      nowPlaying.textContent = "Now Playing:  " + (i + 1);
      equalizer.style.opacity = 1;
    } else {
      if (currentTrack.paused) {
        currentTrack.play();
        btn.innerHTML = '<i class="fa-solid fa-pause"></i>  ' + (i + 1);
        equalizer.style.opacity = 1;
      } else {
        currentTrack.pause();
        btn.innerHTML = '<i class="fa-solid fa-play"></i>  ' + (i + 1);
        equalizer.style.opacity = 0.3;
      }
    }
  });
});

// === Back to Top Button ===
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// === Download CV Button ===
function downloadCV() {
  const cvPath = "assests/GouthamJoshCV.pdf";
  window.open(cvPath, "_blank");
}

// === Smooth Scroll for Navbar Links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
  });
});

// === Equalizer Animation ===
const bars = document.querySelectorAll(".music-equalizer .bar");

// Control the speed of the equalizer updates (in ms)
const EQ_UPDATE_INTERVAL = 150; // 200ms per update (~5 times/sec)

function animateEqualizer() {
  if (currentTrack && !currentTrack.paused) {
    bars.forEach(bar => {
      // Random height based on "volume" approximation
      const height = Math.random() * 25 + 5;
      bar.style.height = height + "px";
    });
  } else {
    bars.forEach(bar => bar.style.height = "5px");
  }
  setTimeout(animateEqualizer, EQ_UPDATE_INTERVAL);
}

animateEqualizer();
const navbar = document.querySelector("nav");
window.addEventListener("scroll", () => {
    if(window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});
