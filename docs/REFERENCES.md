# References — Shahvani Ultra Lite

## External Resources

### Web Standards
- [HTML Living Standard — Media Elements](https://html.spec.whatwg.org/multipage/media.html)
- [HTML Living Standard — Video.play()](https://html.spec.whatwg.org/multipage/media.html#dom-media-play)
- [HTML Living Standard — preload attribute](https://html.spec.whatwg.org/multipage/media.html#attr-media-preload)
- [Fetch API — Range Requests](https://fetch.spec.whatwg.org/#range-requests)
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
- [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)
- [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)
- [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

### Video Container Formats
- [ISO/IEC 14496-12 — MP4 Box Structure](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Containers#mp4)
- [MP4 Registration Authority](https://www.mp4ra.org/)
- [EBML (WebM/MKV) Specification](https://www.matroska.org/technical/specs.html)
- [WebM Container Guidelines](https://www.webmproject.org/docs/container/)

### Tampermonkey / Userscripts
- [Tampermonkey Documentation](https://www.tampermonkey.net/documentation.php)
- [Userscript Metadata Block](https://www.tampermonkey.net/documentation.php#_metadata_block)
- [@run-at](https://www.tampermonkey.net/documentation.php#_run-at)
- [Violentmonkey API](https://violentmonkey.github.io/api/)

### Firefox Specific
- [beforescriptexecute](https://developer.mozilla.org/en-US/docs/Web/API/Document/beforescriptexecute_event)
- [Firefox Userscript Support](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

---

## Algorithms & Techniques

### FNV-1a Hash (Deterministic)
```javascript
// 64-bit FNV-1a, two passes for better distribution
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
```
- **Source**: Fowler–Noll–Vo hash function
- **Why two passes**: Better avalanche effect for short strings (URLs)
- **No crypto**: Synchronous, deterministic, fast

### MP4 Box Parsing
- **ftyp**: File type box (offset 4, 4 bytes = 'ftyp')
- **moov**: Movie box (contains mvhd — movie header)
- **mvhd**: Movie header (timescale + duration)
- **mdat**: Media data box (video payload)
- **Version 0**: 32-bit timescale/duration
- **Version 1**: 64-bit timescale/duration

### EBML (WebM/MKV) Parsing
- **Segment**: Root element (0x18538067)
- **Info**: Segment info (0x1549A966)
- **TimecodeScale**: 0x2AD7B1 (default 1,000,000 = 1ms)
- **Duration**: 0x4489 (float32/64, in TimecodeScale units)

---

## Inspiration & Prior Art

### v6.0.0 Media Engine (Merged into v3.2.0)
- Comprehensive settings system
- Performance profiles
- Memory management
- Frame handling

### v3.1.0 Neumorphic UI (Preserved)
- Soft UI with dual-layer shadows
- Bilingual i18n system
- FAB + slide-over drawer
- Animated placeholders

### Known Ad Host Lists
- [EasyList](https://easylist.to/)
- [EasyPrivacy](https://easylist.to/easylist/easyprivacy.txt)
- [Peter Lowe's List](https://pgl.yoyo.org/adservers/)

---

## Tools Used

| Tool | Purpose |
|------|---------|
| Node.js | Syntax checking, Playwright tests |
| Playwright | DOM inspection, network analysis (research only) |
| Firefox DevTools | Manual testing, IndexedDB inspection |
| Tampermonkey | Userscript manager |
| gh (GitHub CLI) | Repository operations |
| git bundle | Offline repo backup |

---

## License References

- **MIT License** — Project license
- **shahvani.com Terms of Service** — Respect site ToS
- **Local laws** — Comply with applicable regulations

---

## Version-Specific References

### v3.5.4 (Probe)
- [Range Requests RFC 7233](https://tools.ietf.org/html/rfc7233)
- [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)
- [ReadableStream.cancel()](https://streams.spec.whatwg.org/#rs-cancel)

### v3.5.3 (Zero Download)
- [HTMLMediaElement.load()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/load)
- [Autoplay Policy](https://developer.chrome.com/blog/autoplay/)

### v3.5.1 (IndexedDB Cache)
- [IndexedDB Best Practices](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Best_practices)
- [FNV Hash](https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function)

### v3.3.0 (IndexedDB + Resume)
- [Video Resume Position Pattern](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime)

---

## Internal Documentation

| File | Purpose |
|------|---------|
| [SPECIFICATION.md](SPECIFICATION.md) | Functional & non-functional requirements |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Module breakdown, data flow, design decisions |
| [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) | Workflow, versioning, testing, release process |
| [CONFIGURATION_AND_PERMISSIONS.md](CONFIGURATION_AND_PERMISSIONS.md) | Settings schema, storage, network requests, CSP |
| [COMPATIBILITY.md](COMPATIBILITY.md) | Browser support, API requirements, site specifics |
| [MANUAL_TEST_PLAN.md](MANUAL_TEST_PLAN.md) | Test cases for manual verification |
| [DEVELOPMENT_LOG.md](DEVELOPMENT_LOG.md) | Chronological change log |
| [DECISIONS.md](DECISIONS.md) | Architecture/feature decisions & trade-offs |
| [KNOWN_ISSUES.md](KNOWN_ISSUES.md) | Current & historical issues |
| [CHANGELOG.md](../CHANGELOG.md) | User-facing version history |