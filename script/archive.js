/**
 * Portfolio: archive.js
 * Shared logic for view/projects.html & view/certificates.html
 * Data source: ../api/project.json & ../api/certificate.json
 * Editorial index lists (no slider): full vertical list + search/filter.
 */
'use strict';

(function () {
  const page = document.body.dataset.page; // 'projects' | 'certificates'

  const strings = {
    en: {
      skip: 'Skip to content',
      searchProjects: 'Search projects...',
      searchCerts: 'Search certificates...',
      all: 'All',
      filterLabel: 'Category',
      empty: 'Nothing found. Try another keyword.',
      items: 'items',
      detail: 'Details',
      viewProject: 'View project',
      github: 'GitHub',
      featured: 'Featured',
      archive: 'Project archive',
      back: 'Back',
      home: 'Home',
      projects: 'Projects',
      certificates: 'Certificates',
      education: 'Education',
      experience: 'Experience',
      backShowcase: 'Back to Portfolio',
      toDark: 'Switch to dark mode',
      toLight: 'Switch to light mode',
      projectsEyebrow: 'Portfolio',
      projectsTitle: 'All Projects',
      projectsSub: 'Complete collection of my work, from experiments to production apps.',
      projectsOther: 'See Certificates',
      certsEyebrow: 'Achievements',
      certsTitle: 'All Certificates',
      certsSub: 'Verified courses and awards. Select any card to preview.',
      certsOther: 'See Projects',
    },
    id: {
      skip: 'Lewati ke konten',
      searchProjects: 'Cari proyek...',
      searchCerts: 'Cari sertifikat...',
      all: 'Semua',
      filterLabel: 'Kategori',
      empty: 'Tidak ditemukan. Coba kata kunci lain.',
      items: 'item',
      detail: 'Detail',
      viewProject: 'Lihat proyek',
      github: 'GitHub',
      featured: 'Unggulan',
      archive: 'Arsip proyek',
      back: 'Kembali',
      home: 'Beranda',
      projects: 'Proyek',
      certificates: 'Sertifikat',
      education: 'Pendidikan',
      experience: 'Pengalaman',
      backShowcase: 'Kembali ke Portofolio',
      toDark: 'Ganti ke mode gelap',
      toLight: 'Ganti ke mode terang',
      projectsEyebrow: 'Portofolio',
      projectsTitle: 'Semua Proyek',
      projectsSub: 'Koleksi lengkap karya saya, dari eksperimen hingga aplikasi produksi.',
      projectsOther: 'Lihat Sertifikat',
      certsEyebrow: 'Pencapaian',
      certsTitle: 'Semua Sertifikat',
      certsSub: 'Kursus dan penghargaan terverifikasi. Pilih kartu untuk pratinjau.',
      certsOther: 'Lihat Proyek',
    },
  };

  const State = {
    lang: safeGet('lang', 'en'),
    theme: safeGet('theme', 'light'),
    projects: [],
    certs: [],
    projectFilter: 'All',
    query: '',
  };

  function safeGet(k, fb) {
    try {
      const v = localStorage.getItem(k);
      return v || fb;
    } catch (_) {
      return fb;
    }
  }

  function safeSet(k, v) {
    try {
      localStorage.setItem(k, v);
    } catch (_) {}
  }

  const t = (k) => (strings[State.lang] && strings[State.lang][k]) || strings.en[k] || k;
  const pick = (obj) => (obj ? obj[State.lang] || obj.en || '' : '');
  const $ = (id) => document.getElementById(id);

  function escapeHtml(v) {
    return String(v).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));
  }

  /* Site-root asset paths break on subpath deploys.
     Archive pages live in /view/, so map "/assets/..." to "../assets/...". */
  function fixAsset(src) {
    const s = String(src || '').trim();
    if (!s) return '';
    if (s.charAt(0) === '/' && s.indexOf('//') !== 0) return '..' + s;
    return s;
  }

  /* ---------- theme ---------- */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    State.theme = theme;
    safeSet('theme', theme);
    const isDark = theme === 'dark';
    const sun = $('theme-icon-light');
    const moon = $('theme-icon-dark');
    if (sun) {
      sun.classList.toggle('hidden', isDark);
      sun.setAttribute('aria-hidden', isDark ? 'true' : 'false');
    }
    if (moon) {
      moon.classList.toggle('hidden', !isDark);
      moon.setAttribute('aria-hidden', !isDark ? 'true' : 'false');
    }
    const btn = $('theme-toggle');
    if (btn) {
      const label = isDark ? t('toLight') : t('toDark');
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
    }
  }

  /* ---------- project categories ---------- */
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

  function projectRow(p, idx) {
    const name = escapeHtml(pick(p.name));
    const desc = escapeHtml(pick(p.short_desc));
    const cat = escapeHtml(pick(p.category));
    const detailUrl = `detail.html?project=${encodeURIComponent(p.slug)}`;
    const placeholder = !p.demo || p.demo === '#';
    const github = placeholder ? '#' : escapeHtml(p.github);
    const num = String(idx + 1).padStart(2, '0');
    const meta = `${num} · ${cat}${p.year ? ` — ${escapeHtml(p.year)}` : ''}`;
    const icons = techIcons(p);
return `
        <article class="sup">
          <a href="${detailUrl}" class="sup-thumb" aria-label="${name}" tabindex="-1">
            <img src="${escapeHtml(fixAsset(p.image))}" alt="" loading="lazy" onerror="this.onerror=null;this.style.objectFit='contain';this.style.padding='0.5rem';" />
          </a>
          <div class="min-w-0">
            <p class="font-meta text-[11px] uppercase mb-1" style="color:var(--color-accent); letter-spacing:0.08em;">${meta}</p>
            <h3 class="text-[15px] font-bold mb-1 leading-snug" style="color:var(--color-text);">
              <a href="${detailUrl}" class="hover:underline">${name}</a>
            </h3>
            <p class="text-[13px] leading-relaxed line-clamp-2 mb-2.5" style="color:var(--color-text-muted);">${desc}</p>
            ${icons ? `<div class="flex flex-wrap items-center gap-1.5 mb-2.5">${icons}</div>` : ''}
            <div class="flex flex-wrap items-center gap-4">
              <a href="${detailUrl}" class="sup-link">${t('detail')} <span aria-hidden="true">→</span></a>
              <a href="${github}" class="sup-link"${placeholder ? '' : ' target="_blank" rel="noopener"'}>${t('github')}</a>
            </div>
          </div>
        </article>`;
  }

  function smoothPageTransition() {
    const viewport = $('archive-viewport');
    if (viewport) {
      viewport.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function renderProjectFilters() {
    const select = $('archive-filter-select');
    const legacyWrap = $('archive-filters');
    if (page !== 'projects') {
      if (select) select.classList.add('hidden');
      if (legacyWrap) legacyWrap.classList.add('hidden');
      return;
    }
    if (!select) return;
    const cats = projectCategories();
    if (!cats.includes(State.projectFilter)) State.projectFilter = t('all');
    select.innerHTML = cats.map((c) => `
      <option value="${escapeHtml(c)}"${c === State.projectFilter ? ' selected' : ''}>${escapeHtml(c)}</option>
    `).join('');
    select.classList.remove('hidden');
    select.onchange = () => {
      State.projectFilter = select.value;
      smoothPageTransition();
      renderProjectList();
    };
    if (legacyWrap) legacyWrap.classList.add('hidden');
  }

  /* ---------- certificates: compact rows, not project-like cards ---------- */
  function certCard(c) {
    const name = escapeHtml(pick(c.name));
    const issuer = escapeHtml(pick(c.issuer));
return `
        <article class="card overflow-hidden cursor-pointer cert-card cert-row" role="button" tabindex="0"
          data-cert-img="${escapeHtml(fixAsset(c.image))}" data-cert-name="${name}" data-cert-issuer="${issuer}">
        <div class="cert-thumb" aria-hidden="true">
          <img src="${escapeHtml(fixAsset(c.image))}" alt="" loading="lazy" onerror="this.onerror=null;this.style.objectFit='contain';" />
        </div>
        <div class="min-w-0">
          <h3 class="text-sm sm:text-[15px] font-bold leading-snug line-clamp-1" style="color:var(--color-text);">${name}</h3>
          <p class="text-xs sm:text-sm font-semibold line-clamp-1 mt-0.5" style="color:var(--color-accent);">${issuer}</p>
        </div>
        <i data-feather="eye" class="w-4 h-4 justify-self-end flex-shrink-0" style="color:var(--color-text-muted);"></i>
      </article>`;
  }

  /* ---------- archive list system (editorial, no slider) ---------- */
  function getFilteredProjects() {
    const q = State.query.trim().toLowerCase();
    const allLabel = t('all');
    return State.projects.filter((p) => {
      const matchCat = State.projectFilter === allLabel || pick(p.category) === State.projectFilter;
      if (!matchCat) return false;
      if (!q) return true;
      return `${pick(p.name)} ${pick(p.short_desc)} ${pick(p.category)} ${p.year || ''}`.toLowerCase().includes(q);
    });
  }

  function getFilteredCerts() {
    const q = State.query.trim().toLowerCase();
    return State.certs.filter((c) => {
      if (!q) return true;
      return `${pick(c.name)} ${pick(c.issuer)}`.toLowerCase().includes(q);
    });
  }

  function hideLegacySliderChrome() {
    const prevBtn = $('archive-prev');
    const nextBtn = $('archive-next');
    const dotsEl = $('archive-dots');
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    if (dotsEl) dotsEl.innerHTML = '';
  }

  function renderList(items, listHtml) {
    const track = $('archive-track');
    const viewport = $('archive-viewport');
    const countEl = $('archive-count');
    const emptyEl = $('archive-empty');
    const loadingEl = $('archive-loading');
    if (!track) return;

    if (loadingEl) loadingEl.classList.add('hidden');
    if (viewport) viewport.style.display = '';
    hideLegacySliderChrome();

    if (items.length === 0) {
      track.innerHTML = '';
      if (viewport) viewport.style.display = 'none';
      if (emptyEl) emptyEl.classList.remove('hidden');
      if (countEl) countEl.textContent = `0 ${t('items')}`;
      return;
    }

    if (emptyEl) emptyEl.classList.add('hidden');
    track.style.transform = '';
    track.innerHTML = listHtml;
    if (countEl) countEl.textContent = `${items.length} ${t('items')}`;
    if (typeof feather !== 'undefined') feather.replace({ 'stroke-width': 1.75 });
    if (page === 'certificates') initCertModalEvents();
  }

  function renderProjectList() {
    const items = getFilteredProjects();
    renderList(items, `<div class="sup-grid">${items.map((p, i) => projectRow(p, i)).join('')}</div>`);
  }

  function renderCertList() {
    const items = getFilteredCerts();
    renderList(items, `<div class="cert-list">${items.map((c) => certCard(c)).join('')}</div>`);
  }

  // Legacy aliases (kept so cached HTML / old callers don't crash).
  function renderProjectSlider() { renderProjectList(); }
  function renderCertSlider() { renderCertList(); }

  /* ---------- cert modal ---------- */
  function initCertModalEvents() {
    const track = $('archive-track');
    if (!track) return;
    // Remove old listeners by cloning
    track.removeEventListener('click', handleCertClick);
    track.addEventListener('click', handleCertClick);
    track.removeEventListener('keydown', handleCertKey);
    track.addEventListener('keydown', handleCertKey);
  }

  function handleCertClick(e) {
    const card = e.target.closest('.cert-card');
    if (!card) return;
    openCertModal(card);
  }

  function handleCertKey(e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.cert-card');
    if (card) {
      e.preventDefault();
      openCertModal(card);
    }
  }

  function openCertModal(card) {
    const modal = $('cert-modal');
    if (!modal) return;
    const imgEl = $('modal-cert-img');
    const nameEl = $('modal-cert-name');
    const issuerEl = $('modal-cert-issuer');

    if (imgEl) { imgEl.src = card.dataset.certImg || ''; imgEl.alt = card.dataset.certName || 'Certificate'; }
    if (nameEl) nameEl.textContent = card.dataset.certName || '';
    if (issuerEl) issuerEl.textContent = card.dataset.certIssuer || '';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function initModal() {
    const modal = $('cert-modal');
    if (!modal) return;
    const closeBtn = $('modal-close');

    function close() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', close);
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) close();
    });
  }

  /* ---------- static i18n ---------- */
  function applyStatic() {
    const isProjects = page === 'projects';
    document.querySelectorAll('[data-i18n-archive]').forEach((el) => {
      const key = el.getAttribute('data-i18n-archive');
      if (key === 'eyebrow') el.textContent = isProjects ? t('projectsEyebrow') : t('certsEyebrow');
      else if (key === 'title') el.textContent = isProjects ? t('projectsTitle') : t('certsTitle');
      else if (key === 'subtitle') el.textContent = isProjects ? t('projectsSub') : t('certsSub');
      else if (key === 'seeOther') el.textContent = isProjects ? t('projectsOther') : t('certsOther');
      else if (strings[State.lang][key]) el.textContent = t(key);
    });
    const search = $('archive-search');
    if (search) search.placeholder = isProjects ? t('searchProjects') : t('searchCerts');
    document.documentElement.lang = State.lang;
    const langBtn = $('lang-toggle');
    if (langBtn) langBtn.textContent = State.lang === 'en' ? 'ID' : 'EN';
    applyTheme(State.theme);
  }

  /* ---------- init ---------- */
  async function init() {
    applyTheme(State.theme);
    applyStatic();
    initModal();

    // Theme toggle
    const themeBtn = $('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', () => applyTheme(State.theme === 'light' ? 'dark' : 'light'));

    // Language toggle
    const langBtn = $('lang-toggle');
    if (langBtn) langBtn.addEventListener('click', () => {
      State.lang = State.lang === 'en' ? 'id' : 'en';
      safeSet('lang', State.lang);
      State.projectFilter = t('all');
      applyStatic();
      if (page === 'projects') { renderProjectFilters(); renderProjectList(); }
      else { renderCertList(); }
    });

    // Search
    const search = $('archive-search');
    if (search) search.addEventListener('input', () => {
      State.query = search.value;
      if (page === 'projects') renderProjectList();
      else renderCertList();
    });

    // Legacy slider chrome (if present in cached HTML): hide, never step.
    hideLegacySliderChrome();
    // Load data
    try {
      if (page === 'projects') {
        const res = await fetch('../api/project.json');
        if (!res.ok) throw new Error(res.status);
        const json = await res.json();
        State.projects = json.projects || [];
        renderProjectFilters();
        renderProjectList();
      } else {
        const res = await fetch('../api/certificate.json');
        if (!res.ok) throw new Error(res.status);
        const json = await res.json();
        State.certs = json.certificates || [];
        // Hide category filters for certificates
        const filtersWrap = $('archive-filters');
        if (filtersWrap) filtersWrap.classList.add('hidden');
        renderCertList();
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
