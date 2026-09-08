/**
 * Experience – view/experience.html
 * Horizontal slider with 2-finger drag, API-driven, clean
 */
'use strict';
(function () {
  const strings = {
    en: {
      home: 'Home',
      projects: 'Projects',
      certificates: 'Certificates',
      education: 'Education',
      experience: 'Experience',
      eyebrow: 'Career Path',
      title: 'Experience',
      subtitle: 'Clean horizontal slider of roles, impact and tech — built for HRD to scan in seconds. Drag with two fingers or use arrows.',
      statYears: 'Years',
      statYearsSub: 'Active',
      statProjects: 'Projects',
      statProjectsSub: 'Shipped',
      statCompanies: 'Teams',
      statCompaniesSub: 'Places',
      items: 'items',
      empty: 'No experience data.',
      ctaProjects: 'View Projects',
      ctaContact: 'Contact Me',
      backShowcase: 'Back to Portfolio',
      toDark: 'Switch to dark mode',
      toLight: 'Switch to light mode',
    },
    id: {
      home: 'Beranda',
      projects: 'Proyek',
      certificates: 'Sertifikat',
      education: 'Pendidikan',
      experience: 'Pengalaman',
      eyebrow: 'Jalur Karier',
      title: 'Pengalaman',
      subtitle: 'Slider horizontal peran, dampak dan teknologi — dirancang agar HRD mudah memindai. Geser dengan dua jari atau tombol panah.',
      statYears: 'Tahun',
      statYearsSub: 'Aktif',
      statProjects: 'Proyek',
      statProjectsSub: 'Selesai',
      statCompanies: 'Tim',
      statCompaniesSub: 'Tempat',
      items: 'item',
      empty: 'Tidak ada data pengalaman.',
      ctaProjects: 'Lihat Proyek',
      ctaContact: 'Hubungi Saya',
      backShowcase: 'Kembali ke Portofolio',
      toDark: 'Ganti ke mode gelap',
      toLight: 'Ganti ke mode terang',
    },
  };

  const State = {
    lang: localStorage.getItem('lang') || 'en',
    theme: localStorage.getItem('theme') || 'light',
    data: [],
    currentPage: 0,
  };

  const t = (k) => (strings[State.lang] && strings[State.lang][k]) || strings.en[k] || k;
  const pick = (o) => (o ? o[State.lang] || o.en || '' : '');
  const $ = (id) => document.getElementById(id);
  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    State.theme = theme;
    localStorage.setItem('theme', theme);
    const isDark = theme === 'dark';
    const sun = $('theme-icon-light'), moon = $('theme-icon-dark');
    if (sun) { sun.classList.toggle('hidden', isDark); sun.setAttribute('aria-hidden', isDark ? 'true' : 'false'); }
    if (moon) { moon.classList.toggle('hidden', !isDark); moon.setAttribute('aria-hidden', !isDark ? 'true' : 'false'); }
    const btn = $('theme-toggle');
    if (btn) { const label = isDark ? t('toLight') : t('toDark'); btn.setAttribute('aria-label', label); btn.setAttribute('title', label); }
  }

  function applyStatic() {
    document.querySelectorAll('[data-i18n-exp]').forEach((el) => {
      const k = el.getAttribute('data-i18n-exp');
      if (strings[State.lang][k] !== undefined) el.textContent = t(k);
    });
    document.documentElement.lang = State.lang;
    const lb = $('lang-toggle');
    if (lb) lb.textContent = State.lang === 'en' ? 'ID' : 'EN';
    applyTheme(State.theme);
  }

  function cardHTML(item) {
    const company = esc(pick(item.company));
    const role = esc(pick(item.role));
    const period = esc(pick(item.period));
    const type = esc(pick(item.type));
    const location = esc(item.location || '');
    const desc = esc(pick(item.description));
    const logo = esc(item.logo || '');
    const highlights = (item.highlights || []).map((h) => `<li class="flex gap-2.5 text-[14px] leading-6" style="color:var(--color-text);"><span class="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style="background:var(--color-accent);"></span><span style="color:var(--color-text-muted);">${esc(pick(h))}</span></li>`).join('');
    const tech = (item.tech || []).map((c) => `<span class="tech-badge !px-3 !py-1.5" style="background:var(--color-bg-secondary);">${esc(c)}</span>`).join('');
    return `
      <article class="card exp-card p-0 overflow-hidden flex flex-col">
        <div class="h-1 w-full" style="background:linear-gradient(90deg,var(--color-accent),#60a5fa);"></div>
        <div class="p-6 sm:p-7 flex gap-5">
          <div class="hidden sm:flex w-14 h-14 rounded-xl items-center justify-center flex-shrink-0 overflow-hidden p-2.5" style="background:var(--color-bg-secondary); border:1px solid var(--color-border);">
            <img src="${logo}" alt="${company} logo" class="w-full h-full object-contain" loading="lazy" onerror="this.style.display='none'" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
              <div class="flex gap-3 sm:gap-4">
                <div class="sm:hidden w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden p-2" style="background:var(--color-bg-secondary); border:1px solid var(--color-border);">
                  <img src="${logo}" alt="${company} logo" class="w-full h-full object-contain" loading="lazy" onerror="this.style.display='none'" />
                </div>
                <div>
                  <h3 class="text-[16px] sm:text-[17px] font-extrabold leading-tight tracking-tight" style="color:var(--color-text);">${role}</h3>
                  <p class="text-sm font-semibold mt-1 flex items-center gap-1.5" style="color:var(--color-text);">${company} <span class="w-1 h-1 rounded-full" style="background:var(--color-text-muted);"></span> <span class="text-xs font-medium" style="color:var(--color-text-muted);">${location}</span></p>
                </div>
              </div>
              <span class="tech-badge whitespace-nowrap self-start sm:mt-1" style="background:var(--color-accent); color:#fff; border-color:var(--color-accent); font-size:11px; letter-spacing:0.04em;">${period}</span>
            </div>
            <div class="mb-4">
              <span class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full" style="background:rgba(37,99,235,0.08); color:var(--color-accent); border:1px solid rgba(37,99,235,0.12);">${type}</span>
            </div>
            <p class="text-[14.5px] leading-7 mb-4 font-[450]" style="color:var(--color-text-muted); letter-spacing:-0.01em;">${desc}</p>
            ${highlights ? `<ul class="flex flex-col gap-2 mb-5 pl-1">${highlights}</ul>` : ''}
            ${tech ? `<div class="flex flex-wrap gap-2 pt-4" style="border-top:1px solid var(--color-border);">${tech}</div>` : ''}
          </div>
        </div>
      </article>
    `;
  }

  function chunk(arr, size) {
    const out = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
  }

  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (els.length && 'IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target;
            const idx = Array.from(els).indexOf(el);
            setTimeout(() => el.classList.add('in'), (idx % 3) * 70);
            obs.unobserve(el);
          }
        });
      }, { threshold: 0.15 });
      els.forEach((el) => obs.observe(el));
    } else {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
    }
  }

  function renderDots(total) {
    const dotsEl = $('exp-dots');
    if (!dotsEl) return;
    if (total <= 1) { dotsEl.innerHTML = ''; return; }
    dotsEl.innerHTML = Array.from({ length: total }, (_, i) =>
      `<button type="button" class="slider-dot${i === State.currentPage ? ' active' : ''}" data-page="${i}" aria-label="Go to slide ${i + 1}"></button>`
    ).join('');
    dotsEl.querySelectorAll('.slider-dot').forEach((btn) => {
      btn.addEventListener('click', () => {
        State.currentPage = parseInt(btn.dataset.page, 10);
        paint();
        renderDots(total);
      });
    });
  }

  function paint() {
    const track = $('exp-track');
    const prev = $('exp-prev');
    const next = $('exp-next');
    if (!track) return;
    const pages = track.querySelectorAll(':scope > .pager-page');
    const total = pages.length;
    const idx = Math.max(0, Math.min(total - 1, State.currentPage));
    State.currentPage = idx;
    track.style.transform = `translateX(-${idx * 100}%)`;
    pages.forEach((p, i) => p.classList.toggle('page-active', i === idx));
    const dotsEl = $('exp-dots');
    if (dotsEl) dotsEl.querySelectorAll('.slider-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
    if (prev) { prev.disabled = idx <= 0; prev.style.display = total > 1 ? '' : 'none'; }
    if (next) { next.disabled = idx >= total - 1; next.style.display = total > 1 ? '' : 'none'; }
  }

  function step(dir) {
    const track = $('exp-track');
    if (!track) return;
    const total = track.querySelectorAll(':scope > .pager-page').length;
    State.currentPage = Math.max(0, Math.min(total - 1, State.currentPage + dir));
    paint();
    renderDots(total);
  }

  function render() {
    const track = $('exp-track');
    const loading = $('exp-loading');
    const empty = $('exp-empty');
    const countEl = $('exp-count');
    if (!track) return;
    if (loading) loading.classList.add('hidden');
    if (!State.data.length) {
      track.innerHTML = '';
      const vp = $('exp-viewport');
      if (vp) vp.style.display = 'none';
      if (empty) empty.classList.remove('hidden');
      if (countEl) countEl.textContent = `0 ${t('items')}`;
      const dotsEl = $('exp-dots');
      if (dotsEl) dotsEl.innerHTML = '';
      return;
    }
    if (empty) empty.classList.add('hidden');
    const vp = $('exp-viewport');
    if (vp) vp.style.display = '';
    const pages = chunk(State.data, 2);
    track.innerHTML = pages.map((pg, i) =>
      `<div class="pager-page${i === State.currentPage ? ' page-active' : ''}"><div class="pager-grid pager-grid-exp">${pg.map(cardHTML).join('')}</div></div>`
    ).join('');
    if (countEl) countEl.textContent = `${State.data.length} ${t('items')}`;
    State.currentPage = Math.max(0, Math.min(pages.length - 1, State.currentPage));
    renderDots(pages.length);
    paint();
    if (typeof feather !== 'undefined') feather.replace({ 'stroke-width': 1.75 });
  }

  async function init() {
    applyTheme(State.theme);
    applyStatic();
    initReveal();
    const tb = $('theme-toggle');
    if (tb) tb.addEventListener('click', () => applyTheme(State.theme === 'light' ? 'dark' : 'light'));
    const lb = $('lang-toggle');
    if (lb) lb.addEventListener('click', () => {
      State.lang = State.lang === 'en' ? 'id' : 'en';
      localStorage.setItem('lang', State.lang);
      applyStatic();
      State.currentPage = 0;
      render();
    });

    const prev = $('exp-prev');
    const next = $('exp-next');
    if (prev) prev.addEventListener('click', () => step(-1));
    if (next) next.addEventListener('click', () => step(1));

    const viewport = $('exp-viewport');
    if (viewport) {
      viewport.style.cursor = 'grab';
      viewport.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
      });
      let sx = 0, sy = 0, tracking = false;
      viewport.addEventListener('touchstart', (e) => {
        if (e.touches.length !== 1) return;
        tracking = true;
        sx = e.touches[0].clientX;
        sy = e.touches[0].clientY;
      }, { passive: true });
      viewport.addEventListener('touchend', (e) => {
        if (!tracking) return;
        tracking = false;
        const dx = e.changedTouches[0].clientX - sx;
        const dy = e.changedTouches[0].clientY - sy;
        if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.3) step(dx < 0 ? 1 : -1);
      }, { passive: true });
      let wheelLock = false;
      viewport.addEventListener('wheel', (e) => {
        const horiz = Math.abs(e.deltaX) > Math.abs(e.deltaY);
        const delta = horiz ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
        if (Math.abs(delta) < 18) return;
        if (horiz || e.shiftKey) {
          e.preventDefault();
          if (wheelLock) return;
          wheelLock = true;
          step(delta > 0 ? 1 : -1);
          setTimeout(() => { wheelLock = false; }, 380);
        }
      }, { passive: false });
      let isDragging = false, startX = 0, didDrag = false;
      viewport.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        isDragging = true;
        didDrag = false;
        startX = e.clientX;
        viewport.style.cursor = 'grabbing';
        e.preventDefault();
      });
      viewport.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        if (Math.abs(e.clientX - startX) > 8) didDrag = true;
      });
      viewport.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        viewport.style.cursor = 'grab';
        const dx = e.clientX - startX;
        if (didDrag && Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
        didDrag = false;
      });
      viewport.addEventListener('mouseleave', () => {
        isDragging = false;
        viewport.style.cursor = 'grab';
      });
    }

    try {
      const res = await fetch('../api/experience.json');
      if (!res.ok) throw new Error(res.status);
      const json = await res.json();
      State.data = json.experience || [];
      render();
    } catch (e) {
      console.error('[Experience] load fail', e);
      const loading = $('exp-loading');
      if (loading) loading.innerHTML = '<p class="text-sm text-center py-8" style="color:var(--color-text-muted);">Failed to load experience data.</p>';
    }
    if (typeof feather !== 'undefined') feather.replace({ 'stroke-width': 1.75 });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
