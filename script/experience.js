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
      title: 'Selected experiences',
      subtitle: 'Competition, development work, and practical experience — documented with context, contribution, and evidence.',
      indexLabel: 'Index',
      countSub: 'Competition · Development · Learning',
      items: 'EXPERIENCES',
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
      title: 'Pengalaman terpilih',
      subtitle: 'Lomba, pengembangan, dan pengalaman praktis — didokumentasikan dengan konteks, kontribusi, dan bukti.',
      indexLabel: 'Indeks',
      countSub: 'Kompetisi · Pengembangan · Pembelajaran',
      items: 'PENGALAMAN',
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
    // Deduplicate TYPE vs CATEGORY when they are the same value (e.g. Competition/Competition)
    const normType = typeVal ? typeVal.trim().toLowerCase() : '';
    const normCat = catLabel ? catLabel.trim().toLowerCase() : '';
    if (normType && normCat && normType === normCat) {
      // keep only one — prefer TYPE, skip CATEGORY
    } else {
      if (typeVal) items.push({ dt: t('metaType'), dd: typeVal });
      if (catLabel) items.push({ dt: t('metaCategory'), dd: catLabel });
    }
    // If they were identical and we skipped both, add back one
    if (normType && normCat && normType === normCat && typeVal) {
      items.push({ dt: t('metaType'), dd: typeVal });
    }
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

  function renderShowcase(images, title, expNum) {
    if (!images.length) {
      return `
      <figure class="exp-figure exp-figure--placeholder" aria-label="${esc(t('documentation'))}">
        <div class="exp-placeholder-inner">
          <p class="exp-placeholder-label">${esc(t('documentation'))}</p>
        </div>
      </figure>`;
    }
    const total = images.length;
    const pad = (n) => String(n).padStart(2, '0');
    const stack = images.map((img, i) => `
        <img src="${esc(img.src)}" alt="${esc(img.alt)}" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}
          class="exp-show-img${i === 0 ? ' is-active' : ''}" data-idx="${i}"
          onerror="this.style.display='none'" />`).join('');
    const nav = total > 1 ? `
        <div class="exp-show-nav" role="group" aria-label="${esc(t('documentation'))}">
          ${images.map((_, i) => `
          <button type="button" class="exp-show-btn${i === 0 ? ' is-active' : ''}" data-go="${i}"
            aria-label="${esc(t('viewDoc'))} ${pad(i + 1)} / ${pad(total)}" aria-current="${i === 0 ? 'true' : 'false'}">${pad(i + 1)}</button>`).join('')}
        </div>` : '';
    const countLabel = `${pad(1)} / ${pad(total)}`;
    return `
      <div class="exp-showcase" data-showcase="${esc(expNum)}" data-count="${total}">
        <button type="button" class="exp-show-stage" aria-label="${esc(images[0].alt)} — ${countLabel}">
          <span class="exp-show-stack">${stack}</span>
        </button>
        <div class="exp-show-meta">
          <span class="exp-show-count" aria-live="polite">${countLabel}</span>
          ${nav}
        </div>
      </div>`;
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

    const heroPhoto = renderShowcase(images, title, num);

    const aboutHtml = description ? `
      <section class="exp-about" aria-label="${esc(t('about'))}">
        <h3 class="exp-section-title">${esc(t('about'))}</h3>
        <p>${esc(description)}</p>
      </section>` : '';

    const didHtml = renderActivities(activities);
    const techHtml = tech.length ? `<p class="exp-techline"><strong>${esc(t('techLabel'))}</strong> ${tech.map((c) => `<span>${esc(c)}</span>`).join('')}</p>` : '';
    const role = getRole(item);
    const roleBlock = renderRoleBlock(role);

    const anchorId = `exp-${num}`;
    // DOM order: kicker/title/topMeta -> showcase/placeholder -> role -> about/did -> tech
    // Showcase IS the documentation (01/03 + nav). No separate gallery to avoid duplication.
    return `
      <article id="${anchorId}" class="exp-case${isCompetition} reveal has-visual">
        <div class="exp-hero">
          <div class="exp-hero-main">
            ${kicker}
            <h2 class="exp-title">${esc(title)}</h2>
            ${subtitleHtml}
            ${renderTopMeta(item)}
          </div>
          ${heroPhoto}
          ${roleBlock}
        </div>
        <div class="exp-content">
          ${aboutHtml}
          ${didHtml || '<div></div>'}
        </div>
        ${techHtml}
      </article>`;
  }

  // ---- Lightbox (reused, now with prev/next for current showcase) ----
  let lightboxEls = null;
  const LightboxState = { images: [], index: 0 };
  function initLightbox() {
    const wrap = $('exp-lightbox');
    const img = $('exp-lightbox-img');
    const cap = $('exp-lightbox-caption');
    const closeBtn = $('exp-lightbox-close');
    const prevBtn = $('exp-lightbox-prev');
    const nextBtn = $('exp-lightbox-next');
    if (!wrap || !img) return;
    lightboxEls = { wrap, img, cap, closeBtn, prevBtn, nextBtn };

    function show() {
      const cur = LightboxState.images[LightboxState.index];
      if (!cur) return;
      img.src = cur.src;
      img.alt = cur.alt || '';
      const pad = (n) => String(n).padStart(2, '0');
      const label = LightboxState.images.length > 1
        ? `${pad(LightboxState.index + 1)} / ${pad(LightboxState.images.length)} — ${cur.alt || ''}`
        : (cur.alt || '');
      if (cap) {
        if (label) { cap.textContent = label; cap.classList.remove('hidden'); }
        else cap.classList.add('hidden');
      }
      const multi = LightboxState.images.length > 1;
      if (prevBtn) prevBtn.style.display = multi ? '' : 'none';
      if (nextBtn) nextBtn.style.display = multi ? '' : 'none';
    }
    function open(images, index) {
      if (!Array.isArray(images) || !images.length) return;
      LightboxState.images = images;
      LightboxState.index = Math.max(0, Math.min(images.length - 1, index || 0));
      show();
      wrap.hidden = false;
      requestAnimationFrame(() => wrap.classList.add('open'));
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }
    function close() {
      wrap.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(() => { wrap.hidden = true; img.src = ''; img.alt = ''; LightboxState.images = []; }, 220);
    }
    function step(dir) {
      if (LightboxState.images.length < 2) return;
      const n = LightboxState.images.length;
      LightboxState.index = (LightboxState.index + dir + n) % n;
      show();
    }
    lightboxEls.open = open;
    lightboxEls.close = close;
    lightboxEls.step = step;

    closeBtn && closeBtn.addEventListener('click', close);
    prevBtn && prevBtn.addEventListener('click', (e) => { e.stopPropagation(); step(-1); });
    nextBtn && nextBtn.addEventListener('click', (e) => { e.stopPropagation(); step(1); });
    wrap.addEventListener('click', (e) => { if (e.target === wrap) close(); });
    document.addEventListener('keydown', (e) => {
      if (!wrap.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    });
  }

  // ---- Showcase: independent carousel per experience ----
  const SHOW_INTERVAL = 4500;
  const showcases = [];
  function reducedMotion() {
    try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
    catch (_) { return false; }
  }
  function showcaseGo(sc, idx) {
    const n = sc.images.length;
    if (!n) return;
    sc.current = (idx + n) % n;
    sc.imgs.forEach((im, i) => im.classList.toggle('is-active', i === sc.current));
    sc.btns.forEach((b, i) => {
      b.classList.toggle('is-active', i === sc.current);
      if (i === sc.current) b.setAttribute('aria-current', 'true');
      else b.removeAttribute('aria-current');
    });
    const pad = (v) => String(v).padStart(2, '0');
    if (sc.countEl) sc.countEl.textContent = `${pad(sc.current + 1)} / ${pad(n)}`;
    if (sc.stage) sc.stage.setAttribute('aria-label', `${sc.images[sc.current].alt} — ${pad(sc.current + 1)} / ${pad(n)}`);
  }
  function showcaseStop(sc) {
    if (sc.timer) { clearInterval(sc.timer); sc.timer = null; }
  }
  function showcaseStart(sc) {
    showcaseStop(sc);
    if (sc.images.length < 2 || reducedMotion()) return;
    if (!sc.inView || sc.hoverPaused) return;
    sc.timer = setInterval(() => showcaseGo(sc, sc.current + 1), SHOW_INTERVAL);
  }
  function initShowcases(root) {
    showcases.length = 0;
    const reduced = reducedMotion();
    // Preload to avoid white/black flash before transition
    State.data.forEach((item) => {
      const imgs = normalizeImages(item).slice(0, 3);
      imgs.forEach((im) => { const p = new Image(); p.src = im.src; });
    });
    root.querySelectorAll('.exp-showcase').forEach((el) => {
      const expNum = el.getAttribute('data-showcase');
      const idx = parseInt(expNum, 10) - 1;
      const item = State.data[idx];
      if (!item) return;
      const images = normalizeImages(item).slice(0, 3);
      if (images.length < 2) return;
      const sc = {
        root: el,
        images,
        current: 0,
        timer: null,
        inView: true,
        hoverPaused: false,
        stage: el.querySelector('.exp-show-stage'),
        imgs: Array.from(el.querySelectorAll('.exp-show-img')),
        btns: Array.from(el.querySelectorAll('.exp-show-btn')),
        countEl: el.querySelector('.exp-show-count'),
      };
      showcases.push(sc);
      sc.btns.forEach((b) => {
        b.addEventListener('click', () => {
          showcaseGo(sc, parseInt(b.getAttribute('data-go'), 10));
          showcaseStart(sc);
        });
      });
      if (sc.stage && lightboxEls) {
        sc.stage.addEventListener('click', () => lightboxEls.open(sc.images, sc.current));
      }
      el.addEventListener('mouseenter', () => { sc.hoverPaused = true; showcaseStop(sc); });
      el.addEventListener('mouseleave', () => { sc.hoverPaused = false; showcaseStart(sc); });
      // Pause when out of viewport, resume when visible
      if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
          entries.forEach((en) => {
            sc.inView = en.isIntersecting;
            if (sc.inView) showcaseStart(sc);
            else showcaseStop(sc);
          });
        }, { threshold: 0.2 });
        obs.observe(el);
      }
      if (!reduced) showcaseStart(sc);
    });
    // Single-photo stage still opens lightbox
    root.querySelectorAll('.exp-showcase[data-count="1"] .exp-show-stage').forEach((stage) => {
      const box = stage.closest('.exp-showcase');
      const expNum = box ? box.getAttribute('data-showcase') : null;
      const idx = expNum ? parseInt(expNum, 10) - 1 : -1;
      const item = idx >= 0 ? State.data[idx] : null;
      if (!item) return;
      const images = normalizeImages(item).slice(0, 3);
      stage.addEventListener('click', () => { if (lightboxEls) lightboxEls.open(images, 0); });
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

  function renderIndex() {
    const nav = $('exp-index');
    const list = $('exp-index-list');
    if (!nav || !list) return;
    if (!State.data.length) {
      nav.hidden = true;
      list.innerHTML = '';
      return;
    }
    // Show index only when it adds navigational value (>=2 items)
    if (State.data.length < 2) {
      nav.hidden = true;
      list.innerHTML = '';
      return;
    }
    nav.hidden = false;
    list.innerHTML = State.data.map((item, i) => {
      const title = getTitle(item) || '—';
      const num = String(i + 1).padStart(2, '0');
      const anchor = `exp-${num}`;
      return `
        <li class="exp-index-item">
          <a href="#${anchor}" aria-label="${esc(title)}">
            <span class="exp-index-num">${num}</span>
            <span class="exp-index-title">${esc(title)}</span>
          </a>
        </li>`;
    }).join('');
  }

  function render() {
    const list = $('exp-list');
    const loading = $('exp-loading');
    const empty = $('exp-empty');
    if (!list) return;
    if (loading) loading.style.display = 'none';
    if (!State.data.length) {
      list.innerHTML = '';
      if (empty) empty.classList.remove('hidden');
      renderIndex();
      if (typeof feather !== 'undefined') feather.replace({ 'stroke-width': 1.75 });
      return;
    }
    if (empty) empty.classList.add('hidden');
    list.innerHTML = State.data.map((item, i) => itemHTML(item, i)).join('');
    renderIndex();
    initShowcases(list);
    initReveal();
    if (typeof feather !== 'undefined') feather.replace({ 'stroke-width': 1.75 });
  }

  async function init() {
    applyTheme(State.theme);
    applyStatic();
    initReveal();
    initLightbox();
    // Index anchor offset for fixed capsule navbar
    document.addEventListener('click', (e) => {
      const a = e.target.closest('#exp-index a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: 'smooth' });
      history.pushState(null, '', `#${id}`);
    });
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
