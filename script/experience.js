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
      subtitle: 'Competition, projects, and roles that shaped my development journey.',
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
      viewDoc: 'View documentation',
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
      subtitle: 'Lomba, proyek, dan peran yang membentuk perjalanan saya.',
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
      viewDoc: 'Lihat dokumentasi',
    },
  };

  const categoryLabels = {
    competition: { en: 'COMPETITION', id: 'KOMPETISI' },
    project: { en: 'PROJECT', id: 'PROYEK' },
    experience: { en: 'EXPERIENCE', id: 'PENGALAMAN' },
    education: { en: 'EDUCATION', id: 'PENDIDIKAN' },
    learning: { en: 'LEARNING', id: 'PEMBELAJARAN' },
    internship: { en: 'INTERNSHIP', id: 'MAGANG' },
    freelance: { en: 'FREELANCE', id: 'FREELANCE' },
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

  function renderPhoto(src, alt, isMain) {
    const wrapper = isMain ? 'exp-photo-main' : '';
    return `<div class="${wrapper}">
      <img src="${esc(src)}" alt="${esc(alt)}" loading="lazy"
        onerror="this.parentElement.style.display='none'" />
    </div>`;
  }

  function renderPhotos(item) {
    const photos = item.photos || [];
    if (!photos.length) return null;
    const main = photos[0];
    const rest = photos.slice(1);
    let html = '<div class="exp-visual">';
    html += renderPhoto(main.src, main.alt || main.caption || '', true);
    if (main.caption) html += `<p class="exp-photo-caption">${esc(main.caption)}</p>`;
    if (rest.length) {
      html += '<div class="exp-photo-thumbs">';
      rest.forEach((p) => {
        html += renderPhoto(p.src, p.alt || p.caption || '');
      });
      html += '</div>';
    }
    html += '</div>';
    return html;
  }

  function itemHTML(item, idx) {
    const company = esc(pick(item.company));
    const role = esc(pick(item.role));
    const period = esc(pick(item.period));
    const location = esc(item.location || '');
    const desc = esc(pick(item.description));
    const category = item.category || '';
    const catLabel = categoryLabels[category] ? pick(categoryLabels[category]) : '';
    const num = String(idx + 1).padStart(2, '0');
    const highlights = (item.highlights || []).map((h) => `<li class="flex gap-2.5 text-[14px] leading-6" style="color:var(--color-text);"><i data-feather="check-circle" class="w-4 h-4 mt-0.5 flex-shrink-0" style="color:var(--color-accent);"></i><span style="color:var(--color-text-muted);">${esc(pick(h))}</span></li>`).join('');
    const tech = (item.tech || []).length
      ? `<div class="exp-tech">${item.tech.map((c) => `<span>${esc(c)}</span>`).join('')}</div>`
      : '';
    const photos = renderPhotos(item);
    const hasPhotos = photos ? 'has-photos' : '';

    return `
      <li class="exp-item ${hasPhotos} reveal">
        <div class="exp-text-col">
          ${catLabel ? `<span class="exp-category">${esc(catLabel)}</span>` : ''}
          <span class="exp-num">${num}</span>
          <h3 class="exp-role">${role}</h3>
          <p class="exp-company">${company}${location ? ` <span style="color:var(--color-text-muted); font-weight:400;">- ${location}</span>` : ''}</p>
          <p class="exp-period">${period}</p>
          <p class="exp-desc">${desc}</p>
          ${highlights ? `<ul class="exp-highlights">${highlights}</ul>` : ''}
          ${tech}
        </div>
        ${photos}
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
    list.innerHTML = State.data.map((item, i) => itemHTML(item, i)).join('');
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