/**
 * Portfolio: script.js
 * Modular Vanilla JS | No external dependencies beyond Feather Icons
 * ------------------------------------------------------------------ */

'use strict';

/* ================================================================
   1. TRANSLATIONS
================================================================ */
const translations = {
  en: {
    'a11y.skip': 'Skip to content',
    'nav.home': 'Home',
    'nav.about': 'About Me',
    'nav.portfolio': 'Portfolio',
    'nav.education': 'Education',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',

    'hero.greeting': 'Hi, my name is',
    'hero.role': 'Fullstack Web Developer & UI/UX Designer',
    'hero.desc': 'Software Engineering student building responsive, user-friendly websites with modern web technologies.',
    'hero.availability': 'Based in Indonesia — open to junior roles & freelance',
    'hero.btn_projects': 'View projects',
    'hero.btn_cv': 'Download CV',

    'about.label': 'About',
    'about.heading': 'Software Engineering student focused on building useful digital experiences.',
    'about.p1': 'I have a strong passion for Software Engineering and Full-Stack Web Development. At SMK Taruna Bhakti, I build my skills through self-learning, hands-on projects, and bootcamp programs.',
    'about.p2': 'Beyond technology, I enjoy continuous learning and actively participate in futsal, which has strengthened my teamwork, discipline, leadership, and communication.',
    'about.p3': 'My goal is to become a Software Engineer and build innovative, impactful, user-focused digital solutions.',
    'about.meta_based': 'Based in',
    'about.connect': "Let's connect",
    'about.side_profile': 'Profile',
    'about.r_goal': 'Career goal',
    'about.info_location': 'Location',
    'about.info_exp': 'Experience',
    'about.info_edu': 'Education',
    'about.info_focus': 'Focus',
    'about.edu_val': 'Software Engineering',
    'about.focus_val': 'Full-Stack Web Development',

    'stat.projects': 'Projects Completed',
    'stat.certs': 'Certificates',
    'stat.tech': 'Technologies',

    'portfolio.label': 'Selected work',
    'portfolio.heading': 'Portfolio showcase',
    'portfolio.sub': 'A featured build first, then supporting work. Certificates and stack live in their own tabs.',
    'portfolio.featured': 'Featured project',
    'portfolio.cat_frontend': 'Frontend',
    'portfolio.cat_backend': 'Backend',
    'portfolio.cat_tools': 'Tools & Deploy',
    'portfolio.tab_projects': 'Projects',
    'portfolio.tab_certs': 'Certificates',
    'portfolio.tab_tech': 'Tech Stack',
    'portfolio.see_all_projects': 'All projects',
    'portfolio.see_all_certs': 'All certificates',
    'portfolio.items': 'items',
    'portfolio.prev': 'Previous slide',
    'portfolio.next': 'Next slide',
    'portfolio.slider_tech': 'Tech stack slider. Use arrow buttons or swipe to navigate.',

    'theme.to_dark': 'Switch to dark mode',
    'theme.to_light': 'Switch to light mode',
    'theme.sun': 'Sun (light mode)',
    'theme.moon': 'Moon (dark mode)',

    'btn.detail': 'Details',
    'btn.view': 'View project',
    'btn.github': 'GitHub',

    'contact.heading': "Let's work\ntogether.",
    'contact.desc': "Feel free to reach out if you'd like to discuss a project, share ideas, or connect. I'm always open to learning opportunities, collaboration, and new experiences in web development.",

    'form.name': 'Your name',
    'form.name_ph': 'Your name',
    'form.email': 'Email address',
    'form.email_ph': 'you@example.com',
    'form.message': 'Message',
    'form.msg_ph': 'Tell me about your project or role...',
    'form.submit': 'Send message',
    'form.err_required': 'Please complete all fields.',
    'form.err_name': 'Please enter your name.',
    'form.err_email_empty': 'Please enter your email address.',
    'form.err_email_invalid': 'Please enter a valid email address.',
    'form.err_message': 'Please write your message.',
    'form.ok_sent': 'Message sent. I will reply soon.',
    'form.err_send': 'Failed to send message. Please try again.',
    'form.err_network': 'Network error. Please try again.',

    'footer.tagline': 'Building web experiences while learning and growing every day.',
    'footer.links': 'Quick Links',
    'footer.social': 'Social',
    'footer.copy': '© 2026 Faletehan. All rights reserved.',
    'footer.made': 'Built with',
    'footer.using': 'HTML, Tailwind CSS, and vanilla JavaScript',
  },

  id: {
    'a11y.skip': 'Lewati ke konten',
    'nav.home': 'Beranda',
    'nav.about': 'Tentang Saya',
    'nav.portfolio': 'Portofolio',
    'nav.education': 'Pendidikan',
    'nav.experience': 'Pengalaman',
    'nav.contact': 'Kontak',

    'hero.greeting': 'Halo, nama saya',
    'hero.role': 'Fullstack Web Developer & UI/UX Designer',
    'hero.desc': 'Siswa RPL yang membangun website responsif, modern, dan mudah digunakan.',
    'hero.availability': 'Berbasis di Indonesia — terbuka untuk peran junior & freelance',
    'hero.btn_projects': 'Lihat proyek',
    'hero.btn_cv': 'Unduh CV',

    'about.label': 'Tentang',
    'about.heading': 'Siswa Rekayasa Perangkat Lunak yang fokus membangun pengalaman digital yang bermanfaat.',
    'about.p1': 'Saya memiliki minat besar pada Software Engineering dan Full-Stack Web Development. Sebagai siswa Rekayasa Perangkat Lunak di SMK Taruna Bhakti, saya mengembangkan keterampilan melalui belajar mandiri, proyek langsung, dan program bootcamp.',
    'about.p2': 'Di luar teknologi, saya senang terus belajar dan aktif bermain futsal, yang mengasah kerja sama tim, kedisiplinan, kepemimpinan, dan komunikasi saya.',
    'about.p3': 'Tujuan saya adalah menjadi Software Engineer dan membangun solusi digital yang inovatif, berdampak, dan berfokus pada pengguna.',
    'about.meta_based': 'Berdomisili di',
    'about.connect': 'Mari terhubung',
    'about.side_profile': 'Profil',
    'about.r_goal': 'Tujuan karier',
    'about.info_location': 'Lokasi',
    'about.info_exp': 'Pengalaman',
    'about.info_edu': 'Pendidikan',
    'about.info_focus': 'Fokus',
    'about.edu_val': 'Rekayasa Perangkat Lunak',
    'about.focus_val': 'Pengembangan Web & Desain UI/UX',

    'stat.projects': 'Proyek Selesai',
    'stat.certs': 'Sertifikat',
    'stat.tech': 'Teknologi',

    'portfolio.label': 'Karya pilihan',
    'portfolio.heading': 'Etalase portofolio',
    'portfolio.sub': 'Satu karya unggulan dulu, lalu karya pendukung. Sertifikat dan stack ada di tab masing-masing.',
    'portfolio.featured': 'Proyek unggulan',
    'portfolio.cat_frontend': 'Frontend',
    'portfolio.cat_backend': 'Backend',
    'portfolio.cat_tools': 'Tools & Deploy',
    'portfolio.tab_projects': 'Proyek',
    'portfolio.tab_certs': 'Sertifikat',
    'portfolio.tab_tech': 'Tech Stack',
    'portfolio.see_all_projects': 'Semua proyek',
    'portfolio.see_all_certs': 'Semua sertifikat',
    'portfolio.items': 'item',
    'portfolio.prev': 'Slide sebelumnya',
    'portfolio.next': 'Slide berikutnya',
    'portfolio.slider_tech': 'Slider tech stack. Gunakan tombol panah atau geser untuk navigasi.',

    'theme.to_dark': 'Ganti ke mode gelap',
    'theme.to_light': 'Ganti ke mode terang',
    'theme.sun': 'Matahari (mode terang)',
    'theme.moon': 'Bulan (mode gelap)',

    'btn.detail': 'Detail',
    'btn.view': 'Lihat proyek',
    'btn.github': 'GitHub',

    'contact.heading': 'Mari bekerja\nsama.',
    'contact.desc': 'Jangan ragu untuk menghubungi saya jika ingin berdiskusi tentang proyek, berbagi ide, atau sekadar terhubung. Saya selalu terbuka untuk kesempatan belajar, kolaborasi, dan pengalaman baru di bidang pengembangan web.',

    'form.name': 'Nama Anda',
    'form.name_ph': 'Nama Anda',
    'form.email': 'Alamat email',
    'form.email_ph': 'anda@contoh.com',
    'form.message': 'Pesan',
    'form.msg_ph': 'Ceritakan proyek atau peran yang Anda tawarkan...',
    'form.submit': 'Kirim pesan',
    'form.err_required': 'Harap lengkapi semua kolom.',
    'form.err_name': 'Harap isi nama Anda.',
    'form.err_email_empty': 'Harap isi alamat email Anda.',
    'form.err_email_invalid': 'Harap isi alamat email yang valid.',
    'form.err_message': 'Harap tulis pesan Anda.',
    'form.ok_sent': 'Pesan terkirim. Saya akan segera membalas.',
    'form.err_send': 'Gagal mengirim pesan. Silakan coba lagi.',
    'form.err_network': 'Terjadi kesalahan jaringan. Silakan coba lagi.',

    'footer.tagline': 'Membangun pengalaman web sambil terus belajar setiap hari.',
    'footer.links': 'Tautan Cepat',
    'footer.social': 'Media Sosial',
    'footer.copy': '© 2026 Faletehan. Semua hak cipta dilindungi.',
    'footer.made': 'Dibuat dengan',
    'footer.using': 'HTML, Tailwind CSS, dan JavaScript vanilla',
  },
};

