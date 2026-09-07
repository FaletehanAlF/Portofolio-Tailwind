/**
 * Portfolio – archive.js
 * Shared logic for view/projects.html & view/certificates.html
 * Data source: ../api/project.json & ../api/certificate.json
 */
'use strict';

(function () {
  const page = document.body.dataset.page; // 'projects' | 'certificates'

  const strings = {
    en: {
      searchProjects: 'Search projects...',
      searchCerts: 'Search certificates...',
      all: 'All',
      empty: 'Nothing found. Try another keyword.',
      items: 'items',
      detail: 'Project Detail',
      github: 'GitHub',
      back: 'Back',
    },
    id: {
      searchProjects: 'Cari proyek...',
      searchCerts: 'Cari sertifikat...',
      all: 'Semua',
      empty: 'Tidak ditemukan. Coba kata kunci lain.',
      items: 'item',
      detail: 'Detail Proyek',
      github: 'GitHub',
      back: 'Kembali',
    },
  };

  const State = {
    lang: localStorage.getItem('lang') || 'en',
    theme: localStorage.getItem('theme') || 'light',
    projects: [],
    certs: [],
    projectFilter: 'All',
    certFilter: 'All',
    query: '',
  };

  const t = (k) => (strings[State.lang] && strings[State.lang][k]) || strings.en[k] || k;
  const pick = (obj) => (obj ? obj[State.lang] || obj.en || '' : '');
  const $ = (id) => document.getElementById(id);

  function escapeHtml(v) {
    return String(v).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));
  }

  /* ---------- theme ---------- */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    State.theme = theme;
    localStorage.setItem('theme', theme);
    const l = $('theme-icon-light'), d = $('theme-icon-dark');
    if (l) l.classList.toggle('hidden', theme === 'dark');
    if (d) d.classList.toggle('hidden', theme !== 'dark');
  }

  /* ---------- projects ---------- */
  function projectCategories() {
    const set = new Map();
    State.projects.forEach((p) => {
      const label = pick(p.category) || 'Other';
      if (!set.has(label)) set.set(label, label);
    });
    return [t('all'), ...[...set.values()].sort()];
  }

  function techIcons(p) {
    return (p.tech || []).map((x) => `
      <img src="${escapeHtml(x.icon)}" alt="${escapeHtml(x.name)}" title="${escapeHtml(x.name)}"
        class="tech-icon" loading="lazy" />`).join('');
  }

  function projectCard(p) {
    const name = escapeHtml(pick(p.name));
    const desc = escapeHtml(pick(p.short_desc));
    const cat = escapeHtml(pick(p.category));
    const detailUrl = `detail.html?project=${encodeURIComponent(p.slug)}`;
    const placeholder = !p.demo || p.demo === '#';
    const github = placeholder ? '#' : escapeHtml(p.github);
    return `
      <article class="card overflow-hidden flex flex-col">
        <div class="relative h-48 overflow-hidden flex-shrink-0" style="background-color:var(--color-bg-secondary);">
          <img src="${escapeHtml(p.image)}" alt="${name}" class="w-full h-full object-cover" loading="lazy" />
          <span class="absolute top-3 left-3 tech-badge" style="background:rgba(255,255,255,.94); color:#0f172a; border-color:transparent;">${cat}</span>
          ${p.year ? `<span class="absolute top-3 right-3 tech-badge" style="background:rgba(0,0,0,.55); color:#fff; border-color:transparent;">${escapeHtml(p.year)}</span>` : ''}
        </div>
        <div class="p-5 flex flex-col flex-1">
          <h3 class="text-base font-bold mb-1.5 tracking-tight" style="color:var(--color-text);">${name}</h3>
          <p class="text-sm leading-relaxed mb-4" style="color:var(--color-text-muted);">${desc}</p>
          <div class="flex flex-wrap items-center gap-1.5 mb-5">${techIcons(p)}</div>
          <div class="flex gap-2 mt-auto">
            <a href="${detailUrl}" class="btn-primary !text-xs !px-4 !py-2.5 flex-1 justify-center">${t('detail')}</a>
            <a href="${github}" class="btn-secondary !text-xs !px-4 !py-2.5"${placeholder ? '' : ' target="_blank" rel="noopener"'}>${t('github')}</a>
          </div>
        </div>
      </article>`;
  }

  function renderProjectFilters() {
    const wrap = $('archive-filters');
    if (!wrap) return;
    const cats = projectCategories();
    if (!cats.includes(State.projectFilter)) State.projectFilter = t('all');
    wrap.innerHTML = cats.map((c) => `
      <button class="filter-chip${c === State.projectFilter ? ' active' : ''}" data-filter="${escapeHtml(c)}">${escapeHtml(c)}</button>
    `).join('');
    wrap.querySelectorAll('[data-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        State.projectFilter = btn.dataset.filter;
        renderProjectFilters();
        renderProjects();
      });
    });
  }

  function renderProjects() {
    const grid = $('archive-grid');
    const count = $('archive-count');
    const empty = $('archive-empty');
    if (!grid) return;
    const q = State.query.trim().toLowerCase();
    const allLabel = t('all');
    const list = State.projects.filter((p) => {
      const matchCat = State.projectFilter === allLabel || pick(p.category) === State.projectFilter;
      if (!matchCat) return false;
      if (!q) return true;
      return `${pick(p.name)} ${pick(p.short_desc)} ${pick(p.category)} ${p.year || ''}`.toLowerCase().includes(q);
    });
    grid.innerHTML = list.map(projectCard).join('');
    if (count) count.textContent = `${list.length} ${t('items')}`;
    if (empty) empty.classList.toggle('hidden', list.length > 0);
    if (typeof feather !== 'undefined') feather.replace({ 'stroke-width': 1.75 });
  }

  /* ---------- certificates ---------- */
  function certIssuers() {
    const set = new Map();
    State.certs.forEach((c) => {
      const label = pick(c.issuer) || 'Other';
      if (!set.has(label)) set.set(label, label);
    });
    return [t('all'), ...[...set.values()].sort()];
  }

  function certCard(c) {
    const name = escapeHtml(pick(c.name));
    const issuer = escapeHtml(pick(c.issuer));
    return `
      <article class="card overflow-hidden cursor-pointer cert-card flex flex-col" role="button" tabindex="0"
        data-cert-img="${escapeHtml(c.image)}" data-cert-name="${name}" data-cert-issuer="${issuer}">
        <div class="h-56 overflow-hidden flex-shrink-0" style="background-color:var(--color-bg-secondary);">
          <img src="${escapeHtml(c.image)}" alt="${name}" class="w-full h-full object-cover" loading="lazy" />
        </div>
        <div class="p-4 sm:p-5 flex-1">
          <h3 class="text-sm sm:text-base font-bold mb-1 leading-snug" style="color:var(--color-text);">${name}</h3>
          <p class="text-xs sm:text-sm font-semibold" style="color:var(--color-accent);">${issuer}</p>
        </div>
      </article>`;
  }

  function renderCertFilters() {
    const wrap = $('archive-filters');
    if (!wrap) return;
    const issuers = certIssuers();
    if (!issuers.includes(State.certFilter)) State.certFilter = t('all');
    wrap.innerHTML = issuers.map((c) => `
      <button class="filter-chip${c === State.certFilter ? ' active' : ''}" data-filter="${escapeHtml(c)}">${escapeHtml(c)}</button>
    `).join('');
    wrap.querySelectorAll('[data-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        State.certFilter = btn.dataset.filter;
        renderCertFilters();
        renderCerts();
      });
    });
  }

  function renderCerts() {
    const grid = $('archive-grid');
    const count = $('archive-count');
    const empty = $('archive-empty');
    if (!grid) return;
    const q = State.query.trim().toLowerCase();
    const allLabel = t('all');
    const list = State.certs.filter((c) => {
      const match = State.certFilter === allLabel || pick(c.issuer) === State.certFilter;
      if (!match) return false;
      if (!q) return true;
      return `${pick(c.name)} ${pick(c.issuer)}`.toLowerCase().includes(q);
    });
    grid.innerHTML = list.map(certCard).join('');
    if (count) count.textContent = `${list.length} ${t('items')}`;
    if (empty) empty.classList.toggle('hidden', list.length > 0);
    if (typeof feather !== 'undefined') feather.replace({ 'stroke-width': 1.75 });
  }

  /* ---------- cert modal ---------- */
  function initModal() {
    const modal = $('cert-modal');
    if (!modal) return;
    const imgEl = $('modal-cert-img');
    const nameEl = $('modal-cert-name');
    const issuerEl = $('modal-cert-issuer');
    const closeBtn = $('modal-close');

    function open(img, name, issuer) {
      if (imgEl) { imgEl.src = img || ''; imgEl.alt = name || 'Certificate'; }
      if (nameEl) nameEl.textContent = name || '';
      if (issuerEl) issuerEl.textContent = issuer || '';
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
    document.addEventListener('click', (e) => {
      const card = e.target.closest && e.target.closest('.cert-card');
      if (card) open(card.dataset.certImg, card.dataset.certName, card.dataset.certIssuer);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const card = e.target.closest && e.target.closest('.cert-card');
        if (card) { e.preventDefault(); open(card.dataset.certImg, card.dataset.certName, card.dataset.certIssuer); }
      }
      if (e.key === 'Escape' && modal.classList.contains('open')) close();
    });
    if (closeBtn) closeBtn.addEventListener('click', close);
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  }

  /* ---------- static i18n ---------- */
  function applyStatic() {
    document.querySelectorAll('[data-i18n-archive]').forEach((el) => {
      const key = el.getAttribute('data-i18n-archive');
      if (strings[State.lang][key]) el.textContent = t(key);
    });
    const search = $('archive-search');
    if (search) search.placeholder = page === 'projects' ? t('searchProjects') : t('searchCerts');
    document.documentElement.lang = State.lang;
    const langBtn = $('lang-toggle');
    if (langBtn) langBtn.textContent = State.lang === 'en' ? 'ID' : 'EN';
  }

  async function init() {
    applyTheme(State.theme);
    applyStatic();
    initModal();

    const themeBtn = $('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', () => applyTheme(State.theme === 'light' ? 'dark' : 'light'));
    const langBtn = $('lang-toggle');
    if (langBtn) langBtn.addEventListener('click', () => {
      State.lang = State.lang === 'en' ? 'id' : 'en';
      localStorage.setItem('lang', State.lang);
      State.projectFilter = t('all');
      State.certFilter = t('all');
      applyStatic();
      if (page === 'projects') { renderProjectFilters(); renderProjects(); }
      else { renderCertFilters(); renderCerts(); }
    });

    const search = $('archive-search');
    if (search) search.addEventListener('input', () => {
      State.query = search.value;
      if (page === 'projects') renderProjects();
      else renderCerts();
    });

    try {
      if (page === 'projects') {
        const res = await fetch('../api/project.json');
        if (!res.ok) throw new Error(res.status);
        const json = await res.json();
        State.projects = json.projects || [];
        const loading = $('archive-loading');
        if (loading) loading.classList.add('hidden');
        const grid = $('archive-grid');
        if (grid) grid.classList.remove('hidden');
        renderProjectFilters();
        renderProjects();
      } else {
        const res = await fetch('../api/certificate.json');
        if (!res.ok) throw new Error(res.status);
        const json = await res.json();
        State.certs = json.certificates || [];
        const loading = $('archive-loading');
        if (loading) loading.classList.add('hidden');
        const grid = $('archive-grid');
        if (grid) grid.classList.remove('hidden');
        renderCertFilters();
        renderCerts();
      }
    } catch (err) {
      console.error('[Archive] Failed to load API:', err);
      const loading = $('archive-loading');
      if (loading) loading.innerHTML = '<p class="text-sm text-center py-10" style="color:var(--color-text-muted);">Failed to load data.</p>';
    }

    if (typeof feather !== 'undefined') feather.replace({ 'stroke-width': 1.75 });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
