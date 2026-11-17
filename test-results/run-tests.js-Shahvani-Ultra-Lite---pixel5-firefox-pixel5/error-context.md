# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: run-tests.js >> Shahvani Ultra Lite - pixel5
- Location: tests\run-tests.js:20:7

# Error details

```
Error: page.setViewportSize: Target page, context or browser has been closed
Browser logs:

<launching> C:\Users\parha\AppData\Local\ms-playwright\firefox-1555\firefox\firefox.exe -no-remote -headless -profile C:\Users\parha\AppData\Local\Temp\playwright_firefoxdev_profile-50yU0f -juggler-pipe -silent
<launched> pid=284
[pid=284][err] *** You are running in headless mode.
[pid=284][err] JavaScript warning: resource://services-settings/Utils.sys.mjs, line 125: unreachable code after return statement
[pid=284][out] 
[pid=284][out] Juggler listening to the pipe
[pid=284][out] Crash Annotation GraphicsCriticalError: |[0][GFX1-]: RenderCompositorSWGL failed mapping default framebuffer, no dt (t=2.99402) [GFX1-]: RenderCompositorSWGL failed mapping default framebuffer, no dt
[pid=284][err] JavaScript error: chrome://juggler/content/Helper.js, line 82: NS_ERROR_FAILURE: Component returned failure code: 0x80004005 (NS_ERROR_FAILURE) [nsIWebProgress.removeProgressListener]
[pid=284][err] [ERROR shell_windows::limited_access_features] Error generating feature token: NS_ERROR_FAILURE
[pid=284][err] [ERROR shell_windows::taskbar::shortcut] Error matching shortcut: Error { code: HRESULT(0x80004005), message: "Unspecified error" }
[pid=284][out] console.error: "Error fetching the wallpaper attachments URL" (new SyntaxError("JSON.parse: unexpected end of data at line 1 column 1 of the JSON data", ""))
[pid=284][out] console.error: services.settings: 
[pid=284][out]   Message: EmptyDatabaseError: "main/nimbus-desktop-experiments" has not been synced yet
[pid=284][out]   Stack:
[pid=284][out]     EmptyDatabaseError@resource://services-settings/Database.sys.mjs:19:5
[pid=284][out] list@resource://services-settings/Database.sys.mjs:96:13
[pid=284][out] 
[pid=284][err] [ERROR shell_windows::taskbar::shortcut] Error matching shortcut: Error { code: HRESULT(0x80004005), message: "Unspecified error" }
[pid=284][err] [ERROR shell_windows::taskbar::shortcut] Error matching shortcut: Error { code: HRESULT(0x80004005), message: "Unspecified error" }
[pid=284][out] console.error: [Exception... "Component returned failure code: 0x80070057 (NS_ERROR_ILLEGAL_VALUE) [nsIWinTaskbar.getTaskbarProgress]"  nsresult: "0x80070057 (NS_ERROR_ILLEGAL_VALUE)"  location: "JS frame :: moz-src:///browser/components/downloads/DownloadsTaskbar.sys.mjs :: #windowsAttachIndicator :: line 181"  data: no]
[pid=284][out] console.error: services.settings: 
[pid=284][out]   Message: EmptyDatabaseError: "main/nimbus-desktop-experiments" has not been synced yet
[pid=284][out]   Stack:
[pid=284][out]     EmptyDatabaseError@resource://services-settings/Database.sys.mjs:19:5
[pid=284][out] list@resource://services-settings/Database.sys.mjs:96:13
[pid=284][out] 
```