# Autosphere Imports - Admin panel guide

The homepage inventory ("Cars ready to import") is rendered from
`data/cars.json`. `admin.html` (linked as "Admin" in the site footer) is a
local draft workspace for editing that lineup before someone applies the
change to the repository.

## Current status: local draft only, no login, no auto-publish

There is **no sign-in** on this page yet, and it does **not** write to
GitHub or the live site automatically. Everything you do (add, edit,
remove, reorder, upload a photo) is saved to that browser's local storage
only, so it survives page reloads but stays on that one device/browser.

**Reset to live version** discards your local draft and reloads whatever
`data/cars.json` currently serves on the site.

## Posting a car (today's workflow)

1. Open `admin.html`.
2. Click **+ Add a car**, fill in model name, year, body type, and the
   price/note line (e.g. `from GHC 84,000` or `Request a quote`).
3. Optionally upload a photo (JPG/PNG/WebP, up to 1.5 MB) and tick
   **Promo** to show the yellow badge.
4. **Save to lineup**, repeat for any other changes.
5. Since there's no publish button yet, ask for the draft to be applied to
   `data/cars.json` in the repository so it goes live.

## What's coming later

A real publish-from-the-browser flow needs an authentication decision
first: a GitHub token, a simple password, or a proper account system. That
hasn't been built yet by design; this version intentionally stops at the
local draft step until that decision is made.
