# Shahvani Ultra Lite

Tampermonkey userscript for shahvani.com — performance-focused tap-to-load media, configurable UI, and resource management.

**Author:** parham  
**Homepage:** https://github.com/parhamghahremani  
**Version:** 3.5.0

## Features

| Feature | Description |
|---------|-------------|
| **Tap-to-load media** | Videos and iframes replaced with placeholders; load only on user tap |
| **Performance profiles** | Compatible / Balanced / Ultra — escalating optimizations |
| **Tabbed control panel** | Overview (profiles, diagnostics, emergency), Media (ad filter, batch load, resource release), Appearance (theme, compact mode) |
| **Theme system** | System / Dark / Light with CSS variables, instant switch |
| **Ad host filtering** | Known ad domains (doubleclick, googlesyndication, taboola, etc.) |
| **Manual resource release** | One-click release of paused videos + off-screen iframes |
| **Emergency mode** | Instantly pause all HTML videos, block deferred activation |
| **Diagnostics** | Long task monitoring, resource count, cleaned entries tracking |
| **Detached node cleanup** | Memory leak prevention for SPA/AJAX content |
| **Persian RTL UI** | Full RTL support, accessibility attributes |

## Installation

### Desktop Firefox
1. Install [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
2. Click [Install Script](src/shahvani-ultra-lite.user.js) (raw file URL)
3. Tampermonkey will prompt to install

### Android Firefox
1. Install Firefox + Tampermonkey
2. Open raw script URL → Tampermonkey opens → Tap "Install"

## Configuration

Settings persist in `localStorage` (`shvUltraLite.settings.v3`):

```javascript
{
  profile: 'balanced',        // 'compatible' | 'balanced' | 'ultra'
  hideKnownAds: true,         // filter known ad iframes
  theme: 'system',            // 'system' | 'dark' | 'light'
  compact: false              // compact panel mode
}
```

Access via panel (FAB button ⚡ bottom-right) or edit directly in DevTools console.

## Profiles

| Profile | Effects | Images | Cards |
|---------|---------|--------|-------|
| **Compatible** | None | Eager (default) | No optimization |
| **Balanced** | Animation/transition duration → 0.001ms | Lazy + fetchpriority=low (off-screen) | No |
| **Ultra** | Same as Balanced | Same | `content-visibility: auto` on repeated cards |

## Panel Controls

### Overview Tab
- **Profile buttons** — switch performance profile
- **Status grid** — pending/active videos & iframes
- **Detail stats** — network resources, long tasks, cleaned entries, filtered ads
- **Emergency mode** — red button, pauses all videos, blocks tap-to-load

### Media Tab
- **Ad filter toggle** — known ad host filtering
- **Load visible players** — activate placeholders currently on-screen
- **Load all pending** — activate all deferred media (with confirmation)
- **Pause all videos** — immediate pause of all HTML5 videos
- **Release inactive** — detach sources from paused videos + off-screen iframes

### Appearance Tab
- **Theme** — System / Dark / Light
- **Compact mode** — smaller panel, hides descriptions
- **Reset settings** — back to defaults

## How It Works

1. **`@run-at document-start`** — injects CSS immediately, adds `shv-ultralite` class to `<html>`
2. **Initial scan** — finds all `video`, `iframe`, `img` elements
3. **Video deferral** — captures geometry (aspectRatio, poster), replaces with placeholder button, removes `src`/`autoplay`, sets `preload=none`
4. **Iframe deferral** — captures src/srcdoc, replaces with placeholder, sets `loading=lazy`
5. **Image optimization** — off-screen images get `loading=lazy` + `fetchpriority=low`
6. **MutationObserver** — watches for new media (`childList`) and attribute changes (`src`, `srcdoc`, `autoplay`)
6. **Play interception** — blocks non-user-initiated playback via `play` event capture
7. **Panel UI** — FAB creates floating panel with stats and controls

## Version History

| Version | Date | Key Changes |
|---------|------|-------------|
| **3.0.0** | 2026-11-03 | Tabbed panel, themes, compact mode, emergency mode, diagnostics, srcdoc support, detached cleanup |
| **2.0.0** | 2026-11-03 | Profiles, manual release, batch load, repeated cards, settings persistence |
| **1.0.0** | 2026-11-03 | Initial: tap-to-load video/iframe, ad filtering, FAB panel |

See [CHANGELOG.md](CHANGELOG.md) for details.

## Development

### Workspace Structure
```
shahvani-ultra-lite/
├── src/
│   └── shahvani-ultra-lite.user.js   # Current production (v3.0.0)
├── versions/
│   ├── v1.0.0.user.js
│   ├── v2.0.0.user.js
│   └── v3.0.0.user.js
├── tests/
│   └── screenshots/
├── CHANGELOG.md
├── LEARNED.md
└── README.md
```

### Versioning Workflow
1. Edit `src/shahvani-ultra-lite.user.js`
2. Bump `@version` in metadata block
3. Copy to `versions/vX.Y.Z.user.js`
4. Update `CHANGELOG.md`
5. Update `LEARNED.md` with new findings

## Known Ad Hosts (Filtered)

```
doubleclick.net, googlesyndication.com, googleadservices.com,
adnxs.com, taboola.com, outbrain.com, popads.net,
propellerads.com, exoclick.com, juicyads.com, trafficjunky.net
```

Only these known hosts are filtered. Unknown iframes are never deleted.

## License

MIT — Educational/personal use. Respect site Terms of Service and local laws.