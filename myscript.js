/* =============================================
   GOUTHAM JOSH — PORTFOLIO 2026
   myscript.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- AUTO AGE CALCULATION ----
     Birthday: 19 April 2006
     Updates automatically on load and every year */
  const BIRTHDAY = new Date('2006-04-19');

  function calcAge(birthday) {
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const monthDiff = today.getMonth() - birthday.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }
    return age;
  }

  const currentAge = calcAge(BIRTHDAY);

  // Update all age display elements
  ['ageDisplay', 'ageStatDisplay'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = currentAge;
  });

  // Footer year
  const footerYear = document.getElementById('footerYear');
  if (footerYear) footerYear.textContent = new Date().getFullYear();


  /* ---- CURSOR GLOW ---- */
  const glow = document.getElementById('cursorGlow');
  if (glow) {
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX; mouseY = e.clientY;
    });
    function animateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }


  /* ---- NAVBAR SCROLL ---- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }


  /* ---- MOBILE MENU ---- */
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      menuBtn.classList.toggle('open', isOpen);
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuBtn.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });
  }


  /* ---- SMOOTH SCROLL ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = this.getAttribute('href');
      if (!target || target === '#') return;
      const el = document.querySelector(target);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });


  /* ---- TYPING ANIMATION ---- */
  const typingEl = document.getElementById('typingTarget');
  const roles = ['BCA Student', 'Bot Developer', 'Cybersecurity Enthusiast', 'Automation Architect', ':)'];
  if (typingEl && roles.length) {
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let pause = false;

    function type() {
      const current = roles[roleIdx];
      if (pause) {
        setTimeout(type, 1200);
        pause = false;
        return;
      }
      if (!isDeleting) {
        typingEl.textContent = current.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          isDeleting = true; pause = true;
          setTimeout(type, 80);
          return;
        }
      } else {
        typingEl.textContent = current.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          isDeleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
        }
      }
      setTimeout(type, isDeleting ? 55 : 90);
    }
    type();
  }


  /* ---- SCROLL REVEAL ---- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.revealDelay || (i * 60);
          setTimeout(() => el.classList.add('revealed'), Number(delay));
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('revealed'));
  }


  /* ---- MUSIC PLAYER ---- */
  const audioFiles = ['assests/music1.mp3', 'assests/music2.mp3', 'assests/music3.mp3'];
  const tracks = audioFiles.map(src => {
    const a = new Audio(src);
    a.preload = 'none';
    return a;
  });
  const trackBtns = [
    document.getElementById('pb1'),
    document.getElementById('pb2'),
    document.getElementById('pb3')
  ].filter(Boolean);
  const nowPlayingEl = document.getElementById('nowPlaying');
  const eqEl = document.getElementById('equalizer');

  let current = -1;

  function stopAll() {
    tracks.forEach(t => { t.pause(); t.currentTime = 0; });
    trackBtns.forEach((btn, i) => {
      if (btn) { btn.textContent = `▶ track_0${i + 1}`; btn.classList.remove('playing'); }
    });
    if (nowPlayingEl) nowPlayingEl.textContent = '// no track playing';
    if (eqEl) eqEl.classList.remove('playing');
    current = -1;
  }

  trackBtns.forEach((btn, idx) => {
    if (!btn) return;
    const track = tracks[idx];
    btn.addEventListener('click', () => {
      if (current !== idx) {
        stopAll();
        current = idx;
        track.play().catch(err => { if (err.name !== 'AbortError') console.warn('Audio play error:', err); });
        btn.textContent = `⏸ track_0${idx + 1}`;
        btn.classList.add('playing');
        if (nowPlayingEl) nowPlayingEl.textContent = `// playing: track_0${idx + 1}`;
        if (eqEl) eqEl.classList.add('playing');
      } else {
        if (track.paused) {
          track.play().catch(err => { if (err.name !== 'AbortError') console.warn(err); });
          btn.textContent = `⏸ track_0${idx + 1}`;
          btn.classList.add('playing');
          if (eqEl) eqEl.classList.add('playing');
        } else {
          track.pause();
          btn.textContent = `▶ track_0${idx + 1}`;
          btn.classList.remove('playing');
          if (eqEl) eqEl.classList.remove('playing');
        }
      }
    });
    track.addEventListener('ended', () => stopAll());
  });


  /* ---- CONTACT FORM ---- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name    = (this.querySelector('[name="name"]')?.value || '').trim();
      const email   = (this.querySelector('[name="email"]')?.value || '').trim();
      const message = (this.querySelector('[name="message"]')?.value || '').trim();
      if (!name || !email || !message) {
        alert('Please fill in all fields before sending.');
        return;
      }
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:gouthamjosh22@gmail.com?subject=${subject}&body=${body}`;
    });
  }


  /* ---- BACK TO TOP ---- */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('show', window.scrollY > 300);
    }, { passive: true });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }


  /* ---- GLITCH / SHUFFLE TEXT LOGO ---- */
  const logoText = document.getElementById('logoText');
  if (logoText) {
    const original = 'GJ';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    logoText.addEventListener('mouseenter', () => {
      let iter = 0;
      const interval = setInterval(() => {
        logoText.textContent = original.split('').map((c, i) =>
          i < iter ? original[i] : chars[Math.floor(Math.random() * chars.length)]
        ).join('');
        if (iter >= original.length) clearInterval(interval);
        iter += 0.5;
      }, 60);
    });
  }


  /* ---- PROJECT CARD STAGGER ---- */
  document.querySelectorAll('.project-card[data-reveal]').forEach((card, i) => {
    card.dataset.revealDelay = i * 100;
  });


  /* ---- ACTIVE NAV HIGHLIGHT on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navAs = document.querySelectorAll('.nav-links a');
  if (sections.length && navAs.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAs.forEach(a => {
            a.style.color = '';
          });
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.style.color = 'var(--cyan)';
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(s => sectionObserver.observe(s));
  }

});
