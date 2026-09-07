/**
 * Portfolio – script.js
 * Modular Vanilla JS | No external dependencies beyond Feather Icons
 * ------------------------------------------------------------------ */

'use strict';

/* ================================================================
   1. TRANSLATIONS
================================================================ */
const translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About Me',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact',

    'hero.greeting': "Hi, My Name is  ",
    'hero.role': 'Fullstack Web Developer & UI/UX Designer',
    'hero.desc': "I am a Software Engineering student passionate about web development and UI/UX design. I enjoy building modern, responsive, and user-friendly websites while continuously learning new technologies and improving my skills through real projects.",
    'hero.btn_projects': 'View Projects',
    'hero.btn_cv': 'Download CV',

    'about.label': 'About Me',
    'about.heading': 'Turning Ideas into Functional and User-Friendly Web Solutions.',
    'about.typewriter': "I am a Software Engineering student at SMK Taruna Bhakti who is passionate about web development and UI/UX design. I enjoy building responsive and user-friendly websites while continuously learning new technologies. My goal is to become a Full Stack Web Developer. Through school projects and self-learning, I have gained experience with HTML, CSS, JavaScript, Tailwind CSS, and Laravel, while maintaining a vocational subject score of 8.",
    'about.extra': "I enjoy learning new technologies, creating personal projects, and exploring UI/UX design. Every project gives me an opportunity to improve my skills and brings me closer to my goal of becoming a Full Stack Web Developer.",
    'about.info_location': 'Location',
    'about.info_exp': 'Experience',
    'about.info_edu': 'Education',
    'about.info_focus': 'Focus',
    'about.edu_val': 'Software Engineering',
    'about.focus_val': 'Web Development & UI/UX Design',

    'stat.projects': 'Projects Completed',
    'stat.certs': 'Certificates',
    'stat.tech': 'Technologies',

    'tech.label': 'Tech Stack',

    'portfolio.label': 'My Work',
    'portfolio.heading': 'Portfolio Showcase',
    'portfolio.tab_projects': 'Projects',
    'portfolio.tab_certs': 'Certificates',
    'portfolio.tab_tech': 'Tech Stack',

    'btn.detail': 'Project Detail',
    'btn.github': 'GitHub',

    'contact.label': 'Contact',
    'contact.heading': "Let's Work\nTogether.",
    'contact.desc': "Feel free to reach out if you'd like to discuss a project, share ideas, or connect. I'm always open to learning opportunities, collaboration, and new experiences in web development.",

    'form.name': 'Your Name',
    'form.name_ph': 'User 123',
    'form.email': 'Email Address',
    'form.email_ph': 'user123@example.com',
    'form.message': 'Message',
    'form.msg_ph': 'Type your message here...',
    'form.submit': 'Send Message',

    'footer.tagline': 'Building modern web experiences while continuously learning and growing every day.',
    'footer.links': 'Quick Links',
    'footer.social': 'Social',
    'footer.copy': '© 2026 Faletehan. All rights reserved.',
    'footer.made': 'Made with',
    'footer.using': 'using HTML + Tailwind + Vanilla JS',
  },

  id: {
    'nav.home': 'Beranda',
    'nav.about': 'Tentang Saya',
    'nav.portfolio': 'Portofolio',
    'nav.contact': 'Kontak',

    'hero.greeting': 'Halo, Nama Saya ',
    'hero.role': 'Fullstack Web Developer & UI/UX Designer',
    'hero.desc': 'Saya adalah siswa Rekayasa Perangkat Lunak (RPL) yang memiliki minat besar pada pengembangan web dan desain UI/UX. Saya senang membangun website modern, responsif, dan mudah digunakan, serta terus belajar teknologi baru melalui berbagai proyek dan latihan.',
    'hero.btn_projects': 'Lihat Proyek',
    'hero.btn_cv': 'Unduh CV',

    'about.label': 'Tentang Saya',
    'about.heading': 'Mengubah ide menjadi solusi web yang fungsional dan mudah digunakan.',
    'about.typewriter': 'Saya adalah siswa Rekayasa Perangkat Lunak (RPL) di SMK Taruna Bhakti yang memiliki minat besar pada pengembangan web dan desain UI/UX. Saya senang membangun website yang responsif, modern, dan mudah digunakan sambil terus mempelajari teknologi baru. Tujuan saya adalah menjadi seorang Full Stack Web Developer. Melalui proyek sekolah dan pembelajaran mandiri, saya telah mempelajari HTML, CSS, JavaScript, Tailwind CSS, dan Laravel, serta memperoleh nilai kejuruan 8 sebagai bukti komitmen saya dalam bidang pengembangan perangkat lunak.',
    'about.extra': 'Saya senang mempelajari teknologi baru, membuat proyek pribadi, dan mengeksplorasi desain UI/UX. Setiap proyek memberikan saya kesempatan untuk meningkatkan kemampuan dan membawa saya lebih dekat pada tujuan saya untuk menjadi seorang Full Stack Web Developer.',
    'about.info_location': 'Lokasi',
    'about.info_exp': 'Pengalaman',
    'about.info_edu': 'Pendidikan',
    'about.info_focus': 'Fokus',
    'about.edu_val': 'Rekayasa Perangkat Lunak',
    'about.focus_val': 'Pengembangan Web & Desain UI/UX',

    'stat.projects': 'Proyek Selesai',
    'stat.certs': 'Sertifikat',
    'stat.tech': 'Teknologi',

    'tech.label': 'Tech Stack',

    'portfolio.label': 'Karya Saya',
    'portfolio.heading': 'Etalase Portofolio',
    'portfolio.tab_projects': 'Proyek',
    'portfolio.tab_certs': 'Sertifikat',
    'portfolio.tab_tech': 'Tech Stack',

    'btn.detail': 'Detail Proyek',
    'btn.github': 'GitHub',

    'contact.label': 'Kontak',
    'contact.heading': 'Ayo Bekerja\nSama.',
    'contact.desc': 'Jangan ragu untuk menghubungi saya jika ingin berdiskusi tentang proyek, berbagi ide, atau sekadar terhubung. Saya selalu terbuka untuk kesempatan belajar, kolaborasi, dan pengalaman baru di bidang pengembangan web.',

    'form.name': 'Nama Anda',
    'form.name_ph': 'Pengguna 123',
    'form.email': 'Alamat Email',
    'form.email_ph': 'pengguna123@gmail.com',
    'form.message': 'Pesan',
    'form.msg_ph': 'Tulis pesan Anda di sini...',
    'form.submit': 'Kirim Pesan',

    'footer.tagline': 'Membangun pengalaman web modern sambil terus belajar dan berkembang setiap hari.',
    'footer.links': 'Tautan Cepat',
    'footer.social': 'Media Sosial',
    'footer.copy': '© 2026 Faletehan. Semua hak cipta dilindungi.',
    'footer.made': 'Dibuat dengan',
    'footer.using': 'menggunakan HTML + Tailwind + Vanilla JS',
  },
};

