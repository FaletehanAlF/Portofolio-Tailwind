/**
 * Education – view/education.html
 * Data: ../api/education.json — logo + HRD-friendly description
 */
'use strict';
(function () {
  const strings = {
    en: {
      home: 'Home',
      projects: 'Projects',
      certificates: 'Certificates',
      education: 'Education',
      eyebrow: 'Academic Journey',
      title: 'Education',
      subtitle: 'HRD-friendly overview — verified schools, period, GPA and how each stage prepared me for a junior full-stack role.',
      statYears: 'Years',
      statYearsSub: 'SMK Focus',
      statGpa: 'GPA',
      statGpaSub: 'Productive',
      statCert: 'Certs',
      statCertSub: 'Verified',
      empty: 'No education data.',
      ctaProjects: 'View Projects',
      ctaContact: 'Contact Me',
      backShowcase: 'Back to Portfolio',
      toDark: 'Switch to dark mode',
      toLight: 'Switch to light mode',
      accredited: 'Accredited',
    },
    id: {
      home: 'Beranda',
      projects: 'Proyek',
      certificates: 'Sertifikat',
      education: 'Pendidikan',
      eyebrow: 'Perjalanan Akademik',
      title: 'Pendidikan',
      subtitle: 'Ringkasan ramah HRD — sekolah terverifikasi, periode, nilai, dan bagaimana tiap tahap menyiapkan saya untuk peran junior full-stack.',
      statYears: 'Tahun',
      statYearsSub: 'Fokus SMK',
      statGpa: 'Nilai',
      statGpaSub: 'Produktif',
      statCert: 'Sertif',
      statCertSub: 'Terverifikasi',
      empty: 'Tidak ada data pendidikan.',
      ctaProjects: 'Lihat Proyek',
      ctaContact: 'Hubungi Saya',
      backShowcase: 'Kembali ke Portofolio',
      toDark: 'Ganti ke mode gelap',
      toLight: 'Ganti ke mode terang',
      accredited: 'Terakreditasi',
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
    document.querySelectorAll('[data-i18n-edu]').forEach((el) => {
      const k = el.getAttribute('data-i18n-edu');
      if (strings[State.lang][k] !== undefined) el.textContent = t(k);
    });
    document.documentElement.lang = State.lang;
    const lb = $('lang-toggle');
    if (lb) lb.textContent = State.lang === 'en' ? 'ID' : 'EN';
    applyTheme(State.theme);
  }

  function cardHTML(item) {
    const institution = esc(pick(item.institution));
    const degree = esc(pick(item.degree));
    const period = esc(pick(item.period));
    const status = esc(pick(item.status));
    const desc = esc(pick(item.description));
    const location = esc(item.location || '');
    const logo = esc(item.logo || '');
    const highlights = (item.highlights || []).map((h) => `<li class="flex gap-2 text-sm leading-relaxed" style="color:var(--color-text-muted);"><i data-feather="check-circle" class="w-4 h-4 mt-0.5 flex-shrink-0" style="color:var(--color-accent);"></i><span>${esc(pick(h))}</span></li>`).join('');
    const courses = (item.courses || []).map((c) => `<span class="tech-badge">${esc(c)}</span>`).join('');

    return `
      <article class="card p-5 sm:p-6 flex gap-4 sm:gap-5 relative overflow-visible">
        <!-- dot for timeline (desktop) -->
        <span class="hidden sm:flex absolute top-6 w-3 h-3 rounded-full border-2" style="left:-18px; background:var(--color-accent); border-color:var(--color-bg); box-shadow:0 0 0 4px var(--color-border);" aria-hidden="true"></span>
        <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden p-2" style="background:var(--color-bg-secondary); border:1px solid var(--color-border);">
          <img src="${logo}" alt="${institution} logo" class="edu-logo w-full h-full" loading="lazy" onerror="this.style.display='none'" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex flex-wrap items-start justify-between gap-2 mb-2">
            <div>
              <h3 class="text-base sm:text-lg font-bold leading-tight" style="color:var(--color-text);">${institution}</h3>
              <p class="text-sm font-semibold" style="color:var(--color-accent);">${degree}</p>
            </div>
            ${item.accredited ? `<span class="tech-badge" style="background:rgba(37,99,235,0.1); color:var(--color-accent); border-color:transparent;"><i data-feather="shield" class="w-3 h-3 inline -mt-0.5"></i> ${esc(t('accredited'))}</span>` : ''}
          </div>
          <div class="flex flex-wrap gap-2 mb-3">
            <span class="tech-badge">${period}</span>
            <span class="tech-badge" style="background:var(--color-accent); color:#fff; border-color:var(--color-accent);">${status}</span>
            ${location ? `<span class="tech-badge"><i data-feather="map-pin" class="w-3 h-3 inline -mt-0.5"></i> ${location}</span>` : ''}
          </div>
          <p class="text-sm leading-relaxed mb-4" style="color:var(--color-text-muted);">${desc}</p>
          ${highlights ? `<ul class="flex flex-col gap-2 mb-4">${highlights}</ul>` : ''}
          ${courses ? `<div class="flex flex-wrap gap-1.5">${courses}</div>` : ''}
        </div>
      </article>
    `;
  }

  function render() {
    const list = $('edu-list');
    const wrap = $('edu-timeline');
    const loading = $('edu-loading');
    const empty = $('edu-empty');
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
  }

  async function init() {
    applyTheme(State.theme);
    applyStatic();
    const themeBtn = $('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', () => applyTheme(State.theme === 'light' ? 'dark' : 'light'));
    const langBtn = $('lang-toggle');
    if (langBtn) langBtn.addEventListener('click', () => {
      State.lang = State.lang === 'en' ? 'id' : 'en';
      localStorage.setItem('lang', State.lang);
      applyStatic();
      render();
    });
    try {
      const res = await fetch('../api/education.json');
      if (!res.ok) throw new Error(res.status);
      const json = await res.json();
      State.data = json.education || [];
      render();
    } catch (e) {
      console.error('[Education] load fail', e);
      const loading = $('edu-loading');
      if (loading) loading.innerHTML = '<p class="text-sm text-center py-8" style="color:var(--color-text-muted);">Failed to load education data.</p>';
    }
    if (typeof feather !== 'undefined') feather.replace({ 'stroke-width': 1.75 });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
