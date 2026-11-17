// ==UserScript==
// @name         Shahvani Ultra Lite (Android-friendly)
// @namespace    local.shahvani.ultralite
// @version      1.0.0
// @description  Reduce initial memory/CPU use on shahvani.com while keeping page text, images, links, and media individually accessible.
// @match        https://shahvani.com/*
// @match        https://www.shahvani.com/*
// @match        http://shahvani.com/*
// @match        http://www.shahvani.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(() => {
  'use strict';

  const VERSION = '1.0.0';
  const VIDEO_DELAY_MS = 350;
  const SCAN_DELAY_MS = 450;
  const state = {
    deferredVideos: 0,
    deferredFrames: 0,
    removedAdFrames: 0,
    loadedVideos: 0,
    loadedFrames: 0,
    panel: null,
    stats: null,
    scanTimer: 0,
    pendingNodes: new Set(),
    reducedEffects: true,
    mediaSuspension: true
  };

  const videoStates = new WeakMap();
  const frameStates = new WeakMap();
  const adHosts = [
    'doubleclick.net', 'googlesyndication.com', 'googleadservices.com',
    'adnxs.com', 'adsystem.com', 'advertising.com', 'taboola.com',
    'outbrain.com', 'popads.net', 'propellerads.com', 'exoclick.com',
    'juicyads.com', 'trafficjunky.net', 'adsterra.com', 'pushground.com'
  ];

  const css = `
    html.shv-ultralite *, html.shv-ultralite *::before, html.shv-ultralite *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
      scroll-behavior: auto !important;
      caret-color: auto !important;
    }
    html.shv-ultralite * { -webkit-tap-highlight-color: transparent; }
    html.shv-ultralite .shv-suspended-video,
    html.shv-ultralite .shv-suspended-frame { display: none !important; }
    .shv-media-placeholder {
      box-sizing: border-box !important;
      display: flex !important;
      position: relative !important;
      align-items: center !important;
      justify-content: center !important;
      flex-direction: column !important;
      gap: 8px !important;
      width: 100% !important;
      max-width: 100% !important;
      min-height: 112px !important;
      overflow: hidden !important;
      padding: 14px !important;
      border: 1px solid rgba(150,150,150,.45) !important;
      border-radius: 10px !important;
      background: #202124 !important;
      color: #fff !important;
      text-align: center !important;
      font: 14px/1.5 system-ui, sans-serif !important;
      white-space: normal !important;
      cursor: pointer !important;
      z-index: 1 !important;
      text-shadow: none !important;
      box-shadow: none !important;
    }
    .shv-media-placeholder:focus-visible { outline: 3px solid #8ab4f8 !important; outline-offset: 2px !important; }
    .shv-video-placeholder { aspect-ratio: 16 / 9 !important; }
    .shv-video-placeholder .shv-poster {
      position: absolute !important; inset: 0 !important; width: 100% !important; height: 100% !important;
      object-fit: cover !important; opacity: .58 !important; z-index: 0 !important;
    }
    .shv-media-placeholder .shv-placeholder-label,
    .shv-media-placeholder .shv-placeholder-icon { position: relative !important; z-index: 1 !important; }
    .shv-media-placeholder .shv-placeholder-icon { font-size: 28px !important; line-height: 1 !important; }
    #shv-ultralite-fab {
      position: fixed !important; right: 10px !important; bottom: 12px !important;
      z-index: 2147483647 !important; border: 1px solid #777 !important; border-radius: 22px !important;
      padding: 8px 12px !important; background: #171717 !important; color: #fff !important;
      font: 12px/1.3 system-ui, sans-serif !important; box-shadow: 0 2px 10px #0005 !important;
      opacity: .92 !important; cursor: pointer !important; direction: rtl !important;
    }
    #shv-ultralite-panel {
      position: fixed !important; right: 10px !important; bottom: 54px !important;
      z-index: 2147483647 !important; width: min(310px, calc(100vw - 20px)) !important;
      box-sizing: border-box !important; padding: 12px !important; border: 1px solid #777 !important;
      border-radius: 12px !important; background: #171717 !important; color: #f3f3f3 !important;
      font: 13px/1.65 system-ui, sans-serif !important; direction: rtl !important;
      box-shadow: 0 4px 18px #0007 !important;
    }
    #shv-ultralite-panel[hidden] { display: none !important; }
    #shv-ultralite-panel button {
      border: 1px solid #777 !important; border-radius: 8px !important; padding: 7px 9px !important;
      background: #303134 !important; color: #fff !important; font: inherit !important; margin: 4px 0 0 4px !important;
    }
    #shv-ultralite-panel .shv-small { color: #d0d0d0 !important; font-size: 12px !important; }
    @supports (content-visibility: auto) {
      html.shv-ultralite .shv-repeated-card { content-visibility: auto !important; contain-intrinsic-size: auto 380px !important; }
    }
  `;

  function addStyle() {
    if (!document.documentElement || document.getElementById('shv-ultralite-style')) return;
    const style = document.createElement('style');
    style.id = 'shv-ultralite-style';
    style.textContent = css;
    document.documentElement.appendChild(style);
    document.documentElement.classList.add('shv-ultralite');
  }

  function getURL(raw) {
    try { return new URL(raw, document.baseURI); } catch (_) { return null; }
  }

  function isKnownAdURL(raw) {
    const url = getURL(raw || '');
    if (!url) return false;
    const host = url.hostname.toLowerCase();
    return adHosts.some(domain => host === domain || host.endsWith('.' + domain));
  }

  function isRealURL(raw) {
    if (!raw) return false;
    const s = String(raw).trim();
    if (!s || /^about:blank(?:#.*)?$/i.test(s) || /^javascript:/i.test(s)) return false;
    return true;
  }

  function setText(el, value) {
    el.textContent = value;
  }

  function makePlaceholder(kind, label, icon) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'shv-media-placeholder shv-' + kind + '-placeholder';
    button.setAttribute('data-shv-placeholder', kind);
    button.setAttribute('aria-label', label);
    const glyph = document.createElement('span');
    glyph.className = 'shv-placeholder-icon';
    glyph.textContent = icon;
    const caption = document.createElement('span');
    caption.className = 'shv-placeholder-label';
    caption.textContent = label;
    button.append(glyph, caption);
    return button;
  }

  function getVideoSources(video) {
    return Array.from(video.querySelectorAll('source')).map(source => ({
      node: source,
      src: source.getAttribute('src')
    }));
  }

  function isBlobBased(video, sourceInfo) {
    const candidates = [video.getAttribute('src'), video.currentSrc, ...sourceInfo.map(s => s.src)];
    return candidates.some(src => typeof src === 'string' && /^blob:/i.test(src));
  }

  function setSourceOff(video, saved) {
    // If a player switches to a blob/MSE stream, never strip it: it may not be restorable.
    const candidates = [video.getAttribute('src'), ...Array.from(video.querySelectorAll('source')).map(s => s.getAttribute('src'))];
    if (candidates.some(src => typeof src === 'string' && /^blob:/i.test(src))) {
      saved.loaded = true;
      activateVideo(video, saved, false);
      return false;
    }
    const currentVideoSrc = video.getAttribute('src');
    if (currentVideoSrc !== null) {
      saved.videoSrc = currentVideoSrc;
      video.removeAttribute('src');
    }
    for (const source of video.querySelectorAll('source')) {
      const src = source.getAttribute('src');
      if (src !== null) {
        const existing = saved.sources.find(item => item.node === source);
        if (existing) existing.src = src;
        else saved.sources.push({ node: source, src });
        source.removeAttribute('src');
      }
    }
    try { video.pause(); } catch (_) {}
    video.preload = 'none';
    try { video.load(); } catch (_) {}
    return true;
  }

  function restoreVideoSources(video, saved) {
    // Restore only attributes this script removed; never overwrite a newer site-created URL.
    if (video.getAttribute('src') === null && saved.videoSrc !== null) {
      video.setAttribute('src', saved.videoSrc);
    }
    for (const item of saved.sources) {
      if (item.node && item.src !== null && item.node.getAttribute('src') === null) {
        item.node.setAttribute('src', item.src);
      }
    }
    // Deliberately do not restore autoplay: activation must remain user-initiated.
    video.removeAttribute('autoplay');
    video.preload = 'metadata';
  }

  function activateVideo(video, saved, playNow) {
    if (!saved || saved.loaded) return;
    saved.loaded = true;
    state.loadedVideos++;
    if (saved.placeholder && saved.placeholder.isConnected) saved.placeholder.remove();
    video.classList.remove('shv-suspended-video');
    restoreVideoSources(video, saved);
    try { video.load(); } catch (_) {}
    updateStats();
    if (playNow) {
      video.dataset.shvUserActivated = '1';
      const maybePromise = video.play();
      if (maybePromise && typeof maybePromise.catch === 'function') maybePromise.catch(() => {});
    }
  }

  function deferVideo(video) {
    if (!(video instanceof HTMLVideoElement) || video.dataset.shvLiteScheduled || videoStates.has(video)) return;
    video.dataset.shvLiteScheduled = '1';
    // Reduce early buffering while retaining the source attributes until the player has initialized.
    try { video.pause(); } catch (_) {}
    video.preload = 'none';
    video.removeAttribute('autoplay');
    window.setTimeout(() => {
      if (!video.isConnected || videoStates.has(video) || !state.mediaSuspension) {
        delete video.dataset.shvLiteScheduled;
        return;
      }
      const sourceInfo = getVideoSources(video);
      if (video.srcObject || isBlobBased(video, sourceInfo)) {
        video.preload = 'none';
        video.removeAttribute('autoplay');
        try { video.pause(); } catch (_) {}
        return;
      }
      const directSrc = video.getAttribute('src');
      const hasUsableSource = isRealURL(directSrc) || sourceInfo.some(item => isRealURL(item.src));
      if (!hasUsableSource) {
        video.preload = 'none';
        video.removeAttribute('autoplay');
        try { video.pause(); } catch (_) {}
        // A player may attach its source later; let the mutation observer schedule another pass.
        delete video.dataset.shvLiteScheduled;
        return;
      }

      const poster = video.getAttribute('poster');
      const rect = video.getBoundingClientRect();
      let ratio = 16 / 9;
      if (video.videoWidth > 0 && video.videoHeight > 0) ratio = video.videoWidth / video.videoHeight;
      else if (Number(video.getAttribute('width')) > 0 && Number(video.getAttribute('height')) > 0) {
        ratio = Number(video.getAttribute('width')) / Number(video.getAttribute('height'));
      } else if (rect.width > 0 && rect.height > 0) ratio = rect.width / rect.height;
      if (!Number.isFinite(ratio) || ratio < 0.4 || ratio > 3.5) ratio = 16 / 9;

      const saved = {
        videoSrc: directSrc,
        sources: sourceInfo,
        originalPreload: video.getAttribute('preload'),
        placeholder: null,
        loaded: false
      };
      const placeholder = makePlaceholder('video', 'برای بارگذاری و پخش این ویدئو لمس کنید', '▶');
      placeholder.style.aspectRatio = String(ratio);
      placeholder.style.minHeight = rect.height > 0 ? Math.min(260, Math.max(112, Math.round(rect.height))) + 'px' : '112px';
      if (poster && isRealURL(poster)) {
        const img = document.createElement('img');
        img.className = 'shv-poster';
        img.alt = '';
        img.loading = 'lazy';
        img.decoding = 'async';
        img.src = poster;
        placeholder.prepend(img);
      }
      saved.placeholder = placeholder;
      videoStates.set(video, saved);
      video.classList.add('shv-suspended-video');
      video.removeAttribute('autoplay');
      video.parentNode && video.parentNode.insertBefore(placeholder, video);
      const detached = setSourceOff(video, saved);
      if (!detached) return;
      state.deferredVideos++;
      placeholder.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        activateVideo(video, saved, true);
      }, { once: true });
      updateStats();
    }, VIDEO_DELAY_MS);
  }

  function activateFrame(frame, saved) {
    if (!saved || saved.loaded) return;
    saved.loaded = true;
    state.loadedFrames++;
    if (saved.placeholder && saved.placeholder.isConnected) saved.placeholder.remove();
    frame.classList.remove('shv-suspended-frame');
    if (frame.getAttribute('src') === null && saved.src !== null) frame.setAttribute('src', saved.src);
    frame.loading = 'eager';
    updateStats();
  }

  function deferFrame(frame) {
    if (!(frame instanceof HTMLIFrameElement) || frame.dataset.shvLiteDone || frameStates.has(frame)) return;
    const rawSrc = frame.getAttribute('src');
    if (!isRealURL(rawSrc) || frame.hasAttribute('srcdoc')) return;
    if (isKnownAdURL(rawSrc)) {
      frame.dataset.shvKnownAd = '1';
      frame.remove();
      state.removedAdFrames++;
      updateStats();
      return;
    }
    if (!state.mediaSuspension) {
      frame.loading = 'lazy';
      return;
    }
    frame.dataset.shvLiteDone = '1';
    const saved = { src: rawSrc, placeholder: null, loaded: false };
    const title = (frame.getAttribute('title') || '').trim();
    const label = title
      ? 'برای بارگذاری این کادر (' + title.slice(0, 70) + ') لمس کنید'
      : 'برای بارگذاری پلیر یا محتوای جاسازی‌شده لمس کنید';
    const placeholder = makePlaceholder('frame', label, '↗');
    const rect = frame.getBoundingClientRect();
    placeholder.style.aspectRatio = rect.width > 0 && rect.height > 0 ? String(rect.width / rect.height) : '16 / 9';
    placeholder.style.minHeight = rect.height > 0 ? Math.min(280, Math.max(112, Math.round(rect.height))) + 'px' : '112px';
    saved.placeholder = placeholder;
    frameStates.set(frame, saved);
    frame.classList.add('shv-suspended-frame');
    frame.parentNode && frame.parentNode.insertBefore(placeholder, frame);
    // Removing the source prevents the embedded page and its scripts from using memory before a tap.
    frame.removeAttribute('src');
    frame.loading = 'lazy';
    placeholder.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      activateFrame(frame, saved);
    }, { once: true });
    state.deferredFrames++;
    updateStats();
  }

  function optimizeImage(img) {
    if (!(img instanceof HTMLImageElement) || img.dataset.shvLiteImg) return;
    img.dataset.shvLiteImg = '1';
    try { img.decoding = 'async'; } catch (_) {}
    const rect = img.getBoundingClientRect();
    // Keep images around/above the first screen eager; defer only clearly off-screen images.
    if (rect.top > window.innerHeight * 1.15 || rect.bottom < -window.innerHeight) {
      img.loading = 'lazy';
      try { img.setAttribute('fetchpriority', 'low'); } catch (_) {}
    }
  }

  function optimizeRepeatedCards(root) {
    if (!('contentVisibility' in document.documentElement.style)) return;
    const parents = [];
    if (root instanceof Element) parents.push(root);
    if (root.querySelectorAll) parents.push(...root.querySelectorAll('main, section, article, ul, ol, div'));
    for (const parent of parents) {
      if (!parent.isConnected || parent.children.length < 12) continue;
      const children = Array.from(parent.children);
      const signature = el => el.tagName + '|' + (typeof el.className === 'string' ? el.className.trim().split(/\s+/).filter(Boolean).sort().slice(0, 4).join('.') : '');
      const counts = new Map();
      for (const child of children) {
        const key = signature(child);
        counts.set(key, (counts.get(key) || 0) + 1);
      }
      let best = null;
      for (const [key, count] of counts) if (!best || count > best.count) best = { key, count };
      if (!best || best.count / children.length < 0.72) continue;
      for (const child of children) {
        if (signature(child) === best.key && !child.matches('nav, header, footer, form, button, input, video, iframe')) {
          child.classList.add('shv-repeated-card');
        }
      }
    }
  }

  function scanTree(root, doCardOptimization = true) {
    if (!root) return;
    if (root.nodeType === Node.ELEMENT_NODE) {
      const el = root;
      if (el.matches('img')) optimizeImage(el);
      if (el.matches('video')) deferVideo(el);
      if (el.matches('iframe')) deferFrame(el);
      if (el.matches('source')) {
        const parentVideo = el.closest('video');
        if (parentVideo) {
          const saved = videoStates.get(parentVideo);
          if (!saved) deferVideo(parentVideo);
          else if (!saved.loaded && el.hasAttribute('src')) {
            const newSrc = el.getAttribute('src');
            if (/^blob:/i.test(newSrc || '')) activateVideo(parentVideo, saved, false);
            else {
              const old = saved.sources.find(item => item.node === el);
              if (old) old.src = newSrc;
              else saved.sources.push({ node: el, src: newSrc });
              el.removeAttribute('src');
            }
          }
        }
      }
    }
    if (!root.querySelectorAll) return;
    for (const img of root.querySelectorAll('img')) optimizeImage(img);
    for (const video of root.querySelectorAll('video')) deferVideo(video);
    for (const frame of root.querySelectorAll('iframe')) deferFrame(frame);
    if (doCardOptimization) optimizeRepeatedCards(root);
  }

  function queueScan(node) {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return;
    state.pendingNodes.add(node);
    if (state.scanTimer) return;
    state.scanTimer = window.setTimeout(() => {
      state.scanTimer = 0;
      const nodes = Array.from(state.pendingNodes);
      state.pendingNodes.clear();
      for (const item of nodes) scanTree(item, false);
    }, SCAN_DELAY_MS);
  }

  function updateStats() {
    if (!state.stats) return;
    setText(state.stats, `ویدئوهای معوق: ${state.deferredVideos} | کادرهای معوق: ${state.deferredFrames} | تبلیغات شناخته‌شده حذف‌شده: ${state.removedAdFrames}`);
  }

  function createPanel() {
    if (!document.body || document.getElementById('shv-ultralite-fab')) return;
    const fab = document.createElement('button');
    fab.id = 'shv-ultralite-fab';
    fab.type = 'button';
    fab.textContent = '⚡ سبک‌ساز';
    fab.setAttribute('aria-expanded', 'false');

    const panel = document.createElement('div');
    panel.id = 'shv-ultralite-panel';
    panel.hidden = true;
    const heading = document.createElement('strong');
    heading.textContent = 'سبک‌ساز شهوانی ' + VERSION;
    const explanation = document.createElement('div');
    explanation.className = 'shv-small';
    explanation.textContent = 'برای جلوگیری از فشار رم، پلیرها تا زمان لمس بارگیری نمی‌شوند. هر ویدئو یا کادر را جداگانه باز کن؛ متن‌ها، تصاویر و لینک‌ها حذف نمی‌شوند.';
    const stats = document.createElement('div');
    stats.style.marginTop = '7px';
    state.stats = stats;
    const pause = document.createElement('button');
    pause.type = 'button';
    pause.textContent = 'مکث همه ویدئوها';
    pause.addEventListener('click', () => {
      document.querySelectorAll('video').forEach(video => { try { video.pause(); } catch (_) {} });
    });
    const close = document.createElement('button');
    close.type = 'button';
    close.textContent = 'بستن';
    close.addEventListener('click', () => {
      panel.hidden = true;
      fab.setAttribute('aria-expanded', 'false');
    });
    const note = document.createElement('div');
    note.className = 'shv-small';
    note.style.marginTop = '7px';
    note.textContent = 'برای بازگشت کامل به رفتار اصلی سایت، اسکریپت را در Tampermonkey خاموش و صفحه را دوباره بارگذاری کن.';
    panel.append(heading, explanation, stats, pause, close, note);
    document.body.append(fab, panel);
    state.panel = panel;
    fab.addEventListener('click', () => {
      panel.hidden = !panel.hidden;
      fab.setAttribute('aria-expanded', String(!panel.hidden));
      updateStats();
    });
    updateStats();
  }

  let lastGesture = 0;
  document.addEventListener('pointerdown', event => {
    lastGesture = Date.now();
    const target = event.target;
    if (target instanceof HTMLVideoElement) target.dataset.shvUserActivated = '1';
  }, true);
  document.addEventListener('touchstart', () => { lastGesture = Date.now(); }, { capture: true, passive: true });
  document.addEventListener('keydown', () => { lastGesture = Date.now(); }, true);
  document.addEventListener('play', event => {
    const current = event.target;
    if (!(current instanceof HTMLVideoElement)) return;
    const isUserStarted = current.dataset.shvUserActivated === '1' || Date.now() - lastGesture < 5000;
    if (!isUserStarted) {
      try { current.pause(); } catch (_) {}
      return;
    }
    document.querySelectorAll('video').forEach(other => {
      if (other !== current && !other.paused) { try { other.pause(); } catch (_) {} }
    });
  }, true);

  // Catch sources assigned after page initialization (common on lazy/custom video players).
  const observer = new MutationObserver(records => {
    for (const record of records) {
      if (record.type === 'childList') {
        for (const node of record.addedNodes) {
          if (node instanceof Element) {
            // Gate embedded players immediately; defer the broader image/card scan to a short batch.
            if (node.matches('iframe')) deferFrame(node);
            if (node.matches('video')) deferVideo(node);
            if (node.matches('source')) {
              const owner = node.closest('video');
              if (owner) deferVideo(owner);
            }
            node.querySelectorAll('iframe').forEach(deferFrame);
            node.querySelectorAll('video').forEach(deferVideo);
          }
          queueScan(node);
        }
      } else if (record.type === 'attributes') {
        const target = record.target;
        if (target instanceof HTMLIFrameElement && !frameStates.has(target)) deferFrame(target);
        if (target instanceof HTMLVideoElement) {
          const saved = videoStates.get(target);
          if (saved && !saved.loaded && target.hasAttribute('src')) {
            const newSrc = target.getAttribute('src');
            if (/^blob:/i.test(newSrc || '')) {
              activateVideo(target, saved, false);
            } else {
              saved.videoSrc = newSrc;
              target.removeAttribute('src');
            }
          } else if (!saved && target.hasAttribute('src')) {
            delete target.dataset.shvLiteScheduled;
            deferVideo(target);
          }
          if (target.hasAttribute('autoplay')) {
            target.removeAttribute('autoplay');
            try { target.pause(); } catch (_) {}
          }
        } else if (target instanceof HTMLSourceElement) {
          const video = target.closest('video');
          const savedSourceVideo = video && videoStates.get(video);
          if (savedSourceVideo && !savedSourceVideo.loaded && target.hasAttribute('src')) {
            const newSrc = target.getAttribute('src');
            if (/^blob:/i.test(newSrc || '')) activateVideo(video, savedSourceVideo, false);
            else {
              const old = savedSourceVideo.sources.find(item => item.node === target);
              if (old) old.src = newSrc;
              else savedSourceVideo.sources.push({ node: target, src: newSrc });
              target.removeAttribute('src');
            }
          } else if (video && !savedSourceVideo && target.hasAttribute('src')) {
            delete video.dataset.shvLiteScheduled;
            deferVideo(video);
          }
        }
      }
    }
  });

  function start() {
    addStyle();
    scanTree(document);
    if (document.body) createPanel();
    else document.addEventListener('DOMContentLoaded', createPanel, { once: true });
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['src', 'autoplay']
    });
    // Re-check image positions after layout settles, without repeatedly scanning the entire page.
    window.addEventListener('load', () => scanTree(document), { once: true, passive: true });
  }

  if (document.documentElement) start();
  else document.addEventListener('readystatechange', () => { if (document.documentElement) start(); }, { once: true });
})();