/* ================================================================
   2. STATE
================================================================ */
const State = {
  lang: localStorage.getItem('lang') || 'en',
  theme: localStorage.getItem('theme') || 'light',
  typewriterActive: false,
  typewriterTimer: null,
  countersTriggered: false,
};

/* ================================================================
    2b. DATA SERVICE (JSON API)
   ================================================================ */
const DataService = (() => {
  const cache = {};

  async function getJSON(path) {
    if (!cache[path]) {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`Failed to load ${path} (${res.status})`);
      cache[path] = await res.json();
    }
    return cache[path];
  }

  return {
    projects: () => getJSON('api/project.json'),
    certificates: () => getJSON('api/certificate.json'),
    techstack: () => getJSON('api/techstack.json'),
  };
})();

/* Pick localized field: { en: "...", id: "..." } */
function pick(obj) {
  if (!obj) return '';
  return obj[State.lang] || obj.en || '';
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]));
}

/* ================================================================
   3. THEME SWITCHER
================================================================ */
const ThemeSwitcher = (() => {
  const root = document.documentElement;
  const iconLight = document.getElementById('theme-icon-light');
  const iconDark = document.getElementById('theme-icon-dark');

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    State.theme = theme;
    localStorage.setItem('theme', theme);

    // Update GitHub logo invert for dark mode
    const githubLogos = document.querySelectorAll('.invert-dark');
    githubLogos.forEach(el => {
      el.style.filter = theme === 'dark' ? 'invert(1)' : 'none';
    });

    if (theme === 'dark') {
      iconLight && iconLight.classList.add('hidden');
      iconDark && iconDark.classList.remove('hidden');
    } else {
      iconLight && iconLight.classList.remove('hidden');
      iconDark && iconDark.classList.add('hidden');
    }
  }

  function toggle() {
    apply(State.theme === 'light' ? 'dark' : 'light');
  }

  function init() {
    apply(State.theme);
    const btn = document.getElementById('theme-toggle');
    btn && btn.addEventListener('click', toggle);
  }

  return { init, apply };
})();

