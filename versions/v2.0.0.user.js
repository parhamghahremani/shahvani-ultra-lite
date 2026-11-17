// ==UserScript==
// @name         Shahvani Ultra Lite
// @namespace    local.shahvani.ultralite
// @version      2.0.0
// @description  Performance profiles, tap-to-load media, conservative cleanup and manual resource release for Shahvani.
// @match        *://shahvani.com/*
// @match        *://*.shahvani.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(() => {
  'use strict';

  // ============================================================
  // Configuration
  // ============================================================

  const VERSION = '2.0.0';
  const SETTINGS_KEY = 'shvUltraLite.settings.v2';
  const VIDEO_DELAY_MS = 100;
  const SCAN_DELAY_MS = 180;

  const DEFAULT_SETTINGS = Object.freeze({
    profile: 'balanced',
    hideKnownAds: true
  });

  const PROFILE_NAMES = {
    compatible: 'سازگار',
    balanced: 'متعادل',
    ultra: 'حداکثر سبک'
  };

  // Restrict filtering to recognizable advertising hosts.
  // Unknown frames and page content are not deleted.
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

  const settings = loadSettings();

  const videoStates = new WeakMap();
  const frameStates = new WeakMap();
  const imageStates = new WeakMap();
  const scheduledVideos = new WeakSet();

  const mediaEntries = new Set();
  const pendingScanRoots = new Set();

  let initialized = false;
  let observer = null;
  let scanTimer = 0;
  let lastUserGesture = 0;

  let panel = null;
  let panelStats = null;
  let panelStatus = null;
  let profileButtons = {};
  let adToggleButton = null;

  // ============================================================
  // Settings
  // ============================================================

  function loadSettings() {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (!raw) return { ...DEFAULT_SETTINGS };

      const parsed = JSON.parse(raw);

      return {
        profile: ['compatible', 'balanced', 'ultra']
          .includes(parsed.profile)
          ? parsed.profile
          : DEFAULT_SETTINGS.profile,

        hideKnownAds:
          typeof parsed.hideKnownAds === 'boolean'
            ? parsed.hideKnownAds
            : DEFAULT_SETTINGS.hideKnownAds
      };
    } catch (_) {
      return { ...DEFAULT_SETTINGS };
    }
  }

  function saveSettings() {
    try {
      localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(settings)
      );
    } catch (_) {
      // The script still works if persistent storage is unavailable.
    }
  }

  function setStatus(message) {
    if (panelStatus) {
      panelStatus.textContent = message;
    }
  }

  function setProfile(profile) {
    if (!['compatible', 'balanced', 'ultra'].includes(profile)) {
      return;
    }

    settings.profile = profile;
    saveSettings();
    applyProfile();

    setStatus('پروفایل فعال: ' + PROFILE_NAMES[profile]);
  }

  function toggleKnownAds() {
    const wasEnabled = settings.hideKnownAds;

    settings.hideKnownAds = !wasEnabled;

    saveSettings();
    applySettings(wasEnabled);

    setStatus(
      settings.hideKnownAds
        ? 'فیلتر تبلیغات شناخته‌شده فعال شد.'
        : 'فیلتر تبلیغات شناخته‌شده غیرفعال شد.'
    );
  }

  function resetSettings() {
    let confirmed = false;

    try {
      confirmed = window.confirm(
        'تنظیمات سبک‌ساز به حالت پیش‌فرض برگردند؟\n\n' +
        'پروفایل: متعادل\n' +
        'فیلتر تبلیغات شناخته‌شده: روشن\n\n' +
        'این کار صفحه را به‌طور کامل Reload نمی‌کند.'
      );
    } catch (_) {}

    if (!confirmed) return;

    const wasHidingAds = settings.hideKnownAds;

    settings.profile = DEFAULT_SETTINGS.profile;
    settings.hideKnownAds = DEFAULT_SETTINGS.hideKnownAds;

    saveSettings();
    applySettings(wasHidingAds);

    setStatus('تنظیمات پیش‌فرض بازیابی شد.');
  }

  function applySettings(previousAdFilter) {
    applyProfile();

    if (
      !previousAdFilter &&
      settings.hideKnownAds
    ) {
      for (const entry of mediaEntries) {
        if (
          entry.kind === 'frame' &&
          entry.isKnownAd &&
          entry.loaded
        ) {
          deferLoadedFrame(entry);
        }
      }
    }

    for (const entry of mediaEntries) {
      refreshPlaceholder(entry);
    }

    updatePanel();
  }

  // ============================================================
  // CSS
  // ============================================================

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

    html.shv-ultra-mode .shv-repeated-card {
      content-visibility: auto !important;
      contain-intrinsic-size: auto 380px !important;
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
      border: 1px solid #666 !important;
      border-radius: 10px !important;
      background: #202124 !important;
      color: #fff !important;
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
      outline: 3px solid #8ab4f8 !important;
      outline-offset: 2px !important;
    }

    .shv-video-placeholder {
      aspect-ratio: 16 / 9;
    }

    .shv-media-placeholder .shv-placeholder-icon {
      position: relative !important;
      z-index: 2 !important;
      color: #fff !important;
      font: 30px/1 system-ui, sans-serif !important;
    }

    .shv-media-placeholder .shv-placeholder-label {
      position: relative !important;
      z-index: 2 !important;
      color: #fff !important;
      font: 14px/1.5 system-ui, sans-serif !important;
    }

    .shv-media-placeholder .shv-poster {
      position: absolute !important;
      inset: 0 !important;
      z-index: 1 !important;
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      opacity: .55 !important;
      pointer-events: none !important;
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
      border: 1px solid #777 !important;
      border-radius: 24px !important;
      background: #171717 !important;
      color: #fff !important;
      font: 13px/1.4 system-ui, sans-serif !important;
      direction: rtl !important;
      text-align: center !important;
      box-shadow: 0 2px 10px #0006 !important;
      cursor: pointer !important;
    }

    #shv-ultralite-panel {
      all: initial !important;
      position: fixed !important;
      right: 10px !important;
      bottom: 56px !important;
      z-index: 2147483647 !important;
      display: block !important;
      box-sizing: border-box !important;
      width: min(350px, calc(100vw - 20px)) !important;
      max-height: min(76vh, 640px) !important;
      overflow-x: hidden !important;
      overflow-y: auto !important;
      padding: 13px !important;
      border: 1px solid #777 !important;
      border-radius: 13px !important;
      background: #171717 !important;
      color: #f1f1f1 !important;
      font: 13px/1.65 system-ui, sans-serif !important;
      direction: rtl !important;
      text-align: right !important;
      box-shadow: 0 4px 18px #0008 !important;
      overscroll-behavior: contain !important;
    }

    #shv-ultralite-panel[hidden] {
      display: none !important;
    }

    #shv-ultralite-panel *,
    #shv-ultralite-panel *::before,
    #shv-ultralite-panel *::after {
      box-sizing: border-box !important;
      font-family: system-ui, sans-serif !important;
    }

    #shv-ultralite-panel .shv-title {
      display: block !important;
      margin-bottom: 7px !important;
      color: #fff !important;
      font-size: 15px !important;
      font-weight: 700 !important;
    }

    #shv-ultralite-panel .shv-desc {
      display: block !important;
      margin: 5px 0 9px !important;
      color: #ccc !important;
      font-size: 12px !important;
      line-height: 1.7 !important;
    }

    #shv-ultralite-panel .shv-section-title {
      display: block !important;
      margin: 11px 0 5px !important;
      color: #ddd !important;
      font-weight: 700 !important;
      font-size: 12px !important;
    }

    #shv-ultralite-panel .shv-button-row {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 5px !important;
      margin: 6px 0 !important;
    }

    #shv-ultralite-panel button {
      all: initial !important;
      box-sizing: border-box !important;
      display: inline-block !important;
      max-width: 100% !important;
      padding: 7px 9px !important;
      border: 1px solid #656565 !important;
      border-radius: 8px !important;
      background: #303134 !important;
      color: #fff !important;
      font: 12px/1.5 system-ui, sans-serif !important;
      text-align: center !important;
      direction: rtl !important;
      cursor: pointer !important;
      white-space: normal !important;
    }

    #shv-ultralite-panel button[aria-pressed="true"] {
      border-color: #8ab4f8 !important;
      background: #26384d !important;
      color: #fff !important;
    }

    #shv-ultralite-panel button:focus-visible {
      outline: 2px solid #8ab4f8 !important;
      outline-offset: 2px !important;
    }

    #shv-ultralite-panel .shv-stat {
      display: block !important;
      margin: 8px 0 !important;
      padding: 8px !important;
      border: 1px solid #454545 !important;
      border-radius: 8px !important;
      background: #222 !important;
      color: #eee !important;
      font-size: 12px !important;
      line-height: 1.8 !important;
      overflow-wrap: anywhere !important;
    }

    #shv-ultralite-panel .shv-status {
      display: block !important;
      margin-top: 7px !important;
      color: #c9e1ff !important;
      font-size: 12px !important;
      overflow-wrap: anywhere !important;
    }

    #shv-ultralite-panel .shv-separator {
      display: block !important;
      height: 1px !important;
      margin: 10px 0 !important;
      background: #444 !important;
    }
  `;

  function addStyle() {
    if (
      !document.documentElement ||
      document.getElementById('shv-ultralite-style')
    ) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'shv-ultralite-style';
    style.textContent = CSS;

    document.documentElement.appendChild(style);
  }

  function applyProfile() {
    const root = document.documentElement;

    if (!root) return;

    root.classList.add('shv-ultralite');

    root.classList.toggle(
      'shv-lite-effects',
      settings.profile !== 'compatible'
    );

    root.classList.toggle(
      'shv-ultra-mode',
      settings.profile === 'ultra'
    );

    if (settings.profile === 'compatible') {
      restoreAllImages();
    } else {
      optimizeAllImages();
    }

    if (settings.profile === 'ultra') {
      optimizeRepeatedCards(document);
    }

    updatePanel();
  }

  // ============================================================
  // General helpers
  // ============================================================

  function getURL(raw) {
    try {
      return new URL(raw, document.baseURI);
    } catch (_) {
      return null;
    }
  }

  function isUsableURL(raw) {
    if (typeof raw !== 'string' || !raw.trim()) {
      return false;
    }

    const s = raw.trim();

    return (
      !/^about:blank(?:#.*)?$/i.test(s) &&
      !/^javascript:/i.test(s)
    );
  }

  function isBlobURL(raw) {
    return typeof raw === 'string' && /^blob:/i.test(raw.trim());
  }

  function isKnownAdURL(raw) {
    if (!isUsableURL(raw)) return false;

    const url = getURL(raw);

    if (!url) return false;

    const host = url.hostname.toLowerCase();

    return KNOWN_AD_HOSTS.some(
      domain => host === domain || host.endsWith('.' + domain)
    );
  }

  function setOrRemoveAttribute(el, name, value) {
    if (value === null || value === undefined) {
      el.removeAttribute(name);
    } else {
      el.setAttribute(name, value);
    }
  }

  function onScreen(el) {
    if (!el || !el.isConnected) return false;

    const rect = el.getBoundingClientRect();

    return (
      rect.width > 0 &&
      rect.height > 0 &&
      rect.bottom > 0 &&
      rect.top < window.innerHeight &&
      rect.right > 0 &&
      rect.left < window.innerWidth
    );
  }

  function fullyOffScreen(el) {
    if (!el || !el.isConnected) return false;

    const rect = el.getBoundingClientRect();

    if (rect.width <= 0 || rect.height <= 0) {
      return false;
    }

    return (
      rect.bottom <= 0 ||
      rect.top >= window.innerHeight ||
      rect.right <= 0 ||
      rect.left >= window.innerWidth
    );
  }

  function safePause(video) {
    try {
      video.pause();
    } catch (_) {}
  }

  // ============================================================
  // Image optimization
  // ============================================================

  function optimizeImage(img) {
    if (
      !(img instanceof HTMLImageElement) ||
      settings.profile === 'compatible'
    ) {
      return;
    }

    if (!imageStates.has(img)) {
      imageStates.set(img, {
        loading: img.getAttribute('loading'),
        fetchpriority: img.getAttribute('fetchpriority')
      });
    }

    // Do not delay the first visible image unnecessarily.
    if (
      img.getAttribute('loading') === 'eager' &&
      onScreen(img)
    ) {
      return;
    }

    if (!onScreen(img)) {
      img.setAttribute('loading', 'lazy');
      img.setAttribute('fetchpriority', 'low');
    }
  }

  function restoreImage(img) {
    const original = imageStates.get(img);

    if (!original) return;

    setOrRemoveAttribute(img, 'loading', original.loading);
    setOrRemoveAttribute(img, 'fetchpriority', original.fetchpriority);

    imageStates.delete(img);
  }

  function restoreAllImages() {
    if (!document.images) return;

    for (const img of document.images) {
      restoreImage(img);
    }
  }

  function optimizeAllImages() {
    if (!document.images) return;

    for (const img of document.images) {
      optimizeImage(img);
    }
  }

  // ============================================================
  // Repeated content optimization
  // ============================================================

  function cardSignature(el) {
    const classes =
      typeof el.className === 'string'
        ? el.className
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .sort()
            .slice(0, 5)
            .join('.')
        : '';

    return el.tagName + '|' + classes;
  }

  function optimizeRepeatedCards(root) {
    if (
      settings.profile !== 'ultra' ||
      !root ||
      !root.querySelectorAll
    ) {
      return;
    }

    const candidates = [];

    if (
      root instanceof Element &&
      root.matches('main, section, article, ul, ol, div, [role="list"]')
    ) {
      candidates.push(root);
    }

    candidates.push(
      ...root.querySelectorAll(
        'main, section, article, ul, ol, div, [role="list"]'
      )
    );

    for (const parent of candidates) {
      if (
        !parent.isConnected ||
        parent.id === 'shv-ultralite-panel' ||
        parent.id === 'shv-ultralite-fab' ||
        parent.closest('#shv-ultralite-panel') ||
        parent.children.length < 12
      ) {
        continue;
      }

      const counts = new Map();

      for (const child of parent.children) {
        const signature = cardSignature(child);

        counts.set(
          signature,
          (counts.get(signature) || 0) + 1
        );
      }

      let bestSignature = '';
      let bestCount = 0;

      for (const [signature, count] of counts) {
        if (count > bestCount) {
          bestSignature = signature;
          bestCount = count;
        }
      }

      // Only target strongly repeated structures.
      if (
        bestCount < 8 ||
        bestCount / parent.children.length < 0.72
      ) {
        continue;
      }

      for (const child of parent.children) {
        if (
          cardSignature(child) === bestSignature &&
          !child.matches(
            'nav, header, footer, form, button, input, video, iframe'
          )
        ) {
          child.classList.add('shv-repeated-card');
        }
      }
    }
  }

  // ============================================================
  // Placeholder creation and media entries
  // ============================================================

  function makePlaceholder(entry) {
    const button = document.createElement('button');

    button.type = 'button';

    button.className =
      'shv-media-placeholder shv-' +
      entry.kind +
      '-placeholder';

    button.setAttribute('data-shv-placeholder', entry.kind);

    if (entry.kind === 'video') {
      button.style.aspectRatio = String(entry.aspectRatio || 16 / 9);

      button.style.minHeight =
        Math.max(112, Math.min(280, entry.height || 112)) + 'px';
    } else {
      button.style.aspectRatio = String(entry.aspectRatio || 16 / 9);

      button.style.minHeight =
        Math.max(112, Math.min(280, entry.height || 112)) + 'px';
    }

    const label = document.createElement('span');
    label.className = 'shv-placeholder-label';

    const glyph = document.createElement('span');
    glyph.className = 'shv-placeholder-icon';

    glyph.textContent = entry.kind === 'video' ? '▶' : '↗';

    button.append(glyph, label);

    if (
      entry.kind === 'video' &&
      entry.poster &&
      isUsableURL(entry.poster)
    ) {
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

      if (entry.loaded) return;

      if (
        entry.kind === 'frame' &&
        entry.isKnownAd &&
        settings.hideKnownAds
      ) {
        const message =
          'فیلتر تبلیغات شناخته‌شده فعال است. ' +
          'برای بازکردن این کادر، فیلتر را از پنل خاموش کن.';

        const labelEl = button.querySelector(
          '.shv-placeholder-label'
        );

        if (labelEl) {
          labelEl.textContent = message;
        }

        setStatus(message);
        return;
      }

      if (entry.kind === 'video') {
        activateVideo(entry, true);
      } else {
        activateFrame(entry);
      }
    });

    refreshPlaceholderText(entry, button);

    return button;
  }

  function refreshPlaceholderText(entry, button) {
    if (!button) return;

    const label = button.querySelector('.shv-placeholder-label');

    if (!label) return;

    if (entry.kind === 'video') {
      label.textContent = entry.released
        ? 'پلیر آزاد شده است؛ برای بارگذاری دوباره لمس کنید'
        : 'برای بارگذاری و پخش ویدئو لمس کنید';

      return;
    }

    if (entry.isKnownAd && settings.hideKnownAds) {
      label.textContent =
        'کادر تبلیغاتی شناخته‌شده فیلتر شده است. ' +
        'برای بارگذاری، فیلتر را از پنل خاموش کنید.';

      return;
    }

    label.textContent = entry.title
      ? 'برای بارگذاری این کادر (' +
        entry.title.slice(0, 65) +
        ') لمس کنید'
      : 'برای بارگذاری پلیر یا کادر جاسازی‌شده لمس کنید';
  }

  function refreshPlaceholder(entry) {
    if (
      entry &&
      entry.placeholder &&
      entry.placeholder.isConnected
    ) {
      refreshPlaceholderText(entry, entry.placeholder);
    }
  }

  function insertPlaceholder(entry) {
    const el = entry.element;

    if (!el || !el.parentNode) return;

    if (
      entry.placeholder &&
      entry.placeholder.isConnected
    ) {
      return;
    }

    entry.placeholder = makePlaceholder(entry);

    el.parentNode.insertBefore(entry.placeholder, el);
  }

  // ============================================================
  // Video deferral
  // ============================================================

  function getVideoSources(video) {
    return Array.from(video.querySelectorAll('source')).map(source => ({
      node: source,
      src: source.getAttribute('src')
    }));
  }

  function containsUnsafeBlobSource(video, sources) {
    if (video.srcObject) return true;

    if (isBlobURL(video.currentSrc)) return true;

    if (isBlobURL(video.getAttribute('src'))) return true;

    return sources.some(item => isBlobURL(item.src));
  }

  function hasUsableVideoSource(video) {
    if (isUsableURL(video.getAttribute('src'))) {
      return true;
    }

    return Array.from(video.querySelectorAll('source')).some(
      source => isUsableURL(source.getAttribute('src'))
    );
  }

  function captureVideoGeometry(video) {
    const rect = video.getBoundingClientRect();

    let ratio = 16 / 9;

    if (video.videoWidth > 0 && video.videoHeight > 0) {
      ratio = video.videoWidth / video.videoHeight;
    } else {
      const width = Number(video.getAttribute('width'));
      const height = Number(video.getAttribute('height'));

      if (width > 0 && height > 0) {
        ratio = width / height;
      } else if (rect.width > 0 && rect.height > 0) {
        ratio = rect.width / rect.height;
      }
    }

    if (!Number.isFinite(ratio) || ratio < 0.4 || ratio > 3.5) {
      ratio = 16 / 9;
    }

    return {
      aspectRatio: ratio,
      height: rect.height > 0 ? rect.height : 112,
      poster: video.getAttribute('poster')
    };
  }

  function deferVideo(video) {
    if (
      !(video instanceof HTMLVideoElement) ||
      videoStates.has(video)
    ) {
      return;
    }

    // Immediately discourage loading and stop automatic playback.
    video.removeAttribute('autoplay');
    video.preload = 'none';
    safePause(video);

    if (scheduledVideos.has(video)) {
      return;
    }

    scheduledVideos.add(video);

    window.setTimeout(() => {
      scheduledVideos.delete(video);

      if (!video.isConnected || videoStates.has(video)) {
        return;
      }

      const sources = getVideoSources(video);

      // MediaSource/blob streams are not safe to detach:
      // their object URLs may not be reproducible.
      if (containsUnsafeBlobSource(video, sources)) {
        video.removeAttribute('autoplay');
        video.preload = 'none';
        safePause(video);
        return;
      }

      if (!hasUsableVideoSource(video)) {
        // The site may attach the source later.
        return;
      }

      const geometry = captureVideoGeometry(video);

      const entry = {
        kind: 'video',
        element: video,
        loaded: false,
        released: false,
        placeholder: null,
        videoSrc: video.getAttribute('src'),
        sources: sources,
        originalPreload: video.getAttribute('preload'),
        resumeTime: 0,
        ...geometry
      };

      videoStates.set(video, entry);
      mediaEntries.add(entry);

      video.classList.add('shv-suspended-video');

      insertPlaceholder(entry);
      detachVideoSources(entry);

      updatePanel();
    }, VIDEO_DELAY_MS);
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
      if (
        item.node &&
        item.node.hasAttribute('src')
      ) {
        item.src = item.node.getAttribute('src');
        item.node.removeAttribute('src');
      }
    }

    video.removeAttribute('autoplay');
    video.preload = 'none';

    try {
      video.load();
    } catch (_) {}
  }

  function restoreVideoSources(entry) {
    const video = entry.element;

    if (!video) return;

    if (
      video.getAttribute('src') === null &&
      entry.videoSrc !== null
    ) {
      video.setAttribute('src', entry.videoSrc);
    }

    for (const item of entry.sources) {
      if (
        item.node &&
        item.node.isConnected &&
        item.src !== null &&
        item.node.getAttribute('src') === null
      ) {
        item.node.setAttribute('src', item.src);
      }
    }

    // Never restore autoplay as part of this script.
    video.removeAttribute('autoplay');
    video.preload = 'metadata';
  }

  function activateVideo(entry, playNow) {
    const video = entry.element;

    if (!video || entry.loaded) return;

    entry.loaded = true;
    entry.released = false;

    if (
      entry.placeholder &&
      entry.placeholder.isConnected
    ) {
      entry.placeholder.remove();
    }

    entry.placeholder = null;

    video.classList.remove('shv-suspended-video');

    restoreVideoSources(entry);

    const resumeTime = entry.resumeTime;
    entry.resumeTime = 0;

    try {
      video.load();
    } catch (_) {}

    // Restore the last known position after manual resource release.
    if (resumeTime > 0) {
      const restorePosition = () => {
        try {
          if (Number.isFinite(video.duration)) {
            video.currentTime = Math.min(
              resumeTime,
              Math.max(0, video.duration - 0.5)
            );
          }
        } catch (_) {}
      };

      video.addEventListener(
        'loadedmetadata',
        restorePosition,
        { once: true }
      );
    }

    if (playNow) {
      video.dataset.shvAllowedPlayUntil =
        String(Date.now() + 5000);

      try {
        const result = video.play();

        if (result && typeof result.catch === 'function') {
          result.catch(() => {
            setStatus(
              'منبع ویدئو بارگذاری شد؛ برای پخش دوباره دکمهٔ پخش را لمس کن.'
            );
          });
        }
      } catch (_) {}
    }

    updatePanel();
  }

  function manageSourceElement(source) {
    if (!(source instanceof HTMLSourceElement)) return;

    const video = source.closest('video');

    if (!video) return;

    const entry = videoStates.get(video);

    if (!entry) {
      if (source.hasAttribute('src')) {
        deferVideo(video);
      }

      return;
    }

    if (entry.loaded || !source.hasAttribute('src')) {
      return;
    }

    const src = source.getAttribute('src');

    if (isBlobURL(src)) {
      // A dynamic blob URL is best handled by the site itself.
      activateVideo(entry, false);
      return;
    }

    const existing = entry.sources.find(
      item => item.node === source
    );

    if (existing) {
      existing.src = src;
    } else {
      entry.sources.push({ node: source, src: src });
    }

    source.removeAttribute('src');
  }

  // ============================================================
  // Iframe and embedded-player deferral
  // ============================================================

  function getFrameSource(frame) {
    const candidates = [
      ['src', frame.getAttribute('src')],
      ['data-src', frame.getAttribute('data-src')],
      ['data-lazy-src', frame.getAttribute('data-lazy-src')]
    ];

    return candidates.find(([, value]) => isUsableURL(value)) || null;
  }

  function captureFrameGeometry(frame) {
    const rect = frame.getBoundingClientRect();

    let ratio = 16 / 9;

    if (rect.width > 0 && rect.height > 0) {
      ratio = rect.width / rect.height;
    }

    if (!Number.isFinite(ratio) || ratio < 0.4 || ratio > 3.5) {
      ratio = 16 / 9;
    }

    return {
      aspectRatio: ratio,
      height: rect.height > 0 ? rect.height : 112
    };
  }

  function deferFrame(frame) {
    if (
      !(frame instanceof HTMLIFrameElement) ||
      frameStates.has(frame) ||
      frame.hasAttribute('srcdoc')
    ) {
      return;
    }

    const sourceInfo = getFrameSource(frame);

    if (!sourceInfo) return;

    const [sourceAttr, source] = sourceInfo;
    const geometry = captureFrameGeometry(frame);

    const entry = {
      kind: 'frame',
      element: frame,
      loaded: false,
      released: false,
      placeholder: null,
      src: source,
      sourceAttr,
      title: (frame.getAttribute('title') || '').trim(),
      isKnownAd: isKnownAdURL(source),
      originalLoading: frame.getAttribute('loading'),
      ...geometry
    };

    frameStates.set(frame, entry);
    mediaEntries.add(entry);

    frame.classList.add('shv-suspended-frame');

    insertPlaceholder(entry);

    // Detach only the active source. Keep lazy-source attributes intact
    // so the site's other logic is not unnecessarily modified.
    if (isUsableURL(frame.getAttribute('src'))) {
      frame.removeAttribute('src');
    }

    frame.loading = 'lazy';

    updatePanel();
  }

  function activateFrame(entry) {
    const frame = entry.element;

    if (!frame || entry.loaded) return;

    if (
      entry.isKnownAd &&
      settings.hideKnownAds
    ) {
      setStatus(
        'برای بازکردن این کادر، فیلتر تبلیغات شناخته‌شده را خاموش کن.'
      );
      return;
    }

    entry.loaded = true;
    entry.released = false;

    if (
      entry.placeholder &&
      entry.placeholder.isConnected
    ) {
      entry.placeholder.remove();
    }

    entry.placeholder = null;

    frame.classList.remove('shv-suspended-frame');
    frame.loading = 'eager';

    if (entry.src && frame.getAttribute('src') === null) {
      frame.setAttribute('src', entry.src);
    }

    updatePanel();
  }

  function deferLoadedFrame(entry) {
    const frame = entry.element;

    if (
      !frame ||
      !frame.isConnected ||
      !entry.loaded ||
      frame.hasAttribute('srcdoc')
    ) {
      return;
    }

    const currentSrc = frame.getAttribute('src');

    if (isUsableURL(currentSrc)) {
      entry.src = currentSrc;
    }

    entry.loaded = false;
    entry.released = true;

    frame.classList.add('shv-suspended-frame');

    insertPlaceholder(entry);

    if (isUsableURL(frame.getAttribute('src'))) {
      frame.removeAttribute('src');
    }

    frame.loading = 'lazy';
  }

  // ============================================================
  // Manual resource release
  // ============================================================

  function snapshotLoadedVideoSources(entry) {
    const video = entry.element;

    if (!video || video.srcObject) return false;

    if (
      isBlobURL(video.currentSrc) ||
      isBlobURL(video.getAttribute('src'))
    ) {
      return false;
    }

    const currentSourceNodes =
      Array.from(video.querySelectorAll('source'));

    if (
      currentSourceNodes.some(source =>
        isBlobURL(source.getAttribute('src'))
      )
    ) {
      return false;
    }

    const directSrc = video.getAttribute('src');

    if (isUsableURL(directSrc)) {
      entry.videoSrc = directSrc;
    }

    for (const source of currentSourceNodes) {
      const src = source.getAttribute('src');

      if (!isUsableURL(src)) continue;

      const old = entry.sources.find(
        item => item.node === source
      );

      if (old) {
        old.src = src;
      } else {
        entry.sources.push({ node: source, src: src });
      }
    }

    return (
      isUsableURL(entry.videoSrc) ||
      entry.sources.some(item => isUsableURL(item.src))
    );
  }

  function releaseVideoEntry(entry) {
    const video = entry.element;

    if (
      !video ||
      !entry.loaded ||
      !video.paused ||
      !snapshotLoadedVideoSources(entry)
    ) {
      return false;
    }

    try {
      entry.resumeTime = Number.isFinite(video.currentTime)
        ? video.currentTime
        : 0;
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
    if (
      !entry.loaded ||
      !entry.element ||
      !fullyOffScreen(entry.element) ||
      entry.element.hasAttribute('srcdoc')
    ) {
      return false;
    }

    const frame = entry.element;
    const currentSrc = frame.getAttribute('src');

    if (isUsableURL(currentSrc)) {
      entry.src = currentSrc;
    }

    entry.loaded = false;
    entry.released = true;

    frame.classList.add('shv-suspended-frame');

    insertPlaceholder(entry);

    if (isUsableURL(frame.getAttribute('src'))) {
      frame.removeAttribute('src');
    }

    frame.loading = 'lazy';

    return true;
  }

  function releaseInactiveMedia() {
    const candidates = Array.from(mediaEntries).filter(entry => {
      if (!entry.loaded) return false;

      if (entry.kind === 'video') {
        return (
          entry.element &&
          entry.element.paused &&
          !entry.element.ended
        );
      }

      return (
        entry.kind === 'frame' &&
        entry.element &&
        fullyOffScreen(entry.element)
      );
    });

    if (candidates.length === 0) {
      setStatus(
        'مورد مناسبی برای آزادسازی پیدا نشد. ' +
        'ویدئوهای در حال پخش و iframeهای قابل‌مشاهده دست‌نخورده می‌مانند.'
      );
      return;
    }

    const videos = candidates.filter(
      entry => entry.kind === 'video'
    ).length;

    const frames = candidates.filter(
      entry => entry.kind === 'frame'
    ).length;

    let confirmed = false;

    try {
      confirmed = window.confirm(
        'آزادسازی دستی منابع؟\n\n' +
        'ویدئوهای مکث‌شده: ' + videos + '\n' +
        'کادرهای خارج از صفحه: ' + frames + '\n\n' +
        'ویدئوی استاندارد معمولاً با موقعیت قبلی قابل‌بازیابی است. ' +
        'وضعیت بعضی پلیرهای iframe ممکن است پس از بارگذاری مجدد از بین برود.'
      );
    } catch (_) {}

    if (!confirmed) return;

    let releasedVideos = 0;
    let releasedFrames = 0;

    for (const entry of candidates) {
      if (entry.kind === 'video') {
        if (releaseVideoEntry(entry)) {
          releasedVideos++;
        }
      } else if (entry.kind === 'frame') {
        if (releaseFrameEntry(entry)) {
          releasedFrames++;
        }
      }
    }

    setStatus(
      'منابع آزادشده — ویدئو: ' +
      releasedVideos +
      '، کادر خارج از صفحه: ' +
      releasedFrames +
      '.'
    );

    updatePanel();
  }

  // ============================================================
  // Batch media operations
  // ============================================================

  function isEligiblePending(entry) {
    if (
      entry.loaded ||
      !entry.placeholder ||
      !entry.placeholder.isConnected
    ) {
      return false;
    }

    if (
      entry.kind === 'frame' &&
      entry.isKnownAd &&
      settings.hideKnownAds
    ) {
      return false;
    }

    return true;
  }

  function activateEntryWithoutPlaying(entry) {
    if (entry.kind === 'video') {
      activateVideo(entry, false);
    } else {
      activateFrame(entry);
    }
  }

  function loadVisiblePlayers() {
    const visible = Array.from(mediaEntries).filter(entry =>
      isEligiblePending(entry) &&
      onScreen(entry.placeholder)
    );

    for (const entry of visible) {
      activateEntryWithoutPlaying(entry);
    }

    setStatus(
      visible.length
        ? 'پلیرهای قابل‌مشاهده بارگذاری شدند؛ پخش ویدئو را در صورت نیاز شروع کن.'
        : 'پلیر بارگذاری‌نشده‌ای در محدودهٔ دید پیدا نشد.'
    );

    updatePanel();
  }

  function loadAllPendingPlayers() {
    const pending = Array.from(mediaEntries).filter(
      isEligiblePending
    );

    if (!pending.length) {
      setStatus('پلیر بارگذاری‌نشده‌ای برای فعال‌سازی وجود ندارد.');
      return;
    }

    let confirmed = false;

    try {
      confirmed = window.confirm(
        'بارگذاری ' + pending.length + ' پلیر بارگذاری‌نشده؟\n\n' +
        'این کار ممکن است مصرف رم و اینترنت را افزایش دهد. ' +
        'برای کاهش فشار گوشی، بهتر است فقط پلیرهای لازم را باز کنی.'
      );
    } catch (_) {}

    if (!confirmed) return;

    for (const entry of pending) {
      activateEntryWithoutPlaying(entry);
    }

    setStatus(
      'درخواست بارگذاری برای ' +
      pending.length +
      ' پلیر ارسال شد؛ ویدئوها خودکار پخش نمی‌شوند.'
    );

    updatePanel();
  }

  function pauseAllVideos() {
    let paused = 0;

    document.querySelectorAll('video').forEach(video => {
      if (!video.paused) {
        safePause(video);
        paused++;
      }
    });

    setStatus(
      'تعداد ویدئوهای HTML مکث‌شده: ' +
      paused +
      '. کنترل پخش iframeهای خارجی از بیرون قابل‌تضمین نیست.'
    );

    updatePanel();
  }

  // ============================================================
  // Panel
  // ============================================================

  function makePanelButton(text, action) {
    const button = document.createElement('button');

    button.type = 'button';
    button.textContent = text;

    button.addEventListener('click', action);

    return button;
  }

  function makeSectionTitle(text) {
    const el = document.createElement('div');

    el.className = 'shv-section-title';
    el.textContent = text;

    return el;
  }

  function makeSeparator() {
    const el = document.createElement('div');
    el.className = 'shv-separator';

    return el;
  }

  function createPanel() {
    if (
      !document.body ||
      document.getElementById('shv-ultralite-fab')
    ) {
      return;
    }

    const fab = document.createElement('button');

    fab.id = 'shv-ultralite-fab';
    fab.type = 'button';
    fab.textContent = '⚡ سبک‌ساز';
    fab.setAttribute('aria-expanded', 'false');

    panel = document.createElement('div');
    panel.id = 'shv-ultralite-panel';
    panel.hidden = true;

    const heading = document.createElement('strong');

    heading.className = 'shv-title';
    heading.textContent = 'Shahvani Ultra Lite ' + VERSION;

    const description = document.createElement('div');

    description.className = 'shv-desc';
    description.textContent =
      'بارگذاری رسانه‌ها با لمس، تنظیم عملکرد صفحه و آزادسازی دستی منابع. ' +
      'حالت‌ها فقط نحوهٔ بهینه‌سازی را تغییر می‌دهند؛ رسانه‌ها همچنان با لمس باز می‌شوند.';

    panel.append(heading, description);

    // Profiles
    panel.append(makeSectionTitle('پروفایل عملکرد'));

    const profileRow = document.createElement('div');
    profileRow.className = 'shv-button-row';

    for (const profile of [
      'compatible',
      'balanced',
      'ultra'
    ]) {
      const button = makePanelButton(
        PROFILE_NAMES[profile],
        () => setProfile(profile)
      );

      button.setAttribute('aria-pressed', 'false');

      profileButtons[profile] = button;

      profileRow.append(button);
    }

    panel.append(profileRow);

    const profileDescription = document.createElement('div');

    profileDescription.className = 'shv-desc';
    profileDescription.textContent =
      'سازگار: تغییرات ظاهری کمتر. متعادل: افکت کمتر و تصاویر تنبل. ' +
      'حداکثر سبک: بهینه‌سازی اضافی کارت‌های تکراری.';

    panel.append(profileDescription, makeSeparator());

    // Cleanup
    panel.append(makeSectionTitle('پاک‌سازی محافظه‌کارانه'));

    adToggleButton = makePanelButton(
      '',
      toggleKnownAds
    );

    panel.append(adToggleButton);

    const cleanupNote = document.createElement('div');

    cleanupNote.className = 'shv-desc';
    cleanupNote.textContent =
      'فقط دامنه‌های شناخته‌شدهٔ تبلیغاتی فیلتر می‌شوند. ' +
      'این تنظیمات تمام تبلیغات یا اسکریپت‌های سایت را مسدود نمی‌کند.';

    panel.append(cleanupNote, makeSeparator());

    // Stats
    panel.append(makeSectionTitle('وضعیت رسانه‌ها'));

    panelStats = document.createElement('div');
    panelStats.className = 'shv-stat';

    panel.append(panelStats, makeSeparator());

    // Group loading
    panel.append(makeSectionTitle('بارگذاری پلیرها'));

    panel.append(
      makePanelButton(
        'بارگذاری پلیرهای قابل‌مشاهده',
        loadVisiblePlayers
      )
    );

    panel.append(
      makePanelButton(
        'بارگذاری همهٔ پلیرهای معوق',
        loadAllPendingPlayers
      )
    );

    panel.append(makeSeparator());

    // Playback and resource release
    panel.append(makeSectionTitle('مدیریت منابع'));

    const resourceRow = document.createElement('div');
    resourceRow.className = 'shv-button-row';

    resourceRow.append(
      makePanelButton(
        'مکث همهٔ ویدئوها',
        pauseAllVideos
      )
    );

    resourceRow.append(
      makePanelButton(
        'آزادسازی منابع غیرفعال',
        releaseInactiveMedia
      )
    );

    panel.append(resourceRow);

    const resourceNote = document.createElement('div');

    resourceNote.className = 'shv-desc';
    resourceNote.textContent =
      'فقط ویدئوهای مکث‌شده و iframeهای کاملاً خارج از صفحه نامزد آزادسازی هستند. ' +
      'بعضی پلیرهای اختصاصی ممکن است هنگام فعال‌سازی دوباره وضعیت قبلی را بازیابی نکنند.';

    panel.append(resourceNote, makeSeparator());

    // Reset
    panel.append(
      makePanelButton(
        'بازگردانی تنظیمات پیش‌فرض',
        resetSettings
      )
    );

    panelStatus = document.createElement('div');
    panelStatus.className = 'shv-status';
    panelStatus.textContent = 'سبک‌ساز فعال است.';

    panel.append(panelStatus);

    fab.addEventListener('click', () => {
      panel.hidden = !panel.hidden;

      fab.setAttribute(
        'aria-expanded',
        String(!panel.hidden)
      );

      updatePanel();
    });

    document.body.append(fab, panel);

    updatePanel();
  }

  function updatePanel() {
    for (const profile of [
      'compatible',
      'balanced',
      'ultra'
    ]) {
      const button = profileButtons[profile];

      if (button) {
        button.setAttribute(
          'aria-pressed',
          String(settings.profile === profile)
        );
      }
    }

    if (adToggleButton) {
      adToggleButton.textContent =
        'فیلتر تبلیغات شناخته‌شده: ' +
        (settings.hideKnownAds ? 'روشن' : 'خاموش');

      adToggleButton.setAttribute(
        'aria-pressed',
        String(settings.hideKnownAds)
      );
    }

    if (!panelStats) return;

    let pendingVideos = 0;
    let loadedVideos = 0;
    let pendingFrames = 0;
    let loadedFrames = 0;
    let filteredAds = 0;

    for (const entry of mediaEntries) {
      if (entry.kind === 'video') {
        if (entry.loaded) {
          loadedVideos++;
        } else {
          pendingVideos++;
        }
      } else {
        if (entry.loaded) {
          loadedFrames++;
        } else {
          pendingFrames++;

          if (
            entry.isKnownAd &&
            settings.hideKnownAds
          ) {
            filteredAds++;
          }
        }
      }
    }

    panelStats.textContent =
      'پروفایل: ' + PROFILE_NAMES[settings.profile] + '\n' +
      'ویدئوهای معوق: ' + pendingVideos + '\n' +
      'ویدئوهای فعال‌شده: ' + loadedVideos + '\n' +
      'کادرهای معوق: ' + pendingFrames + '\n' +
      'کادرهای فعال‌شده: ' + loadedFrames + '\n' +
      'کادرهای تبلیغاتی فیلترشده: ' + filteredAds;
  }

  // ============================================================
  // DOM scanning
  // ============================================================

  function scanMedia(root) {
    if (!root) return;

    if (root instanceof HTMLVideoElement) {
      deferVideo(root);
    } else if (root instanceof HTMLIFrameElement) {
      deferFrame(root);
    } else if (root instanceof HTMLSourceElement) {
      manageSourceElement(root);
    }

    if (!root.querySelectorAll) return;

    root.querySelectorAll('video').forEach(deferVideo);
    root.querySelectorAll('iframe').forEach(deferFrame);
    root.querySelectorAll('source').forEach(manageSourceElement);
  }

  function scanVisuals(root) {
    if (!root) return;

    if (root instanceof HTMLImageElement) {
      optimizeImage(root);
    }

    if (root.querySelectorAll) {
      root.querySelectorAll('img').forEach(optimizeImage);
    }

    if (settings.profile === 'ultra') {
      optimizeRepeatedCards(root);
    }
  }

  function scanTree(root) {
    scanMedia(root);
    scanVisuals(root);
  }

  function queueVisualScan(node) {
    if (!(node instanceof Element)) return;

    pendingScanRoots.add(node);

    if (node.parentElement) {
      pendingScanRoots.add(node.parentElement);
    }

    if (scanTimer) return;

    scanTimer = window.setTimeout(() => {
      scanTimer = 0;

      const roots = Array.from(pendingScanRoots);
      pendingScanRoots.clear();

      for (const root of roots) {
        scanVisuals(root);
      }
    }, SCAN_DELAY_MS);
  }

  function handleAttributeChange(target, attributeName) {
    if (target instanceof HTMLIFrameElement) {
      const entry = frameStates.get(target);

      if (entry) {
        if (
          !entry.loaded &&
          attributeName === 'src' &&
          isUsableURL(target.getAttribute('src'))
        ) {
          // If the site attempts to navigate a deferred frame,
          // retain the new URL without starting it.
          entry.src = target.getAttribute('src');
          target.removeAttribute('src');
        }

        return;
      }

      if (attributeName === 'src') {
        deferFrame(target);
      }

      return;
    }

    if (target instanceof HTMLVideoElement) {
      if (attributeName === 'autoplay') {
        target.removeAttribute('autoplay');
        safePause(target);
      }

      const entry = videoStates.get(target);

      if (entry) {
        if (
          !entry.loaded &&
          attributeName === 'src' &&
          isUsableURL(target.getAttribute('src'))
        ) {
          const src = target.getAttribute('src');

          if (isBlobURL(src)) {
            activateVideo(entry, false);
          } else {
            entry.videoSrc = src;
            target.removeAttribute('src');
          }
        }

        return;
      }

      if (attributeName === 'src') {
        deferVideo(target);
      }

      return;
    }

    if (target instanceof HTMLSourceElement) {
      manageSourceElement(target);
    }
  }

  // ============================================================
  // Prevent accidental automatic playback
  // ============================================================

  function noteUserGesture() {
    lastUserGesture = Date.now();
  }

  document.addEventListener(
    'pointerdown',
    noteUserGesture,
    true
  );

  document.addEventListener(
    'touchstart',
    noteUserGesture,
    { capture: true, passive: true }
  );

  document.addEventListener(
    'keydown',
    noteUserGesture,
    true
  );

  document.addEventListener(
    'play',
    event => {
      const video = event.target;

      if (!(video instanceof HTMLVideoElement)) return;

      const entry = videoStates.get(video);

      if (entry && !entry.loaded) {
        safePause(video);
        return;
      }

      let activationIsRecent =
        Date.now() - lastUserGesture < 2500;

      const explicitPermission = Number(
        video.dataset.shvAllowedPlayUntil || 0
      ) > Date.now();

      try {
        if (
          navigator.userActivation &&
          navigator.userActivation.isActive
        ) {
          activationIsRecent = true;
        }
      } catch (_) {}

      if (!activationIsRecent && !explicitPermission) {
        safePause(video);
        return;
      }

      // Keep simultaneous HTML video playback to a minimum.
      document.querySelectorAll('video').forEach(other => {
        if (other !== video && !other.paused) {
          safePause(other);
        }
      });
    },
    true
  );

  // ============================================================
  // Initialization
  // ============================================================

  function start() {
    if (initialized || !document.documentElement) return;

    initialized = true;

    addStyle();
    applyProfile();
    scanTree(document);

    if (document.body) {
      createPanel();
    } else {
      document.addEventListener(
        'DOMContentLoaded',
        createPanel,
        { once: true }
      );
    }

    observer = new MutationObserver(records => {
      for (const record of records) {
        if (record.type === 'childList') {
          for (const node of record.addedNodes) {
            if (!(node instanceof Element)) continue;

            // Handle media immediately so new iframes do not
            // wait for the visual scanning batch.
            scanMedia(node);
            queueVisualScan(node);
          }
        } else if (record.type === 'attributes') {
          handleAttributeChange(
            record.target,
            record.attributeName
          );
        }
      }
    });

    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['src', 'autoplay']
    });

    window.addEventListener(
      'load',
      () => scanTree(document),
      { once: true, passive: true }
    );
  }

  if (document.documentElement) {
    start();
  } else {
    document.addEventListener(
      'readystatechange',
      () => {
        if (document.documentElement) start();
      },
      { once: true }
    );
  }
})();