# Vrihad Health: installable shell

A tiny page that lets the private Vrihad Health portal install as an app on Android, iPhone and desktop.
**It holds no health data.** The portal itself is a Google Apps Script web app that always loads live from Google,
behind Google sign-in and the family allowlist.

- **Android and desktop Chrome:** the portal opens inside this app. The first time on each device, the set-up screen
  asks you to open the portal once in a normal tab to sign in and allow access.
- **iPhone and iPad:** Safari blocks Google sign-in inside embedded pages, so the icon opens the portal full screen.
- Separate from the Saiyan Health shell on the same site: its own folder (`/vrihad-health/`), app id, service-worker
  cache prefix (`vrihad-shell-`) and storage key (`vrihad-shell:ready`).

## Install

- Android: open https://therealgokush.github.io/vrihad-health/ in Chrome → ⋮ → Install app.
- iPhone: open it in Safari → Share → Add to Home Screen.

## Change the portal address

Edit `APP_URL` in `index.html` (it must end in `/exec`), commit and push. Bump the cache name in `sw.js` when the
shell files change.
