// ==UserScript==
// @name         Shahvani Ultra Lite
// @namespace    local.shahvani.ultralite
// @version      3.6.4
// @description  Shahvani Ultra Lite 3.6.4 (saved videos list, sturdier thumbnails + downloads on Firefox for Android, keyboard shortcuts): tap-to-load media, bilingual EN/FA, IndexedDB storage, theme colors, Download tab (select, copy links, Firefox / Tampermonkey download, shahvani.com + up.shahvani.com), video resume, video metadata cache, optional light size/duration probe (off by default). Locked videos download nothing unless the probe is set to Auto (then only the first few KB of a card in view).
// @author       parham
// @homepageURL  https://github.com/parhamghahremani


// @match        *://shahvani.com/*
// @match        *://*.shahvani.com/*
// @run-at       document-start
// @sandbox      raw
// @grant        GM_download
// @grant        GM_xmlhttpRequest
// @connect      up.shahvani.com
// @connect      shahvani.com
// @connect      *
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTI4IDEyOCIgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiPjxkZWZzPjxyYWRpYWxHcmFkaWVudCBpZD0ib3JiIiBjeD0iMC40IiBjeT0iMC4zIiByPSIwLjk1Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMzYTE0NjYiLz48c3RvcCBvZmZzZXQ9IjAuNTUiIHN0b3AtY29sb3I9IiMxNzBhM2EiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwNjAyMTMiLz48L3JhZGlhbEdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0icmVkIiB4MT0iMC4xNSIgeTE9IjAiIHgyPSIwLjgiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZjdhOTIiLz48c3RvcCBvZmZzZXQ9IjAuNCIgc3RvcC1jb2xvcj0iI2ZmMWY1NSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2IwMDAyZSIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJzaWRlIiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjOGEwYTJhIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNDYwNDFhIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9InJpbmdnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZmM2IwIi8+PHN0b3Agb2Zmc2V0PSIwLjUiIHN0b3AtY29sb3I9IiNmZmM4M2QiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZjlhMWYiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iZWRnZSIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmN2FiOCIvPjxzdG9wIG9mZnNldD0iMC41IiBzdG9wLWNvbG9yPSIjOGI1Y2Y2Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjJkM2VlIi8+PC9saW5lYXJHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgaWQ9InNwZWMiIGN4PSIwLjUiIGN5PSIwLjUiIHI9IjAuNSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9IjAuOTUiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iMCIvPjwvcmFkaWFsR3JhZGllbnQ+PGZpbHRlciBpZD0iYmx1ciIgeD0iLTMwJSIgeT0iLTMwJSIgd2lkdGg9IjE2MCUiIGhlaWdodD0iMTYwJSI+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMy41Ii8+PC9maWx0ZXI+PGZpbHRlciBpZD0iYmx1cjUiIHg9Ii0zMCUiIHk9Ii0zMCUiIHdpZHRoPSIxNjAlIiBoZWlnaHQ9IjE2MCUiPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjUiLz48L2ZpbHRlcj48ZmlsdGVyIGlkPSJibHVyMTAiIHg9Ii02MCUiIHk9Ii02MCUiIHdpZHRoPSIyMjAlIiBoZWlnaHQ9IjIyMCUiPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjEwIi8+PC9maWx0ZXI+PGZpbHRlciBpZD0iZ2xvdyIgeD0iLTQwJSIgeT0iLTQwJSIgd2lkdGg9IjE4MCUiIGhlaWdodD0iMTgwJSI+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMS44IiByZXN1bHQ9ImIiLz48ZmVNZXJnZT48ZmVNZXJnZU5vZGUgaW49ImIiLz48ZmVNZXJnZU5vZGUgaW49IlNvdXJjZUdyYXBoaWMiLz48L2ZlTWVyZ2U+PC9maWx0ZXI+PGNsaXBQYXRoIGlkPSJvY2xpcCI+PGNpcmNsZSBjeD0iNjQiIGN5PSI2NCIgcj0iNTYiLz48L2NsaXBQYXRoPjxwYXRoIGlkPSJoZWFydCIgZD0iTTY0IDExNiBDMTYgODQgNiA1NCA2IDM4IEM2IDIyIDE4IDEwIDM0IDEwIEM0NyAxMCA1OCAxNyA2NCAyOSBDNzAgMTcgODEgMTAgOTQgMTAgQzExMCAxMCAxMjIgMjIgMTIyIDM4IEMxMjIgNTQgMTEyIDg0IDY0IDExNiBaIi8+PGNsaXBQYXRoIGlkPSJoY2xpcCI+PHVzZSB4bGluazpocmVmPSIjaGVhcnQiIGhyZWY9IiNoZWFydCIvPjwvY2xpcFBhdGg+PHBhdGggaWQ9InN0YXIiIGQ9Ik0wIC02IEwxLjYgLTEuNiBMNiAwIEwxLjYgMS42IEwwIDYgTC0xLjYgMS42IEwtNiAwIEwtMS42IC0xLjYgWiIvPjxwYXRoIGlkPSJtaW5pIiBkPSJNMCA2IEMtOSAtMSAtNiAtNyAwIC0zIEM2IC03IDkgLTEgMCA2IFoiLz48ZyBpZD0iZ3NoIiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik01MiA2MiBDNDcgNTQgMjYgNTQgMjYgNjUgQzI2IDc2IDUyIDcyIDUyIDgzIEM1MiA5NCAzMCA5NCAyNCA4NiIvPjxwYXRoIGQ9Ik02OCAzMCBWOTIiLz48cGF0aCBkPSJNNjggNzIgQzY4IDYwIDc3IDU1IDg1IDU1IEM5NCA1NSAxMDAgNjEgMTAwIDcxIFY5MiIvPjwvZz48L2RlZnM+PGVsbGlwc2UgY3g9IjY0IiBjeT0iMTIzIiByeD0iMzQiIHJ5PSI0IiBmaWxsPSIjMDAwIiBvcGFjaXR5PSIwLjU1IiBmaWx0ZXI9InVybCgjYmx1cikiLz48Y2lyY2xlIGN4PSI2NCIgY3k9IjY0IiByPSI1NiIgZmlsbD0idXJsKCNvcmIpIi8+PGcgY2xpcC1wYXRoPSJ1cmwoI29jbGlwKSI+PGNpcmNsZSBjeD0iMjYiIGN5PSIyOCIgcj0iMzIiIGZpbGw9IiNjMDI2ZDMiIG9wYWNpdHk9IjAuNDUiIGZpbHRlcj0idXJsKCNibHVyMTApIi8+PGNpcmNsZSBjeD0iMTA2IiBjeT0iMTAyIiByPSIzNCIgZmlsbD0iIzI1NjNlYiIgb3BhY2l0eT0iMC41IiBmaWx0ZXI9InVybCgjYmx1cjEwKSIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjI0IiByPSIyMiIgZmlsbD0iI2ZmMmQ3NSIgb3BhY2l0eT0iMC4zMCIgZmlsdGVyPSJ1cmwoI2JsdXIxMCkiLz48ZyBmaWxsPSIjZmZmIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjUwIiByPSIxLjIiIG9wYWNpdHk9IjAuOSIvPjxjaXJjbGUgY3g9IjM0IiBjeT0iMTYiIHI9IjEiIG9wYWNpdHk9IjAuOCIvPjxjaXJjbGUgY3g9IjUyIiBjeT0iMTAiIHI9IjAuOSIgb3BhY2l0eT0iMC43Ii8+PGNpcmNsZSBjeD0iODYiIGN5PSIxMiIgcj0iMS4yIiBvcGFjaXR5PSIwLjkiLz48Y2lyY2xlIGN4PSIxMTIiIGN5PSI0MCIgcj0iMSIgb3BhY2l0eT0iMC44Ii8+PGNpcmNsZSBjeD0iMTE2IiBjeT0iNzAiIHI9IjEuMyIgb3BhY2l0eT0iMC43Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSI4MiIgcj0iMSIgb3BhY2l0eT0iMC43Ii8+PGNpcmNsZSBjeD0iMzAiIGN5PSIxMDgiIHI9IjEuMiIgb3BhY2l0eT0iMC44Ii8+PGNpcmNsZSBjeD0iNjQiIGN5PSIxMTgiIHI9IjAuOSIgb3BhY2l0eT0iMC42Ii8+PGNpcmNsZSBjeD0iOTYiIGN5PSIxMTIiIHI9IjEiIG9wYWNpdHk9IjAuOCIvPjxjaXJjbGUgY3g9IjQ0IiBjeT0iMTEyIiByPSIwLjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjEwOCIgY3k9IjE2IiByPSIwLjkiIG9wYWNpdHk9IjAuNyIvPjwvZz48L2c+PGNpcmNsZSBjeD0iNjQiIGN5PSI2NCIgcj0iNTUiIGZpbGw9Im5vbmUiIHN0cm9rZT0idXJsKCNlZGdlKSIgc3Ryb2tlLXdpZHRoPSIyLjQiLz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgtMTggNjQgNjYpIj48cGF0aCBkPSJNMTIgNjYgQTUyIDE0IDAgMCAxIDExNiA2NiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ1cmwoI3JpbmdnKSIgc3Ryb2tlLXdpZHRoPSIyLjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgb3BhY2l0eT0iMC41NSIvPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2NCA2Mykgc2NhbGUoMC43KSB0cmFuc2xhdGUoLTY0IC02MykiPjx1c2UgeGxpbms6aHJlZj0iI2hlYXJ0IiBocmVmPSIjaGVhcnQiIGZpbGw9IiNmZjFmNTUiIG9wYWNpdHk9IjAuODUiIGZpbHRlcj0idXJsKCNibHVyMTApIi8+PHVzZSB4bGluazpocmVmPSIjaGVhcnQiIGhyZWY9IiNoZWFydCIgZmlsbD0idXJsKCNzaWRlKSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCA2KSIvPjx1c2UgeGxpbms6aHJlZj0iI2hlYXJ0IiBocmVmPSIjaGVhcnQiIGZpbGw9InVybCgjcmVkKSIvPjxnIGNsaXAtcGF0aD0idXJsKCNoY2xpcCkiPjx1c2UgeGxpbms6aHJlZj0iI2hlYXJ0IiBocmVmPSIjaGVhcnQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZhMDcyMCIgc3Ryb2tlLXdpZHRoPSIxMiIgb3BhY2l0eT0iMC41IiBmaWx0ZXI9InVybCgjYmx1cjUpIi8+PGVsbGlwc2UgY3g9IjMwIiBjeT0iMzAiIHJ4PSIyNCIgcnk9IjE0IiBmaWxsPSJ1cmwoI3NwZWMpIi8+PGVsbGlwc2UgY3g9Ijk4IiBjeT0iMjQiIHJ4PSIxMCIgcnk9IjYiIGZpbGw9InVybCgjc3BlYykiIG9wYWNpdHk9IjAuNiIgdHJhbnNmb3JtPSJyb3RhdGUoLTI1IDk4IDI0KSIvPjwvZz48dXNlIHhsaW5rOmhyZWY9IiNoZWFydCIgaHJlZj0iI2hlYXJ0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjc1IiBzdHJva2Utd2lkdGg9IjIuMiIvPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2NCA1Nykgc2NhbGUoMC41NSkgdHJhbnNsYXRlKC02MiAtNjEpIj48ZyBzdHJva2U9IiM1YTA1MTgiIHN0cm9rZS13aWR0aD0iMTUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgOCkiPjx1c2UgeGxpbms6aHJlZj0iI2dzaCIgaHJlZj0iI2dzaCIvPjwvZz48ZyBzdHJva2U9IiNhMzQ4MGEiIHN0cm9rZS13aWR0aD0iMTQiPjx1c2UgeGxpbms6aHJlZj0iI2dzaCIgaHJlZj0iI2dzaCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCA2KSIvPjx1c2UgeGxpbms6aHJlZj0iI2dzaCIgaHJlZj0iI2dzaCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCA0LjUpIi8+PHVzZSB4bGluazpocmVmPSIjZ3NoIiBocmVmPSIjZ3NoIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDMpIi8+PHVzZSB4bGluazpocmVmPSIjZ3NoIiBocmVmPSIjZ3NoIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEuNSkiLz48L2c+PHVzZSB4bGluazpocmVmPSIjZ3NoIiBocmVmPSIjZ3NoIiBzdHJva2U9IiNmZmQ0NWEiIHN0cm9rZS13aWR0aD0iMTMiLz48L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoLTE4IDY0IDY2KSI+PHBhdGggZD0iTTEyIDY2IEE1MiAxNCAwIDAgMCAxMTYgNjYiIGZpbGw9Im5vbmUiIHN0cm9rZT0idXJsKCNyaW5nZykiIHN0cm9rZS13aWR0aD0iMi42IiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbHRlcj0idXJsKCNnbG93KSIvPjxjaXJjbGUgY3g9IjEwNCIgY3k9Ijc1IiByPSIzLjQiIGZpbGw9IiNmZmZiZTAiIGZpbHRlcj0idXJsKCNnbG93KSIvPjxjaXJjbGUgY3g9IjI0IiBjeT0iNzIiIHI9IjIiIGZpbGw9IiNmZmQ0NWEiIGZpbHRlcj0idXJsKCNnbG93KSIvPjwvZz48dXNlIHhsaW5rOmhyZWY9IiNzdGFyIiBocmVmPSIjc3RhciIgZmlsbD0iI2ZmZiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOTggMjgpIHNjYWxlKDEuNCkiLz48dXNlIHhsaW5rOmhyZWY9IiNzdGFyIiBocmVmPSIjc3RhciIgZmlsbD0iI2ZmZTA4YSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjggMzYpIHNjYWxlKDEpIi8+PHVzZSB4bGluazpocmVmPSIjc3RhciIgaHJlZj0iI3N0YXIiIGZpbGw9IiNmZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDk0IDEwNCkgc2NhbGUoMC45KSIvPjx1c2UgeGxpbms6aHJlZj0iI21pbmkiIGhyZWY9IiNtaW5pIiBmaWxsPSIjZmY3YTlhIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMC43IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMCA5Nikgcm90YXRlKC0xNSkiLz48dXNlIHhsaW5rOmhyZWY9IiNtaW5pIiBocmVmPSIjbWluaSIgZmlsbD0iI2ZmZDFkYyIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjAuNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTA4IDU2KSByb3RhdGUoMTUpIHNjYWxlKDAuOCkiLz48L3N2Zz4=
// ==/UserScript==

