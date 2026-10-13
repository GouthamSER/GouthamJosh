/* =============================================
   GOUTHAM JOSH — PORTFOLIO (Oct 2026 refresh)
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  const GH_USER = 'GouthamSER';

  /* ---- AGE + YEAR ---- */
  const BIRTHDAY = new Date('2006-04-19');
  const today = new Date();
  let age = today.getFullYear() - BIRTHDAY.getFullYear();
  const md = today.getMonth() - BIRTHDAY.getMonth();
  if (md < 0 || (md === 0 && today.getDate() < BIRTHDAY.getDate())) age--;
  const ageEl = $('#ageDisplay'); if (ageEl) ageEl.textContent = age;
  const yr = $('#footerYear'); if (yr) yr.textContent = today.getFullYear();

  /* ---- NAV: scroll progress, back-to-top, active link ---- */
  const progress = $('#progress'), toTop = $('#backToTop');
  const onScroll = () => {
    const h = document.documentElement;
    const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
    if (progress) progress.style.transform = `scaleX(${p})`;
    if (toTop) toTop.classList.toggle('show', h.scrollTop > 400);
  };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const navLinks = $$('.nav-links a');
  if ('IntersectionObserver' in window) {
    const so = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(s => so.observe(s));
  }

  /* ---- MOBILE MENU ---- */
  const menuBtn = $('#menuBtn'), mobileMenu = $('#mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    $$('a', mobileMenu).forEach(a => a.addEventListener('click', () => {
      mobileMenu.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false');
    }));
  }

  /* ---- THEME ---- */
  const root = document.documentElement;
  const setTheme = t => {
    root.dataset.theme = t; store.set('gj-theme', t);
    const m = document.querySelector('meta[name="theme-color"]');
    if (m) m.content = t === 'light' ? '#f6f4ee' : '#0b0c10';
  };
  const toggleTheme = () => setTheme(root.dataset.theme === 'light' ? 'dark' : 'light');
  const themeBtn = $('#themeBtn'); if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  if (!store.get('gj-theme') && window.matchMedia && matchMedia('(prefers-color-scheme: light)').matches) setTheme('light');

  /* ---- TYPING ---- */
  const typingEl = $('#typingTarget');
  const roles = ['BCA Student', 'Bot Developer', 'Android Builder', 'Automation Architect', 'Cybersecurity Enthusiast'];
  if (typingEl) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { typingEl.textContent = roles[1]; }
    else {
      let ri = 0, ci = 0, del = false;
      const tick = () => {
        const cur = roles[ri];
        typingEl.textContent = cur.slice(0, ci);
        if (!del && ci === cur.length) { del = true; return setTimeout(tick, 1500); }
        if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; return setTimeout(tick, 350); }
        ci += del ? -1 : 1;
        setTimeout(tick, del ? 35 : 75);
      };
      tick();
    }
  }

  /* ---- REVEAL ---- */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    let n = 0;
    const ro = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target; setTimeout(() => el.classList.add('in'), (n++ % 4) * 70);
        ro.unobserve(el);
      }
    }), { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(el => ro.observe(el));
  } else reveals.forEach(el => el.classList.add('in'));

  /* ---- CARD SPOTLIGHT ---- */
  $$('.card').forEach(c => c.addEventListener('pointermove', e => {
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }));

  /* ---- PROJECT FILTER ---- */
  const chips = $$('.chip'), cards = $$('#projectGrid .card'), emptyMsg = $('#emptyMsg');
  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.toggle('active', c === chip));
    const f = chip.dataset.filter; let shown = 0;
    cards.forEach(card => {
      const ok = f === 'all' || card.dataset.cat.split(' ').includes(f);
      card.classList.toggle('hide', !ok);
      if (ok) { shown++; card.classList.add('in'); }
    });
    if (emptyMsg) emptyMsg.hidden = shown > 0;
  }));

  /* ---- MUSIC ---- */
  const files = ['assets/music1.mp3', 'assets/music2.mp3', 'assets/music3.mp3'];
  const tracks = files.map(src => { const a = new Audio(src); a.preload = 'none'; return a; });
  const btns = ['pb1', 'pb2', 'pb3'].map(id => document.getElementById(id)).filter(Boolean);
  const nowEl = $('#nowPlaying'), eq = $('#equalizer');
  let cur = -1;
  const label = i => `${tracks[i].paused ? '▶' : '⏸'} 0${i + 1}`;
  const reset = () => {
    tracks.forEach(t => { t.pause(); t.currentTime = 0; });
    btns.forEach((b, i) => { b.textContent = `▶ 0${i + 1}`; b.classList.remove('playing'); });
    if (nowEl) nowEl.textContent = '// no track playing';
    if (eq) eq.classList.remove('playing');
    cur = -1;
  };
  btns.forEach((btn, i) => {
    tracks[i].addEventListener('ended', reset);
    btn.addEventListener('click', () => {
      if (cur !== i) {
        reset(); cur = i;
        tracks[i].play().catch(() => reset());
        btn.textContent = `⏸ 0${i + 1}`; btn.classList.add('playing');
        if (nowEl) nowEl.textContent = `// playing: track_0${i + 1}`;
        if (eq) eq.classList.add('playing');
      } else if (tracks[i].paused) {
        tracks[i].play().catch(() => reset());
        btn.textContent = `⏸ 0${i + 1}`; btn.classList.add('playing'); if (eq) eq.classList.add('playing');
      } else {
        tracks[i].pause(); btn.textContent = `▶ 0${i + 1}`; btn.classList.remove('playing'); if (eq) eq.classList.remove('playing');
      }
    });
  });

  /* ---- CONTACT FORM (opens mail client) ---- */
  const form = $('#contactForm'), msg = $('#formMsg');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const v = n => (form.elements[n].value || '').trim();
    const name = v('name'), email = v('email'), message = v('message');
    msg.classList.remove('ok');
    if (!name || !email || !message) { msg.textContent = 'Please fill in all fields.'; return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { msg.textContent = 'Enter a valid email address.'; return; }
    msg.classList.add('ok'); msg.textContent = 'Opening your email app…';
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:gouthamjosh22@gmail.com?subject=${subject}&body=${body}`;
  });

  /* ---- LIVE GITHUB ---- */
  const grid = $('#ghGrid');
  const LANG = { Python: '#3572A5', JavaScript: '#f1e05a', Kotlin: '#A97BFF', Shell: '#89e051', HTML: '#e34c26', Java: '#b07219', TypeScript: '#3178c6', Dockerfile: '#384d54', CSS: '#563d7c' };
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const setStat = (k, v) => $$(`[data-stat="${k}"]`).forEach(el => el.textContent = v);

  function render(repos, user) {
    if (user) setStat('followers', user.followers), setStat('repos', user.public_repos);
    setStat('stars', repos.reduce((a, r) => a + r.stargazers_count, 0));
    setStat('forks', repos.reduce((a, r) => a + r.forks_count, 0));
    const list = repos.filter(r => !r.archived)
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)).slice(0, 9);
    grid.innerHTML = list.map(r => `
      <a class="gh-card" href="${esc(r.html_url)}" target="_blank" rel="noopener noreferrer">
        <h3><i class="fa-regular fa-folder-open"></i>${esc(r.name)}${r.fork ? '<span class="fork-tag">fork</span>' : ''}</h3>
        <p>${esc(r.description || 'No description yet.')}</p>
        <div class="gh-foot">
          ${r.language ? `<span><span class="dot" style="background:${LANG[r.language] || '#888'}"></span>${esc(r.language)}</span>` : ''}
          <span><i class="fa-solid fa-star"></i> ${r.stargazers_count}</span>
          <span><i class="fa-solid fa-code-fork"></i> ${r.forks_count}</span>
          <span>${new Date(r.pushed_at).toLocaleDateString('en', { month: 'short', year: 'numeric' })}</span>
        </div>
      </a>`).join('');
  }
  function fallback() {
    const f = [
      ['KuttuBot', 'Simple Telegram autofilter bot', 'Python', 8, 38],
      ['5DB-tg', 'Telegram autofilter bot using 5DB, deployable on Render', 'Python', 1, 3],
      ['auto-filter-bot-v1', 'Lightweight autofilter bot with no extra modules', 'Python', 2, 2],
      ['TG-FileStreamBot', 'Converts Telegram files into links for FDM / 1DM', 'Python', 1, 0],
      ['FileToLink', 'Fast Telegram file-to-link converter', 'Python', 0, 0],
      ['tg-socks5-proxy', 'Authenticated SOCKS5 proxy deploy script', 'Shell', 0, 0]
    ];
    grid.innerHTML = f.map(([n, d, l, s, k]) => `
      <a class="gh-card" href="https://github.com/${GH_USER}/${n}" target="_blank" rel="noopener noreferrer">
        <h3><i class="fa-regular fa-folder-open"></i>${n}</h3><p>${d}</p>
        <div class="gh-foot"><span><span class="dot" style="background:${LANG[l]}"></span>${l}</span>
        <span><i class="fa-solid fa-star"></i> ${s}</span><span><i class="fa-solid fa-code-fork"></i> ${k}</span></div>
      </a>`).join('');
  }
  async function loadGitHub() {
    if (!grid) return;
    try {
      const cached = JSON.parse(sessionStorage.getItem('gj-gh') || 'null');
      if (cached && Date.now() - cached.t < 6e5) return render(cached.repos, cached.user);
    } catch (e) {}
    try {
      const [rr, ur] = await Promise.all([
        fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=pushed`),
        fetch(`https://api.github.com/users/${GH_USER}`)
      ]);
      if (!rr.ok || !ur.ok) throw new Error('rate limited');
      const repos = await rr.json(), user = await ur.json();
      render(repos, user);
      try { sessionStorage.setItem('gj-gh', JSON.stringify({ t: Date.now(), repos, user })); } catch (e) {}
    } catch (e) { fallback(); }
  }
  loadGitHub();

  /* ---- COMMAND PALETTE ---- */
  const pal = $('#palette'), pin = $('#paletteInput'), plist = $('#paletteList');
  const go = id => () => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); };
  const open = u => () => window.open(u, '_blank', 'noopener');
  const cmds = [
    ['fa-house', 'Home', go('home')],
    ['fa-user', 'About', go('about')],
    ['fa-folder-open', 'Projects', go('projects')],
    ['fa-brands fa-github', 'Live GitHub repos', go('github')],
    ['fa-layer-group', 'Tech stack', go('stack')],
    ['fa-envelope', 'Contact', go('contact')],
    ['fa-download', 'Download CV', () => { const a = document.createElement('a'); a.href = 'assets/Goutham_Josh_CV.pdf'; a.download = ''; a.click(); }],
    ['fa-brands fa-telegram', 'Message on Telegram', open('https://t.me/im_goutham_josh')],
    ['fa-brands fa-github', 'Open GitHub profile', open('https://github.com/GouthamSER')],
    ['fa-circle-half-stroke', 'Toggle theme', toggleTheme]
  ];
  let sel = 0, shown = cmds;
  const paint = () => {
    plist.innerHTML = shown.map((c, i) => `<li class="${i === sel ? 'sel' : ''}" data-i="${i}"><i class="${c[0].startsWith('fa-brands') ? c[0] : 'fa-solid ' + c[0]}"></i>${c[1]}</li>`).join('') || '<li>No match</li>';
  };
  const openPal = () => { pal.hidden = false; pin.value = ''; shown = cmds; sel = 0; paint(); pin.focus(); };
  const closePal = () => { pal.hidden = true; };
  const run = i => { const c = shown[i]; if (c) { closePal(); c[2](); } };
  const pb = $('#paletteBtn'); if (pb) pb.addEventListener('click', openPal);
  pin.addEventListener('input', () => {
    const q = pin.value.toLowerCase();
    shown = cmds.filter(c => c[1].toLowerCase().includes(q)); sel = 0; paint();
  });
  plist.addEventListener('click', e => { const li = e.target.closest('li[data-i]'); if (li) run(+li.dataset.i); });
  pal.addEventListener('click', e => { if (e.target === pal) closePal(); });
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.hidden ? openPal() : closePal(); return; }
    if (pal.hidden) return;
    if (e.key === 'Escape') closePal();
    else if (e.key === 'ArrowDown') { e.preventDefault(); sel = (sel + 1) % shown.length; paint(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); sel = (sel - 1 + shown.length) % shown.length; paint(); }
    else if (e.key === 'Enter') { e.preventDefault(); run(sel); }
  });
});
