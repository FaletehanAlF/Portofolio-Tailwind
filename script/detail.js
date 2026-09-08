/**
 * Portfolio – detail.js
 * Project Detail Page | Reads /api/project.json
 * ------------------------------------------------------------------ */

'use strict';

(function () {
  /* ================================================================
     1. STRINGS (EN / ID)
     ================================================================ */
  const strings = {
    en: {
      back: 'Back to Portfolio',
      home: 'Home',
      portfolio: 'Portfolio',
      tech: 'Technologies Used',
      demo: 'Live Demo',
      github: 'GitHub',
      other: 'Other Projects',
      explore: 'Keep Exploring',
      seeAll: 'See All',
      allProjects: 'All Projects',
      hireMe: 'Hire Me',
      info: 'Project Info',
      category: 'Category',
      year: 'Year',
      stack: 'Stack',
      status: 'Status',
      copyLink: 'Copy Live Demo link',
      copyDemo: 'Copy Live Demo link',
      copiedDemo: 'Live Demo link copied!',
      noDemo: 'Demo not available yet',
      completed: '● Completed',
      completedPlain: 'Completed',
      comingSoon: '○ Coming Soon',
      comingSoonPlain: 'Coming Soon',
      copied: 'Link copied!',
      nfTitle: 'Project Not Found',
      nfDesc: "The project you are looking for doesn't exist or has been moved.",
      loadFail: 'Failed to load project data. Please try again later.',
      toDark: 'Switch to dark mode',
      toLight: 'Switch to light mode',
    },
    id: {
      back: 'Kembali ke Portofolio',
      home: 'Beranda',
      portfolio: 'Portofolio',
      tech: 'Teknologi yang Digunakan',
      demo: 'Demo Langsung',
      github: 'GitHub',
      other: 'Proyek Lainnya',
      explore: 'Jelajahi Lagi',
      seeAll: 'Lihat Semua',
      allProjects: 'Semua Proyek',
      hireMe: 'Rekrut Saya',
      info: 'Info Proyek',
      category: 'Kategori',
      year: 'Tahun',
      stack: 'Teknologi',
      status: 'Status',
      copyLink: 'Salin tautan Demo',
      copyDemo: 'Salin tautan Demo',
      copiedDemo: 'Tautan Demo disalin!',
      noDemo: 'Demo belum tersedia',
      completed: '● Selesai',
      completedPlain: 'Selesai',
      comingSoon: '○ Segera Hadir',
      comingSoonPlain: 'Segera Hadir',
      copied: 'Tautan disalin!',
      nfTitle: 'Proyek Tidak Ditemukan',
      nfDesc: 'Proyek yang Anda cari tidak ada atau telah dipindahkan.',
      loadFail: 'Gagal memuat data proyek. Silakan coba lagi nanti.',
      toDark: 'Ganti ke mode gelap',
      toLight: 'Ganti ke mode terang',
    },
  };

  const State = {
    lang: localStorage.getItem('lang') || 'en',
    theme: localStorage.getItem('theme') || 'light',
    projects: [],
    active: null,
  };

  const t = key => strings[State.lang][key] || strings.en[key] || key;
  const pick = obj => (obj ? obj[State.lang] || obj.en || '' : '');

  const $ = id => document.getElementById(id);

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, c => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[c]));
  }

  /* ================================================================
     2. THEME SWITCHER — matahari (sun) utk terang, bulan (moon) utk gelap
     ================================================================ */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    State.theme = theme;
    localStorage.setItem('theme', theme);

    const isDark = theme === 'dark';
    const sun = $('theme-icon-light'); // matahari
    const moon = $('theme-icon-dark'); // bulan
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

  /* ================================================================
     3. RENDER
     ================================================================ */
  function renderTech(project) {
    const wrap = $('d-tech');
    const list = project.tech || [];
    if (!list.length) {
      wrap.innerHTML = `<span class="text-xs" style="color:var(--color-text-muted);">—</span>`;
      return;
    }
    wrap.innerHTML = list.map(item => `
      <span class="inline-flex items-center gap-2 text-xs font-semibold pl-1.5 pr-3 py-1.5 rounded-full"
        style="background-color:var(--color-bg-secondary); border:1px solid var(--color-border); color:var(--color-text);">
        <img src="${escapeHtml(item.icon)}" alt="${escapeHtml(item.name)}" title="${escapeHtml(item.name)}"
          class="w-6 h-6 rounded-full object-contain p-0.5" style="background:var(--color-card); border:1px solid var(--color-border);" loading="lazy" />
        ${escapeHtml(item.name)}
      </span>`).join('');
  }

  function renderRelated() {
    const others = State.projects.filter(p => p.slug !== State.active.slug).slice(0, 3);
    const section = $('d-related');
    const grid = $('d-related-grid');

    if (!others.length) {
      section.classList.add('hidden');
      return;
    }

grid.innerHTML = others.map(p => {
        const techIconsHtml = (p.tech || []).slice(0, 3).map(t =>
          `<img src="${escapeHtml(t.icon)}" alt="${escapeHtml(t.name)}" title="${escapeHtml(t.name)}" class="w-4 h-4 rounded-full object-contain" loading="lazy" />`
        ).join('');
        return `
        <a href="?project=${encodeURIComponent(p.slug)}"
          class="card overflow-hidden group flex flex-col performance">
          <div class="h-36 sm:h-40 overflow-hidden" style="background-color:var(--color-bg-secondary);">
            <img src="${escapeHtml(p.image)}" alt="${escapeHtml(pick(p.name))}"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          </div>
          <div class="p-4 flex flex-col gap-2 flex-1">
            <div class="min-w-0">
              <h3 class="text-sm font-bold mb-0.5 truncate" style="color:var(--color-text);">${escapeHtml(pick(p.name))}</h3>
              <span class="text-xs font-semibold">${escapeHtml(pick(p.category))}</span>
            </div>
            <div class="flex items-center gap-1.5">
              ${techIconsHtml}
              ${(p.tech || []).length > 3 ? `<span class="text-xs font-semibold" style="color:var(--color-text-muted);">+${p.tech.length - 3}</span>` : ''}
            </div>
            <span class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:translate-x-1 mt-auto"
              style="background-color:var(--color-bg-secondary); border:1px solid var(--color-border);">
              <i data-feather="arrow-right" class="w-4 h-4" style="color:var(--color-accent);"></i>
            </span>
          </div>
        </a>`;
      }).join('');

    section.classList.remove('hidden');
  }

  function updateShareButton() {
    const p = State.active;
    const share = $('d-share');
    if (!share || !p) return;
    const hasDemo = p.demo && p.demo !== '#';
    if (hasDemo) {
      share.disabled = false;
      share.style.opacity = '';
      share.style.cursor = '';
      share.setAttribute('aria-label', t('copyDemo'));
      share.setAttribute('title', t('copyDemo'));
    } else {
      share.disabled = true;
      share.style.opacity = '0.45';
      share.style.cursor = 'not-allowed';
      share.setAttribute('aria-label', t('noDemo'));
      share.setAttribute('title', t('noDemo'));
    }
  }

  function renderStaticLabels() {
    document.documentElement.lang = State.lang;
    const langBtn = $('lang-toggle');
    if (langBtn) langBtn.textContent = State.lang === 'en' ? 'ID' : 'EN';
    const set = (id, val) => { const el = $(id); if (el) el.textContent = val; };
    set('back-label', t('back'));
    set('d-crumb-home', t('home'));
    set('d-crumb-portfolio', t('portfolio'));
    set('d-nf-back', t('back'));
    set('d-nf-all', t('allProjects'));
    set('d-tech-label', t('tech'));
    set('d-other-label', t('other'));
    set('d-explore-label', t('explore'));
    set('d-seeall-label', t('seeAll'));
    set('d-demo-label', t('demo'));
    set('d-github-label', t('github'));
    set('d-nf-title', t('nfTitle'));
    set('d-nf-desc', t('nfDesc'));
    set('d-info-title', t('info'));
    set('d-lbl-category', t('category'));
    set('d-lbl-year', t('year'));
    set('d-lbl-stack', t('stack'));
    set('d-lbl-status', t('status'));
    set('d-all-label', t('allProjects'));
    set('d-hire-label', t('hireMe'));
    updateShareButton();
    const themeBtn = $('theme-toggle');
    if (themeBtn) {
      const label = State.theme === 'dark' ? t('toLight') : t('toDark');
      themeBtn.setAttribute('aria-label', label);
      themeBtn.setAttribute('title', label);
    }
  }

  function render() {
    const p = State.active;
    if (!p) return;

    const name = pick(p.name);
    const category = pick(p.category);
    const isSoon = !p.demo || p.demo === '#';
    document.title = `${name} | Faletehan`;
    $('d-image').src = p.image || '';
    $('d-image').alt = name;
    $('d-category').textContent = category;
    $('d-year').textContent = p.year || '';
    $('d-title').textContent = name;
    $('d-desc').textContent = pick(p.long_desc) || pick(p.short_desc);
    const crumb = $('d-breadcrumb-name');
    if (crumb) crumb.textContent = name;
    const statusEl = $('d-status');
    if (statusEl) {
      statusEl.textContent = isSoon ? t('comingSoon') : t('completed');
      statusEl.style.background = isSoon ? 'rgba(100,116,139,.92)' : 'rgba(37,99,235,.92)';
    }
    const setInfo = (id, val) => { const el = $(id); if (el) el.textContent = val; };
    setInfo('d-info-category', category || '—');
    setInfo('d-info-year', p.year || '—');
    setInfo('d-info-stack', (p.tech && p.tech.length ? p.tech.map(t => t.name).join(', ') : '—'));
    setInfo('d-info-status', isSoon ? t('comingSoonPlain') : t('completedPlain'));
    const infoStatus = $('d-info-status');
    if (infoStatus) infoStatus.style.color = isSoon ? 'var(--color-text-muted)' : '#16a34a';
    renderTech(p);

    // Links – hide when not available ("#")
    const hasDemo = p.demo && p.demo !== '#';
    const hasGithub = p.github && p.github !== '#';
    $('d-demo').href = hasDemo ? p.demo : '#';
    $('d-demo').classList.toggle('hidden', !hasDemo);
    $('d-github').href = hasGithub ? p.github : '#';
    $('d-github').classList.toggle('hidden', !hasGithub);

    renderStaticLabels();
    updateShareButton();
    // re-apply status after labels (language dependent)
    if (statusEl) statusEl.textContent = isSoon ? t('comingSoon') : t('completed');
    setInfo('d-info-status', isSoon ? t('comingSoonPlain') : t('completedPlain'));
    renderRelated();

    if (typeof feather !== 'undefined') feather.replace({ 'stroke-width': 1.75 });
  }

  function showNotFound(message) {
    $('d-loading').classList.add('hidden');
    $('d-content').classList.add('hidden');
    $('d-related').classList.add('hidden');
    if (message) $('d-nf-desc').textContent = message;
    $('d-notfound').classList.remove('hidden');
    if (typeof feather !== 'undefined') feather.replace({ 'stroke-width': 1.75 });
  }

  /* ================================================================
     4. INIT
     ================================================================ */
  async function init() {
    applyTheme(State.theme);
    renderStaticLabels();

    $('theme-icon-light').classList.toggle('hidden', State.theme === 'dark');
    $('theme-icon-dark').classList.toggle('hidden', State.theme !== 'dark');

    $('theme-toggle').addEventListener('click', () => applyTheme(State.theme === 'light' ? 'dark' : 'light'));
    $('lang-toggle').addEventListener('click', () => {
      State.lang = State.lang === 'en' ? 'id' : 'en';
      localStorage.setItem('lang', State.lang);
      render();
    });

    function ensureToast() {
      let toast = document.getElementById('copy-toast');
      if (toast) return toast;
      toast = document.createElement('div');
      toast.id = 'copy-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      toast.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%) translateY(12px);background:var(--color-text);color:var(--color-bg);font-size:0.82rem;font-weight:600;padding:0.6rem 1rem;border-radius:9999px;box-shadow:0 10px 28px rgba(0,0,0,0.18);opacity:0;pointer-events:none;transition:opacity 0.22s ease, transform 0.22s ease;z-index:99999;white-space:nowrap;';
      document.body.appendChild(toast);
      return toast;
    }
    function showToast(msg, isError) {
      const toast = ensureToast();
      toast.textContent = msg;
      toast.style.background = isError ? '#dc2626' : 'var(--color-text)';
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
      clearTimeout(showToast._t);
      showToast._t = setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(12px)';
      }, 1800);
    }
    async function copyText(text) {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
          return true;
        }
      } catch {}
      // fallback
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return ok;
      } catch { return false; }
    }

    const shareBtn = $('d-share');
    if (shareBtn) shareBtn.addEventListener('click', async () => {
      const p = State.active;
      const hasDemo = p && p.demo && p.demo !== '#';
      if (!hasDemo) {
        showToast(t('noDemo'), true);
        return;
      }
      const ok = await copyText(p.demo);
      if (ok) {
        const prevBorder = shareBtn.style.borderColor;
        shareBtn.style.borderColor = '#2563eb';
        showToast(t('copiedDemo'));
        shareBtn.setAttribute('title', t('copiedDemo'));
        setTimeout(() => {
          shareBtn.style.borderColor = prevBorder || '';
          shareBtn.setAttribute('title', t('copyDemo'));
          updateShareButton();
        }, 1500);
      } else {
        showToast(t('loadFail'), true);
      }
    });

    try {
      const res = await fetch('../api/project.json');
      if (!res.ok) throw new Error(res.status);
      const json = await res.json();
      State.projects = json.projects || [];
    } catch (err) {
      console.error('[Detail] Failed to load API:', err);
      showNotFound(t('loadFail'));
      return;
    }

    const slug = new URLSearchParams(location.search).get('project');
    State.active = State.projects.find(p => p.slug === slug) || null;

    $('d-loading').classList.add('hidden');
    $('d-notfound').classList.add('hidden');
    $('d-content').classList.add('hidden');
    $('d-related').classList.add('hidden');

    if (!State.active) {
      showNotFound();
      return;
    }

    render();
    $('d-content').classList.remove('hidden');
    if (typeof feather !== 'undefined') feather.replace({ 'stroke-width': 1.75 });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
