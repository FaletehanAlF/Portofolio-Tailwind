/**
 * Education: view/education.html
 * Data: ../api/education.json: logo + HRD-friendly description
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
      eyebrow: 'Academic Journey',
      title: 'Education',
      subtitle: 'Schools, years, grades, and how each stage prepared me for a junior full-stack role.',
      statYears: 'Years',
      statYearsSub: 'SMK Focus',
      statGpa: 'GPA',
      statGpaSub: 'Productive',
      statCert: 'Certs',
      statCertSub: 'Verified',
      empty: 'No education data.',
      ctaProjects: 'View projects',
      ctaContact: 'Hire me',
      backShowcase: 'Back to Portfolio',
      toDark: 'Switch to dark mode',
      toLight: 'Switch to light mode',
      accredited: 'Accredited',
    },
    id: {
      skip: 'Lewati ke konten',
      home: 'Beranda',
      projects: 'Proyek',
      certificates: 'Sertifikat',
      education: 'Pendidikan',
      experience: 'Pengalaman',
      eyebrow: 'Perjalanan Akademik',
      title: 'Pendidikan',
      subtitle: 'Sekolah, tahun, nilai, dan bagaimana tiap tahap menyiapkan saya untuk peran junior full-stack.',
      statYears: 'Tahun',
      statYearsSub: 'Fokus SMK',
      statGpa: 'Nilai',
      statGpaSub: 'Produktif',
      statCert: 'Sertif',
      statCertSub: 'Terverifikasi',
      empty: 'Tidak ada data pendidikan.',
      ctaProjects: 'Lihat proyek',
      ctaContact: 'Rekrut saya',
      backShowcase: 'Kembali ke Portofolio',
      toDark: 'Ganti ke mode gelap',
      toLight: 'Ganti ke mode terang',
      accredited: 'Terakreditasi',
    },
  };

  const State = {
    lang: safeGet('lang', 'en'),
    theme: safeGet('theme', 'light'),
    data: [],
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
  const pick = (o) => (o ? o[State.lang] || o.en || '' : '');
  const $ = (id) => document.getElementById(id);
  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    State.theme = theme;
    safeSet('theme', theme);
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
    const highlights = (item.highlights || []).map((h) => `<li><i data-feather="check-circle" class="w-4 h-4 mt-0.5 flex-shrink-0" style="color:#16a34a;" aria-hidden="true"></i><span>${esc(pick(h))}</span></li>`).join('');
    const courses = (item.courses || []).map((c) => esc(c)).join(' · ');

    return `
      <article class="edu-profile edu-reveal">
        <div class="edu-logo-frame">
          <img src="${logo}" alt="${institution} logo" class="edu-logo" loading="lazy" onerror="this.style.display='none'" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="edu-period">${period}</p>
          <h3 class="edu-school">${institution}</h3>
          <p class="edu-degree">${degree}</p>
          <p class="edu-sub">${location}${location && status ? ' · ' : ''}${status}</p>
          ${item.accredited ? `<p class="edu-accred"><i data-feather="shield" class="w-3.5 h-3.5" aria-hidden="true"></i> ${esc(t('accredited'))}</p>` : ''}
          <p class="edu-desc">${desc}</p>
          ${highlights ? `<ul class="edu-points">${highlights}</ul>` : ''}
          ${courses ? `<p class="edu-courses">${courses}</p>` : ''}
        </div>
      </article>
    `;
  }

  function initReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length && 'IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const idx = Array.from(revealEls).indexOf(el);
            setTimeout(() => el.classList.add('in'), (idx % 3) * 70);
            obs.unobserve(el);
          }
        });
      }, { threshold: 0.15 });
      revealEls.forEach((el) => obs.observe(el));
    } else {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
    }
  }

  function observeEduCards() {
    const cards = document.querySelectorAll('#edu-list .edu-reveal');
    if (!cards.length) return;
    if (!('IntersectionObserver' in window)) {
      cards.forEach((c) => c.classList.add('in'));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
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
    observeEduCards();
  }

  async function init() {
    applyTheme(State.theme);
    applyStatic();
    initReveal();
    const themeBtn = $('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', () => applyTheme(State.theme === 'light' ? 'dark' : 'light'));
    const langBtn = $('lang-toggle');
    if (langBtn) langBtn.addEventListener('click', () => {
      State.lang = State.lang === 'en' ? 'id' : 'en';
      safeSet('lang', State.lang);
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
