/**
 * Experience – view/experience.html
 * Data: ../api/experience.json — logo + HRD timeline
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
      subtitle: 'Clean timeline of roles, impact and tech — built for HRD to scan in seconds.',
      statYears: 'Years',
      statYearsSub: 'Active',
      statProjects: 'Projects',
      statProjectsSub: 'Shipped',
      statCompanies: 'Teams',
      statCompaniesSub: 'Places',
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
      subtitle: 'Timeline peran, dampak dan teknologi — dirancang agar HRD mudah memindai.',
      statYears: 'Tahun',
      statYearsSub: 'Aktif',
      statProjects: 'Proyek',
      statProjectsSub: 'Selesai',
      statCompanies: 'Tim',
      statCompaniesSub: 'Tempat',
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
    const highlights = (item.highlights || []).map((h) => `<li class="flex gap-2 text-sm leading-relaxed" style="color:var(--color-text-muted);"><i data-feather="check-circle" class="w-4 h-4 mt-0.5 flex-shrink-0" style="color:var(--color-accent);"></i><span>${esc(pick(h))}</span></li>`).join('');
    const tech = (item.tech || []).map((c) => `<span class="tech-badge">${esc(c)}</span>`).join('');
    return `
      <article class="card exp-reveal p-6 sm:p-7 flex gap-5 sm:gap-6 relative overflow-visible">
        <span class="hidden sm:flex absolute top-7 w-3 h-3 rounded-full border-2" style="left:-26px; background:var(--color-accent); border-color:var(--color-bg); box-shadow:0 0 0 4px var(--color-border);" aria-hidden="true"></span>
        <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden p-2.5" style="background:var(--color-bg-secondary); border:1px solid var(--color-border);">
          <img src="${logo}" alt="${company} logo" class="exp-logo w-full h-full" loading="lazy" onerror="this.style.display='none'" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex flex-wrap items-start justify-between gap-2.5 mb-3">
            <div>
              <h3 class="text-base sm:text-lg font-bold leading-tight tracking-tight" style="color:var(--color-text);">${role}</h3>
              <p class="text-sm font-semibold mt-0.5" style="color:var(--color-accent);">${company}</p>
            </div>
            <span class="tech-badge" style="background:rgba(37,99,235,0.1); color:var(--color-accent); border-color:transparent;">${type}</span>
          </div>
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="tech-badge">${period}</span>
            ${location ? `<span class="tech-badge"><i data-feather="map-pin" class="w-3 h-3 inline -mt-0.5"></i> ${location}</span>` : ''}
          </div>
          <p class="text-[15px] leading-7 mb-5" style="color:var(--color-text-muted);">${desc}</p>
          ${highlights ? `<ul class="flex flex-col gap-2.5 mb-5">${highlights}</ul>` : ''}
          ${tech ? `<div class="flex flex-wrap gap-2">${tech}</div>` : ''}
        </div>
      </article>
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

  function observeCards() {
    const cards = document.querySelectorAll('#exp-list .exp-reveal');
    if (!cards.length) return;
    if (!('IntersectionObserver' in window)) {
      cards.forEach((c) => c.classList.add('in'));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target;
          const idx = Array.from(cards).indexOf(el);
          el.style.transitionDelay = `${idx * 80}ms`;
          el.classList.add('in');
          setTimeout(() => { el.style.transitionDelay = ''; }, 500);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.12 });
    cards.forEach((c) => obs.observe(c));
  }

  function render() {
    const list = $('exp-list');
    const wrap = $('exp-timeline');
    const loading = $('exp-loading');
    const empty = $('exp-empty');
    if (!list || !wrap) return;
    if (loading) loading.classList.add('hidden');
    if (!State.data.length) {
      wrap.classList.add('hidden');
      if (empty) empty.classList.remove('hidden');
      return;
    }
    if (empty) empty.classList.add('hidden');
    wrap.classList.remove('hidden');
    list.innerHTML = State.data.map(cardHTML).join('');
    if (typeof feather !== 'undefined') feather.replace({ 'stroke-width': 1.75 });
    observeCards();
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
