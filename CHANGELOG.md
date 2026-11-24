# Changelog

## [3.6.3]

### رفع اشکال: دامنه‌ی up.shahvani.com
- **نبودن مدت‌زمان قبل از باز کردن ویدیو:** المنت موقتی که برای خواندن مدت‌زمان ساخته می‌شد توسط قفل خودِ اسکریپت با `preload='none'` قفل می‌شد و هیچ‌وقت متادیتا نمی‌گرفت. این المنت حالا از قفل مستثنا شده است.
- **نبودن سایز فایل:**
  - زمان کل زنجیره‌ی probe (HEAD ← Range ← المنت) از ۸ به ۲۴ ثانیه رسید. قبلاً یک تایمر ۸ ثانیه‌ای کل زنجیره را قطع می‌کرد (در diagnostics به شکل `Aborted`).
  - درخواست Range حالا حتی وقتی HEAD بی‌پاسخ یا مسدود است امتحان می‌شود.
  - اگر Tampermonkey برای یک دامنه دو بار پشت‌سرهم جواب نداد، آن دامنه ۵ دقیقه از مسیر Tampermonkey کنار گذاشته می‌شود تا هر ویدیو ۸ ثانیه معطل نشود.
  - وضعیت HTTP پاسخ HEAD در diagnostics ثبت می‌شود.
- **دانلود:**
  - اضافه شدن `@connect *` (برای حالتی که up.shahvani.com به دامنه‌ی دیگری ریدایرکت می‌کند). بعد از نصب، اگر Tampermonkey پنجره‌ی اجازه نشان داد، «Always allow all domains» را تأیید کنید.
  - زنجیره‌ی جدید: دانلودر Tampermonkey (با Referer) ← دوباره بدون هدر سفارشی ← blob از طریق Tampermonkey ← fetch خود صفحه.
  - اگر Tampermonkey ۲۵ ثانیه هیچ پاسخی ندهد، پیام «منتظر اجازه است؟» نشان داده می‌شود.
  - باز شدن تب خالی بعد از شکست حذف شد. به‌جای آن دلیل شکست با رنگ قرمز نمایش داده می‌شود و لینک‌ها کپی می‌شوند.

### تامبنیل‌ها
- **کش پایدار:** تامبنیل‌های cross-origin (canvas آلوده) فقط در حافظه می‌ماندند و بعد از رفرش از بین می‌رفتند. حالا از طریق Tampermonkey دوباره ساخته و در IndexedDB ذخیره می‌شوند.
  - poster: تصویر کوچک دریافت می‌شود.
  - فریم ویدیو: حدود ۳MB از ابتدای فایل گرفته می‌شود. فقط برای فایل‌هایی که اطلاعات شروعشان (moov) ابتدای فایل است کار می‌کند.
- ردیف‌های بدون تامبنیل که poster دارند، بدون نیاز به باز کردن ویدیو پر می‌شوند.
- **اندروید:** فریم سیاه یا شفاف (نقاشی‌نشده) دیگر ذخیره نمی‌شود. چند بار با تأخیر دوباره تلاش می‌شود و رویدادهای `playing` و `seeked` هم برای گرفتن فریم استفاده می‌شوند.

### انتخاب ویدیوها
- انتخاب‌ها مخصوص همان صفحه هستند (آدرس بدون hash).
- ردیف‌های «خارج از صفحه» حذف شد. انتخاب، دانلود و کپی لینک فقط برای ویدیوهای همین صفحه کار می‌کند.
- با عوض شدن صفحه (حتی بدون reload) یا حذف شدن ویدیو از صفحه، انتخاب‌های مربوطه پاک می‌شوند.

### دانلود
- **صف مستقیم، بدون تأیید:** تأیید دوباره‌ی بالای ۱۰ ویدیو برداشته شد. دانلود تکی و دسته‌ای مستقیم وارد صف می‌شود.
- چند دانلود Tampermonkey هم‌زمان اجرا می‌شود (اندروید ۲، دسکتاپ ۳). موارد اضافه‌شده در حین دانلود به همان صف می‌پیوندند.
- **اندروید:** برای همه‌ی فایل‌ها (حتی همان دامنه) از دانلودر Tampermonkey استفاده می‌شود تا فایرفاکس برای هر فایل تأیید نخواهد. لینک ساده فقط آخرین گزینه است و کلیک‌ها با فاصله ۱۲۰۰ms انجام می‌شوند.
- هر ویدیو یا «شروع‌شده» است یا «ناموفق». ناموفق‌ها با دلیل فهرست می‌شوند، لینکشان کپی می‌شود و دکمه‌ی **تلاش دوباره** دارند.
- نمایش وضعیت صف: `صف دانلود: i از n انجام شد، ناموفق: f`.

### رابط کاربری (بخش دانلود)
- نوار کنترل (انتخاب همه، لغو انتخاب، دانلود، کپی) بالای لیست ثابت می‌ماند (sticky).
- دکمه‌ها و چک‌باکس‌ها در صفحه‌ی لمسی بزرگ‌تر شدند.
- توضیح بخش دانلود در یک بخش جمع‌شونده قرار گرفت.

### میان‌برهای صفحه‌کلید (جدید)
همه Alt+Shift+کلید هستند و با `event.code` کار می‌کنند، پس با کیبورد فارسی هم جواب می‌دهند.

