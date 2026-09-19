/**
 * Portfolio: detail.js
 * Project Detail Page | Reads ../api/project.json
 * Professional HR-friendly layout. Null-safe, no overlapping UI.
 */
'use strict';

(function () {
  const strings = {
    en: {
      skip: 'Skip to content',
      back: 'Back to Portfolio',
      backProjects: 'Back to Projects',
      home: 'Home',
      projects: 'Projects',
      eyebrow: 'Project Case Study',
      overviewTitle: 'About this project',
      techTitle: 'Technologies used',
      techCount: '{n} technologies',
      techCountOne: '1 technology',
      techEmpty: 'Tech stack is not listed for this project yet.',
      accessTitle: 'Links',
      demo: 'Live Demo',
      github: 'Source Code',
      copyLink: 'Copy page link',
      copied: 'Page link copied!',
      noDemo: 'Live demo is not available for this project yet.',
      onlyDemo: 'Live demo is available. Source code is private or not published yet.',
      onlyGithub: 'Source code is available. Live demo is not published yet.',
      bothOk: 'Both live demo and source code are available for review.',
      noneOk: 'This project is still in progress. Links will be published soon.',
      na: 'Not listed',
      imageCaption: 'Project preview',
      completed: 'Completed',
      comingSoon: 'In Progress',
      prev: 'Previous',
      next: 'Next',
      other: 'Other Projects',
      explore: 'Keep exploring',
      viewProject: 'View project',
      seeAll: 'See All',
      allProjects: 'All Projects',
      hireMe: 'Hire me',
      info: 'Project snapshot',
      status: 'Status',
      category: 'Category',
      year: 'Year',
      stack: 'Stack',
      ctaTitle: 'Interested in this work?',
      ctaDesc: 'Available for internships, freelance, and junior roles.',
      checkTitle: 'For recruiters',
      check0: 'Open the live demo to review UX and responsiveness.',
      check1: 'Check source code for structure and readability.',
      check2: 'See tech stack relevance to your role.',
      nfTitle: 'Project Not Found',
      nfDesc: "The project you are looking for doesn't exist or has been moved.",
      loadFail: 'Failed to load project data. Please try again later.',
      toDark: 'Switch to dark mode',
      toLight: 'Switch to light mode',
    },
    id: {
      skip: 'Lewati ke konten',
      back: 'Kembali ke Portofolio',
      backProjects: 'Kembali ke Proyek',
      home: 'Beranda',
      projects: 'Proyek',
      eyebrow: 'Studi Kasus Proyek',
      overviewTitle: 'Tentang proyek ini',
      techTitle: 'Teknologi yang digunakan',
      techCount: '{n} teknologi',
      techCountOne: '1 teknologi',
      techEmpty: 'Teknologi proyek ini belum dicantumkan.',
      accessTitle: 'Tautan',
      demo: 'Demo Langsung',
      github: 'Kode Sumber',
      copyLink: 'Salin tautan halaman',
      copied: 'Tautan halaman disalin!',
      noDemo: 'Demo langsung belum tersedia untuk proyek ini.',
      onlyDemo: 'Demo langsung tersedia. Kode sumber privat atau belum dipublikasikan.',
      onlyGithub: 'Kode sumber tersedia. Demo langsung belum dipublikasikan.',
      bothOk: 'Demo langsung dan kode sumber tersedia untuk ditinjau.',
      noneOk: 'Proyek ini masih dalam pengerjaan. Tautan akan dipublikasikan segera.',
      na: 'Belum dicantumkan',
      imageCaption: 'Pratinjau proyek',
      completed: 'Selesai',
      comingSoon: 'Dalam Pengerjaan',
      prev: 'Sebelumnya',
      next: 'Berikutnya',
      other: 'Proyek Lainnya',
      explore: 'Jelajahi lagi',
      viewProject: 'Lihat proyek',
      seeAll: 'Lihat Semua',
      allProjects: 'Semua Proyek',
      hireMe: 'Rekrut saya',
      info: 'Ringkasan proyek',
      status: 'Status',
      category: 'Kategori',
      year: 'Tahun',
      stack: 'Teknologi',
      ctaTitle: 'Tertarik dengan karya ini?',
      ctaDesc: 'Tersedia untuk magang, freelance, dan peran junior.',
      checkTitle: 'Untuk perekrut',
      check0: 'Buka demo langsung untuk menilai UX dan responsivitas.',
      check1: 'Periksa kode sumber untuk struktur dan keterbacaan.',
      check2: 'Lihat relevansi tech stack dengan peran Anda.',
      nfTitle: 'Proyek Tidak Ditemukan',
      nfDesc: 'Proyek yang Anda cari tidak ada atau telah dipindahkan.',
      loadFail: 'Gagal memuat data proyek. Silakan coba lagi nanti.',
      toDark: 'Ganti ke mode gelap',
      toLight: 'Ganti ke mode terang',
    },
  };

  const State = {
    lang: 'en',
    theme: 'light',
    projects: [],
    active: null,
    activeIndex: -1,
  };

  try {
    State.lang = localStorage.getItem('lang') || 'en';
    if (State.lang !== 'en' && State.lang !== 'id') State.lang = 'en';
  } catch (_) { State.lang = 'en'; }
  try {
    State.theme = localStorage.getItem('theme') || 'light';
    if (State.theme !== 'light' && State.theme !== 'dark') State.theme = 'light';
  } catch (_) { State.theme = 'light'; }

  const t = (key) => (strings[State.lang] && strings[State.lang][key]) || strings.en[key] || key;
  const pick = (obj) => (obj ? obj[State.lang] || obj.en || '' : '');
  const $ = (id) => document.getElementById(id);

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));
  }

  function normSlug(value) {
    return String(value == null ? '' : value)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/_+/g, '-')
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function fixAsset(src) {
    const s = String(src || '').trim();
    if (!s) return '';
    // Absolute site-root paths break on file:// and sub-path hosting.
    // detail.html lives in /view/, so map "/assets/..." -> "../assets/...".
    if (s.charAt(0) === '/' && s.indexOf('//') !== 0) return '..' + s;
    return s;
  }

  function hasLink(url) {
    const s = String(url || '').trim();
    return s !== '' && s !== '#';
  }

  /* ---------- theme ---------- */
  function applyTheme(theme) {
    if (theme !== 'light' && theme !== 'dark') theme = 'light';
    document.documentElement.setAttribute('data-theme', theme);
    State.theme = theme;
    try { localStorage.setItem('theme', theme); } catch (_) {}
    const isDark = theme === 'dark';
    const sun = $('theme-icon-light');
    const moon = $('theme-icon-dark');
    if (sun) {
      sun.classList.toggle('hidden', isDark);
      sun.classList.toggle('block', !isDark);
    }
    if (moon) {
      moon.classList.toggle('hidden', !isDark);
      moon.classList.toggle('block', isDark);
    }
    const btn = $('theme-toggle');
    if (btn) {
      const label = isDark ? t('toLight') : t('toDark');
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
    }
  }

  function refreshIcons() {
    try {
      if (typeof feather !== 'undefined' && feather && typeof feather.replace === 'function') {
        feather.replace({ 'stroke-width': 1.75 });
      }
    } catch (_) {}
  }

  /* ---------- render helpers ---------- */
  function renderParagraphs(text) {
    const wrap = $('d-desc');
    if (!wrap) return;
    const clean = String(text || '').trim();
    if (!clean) {
      wrap.innerHTML = '';
      return;
    }
    // Split into sentences, then group into readable paragraphs (max ~2 sentences each).
    const sentences = clean.replace(/\s+/g, ' ').split(/(?<=[.!?])\s+/).filter(Boolean);
    const groups = [];
    for (let i = 0; i < sentences.length; i += 2) {
      groups.push(sentences.slice(i, i + 2).join(' '));
    }
    const paras = groups.length ? groups : [clean];
    wrap.innerHTML = paras.map((p) => `<p>${escapeHtml(p)}</p>`).join('');
  }

  function renderTech(project) {
    const wrap = $('d-tech');
    const emptyEl = $('d-tech-empty');
    const countEl = $('d-tech-count');
    const list = Array.isArray(project.tech) ? project.tech : [];
    if (countEl) {
      countEl.textContent = list.length === 1 ? t('techCountOne')
        : list.length > 1 ? t('techCount').replace('{n}', String(list.length)) : '';
    }
    if (!wrap) return;
    if (!list.length) {
      wrap.innerHTML = '';
      if (emptyEl) {
        emptyEl.textContent = t('techEmpty');
        emptyEl.classList.remove('hidden');
      }
      return;
    }
    if (emptyEl) emptyEl.classList.add('hidden');
    wrap.innerHTML = list.map((item, i) => {
      const name = escapeHtml(item && item.name ? item.name : 'Tech');
      const icon = escapeHtml(item && item.icon ? item.icon : '');
      const img = icon
        ? `<img src="${icon}" alt="" aria-hidden="true" loading="lazy" onerror="this.style.display='none'" />`
        : `<span class="detail-tech-fallback" aria-hidden="true">${escapeHtml(name.charAt(0) || 'T')}</span>`;
      const idx = String(i + 1).padStart(2, '0');
      return `<div class="d-tech-row">${img}<span>${name}</span><span class="d-tech-idx">${idx}</span></div>`;
    }).join('');
  }

  function renderRelated() {
    const section = $('d-related');
    const grid = $('d-related-grid');
    if (!section || !grid) return;
    if (!State.projects.length) {
      section.classList.add('hidden');
      return;
    }
    // Deterministic: the next 3 projects after the active one (wrap around).
    const total = State.projects.length;
    const out = [];
    for (let k = 1; k < total && out.length < 3; k++) {
      const p = State.projects[(State.activeIndex + k) % total];
      if (p && p !== State.active) out.push(p);
    }
    if (!out.length) {
      section.classList.add('hidden');
      return;
    }
    grid.innerHTML = out.map((p) => {
      const name = escapeHtml(pick(p.name));
      const cat = escapeHtml(pick(p.category));
      const img = fixAsset(p.image);
      return `
        <article class="sup">
          <a href="detail.html?project=${encodeURIComponent(p.slug)}" class="sup-thumb" aria-label="${name}" tabindex="-1">
            <img src="${escapeHtml(img)}" alt="" loading="lazy" onerror="this.style.objectFit='contain';this.style.padding='0.5rem';this.onerror=null;" />
          </a>
          <div class="min-w-0">
            <p class="font-meta text-[11px] uppercase mb-1" style="color:var(--color-accent); letter-spacing:0.08em;">${cat}</p>
            <h3 class="text-[15px] font-bold mb-1 leading-snug" style="color:var(--color-text);">
              <a href="detail.html?project=${encodeURIComponent(p.slug)}" class="hover:underline">${name}</a>
            </h3>
            <a href="detail.html?project=${encodeURIComponent(p.slug)}" class="sup-link">${t('viewProject')} <span aria-hidden="true">→</span></a>
          </div>
        </article>`;
    }).join('');
    section.classList.remove('hidden');
  }

  function renderPager() {
    const total = State.projects.length;
    if (total < 2) {
      const pager = $('d-pager');
      if (pager) pager.classList.add('hidden');
      return;
    }
    const prev = State.projects[(State.activeIndex - 1 + total) % total];
    const next = State.projects[(State.activeIndex + 1) % total];
    const prevA = $('d-prev');
    const nextA = $('d-next');
    if (prev && prevA) {
      prevA.href = `detail.html?project=${encodeURIComponent(prev.slug)}`;
      const n = $('d-prev-name');
      if (n) n.textContent = pick(prev.name);
    }
    if (next && nextA) {
      nextA.href = `detail.html?project=${encodeURIComponent(next.slug)}`;
      const n = $('d-next-name');
      if (n) n.textContent = pick(next.name);
    }
  }

  function renderStaticLabels() {
    document.documentElement.lang = State.lang === 'id' ? 'id' : 'en';
    const langBtn = $('lang-toggle');
    if (langBtn) langBtn.textContent = State.lang === 'en' ? 'ID' : 'EN';
    const set = (id, val) => { const el = $(id); if (el) el.textContent = val; };
    set('skip-link', t('skip'));
    set('back-label', t('back'));
    set('d-back-projects', t('backProjects'));
    set('d-crumb-home', t('home'));
    set('d-crumb-projects', t('projects'));
    set('d-eyebrow', t('eyebrow'));
    set('d-overview-title', t('overviewTitle'));
    set('d-tech-title', t('techTitle'));
    set('d-access-title', t('accessTitle'));
    set('d-demo-label', t('demo'));
    set('d-github-label', t('github'));
    set('d-other-label', t('other'));
    set('d-explore-label', t('explore'));
    set('d-seeall-label', t('seeAll'));
    set('d-info-title', t('info'));
    set('d-lbl-category', t('category'));
    set('d-lbl-year', t('year'));
    set('d-lbl-stack', t('stack'));
    set('d-lbl-status', t('status'));
    set('d-cta-title', t('ctaTitle'));
    set('d-cta-desc', t('ctaDesc'));
    set('d-all-label', t('allProjects'));
    set('d-hire-label', t('hireMe'));
    set('d-check-title', t('checkTitle'));
    set('d-nf-title', t('nfTitle'));
    set('d-nf-desc', t('nfDesc'));
    set('d-nf-back', t('back'));
    set('d-nf-all', t('allProjects'));
    set('d-prev-dir', t('prev'));
    set('d-next-dir', t('next'));
    set('d-image-caption', t('imageCaption'));
    document.querySelectorAll('[data-check]').forEach((el) => {
      const k = 'check' + el.getAttribute('data-check');
      if (strings[State.lang][k]) el.textContent = t(k);
    });
    const share = $('d-share');
    if (share) {
      share.setAttribute('aria-label', t('copyLink'));
      share.setAttribute('title', t('copyLink'));
    }
  }

  function render() {
    const p = State.active;
    if (!p) return;
    renderStaticLabels();

    const name = pick(p.name);
    const category = pick(p.category);
    const shortDesc = pick(p.short_desc);
    const longDesc = pick(p.long_desc) || shortDesc;
    const demoOk = hasLink(p.demo);
    const githubOk = hasLink(p.github);
    const isDone = demoOk;

    document.title = `${name} | Faletehan`;

    const crumb = $('d-breadcrumb-name');
    if (crumb) crumb.textContent = name;
    const title = $('d-title');
    if (title) title.textContent = name;
    const sub = $('d-subtitle');
    if (sub) {
      sub.textContent = shortDesc;
      sub.style.display = shortDesc ? '' : 'none';
    }

    const cat = $('d-category');
    if (cat) cat.textContent = category || t('na');
    const year = $('d-year');
    if (year) year.textContent = p.year || t('na');

    const dot = $('d-status-dot');
    if (dot) {
      dot.classList.toggle('is-done', isDone);
      dot.classList.toggle('is-progress', !isDone);
    }
    const stx = $('d-status-text');
    if (stx) stx.textContent = isDone ? t('completed') : t('comingSoon');

    const img = $('d-image');
    if (img) {
      img.src = fixAsset(p.image);
      img.alt = name;
      img.onerror = function () {
        this.onerror = null;
        this.style.objectFit = 'contain';
        this.style.padding = '2rem';
      };
    }

    renderParagraphs(longDesc);
    renderTech(p);

    // Info sidebar
    const setInfo = (id, val) => { const el = $(id); if (el) el.textContent = val; };
    setInfo('d-info-category', category || t('na'));
    setInfo('d-info-year', p.year || t('na'));
    const stackNames = Array.isArray(p.tech) && p.tech.length
      ? p.tech.map((x) => x.name).filter(Boolean).join(', ')
      : t('na');
    setInfo('d-info-stack', stackNames);
    const infoStatus = $('d-info-status');
    if (infoStatus) {
      infoStatus.textContent = isDone ? t('completed') : t('comingSoon');
      infoStatus.style.color = isDone ? '#16a34a' : 'var(--color-text-muted)';
    }

    // Links
    const demoA = $('d-demo');
    if (demoA) {
      if (demoOk) {
        demoA.href = p.demo;
        demoA.target = '_blank';
        demoA.rel = 'noopener';
        demoA.removeAttribute('aria-disabled');
        demoA.classList.remove('is-disabled');
      } else {
        demoA.href = '#';
        demoA.removeAttribute('target');
        demoA.setAttribute('aria-disabled', 'true');
        demoA.classList.add('is-disabled');
      }
    }
    const ghA = $('d-github');
    if (ghA) {
      if (githubOk) {
        ghA.href = p.github;
        ghA.target = '_blank';
        ghA.rel = 'noopener';
        ghA.removeAttribute('aria-disabled');
        ghA.classList.remove('is-disabled');
      } else {
        ghA.href = '#';
        ghA.removeAttribute('target');
        ghA.setAttribute('aria-disabled', 'true');
        ghA.classList.add('is-disabled');
      }
    }
    const note = $('d-links-note');
    if (note) {
      if (demoOk && githubOk) note.textContent = t('bothOk');
      else if (demoOk) note.textContent = t('onlyDemo');
      else if (githubOk) note.textContent = t('onlyGithub');
      else note.textContent = t('noneOk');
    }

    renderPager();
    renderRelated();
    refreshIcons();
  }

  function showNotFound(message) {
    const loading = $('d-loading');
    const content = $('d-content');
    const related = $('d-related');
    if (loading) loading.classList.add('hidden');
    if (content) content.classList.add('hidden');
    if (related) related.classList.add('hidden');
    if (message) {
      const d = $('d-nf-desc');
      if (d) d.textContent = message;
    }
    const nf = $('d-notfound');
    if (nf) nf.classList.remove('hidden');
    refreshIcons();
  }

  /* ---------- toast + copy ---------- */
  function ensureToast() {
    let toast = document.getElementById('copy-toast');
    if (toast) return toast;
    toast = document.createElement('div');
    toast.id = 'copy-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
    return toast;
  }

  function showToast(msg) {
    const toast = ensureToast();
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('show'), 1800);
  }

  async function copyText(text) {
    const s = String(text || '');
    if (!s) return false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(s);
        return true;
      }
    } catch (_) {}
    try {
      const ta = document.createElement('textarea');
      ta.value = s;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '0';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, ta.value.length);
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return !!ok;
    } catch (_) {
      return false;
    }
  }

  function findProject(projects, rawSlug) {
    if (!Array.isArray(projects) || !projects.length) return { project: null, index: -1 };
    const q = String(rawSlug == null ? '' : rawSlug);
    if (!q.trim()) return { project: null, index: -1 };
    let idx = projects.findIndex((p) => p && p.slug === q);
    if (idx >= 0) return { project: projects[idx], index: idx };
    const nq = normSlug(q);
    idx = projects.findIndex((p) => p && normSlug(p.slug) === nq);
    if (idx >= 0) return { project: projects[idx], index: idx };
    return { project: null, index: -1 };
  }

  /* ---------- init ---------- */
  async function init() {
    applyTheme(State.theme);
    renderStaticLabels();

    const themeBtn = $('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', () => applyTheme(State.theme === 'light' ? 'dark' : 'light'));

    const langBtn = $('lang-toggle');
    if (langBtn) langBtn.addEventListener('click', () => {
      State.lang = State.lang === 'en' ? 'id' : 'en';
      try { localStorage.setItem('lang', State.lang); } catch (_) {}
      render();
    });

    // Guarded demo/github clicks when link is unavailable.
    const demoA = $('d-demo');
    if (demoA) demoA.addEventListener('click', (e) => {
      if (demoA.classList.contains('is-disabled')) {
        e.preventDefault();
        showToast(t('noDemo'));
      }
    });
    const ghA = $('d-github');
    if (ghA) ghA.addEventListener('click', (e) => {
      if (ghA.classList.contains('is-disabled')) e.preventDefault();
    });

    const shareBtn = $('d-share');
    if (shareBtn) shareBtn.addEventListener('click', async () => {
      const ok = await copyText(window.location.href);
      if (ok) showToast(t('copied'));
      else showToast(t('loadFail'));
    });

    try {
      const res = await fetch('../api/project.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const json = await res.json();
      State.projects = Array.isArray(json.projects) ? json.projects : [];
    } catch (err) {
      renderStaticLabels();
      showNotFound(t('loadFail'));
      return;
    }

    let slug = '';
    try {
      slug = new URLSearchParams(window.location.search).get('project') || '';
    } catch (_) { slug = ''; }

    const found = findProject(State.projects, slug);
    State.active = found.project;
    State.activeIndex = found.index;

    const loading = $('d-loading');
    const nf = $('d-notfound');
    const content = $('d-content');
    const related = $('d-related');
    if (loading) loading.classList.add('hidden');
    if (nf) nf.classList.add('hidden');
    if (content) content.classList.add('hidden');
    if (related) related.classList.add('hidden');

    if (!State.active) {
      renderStaticLabels();
      showNotFound();
      return;
    }

    render();
    if (content) content.classList.remove('hidden');
    refreshIcons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
