# ISMA — Easy Content Updates

## Add a News item
1. Open `content/en/news.json` (or `de`, `ar`, `sy`).
2. Copy an existing object and change `id`, `date`, `category`, `title`, `excerpt`, and optional `image`.
3. Put images in `assets/images/`.
4. Commit/save. The News page and homepage cards read the JSON automatically.
5. No new HTML page is required.

## Add a Publication
1. Open `content/en/publications.json`.
2. Copy an entry and change its fields.
3. Put the PDF in `assets/publications/` or use an official external PDF/page URL.
4. The Publications page and detail view update automatically.

## Languages
Maintain the same `id` in EN/DE/AR/SY and translate the text fields.

## Membership / Donations
Bank details are displayed on the Membership page in all four languages. The current membership fee should be confirmed with ISMA before publishing a fixed amount.
