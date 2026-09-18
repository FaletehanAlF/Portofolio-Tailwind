/**
 * Experience: view/experience.html
 * Vertical editorial timeline, API-driven, most recent first
 */
'use strict';
(function () {
  const strings = {
    en: {
      skip: 'Skip to content',
      home: 'Home',
      projects: 'Projects',
      certificates: 'Certificates',
      education: 'Education',
      experience: 'Experience',
      eyebrow: 'Career Path',
      title: 'Experience',
      subtitle: 'Roles, impact, and tech — most recent first.',
      statYears: 'Years',
      statYearsSub: 'Active',
      statProjects: 'Projects',
      statProjectsSub: 'Shipped',
      statCompanies: 'Teams',
      statCompaniesSub: 'Places',
      items: 'items',
      empty: 'No experience data.',
      ctaProjects: 'View projects',
      ctaContact: 'Hire me',
      backShowcase: 'Back to Portfolio',
      toDark: 'Switch to dark mode',
      toLight: 'Switch to light mode',
    },
    id: {
      skip: 'Lewati ke konten',
      home: 'Beranda',
      projects: 'Proyek',
      certificates: 'Sertifikat',
      education: 'Pendidikan',
      experience: 'Pengalaman',
      eyebrow: 'Jalur Karier',
      title: 'Pengalaman',
      subtitle: 'Peran, dampak, dan teknologi — dari yang terbaru.',
      statYears: 'Tahun',
      statYearsSub: 'Aktif',
      statProjects: 'Proyek',
      statProjectsSub: 'Selesai',
      statCompanies: 'Tim',
      statCompaniesSub: 'Tempat',
      items: 'item',
      empty: 'Tidak ada data pengalaman.',
      ctaProjects: 'Lihat proyek',
      ctaContact: 'Rekrut saya',
      backShowcase: 'Kembali ke Portofolio',
      toDark: 'Ganti ke mode gelap',
      toLight: 'Ganti ke mode terang',
    },
  };

  const State = {
    lang: localStorage.getItem('lang') || 'en',
    theme: localStorage.getItem('theme') || 'light',
    data: [],
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

  /* Timeline row: year + role + description. Hierarchy by time, not boxes. */
  function itemHTML(item) {
    const company = esc(pick(item.company));
    const role = esc(pick(item.role));
    const period = esc(pick(item.period));
    const type = esc(pick(item.type));
    const location = esc(item.location || '');
    const desc = esc(pick(item.description));
    const logo = esc(item.logo || '');
    const highlights = (item.highlights || []).map((h) => `<li class="flex gap-2.5 text-[14px] leading-6" style="color:var(--color-text);"><i data-feather="check-circle" class="w-4 h-4 mt-0.5 flex-shrink-0" style="color:var(--color-accent);"></i><span style="color:var(--color-text-muted);">${esc(pick(h))}</span></li>`).join('');
    const tech = (item.tech || []).map((c) => `<span class="tech-badge">${esc(c)}</span>`).join('');
    return `
      <li class="tl-item reveal">
        <div>
          <p class="tl-period">${period}</p>
          <p class="text-xs font-semibold mt-1.5" style="color:var(--color-text-muted);">${type}</p>
        </div>
        <div class="min-w-0">
          <div class="flex items-start gap-3.5 mb-2">
            <div class="w-11 h-11 rounded-xl items-center justify-center flex-shrink-0 overflow-hidden p-2 hidden sm:flex" style="background:var(--color-bg-secondary); border:1px solid var(--color-border);">
              <img src="${logo}" alt="" class="w-full h-full object-contain" loading="lazy" onerror="this.style.display='none'" />
            </div>
            <div class="min-w-0">
              <h3 class="text-[16px] sm:text-[18px] font-extrabold leading-tight tracking-tight" style="color:var(--color-text);">${role}</h3>
              <p class="text-sm font-semibold mt-1" style="color:var(--color-text);">${company}${location ? ` <span class="text-xs font-medium" style="color:var(--color-text-muted);">- ${location}</span>` : ''}</p>
            </div>
          </div>
          <p class="text-[14.5px] leading-7 mb-4 font-[450]" style="color:var(--color-text-muted); letter-spacing:-0.01em;">${desc}</p>
          ${highlights ? `<ul class="flex flex-col gap-2 mb-4 pl-1">${highlights}</ul>` : ''}
          ${tech ? `<div class="flex flex-wrap gap-2">${tech}</div>` : ''}
        </div>
      </li>
    `;
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

  function render() {
    const list = $('exp-timeline');
    const loading = $('exp-loading');
    const empty = $('exp-empty');
    const countEl = $('exp-count');
    if (!list) return;
    if (loading) loading.classList.add('hidden');
    if (!State.data.length) {
      list.innerHTML = '';
      if (empty) empty.classList.remove('hidden');
      if (countEl) countEl.textContent = `0 ${t('items')}`;
      return;
    }
    if (empty) empty.classList.add('hidden');
    list.innerHTML = State.data.map(itemHTML).join('');
    if (countEl) countEl.textContent = `${State.data.length} ${t('items')}`;
    initReveal();
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
      render();
    });

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
