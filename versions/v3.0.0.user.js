// ==UserScript==
// @name         Shahvani Ultra Lite
// @namespace    local.shahvani.ultralite
// @version      3.0.0
// @description  Tap-to-load media, efficient DOM tracking, performance dashboard and configurable UI for Shahvani.
// @match        *://shahvani.com/*
// @match        *://*.shahvani.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(() => {
  'use strict';

  const VERSION = '3.0.0';
  const SETTINGS_KEY = 'shvUltraLite.settings.v3';
  const LEGACY_SETTINGS_KEY = 'shvUltraLite.settings.v2';
  const MEDIA_DELAY_MS = 60;
  const VISUAL_BATCH_MS = 160;
  const UI_UPDATE_MS = 120;

  const DEFAULT_SETTINGS = Object.freeze({
    profile: 'balanced',
    hideKnownAds: true,
    theme: 'system',
    compact: false
  });

  const PROFILE_NAMES = {
    compatible: 'سازگار',
    balanced: 'متعادل',
    ultra: 'Ultra'
  };

  const KNOWN_AD_HOSTS = [
    'doubleclick.net',
    'googlesyndication.com',
    'googleadservices.com',
    'adnxs.com',
    'taboola.com',
    'outbrain.com',
    'popads.net',
    'propellerads.com',
    'exoclick.com',
    'juicyads.com',
    'trafficjunky.net'
  ];

  function loadSettings() {
    const defaults = { ...DEFAULT_SETTINGS };

    try {
      const raw =
        localStorage.getItem(SETTINGS_KEY) ||
        localStorage.getItem(LEGACY_SETTINGS_KEY);

      if (!raw) return defaults;

      const parsed = JSON.parse(raw);

      return {
        profile: ['compatible', 'balanced', 'ultra'].includes(parsed.profile)
          ? parsed.profile
          : defaults.profile,
        hideKnownAds: typeof parsed.hideKnownAds === 'boolean'
          ? parsed.hideKnownAds
          : defaults.hideKnownAds,
        theme: ['system', 'dark', 'light'].includes(parsed.theme)
          ? parsed.theme
          : defaults.theme,
        compact: typeof parsed.compact === 'boolean'
          ? parsed.compact
          : defaults.compact
      };
    } catch (_) {
      return defaults;
    }
  }

  const state = {
    initialized: false,
    emergency: false,
    settings: loadSettings(),
    observer: null,
    longTaskObserver: null,
    longTaskSupported: false,
    longTaskCount: 0,
    cleanedEntries: 0,
    mediaEntries: new Set(),
    pendingVisualRoots: new Set(),
    pendingCardParents: new Set(),
    repeatedCards: new Set(),
    visualTimer: 0,
    cleanupTimer: 0,
    uiTimer: 0,
    lastGesture: 0,
    statusMessage: 'سبک‌ساز فعال است.',
    activeTab: 'overview',
    ui: null
  };

  const settings = state.settings;
  const videoStates = new WeakMap();
  const frameStates = new WeakMap();
  const imageStates = new WeakMap();
  const scheduledVideos = new WeakSet();
  const unsafeVideos = new WeakSet();
  const pendingRemovedRoots = new Set();

  function saveSettings() {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (_) {}
  }

  function setStatus(message) {
    state.statusMessage = message;
    scheduleUIUpdate();
  }

  function addStyle() {
    if (!document.documentElement ||
        document.getElementById('shv-ultralite-style')) return;

    const style = document.createElement('style');
    style.id = 'shv-ultralite-style';
    style.textContent = CSS;
    document.documentElement.appendChild(style);
  }

  const CSS = `
    html.shv-ultralite .shv-suspended-video,
    html.shv-ultralite .shv-suspended-frame {
      display: none !important;
    }

    html.shv-lite-effects *,
    html.shv-lite-effects *::before,
    html.shv-lite-effects *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
      scroll-behavior: auto !important;
    }

    @supports (content-visibility: auto) {
      html.shv-ultra-mode .shv-repeated-card {
        content-visibility: auto !important;
        contain-intrinsic-size: auto 380px !important;
      }
    }

    .shv-media-placeholder {
      all: initial !important;
      box-sizing: border-box !important;
      position: relative !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 9px !important;
      width: 100% !important;
      max-width: 100% !important;
      min-height: 112px !important;
      overflow: hidden !important;
      padding: 14px !important;
      border: 1px solid #64748b !important;
      border-radius: 12px !important;
      background: #202733 !important;
      color: #f8fafc !important;
      text-align: center !important;
      font: 14px/1.5 system-ui, sans-serif !important;
      direction: rtl !important;
      white-space: normal !important;
      cursor: pointer !important;
      user-select: none !important;
      box-shadow: none !important;
      z-index: 2 !important;
    }

    .shv-media-placeholder:focus-visible {
      outline: 3px solid #38bdf8 !important;
      outline-offset: 2px !important;
    }

    .shv-video-placeholder {
      aspect-ratio: 16 / 9 !important;
    }

    .shv-media-placeholder .shv-placeholder-icon {
      position: relative !important;
      z-index: 2 !important;
      color: #7dd3fc !important;
      font: 30px/1 system-ui, sans-serif !important;
    }

    .shv-media-placeholder .shv-placeholder-label {
      position: relative !important;
      z-index: 2 !important;
      color: #f8fafc !important;
      font: 14px/1.55 system-ui, sans-serif !important;
    }

    .shv-media-placeholder .shv-poster {
      position: absolute !important;
      inset: 0 !important;
      z-index: 1 !important;
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      opacity: .48 !important;
      pointer-events: none !important;
    }

    #shv-ultralite-fab,
    #shv-ultralite-panel {
      --shv-bg: #111827;
      --shv-surface: #1f2937;
      --shv-surface-2: #273449;
      --shv-text: #f3f4f6;
      --shv-muted: #aebdd0;
      --shv-border: #475569;
      --shv-accent: #38bdf8;
      --shv-accent-text: #082f49;
      color-scheme: dark;
    }

    #shv-ultralite-fab[data-theme="light"],
    #shv-ultralite-panel[data-theme="light"] {
      --shv-bg: #ffffff;
      --shv-surface: #f1f5f9;
      --shv-surface-2: #e2e8f0;
      --shv-text: #172033;
      --shv-muted: #475569;
      --shv-border: #cbd5e1;
      --shv-accent: #0284c7;
      --shv-accent-text: #ffffff;
      color-scheme: light;
    }

    #shv-ultralite-fab {
      all: initial !important;
      position: fixed !important;
      right: 10px !important;
      bottom: 12px !important;
      z-index: 2147483647 !important;
      box-sizing: border-box !important;
      max-width: calc(100vw - 20px) !important;
      padding: 9px 13px !important;
      border: 1px solid var(--shv-border) !important;
      border-radius: 24px !important;
      background: var(--shv-bg) !important;
      color: var(--shv-text) !important;
      font: 13px/1.4 system-ui, sans-serif !important;
      direction: rtl !important;
      text-align: center !important;
      box-shadow: 0 3px 14px #0005 !important;
      cursor: pointer !important;
      touch-action: manipulation !important;
    }

    #shv-ultralite-panel {
      all: initial !important;
      position: fixed !important;
      right: 10px !important;
      bottom: 58px !important;
      z-index: 2147483647 !important;
      display: block !important;
      box-sizing: border-box !important;
      width: min(360px, calc(100vw - 20px)) !important;
      max-height: min(78vh, 680px) !important;
      overflow-x: hidden !important;
      overflow-y: auto !important;
      padding: 13px !important;
      border: 1px solid var(--shv-border) !important;
      border-radius: 16px !important;
      background: var(--shv-bg) !important;
      color: var(--shv-text) !important;
      font: 13px/1.65 system-ui, sans-serif !important;
      direction: rtl !important;
      text-align: right !important;
      box-shadow: 0 8px 28px #0008 !important;
      overscroll-behavior: contain !important;
      scrollbar-width: thin !important;
    }

    #shv-ultralite-panel[hidden],
    #shv-ultralite-panel .shv-pane[hidden] {
      display: none !important;
    }

    #shv-ultralite-panel *,
    #shv-ultralite-panel *::before,
    #shv-ultralite-panel *::after {
      box-sizing: border-box !important;
      font-family: system-ui, sans-serif !important;
    }

    #shv-ultralite-panel .shv-topbar {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      gap: 8px !important;
      margin-bottom: 10px !important;
    }

    #shv-ultralite-panel .shv-brand {
      display: block !important;
      color: var(--shv-text) !important;
      font-size: 15px !important;
      font-weight: 750 !important;
      line-height: 1.4 !important;
    }

    #shv-ultralite-panel .shv-subtitle {
      display: block !important;
      margin-top: 2px !important;
      color: var(--shv-muted) !important;
      font-size: 11px !important;
    }

    #shv-ultralite-panel .shv-tabs {
      display: grid !important;
      grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      gap: 5px !important;
      margin: 10px 0 12px !important;
    }

    #shv-ultralite-panel .shv-tab {
      width: 100% !important;
      min-width: 0 !important;
      padding: 8px 4px !important;
    }

    #shv-ultralite-panel .shv-section-title {
      display: block !important;
      margin: 10px 0 6px !important;
      color: var(--shv-text) !important;
      font-weight: 700 !important;
      font-size: 12px !important;
    }

    #shv-ultralite-panel .shv-desc {
      display: block !important;
      margin: 6px 0 9px !important;
      color: var(--shv-muted) !important;
      font-size: 12px !important;
      line-height: 1.7 !important;
    }

    #shv-ultralite-panel .shv-button-row {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 6px !important;
      margin: 7px 0 !important;
    }

    #shv-ultralite-panel button {
      all: initial !important;
      box-sizing: border-box !important;
      display: inline-block !important;
      max-width: 100% !important;
      padding: 8px 10px !important;
      border: 1px solid var(--shv-border) !important;
      border-radius: 9px !important;
      background: var(--shv-surface) !important;
      color: var(--shv-text) !important;
      font: 12px/1.5 system-ui, sans-serif !important;
      text-align: center !important;
      direction: rtl !important;
      cursor: pointer !important;
      white-space: normal !important;
      touch-action: manipulation !important;
    }

    #shv-ultralite-panel button[aria-pressed="true"] {
      border-color: var(--shv-accent) !important;
      background: var(--shv-surface-2) !important;
      box-shadow: inset 0 0 0 1px var(--shv-accent) !important;
    }

    #shv-ultralite-panel button:focus-visible {
      outline: 2px solid var(--shv-accent) !important;
      outline-offset: 2px !important;
    }

    #shv-ultralite-panel .shv-primary {
      border-color: var(--shv-accent) !important;
      background: var(--shv-accent) !important;
      color: var(--shv-accent-text) !important;
      font-weight: 650 !important;
    }

    #shv-ultralite-panel .shv-stat-grid {
      display: grid !important;
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      gap: 7px !important;
      margin: 8px 0 !important;
    }

    #shv-ultralite-panel .shv-stat-card {
      display: block !important;
      min-width: 0 !important;
      padding: 9px !important;
      border: 1px solid var(--shv-border) !important;
      border-radius: 10px !important;
      background: var(--shv-surface) !important;
    }

    #shv-ultralite-panel .shv-stat-label {
      display: block !important;
      color: var(--shv-muted) !important;
      font-size: 11px !important;
      line-height: 1.5 !important;
    }

    #shv-ultralite-panel .shv-stat-value {
      display: block !important;
      margin-top: 3px !important;
      color: var(--shv-text) !important;
      font-size: 20px !important;
      font-weight: 750 !important;
      line-height: 1.25 !important;
      font-variant-numeric: tabular-nums !important;
    }

    #shv-ultralite-panel .shv-detail-stat {
      display: block !important;
      margin: 8px 0 !important;
      padding: 8px 10px !important;
      border: 1px solid var(--shv-border) !important;
      border-radius: 10px !important;
      background: var(--shv-surface) !important;
      color: var(--shv-muted) !important;
      font-size: 11px !important;
      line-height: 1.85 !important;
      white-space: pre-line !important;
      overflow-wrap: anywhere !important;
    }

    #shv-ultralite-panel .shv-status {
      display: block !important;
      margin-top: 10px !important;
      padding: 8px 10px !important;
      border: 1px solid var(--shv-border) !important;
      border-radius: 9px !important;
      background: var(--shv-surface) !important;
      color: var(--shv-muted) !important;
      font-size: 11px !important;
      line-height: 1.7 !important;
      overflow-wrap: anywhere !important;
    }

    #shv-ultralite-panel .shv-separator {
      display: block !important;
      height: 1px !important;
      margin: 12px 0 !important;
      background: var(--shv-border) !important;
    }

    #shv-ultralite-panel.shv-compact {
      padding: 9px !important;
      max-height: min(70vh, 560px) !important;
    }

    #shv-ultralite-panel.shv-compact .shv-desc,
    #shv-ultralite-panel.shv-compact .shv-subtitle {
      display: none !important;
    }

    #shv-ultralite-panel.shv-compact .shv-separator {
      margin: 7px 0 !important;
    }

    #shv-ultralite-fab:focus-visible {
      outline: 2px solid #38bdf8 !important;
      outline-offset: 2px !important;
    }
  `;

  function resolvedTheme() {
    if (settings.theme === 'dark' || settings.theme === 'light') return settings.theme;

    try {
      return window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark';
    } catch (_) {
      return 'dark';
    }
  }

  function applyTheme() {
    const theme = resolvedTheme();

    for (const el of [state.ui && state.ui.fab, state.ui && state.ui.panel]) {
      if (el) el.setAttribute('data-theme', theme);
    }

    if (state.ui && state.ui.themeButtons) {
      for (const choice of ['system', 'dark', 'light']) {
        const button = state.ui.themeButtons[choice];
        if (button) button.setAttribute('aria-pressed', String(settings.theme === choice));
      }
    }
  }

  function applyCompactMode() {
    if (!state.ui || !state.ui.panel) return;

    state.ui.panel.classList.toggle('shv-compact', settings.compact);

    if (state.ui.compactButton) {
      state.ui.compactButton.textContent = settings.compact
        ? 'نمای فشرده: روشن'
        : 'نمای فشرده: خاموش';
      state.ui.compactButton.setAttribute('aria-pressed', String(settings.compact));
    }
  }

  function clearRepeatedCards(root) {
    if (root && root.querySelectorAll) {
      if (root instanceof Element && root.classList.contains('shv-repeated-card')) {
        root.classList.remove('shv-repeated-card');
        state.repeatedCards.delete(root);
      }

      root.querySelectorAll('.shv-repeated-card').forEach(el => {
        el.classList.remove('shv-repeated-card');
        state.repeatedCards.delete(el);
      });
      return;
    }

    for (const el of state.repeatedCards) {
      if (el && el.isConnected) el.classList.remove('shv-repeated-card');
    }
    state.repeatedCards.clear();
  }

  function optimizeImage(img) {
    if (!(img instanceof HTMLImageElement) || settings.profile === 'compatible') return;

    if (!imageStates.has(img)) {
      imageStates.set(img, {
        loading: img.getAttribute('loading'),
        fetchpriority: img.getAttribute('fetchpriority')
      });
    }

    if (isOnScreen(img)) return;

    img.setAttribute('loading', 'lazy');

    try {
      img.setAttribute('fetchpriority', 'low');
    } catch (_) {}
  }

  function restoreImage(img) {
    const original = imageStates.get(img);
    if (!original) return;

    setOrRemoveAttribute(img, 'loading', original.loading);
    setOrRemoveAttribute(img, 'fetchpriority', original.fetchpriority);
    imageStates.delete(img);
  }

  function optimizeAllImages() {
    if (!document.images) return;
    for (const img of document.images) optimizeImage(img);
  }

  function restoreAllImages() {
    if (!document.images) return;
    for (const img of document.images) restoreImage(img);
  }

  function cardSignature(el) {
    const classes = typeof el.className === 'string'
      ? el.className.trim().split(/\s+/).filter(Boolean).sort().slice(0, 5).join('.')
      : '';
    return el.tagName + '|' + classes;
  }

  function optimizeRepeatedCards(root) {
    if (settings.profile !== 'ultra' || !root || !root.querySelectorAll) return;

    const selectors = 'main, section, article, ul, ol, [role="list"], [role="feed"]';
    const candidates = [];

    if (root instanceof Element && root.matches(selectors)) candidates.push(root);
    candidates.push(...root.querySelectorAll(selectors));

    for (const parent of candidates) {
      if (
        !parent.isConnected ||
        parent.closest('#shv-ultralite-panel') ||
        parent.children.length < 10
      ) continue;

      const counts = new Map();
      for (const child of parent.children) {
        const key = cardSignature(child);
        counts.set(key, (counts.get(key) || 0) + 1);
      }

      let bestKey = '';
      let bestCount = 0;
      for (const [key, count] of counts) {
        if (count > bestCount) {
          bestKey = key;
          bestCount = count;
        }
      }

      if (!bestKey || bestCount < 7 || bestCount / parent.children.length < 0.72) continue;

      for (const child of parent.children) {
        if (
          cardSignature(child) === bestKey &&
          !child.matches('nav, header, footer, form, button, input, video, iframe')
        ) {
          child.classList.add('shv-repeated-card');
          state.repeatedCards.add(child);
        }
      }
    }
  }

  function applyProfile() {
    const root = document.documentElement;
    if (!root) return;

    root.classList.add('shv-ultralite');
    root.classList.toggle('shv-lite-effects', settings.profile !== 'compatible');
    root.classList.toggle('shv-ultra-mode', settings.profile === 'ultra');

    if (settings.profile === 'compatible') {
      restoreAllImages();
      clearRepeatedCards();
    } else {
      optimizeAllImages();
      if (settings.profile === 'ultra') optimizeRepeatedCards(document);
      else clearRepeatedCards();
    }

    if (state.ui && state.ui.profileButtons) {
      for (const profile of Object.keys(state.ui.profileButtons)) {
        state.ui.profileButtons[profile].setAttribute(
          'aria-pressed',
          String(settings.profile === profile)
        );
      }
    }

    applyTheme();
    applyCompactMode();
    scheduleUIUpdate();
  }

  function setProfile(profile) {
    if (!['compatible', 'balanced', 'ultra'].includes(profile)) return;
    settings.profile = profile;
    saveSettings();
    applyProfile();
    setStatus('پروفایل فعال: ' + PROFILE_NAMES[profile]);
  }

  function setOrRemoveAttribute(el, name, value) {
    if (value === null || value === undefined) el.removeAttribute(name);
    else el.setAttribute(name, value);
  }

  function getURL(raw) {
    try {
      return new URL(raw, document.baseURI);
    } catch (_) {
      return null;
    }
  }

  function isUsableURL(raw) {
    if (typeof raw !== 'string' || !raw.trim()) return false;
    const value = raw.trim();
    return !/^about:blank(?:#.*)?$/i.test(value) && !/^javascript:/i.test(value);
  }

  function isBlobURL(raw) {
    return typeof raw === 'string' && /^blob:/i.test(raw.trim());
  }

  function isKnownAdURL(raw) {
    if (!isUsableURL(raw)) return false;
    const url = getURL(raw);
    if (!url) return false;
    const host = url.hostname.toLowerCase();
    return KNOWN_AD_HOSTS.some(domain => host === domain || host.endsWith('.' + domain));
  }

  function isOnScreen(el) {
    if (!el || !el.isConnected) return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 &&
      rect.bottom > 0 && rect.top < window.innerHeight &&
      rect.right > 0 && rect.left < window.innerWidth;
  }

  function isFullyOffScreen(el) {
    if (!el || !el.isConnected) return false;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return false;
    return rect.bottom <= 0 || rect.top >= window.innerHeight ||
      rect.right <= 0 || rect.left >= window.innerWidth;
  }

  function safePause(video) {
    try { video.pause(); } catch (_) {}
  }

  // ------------------------------------------------------------
  // Media placeholders
  // ------------------------------------------------------------

  function refreshPlaceholderText(entry, button) {
    if (!button) return;
    const label = button.querySelector('.shv-placeholder-label');
    if (!label) return;

    if (state.emergency) {
      label.textContent = 'حالت اضطراری روشن است؛ برای فعال‌سازی، ابتدا این حالت را خاموش کن.';
    } else if (entry.kind === 'video') {
      label.textContent = entry.released
        ? 'منابع پلیر آزاد شده‌اند؛ برای بارگذاری دوباره لمس کن.'
        : 'برای بارگذاری و پخش ویدئو لمس کن.';
    } else if (entry.isKnownAd && settings.hideKnownAds) {
      label.textContent = 'کادر تبلیغاتی شناخته‌شده فیلتر شده؛ برای بارگذاری، فیلتر را خاموش کن.';
    } else {
      label.textContent = entry.title
        ? 'برای بارگذاری این کادر (' + entry.title.slice(0, 60) + ') لمس کن.'
        : 'برای بارگذاری پلیر یا کادر جاسازی‌شده لمس کن.';
    }
  }

  function refreshPlaceholder(entry) {
    if (entry && entry.placeholder && entry.placeholder.isConnected) {
      refreshPlaceholderText(entry, entry.placeholder);
    }
  }

  function makePlaceholder(entry) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'shv-media-placeholder shv-' + entry.kind + '-placeholder';
    button.setAttribute('data-shv-placeholder', entry.kind);
    button.setAttribute('aria-label', entry.kind === 'video'
      ? 'بارگذاری ویدئو'
      : 'بارگذاری کادر جاسازی‌شده');

    const ratio = Number.isFinite(entry.aspectRatio) ? entry.aspectRatio : 16 / 9;
    button.style.aspectRatio = String(ratio);
    button.style.minHeight = Math.max(112, Math.min(280, entry.height || 112)) + 'px';

    const icon = document.createElement('span');
    icon.className = 'shv-placeholder-icon';
    icon.textContent = entry.kind === 'video' ? '▶' : '↗';

    const label = document.createElement('span');
    label.className = 'shv-placeholder-label';

    button.append(icon, label);

    if (entry.kind === 'video' && entry.poster && isUsableURL(entry.poster)) {
      const poster = document.createElement('img');
      poster.className = 'shv-poster';
      poster.alt = '';
      poster.loading = 'lazy';
      poster.decoding = 'async';
      poster.src = entry.poster;
      button.prepend(poster);
    }

    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();

      if (state.emergency) {
        setStatus('حالت اضطراری روشن است؛ برای فعال‌سازی پلیر ابتدا آن را خاموش کن.');
        refreshPlaceholder(entry);
        return;
      }

      if (entry.loaded) return;

      if (entry.kind === 'frame' && entry.isKnownAd && settings.hideKnownAds) {
        setStatus('این کادر به‌عنوان تبلیغات شناخته‌شده فیلتر شده است. فیلتر را از تنظیمات رسانه خاموش کن.');
        refreshPlaceholder(entry);
        return;
      }

      if (entry.kind === 'video') activateVideo(entry, true);
      else activateFrame(entry);
    });

    refreshPlaceholderText(entry, button);
    return button;
  }

  function insertPlaceholder(entry) {
    if (!entry.element || !entry.element.parentNode) return;
    if (entry.placeholder && entry.placeholder.isConnected) return;
    entry.placeholder = makePlaceholder(entry);
    entry.element.parentNode.insertBefore(entry.placeholder, entry.element);
  }

  // ------------------------------------------------------------
  // HTML video handling
  // ------------------------------------------------------------

  function getVideoSources(video) {
    return Array.from(video.querySelectorAll('source')).map(node => ({
      node,
      src: node.getAttribute('src')
    }));
  }

  function hasBlobOrMediaStream(video, sources) {
    if (video.srcObject || isBlobURL(video.currentSrc) || isBlobURL(video.getAttribute('src'))) {
      return true;
    }
    return sources.some(item => isBlobURL(item.src));
  }

  function hasUsableVideoSource(video) {
    if (isUsableURL(video.getAttribute('src'))) return true;
    return Array.from(video.querySelectorAll('source')).some(source =>
      isUsableURL(source.getAttribute('src'))
    );
  }

  function videoGeometry(video) {
    const rect = video.getBoundingClientRect();
    let ratio = 16 / 9;

    if (video.videoWidth > 0 && video.videoHeight > 0) {
      ratio = video.videoWidth / video.videoHeight;
    } else {
      const width = Number(video.getAttribute('width'));
      const height = Number(video.getAttribute('height'));
      if (width > 0 && height > 0) ratio = width / height;
      else if (rect.width > 0 && rect.height > 0) ratio = rect.width / rect.height;
    }

    if (!Number.isFinite(ratio) || ratio < 0.4 || ratio > 3.5) ratio = 16 / 9;

    return {
      aspectRatio: ratio,
      height: rect.height > 0 ? rect.height : 112,
      poster: video.getAttribute('poster')
    };
  }

  function deferVideo(video) {
    if (!(video instanceof HTMLVideoElement) || videoStates.has(video) || unsafeVideos.has(video)) return;

    video.removeAttribute('autoplay');
    video.preload = 'none';
    safePause(video);

    if (scheduledVideos.has(video)) return;
    scheduledVideos.add(video);

    window.setTimeout(() => {
      scheduledVideos.delete(video);
      if (!video.isConnected || videoStates.has(video) || unsafeVideos.has(video)) return;

      const sources = getVideoSources(video);
      if (hasBlobOrMediaStream(video, sources)) {
        unsafeVideos.add(video);
        video.removeAttribute('autoplay');
        video.preload = 'none';
        safePause(video);
        return;
      }

      if (!hasUsableVideoSource(video)) return;

      const entry = {
        kind: 'video',
        element: video,
        loaded: false,
        released: false,
        placeholder: null,
        videoSrc: video.getAttribute('src'),
        sources,
        originalPreload: video.getAttribute('preload'),
        resumeTime: 0,
        ...videoGeometry(video)
      };

      videoStates.set(video, entry);
      state.mediaEntries.add(entry);
      video.classList.add('shv-suspended-video');
      insertPlaceholder(entry);
      detachVideoSources(entry);
      scheduleUIUpdate();
    }, MEDIA_DELAY_MS);
  }

  function detachVideoSources(entry) {
    const video = entry.element;
    if (!video) return;

    safePause(video);

    if (video.getAttribute('src') !== null) {
      entry.videoSrc = video.getAttribute('src');
      video.removeAttribute('src');
    }

    for (const item of entry.sources) {
      if (item.node && item.node.hasAttribute('src')) {
        item.src = item.node.getAttribute('src');
        item.node.removeAttribute('src');
      }
    }

    video.removeAttribute('autoplay');
    video.preload = 'none';
    try { video.load(); } catch (_) {}
  }

  function restoreVideoSources(entry) {
    const video = entry.element;
    if (!video) return;

    if (video.getAttribute('src') === null && entry.videoSrc !== null) {
      video.setAttribute('src', entry.videoSrc);
    }

    for (const item of entry.sources) {
      if (
        item.node && item.node.isConnected && item.src !== null &&
        item.node.getAttribute('src') === null
      ) {
        item.node.setAttribute('src', item.src);
      }
    }

    video.removeAttribute('autoplay');
    video.preload = 'metadata';
  }

  function activateVideo(entry, playNow) {
    const video = entry.element;
    if (!video || entry.loaded) return;

    if (state.emergency) {
      setStatus('حالت اضطراری روشن است؛ برای فعال‌سازی پلیر ابتدا آن را خاموش کن.');
      return;
    }

    entry.loaded = true;
    entry.released = false;

    if (entry.placeholder && entry.placeholder.isConnected) entry.placeholder.remove();
    entry.placeholder = null;
    video.classList.remove('shv-suspended-video');

    restoreVideoSources(entry);

    const resumeTime = entry.resumeTime;
    entry.resumeTime = 0;

    if (resumeTime > 0) {
      const restorePosition = () => {
        try {
          if (Number.isFinite(video.duration)) {
            video.currentTime = Math.min(resumeTime, Math.max(0, video.duration - 0.5));
          }
        } catch (_) {}
      };
      video.addEventListener('loadedmetadata', restorePosition, { once: true });
    }

    try { video.load(); } catch (_) {}

    if (playNow) {
      video.dataset.shvAllowedPlayUntil = String(Date.now() + 5000);
      try {
        const result = video.play();
        if (result && typeof result.catch === 'function') {
          result.catch(() => setStatus('منبع ویدئو بارگذاری شد؛ در صورت نیاز دکمهٔ پخش خود پلیر را لمس کن.'));
        }
      } catch (_) {
        setStatus('منبع ویدئو بارگذاری شد؛ در صورت نیاز دکمهٔ پخش خود پلیر را لمس کن.');
      }
    }

    setStatus('ویدئو فعال شد.');
    scheduleUIUpdate();
  }

  function handleSourceElement(source) {
    if (!(source instanceof HTMLSourceElement)) return;
    const video = source.closest('video');
    if (!video) return;

    const entry = videoStates.get(video);
    if (!entry) {
      if (source.hasAttribute('src')) deferVideo(video);
      return;
    }

    if (entry.loaded || !source.hasAttribute('src')) return;

    const src = source.getAttribute('src');
    if (isBlobURL(src)) {
      unsafeVideos.add(video);
      activateVideo(entry, false);
      return;
    }

    const saved = entry.sources.find(item => item.node === source);
    if (saved) saved.src = src;
    else entry.sources.push({ node: source, src });
    source.removeAttribute('src');
  }

  // ------------------------------------------------------------
  // Iframe handling
  // ------------------------------------------------------------

  function frameDescriptor(frame) {
    const originalSrc = frame.getAttribute('src');
    const srcdocPresent = frame.hasAttribute('srcdoc');
    const srcdoc = srcdocPresent ? frame.getAttribute('srcdoc') : null;

    if (srcdocPresent) {
      return {
        src: isUsableURL(originalSrc) ? originalSrc : null,
        originalSrc,
        srcdoc,
        srcdocPresent,
        sourceAttr: 'srcdoc'
      };
    }

    if (isUsableURL(originalSrc)) {
      return { src: originalSrc, originalSrc, srcdoc: null, srcdocPresent: false, sourceAttr: 'src' };
    }

    for (const attr of ['data-src', 'data-lazy-src']) {
      const value = frame.getAttribute(attr);
      if (isUsableURL(value)) {
        return { src: value, originalSrc, srcdoc: null, srcdocPresent: false, sourceAttr: attr };
      }
    }

    return null;
  }

  function frameGeometry(frame) {
    const rect = frame.getBoundingClientRect();
    let ratio = rect.width > 0 && rect.height > 0 ? rect.width / rect.height : 16 / 9;
    if (!Number.isFinite(ratio) || ratio < 0.4 || ratio > 3.5) ratio = 16 / 9;
    return { aspectRatio: ratio, height: rect.height > 0 ? rect.height : 112 };
  }

  function deferFrame(frame) {
    if (!(frame instanceof HTMLIFrameElement) || frameStates.has(frame)) return;

    const descriptor = frameDescriptor(frame);
    if (!descriptor) return;

    const entry = {
      kind: 'frame',
      element: frame,
      loaded: false,
      released: false,
      placeholder: null,
      src: descriptor.src,
      originalSrc: descriptor.originalSrc,
      srcdoc: descriptor.srcdoc,
      srcdocPresent: descriptor.srcdocPresent,
      sourceAttr: descriptor.sourceAttr,
      title: (frame.getAttribute('title') || '').trim(),
      isKnownAd: isKnownAdURL(descriptor.src),
      originalLoading: frame.getAttribute('loading'),
      ...frameGeometry(frame)
    };

    frameStates.set(frame, entry);
    state.mediaEntries.add(entry);
    frame.classList.add('shv-suspended-frame');
    insertPlaceholder(entry);

    frame.removeAttribute('srcdoc');
    if (frame.hasAttribute('src')) frame.removeAttribute('src');
    frame.loading = 'lazy';

    scheduleUIUpdate();
  }

  function activateFrame(entry) {
    const frame = entry.element;
    if (!frame || entry.loaded) return;

    if (state.emergency) {
      setStatus('حالت اضطراری روشن است؛ برای فعال‌سازی پلیر ابتدا آن را خاموش کن.');
      return;
    }

    if (entry.isKnownAd && settings.hideKnownAds) {
      setStatus('این کادر به‌عنوان تبلیغات شناخته‌شده فیلتر شده است. فیلتر را از تنظیمات رسانه خاموش کن.');
      return;
    }

    entry.loaded = true;
    entry.released = false;

    if (entry.placeholder && entry.placeholder.isConnected) entry.placeholder.remove();
    entry.placeholder = null;
    frame.classList.remove('shv-suspended-frame');
    frame.loading = 'eager';

    if (entry.srcdocPresent) {
      if (entry.srcdoc !== null) frame.setAttribute('srcdoc', entry.srcdoc);
      if (entry.originalSrc !== null) frame.setAttribute('src', entry.originalSrc);
    } else if (entry.src) {
      frame.setAttribute('src', entry.src);
    }

    setStatus('کادر جاسازی‌شده فعال شد.');
    scheduleUIUpdate();
  }

  function deferLoadedFrame(entry) {
    const frame = entry.element;
    if (!frame || !frame.isConnected || !entry.loaded) return;

    const currentSrc = frame.getAttribute('src');
    if (isUsableURL(currentSrc)) entry.src = currentSrc;

    if (frame.hasAttribute('srcdoc')) {
      entry.srcdocPresent = true;
      entry.srcdoc = frame.getAttribute('srcdoc');
    }

    entry.loaded = false;
    entry.released = true;
    frame.classList.add('shv-suspended-frame');
    insertPlaceholder(entry);
    frame.removeAttribute('srcdoc');
    if (frame.hasAttribute('src')) frame.removeAttribute('src');
    frame.loading = 'lazy';
  }

  // ------------------------------------------------------------
  // Resource release
  // ------------------------------------------------------------

  function snapshotVideoSources(entry) {
    const video = entry.element;
    if (!video || video.srcObject || isBlobURL(video.currentSrc) || isBlobURL(video.getAttribute('src'))) {
      return false;
    }

    const sourceNodes = Array.from(video.querySelectorAll('source'));
    if (sourceNodes.some(node => isBlobURL(node.getAttribute('src')))) return false;

    const direct = video.getAttribute('src');
    if (isUsableURL(direct)) entry.videoSrc = direct;

    for (const node of sourceNodes) {
      const src = node.getAttribute('src');
      if (!isUsableURL(src)) continue;
      const old = entry.sources.find(item => item.node === node);
      if (old) old.src = src;
      else entry.sources.push({ node, src });
    }

    return isUsableURL(entry.videoSrc) || entry.sources.some(item => isUsableURL(item.src));
  }

  function releaseVideoEntry(entry) {
    const video = entry.element;
    if (!video || !entry.loaded || !video.paused || video.ended || !snapshotVideoSources(entry)) {
      return false;
    }

    try {
      entry.resumeTime = Number.isFinite(video.currentTime) ? video.currentTime : 0;
    } catch (_) {
      entry.resumeTime = 0;
    }

    entry.loaded = false;
    entry.released = true;
    video.classList.add('shv-suspended-video');
    insertPlaceholder(entry);
    detachVideoSources(entry);
    return true;
  }

  function releaseFrameEntry(entry) {
    const frame = entry.element;
    if (!entry.loaded || !frame || !isFullyOffScreen(frame)) return false;

    const currentSrc = frame.getAttribute('src');
    if (isUsableURL(currentSrc)) entry.src = currentSrc;

    if (frame.hasAttribute('srcdoc')) {
      entry.srcdocPresent = true;
      entry.srcdoc = frame.getAttribute('srcdoc');
    }

    entry.loaded = false;
    entry.released = true;
    frame.classList.add('shv-suspended-frame');
    insertPlaceholder(entry);
    frame.removeAttribute('srcdoc');
    if (frame.hasAttribute('src')) frame.removeAttribute('src');
    frame.loading = 'lazy';
    return true;
  }

  function releaseInactiveMedia() {
    const candidates = [];

    for (const entry of state.mediaEntries) {
      if (!entry.loaded || !entry.element || !entry.element.isConnected) continue;

      if (entry.kind === 'video') {
        if (entry.element.paused && !entry.element.ended) candidates.push(entry);
      } else if (entry.kind === 'frame' && isFullyOffScreen(entry.element)) {
        candidates.push(entry);
      }
    }

    if (!candidates.length) {
      setStatus('موردی برای آزادسازی پیدا نشد. ویدئوهای در حال پخش و کادرهای قابل‌مشاهده دست‌نخورده می‌مانند.');
      return;
    }

    const videoCount = candidates.filter(entry => entry.kind === 'video').length;
    const frameCount = candidates.filter(entry => entry.kind === 'frame').length;

    let confirmed = false;
    try {
      confirmed = window.confirm(
        'آزادسازی دستی منابع غیرفعال؟\n\n' +
        'ویدئوهای مکث‌شده: ' + videoCount + '\n' +
        'کادرهای کاملاً خارج از صفحه: ' + frameCount + '\n\n' +
        'بعضی پلیرهای اختصاصی ممکن است هنگام بارگذاری دوباره وضعیت قبلی را بازیابی نکنند.'
      );
    } catch (_) {}
    if (!confirmed) return;

    let videosReleased = 0;
    let framesReleased = 0;

    for (const entry of candidates) {
      if (entry.kind === 'video' && releaseVideoEntry(entry)) videosReleased++;
      else if (entry.kind === 'frame' && releaseFrameEntry(entry)) framesReleased++;
    }

    setStatus('آزادسازی انجام شد؛ ویدئوها: ' + videosReleased + '، کادرهای خارج از صفحه: ' + framesReleased + '.');
    scheduleUIUpdate();
  }

  // ------------------------------------------------------------
  // Controls
  // ------------------------------------------------------------

  function toggleKnownAds() {
    const previous = settings.hideKnownAds;
    settings.hideKnownAds = !previous;
    saveSettings();

    if (!previous && settings.hideKnownAds) {
      for (const entry of state.mediaEntries) {
        if (entry.kind === 'frame' && entry.isKnownAd && entry.loaded) {
          deferLoadedFrame(entry);
        }
      }
    }

    for (const entry of state.mediaEntries) refreshPlaceholder(entry);

    setStatus(
      settings.hideKnownAds
        ? 'فیلتر کادرهای تبلیغاتی شناخته‌شده روشن شد.'
        : 'فیلتر کادرهای تبلیغاتی شناخته‌شده خاموش شد.'
    );
  }

  function pauseAllVideos() {
    let count = 0;
    document.querySelectorAll('video').forEach(video => {
      if (!video.paused) {
        safePause(video);
        count++;
      }
    });

    setStatus('تعداد ویدئوهای HTML مکث‌شده: ' + count + '. کنترل پخش داخل iframeهای خارجی تضمین‌شده نیست.');
  }

  function toggleEmergency() {
    state.emergency = !state.emergency;

    if (state.emergency) {
      pauseAllVideos();
      for (const entry of state.mediaEntries) refreshPlaceholder(entry);
      setStatus('حالت اضطراری روشن است؛ فعال‌سازی پلیرهای معوق مسدود شد.');
    } else {
      for (const entry of state.mediaEntries) refreshPlaceholder(entry);
      setStatus('حالت اضطراری خاموش شد؛ پلیرها با لمس قابل‌فعال‌سازی هستند.');
    }

    scheduleUIUpdate();
  }

  function resetSettings() {
    let confirmed = false;

    try {
      confirmed = window.confirm(
        'تنظیمات سبک‌ساز به حالت پیش‌فرض برگردند؟\n\n' +
        'پروفایل: متعادل\n' +
        'فیلتر تبلیغات شناخته‌شده: روشن\n' +
        'ظاهر: پیروی از سیستم\n' +
        'نمای فشرده: خاموش'
      );
    } catch (_) {}

    if (!confirmed) return;

    const previousAdFilter = settings.hideKnownAds;
    settings.profile = DEFAULT_SETTINGS.profile;
    settings.hideKnownAds = DEFAULT_SETTINGS.hideKnownAds;
    settings.theme = DEFAULT_SETTINGS.theme;
    settings.compact = DEFAULT_SETTINGS.compact;

    saveSettings();
    applyProfile();
    applyTheme();
    applyCompactMode();

    if (!previousAdFilter && settings.hideKnownAds) {
      for (const entry of state.mediaEntries) {
        if (entry.kind === 'frame' && entry.isKnownAd && entry.loaded) {
          deferLoadedFrame(entry);
        }
      }
    }

    setStatus('تنظیمات پیش‌فرض بازیابی شد. برای بازگشت کامل به رفتار سایت، اسکریپت را خاموش و صفحه را Reload کن.');
  }

  // ------------------------------------------------------------
  // DOM tracking and cleanup
  // ------------------------------------------------------------

  function forgetEntry(entry) {
    state.mediaEntries.delete(entry);
    state.cleanedEntries++;

    if (entry.kind === 'video') videoStates.delete(entry.element);
    else frameStates.delete(entry.element);

    if (entry.placeholder && entry.placeholder.isConnected) entry.placeholder.remove();

    if (entry.element && entry.element.classList) {
      entry.element.classList.remove('shv-suspended-video', 'shv-suspended-frame');
    }

    entry.placeholder = null;
    entry.element = null;
    if (entry.sources) entry.sources.length = 0;
  }

  function cleanupDetachedTree(root) {
    if (!(root instanceof Element) || root.isConnected) return;

    const nodes = [];
    if (root.matches('video, iframe, source, .shv-repeated-card')) nodes.push(root);
    if (root.querySelectorAll) {
      nodes.push(...root.querySelectorAll('video, iframe, source, .shv-repeated-card'));
    }

    const removedMedia = new Set();

    for (const node of nodes) {
      if (node.isConnected) continue;

      if (node instanceof HTMLVideoElement) {
        const entry = videoStates.get(node);
        if (entry) removedMedia.add(entry);
        unsafeVideos.delete(node);
      } else if (node instanceof HTMLIFrameElement) {
        const entry = frameStates.get(node);
        if (entry) removedMedia.add(entry);
      } else if (node instanceof HTMLSourceElement) {
        for (const entry of state.mediaEntries) {
          if (entry.kind === 'video' && entry.sources) {
            entry.sources = entry.sources.filter(item => item.node !== node);
          }
        }
      } else if (node.classList && node.classList.contains('shv-repeated-card')) {
        node.classList.remove('shv-repeated-card');
        state.repeatedCards.delete(node);
      }
    }

    for (const entry of removedMedia) forgetEntry(entry);
    scheduleUIUpdate();
  }

  function queueCleanup(roots) {
    for (const root of roots) {
      if (root instanceof Element) pendingRemovedRoots.add(root);
    }

    if (state.cleanupTimer) return;
    state.cleanupTimer = window.setTimeout(() => {
      state.cleanupTimer = 0;
      const rootsNow = Array.from(pendingRemovedRoots);
      pendingRemovedRoots.clear();

      for (const root of rootsNow) {
        if (!root.isConnected) cleanupDetachedTree(root);
      }
    }, 0);
  }

  function collapseRoots(roots) {
    const list = Array.from(roots).filter(root => root instanceof Element && root.isConnected);
    return list.filter(root => !list.some(other => other !== root && other.contains(root)));
  }

  function scanMedia(root) {
    if (!root) return;

    if (root instanceof HTMLVideoElement) deferVideo(root);
    else if (root instanceof HTMLIFrameElement) deferFrame(root);
    else if (root instanceof HTMLSourceElement) handleSourceElement(root);

    if (!root.querySelectorAll) return;
    root.querySelectorAll('video').forEach(deferVideo);
    root.querySelectorAll('iframe').forEach(deferFrame);
    root.querySelectorAll('source').forEach(handleSourceElement);
  }

  function scanVisuals(root) {
    if (!root) return;

    if (root instanceof HTMLImageElement) optimizeImage(root);
    if (root.querySelectorAll) root.querySelectorAll('img').forEach(optimizeImage);

    if (settings.profile === 'ultra') optimizeRepeatedCards(root);
  }

  function queueVisualScan(root) {
    if (!(root instanceof Element)) return;
    state.pendingVisualRoots.add(root);

    const parent = root.parentElement;
    if (parent && parent.matches('main, section, article, ul, ol, [role="list"], [role="feed"]')) {
      state.pendingCardParents.add(parent);
    }

    if (state.visualTimer) return;
    state.visualTimer = window.setTimeout(() => {
      state.visualTimer = 0;
      const roots = collapseRoots(state.pendingVisualRoots);
      const parents = Array.from(state.pendingCardParents).filter(el => el.isConnected);
      state.pendingVisualRoots.clear();
      state.pendingCardParents.clear();

      for (const rootNode of roots) scanVisuals(rootNode);
      if (settings.profile === 'ultra') {
        for (const parentNode of parents) optimizeRepeatedCards(parentNode);
      }
    }, VISUAL_BATCH_MS);
  }

  function handleAttributeChange(target, attributeName) {
    if (target instanceof HTMLIFrameElement) {
      const entry = frameStates.get(target);
      if (entry) {
        if (entry.loaded) {
          if (attributeName === 'src' && isUsableURL(target.getAttribute('src'))) {
            entry.src = target.getAttribute('src');
          } else if (attributeName === 'srcdoc' && target.hasAttribute('srcdoc')) {
            entry.srcdocPresent = true;
            entry.srcdoc = target.getAttribute('srcdoc');
          }
        } else if (attributeName === 'src' && isUsableURL(target.getAttribute('src'))) {
          entry.src = target.getAttribute('src');
          target.removeAttribute('src');
        } else if (attributeName === 'srcdoc' && target.hasAttribute('srcdoc')) {
          entry.srcdocPresent = true;
          entry.srcdoc = target.getAttribute('srcdoc');
          target.removeAttribute('srcdoc');
        }
        return;
      }
      if (attributeName === 'src' || attributeName === 'srcdoc') deferFrame(target);
      return;
    }

    if (target instanceof HTMLVideoElement) {
      if (attributeName === 'autoplay') {
        target.removeAttribute('autoplay');
        safePause(target);
      }

      const entry = videoStates.get(target);
      if (entry) {
        if (!entry.loaded && attributeName === 'src' && isUsableURL(target.getAttribute('src'))) {
          const value = target.getAttribute('src');
          if (isBlobURL(value)) {
            unsafeVideos.add(target);
            activateVideo(entry, false);
          } else {
            entry.videoSrc = value;
            target.removeAttribute('src');
          }
        } else if (entry.loaded && attributeName === 'src' && isUsableURL(target.getAttribute('src'))) {
          entry.videoSrc = target.getAttribute('src');
        }
        return;
      }
      if (attributeName === 'src' || attributeName === 'autoplay') deferVideo(target);
      return;
    }

    if (target instanceof HTMLSourceElement && attributeName === 'src') {
      handleSourceElement(target);
    }
  }

  function onMutations(records) {
    const added = new Set();
    const removed = [];

    for (const record of records) {
      if (record.type === 'childList') {
        for (const node of record.addedNodes) {
          if (node instanceof Element) added.add(node);
        }
        for (const node of record.removedNodes) {
          if (node instanceof Element) removed.push(node);
        }
      } else if (record.type === 'attributes') {
        handleAttributeChange(record.target, record.attributeName);
      }
    }

    for (const node of collapseRoots(added)) {
      scanMedia(node);
      queueVisualScan(node);
    }

    if (removed.length) queueCleanup(removed);
  }

  // ------------------------------------------------------------
  // Diagnostics
  // ------------------------------------------------------------

  function setupLongTaskObserver() {
    if (typeof PerformanceObserver !== 'function') return;

    try {
      const supported = PerformanceObserver.supportedEntryTypes || [];
      if (!supported.includes('longtask')) return;

      state.longTaskObserver = new PerformanceObserver(list => {
        state.longTaskCount += list.getEntries().length;
        scheduleUIUpdate();
      });

      state.longTaskObserver.observe({ entryTypes: ['longtask'] });
      state.longTaskSupported = true;
    } catch (_) {
      state.longTaskSupported = false;
      if (state.longTaskObserver) state.longTaskObserver.disconnect();
      state.longTaskObserver = null;
    }
  }

  function resourceCount() {
    try {
      return performance.getEntriesByType('resource').length;
    } catch (_) {
      return null;
    }
  }

  function collectStats() {
    let pendingVideos = 0;
    let activeVideos = 0;
    let pendingFrames = 0;
    let activeFrames = 0;
    let filteredAds = 0;
    let detachedEntries = 0;

    for (const entry of state.mediaEntries) {
      if (!entry.element || !entry.element.isConnected) {
        detachedEntries++;
        continue;
      }

      if (entry.kind === 'video') {
        if (entry.loaded) activeVideos++;
        else pendingVideos++;
      } else {
        if (entry.loaded) activeFrames++;
        else {
          pendingFrames++;
          if (entry.isKnownAd && settings.hideKnownAds) filteredAds++;
        }
      }
    }

    return {
      pendingVideos,
      activeVideos,
      pendingFrames,
      activeFrames,
      filteredAds,
      detachedEntries,
      cleanedEntries: state.cleanedEntries,
      resources: resourceCount(),
      longTasks: state.longTaskSupported ? String(state.longTaskCount) : 'پشتیبانی نمی‌شود'
    };
  }

  // ------------------------------------------------------------
  // Panel UI
  // ------------------------------------------------------------

  function makeButton(label, action, className) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    if (className) button.className = className;
    button.addEventListener('click', action);
    return button;
  }

  function makeSectionTitle(label) {
    const el = document.createElement('div');
    el.className = 'shv-section-title';
    el.textContent = label;
    return el;
  }

  function makeSeparator() {
    const el = document.createElement('div');
    el.className = 'shv-separator';
    return el;
  }

  function makeStatCard(label, value) {
    const card = document.createElement('div');
    card.className = 'shv-stat-card';

    const labelEl = document.createElement('span');
    labelEl.className = 'shv-stat-label';
    labelEl.textContent = label;

    const valueEl = document.createElement('strong');
    valueEl.className = 'shv-stat-value';
    valueEl.textContent = value;
    card.append(labelEl, valueEl);

    return { card, valueEl };
  }

  function setActiveTab(name) {
    if (!state.ui || !state.ui.panes[name]) return;
    state.activeTab = name;

    for (const [tabName, button] of Object.entries(state.ui.tabButtons)) {
      button.setAttribute('aria-pressed', String(tabName === name));
    }
    for (const [paneName, pane] of Object.entries(state.ui.panes)) {
      pane.hidden = paneName !== name;
    }

    scheduleUIUpdate();
  }

  function createPanel() {
    if (!document.body || document.getElementById('shv-ultralite-fab')) return;

    const fab = document.createElement('button');
    fab.id = 'shv-ultralite-fab';
    fab.type = 'button';
    fab.textContent = '⚡ سبک‌ساز';
    fab.setAttribute('aria-expanded', 'false');
    fab.setAttribute('aria-label', 'بازکردن پنل Shahvani Ultra Lite');

    const panel = document.createElement('div');
    panel.id = 'shv-ultralite-panel';
    panel.hidden = true;

    const topbar = document.createElement('div');
    topbar.className = 'shv-topbar';

    const brandWrap = document.createElement('div');
    const brand = document.createElement('strong');
    brand.className = 'shv-brand';
    brand.textContent = 'Shahvani Ultra Lite';

    const subtitle = document.createElement('span');
    subtitle.className = 'shv-subtitle';
    subtitle.textContent = 'نسخهٔ ' + VERSION + ' · کنترل عملکرد';
    brandWrap.append(brand, subtitle);

    const closeButton = makeButton('✕', () => {
      panel.hidden = true;
      fab.setAttribute('aria-expanded', 'false');
    });
    closeButton.setAttribute('aria-label', 'بستن پنل');
    closeButton.style.minWidth = '38px';
    topbar.append(brandWrap, closeButton);

    const tabs = document.createElement('div');
    tabs.className = 'shv-tabs';
    const tabButtons = {};
    const tabDefinitions = [
      ['overview', 'نمای کلی'],
      ['media', 'رسانه‌ها'],
      ['appearance', 'ظاهر']
    ];

    for (const [key, label] of tabDefinitions) {
      const button = makeButton(label, () => setActiveTab(key), 'shv-tab');
      button.setAttribute('aria-pressed', String(key === 'overview'));
      tabButtons[key] = button;
      tabs.append(button);
    }

    const panes = {};
    for (const key of ['overview', 'media', 'appearance']) {
      const pane = document.createElement('section');
      pane.className = 'shv-pane';
      pane.hidden = key !== 'overview';
      panes[key] = pane;
    }

    // Overview: profiles and diagnostics.
    panes.overview.append(makeSectionTitle('پروفایل عملکرد'));
    const profileRow = document.createElement('div');
    profileRow.className = 'shv-button-row';
    const profileButtons = {};

    for (const profile of ['compatible', 'balanced', 'ultra']) {
      const button = makeButton(PROFILE_NAMES[profile], () => setProfile(profile));
      button.setAttribute('aria-pressed', String(settings.profile === profile));
      profileButtons[profile] = button;
      profileRow.append(button);
    }

    panes.overview.append(profileRow);

    const profileDescription = document.createElement('div');
    profileDescription.className = 'shv-desc';
    profileDescription.textContent =
      'سازگار: تغییرات کمتر. متعادل: کاهش افکت‌ها و بارگیری تنبل تصاویر. ' +
      'Ultra: بهینه‌سازی اضافی کارت‌های تکراری. سیاست لمس برای همهٔ iframeها ثابت است.';
    panes.overview.append(profileDescription, makeSeparator());

    panes.overview.append(makeSectionTitle('وضعیت صفحه'));
    const statGrid = document.createElement('div');
    statGrid.className = 'shv-stat-grid';

    const statRefs = {
      pendingVideos: makeStatCard('ویدئوهای معوق', '0'),
      pendingFrames: makeStatCard('iframeهای معوق', '0'),
      activeVideos: makeStatCard('ویدئوهای فعال‌شده', '0'),
      activeFrames: makeStatCard('iframeهای فعال‌شده', '0')
    };

    for (const ref of Object.values(statRefs)) statGrid.append(ref.card);
    panes.overview.append(statGrid);

    const detailStats = document.createElement('div');
    detailStats.className = 'shv-detail-stat';
    panes.overview.append(detailStats);

    const emergencyButton = makeButton('حالت اضطراری: خاموش', toggleEmergency);
    emergencyButton.className = 'shv-primary';
    emergencyButton.setAttribute('aria-pressed', 'false');
    panes.overview.append(makeSeparator(), emergencyButton);

    const emergencyDescription = document.createElement('div');
    emergencyDescription.className = 'shv-desc';
    emergencyDescription.textContent =
      'در حالت اضطراری، ویدئوهای HTML مکث می‌شوند و فعال‌کردن پلیرهای معوق تا زمان خاموش‌کردن این حالت متوقف می‌ماند.';
    panes.overview.append(emergencyDescription);

    // Media controls.
    panes.media.append(makeSectionTitle('بارگذاری رسانه‌ها'));
    const mediaDescription = document.createElement('div');
    mediaDescription.className = 'shv-desc';
    mediaDescription.textContent =
      'هیچ iframe یا ویدئویی با اسکرول خودکار فعال نمی‌شود. برای بازکردن محتوا، کادر همان پلیر را لمس کن.';
    panes.media.append(mediaDescription);

    const adToggleButton = makeButton('', toggleKnownAds);
    panes.media.append(adToggleButton);

    const adDescription = document.createElement('div');
    adDescription.className = 'shv-desc';
    adDescription.textContent =
      'این فیلتر فقط دامنه‌های تبلیغاتی شناخته‌شده را هدف می‌گیرد و ممکن است همهٔ تبلیغات را شناسایی نکند.';
    panes.media.append(adDescription, makeSeparator());

    panes.media.append(makeSectionTitle('کنترل پخش و منابع'));
    panes.media.append(
      makeButton('⏸ مکث همهٔ ویدئوها', pauseAllVideos, 'shv-primary')
    );
    panes.media.append(
      makeButton('آزادسازی دستی منابع غیرفعال', releaseInactiveMedia)
    );

    const releaseDescription = document.createElement('div');
    releaseDescription.className = 'shv-desc';
    releaseDescription.textContent =
      'فقط ویدئوهای مکث‌شده و iframeهای کاملاً خارج از صفحه نامزد آزادسازی هستند. وضعیت بعضی پلیرهای اختصاصی ممکن است بازیابی نشود.';
    panes.media.append(releaseDescription);

    // Appearance controls.
    panes.appearance.append(makeSectionTitle('رنگ‌بندی پنل'));
    const themeRow = document.createElement('div');
    themeRow.className = 'shv-button-row';
    const themeButtons = {};

    for (const [key, label] of [
      ['system', 'پیروی از سیستم'],
      ['dark', 'تیره'],
      ['light', 'روشن']
    ]) {
      const button = makeButton(label, () => {
        settings.theme = key;
        saveSettings();
        applyTheme();
        setStatus('ظاهر پنل به‌روزرسانی شد.');
      });
      button.setAttribute('aria-pressed', String(settings.theme === key));
      themeButtons[key] = button;
      themeRow.append(button);
    }

    panes.appearance.append(themeRow);

    const compactButton = makeButton('', () => {
      settings.compact = !settings.compact;
      saveSettings();
      applyCompactMode();
      setStatus(settings.compact ? 'نمای فشرده فعال شد.' : 'نمای فشرده غیرفعال شد.');
    });
    panes.appearance.append(compactButton, makeSeparator());

    panes.appearance.append(makeSectionTitle('تنظیمات'));
    panes.appearance.append(makeButton('بازگردانی تنظیمات پیش‌فرض', resetSettings));

    const restoreNote = document.createElement('div');
    restoreNote.className = 'shv-desc';
    restoreNote.textContent =
      'برای بازگشت کامل به رفتار اصلی سایت، اسکریپت را از Dashboard افزونه خاموش و صفحه را Reload کن.';
    panes.appearance.append(restoreNote);

    const status = document.createElement('div');
    status.className = 'shv-status';
    status.setAttribute('role', 'status');
    status.textContent = state.statusMessage;

    panel.append(topbar, tabs, panes.overview, panes.media, panes.appearance, status);
    document.body.append(fab, panel);

    fab.addEventListener('click', () => {
      panel.hidden = !panel.hidden;
      fab.setAttribute('aria-expanded', String(!panel.hidden));
      scheduleUIUpdate();
    });

    state.ui = {
      fab,
      panel,
      status,
      tabButtons,
      panes,
      profileButtons,
      statRefs,
      detailStats,
      emergencyButton,
      adToggleButton,
      themeButtons,
      compactButton
    };

    applyTheme();
    applyCompactMode();
    updatePanelNow();
  }

  function updatePanelNow() {
    const ui = state.ui;
    if (!ui) return;

    for (const profile of ['compatible', 'balanced', 'ultra']) {
      ui.profileButtons[profile].setAttribute(
        'aria-pressed', String(settings.profile === profile)
      );
    }

    ui.adToggleButton.textContent = 'فیلتر تبلیغات شناخته‌شده: ' +
      (settings.hideKnownAds ? 'روشن' : 'خاموش');
    ui.adToggleButton.setAttribute('aria-pressed', String(settings.hideKnownAds));

    ui.emergencyButton.textContent = 'حالت اضطراری: ' + (state.emergency ? 'روشن' : 'خاموش');
    ui.emergencyButton.setAttribute('aria-pressed', String(state.emergency));

    for (const [key, button] of Object.entries(ui.themeButtons)) {
      button.setAttribute('aria-pressed', String(settings.theme === key));
    }

    ui.compactButton.textContent = settings.compact
      ? 'نمای فشرده: روشن'
      : 'نمای فشرده: خاموش';
    ui.compactButton.setAttribute('aria-pressed', String(settings.compact));
    ui.panel.classList.toggle('shv-compact', settings.compact);

    const stats = collectStats();
    for (const key of ['pendingVideos', 'pendingFrames', 'activeVideos', 'activeFrames']) {
      ui.statRefs[key].valueEl.textContent = String(stats[key]);
    }

    ui.detailStats.textContent =
      'پروفایل: ' + PROFILE_NAMES[settings.profile] + '\n' +
      'منابع شبکه ثبت‌شده از آغاز بارگذاری صفحه: ' +
        (stats.resources === null ? 'نامشخص' : stats.resources) + '\n' +
      'وقفه‌های طولانی ثبت‌شده: ' + stats.longTasks + '\n' +
      'عناصر قدیمی پاک‌سازی‌شده از پیگیری: ' + stats.cleanedEntries + '\n' +
      'کادرهای تبلیغاتی فیلترشده: ' + stats.filteredAds + '\n' +
      'RAM واقعی گوشی: از داخل این اسکریپت قابل‌اندازه‌گیری مطمئن نیست.';

    ui.status.textContent = state.statusMessage;
    applyTheme();
  }

  function scheduleUIUpdate() {
    if (state.uiTimer) return;

    state.uiTimer = window.setTimeout(() => {
      state.uiTimer = 0;
      updatePanelNow();
    }, UI_UPDATE_MS);
  }

  // ------------------------------------------------------------
  // Observer and diagnostics
  // ------------------------------------------------------------

  function handleAttributeChange(target, attributeName) {
    if (target instanceof HTMLIFrameElement) {
      const entry = frameStates.get(target);

      if (entry) {
        if (entry.loaded) {
          if (attributeName === 'src' && isUsableURL(target.getAttribute('src'))) {
            entry.src = target.getAttribute('src');
          } else if (attributeName === 'srcdoc' && target.hasAttribute('srcdoc')) {
            entry.srcdocPresent = true;
            entry.srcdoc = target.getAttribute('srcdoc');
          }
        } else if (attributeName === 'src' && isUsableURL(target.getAttribute('src'))) {
          entry.src = target.getAttribute('src');
          target.removeAttribute('src');
        } else if (attributeName === 'srcdoc' && target.hasAttribute('srcdoc')) {
          entry.srcdocPresent = true;
          entry.srcdoc = target.getAttribute('srcdoc');
          target.removeAttribute('srcdoc');
        }
        return;
      }

      if (attributeName === 'src' || attributeName === 'srcdoc') deferFrame(target);
      return;
    }

    if (target instanceof HTMLVideoElement) {
      if (attributeName === 'autoplay') {
        target.removeAttribute('autoplay');
        safePause(target);
      }

      const entry = videoStates.get(target);
      if (entry) {
        if (!entry.loaded && attributeName === 'src' && isUsableURL(target.getAttribute('src'))) {
          const value = target.getAttribute('src');

          if (isBlobURL(value)) {
            unsafeVideos.add(target);
            activateVideo(entry, false);
          } else {
            entry.videoSrc = value;
            target.removeAttribute('src');
          }
        } else if (entry.loaded && attributeName === 'src' && isUsableURL(target.getAttribute('src'))) {
          entry.videoSrc = target.getAttribute('src');
        }
        return;
      }

      if (attributeName === 'src' || attributeName === 'autoplay') deferVideo(target);
      return;
    }

    if (target instanceof HTMLSourceElement && attributeName === 'src') {
      handleSourceElement(target);
    }
  }

  function collapseRoots(roots) {
    const list = Array.from(roots).filter(root => root instanceof Element && root.isConnected);
    return list.filter(root => !list.some(other => other !== root && other.contains(root)));
  }

  function scanMedia(root) {
    if (!root) return;

    if (root instanceof HTMLVideoElement) deferVideo(root);
    else if (root instanceof HTMLIFrameElement) deferFrame(root);
    else if (root instanceof HTMLSourceElement) handleSourceElement(root);

    if (!root.querySelectorAll) return;
    root.querySelectorAll('video').forEach(deferVideo);
    root.querySelectorAll('iframe').forEach(deferFrame);
    root.querySelectorAll('source').forEach(handleSourceElement);
  }

  function scanVisuals(root) {
    if (!root) return;

    if (root instanceof HTMLImageElement) optimizeImage(root);
    if (root.querySelectorAll) root.querySelectorAll('img').forEach(optimizeImage);

    if (settings.profile === 'ultra') optimizeRepeatedCards(root);
  }

  function queueVisualScan(root) {
    if (!(root instanceof Element)) return;

    state.pendingVisualRoots.add(root);

    const parent = root.parentElement;
    if (parent && parent.matches('main, section, article, ul, ol, [role="list"], [role="feed"]')) {
      state.pendingCardParents.add(parent);
    }

    if (state.visualTimer) return;

    state.visualTimer = window.setTimeout(() => {
      state.visualTimer = 0;
      const roots = collapseRoots(state.pendingVisualRoots);
      const parents = Array.from(state.pendingCardParents).filter(el => el.isConnected);
      state.pendingVisualRoots.clear();
      state.pendingCardParents.clear();

      for (const node of roots) scanVisuals(node);

      if (settings.profile === 'ultra') {
        for (const parentNode of parents) optimizeRepeatedCards(parentNode);
      }
    }, VISUAL_BATCH_MS);
  }

  function forgetEntry(entry) {
    state.mediaEntries.delete(entry);
    state.cleanedEntries++;

    if (entry.kind === 'video') videoStates.delete(entry.element);
    else frameStates.delete(entry.element);

    if (entry.placeholder && entry.placeholder.isConnected) entry.placeholder.remove();

    if (entry.element && entry.element.classList) {
      entry.element.classList.remove('shv-suspended-video', 'shv-suspended-frame');
    }

    entry.placeholder = null;
    entry.element = null;
    if (entry.sources) entry.sources.length = 0;
  }

  function cleanupDetachedTree(root) {
    if (!(root instanceof Element) || root.isConnected) return;

    const nodes = [];
    if (root.matches('video, iframe, source, .shv-repeated-card')) nodes.push(root);
    if (root.querySelectorAll) {
      nodes.push(...root.querySelectorAll('video, iframe, source, .shv-repeated-card'));
    }

    const removedMedia = new Set();

    for (const node of nodes) {
      if (node.isConnected) continue;

      if (node instanceof HTMLVideoElement) {
        const entry = videoStates.get(node);
        if (entry) removedMedia.add(entry);
        unsafeVideos.delete(node);
      } else if (node instanceof HTMLIFrameElement) {
        const entry = frameStates.get(node);
        if (entry) removedMedia.add(entry);
      } else if (node instanceof HTMLSourceElement) {
        for (const entry of state.mediaEntries) {
          if (entry.kind === 'video' && entry.sources) {
            entry.sources = entry.sources.filter(item => item.node !== node);
          }
        }
      } else if (node.classList && node.classList.contains('shv-repeated-card')) {
        node.classList.remove('shv-repeated-card');
        state.repeatedCards.delete(node);
      }
    }

    for (const entry of removedMedia) forgetEntry(entry);
    scheduleUIUpdate();
  }

  function queueCleanup(roots) {
    for (const root of roots) {
      if (root instanceof Element) pendingRemovedRoots.add(root);
    }

    if (state.cleanupTimer) return;

    state.cleanupTimer = window.setTimeout(() => {
      state.cleanupTimer = 0;

      const rootsNow = Array.from(pendingRemovedRoots);
      pendingRemovedRoots.clear();

      for (const root of rootsNow) {
        if (!root.isConnected) cleanupDetachedTree(root);
      }
    }, 0);
  }

  function onMutations(records) {
    const added = new Set();
    const removed = [];

    for (const record of records) {
      if (record.type === 'childList') {
        for (const node of record.addedNodes) {
          if (node instanceof Element) added.add(node);
        }
        for (const node of record.removedNodes) {
          if (node instanceof Element) removed.push(node);
        }
      } else if (record.type === 'attributes') {
        handleAttributeChange(record.target, record.attributeName);
      }
    }

    for (const node of collapseRoots(added)) {
      scanMedia(node);
      queueVisualScan(node);
    }

    if (removed.length) queueCleanup(removed);
  }

  function setupLongTaskObserver() {
    if (typeof PerformanceObserver !== 'function') return;

    try {
      const supported = PerformanceObserver.supportedEntryTypes || [];
      if (!supported.includes('longtask')) return;

      state.longTaskObserver = new PerformanceObserver(list => {
        state.longTaskCount += list.getEntries().length;
        scheduleUIUpdate();
      });

      state.longTaskObserver.observe({ entryTypes: ['longtask'] });
      state.longTaskSupported = true;
    } catch (_) {
      state.longTaskSupported = false;
      if (state.longTaskObserver) state.longTaskObserver.disconnect();
      state.longTaskObserver = null;
    }
  }

  function resourceCount() {
    try {
      return performance.getEntriesByType('resource').length;
    } catch (_) {
      return null;
    }
  }

  function collectStats() {
    let pendingVideos = 0;
    let activeVideos = 0;
    let pendingFrames = 0;
    let activeFrames = 0;
    let filteredAds = 0;
    let detachedEntries = 0;

    for (const entry of state.mediaEntries) {
      if (!entry.element || !entry.element.isConnected) {
        detachedEntries++;
        continue;
      }

      if (entry.kind === 'video') {
        if (entry.loaded) activeVideos++;
        else pendingVideos++;
      } else {
        if (entry.loaded) activeFrames++;
        else {
          pendingFrames++;
          if (entry.isKnownAd && settings.hideKnownAds) filteredAds++;
        }
      }
    }

    return {
      pendingVideos,
      activeVideos,
      pendingFrames,
      activeFrames,
      filteredAds,
      detachedEntries,
      cleanedEntries: state.cleanedEntries,
      resources: resourceCount(),
      longTasks: state.longTaskSupported ? String(state.longTaskCount) : 'پشتیبانی نمی‌شود'
    };
  }

  function setActiveTab(name) {
    if (!state.ui || !state.ui.panes[name]) return;
    state.activeTab = name;

    for (const [tabName, button] of Object.entries(state.ui.tabButtons)) {
      button.setAttribute('aria-pressed', String(tabName === name));
    }
    for (const [paneName, pane] of Object.entries(state.ui.panes)) {
      pane.hidden = paneName !== name;
    }

    scheduleUIUpdate();
  }

  function makeButton(label, action, className) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    if (className) button.className = className;
    button.addEventListener('click', action);
    return button;
  }

  function makeSectionTitle(label) {
    const el = document.createElement('div');
    el.className = 'shv-section-title';
    el.textContent = label;
    return el;
  }

  function makeSeparator() {
    const el = document.createElement('div');
    el.className = 'shv-separator';
    return el;
  }

  function makeStatCard(label, value) {
    const card = document.createElement('div');
    card.className = 'shv-stat-card';

    const labelEl = document.createElement('span');
    labelEl.className = 'shv-stat-label';
    labelEl.textContent = label;

    const valueEl = document.createElement('strong');
    valueEl.className = 'shv-stat-value';
    valueEl.textContent = value;

    card.append(labelEl, valueEl);
    return { card, valueEl };
  }

  function createPanel() {
    if (!document.body || document.getElementById('shv-ultralite-fab')) return;

    const fab = document.createElement('button');
    fab.id = 'shv-ultralite-fab';
    fab.type = 'button';
    fab.textContent = '⚡ سبک‌ساز';
    fab.setAttribute('aria-expanded', 'false');
    fab.setAttribute('aria-label', 'بازکردن پنل Shahvani Ultra Lite');

    const panel = document.createElement('div');
    panel.id = 'shv-ultralite-panel';
    panel.hidden = true;

    const topbar = document.createElement('div');
    topbar.className = 'shv-topbar';

    const brandWrap = document.createElement('div');
    const brand = document.createElement('strong');
    brand.className = 'shv-brand';
    brand.textContent = 'Shahvani Ultra Lite';

    const subtitle = document.createElement('span');
    subtitle.className = 'shv-subtitle';
    subtitle.textContent = 'نسخهٔ ' + VERSION + ' · کنترل عملکرد';
    brandWrap.append(brand, subtitle);

    const closeButton = makeButton('✕', () => {
      panel.hidden = true;
      fab.setAttribute('aria-expanded', 'false');
    });
    closeButton.setAttribute('aria-label', 'بستن پنل');
    closeButton.style.minWidth = '38px';
    topbar.append(brandWrap, closeButton);

    const tabs = document.createElement('div');
    tabs.className = 'shv-tabs';
    const tabButtons = {};
    const tabDefinitions = [
      ['overview', 'نمای کلی'],
      ['media', 'رسانه‌ها'],
      ['appearance', 'ظاهر']
    ];

    for (const [key, label] of tabDefinitions) {
      const button = makeButton(label, () => setActiveTab(key), 'shv-tab');
      button.setAttribute('aria-pressed', String(key === 'overview'));
      tabButtons[key] = button;
      tabs.append(button);
    }

    const panes = {};
    for (const key of ['overview', 'media', 'appearance']) {
      const pane = document.createElement('section');
      pane.className = 'shv-pane';
      pane.hidden = key !== 'overview';
      panes[key] = pane;
    }

    // Overview.
    panes.overview.append(makeSectionTitle('پروفایل عملکرد'));

    const profileRow = document.createElement('div');
    profileRow.className = 'shv-button-row';
    const profileButtons = {};

    for (const profile of ['compatible', 'balanced', 'ultra']) {
      const button = makeButton(PROFILE_NAMES[profile], () => setProfile(profile));
      button.setAttribute('aria-pressed', String(settings.profile === profile));
      profileButtons[profile] = button;
      profileRow.append(button);
    }

    panes.overview.append(profileRow);

    const profileDescription = document.createElement('div');
    profileDescription.className = 'shv-desc';
    profileDescription.textContent =
      'سازگار: تغییرات کمتر. متعادل: کاهش افکت‌ها و بارگیری تنبل تصاویر. ' +
      'Ultra: بهینه‌سازی اضافی کارت‌های تکراری. سیاست لمس برای همهٔ iframeها ثابت است.';
    panes.overview.append(profileDescription, makeSeparator());

    panes.overview.append(makeSectionTitle('وضعیت صفحه'));

    const statGrid = document.createElement('div');
    statGrid.className = 'shv-stat-grid';

    const statRefs = {
      pendingVideos: makeStatCard('ویدئوهای معوق', '0'),
      pendingFrames: makeStatCard('iframeهای معوق', '0'),
      activeVideos: makeStatCard('ویدئوهای فعال‌شده', '0'),
      activeFrames: makeStatCard('iframeهای فعال‌شده', '0')
    };

    for (const ref of Object.values(statRefs)) statGrid.append(ref.card);
    panes.overview.append(statGrid);

    const detailStats = document.createElement('div');
    detailStats.className = 'shv-detail-stat';
    panes.overview.append(detailStats);

    const emergencyButton = makeButton('حالت اضطراری: خاموش', toggleEmergency);
    emergencyButton.className = 'shv-primary';
    emergencyButton.setAttribute('aria-pressed', 'false');
    panes.overview.append(makeSeparator(), emergencyButton);

    const emergencyDescription = document.createElement('div');
    emergencyDescription.className = 'shv-desc';
    emergencyDescription.textContent =
      'در حالت اضطراری، ویدئوهای HTML مکث می‌شوند و فعال‌کردن پلیرهای معوق تا زمان خاموش‌کردن این حالت متوقف می‌ماند.';
    panes.overview.append(emergencyDescription);

    // Media.
    panes.media.append(makeSectionTitle('بارگذاری رسانه‌ها'));

    const mediaDescription = document.createElement('div');
    mediaDescription.className = 'shv-desc';
    mediaDescription.textContent =
      'هیچ iframe یا ویدئویی با اسکرول خودکار فعال نمی‌شود. برای بازکردن محتوا، کادر همان پلیر را لمس کن.';
    panes.media.append(mediaDescription);

    const adToggleButton = makeButton('', toggleKnownAds);
    panes.media.append(adToggleButton);

    const adDescription = document.createElement('div');
    adDescription.className = 'shv-desc';
    adDescription.textContent =
      'این فیلتر فقط دامنه‌های تبلیغاتی شناخته‌شده را هدف می‌گیرد و ممکن است همهٔ تبلیغات را شناسایی نکند.';
    panes.media.append(adDescription, makeSeparator());

    panes.media.append(makeSectionTitle('کنترل پخش و منابع'));
    panes.media.append(makeButton('⏸ مکث همهٔ ویدئوها', pauseAllVideos, 'shv-primary'));
    panes.media.append(makeButton('آزادسازی دستی منابع غیرفعال', releaseInactiveMedia));

    const releaseDescription = document.createElement('div');
    releaseDescription.className = 'shv-desc';
    releaseDescription.textContent =
      'فقط ویدئوهای مکث‌شده و iframeهای کاملاً خارج از صفحه نامزد آزادسازی هستند. وضعیت بعضی پلیرهای اختصاصی ممکن است بازیابی نشود.';
    panes.media.append(releaseDescription);

    // Appearance.
    panes.appearance.append(makeSectionTitle('رنگ‌بندی پنل'));

    const themeRow = document.createElement('div');
    themeRow.className = 'shv-button-row';
    const themeButtons = {};

    for (const [key, label] of [
      ['system', 'پیروی از سیستم'],
      ['dark', 'تیره'],
      ['light', 'روشن']
    ]) {
      const button = makeButton(label, () => {
        settings.theme = key;
        saveSettings();
        applyTheme();
        setStatus('ظاهر پنل به‌روزرسانی شد.');
      });
      button.setAttribute('aria-pressed', String(settings.theme === key));
      themeButtons[key] = button;
      themeRow.append(button);
    }
    panes.appearance.append(themeRow);

    const compactButton = makeButton('', () => {
      settings.compact = !settings.compact;
      saveSettings();
      applyCompactMode();
      setStatus(settings.compact ? 'نمای فشرده فعال شد.' : 'نمای فشرده غیرفعال شد.');
    });
    panes.appearance.append(compactButton, makeSeparator());

    panes.appearance.append(makeSectionTitle('تنظیمات'));
    panes.appearance.append(makeButton('بازگردانی تنظیمات پیش‌فرض', resetSettings));

    const restoreNote = document.createElement('div');
    restoreNote.className = 'shv-desc';
    restoreNote.textContent =
      'برای بازگشت کامل به رفتار اصلی سایت، اسکریپت را از Dashboard افزونه خاموش و صفحه را Reload کن.';
    panes.appearance.append(restoreNote);

    const status = document.createElement('div');
    status.className = 'shv-status';
    status.setAttribute('role', 'status');
    status.textContent = state.statusMessage;

    panel.append(topbar, tabs, panes.overview, panes.media, panes.appearance, status);
    document.body.append(fab, panel);

    fab.addEventListener('click', () => {
      panel.hidden = !panel.hidden;
      fab.setAttribute('aria-expanded', String(!panel.hidden));
      scheduleUIUpdate();
    });

    state.ui = {
      fab,
      panel,
      status,
      tabButtons,
      panes,
      profileButtons,
      statRefs,
      detailStats,
      emergencyButton,
      adToggleButton,
      themeButtons,
      compactButton
    };

    applyTheme();
    applyCompactMode();
    updatePanelNow();
  }

  function updatePanelNow() {
    const ui = state.ui;
    if (!ui) return;

    for (const profile of ['compatible', 'balanced', 'ultra']) {
      ui.profileButtons[profile].setAttribute(
        'aria-pressed', String(settings.profile === profile)
      );
    }

    ui.adToggleButton.textContent = 'فیلتر تبلیغات شناخته‌شده: ' +
      (settings.hideKnownAds ? 'روشن' : 'خاموش');
    ui.adToggleButton.setAttribute('aria-pressed', String(settings.hideKnownAds));

    ui.emergencyButton.textContent = 'حالت اضطراری: ' + (state.emergency ? 'روشن' : 'خاموش');
    ui.emergencyButton.setAttribute('aria-pressed', String(state.emergency));

    for (const [key, button] of Object.entries(ui.themeButtons)) {
      button.setAttribute('aria-pressed', String(settings.theme === key));
    }

    ui.compactButton.textContent = settings.compact
      ? 'نمای فشرده: روشن'
      : 'نمای فشرده: خاموش';
    ui.compactButton.setAttribute('aria-pressed', String(settings.compact));
    ui.panel.classList.toggle('shv-compact', settings.compact);

    const stats = collectStats();
    for (const key of ['pendingVideos', 'pendingFrames', 'activeVideos', 'activeFrames']) {
      ui.statRefs[key].valueEl.textContent = String(stats[key]);
    }

    ui.detailStats.textContent =
      'پروفایل: ' + PROFILE_NAMES[settings.profile] + '\n' +
      'منابع شبکه ثبت‌شده از آغاز بارگذاری صفحه: ' +
        (stats.resources === null ? 'نامشخص' : stats.resources) + '\n' +
      'وقفه‌های طولانی ثبت‌شده: ' + stats.longTasks + '\n' +
      'عناصر قدیمی پاک‌سازی‌شده از پیگیری: ' + stats.cleanedEntries + '\n' +
      'کادرهای تبلیغاتی فیلترشده: ' + stats.filteredAds + '\n' +
      'RAM واقعی گوشی: از داخل این اسکریپت قابل‌اندازه‌گیری مطمئن نیست.';

    ui.status.textContent = state.statusMessage;
    applyTheme();
  }

  function scheduleUIUpdate() {
    if (state.uiTimer) return;

    state.uiTimer = window.setTimeout(() => {
      state.uiTimer = 0;
      updatePanelNow();
    }, UI_UPDATE_MS);
  }

  // ------------------------------------------------------------
  // MutationObserver and page lifecycle
  // ------------------------------------------------------------

  function handleAttributeChange(target, attributeName) {
    if (target instanceof HTMLIFrameElement) {
      const entry = frameStates.get(target);

      if (entry) {
        if (entry.loaded) {
          if (attributeName === 'src' && isUsableURL(target.getAttribute('src'))) {
            entry.src = target.getAttribute('src');
          } else if (attributeName === 'srcdoc' && target.hasAttribute('srcdoc')) {
            entry.srcdocPresent = true;
            entry.srcdoc = target.getAttribute('srcdoc');
          }
        } else if (attributeName === 'src' && isUsableURL(target.getAttribute('src'))) {
          entry.src = target.getAttribute('src');
          target.removeAttribute('src');
        } else if (attributeName === 'srcdoc' && target.hasAttribute('srcdoc')) {
          entry.srcdocPresent = true;
          entry.srcdoc = target.getAttribute('srcdoc');
          target.removeAttribute('srcdoc');
        }
        return;
      }

      if (attributeName === 'src' || attributeName === 'srcdoc') deferFrame(target);
      return;
    }

    if (target instanceof HTMLVideoElement) {
      if (attributeName === 'autoplay') {
        target.removeAttribute('autoplay');
        safePause(target);
      }

      const entry = videoStates.get(target);
      if (entry) {
        if (!entry.loaded && attributeName === 'src' && isUsableURL(target.getAttribute('src'))) {
          const value = target.getAttribute('src');

          if (isBlobURL(value)) {
            unsafeVideos.add(target);
            activateVideo(entry, false);
          } else {
            entry.videoSrc = value;
            target.removeAttribute('src');
          }
        } else if (entry.loaded && attributeName === 'src' && isUsableURL(target.getAttribute('src'))) {
          entry.videoSrc = target.getAttribute('src');
        }
        return;
      }

      if (attributeName === 'src' || attributeName === 'autoplay') deferVideo(target);
      return;
    }

    if (target instanceof HTMLSourceElement && attributeName === 'src') {
      handleSourceElement(target);
    }
  }

  function collapseRoots(roots) {
    const list = Array.from(roots).filter(root => root instanceof Element && root.isConnected);
    return list.filter(root => !list.some(other => other !== root && other.contains(root)));
  }

  function scanMedia(root) {
    if (!root) return;

    if (root instanceof HTMLVideoElement) deferVideo(root);
    else if (root instanceof HTMLIFrameElement) deferFrame(root);
    else if (root instanceof HTMLSourceElement) handleSourceElement(root);

    if (!root.querySelectorAll) return;
    root.querySelectorAll('video').forEach(deferVideo);
    root.querySelectorAll('iframe').forEach(deferFrame);
    root.querySelectorAll('source').forEach(handleSourceElement);
  }

  function scanVisuals(root) {
    if (!root) return;

    if (root instanceof HTMLImageElement) optimizeImage(root);
    if (root.querySelectorAll) root.querySelectorAll('img').forEach(optimizeImage);

    if (settings.profile === 'ultra') optimizeRepeatedCards(root);
  }

  function queueVisualScan(root) {
    if (!(root instanceof Element)) return;
    state.pendingVisualRoots.add(root);

    const parent = root.parentElement;
    if (parent && parent.matches('main, section, article, ul, ol, [role="list"], [role="feed"]')) {
      state.pendingCardParents.add(parent);
    }

    if (state.visualTimer) return;
    state.visualTimer = window.setTimeout(() => {
      state.visualTimer = 0;
      const roots = collapseRoots(state.pendingVisualRoots);
      const parents = Array.from(state.pendingCardParents).filter(el => el.isConnected);
      state.pendingVisualRoots.clear();
      state.pendingCardParents.clear();

      for (const node of roots) scanVisuals(node);

      if (settings.profile === 'ultra') {
        for (const parentNode of parents) optimizeRepeatedCards(parentNode);
      }
    }, VISUAL_BATCH_MS);
  }

  function forgetEntry(entry) {
    state.mediaEntries.delete(entry);
    state.cleanedEntries++;

    if (entry.kind === 'video') videoStates.delete(entry.element);
    else frameStates.delete(entry.element);

    if (entry.placeholder && entry.placeholder.isConnected) entry.placeholder.remove();

    if (entry.element && entry.element.classList) {
      entry.element.classList.remove('shv-suspended-video', 'shv-suspended-frame');
    }

    entry.placeholder = null;
    entry.element = null;
    if (entry.sources) entry.sources.length = 0;
  }

  function cleanupDetachedTree(root) {
    if (!(root instanceof Element) || root.isConnected) return;

    const nodes = [];
    if (root.matches('video, iframe, source, .shv-repeated-card')) nodes.push(root);
    if (root.querySelectorAll) {
      nodes.push(...root.querySelectorAll('video, iframe, source, .shv-repeated-card'));
    }

    const removedMedia = new Set();

    for (const node of nodes) {
      if (node.isConnected) continue;

      if (node instanceof HTMLVideoElement) {
        const entry = videoStates.get(node);
        if (entry) removedMedia.add(entry);
        unsafeVideos.delete(node);
      } else if (node instanceof HTMLIFrameElement) {
        const entry = frameStates.get(node);
        if (entry) removedMedia.add(entry);
      } else if (node instanceof HTMLSourceElement) {
        for (const entry of state.mediaEntries) {
          if (entry.kind === 'video' && entry.sources) {
            entry.sources = entry.sources.filter(item => item.node !== node);
          }
        }
      } else if (node.classList && node.classList.contains('shv-repeated-card')) {
        node.classList.remove('shv-repeated-card');
        state.repeatedCards.delete(node);
      }
    }

    for (const entry of removedMedia) forgetEntry(entry);
    scheduleUIUpdate();
  }

  function queueCleanup(roots) {
    for (const root of roots) {
      if (root instanceof Element) pendingRemovedRoots.add(root);
    }

    if (state.cleanupTimer) return;

    state.cleanupTimer = window.setTimeout(() => {
      state.cleanupTimer = 0;
      const rootsNow = Array.from(pendingRemovedRoots);
      pendingRemovedRoots.clear();

      for (const root of rootsNow) {
        if (!root.isConnected) cleanupDetachedTree(root);
      }
    }, 0);
  }

  function onMutations(records) {
    const added = new Set();
    const removed = [];

    for (const record of records) {
      if (record.type === 'childList') {
        for (const node of record.addedNodes) {
          if (node instanceof Element) added.add(node);
        }
        for (const node of record.removedNodes) {
          if (node instanceof Element) removed.push(node);
        }
      } else if (record.type === 'attributes') {
        handleAttributeChange(record.target, record.attributeName);
      }
    }

    for (const node of collapseRoots(added)) {
      scanMedia(node);
      queueVisualScan(node);
    }

    if (removed.length) queueCleanup(removed);
  }

  function setupLongTaskObserver() {
    if (typeof PerformanceObserver !== 'function') return;

    try {
      const supported = PerformanceObserver.supportedEntryTypes || [];
      if (!supported.includes('longtask')) return;

      state.longTaskObserver = new PerformanceObserver(list => {
        state.longTaskCount += list.getEntries().length;
        scheduleUIUpdate();
      });

      state.longTaskObserver.observe({ entryTypes: ['longtask'] });
      state.longTaskSupported = true;
    } catch (_) {
      state.longTaskSupported = false;
      if (state.longTaskObserver) state.longTaskObserver.disconnect();
      state.longTaskObserver = null;
    }
  }

  function resourceCount() {
    try {
      return performance.getEntriesByType('resource').length;
    } catch (_) {
      return null;
    }
  }

  function collectStats() {
    let pendingVideos = 0;
    let activeVideos = 0;
    let pendingFrames = 0;
    let activeFrames = 0;
    let filteredAds = 0;
    let detachedEntries = 0;

    for (const entry of state.mediaEntries) {
      if (!entry.element || !entry.element.isConnected) {
        detachedEntries++;
        continue;
      }

      if (entry.kind === 'video') {
        if (entry.loaded) activeVideos++;
        else pendingVideos++;
      } else if (entry.loaded) {
        activeFrames++;
      } else {
        pendingFrames++;
        if (entry.isKnownAd && settings.hideKnownAds) filteredAds++;
      }
    }

    return {
      pendingVideos,
      activeVideos,
      pendingFrames,
      activeFrames,
      filteredAds,
      detachedEntries,
      cleanedEntries: state.cleanedEntries,
      resources: resourceCount(),
      longTasks: state.longTaskSupported ? String(state.longTaskCount) : 'پشتیبانی نمی‌شود'
    };
  }

  // ------------------------------------------------------------
  // Event safeguards and startup
  // ------------------------------------------------------------

  function noteUserGesture() {
    state.lastGesture = Date.now();
  }

  document.addEventListener('pointerdown', noteUserGesture, true);
  document.addEventListener('touchstart', noteUserGesture, { capture: true, passive: true });
  document.addEventListener('keydown', noteUserGesture, true);

  document.addEventListener('play', event => {
    const video = event.target;
    if (!(video instanceof HTMLVideoElement)) return;

    const entry = videoStates.get(video);
    if (entry && !entry.loaded) {
      safePause(video);
      return;
    }

    const permission = Number(video.dataset.shvAllowedPlayUntil || 0) > Date.now();
    let recentGesture = Date.now() - state.lastGesture < 2500;

    try {
      if (navigator.userActivation && navigator.userActivation.isActive) recentGesture = true;
    } catch (_) {}

    if (!recentGesture && !permission) {
      safePause(video);
      return;
    }

    if (state.emergency) {
      safePause(video);
      return;
    }

    document.querySelectorAll('video').forEach(other => {
      if (other !== video && !other.paused) safePause(other);
    });
  }, true);

  function start() {
    if (state.initialized || !document.documentElement) return;
    state.initialized = true;

    addStyle();
    applyProfile();
    scanMedia(document);
    scanVisuals(document);
    setupLongTaskObserver();

    if (document.body) createPanel();
    else document.addEventListener('DOMContentLoaded', createPanel, { once: true });

    state.observer = new MutationObserver(onMutations);
    state.observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['src', 'srcdoc', 'autoplay']
    });

    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
      const onThemeChange = () => {
        if (settings.theme === 'system') applyTheme();
      };
      if (mediaQuery.addEventListener) mediaQuery.addEventListener('change', onThemeChange);
      else if (mediaQuery.addListener) mediaQuery.addListener(onThemeChange);
    } catch (_) {}
  }

  if (document.documentElement) {
    start();
  } else {
    document.addEventListener('readystatechange', () => {
      if (document.documentElement) start();
    });
  }
})();