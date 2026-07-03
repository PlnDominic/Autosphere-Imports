# Autosphere Imports — Admin panel guide

The homepage inventory ("Cars ready to import") is no longer hardcoded. It is
rendered from `data/cars.json`, and that file is managed through the admin
panel at **`admin.html`** (linked discreetly as "Admin" in the site footer).

## How it works

- `index.html` fetches `data/cars.json` on load and builds the car grid from
  it. If the file can't be fetched (e.g. opening the page from disk), the
  static cards baked into the HTML are shown as a fallback.
- `admin.html` is a self-contained panel that talks directly to the GitHub
  API. Publishing a change commits `data/cars.json` (and any uploaded photos,
  stored under `project/uploads/cars/`) to the repository, so the live site
  updates on the next deploy — no server or database needed.

## One-time setup: create your access token

1. Go to <https://github.com/settings/personal-access-tokens/new> (fine-grained
   personal access tokens).
2. Under **Repository access**, choose *Only select repositories* and pick
   `PlnDominic/Autosphere-Imports`.
3. Under **Permissions → Repository permissions**, set **Contents** to
   **Read and write**. Nothing else is needed.
4. Generate the token and copy it — this token is your admin password.

Keep the token private. Anyone who has it can edit the repository. Only sign
in on devices you trust; "Remember me" stores the token in that browser's
local storage.

## Posting a car

1. Open `admin.html` on the live site and sign in with your token.
2. Click **＋ Add a car**, fill in the model name, year, body type and the
   price/note line (e.g. `from GHC 84,000` or `Request a quote`).
3. Optionally upload a photo (JPG/PNG/WebP, up to 3 MB) and tick the **Promo**
   box to show the yellow badge.
4. **Save to lineup**, then press **Publish to homepage**.

Edit, remove, and reorder (↑/↓) work the same way — nothing goes live until
you press Publish, and **Discard changes** reloads the currently published
lineup.

## Notes

- The panel commits to the `main` branch (configurable in the `CONFIG` block
  at the top of `admin.html`'s script, along with the upload folder and the
  3 MB photo limit).
- After publishing, allow a couple of minutes for GitHub Pages (or your host)
  to redeploy before the homepage reflects the change.