/* ================================================================
   4. LANGUAGE SWITCHER
================================================================ */
const LangSwitcher = (() => {
  function t(key) {
    return translations[State.lang][key] || key;
  }

  function applyTranslations() {
    // Text nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      el.textContent = val;
    });

    // Re-render API-driven sections (projects & certificates)
    if (typeof ProjectsSection !== 'undefined') ProjectsSection.render();
    if (typeof CertificatesSection !== 'undefined') CertificatesSection.render();

    // Placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = t(key);
    });

    // Update typewriter text
    const tw = document.getElementById('typewriter-text');
    if (tw) {
      TypewriterAnim.reset();
    }

    // Update lang toggle label
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) langBtn.textContent = State.lang === 'en' ? 'ID' : 'EN';

    // Update html lang attribute
    document.documentElement.lang = State.lang;

    // Keep modal content synced when language changes
    if (typeof CertModal !== 'undefined' && CertModal.updateActiveModal) {
      CertModal.updateActiveModal();
    }
  }

  function toggle() {
    State.lang = State.lang === 'en' ? 'id' : 'en';
    localStorage.setItem('lang', State.lang);
    applyTranslations();
  }

  function init() {
    applyTranslations();
    const btn = document.getElementById('lang-toggle');
    btn && btn.addEventListener('click', toggle);
  }

  return { init, t, applyTranslations };
})();

/* ================================================================
   5. NAVBAR
================================================================ */
const Navbar = (() => {
  const sections = ['home', 'about', 'portfolio', 'contact'];

  function updateActive() {
    const scrollY = window.scrollY + 80;
    let current = 'home';

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) current = id;
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function init() {
    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
  }

  return { init };
})();

/* ================================================================
   6. HAMBURGER MENU
================================================================ */
const HamburgerMenu = (() => {
  let open = false;

  function toggle() {
    open = !open;
    const menu = document.getElementById('mobile-menu');
    const btn = document.getElementById('hamburger');
    const icon = document.getElementById('hamburger-icon');

    if (menu) menu.classList.toggle('open', open);
    if (btn) btn.setAttribute('aria-expanded', open);

    if (icon) {
      icon.setAttribute('data-feather', open ? 'x' : 'menu');
      feather.replace({ 'stroke-width': 2 });
    }
  }

  function init() {
    const btn = document.getElementById('hamburger');
    btn && btn.addEventListener('click', toggle);

    // Close on nav link click
    document.querySelectorAll('#mobile-menu .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (open) toggle();
      });
    });
  }

  return { init };
})();

/* ================================================================
   7. SMOOTH SCROLL
================================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 56;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ================================================================
   8. SPLIT TEXT ANIMATION (Hero Heading)
================================================================ */
const SplitText = (() => {
  function wrapChars(el) {
    if (!el) return;
    const text = el.textContent;
    el.textContent = '';
    [...text].forEach((char, i) => {
      const span = document.createElement('span');
      span.className = 'split-char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.transitionDelay = `${i * 40}ms`;
      el.appendChild(span);
    });
  }

  function animate(el) {
    if (!el) return;
    requestAnimationFrame(() => {
      el.querySelectorAll('.split-char').forEach(span => {
        span.classList.add('visible');
      });
    });
  }

  function init() {
    const name = document.getElementById('split-name');
    wrapChars(name);
    setTimeout(() => animate(name), 200);
  }

  return { init };
})();

