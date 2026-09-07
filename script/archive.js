/**
 * Portfolio – archive.js
 * Shared logic for view/projects.html & view/certificates.html
 * Data source: ../api/project.json & ../api/certificate.json
 * Uses pager-viewport slider: 6 cards per page (3 top + 3 bottom), swipe/slide to navigate
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
      home: 'Home',
      projects: 'Projects',
      certificates: 'Certificates',
      backShowcase: 'Back to Showcase',
      toDark: 'Switch to dark mode',
      toLight: 'Switch to light mode',
      projectsEyebrow: 'Portfolio',
      projectsTitle: 'All Projects',
      projectsSub: 'Complete collection of my work — from experiments to production apps. Data loaded live from API.',
      projectsOther: 'See Certificates',
      certsEyebrow: 'Achievements',
      certsTitle: 'All Certificates',
      certsSub: 'Verified courses & awards. Click any card to preview. Data loaded live from API.',
      certsOther: 'See Projects',
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
      home: 'Beranda',
      projects: 'Proyek',
      certificates: 'Sertifikat',
      backShowcase: 'Kembali ke Showcase',
      toDark: 'Ganti ke mode gelap',
      toLight: 'Ganti ke mode terang',
      projectsEyebrow: 'Portofolio',
      projectsTitle: 'Semua Proyek',
      projectsSub: 'Koleksi lengkap karya saya — dari eksperimen hingga aplikasi produksi. Data dimuat langsung dari API.',
      projectsOther: 'Lihat Sertifikat',
      certsEyebrow: 'Pencapaian',
      certsTitle: 'Semua Sertifikat',
      certsSub: 'Kursus & penghargaan terverifikasi. Klik kartu untuk pratinjau. Data dimuat langsung dari API.',
      certsOther: 'Lihat Proyek',
    },
  };

  const State = {
    lang: localStorage.getItem('lang') || 'en',
    theme: localStorage.getItem('theme') || 'light',
    projects: [],
    certs: [],
    projectFilter: 'All',
    query: '',
    currentPage: 0,
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

  function projectCard(p) {
    const name = escapeHtml(pick(p.name));
    const desc = escapeHtml(pick(p.short_desc));
    const cat = escapeHtml(pick(p.category));
    const detailUrl = `detail.html?project=${encodeURIComponent(p.slug)}`;
    const placeholder = !p.demo || p.demo === '#';
    const github = placeholder ? '#' : escapeHtml(p.github);
return `
        <article class="card overflow-hidden fade-up flex flex-col">
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
        State.currentPage = 0;
        renderProjectFilters();
        renderProjectSlider();
      });
    });
  }

  /* ---------- certificates ---------- */
  function certCard(c) {
    const name = escapeHtml(pick(c.name));
    const issuer = escapeHtml(pick(c.issuer));
return `
        <article class="card overflow-hidden cursor-pointer cert-card flex flex-col fade-up" role="button" tabindex="0"
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

  /* ---------- chunk helper ---------- */
  function chunk(arr, size) {
    const out = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
  }

  /* ---------- pager/slider system ---------- */
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

  function renderSlider(items, cardFn) {
    const track = $('archive-track');
    const viewport = $('archive-viewport');
    const countEl = $('archive-count');
    const emptyEl = $('archive-empty');
    const loadingEl = $('archive-loading');
    const dotsEl = $('archive-dots');
    if (!track) return;

    // Hide loading, show track
    if (loadingEl) loadingEl.classList.add('hidden');
    if (viewport) viewport.style.display = '';

    if (items.length === 0) {
      track.innerHTML = '';
      if (viewport) viewport.style.display = 'none';
      if (emptyEl) emptyEl.classList.remove('hidden');
      if (countEl) countEl.textContent = `0 ${t('items')}`;
      if (dotsEl) dotsEl.innerHTML = '';
      State.currentPage = 0;
      return;
    }

    if (emptyEl) emptyEl.classList.add('hidden');

    // Chunk into pages of 6
    const pages = chunk(items, 6);
    track.innerHTML = pages.map((pageItems, i) =>
      `<div class="pager-page${i === State.currentPage ? ' page-active' : ''}"><div class="pager-grid">${pageItems.map(cardFn).join('')}</div></div>`
    ).join('');

    if (countEl) countEl.textContent = `${items.length} ${t('items')}`;

    // Clamp current page
    State.currentPage = Math.max(0, Math.min(pages.length - 1, State.currentPage));

    // Render dots
    renderArchiveDots(pages.length);

    // Paint slider position
    paintArchiveSlider();

    // Init feather icons on new cards
    if (typeof feather !== 'undefined') feather.replace({ 'stroke-width': 1.75 });

    // Init cert modal on new cards
    if (page === 'certificates') initCertModalEvents();
  }

  function renderArchiveDots(total) {
    const dotsEl = $('archive-dots');
    if (!dotsEl) return;
    if (total <= 1) {
      dotsEl.innerHTML = '';
      return;
    }
    dotsEl.innerHTML = Array.from({ length: total }, (_, i) =>
      `<button type="button" class="slider-dot${i === State.currentPage ? ' active' : ''}" data-page="${i}" aria-label="Go to slide ${i + 1}"></button>`
    ).join('');
    dotsEl.querySelectorAll('.slider-dot').forEach(btn => {
      btn.addEventListener('click', () => {
        State.currentPage = parseInt(btn.dataset.page, 10);
        paintArchiveSlider();
        renderArchiveDots(total);
      });
    });
  }

  function paintArchiveSlider() {
    const track = $('archive-track');
    const prevBtn = $('archive-prev');
    const nextBtn = $('archive-next');
    if (!track) return;

    const pages = track.querySelectorAll(':scope > .pager-page');
    const totalPages = pages.length;
    const idx = Math.max(0, Math.min(totalPages - 1, State.currentPage));
    State.currentPage = idx;

    track.style.transform = `translateX(-${idx * 100}%)`;

    // Mark active page for staggered card animations
    pages.forEach((p, i) => {
      const wasActive = p.classList.contains('page-active');
      p.classList.toggle('page-active', i === idx);
      // Re-trigger card animations when becoming active
      if (i === idx && !wasActive) {
        p.querySelectorAll('.card').forEach(card => {
          card.style.transition = 'none';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px) scale(0.97)';
          // Force reflow then animate
          void card.offsetHeight;
          card.style.transition = '';
        });
      }
    });

    // Update dots active state
    const dotsEl = $('archive-dots');
    if (dotsEl) {
      dotsEl.querySelectorAll('.slider-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
    }

    // Show/hide prev/next buttons
    if (prevBtn) {
      prevBtn.disabled = idx <= 0;
      prevBtn.style.display = totalPages > 1 ? '' : 'none';
    }
    if (nextBtn) {
      nextBtn.disabled = idx >= totalPages - 1;
      nextBtn.style.display = totalPages > 1 ? '' : 'none';
    }
  }

  function archiveStep(dir) {
    const track = $('archive-track');
    if (!track) return;
    const totalPages = track.querySelectorAll(':scope > .pager-page').length;
    State.currentPage = Math.max(0, Math.min(totalPages - 1, State.currentPage + dir));
    paintArchiveSlider();
    renderArchiveDots(totalPages);
  }

  function renderProjectSlider() {
    const items = getFilteredProjects();
    renderSlider(items, projectCard);
  }

  function renderCertSlider() {
    const items = getFilteredCerts();
    renderSlider(items, certCard);
  }

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
      localStorage.setItem('lang', State.lang);
      State.projectFilter = t('all');
      State.currentPage = 0;
      applyStatic();
      if (page === 'projects') { renderProjectFilters(); renderProjectSlider(); }
      else { renderCertSlider(); }
    });

    // Search
    const search = $('archive-search');
    if (search) search.addEventListener('input', () => {
      State.query = search.value;
      State.currentPage = 0;
      if (page === 'projects') renderProjectSlider();
      else renderCertSlider();
    });

    // Slider prev/next buttons
    const prevBtn = $('archive-prev');
    const nextBtn = $('archive-next');
    if (prevBtn) prevBtn.addEventListener('click', () => archiveStep(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => archiveStep(1));

    // Keyboard navigation on viewport
    const viewport = $('archive-viewport');
    if (viewport) {
      viewport.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') { e.preventDefault(); archiveStep(1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); archiveStep(-1); }
      });

      // Touch swipe
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
          archiveStep(dx < 0 ? 1 : -1);
        }
      }, { passive: true });
    }

    // Load data
    try {
      if (page === 'projects') {
        const res = await fetch('../api/project.json');
        if (!res.ok) throw new Error(res.status);
        const json = await res.json();
        State.projects = json.projects || [];
        renderProjectFilters();
        renderProjectSlider();
      } else {
        const res = await fetch('../api/certificate.json');
        if (!res.ok) throw new Error(res.status);
        const json = await res.json();
        State.certs = json.certificates || [];
        // Hide category filters for certificates
        const filtersWrap = $('archive-filters');
        if (filtersWrap) filtersWrap.classList.add('hidden');
        renderCertSlider();
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
