# AARYANS POWER Google Drive Exhibition Kiosk

Simple static website.

## Architecture

- No Firebase
- No Firebase Hosting configuration
- No Firebase Storage
- No Firestore
- No authentication
- No backend
- No database
- No admin panel
- Videos are opened directly from Google Drive using the Drive preview player.

## Separate project pages

- `shoonya-avkasha.html`
- `soham.html`
- `mukti.html`
- `bhakti.html`
- `aarya-x.html`

`index.html` is only a simple project selector.

## Add Google Drive videos

For every video:

1. Upload the MP4 to Google Drive.
2. Share it as `Anyone with the link` -> `Viewer`.
3. Open the share URL:
   `https://drive.google.com/file/d/FILE_ID/view`
4. Copy `FILE_ID`.
5. Open the matching project HTML file.
6. For each question, find:
   `data-drive-id=""`
7. Put the file ID between the quotes.

Example:

`data-drive-id="1AbCdEfGhIjKlMnOp"`

You can also replace `Question 1`, etc. with the actual question text.

## Example

```html
<button class="question" data-index="0" data-drive-id="1AbCdEfGhIjKlMnOp" data-title="What is SOHAM?">
```

## Run locally

From the project folder:

```bash
python3 -m http.server 8000 --directory public
```

Open:

`http://localhost:8000/`

Or directly:

- `http://localhost:8000/shoonya-avkasha.html`
- `http://localhost:8000/soham.html`
- `http://localhost:8000/mukti.html`
- `http://localhost:8000/bhakti.html`
- `http://localhost:8000/aarya-x.html`

## Hosting

This project is just static HTML/CSS/JavaScript. It can be uploaded to any static hosting provider.

Google Drive is used as the video source, so test playback with the actual exhibition network and all screens before the event.
