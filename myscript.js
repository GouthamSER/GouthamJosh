// Robust front-end behaviors: guarded selectors and DOMContentLoaded wrapper
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const dropdown = document.querySelector(".dropdown");
  const hamburgBtn = document.querySelector(".hamburg");
  const cancelBtn = document.querySelector(".cancel");
  if (hamburgBtn && dropdown) {
    hamburgBtn.addEventListener("click", () => dropdown.classList.add("open"));
  }
  if (cancelBtn && dropdown) {
    cancelBtn.addEventListener("click", () => dropdown.classList.remove("open"));
  }

  // Typing animation (safe)
  const typingSpan = document.querySelector(".typing-text span");
  const roles = ["BCA Student", "Bot Developer", "Telegram Enthusiast", ":)"].filter(Boolean);
  if (typingSpan && roles.length) {
    let index = 0;
    const tick = () => {
      typingSpan.textContent = roles[index];
      index = (index + 1) % roles.length;
    };
    tick();
    setInterval(tick, 2250);
  }

  // Shuffle text animation (logo/name) - guard dataset
  document.querySelectorAll(".shuffle-text").forEach((el) => {
    const original = el.dataset.value || el.textContent || "";
    el.addEventListener("mouseenter", () => {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let iteration = 0;
      const interval = setInterval(() => {
        el.textContent = original
          .split("")
          .map((letter, i) => (i < iteration ? original[i] : letters[Math.floor(Math.random() * 26)]))
          .join("");
        if (iteration >= original.length) clearInterval(interval);
        iteration += 0.5;
      }, 40);
    });
  });

  // Music controls - fixed asset paths and guarded elements
  const audioFiles = ["assests/music1.mp3", "assests/music2.mp3", "assests/music3.mp3"];
  const tracks = audioFiles.map(src => new Audio(src));
  const playButtons = audioFiles.map((_, i) => document.getElementById(`playButton${i+1}`)).filter(Boolean);
  const nowPlaying = document.querySelector(".now-playing");
  const equalizer = document.querySelector(".music-equalizer");

  let currentIndex = -1;

  function stopAll() {
    tracks.forEach(t => { t.pause(); t.currentTime = 0; });
    playButtons.forEach((btn, idx) => btn.innerHTML = `<i class="fa-solid fa-play"></i>  ${idx+1}`);
    if (nowPlaying) nowPlaying.textContent = "";
    if (equalizer) equalizer.classList.remove("playing");
    currentIndex = -1;
  }

  playButtons.forEach((btn, idx) => {
    const track = tracks[idx];
    btn.addEventListener("click", () => {
      if (currentIndex !== idx) {
        stopAll();
        currentIndex = idx;
        track.play().catch(err => { if (err.name !== 'AbortError') console.error(err); });
        btn.innerHTML = `<i class="fa-solid fa-pause"></i>  ${idx+1}`;
        if (nowPlaying) nowPlaying.textContent = `Now Playing: Track ${idx+1}`;
        if (equalizer) equalizer.classList.add("playing");
      } else {
        if (track.paused) {
          track.play().catch(err => { if (err.name !== 'AbortError') console.error(err); });
          btn.innerHTML = `<i class="fa-solid fa-pause"></i>  ${idx+1}`;
          if (equalizer) equalizer.classList.add("playing");
        } else {
          track.pause();
          btn.innerHTML = `<i class="fa-solid fa-play"></i>  ${idx+1}`;
          if (equalizer) equalizer.classList.remove("playing");
        }
      }
    });
    // ensure track stops when ended
    track.addEventListener('ended', () => stopAll());
  });

  // Back to top button
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) backToTop.classList.add('show'); else backToTop.classList.remove('show');
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Download CV - guard
  window.downloadCV = function() {
    const cvPath = 'assests/Goutham_Josh_CV.pdf';
    window.open(cvPath, '_blank');
  };

  // Smooth scroll for anchors (only if target exists)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = this.getAttribute('href');
      if (!target || target === '#') return;
      const el = document.querySelector(target);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
      // close dropdown on mobile
      if (dropdown) dropdown.classList.remove('open');
    });
  });

  // Navbar scroll effect
  const navbar = document.querySelector('nav');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled');
    });
  }
});
