/**
 * Portfolio – detail.js
 * Project Detail Page | Reads /api/project.json
 * ------------------------------------------------------------------ */

'use strict';

(function () {
  /* ================================================================
     1. STRINGS (EN / ID)
     ================================================================ */
  const strings = {
    en: {
      back: 'Back to Portfolio',
      tech: 'Technologies Used',
      demo: 'Live Demo',
      github: 'GitHub',
      other: 'Other Projects',
      nfTitle: 'Project Not Found',
      nfDesc: "The project you are looking for doesn't exist or has been moved.",
      loadFail: 'Failed to load project data. Please try again later.',
    },
    id: {
      back: 'Kembali ke Portofolio',
      tech: 'Teknologi yang Digunakan',
      demo: 'Demo Langsung',
      github: 'GitHub',
      other: 'Proyek Lainnya',
      nfTitle: 'Proyek Tidak Ditemukan',
      nfDesc: 'Proyek yang Anda cari tidak ada atau telah dipindahkan.',
      loadFail: 'Gagal memuat data proyek. Silakan coba lagi nanti.',
    },
  };

  const State = {
    lang: localStorage.getItem('lang') || 'en',
    theme: localStorage.getItem('theme') || 'light',
    projects: [],
    active: null,
  };

  const t = key => strings[State.lang][key] || strings.en[key] || key;
  const pick = obj => (obj ? obj[State.lang] || obj.en || '' : '');

  const $ = id => document.getElementById(id);

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
     2. THEME SWITCHER
     ================================================================ */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    State.theme = theme;
    localStorage.setItem('theme', theme);

    $('theme-icon-light').classList.toggle('hidden', theme === 'dark');
    $('theme-icon-dark').classList.toggle('hidden', theme !== 'dark');
  }

  /* ================================================================
     3. RENDER
     ================================================================ */
  function renderTech(project) {
    const wrap = $('d-tech');
    wrap.innerHTML = (project.tech || []).map(item => `
      <img src="${escapeHtml(item.icon)}" alt="${escapeHtml(item.name)}" title="${escapeHtml(item.name)}"
        class="tech-icon tech-icon-lg" loading="lazy" />`).join('');
  }

  function renderRelated() {
    const others = State.projects.filter(p => p.slug !== State.active.slug).slice(0, 3);
    const section = $('d-related');
    const grid = $('d-related-grid');

    if (!others.length) {
      section.classList.add('hidden');
      return;
    }

    grid.innerHTML = others.map(p => `
      <a href="?project=${encodeURIComponent(p.slug)}"
        class="card overflow-hidden fade-up visible group">
        <div class="h-32 overflow-hidden" style="background-color:var(--color-bg-secondary);">
          <img src="${escapeHtml(p.image)}" alt="${escapeHtml(pick(p.name))}"
            class="w-full h-full object-cover" loading="lazy" />
        </div>
        <div class="p-4 flex items-center justify-between gap-3">
          <div>
            <h3 class="text-sm font-bold mb-0.5" style="color:var(--color-text);">${escapeHtml(pick(p.name))}</h3>
            <span class="text-xs" style="color:var(--color-accent); font-weight:600;">${escapeHtml(pick(p.category))}</span>
          </div>
          <i data-feather="arrow-right" class="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-1"
            style="color:var(--color-accent);"></i>
        </div>
      </a>`).join('');

    section.classList.remove('hidden');
  }

  function renderStaticLabels() {
    document.documentElement.lang = State.lang;
    $('lang-toggle').textContent = State.lang === 'en' ? 'ID' : 'EN';
    $('back-label').textContent = t('back');
    $('d-nf-back').textContent = t('back');
    $('d-tech-label').textContent = t('tech');
    $('d-other-label').textContent = t('other');
    $('d-demo-label').textContent = t('demo');
    $('d-github-label').textContent = t('github');
    $('d-nf-title').textContent = t('nfTitle');
    $('d-nf-desc').textContent = t('nfDesc');
  }

  function render() {
    const p = State.active;
    if (!p) return;

    const name = pick(p.name);
    document.title = `${name} | Faletehan`;
    $('d-image').src = p.image || '';
    $('d-image').alt = name;
    $('d-category').textContent = pick(p.category);
    $('d-year').textContent = p.year || '';
    $('d-title').textContent = name;
    $('d-desc').textContent = pick(p.long_desc) || pick(p.short_desc);
    renderTech(p);

    // Links – hide when not available ("#")
    const hasDemo = p.demo && p.demo !== '#';
    const hasGithub = p.github && p.github !== '#';
    $('d-demo').href = hasDemo ? p.demo : '#';
    $('d-demo').classList.toggle('hidden', !hasDemo);
    $('d-github').href = hasGithub ? p.github : '#';
    $('d-github').classList.toggle('hidden', !hasGithub);

    renderStaticLabels();
    renderRelated();

    if (typeof feather !== 'undefined') feather.replace({ 'stroke-width': 1.75 });
  }

  function showNotFound(message) {
    $('d-loading').classList.add('hidden');
    $('d-content').classList.add('hidden');
    $('d-related').classList.add('hidden');
    if (message) $('d-nf-desc').textContent = message;
    $('d-notfound').classList.remove('hidden');
    if (typeof feather !== 'undefined') feather.replace({ 'stroke-width': 1.75 });
  }

  /* ================================================================
     4. INIT
     ================================================================ */
  async function init() {
    applyTheme(State.theme);
    renderStaticLabels();

    $('theme-icon-light').classList.toggle('hidden', State.theme === 'dark');
    $('theme-icon-dark').classList.toggle('hidden', State.theme !== 'dark');

    $('theme-toggle').addEventListener('click', () => applyTheme(State.theme === 'light' ? 'dark' : 'light'));
    $('lang-toggle').addEventListener('click', () => {
      State.lang = State.lang === 'en' ? 'id' : 'en';
      localStorage.setItem('lang', State.lang);
      render();
    });

    try {
      const res = await fetch('../api/project.json');
      if (!res.ok) throw new Error(res.status);
      const json = await res.json();
      State.projects = json.projects || [];
    } catch (err) {
      console.error('[Detail] Failed to load API:', err);
      showNotFound(t('loadFail'));
      return;
    }

    const slug = new URLSearchParams(location.search).get('project');
    State.active = State.projects.find(p => p.slug === slug) || null;

    $('d-loading').classList.add('hidden');

    if (!State.active) {
      showNotFound();
      return;
    }

    render();
    $('d-content').classList.remove('hidden');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
