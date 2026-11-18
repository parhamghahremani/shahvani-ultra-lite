// ==UserScript==
// @name         Shahvani Ultra Lite
// @namespace    local.shahvani.ultralite
// @version      3.5.3
// @description  Shahvani Ultra Lite: tap-to-load media, bilingual EN/FA, performance profiles, IndexedDB storage, theme presets, video resume, video metadata cache. Locked videos download nothing.
// @author       parham
// @homepageURL  https://github.com/parhamghahremani
// @match        *://shahvani.com/*
// @match        *://*.shahvani.com/*
// @run-at       document-start
// @grant        none
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTI4IDEyOCIgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiPjxkZWZzPjxyYWRpYWxHcmFkaWVudCBpZD0ib3JiIiBjeD0iMC40IiBjeT0iMC4zIiByPSIwLjk1Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMzYTE0NjYiLz48c3RvcCBvZmZzZXQ9IjAuNTUiIHN0b3AtY29sb3I9IiMxNzBhM2EiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwNjAyMTMiLz48L3JhZGlhbEdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0icmVkIiB4MT0iMC4xNSIgeTE9IjAiIHgyPSIwLjgiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZjdhOTIiLz48c3RvcCBvZmZzZXQ9IjAuNCIgc3RvcC1jb2xvcj0iI2ZmMWY1NSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2IwMDAyZSIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJzaWRlIiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjOGEwYTJhIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNDYwNDFhIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9InJpbmdnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZmM2IwIi8+PHN0b3Agb2Zmc2V0PSIwLjUiIHN0b3AtY29sb3I9IiNmZmM4M2QiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZjlhMWYiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iZWRnZSIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmN2FiOCIvPjxzdG9wIG9mZnNldD0iMC41IiBzdG9wLWNvbG9yPSIjOGI1Y2Y2Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjJkM2VlIi8+PC9saW5lYXJHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgaWQ9InNwZWMiIGN4PSIwLjUiIGN5PSIwLjUiIHI9IjAuNSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9IjAuOTUiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iMCIvPjwvcmFkaWFsR3JhZGllbnQ+PGZpbHRlciBpZD0iYmx1ciIgeD0iLTMwJSIgeT0iLTMwJSIgd2lkdGg9IjE2MCUiIGhlaWdodD0iMTYwJSI+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMy41Ii8+PC9maWx0ZXI+PGZpbHRlciBpZD0iYmx1cjUiIHg9Ii0zMCUiIHk9Ii0zMCUiIHdpZHRoPSIxNjAlIiBoZWlnaHQ9IjE2MCUiPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjUiLz48L2ZpbHRlcj48ZmlsdGVyIGlkPSJibHVyMTAiIHg9Ii02MCUiIHk9Ii02MCUiIHdpZHRoPSIyMjAlIiBoZWlnaHQ9IjIyMCUiPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjEwIi8+PC9maWx0ZXI+PGZpbHRlciBpZD0iZ2xvdyIgeD0iLTQwJSIgeT0iLTQwJSIgd2lkdGg9IjE4MCUiIGhlaWdodD0iMTgwJSI+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMS44IiByZXN1bHQ9ImIiLz48ZmVNZXJnZT48ZmVNZXJnZU5vZGUgaW49ImIiLz48ZmVNZXJnZU5vZGUgaW49IlNvdXJjZUdyYXBoaWMiLz48L2ZlTWVyZ2U+PC9maWx0ZXI+PGNsaXBQYXRoIGlkPSJvY2xpcCI+PGNpcmNsZSBjeD0iNjQiIGN5PSI2NCIgcj0iNTYiLz48L2NsaXBQYXRoPjxwYXRoIGlkPSJoZWFydCIgZD0iTTY0IDExNiBDMTYgODQgNiA1NCA2IDM4IEM2IDIyIDE4IDEwIDM0IDEwIEM0NyAxMCA1OCAxNyA2NCAyOSBDNzAgMTcgODEgMTAgOTQgMTAgQzExMCAxMCAxMjIgMjIgMTIyIDM4IEMxMjIgNTQgMTEyIDg0IDY0IDExNiBaIi8+PGNsaXBQYXRoIGlkPSJoY2xpcCI+PHVzZSB4bGluazpocmVmPSIjaGVhcnQiIGhyZWY9IiNoZWFydCIvPjwvY2xpcFBhdGg+PHBhdGggaWQ9InN0YXIiIGQ9Ik0wIC02IEwxLjYgLTEuNiBMNiAwIEwxLjYgMS42IEwwIDYgTC0xLjYgMS42IEwtNiAwIEwtMS42IC0xLjYgWiIvPjxwYXRoIGlkPSJtaW5pIiBkPSJNMCA2IEMtOSAtMSAtNiAtNyAwIC0zIEM2IC03IDkgLTEgMCA2IFoiLz48ZyBpZD0iZ3NoIiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik01MiA2MiBDNDcgNTQgMjYgNTQgMjYgNjUgQzI2IDc2IDUyIDcyIDUyIDgzIEM1MiA5NCAzMCA5NCAyNCA4NiIvPjxwYXRoIGQ9Ik02OCAzMCBWOTIiLz48cGF0aCBkPSJNNjggNzIgQzY4IDYwIDc3IDU1IDg1IDU1IEM5NCA1NSAxMDAgNjEgMTAwIDcxIFY5MiIvPjwvZz48L2RlZnM+PGVsbGlwc2UgY3g9IjY0IiBjeT0iMTIzIiByeD0iMzQiIHJ5PSI0IiBmaWxsPSIjMDAwIiBvcGFjaXR5PSIwLjU1IiBmaWx0ZXI9InVybCgjYmx1cikiLz48Y2lyY2xlIGN4PSI2NCIgY3k9IjY0IiByPSI1NiIgZmlsbD0idXJsKCNvcmIpIi8+PGcgY2xpcC1wYXRoPSJ1cmwoI29jbGlwKSI+PGNpcmNsZSBjeD0iMjYiIGN5PSIyOCIgcj0iMzIiIGZpbGw9IiNjMDI2ZDMiIG9wYWNpdHk9IjAuNDUiIGZpbHRlcj0idXJsKCNibHVyMTApIi8+PGNpcmNsZSBjeD0iMTA2IiBjeT0iMTAyIiByPSIzNCIgZmlsbD0iIzI1NjNlYiIgb3BhY2l0eT0iMC41IiBmaWx0ZXI9InVybCgjYmx1cjEwKSIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjI0IiByPSIyMiIgZmlsbD0iI2ZmMmQ3NSIgb3BhY2l0eT0iMC4zMCIgZmlsdGVyPSJ1cmwoI2JsdXIxMCkiLz48ZyBmaWxsPSIjZmZmIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjUwIiByPSIxLjIiIG9wYWNpdHk9IjAuOSIvPjxjaXJjbGUgY3g9IjM0IiBjeT0iMTYiIHI9IjEiIG9wYWNpdHk9IjAuOCIvPjxjaXJjbGUgY3g9IjUyIiBjeT0iMTAiIHI9IjAuOSIgb3BhY2l0eT0iMC43Ii8+PGNpcmNsZSBjeD0iODYiIGN5PSIxMiIgcj0iMS4yIiBvcGFjaXR5PSIwLjkiLz48Y2lyY2xlIGN4PSIxMTIiIGN5PSI0MCIgcj0iMSIgb3BhY2l0eT0iMC44Ii8+PGNpcmNsZSBjeD0iMTE2IiBjeT0iNzAiIHI9IjEuMyIgb3BhY2l0eT0iMC43Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSI4MiIgcj0iMSIgb3BhY2l0eT0iMC43Ii8+PGNpcmNsZSBjeD0iMzAiIGN5PSIxMDgiIHI9IjEuMiIgb3BhY2l0eT0iMC44Ii8+PGNpcmNsZSBjeD0iNjQiIGN5PSIxMTgiIHI9IjAuOSIgb3BhY2l0eT0iMC42Ii8+PGNpcmNsZSBjeD0iOTYiIGN5PSIxMTIiIHI9IjEiIG9wYWNpdHk9IjAuOCIvPjxjaXJjbGUgY3g9IjQ0IiBjeT0iMTEyIiByPSIwLjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjEwOCIgY3k9IjE2IiByPSIwLjkiIG9wYWNpdHk9IjAuNyIvPjwvZz48L2c+PGNpcmNsZSBjeD0iNjQiIGN5PSI2NCIgcj0iNTUiIGZpbGw9Im5vbmUiIHN0cm9rZT0idXJsKCNlZGdlKSIgc3Ryb2tlLXdpZHRoPSIyLjQiLz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgtMTggNjQgNjYpIj48cGF0aCBkPSJNMTIgNjYgQTUyIDE0IDAgMCAxIDExNiA2NiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ1cmwoI3JpbmdnKSIgc3Ryb2tlLXdpZHRoPSIyLjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgb3BhY2l0eT0iMC41NSIvPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2NCA2Mykgc2NhbGUoMC43KSB0cmFuc2xhdGUoLTY0IC02MykiPjx1c2UgeGxpbms6aHJlZj0iI2hlYXJ0IiBocmVmPSIjaGVhcnQiIGZpbGw9IiNmZjFmNTUiIG9wYWNpdHk9IjAuODUiIGZpbHRlcj0idXJsKCNibHVyMTApIi8+PHVzZSB4bGluazpocmVmPSIjaGVhcnQiIGhyZWY9IiNoZWFydCIgZmlsbD0idXJsKCNzaWRlKSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCA2KSIvPjx1c2UgeGxpbms6aHJlZj0iI2hlYXJ0IiBocmVmPSIjaGVhcnQiIGZpbGw9InVybCgjcmVkKSIvPjxnIGNsaXAtcGF0aD0idXJsKCNoY2xpcCkiPjx1c2UgeGxpbms6aHJlZj0iI2hlYXJ0IiBocmVmPSIjaGVhcnQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZhMDcyMCIgc3Ryb2tlLXdpZHRoPSIxMiIgb3BhY2l0eT0iMC41IiBmaWx0ZXI9InVybCgjYmx1cjUpIi8+PGVsbGlwc2UgY3g9IjMwIiBjeT0iMzAiIHJ4PSIyNCIgcnk9IjE0IiBmaWxsPSJ1cmwoI3NwZWMpIi8+PGVsbGlwc2UgY3g9Ijk4IiBjeT0iMjQiIHJ4PSIxMCIgcnk9IjYiIGZpbGw9InVybCgjc3BlYykiIG9wYWNpdHk9IjAuNiIgdHJhbnNmb3JtPSJyb3RhdGUoLTI1IDk4IDI0KSIvPjwvZz48dXNlIHhsaW5rOmhyZWY9IiNoZWFydCIgaHJlZj0iI2hlYXJ0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjc1IiBzdHJva2Utd2lkdGg9IjIuMiIvPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2NCA1Nykgc2NhbGUoMC41NSkgdHJhbnNsYXRlKC02MiAtNjEpIj48ZyBzdHJva2U9IiM1YTA1MTgiIHN0cm9rZS13aWR0aD0iMTUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgOCkiPjx1c2UgeGxpbms6aHJlZj0iI2dzaCIgaHJlZj0iI2dzaCIvPjwvZz48ZyBzdHJva2U9IiNhMzQ4MGEiIHN0cm9rZS13aWR0aD0iMTQiPjx1c2UgeGxpbms6aHJlZj0iI2dzaCIgaHJlZj0iI2dzaCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCA2KSIvPjx1c2UgeGxpbms6aHJlZj0iI2dzaCIgaHJlZj0iI2dzaCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCA0LjUpIi8+PHVzZSB4bGluazpocmVmPSIjZ3NoIiBocmVmPSIjZ3NoIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDMpIi8+PHVzZSB4bGluazpocmVmPSIjZ3NoIiBocmVmPSIjZ3NoIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEuNSkiLz48L2c+PHVzZSB4bGluazpocmVmPSIjZ3NoIiBocmVmPSIjZ3NoIiBzdHJva2U9IiNmZmQ0NWEiIHN0cm9rZS13aWR0aD0iMTMiLz48L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoLTE4IDY0IDY2KSI+PHBhdGggZD0iTTEyIDY2IEE1MiAxNCAwIDAgMCAxMTYgNjYiIGZpbGw9Im5vbmUiIHN0cm9rZT0idXJsKCNyaW5nZykiIHN0cm9rZS13aWR0aD0iMi42IiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbHRlcj0idXJsKCNnbG93KSIvPjxjaXJjbGUgY3g9IjEwNCIgY3k9Ijc1IiByPSIzLjQiIGZpbGw9IiNmZmZiZTAiIGZpbHRlcj0idXJsKCNnbG93KSIvPjxjaXJjbGUgY3g9IjI0IiBjeT0iNzIiIHI9IjIiIGZpbGw9IiNmZmQ0NWEiIGZpbHRlcj0idXJsKCNnbG93KSIvPjwvZz48dXNlIHhsaW5rOmhyZWY9IiNzdGFyIiBocmVmPSIjc3RhciIgZmlsbD0iI2ZmZiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOTggMjgpIHNjYWxlKDEuNCkiLz48dXNlIHhsaW5rOmhyZWY9IiNzdGFyIiBocmVmPSIjc3RhciIgZmlsbD0iI2ZmZTA4YSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjggMzYpIHNjYWxlKDEpIi8+PHVzZSB4bGluazpocmVmPSIjc3RhciIgaHJlZj0iI3N0YXIiIGZpbGw9IiNmZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDk0IDEwNCkgc2NhbGUoMC45KSIvPjx1c2UgeGxpbms6aHJlZj0iI21pbmkiIGhyZWY9IiNtaW5pIiBmaWxsPSIjZmY3YTlhIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMC43IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMCA5Nikgcm90YXRlKC0xNSkiLz48dXNlIHhsaW5rOmhyZWY9IiNtaW5pIiBocmVmPSIjbWluaSIgZmlsbD0iI2ZmZDFkYyIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjAuNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTA4IDU2KSByb3RhdGUoMTUpIHNjYWxlKDAuOCkiLz48L3N2Zz4=
// ==/UserScript==