/* ================================================================
   9. TYPEWRITER ANIMATION (About Section)
================================================================ */
const TypewriterAnim = (() => {
  let typing = false;
  let erasing = false;
  let pos = 0;
  let timer = null;

  function getText() {
    return LangSwitcher.t('about.typewriter');
  }

  function tick() {
    const el = document.getElementById('typewriter-text');
    if (!el) return;
    const full = getText();

    if (typing) {
      if (pos < full.length) {
        el.textContent = full.slice(0, pos + 1);
        pos++;
        timer = setTimeout(tick, 28);
      } else {
        typing = false;
      }
    } else if (erasing) {
      if (pos > 0) {
        pos--;
        el.textContent = full.slice(0, pos);
        timer = setTimeout(tick, 14);
      } else {
        erasing = false;
      }
    }
  }

  function startTyping() {
    if (typing) return;
    erasing = false;
    typing = true;
    clearTimeout(timer);
    tick();
  }

  function startErasing() {
    if (erasing) return;
    typing = false;
    erasing = true;
    clearTimeout(timer);
    tick();
  }

  function reset() {
    clearTimeout(timer);
    typing = false;
    erasing = false;
    pos = 0;
    const el = document.getElementById('typewriter-text');
    if (el) el.textContent = '';
    // Re-check if section is in view
    const section = document.getElementById('about');
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
        startTyping();
      }
    }
  }

  function blinkCursor() {
    const cur = document.getElementById('typewriter-cursor');
    if (!cur) return;
    let visible = true;
    setInterval(() => {
      visible = !visible;
      cur.style.opacity = visible ? '1' : '0';
    }, 500);
  }

  function init() {
    blinkCursor();

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startTyping();
        } else {
          startErasing();
        }
      });
    }, { threshold: 0.3 });

    const section = document.getElementById('about');
    if (section) observer.observe(section);
  }

  return { init, reset, startTyping };
})();

/* ================================================================
   10. COUNTER ANIMATION
================================================================ */
const CounterAnim = (() => {
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-counter'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1600;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  function init() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  }

  return { init };
})();

/* ================================================================
   11. FADE-UP ON SCROLL
   ================================================================ */
const fadeObserver = ('IntersectionObserver' in window)
  ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 })
  : null;

function observeFadeUp(scope = document) {
  if (!scope) return;
  scope.querySelectorAll('.fade-up:not(.visible)').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
    if (fadeObserver) {
      fadeObserver.observe(el);
    } else {
      el.classList.add('visible');
    }
  });
}

function initFadeUp() {
  observeFadeUp(document);
}

/* ================================================================
   12. MARQUEE INFINITE SCROLL
================================================================ */
function initMarquee() {
  const inner = document.getElementById('marquee-inner');
  if (!inner) return;
  // Duplicate content for seamless loop
  const clone = inner.innerHTML;
  inner.innerHTML = clone + clone;
}

/* ================================================================
   13. LOGO SLIDER (Tech Stack Loop)
================================================================ */
function initLogoSlider() {
  const slider = document.getElementById('logo-slider');
  const wrapper = document.getElementById('logo-slider-wrapper');
  if (!slider || !wrapper) return;

  // Duplicate for seamless loop
  slider.innerHTML = slider.innerHTML + slider.innerHTML;

  wrapper.addEventListener('mouseenter', () => {
    slider.style.animationPlayState = 'paused';
  });
  wrapper.addEventListener('mouseleave', () => {
    slider.style.animationPlayState = 'running';
  });
}