| کلید | عملکرد |
|---|---|
| `L` | باز و بسته کردن منو |
| `D` | باز کردن (و بستن) تب دانلود |
| `E` | روشن/خاموش کردن اسکریپت بدون باز کردن منو |
| `R` | Release |
| `U` | Unlock & Load All Videos |
| `P` | توقف همه‌ی رسانه‌ها |
| `A` | انتخاب همه‌ی ویدیوهای این صفحه |
| `N` | لغو انتخاب همه |
| `G` | دانلود انتخاب‌شده‌ها |
| `C` | کپی لینک انتخاب‌شده‌ها |
| `X` | توقف اضطراری روشن/خاموش |

- فهرست میان‌برها و سوئیچ فعال/غیرفعال کردن آن‌ها در تب **Data** است (تنظیم جدید `shortcuts`).
- `Alt+Shift+L` حتی وقتی میان‌برها خاموش باشند کار می‌کند.
- Release و Unlock & Load All با میان‌بر بدون تأیید دوم اجرا می‌شوند.
- بازنویسی مدیریت کیبورد: مستقل از ساخته شدن پنل کار می‌کند و `Escape` منو را می‌بندد.

### سایر
- `diagnostics`: ثبت مرحله‌های جدید (`gm-timeout`، `thumb`، `download`، `shortcut`).
- نسخه‌ی تنظیمات و فرمت ذخیره‌ی انتخاب (sessionStorage) تغییر کرد. فرمت قدیمی نادیده گرفته می‌شود.

### محدودیت‌های شناخته‌شده
- علت بی‌پاسخ ماندن Tampermonkey برای up.shahvani.com با اطمینان مشخص نشده است. احتمالاً پنجره‌ی اجازه یا ریدایرکت به دامنه‌ی دیگر است.
- رفتار دانلودر Tampermonkey روی فایرفاکس اندروید تست نشده است. اگر پشتیبانی نشود، به لینک ساده برمی‌گردد.
- بازسازی تامبنیل فریم فقط برای فایل‌هایی کار می‌کند که moov در ابتدای فایل دارند.

## [3.6.2]

### Added
- Selection totals (duration + size) in Download tab
- Download failure visible with error codes
- Diagnostics manager block
- Auto size/duration lookup for all rows (no button needed)
- Cache-first with retry logic (3 tries)
- up.shahvani.com downloads via GM_download/blob/fallback
- Range probe guarded by Accept-Ranges

## [3.6.1]

### Fixed
- Lock-card size fixed to 734×413 (16:9)
- Download tab live info (size/duration/thumbnail)
- Persistent cache 30 days
- Release stops all unlocked videos (playing or paused), cancels Unlock
- Unlock busy state fixed
- Cache key consistency fixed
- Update URLs point back to dist/

## [3.6.0]

### Added
- Download tab (select, copy links, native Firefox download)
- Unlock & Load All
- Theme Color (8 presets replaces Accent+Preset)
- sessionStorage selection persistence
- Migration from 3.5.x settings

## [3.5.5]

### Fixed (7 bug fixes)
- Aspect-ratio/min-height with !important
- FAB vertical drag (fabY)
- Theme preset persistence
- Inverted neumorphic option fixed
- Probe size for non-video files
- probeActive counter leak
- Resume race condition

### Minor fixes
- Resume cleanup on finish
- Resume setting respect
- Fetch URL object fix
- PiP exception
- Opacity slider debounce
- MAX_CUSTOM_AD_HOSTS constant
- Persian typo fix

## [3.5.4]

### Added
- Optional probe (off/cache/auto)
- IntersectionObserver for probe
- MP4/EBML parsing
- Stream cancellation

## [3.5.3]

### Added
- Zero-download guarantee
- Deterministic keys
- Browser guards
- IndexedDB v2 resume

## [3.5.2]

### Added
- preloadFirstNForDuration (removed in v3.5.3)

## [3.5.1]

### Added
- IndexedDB videoMetadata cache
- 4-layer detection
- hashKey
- Domain profiles removed

## [3.5.0]

### Added
- Author metadata
- Custom icon

## [3.4.6]

### Added
- Constants, JSDoc, test functions

## [3.4.5]

### Removed
- Keyboard shortcuts
- Fixed duplicate video

## [3.4.4]

### Removed
- video.load()
- Fixed numbering
- Lazy-load respect

## [3.4.3]

### Fixed
- Duration fix
- Range fallback
- data-src support

## [3.4.2]

### Fixed
- Duration immediate
- Metadata on release
- Dual badges

## [3.4.1]

### Added
- videoIndexMap
- Metadata display
- Persian translations

## [3.4.0]

### Added
- Video numbering
- Metadata badges
- Inverted neumorphic

## [3.3.0]

### Added
- IndexedDB
- Resume
- Profiles
- Shortcuts
- Themes

## [3.2.0]

### Added
- v6 engine + v3 UI merge

## [3.1.0]

### Added
- Neumorphic UI
- i18n
- FAB

## [3.0.0]

### Added
- Tabbed panel
- Themes
- Compact mode
- Emergency mode
- Diagnostics
- srcdoc support
- Detached cleanup

## [2.0.0]

### Added
- Profiles
- Manual release
- Batch load

## [1.0.0]

### Added
- Initial: tap-to-load video/iframe, ad filtering, FAB panel