(() => {
  'use strict';

  const VERSION = '3.5.3';
  const KEY = 'shvUltraLite.settings.v3';
  const LEGACY_KEYS = ['shvUltraLite.settings.v2'];
  const IDB_NAME = 'shvUltraLiteDB';
  const IDB_VERSION = 2; // v3.5.3: v2 adds the videoMetadata store for databases created by older versions
  const SITE = 'shahvani.com';
  const MEDIA_DELAY_MS = 60;
  const VISUAL_BATCH_MS = 160;
  const UI_UPDATE_MS = 120;
  const AUTO_RELEASE_INTERVAL_MS = 15000;
  const MAX_BLOCKED_LOG_ENTRIES = 500;
  const MAX_CUSTOM_AD_HOSTS = 200;
  const MAX_ID_LENGTH = 200;
  const PLACEHOLDER_MIN_HEIGHT = 140;
  const PLACEHOLDER_MAX_HEIGHT = 320;
  const ASPECT_RATIO_MIN = 0.4;
  const ASPECT_RATIO_MAX = 3.5;
  const ASPECT_RATIO_DEFAULT = 16 / 9;
  const GESTURE_WINDOW_MS = 5000;
  const TOAST_DURATION_MS = 2200;
  const MAX_SAFE_INT = 2147483647;
  const Z_INDEX_FAB = 2147483646;
  const Z_INDEX_SCRIM = 2147483645;
  const Z_INDEX_PANEL = 2147483647;
  const Z_INDEX_TOAST = 2147483647;
  const IS_TOP = (() => { try { return window.top === window; } catch (_) { return false; } })();

  // v3.5.3: Deterministic 64-bit-ish hash (two FNV-1a passes). The 3.5.2 version appended
  // Date.now(), so every call produced a new key and cache / resume lookups never matched.
  function hashKey(str) {
    str = String(str);
    let h1 = 0x811c9dc5, h2 = 0x01000193 ^ str.length;
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ c, 0x01000193);
      h2 = Math.imul(h2 ^ c, 0x85ebca6b) ^ (h2 >>> 13);
    }
    return (h1 >>> 0).toString(36) + (h2 >>> 0).toString(36);
  }

  // Stable identity for a video URL: origin + path (query tokens and hash change between visits).
  function videoKeyUrl(raw) {
    try {
      const u = new URL(raw, document.baseURI);
      return /\.(mp4|webm|m4v|mov|ogv|ogg|mkv)$/i.test(u.pathname) ? u.origin + u.pathname : u.origin + u.pathname + u.search;
    } catch (_) { return String(raw); }
  }

  /* ======================================================================
   * 1. Settings (v6.0.0 comprehensive + v3.1.0 lang)
   * ==================================================================== */

  const DEFAULTS = Object.freeze({
    enabled: true,

    lockVideo: true,
    instantLock: true,
    showPoster: true,
    noAutoplay: true,
    autoPause: true,
    singlePlayback: true,
    resumePosition: true,
    pauseHidden: false,
    lockAudio: false,
    autoRelease: false,
    autoReleaseMin: 5,

    lockFrames: true,
    lockSameSite: true,

    hideKnownAds: true,
    hideAdsFully: false,
    blockAdScripts: true,
    blockAdRequests: true,
    blockTrackers: false,
    cosmeticAds: true,
    blockPopups: true,
    customAdHosts: [],

    lazyImages: true,
    asyncDecode: true,
    smartCards: false,
    calmMotion: true,
    flatEffects: false,

    lang: 'en',
    theme: 'system',
    accent: '#00d4aa',
    scale: 'm',
    compact: false,
    calmMenu: false,
    side: 'left',
    y: 0.8,
    idle: 0.9,

    // v3.3.0 features
    themePreset: 'default',
    showFabStats: true,

    // v3.4.0 features
    showVideoIndex: true,
    showVideoInfo: true,
    invertedNeumorphic: true
  });

  const ENUMS = {
    lang: ['en', 'fa'],
    theme: ['system', 'dark', 'light'],
    scale: ['s', 'm', 'l'],
    side: ['left', 'right'],
    autoReleaseMin: [1, 3, 5, 10, 30],
    themePreset: ['default', 'midnight', 'forest', 'sunset', 'monochrome', 'custom']
  };

  const THEME_PRESETS = {
    default: { name: 'Default', accent: '#00d4aa', darkBg: '#1e1e2e', lightBg: '#f0f2f5' },
    midnight: { name: 'Midnight', accent: '#818cf8', darkBg: '#0f172a', lightBg: '#e0e7ff' },
    forest: { name: 'Forest', accent: '#34d399', darkBg: '#064e3b', lightBg: '#d1fae5' },
    sunset: { name: 'Sunset', accent: '#fbbf24', darkBg: '#7c2d12', lightBg: '#fef3c7' },
    monochrome: { name: 'Monochrome', accent: '#9ca3af', darkBg: '#111827', lightBg: '#f3f4f6' },
    custom: { name: 'Custom', accent: null, darkBg: null, lightBg: null }
  };

  const ACCENTS = ['#00d4aa', '#818cf8', '#34d399', '#fbbf24', '#f87171', '#f472b6'];

  const KNOWN_AD_HOSTS = [
    'doubleclick.net', 'googlesyndication.com', 'googleadservices.com', 'adnxs.com',
    'taboola.com', 'outbrain.com', 'popads.net', 'propellerads.com', 'exoclick.com',
    'juicyads.com', 'trafficjunky.net',
    'exosrv.com', 'magsrv.com', 'realsrv.com', 'tsyndicate.com', 'adsterra.com',
    'clickadu.com', 'hilltopads.net', 'adcash.com', 'mgid.com', 'revcontent.com',
    'popcash.net', 'ad-maven.com', 'bongacams.com', 'bongacams4.com', 'coosync.com',
    'coverdistilltile.com'
  ];

  const TRACKER_HOSTS = [
    'googletagmanager.com', 'google-analytics.com', 'static.cloudflareinsights.com'
  ];

  /**
   * Sanitize and validate settings input against DEFAULTS.
   * Handles special validation for customAdHosts, accent, y, idle, and enum keys.
   * @param {Object} input - Raw settings object to sanitize
   * @param {Object} base - Base settings object (typically DEFAULTS)
   * @returns {Object} Sanitized settings object
   */
  function sanitize(input, base) {
    const out = { ...base, customAdHosts: [] };
    if (!input || typeof input !== 'object') return out;

    for (const key of Object.keys(DEFAULTS)) {
      if (!(key in input)) continue;
      const def = DEFAULTS[key];
      const val = input[key];

      if (key === 'customAdHosts') {
        if (Array.isArray(val)) {
          out[key] = Array.from(new Set(val
            .filter(x => typeof x === 'string')
            .map(x => x.trim().toLowerCase())
            .filter(x => /^[a-z0-9.-]+\.[a-z]{2,}$/.test(x))))
            .slice(0, MAX_ID_LENGTH);
        }
      } else if (key === 'accent') {
        if (typeof val === 'string' && /^#[0-9a-f]{6}$/i.test(val)) out[key] = val.toLowerCase();
      } else if (key === 'y') {
        if (typeof val === 'number' && val >= 0.06 && val <= 0.94) out[key] = val;
      } else if (key === 'idle') {
        if (typeof val === 'number' && val >= 0.3 && val <= 1) out[key] = val;
      } else if (ENUMS[key]) {
        if (ENUMS[key].includes(val)) out[key] = val;
      } else if (typeof val === typeof def) {
        out[key] = val;
      }
    }
    return out;
  }

  let settingsFromLocalStorage = false;

  function loadSettings() {
    const base = { ...DEFAULTS, customAdHosts: [] };

    // Settings are read synchronously from localStorage so the lock can start at document-start.
    // IndexedDB only keeps a backup copy and is consulted later (see start()).
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) { settingsFromLocalStorage = true; return sanitize(JSON.parse(raw), base); }

      for (const legacyKey of LEGACY_KEYS) {
        const legacyRaw = localStorage.getItem(legacyKey);
        if (!legacyRaw) continue;
        const old = JSON.parse(legacyRaw);
        if (!old || typeof old !== 'object') continue;

        const migrated = sanitize(old, base);
        if (old.profile) {
          migrated.lazyImages = old.profile !== 'compatible';
          migrated.calmMotion = old.profile !== 'compatible';
          migrated.smartCards = old.profile === 'ultra';
        }
        return migrated;
      }
    } catch (_) {}

    // If IndexedDB has settings but localStorage doesn't, use IndexedDB
    // This is handled asynchronously, so we return base for now
    // and update once IndexedDB loads
    return base;
  }

  function saveSettings() {
    try {
      localStorage.setItem(KEY, JSON.stringify(settings));
    } catch (_) {}
    // Also save to IndexedDB for larger quota and private browsing support
    idbSaveSettings(settings);
  }

  // ======================================================================
  // IndexedDB Storage Layer (v3.3.0)
  // ====================================================================

  let idbDb = null;
  let idbInitPromise = null;

  /**
   * Initialize IndexedDB database with object stores for settings, resume positions,
   * blocked requests logging, and domain profiles.
   * @returns {Promise<IDBDatabase>} Resolves with the database instance
   */
  function idbInit() {
    if (idbDb) return Promise.resolve(idbDb);
    if (idbInitPromise) return idbInitPromise;

    idbInitPromise = new Promise((resolve, reject) => {
      try {
        const request = indexedDB.open(IDB_NAME, IDB_VERSION);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          idbDb = request.result;
          idbDb.onversionchange = () => { try { idbDb.close(); } catch (_) {} idbDb = null; idbInitPromise = null; };
          resolve(idbDb);
        };
        request.onblocked = () => reject(new Error('IndexedDB blocked'));
        request.onupgradeneeded = event => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains('settings')) {
            db.createObjectStore('settings');
          }
          if (!db.objectStoreNames.contains('resumePositions')) {
            const store = db.createObjectStore('resumePositions', { keyPath: 'id' });
            store.createIndex('url', 'url', { unique: false });
            store.createIndex('timestamp', 'timestamp', { unique: false });
          }
          if (!db.objectStoreNames.contains('blockedRequests')) {
            const store = db.createObjectStore('blockedRequests', { keyPath: 'id', autoIncrement: true });
            store.createIndex('timestamp', 'timestamp', { unique: false });
            store.createIndex('domain', 'domain', { unique: false });
          }
          // v3.5.1: Video metadata cache store (Layer 0)
          if (!db.objectStoreNames.contains('videoMetadata')) {
            const store = db.createObjectStore('videoMetadata', { keyPath: 'id' });
            store.createIndex('videoSrc', 'videoSrc', { unique: false });
            store.createIndex('timestamp', 'timestamp', { unique: false });
          }
        };
      } catch (_) {
        reject(new Error('IndexedDB not available'));
      }
    });
    return idbInitPromise;
  }

  /**
   * Save settings to IndexedDB.
   * @param {Object} cfg - Settings object to save
   * @returns {Promise<void>} Resolves when saved (errors silently caught)
   */
  function idbSaveSettings(cfg) {
    idbInit().then(db => {
      const tx = db.transaction('settings', 'readwrite');
      tx.objectStore('settings').put(cfg, 'main');
    }).catch(() => {});
  }

  /**
   * Load settings from IndexedDB.
   * @returns {Promise<Object|null>} Resolves with settings object or null if not found
   */
  function idbLoadSettings() {
    return idbInit().then(db => {
      return new Promise(resolve => {
        const tx = db.transaction('settings', 'readonly');
        const req = tx.objectStore('settings').get('main');
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      });
    }).catch(() => Promise.resolve(null));
  }

  /**
   * Save video resume position to IndexedDB.
   * @param {string} videoSrc - Video source URL
   * @param {string} pageUrl - Page URL where video was playing
   * @param {number} currentTime - Current playback time in seconds
   * @param {number} duration - Video duration in seconds
   * @returns {Promise<void>} Resolves when saved (errors silently caught)
   */
  function idbSaveResumePosition(videoSrc, pageUrl, currentTime, duration) {
    if (!Number.isFinite(currentTime) || currentTime <= 0) return;
    idbInit().then(db => {
      const tx = db.transaction('resumePositions', 'readwrite');
      const id = hashKey(videoKeyUrl(videoSrc));
      tx.objectStore('resumePositions').put({
        id,
        videoSrc,
        url: pageUrl,
        currentTime,
        duration: Number.isFinite(duration) ? duration : 0,
        timestamp: Date.now()
      });
    }).catch(() => {});
  }

  /**
   * Get video resume position from IndexedDB.
   * @param {string} videoSrc - Video source URL
   * @param {string} pageUrl - Page URL where video was playing
   * @returns {Promise<Object|null>} Resolves with resume data or null
   */
  function idbGetResumePosition(videoSrc, pageUrl) {
    return idbInit().then(db => {
      return new Promise(resolve => {
        const tx = db.transaction('resumePositions', 'readonly');
        const id = hashKey(videoKeyUrl(videoSrc));
        const req = tx.objectStore('resumePositions').get(id);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      });
    }).catch(() => Promise.resolve(null));
  }

  /**
   * Log a blocked request to IndexedDB for later review.
   * @param {string} url - Blocked request URL
   * * @param {string} type - Request type (script, request, popup, etc.)
   * @param {string} domain - Domain of the blocked request
   * @returns {Promise<void>} Resolves when logged
   */
  function idbLogBlockedRequest(url, type, domain) {
    // v3.5.1: logBlockedRequests setting removed, backend functions retained for potential future use
    // Currently disabled - returns without logging
    return;
  }

  /**
   * Get blocked requests from IndexedDB, newest first.
   * @param {number} [limit=100] - Maximum number of entries to return
   * @returns {Promise<Array>} Resolves with array of blocked request entries
   */
  function idbGetBlockedRequests(limit = 100) {
    return idbInit().then(db => {
      return new Promise(resolve => {
        const tx = db.transaction('blockedRequests', 'readonly');
        const store = tx.objectStore('blockedRequests');
        const index = store.index('timestamp');
        const req = index.openCursor(null, 'prev');
        const results = [];
        req.onsuccess = () => {
          if (req.result && results.length < limit) {
            results.push(req.result.value);
            req.result.continue();
          } else {
            resolve(results);
          }
        };
        req.onerror = () => resolve([]);
      });
    }).catch(() => Promise.resolve([]));
  }

  /**
   * v3.5.1: Check video metadata cache in IndexedDB (Layer 0).
   * @param {Object} entry - Video entry
   * @returns {Promise<Object|null>} Cached metadata or null
   */
  function checkVideoCache(entry) {
    if (!entry.videoSrc) return Promise.resolve(null);
    const cacheKey = 'videoMeta_' + hashKey(videoKeyUrl(entry.videoSrc));
    return idbInit().then(db => {
      return new Promise(resolve => {
        if (!db.objectStoreNames.contains('videoMetadata')) { resolve(null); return; }
        const tx = db.transaction('videoMetadata', 'readonly');
        const req = tx.objectStore('videoMetadata').get(cacheKey);
        req.onsuccess = () => {
          const result = req.result;
          if (result && Date.now() - result.timestamp < 7 * 24 * 60 * 60 * 1000) { // 7 days TTL
            resolve({ duration: result.duration, size: result.size, aspectRatio: result.aspectRatio });
          } else {
            resolve(null);
          }
        };
        req.onerror = () => resolve(null);
      });
    }).catch(() => Promise.resolve(null));
  }

  /**
   * v3.5.1: Save video metadata to IndexedDB cache.
   * @param {Object} entry - Video entry with metadata
   * @returns {Promise<void>}
   */
  function saveVideoCache(entry) {
    if (!entry.videoSrc || !entry.videoDuration && !entry.videoSize) return;
    const cacheKey = 'videoMeta_' + hashKey(videoKeyUrl(entry.videoSrc));
    idbInit().then(db => {
      // Create store if needed (onupgradeneeded handles this, but ensure it exists)
      if (!db.objectStoreNames.contains('videoMetadata')) return;
      const tx = db.transaction('videoMetadata', 'readwrite');
      tx.objectStore('videoMetadata').put({
        id: cacheKey,
        videoSrc: entry.videoSrc,
        duration: entry.videoDuration,
        size: entry.videoSize,
        aspectRatio: entry.aspectRatio,
        timestamp: Date.now()
      });
    }).catch(() => {});
  }

  /* ======================================================================
   * 2. Translations (v3.1.0 i18n + v6.0.0 comprehensive keys)
   * ==================================================================== */

  const T = {
    en: {
      brand: 'Ultra Lite',
      subtitle: `v${VERSION} · Performance Control`,
      close: 'Close panel',
      open: 'Open Ultra Lite panel',

      // Tabs (v6: 7 tabs -> v3: 3 tabs with sections)
      tabHome: 'Overview',
      tabVideo: 'Video',
      tabFrames: 'Frames',
      tabAds: 'Ads',
      tabPage: 'Page',
      tabLook: 'Look',
      tabData: 'Data',

      // Overview sections
      secProfiles: 'Performance Profile',
      profileCompatible: 'Compatible',
      profileBalanced: 'Balanced',
      profileUltra: 'Ultra',
      profileDesc: 'Compatible: minimal changes. Balanced: lazy images + reduced effects. Ultra: content-visibility + repeated card optimization. Tap-to-load for iframes always active.',
      secStats: 'Page Status',
      statPendingVideos: 'Locked Videos',
      statPendingFrames: 'Locked Frames',
      statActiveVideos: 'Active Videos',
      statActiveFrames: 'Active Frames',
      emergencyOff: 'Emergency: Off',
      emergencyOn: 'Emergency: On',
      emergencyDesc: 'In emergency mode, HTML videos pause and deferred player activation is blocked until disabled.',

      // Media sections
      secTap: 'Tap-to-Load',
      lockVideo: 'Lock videos until tapped',
      lockVideoD: 'A video never loads until you tap its placeholder. Locked again on every page load.',
      instantLock: 'Instant lock',
      instantLockD: 'Locks the moment a video appears instead of after a short delay. Fewer early downloads. Turn off if a player misbehaves.',
      showPoster: 'Show poster on placeholder',
      showPosterD: 'Shows the poster image on the placeholder. The browser may still fetch the poster by itself; it is an image, never video data.',
      secPlayback: 'Playback Control',
      noAutoplay: 'Block autoplay and preload',
      noAutoplayD: 'Removes autoplay and sets preload to none on every video.',
      autoPause: 'Pause playback you did not start',
      autoPauseD: 'A video that starts without a recent tap or key press is paused.',
      singlePlayback: 'One video at a time',
      singlePlaybackD: 'Starting a video pauses the others.',
      resumePosition: 'Resume position after release',
      resumePositionD: 'A released video continues from where it stopped.',
      pauseHidden: 'Pause when the tab is hidden',
      pauseHiddenD: 'Pauses media when you switch tabs or lock the screen.',
      secAudio: 'Audio',
      lockAudio: 'Lock audio players until tapped',
      lockAudioD: 'Only players with visible controls. Silent sound effects are never touched.',
      secMemory: 'Memory',
      autoRelease: 'Auto-release idle videos',
      autoReleaseD: 'Frees paused videos that are completely off screen.',
      afterMin: 'Release after',
      min: '{n} min',

      // Frames
      secFrames: 'Embedded Frames',
      lockFrames: 'Lock frames until tapped',
      lockFramesD: 'Players and embeds load only when you tap them.',
      lockSameSite: 'Also lock same-site frames',
      lockSameSiteD: 'Turn off to keep frames from shahvani.com (chat, login) running normally.',

      // Ads
      secAdFrames: 'Ad Frames',
      hideKnownAds: 'Filter known ad frames',
      hideKnownAdsD: 'Frames from known ad networks cannot be loaded.',
      hideAdsFully: 'Hide filtered ads completely',
      hideAdsFullyD: 'No placeholder is shown for filtered ad frames.',
      secAdNet: 'Ad Network Traffic',
      blockAdScripts: 'Block ad scripts',
      blockAdScriptsD: 'Stops scripts from known ad networks before they run.',
      blockAdRequests: 'Block ad requests',
      blockAdRequestsD: 'Refuses fetch, XHR and beacon calls to known ad networks.',
      blockTrackers: 'Block analytics trackers',
      blockTrackersD: 'Also blocks Google Tag Manager, Google Analytics and the Cloudflare beacon.',
      secShield: 'Shield',
      cosmeticAds: 'Hide ad containers',
      cosmeticAdsD: 'Hides common ad slots with CSS.',
      blockPopups: 'Block popups without a tap',
      blockPopupsD: 'window.open is refused unless you just touched the page.',
      secCustom: 'Extra ad domains',
      customHostsHint: 'One domain per line',
      apply: 'Apply',

      // Page
      secImages: 'Images',
      lazyImages: 'Lazy-load off-screen images',
      lazyImagesD: 'Images outside the screen load later with low priority.',
      asyncDecode: 'Decode images asynchronously',
      asyncDecodeD: 'Keeps scrolling smooth while images decode.',
      secMotion: 'Motion and effects',
      calmMotion: 'Calm animations',
      calmMotionD: 'Shortens CSS animations and transitions to save battery.',
      flatEffects: 'Remove blur effects',
      flatEffectsD: 'Disables backdrop blur, which is expensive on phones.',
      secRender: 'Rendering',
      smartCards: 'Skip rendering of off-screen cards',
      smartCardsD: 'Speeds up long lists of repeated cards. May shift scroll length slightly.',

      // Look
      secLang: 'Language',
      lang: 'Language',
      secLook: 'Appearance',
      theme: 'Theme',
      tSys: 'System',
      tDark: 'Dark',
      tLight: 'Light',
      accent: 'Accent color',
      scale: 'Text size',
      sS: 'Small',
      sM: 'Medium',
      sL: 'Large',
      side: 'Button side',
      left: 'Left',
      right: 'Right',
      idle: 'Idle button opacity',
      secLayout: 'Layout',
      compact: 'Compact layout',
      calmMenu: 'Reduce menu motion',

      // Data
      secBackup: 'Backup',
      exportB: 'Export',
      importB: 'Import',
      jsonHint: 'Paste settings JSON here',
      copyDiag: 'Copy diagnostics',
      diagCopied: 'Diagnostics copied.',
      resetB: 'Reset all settings',
      resetConfirm: 'Tap again to reset',
      secAbout: 'About',
      aboutText: 'Runs on the proven v3 media engine: delayed or instant scan, blob and stream videos left alone, tap to unlock and play, gesture-based playback guard.',

      // v3.3.0 additions
      secThemes: 'Theme Presets',
      themePreset: 'Preset',
      showFabStats: 'FAB stats tooltip',
      showFabStatsD: 'Show detailed stats on FAB hover/long-press.',
      presetDefault: 'Default',
      presetMidnight: 'Midnight',
      presetForest: 'Forest',
      presetSunset: 'Sunset',
      presetMonochrome: 'Monochrome',
      presetCustom: 'Custom',

      // Placeholders
      phEmergency: 'Emergency lock is on. Turn it off to unlock.',
      phReleased: 'Resources were released. Tap to load again.',
      phVideo: 'Tap to load and play the video.',
      phAudio: 'Tap to load the audio.',
      phFrame: 'Tap to load the player or embedded frame.',
      phFrameTitle: 'Tap to load this frame ({t}).',
      phAd: 'Known ad frame filtered. Turn the ad filter off to load it.',

      // Status messages
      stReady: 'Ultra Lite is active.',
      stOffNow: 'Ultra Lite is off.',
      stVideoOn: 'Video unlocked.',
      stAudioOn: 'Audio unlocked.',
      stFrameOn: 'Frame unlocked.',
      stPlayHint: 'Source loaded. Tap the player\'s own play button if needed.',
      stEmergencyOn: 'Emergency lock on. Unlocking is blocked.',
      stEmergencyOff: 'Emergency lock off. Tap to unlock players.',
      stEmergencyBlocked: 'Emergency lock is on. Turn it off first.',
      stAdBlocked: 'This frame is a filtered known ad. Turn the ad filter off in Ads.',
      stPaused: 'Paused {n} item(s). Players inside external frames cannot be controlled.',
      stNoRelease: 'Nothing to release. Playing videos and visible frames stay untouched.',
      stReleased: 'Released. Videos: {v}, frames: {f}.',
      stAutoReleased: 'Auto-released {n} idle video(s).',

      // v3.4.0 additions
      secVideoMeta: 'Video Metadata',
      showVideoIndex: 'Show video number',
      showVideoIndexD: 'Display sequential video number on each placeholder (top-left).',
      showVideoInfo: 'Show size & duration',
      showVideoInfoD: 'Display video file size and duration on placeholder (bottom-right) when available.',
      invertedNeumorphic: 'Inverted neumorphic effect',
      invertedNeumorphicD: 'Flat base, raised on hover/touch. Toggle to use classic raised neumorphic.',
      stReset: 'Settings reset.',
      stImported: 'Settings imported.',
      stBadJson: 'Invalid settings JSON.',
      stHosts: 'Ad domains saved: {n}.',
      stPopup: 'Popup blocked.',

      // v3.4.1 additions - missing English keys for Overview tab
      // v3.5.3: keys that were referenced by the UI but missing (raw key names were shown)
      emergency: 'Emergency lock',
      reload: 'Reload page',
      blockedScripts: 'Blocked scripts',
      blockedRequests: 'Blocked requests',
      popupsBlocked: 'Blocked popups',
      resources: 'Loaded resources',
      cleaned: 'Cleaned entries',
      detached: 'Detached entries',
      master: 'Script',
      masterOn: 'On',
      masterOff: 'Off',
      secQuick: 'Quick Actions',
      pauseAll: 'Pause All',
      releaseBtn: 'Release',
      releaseConfirm: 'Confirm release? Videos: {v}, Frames: {f}',
      filteredAds: 'Filtered Ads'
    },
    fa: {
      brand: 'اولترا لایت',
      subtitle: `v${VERSION} · کنترل عملکرد`,
      close: 'بستن پنل',
      open: 'باز کردن منوی اولترا لایت',

      // Tabs
      tabHome: 'نمای کلی',
      tabVideo: 'ویدیو',
      tabFrames: 'فریم‌ها',
      tabAds: 'تبلیغات',
      tabPage: 'صفحه',
      tabLook: 'ظاهر',
      tabData: 'داده',

      // Overview
      secProfiles: 'پروفایل عملکرد',
      profileCompatible: 'سازگار',
      profileBalanced: 'متعادل',
      profileUltra: 'Ultra',
      profileDesc: 'سازگار: تغییرات کمتر. متعادل: کاهش افکت‌ها و بارگیری تنبل تصاویر. Ultra: بهینه‌سازی کارت‌های تکراری. سیاست لمس برای همهٔ iframeها ثابت است.',
      secStats: 'وضعیت صفحه',
      statPendingVideos: 'ویدیوی قفل',
      statPendingFrames: 'فریم قفل',
      statActiveVideos: 'ویدیوی فعال',
      statActiveFrames: 'فریم فعال',
      emergencyOff: 'حالت اضطراری: خاموش',
      emergencyOn: 'حالت اضطراری: روشن',
      emergencyDesc: 'در حالت اضطراری، ویدئوهای HTML مکث می‌شوند و فعال‌کردن پلیرهای معوق تا زمان خاموش‌کردن این حالت متوقف می‌ماند.',

      // Media
      secTap: 'بارگذاری با لمس',
      lockVideo: 'قفل ویدیوها تا لمس',
      lockVideoD: 'ویدیو تا لمس کادرش بارگذاری نمی‌شود و با هر بارگذاری صفحه دوباره قفل می‌شود.',
      instantLock: 'قفل فوری',
      instantLockD: 'ویدیو همان لحظهٔ ظاهر شدن قفل می‌شود، نه بعد از تأخیر کوتاه. دانلود زودهنگام کمتر. اگر پلیری درست کار نکرد خاموش کنید.',
      showPoster: 'نمایش پوستر روی کادر',
      showPosterD: 'پوستر را روی کادر نشان می‌دهد. خود مرورگر ممکن است پوستر را مستقل دریافت کند؛ این فقط تصویر است، نه داده‌ی ویدیو.',
      secPlayback: 'کنترل پخش',
      noAutoplay: 'مسدودسازی پخش خودکار و پیش‌بارگذاری',
      noAutoplayD: 'autoplay حذف و preload روی none تنظیم می‌شود.',
      autoPause: 'مکث پخشی که شما شروع نکرده‌اید',
      autoPauseD: 'ویدیویی که بدون لمس یا فشردن کلید اخیر شروع شود مکث می‌شود.',
      singlePlayback: 'فقط یک ویدیو در هر لحظه',
      singlePlaybackD: 'با شروع یک ویدیو بقیه مکث می‌شوند.',
      resumePosition: 'ادامه از جای قبلی بعد از آزادسازی',
      resumePositionD: 'ویدیوی آزادشده از همان نقطه ادامه می‌یابد.',
      pauseHidden: 'مکث هنگام پنهان‌شدن تب',
      pauseHiddenD: 'با تعویض تب یا قفل صفحه، رسانه‌ها مکث می‌شوند.',
      secAudio: 'صدا',
      lockAudio: 'قفل پلیرهای صوتی تا لمس',
      lockAudioD: 'فقط پلیرهای دارای کنترل قابل‌مشاهده. افکت‌های صوتی بی‌صدا هرگز دست نمی‌خورند.',
      secMemory: 'حافظه',
      autoRelease: 'آزادسازی خودکار ویدیوهای بی‌کار',
      autoReleaseD: 'ویدیوهای مکث‌شده‌ای که کاملاً بیرون از صفحه‌اند آزاد می‌شوند.',
      afterMin: 'آزادسازی بعد از',
      min: '{n} دقیقه',

      // Frames
      secFrames: 'فریم‌های جاسازی‌شده',
      lockFrames: 'قفل فریم‌ها تا لمس',
      lockFramesD: 'پلیرها و جاسازی‌ها فقط با لمس بارگذاری می‌شوند.',
      lockSameSite: 'قفل فریم‌های همین سایت هم',
      lockSameSiteD: 'خاموش کنید تا فریم‌های shahvani.com (چت، ورود) عادی کار کنند.',

      // Ads
      secAdFrames: 'فریم‌های تبلیغاتی',
      hideKnownAds: 'فیلتر فریم‌های تبلیغاتی شناخته‌شده',
      hideKnownAdsD: 'فریم‌های شبکه‌های تبلیغاتی شناخته‌شده بارگذاری نمی‌شوند.',
      hideAdsFully: 'پنهان‌کردن کامل تبلیغات فیلترشده',
      hideAdsFullyD: 'برای فریم‌های تبلیغاتی فیلترشده هیچ کادری نشان داده نمی‌شود.',
      secAdNet: 'ترافیک شبکه‌های تبلیغاتی',
      blockAdScripts: 'مسدودسازی اسکریپت‌های تبلیغاتی',
      blockAdScriptsD: 'اسکریپت‌های شبکه‌های تبلیغاتی شناخته‌شده پیش از اجرا متوقف می‌شوند.',
      blockAdRequests: 'مسدودسازی درخواست‌های تبلیغاتی',
      blockAdRequestsD: 'درخواست‌های fetch، XHR و beacon به شبکه‌های تبلیغاتی شناخته‌شده رد می‌شوند.',
      blockTrackers: 'مسدودسازی ردیاب‌های آماری',
      blockTrackersD: 'Google Tag Manager، Google Analytics و بیکن Cloudflare هم مسدود می‌شوند.',
      secShield: 'سپر',
      cosmeticAds: 'پنهان‌کردن کادرهای تبلیغ',
      cosmeticAdsD: 'جای تبلیغ‌های رایج با CSS پنهان می‌شود.',
      blockPopups: 'مسدودسازی پاپ‌آپ بدون لمس',
      blockPopupsD: 'تا وقتی تازه صفحه را لمس نکرده‌اید، window.open رد می‌شود.',
      secCustom: 'دامنه‌های تبلیغاتی اضافه',
      customHostsHint: 'هر خط یک دامنه',
      apply: 'اعمال',

      // Page
      secImages: 'تصاویر',
      lazyImages: 'بارگذاری تنبل تصاویر بیرون از صفحه',
      lazyImagesD: 'تصاویر بیرون از صفحه دیرتر و با اولویت کم بارگذاری می‌شوند.',
      asyncDecode: 'رمزگشایی ناهمزمان تصاویر',
      asyncDecodeD: 'اسکرول هنگام رمزگشایی تصاویر روان می‌ماند.',
      secMotion: 'حرکت و جلوه‌ها',
      calmMotion: 'انیمیشن آرام',
      calmMotionD: 'انیمیشن و گذارهای CSS برای صرفه‌جویی باتری کوتاه می‌شوند.',
      flatEffects: 'حذف جلوهٔ محوشدگی',
      flatEffectsD: 'محوکنندهٔ پس‌زمینه را که روی گوشی سنگین است غیرفعال می‌کند.',
      secRender: 'رندر',
      smartCards: 'رندر نکردن کارت‌های بیرون از صفحه',
      smartCardsD: 'لیست‌های بلند با کارت‌های تکراری را سریع‌تر می‌کند. ممکن است طول اسکرول کمی جابه‌جا شود.',

      // Look
      secLang: 'زبان',
      lang: 'زبان',
      secLook: 'ظاهر',
      theme: 'پوسته',
      tSys: 'سیستم',
      tDark: 'تیره',
      tLight: 'روشن',
      accent: 'رنگ تأکید',
      scale: 'اندازهٔ متن',
      sS: 'کوچک',
      sM: 'متوسط',
      sL: 'بزرگ',
      side: 'سمت دکمه',
      left: 'چپ',
      right: 'راست',
      idle: 'شفافیت دکمه در حالت بیکاری',
      secLayout: 'چیدمان',
      compact: 'چیدمان فشرده',
      calmMenu: 'کاهش حرکت منو',

      // Data
      secBackup: 'پشتیبان',
      exportB: 'خروجی',
      importB: 'ورودی',
      jsonHint: 'JSON تنظیمات را اینجا بچسبانید',
      copyDiag: 'کپی اطلاعات عیب‌یابی',
      diagCopied: 'اطلاعات عیب‌یابی کپی شد.',
      resetB: 'بازنشانی همهٔ تنظیمات',
      resetConfirm: 'برای بازنشانی دوباره لمس کنید',
      secAbout: 'درباره',
      aboutText: 'بر پایهٔ موتور رسانهٔ اثبات‌شدهٔ نسخهٔ ۳: اسکن با تأخیر یا فوری، رها کردن ویدیوهای blob و استریم، بازکردن و پخش با لمس و نگهبان پخش بر اساس لمس.',

      // v3.3.0 additions
      secThemes: 'پیش‌تنظیم‌های پوسته',
      themePreset: 'پیش‌تنظیم',
      showFabStats: 'نمای tooltip آمار در دکمه',
      showFabStatsD: 'نمایش آمار تفصیلی با هاور/فشار طولانی روی دکمه.',
      presetDefault: 'پیش‌فرض',
      presetMidnight: 'نیمه‌شب',
      presetForest: 'جنگل',
      presetSunset: 'غروب',
      presetMonochrome: 'یک‌رنگ',
      presetCustom: 'سفارشی',

      // Placeholders
      phEmergency: 'قفل اضطراری روشن است. برای بازکردن، ابتدا خاموشش کنید.',
      phReleased: 'منابع آزاد شده‌اند. برای بارگذاری دوباره لمس کنید.',
      phVideo: 'برای بارگذاری و پخش ویدیو لمس کنید.',
      phAudio: 'برای بارگذاری صدا لمس کنید.',
      phFrame: 'برای بارگذاری پلیر یا فریم جاسازی‌شده لمس کنید.',
      phFrameTitle: 'برای بارگذاری این فریم ({t}) لمس کنید.',
      phAd: 'فریم تبلیغاتی شناخته‌شده فیلتر شده. برای بارگذاری، فیلتر را خاموش کنید.',

      // Status messages
      stReady: 'اولترا لایت فعال است.',
      stOffNow: 'اولترا لایت خاموش است.',
      stVideoOn: 'ویدیو باز شد.',
      stAudioOn: 'صدا باز شد.',
      stFrameOn: 'فریم باز شد.',
      stPlayHint: 'منبع بارگذاری شد. در صورت نیاز دکمهٔ پخش خود پلیر را لمس کنید.',
      stEmergencyOn: 'قفل اضطراری روشن شد. بازکردن مسدود است.',
      stEmergencyOff: 'قفل اضطراری خاموش شد. پلیرها با لمس باز می‌شوند.',
      stEmergencyBlocked: 'قفل اضطراری روشن است. ابتدا خاموشش کنید.',
      stAdBlocked: 'این فریم یک تبلیغ شناخته‌شده و فیلتر شده است. فیلتر را در بخش تبلیغات خاموش کنید.',
      stPaused: '{n} مورد مکث شد. پلیرهای داخل فریم‌های خارجی قابل کنترل نیستند.',
      stNoRelease: 'موردی برای آزادسازی نیست. ویدیوهای در حال پخش و فریم‌های قابل‌مشاهده دست‌نخورده می‌مانند.',
      stReleased: 'آزادسازی شد. ویدیو: {v}، فریم: {f}.',
      stAutoReleased: '{n} ویدیوی بی‌کار خودکار آزاد شد.',
      stReset: 'تنظیمات بازنشانی شد.',
      stImported: 'تنظیمات وارد شد.',
      stBadJson: 'JSON تنظیمات نامعتبر است.',
      stHosts: 'دامنه‌های تبلیغاتی ذخیره شد: {n}.',
      stPopup: 'پاپ‌آپ مسدود شد.',

      // v3.4.0 additions
      secVideoMeta: 'اطلاعات ویدیو',
      showVideoIndex: 'نمایش شماره ویدیو',
      showVideoIndexD: 'نمایش شماره ترتیبی ویدیو روی هر کادر (گوشه چپ بالا).',
      showVideoInfo: 'نمایش سایز و مدت',
      showVideoInfoD: 'نمایش حجم فایل و مدت زمان ویدیو روی کادر (گوشه راست پایین) وقتی در دسترس باشد.',
      invertedNeumorphic: 'افکت نوماورفیک معکوس',
      invertedNeumorphicD: 'پایه صاف، پرآمده در هاور/لمس. برای استفاده از نوماورفیک کلاسیک خاموش کنید.',

      // v3.4.1 additions - missing Persian translations for Overview tab
      emergency: 'قفل اضطراری',
      reload: 'بارگذاری مجدد صفحه',
      blockedScripts: 'اسکریپت‌های مسدودشده',
      blockedRequests: 'درخواست‌های مسدودشده',
      popupsBlocked: 'پاپ‌آپ‌های مسدودشده',
      resources: 'منابع بارگذاری‌شده',
      cleaned: 'ورودی‌های پاک‌شده',
      detached: 'ورودی‌های جداشده',
      master: 'وضعیت اسکریپت',
      masterOn: 'روشن',
      masterOff: 'خاموش',
      secQuick: 'عملیات سریع',
      pauseAll: 'مکث همه',
      releaseBtn: 'آزادسازی',
      releaseConfirm: 'آیا مطمئنید؟ ویدیو: {v}، فریم: {f}',
      filteredAds: 'تبلیغات فیلترشده',
    }
  };

  function t(key, vars) {
    let s = (T[settings.lang] && T[settings.lang][key]) || T.en[key] || key;
    if (vars) for (const k of Object.keys(vars)) s = s.split('{' + k + '}').join(String(vars[k]));
    return s;
  }

  /* ======================================================================
   * 3. State
   * ==================================================================== */

  const state = {
    initialized: false,
    emergency: false,
    observer: null,
    cleanedEntries: 0,
    blockedScripts: 0,
    blockedRequests: 0,
    popupsBlocked: 0,
    mediaEntries: new Set(),
    pendingVisualRoots: new Set(),
    pendingCardParents: new Set(),
    repeatedCards: new Set(),
    visualTimer: 0,
    cleanupTimer: 0,
    uiTimer: 0,
    lastGesture: 0,
    status: { key: 'stReady', vars: null },
    activeTab: 'home',
    open: false,
    ui: null,
    videoIndex: 0,
    renumberTimer: 0
  };

  const settings = loadSettings();

  const videoStates = new WeakMap();
  const frameStates = new WeakMap();
  const imageStates = new WeakMap();
  const scheduledVideos = new WeakSet();
  const unsafeVideos = new WeakSet();
  const pendingRemovedRoots = new Set();

  // Native references captured before any patching (used by our own code paths).
  const NATIVE = {
    load: HTMLMediaElement.prototype.load,
    play: HTMLMediaElement.prototype.play,
    fetch: typeof window.fetch === 'function' ? window.fetch.bind(window) : null,
    setAttribute: Element.prototype.setAttribute
  };

  function setStatus(key, vars, withToast) {
    state.status = { key, vars: vars || null };
    if (withToast) toast(t(key, vars));
    scheduleUIUpdate();
  }

  /* ======================================================================
   * 4. Page styles (neumorphic placeholders + v6 dynamic styles)
   * ==================================================================== */

  function buildPageCss() {
    const adSelectors = KNOWN_AD_HOSTS.map(h => 'html.shv-cosmetic-ads iframe[src*="' + h + '"]').join(',\n');
    return `
    html.shv-ultralite .shv-suspended-video,
    html.shv-ultralite .shv-suspended-frame { display: none !important; }

    html.shv-lite-effects *, html.shv-lite-effects *::before, html.shv-lite-effects *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
      scroll-behavior: auto !important;
    }

    html.shv-flat *, html.shv-flat *::before, html.shv-flat *::after {
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }

    @supports (content-visibility: auto) {
      html.shv-ultra-mode .shv-repeated-card {
        content-visibility: auto !important;
        contain-intrinsic-size: auto 380px !important;
      }
    }

    html.shv-cosmetic-ads ins.adsbygoogle,
    html.shv-cosmetic-ads .adsbygoogle,
    html.shv-cosmetic-ads [id^="google_ads_"],
    html.shv-cosmetic-ads [id*="div-gpt-ad"],
    html.shv-cosmetic-ads [data-ad-slot],
    html.shv-cosmetic-ads [data-ad-client],
    ${adSelectors} { display: none !important; }

    .shv-media-placeholder.shv-ad-hidden { display: none !important; }

    /* ===== Inverted Neumorphic Video Placeholder (v3.4.0) ===== */
    /* Base: flat, no shadows. Hover/Touch: raised neumorphic */
    .shv-media-placeholder {
      all: initial !important;
      box-sizing: border-box !important;
      position: relative !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 12px !important;
      width: 100% !important;
      max-width: 100% !important;
      min-height: ${PLACEHOLDER_MIN_HEIGHT}px !important;
      overflow: hidden !important;
      padding: 16px !important;
      border-radius: 16px !important;
      text-align: center !important;
      font: 14px/1.5 system-ui, sans-serif !important;
      direction: rtl !important;
      white-space: normal !important;
      cursor: pointer !important;
      user-select: none !important;
      z-index: 2 !important;
      /* Flat base - no shadows, just subtle border */
      background: var(--shv-surface) !important;
      color: var(--shv-text) !important;
      border: 1px solid var(--shv-border) !important;
      box-shadow: none !important;
      transition: box-shadow 0.2s ease, transform 0.15s ease, border-color 0.2s ease !important;
    }

    .shv-media-placeholder:hover {
      /* Raised on hover - inverted neumorphic */
      box-shadow:
        6px 6px 12px var(--shv-shadow-dark),
        -6px -6px 12px var(--shv-shadow-light) !important;
      transform: translateY(-2px) !important;
      border-color: var(--shv-accent) !important;
    }

    .shv-media-placeholder:active {
      /* Pressed in */
      box-shadow:
        inset 4px 4px 8px var(--shv-shadow-dark),
        inset -4px -4px 8px var(--shv-shadow-light) !important;
      transform: translateY(0) !important;
    }

    .shv-media-placeholder:focus-visible {
      outline: 3px solid var(--shv-accent) !important;
      outline-offset: 3px !important;
    }

    .shv-video-placeholder { aspect-ratio: ${ASPECT_RATIO_DEFAULT} !important; }
    .shv-audio-placeholder { aspect-ratio: auto !important; min-height: 64px !important; flex-direction: row !important; padding: 10px 14px !important; }

    .shv-media-placeholder .shv-placeholder-icon {
      position: relative !important; z-index: 3 !important;
      color: var(--shv-accent) !important;
      font: 36px/1 system-ui, sans-serif !important;
      /* Animated play button */
      animation: shv-play-pulse 2s ease-in-out infinite !important;
    }

    @keyframes shv-play-pulse {
      0%, 100% { transform: scale(1); opacity: 0.9; }
      50% { transform: scale(1.1); opacity: 1; }
    }

    .shv-media-placeholder .shv-placeholder-label {
      position: relative !important; z-index: 3 !important;
      color: var(--shv-text) !important;
      font: 13px/1.55 system-ui, sans-serif !important;
      max-width: 90% !important;
    }

    /* Video index badge - top-left */
    .shv-video-index {
      position: absolute !important;
      top: 10px !important;
      left: 10px !important;
      z-index: 4 !important;
      min-width: 28px !important;
      height: 28px !important;
      padding: 0 8px !important;
      border-radius: 14px !important;
      background: var(--shv-accent) !important;
      color: var(--shv-surface) !important;
      font: 600 13px/28px system-ui, sans-serif !important;
      text-align: center !important;
      box-shadow: 2px 2px 4px var(--shv-shadow-dark) !important;
    }

    /* Video info badge - bottom-right (duration) */
    .shv-video-info {
      position: absolute !important;
      bottom: 10px !important;
      right: 10px !important;
      z-index: 4 !important;
      padding: 4px 10px !important;
      border-radius: 12px !important;
      background: rgba(0, 0, 0, 0.5) !important;
      color: #fff !important;
      font: 500 11px/1.4 system-ui, sans-serif !important;
      white-space: nowrap !important;
      backdrop-filter: blur(4px) !important;
      -webkit-backdrop-filter: blur(4px) !important;
    }

    /* Video size badge - bottom-left */
    .shv-video-size {
      position: absolute !important;
      bottom: 10px !important;
      left: 10px !important;
      z-index: 4 !important;
      padding: 4px 10px !important;
      border-radius: 12px !important;
      background: rgba(0, 0, 0, 0.5) !important;
      color: #fff !important;
      font: 500 11px/1.4 system-ui, sans-serif !important;
      white-space: nowrap !important;
      backdrop-filter: blur(4px) !important;
      -webkit-backdrop-filter: blur(4px) !important;
    }

    .shv-media-placeholder .shv-poster {
      position: absolute !important; inset: 0 !important; z-index: 1 !important;
      width: 100% !important; height: 100% !important;
      object-fit: cover !important; opacity: 0.35 !important;
      pointer-events: none !important; border-radius: 16px !important;
    }

    /* Gradient overlay on poster for depth */
    .shv-media-placeholder::before {
      content: '' !important;
      position: absolute !important; inset: 0 !important; z-index: 2 !important;
      border-radius: 16px !important;
      background: linear-gradient(135deg, var(--shv-surface) 0%, transparent 50%, var(--shv-surface) 100%) !important;
      opacity: 0.6 !important;
      pointer-events: none !important;
    }

    /* v3.4.0: Inverted Neumorphic - flat base, raised on hover/touch */
    .shv-media-placeholder.shv-inverted-neumorphic {
      box-shadow: none !important;
      border: 1px solid var(--shv-border) !important;
    }

    .shv-media-placeholder.shv-inverted-neumorphic:hover {
      box-shadow:
        6px 6px 12px var(--shv-shadow-dark),
        -6px -6px 12px var(--shv-shadow-light) !important;
      transform: translateY(-2px) !important;
      border-color: var(--shv-accent) !important;
    }

    .shv-media-placeholder.shv-inverted-neumorphic:active {
      box-shadow:
        inset 4px 4px 8px var(--shv-shadow-dark),
        inset -4px -4px 8px var(--shv-shadow-light) !important;
      transform: translateY(0) !important;
    }
    `;
  }

  function addStyle() {
    if (!document.documentElement || document.getElementById('shv-ultralite-style')) return;
    const style = document.createElement('style');
    style.id = 'shv-ultralite-style';
    style.textContent = buildPageCss();
    document.documentElement.appendChild(style);
  }

  function updateDynamicStyle() {
    if (!document.documentElement) return;
    let style = document.getElementById('shv-ultralite-dyn');
    if (!style) {
      style = document.createElement('style');
      style.id = 'shv-ultralite-dyn';
      document.documentElement.appendChild(style);
    }
    const rules = settings.customAdHosts.map(h => 'html.shv-cosmetic-ads iframe[src*="' + h + '"]').join(',');
    style.textContent = ':root{--shv-accent:' + settings.accent + '}' + (rules ? rules + '{display:none!important}' : '');
  }

  /* ======================================================================
   * 5. Helpers
   * ==================================================================== */

  function setOrRemoveAttribute(el, name, value) {
    if (value === null || value === undefined) el.removeAttribute(name);
    else el.setAttribute(name, value);
  }

  function getURL(raw) {
    try { return new URL(raw, document.baseURI); } catch (_) { return null; }
  }

  /**
   * Check if a URL string is usable (not empty, not about:blank, not javascript:).
   * @param {string} raw - Raw URL string
   * @returns {boolean} True if URL is usable
   */
  function isUsableURL(raw) {
    if (typeof raw !== 'string' || !raw.trim()) return false;
    const value = raw.trim();
    return !/^about:blank(?:#.*)?$/i.test(value) && !/^javascript:/i.test(value);
  }

  function isBlobURL(raw) {
    return typeof raw === 'string' && /^blob:/i.test(raw.trim());
  }

  /**
   * Check if a host matches any domain in a list (exact or subdomain).
   * @param {string} host - Hostname to check
   * @param {string[]} list - Array of domain patterns
   * @returns {boolean} True if host matches any pattern
   */
  function hostMatches(host, list) {
    return list.some(domain => host === domain || host.endsWith('.' + domain));
  }

  function adHosts() {
    return KNOWN_AD_HOSTS.concat(settings.customAdHosts);
  }

  function isKnownAdURL(raw) {
    if (!isUsableURL(raw)) return false;
    const url = getURL(raw);
    return !!url && hostMatches(url.hostname.toLowerCase(), adHosts());
  }

  function isBlockedNetworkURL(raw, includeTrackers) {
    if (typeof raw !== 'string' || !raw) return false;
    const url = getURL(raw);
    if (!url || !/^https?:$/.test(url.protocol)) return false;
    const host = url.hostname.toLowerCase();
    if (hostMatches(host, adHosts())) return true;
    return !!includeTrackers && hostMatches(host, TRACKER_HOSTS);
  }

  function isSameSiteURL(raw) {
    if (!isUsableURL(raw)) return false;
    const url = getURL(raw);
    if (!url) return false;
    const host = url.hostname.toLowerCase();
    return host === SITE || host.endsWith('.' + SITE);
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

  /** Set preload=none only when needed: re-writing the same value still queues a mutation record. */
  function forceNoPreload(media) {
    if (media.getAttribute('preload') !== 'none') media.preload = 'none';
  }

  function safePause(media) {
    try { media.pause(); } catch (_) {}
  }

  const isAudioEl = el => el instanceof HTMLAudioElement;

  function isLockableMedia(el) {
    if (el instanceof HTMLVideoElement) return true;
    return isAudioEl(el) && settings.lockAudio && el.hasAttribute('controls');
  }

  const lockEnabledFor = el => (isAudioEl(el) ? settings.lockAudio : settings.lockVideo);

  /* ======================================================================
   * 6. Images and repeated cards
   * ==================================================================== */

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
    if (!(img instanceof HTMLImageElement) || !settings.enabled) return;
    if (!settings.lazyImages && !settings.asyncDecode) return;

    if (!imageStates.has(img)) {
      imageStates.set(img, {
        loading: img.getAttribute('loading'),
        fetchpriority: img.getAttribute('fetchpriority'),
        decoding: img.getAttribute('decoding')
      });
    }

    if (settings.asyncDecode && !img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');

    if (!settings.lazyImages || isOnScreen(img)) return;

    img.setAttribute('loading', 'lazy');
    try { img.setAttribute('fetchpriority', 'low'); } catch (_) {}
  }

  function restoreImage(img) {
    const original = imageStates.get(img);
    if (!original) return;
    setOrRemoveAttribute(img, 'loading', original.loading);
    setOrRemoveAttribute(img, 'fetchpriority', original.fetchpriority);
    setOrRemoveAttribute(img, 'decoding', original.decoding);
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
    if (!settings.enabled || !settings.smartCards || !root || !root.querySelectorAll) return;

    const selectors = 'main, section, article, ul, ol, [role="list"], [role="feed"]';
    const candidates = [];
    if (root instanceof Element && root.matches(selectors)) candidates.push(root);
    candidates.push(...root.querySelectorAll(selectors));

    for (const parent of candidates) {
      if (!parent.isConnected || parent.children.length < 10) continue;

      const counts = new Map();
      for (const child of parent.children) {
        const key = cardSignature(child);
        counts.set(key, (counts.get(key) || 0) + 1);
      }

      let bestKey = '';
      let bestCount = 0;
      for (const [key, count] of counts) {
        if (count > bestCount) { bestKey = key; bestCount = count; }
      }

      if (!bestKey || bestCount < 7 || bestCount / parent.children.length < 0.72) continue;

      for (const child of parent.children) {
        if (cardSignature(child) === bestKey && !child.matches('nav, header, footer, form, button, input, video, iframe')) {
          child.classList.add('shv-repeated-card');
          state.repeatedCards.add(child);
        }
      }
    }
  }

  /* ======================================================================
   * 7. Placeholders
   * ==================================================================== */

  function placeholderText(entry) {
    if (state.emergency) return t('phEmergency');
    if (entry.kind === 'video') {
      if (entry.released) return t('phReleased');
      return entry.audio ? t('phAudio') : t('phVideo');
    }
    if (entry.isKnownAd && settings.hideKnownAds) return t('phAd');
    return entry.title ? t('phFrameTitle', { t: entry.title.slice(0, 60) }) : t('phFrame');
  }

  function applyPlaceholderLook(entry, button) {
    if (!button) return;
    const label = button.querySelector('.shv-placeholder-label');
    if (label) label.textContent = placeholderText(entry);
    button.style.setProperty('direction', settings.lang === 'fa' ? 'rtl' : 'ltr', 'important');
    button.classList.toggle('shv-ad-hidden',
      entry.kind === 'frame' && entry.isKnownAd && settings.hideKnownAds && settings.hideAdsFully);
  }

  function refreshPlaceholder(entry) {
    if (entry && entry.placeholder && entry.placeholder.isConnected) {
      applyPlaceholderLook(entry, entry.placeholder);
      // v3.4.1: Also refresh video info badge visibility
      if (entry.kind === 'video' && !entry.audio) refreshVideoInfoBadge(entry);
    }
  }

  function refreshAllPlaceholders() {
    for (const entry of state.mediaEntries) refreshPlaceholder(entry);
  }

  function makePlaceholder(entry) {
    const button = document.createElement('button');
    button.type = 'button';
    const kindClass = entry.kind === 'video' ? (entry.audio ? 'audio' : 'video') : 'frame';
    button.className = 'shv-media-placeholder shv-' + kindClass + '-placeholder';
    button.setAttribute('data-shv-placeholder', entry.kind);

    // v3.4.0: Inverted neumorphic - flat base, raised on hover
    if (settings.invertedNeumorphic) {
      button.classList.add('shv-inverted-neumorphic');
    }

    if (!entry.audio) {
      const ratio = Number.isFinite(entry.aspectRatio) ? entry.aspectRatio : ASPECT_RATIO_DEFAULT;
      button.style.aspectRatio = String(ratio);
      button.style.minHeight = Math.max(PLACEHOLDER_MIN_HEIGHT, Math.min(PLACEHOLDER_MAX_HEIGHT, entry.height || PLACEHOLDER_MIN_HEIGHT)) + 'px';
    }

    // Video index badge (top-left) - v3.4.0
    if (settings.showVideoIndex && entry.kind === 'video' && !entry.audio && entry.videoIndex) {
      const indexBadge = document.createElement('span');
      indexBadge.className = 'shv-video-index';
      indexBadge.textContent = entry.videoIndex;
      button.append(indexBadge);
    }

    const icon = document.createElement('span');
    icon.className = 'shv-placeholder-icon';
    icon.textContent = entry.kind === 'video' ? (entry.audio ? '♪' : '▶') : '↗';

    const label = document.createElement('span');
    label.className = 'shv-placeholder-label';
    button.append(icon, label);

    // Size badge (bottom-left) - v3.4.2
    if (settings.showVideoInfo && entry.kind === 'video' && !entry.audio) {
      const sizeBadge = document.createElement('span');
      sizeBadge.className = 'shv-video-size';
      sizeBadge.textContent = '';
      button.append(sizeBadge);
    }

    // Duration badge (bottom-right) - v3.4.2
    if (settings.showVideoInfo && entry.kind === 'video' && !entry.audio) {
      const infoBadge = document.createElement('span');
      infoBadge.className = 'shv-video-info';
      infoBadge.textContent = '';
      button.append(infoBadge);
    }

    if (entry.kind === 'video' && !entry.audio && settings.showPoster && entry.poster && isUsableURL(entry.poster)) {
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
        setStatus('stEmergencyBlocked', null, true);
        refreshPlaceholder(entry);
        return;
      }
      if (entry.loaded) return;

      if (entry.kind === 'frame' && entry.isKnownAd && settings.hideKnownAds) {
        setStatus('stAdBlocked', null, true);
        refreshPlaceholder(entry);
        return;
      }

      if (entry.kind === 'video') activateVideo(entry, true);
      else activateFrame(entry);
    });

    applyPlaceholderLook(entry, button);
    return button;
  }

  function insertPlaceholder(entry) {
    if (!entry.element || !entry.element.parentNode) return;
    if (entry.placeholder && entry.placeholder.isConnected) return;
    entry.placeholder = makePlaceholder(entry);
    entry.element.parentNode.insertBefore(entry.placeholder, entry.element);
  }

  /* ======================================================================
   * 8. HTML video and audio (v3 engine from v6)
   * ==================================================================== */

  function getVideoSources(video) {
    return Array.from(video.querySelectorAll('source')).map(node => ({ node, src: node.getAttribute('src') }));
  }

  function hasBlobOrMediaStream(video, sources) {
    if (video.srcObject || isBlobURL(video.currentSrc) || isBlobURL(video.getAttribute('src'))) return true;
    return sources.some(item => isBlobURL(item.src));
  }

  function hasUsableVideoSource(video) {
    if (isUsableURL(video.getAttribute('src'))) return true;
    // v3.4.3: Check lazy-load attributes for detection (but don't preemptively set src)
    if (isUsableURL(video.getAttribute('data-src'))) return true;
    if (isUsableURL(video.getAttribute('data-lazy-src'))) return true;
    return Array.from(video.querySelectorAll('source')).some(source => isUsableURL(source.getAttribute('src')));
  }

  function videoGeometry(video) {
    const rect = video.getBoundingClientRect();
    let ratio = ASPECT_RATIO_DEFAULT;

    if (video.videoWidth > 0 && video.videoHeight > 0) {
      ratio = video.videoWidth / video.videoHeight;
    } else {
      const width = Number(video.getAttribute('width'));
      const height = Number(video.getAttribute('height'));
      if (width > 0 && height > 0) ratio = width / height;
      else if (rect.width > 0 && rect.height > 0) ratio = rect.width / rect.height;
    }

    if (!Number.isFinite(ratio) || ratio < ASPECT_RATIO_MIN || ratio > ASPECT_RATIO_MAX) ratio = ASPECT_RATIO_DEFAULT;

    return { aspectRatio: ratio, height: rect.height > 0 ? rect.height : PLACEHOLDER_MIN_HEIGHT, poster: video.getAttribute('poster') };
  }

  /**
   * Source info of a video: `directSrc` is what belongs on <video src>, `videoSrc` is the best URL
   * we know for cache / resume keys (falls back to the first <source>).
   */
  function readSourceInfo(video, sources) {
    let direct = video.getAttribute('src');
    if (!isUsableURL(direct)) direct = video.getAttribute('data-src');
    if (!isUsableURL(direct)) direct = video.getAttribute('data-lazy-src');
    direct = isUsableURL(direct) ? direct : null;
    const first = sources.map(item => item.src).find(isUsableURL) || null;
    return { directSrc: direct, videoSrc: direct || first };
  }

  /**
   * Commit video deferral: create the entry, insert the placeholder and fully detach the media
   * resource. v3.5.3: NOTHING is requested for a locked video - no preload=metadata, no HEAD/Range
   * probe. Size and duration come from the local cache, or are learned after the user opens the video.
   */
  function commitVideoDefer(video) {
    if (!settings.enabled || !lockEnabledFor(video)) return;
    if (!video.isConnected || videoStates.has(video) || unsafeVideos.has(video)) return;

    const sources = getVideoSources(video);
    if (hasBlobOrMediaStream(video, sources)) {
      unsafeVideos.add(video);
      video.removeAttribute('autoplay');
      forceNoPreload(video);
      safePause(video);
      return;
    }

    if (!hasUsableVideoSource(video)) return;

    const info = readSourceInfo(video, sources);
    const entry = {
      kind: 'video',
      audio: isAudioEl(video),
      element: video,
      loaded: false,
      released: false,
      placeholder: null,
      videoSrc: info.videoSrc,
      directSrc: info.directSrc,
      sources,
      originalPreload: video.getAttribute('preload'),
      resumeTime: 0,
      pausedAt: 0,
      videoIndex: 0,
      videoDuration: 0,
      videoSize: 0,
      metadataLoaded: false,
      sizeRequested: false,
      ...videoGeometry(video)
    };

    videoStates.set(video, entry);
    state.mediaEntries.add(entry);
    insertPlaceholder(entry);

    // Hide first, then cut the network: removing src alone does not abort a load that already began,
    // so detachVideoSources() also calls the native load() on the now source-less element.
    video.classList.add('shv-suspended-video');
    detachVideoSources(entry);
    scheduleRenumber();

    // Cache lookup is local (IndexedDB) - no network involved.
    if (entry.videoSrc) {
      checkVideoCache(entry).then(cached => {
        if (!cached || !entry.element) return;
        entry.videoDuration = cached.duration || entry.videoDuration;
        entry.videoSize = cached.size || entry.videoSize;
        if (cached.aspectRatio) entry.aspectRatio = cached.aspectRatio;
        if (entry.placeholder) entry.placeholder.style.aspectRatio = String(entry.aspectRatio);
        updatePlaceholderInfo(entry);
      });
    }

    scheduleUIUpdate();
  }

  /**
   * File size lookup (HEAD, no body). Called ONLY for a video the user has just opened - never for a
   * locked one - so the result can be cached for the next visit.
   */
  function fetchVideoSize(entry) {
    const src = entry.videoSrc;
    if (!src || !isUsableURL(src) || entry.videoSize > 0 || entry.sizeRequested || !NATIVE.fetch) return;
    entry.sizeRequested = true;
    let url;
    try { url = new URL(src, document.baseURI).href; } catch (_) { return; }
    NATIVE.fetch(url, { method: 'HEAD', credentials: 'same-origin' }).then(r => {
      const length = parseInt(r.headers.get('content-length') || '0', 10);
      if (r.ok && length > 0) {
        entry.videoSize = length;
        saveVideoCache(entry);
        updatePlaceholderInfo(entry);
      }
    }).catch(() => {});
  }

  function updatePlaceholderInfo(entry) {
    if (!entry.placeholder || !entry.placeholder.isConnected) return;

    // Size badge (bottom-left)
    let sizeEl = entry.placeholder.querySelector('.shv-video-size');
    if (!sizeEl && settings.showVideoInfo && entry.kind === 'video' && !entry.audio) {
      sizeEl = document.createElement('span');
      sizeEl.className = 'shv-video-size';
      sizeEl.textContent = '';
      entry.placeholder.append(sizeEl);
    }

    // Duration badge (bottom-right)
    let infoEl = entry.placeholder.querySelector('.shv-video-info');
    if (!infoEl && settings.showVideoInfo && entry.kind === 'video' && !entry.audio) {
      infoEl = document.createElement('span');
      infoEl.className = 'shv-video-info';
      infoEl.textContent = '';
      entry.placeholder.append(infoEl);
    }

    if (!sizeEl && !infoEl) return;

    // Update size badge
    if (sizeEl) {
      if (entry.videoSize > 0) {
        const mb = entry.videoSize / (1024 * 1024);
        sizeEl.textContent = mb >= 1 ? `${mb.toFixed(1)} MB` : `${(entry.videoSize / 1024).toFixed(0)} KB`;
      } else {
        sizeEl.textContent = '';
      }
      sizeEl.style.display = (settings.showVideoInfo && entry.videoSize > 0) ? '' : 'none';
    }

    // Update duration badge
    if (infoEl) {
      if (entry.videoDuration > 0) {
        const m = Math.floor(entry.videoDuration / 60);
        const s = Math.floor(entry.videoDuration % 60);
        infoEl.textContent = `${m}:${String(s).padStart(2, '0')}`;
      } else {
        infoEl.textContent = '';
      }
      infoEl.style.display = (settings.showVideoInfo && entry.videoDuration > 0) ? '' : 'none';
    }
  }

  // v3.4.1: Ensure video info badge visibility matches settings
  function refreshVideoInfoBadge(entry) {
    if (!entry.placeholder || !entry.placeholder.isConnected) return;
    if (settings.showVideoInfo && entry.kind === 'video' && !entry.audio) {
      // Size badge
      let sizeEl = entry.placeholder.querySelector('.shv-video-size');
      if (!sizeEl) {
        sizeEl = document.createElement('span');
        sizeEl.className = 'shv-video-size';
        sizeEl.textContent = '';
        entry.placeholder.append(sizeEl);
      }
      // Duration badge
      let infoEl = entry.placeholder.querySelector('.shv-video-info');
      if (!infoEl) {
        infoEl = document.createElement('span');
        infoEl.className = 'shv-video-info';
        infoEl.textContent = '';
        entry.placeholder.append(infoEl);
      }
      updatePlaceholderInfo(entry);
    } else {
      // Hide both badges if setting disabled
      const sizeEl = entry.placeholder.querySelector('.shv-video-size');
      const infoEl = entry.placeholder.querySelector('.shv-video-info');
      if (sizeEl) sizeEl.style.display = 'none';
      if (infoEl) infoEl.style.display = 'none';
    }
  }

  function deferVideo(video) {
    if (!settings.enabled) return;
    if (!(video instanceof HTMLMediaElement) || !isLockableMedia(video)) return;
    if (videoStates.has(video) || unsafeVideos.has(video)) return;

    const lock = lockEnabledFor(video);

    if (lock || (settings.noAutoplay && !isAudioEl(video))) {
      video.removeAttribute('autoplay');
      forceNoPreload(video);
      safePause(video);
    }

    if (!lock) return;

    if (settings.instantLock) {
      commitVideoDefer(video);
      return;
    }

    if (scheduledVideos.has(video)) return;
    scheduledVideos.add(video);
    window.setTimeout(() => {
      scheduledVideos.delete(video);
      commitVideoDefer(video);
    }, MEDIA_DELAY_MS);
  }

  /**
   * Detach every media resource of a locked video. Per the HTML spec, removing the src attribute does
   * NOT stop an in-flight load or free the resource - invoking load() on the source-less element does.
   */
  function detachVideoSources(entry) {
    const video = entry.element;
    if (!video) return;

    safePause(video);
    let changed = false;

    const direct = video.getAttribute('src');
    if (direct !== null) {
      if (isUsableURL(direct)) { entry.videoSrc = direct; entry.directSrc = direct; }
      video.removeAttribute('src');
      changed = true;
    }
    // data-src / data-lazy-src are only attributes - they cause no request and stay for the site.

    for (const item of entry.sources) {
      if (item.node && item.node.hasAttribute('src')) {
        item.src = item.node.getAttribute('src');
        item.node.removeAttribute('src');
        changed = true;
      }
    }

    // The poster is an image the browser would fetch by itself; the placeholder shows it (if enabled).
    if (video.hasAttribute('poster')) {
      if (entry.poster === null || entry.poster === undefined) entry.poster = video.getAttribute('poster');
      video.removeAttribute('poster');
    }

    video.removeAttribute('autoplay');
    forceNoPreload(video);
    if (changed || video.networkState !== 0) {
      try { NATIVE.load.call(video); } catch (_) {}
    }
  }

  /**
   * Restore the sources of a video the user just opened (entry.loaded is already true here).
   */
  function restoreVideoSources(entry) {
    const video = entry.element;
    if (!video) return;

    if (entry.poster && !video.hasAttribute('poster')) video.setAttribute('poster', entry.poster);

    let restoredSources = 0;
    for (const item of entry.sources) {
      if (item.node && item.node.isConnected && item.src !== null && item.node.getAttribute('src') === null) {
        item.node.setAttribute('src', item.src);
        restoredSources++;
      }
    }

    let restoredDirect = false;
    if (video.getAttribute('src') === null && entry.directSrc) {
      video.setAttribute('src', entry.directSrc);
      restoredDirect = true;
    }

    video.removeAttribute('autoplay');
    video.preload = 'metadata';
    // Setting src starts the load by itself; restored <source> attributes do not, so load() is needed.
    if (!restoredDirect && restoredSources) {
      try { NATIVE.load.call(video); } catch (_) {}
    }
  }

  /**
   * Activate a deferred video: remove placeholder, restore sources, optionally play.
   * Handles resume position from IndexedDB and emergency mode checks.
   * @param {Object} entry - Video entry from videoStates WeakMap
   * @param {boolean} playNow - Whether to attempt playback immediately
   * @param {boolean} force - Bypass emergency mode check
   * @returns {void}
   */
  function activateVideo(entry, playNow, force) {
    const video = entry.element;
    if (!video || entry.loaded) return;

    if (state.emergency && !force) {
      setStatus('stEmergencyBlocked', null, true);
      return;
    }

    entry.loaded = true;
    entry.released = false;
    entry.pausedAt = 0;

    if (entry.placeholder && entry.placeholder.isConnected) entry.placeholder.remove();
    entry.placeholder = null;
    video.classList.remove('shv-suspended-video');

    restoreVideoSources(entry);
    if (playNow) fetchVideoSize(entry); // only for the video the user just opened

    // v3.3.0: Load resume position from IndexedDB
    let resumeTime = entry.resumeTime;
    if (settings.resumePosition && resumeTime <= 0) {
      idbGetResumePosition(entry.videoSrc || video.currentSrc, location.href).then(saved => {
        if (saved && Number.isFinite(saved.currentTime) && saved.currentTime > 0) {
          resumeTime = saved.currentTime;
          // Apply after metadata loads
          video.addEventListener('loadedmetadata', () => {
            try {
              if (Number.isFinite(video.duration)) {
                video.currentTime = Math.min(resumeTime, Math.max(0, video.duration - 0.5));
              }
            } catch (_) {}
          }, { once: true });
        }
      });
    } else if (resumeTime > 0) {
      const restorePosition = () => {
        try {
          if (Number.isFinite(video.duration)) {
            video.currentTime = Math.min(resumeTime, Math.max(0, video.duration - 0.5));
          }
        } catch (_) {}
      };
      video.addEventListener('loadedmetadata', restorePosition, { once: true });
    }

    // v3.5.1: Layer 3 - Video element fallback for duration when user activates
    // Capture duration and save to cache when metadata loads
    video.addEventListener('loadedmetadata', () => {
      if (Number.isFinite(video.duration)) {
        entry.videoDuration = video.duration;
        entry.aspectRatio = video.videoWidth > 0 && video.videoHeight > 0
          ? video.videoWidth / video.videoHeight
          : entry.aspectRatio;
        entry.metadataLoaded = true;
        saveVideoCache(entry);
        updatePlaceholderInfo(entry);
      }
    }, { once: true });

    // v3.4.3: Don't call video.load() - browser loads automatically when src is set

    if (playNow) {
      video.dataset.shvAllowedPlayUntil = String(Date.now() + GESTURE_WINDOW_MS);
      try {
        const result = video.play();
        if (result && typeof result.catch === 'function') result.catch(() => setStatus('stPlayHint', null, true));
      } catch (_) {
        setStatus('stPlayHint', null, true);
      }
    }

    if (!force) setStatus(entry.audio ? 'stAudioOn' : 'stVideoOn', null, true);
    scheduleUIUpdate();
  }

  function handleSourceElement(source) {
    if (!(source instanceof HTMLSourceElement) || !settings.enabled) return;
    const video = source.closest('video, audio');
    if (!(video instanceof HTMLMediaElement)) return;

    const entry = videoStates.get(video);
    if (!entry) {
      if (source.hasAttribute('src')) deferVideo(video);
      return;
    }

    if (entry.loaded || !source.hasAttribute('src')) return;

    const src = source.getAttribute('src');
    if (isBlobURL(src)) {
      unsafeVideos.add(video);
      activateVideo(entry, false, true);
      return;
    }

    const saved = entry.sources.find(item => item.node === source);
    if (saved) saved.src = src;
    else entry.sources.push({ node: source, src });
    if (!entry.videoSrc && isUsableURL(src)) entry.videoSrc = src;
    source.removeAttribute('src');
    if (video.networkState !== 0) { try { NATIVE.load.call(video); } catch (_) {} }
  }

  /* ======================================================================
   * 9. Iframes (v6 with srcdoc support)
   * ==================================================================== */

  function frameDescriptor(frame) {
    const originalSrc = frame.getAttribute('src');
    const srcdocPresent = frame.hasAttribute('srcdoc');
    const srcdoc = srcdocPresent ? frame.getAttribute('srcdoc') : null;

    if (srcdocPresent) {
      return { src: isUsableURL(originalSrc) ? originalSrc : null, originalSrc, srcdoc, srcdocPresent, sourceAttr: 'srcdoc' };
    }

    if (isUsableURL(originalSrc)) {
      return { src: originalSrc, originalSrc, srcdoc: null, srcdocPresent: false, sourceAttr: 'src' };
    }

    for (const attr of ['data-src', 'data-lazy-src']) {
      const value = frame.getAttribute(attr);
      if (isUsableURL(value)) return { src: value, originalSrc, srcdoc: null, srcdocPresent: false, sourceAttr: attr };
    }

    return null;
  }

  function frameGeometry(frame) {
    const rect = frame.getBoundingClientRect();
    let ratio = rect.width > 0 && rect.height > 0 ? rect.width / rect.height : ASPECT_RATIO_DEFAULT;
    if (!Number.isFinite(ratio) || ratio < ASPECT_RATIO_MIN || ratio > ASPECT_RATIO_MAX) ratio = ASPECT_RATIO_DEFAULT;
    return { aspectRatio: ratio, height: rect.height > 0 ? rect.height : PLACEHOLDER_MIN_HEIGHT };
  }

  function frameNeedsLock(src) {
    if (settings.hideKnownAds && isKnownAdURL(src)) return true;
    if (!settings.lockFrames) return false;
    if (!settings.lockSameSite && isSameSiteURL(src)) return false;
    return true;
  }

  function deferFrame(frame) {
    if (!settings.enabled) return;
    if (!(frame instanceof HTMLIFrameElement) || frameStates.has(frame)) return;

    const descriptor = frameDescriptor(frame);
    if (!descriptor || !frameNeedsLock(descriptor.src)) return;

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

  function activateFrame(entry, force) {
    const frame = entry.element;
    if (!frame || entry.loaded) return;

    if (state.emergency && !force) {
      setStatus('stEmergencyBlocked', null, true);
      return;
    }

    if (entry.isKnownAd && settings.hideKnownAds && !force) {
      setStatus('stAdBlocked', null, true);
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

    if (!force) setStatus('stFrameOn', null, true);
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

  /* ======================================================================
   * 10. Resource release
   * ==================================================================== */

  function snapshotVideoSources(entry) {
    const video = entry.element;
    if (!video || video.srcObject || isBlobURL(video.currentSrc) || isBlobURL(video.getAttribute('src'))) return false;

    const sourceNodes = Array.from(video.querySelectorAll('source'));
    if (sourceNodes.some(node => isBlobURL(node.getAttribute('src')))) return false;

    const direct = video.getAttribute('src');
    if (isUsableURL(direct)) { entry.videoSrc = direct; entry.directSrc = direct; }

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
    if (!video || !entry.loaded || !video.paused || video.ended || !snapshotVideoSources(entry)) return false;

    try {
      entry.resumeTime = Number.isFinite(video.currentTime) ? video.currentTime : 0;
    } catch (_) {
      entry.resumeTime = 0;
    }

    // v3.3.0: Save resume position to IndexedDB
    if (settings.resumePosition && entry.resumeTime > 0) {
      idbSaveResumePosition(entry.videoSrc || video.currentSrc, location.href, entry.resumeTime, video.duration);
    }

    // v3.5.1: Save metadata to cache before releasing
    saveVideoCache(entry);

    entry.loaded = false;
    entry.released = true;
    video.classList.add('shv-suspended-video');
    insertPlaceholder(entry);
    // v3.4.2: Update placeholder with preserved metadata (duration, size) immediately
    updatePlaceholderInfo(entry);
    detachVideoSources(entry);
    return true;
  }

  function releaseFrameEntry(entry) {
    const frame = entry.element;
    if (!entry.loaded || !frame || !isFullyOffScreen(frame)) return false;
    deferLoadedFrame(entry);
    return true;
  }

  function releaseCandidates() {
    const candidates = [];
    for (const entry of state.mediaEntries) {
      if (!entry.loaded || !entry.element || !entry.element.isConnected) continue;
      if (entry.kind === 'video') {
        if (entry.element.paused && !entry.element.ended) candidates.push(entry);
      } else if (entry.kind === 'frame' && isFullyOffScreen(entry.element)) {
        candidates.push(entry);
      }
    }
    return candidates;
  }

  function releaseInactiveNow() {
    let videosReleased = 0;
    let framesReleased = 0;

    for (const entry of releaseCandidates()) {
      if (entry.kind === 'video' && releaseVideoEntry(entry)) videosReleased++;
      else if (entry.kind === 'frame' && releaseFrameEntry(entry)) framesReleased++;
    }

    setStatus('stReleased', { v: videosReleased, f: framesReleased });
    scheduleUIUpdate();
  }

  function autoReleaseTick() {
    if (!settings.enabled || !settings.autoRelease) return;
    const limit = settings.autoReleaseMin * 60000;
    let released = 0;

    for (const entry of state.mediaEntries) {
      if (entry.kind !== 'video' || !entry.loaded || !entry.element || !entry.element.isConnected) continue;
      if (!entry.pausedAt || Date.now() - entry.pausedAt < limit) continue;
      if (!isFullyOffScreen(entry.element)) continue;
      if (releaseVideoEntry(entry)) released++;
    }

    if (released) setStatus('stAutoReleased', { n: released });
  }

  /* ======================================================================
   * 11. Controls
   * ==================================================================== */

  function pauseAllMedia() {
    let count = 0;
    document.querySelectorAll('video, audio').forEach(media => {
      if (!media.paused) { safePause(media); count++; }
    });
    setStatus('stPaused', { n: count });
  }

  function setEmergency(on) {
    state.emergency = on;
    if (on) pauseAllMedia();
    refreshAllPlaceholders();
    setStatus(on ? 'stEmergencyOn' : 'stEmergencyOff', null, true);
    scheduleUIUpdate();
  }

  /* ======================================================================
   * 12. Applying settings (idempotent)
   * ==================================================================== */

  function teardown() {
    const root = document.documentElement;
    if (root) root.classList.remove('shv-ultralite', 'shv-lite-effects', 'shv-ultra-mode', 'shv-cosmetic-ads', 'shv-flat');

    for (const entry of Array.from(state.mediaEntries)) {
      if (entry.element && !entry.loaded) {
        if (entry.kind === 'video') activateVideo(entry, false, true);
        else activateFrame(entry, true);
      }
      forgetEntry(entry);
    }

    restoreAllImages();
    clearRepeatedCards();
  }

  function applyAll() {
    const root = document.documentElement;
    if (!root) return;

    updateDynamicStyle();
    applyPageTheme();

    if (!settings.enabled) {
      teardown();
      applyUITheme();
      renderAll();
      setStatus('stOffNow');
      return;
    }

    root.classList.add('shv-ultralite');
    root.classList.toggle('shv-lite-effects', settings.calmMotion);
    root.classList.toggle('shv-ultra-mode', settings.smartCards);
    root.classList.toggle('shv-cosmetic-ads', settings.cosmeticAds);
    root.classList.toggle('shv-flat', settings.flatEffects);

    for (const entry of Array.from(state.mediaEntries)) {
      if (!entry.element) continue;

      if (entry.kind === 'video') {
        if (!lockEnabledFor(entry.element) && !entry.loaded) activateVideo(entry, false, true);
      } else {
        entry.isKnownAd = isKnownAdURL(entry.src);
        if (entry.loaded) {
          if (entry.isKnownAd && settings.hideKnownAds) deferLoadedFrame(entry);
        } else if (!frameNeedsLock(entry.src)) {
          activateFrame(entry, true);
        }
      }
    }

    restoreAllImages();
    if (settings.lazyImages || settings.asyncDecode) optimizeAllImages();

    if (settings.smartCards) optimizeRepeatedCards(document);
    else clearRepeatedCards();

    scanMedia(document);
    refreshAllPlaceholders();
    applyUITheme();
    renderAll();
    scheduleUIUpdate();
  }

  function setOpt(key, value) {
    settings[key] = value;
    saveSettings();

    if (key === 'showPoster') {
      for (const entry of state.mediaEntries) {
        if (entry.placeholder && entry.placeholder.isConnected) {
          entry.placeholder.remove();
          entry.placeholder = null;
          if (!entry.loaded) insertPlaceholder(entry);
        }
      }
    }

    // v3.4.1: Handle video metadata display toggles without full rebuild
    if (key === 'showVideoIndex' || key === 'showVideoInfo' || key === 'invertedNeumorphic') {
      for (const entry of state.mediaEntries) {
        if (entry.placeholder && entry.placeholder.isConnected && entry.kind === 'video' && !entry.audio) {
          if (key === 'showVideoIndex') {
            let indexBadge = entry.placeholder.querySelector('.shv-video-index');
            if (value && entry.videoIndex && !indexBadge) {
              indexBadge = document.createElement('span');
              indexBadge.className = 'shv-video-index';
              indexBadge.textContent = entry.videoIndex;
              entry.placeholder.prepend(indexBadge);
            } else if (!value && indexBadge) {
              indexBadge.remove();
            }
          } else if (key === 'showVideoInfo') {
            refreshVideoInfoBadge(entry);
          } else if (key === 'invertedNeumorphic') {
            entry.placeholder.classList.toggle('shv-inverted-neumorphic', value);
          }
        }
      }
    }

    applyAll();
  }

  /* ======================================================================
   * 13. DOM tracking and cleanup
   * ==================================================================== */

  /** Video numbers follow DOM order (stable even for <source>-only videos and re-rendered cards). */
  function scheduleRenumber() {
    if (state.renumberTimer) return;
    state.renumberTimer = window.setTimeout(() => { state.renumberTimer = 0; renumberVideos(); }, 50);
  }

  function renumberVideos() {
    let n = 0;
    for (const el of document.querySelectorAll('video')) {
      const entry = videoStates.get(el);
      if (!entry || entry.audio || entry.kind !== 'video') continue;
      entry.videoIndex = ++n;
      const ph = entry.placeholder;
      if (!ph || !ph.isConnected) continue;
      let badge = ph.querySelector('.shv-video-index');
      if (!settings.showVideoIndex) { if (badge) badge.remove(); continue; }
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'shv-video-index';
        ph.append(badge);
      }
      badge.textContent = String(n);
    }
  }

  function forgetEntry(entry) {
    state.mediaEntries.delete(entry);
    state.cleanedEntries++;
    scheduleRenumber();

    if (entry.element) {
      if (entry.kind === 'video') videoStates.delete(entry.element);
      else frameStates.delete(entry.element);
    }

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
    if (root.matches('video, audio, iframe, source, .shv-repeated-card')) nodes.push(root);
    if (root.querySelectorAll) nodes.push(...root.querySelectorAll('video, audio, iframe, source, .shv-repeated-card'));

    const removedMedia = new Set();

    for (const node of nodes) {
      if (node.isConnected) continue;

      if (node instanceof HTMLMediaElement) {
        const entry = videoStates.get(node);
        if (entry) removedMedia.add(entry);
        unsafeVideos.delete(node);
      } else if (node instanceof HTMLIFrameElement) {
        const entry = frameStates.get(node);
        if (entry) removedMedia.add(entry);
      } else if (node instanceof HTMLSourceElement) {
        for (const entry of state.mediaEntries) {
          if (entry.kind === 'video' && entry.sources) entry.sources = entry.sources.filter(item => item.node !== node);
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
    for (const root of roots) if (root instanceof Element) pendingRemovedRoots.add(root);
    if (state.cleanupTimer) return;

    state.cleanupTimer = window.setTimeout(() => {
      state.cleanupTimer = 0;
      const rootsNow = Array.from(pendingRemovedRoots);
      pendingRemovedRoots.clear();
      for (const root of rootsNow) if (!root.isConnected) cleanupDetachedTree(root);
    }, 0);
  }

  function collapseRoots(roots) {
    const list = Array.from(roots).filter(root => root instanceof Element && root.isConnected);
    return list.filter(root => !list.some(other => other !== root && other.contains(root)));
  }

  /**
   * Scan a DOM root for media elements (video, audio, iframe, source) and defer them.
   * @param {Element|Document} root - Root element to scan
   * @returns {void}
   */
  function scanMedia(root) {
    if (!root || !settings.enabled) return;

    if (root instanceof HTMLMediaElement) deferVideo(root);
    else if (root instanceof HTMLIFrameElement) deferFrame(root);
    else if (root instanceof HTMLSourceElement) handleSourceElement(root);

    if (!root.querySelectorAll) return;
    root.querySelectorAll(settings.lockAudio ? 'video, audio' : 'video').forEach(deferVideo);
    root.querySelectorAll('iframe').forEach(deferFrame);
    root.querySelectorAll('source').forEach(handleSourceElement);
  }

  function scanVisuals(root) {
    if (!root || !settings.enabled) return;
    if (root instanceof HTMLImageElement) optimizeImage(root);
    if ((settings.lazyImages || settings.asyncDecode) && root.querySelectorAll) root.querySelectorAll('img').forEach(optimizeImage);
    if (settings.smartCards) optimizeRepeatedCards(root);
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
      if (settings.smartCards) for (const parentNode of parents) optimizeRepeatedCards(parentNode);
    }, VISUAL_BATCH_MS);
  }

  /**
   * Handle attribute changes on media elements (video, iframe, source).
   * Only defers on 'src' and 'autoplay' for videos; ignores data-src/data-lazy-src for site's lazy-loading.
   * @param {Element} target - Element with changed attribute
   * @param {string} attributeName - Name of changed attribute
   * @returns {void}
   */
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

    if (target instanceof HTMLMediaElement) {
      if (!isLockableMedia(target)) return;

      if (attributeName === 'autoplay' && (settings.noAutoplay || lockEnabledFor(target))) {
        target.removeAttribute('autoplay');
        safePause(target);
      }

      const entry = videoStates.get(target);
      if (entry && attributeName === 'preload') {
        // A locked video must never be allowed to preload (site scripts like to set preload=auto).
        if (!entry.loaded) forceNoPreload(target);
        return;
      }
      if (entry) {
        // v3.4.3: Only handle 'src' attribute for loaded videos - preserve data-src/data-lazy-src
        if (!entry.loaded && attributeName === 'src' && isUsableURL(target.getAttribute('src'))) {
          const value = target.getAttribute('src');
          if (isBlobURL(value)) {
            unsafeVideos.add(target);
            activateVideo(entry, false, true);
          } else {
            entry.videoSrc = value;
            entry.directSrc = value;
            target.removeAttribute('src');
            try { NATIVE.load.call(target); } catch (_) {}
          }
        } else if (entry.loaded && attributeName === 'src' && isUsableURL(target.getAttribute('src'))) {
          entry.videoSrc = target.getAttribute('src');
        }
        // v3.4.3: Ignore data-src/data-lazy-src changes - let site handle them
        return;
      }

      // v3.4.3: Only defer on 'src' and 'autoplay' changes, not on data-src/data-lazy-src
      if (attributeName === 'src' || attributeName === 'autoplay' || attributeName === 'preload') deferVideo(target);
      return;
    }

    if (target instanceof HTMLSourceElement && attributeName === 'src') handleSourceElement(target);
  }

  /**
   * MutationObserver callback: processes added/removed nodes and attribute changes.
   * Batches scans using collapseRoots to avoid duplicate work.
   * @param {MutationRecord[]} records - Array of mutation records
   * @returns {void}
   */
  function onMutations(records) {
    if (!settings.enabled) return;

    const added = new Set();
    const removed = [];

    for (const record of records) {
      if (record.type === 'childList') {
        for (const node of record.addedNodes) if (node instanceof Element) added.add(node);
        for (const node of record.removedNodes) if (node instanceof Element) removed.push(node);
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

  /* ======================================================================
   * 14. Diagnostics
   * ==================================================================== */

  function resourceCount() {
    try { return performance.getEntriesByType('resource').length; } catch (_) { return null; }
  }

  function collectStats() {
    let pendingVideos = 0, activeVideos = 0, pendingFrames = 0, activeFrames = 0, filteredAds = 0, detachedEntries = 0;

    for (const entry of state.mediaEntries) {
      if (!entry.element || !entry.element.isConnected) { detachedEntries++; continue; }

      if (entry.kind === 'video') {
        if (entry.loaded) activeVideos++; else pendingVideos++;
      } else if (entry.loaded) {
        activeFrames++;
      } else {
        pendingFrames++;
        if (entry.isKnownAd && settings.hideKnownAds) filteredAds++;
      }
    }

    return {
      pendingVideos, activeVideos, pendingFrames, activeFrames, filteredAds, detachedEntries,
      cleanedEntries: state.cleanedEntries,
      resources: resourceCount()
    };
  }

  function diagnosticsText() {
    return JSON.stringify({
      version: VERSION,
      url: location.origin + location.pathname,
      userAgent: navigator.userAgent,
      stats: { ...collectStats(), blockedScripts: state.blockedScripts, blockedRequests: state.blockedRequests, popups: state.popupsBlocked },
      settings
    }, null, 1);
  }

  /* ======================================================================
   * 15. Safeguards: gestures, playback guard, ad scripts, requests, popups
   * ==================================================================== */

  function noteUserGesture() { state.lastGesture = Date.now(); }

  function userActive() {
    try { if (navigator.userActivation && navigator.userActivation.isActive) return true; } catch (_) {}
    return Date.now() - state.lastGesture < 1200;
  }

  document.addEventListener('pointerdown', noteUserGesture, true);
  document.addEventListener('touchstart', noteUserGesture, { capture: true, passive: true });
  document.addEventListener('keydown', noteUserGesture, true);

  document.addEventListener('pause', event => {
    const media = event.target;
    if (!(media instanceof HTMLMediaElement)) return;
    const entry = videoStates.get(media);
    if (entry && entry.loaded) { entry.pausedAt = Date.now(); saveResumeNow(entry); }
  }, true);

  // Resume position is saved on pause and when the page is hidden/closed (not only on "release").
  function saveResumeNow(entry) {
    const video = entry && entry.element;
    if (!video || !settings.enabled || !settings.resumePosition || !entry.videoSrc) return;
    try {
      const t = video.currentTime, d = video.duration;
      if (Number.isFinite(t) && t > 3 && (!Number.isFinite(d) || d - t > 3)) {
        idbSaveResumePosition(entry.videoSrc, location.href, t, d);
      }
    } catch (_) {}
  }
  window.addEventListener('pagehide', () => {
    for (const entry of state.mediaEntries) if (entry.kind === 'video' && entry.loaded) saveResumeNow(entry);
  });

  document.addEventListener('play', event => {
    const video = event.target;
    if (!(video instanceof HTMLMediaElement) || !settings.enabled) return;

    const entry = videoStates.get(video);
    if (entry) entry.pausedAt = 0;

    if (entry && !entry.loaded) {
      safePause(video);
      return;
    }

    if (!(video instanceof HTMLVideoElement)) return;

    if (settings.autoPause) {
      const permission = Number(video.dataset.shvAllowedPlayUntil || 0) > Date.now();
      let recentGesture = Date.now() - state.lastGesture < 2500;
      try { if (navigator.userActivation && navigator.userActivation.isActive) recentGesture = true; } catch (_) {}

      if (!recentGesture && !permission) {
        safePause(video);
        return;
      }
    }

    if (state.emergency) {
      safePause(video);
      return;
    }

    if (settings.singlePlayback) {
      document.querySelectorAll('video').forEach(other => {
        if (other !== video && !other.paused) safePause(other);
      });
    }
  }, true);

  document.addEventListener('visibilitychange', () => {
    if (!settings.enabled || !settings.pauseHidden || !document.hidden) return;
    document.querySelectorAll('video, audio').forEach(media => { if (!media.paused) safePause(media); });
  });


  /* ----------------------------------------------------------------------
   * Media guards (v3.5.3)
   * A MutationObserver only sees elements after the fact. These guards close the remaining gaps:
   * videos created / driven by site JS (document.createElement('video'), preload='auto', load(),
   * play(), autoplay) can no longer start a download while the video is still locked.
   * -------------------------------------------------------------------- */

  /** True while a media element must not touch the network (locked, or an unseen video). */
  function isLockedMedia(el) {
    if (!settings.enabled || !(el instanceof HTMLMediaElement) || unsafeVideos.has(el)) return false;
    const entry = videoStates.get(el);
    if (entry) return !entry.loaded;
    if (el instanceof HTMLVideoElement && settings.lockVideo) {
      // MediaSource / blob players are driven by the site and are left alone.
      return !(el.srcObject || isBlobURL(el.getAttribute('src')));
    }
    return false;
  }

  try {
    const mp = HTMLMediaElement.prototype;

    mp.load = function () {
      if (isLockedMedia(this)) return;
      return NATIVE.load.apply(this, arguments);
    };

    mp.play = function () {
      if (isLockedMedia(this)) {
        return Promise.reject(new DOMException('Video is locked by Shahvani Ultra Lite', 'NotAllowedError'));
      }
      return NATIVE.play.apply(this, arguments);
    };

    for (const [prop, locked] of [['preload', 'none'], ['autoplay', false]]) {
      const desc = Object.getOwnPropertyDescriptor(mp, prop);
      if (!desc || !desc.set || !desc.get) continue;
      Object.defineProperty(mp, prop, {
        configurable: true,
        enumerable: desc.enumerable,
        get: desc.get,
        set(value) { desc.set.call(this, isLockedMedia(this) ? locked : value); }
      });
    }

    mp.setAttribute = function (name, value) {
      if (typeof name === 'string' && isLockedMedia(this)) {
        const key = name.toLowerCase();
        if (key === 'autoplay') return;
        if (key === 'preload') value = 'none';
      }
      return NATIVE.setAttribute.call(this, name, value);
    };

    // Elements created by script start life with preload="none".
    const nativeCreateElement = Document.prototype.createElement;
    Document.prototype.createElement = function () {
      const el = nativeCreateElement.apply(this, arguments);
      try {
        if (el instanceof HTMLVideoElement && settings.enabled && settings.lockVideo) NATIVE.setAttribute.call(el, 'preload', 'none');
      } catch (_) {}
      return el;
    };
  } catch (_) {}

  function scriptBlocked(src) {
    const blocked = settings.enabled && settings.blockAdScripts && isBlockedNetworkURL(String(src), settings.blockTrackers);
    if (blocked) {
      try {
        const u = new URL(src, document.baseURI);
        idbLogBlockedRequest(src, 'script', u.hostname);
      } catch (_) {}
    }
    return blocked;
  }

  function requestBlocked(url) {
    const blocked = settings.enabled && settings.blockAdRequests && isBlockedNetworkURL(String(url), settings.blockTrackers);
    if (blocked) {
      try {
        const u = new URL(url, document.baseURI);
        idbLogBlockedRequest(url, 'request', u.hostname);
      } catch (_) {}
    }
    return blocked;
  }

  // Firefox fires this before a script runs (parser inserted or dynamic).
  try {
    document.addEventListener('beforescriptexecute', event => {
      const script = event.target;
      if (script && script.src && scriptBlocked(script.src)) {
        event.preventDefault();
        state.blockedScripts++;
        scheduleUIUpdate();
      }
    }, true);
  } catch (_) {}

  // Stop dynamic ad scripts from even being requested.
  try {
    const srcDesc = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src');
    if (srcDesc && srcDesc.set && srcDesc.get) {
      Object.defineProperty(HTMLScriptElement.prototype, 'src', {
        configurable: true,
        enumerable: srcDesc.enumerable,
        get: srcDesc.get,
        set(value) {
          if (scriptBlocked(value)) { state.blockedScripts++; scheduleUIUpdate(); return; }
          srcDesc.set.call(this, value);
        }
      });
    }

    const nativeSetAttribute = HTMLScriptElement.prototype.setAttribute;
    HTMLScriptElement.prototype.setAttribute = function (name, value) {
      if (typeof name === 'string' && name.toLowerCase() === 'src' && scriptBlocked(value)) {
        state.blockedScripts++;
        scheduleUIUpdate();
        return;
      }
      return nativeSetAttribute.apply(this, arguments);
    };
  } catch (_) {}

  try {
    const nativeFetch = window.fetch;
    if (typeof nativeFetch === 'function') {
      window.fetch = function (input) {
        let url = '';
        try { url = typeof input === 'string' ? input : (input && input.url) || ''; } catch (_) {}
        if (url && requestBlocked(url)) {
          state.blockedRequests++;
          scheduleUIUpdate();
          return Promise.reject(new TypeError('Blocked by Shahvani Ultra Lite'));
        }
        return nativeFetch.apply(this, arguments);
      };
    }

    const nativeOpenXhr = XMLHttpRequest.prototype.open;
    const nativeSendXhr = XMLHttpRequest.prototype.send;
    const xhrUrls = new WeakMap();
    XMLHttpRequest.prototype.open = function (method, url) {
      try { xhrUrls.set(this, String(url)); } catch (_) {}
      return nativeOpenXhr.apply(this, arguments);
    };
    XMLHttpRequest.prototype.send = function () {
      const url = xhrUrls.get(this);
      if (url && requestBlocked(url)) {
        state.blockedRequests++;
        scheduleUIUpdate();
        const xhr = this;
        window.setTimeout(() => {
          try {
            xhr.dispatchEvent(new ProgressEvent('error'));
            xhr.dispatchEvent(new ProgressEvent('loadend'));
          } catch (_) {}
        }, 0);
        return;
      }
      return nativeSendXhr.apply(this, arguments);
    };

    if (typeof navigator.sendBeacon === 'function') {
      const nativeBeacon = navigator.sendBeacon;
      navigator.sendBeacon = function (url) {
        if (url && requestBlocked(url)) {
          state.blockedRequests++;
          scheduleUIUpdate();
          return true;
        }
        return nativeBeacon.apply(this, arguments);
      };
    }
  } catch (_) {}

  try {
    const nativeWindowOpen = window.open;
    window.open = function () {
      if (settings.enabled && settings.blockPopups && !userActive()) {
        state.popupsBlocked++;
        setStatus('stPopup', null, true);
        return null;
      }
      return nativeWindowOpen.apply(this, arguments);
    };
  } catch (_) {}

  /* ======================================================================
   * 16. Menu (v3.1.0 neumorphic slide-over drawer + v6 7 tabs)
   * ==================================================================== */

  function h(tag, props, ...kids) {
    const node = document.createElement(tag);
    if (props) {
      for (const key of Object.keys(props)) {
        const val = props[key];
        if (key === 'class') node.className = val;
        else if (key === 'text') node.textContent = val;
        else if (key.startsWith('on')) node.addEventListener(key.slice(2), val);
        else node.setAttribute(key, val);
      }
    }
    for (const kid of kids) if (kid !== null && kid !== undefined && kid !== false) node.append(kid);
    return node;
  }

  const UI_CSS = `
    :host { all: initial; }
    *, *::before, *::after { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    .root {
      --ac: #00d4aa; --on: #0a1a18; --bg: #1e1e2e; --bg2: #252536; --fg: #e8e8f0; --mut: #9aa0b0;
      --bd: rgba(148,163,184,.22); --card: rgba(255,255,255,.05); --fs: 14px;
      font: var(--fs)/1.55 system-ui, -apple-system, "Segoe UI", Roboto, "Vazirmatn", Tahoma, sans-serif;
      color: var(--fg);
    }
    .root[data-s="s"] { --fs: 12.5px; }
    .root[data-s="l"] { --fs: 16px; }
    .root[data-theme="light"] { --bg: #f0f2f5; --bg2: #f8f9fc; --fg: #1a1d24; --mut: #6b7280; --bd: rgba(19,24,41,.16); --card: rgba(19,24,41,.05); --on: #ffffff; }

    .fab {
      position: fixed; z-index: ${Z_INDEX_FAB}; width: 54px; height: 54px; border-radius: 28px; border: 0; padding: 0;
      cursor: pointer; color: var(--on); font-size: 20px; background: var(--ac);
      box-shadow: 0 8px 24px rgba(0,0,0,.4), 0 0 0 3px rgba(255,255,255,.12);
      display: grid; place-items: center; gap: 6px; touch-action: none; opacity: var(--idle, .9);
      transition: opacity .2s, transform .2s; bottom: 16px; transform: translateY(0);
    }
    .fab.l { left: 16px; } .fab.r { right: 16px; }
    .fab:active { transform: scale(.93); }
    .fab:hover, .fab.open { opacity: 1; }
    .fab.off { filter: grayscale(1); opacity: .6; }
    .badge { position: absolute; top: -4px; inset-inline-end: -4px; min-width: 20px; height: 20px; padding: 0 5px; border-radius: 10px;
      background: #ef4444; color: #fff; font: 700 11px/20px system-ui; text-align: center; }
    .badge:empty { display: none; }

    .scrim { position: fixed; inset: 0; z-index: ${Z_INDEX_SCRIM}; background: rgba(0,0,0,.5); opacity: 0; pointer-events: none;
      transition: opacity .22s; touch-action: none; }
    .scrim.on { opacity: 1; pointer-events: auto; }

    .sheet {
      position: fixed; z-index: ${Z_INDEX_PANEL}; left: 0; right: 0; bottom: 0; margin: 0 auto;
      width: min(100%, 560px); height: min(86vh, 760px); height: min(86dvh, 760px);
      display: grid; grid-template-rows: auto auto minmax(0, 1fr) auto; overflow: hidden;
      background: linear-gradient(180deg, var(--bg2), var(--bg)); border: 1px solid var(--bd); border-bottom: 0;
      border-radius: 22px 22px 0 0; box-shadow: 0 -14px 50px rgba(0,0,0,.5);
      transform: translateY(105%); visibility: hidden;
      transition: transform .28s cubic-bezier(.2,.8,.2,1), visibility 0s linear .28s;
      padding-bottom: env(safe-area-inset-bottom);
    }
    .sheet.on { transform: none; visibility: visible; transition: transform .28s cubic-bezier(.2,.8,.2,1), visibility 0s; }
    .calm .sheet, .calm .sheet.on, .calm .scrim, .calm .fab { transition: none; }
    @media (min-width: 700px) { .sheet { bottom: 16px; border-radius: 22px; border-bottom: 1px solid var(--bd); height: min(80vh, 720px); } }

    .head { display: flex; align-items: center; gap: 10px; padding: 14px 16px 6px; }
    .logo { width: 38px; height: 38px; border-radius: 12px; display: grid; place-items: center; color: var(--on); font-size: 19px; background: var(--ac); flex: none; }
    .ttl { flex: 1; min-width: 0; font-weight: 800; font-size: 1.1em; }
    .ttl small { display: block; font-weight: 500; font-size: .78em; color: var(--mut); }
    .x { all: unset; width: 36px; height: 36px; border-radius: 50%; display: grid; place-items: center; cursor: pointer; background: var(--card); font-size: 15px; flex: none; }
    .x:focus-visible, .tab:focus-visible, .btn:focus-visible, .seg button:focus-visible, .dot:focus-visible { outline: 2px solid var(--ac); outline-offset: 2px; }

    .tabs { display: flex; gap: 6px; overflow-x: auto; padding: 8px 14px; scrollbar-width: none; touch-action: pan-x; }
    .tabs::-webkit-scrollbar { display: none; }
    .tab { all: unset; flex: none; padding: 8px 15px; border-radius: 999px; cursor: pointer; font-weight: 650; font-size: .92em; color: var(--mut); background: var(--card); }
    .tab[aria-selected="true"] { background: var(--ac); color: var(--on); }

    .body { min-height: 0; overflow-y: auto; overflow-x: hidden; overscroll-behavior: contain; touch-action: pan-y;
      -webkit-overflow-scrolling: touch; padding: 4px 14px 16px; }
    .body > * + * { margin-top: 10px; }
    .compact .body > * + * { margin-top: 6px; }
    .compact .row { padding-top: 7px; padding-bottom: 7px; }

    .foot { padding: 9px 16px 11px; font-size: .84em; color: var(--mut); border-top: 1px solid var(--bd); min-height: 38px; }

    details.sec { background: var(--card); border: 1px solid var(--bd); border-radius: 16px; overflow: hidden; }
    details.sec > summary { list-style: none; cursor: pointer; display: flex; align-items: center; gap: 8px; padding: 12px 14px;
      font-weight: 750; font-size: .8em; letter-spacing: .6px; text-transform: uppercase; color: var(--mut); }
    details.sec > summary::-webkit-details-marker { display: none; }
    details.sec > summary::after { content: "\\25BE"; margin-inline-start: auto; transition: transform .2s; }
    details.sec:not([open]) > summary::after { transform: rotate(90deg); }
    .sec-body { padding: 0 6px 6px; }
    .pad { padding: 8px; display: flex; flex-direction: column; gap: 8px; }

    .row { display: flex; align-items: center; gap: 12px; padding: 11px 8px; border-top: 1px solid var(--bd); cursor: pointer; border-radius: 10px; }
    .sec-body > .row:first-child { border-top: 0; }
    .row:focus-visible { outline: 2px solid var(--ac); }
    .row .tx { flex: 1; min-width: 0; }
    .row .tx b { display: block; font-weight: 650; }
    .row .tx small { display: block; color: var(--mut); font-size: .84em; line-height: 1.4; margin-top: 1px; }
    .row.dim { opacity: .5; }
    .cb { flex: none; width: 26px; height: 26px; border-radius: 8px; border: 2px solid var(--mut); display: grid; place-items: center;
      color: transparent; font-size: 16px; font-weight: 900; transition: background .15s, border-color .15s; }
    .cb[data-on="1"] { background: var(--ac); border-color: var(--ac); color: var(--on); }

    .master { display: flex; align-items: center; gap: 14px; padding: 14px; border-radius: 18px; border: 1px solid var(--bd); cursor: pointer;
      background: linear-gradient(135deg, color-mix(in srgb, var(--ac) 24%, transparent), var(--card)); }
    .master .tx { flex: 1; min-width: 0; }
    .master b { display: block; font-size: 1.15em; }
    .master small { color: var(--mut); }
    .sw { flex: none; width: 58px; height: 34px; border-radius: 17px; background: rgba(148,163,184,.4); position: relative; transition: background .2s; }
    .sw::after { content: ""; position: absolute; top: 4px; inset-inline-start: 4px; width: 26px; height: 26px; border-radius: 50%; background: #fff;
      box-shadow: 0 2px 6px rgba(0,0,0,.35); transition: inset-inline-start .2s; }
    .sw[data-on="1"] { background: var(--ac); }
    .sw[data-on="1"]::after { inset-inline-start: 28px; }

    .stats { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
    .st { background: var(--card); border: 1px solid var(--bd); border-radius: 14px; padding: 10px; text-align: center; }
    .st b { display: block; font-size: 1.7em; font-variant-numeric: tabular-nums; line-height: 1.2; }
    .st span { font-size: .8em; color: var(--mut); }
    .kv { display: grid; grid-template-columns: 1fr auto; gap: 5px 12px; font-size: .9em; padding: 6px 10px 10px; }
    .kv span:nth-child(odd) { color: var(--mut); }
    .kv span:nth-child(even) { font-variant-numeric: tabular-nums; text-align: end; }

    .btn { all: unset; text-align: center; padding: 12px 14px; border-radius: 13px; cursor: pointer; font-weight: 700; background: var(--card); border: 1px solid var(--bd); }
    .btn.p { background: var(--ac); color: var(--on); border-color: transparent; }
    .btn.d { color: #f87171; }
    .btn.arm { background: #f59e0b; color: #1c1300; border-color: transparent; }
    .two { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }

    .seg { display: flex; gap: 4px; padding: 4px; background: var(--card); border: 1px solid var(--bd); border-radius: 13px; flex-wrap: wrap; }
    .seg button { all: unset; flex: 1; min-width: max-content; text-align: center; padding: 8px 10px; border-radius: 10px; cursor: pointer;
      font-weight: 650; font-size: .92em; color: var(--mut); }
    .seg button[aria-pressed="true"] { background: var(--ac); color: var(--on); }
    .lbl { font-size: .8em; color: var(--mut); font-weight: 700; margin: 2px 4px; }
    .col { display: flex; flex-direction: column; gap: 8px; }
    textarea { width: 100%; min-height: 96px; resize: vertical; border-radius: 12px; border: 1px solid var(--bd); background: var(--card);
      color: var(--fg); padding: 10px; font: 12px/1.4 ui-monospace, Menlo, monospace; direction: ltr; }
    input[type="range"] { width: 100%; accent-color: var(--ac); }
    .dots { display: flex; gap: 10px; flex-wrap: wrap; }
    .dot { all: unset; width: 34px; height: 34px; border-radius: 50%; cursor: pointer; border: 3px solid transparent; box-shadow: 0 0 0 1px var(--bd); }
    .dot[aria-pressed="true"] { border-color: var(--fg); }
    .note { font-size: .88em; color: var(--mut); padding: 2px 4px; }

    .toast { position: fixed; z-index: ${Z_INDEX_TOAST}; left: 50%; bottom: calc(18px + env(safe-area-inset-bottom)); transform: translate(-50%, 20px);
      max-width: 86vw; padding: 10px 18px; border-radius: 999px; background: rgba(14,17,30,.95); color: #fff; font-weight: 600;
      opacity: 0; pointer-events: none; transition: opacity .22s, transform .22s; border: 1px solid rgba(255,255,255,.16); }
    .toast.on { opacity: 1; transform: translate(-50%, 0); }
    @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
  `;

  let toastTimer = 0;
  function toast(message) {
    if (!state.ui) return;
    state.ui.toast.textContent = message;
    state.ui.toast.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => state.ui && state.ui.toast.classList.remove('on'), TOAST_DURATION_MS);
  }

  function resolvedTheme() {
    if (settings.theme === 'dark' || settings.theme === 'light') return settings.theme;
    try { return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'; } catch (_) { return 'dark'; }
  }

  function accentText(hex) {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 140 ? '#0a1a18' : '#ffffff';
  }

  function applyPageTheme() {
    const root = document.documentElement;
    if (!root) return;
    const theme = resolvedTheme();
    const isLight = theme === 'light';
    const accent = settings.accent;

    if (isLight) {
      root.style.setProperty('--shv-bg', '#f0f2f5');
      root.style.setProperty('--shv-surface', '#f8f9fc');
      root.style.setProperty('--shv-surface-2', '#eef1f5');
      root.style.setProperty('--shv-surface-3', '#e4e8ee');
      root.style.setProperty('--shv-text', '#1a1d24');
      root.style.setProperty('--shv-muted', '#6b7280');
      root.style.setProperty('--shv-border', '#d1d5db');
      root.style.setProperty('--shv-accent', '#00a88a');
      root.style.setProperty('--shv-accent-text', '#ffffff');
      root.style.setProperty('--shv-shadow-dark', '#c8ccd4');
      root.style.setProperty('--shv-shadow-light', '#ffffff');
    } else {
      root.style.setProperty('--shv-bg', '#1e1e2e');
      root.style.setProperty('--shv-surface', '#252536');
      root.style.setProperty('--shv-surface-2', '#2d2d44');
      root.style.setProperty('--shv-surface-3', '#353550');
      root.style.setProperty('--shv-text', '#e8e8f0');
      root.style.setProperty('--shv-muted', '#9aa0b0');
      root.style.setProperty('--shv-border', '#3d3d5c');
      root.style.setProperty('--shv-accent', '#00d4aa');
      root.style.setProperty('--shv-accent-text', '#0a1a18');
      root.style.setProperty('--shv-shadow-dark', '#14141e');
      root.style.setProperty('--shv-shadow-light', '#2c2c44');
    }
    root.style.setProperty('--shv-accent', accent);
  }

  function applyUITheme() {
    const ui = state.ui;
    if (!ui) return;
    ui.root.setAttribute('data-theme', resolvedTheme());
    ui.root.setAttribute('data-s', settings.scale);
    ui.root.style.setProperty('--ac', settings.accent);
    ui.root.style.setProperty('--on', accentText(settings.accent));
    ui.root.style.setProperty('--idle', String(settings.idle));
    ui.root.style.setProperty('--y', String(settings.y));
    ui.root.classList.toggle('compact', settings.compact);
    ui.root.classList.toggle('calm', settings.calmMenu);
    ui.fab.className = 'fab ' + (settings.side === 'left' ? 'l' : 'r') + (state.open ? ' open' : '') + (settings.enabled ? '' : ' off');
    const dir = settings.lang === 'fa' ? 'rtl' : 'ltr';
    ui.sheet.setAttribute('dir', dir);
    ui.toast.setAttribute('dir', dir);
    ui.fab.setAttribute('aria-label', t('open'));
    ui.close.setAttribute('aria-label', t('close'));
    applyPageTheme();
  }

  /* ---- builders ---- */

  function section(title, ...rows) {
    return h('details', { class: 'sec', open: '' }, h('summary', { text: title }), h('div', { class: 'sec-body' }, ...rows));
  }

  function activate(node, fn) {
    node.addEventListener('click', fn);
    node.addEventListener('keydown', event => {
      if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); fn(); }
    });
  }

  function checkRow(key, label, desc, options) {
    const o = options || {};
    const checked = o.checked !== undefined ? o.checked : !!settings[key];
    const box = h('span', { class: 'cb', 'aria-hidden': 'true', 'data-on': checked ? '1' : '0', text: '✓' });
    const row = h('div', { class: 'row' + (o.dim ? ' dim' : ''), role: 'checkbox', tabindex: '0', 'aria-checked': String(checked) },
      h('div', { class: 'tx' }, h('b', { text: label }), desc ? h('small', { text: desc }) : null), box);
    activate(row, () => (o.onToggle ? o.onToggle(!checked) : setOpt(key, !settings[key])));
    return row;
  }

  function segment(label, current, options, onPick) {
    const box = h('div', { class: 'seg' });
    for (const [value, text] of options) {
      box.append(h('button', { type: 'button', 'aria-pressed': String(current === value), text, onclick: () => onPick(value) }));
    }
    return h('div', { class: 'col' }, h('div', { class: 'lbl', text: label }), box);
  }

  function confirmButton(label, armedLabelFn, action, cls) {
    let armed = false;
    let timer = 0;
    const button = h('button', { class: 'btn ' + (cls || ''), type: 'button', text: label });
    const disarm = () => { armed = false; button.textContent = label; button.classList.remove('arm'); };

    button.addEventListener('click', () => {
      if (!armed) {
        const armedLabel = armedLabelFn();
        if (armedLabel === null) return;
        armed = true;
        button.textContent = armedLabel;
        button.classList.add('arm');
        timer = window.setTimeout(disarm, 3800);
      } else {
        clearTimeout(timer);
        disarm();
        action();
      }
    });
    return button;
  }

  function masterSwitch(compact) {
    const sw = h('span', { class: 'sw', 'aria-hidden': 'true', 'data-on': settings.enabled ? '1' : '0' });
    if (compact) return sw;
    const master = h('div', { class: 'master', role: 'switch', tabindex: '0', 'aria-checked': String(settings.enabled) },
      h('div', { class: 'tx' }, h('b', { text: t('master') }), h('small', { text: settings.enabled ? t('masterOn') : t('masterOff') })), sw);
    activate(master, () => setOpt('enabled', !settings.enabled));
    return master;
  }

  /* ---- tabs: 7 tabs from v6 mapped to 3 tabs with collapsible sections ---- */

  const dim = () => ({ dim: !settings.enabled });

  function buildHome() {
    const f = document.createDocumentFragment();
    f.append(masterSwitch(false));

    const mk = (id, label) => h('div', { class: 'st' }, h('b', { 'data-k': id, text: '0' }), h('span', { text: label }));
    f.append(h('div', { class: 'stats' },
      mk('pendingVideos', t('statPendingVideos')), mk('activeVideos', t('statActiveVideos')),
      mk('pendingFrames', t('statPendingFrames')), mk('activeFrames', t('statActiveFrames'))));

    const kv = h('div', { class: 'kv' });
    for (const [id, label] of [['filteredAds', 'filteredAds'], ['blockedScripts', 'blockedScripts'], ['blockedRequests', 'blockedRequests'],
      ['popups', 'popupsBlocked'], ['resources', 'resources'], ['cleanedEntries', 'cleaned'], ['detachedEntries', 'detached']]) {
      kv.append(h('span', { text: t(label) }), h('span', { 'data-k': id, text: '-' }));
    }
    f.append(section(t('secStats'), kv));

    f.append(section(t('secQuick'),
      h('div', { class: 'pad' },
        h('button', { class: 'btn p', type: 'button', text: t('pauseAll'), onclick: pauseAllMedia }),
        confirmButton(t('releaseBtn'), () => {
          const c = releaseCandidates();
          if (!c.length) { setStatus('stNoRelease'); return null; }
          return t('releaseConfirm', { v: c.filter(e => e.kind === 'video').length, f: c.filter(e => e.kind === 'frame').length });
        }, releaseInactiveNow),
        h('button', { class: 'btn', type: 'button', text: t('reload'), onclick: () => location.reload() })),
      checkRow('emergency', t('emergency'), t('emergencyDesc'), { checked: state.emergency, onToggle: v => { setEmergency(v); renderAll(); } })));
    return f;
  }

  function buildVideo() {
    const f = document.createDocumentFragment();
    const d = dim();
    f.append(section(t('secTap'),
      checkRow('lockVideo', t('lockVideo'), t('lockVideoD'), d),
      checkRow('instantLock', t('instantLock'), t('instantLockD'), d),
      checkRow('showPoster', t('showPoster'), t('showPosterD'), d)));
    f.append(section(t('secPlayback'),
      checkRow('noAutoplay', t('noAutoplay'), t('noAutoplayD'), d),
      checkRow('autoPause', t('autoPause'), t('autoPauseD'), d),
      checkRow('singlePlayback', t('singlePlayback'), t('singlePlaybackD'), d),
      checkRow('resumePosition', t('resumePosition'), t('resumePositionD'), d),
      checkRow('pauseHidden', t('pauseHidden'), t('pauseHiddenD'), d)));
    f.append(section(t('secAudio'), checkRow('lockAudio', t('lockAudio'), t('lockAudioD'), d)));
    const memory = [checkRow('autoRelease', t('autoRelease'), t('autoReleaseD'), d)];
    if (settings.autoRelease) {
      memory.push(h('div', { class: 'pad' }, segment(t('afterMin'), settings.autoReleaseMin,
        ENUMS.autoReleaseMin.map(n => [n, t('min', { n })]), v => setOpt('autoReleaseMin', v))));
    }
    f.append(section(t('secMemory'), ...memory));
    return f;
  }

  function buildFrames() {
    const f = document.createDocumentFragment();
    const d = dim();
    f.append(section(t('secFrames'),
      checkRow('lockFrames', t('lockFrames'), t('lockFramesD'), d),
      checkRow('lockSameSite', t('lockSameSite'), t('lockSameSiteD'), d)));
    return f;
  }

  function buildAds() {
    const f = document.createDocumentFragment();
    const d = dim();
    f.append(section(t('secAdFrames'),
      checkRow('hideKnownAds', t('hideKnownAds'), t('hideKnownAdsD'), d),
      checkRow('hideAdsFully', t('hideAdsFully'), t('hideAdsFullyD'), d)));
    f.append(section(t('secAdNet'),
      checkRow('blockAdScripts', t('blockAdScripts'), t('blockAdScriptsD'), d),
      checkRow('blockAdRequests', t('blockAdRequests'), t('blockAdRequestsD'), d),
      checkRow('blockTrackers', t('blockTrackers'), t('blockTrackersD'), d)));
    f.append(section(t('secShield'),
      checkRow('cosmeticAds', t('cosmeticAds'), t('cosmeticAdsD'), d),
      checkRow('blockPopups', t('blockPopups'), t('blockPopupsD'), d)));

    const area = h('textarea', { dir: 'ltr', spellcheck: 'false', placeholder: 'example-ads.com' });
    area.value = settings.customAdHosts.join('\n');
    f.append(section(t('secCustom'), h('div', { class: 'pad' },
      h('div', { class: 'note', text: t('customHostsHint') }), area,
      h('button', { class: 'btn', type: 'button', text: t('apply'), onclick: () => {
        const list = area.value.split(/\s+/)
          .map(x => x.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/[\/:?#].*$/, ''));
        settings.customAdHosts = sanitize({ customAdHosts: list }, { ...DEFAULTS, customAdHosts: [] }).customAdHosts;
        saveSettings();
        applyAll();
        setStatus('stHosts', { n: settings.customAdHosts.length });
      } }))));
    return f;
  }

  function buildPage() {
    const f = document.createDocumentFragment();
    const d = dim();
    f.append(section(t('secImages'),
      checkRow('lazyImages', t('lazyImages'), t('lazyImagesD'), d),
      checkRow('asyncDecode', t('asyncDecode'), t('asyncDecodeD'), d)));
    f.append(section(t('secMotion'),
      checkRow('calmMotion', t('calmMotion'), t('calmMotionD'), d),
      checkRow('flatEffects', t('flatEffects'), t('flatEffectsD'), d)));
    f.append(section(t('secRender'), checkRow('smartCards', t('smartCards'), t('smartCardsD'), d)));
    return f;
  }

  function buildLook() {
    const f = document.createDocumentFragment();

    f.append(section(t('secLang'), h('div', { class: 'pad' },
      segment(t('lang'), settings.lang, [['en', 'English'], ['fa', 'فارسی']], v => setOpt('lang', v)))));

    const dots = h('div', { class: 'dots' });
    for (const color of ACCENTS) {
      const dot = h('button', { class: 'dot', type: 'button', 'aria-pressed': String(settings.accent === color), 'aria-label': color,
        onclick: () => { setOpt('accent', color); setOpt('themePreset', 'custom'); applyThemePreset(); } });
      dot.style.background = color;
      dots.append(dot);
    }
    const range = h('input', { type: 'range', min: '0.3', max: '1', step: '0.05', value: String(settings.idle),
      oninput: event => { settings.idle = Number(event.target.value); saveSettings(); applyUITheme(); } });

    f.append(section(t('secLook'), h('div', { class: 'pad' },
      segment(t('theme'), settings.theme, [['system', t('tSys')], ['dark', t('tDark')], ['light', t('tLight')]], v => setOpt('theme', v)),
      h('div', { class: 'col' }, h('div', { class: 'lbl', text: t('accent') }), dots),
      segment(t('scale'), settings.scale, [['s', t('sS')], ['m', t('sM')], ['l', t('sL')]], v => setOpt('scale', v)),
      segment(t('side'), settings.side, [['left', t('left')], ['right', t('right')]], v => setOpt('side', v)),
      h('div', { class: 'col' }, h('div', { class: 'lbl', text: t('idle') }), range))));

    // v3.3.0: Theme Presets
    const presetDots = h('div', { class: 'dots' });
    for (const [key, preset] of Object.entries(THEME_PRESETS)) {
      if (key === 'custom') continue; // Custom preset has no color, shown via accent dots
      const dot = h('button', { class: 'dot', type: 'button', 'aria-pressed': String(settings.themePreset === key), 'aria-label': preset.name,
        onclick: () => { setOpt('themePreset', key); applyThemePreset(); } });
      dot.style.background = preset.accent;
      dot.title = preset.name;
      presetDots.append(dot);
    }
    f.append(section(t('secThemes'), h('div', { class: 'pad' },
      h('div', { class: 'col' }, h('div', { class: 'lbl', text: t('themePreset') }), presetDots))));

    // v3.4.0: Video Metadata & Inverted Neumorphic
    f.append(section(t('secVideoMeta'), h('div', { class: 'pad' },
      checkRow('showVideoIndex', t('showVideoIndex'), t('showVideoIndexD'), dim()),
      checkRow('showVideoInfo', t('showVideoInfo'), t('showVideoInfoD'), dim()),
      checkRow('invertedNeumorphic', t('invertedNeumorphic'), t('invertedNeumorphicD'), dim()))));

    f.append(section(t('secLayout'),
      checkRow('compact', t('compact'), ''),
      checkRow('calmMenu', t('calmMenu'), '')));
    return f;
  }

  function copyText(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text);
    } catch (_) {}
    return Promise.reject(new Error('no clipboard'));
  }

  function buildData() {
    const f = document.createDocumentFragment();
    const area = h('textarea', { dir: 'ltr', spellcheck: 'false', placeholder: t('jsonHint') });

    f.append(section(t('secBackup'), h('div', { class: 'pad' }, area,
      h('div', { class: 'two' },
        h('button', { class: 'btn', type: 'button', text: t('exportB'), onclick: () => { area.value = JSON.stringify(settings, null, 1); area.select(); } }),
        h('button', { class: 'btn', type: 'button', text: t('importB'), onclick: () => {
          try {
            Object.assign(settings, sanitize(JSON.parse(area.value), { ...DEFAULTS, customAdHosts: [] }));
            saveSettings();
            applyAll();
            setStatus('stImported', null, true);
          } catch (_) { setStatus('stBadJson', null, true); }
        } })),
      h('button', { class: 'btn', type: 'button', text: t('copyDiag'), onclick: () => {
        const text = diagnosticsText();
        copyText(text).then(() => setStatus('diagCopied', null, true)).catch(() => { area.value = text; area.select(); });
      } }),
      confirmButton(t('resetB'), () => t('resetConfirm'), () => {
        Object.assign(settings, { ...DEFAULTS, customAdHosts: [] });
        saveSettings();
        applyAll();
        setStatus('stReset', null, true);
      }, 'd'))));

    f.append(section(t('secAbout'), h('div', { class: 'pad' },
      h('b', { text: 'Shahvani Ultra Lite ' + VERSION }), h('div', { class: 'note', text: t('aboutText') }))));
    return f;
  }

  const TABS = [
    ['home', 'tabHome', buildHome], ['video', 'tabVideo', buildVideo], ['frames', 'tabFrames', buildFrames], ['ads', 'tabAds', buildAds],
    ['page', 'tabPage', buildPage], ['look', 'tabLook', buildLook], ['data', 'tabData', buildData]
  ];

  function renderAll() {
    const ui = state.ui;
    if (!ui) return;

    ui.tabs.textContent = '';
    for (const [id, key] of TABS) {
      ui.tabs.append(h('button', { class: 'tab', type: 'button', role: 'tab', 'aria-selected': String(state.activeTab === id), text: t(key),
        onclick: () => { state.activeTab = id; renderAll(); ui.body.scrollTop = 0; } }));
    }

    const scrollTop = ui.body.scrollTop;
    ui.body.textContent = '';
    const tab = TABS.find(item => item[0] === state.activeTab) || TABS[0];
    ui.body.append(tab[2]());
    ui.body.scrollTop = scrollTop;

    ui.headSwitch.setAttribute('data-on', settings.enabled ? '1' : '0');
    ui.headSwitch.setAttribute('aria-checked', String(settings.enabled));
    ui.headSwitch.setAttribute('aria-label', t('master'));
    ui.subtitle.textContent = t('subtitle');
    applyUITheme();
    updatePanelNow();
  }

  function updatePanelNow() {
    const ui = state.ui;
    if (!ui) return;

    const stats = collectStats();
    const pending = stats.pendingVideos + stats.pendingFrames;
    ui.badge.textContent = pending ? String(Math.min(99, pending)) : '';
    ui.fab.classList.toggle('off', !settings.enabled);
    ui.foot.textContent = t(state.status.key, state.status.vars);

    if (!state.open || state.activeTab !== 'home') return;

    const values = {
      pendingVideos: stats.pendingVideos, activeVideos: stats.activeVideos,
      pendingFrames: stats.pendingFrames, activeFrames: stats.activeFrames,
      filteredAds: stats.filteredAds, blockedScripts: state.blockedScripts, blockedRequests: state.blockedRequests,
      popups: state.popupsBlocked, resources: stats.resources === null ? '-' : stats.resources,
      cleanedEntries: stats.cleanedEntries, detachedEntries: stats.detachedEntries
    };
    ui.body.querySelectorAll('[data-k]').forEach(node => {
      const value = values[node.getAttribute('data-k')];
      if (value !== undefined) node.textContent = String(value);
    });
  }

  function scheduleUIUpdate() {
    if (state.uiTimer) return;
    state.uiTimer = window.setTimeout(() => {
      state.uiTimer = 0;
      updatePanelNow();
    }, UI_UPDATE_MS);
  }

  function toggleSheet(value) {
    const ui = state.ui;
    if (!ui) return;
    state.open = typeof value === 'boolean' ? value : !state.open;
    ui.sheet.classList.toggle('on', state.open);
    ui.scrim.classList.toggle('on', state.open);
    ui.fab.classList.toggle('open', state.open);
    if (state.open) renderAll();
  }

  function createPanel() {
    if (state.ui || !IS_TOP || !document.documentElement) return;

    const host = document.createElement('shv-ultralite-host');
    const shadow = host.attachShadow({ mode: 'closed' });
    const style = document.createElement('style');
    style.textContent = UI_CSS;

    const root = h('div', { class: 'root' });
    const badge = h('span', { class: 'badge' });
    const fab = h('button', { class: 'fab ' + (settings.side === 'left' ? 'l' : 'r'), type: 'button' }, '⚡', badge);
    const scrim = h('div', { class: 'scrim', onclick: () => toggleSheet(false) });
    const close = h('button', { class: 'x', type: 'button', text: '✕', onclick: () => toggleSheet(false) });
    const subtitle = h('small');
    const headSwitch = h('span', { class: 'sw', role: 'switch', tabindex: '0', 'data-on': '1' });
    activate(headSwitch, () => setOpt('enabled', !settings.enabled));
    const head = h('div', { class: 'head' },
      h('div', { class: 'logo', text: '⚡' }),
      h('div', { class: 'ttl' }, 'Shahvani', subtitle),
      headSwitch, close);
    const tabs = h('div', { class: 'tabs', role: 'tablist' });
    const body = h('div', { class: 'body' });
    const foot = h('div', { class: 'foot', role: 'status' });
    const sheet = h('div', { class: 'sheet', role: 'dialog' }, head, tabs, body, foot);
    const toastEl = h('div', { class: 'toast', role: 'status' });

    root.append(fab, scrim, sheet, toastEl);
    shadow.append(style, root);

    state.ui = { host, root, fab, badge, scrim, sheet, tabs, body, foot, subtitle, close, headSwitch, toast: toastEl };

    let drag = null;
    fab.addEventListener('pointerdown', event => {
      drag = { x: event.clientX, y: event.clientY, moved: false };
      try { fab.setPointerCapture(event.pointerId); } catch (_) {}
    });
    fab.addEventListener('pointermove', event => {
      if (!drag) return;
      if (Math.abs(event.clientY - drag.y) + Math.abs(event.clientX - drag.x) > 8) drag.moved = true;
      if (drag.moved) {
        settings.y = Math.min(0.94, Math.max(0.06, event.clientY / window.innerHeight));
        settings.side = event.clientX < window.innerWidth / 2 ? 'left' : 'right';
        applyUITheme();
      }
    });
    fab.addEventListener('pointerup', () => {
      if (!drag) return;
      const moved = drag.moved;
      drag = null;
      if (moved) saveSettings(); else toggleSheet();
    });
    fab.addEventListener('pointercancel', () => { drag = null; });
    fab.addEventListener('click', event => { if (event.detail === 0) toggleSheet(); });

    document.documentElement.appendChild(host);
    renderAll();

    window.addEventListener('keydown', event => {
      if (event.altKey && event.shiftKey && (event.key === 'L' || event.key === 'l')) {
        event.preventDefault();
        toggleSheet();
      } else if (event.key === 'Escape' && state.open) {
        toggleSheet(false);
      }
    }, true);
  }

  /* ======================================================================
   * 17. Startup
   * ==================================================================== */

  function start() {
    if (state.initialized || !document.documentElement) return;
    state.initialized = true;

    addStyle();
    updateDynamicStyle();
    applyPageTheme();

    // v3.5.3: everything that locks media starts synchronously. Nothing waits for storage -
    // in 3.5.2 the observer was only attached after IndexedDB opened, so videos had already begun loading.
    initializeNow();

    // IndexedDB only keeps a backup of the settings; adopt it if localStorage was empty (cleared / private).
    idbLoadSettings().then(idbSettings => {
      if (!idbSettings || settingsFromLocalStorage) return;
      Object.assign(settings, sanitize(idbSettings, { ...DEFAULTS, customAdHosts: [] }));
      saveSettings();
      applyAll();
    }).catch(() => {});
  }

  function initializeNow() {
    const root = document.documentElement;

    // Observer first, so nothing added after this line can slip past the initial scan.
    state.observer = new MutationObserver(onMutations);
    state.observer.observe(root, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['src', 'srcdoc', 'autoplay', 'preload']
    });

    if (settings.enabled) {
      root.classList.add('shv-ultralite');
      root.classList.toggle('shv-lite-effects', settings.calmMotion);
      root.classList.toggle('shv-ultra-mode', settings.smartCards);
      root.classList.toggle('shv-cosmetic-ads', settings.cosmeticAds);
      root.classList.toggle('shv-flat', settings.flatEffects);
      scanMedia(document);
      if (settings.lazyImages || settings.asyncDecode) optimizeAllImages();
      if (settings.smartCards) optimizeRepeatedCards(document);
      scanVisuals(document);
    }

    if (document.body) createPanel();
    else document.addEventListener('DOMContentLoaded', createPanel, { once: true });

    window.setInterval(autoReleaseTick, AUTO_RELEASE_INTERVAL_MS);

    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
      const onThemeChange = () => { if (settings.theme === 'system') applyUITheme(); };
      if (mediaQuery.addEventListener) mediaQuery.addEventListener('change', onThemeChange);
      else if (mediaQuery.addListener) mediaQuery.addListener(onThemeChange);
    } catch (_) {}

    applyThemePreset();
  }

  function applyThemePreset() {
    const preset = THEME_PRESETS[settings.themePreset] || THEME_PRESETS.default;
    if (!preset) return;

    const root = document.documentElement;

    // For 'custom' preset, use current accent; otherwise use preset accent
    const accentColor = (settings.themePreset === 'custom' || preset.accent === null)
      ? settings.accent
      : preset.accent;

    root.style.setProperty('--shv-accent', accentColor);

    // Update panel accent
    if (state.ui) {
      state.ui.root.style.setProperty('--ac', accentColor);
      state.ui.root.style.setProperty('--on', accentText(accentColor));
    }
  }

  if (window.__SHV_TEST__) {
    Object.assign(window.__SHV_TEST__, {
      state, settings, T, DEFAULTS, KNOWN_AD_HOSTS, applyAll, setOpt, getUI: () => state.ui, diagnosticsText,
      videoStates, activateVideo, releaseInactiveNow, hashKey, videoKeyUrl, isLockedMedia,
      // Internal test functions
      testSanitize: (input) => sanitize(input, { ...DEFAULTS, customAdHosts: [] }),
      testIsUsableURL: (raw) => isUsableURL(raw),
      testHostMatches: (host, list) => hostMatches(host, list)
    });
  }

  if (document.documentElement) {
    start();
  } else {
    // At document-start <html> may not exist yet. Wait for it with a MutationObserver (fires the moment the
    // parser creates <html>); the old readystatechange fallback only fired after the whole page was parsed,
    // by which time every video in the HTML had already started loading.
    const boot = new MutationObserver(() => {
      if (document.documentElement) { boot.disconnect(); start(); }
    });
    boot.observe(document, { childList: true });
    document.addEventListener('readystatechange', () => { if (document.documentElement) { boot.disconnect(); start(); } });
  }
})();