/* ================================================================
   14. TILT CARD
================================================================ */
function initTiltCard() {
  const card = document.getElementById('photo-card');
  const wrapper = document.getElementById('tilt-wrapper');
  if (!card || !wrapper) return;

  // Only on desktop
  if (window.matchMedia('(pointer: coarse)').matches) return;

  wrapper.addEventListener('mousemove', e => {
    const rect = wrapper.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);

    const rotateY = dx * 10;
    const rotateX = -dy * 8;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  wrapper.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}

/* ================================================================
   15. PORTFOLIO TABS
================================================================ */
const PortfolioTabs = (() => {
  function init() {
    const buttons = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.tab-panel');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');

        // Update buttons
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update panels
        panels.forEach(panel => {
          panel.classList.remove('active');
        });

        const targetPanel = document.getElementById(`tab-${target}`);
        if (targetPanel) {
          requestAnimationFrame(() => {
            targetPanel.classList.add('active');
          });
        }
      });
    });

    // Initialise first panel styles
    const active = document.querySelector('.tab-panel.active');
    if (active) {
      active.classList.add('active');
    }
  }

  return { init };
})();

/* ================================================================
   15b. PROJECTS SECTION (from /api/project.json)
   ================================================================ */
const ProjectsSection = (() => {
  let data = null;

  function techIcons(project) {
    return (project.tech || []).map(t => `
      <img src="${escapeHtml(t.icon)}" alt="${escapeHtml(t.name)}" title="${escapeHtml(t.name)}"
        class="tech-icon" loading="lazy" />`).join('');
  }

  function card(p) {
    const name = escapeHtml(pick(p.name));
    const desc = escapeHtml(pick(p.short_desc));
    const detailUrl = `view/detail.html?project=${encodeURIComponent(p.slug)}`;
    const placeholder = !p.demo || p.demo === '#';
    const github = placeholder ? '#' : escapeHtml(p.github);

    return `
      <article class="card overflow-hidden fade-up">
        <div class="relative h-40 overflow-hidden" style="background-color:var(--color-bg-secondary);">
          <img src="${escapeHtml(p.image)}" alt="${name}" class="w-full h-full object-cover" loading="lazy" />
        </div>
        <div class="p-5">
          <h3 class="text-sm font-bold mb-1" style="font-weight:700; color:var(--color-text);">${name}</h3>
          <p class="text-xs mb-3 leading-relaxed" style="color:var(--color-text-muted);">${desc}</p>
          <div class="flex flex-wrap items-center gap-1.5 mb-4">${techIcons(p)}</div>
          <div class="flex gap-2">
            <a href="${detailUrl}" class="btn-primary text-xs px-3 py-1.5">${LangSwitcher.t('btn.detail')}</a>
            <a href="${github}" class="btn-secondary text-xs px-3 py-1.5"${placeholder ? '' : ' target="_blank" rel="noopener"'}>${LangSwitcher.t('btn.github')}</a>
          </div>
        </div>
      </article>`;
  }

  function render() {
    const grid = document.getElementById('projects-grid');
    if (!grid || !data) return;
    grid.innerHTML = data.map(card).join('');
    observeFadeUp(grid);
  }

  async function init() {
    const json = await DataService.projects();
    data = json.projects || [];
    render();
  }

  return { init, render };
})();

/* ================================================================
   15c. CERTIFICATES SECTION (from /api/certificate.json)
   ================================================================ */
const CertificatesSection = (() => {
  let data = null;

  function card(c) {
    const name = escapeHtml(pick(c.name));
    const issuer = escapeHtml(pick(c.issuer));

    return `
      <article class="card overflow-hidden cursor-pointer cert-card fade-up" role="button" tabindex="0"
        data-cert-img="${escapeHtml(c.image)}" data-cert-name="${name}" data-cert-issuer="${issuer}">
        <div class="h-60 overflow-hidden" style="background-color:var(--color-bg-secondary);">
          <img src="${escapeHtml(c.image)}" alt="${name}" class="w-full h-full object-cover" loading="lazy" />
        </div>
        <div class="p-4">
          <h3 class="text-sm font-bold mb-0.5" style="font-weight:700; color:var(--color-text);">${name}</h3>
          <p class="text-xs" style="color:var(--color-accent); font-weight:600;">${issuer}</p>
        </div>
      </article>`;
  }

  function render() {
    const grid = document.getElementById('certificates-grid');
    if (!grid || !data) return;
    grid.innerHTML = data.map(card).join('');
    observeFadeUp(grid);
  }

  async function init() {
    const json = await DataService.certificates();
    data = json.certificates || [];
    render();
  }

  return { init, render };
})();

