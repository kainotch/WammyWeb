# Local Source FAQ

Learn how to import and read your offline manga, comic archives, and EPUB novels in Wammy.

---

## What file formats can I read locally?

Wammy supports a wide range of standard comic and document formats:
- **Comic Archives**: `.cbz`, `.cbr`, `.zip`, and `.rar` files.
- **Novel Formats**: `.epub` electronic publication files.
- **Folder Images**: Uncompressed image directories containing `.jpg`, `.jpeg`, `.png`, or `.webp` pages.

---

## Where should I place my local files?

By default, Wammy looks for offline files in:
`Internal Storage/Wammy/local/`

You can change or inspect your storage location at:
**Settings > Data and storage > Storage location**.

---

## How should I organize my folder structure?

To ensure Wammy correctly groups your series and chapters, organize your files into subdirectories:

### For Manga & Comics:
```text
Wammy/
  └── local/
      └── One Piece/
          ├── Chapter 001.cbz
          ├── Chapter 002.cbz
          └── Chapter 003/
              ├── 01.jpg
              ├── 02.jpg
              └── 03.jpg
```

### For Light Novels:
```text
Wammy/
  └── local/
      └── Overlord/
          ├── Volume 01.epub
          └── Volume 02.epub
```

---

## How do I set custom cover art and series metadata?

Place the following files directly inside the series folder (e.g. `Wammy/local/One Piece/`):
- **Cover Image**: Add a `cover.jpg` or `cover.png` file to display custom cover art on library cards.
- **Metadata**: Add a `details.json` file to populate author, artist, description, genres, and publication status.

---

## Why are my local files not showing up?

1. Verify that your files are placed in the directory configured under **Settings > Data and storage > Storage location**.
2. Go to **Browse > Sources > Local source**, pull down to refresh the catalog, and verify file permissions.
3. On Android 11+, ensure Wammy has been granted **All Files Access** (`MANAGE_EXTERNAL_STORAGE`) so it can read user-selected folders outside its sandboxed app directory.
