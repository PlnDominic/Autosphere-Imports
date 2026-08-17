# Autosphere Imports - Admin panel guide

The homepage inventory ("Cars ready to import") is rendered from
`data/cars.json` by the Next.js homepage (`app/page.tsx`). The `/admin`
route (`app/admin/page.tsx`, linked as "Admin" in the site footer) is a
local draft workspace for editing that lineup before someone applies the
change to the repository.

## Current status: local draft only, no login, no auto-publish

There is **no sign-in** on this page yet, and it does **not** write to
GitHub or the live site automatically. The lineup itself (order, names,
prices, which cars exist) is saved to that browser's local storage only,
so it survives page reloads but stays on that one device/browser. The
initial "live" lineup is loaded from the `/api/cars` route (a small
Next.js API route that reads `data/cars.json` from disk).

**Photos are the exception** — they upload straight to cloud storage (see
below), not localStorage, so they're already live and shareable even
before the rest of the draft is published.

## Photo uploads (Vercel Blob)

Uploading a photo in the car editor resizes it in the browser (max 1600px
on the long edge, ~82% quality) and uploads it to [Vercel
Blob](https://vercel.com/docs/storage/vercel-blob) via `POST
/api/upload`. The car's `image` field is then just the resulting
`https://*.public.blob.vercel-storage.com/...` URL — the same shape as
today's `/images/*.jpg` paths in `data/cars.json`, so publishing a draft
still just means writing plain JSON.

**Setup required:** create a Blob store for this project in the Vercel
dashboard (Storage → Create Database → Blob) and set the
`BLOB_READ_WRITE_TOKEN` environment variable it gives you (locally in
`.env.local`, and in the Vercel project's environment variables for
deploys). Without that token, `/api/upload` returns a clear "not
configured" error instead of failing silently, and the editor will show
that message if you try to upload a photo.

Replacing a car's photo, or removing a car entirely, deletes its old blob
in the background — best-effort, so an occasional orphaned file in
storage is expected and harmless.

**Reset to live version** discards your local draft and reloads whatever
`data/cars.json` currently serves on the site.

## Posting a car (today's workflow)

1. Open `/admin` on the site.
2. Click **+ Add a car**, fill in model name, year, body type, and the
   price/note line (e.g. `from GHC 84,000` or `Request a quote`).
3. Optionally upload a photo (JPG/PNG/WebP, up to 10 MB — it's resized
   automatically) and tick **Promo** to show the yellow badge.
4. **Save to lineup**, repeat for any other changes.
5. Since there's no publish button yet, ask for the draft to be applied to
   `data/cars.json` in the repository so it goes live.

## What's coming later

A real publish-from-the-browser flow needs an authentication decision
first: a GitHub token, a simple password, or a proper account system. That
hasn't been built yet by design; this version intentionally stops at the
local draft step until that decision is made.