/* ================================================================
   15d. TECH STACK SECTION (from /api/techstack.json)
   ================================================================ */
const TechStackSection = (() => {
  function imgProps(item) {
    const cls = item.invert_dark ? 'w-10 h-10 invert-dark' : 'w-10 h-10';
    const filter = item.invert_dark && State.theme === 'dark' ? ' style="filter:invert(1);"' : '';
    return `class="${cls}"${filter}`;
  }

  function marqueeItem(s) {
    return `
      <div class="logo-item" title="${escapeHtml(s.name)}">
        <img src="${escapeHtml(s.icon)}" alt="${escapeHtml(s.name)}" ${imgProps(s)} loading="lazy" />
        <span class="text-xs font-semibold" style="color:var(--color-text-muted);">${escapeHtml(s.label || s.name)}</span>
      </div>`;
  }

  function gridItem(s) {
    return `
      <div class="card p-4 flex flex-col items-center gap-2">
        <img src="${escapeHtml(s.icon)}" alt="${escapeHtml(s.name)}" ${imgProps(s)} loading="lazy" />
        <span class="text-xs font-semibold text-center" style="color:var(--color-text-muted);">${escapeHtml(s.label || s.name)}</span>
      </div>`;
  }

  async function init() {
    const json = await DataService.techstack();
    const slider = document.getElementById('logo-slider');
    const grid = document.getElementById('techstack-grid');

    if (slider && json.marquee) slider.innerHTML = json.marquee.map(marqueeItem).join('');
    if (grid && json.grid) grid.innerHTML = json.grid.map(gridItem).join('');
  }

  return { init };
})();

/* Load all JSON-driven sections, then start sliders */
async function loadData() {
  try {
    await Promise.all([
      TechStackSection.init(),
      ProjectsSection.init(),
      CertificatesSection.init(),
    ]);
  } catch (err) {
    console.error('[Portfolio] Failed to load API data:', err);
  }
  initMarquee();
  initLogoSlider();
}

/* ================================================================
   16. CERTIFICATE MODAL
   ================================================================ */
const CertModal = (() => {
  const modal = document.getElementById('cert-modal');
  const imgEl = document.getElementById('modal-cert-img');
  const nameEl = document.getElementById('modal-cert-name');
  const issuerEl = document.getElementById('modal-cert-issuer');
  const closeBtn = document.getElementById('modal-close');
  let activeCard = null;

  function openFromCard(cardEl) {
    open(
      cardEl.getAttribute('data-cert-img'),
      cardEl.getAttribute('data-cert-name'),
      cardEl.getAttribute('data-cert-issuer'),
      cardEl
    );
  }

  function open(img, name, issuer, cardEl) {
    if (!modal) return;

    imgEl.src = img || '';
    imgEl.alt = name || 'Certificate';
    nameEl.textContent = name || '';
    issuerEl.textContent = issuer || '';
    activeCard = cardEl || null;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
    activeCard = null;
  }

  function updateActiveModal() {
    if (!modal || !modal.classList.contains('open') || !activeCard) return;
    // Cards are re-rendered on language change; refresh from live attributes
    openFromCard(activeCard);
  }

  function init() {
    // Event delegation: cert cards are rendered dynamically from JSON
    const panel = document.getElementById('tab-certificates');
    if (panel) {
      panel.addEventListener('click', e => {
        const card = e.target.closest('.cert-card');
        if (card) openFromCard(card);
      });
      panel.addEventListener('keydown', e => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const card = e.target.closest('.cert-card');
        if (card) {
          e.preventDefault();
          openFromCard(card);
        }
      });
    }

    // Close button
    closeBtn && closeBtn.addEventListener('click', close);

    // Backdrop click
    modal && modal.addEventListener('click', e => {
      if (e.target === modal) close();
    });

    // ESC key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal && modal.classList.contains('open')) close();
    });
  }

  return { init, updateActiveModal };
})();