(() => {
  'use strict';

  const VERSION = '3.6.4';

  // v3.6.1: a video / audio / image opened on its own (e.g. a direct up.shahvani.com link in a tab) is the browser's own
  // viewer, not a page: nothing to lock, nothing to patch.
  try { if (/^(video|audio|image)\//i.test(document.contentType || '')) return; } catch (_) {}
  const KEY = 'shvUltraLite.settings.v3';
  const LEGACY_KEYS = ['shvUltraLite.settings.v2'];
  const IDB_NAME = 'shvUltraLiteDB';
  const IDB_VERSION = 4; // v3.5.3: v2 adds the videoMetadata store; v3.6.1: v3 adds the thumbnails store; v3.6.4: v4 adds savedThumbs
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
  // v3.6.1: every video lock card has exactly this size, whatever the real video measures: 733.97 x 412.85 -> 734 x 413 (16:9)
  const CARD_W = 734;
  const CARD_H = 413;
  const ASPECT_RATIO_MIN = 0.4;
  const ASPECT_RATIO_MAX = 3.5;
  const ASPECT_RATIO_DEFAULT = 16 / 9;
  const GESTURE_WINDOW_MS = 5000;
  const TOAST_DURATION_MS = 2200;
  const MAX_SAFE_INT = 2147483647;
  // v3.5.4: size/duration probe (only used when videoProbe === 'auto')
  const PROBE_HEAD_BYTES = 16384;       // request 1: ftyp + moov header + mvhd fit easily
  const PROBE_TAIL_BYTES = 8192;        // request 2: starts exactly at the moov box (when it is behind mdat)
  const PROBE_CONCURRENCY = 2;          // gentle on mobile
  const PROBE_TIMEOUT_MS = 8000;        // one request of the manager / fetch
  const PROBE_TOTAL_MS = 24000;         // v3.6.3: whole chain of one video (HEAD + Range + element) - the old single 8 s limit cut it short
  const PROBE_SESSION_MAX = 120;        // hard cap per page load (worst case ~3 MB in total)
  const PROBE_VISIBLE_MARGIN = '200px 0px';
  const Z_INDEX_FAB = 2147483646;
  const Z_INDEX_SCRIM = 2147483645;
  const Z_INDEX_PANEL = 2147483647;
  const Z_INDEX_TOAST = 2147483647;
  const IS_ANDROID = /Android/i.test(navigator.userAgent);
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
    themeColor: 'default',   // v3.6.0: replaces accent + themePreset (one source for every UI color)
    scale: 'm',
    compact: false,
    calmMenu: false,
    side: 'left',
    fabY: 1,   // v3.5.5: vertical position of the button: 0 = top ... 1 = bottom (default: bottom corner)
    idle: 0.9,

    // v3.3.0 features
    showFabStats: true,

    // v3.4.0 features
    showVideoIndex: true,
    showVideoInfo: true,
    invertedNeumorphic: true,

    // v3.5.4: size/duration lookup: 'off' (nothing at all) | 'cache' (local cache only) | 'auto' (Range probe of cards in view)
    videoProbe: 'off',

    // v3.6.3: keyboard shortcuts (Alt+Shift+key)
    shortcuts: true,

    // v3.6.4
    dlMethod: 'auto',     // auto | link (browser link / blob, no Tampermonkey downloader) | gm (Tampermonkey downloader first)
    autoThumbs: true      // Download tab: make a thumbnail for a row that has none (one picture at a time, cached)
  });

  const ENUMS = {
    lang: ['en', 'fa'],
    theme: ['system', 'dark', 'light'],
    scale: ['s', 'm', 'l'],
    side: ['left', 'right'],
    autoReleaseMin: [1, 3, 5, 10, 30],
    videoProbe: ['off', 'cache', 'auto'],
    dlMethod: ['auto', 'link', 'gm']
  };

  // v3.6.0: Theme Color = accent + optional surface tint (dark / light). null tint = stock colors.
  const THEME_COLORS = {
    default:    { name: { en: 'Teal',       fa: 'سبزآبی' },   accent: '#00d4aa', darkBg: null,      lightBg: null },
    midnight:   { name: { en: 'Midnight',   fa: 'نیمه‌شب' },  accent: '#818cf8', darkBg: '#0f172a', lightBg: '#e0e7ff' },
    forest:     { name: { en: 'Forest',     fa: 'جنگل' },     accent: '#34d399', darkBg: '#064e3b', lightBg: '#d1fae5' },
    sunset:     { name: { en: 'Sunset',     fa: 'غروب' },     accent: '#fbbf24', darkBg: '#7c2d12', lightBg: '#fef3c7' },
    monochrome: { name: { en: 'Monochrome', fa: 'تک‌رنگ' },   accent: '#9ca3af', darkBg: '#111827', lightBg: '#f3f4f6' },
    ocean:      { name: { en: 'Ocean',      fa: 'اقیانوس' },  accent: '#22d3ee', darkBg: '#083344', lightBg: '#cffafe' },
    coral:      { name: { en: 'Coral',      fa: 'مرجانی' },   accent: '#f87171', darkBg: '#450a0a', lightBg: '#fee2e2' },
    rose:       { name: { en: 'Rose',       fa: 'رز' },       accent: '#f472b6', darkBg: '#500724', lightBg: '#fce7f3' }
  };
  ENUMS.themeColor = Object.keys(THEME_COLORS);

  /**
   * v3.6.0: map the settings of 3.5.x (accent + themePreset) onto a Theme Color, keeping what the user saw:
   * a non-custom preset always won over the saved accent; otherwise the nearest swatch to the saved accent.
   */
  function migrateThemeColor(input) {
    const p = typeof input.themePreset === 'string' ? input.themePreset : '';
    if (p && p !== 'custom' && THEME_COLORS[p]) return p;
    const hex = typeof input.accent === 'string' && /^#[0-9a-f]{6}$/i.test(input.accent) ? input.accent.toLowerCase() : '';
    if (!hex) return 'default';
    const rgb = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
    const a = rgb(hex);
    let best = 'default';
    let bestDist = Infinity;
    for (const [key, c] of Object.entries(THEME_COLORS)) {
      const b = rgb(c.accent);
      const d = (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
      if (d < bestDist) { best = key; bestDist = d; }
    }
    return best;
  }

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
            .slice(0, MAX_CUSTOM_AD_HOSTS);
        }
      } else if (key === 'fabY') {
        if (typeof val === 'number' && val >= 0 && val <= 1) out[key] = val;
      } else if (key === 'idle') {
        if (typeof val === 'number' && val >= 0.3 && val <= 1) out[key] = val;
      } else if (ENUMS[key]) {
        if (ENUMS[key].includes(val)) out[key] = val;
      } else if (typeof val === typeof def) {
        out[key] = val;
      }
    }
    // v3.6.0: settings saved by 3.5.x carry accent / themePreset instead of themeColor
    if (!ENUMS.themeColor.includes(input.themeColor) && ('accent' in input || 'themePreset' in input)) {
      out.themeColor = migrateThemeColor(input);
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
  let idbHealth = 'not used yet';

  function idbInit() {
    if (idbDb) return Promise.resolve(idbDb);
    if (idbInitPromise) return idbInitPromise;

    idbInitPromise = new Promise((resolve, reject) => {
      try {
        const request = indexedDB.open(IDB_NAME, IDB_VERSION);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          idbHealth = 'ok';
          idbDb = request.result;
          idbDb.onversionchange = () => { try { idbDb.close(); } catch (_) {} idbDb = null; idbInitPromise = null; };
          resolve(idbDb);
        };
        // v3.6.4: 'blocked' only means another tab still holds the old version: wait for it (it closes itself), do not give up
        request.onblocked = () => { idbHealth = 'blocked by another tab'; window.setTimeout(() => reject(new Error('IndexedDB blocked')), 8000); };
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
          // v3.6.1: persistent thumbnails of the Download tab (small JPEG data URLs, 30 days)
          if (!db.objectStoreNames.contains('thumbnails')) {
            const store = db.createObjectStore('thumbnails', { keyPath: 'id' });
            store.createIndex('timestamp', 'timestamp', { unique: false });
          }
          // v3.6.4: thumbnails of saved videos: kept as long as the video stays saved (no expiry)
          if (!db.objectStoreNames.contains('savedThumbs')) {
            db.createObjectStore('savedThumbs', { keyPath: 'id' });
          }
        };
      } catch (_) {
        reject(new Error('IndexedDB not available'));
      }
    });
    // v3.6.4: a failed open is not remembered forever - the next call tries again
    idbInitPromise.catch(err => { idbHealth = 'failed: ' + ((err && (err.name || err.message)) || 'unknown'); idbInitPromise = null; });
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
   * v3.5.5: Remove the saved resume position of a video (finished videos must start over next time).
   * @param {string} videoSrc - Video source URL
   * @returns {void}
   */
  function idbDeleteResumePosition(videoSrc) {
    if (!videoSrc) return;
    idbInit().then(db => {
      const tx = db.transaction('resumePositions', 'readwrite');
      tx.objectStore('resumePositions').delete(hashKey(videoKeyUrl(videoSrc)));
    }).catch(() => {});
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
            resolve({ duration: result.duration, size: result.size, aspectRatio: result.aspectRatio, probed: !!result.probed });
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
    if (!entry.videoSrc || (!entry.videoDuration && !entry.videoSize && !entry.probed)) return;
    const cacheKey = 'videoMeta_' + hashKey(videoKeyUrl(entry.videoSrc));
    idbInit().then(db => {
      if (!db.objectStoreNames.contains('videoMetadata')) return;
      const tx = db.transaction('videoMetadata', 'readwrite');
      const store = tx.objectStore('videoMetadata');
      const getReq = store.get(cacheKey);
      // v3.5.4: merge with what is already stored, so a value learned in 'off' mode never erases one learned earlier.
      getReq.onsuccess = () => {
        const old = getReq.result || {};
        store.put({
          id: cacheKey,
          videoSrc: entry.videoSrc,
          duration: entry.videoDuration || old.duration || 0,
          size: entry.videoSize || old.size || 0,
          aspectRatio: entry.aspectRatio || old.aspectRatio,
          probed: !!(entry.probed || old.probed),
          timestamp: Date.now()
        });
      };
    }).catch(() => {});
  }

  /* ---- v3.6.1: thumbnail + video-info cache helpers for the Download tab (local only, no network) ---- */

  const THUMB_TTL_MS = 30 * 24 * 60 * 60 * 1000;
  const THUMB_DB_MAX = 400;

  /**
   * v3.6.4: a small ring of records in localStorage - the fallback when IndexedDB is unusable (private window, blocked,
   * storage policy). { put, get, del }; the oldest record goes first, a quota error drops half of them.
   */
  function makeLsRing(storageKey, max, maxLen) {
    const read = () => {
      try {
        const o = JSON.parse(localStorage.getItem(storageKey) || 'null');
        if (o && Array.isArray(o.o) && o.m && typeof o.m === 'object') return o;
      } catch (_) {}
      return { o: [], m: {} };
    };
    const write = d => { try { localStorage.setItem(storageKey, JSON.stringify(d)); return true; } catch (_) { return false; } };
    return {
      put(key, rec) {
        if (!key || !rec || !rec.u || (rec.u.length > maxLen && !rec.r)) return;
        const d = read();
        if (!d.m[key]) d.o.push(key);
        rec.t = Date.now();
        d.m[key] = rec;
        while (d.o.length > max) delete d.m[d.o.shift()];
        if (!write(d)) { d.o.splice(0, Math.ceil(d.o.length / 2)).forEach(k => { delete d.m[k]; }); write(d); }
      },
      get(keys, ttl) {
        const d = read();
        const out = new Map();
        const limit = ttl ? Date.now() - ttl : 0;
        for (const k of keys) { const r = d.m[k]; if (r && r.t > limit) out.set(k, r); }
        return out;
      },
      del(key) {
        const d = read();
        if (!d.m[key]) return;
        delete d.m[key];
        d.o = d.o.filter(k => k !== key);
        write(d);
      }
    };
  }
  const lsThumbs = makeLsRing('shvUltraLite.thumbs.v1', 60, 24000);
  const lsSavedThumbs = makeLsRing('shvUltraLite.savedth.v1', 80, 24000);

  /**
   * Keeps a stored poster thumbnail: a later frame-based one never replaces it. `remote` = the url is the poster's own
   * address (a cross-origin poster whose pixels cannot be read), shown straight from the browser's cache.
   * v3.6.4: a failed IndexedDB write falls back to localStorage.
   */
  function idbSaveThumb(key, url, kind, remote) {
    if (!key || !url) return;
    idbInit().then(db => new Promise((resolve, reject) => {
      if (!db.objectStoreNames.contains('thumbnails')) { reject(new Error('no thumbnails store')); return; }
      const tx = db.transaction('thumbnails', 'readwrite');
      const store = tx.objectStore('thumbnails');
      const req = store.get(key);
      req.onsuccess = () => {
        const old = req.result;
        if (old && old.kind === 'poster' && !old.remote && kind !== 'poster') return;
        store.put({ id: key, url, kind, remote: !!remote, timestamp: Date.now() });
      };
      tx.oncomplete = () => resolve();
      tx.onerror = tx.onabort = () => reject(tx.error || new Error('transaction failed'));
    })).catch(err => {
      diagNote('idb', 'thumbnails', err);
      lsThumbs.put(key, { u: url, k: kind, r: remote ? 1 : 0 });
    });
  }

  /** @returns {Promise<Map<string, {url: string, kind: string, remote: boolean}>>} the thumbnails found for `keys` (fresh ones only). */
  function idbGetThumbs(keys) {
    const fromLs = lsThumbs.get(keys, THUMB_TTL_MS);
    const fromIdb = idbInit().then(db => new Promise(resolve => {
      const out = new Map();
      if (!keys.length || !db.objectStoreNames.contains('thumbnails')) { resolve(out); return; }
      const tx = db.transaction('thumbnails', 'readonly');
      const store = tx.objectStore('thumbnails');
      const limit = Date.now() - THUMB_TTL_MS;
      for (const key of keys) {
        const req = store.get(key);
        req.onsuccess = () => {
          const r = req.result;
          if (r && typeof r.url === 'string' && r.timestamp > limit) out.set(key, { url: r.url, kind: r.kind === 'poster' ? 'poster' : 'frame', remote: !!r.remote });
        };
      }
      tx.oncomplete = () => resolve(out);
      tx.onerror = tx.onabort = () => resolve(out);
    })).catch(err => { diagNote('idb', 'read', err); return new Map(); });
    return fromIdb.then(out => {
      for (const [k, r] of fromLs) if (!out.has(k)) out.set(k, { url: r.u, kind: r.k === 'poster' ? 'poster' : 'frame', remote: !!r.r });
      return out;
    });
  }

  /** @returns {Promise<Map<string, {duration: number, size: number}>>} cached duration / size (videoMetadata store, 7 days). */
  function idbGetVideoMetaMany(keys) {
    return idbInit().then(db => new Promise(resolve => {
      const out = new Map();
      if (!keys.length || !db.objectStoreNames.contains('videoMetadata')) { resolve(out); return; }
      const tx = db.transaction('videoMetadata', 'readonly');
      const store = tx.objectStore('videoMetadata');
      const limit = Date.now() - 7 * 24 * 60 * 60 * 1000;
      for (const key of keys) {
        const req = store.get('videoMeta_' + key);
        req.onsuccess = () => {
          const r = req.result;
          if (r && r.timestamp > limit && (r.duration > 0 || r.size > 0)) out.set(key, { duration: r.duration || 0, size: r.size || 0 });
        };
      }
      tx.oncomplete = () => resolve(out);
      tx.onerror = tx.onabort = () => resolve(out);
    })).catch(() => new Map());
  }

  /** Drops expired thumbnails and keeps the store under THUMB_DB_MAX (oldest first). Runs once, a few seconds after start. */
  function idbPruneThumbs() {
    idbInit().then(db => {
      if (!db.objectStoreNames.contains('thumbnails')) return;
      const tx = db.transaction('thumbnails', 'readwrite');
      const store = tx.objectStore('thumbnails');
      const index = store.index('timestamp');
      const old = index.openCursor(IDBKeyRange.upperBound(Date.now() - THUMB_TTL_MS));
      old.onsuccess = () => { const c = old.result; if (c) { c.delete(); c.continue(); } };
      tx.oncomplete = () => {
        idbInit().then(db2 => {
          const tx2 = db2.transaction('thumbnails', 'readwrite');
          const store2 = tx2.objectStore('thumbnails');
          const countReq = store2.count();
          countReq.onsuccess = () => {
            let extra = countReq.result - THUMB_DB_MAX;
            if (extra <= 0) return;
            const cur = store2.index('timestamp').openCursor();
            cur.onsuccess = () => { const c = cur.result; if (c && extra-- > 0) { c.delete(); c.continue(); } };
          };
        }).catch(() => {});
      };
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
      theme: 'Mode',
      tSys: 'System',
      tDark: 'Dark',
      tLight: 'Light',
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
      showFabStats: 'FAB stats tooltip',
      showFabStatsD: 'Show detailed stats on FAB hover/long-press.',

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
      stNoRelease: 'Nothing to release. Locked videos and visible frames stay as they are.',
      stReleased: 'Released. Videos: {v}, frames: {f}.',
      stAutoReleased: 'Auto-released {n} idle video(s).',

      // v3.4.0 additions
      secVideoMeta: 'Video Metadata',
      showVideoIndex: 'Show video number',
      showVideoIndexD: 'Display sequential video number on each placeholder (top-left).',
      showVideoInfo: 'Show size & duration',
      showVideoInfoD: 'Display video file size and duration on placeholder (bottom-right) when available.',
      probeMode: 'Size & duration lookup',
      probeModeD: 'Off: nothing is requested and the cache is not read. Cache only: shows size/duration remembered from videos you opened before (no network). Auto: for each card in view that the cache does not know, only the first few KB of the file are requested (a Range request) to read size and duration; the video itself is never downloaded. Needs \u201cShow size & duration\u201d.',
      probeOff: 'Off',
      probeCache: 'Cache only',
      probeAuto: 'Auto',
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
      probeTraffic: 'Probe requests · data',
      master: 'Script',
      masterOn: 'On',
      masterOff: 'Off',
      secQuick: 'Quick Actions',
      pauseAll: 'Pause All',
      releaseBtn: 'Release',
      releaseConfirm: 'Confirm release? Videos: {v}, Frames: {f}',
      // v3.6.0: Download tab, Unlock & Load All, Theme Color
      tabDownload: 'Download',
      secThemeColor: 'Theme Color',
      dlSelectedCount: 'Selected: {n} of {m}',
      dlTotals: 'Total: {dur} · {size}',
      dlTotalsUnknown: ' (+{u} incomplete)',
      stDlGmStart: 'Downloading {i} of {n} through Tampermonkey: {name}',
      stDlGmRunning: 'Tampermonkey is still downloading {name} (no progress reports).',
      stDlGmDone: 'Download finished / started: {name}',
      stDlBlob: 'Tampermonkey downloader failed, trying the fallback: {name}',
      stDlSentFailed: 'Started {n}{v}; {f} failed (reason in red, links copied; use Retry failed). Skipped: {m}.',
      dlSelectAll: 'Select all',
      dlDeselectAll: 'Deselect all',
      dlDownload: 'Download Selected ({n})',
      dlCopy: 'Copy Selected Links ({n})',
      dlConfirm: 'Send {n} downloads? Tap again',
      dlEmpty: 'No videos found on this page.',
      dlNote: 'Downloads go straight into the queue - no confirmation, one video or many. Several run at once; a failed one is listed in red with its reason and can be retried. Download method: Auto picks what works on your device (Android: the Tampermonkey downloader is tried first and dropped for the session if it does not start a file), Browser = plain links / memory, Tampermonkey = its downloader first. up.shahvani.com always needs Tampermonkey (allow its permission prompt once: Always allow all domains). Only videos of THIS page are listed - use the bookmark icon to keep one for later.',
      dlOffPage: 'Not on this page',
      dlStream: 'Stream playlist: no direct file',
      dlNoLink: 'No usable link',
      dlNoDirect: 'Other site: opens in a new tab (save it from there) or use Copy',
      dlViaTm: 'Other site: downloaded through Tampermonkey',
      dlTipSelect: 'Select this video',
      dlTipDownload: 'Download this video',
      dlTipCopy: 'Copy this video link',
      stDlNone: 'Nothing selected.',
      stDlSending: 'Sending downloads: {i} of {n}',
      stDlSent: 'Started {n} download(s){v}. Skipped: {m}.',
      stDlUnavailable: 'None of these can be downloaded here ({m}). Use Copy link.',
      stDlBusy: 'Downloads are still being sent.',
      stDlLimit: 'Selection limit reached ({n}).',
      stCopyDone: 'Copied {n} link(s). Without a link: {m}.',
      stCopyNone: 'No usable links to copy. Without a link: {m}.',
      stCopyManual: 'Clipboard blocked. The links are shown below: copy them manually.',
      loadAllBtn: 'Unlock & Load All Videos',
      loadAllConfirm: 'Load {n} video(s)? Tap again',
      loadAllConfirmMany: 'Load {n} videos? Heavy on data and memory. Tap again',
      stNoLocked: 'No locked videos to load.',
      stLoadAllStart: 'Loading {n} video(s)...',
      stLoadAllDone: 'Unlocked and started loading {n} video(s).',
      dlChipDuration: 'Duration',
      dlChipSize: 'File size',
      stLoadAllBusy: 'Unlock & Load is still running.',
      filteredAds: 'Filtered Ads',
      // v3.6.3
      dlRetry: 'Retry failed ({n})',
      dlNoteTitle: 'How downloads work',
      stDlQueue: 'Download queue: {i} of {n} handled, failed: {f}',
      secShortcuts: 'Keyboard shortcuts',
      scEnable: 'Enable keyboard shortcuts',
      scEnableD: 'Alt+Shift+L (open / close the menu) always works, even when this is off.',
      scNote: 'Letters are physical keys: they work with the Persian layout as well.',
      scMenu: 'Open / close the menu',
      scDownloadTab: 'Open the Download tab',
      scToggleScript: 'Turn the script On / Off',
      scRelease: 'Release',
      scLoadAll: 'Unlock & Load All Videos',
      scPause: 'Pause all media',
      scSelectAll: 'Select all videos of this page',
      scDeselectAll: 'Deselect all',
      scDownload: 'Download the selected videos',
      scCopy: 'Copy the selected links',
      scEmergency: 'Emergency stop On / Off',
      scNowOn: 'Shahvani Ultra Lite: On',
      scNowOff: 'Shahvani Ultra Lite: Off',
      scSelected: 'Selected {n} video(s).',
      scDeselected: 'Selection cleared.',
      // v3.6.4
      svOpen: 'Saved ({n})',
      svCount: 'Saved: {n} · selected: {m}',
      svBack: 'Back to this page',
      svEmpty: 'Nothing saved yet. Use the bookmark icon on a video row of the Download list.',
      svNote: 'Saved videos keep their address, name, duration, size and thumbnail until you remove them - on any page. Play opens the video in a new tab.',
      svRemove: 'Remove from saved ({n})',
      svRemoveSure: 'Tap again to remove {n}',
      svTipPlay: 'Play in a new tab',
      dlTipSave: 'Save this video',
      dlTipSaved: 'Saved - tap to remove',
      stSaved: '{n} video(s) saved.',
      stUnsaved: '{n} video(s) removed from the saved list.',
      stSavedFull: 'The saved list is full ({n}).',
      stSvNone: 'Tick some saved videos first.',
      dlMethod: 'Download method',
      dlMethodAuto: 'Auto',
      dlMethodLink: 'Browser',
      dlMethodGm: 'Tampermonkey',
      autoThumbs: 'Make missing thumbnails',
      autoThumbsD: 'Download tab: a row without a picture gets one (a few hundred KB, one at a time), then it is cached for good.',
      viaTm: 'Tampermonkey',
      viaLink: 'browser link',
      viaBlob: 'Tampermonkey memory',
      viaFetch: 'page',
      scSave: 'Save the selected videos',
      scSaved: 'Open / close the saved list'
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
      theme: 'حالت',
      tSys: 'سیستم',
      tDark: 'تیره',
      tLight: 'روشن',
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
      showFabStats: 'نمای tooltip آمار در دکمه',
      showFabStatsD: 'نمایش آمار تفصیلی با هاور/فشار طولانی روی دکمه.',

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
      stNoRelease: 'موردی برای آزادسازی نیست. ویدیوهای قفل و فریم‌های قابل‌مشاهده بدون تغییر می‌مانند.',
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
      probeMode: 'دریافت سایز و مدت',
      probeModeD: 'خاموش: هیچ درخواستی ارسال نمی‌شود و کش هم خوانده نمی‌شود. فقط کش: سایز و مدتِ ذخیره‌شده از ویدیوهایی که قبلاً باز کرده‌اید نمایش داده می‌شود (بدون شبکه). خودکار: برای هر کارتِ در دید که در کش نیست فقط چند کیلوبایتِ اول فایل (درخواست Range) گرفته می‌شود تا سایز و مدت خوانده شود؛ خود ویدیو هرگز دانلود نمی‌شود. نیازمند فعال بودن «نمایش سایز و مدت» است.',
      probeOff: 'خاموش',
      probeCache: 'فقط کش',
      probeAuto: 'خودکار',
      invertedNeumorphic: 'افکت نومورفیک معکوس',
      invertedNeumorphicD: 'پایه صاف، پرآمده در هاور/لمس. برای استفاده از نومورفیک کلاسیک خاموش کنید.',

      // v3.4.1 additions - missing Persian translations for Overview tab
      emergency: 'قفل اضطراری',
      reload: 'بارگذاری مجدد صفحه',
      blockedScripts: 'اسکریپت‌های مسدودشده',
      blockedRequests: 'درخواست‌های مسدودشده',
      popupsBlocked: 'پاپ‌آپ‌های مسدودشده',
      resources: 'منابع بارگذاری‌شده',
      cleaned: 'ورودی‌های پاک‌شده',
      detached: 'ورودی‌های جداشده',
      probeTraffic: 'درخواست‌های پروب · حجم',
      master: 'وضعیت اسکریپت',
      masterOn: 'روشن',
      masterOff: 'خاموش',
      secQuick: 'عملیات سریع',
      pauseAll: 'مکث همه',
      releaseBtn: 'آزادسازی',
      releaseConfirm: 'آیا مطمئنید؟ ویدیو: {v}، فریم: {f}',
      // v3.6.0: Download tab, Unlock & Load All, Theme Color
      tabDownload: 'دانلود',
      secThemeColor: 'رنگ تم',
      dlSelectedCount: 'انتخاب‌شده: {n} از {m}',
      dlTotals: 'جمع: {dur} · {size}',
      dlTotalsUnknown: ' (+{u} ناقص)',
      stDlGmStart: 'دانلود {i} از {n} با Tampermonkey: {name}',
      stDlGmRunning: 'Tampermonkey هنوز در حال دانلود {name} است (گزارش پیشرفت نمی‌دهد).',
      stDlGmDone: 'دانلود تمام شد / شروع شد: {name}',
      stDlBlob: 'دانلودر Tampermonkey ناموفق بود، روش جایگزین: {name}',
      stDlSentFailed: '{n} دانلود شروع شد{v}؛ {f} ناموفق بود (دلیل با رنگ قرمز، لینک‌ها کپی شد؛ «تلاش دوباره» را بزنید). ردشده: {m}.',
      dlSelectAll: 'انتخاب همه',
      dlDeselectAll: 'لغو انتخاب همه',
      dlDownload: 'دانلود انتخاب‌شده‌ها ({n})',
      dlCopy: 'کپی لینک انتخاب‌شده‌ها ({n})',
      dlConfirm: 'ارسال {n} دانلود؟ دوباره لمس کنید',
      dlEmpty: 'ویدیویی در این صفحه پیدا نشد.',
      dlNote: 'دانلودها مستقیم و بدون تأیید وارد صف می‌شوند، چه یک ویدیو چه چندتا. چند دانلود هم‌زمان اجرا می‌شود و دانلود ناموفق با دلیلش قرمز نمایش داده می‌شود و قابل تلاش دوباره است. روش دانلود: «خودکار» آنچه روی دستگاه شما کار می‌کند را انتخاب می‌کند (اندروید: اول دانلودر Tampermonkey امتحان می‌شود و اگر فایلی شروع نکرد تا پایان نشست کنار گذاشته می‌شود)، «مرورگر» = لینک ساده / حافظه، «Tampermonkey» = اول دانلودر آن. ویدیوهای up.shahvani.com همیشه به Tampermonkey نیاز دارند (پنجره‌ی اجازه‌ی آن را یک‌بار تأیید کنید: Always allow all domains). فقط ویدیوهای همین صفحه فهرست می‌شوند - با آیکون نشانک یکی را برای بعد نگه دارید.',
      dlOffPage: 'در این صفحه نیست',
      dlStream: 'پلی‌لیست استریم: فایل مستقیم ندارد',
      dlNoLink: 'لینک قابل‌استفاده ندارد',
      dlNoDirect: 'سایت دیگر: در تب جدید باز می‌شود (از آنجا ذخیره کنید) یا کپی کنید',
      dlViaTm: 'سایت دیگر: با دانلود Tampermonkey دانلود می‌شود',
      dlTipSelect: 'انتخاب این ویدیو',
      dlTipDownload: 'دانلود این ویدیو',
      dlTipCopy: 'کپی لینک این ویدیو',
      stDlNone: 'چیزی انتخاب نشده.',
      stDlSending: 'در حال ارسال دانلودها: {i} از {n}',
      stDlSent: '{n} دانلود شروع شد{v}. ردشده: {m}.',
      stDlUnavailable: 'هیچ‌کدام اینجا قابل دانلود نیستند ({m}). از کپی لینک استفاده کنید.',
      stDlBusy: 'ارسال دانلودها هنوز ادامه دارد.',
      stDlLimit: 'به سقف انتخاب رسیدید ({n}).',
      stCopyDone: '{n} لینک کپی شد. بدون لینک: {m}.',
      stCopyNone: 'لینک قابل‌استفاده‌ای برای کپی نیست. بدون لینک: {m}.',
      stCopyManual: 'کلیپ‌بورد مسدود است. لینک‌ها پایین نشان داده شده‌اند: دستی کپی کنید.',
      loadAllBtn: 'باز کردن و بارگذاری همه ویدیوها',
      loadAllConfirm: 'بارگذاری {n} ویدیو؟ دوباره لمس کنید',
      loadAllConfirmMany: 'بارگذاری {n} ویدیو؟ مصرف داده و حافظه بالاست. دوباره لمس کنید',
      stNoLocked: 'ویدیوی قفلی برای بارگذاری نیست.',
      stLoadAllStart: 'در حال بارگذاری {n} ویدیو...',
      stLoadAllDone: '{n} ویدیو باز شد و بارگذاری آغاز شد.',
      dlChipDuration: 'مدت زمان',
      dlChipSize: 'حجم فایل',
      stLoadAllBusy: 'بارگذاری هنوز ادامه دارد.',
      filteredAds: 'تبلیغات فیلترشده',
      // v3.6.3
      dlRetry: 'تلاش دوباره برای ناموفق‌ها ({n})',
      dlNoteTitle: 'دانلود چگونه کار می‌کند',
      stDlQueue: 'صف دانلود: {i} از {n} انجام شد، ناموفق: {f}',
      secShortcuts: 'میان‌برهای صفحه‌کلید',
      scEnable: 'فعال بودن میان‌برها',
      scEnableD: 'میان‌بر Alt+Shift+L (باز و بسته کردن منو) همیشه کار می‌کند، حتی وقتی این گزینه خاموش است.',
      scNote: 'حروف، کلید فیزیکی هستند: با کیبورد فارسی هم کار می‌کنند.',
      scMenu: 'باز / بستن منو',
      scDownloadTab: 'باز کردن بخش دانلود',
      scToggleScript: 'روشن / خاموش کردن اسکریپت',
      scRelease: 'آزادسازی',
      scLoadAll: 'باز کردن و بارگذاری همه ویدیوها',
      scPause: 'توقف همه رسانه‌ها',
      scSelectAll: 'انتخاب همه ویدیوهای این صفحه',
      scDeselectAll: 'لغو انتخاب همه',
      scDownload: 'دانلود ویدیوهای انتخاب‌شده',
      scCopy: 'کپی لینک ویدیوهای انتخاب‌شده',
      scEmergency: 'توقف اضطراری روشن / خاموش',
      scNowOn: 'اولترا لایت شهوانی: روشن',
      scNowOff: 'اولترا لایت شهوانی: خاموش',
      scSelected: '{n} ویدیو انتخاب شد.',
      scDeselected: 'انتخاب‌ها پاک شد.',
      // v3.6.4
      svOpen: 'ذخیره‌شده‌ها ({n})',
      svCount: 'ذخیره‌شده: {n} · انتخاب‌شده: {m}',
      svBack: 'بازگشت به این صفحه',
      svEmpty: 'هنوز چیزی ذخیره نشده. از آیکون نشانک روی ردیف ویدیو در لیست دانلود استفاده کنید.',
      svNote: 'ویدیوهای ذخیره‌شده تا وقتی حذفشان نکنید آدرس، نام، مدت‌زمان، حجم و تامبنیلشان در هر صفحه‌ای نگه داشته می‌شود. دکمه‌ی پخش ویدیو را در تب جدید باز می‌کند.',
      svRemove: 'لغو ذخیره ({n})',
      svRemoveSure: 'برای حذف {n} مورد دوباره بزنید',
      svTipPlay: 'پخش در تب جدید',
      dlTipSave: 'ذخیره‌ی این ویدیو',
      dlTipSaved: 'ذخیره شده - برای حذف بزنید',
      stSaved: '{n} ویدیو ذخیره شد.',
      stUnsaved: '{n} ویدیو از ذخیره‌شده‌ها حذف شد.',
      stSavedFull: 'فهرست ذخیره‌شده‌ها پر است ({n}).',
      stSvNone: 'اول چند ویدیوی ذخیره‌شده را انتخاب کنید.',
      dlMethod: 'روش دانلود',
      dlMethodAuto: 'خودکار',
      dlMethodLink: 'مرورگر',
      dlMethodGm: 'Tampermonkey',
      autoThumbs: 'ساخت تامبنیل‌های ناقص',
      autoThumbsD: 'تب دانلود: ردیف بدون تصویر یک تصویر می‌گیرد (چند صد کیلوبایت، یکی‌یکی) و برای همیشه کش می‌شود.',
      viaTm: 'Tampermonkey',
      viaLink: 'لینک مرورگر',
      viaBlob: 'حافظه‌ی Tampermonkey',
      viaFetch: 'صفحه',
      scSave: 'ذخیره‌ی ویدیوهای انتخاب‌شده',
      scSaved: 'باز / بستن فهرست ذخیره‌شده‌ها'
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
    lastPageGesture: 0,   // v3.6.1: last tap / key on the PAGE (taps on our own panel do not count)
    status: { key: 'stReady', vars: null },
    activeTab: 'home',
    savedView: false,        // v3.6.4: the Download tab shows the saved-videos list instead of this page's list
    open: false,
    ui: null,
    videoIndex: 0,
    renumberTimer: 0,
    // v3.5.4: size/duration probe
    probeApplied: '',
    probeObserver: null,
    probeQueue: [],
    probeActive: 0,
    probeCount: 0,
    probeBytes: 0,
    probeControllers: new Set()
  };

  const settings = loadSettings();

  const videoStates = new WeakMap();
  const frameStates = new WeakMap();
  const imageStates = new WeakMap();
  const scheduledVideos = new WeakSet();
  const unsafeVideos = new WeakSet();
  const pendingRemovedRoots = new Set();
  const probeTargets = new WeakMap();   // placeholder element -> entry (IntersectionObserver lookup)
  const probeSession = new Map();       // videoKey -> { size, duration } | null (failed); lives until page reload

  // Native references captured before any patching (used by our own code paths).
  const NATIVE = {
    load: HTMLMediaElement.prototype.load,
    play: HTMLMediaElement.prototype.play,
    fetch: typeof window.fetch === 'function' ? window.fetch.bind(window) : null,
    setAttribute: Element.prototype.setAttribute
  };

  /**
   * v3.6.1: Tampermonkey helpers for the second upload host (up.shahvani.com). The script still runs in the page
   * context (@sandbox raw), so everything else is unchanged. Both are OPTIONAL: when the manager does not provide
   * them (other managers, grants refused) every path below falls back to something that needs no grant.
   */
  const GM_FN = {
    download: (() => {
      try {
        if (typeof GM_download === 'function') return GM_download;
        if (typeof GM !== 'undefined' && GM && typeof GM.download === 'function') return d => GM.download(d);
      } catch (_) {}
      return null;
    })(),
    request: (() => {
      try {
        if (typeof GM_xmlhttpRequest === 'function') return GM_xmlhttpRequest;
        if (typeof GM !== 'undefined' && GM && typeof GM.xmlHttpRequest === 'function') return d => GM.xmlHttpRequest(d);
      } catch (_) {}
      return null;
    })()
  };

  /** v3.6.2: what the manager offers + the last problems of every lookup / download (shown in Diagnostics). */
  function gmMode() {
    try { if (typeof GM_info !== 'undefined' && GM_info && GM_info.downloadMode) return String(GM_info.downloadMode); } catch (_) {}
    return '';
  }

  function gmHandler() {
    try { if (typeof GM_info !== 'undefined' && GM_info) return String(GM_info.scriptHandler || '') + ' ' + String(GM_info.version || ''); } catch (_) {}
    return '';
  }

  const diagLog = [];
  function diagNote(stage, url, err) {
    let host = '';
    try { host = new URL(url, location.href).host; } catch (_) {}
    const text = err && err.message ? err.message : String(err == null ? '' : err);
    diagLog.push({ t: new Date().toISOString().slice(11, 19), stage, host, err: text.slice(0, 160) });
    while (diagLog.length > 25) diagLog.shift();
  }

  /** The page's own media requests carry this Referer; hosts with hot-link protection need it for the manager's requests too. */
  function refererHeader() {
    return { Referer: location.origin + '/' };
  }

  function isCrossOrigin(url) {
    try { return new URL(url, document.baseURI).origin !== location.origin; } catch (_) { return false; }
  }

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

    /* v3.6.1: fixed lock-card size. On a screen narrower than ${CARD_W}px the card shrinks with the SAME ratio. */
    .shv-video-placeholder {
      width: min(100%, ${CARD_W}px) !important;
      max-width: 100% !important;
      height: auto !important;
      min-height: 0 !important;
      aspect-ratio: ${CARD_W} / ${CARD_H} !important;
      margin-inline: auto !important;
    }
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

    /* v3.5.5: classic raised neumorphic look when "Inverted neumorphic" is off */
    .shv-media-placeholder:not(.shv-inverted-neumorphic) {
      box-shadow:
        6px 6px 12px var(--shv-shadow-dark),
        -6px -6px 12px var(--shv-shadow-light) !important;
      border-color: transparent !important;
    }

    .shv-media-placeholder:not(.shv-inverted-neumorphic):hover {
      box-shadow:
        8px 8px 16px var(--shv-shadow-dark),
        -8px -8px 16px var(--shv-shadow-light) !important;
      transform: translateY(-1px) !important;
      border-color: var(--shv-accent) !important;
    }

    .shv-media-placeholder:not(.shv-inverted-neumorphic):active {
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
    style.textContent = ':root{--shv-accent:' + effectiveAccent() + '}' + (rules ? rules + '{display:none!important}' : '');
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

    if (!entry.audio && entry.kind !== 'video') {   // v3.6.1: video cards get their size from the stylesheet only
      const ratio = Number.isFinite(entry.aspectRatio) ? entry.aspectRatio : ASPECT_RATIO_DEFAULT;
      // v3.5.5: must be !important - the stylesheet rules above are !important too and would beat a plain inline value.
      button.style.setProperty('aspect-ratio', String(ratio), 'important');
      button.style.setProperty('min-height', Math.max(PLACEHOLDER_MIN_HEIGHT, Math.min(PLACEHOLDER_MAX_HEIGHT, entry.height || PLACEHOLDER_MIN_HEIGHT)) + 'px', 'important');
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
      sizeBadge.style.display = 'none';   // v3.5.4: no empty pill until there is something to show
      button.append(sizeBadge);
    }

    // Duration badge (bottom-right) - v3.4.2
    if (settings.showVideoInfo && entry.kind === 'video' && !entry.audio) {
      const infoBadge = document.createElement('span');
      infoBadge.className = 'shv-video-info';
      infoBadge.textContent = '';
      infoBadge.style.display = 'none';
      button.append(infoBadge);
    }

    if (entry.kind === 'video' && !entry.audio && settings.showPoster && entry.poster && isUsableURL(entry.poster)) {
      const poster = document.createElement('img');
      poster.className = 'shv-poster';
      poster.alt = '';
      poster.loading = 'lazy';
      poster.decoding = 'async';
      poster.addEventListener('load', () => storeThumb(thumbKey(entry), poster, poster.naturalWidth, poster.naturalHeight, 'poster', poster.currentSrc || poster.src));
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
    if (entry.kind === 'video' && !entry.audio) {
      updatePlaceholderInfo(entry);   // v3.5.4: a re-created placeholder shows what the entry already knows
      probeObserve(entry);
    }
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
      // v3.5.5: an un-loaded <video> is 300x150 by default: that is not a real ratio, so it is ignored.
      else if (rect.width > 0 && rect.height > 0 && !(Math.round(rect.width) === 300 && Math.round(rect.height) === 150)) ratio = rect.width / rect.height;
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
   * resource. Nothing is requested for a locked video: no preload=metadata, no HEAD. The only exception is
   * videoProbe === 'auto' (v3.5.4), where a card in view may get one or two tiny Range requests (see the
   * probe section). 'off' (default) requests nothing and does not read the cache; 'cache' only reads it.
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
      cacheState: 0,        // 0 = not looked up, 1 = looking up, 2 = done
      probeState: '',       // '' | queued | running | done | failed
      probed: false,        // a probe (or cached probe) already ran for this video
      inView: false,
      holdUntil: 0,         // v3.6.1: after "Unlock & Load All" playback is held until the user touches the page
      unlockedAt: 0,
      fullLoad: false,      // v3.6.0: set by "Unlock & Load All": restore with preload=auto
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

    // v3.5.4: 'off' does nothing at all; 'cache' / 'auto' read the local cache first (no network).
    if (probeMode() !== 'off') startCacheLookup(entry);

    scheduleUIUpdate();
  }

  /**
   * Size / duration lookup of a video that has just been opened (tap or Unlock & Load All) - never of a locked
   * one - through the same chain as the Download rows (HEAD, then a tiny Range, then the browser's own demuxer),
   * so another origin (up.shahvani.com) gets its size too. The result is cached for the next visit.
   */
  function fetchVideoSize(entry) {
    if (probeMode() === 'off') return;   // v3.5.4: 'off' = no request of ours, ever
    if (entry.sizeRequested || (entry.videoSize > 0 && entry.videoDuration > 0)) return;
    const url = probeURL(entry);
    if (!url) return;
    entry.sizeRequested = true;
    const key = hashKey(videoKeyUrl(entry.videoSrc));
    const known = probeSession.get(key);
    if (known) { applyProbeResult(entry, known); return; }
    probeVideo(url).then(result => {
      if (!(result.size > 0 || result.duration > 0)) return;
      probeSession.set(key, result);
      applyProbeResult(entry, result);
    }, () => {});
  }

  /* ----------------------------------------------------------------------
   * Size & duration lookup (v3.5.4)
   *   off   - nothing is requested and the local cache is not even read (default: the "nothing" rule)
   *   cache - only what the local cache already knows is shown; no network
   *   auto  - a card in view that the cache does not know gets one or two tiny Range requests:
   *           1) bytes 0-16383: size from Content-Range + duration from the mvhd box (when moov is first)
   *           2) only if moov sits after mdat: ~8 KB exactly at the moov box (offset known from step 1)
   *           The video itself is never downloaded: the body stream is cancelled once the cap is read.
   * -------------------------------------------------------------------- */

  function probeMode() {
    return settings.enabled && settings.showVideoInfo ? settings.videoProbe : 'off';
  }

  function formatSize(bytes) {
    if (!(bytes > 0)) return '';
    const mb = bytes / 1048576;
    if (mb >= 1024) return (mb / 1024).toFixed(2) + ' GB';
    if (mb >= 1) return mb.toFixed(1) + ' MB';
    return Math.max(1, Math.round(bytes / 1024)) + ' KB';
  }

  function formatDuration(sec) {
    if (!(sec > 0)) return '';
    const s = Math.floor(sec);
    const hr = Math.floor(s / 3600);
    const mi = Math.floor((s % 3600) / 60);
    const se = s % 60;
    const two = n => String(n).padStart(2, '0');
    return hr > 0 ? `${hr}:${two(mi)}:${two(se)}` : `${mi}:${two(se)}`;
  }

  // <probe-core>
  function fourcc(buf, at) {
    return String.fromCharCode(buf[at], buf[at + 1], buf[at + 2], buf[at + 3]);
  }

  /** Container by magic bytes (the URL extension is not trusted). */
  function sniffContainer(b) {
    if (b.length >= 12 && fourcc(b, 4) === 'ftyp') return 'mp4';
    if (b.length >= 4 && b[0] === 0x1A && b[1] === 0x45 && b[2] === 0xDF && b[3] === 0xA3) return 'ebml';
    if (b.length >= 8) {
      const t = fourcc(b, 4);
      if (t === 'moov' || t === 'mdat' || t === 'free' || t === 'wide' || t === 'skip') return 'mp4';
    }
    return '';
  }

  /** Seconds from the first mvhd box found in buf[start, end); 0 when unknown (e.g. fragmented MP4). */
  function mvhdDuration(buf, dv, start, end) {
    let pos = start;
    end = Math.min(end, buf.length);
    while (pos + 8 <= end) {
      const size = dv.getUint32(pos);
      if (fourcc(buf, pos + 4) === 'mvhd') {
        let scale = 0;
        let dur = 0;
        if (buf[pos + 8] === 1) {                       // version 1: 64-bit times
          if (pos + 40 > buf.length) return 0;
          scale = dv.getUint32(pos + 28);
          const hi = dv.getUint32(pos + 32);
          const lo = dv.getUint32(pos + 36);
          if (hi === 0xFFFFFFFF && lo === 0xFFFFFFFF) return 0;
          dur = hi * 4294967296 + lo;
        } else {                                        // version 0: 32-bit times
          if (pos + 28 > buf.length) return 0;
          scale = dv.getUint32(pos + 20);
          dur = dv.getUint32(pos + 24);
          if (dur === 0xFFFFFFFF) return 0;
        }
        const seconds = scale > 0 ? dur / scale : 0;
        return seconds > 0 && seconds < 1e6 ? seconds : 0;
      }
      if (size < 8) break;
      pos += size;
    }
    return 0;
  }

  /**
   * Walks the top-level MP4 boxes inside `buf` (which starts at file offset `base`).
   * Returns { duration } when moov is found, otherwise { next } = absolute offset of the first box
   * that starts after the buffer (where moov will be, when it sits behind a big mdat), or 0 on garbage.
   */
  function scanMp4(buf, base) {
    const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    const len = buf.length;
    let pos = 0;
    while (pos + 8 <= len) {
      let size = dv.getUint32(pos);
      const type = fourcc(buf, pos + 4);
      let header = 8;
      if (size === 1) {                                 // 64-bit box size
        if (pos + 16 > len) break;
        size = dv.getUint32(pos + 8) * 4294967296 + dv.getUint32(pos + 12);
        header = 16;
      } else if (size === 0) {                          // "to end of file": only sane for the last box
        if (type !== 'moov') return { duration: 0, next: 0 };
        size = len - pos;
      }
      if (size < header) return { duration: 0, next: 0 };
      if (type === 'moov') return { duration: mvhdDuration(buf, dv, pos + header, Math.min(len, pos + size)), next: 0 };
      pos += size;
    }
    return { duration: 0, next: base + pos };
  }

  /** Minimal EBML (WebM / MKV) reader: Segment > Info > TimecodeScale + Duration. Seconds, 0 if absent. */
  function scanEbml(b) {
    let pos = 0;
    const end = b.length;
    const readId = () => {                              // keeps the length marker bits
      if (pos >= end) return -1;
      const first = b[pos];
      let n = 1;
      let mask = 0x80;
      while (n <= 4 && !(first & mask)) { n++; mask >>= 1; }
      if (n > 4 || pos + n > end) return -1;
      let id = 0;
      for (let i = 0; i < n; i++) id = id * 256 + b[pos + i];
      pos += n;
      return id;
    };
    const readSize = () => {                            // strips the marker; -1 = error, -2 = unknown size
      if (pos >= end) return -1;
      const first = b[pos];
      let n = 1;
      let mask = 0x80;
      while (n <= 8 && !(first & mask)) { n++; mask >>= 1; }
      if (n > 8 || pos + n > end) return -1;
      let val = first & (mask - 1);
      let allOnes = val === mask - 1;
      for (let i = 1; i < n; i++) {
        val = val * 256 + b[pos + i];
        if (b[pos + i] !== 0xFF) allOnes = false;
      }
      pos += n;
      return allOnes ? -2 : val;
    };

    let timecodeScale = 1000000;
    let duration = 0;
    for (let guard = 0; pos < end && guard < 200; guard++) {
      const id = readId();
      if (id < 0) break;
      const size = readSize();
      if (size === -1) break;
      if (id === 0x18538067) continue;                  // Segment: descend (its size may be "unknown")
      if (id === 0x1F43B675) break;                     // Cluster: Info always comes before it
      if (id === 0x1549A966) {                          // Info: read its children
        const infoEnd = size < 0 ? end : Math.min(end, pos + size);
        while (pos < infoEnd) {
          const cid = readId();
          if (cid < 0) break;
          const csize = readSize();
          if (csize < 0 || pos + csize > end) break;
          if (cid === 0x2AD7B1) {
            let v = 0;
            for (let i = 0; i < csize; i++) v = v * 256 + b[pos + i];
            if (v > 0) timecodeScale = v;
          } else if (cid === 0x4489 && (csize === 4 || csize === 8)) {
            const dv = new DataView(b.buffer, b.byteOffset + pos, csize);
            duration = csize === 4 ? dv.getFloat32(0) : dv.getFloat64(0);
          }
          pos += csize;
        }
        break;
      }
      if (size < 0) break;                              // unknown size on anything else: cannot skip it
      pos += size;                                      // EBML header, SeekHead, Void, Tracks, ...
    }
    const seconds = duration * timecodeScale / 1e9;
    return seconds > 0 && seconds < 1e6 ? seconds : 0;
  }

  /** Reads at most `cap` bytes of the body, then cancels the stream so the rest is never pulled. */
  async function readCapped(res, cap) {
    if (!res.body || !res.body.getReader) return new Uint8Array(0);
    const reader = res.body.getReader();
    const out = new Uint8Array(cap);
    let n = 0;
    try {
      while (n < cap) {
        const { done, value } = await reader.read();
        if (done) break;
        const take = Math.min(value.length, cap - n);
        out.set(value.subarray(0, take), n);
        n += take;
      }
    } finally {
      try { const p = reader.cancel(); if (p && p.catch) p.catch(() => {}); } catch (_) {}
    }
    state.probeBytes += n;
    return out.subarray(0, n);
  }

  /** Raw response header value from GM_xmlhttpRequest's header string. */
  function rawHeader(raw, name) {
    const m = new RegExp('^' + name + ':[ \\t]*(.+)$', 'im').exec(raw || '');
    return m ? m[1].trim() : '';
  }

  /** A HEAD answer: { ok, size, ranges, type }. A HEAD has no body, so nothing can be pulled by accident. */
  function parseHead(status, header) {
    const length = parseInt(header('content-length') || '0', 10);
    return {
      ok: status >= 200 && status < 300,
      status,
      size: length > 0 ? length : 0,
      ranges: /bytes/i.test(header('accept-ranges') || ''),
      type: (header('content-type') || '').toLowerCase()
    };
  }

  /** Cancels a manager request when the signal fires. Returns the detach function. */
  function gmAbortable(signal, cancel, onAbort) {
    if (!signal) return () => {};
    const handler = () => { cancel(); onAbort(); };
    if (signal.aborted) { handler(); return () => {}; }
    signal.addEventListener('abort', handler, { once: true });
    return () => signal.removeEventListener('abort', handler);
  }

  /**
   * v3.6.3: a manager request that never answers (permission prompt waiting, host not allowed, hot-link filter) must not
   * cost 8 s per video: after two timeouts in a row the manager is skipped for that host for 5 minutes
   * (the page's own fetch / the browser's demuxer are still tried).
   */
  const gmHostHealth = new Map();   // host -> { n: timeouts in a row, at: time of the last one }
  function hostOf(url) { try { return new URL(url, document.baseURI).host; } catch (_) { return ''; } }
  function gmNoteTimeout(url) {
    const host = hostOf(url);
    const rec = gmHostHealth.get(host) || { n: 0, at: 0 };
    rec.n++; rec.at = Date.now();
    gmHostHealth.set(host, rec);
    diagNote('gm-timeout', url, 'no answer from the manager (' + rec.n + ')');
  }
  function gmNoteOk(url) { gmHostHealth.delete(hostOf(url)); }
  function gmHostBlocked(url) {
    const rec = gmHostHealth.get(hostOf(url));
    return !!(rec && rec.n >= 2 && Date.now() - rec.at < 300000);
  }

  function gmHead(url, signal) {
    return new Promise((resolve, reject) => {
      let req = null;
      let settled = false;
      let detach = () => {};
      const finish = (fn, value) => { if (settled) return; settled = true; detach(); fn(value); };
      const cancel = () => { try { if (req && typeof req.abort === 'function') req.abort(); } catch (_) {} };
      detach = gmAbortable(signal, cancel, () => finish(reject, new DOMException('Aborted', 'AbortError')));
      if (settled) return;
      try {
        req = GM_FN.request({
          method: 'HEAD',
          url,
          headers: refererHeader(),
          timeout: PROBE_TIMEOUT_MS,
          onload: r => { gmNoteOk(url); finish(resolve, parseHead(r.status, name => rawHeader(r.responseHeaders, name))); },
          onerror: () => finish(reject, new Error('HEAD request failed')),
          ontimeout: () => { gmNoteTimeout(url); finish(reject, new Error('HEAD timeout')); },
          onabort: () => finish(reject, new DOMException('Aborted', 'AbortError'))
        });
      } catch (err) { finish(reject, err); }
    });
  }

  async function fetchHead(url, signal) {
    if (!NATIVE.fetch) throw new Error('no fetch');
    const res = await NATIVE.fetch(url, { method: 'HEAD', credentials: 'same-origin', signal });
    return parseHead(res.status, name => res.headers.get(name));
  }

  /**
   * Size (Content-Length) and Range support of a file: HEAD through the manager for another origin (no CORS limit),
   * through fetch for the same origin; each is the fallback of the other. null = nobody could tell.
   */
  async function headInfo(url, signal) {
    const useGm = !!GM_FN.request && !gmHostBlocked(url);
    const order = useGm ? (isCrossOrigin(url) ? [gmHead, fetchHead] : [fetchHead, gmHead]) : [fetchHead];
    for (const attempt of order) {
      try {
        const info = await attempt(url, signal);
        if (info.ok) return info;
        diagNote('head', url, 'HEAD answered HTTP ' + info.status);
      } catch (err) {
        if (err && err.name === 'AbortError') throw err;
        diagNote('head', url, err);
      }
    }
    return null;
  }

  /**
   * One Range request through the manager. Only used when a HEAD already said "Accept-Ranges: bytes": a server that
   * ignores Range would otherwise send the whole file (an arraybuffer answer is only delivered on load).
   */
  function gmRange(url, start, length, signal) {
    return new Promise((resolve, reject) => {
      let req = null;
      let settled = false;
      let detach = () => {};
      const finish = (fn, value) => { if (settled) return; settled = true; detach(); fn(value); };
      const cancel = () => { try { if (req && typeof req.abort === 'function') req.abort(); } catch (_) {} };
      detach = gmAbortable(signal, cancel, () => finish(reject, new DOMException('Aborted', 'AbortError')));
      if (settled) return;
      const info = r => {
        const contentRange = rawHeader(r.responseHeaders, 'content-range');
        const contentLength = parseInt(rawHeader(r.responseHeaders, 'content-length') || '0', 10);
        let total = 0;
        const m = /\/(\d+)\s*$/.exec(contentRange);
        if (m) total = parseInt(m[1], 10);
        else if (r.status === 200 && contentLength > 0) total = contentLength;
        return { total, type: rawHeader(r.responseHeaders, 'content-type').toLowerCase() };
      };
      try {
        req = GM_FN.request({
          method: 'GET',
          url,
          headers: { ...refererHeader(), Range: 'bytes=' + start + '-' + (start + length - 1) },
          responseType: 'arraybuffer',
          timeout: PROBE_TIMEOUT_MS,
          onreadystatechange: r => {
            if (settled || r.readyState !== 2 || r.status !== 200) return;
            gmNoteOk(url);
            const head = info(r);                              // Range ignored: keep the headers, drop the body
            cancel();
            finish(resolve, { bytes: new Uint8Array(0), total: head.total, partial: false, type: head.type });
          },
          onload: r => {
            gmNoteOk(url);
            if (r.status === 416) { finish(resolve, { bytes: new Uint8Array(0), total: info(r).total, partial: false, type: '' }); return; }
            if (r.status < 200 || r.status >= 300) { finish(reject, new Error('HTTP ' + r.status)); return; }
            const head = info(r);
            let bytes = new Uint8Array(0);
            if (r.response && typeof r.response.byteLength === 'number') bytes = new Uint8Array(r.response).subarray(0, length);
            state.probeBytes += bytes.length;
            finish(resolve, { bytes, total: head.total, partial: r.status === 206, type: head.type });
          },
          onerror: () => finish(reject, new Error('request failed')),
          ontimeout: () => { gmNoteTimeout(url); finish(reject, new Error('timeout')); },
          onabort: () => finish(reject, new DOMException('Aborted', 'AbortError'))
        });
      } catch (err) {
        finish(reject, err);
      }
    });
  }

  async function fetchRange(url, start, length, signal) {
    if (!NATIVE.fetch) throw new Error('no fetch');
    const res = await NATIVE.fetch(url, {
      method: 'GET',
      headers: { Range: 'bytes=' + start + '-' + (start + length - 1) },
      credentials: 'same-origin',
      signal
    });
    const contentRange = res.headers.get('content-range');
    const contentLength = parseInt(res.headers.get('content-length') || '0', 10);
    let total = 0;
    if (contentRange) {
      const m = /\/(\d+)\s*$/.exec(contentRange);
      if (m) total = parseInt(m[1], 10);
    } else if (res.status === 200 && contentLength > 0) {
      total = contentLength;
    }
    if (!res.ok) {
      try { if (res.body) { const p = res.body.cancel(); if (p && p.catch) p.catch(() => {}); } } catch (_) {}
      if (res.status === 416) return { bytes: new Uint8Array(0), total, partial: false, type: '' };
      throw new Error('HTTP ' + res.status);
    }
    const bytes = await readCapped(res, length);
    return { bytes, total, partial: res.status === 206, type: (res.headers.get('content-type') || '').toLowerCase() };
  }

  /**
   * One Range request. total = full file size (Content-Range, or Content-Length if Range was ignored).
   * The manager is tried first for another origin (allowGm), the page's fetch is always the other option.
   */
  async function probeRange(url, start, length, signal, allowGm) {
    const useGm = !!GM_FN.request && allowGm !== false && !gmHostBlocked(url);
    const order = useGm ? (isCrossOrigin(url) ? [gmRange, fetchRange] : [fetchRange, gmRange]) : [fetchRange];
    let lastError = null;
    for (const attempt of order) {
      try {
        return await attempt(url, start, length, signal);
      } catch (err) {
        if (err && err.name === 'AbortError') throw err;
        lastError = err;
      }
    }
    throw lastError || new Error('probe failed');
  }

  /**
   * Duration straight from the browser's own demuxer: a detached <video preload="metadata"> reads only the header
   * of the file and needs no CORS permission. Last resort when the Range probe cannot read (or understand) a video.
   * @returns {Promise<number>} seconds, 0 if unknown (or stopped through the signal)
   */
  function elementDuration(url, signal) {
    return new Promise(resolve => {
      let video = null;
      let done = false;
      let timer = 0;
      let detach = () => {};
      const finish = value => {
        if (done) return;
        done = true;
        window.clearTimeout(timer);
        detach();
        try { video.removeAttribute('src'); NATIVE.load.call(video); } catch (_) {}
        resolve(Number.isFinite(value) && value > 0 && value < 1e6 ? value : 0);
      };
      try {
        video = document.createElement('video');
        unsafeVideos.add(video);   // v3.6.3: our own lock (preload -> 'none') must not apply to the probe element - this was why up.shahvani.com never gave a duration
        video.preload = 'metadata';
        video.muted = true;
        video.addEventListener('loadedmetadata', () => finish(video.duration), { once: true });
        video.addEventListener('error', () => finish(0), { once: true });
        timer = window.setTimeout(() => finish(video.duration), 12000);
        detach = gmAbortable(signal, () => {}, () => finish(0));
        if (!done) video.src = url;
      } catch (_) { finish(0); }
    });
  }

  /**
   * Size + duration of one video URL. Chain (each step only when the one before did not answer):
   *   1. HEAD (no body)         -> size, and whether Range is supported
   *   2. tiny Range request     -> duration from the container header (and size if HEAD was blocked); another
   *                                origin through the manager ONLY after HEAD confirmed "Accept-Ranges: bytes"
   *   3. detached <video>       -> duration from the browser itself (needs no CORS)
   * Never throws for "nobody could tell": the result is then { size: 0, duration: 0 }. A stop (script Off) throws AbortError.
   */
  async function probeVideo(url) {
    const ctl = new AbortController();
    state.probeControllers.add(ctl);
    let timedOut = false;
    const timer = window.setTimeout(() => { timedOut = true; ctl.abort(); }, PROBE_TOTAL_MS);
    const result = { size: 0, duration: 0 };
    let stopped = false;
    try {
      const head = await headInfo(url, ctl.signal);
      if (head) {
        result.size = head.size;
        if (/^(text\/|application\/(vnd\.apple\.mpegurl|x-mpegurl|dash))/.test(head.type)) result.size = 0;   // a playlist is not a video file
      }
      const allowGm = true;   // v3.6.3: gmRange drops the body itself when the server ignores Range, so a blocked HEAD no longer blocks the size lookup
      try {
        const first = await probeRange(url, 0, PROBE_HEAD_BYTES, ctl.signal, allowGm);
        if (first.total > 0) result.size = first.total;
        const kind = sniffContainer(first.bytes);
        // v3.5.5: a playlist (.m3u8 / .mpd) or an error page is not a video file: its length is not a video size.
        if (kind === '' && first.bytes.length && !/^video\//.test(first.type || '')) result.size = 0;

        if (kind === 'mp4') {
          const a = scanMp4(first.bytes, 0);
          result.duration = a.duration;
          // moov sits behind a big mdat: ask for exactly that box (only possible when Range works).
          if (!a.duration && a.next > 0 && first.partial && (!first.total || a.next < first.total)) {
            const second = await probeRange(url, a.next, PROBE_TAIL_BYTES, ctl.signal, allowGm);
            if (second.partial && second.bytes.length >= 8) result.duration = scanMp4(second.bytes, a.next).duration;
            if (!result.size && second.total) result.size = second.total;
          }
        } else if (kind === 'ebml') {
          result.duration = scanEbml(first.bytes);
        }
      } catch (err) {
        if (err && err.name === 'AbortError' && !timedOut) throw err;
        diagNote('range', url, err);
      }
    } catch (err) {
      if (err && err.name === 'AbortError' && !timedOut) stopped = true;
      else diagNote('probe', url, err);
    } finally {
      window.clearTimeout(timer);
      state.probeControllers.delete(ctl);
    }
    if (stopped) throw new DOMException('Aborted', 'AbortError');

    if (!(result.duration > 0)) {
      const ctl2 = new AbortController();
      state.probeControllers.add(ctl2);
      try { result.duration = await elementDuration(url, ctl2.signal); } finally { state.probeControllers.delete(ctl2); }
      if (ctl2.signal.aborted) throw new DOMException('Aborted', 'AbortError');
    }
    if (!(result.size > 0) && !(result.duration > 0)) diagNote('probe', url, 'nothing could be read');
    return result;
  }
  // </probe-core>

  function probeURL(entry) {
    if (!entry.videoSrc || !isUsableURL(entry.videoSrc)) return null;
    try {
      const u = new URL(entry.videoSrc, document.baseURI);
      return u.protocol === 'http:' || u.protocol === 'https:' ? u.href : null;
    } catch (_) { return null; }
  }

  /** Local cache lookup (IndexedDB, no network). Runs in 'cache' and 'auto' only. */
  function startCacheLookup(entry) {
    if (entry.cacheState || entry.kind !== 'video' || entry.audio || !entry.videoSrc) return;
    entry.cacheState = 1;
    checkVideoCache(entry).then(cached => {
      if (probeMode() === 'off') { entry.cacheState = 0; return; }   // switched off meanwhile: retry later
      entry.cacheState = 2;
      if (cached && entry.element) {
        entry.videoDuration = cached.duration || entry.videoDuration;
        entry.videoSize = cached.size || entry.videoSize;
        if (cached.probed) entry.probed = true;
        if (cached.aspectRatio) entry.aspectRatio = cached.aspectRatio;   // v3.6.1: data only, the card size is fixed
        updatePlaceholderInfo(entry);
      }
      probeConsider(entry);
    });
  }

  function probeObserve(entry) {
    if (probeMode() !== 'auto' || entry.loaded || !entry.placeholder || typeof IntersectionObserver !== 'function') return;
    if (!state.probeObserver) {
      state.probeObserver = new IntersectionObserver(records => {
        for (const rec of records) {
          const e = probeTargets.get(rec.target);
          if (!e) continue;
          e.inView = rec.isIntersecting;
          if (rec.isIntersecting) probeConsider(e);
        }
      }, { rootMargin: PROBE_VISIBLE_MARGIN, threshold: 0.01 });
    }
    probeTargets.set(entry.placeholder, entry);
    state.probeObserver.observe(entry.placeholder);
  }

  /** Queue a probe when every condition holds: auto mode, in view, cache checked, something still unknown. */
  function probeConsider(entry) {
    if (probeMode() !== 'auto') return;
    if (entry.kind !== 'video' || entry.audio || entry.loaded || !entry.inView || entry.cacheState !== 2) return;
    if (entry.probeState || entry.probed) return;                      // queued, running, done or failed
    if (entry.videoSize > 0 && entry.videoDuration > 0) return;        // the cache already knows both
    if (!probeURL(entry)) return;
    entry.probeState = 'queued';
    state.probeQueue.push(entry);
    probePump();
  }

  function applyProbeResult(entry, r) {
    entry.probeState = 'done';
    entry.probed = true;                                               // remembered, so a file we cannot parse is not probed again
    if (r && r.size > 0 && !(entry.videoSize > 0)) entry.videoSize = r.size;
    if (r && r.duration > 0 && !(entry.videoDuration > 0)) entry.videoDuration = r.duration;
    saveVideoCache(entry);
    updatePlaceholderInfo(entry);
    scheduleUIUpdate();
  }

  function probePump() {
    if (probeMode() !== 'auto' || document.hidden) return;
    while (state.probeActive < PROBE_CONCURRENCY && state.probeQueue.length) {
      const entry = state.probeQueue.shift();
      // Scrolled away, opened, or removed while waiting: drop it (it is queued again when it returns to view).
      if (!state.mediaEntries.has(entry) || entry.loaded || !entry.inView) { entry.probeState = ''; continue; }

      const key = hashKey(videoKeyUrl(entry.videoSrc));
      if (probeSession.has(key)) {                                     // same video already probed on this page
        const known = probeSession.get(key);
        if (known) applyProbeResult(entry, known); else entry.probeState = 'failed';
        continue;
      }
      if (state.probeCount >= PROBE_SESSION_MAX) { entry.probeState = 'failed'; continue; }

      const url = probeURL(entry);
      if (!url) { entry.probeState = 'failed'; continue; }

      entry.probeState = 'running';
      state.probeActive++;
      state.probeCount++;
      probeVideo(url).then(result => {
        if (!(result.size > 0 || result.duration > 0)) { entry.probeState = 'failed'; probeSession.set(key, null); return; }
        probeSession.set(key, result);
        try { applyProbeResult(entry, result); } catch (_) {}
      }, err => {
        if (err && err.name === 'AbortError') { if (entry.probeState === 'running') entry.probeState = ''; return; }
        entry.probeState = 'failed';                                   // CORS / network / HTTP error: not retried this page
        probeSession.set(key, null);
      }).finally(() => { state.probeActive--; probePump(); });
    }
  }

  function stopProbing() {
    for (const ctl of state.probeControllers) { try { ctl.abort(); } catch (_) {} }
    state.probeControllers.clear();
    for (const e of state.probeQueue) e.probeState = '';
    state.probeQueue.length = 0;
    if (state.probeObserver) { try { state.probeObserver.disconnect(); } catch (_) {} state.probeObserver = null; }
  }

  /** Idempotent: brings the cache lookups / observer / requests in line with the current mode. */
  function refreshProbeMode() {
    const mode = probeMode();
    if (mode === state.probeApplied) return;
    state.probeApplied = mode;

    if (mode === 'off') {
      stopProbing();
      for (const entry of state.mediaEntries) {
        if (entry.kind !== 'video' || entry.audio) continue;
        entry.cacheState = 0;
        entry.probeState = '';
        entry.inView = false;
        updatePlaceholderInfo(entry);                                  // hides the badges
      }
      return;
    }

    if (mode === 'cache') stopProbing();                               // auto -> cache: network off, cache stays
    for (const entry of state.mediaEntries) {
      if (entry.kind !== 'video' || entry.audio || entry.loaded) continue;
      startCacheLookup(entry);
      updatePlaceholderInfo(entry);
      if (mode === 'auto') probeObserve(entry);
    }
  }

  document.addEventListener('visibilitychange', () => { if (!document.hidden) probePump(); });

  function updatePlaceholderInfo(entry) {
    dlInfoChanged(entry);   // v3.6.1: keep the open Download tab in sync (size / duration just became known)
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

    // v3.5.4: badges are shown only while a lookup mode is active ('off' shows nothing)
    const infoOn = probeMode() !== 'off';

    if (sizeEl) {
      sizeEl.textContent = entry.videoSize > 0 ? formatSize(entry.videoSize) : '';
      sizeEl.style.display = (infoOn && entry.videoSize > 0) ? '' : 'none';
    }

    if (infoEl) {
      infoEl.textContent = entry.videoDuration > 0 ? formatDuration(entry.videoDuration) : '';
      infoEl.style.display = (infoOn && entry.videoDuration > 0) ? '' : 'none';
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
    video.preload = entry.fullLoad ? 'auto' : 'metadata';
    entry.fullLoad = false;
    // Setting src starts the load by itself; restored <source> attributes do not, so load() is needed.
    if (!restoredDirect && restoredSources) {
      try { NATIVE.load.call(video); } catch (_) {}
    }
  }

  /**
   * v3.5.5: Seek to `time` as soon as the metadata is there. When the metadata already arrived
   * (cached video) no event will fire any more, so readyState is checked first.
   */
  function seekWhenReady(video, time, skipIfMoved) {
    const seek = () => {
      try {
        if (skipIfMoved && video.currentTime > 1) return;   // the user already seeked / started: do not jump
        if (Number.isFinite(video.duration) && video.duration > 0) {
          video.currentTime = Math.min(time, Math.max(0, video.duration - 0.5));
        }
      } catch (_) {}
    };
    if (video.readyState >= 1) seek();
    else video.addEventListener('loadedmetadata', seek, { once: true });
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
    entry.holdUntil = 0;

    if (state.probeObserver && entry.placeholder) { try { state.probeObserver.unobserve(entry.placeholder); } catch (_) {} }
    if (entry.placeholder && entry.placeholder.isConnected) entry.placeholder.remove();
    entry.placeholder = null;
    video.classList.remove('shv-suspended-video');

    restoreVideoSources(entry);
    fetchVideoSize(entry); // v3.6.2: every video that is opened (tap or Unlock & Load All), never a locked one

    // v3.3.0 / v3.5.5: resume position (IndexedDB for a fresh open, memory for a released video).
    // Both paths honour the "Resume position" setting.
    const resumeTime = entry.resumeTime;
    if (settings.resumePosition && resumeTime <= 0) {
      idbGetResumePosition(entry.videoSrc || video.currentSrc, location.href).then(saved => {
        if (saved && Number.isFinite(saved.currentTime) && saved.currentTime > 0) seekWhenReady(video, saved.currentTime, true);
      });
    } else if (settings.resumePosition && resumeTime > 0) {
      seekWhenReady(video, resumeTime, false);
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

    video.addEventListener('loadeddata', () => captureFrame(entry), { once: true });

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
    if (!entry.videoSrc && isUsableURL(src)) { entry.videoSrc = src; if (probeMode() !== 'off') startCacheLookup(entry); }
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

  /**
   * Re-lock a loaded video and free its resource. Without `force` (auto-release) only a paused, unfinished video
   * qualifies. With `force` (the Release button, v3.6.1) a playing video is stopped first, so Release works
   * whatever the state of the video is.
   */
  function releaseVideoEntry(entry, force) {
    const video = entry.element;
    if (!video || !entry.loaded || !snapshotVideoSources(entry)) return false;
    if (!force && (!video.paused || video.ended)) return false;

    if (force) {
      // do not leave a hidden element in Picture-in-Picture / fullscreen
      try { if (document.pictureInPictureElement === video) document.exitPictureInPicture().catch(() => {}); } catch (_) {}
      try {
        const fs = document.fullscreenElement;
        if (fs && (fs === video || fs.contains(video))) document.exitFullscreen().catch(() => {});
      } catch (_) {}
      safePause(video);
    }

    // a thumbnail of what the user was looking at (frame already decoded: no network)
    captureFrame(entry);

    const finished = !!video.ended;
    try {
      entry.resumeTime = !finished && Number.isFinite(video.currentTime) ? video.currentTime : 0;
    } catch (_) {
      entry.resumeTime = 0;
    }

    // v3.3.0: Save resume position to IndexedDB (a finished video starts over next time)
    if (settings.resumePosition && entry.resumeTime > 0) {
      idbSaveResumePosition(entry.videoSrc || video.currentSrc, location.href, entry.resumeTime, video.duration);
    } else if (finished && entry.videoSrc) {
      idbDeleteResumePosition(entry.videoSrc);
    }

    // v3.5.1: Save metadata to cache before releasing
    saveVideoCache(entry);

    entry.loaded = false;
    entry.released = true;
    entry.holdUntil = 0;
    entry.pausedAt = 0;
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

  /** v3.6.1: every loaded video (playing or not) + loaded frames that are completely off screen. */
  function releaseCandidates() {
    const candidates = [];
    for (const entry of state.mediaEntries) {
      if (!entry.loaded || !entry.element || !entry.element.isConnected) continue;
      if (entry.kind === 'video') candidates.push(entry);
      else if (entry.kind === 'frame' && isFullyOffScreen(entry.element)) candidates.push(entry);
    }
    return candidates;
  }

  function releaseInactiveNow(withToast) {
    if (withToast === true && !releaseCandidates().length) { setStatus('stNoRelease', null, true); return; }
    loadAllRun++;          // a running "Unlock & Load All" stops here, so the two never fight each other
    loadAllBusy = false;
    let videosReleased = 0;
    let framesReleased = 0;

    for (const entry of releaseCandidates()) {
      if (entry.kind === 'video' && releaseVideoEntry(entry, true)) videosReleased++;
      else if (entry.kind === 'frame' && releaseFrameEntry(entry)) framesReleased++;
    }

    setStatus('stReleased', { v: videosReleased, f: framesReleased }, withToast === true);
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
      refreshProbeMode();   // v3.5.4: master off -> abort probes before the entries are torn down
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
    refreshProbeMode();   // v3.5.4
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
      probe: { mode: probeMode(), requests: state.probeCount, bytesRead: state.probeBytes },
      manager: { handler: gmHandler(), download: !!GM_FN.download, request: !!GM_FN.request, downloadMode: gmMode(), downloaderHealth: gmDlHealth, recent: diagLog },
      downloads: dlLog,
      thumbs: { ...thumbStats, cached: thumbCache.size, rescueQueued: rescueCount, idb: idbHealth },
      saved: { count: saved.size },
      settings
    }, null, 1);
  }

  /* ======================================================================
   * 15. Safeguards: gestures, playback guard, ad scripts, requests, popups
   * ==================================================================== */

  function noteUserGesture(event) {
    state.lastGesture = Date.now();
    // v3.6.1: a tap on our own panel (closed shadow root -> retargeted to its host) is not a gesture on the page
    if (!(state.ui && event && event.target === state.ui.host)) state.lastPageGesture = state.lastGesture;
  }

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
    if (entry && entry.loaded) { entry.pausedAt = Date.now(); saveResumeNow(entry); captureFrame(entry); }
  }, true);

  // Resume position is saved on pause and when the page is hidden/closed (not only on "release").
  function saveResumeNow(entry) {
    const video = entry && entry.element;
    if (!video || !settings.enabled || !settings.resumePosition || !entry.videoSrc) return;
    try {
      const t = video.currentTime, d = video.duration;
      if (Number.isFinite(t) && t > 3 && (!Number.isFinite(d) || d - t > 3)) {
        idbSaveResumePosition(entry.videoSrc, location.href, t, d);
      } else if (Number.isFinite(t) && Number.isFinite(d) && d > 0 && d - t <= 3) {
        idbDeleteResumePosition(entry.videoSrc);   // v3.5.5: watched to the end: next time starts over
      }
    } catch (_) {}
  }
  window.addEventListener('pagehide', () => {
    for (const entry of state.mediaEntries) if (entry.kind === 'video' && entry.loaded) saveResumeNow(entry);
  });

  document.addEventListener('ended', event => {
    const media = event.target;
    const entry = media instanceof HTMLMediaElement ? videoStates.get(media) : null;
    if (entry && entry.loaded) {
      entry.resumeTime = 0;
      if (entry.videoSrc) idbDeleteResumePosition(entry.videoSrc);
    }
  }, true);

  document.addEventListener('play', event => {
    const video = event.target;
    if (!(video instanceof HTMLMediaElement) || !settings.enabled) return;

    const entry = videoStates.get(video);
    if (entry) entry.pausedAt = 0;

    if (entry && !entry.loaded) {
      safePause(video);
      return;
    }

    // v3.6.1: "Unlock & Load All" only unlocks: anything the site starts by itself afterwards is paused
    if (holdBlocksPlay(video)) {
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
    document.querySelectorAll('video, audio').forEach(media => {
      if (media === document.pictureInPictureElement) return;   // v3.5.5: Picture-in-Picture keeps playing
      if (!media.paused) safePause(media);
    });
  });


  /* ----------------------------------------------------------------------
   * Media guards (v3.5.3)
   * A MutationObserver only sees elements after the fact. These guards close the remaining gaps:
   * videos created / driven by site JS (document.createElement('video'), preload='auto', load(),
   * play(), autoplay) can no longer start a download while the video is still locked.
   * -------------------------------------------------------------------- */

  /** v3.6.1: a video just unlocked by "Unlock & Load All" (autoplay is refused while this holds). */
  function isHeld(el) {
    const entry = el instanceof HTMLMediaElement ? videoStates.get(el) : null;
    return !!(entry && entry.loaded && entry.holdUntil > Date.now());
  }

  /** The hold ends for good at the first tap / key on the page after the unlock (or after LOAD_ALL_HOLD_MS). */
  function holdBlocksPlay(el) {
    const entry = el instanceof HTMLMediaElement ? videoStates.get(el) : null;
    return !!(entry && entry.loaded && entry.holdUntil > Date.now() && !(state.lastPageGesture > entry.unlockedAt));
  }

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
      if (holdBlocksPlay(this)) {
        return Promise.reject(new DOMException('Playback is held after Unlock & Load All', 'NotAllowedError'));
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
        set(value) { desc.set.call(this, (isLockedMedia(this) || (prop === 'autoplay' && isHeld(this))) ? locked : value); }
      });
    }

    mp.setAttribute = function (name, value) {
      if (typeof name === 'string' && name.toLowerCase() === 'autoplay' && isHeld(this)) return;
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
        try { url = typeof input === 'string' ? input : (input && (input.url || input.href)) || ''; } catch (_) {}
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
   * 15b. Download tab and "Unlock & Load All" (v3.6.0, live rows + persistent thumbnails v3.6.1)
   *   - The Download list is read straight from the page DOM, so it works while the script is Off.
   *   - Nothing here requests anything by itself: a download / copy happens only on a tap, thumbnails are
   *     drawn from images / frames the page already has, links come from data the page already holds.
   *     The only request of ours is the optional "Get size & duration" (a few KB per video, user-started,
   *     or automatic when the "Video info" mode is already set to auto).
   *   - Rows update in place the moment a thumbnail / duration / size becomes known (no menu re-open), and
   *     thumbnails + sizes + durations are kept in IndexedDB, so they come back after a reload.
   *   - Downloads use a plain <a download> click: Firefox's own download manager does the rest.
   * ==================================================================== */

  const SEL_KEY = 'shvUltraLite.selection.v1';
  const MAX_SELECTION = 300;
  const DOWNLOAD_GAP_MS = 500;        // gap between two download clicks (Firefox owns the queue)
  const DOWNLOAD_CONFIRM_OVER = 10;   // more than this needs a second tap
  const LOAD_ALL_GAP_MS = 200;
  const LOAD_ALL_WARN_OVER = 20;
  const LOAD_ALL_HOLD_MS = 30000;     // v3.6.1: after Unlock & Load All the site cannot start playback for this long (or until the first tap on the page)
  const THUMB_MAX_SIDE = 240;         // longest side of a stored thumbnail (the whole picture, never cropped)
  const THUMB_MAX = 150;
  const THUMB_VIDEO_BYTES = 3 * 1048576;   // v3.6.3: first bytes of a cross-origin video, used once to re-make an exportable thumbnail
  const THUMB_JPEG_QUALITY = 0.72;
  const ROW_FLUSH_MS = 120;           // rows are repainted at most this often
  const ROW_POLL_MS = 1500;           // while the Download tab is open: pick up new videos / decoded frames
  const INFO_CONCURRENCY = 2;
  const INFO_MAX_FAILS = 3;           // automatic tries per video (15 s, 30 s apart)
  const INFO_RETRY_MS = 15000;
  const DL_STALL_MS = 180000;         // a manager download that reports nothing for this long is assumed to be running
  const BLOB_MAX = /Android/i.test(navigator.userAgent) ? 200 * 1048576 : 800 * 1048576;   // memory fallback limit
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const ICON_DOWNLOAD = 'M12 4v11M7 11l5 5 5-5M5 20h14';
  const ICON_COPY = 'M8 8h12v12H8zM16 8V4H4v12h4';

  const selection = new Map();   // key -> { k, u, i, d, s }  (key, url, number, duration, size) - survives DOM changes
  const thumbCache = new Map();  // key -> { url?: data URL, canvas?: HTMLCanvasElement (tainted: memory only), kind: 'poster' | 'frame' }
  const dlInfo = new Map();      // key -> { duration, size, state: '' | 'run' | 'done' | 'fail', fails, retryAt }  (our own lookup + its retries)
  const dlUI = { box: null, rows: new Map(), count: null, total: null, err: null, btnDl: null, btnCopy: null, area: null, empty: null, queue: null, btnRetry: null, btnSaved: null };
  const dlHydrated = new Set();  // keys whose IndexedDB lookup was started on this page
  const dlHydrateDone = new Set(); // ... and finished: the cache is always asked before the network
  const dlMetaSaved = new Set();
  let dlBusy = false;
  let dlRowTimer = 0;
  let dlPollTimer = 0;
  let dlInfoBusy = false;
  let loadAllBusy = false;
  let loadAllRun = 0;            // bumped by Release: a running "Unlock & Load All" notices and stops

  /** v3.6.3: the selection belongs to ONE page (address without #hash). Another page starts with an empty selection. */
  function pageKey() {
    try { return location.origin + location.pathname + location.search; } catch (_) { return ''; }
  }
  let selectionPage = pageKey();

  function loadSelection() {
    try {
      const raw = sessionStorage.getItem(SEL_KEY);
      const saved = raw ? JSON.parse(raw) : null;
      if (!saved || Array.isArray(saved) || saved.p !== pageKey() || !Array.isArray(saved.list)) return;   // old format / another page: dropped
      const list = saved.list;
      for (const item of list.slice(0, MAX_SELECTION)) {
        if (!item || typeof item.k !== 'string' || typeof item.u !== 'string' || !/^https?:/i.test(item.u)) continue;
        selection.set(item.k, { k: item.k, u: item.u, i: Number(item.i) || 0, d: Number(item.d) || 0, s: Number(item.s) || 0 });
      }
    } catch (_) {}
  }

  function saveSelection() {
    try { sessionStorage.setItem(SEL_KEY, JSON.stringify({ p: selectionPage, list: Array.from(selection.values()) })); } catch (_) {}
  }

  loadSelection();
  window.addEventListener('pagehide', saveSelection);

  /** Best known direct URL of a <video> ('' for blob / MediaSource / no source). Never opens or loads anything. */
  function videoURLOf(video, entry) {
    let raw = '';
    const cur = video.currentSrc;
    if (cur && /^https?:/i.test(cur)) raw = cur;
    else if (entry && isUsableURL(entry.videoSrc) && !isBlobURL(entry.videoSrc)) raw = entry.videoSrc;
    else if (!video.srcObject) raw = readSourceInfo(video, getVideoSources(video)).videoSrc || '';
    if (!isUsableURL(raw) || isBlobURL(raw)) return '';
    try { return new URL(raw, document.baseURI).href; } catch (_) { return ''; }
  }

  function keyOfVideo(video, entry) {
    const url = video ? videoURLOf(video, entry) : '';
    return url ? hashKey(videoKeyUrl(url)) : '';
  }

  function thumbKey(entry) {
    return entry && entry.element ? keyOfVideo(entry.element, entry) : '';
  }

  /* ---- thumbnails ---- */

  /** The picture shrunk so that its longest side fits THUMB_MAX_SIDE (whole picture, never cropped). */
  function scaledCanvas(source, sw, sh) {
    const scale = Math.min(1, THUMB_MAX_SIDE / Math.max(sw, sh));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(sw * scale));
    canvas.height = Math.max(1, Math.round(sh * scale));
    canvas.getContext('2d').drawImage(source, 0, 0, sw, sh, 0, 0, canvas.width, canvas.height);
    return canvas;
  }

  /**
   * v3.6.3: 'blank' = (nearly) transparent or black, 'ok', 'unknown' = tainted canvas (pixels cannot be read).
   * A frame that is not painted yet (Firefox for Android hands out an empty surface) used to be saved as a black picture.
   */
  function canvasState(canvas) {
    try {
      const probe = document.createElement('canvas');
      probe.width = 24; probe.height = 24;
      const c = probe.getContext('2d', { willReadFrequently: true });
      c.drawImage(canvas, 0, 0, 24, 24);
      const d = c.getImageData(0, 0, 24, 24).data;
      let alpha = 0, lum = 0, bright = 0;
      for (let i = 0; i < d.length; i += 4) {
        alpha += d[i + 3];
        const l = d[i] + d[i + 1] + d[i + 2];
        lum += l;
        if (l > 45) bright++;
      }
      if (alpha / 576 < 40) return 'blank';
      if (lum / 576 / 3 < 4 && bright < 4) return 'blank';
      return 'ok';
    } catch (_) { return 'unknown'; }
  }

  const thumbStats = { captured: 0, blank: 0, tainted: 0, rescued: 0, failed: 0 };

  function commitThumb(key, url, canvas, kind, remote) {
    thumbCache.delete(key);
    thumbCache.set(key, { url, canvas: url ? null : canvas, kind, remote: !!remote });
    while (thumbCache.size > THUMB_MAX) thumbCache.delete(thumbCache.keys().next().value);
    if (url) { idbSaveThumb(key, url, kind, remote); savedNoteThumb(key, url, remote); }
    queueRowUpdate();
  }

  /**
   * Draws an already-loaded image / video frame into a small canvas: no network. The result is kept as a small JPEG
   * (memory + IndexedDB / localStorage). A blank / black result is refused (returns false, the caller tries again later).
   * v3.6.4: a canvas tainted by a cross-origin picture (up.shahvani.com) cannot be exported:
   *   - a poster is remembered by its address (an <img> shows it from the browser cache);
   *   - a frame is shown from memory on desktop (on Android such a frame is often black and cannot be checked, so it waits);
   *   - either one is re-made in a readable way by the rescue queue (CORS element, then the manager) and cached for good.
   * A poster thumbnail is never replaced by a frame.
   * @returns {boolean} true when nothing more is to be tried for this capture
   */
  function storeThumb(key, source, sw, sh, kind, origin) {
    if (!key || !(sw > 0 && sh > 0)) return false;
    const old = thumbCache.get(key);
    if (old && old.kind === 'poster' && !old.remote && kind !== 'poster') return true;
    if (old && old.kind === 'poster' && !old.remote && old.url && kind === 'poster') return true;
    try {
      const canvas = scaledCanvas(source, sw, sh);
      if (canvasState(canvas) === 'blank') { thumbStats.blank++; return false; }
      let url = '';
      try { url = canvas.toDataURL('image/jpeg', THUMB_JPEG_QUALITY); } catch (_) { url = ''; }
      if (url && !/^data:image\//.test(url)) url = '';
      if (url) { thumbStats.captured++; commitThumb(key, url, canvas, kind, false); return true; }
      thumbStats.tainted++;
      if (kind === 'poster' && origin && !(old && old.url)) commitThumb(key, origin, null, 'poster', true);
      else if (kind !== 'poster' && !IS_ANDROID) commitThumb(key, '', canvas, kind, false);
      if (origin) queueRescue(key, kind, origin, '');
      return true;
    } catch (_) { return false; }
  }

  /* ---- v3.6.4: readable thumbnails for cross-origin pictures (a tainted canvas cannot be exported) ---- */

  const rescueTried = new Set();
  const rescueQueue = [];
  const RESCUE_CAP = 80;               // pictures per page load
  let rescueCount = 0;
  let rescueBusy = false;

  function mimeOfVideo(url) {
    const m = /\.([a-z0-9]{2,4})(?:$|\?)/i.exec(String(url));
    const ext = m ? m[1].toLowerCase() : 'mp4';
    return ({ webm: 'video/webm', mov: 'video/quicktime', ogv: 'video/ogg', ogg: 'video/ogg', mkv: 'video/x-matroska' })[ext] || 'video/mp4';
  }

  /** Bytes through the manager (no CORS limit). `bytes` > 0 = only the first bytes (Range); a server that ignores Range is dropped. */
  function gmGetBlob(url, bytes) {
    return new Promise((resolve, reject) => {
      if (!GM_FN.request) { reject(new Error('no request API')); return; }
      let req = null;
      let settled = false;
      let timer = 0;
      const finish = (fn, value) => { if (settled) return; settled = true; window.clearTimeout(timer); fn(value); };
      const abort = () => { try { if (req && typeof req.abort === 'function') req.abort(); } catch (_) {} };
      timer = window.setTimeout(() => { abort(); gmNoteTimeout(url); finish(reject, new Error('timeout')); }, 20000);
      const headers = refererHeader();
      if (bytes > 0) headers.Range = 'bytes=0-' + (bytes - 1);
      try {
        req = GM_FN.request({
          method: 'GET',
          url,
          headers,
          responseType: 'blob',
          timeout: 20000,
          onreadystatechange: r => {
            if (settled || r.readyState !== 2 || !(bytes > 0) || r.status !== 200) return;
            const len = parseInt(rawHeader(r.responseHeaders, 'content-length') || '0', 10);
            if (!(len > 0 && len <= bytes * 1.2)) { abort(); finish(reject, new Error('Range ignored')); }
          },
          onload: r => {
            gmNoteOk(url);
            if (r.status < 200 || r.status >= 300) { finish(reject, new Error('HTTP ' + r.status)); return; }
            if (!r.response || !r.response.size) { finish(reject, new Error('empty answer')); return; }
            finish(resolve, r.response);
          },
          onerror: () => finish(reject, new Error('request failed')),
          ontimeout: () => { gmNoteTimeout(url); finish(reject, new Error('timeout')); },
          onabort: () => finish(reject, new Error('aborted'))
        });
      } catch (err) { finish(reject, err); }
    });
  }

  async function fetchBlobSimple(url) {
    if (!NATIVE.fetch) throw new Error('no fetch');
    const res = await NATIVE.fetch(url, { credentials: 'same-origin' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.blob();
  }

  async function blobImageToCanvas(blob) {
    let bmp = null;
    try { bmp = await createImageBitmap(blob); } catch (_) { bmp = null; }
    if (bmp) {
      const c = scaledCanvas(bmp, bmp.width, bmp.height);
      try { bmp.close(); } catch (_) {}
      return c;
    }
    return new Promise(resolve => {
      let href = '';
      try { href = URL.createObjectURL(blob); } catch (_) { resolve(null); return; }
      const img = new Image();
      img.onload = () => { let c = null; try { c = scaledCanvas(img, img.naturalWidth, img.naturalHeight); } catch (_) {} try { URL.revokeObjectURL(href); } catch (_) {} resolve(c); };
      img.onerror = () => { try { URL.revokeObjectURL(href); } catch (_) {} resolve(null); };
      img.src = href;
    });
  }

  /** The picture loaded with CORS ("anonymous"): readable when the other host sends Access-Control-Allow-Origin, an error otherwise. */
  function corsImageToCanvas(url) {
    return new Promise(resolve => {
      let done = false;
      const img = new Image();
      const finish = c => { if (done) return; done = true; window.clearTimeout(timer); resolve(c); };
      const timer = window.setTimeout(() => finish(null), 10000);
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        let c = null;
        try { c = scaledCanvas(img, img.naturalWidth, img.naturalHeight); if (canvasState(c) === 'unknown') c = null; } catch (_) { c = null; }
        finish(c);
      };
      img.onerror = () => finish(null);
      img.src = url;
    });
  }

  /**
   * A frame a little into the video, drawn from a detached element of our own (never the page's video). `cors` loads the
   * address with CORS so the canvas stays readable; otherwise the source is a same-origin blob. The frame is taken after the
   * seek; when the browser has not painted it (Firefox for Android hands out an empty surface) the element is played muted
   * for a moment and the first presented frame is taken (requestVideoFrameCallback where it exists).
   */
  function videoToCanvas(src, opts) {
    return new Promise(resolve => {
      let video = null;
      let done = false;
      let timer = 0;
      let tries = 0;
      let playing = false;
      const finish = canvas => {
        if (done) return;
        done = true;
        window.clearTimeout(timer);
        try { video.pause(); } catch (_) {}
        try { video.removeAttribute('src'); NATIVE.load.call(video); } catch (_) {}
        if (opts.revoke) { try { opts.revoke(); } catch (_) {} }
        resolve(canvas);
      };
      try {
        video = document.createElement('video');
        unsafeVideos.add(video);          // our own lock must not touch this element
        if (opts.cors) video.crossOrigin = 'anonymous';
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        video.preload = 'auto';
        const grab = () => {
          if (done || !(video.videoWidth > 0)) return false;
          let c = null;
          try { c = scaledCanvas(video, video.videoWidth, video.videoHeight); } catch (_) { return false; }
          const st = canvasState(c);
          if (st === 'blank' || st === 'unknown') return false;
          finish(c);
          return true;
        };
        const watchFrames = () => {
          if (done) return;
          const tick = () => { if (!done && !grab()) schedule(); };
          const schedule = () => { if (video.requestVideoFrameCallback) video.requestVideoFrameCallback(tick); else window.setTimeout(tick, 250); };
          schedule();
        };
        const viaPlay = () => {
          if (playing) return false;
          playing = true;
          try { const p = video.play(); if (p && p.catch) p.catch(() => {}); } catch (_) { return false; }
          watchFrames();
          return true;
        };
        video.addEventListener('loadeddata', () => {
          const d = Number.isFinite(video.duration) ? video.duration : 0;
          try { video.currentTime = Math.max(0.2, Math.min(1.5, d * 0.05)); } catch (_) { if (!grab() && !viaPlay()) finish(null); }
        }, { once: true });
        video.addEventListener('seeked', () => {
          if (grab()) return;
          if (viaPlay()) return;
          if (++tries > 3) { finish(null); return; }
          try { video.currentTime = video.currentTime + 1; } catch (_) { finish(null); }
        });
        video.addEventListener('error', () => finish(null), { once: true });
        timer = window.setTimeout(() => finish(null), opts.timeout || 15000);
        video.src = src;
      } catch (_) { finish(null); }
    });
  }

  /** The first bytes held in a same-origin blob (readable canvas). Faststart (moov first) files only. */
  function blobVideoToCanvas(blob, origin) {
    let href = '';
    try {
      const type = /^video\//.test(blob.type || '') ? blob.type : mimeOfVideo(origin);
      href = URL.createObjectURL(new Blob([blob], { type }));
    } catch (_) { return Promise.resolve(null); }
    return videoToCanvas(href, { revoke: () => URL.revokeObjectURL(href), timeout: 15000 });
  }

  async function rescueJob(job) {
    const old = thumbCache.get(job.key);
    if (old && old.url && !old.remote) return;                                   // a persistent one exists already
    if (old && old.kind === 'poster' && !old.remote && job.kind !== 'poster') return;
    const why = [];
    let canvas = null;
    if (job.kind === 'poster') {
      canvas = await corsImageToCanvas(job.origin);
      if (!canvas && !isCrossOrigin(job.origin)) { try { canvas = await blobImageToCanvas(await fetchBlobSimple(job.origin)); } catch (e) { why.push('fetch: ' + errCode(e)); } }
      if (!canvas && GM_FN.request && !gmHostBlocked(job.origin)) { try { canvas = await blobImageToCanvas(await gmGetBlob(job.origin, 0)); } catch (e) { why.push('manager: ' + errCode(e)); } }
    } else {
      canvas = await videoToCanvas(job.origin, { cors: true, timeout: 14000 });
      if (!canvas) why.push('page element: no CORS answer or no frame');
      if (!canvas && GM_FN.request && !gmHostBlocked(job.origin)) {
        try { canvas = await blobVideoToCanvas(await gmGetBlob(job.origin, THUMB_VIDEO_BYTES), job.origin); } catch (e) { why.push('manager: ' + errCode(e)); }
      }
    }
    if (canvas && canvasState(canvas) !== 'blank') {
      let url = '';
      try { url = canvas.toDataURL('image/jpeg', THUMB_JPEG_QUALITY); } catch (_) { url = ''; }
      if (url && /^data:image\//.test(url)) {
        const current = thumbCache.get(job.key);
        if (!(current && current.url && !current.remote) && !(current && current.kind === 'poster' && !current.remote && job.kind !== 'poster')) {
          commitThumb(job.key, url, null, job.kind, false);
          thumbStats.rescued++;
        }
        return;
      }
    }
    thumbStats.failed++;
    diagNote('thumb', job.origin, why.join(' | ') || 'no usable picture');
    if (job.kind === 'poster' && job.fallback) queueRescue(job.key, 'frame', job.fallback, '');
  }

  function pumpRescue() {
    if (rescueBusy || !rescueQueue.length) return;
    const job = rescueQueue.shift();
    rescueBusy = true;
    rescueJob(job).catch(err => diagNote('thumb', job.origin, err)).then(() => {
      rescueBusy = false;
      window.setTimeout(pumpRescue, 250);
    });
  }

  function queueRescue(key, kind, origin, fallback) {
    if (!key || !origin || !/^https?:/i.test(origin)) return;
    const tag = kind + ':' + key;
    if (rescueTried.has(tag) || rescueCount >= RESCUE_CAP) return;
    rescueTried.add(tag);
    rescueCount++;
    rescueQueue.push({ key, kind, origin, fallback: fallback || '' });
    pumpRescue();
  }

  /** A decoded frame of any <video> of the page (locked-and-opened, opened by the site, or the script is Off). */
  const blankTries = new WeakMap();
  function captureAny(video, entry) {
    if (!(video instanceof HTMLVideoElement) || video.readyState < 2 || !(video.videoWidth > 0)) return false;
    const key = keyOfVideo(video, entry || videoStates.get(video));
    if (!key) return false;
    const old = thumbCache.get(key);
    if (old && old.kind === 'poster' && !old.remote) return true;
    const ok = storeThumb(key, video, video.videoWidth, video.videoHeight, 'frame', videoURLOf(video, entry || videoStates.get(video)));
    if (!ok) {                                   // nothing painted yet (Android): look again when a frame is presented, and a little later
      const n = (blankTries.get(video) || 0) + 1;
      blankTries.set(video, n);
      if (n <= 8) {
        if (typeof video.requestVideoFrameCallback === 'function') video.requestVideoFrameCallback(() => captureAny(video, entry));
        window.setTimeout(() => captureAny(video, entry), 600 * n);
      }
    }
    return ok;
  }

  function captureFrame(entry) {
    if (entry && entry.element) captureAny(entry.element, entry);
  }

  /** Remember a duration the browser itself reported (the video element knows it: no request of ours). */
  function noteVideoDuration(video) {
    if (!(video instanceof HTMLVideoElement) || !(Number.isFinite(video.duration) && video.duration > 0)) return;
    const entry = videoStates.get(video);
    const key = keyOfVideo(video, entry);
    if (!key) return;
    learnInfo(key, video.duration, 0);
    const url = videoURLOf(video, entry);
    const tag = key + ':' + Math.round(video.duration);
    if (url && !dlMetaSaved.has(tag)) {
      dlMetaSaved.add(tag);
      saveVideoCache({ videoSrc: url, videoDuration: video.duration, videoSize: 0, probed: false });
    }
    queueRowUpdate();
  }

  function onMediaEvent(event) {
    const video = event.target;
    if (!(video instanceof HTMLVideoElement)) return;
    if (event.type === 'loadeddata') captureAny(video);
    else if (event.type === 'playing' || event.type === 'seeked') {     // v3.6.3: a frame that was blank at 'loadeddata' is caught here
      const key = keyOfVideo(video, videoStates.get(video));
      if (key && !thumbCache.has(key)) captureAny(video);
      return;
    }
    noteVideoDuration(video);
  }
  for (const type of ['loadeddata', 'loadedmetadata', 'durationchange', 'playing', 'seeked']) document.addEventListener(type, onMediaEvent, true);

  /** Frames / durations of videos that were already decoded before we looked (the page opened them, or the script is Off). */
  function sweepVideos() {
    for (const video of document.querySelectorAll('video')) {
      if (video.readyState < 1) continue;
      noteVideoDuration(video);
      if (video.readyState >= 2) captureAny(video);
    }
  }

  /* ---- duration / size knowledge ---- */

  function learnInfo(key, duration, size) {
    if (!key) return false;
    savedTouch(key, duration, size);
    let info = dlInfo.get(key);
    if (!info) { info = { duration: 0, size: 0, state: '', fails: 0, retryAt: 0 }; dlInfo.set(key, info); }
    let changed = false;
    if (duration > 0 && !(info.duration > 0)) { info.duration = duration; changed = true; }
    if (size > 0 && !(info.size > 0)) { info.size = size; changed = true; }
    return changed;
  }

  /** Called by updatePlaceholderInfo: an entry just learned (or re-showed) its duration / size. */
  function dlInfoChanged(entry) {
    if (!entry || entry.kind !== 'video' || entry.audio) return;
    if (!(entry.videoDuration > 0 || entry.videoSize > 0)) return;
    const key = thumbKey(entry);
    if (!key) return;
    learnInfo(key, entry.videoDuration, entry.videoSize);
    queueRowUpdate();
  }

  /** IndexedDB (no network): thumbnails + durations + sizes remembered from earlier visits, for rows not hydrated yet. */
  function hydrateRows(rows) {
    const need = [];
    for (const rec of rows) {
      if (rec.live && !dlHydrated.has(rec.key)) { dlHydrated.add(rec.key); need.push(rec.key); }
    }
    if (!need.length) return Promise.resolve();
    return Promise.all([idbGetThumbs(need), idbGetVideoMetaMany(need)]).then(([thumbs, metas]) => {
      for (const [key, th] of thumbs) if (!thumbCache.has(key)) thumbCache.set(key, { url: th.url, canvas: null, kind: th.kind, remote: !!th.remote });
      for (const [key, m] of metas) learnInfo(key, m.duration, m.size);
    }).catch(() => {}).then(() => {
      for (const key of need) dlHydrateDone.add(key);   // only now may a lookup (network) be considered for these videos
      queueRowUpdate();
      if (dlActive()) autoRowInfo();
    });
  }

  /** { ok, url, sameOrigin } or { ok: false, reason: 'stream' | 'bad' } - a fake link is never produced. */
  function linkInfo(raw) {
    let u;
    try { u = new URL(raw, document.baseURI); } catch (_) { return { ok: false, reason: 'bad' }; }
    if (!/^https?:$/.test(u.protocol)) return { ok: false, reason: 'bad' };
    if (/\.(m3u8|mpd)$/i.test(u.pathname)) return { ok: false, reason: 'stream' };
    const sameOrigin = u.origin === location.origin;
    // native: <a download> (same origin) | gm: manager download (another origin, up.shahvani.com) | tab: no manager -> new tab
    return { ok: true, url: u.href, sameOrigin, mode: sameOrigin ? 'native' : (GM_FN.download ? 'gm' : 'tab') };
  }

  /** File name for a manager download: the last path segment of the URL (always with an extension). */
  function fileNameOf(url) {
    let name = '';
    try { name = decodeURIComponent(new URL(url).pathname.split('/').filter(Boolean).pop() || ''); } catch (_) {}
    name = name.replace(/[\\/:*?"<>|\u0000-\u001f]+/g, '_').trim();
    if (!name) name = 'video';
    if (!/\.[A-Za-z0-9]{2,5}$/.test(name)) name += '.mp4';
    return name;
  }

  /** Rows of the Download list: videos of this page (DOM order, same numbering as the cards) + selected ones that left the page. */
  function downloadRows() {
    const rows = [];
    const live = new Set();
    let n = 0;
    for (const el of document.querySelectorAll('video')) {
      const entry = videoStates.get(el);
      const url = videoURLOf(el, entry);
      if (!url) continue;
      n++;
      const key = hashKey(videoKeyUrl(url));
      if (live.has(key)) continue;
      live.add(key);
      const snap = selection.get(key);
      const known = dlInfo.get(key);
      const duration = (entry && entry.videoDuration > 0 ? entry.videoDuration : 0)
        || (Number.isFinite(el.duration) && el.duration > 0 ? el.duration : 0)
        || (known ? known.duration : 0) || (snap ? snap.d : 0);
      const size = (entry && entry.videoSize > 0 ? entry.videoSize : 0) || (known ? known.size : 0) || (snap ? snap.s : 0);
      let poster = '';
      try {
        const raw = (entry && entry.poster) || el.getAttribute('poster') || '';
        if (raw && isUsableURL(raw) && !isBlobURL(raw)) poster = new URL(raw, document.baseURI).href;
      } catch (_) {}
      rows.push({ key, url, index: n, duration, size, live: true, poster });
    }
    // v3.6.3: only videos of THIS page are listed, selectable, downloadable and copyable (no rows left over from other pages)
    return rows;
  }

  /** Drops selected videos that are not on this page (page changed, video removed). Waits until the page is parsed. */
  function pruneSelection() {
    const here = pageKey();
    if (here !== selectionPage) { selectionPage = here; if (selection.size) { selection.clear(); saveSelection(); } dlHydrated.clear(); return; }
    if (!selection.size || document.readyState === 'loading') return;
    const live = new Set(downloadRows().map(rec => rec.key));
    let changed = false;
    for (const key of Array.from(selection.keys())) {
      if (!live.has(key)) { selection.delete(key); changed = true; }
    }
    if (changed) saveSelection();
  }

  function selectedRecs() {
    pruneSelection();
    return downloadRows().filter(rec => selection.has(rec.key));
  }

  function selectRec(rec, on, noSave) {
    if (on) {
      if (!selection.has(rec.key) && selection.size >= MAX_SELECTION) { setStatus('stDlLimit', { n: MAX_SELECTION }, true); return false; }
      selection.set(rec.key, { k: rec.key, u: rec.url, i: rec.index, d: rec.duration, s: rec.size });
    } else {
      selection.delete(rec.key);
    }
    if (!noSave) saveSelection();
    return true;
  }

  function tabLabel(id, key) {
    if (id === 'download') pruneSelection();
    return id === 'download' && selection.size ? t(key) + ' (' + selection.size + ')' : t(key);
  }

  function dlActive() {
    return !!(dlUI.box && dlUI.box.isConnected);
  }

  /** A video whose size or duration is still unknown and whose lookup is not running / out of tries. */
  function infoEligible(rec) {
    if (!rec.live || !dlHydrateDone.has(rec.key) || !linkInfo(rec.url).ok || (rec.duration > 0 && rec.size > 0)) return false;
    const known = dlInfo.get(rec.key);
    if (!known || !known.state) return true;
    return known.state === 'fail' && known.fails < INFO_MAX_FAILS && Date.now() >= known.retryAt;
  }

  function missingInfoRecs() {
    return downloadRows().filter(infoEligible);
  }

  /** Sum of the selected videos: only what is known is counted; `unknown` = selected videos without size or duration. */
  function selectionTotals() {
    let size = 0;
    let duration = 0;
    let unknown = 0;
    for (const item of selection.values()) {
      if (item.s > 0) size += item.s;
      if (item.d > 0) duration += item.d;
      if (!(item.s > 0 && item.d > 0)) unknown++;
    }
    return { size, duration, unknown };
  }

  function refreshDownloadUI() {
    pruneSelection();
    const ui = state.ui;
    if (ui) {
      const tab = ui.tabs.querySelector('[data-tab="download"]');
      if (tab) tab.textContent = tabLabel('download', 'tabDownload');
    }
    if (dlUI.count && dlUI.count.isConnected) {
      dlUI.count.textContent = t('dlSelectedCount', { n: selection.size, m: dlUI.rows.size });
      if (dlUI.total) {
        const sum = selectionTotals();
        dlUI.total.textContent = t('dlTotals', { dur: formatDuration(sum.duration) || '0:00', size: formatSize(sum.size) || '0 MB' })
          + (sum.unknown ? t('dlTotalsUnknown', { u: sum.unknown }) : '');
      }
      if (dlUI.btnDl) dlUI.btnDl.refresh();
      if (dlUI.btnCopy) dlUI.btnCopy.refresh();
      if (dlUI.btnSaved) dlUI.btnSaved.textContent = t('svOpen', { n: saved.size });
      if (dlUI.queue) {
        const line = dlStatusLine();
        dlUI.queue.textContent = line;
        dlUI.queue.style.display = line ? '' : 'none';
      }
      if (dlUI.btnRetry) {
        const n = dlQ.failed.length;
        const show = n > 0 && !dlQ.running && !dlQ.pending.length;
        dlUI.btnRetry.style.display = show ? '' : 'none';
        if (show) dlUI.btnRetry.textContent = t('dlRetry', { n });
      }
    }
    refreshSavedUI();
  }

  /** Brings every row checkbox in line with the selection (in place - no list rebuild). */
  function syncDownloadRows() {
    for (const [key, ref] of Array.from(dlUI.rows)) {
      const on = selection.has(key);
      ref.cb.setAttribute('data-on', on ? '1' : '0');
      ref.cb.setAttribute('aria-checked', String(on));
      if (!on && !ref.rec.live) { ref.row.remove(); dlUI.rows.delete(key); }   // selected video that left the page
    }
    refreshDownloadUI();
  }

  function toggleRow(rec) {
    if (!selectRec(rec, !selection.has(rec.key))) return;
    syncDownloadRows();
  }

  function setAllSelected(on) {
    pruneSelection();
    if (on) {
      for (const rec of downloadRows()) if (!selectRec(rec, true, true)) break;
    } else {
      selection.clear();
    }
    saveSelection();
    syncDownloadRows();
  }

  function clickAnchor(url, attrs) {
    try {
      const a = document.createElement('a');
      a.href = url;
      for (const [name, value] of Object.entries(attrs)) a.setAttribute(name, value);
      a.rel = 'noopener noreferrer';
      a.style.display = 'none';
      (state.ui ? state.ui.root : (document.body || document.documentElement)).appendChild(a);
      a.click();
      window.setTimeout(() => a.remove(), 1000);
      return true;
    } catch (_) { return false; }
  }

  /** One plain <a download> click (same origin). Inside our shadow root, so the page's own click handlers never see it. */
  function triggerDownload(url) {
    return clickAnchor(url, { download: '' });
  }

  /** Last resort for another origin without a manager: the video opens in a new tab and can be saved from there. */
  function openInTab(url) {
    return clickAnchor(url, { target: '_blank' });
  }

  const sleepMs = ms => new Promise(resolve => window.setTimeout(resolve, ms));

  /** The last download problem stays on screen (a toast is gone before it can be read). */
  function dlReport(text) {
    if (text) diagNote('download', '', text);
    for (const el of [dlUI.err, svUI.err]) {
      if (el && el.isConnected) {
        el.textContent = text || '';
        el.style.display = text ? '' : 'none';
      }
    }
  }

  function errCode(e) {
    if (!e) return 'error';
    let detail = '';
    if (e.details) detail = typeof e.details === 'string' ? e.details : (e.details.current || e.details.error || '');
    return String(e.error || e.message || 'error') + (detail ? ' (' + String(detail).slice(0, 80) + ')' : '');
  }

  /** The video's address stays usable when nothing else works: copied (always) and opened in a tab (a popup blocker may stop it). */
  function linkFallback(urls) {
    const list = Array.isArray(urls) ? urls : [urls];
    copyText(list.join('\n')).catch(() => {});
    openInTab(list[0]);
  }

  const DL_CONCURRENCY = IS_ANDROID ? 2 : 3;   // manager downloads running at the same time (the browser keeps its own queue)
  const DL_FIRST_ANSWER_MS = 20000;            // v3.6.4: a manager downloader that says NOTHING for this long has not started (it used to count as 'running')
  const dlQ = { pending: [], running: 0, total: 0, done: 0, skipped: 0, failed: [], active: new Set(), tabLinks: [], anchor: Promise.resolve(), via: {} };
  const dlLog = [];   // v3.6.4: how each recent download was started (diagnostics)
  function dlLogAdd(name, via, ok, err) {
    dlLog.push({ t: new Date().toISOString().slice(11, 19), name: String(name).slice(0, 40), via, ok: !!ok, err: String(err || '').slice(0, 140) });
    while (dlLog.length > 14) dlLog.shift();
  }

  /**
   * v3.6.4: does the manager's own downloader work on this device at all? (Firefox for Android has no downloads API, so
   * Tampermonkey's GM_download may say nothing and never start a file.) One failure with no success before it switches
   * 'auto' to the other ways for the rest of the tab's life; the 'Tampermonkey' method in the menu still always tries it.
   */
  const GMDL_HEALTH_KEY = 'shv.gmdl.v1';
  const gmDlHealth = (() => {
    try { const o = JSON.parse(sessionStorage.getItem(GMDL_HEALTH_KEY) || 'null'); if (o) return { ok: +o.ok || 0, bad: +o.bad || 0 }; } catch (_) {}
    return { ok: 0, bad: 0 };
  })();
  function gmDlNote(good) {
    if (good) gmDlHealth.ok++; else gmDlHealth.bad++;
    try { sessionStorage.setItem(GMDL_HEALTH_KEY, JSON.stringify(gmDlHealth)); } catch (_) {}
  }
  function gmDlBroken() { return gmDlHealth.bad >= 1 && gmDlHealth.ok === 0; }

  /**
   * Stage 1: the manager's own downloader. { ok } | { ok: false, err, silent? }.
   * v3.6.4 (strict): it counts as started only after an answer - finished, or a progress report. A downloader that stays
   * silent is aborted and reported as failed so the next way is tried (before: silence counted as success, nothing downloaded).
   */
  function gmDownloadStage(url, name, withHeaders, strict) {
    return new Promise(resolve => {
      let settled = false;
      let watchdog = 0;
      let got = false;
      let handle = null;
      const done = result => { if (settled) return; settled = true; window.clearTimeout(watchdog); resolve(result); };
      const arm = () => {
        window.clearTimeout(watchdog);
        watchdog = window.setTimeout(() => {
          if (got || !strict) { done({ ok: true, running: true }); return; }
          try { if (handle && typeof handle.abort === 'function') handle.abort(); } catch (_) {}
          done({ ok: false, err: 'no answer from the downloader (' + gmHandler() + ')', silent: true });
        }, got ? DL_STALL_MS : DL_FIRST_ANSWER_MS);
      };
      try {
        arm();
        const details = {
          url,
          name,
          saveAs: false,
          conflictAction: 'uniquify',
          onload: () => done({ ok: true }),
          onerror: e => done({ ok: false, err: errCode(e) }),
          ontimeout: () => done({ ok: false, err: 'timeout' }),
          onprogress: () => { got = true; arm(); }
        };
        if (withHeaders) details.headers = refererHeader();
        handle = GM_FN.download(details);
        if (handle && typeof handle.then === 'function') handle.then(() => done({ ok: true }), e => done({ ok: false, err: errCode(e) }));
      } catch (err) {
        done({ ok: false, err: errCode(err) });
      }
    });
  }

  /**
   * Stage 2 (the manager's downloader failed): the manager fetches the file as a blob and the browser saves it from a
   * same-origin blob link. The whole file is held in memory meanwhile, so it is skipped above BLOB_MAX.
   */
  function gmBlobStage(url, name, size) {
    return new Promise(resolve => {
      if (!GM_FN.request) { resolve({ ok: false, err: 'no request API' }); return; }
      if (size > BLOB_MAX) { resolve({ ok: false, err: 'too big for the memory fallback (' + formatSize(size) + ')' }); return; }
      let settled = false;
      let watchdog = 0;
      let handle = null;
      let got = false;
      const done = result => { if (settled) return; settled = true; window.clearTimeout(watchdog); resolve(result); };
      const arm = () => {
        window.clearTimeout(watchdog);
        watchdog = window.setTimeout(() => {
          try { if (handle && handle.abort) handle.abort(); } catch (_) {}
          if (!got) gmNoteTimeout(url);
          done({ ok: false, err: got ? 'no progress' : 'no answer (is Tampermonkey waiting for a permission?)' });
        }, got ? DL_STALL_MS : DL_FIRST_ANSWER_MS);
      };
      try {
        arm();
        handle = GM_FN.request({
          method: 'GET',
          url,
          headers: refererHeader(),
          responseType: 'blob',
          onreadystatechange: () => { got = true; arm(); },
          onprogress: () => { got = true; arm(); },
          onload: r => {
            const blob = r.response;
            if (r.status < 200 || r.status >= 300) { done({ ok: false, err: 'HTTP ' + r.status }); return; }
            if (!blob || typeof blob.size !== 'number' || !blob.size) { done({ ok: false, err: 'empty answer' }); return; }
            if (/^text\/|json|html/i.test(blob.type || '')) { done({ ok: false, err: 'not a video (' + blob.type + ')' }); return; }
            let href = '';
            try { href = URL.createObjectURL(blob); } catch (e) { done({ ok: false, err: errCode(e) }); return; }
            clickAnchor(href, { download: name });
            window.setTimeout(() => { try { URL.revokeObjectURL(href); } catch (_) {} }, 120000);
            done({ ok: true });
          },
          onerror: () => done({ ok: false, err: 'request failed' }),
          ontimeout: () => done({ ok: false, err: 'timeout' }),
          onabort: () => done({ ok: false, err: 'aborted' })
        });
      } catch (err) {
        done({ ok: false, err: errCode(err) });
      }
    });
  }

  /** Stage 3 (v3.6.3): the page's own fetch - only works when the other host sends CORS headers. */
  async function fetchBlobStage(url, name, size) {
    if (!NATIVE.fetch) return { ok: false, err: 'no fetch' };
    if (size > BLOB_MAX) return { ok: false, err: 'too big for the memory fallback (' + formatSize(size) + ')' };
    try {
      const res = await NATIVE.fetch(url, { mode: 'cors', credentials: 'omit' });
      if (!res.ok) return { ok: false, err: 'page fetch: HTTP ' + res.status };
      const blob = await res.blob();
      if (!blob.size) return { ok: false, err: 'page fetch: empty answer' };
      if (/^text\/|json|html/i.test(blob.type || '')) return { ok: false, err: 'page fetch: not a video (' + blob.type + ')' };
      const href = URL.createObjectURL(blob);
      clickAnchor(href, { download: name });
      window.setTimeout(() => { try { URL.revokeObjectURL(href); } catch (_) {} }, 120000);
      return { ok: true };
    } catch (err) {
      return { ok: false, err: 'page fetch: ' + errCode(err) };
    }
  }

  /** One plain <a download> click, serialised: clicks are spaced out so the browser (Firefox for Android in particular) does not drop any. */
  function nativeClick(url) {
    const gap = IS_ANDROID ? 2000 : DOWNLOAD_GAP_MS;
    const run = dlQ.anchor.then(() => { triggerDownload(url); return sleepMs(gap); });
    dlQ.anchor = run.catch(() => {});
    return run;
  }

  /**
   * One job. Order depends on Settings > Download method (dlMethod):
   *   auto - same origin: Firefox's own link (desktop) / the manager's downloader first (Android); another origin: the manager.
   *   link - the browser only: a link (same origin) or the manager fetching a blob that the browser saves (another origin).
   *   gm   - the manager's downloader first, always.
   * The manager chain: downloader (with Referer) -> again without custom headers -> blob -> page fetch -> failed.
   * Whatever starts a file reports how ('via'): it is shown in the summary and in the diagnostics.
   */
  async function runDownloadJob(job) {
    const name = fileNameOf(job.url);
    const notes = [];
    const method = settings.dlMethod;
    const sameOrigin = job.mode === 'native';
    const gmDl = !!GM_FN.download && gmMode() !== 'disabled';
    const started = via => { dlLogAdd(name, via, true, ''); return { ok: true, name, via }; };
    if (job.mode === 'tab') { dlQ.tabLinks.push(job.url); dlLogAdd(name, 'tab', false, 'no Tampermonkey download'); return { ok: false, name, err: 'no Tampermonkey download (link copied)' }; }

    const tryGmDl = gmDl && method !== 'link' && (method === 'gm' || !gmDlBroken()) && (!sameOrigin || IS_ANDROID || method === 'gm');
    if (sameOrigin && !tryGmDl) { await nativeClick(job.url); return started('link'); }

    if (tryGmDl) {
      setStatus('stDlGmStart', { i: dlQ.done + dlQ.failed.length + 1, n: dlQ.total, name });
      let first = await gmDownloadStage(job.url, name, true, true);
      if (!first.ok && !first.silent) {
        notes.push('Tampermonkey: ' + first.err);
        first = await gmDownloadStage(job.url, name, false, true);
      }
      if (!first.ok) notes.push('Tampermonkey' + (first.silent ? '' : ' (no headers)') + ': ' + first.err);
      gmDlNote(first.ok);
      if (first.ok) { if (first.running) setStatus('stDlGmRunning', { name }); return started('tm'); }
    } else if (!sameOrigin) {
      notes.push(!GM_FN.download ? 'no Tampermonkey download' : (method === 'link' ? 'Tampermonkey downloader skipped (Download method: browser)' : 'Tampermonkey downloader skipped (it did not start a file earlier)'));
    }
    if (sameOrigin) { await nativeClick(job.url); return started('link'); }   // same origin: the plain link is the last option

    const size = (dlInfo.get(job.key) && dlInfo.get(job.key).size) || (selection.get(job.key) && selection.get(job.key).s) || (saved.get(job.key) && saved.get(job.key).s) || 0;
    if (GM_FN.request) {
      setStatus('stDlBlob', { name });
      const second = await gmBlobStage(job.url, name, size);
      if (second.ok) return started('tm-blob');
      notes.push('fallback: ' + second.err);
    }
    const third = await fetchBlobStage(job.url, name, size);
    if (third.ok) return started('page-fetch');
    notes.push(third.err);
    const err = notes.join(' | ');
    dlLogAdd(name, 'failed', false, err);
    return { ok: false, name, err };
  }

  function dlStatusLine() {
    return dlQ.total ? t('stDlQueue', { i: dlQ.done + dlQ.failed.length, n: dlQ.total, f: dlQ.failed.length }) : '';
  }

  function dlFinish() {
    const failed = dlQ.failed.slice();
    const done = dlQ.done;
    const skipped = dlQ.skipped;
    const viaKeys = { tm: 'viaTm', link: 'viaLink', 'tm-blob': 'viaBlob', 'page-fetch': 'viaFetch' };
    const via = Object.keys(dlQ.via).length ? ' (' + Object.keys(dlQ.via).map(k => t(viaKeys[k] || 'viaLink') + ' ' + dlQ.via[k]).join(', ') + ')' : '';
    dlBusy = false;
    if (failed.length) {
      const links = failed.map(item => item.job.url);
      copyText(links.join('\n')).catch(() => {});
      if (dlQ.tabLinks.length) openInTab(dlQ.tabLinks[0]);
      dlReport(failed.slice(0, 4).map(item => item.name + ' - ' + item.err).join('\n') + (failed.length > 4 ? '\n+' + (failed.length - 4) : ''));
      setStatus('stDlSentFailed', { n: done, f: failed.length, m: skipped, v: via }, true);
    } else {
      setStatus('stDlSent', { n: done, m: skipped, v: via }, true);
    }
    dlQ.total = 0; dlQ.done = 0; dlQ.skipped = 0; dlQ.tabLinks = []; dlQ.via = {};
    refreshDownloadUI();
  }

  function dlPump() {
    while (dlQ.running < DL_CONCURRENCY && dlQ.pending.length) {
      const job = dlQ.pending.shift();
      dlQ.running++;
      runDownloadJob(job).catch(err => ({ ok: false, name: fileNameOf(job.url), err: errCode(err) })).then(res => {
        dlQ.running--;
        dlQ.active.delete(job.url);
        if (res.ok) { dlQ.done++; dlQ.via[res.via] = (dlQ.via[res.via] || 0) + 1; }
        else { dlQ.failed.push({ job, name: res.name, err: res.err }); diagNote('download', job.url, res.err); }
        if (dlQ.running === 0 && !dlQ.pending.length) dlFinish();
        else { setStatus('stDlQueue', { i: dlQ.done + dlQ.failed.length, n: dlQ.total, f: dlQ.failed.length }); dlPump(); }
      });
    }
  }

  /**
   * v3.6.3: straight into the queue - no confirmation, one video or many. Several manager downloads run at once
   * (DL_CONCURRENCY); anything added while a batch is running joins that batch. Every video ends as started or failed:
   * failures are listed, their links copied, and "Retry failed" runs them again.
   */
  function downloadRecs(recs) {
    const jobs = [];
    let skipped = 0;
    for (const rec of recs) {
      const info = linkInfo(rec.url);
      if (!info.ok) skipped++;
      else if (!dlQ.active.has(info.url) && !jobs.some(job => job.url === info.url)) jobs.push({ url: info.url, mode: info.mode, key: rec.key });
    }
    if (!jobs.length) { setStatus(recs.length && !skipped ? 'stDlBusy' : 'stDlUnavailable', { m: skipped }, true); return; }

    if (!dlQ.running && !dlQ.pending.length) { dlQ.failed = []; dlReport(''); }
    dlBusy = true;
    dlQ.skipped += skipped;
    dlQ.total += jobs.length;
    for (const job of jobs) { dlQ.active.add(job.url); dlQ.pending.push(job); }
    setStatus('stDlQueue', { i: dlQ.done + dlQ.failed.length, n: dlQ.total, f: dlQ.failed.length });
    dlPump();
    refreshDownloadUI();
  }

  function retryFailed() {
    if (dlQ.running || dlQ.pending.length || !dlQ.failed.length) return;
    const recs = dlQ.failed.map(item => ({ key: item.job.key, url: item.job.url }));
    dlQ.failed = [];
    downloadRecs(recs);
  }

  /* ======================================================================
   * Saved videos (v3.6.4)
   * A video can be saved from its row in the Download list (bookmark icon). The address, name, duration, size and
   * thumbnail are kept for good (no expiry) until it is un-saved: meta in localStorage, thumbnails in IndexedDB
   * (localStorage fallback). The saved list is opened with the "Saved" button of the Download tab (Alt+Shift+B).
   * ==================================================================== */

  const SAVED_KEY = 'shvUltraLite.saved.v1';
  const SAVED_MAX = 500;
  const ICON_BOOKMARK = 'M6 3h12v18l-6-4-6 4z';
  const ICON_PLAY = 'M8 5v14l11-7z';
  const saved = new Map();          // key -> { k, u: address, n: file name, t: page title, p: page, a: saved at, d: duration, s: size }
  const savedThumbs = new Map();    // key -> { url, remote }
  const savedSel = new Set();       // keys ticked in the saved list
  const svUI = { box: null, rows: new Map(), count: null, queue: null, btnRetry: null, btnDl: null, btnCopy: null, btnRemove: null, err: null, empty: null };
  let savedPersistTimer = 0;
  let savedThumbsReady = null;
  let svPollTimer = 0;
  const savedInfoTried = new Set();
  let savedProbeBusy = false;

  function savedLoad() {
    try {
      const list = JSON.parse(localStorage.getItem(SAVED_KEY) || '[]');
      if (!Array.isArray(list)) return;
      for (const r of list.slice(0, SAVED_MAX)) {
        if (r && typeof r.k === 'string' && typeof r.u === 'string' && /^https?:/i.test(r.u)) {
          saved.set(r.k, { k: r.k, u: r.u, n: String(r.n || ''), t: String(r.t || ''), p: String(r.p || ''), a: +r.a || 0, d: +r.d || 0, s: +r.s || 0 });
        }
      }
    } catch (_) {}
  }
  savedLoad();

  function savedFlush() {
    window.clearTimeout(savedPersistTimer);
    savedPersistTimer = 0;
    try { localStorage.setItem(SAVED_KEY, JSON.stringify(Array.from(saved.values()))); } catch (err) { diagNote('saved', '', err); }
  }
  function savedPersist() {
    window.clearTimeout(savedPersistTimer);
    savedPersistTimer = window.setTimeout(savedFlush, 150);
  }
  window.addEventListener('pagehide', () => { if (savedPersistTimer) savedFlush(); });

  function savedList() {
    return Array.from(saved.values()).sort((x, y) => y.a - x.a);
  }

  /** Duration / size learned later (a lookup, the cache, a video that was opened) are written into the saved record. */
  function savedTouch(key, duration, size) {
    const r = saved.get(key);
    if (!r) return;
    let changed = false;
    if (duration > 0 && !(r.d > 0)) { r.d = duration; changed = true; }
    if (size > 0 && !(r.s > 0)) { r.s = size; changed = true; }
    if (changed) savedPersist();
  }

  /* thumbnails of saved videos: permanent while saved */
  function savedThumbPut(key, url, remote) {
    if (!key || !url) return;
    savedThumbs.set(key, { url, remote: !!remote });
    idbInit().then(db => new Promise((resolve, reject) => {
      if (!db.objectStoreNames.contains('savedThumbs')) { reject(new Error('no savedThumbs store')); return; }
      const tx = db.transaction('savedThumbs', 'readwrite');
      tx.objectStore('savedThumbs').put({ id: key, url, remote: !!remote, timestamp: Date.now() });
      tx.oncomplete = () => resolve();
      tx.onerror = tx.onabort = () => reject(tx.error || new Error('transaction failed'));
    })).catch(err => {
      diagNote('idb', 'savedThumbs', err);
      lsSavedThumbs.put(key, { u: url, r: remote ? 1 : 0 });
    });
  }

  function savedThumbDelete(key) {
    savedThumbs.delete(key);
    lsSavedThumbs.del(key);
    idbInit().then(db => {
      if (!db.objectStoreNames.contains('savedThumbs')) return;
      db.transaction('savedThumbs', 'readwrite').objectStore('savedThumbs').delete(key);
    }).catch(() => {});
  }

  function savedThumbsLoad() {
    if (savedThumbsReady) return savedThumbsReady;
    const keys = Array.from(saved.keys());
    for (const [k, r] of lsSavedThumbs.get(keys, 0)) savedThumbs.set(k, { url: r.u, remote: !!r.r });
    savedThumbsReady = idbInit().then(db => new Promise(resolve => {
      if (!keys.length || !db.objectStoreNames.contains('savedThumbs')) { resolve(); return; }
      const tx = db.transaction('savedThumbs', 'readonly');
      const store = tx.objectStore('savedThumbs');
      for (const k of keys) {
        const req = store.get(k);
        req.onsuccess = () => { const r = req.result; if (r && typeof r.url === 'string') savedThumbs.set(k, { url: r.url, remote: !!r.remote }); };
      }
      tx.oncomplete = () => resolve();
      tx.onerror = tx.onabort = () => resolve();
    })).catch(err => { diagNote('idb', 'savedThumbs read', err); });
    return savedThumbsReady;
  }

  /** commitThumb calls this: a thumbnail made for a saved video is kept with it (a picture is never downgraded to an address). */
  function savedNoteThumb(key, url, remote) {
    if (!saved.has(key) || !url) return;
    const cur = savedThumbs.get(key);
    if (cur && !cur.remote && remote) return;
    savedThumbPut(key, url, remote);
  }

  function saveRec(rec) {
    const info = linkInfo(rec.url);
    if (!info.ok) return false;
    if (saved.has(rec.key)) return true;
    if (saved.size >= SAVED_MAX) { setStatus('stSavedFull', { n: SAVED_MAX }, true); return false; }
    const known = dlInfo.get(rec.key);
    saved.set(rec.key, {
      k: rec.key,
      u: info.url,
      n: fileNameOf(info.url),
      t: String(document.title || '').replace(/\s+/g, ' ').trim().slice(0, 90),
      p: location.origin + location.pathname + location.search,
      a: Date.now(),
      d: rec.duration || (known && known.duration) || 0,
      s: rec.size || (known && known.size) || 0
    });
    const th = thumbCache.get(rec.key);
    if (th && th.url) savedThumbPut(rec.key, th.url, th.remote);
    else if (settings.autoThumbs) queueRescue(rec.key, 'frame', info.url, '');
    savedPersist();
    return true;
  }

  function unsaveKey(key) {
    if (!saved.delete(key)) return;
    savedSel.delete(key);
    savedThumbDelete(key);
    savedPersist();
  }

  function toggleSaved(rec) {
    if (saved.has(rec.key)) { unsaveKey(rec.key); setStatus('stUnsaved', { n: 1 }, true); }
    else if (saveRec(rec)) setStatus('stSaved', { n: 1 }, true);
    syncSavedUI();
  }

  function setSaveBtn(btn, on) {
    const tip = t(on ? 'dlTipSaved' : 'dlTipSave');
    btn.classList.toggle('on', on);
    btn.title = tip;
    btn.setAttribute('aria-label', tip);
    btn.setAttribute('aria-pressed', String(on));
  }

  /** Brings every bookmark icon / counter in line with the saved list (in place). */
  function syncSavedUI() {
    for (const ref of dlUI.rows.values()) if (ref.saveBtn) setSaveBtn(ref.saveBtn, saved.has(ref.rec.key));
    if (dlUI.btnSaved && dlUI.btnSaved.isConnected) dlUI.btnSaved.textContent = t('svOpen', { n: saved.size });
    refreshSavedUI();
  }

  function openVideoTab(url) {
    try {
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.referrerPolicy = 'origin';         // the video host sees where it is linked from (hot-link filters), not the page address
      a.style.display = 'none';
      (state.ui ? state.ui.root : (document.body || document.documentElement)).appendChild(a);
      a.click();
      window.setTimeout(() => a.remove(), 1000);
    } catch (err) { diagNote('play', url, err); }
  }

  const savedRec = item => ({ key: item.k, url: item.u, duration: item.d, size: item.s });
  const savedSelRecs = () => savedList().filter(item => savedSel.has(item.k)).map(savedRec);

  function rowAction(path, tip, fn, disabled) {
    const button = h('button', { class: 'ib', type: 'button', title: tip, 'aria-label': tip });
    button.append(svgIcon(path));
    if (disabled) button.setAttribute('disabled', '');
    button.addEventListener('click', event => { event.stopPropagation(); fn(); });
    return button;
  }

  function paintSavedRow(ref) {
    const item = saved.get(ref.item.k) || ref.item;
    ref.item = item;
    const cached = thumbCache.get(item.k) || savedThumbs.get(item.k) || null;
    const sig = cached ? cached.url || cached.canvas : null;
    if (ref.thumbOf !== sig || (!cached && ref.thumbOf === undefined)) {
      ref.thumbOf = sig;
      ref.thumb.textContent = '';
      const node = cached ? thumbNode(cached) : null;
      if (node) ref.thumb.append(node); else ref.thumb.textContent = '▶';
      ref.thumb.classList.toggle('has', !!node);
    }
    const known = dlInfo.get(item.k);
    const d = item.d > 0 ? item.d : (known ? known.duration : 0);
    const sz = item.s > 0 ? item.s : (known ? known.size : 0);
    const set = (chip, text, empty) => { const v = text || empty; if (chip.textContent !== v) chip.textContent = v; chip.classList.toggle('unk', !text); };
    set(ref.dur, formatDuration(d), '--:--');
    set(ref.size, formatSize(sz), '-- MB');
  }

  function paintSavedRows() {
    if (!svUI.box || !svUI.box.isConnected) return;
    for (const ref of svUI.rows.values()) paintSavedRow(ref);
  }

  function savedRow(item, n) {
    const info = linkInfo(item.u);
    const on = savedSel.has(item.k);
    const cb = h('span', { class: 'cb', role: 'checkbox', tabindex: '0', 'aria-label': t('dlTipSelect'), 'aria-checked': String(on), 'data-on': on ? '1' : '0', text: '✓' });
    const thumb = h('div', { class: 'dlth', 'aria-hidden': 'true' });
    const dur = h('span', { class: 'dlchip unk', title: t('dlChipDuration'), text: '--:--' });
    const size = h('span', { class: 'dlchip unk', title: t('dlChipSize'), text: '-- MB' });
    let when = '';
    try { when = new Date(item.a).toLocaleDateString(settings.lang === 'fa' ? 'fa-IR' : undefined); } catch (_) { when = ''; }
    const notes = [];
    if (!info.ok) notes.push(t(info.reason === 'stream' ? 'dlStream' : 'dlNoLink'));
    const infoBox = h('div', { class: 'dlinfo' }, h('b', { text: '#' + n }), h('div', { class: 'dlmeta' }, dur, size),
      item.t ? h('small', { class: 'svtitle', text: item.t }) : null, h('small', { text: when }), ...notes.map(text => h('small', { text })));
    const ref = { row: null, cb, thumb, dur, size, item, thumbOf: undefined };
    const actions = h('div', { class: 'dlact' },
      rowAction(ICON_DOWNLOAD, t('dlTipDownload'), () => downloadRecs([savedRec(ref.item)]), !info.ok),
      rowAction(ICON_COPY, t('dlTipCopy'), () => copyRecs([savedRec(ref.item)]), !info.ok),
      rowAction(ICON_PLAY, t('svTipPlay'), () => openVideoTab(ref.item.u), !info.ok));
    ref.row = h('div', { class: 'dlrow' }, cb, thumb, infoBox, actions);
    activate(cb, () => toggleSavedRow(ref.item.k));
    infoBox.addEventListener('click', () => toggleSavedRow(ref.item.k));
    thumb.addEventListener('click', () => toggleSavedRow(ref.item.k));
    paintSavedRow(ref);
    return ref;
  }

  function toggleSavedRow(key) {
    if (savedSel.has(key)) savedSel.delete(key); else savedSel.add(key);
    const ref = svUI.rows.get(key);
    if (ref) { const on = savedSel.has(key); ref.cb.setAttribute('data-on', on ? '1' : '0'); ref.cb.setAttribute('aria-checked', String(on)); }
    refreshSavedUI();
  }

  function setAllSavedSelected(on) {
    savedSel.clear();
    if (on) for (const item of savedList()) savedSel.add(item.k);
    for (const [key, ref] of svUI.rows) { const v = savedSel.has(key); ref.cb.setAttribute('data-on', v ? '1' : '0'); ref.cb.setAttribute('aria-checked', String(v)); }
    refreshSavedUI();
  }

  function refreshSavedUI() {
    if (!svUI.box || !svUI.box.isConnected) return;
    svUI.count.textContent = t('svCount', { n: saved.size, m: savedSel.size });
    for (const btn of [svUI.btnDl, svUI.btnCopy, svUI.btnRemove]) if (btn) btn.refresh();
    if (svUI.empty) svUI.empty.style.display = saved.size ? 'none' : '';
    const line = dlStatusLine();
    svUI.queue.textContent = line;
    svUI.queue.style.display = line ? '' : 'none';
    const n = dlQ.failed.length;
    const show = n > 0 && !dlQ.running && !dlQ.pending.length;
    svUI.btnRetry.style.display = show ? '' : 'none';
    if (show) svUI.btnRetry.textContent = t('dlRetry', { n });
  }

  function removeSavedSelected() {
    const keys = Array.from(savedSel);
    for (const key of keys) unsaveKey(key);
    setStatus('stUnsaved', { n: keys.length }, true);
    if (state.open && state.savedView) renderAll();
    syncSavedUI();
  }

  function openSaved() {
    if (!state.ui) return;
    state.activeTab = 'download';
    state.savedView = true;
    if (state.open) { renderAll(); state.ui.body.scrollTop = 0; } else toggleSheet(true);
  }

  function closeSaved() {
    state.savedView = false;
    if (state.ui) { renderAll(); state.ui.body.scrollTop = 0; }
  }

  /** Sizes / durations / pictures that a saved video still lacks are looked up one at a time while the list is open. */
  function savedProbeNext() {
    if (savedProbeBusy || document.hidden) return;
    const item = savedList().find(i => !(i.d > 0 && i.s > 0) && !savedInfoTried.has(i.k) && linkInfo(i.u).ok);
    if (!item) return;
    savedInfoTried.add(item.k);
    savedProbeBusy = true;
    const cached = probeSession.get(item.k);
    if (!cached) state.probeCount++;
    (cached ? Promise.resolve(cached) : probeVideo(item.u)).then(res => {
      if (res && (res.size > 0 || res.duration > 0)) {
        probeSession.set(item.k, res);
        learnInfo(item.k, res.duration, res.size);
        saveVideoCache({ videoSrc: item.u, videoDuration: res.duration, videoSize: res.size, probed: true });
      }
    }).catch(() => {}).then(() => {
      savedProbeBusy = false;
      paintSavedRows();
      window.setTimeout(savedProbeNext, 300);
    });
  }

  function savedWarm() {
    const recs = savedList().map(item => ({ key: item.k, live: true }));
    Promise.all([savedThumbsLoad(), hydrateRows(recs)]).then(() => {
      for (const item of savedList()) {
        if (!thumbCache.has(item.k) && !savedThumbs.has(item.k) && settings.autoThumbs && linkInfo(item.u).ok) queueRescue(item.k, 'frame', item.u, '');
      }
      paintSavedRows();
      savedProbeNext();
    });
  }

  function startSavedPoll() {
    if (svPollTimer) return;
    svPollTimer = window.setInterval(() => {
      if (!svUI.box || !svUI.box.isConnected) { window.clearInterval(svPollTimer); svPollTimer = 0; return; }
      paintSavedRows();
      savedProbeNext();
    }, 1500);
  }

  function buildSaved() {
    const f = document.createDocumentFragment();
    for (const key of Array.from(savedSel)) if (!saved.has(key)) savedSel.delete(key);
    svUI.rows = new Map();
    svUI.count = h('b', { class: 'dlcount' });
    svUI.queue = h('div', { class: 'dlsum dlq' });
    svUI.queue.style.display = 'none';
    svUI.err = h('div', { class: 'note dlerr', role: 'alert' });
    svUI.err.style.display = 'none';
    const needOne = () => { if (!savedSel.size) { setStatus('stSvNone', null, true); return null; } return undefined; };
    svUI.btnDl = confirmButton(() => t('dlDownload', { n: savedSel.size }), () => (needOne() === null ? null : false), () => downloadRecs(savedSelRecs()), 'p');
    svUI.btnCopy = confirmButton(() => t('dlCopy', { n: savedSel.size }), () => (needOne() === null ? null : false), () => copyRecs(savedSelRecs()));
    svUI.btnRemove = confirmButton(() => t('svRemove', { n: savedSel.size }), () => (needOne() === null ? null : t('svRemoveSure', { n: savedSel.size })), removeSavedSelected);
    svUI.btnRetry = h('button', { class: 'btn', type: 'button', text: t('dlRetry', { n: 0 }), onclick: retryFailed });
    svUI.btnRetry.style.display = 'none';

    f.append(h('div', { class: 'dlbar' },
      h('div', { class: 'svtop' }, h('button', { class: 'btn', type: 'button', text: '← ' + t('svBack'), onclick: closeSaved }), svUI.count),
      h('div', { class: 'dlbtns' },
        h('button', { class: 'btn', type: 'button', text: t('dlSelectAll'), onclick: () => setAllSavedSelected(true) }),
        h('button', { class: 'btn', type: 'button', text: t('dlDeselectAll'), onclick: () => setAllSavedSelected(false) }),
        svUI.btnDl, svUI.btnCopy, svUI.btnRemove),
      svUI.queue, svUI.btnRetry, svUI.err));
    f.append(h('div', { class: 'note', text: t('svNote') }));

    svUI.box = h('div', { class: 'dlbox' });
    svUI.empty = h('div', { class: 'note', text: t('svEmpty') });
    svUI.box.append(svUI.empty);
    let n = 0;
    for (const item of savedList()) {
      const ref = savedRow(item, ++n);
      svUI.rows.set(item.k, ref);
      svUI.box.append(ref.row);
    }
    f.append(svUI.box);
    window.setTimeout(() => { refreshSavedUI(); savedWarm(); startSavedPoll(); }, 0);
    return f;
  }

  function showManualCopy(text) {
    const area = dlUI.area;
    if (area && area.isConnected) {
      area.value = text;
      area.removeAttribute('hidden');
      try { area.focus(); area.select(); } catch (_) {}
    }
    setStatus('stCopyManual', null, true);
  }

  /** One link per line (what external download managers expect). Only real links; nothing is opened. */
  function copyRecs(recs) {
    const links = [];
    let missing = 0;
    for (const rec of recs) {
      const info = linkInfo(rec.url);
      if (!info.ok) missing++;
      else if (!links.includes(info.url)) links.push(info.url);
    }
    if (!links.length) { setStatus('stCopyNone', { m: missing }, true); return; }
    const text = links.join('\n');
    copyText(text).then(() => {
      if (dlUI.area && dlUI.area.isConnected) dlUI.area.setAttribute('hidden', '');
      setStatus('stCopyDone', { n: links.length, m: missing }, true);
    }, () => showManualCopy(text));
  }

  /* ---- size & duration lookup for the Download rows (automatic, v3.6.2) ---- */

  /** Gives a live entry what the lookup learned, so its lock card shows the same numbers. */
  function giveEntryInfo(key, duration, size) {
    for (const entry of state.mediaEntries) {
      if (entry.kind !== 'video' || entry.audio || thumbKey(entry) !== key) continue;
      let changed = false;
      if (duration > 0 && !(entry.videoDuration > 0)) { entry.videoDuration = duration; changed = true; }
      if (size > 0 && !(entry.videoSize > 0)) { entry.videoSize = size; changed = true; }
      entry.probed = true;
      if (changed) updatePlaceholderInfo(entry);
    }
  }

  /**
   * Looks the videos up with the chain of probeVideo (HEAD -> tiny Range -> the browser's own demuxer): no body is
   * ever downloaded. At most INFO_CONCURRENCY at a time. A video that did not answer completely is tried again
   * (INFO_MAX_FAILS tries in total, INFO_RETRY_MS apart).
   * @returns {Promise<number>} how many videos got something new
   */
  function fetchRowInfo(recs) {
    const todo = [];
    for (const rec of recs) {
      if (!infoEligible(rec) || todo.some(item => item.key === rec.key)) continue;
      todo.push(rec);
    }
    if (!todo.length) return Promise.resolve(0);

    for (const rec of todo) {
      learnInfo(rec.key, 0, 0);
      dlInfo.get(rec.key).state = 'run';
    }
    queueRowUpdate();

    let got = 0;
    let i = 0;
    const worker = async () => {
      while (i < todo.length) {
        const rec = todo[i++];
        const info = dlInfo.get(rec.key);
        let result = null;
        try {
          const cached = probeSession.get(rec.key);
          if (cached) {
            result = cached;
          } else {
            state.probeCount++;
            result = await probeVideo(rec.url);
          }
        } catch (err) {
          if (err && err.name === 'AbortError') { info.state = ''; queueRowUpdate(); continue; }   // stopped (script Off): may be retried
          result = null;
        }
        if (result && (result.size > 0 || result.duration > 0)) {
          probeSession.set(rec.key, result);
          if (learnInfo(rec.key, result.duration, result.size)) got++;
          saveVideoCache({ videoSrc: rec.url, videoDuration: result.duration, videoSize: result.size, probed: true });
          giveEntryInfo(rec.key, result.duration, result.size);
        }
        // complete = both known; anything less is tried again later (a server that blocks HEAD may answer next time)
        if (info.duration > 0 && info.size > 0) {
          info.state = 'done';
        } else {
          info.state = 'fail';
          info.fails++;
          info.retryAt = Date.now() + INFO_RETRY_MS * info.fails;
        }
        queueRowUpdate();
      }
    };
    return Promise.all(Array.from({ length: Math.min(INFO_CONCURRENCY, todo.length) }, worker)).then(() => got);
  }

  /** Every poll tick of the open Download tab: videos with missing size / duration are looked up by themselves. */
  function autoRowInfo() {
    if (dlInfoBusy || document.hidden) return;
    const recs = missingInfoRecs();
    if (!recs.length) return;
    dlInfoBusy = true;
    fetchRowInfo(recs).catch(() => {}).then(() => { dlInfoBusy = false; });
  }

  /* ---- Unlock & Load All / locked list ---- */

  function lockedVideoEntries() {
    const list = [];
    for (const entry of state.mediaEntries) {
      if (entry.kind === 'video' && !entry.audio && !entry.loaded && entry.element && entry.element.isConnected) list.push(entry);
    }
    return list;
  }

  /**
   * Unlock one video WITHOUT starting it: the normal activation path with playNow = false, the source restored
   * with preload=auto (the browser buffers it), and playback held (see holdBlocksPlay) so nothing the site does
   * afterwards can start it either. The hold ends at the first tap on the page, or after LOAD_ALL_HOLD_MS.
   */
  function unlockEntry(entry) {
    if (!state.mediaEntries.has(entry) || entry.loaded || !entry.element || !entry.element.isConnected) return false;
    entry.fullLoad = true;
    try { activateVideo(entry, false, true); } finally { entry.fullLoad = false; }
    if (!entry.loaded) return false;
    const now = Date.now();
    entry.unlockedAt = now;
    entry.holdUntil = now + LOAD_ALL_HOLD_MS;
    safePause(entry.element);
    return true;
  }

  /**
   * "Unlock & Load All Videos": every locked video, one after the other. Safe to repeat and to mix with Release
   * (Release bumps loadAllRun, which stops a run that is still going).
   */
  function loadAllVideos() {
    if (state.emergency) { setStatus('stEmergencyBlocked', null, true); return; }
    if (!settings.enabled) return;
    if (loadAllBusy) { setStatus('stLoadAllBusy', null, true); return; }
    const list = lockedVideoEntries();
    if (!list.length) { setStatus('stNoLocked', null, true); return; }

    const run = ++loadAllRun;
    loadAllBusy = true;
    setStatus('stLoadAllStart', { n: list.length }, true);
    let index = 0;
    let done = 0;
    const finish = () => {
      if (run !== loadAllRun) return;     // Release took over
      loadAllBusy = false;
      setStatus('stLoadAllDone', { n: done }, true);
      scheduleUIUpdate();
    };
    const step = () => {
      if (run !== loadAllRun) return;
      if (index >= list.length || !settings.enabled || state.emergency) { finish(); return; }
      if (unlockEntry(list[index++])) done++;
      window.setTimeout(step, LOAD_ALL_GAP_MS);
    };
    step();
  }

  /* ---- rows ---- */

  function svgIcon(path) {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '18');
    svg.setAttribute('height', '18');
    svg.setAttribute('aria-hidden', 'true');
    const p = document.createElementNS(SVG_NS, 'path');
    p.setAttribute('d', path);
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke', 'currentColor');
    p.setAttribute('stroke-width', '2');
    p.setAttribute('stroke-linecap', 'round');
    p.setAttribute('stroke-linejoin', 'round');
    svg.append(p);
    return svg;
  }

  function thumbNode(cached) {
    if (cached.url) {
      const img = document.createElement('img');
      img.alt = '';
      img.decoding = 'async';
      img.draggable = false;
      img.src = cached.url;
      return img;
    }
    return cached.canvas;
  }

  /** Writes the current thumbnail / duration / size of a row into its elements (only what changed). */
  function paintRow(ref) {
    const rec = ref.rec;
    const cached = thumbCache.get(rec.key) || null;
    if (ref.thumbOf !== cached) {
      ref.thumbOf = cached;
      ref.thumb.textContent = '';
      const node = cached ? thumbNode(cached) : null;
      if (node) ref.thumb.append(node); else ref.thumb.textContent = '▶';
      ref.thumb.classList.toggle('has', !!node);    // a real thumbnail decides its own height (full picture, real ratio)
    }

    const known = dlInfo.get(rec.key);
    const running = !!(known && known.state === 'run');
    const setChip = (chip, text, empty) => {
      const value = text || (running ? '…' : empty);
      if (chip.textContent !== value) chip.textContent = value;
      chip.classList.toggle('unk', !text);
    };
    setChip(ref.dur, formatDuration(rec.duration), '--:--');
    setChip(ref.size, formatSize(rec.size), '-- MB');
  }

  function downloadRow(rec) {
    const info = linkInfo(rec.url);
    const canDownload = info.ok;
    const on = selection.has(rec.key);

    const cb = h('span', { class: 'cb', role: 'checkbox', tabindex: '0', 'aria-label': t('dlTipSelect'),
      'aria-checked': String(on), 'data-on': on ? '1' : '0', text: '✓' });

    const thumb = h('div', { class: 'dlth', 'aria-hidden': 'true' });
    // duration + size are ALWAYS part of the row: a dash placeholder until the real value is known
    const dur = h('span', { class: 'dlchip unk', title: t('dlChipDuration'), text: '--:--' });
    const size = h('span', { class: 'dlchip unk', title: t('dlChipSize'), text: '-- MB' });

    const notes = [];
    if (!rec.live) notes.push(t('dlOffPage'));
    if (!info.ok) notes.push(t(info.reason === 'stream' ? 'dlStream' : 'dlNoLink'));
    else if (info.mode === 'gm') notes.push(t('dlViaTm'));
    else if (info.mode === 'tab') notes.push(t('dlNoDirect'));
    const infoBox = h('div', { class: 'dlinfo' }, h('b', { text: '#' + (rec.index || '-') }),
      h('div', { class: 'dlmeta' }, dur, size), ...notes.map(text => h('small', { text })));

    const action = (path, tip, fn, disabled) => {
      const button = h('button', { class: 'ib', type: 'button', title: tip, 'aria-label': tip });
      button.append(svgIcon(path));
      if (disabled) button.setAttribute('disabled', '');
      button.addEventListener('click', event => { event.stopPropagation(); fn(); });
      return button;
    };
    const ref = { row: null, cb, thumb, dur, size, rec, thumbOf: undefined };
    const saveBtn = action(ICON_BOOKMARK, t('dlTipSave'), () => toggleSaved(ref.rec), !info.ok);
    ref.saveBtn = saveBtn;
    setSaveBtn(saveBtn, saved.has(rec.key));
    const actions = h('div', { class: 'dlact' },
      action(ICON_DOWNLOAD, t('dlTipDownload'), () => downloadRecs([ref.rec]), !canDownload),
      action(ICON_COPY, t('dlTipCopy'), () => copyRecs([ref.rec]), !info.ok),
      saveBtn);

    ref.row = h('div', { class: 'dlrow' + (rec.live ? '' : ' off') }, cb, thumb, infoBox, actions);
    activate(cb, () => toggleRow(ref.rec));
    infoBox.addEventListener('click', () => toggleRow(ref.rec));
    thumb.addEventListener('click', () => toggleRow(ref.rec));
    paintRow(ref);
    return ref;
  }

  const rowOrder = rec => (rec.live ? 0 : 100000) + (rec.index || 0);

  function insertRow(rec) {
    const ref = downloadRow(rec);
    let before = null;
    for (const other of dlUI.rows.values()) {
      if (rowOrder(other.rec) > rowOrder(rec) && (!before || rowOrder(other.rec) < rowOrder(before.rec))) before = other;
    }
    if (before && before.row.parentNode === dlUI.box) dlUI.box.insertBefore(ref.row, before.row); else dlUI.box.append(ref.row);
    dlUI.rows.set(rec.key, ref);
    return ref;
  }

  /** Repaints the open list in place: new thumbnails / durations / sizes, videos that appeared or left. */
  function refreshRows() {
    if (!dlActive()) return;
    pruneSelection();
    const rows = downloadRows();
    hydrateRows(rows);
    const seen = new Set();
    for (const rec of rows) {
      seen.add(rec.key);
      // v3.6.3: a row without a thumbnail whose video has a poster gets it (small picture, cached) - no need to open the video
      if (dlHydrateDone.has(rec.key) && !thumbCache.has(rec.key)) {
        if (rec.poster) queueRescue(rec.key, 'poster', rec.poster, settings.autoThumbs ? rec.url : '');
        else if (settings.autoThumbs && linkInfo(rec.url).ok) queueRescue(rec.key, 'frame', rec.url, '');
      }
      const ref = dlUI.rows.get(rec.key);
      if (!ref) { insertRow(rec); continue; }
      if (ref.rec.live !== rec.live || ref.rec.url !== rec.url) {      // left the page / source changed: rebuild this row only
        ref.row.remove();
        dlUI.rows.delete(rec.key);
        insertRow(rec);
        continue;
      }
      ref.rec = rec;
      const snap = selection.get(rec.key);
      if (snap) { snap.d = rec.duration || snap.d; snap.s = rec.size || snap.s; }   // the saved selection keeps the newest numbers
      paintRow(ref);
    }
    for (const [key, ref] of Array.from(dlUI.rows)) {
      if (!seen.has(key)) { ref.row.remove(); dlUI.rows.delete(key); }
    }
    if (dlUI.empty) dlUI.empty.style.display = dlUI.rows.size > 0 ? 'none' : '';
    refreshDownloadUI();
  }

  function queueRowUpdate() {
    if (dlRowTimer || !dlActive()) return;
    dlRowTimer = window.setTimeout(() => { dlRowTimer = 0; refreshRows(); }, ROW_FLUSH_MS);
  }

  /** While the tab is open: catches videos the page adds / decodes without any event of ours (also when the script is Off). */
  function startRowPoll() {
    if (dlPollTimer) return;
    dlPollTimer = window.setInterval(() => {
      if (!dlActive() || document.hidden) { if (!dlActive()) { window.clearInterval(dlPollTimer); dlPollTimer = 0; } return; }
      sweepVideos();
      refreshRows();
      autoRowInfo();
    }, ROW_POLL_MS);
  }

  /** Download tab: independent of the script's On/Off state (no dim(), no entries needed). */
  function buildDownload() {
    if (state.savedView) return buildSaved();
    const f = document.createDocumentFragment();
    sweepVideos();
    pruneSelection();
    const rows = downloadRows();
    dlUI.rows = new Map();
    for (const rec of rows) if (selection.has(rec.key)) selectRec(rec, true, true);   // refresh snapshots (duration / size)

    dlUI.count = h('b', { class: 'dlcount', text: t('dlSelectedCount', { n: selection.size, m: rows.length }) });
    dlUI.total = h('div', { class: 'dlsum' });
    dlUI.queue = h('div', { class: 'dlsum dlq' });
    dlUI.queue.style.display = 'none';
    dlUI.err = h('div', { class: 'note dlerr', role: 'alert' });
    dlUI.err.style.display = 'none';
    dlUI.btnDl = confirmButton(() => t('dlDownload', { n: selection.size }), () => {
      if (!selection.size) { setStatus('stDlNone', null, true); return null; }
      return false;                                  // v3.6.3: no second tap - straight into the download queue
    }, () => downloadRecs(selectedRecs()), 'p');
    dlUI.btnCopy = confirmButton(() => t('dlCopy', { n: selection.size }), () => {
      if (!selection.size) { setStatus('stDlNone', null, true); return null; }
      return false;
    }, () => copyRecs(selectedRecs()));
    dlUI.btnRetry = h('button', { class: 'btn', type: 'button', text: t('dlRetry', { n: 0 }), onclick: retryFailed });
    dlUI.btnRetry.style.display = 'none';
    dlUI.btnSaved = h('button', { class: 'btn', type: 'button', text: t('svOpen', { n: saved.size }), onclick: openSaved });
    dlUI.area = h('textarea', { dir: 'ltr', spellcheck: 'false', readonly: '', hidden: '' });

    // v3.6.3: the controls stay at the top while the list scrolls (phones: no scrolling back up to reach Download)
    f.append(h('div', { class: 'dlbar' },
      h('div', { class: 'dlhead' }, dlUI.count, dlUI.total, dlUI.queue),
      h('div', { class: 'dlbtns' },
        h('button', { class: 'btn', type: 'button', text: t('dlSelectAll'), onclick: () => setAllSelected(true) }),
        h('button', { class: 'btn', type: 'button', text: t('dlDeselectAll'), onclick: () => setAllSelected(false) }),
        dlUI.btnDl, dlUI.btnCopy, dlUI.btnSaved),
      dlUI.btnRetry, dlUI.err, dlUI.area));
    f.append(h('details', { class: 'dlnote' }, h('summary', { text: t('dlNoteTitle') }), h('div', { class: 'note', text: t('dlNote') }),
      h('div', { class: 'pad' },
        segment(t('dlMethod'), settings.dlMethod, [['auto', t('dlMethodAuto')], ['link', t('dlMethodLink')], ['gm', t('dlMethodGm')]], v => setOpt('dlMethod', v)),
        checkRow('autoThumbs', t('autoThumbs'), t('autoThumbsD')))));

    dlUI.box = h('div', { class: 'dlbox' });
    dlUI.empty = h('div', { class: 'note', text: t('dlEmpty') });
    dlUI.empty.style.display = rows.length > 0 ? 'none' : '';
    dlUI.box.append(dlUI.empty);
    for (const rec of rows) {
      const ref = downloadRow(rec);
      dlUI.rows.set(rec.key, ref);
      dlUI.box.append(ref.row);
    }
    f.append(dlUI.box);

    // the box is not in the document yet: the first lookup / poll runs right after the panel attached it
    window.setTimeout(() => { hydrateRows(rows); refreshRows(); startRowPoll(); refreshDownloadUI(); }, 0);
    return f;
  }


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
      transition: opacity .2s, transform .2s; bottom: calc(16px + (1 - var(--fab-y, 1)) * (100% - 86px)); transform: translateY(0);
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

    /* v3.6.0: Download tab */
    .cb:focus-visible { outline: 2px solid var(--ac); outline-offset: 2px; }
    .dlcount { font-variant-numeric: tabular-nums; padding: 2px 4px; }
    .dlsum { font-size: .88em; color: var(--mut); font-variant-numeric: tabular-nums; padding: 0 4px 2px; }
    .dlerr { color: #f87171; word-break: break-word; }
    .dlbox { background: var(--card); border: 1px solid var(--bd); border-radius: 16px; padding: 4px 6px; }
    .dlrow { display: flex; align-items: center; gap: 10px; padding: 9px 4px; border-top: 1px solid var(--bd); }
    .dlrow:first-child { border-top: 0; }
    .dlrow.off { opacity: .75; }
    .dlrow .cb { cursor: pointer; }
    /* v3.6.1: fixed width, 16:9 until a thumbnail exists; a real thumbnail keeps ITS proportions (portrait / 4:3 / 16:9)
       and is always shown whole (object-fit: contain, never cropped). Works the same on Firefox Windows and Android. */
    .dlth { flex: none; align-self: flex-start; box-sizing: border-box; width: clamp(76px, 26vw, 112px); aspect-ratio: 16 / 9;
      border-radius: 8px; overflow: hidden; display: grid; place-items: center;
      background: var(--card); border: 1px solid var(--bd); color: var(--mut); font-size: 18px; cursor: pointer; }
    .dlth.has { aspect-ratio: auto; background: #000; }
    .dlth canvas, .dlth img { display: block; width: 100%; height: auto; max-height: 150px; object-fit: contain;
      pointer-events: none; user-select: none; -webkit-user-select: none; -webkit-touch-callout: none; -webkit-user-drag: none; }
    @media (max-width: 380px) { .dlact { flex-direction: column; } }
    /* v3.6.3: sticky control bar + bigger touch targets */
    .dlbar { position: sticky; top: -4px; z-index: 3; display: flex; flex-direction: column; gap: 8px; padding: 8px 8px 10px; margin: 0 -2px;
      background: var(--bg2); border: 1px solid var(--bd); border-radius: 16px; box-shadow: 0 6px 16px rgba(0,0,0,.25); }
    .dlhead { display: flex; flex-wrap: wrap; align-items: baseline; gap: 2px 10px; }
    .dlbtns { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .dlbtns .btn { padding: 11px 8px; font-size: .94em; }
    .dlbtns .btn.p { grid-column: 1 / -1; padding: 14px 8px; font-size: 1.02em; }
    .dlq { color: var(--ac); }
    details.dlnote { background: var(--card); border: 1px solid var(--bd); border-radius: 14px; padding: 4px 10px; }
    details.dlnote > summary { cursor: pointer; font-weight: 700; font-size: .84em; color: var(--mut); padding: 8px 2px; }
    .dlrow { padding: 11px 4px; }
    @media (pointer: coarse) { .ib { width: 44px; height: 44px; } .dlrow .cb { width: 30px; height: 30px; } .dlrow { gap: 12px; } }
    .svtop { display: flex; align-items: center; gap: 10px; }
    .svtop .btn { flex: none; padding: 9px 14px; }
    .svtitle { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%; }
    .dlinfo { min-width: 0; }
    .ib.on { color: var(--ac); }
    .ib.on svg path { fill: currentColor; }
    .ib[disabled] { opacity: .35; }
    .kbrow { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 7px 8px; border-top: 1px solid var(--bd); }
    .kbrow:first-child { border-top: 0; }
    .kbrow kbd { font: 700 .86em ui-monospace, Menlo, monospace; padding: 3px 8px; border-radius: 8px; background: var(--card); border: 1px solid var(--bd); white-space: nowrap; direction: ltr; }
    .dlmeta { display: flex; gap: 6px; flex-wrap: wrap; margin: 2px 0; }
    .dlchip { font-size: .82em; font-variant-numeric: tabular-nums; padding: 1px 8px; border-radius: 999px;
      background: var(--card); border: 1px solid var(--bd); }
    .dlchip.unk { color: var(--mut); opacity: .7; }
    .dlinfo { flex: 1; min-width: 0; cursor: pointer; }
    .dlinfo b { display: block; font-weight: 650; }
    .dlinfo small { display: block; color: var(--mut); font-size: .82em; line-height: 1.35; }
    .dlact { flex: none; display: flex; gap: 6px; }
    .ib { all: unset; width: 38px; height: 38px; border-radius: 10px; display: grid; place-items: center; cursor: pointer;
      background: var(--card); border: 1px solid var(--bd); color: var(--fg); }
    .ib svg { display: block; }
    .ib[disabled] { opacity: .35; cursor: default; }
    .ib:focus-visible { outline: 2px solid var(--ac); outline-offset: 2px; }

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

  /** v3.6.0: the accent of the chosen Theme Color (single source for every UI color). */
  function effectiveAccent() {
    return (THEME_COLORS[settings.themeColor] || THEME_COLORS.default).accent;
  }

  function applyPageTheme() {
    const root = document.documentElement;
    if (!root) return;
    const theme = resolvedTheme();
    const isLight = theme === 'light';
    const accent = effectiveAccent();

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
    // v3.6.0: a Theme Color with a tint also tints the placeholder surface (the default one keeps the stock colors)
    const tint = THEME_COLORS[settings.themeColor];
    const presetBg = tint ? (isLight ? tint.lightBg : tint.darkBg) : null;
    if (presetBg) {
      const mix = (pct, other) => 'color-mix(in srgb, ' + presetBg + ' ' + pct + '%, ' + other + ')';
      root.style.setProperty('--shv-bg', presetBg);
      root.style.setProperty('--shv-surface', mix(isLight ? 65 : 88, '#fff'));
      root.style.setProperty('--shv-border', mix(isLight ? 80 : 72, isLight ? '#000' : '#fff'));
      root.style.setProperty('--shv-shadow-dark', mix(isLight ? 78 : 55, '#000'));
      root.style.setProperty('--shv-shadow-light', mix(isLight ? 50 : 82, '#fff'));
    }
    root.style.setProperty('--shv-accent', accent);
  }

  function applyUITheme() {
    const ui = state.ui;
    if (!ui) return;
    ui.root.setAttribute('data-theme', resolvedTheme());
    ui.root.setAttribute('data-s', settings.scale);
    ui.root.style.setProperty('--ac', effectiveAccent());
    ui.root.style.setProperty('--on', accentText(effectiveAccent()));
    ui.root.style.setProperty('--idle', String(settings.idle));
    ui.root.classList.toggle('compact', settings.compact);
    ui.root.classList.toggle('calm', settings.calmMenu);
    applyFabPosition();
    const dir = settings.lang === 'fa' ? 'rtl' : 'ltr';
    ui.sheet.setAttribute('dir', dir);
    ui.toast.setAttribute('dir', dir);
    ui.fab.setAttribute('aria-label', t('open'));
    ui.close.setAttribute('aria-label', t('close'));
    applyPageTheme();
  }

  /**
   * v3.5.5: side + vertical position of the floating button. fabY 1 = bottom corner (16px from the edge),
   * 0 = top corner (16px from the top). Light enough to run on every pointermove while dragging.
   */
  function applyFabPosition() {
    const ui = state.ui;
    if (!ui) return;
    ui.root.style.setProperty('--fab-y', String(settings.fabY));
    ui.fab.className = 'fab ' + (settings.side === 'left' ? 'l' : 'r') + (state.open ? ' open' : '') + (settings.enabled ? '' : ' off');
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

  /**
   * Two-tap button. `label` may be a function (re-read by button.refresh()). `armedLabelFn()` returns the
   * "tap again" text, null to do nothing, or (v3.6.0) false to run the action at once.
   */
  function confirmButton(label, armedLabelFn, action, cls) {
    const getLabel = typeof label === 'function' ? label : () => label;
    let armed = false;
    let timer = 0;
    const button = h('button', { class: 'btn ' + (cls || ''), type: 'button', text: getLabel() });
    const disarm = () => { armed = false; button.textContent = getLabel(); button.classList.remove('arm'); };
    button.refresh = () => { if (!armed) button.textContent = getLabel(); };

    button.addEventListener('click', () => {
      if (!armed) {
        const armedLabel = armedLabelFn();
        if (armedLabel === null) return;
        if (armedLabel === false) { action(); return; }
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
      ['popups', 'popupsBlocked'], ['resources', 'resources'], ['cleanedEntries', 'cleaned'], ['detachedEntries', 'detached'], ['probeStat', 'probeTraffic']]) {
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
        confirmButton(t('loadAllBtn'), () => {
          if (state.emergency) { setStatus('stEmergencyBlocked', null, true); return null; }
          const n = lockedVideoEntries().length;
          if (!n) { setStatus('stNoLocked', null, true); return null; }
          return t(n > LOAD_ALL_WARN_OVER ? 'loadAllConfirmMany' : 'loadAllConfirm', { n });
        }, loadAllVideos),
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

    const swatches = h('div', { class: 'dots' });
    for (const [key, color] of Object.entries(THEME_COLORS)) {
      const name = color.name[settings.lang] || color.name.en;
      const dot = h('button', { class: 'dot', type: 'button', 'aria-pressed': String(settings.themeColor === key), 'aria-label': name,
        title: name, onclick: () => setOpt('themeColor', key) });
      dot.style.background = color.accent;
      swatches.append(dot);
    }
    const range = h('input', { type: 'range', min: '0.3', max: '1', step: '0.05', value: String(settings.idle),
      oninput: event => { settings.idle = Number(event.target.value); applyUITheme(); },
      onchange: () => saveSettings() });

    f.append(section(t('secLook'), h('div', { class: 'pad' },
      segment(t('theme'), settings.theme, [['system', t('tSys')], ['dark', t('tDark')], ['light', t('tLight')]], v => setOpt('theme', v)),
      segment(t('scale'), settings.scale, [['s', t('sS')], ['m', t('sM')], ['l', t('sL')]], v => setOpt('scale', v)),
      segment(t('side'), settings.side, [['left', t('left')], ['right', t('right')]], v => setOpt('side', v)),
      h('div', { class: 'col' }, h('div', { class: 'lbl', text: t('idle') }), range))));

    // v3.6.0: Theme Color (replaces the old Accent Color + Preset controls)
    f.append(section(t('secThemeColor'), h('div', { class: 'pad' }, swatches)));

    // v3.4.0: Video Metadata & Inverted Neumorphic
    f.append(section(t('secVideoMeta'), h('div', { class: 'pad' },
      checkRow('showVideoIndex', t('showVideoIndex'), t('showVideoIndexD'), dim()),
      checkRow('showVideoInfo', t('showVideoInfo'), t('showVideoInfoD'), dim()),
      segment(t('probeMode'), settings.videoProbe, [['off', t('probeOff')], ['cache', t('probeCache')], ['auto', t('probeAuto')]], v => setOpt('videoProbe', v)),
      h('div', { class: 'note', text: t('probeModeD') }),
      checkRow('invertedNeumorphic', t('invertedNeumorphic'), t('invertedNeumorphicD'), dim()))));

    f.append(section(t('secLayout'),
      checkRow('compact', t('compact'), ''),
      checkRow('calmMenu', t('calmMenu'), '')));
    return f;
  }

  /** v3.6.0: Clipboard API first, then the old execCommand route; rejects only when both fail. */
  function copyText(text) {
    const legacy = () => new Promise((resolve, reject) => {
      let ok = false;
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none';
        (document.body || document.documentElement).appendChild(ta);
        ta.select();
        ta.setSelectionRange(0, text.length);
        ok = document.execCommand('copy');
        ta.remove();
      } catch (_) {}
      if (ok) resolve(); else reject(new Error('copy failed'));
    });
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text).catch(legacy);
    } catch (_) {}
    return legacy();
  }

  function buildData() {
    const f = document.createDocumentFragment();
    const area = h('textarea', { dir: 'ltr', spellcheck: 'false', placeholder: t('jsonHint') });

    f.append(buildShortcuts());
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
    ['home', 'tabHome', buildHome], ['download', 'tabDownload', buildDownload], ['video', 'tabVideo', buildVideo], ['frames', 'tabFrames', buildFrames], ['ads', 'tabAds', buildAds],
    ['page', 'tabPage', buildPage], ['look', 'tabLook', buildLook], ['data', 'tabData', buildData]
  ];

  function renderAll() {
    const ui = state.ui;
    if (!ui) return;

    ui.tabs.textContent = '';
    for (const [id, key] of TABS) {
      ui.tabs.append(h('button', { class: 'tab', type: 'button', role: 'tab', 'aria-selected': String(state.activeTab === id), text: tabLabel(id, key), 'data-tab': id,
        onclick: () => { state.activeTab = id; state.savedView = false; renderAll(); ui.body.scrollTop = 0; } }));
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
      cleanedEntries: stats.cleanedEntries, detachedEntries: stats.detachedEntries,
      probeStat: state.probeCount ? `${state.probeCount} · ${formatSize(state.probeBytes) || '0 KB'}` : '0'
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
      queueRowUpdate();   // v3.6.1: the open Download list follows entries that appeared / changed
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
        // pointer = centre of the button: 43px = 16px margin + half of the 54px button + ... mapped onto fabY 0..1
        settings.fabY = Math.min(1, Math.max(0, (event.clientY - 43) / Math.max(1, window.innerHeight - 86)));
        settings.side = event.clientX < window.innerWidth / 2 ? 'left' : 'right';
        applyFabPosition();
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
  }

  /* ======================================================================
   * 16b. Keyboard shortcuts (v3.6.3) - Alt+Shift+<key>. They work whether or not the menu is open
   *      and use the physical key (event.code), so they work with the Persian layout too.
   * ==================================================================== */

  function openTab(id) {
    if (!state.ui) return;
    if (state.open && state.activeTab === id && !state.savedView) { toggleSheet(false); return; }
    state.activeTab = id;
    state.savedView = false;
    if (state.open) { renderAll(); state.ui.body.scrollTop = 0; } else toggleSheet(true);
  }

  function toggleScript() {
    setOpt('enabled', !settings.enabled);
    toast(t(settings.enabled ? 'scNowOn' : 'scNowOff'));
    if (state.open) renderAll(); else scheduleUIUpdate();
  }

  function shortcutSelect(on) {
    pruneSelection();
    if (!downloadRows().length) { setStatus('dlEmpty', null, true); return; }
    setAllSelected(on);
    setStatus(on ? 'scSelected' : 'scDeselected', { n: selection.size }, true);
  }

  function shortcutDownload() {
    const recs = selectedRecs();
    if (!recs.length) { setStatus('stDlNone', null, true); return; }
    downloadRecs(recs);
  }

  function shortcutCopy() {
    const recs = selectedRecs();
    if (!recs.length) { setStatus('stDlNone', null, true); return; }
    copyRecs(recs);
  }

  function shortcutSave() {
    const recs = selectedRecs();
    if (!recs.length) { setStatus('stDlNone', null, true); return; }
    let n = 0;
    for (const rec of recs) if (saveRec(rec)) n++;
    syncSavedUI();
    setStatus('stSaved', { n }, true);
  }

  function shortcutSaved() {
    if (state.open && state.activeTab === 'download' && state.savedView) { toggleSheet(false); return; }
    openSaved();
  }

  function shortcutEmergency() {
    setEmergency(!state.emergency);
    if (state.open) renderAll();
  }

  // [physical key, letter shown, label key, action, always works (even when shortcuts are switched off)]
  const SHORTCUTS = [
    ['KeyL', 'L', 'scMenu', () => toggleSheet(), true],
    ['KeyD', 'D', 'scDownloadTab', () => openTab('download')],
    ['KeyE', 'E', 'scToggleScript', toggleScript],
    ['KeyR', 'R', 'scRelease', () => releaseInactiveNow(true)],
    ['KeyU', 'U', 'scLoadAll', loadAllVideos],
    ['KeyP', 'P', 'scPause', pauseAllMedia],
    ['KeyA', 'A', 'scSelectAll', () => shortcutSelect(true)],
    ['KeyN', 'N', 'scDeselectAll', () => shortcutSelect(false)],
    ['KeyG', 'G', 'scDownload', shortcutDownload],
    ['KeyS', 'S', 'scSave', shortcutSave],
    ['KeyB', 'B', 'scSaved', shortcutSaved],
    ['KeyC', 'C', 'scCopy', shortcutCopy],
    ['KeyX', 'X', 'scEmergency', shortcutEmergency]
  ];

  function installShortcuts() {
    if (!IS_TOP) return;
    window.addEventListener('keydown', event => {
      if (event.key === 'Escape' && state.open) { toggleSheet(false); return; }
      if (!event.altKey || !event.shiftKey || event.ctrlKey || event.metaKey || event.repeat) return;
      const code = event.code || (/^[a-z]$/i.test(event.key || '') ? 'Key' + event.key.toUpperCase() : '');
      const item = SHORTCUTS.find(entry => entry[0] === code);
      if (!item || (!settings.shortcuts && !item[4])) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      try { item[3](); } catch (err) { diagNote('shortcut', '', err); }
    }, true);
  }

  function buildShortcuts() {
    const rows = SHORTCUTS.map(item => h('div', { class: 'kbrow' }, h('span', { text: t(item[2]) }), h('kbd', { text: 'Alt+Shift+' + item[1] })));
    return section(t('secShortcuts'),
      checkRow('shortcuts', t('scEnable'), t('scEnableD')),
      ...rows,
      h('div', { class: 'note', text: t('scNote') }));
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
    window.setTimeout(idbPruneThumbs, 6000);   // v3.6.1

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
    installShortcuts();

    window.setInterval(autoReleaseTick, AUTO_RELEASE_INTERVAL_MS);

    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
      const onThemeChange = () => { if (settings.theme === 'system') applyUITheme(); };
      if (mediaQuery.addEventListener) mediaQuery.addEventListener('change', onThemeChange);
      else if (mediaQuery.addListener) mediaQuery.addListener(onThemeChange);
    } catch (_) {}

  }

  if (window.__SHV_TEST__) {
    Object.assign(window.__SHV_TEST__, {
      state, settings, T, DEFAULTS, KNOWN_AD_HOSTS, applyAll, setOpt, getUI: () => state.ui, diagnosticsText,
      videoStates, activateVideo, releaseInactiveNow, hashKey, videoKeyUrl, isLockedMedia,
      selection, downloadRows, linkInfo, copyRecs, downloadRecs, loadAllVideos, THEME_COLORS,
      thumbCache, dlInfo, fetchRowInfo, holdBlocksPlay, releaseVideoEntry, lockedVideoEntries, idbGetThumbs, idbGetVideoMetaMany, updatePlaceholderInfo, probeSession, missingInfoRecs, refreshRows, saveVideoCache, GM_FN, fileNameOf, elementDuration, storeThumb, probeVideo, headInfo, runDownloadJob, dlQ, retryFailed, pruneSelection, canvasState, queueRescue, hydrateRows, saved, savedSel, savedThumbs, saveRec, toggleSaved, unsaveKey, savedList, idbSaveThumb, lsThumbs, lsSavedThumbs, gmDlHealth, dlLog, thumbStats, openSaved, buildSaved, buildDownload, renderAll, selectionTotals, infoEligible, autoRowInfo, diagLog,
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