/* ================================================================
   2. STATE
================================================================ */
const State = {
  lang: localStorage.getItem('lang') || 'en',
  theme: localStorage.getItem('theme') || 'light',
  
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

/* Site-root asset paths ("/assets/...") break on subpath deploys.
   index.html lives at root, so strip the leading slash to relative. */
function fixAsset(src) {
  const s = String(src || '').trim();
  if (!s) return '';
  if (s.charAt(0) === '/' && s.indexOf('//') !== 0) return s.slice(1);
  return s;
}

/* ================================================================
   3. THEME SWITCHER
================================================================ */
const ThemeSwitcher = (() => {
  const root = document.documentElement;

  // Matahari (sun) untuk mode terang, bulan (moon) untuk mode gelap.
  // Hanya satu ikon yang tampil sesuai tema aktif.
  function apply(theme) {
    root.setAttribute('data-theme', theme);
    State.theme = theme;
    localStorage.setItem('theme', theme);

    const iconLight = document.getElementById('theme-icon-light'); // matahari
    const iconDark = document.getElementById('theme-icon-dark'); // bulan
    const btn = document.getElementById('theme-toggle');

    // Update GitHub logo invert for dark mode
    const githubLogos = document.querySelectorAll('.invert-dark');
    githubLogos.forEach(el => {
      el.style.filter = theme === 'dark' ? 'invert(1)' : 'none';
    });

    const isDark = theme === 'dark';
    if (iconLight) {
      iconLight.classList.toggle('hidden', isDark);
      iconLight.setAttribute('aria-hidden', isDark ? 'true' : 'false');
    }
    if (iconDark) {
      iconDark.classList.toggle('hidden', !isDark);
      iconDark.setAttribute('aria-hidden', !isDark ? 'true' : 'false');
    }
    if (btn) {
      let label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
      try {
        if (typeof LangSwitcher !== 'undefined' && LangSwitcher.t) {
          label = LangSwitcher.t(isDark ? 'theme.to_light' : 'theme.to_dark');
        }
      } catch { /* fallback ke label default */ }
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
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
    // Text nodes (pertahankan ikon panah di menu mobile agar tidak hilang)
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      const tail = el.querySelector(':scope > span[aria-hidden]');
      el.textContent = val;
      if (tail) {
        el.appendChild(document.createTextNode(' '));
        el.appendChild(tail);
      }
    });

    // Aria-labels (tombol slider, dsb.)
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      el.setAttribute('aria-label', t(key));
    });

    // Re-render API-driven sections (projects & certificates)
    if (typeof ProjectsSection !== 'undefined') ProjectsSection.render();
    if (typeof CertificatesSection !== 'undefined') CertificatesSection.render();
    if (typeof TechStackSection !== 'undefined') TechStackSection.init();

    // Placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = t(key);
    });

    // About intro is static; data-i18n swaps the text.

    // Update lang toggle label
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) langBtn.textContent = State.lang === 'en' ? 'ID' : 'EN';

    // Update html lang attribute
    document.documentElement.lang = State.lang;

    // Samakan label tombol tema (matahari/bulan) dengan bahasa aktif
    if (typeof ThemeSwitcher !== 'undefined' && ThemeSwitcher.apply) {
      ThemeSwitcher.apply(State.theme);
    }

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
   5. NAVBAR (active link via IntersectionObserver, no scroll listener)
