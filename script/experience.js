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
      kicker: 'Experience',
      title: 'Experience documented as case study',
      subtitle: 'Competition, freelance, and self-directed learning — structured so HRD can see what the event was, when and where, my role, what I actually did, and the documentation.',
      noteLabel: 'How to read',
      noteText: 'Each entry: Title → Date → Location → Role → About → What I did → Documentation. No CV list, no cards.',
      items: 'items',
      empty: 'No experience data.',
      ctaTitle: 'Want to see the builds?',
      ctaDesc: 'Experience above is the context. Projects show the actual code, UI, and deployment.',
      ctaProjects: 'View projects',
      ctaContact: 'Hire me',
      backShowcase: 'Back to Portfolio',
      toDark: 'Switch to dark mode',
      toLight: 'Switch to light mode',
      about: 'About the experience',
      whatIDid: 'What I did',
      documentation: 'Documentation',
      metaEvent: 'Event',
      metaDate: 'Date',
      metaYear: 'Year',
      metaLocation: 'Location',
      metaRole: 'Role',
      metaOrganizer: 'Organizer',
      metaCategory: 'Category',
      metaType: 'Type',
      techLabel: 'Stack',
      viewDoc: 'View documentation',
      photoFallback: 'Documentation photo',
      lightboxClose: 'Close preview',
    },
    id: {
      skip: 'Lewati ke konten',
      home: 'Beranda',
      projects: 'Proyek',
      certificates: 'Sertifikat',
      education: 'Pendidikan',
      experience: 'Pengalaman',
      kicker: 'Pengalaman',
      title: 'Pengalaman sebagai studi kasus',
      subtitle: 'Lomba, freelance, dan belajar mandiri — disusun agar HRD langsung paham: acaranya apa, kapan dan di mana, peran saya, apa yang saya kerjakan, dan dokumentasinya.',
      noteLabel: 'Cara membaca',
      noteText: 'Setiap entri: Judul → Tanggal → Lokasi → Peran → Tentang → Apa yang saya kerjakan → Dokumentasi. Bukan daftar CV, tanpa kartu.',
      items: 'item',
      empty: 'Tidak ada data pengalaman.',
      ctaTitle: 'Ingin melihat hasilnya?',
      ctaDesc: 'Pengalaman di atas adalah konteksnya. Proyek menunjukkan kode, UI, dan deployment yang sebenarnya.',
      ctaProjects: 'Lihat proyek',
      ctaContact: 'Rekrut saya',
      backShowcase: 'Kembali ke Portofolio',
      toDark: 'Ganti ke mode gelap',
      toLight: 'Ganti ke mode terang',
      about: 'Tentang pengalaman',
      whatIDid: 'Apa yang saya kerjakan',
      documentation: 'Dokumentasi',
      metaEvent: 'Acara',
      metaDate: 'Tanggal',
      metaYear: 'Tahun',
      metaLocation: 'Lokasi',
      metaRole: 'Peran',
      metaOrganizer: 'Penyelenggara',
      metaCategory: 'Kategori',
      metaType: 'Tipe',
      techLabel: 'Teknologi',
      viewDoc: 'Lihat dokumentasi',
      photoFallback: 'Foto dokumentasi',
      lightboxClose: 'Tutup preview',
    },
  };

  const categoryLabels = {
    competition: { en: 'Competition', id: 'Kompetisi' },
    freelance: { en: 'Freelance', id: 'Freelance' },
    learning: { en: 'Learning', id: 'Pembelajaran' },
    project: { en: 'Project', id: 'Proyek' },
    experience: { en: 'Experience', id: 'Pengalaman' },
    education: { en: 'Education', id: 'Pendidikan' },
    internship: { en: 'Internship', id: 'Magang' },
    workshop: { en: 'Workshop', id: 'Workshop' },
  };

  const State = {
    lang: (function () { try { return localStorage.getItem('lang') || 'en'; } catch (_) { return 'en'; } })(),
    theme: (function () { try { return localStorage.getItem('theme') || 'light'; } catch (_) { return 'light'; } })(),
    data: [],
  };

  const t = (k) => (strings[State.lang] && strings[State.lang][k]) || strings.en[k] || k;
  const pick = (o) => {
    if (!o) return '';
    if (typeof o === 'string') return o;
    return o[State.lang] || o.en || Object.values(o)[0] || '';
  };
  const $ = (id) => document.getElementById(id);
  const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const safeSet = (k, v) => { try { localStorage.setItem(k, v); } catch (_) {} };

  function fixAsset(src) {
    const s = String(src || '').trim();
    if (!s) return '';
    if (/^https?:\/\//i.test(s) || s.indexOf('data:') === 0) return s;
    if (s.charAt(0) === '/' && s.indexOf('//') !== 0) return '..' + s;
    if (s.indexOf('assets/') === 0) return '../' + s;
    return s;
  }

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
    if (typeof feather !== 'undefined') feather.replace({ 'stroke-width': 1.75 });
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

  // ---- Data normalization (new schema + legacy fallback) ----
  function getTitle(item) {
    return pick(item.title) || pick(item.company) || pick(item.event) || pick(item.name) || '';
  }
  function getDateLabel(item) {
    const d = pick(item.date);
    if (d) return d;
    if (item.year) return String(item.year);
    const p = pick(item.period);
    return p || '';
  }
  function getLocation(item) {
    return item.location ? String(item.location).trim() : '';
  }
  function getOrganizer(item) {
    if (!item.organizer) return '';
    if (typeof item.organizer === 'string') return item.organizer.trim();
    return pick(item.organizer).trim();
  }
  function getRole(item) {
    return pick(item.role) || '';
  }
  function getDescription(item) {
    return pick(item.description) || '';
  }
  function getActivities(item) {
    const raw = item.activities || item.highlights || [];
    if (!Array.isArray(raw)) return [];
    return raw.map((a) => {
      if (!a) return '';
      if (typeof a === 'string') return a.trim();
      if (typeof a === 'object') {
        const txt = pick(a);
        if (txt) return txt.trim();
        if (a.title) return pick(a.title).trim();
        if (a.label) return pick(a.label).trim();
      }
      return '';
    }).filter(Boolean);
  }
  function normalizeImages(item) {
    const title = getTitle(item);
    let raw = [];
    if (Array.isArray(item.images) && item.images.length) raw = item.images;
    else if (Array.isArray(item.photos) && item.photos.length) raw = item.photos;
    else if (item.image) raw = [item.image];
    else return [];
    return raw.map((entry, idx) => {
      let src = '';
      let alt = '';
      let caption = '';
      if (typeof entry === 'string') {
        src = entry.trim();
      } else if (entry && typeof entry === 'object') {
        src = String(entry.src || entry.image || entry.url || entry.path || '').trim();
        alt = entry.alt ? pick(entry.alt) || String(entry.alt) : '';
        caption = entry.caption ? pick(entry.caption) || String(entry.caption) : '';
        if (!alt && entry.alt) alt = String(entry.alt);
        if (!caption && entry.title) caption = pick(entry.title) || String(entry.title);
      }
      if (!src) return null;
      const fallbackAlt = title ? `${t('photoFallback')} — ${title}` : t('photoFallback');
      return {
        src: fixAsset(src),
        alt: alt || fallbackAlt,
        caption: caption || '',
        idx,
      };
    }).filter(Boolean);
  }

  function topMetaItems(item) {
    const items = [];
    const dateLabel = getDateLabel(item);
    const year = item.year ? String(item.year).trim() : '';
    const location = getLocation(item);
    const organizer = getOrganizer(item);
    const cat = item.category || '';
    const typeVal = item.type ? pick(item.type) : '';
    const catLabel = cat && categoryLabels[cat] ? pick(categoryLabels[cat]) : (cat ? cat.toUpperCase() : '');

    if (dateLabel) items.push({ dt: t('metaDate'), dd: dateLabel });
    else if (year) items.push({ dt: t('metaYear'), dd: year });
    if (location) items.push({ dt: t('metaLocation'), dd: location });
    if (organizer) items.push({ dt: t('metaOrganizer'), dd: organizer });
    if (typeVal) items.push({ dt: t('metaType'), dd: typeVal });
    if (catLabel) items.push({ dt: t('metaCategory'), dd: catLabel });
    return items;
  }

  function renderTopMeta(item) {
    const rows = topMetaItems(item);
    if (!rows.length) return '';
    const single = rows.length === 1 ? ' is-single' : '';
    const html = rows.map((r) => `
      <div class="exp-meta-item">
        <dt>${esc(r.dt)}</dt>
        <dd>${esc(r.dd)}</dd>
      </div>`).join('');
    return `<dl class="exp-meta${single}">${html}</dl>`;
  }

  function renderRoleBlock(role) {
    if (!role) return '';
    return `
      <div class="exp-role-block">
        <p class="exp-role-label">${esc(t('metaRole'))}</p>
        <p class="exp-role-value">${esc(role)}</p>
      </div>`;
  }

  function renderActivities(activities) {
    if (!activities.length) return '';
    const rows = activities.map((txt, i) => {
      const num = String(i + 1).padStart(2, '0');
      return `
        <li class="exp-did-item">
          <span class="exp-did-num">${num}</span>
          <p class="exp-did-text">${esc(txt)}</p>
        </li>`;
    }).join('');
    return `
      <section class="exp-did" aria-label="${esc(t('whatIDid'))}">
        <h3 class="exp-section-title">${esc(t('whatIDid'))}</h3>
        <ol class="exp-did-list">${rows}</ol>
      </section>`;
  }

  function renderDocGallery(images) {
    if (images.length <= 1) return '';
    const rest = images.slice(1);
    const thumbs = rest.map((img) => `
      <figure class="exp-doc-thumb" tabindex="0" role="button" data-lightbox-src="${esc(img.src)}" data-lightbox-alt="${esc(img.alt)}" aria-label="${esc(img.alt)}">
        <img src="${esc(img.src)}" alt="${esc(img.alt)}" loading="lazy" onerror="this.closest('.exp-doc-thumb').style.display='none'" />
      </figure>`).join('');
    return `
      <section class="exp-doc" aria-label="${esc(t('documentation'))}">
        <h3 class="exp-section-title">${esc(t('documentation'))}</h3>
        <div class="exp-doc-grid">${thumbs}</div>
      </section>`;
  }

  function itemHTML(item, idx) {
    const title = getTitle(item) || '—';
    const subtitle = item.type ? pick(item.type) : '';
    const description = getDescription(item);
    const activities = getActivities(item);
    const images = normalizeImages(item);
    const cat = item.category || '';
    const isCompetition = cat === 'competition' ? ' is-competition' : '';
    const catLabel = cat && categoryLabels[cat] ? pick(categoryLabels[cat]) : (cat ? cat.toUpperCase() : '');
    const num = String(idx + 1).padStart(2, '0');
    const hasImages = images.length > 0;
    const tech = Array.isArray(item.tech) ? item.tech.filter(Boolean) : [];

    const kicker = catLabel
      ? `<p class="exp-kicker"><span class="exp-kicker-accent">${esc(catLabel)}</span> <i aria-hidden="true"></i> <span>${num}</span></p>`
      : `<p class="exp-kicker"><span>${num}</span></p>`;

    const subtitleHtml = subtitle ? `<p class="exp-subtitle">${esc(subtitle)}</p>` : '';

    const heroPhoto = hasImages ? `
      <figure class="exp-figure exp-hero-photo" tabindex="0" role="button" data-lightbox-src="${esc(images[0].src)}" data-lightbox-alt="${esc(images[0].alt)}" aria-label="${esc(images[0].alt)}">
        <img src="${esc(images[0].src)}" alt="${esc(images[0].alt)}" loading="lazy" onerror="this.closest('.exp-figure').style.display='none'" />
        ${images[0].caption ? `<figcaption class="exp-figure-caption"><i data-feather="image" class="w-3.5 h-3.5"></i> ${esc(images[0].caption)}</figcaption>` : `<figcaption class="exp-figure-caption"><i data-feather="image" class="w-3.5 h-3.5"></i> ${esc(t('viewDoc'))} · ${esc(title)}</figcaption>`}
      </figure>` : `
      <figure class="exp-figure exp-figure--placeholder" aria-label="${esc(t('viewDoc'))}">
        <div class="exp-placeholder-inner">
          <i data-feather="image" class="w-6 h-6" style="color:var(--color-text-muted);"></i>
          <p class="font-meta text-[11px]" style="color:var(--color-text-muted); letter-spacing:0.06em; margin-top:0.5rem;">${esc(State.lang === 'id' ? 'Dokumentasi — tambahkan foto ke images[] di experience.json' : 'Documentation — add photos to images[] in experience.json')}</p>
        </div>
      </figure>`;

    const aboutHtml = description ? `
      <section class="exp-about" aria-label="${esc(t('about'))}">
        <h3 class="exp-section-title">${esc(t('about'))}</h3>
        <p>${esc(description)}</p>
      </section>` : '';

    const didHtml = renderActivities(activities);
    const docHtml = renderDocGallery(images);
    const techHtml = tech.length ? `<p class="exp-techline"><strong>${esc(t('techLabel'))}</strong> ${tech.map((c) => `<span>${esc(c)}</span>`).join('')}</p>` : '';
    const role = getRole(item);
    const roleBlock = renderRoleBlock(role);

    // DOM order: kicker/title/topMeta -> photo -> role -> about/did -> tech -> gallery
    // This gives mobile: Title -> Date/Location -> Photo -> Role -> About -> What I Did -> Documentation
    // Desktop grid places photo on right, role stays on left column.
    return `
      <article class="exp-case${isCompetition} reveal${hasImages ? ' has-visual' : ''}">
        <div class="exp-hero">
          <div class="exp-hero-main">
            ${kicker}
            <h2 class="exp-title">${esc(title)}</h2>
            ${subtitleHtml}
            ${renderTopMeta(item)}
          </div>
          ${hasImages ? heroPhoto : ''}
          ${roleBlock}
        </div>
        <div class="exp-content">
          ${aboutHtml}
          ${didHtml || '<div></div>'}
        </div>
        ${techHtml}
        ${docHtml}
      </article>`;
  }

  // ---- Lightbox ----
  let lightboxEls = null;
  function initLightbox() {
    const wrap = $('exp-lightbox');
    const img = $('exp-lightbox-img');
    const cap = $('exp-lightbox-caption');
    const closeBtn = $('exp-lightbox-close');
    if (!wrap || !img) return;
    lightboxEls = { wrap, img, cap, closeBtn };

    function open(src, alt) {
      img.src = src;
      img.alt = alt || '';
      if (cap) {
        if (alt) { cap.textContent = alt; cap.classList.remove('hidden'); }
        else cap.classList.add('hidden');
      }
      wrap.hidden = false;
      requestAnimationFrame(() => wrap.classList.add('open'));
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }
    function close() {
      wrap.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(() => { wrap.hidden = true; img.src = ''; img.alt = ''; }, 220);
    }
    lightboxEls.open = open;
    lightboxEls.close = close;

    closeBtn && closeBtn.addEventListener('click', close);
    wrap.addEventListener('click', (e) => { if (e.target === wrap) close(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && wrap.classList.contains('open')) close();
    });
  }

  function bindLightboxTriggers(root) {
    if (!lightboxEls) return;
    root.querySelectorAll('[data-lightbox-src]').forEach((el) => {
      const activate = () => {
        const src = el.getAttribute('data-lightbox-src');
        const alt = el.getAttribute('data-lightbox-alt') || el.getAttribute('aria-label') || '';
        if (src) lightboxEls.open(src, alt);
      };
      el.addEventListener('click', activate);
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
      });
    });
  }

  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target;
            el.classList.add('in');
            obs.unobserve(el);
          }
        });
      }, { threshold: 0.12 });
      els.forEach((el) => obs.observe(el));
    } else {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
    }
  }

  function render() {
    const list = $('exp-list');
    const loading = $('exp-loading');
    const empty = $('exp-empty');
    const countEl = $('exp-count');
    if (!list) return;
    if (loading) loading.style.display = 'none';
    if (!State.data.length) {
      list.innerHTML = '';
      if (empty) empty.classList.remove('hidden');
      if (countEl) countEl.textContent = `0 ${t('items')}`;
      if (typeof feather !== 'undefined') feather.replace({ 'stroke-width': 1.75 });
      return;
    }
    if (empty) empty.classList.add('hidden');
    list.innerHTML = State.data.map((item, i) => itemHTML(item, i)).join('');
    if (countEl) countEl.textContent = `${State.data.length} ${t('items')}`;
    bindLightboxTriggers(list);
    initReveal();
    if (typeof feather !== 'undefined') feather.replace({ 'stroke-width': 1.75 });
  }

  async function init() {
    applyTheme(State.theme);
    applyStatic();
    initReveal();
    initLightbox();
    const tb = $('theme-toggle');
    if (tb) tb.addEventListener('click', () => applyTheme(State.theme === 'light' ? 'dark' : 'light'));
    const lb = $('lang-toggle');
    if (lb) lb.addEventListener('click', () => {
      State.lang = State.lang === 'en' ? 'id' : 'en';
      safeSet('lang', State.lang);
      applyStatic();
      render();
    });
    try {
      const res = await fetch('../api/experience.json');
      if (!res.ok) throw new Error(res.status);
      const json = await res.json();
      State.data = Array.isArray(json.experience) ? json.experience : [];
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