/* ================================================================
   17. CONTACT FORM (Formspree + Validation)
================================================================ */
const ContactForm = (() => {
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function setLoading(loading) {
    const btn = document.getElementById('submit-btn');
    const text = document.getElementById('submit-text');
    const loader = document.getElementById('submit-loader');
    const icon = document.getElementById('submit-icon');

    if (!btn) return;
    btn.disabled = loading;

    if (loading) {
      text && (text.style.display = 'none');
      loader && loader.classList.remove('hidden');
      loader && loader.classList.add('flex');
      icon && (icon.style.display = 'none');
    } else {
      text && (text.style.display = '');
      loader && loader.classList.add('hidden');
      loader && loader.classList.remove('flex');
      icon && (icon.style.display = '');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const nameEl = document.getElementById('contact-name');
    const emailEl = document.getElementById('contact-email');
    const messageEl = document.getElementById('contact-message');

    const name = nameEl ? nameEl.value.trim() : '';
    const email = emailEl ? emailEl.value.trim() : '';
    const message = messageEl ? messageEl.value.trim() : '';

    const lang = State.lang;

    // Validation
    if (!name || !email || !message) {
      alert(lang === 'id'
        ? 'Harap isi semua kolom.'
        : 'Please fill all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      alert(lang === 'id'
        ? 'Alamat email tidak valid.'
        : 'Invalid email address.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('https://formspree.io/f/xykaozbn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        alert(lang === 'id'
          ? 'Pesan berhasil terkirim!'
          : 'Message sent successfully!');
        if (nameEl) nameEl.value = '';
        if (emailEl) emailEl.value = '';
        if (messageEl) messageEl.value = '';
      } else {
        const data = await res.json().catch(() => ({}));
        const msg = data.errors ? data.errors.map(e => e.message).join(', ') : 'Unknown error';
        alert(lang === 'id'
          ? `Gagal mengirim pesan: ${msg}`
          : `Failed to send message: ${msg}`);
      }
    } catch {
      alert(lang === 'id'
        ? 'Terjadi kesalahan jaringan. Silakan coba lagi.'
        : 'A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function init() {
    const form = document.getElementById('contact-form');
    form && form.addEventListener('submit', handleSubmit);
  }

  return { init };
})();

/* ================================================================
   18. CUSTOM CURSOR (desktop only)
================================================================ */
function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (dot) dot.style.display = 'none';
    if (ring) ring.style.display = 'none';
    return;
  }

  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0;
  let rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  function loopRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(loopRing);
  }
  loopRing();

  // Gentle highlight on interactive elements (no size change = no pulsing)
  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, .cert-card, .card')) {
      ring.style.opacity = '0.75';
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest('a, button, .cert-card, .card')) {
      ring.style.opacity = '0.4';
    }
  });
}

/* ================================================================
   19. FEATHER ICONS REPLACE
================================================================ */
function initFeather() {
  if (typeof feather !== 'undefined') {
    feather.replace({ 'stroke-width': 1.75 });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      if (typeof feather !== 'undefined') feather.replace({ 'stroke-width': 1.75 });
    });
  }
}

/* ================================================================
   20. INIT ALL
================================================================ */
function init() {
  // Re-replace feather after DOM ready
  if (typeof feather !== 'undefined') feather.replace({ 'stroke-width': 1.75 });

  ThemeSwitcher.init();
  LangSwitcher.init();
  Navbar.init();
  HamburgerMenu.init();
  initSmoothScroll();
  SplitText.init();
  TypewriterAnim.init();
  CounterAnim.init();
  initFadeUp();
  initTiltCard();
  PortfolioTabs.init();
  CertModal.init();
  ContactForm.init();
  initCursor();

  // Fetch & render projects, certificates, and tech stack from /api/*.json
  loadData();
}

// Wait for DOM + Feather
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}