================================================================ */
const Navbar = (() => {
  const sections = ['home', 'about', 'portfolio', 'contact'];

  function setActive(id) {
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${id}`);
    });
  }

  function init() {
    if (!('IntersectionObserver' in window)) {
      setActive('home');
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  return { init };
})();

/* ================================================================
   6. HAMBURGER MENU (capsule-safe, no absolute bug)
================================================================ */
const HamburgerMenu = (() => {
  let open = false;

  function toggle(force) {
    open = typeof force === 'boolean' ? force : !open;
    const menu = document.getElementById('mobile-menu');
    const btn = document.getElementById('hamburger');
    const capsule = document.getElementById('capsule-nav');

    if (menu) menu.classList.toggle('open', open);
    if (capsule) capsule.classList.toggle('menu-open', open);
    if (btn) btn.setAttribute('aria-expanded', open);

    const icon = document.getElementById('hamburger-icon');
    if (icon && typeof feather !== 'undefined') {
      // feather replaces <i> with <svg>; re-query wrapper approach:
      const svg = btn ? btn.querySelector('svg') : null;
      // Simplest: swap innerHTML icon then re-replace
      btn.innerHTML = `<i data-feather="${open ? 'x' : 'menu'}" class="w-4 h-4" id="hamburger-icon"></i>`;
      feather.replace({ 'stroke-width': 2 });
    }
  }

  function init() {
    const btn = document.getElementById('hamburger');
    btn && btn.addEventListener('click', () => toggle());

    // Close on nav link click
    document.querySelectorAll('#mobile-menu .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (open) toggle(false);
      });
    });

    // Auto-close when resizing to desktop (prevent stuck open pill)
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && open) toggle(false);
    });

    // Close on ESC
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && open) toggle(false);
    });
  }

  return { init, toggle };
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
      // Offset for floating capsule navbar (taller than old bar)
      const top = target.getBoundingClientRect().top + window.scrollY - 96;
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
   9. ABOUT INTRO (static text; translations render via data-i18n)
   Typewriter removed: re-typing on every scroll is distracting
   for recruiters. Calm fade-up reveal is handled by initFadeUp.
================================================================ */

/* ================================================================
   10. COUNTER ANIMATION
================================================================ */
const CounterAnim = (() => {
  const reduceMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-counter'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    if (reduceMotion()) {
      el.textContent = target + suffix;
      return;
    }
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
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    scope.querySelectorAll('.fade-up:not(.visible)').forEach(el => el.classList.add('visible'));
    return;
  }
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
   12. TEXT MARQUEE (removed)
   One marquee per page max: the tech logo loop stays, the keyword
   text strip was decorative filler. initLogoSlider below is the one.
================================================================ */

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

  // Only on desktop, never under reduced motion
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  wrapper.addEventListener('mousemove', e => {
    const rect = wrapper.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);

    const rotateY = dx * 6;
    const rotateX = -dy * 5;

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
   15b. PROJECTS SECTION (from /api/project.json) - slider cards
   ================================================================ */
const ProjectsSection = (() => {
  let data = null;

  function metaLine(p) {
    const cat = escapeHtml(pick(p.category));
    const year = p.year ? ` · ${escapeHtml(p.year)}` : '';
    return `${cat}${year}`;
  }

  /* Supporting tech icons: max 4, small and quiet. Title stays the focal point. */
  function techIcons(project) {
    const items = (project.tech || []).filter(x => x && x.name && x.icon).slice(0, 4);
    if (!items.length) return '';
    return items.map(x => `
      <img src="${escapeHtml(x.icon)}" alt="${escapeHtml(x.name)}" title="${escapeHtml(x.name)}"
        class="pcard-tech-icon" loading="lazy" decoding="async" onerror="this.style.display='none'" />`).join('');
  }

  /* Card excerpt: pure truncation of existing short_desc, no new facts. Full story on detail page. */
  function excerpt(text, max) {
    const s = String(text || '').trim().replace(/\s+/g, ' ');
    const limit = max || 130;
    if (s.length <= limit) return escapeHtml(s);
    const cut = s.slice(0, limit);
    const sp = cut.lastIndexOf(' ');
    const head = (sp > 60 ? cut.slice(0, sp) : cut).trimEnd();
    return escapeHtml(head) + '…';
  }

  /* Shared project card — same visual language on homepage and archive. */
  function projectCard(p) {
    const name = escapeHtml(pick(p.name));
    const detailUrl = `view/detail.html?project=${encodeURIComponent(p.slug)}`;
    const hasLinks = p.demo && p.demo !== '#';
    const github = hasLinks ? escapeHtml(p.github) : '';
    const icons = techIcons(p);
    const viewLabel = escapeHtml(LangSwitcher.t('btn.view'));

    return `
      <article class="pcard fade-up">
        <a href="${detailUrl}" class="pcard-media" aria-label="${name}" tabindex="-1">
          <img src="${escapeHtml(fixAsset(p.image))}" alt="${name}" loading="lazy" decoding="async" onerror="this.onerror=null;this.style.objectFit='contain';this.style.padding='1rem';" />
        </a>
        <div class="pcard-body">
          <p class="pcard-meta">${metaLine(p)}</p>
          <h3 class="pcard-title" title="${name}">${name}</h3>
          <p class="pcard-desc">${excerpt(pick(p.short_desc))}</p>
          <div class="pcard-tech" aria-label="Technologies">${icons || '&nbsp;'}</div>
          <div class="pcard-actions">
            <a href="${detailUrl}" class="pcard-view">${viewLabel} <span aria-hidden="true">→</span></a>
            ${hasLinks && github && github !== '#' ? `<a href="${github}" target="_blank" rel="noopener" class="pcard-gh" aria-label="${escapeHtml(LangSwitcher.t('btn.github'))} – ${name}" title="${escapeHtml(LangSwitcher.t('btn.github'))}"><i data-feather="github" class="pcard-gh-icon" aria-hidden="true"></i></a>` : ''}
          </div>
        </div>
      </article>`;
  }

  // Homepage: first 3 projects as uniform cards (same renderer as archive).
  // Just add new object at TOP of api/project.json projects array.
  function render() {
    const grid = document.getElementById('projects-grid');
    if (!grid || !data) return;
    const preview = data.slice(0, 3);
    if (!preview.length) {
      grid.innerHTML = `<p class="text-sm text-center py-8 col-span-full" style="color:var(--color-text-muted);">No projects yet.</p>`;
    } else {
      grid.innerHTML = preview.map(projectCard).join('');
    }
    observeFadeUp(grid);
    if (typeof feather !== 'undefined') feather.replace({ 'stroke-width': 1.75 });
  }

  async function init() {
    try {
      const json = await DataService.projects();
      data = json.projects || [];
      render();
    } catch (err) {
      console.error('[Projects] Failed to load:', err);
    }
  }

  return { init, render, getData: () => data };
})();

/* ================================================================
   15c. CERTIFICATES SECTION (from /api/certificate.json) - static 6
   ================================================================ */
const CertificatesSection = (() => {
  let data = null;

  function card(c) {
    const name = escapeHtml(pick(c.name));
    const issuer = escapeHtml(pick(c.issuer));

    return `
      <article class="card overflow-hidden cursor-pointer cert-card cert-row fade-up" role="button" tabindex="0"
        data-cert-img="${escapeHtml(fixAsset(c.image))}" data-cert-name="${name}" data-cert-issuer="${issuer}">
        <div class="cert-thumb" aria-hidden="true">
          <img src="${escapeHtml(fixAsset(c.image))}" alt="" loading="lazy" onerror="this.onerror=null;this.style.objectFit='contain';" />
        </div>
        <div class="min-w-0">
          <h3 class="text-sm font-bold leading-snug line-clamp-1" style="font-weight:700; color:var(--color-text);">${name}</h3>
          <p class="text-xs line-clamp-1 mt-0.5" style="color:var(--color-accent); font-weight:600;">${issuer}</p>
        </div>
        <i data-feather="eye" class="w-4 h-4 justify-self-end" style="color:var(--color-text-muted);"></i>
      </article>`;
  }

  // Showcase now: static 6 preview only - add new items to api/certificate.json, homepage auto shows first 6
  function render() {
    const grid = document.getElementById('certificates-grid');
    if (!grid || !data) return;
    const preview = data.slice(0, 6);
    if (!preview.length) {
      grid.innerHTML = `<p class="text-sm text-center py-8 col-span-full" style="color:var(--color-text-muted);">No certificates yet.</p>`;
    } else {
      grid.innerHTML = preview.map(card).join('');
    }
    observeFadeUp(grid);
    if (typeof feather !== 'undefined') feather.replace({ 'stroke-width': 1.75 });
  }

  async function init() {
    try {
      const json = await DataService.certificates();
      data = json.certificates || [];
      render();
    } catch (err) {
      console.error('[Certificates] Failed to load:', err);
    }
  }

  return { init, render };
})();

/* ================================================================
   15e. SHOWCASE PAGER - now ONLY for Tech Stack (Projects & Certs are static 6)
   scroll vertikal tidak terhalang, See All di kanan bawah untuk Projects/Certs
   ================================================================ */
const ShowcaseSlider = (() => {
  const registries = {
    techstack: { viewport: 'techstack-viewport', track: 'techstack-grid', prev: 'techstack-prev', next: 'techstack-next', dots: 'techstack-dots' },
  };
  const current = { techstack: 0 };

  function trackOf(key) {
    const cfg = registries[key];
    return cfg ? document.getElementById(cfg.track) : null;
  }

  function pagesCount(key) {
    const track = trackOf(key);
    if (!track) return 1;
    return Math.max(1, track.querySelectorAll(':scope > .pager-page').length);
  }

  function clampPage(key, i) {
    const n = pagesCount(key);
    return Math.max(0, Math.min(n - 1, i));
  }

  function paint(key) {
    const cfg = registries[key];
    const track = trackOf(key);
    if (!cfg || !track) return;
    const idx = clampPage(key, current[key] || 0);
    current[key] = idx;
    track.style.transform = `translateX(-${idx * 100}%)`;

    // Mark active page for staggered card animations
    const pages = track.querySelectorAll(':scope > .pager-page');
    pages.forEach((p, i) => {
      const wasActive = p.classList.contains('page-active');
      p.classList.toggle('page-active', i === idx);
      // Re-trigger card entrance animation when becoming active
      if (i === idx && !wasActive) {
        p.querySelectorAll('.card').forEach(card => {
          card.style.transition = 'none';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px) scale(0.97)';
          void card.offsetHeight;
          card.style.transition = '';
          card.style.opacity = '';
          card.style.transform = '';
        });
      }
    });

    const dotsWrap = document.getElementById(cfg.dots);
    if (dotsWrap) {
      const dots = dotsWrap.querySelectorAll('.slider-dot');
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    }

    const prev = document.getElementById(cfg.prev);
    const next = document.getElementById(cfg.next);
    const n = pagesCount(key);
    if (prev) {
      prev.disabled = idx <= 0;
      prev.style.display = n > 1 ? '' : 'none';
    }
    if (next) {
      next.disabled = idx >= n - 1;
      next.style.display = n > 1 ? '' : 'none';
    }
  }

  function renderDots(key) {
    const cfg = registries[key];
    const dotsWrap = cfg ? document.getElementById(cfg.dots) : null;
    if (!dotsWrap) return;
    const n = pagesCount(key);
    if (n <= 1) {
      dotsWrap.innerHTML = '';
      return;
    }
    dotsWrap.innerHTML = Array.from({ length: n }, (_, i) =>
      `<button type="button" class="slider-dot${i === (current[key] || 0) ? ' active' : ''}" data-page="${i}" aria-label="Go to slide ${i + 1}"></button>`
    ).join('');
    dotsWrap.querySelectorAll('.slider-dot').forEach(btn => {
      btn.addEventListener('click', () => goTo(key, parseInt(btn.dataset.page, 10)));
    });
  }

  function goTo(key, i) {
    if (!registries[key]) return;
    current[key] = clampPage(key, i);
    paint(key);
  }

  function step(key, dir) {
    if (!registries[key]) return;
    goTo(key, (current[key] || 0) + dir);
  }

  function refresh(key) {
    if (key) {
      current[key] = clampPage(key, current[key] || 0);
      renderDots(key);
      paint(key);
      return;
    }
    refreshAll();
  }

  function refreshAll() {
    Object.keys(registries).forEach(key => {
      current[key] = clampPage(key, current[key] || 0);
      renderDots(key);
      paint(key);
    });
  }

  function bind(key) {
    const cfg = registries[key];
    const viewport = document.getElementById(cfg.viewport);
    const prev = document.getElementById(cfg.prev);
    const next = document.getElementById(cfg.next);
    if (!viewport) return;
    viewport.style.cursor = 'grab';
    prev && prev.addEventListener('click', () => step(key, -1));
    next && next.addEventListener('click', () => step(key, 1));

    viewport.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); step(key, 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); step(key, -1); }
    });

    let sx = 0, sy = 0, tracking = false;
    viewport.addEventListener('touchstart', e => {
      if (e.touches.length !== 1) return;
      tracking = true;
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
    }, { passive: true });
    viewport.addEventListener('touchend', e => {
      if (!tracking) return;
      tracking = false;
      const dx = e.changedTouches[0].clientX - sx;
      const dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.3) {
        step(key, dx < 0 ? 1 : -1);
      }
    }, { passive: true });

    let wheelLock = false;
    viewport.addEventListener('wheel', e => {
      const horiz = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = horiz ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
      if (Math.abs(delta) < 18) return;
      if (horiz || e.shiftKey) {
        e.preventDefault();
        if (wheelLock) return;
        wheelLock = true;
        step(key, delta > 0 ? 1 : -1);
        setTimeout(() => { wheelLock = false; }, 380);
      }
    }, { passive: false });

    let isDragging = false, startX = 0, didDrag = false;
    viewport.addEventListener('mousedown', e => {
      if (e.button !== 0) return;
      isDragging = true;
      didDrag = false;
      startX = e.clientX;
      viewport.style.cursor = 'grabbing';
      e.preventDefault();
    });
    viewport.addEventListener('mousemove', e => {
      if (!isDragging) return;
      if (Math.abs(e.clientX - startX) > 8) didDrag = true;
    });
    viewport.addEventListener('mouseup', e => {
      if (!isDragging) return;
      isDragging = false;
      viewport.style.cursor = 'grab';
      const dx = e.clientX - startX;
      if (didDrag && Math.abs(dx) > 50) step(key, dx < 0 ? 1 : -1);
      didDrag = false;
    });
    viewport.addEventListener('mouseleave', () => {
      isDragging = false;
      viewport.style.cursor = 'grab';
    });
  }

  function init() {
    Object.keys(registries).forEach(bind);
    window.addEventListener('resize', () => {
      Object.keys(registries).forEach(paint);
    });
    setTimeout(refreshAll, 100);
  }

  return { init, refresh, refreshAll, goTo };
})();

/* ================================================================
   15d. TECH STACK SECTION (from /api/techstack.json)
   ================================================================ */
const TechStackSection = (() => {
  /* Recruiter scan: three stable groups instead of a slider + marquee + cards */
  const GROUPS = [
    { key: 'portfolio.cat_frontend', names: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'React', 'Next JS', 'Flutter'] },
    { key: 'portfolio.cat_backend', names: ['PHP', 'Laravel', 'MySQL', 'Python', 'Node.js', 'Mongo DB', 'Supabase', 'Fastapi', 'Golang'] },
    { key: 'portfolio.cat_tools', names: ['Git', 'GitHub', 'Figma', 'Linux', 'Postman', 'Vercel', 'Netlify'] },
  ];

  function imgProps(item) {
    const cls = item.invert_dark ? 'invert-dark' : '';
    const filter = item.invert_dark && State.theme === 'dark' ? ' style="filter:invert(1);"' : '';
    return `class="${cls}"${filter}`;
  }

  function catColumn(title, items) {
    if (!items.length) return '';
    const rows = items.map(s => `
      <li class="fade-up">
        <img src="${escapeHtml(s.icon)}" alt="" ${imgProps(s)} loading="lazy" />
        <span>${escapeHtml(s.label || s.name)}</span>
      </li>`).join('');
    return `<div class="tech-cat"><h4 class="tech-cat-title">${escapeHtml(title)}</h4><ul>${rows}</ul></div>`;
  }

  async function init() {
    try {
      const json = await DataService.techstack();
      const grid = document.getElementById('techstack-grid');
      if (grid && json && json.grid) {
        const rest = [...json.grid];
        const cols = GROUPS.map(g => {
          const items = [];
          g.names.forEach(n => {
            const i = rest.findIndex(s => s.name === n);
            if (i !== -1) items.push(rest.splice(i, 1)[0]);
          });
          return catColumn(LangSwitcher.t(g.key), items);
        });
        /* Anything new in techstack.json falls into Tools so nothing is lost */
        if (rest.length) {
          const toolsIdx = cols.length - 1;
          const extra = rest.map(s => `
            <li class="fade-up">
              <img src="${escapeHtml(s.icon)}" alt="" ${imgProps(s)} loading="lazy" />
              <span>${escapeHtml(s.label || s.name)}</span>
            </li>`).join('');
          cols[toolsIdx] = cols[toolsIdx].replace('</ul></div>', `${extra}</ul></div>`);
        }
        grid.innerHTML = cols.join('');
        const count = document.getElementById('techstack-count');
        if (count) count.textContent = json.grid.length;
        observeFadeUp(grid);
      }
    } catch (err) {
      console.error('[TechStack] Failed to initialize:', err);
    }
  }

  return { init };
})();

/* Load all JSON-driven sections, then start sliders */
async function loadData() {
  // Load each section independently - one failure must not block the others
  const results = await Promise.allSettled([
    TechStackSection.init().catch(e => { console.error('[TechStack] Load failed:', e); }),
    ProjectsSection.init().catch(e => { console.error('[Projects] Load failed:', e); }),
    CertificatesSection.init().catch(e => { console.error('[Certificates] Load failed:', e); }),
  ]);

  initLogoSlider();
  if (typeof ShowcaseSlider !== 'undefined') ShowcaseSlider.refreshAll();
  if (typeof feather !== 'undefined') feather.replace({ 'stroke-width': 1.75 });
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
   17. CONTACT FORM (Formspree + inline validation + toast)
================================================================ */
function showToast(message) {
  let toast = document.getElementById('site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'site-toast';
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('show'), 2600);
}

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

  function setFieldError(inputEl, errorEl, message) {
    if (inputEl) inputEl.classList.toggle('invalid', !!message);
    if (errorEl) {
      errorEl.textContent = message || '';
      errorEl.classList.toggle('show', !!message);
    }
  }

  function setNote(message, kind) {
    const note = document.getElementById('form-note');
    if (!note) return;
    if (!message) {
      note.textContent = '';
      note.classList.add('hidden');
      note.classList.remove('is-success', 'is-error');
      return;
    }
    note.textContent = message;
    note.classList.remove('hidden', 'is-success', 'is-error');
    if (kind) note.classList.add(kind);
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
    const msg = key => (translations[lang] && translations[lang][key]) || translations.en[key] || key;

    // Inline validation (one message per field, no alert dialogs)
    let firstInvalid = null;
    if (!name) {
      setFieldError(nameEl, document.getElementById('contact-name-error'), msg('form.err_name'));
      firstInvalid = firstInvalid || nameEl;
    } else {
      setFieldError(nameEl, document.getElementById('contact-name-error'), '');
    }
    if (!email) {
      setFieldError(emailEl, document.getElementById('contact-email-error'), msg('form.err_email_empty'));
      firstInvalid = firstInvalid || emailEl;
    } else if (!isValidEmail(email)) {
      setFieldError(emailEl, document.getElementById('contact-email-error'), msg('form.err_email_invalid'));
      firstInvalid = firstInvalid || emailEl;
    } else {
      setFieldError(emailEl, document.getElementById('contact-email-error'), '');
    }
    if (!message) {
      setFieldError(messageEl, document.getElementById('contact-message-error'), msg('form.err_message'));
      firstInvalid = firstInvalid || messageEl;
    } else {
      setFieldError(messageEl, document.getElementById('contact-message-error'), '');
    }
    if (firstInvalid) {
      setNote(msg('form.err_required'), 'is-error');
      firstInvalid.focus();
      return;
    }

    setNote('', null);
    setLoading(true);

    try {
      const res = await fetch('https://formspree.io/f/xykaozbn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setNote(msg('form.ok_sent'), 'is-success');
        showToast(msg('form.ok_sent'));
        if (nameEl) nameEl.value = '';
        if (emailEl) emailEl.value = '';
        if (messageEl) messageEl.value = '';
      } else {
        setNote(msg('form.err_send'), 'is-error');
        showToast(msg('form.err_send'));
      }
    } catch {
      setNote(msg('form.err_network'), 'is-error');
      showToast(msg('form.err_network'));
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
  CounterAnim.init();
  initFadeUp();
  initTiltCard();
  PortfolioTabs.init();
  if (typeof ShowcaseSlider !== 'undefined') ShowcaseSlider.init();
  CertModal.init();
  ContactForm.init();

  // Fetch & render projects, certificates, and tech stack from /api/*.json
  loadData();
}

// Wait for DOM + Feather
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}