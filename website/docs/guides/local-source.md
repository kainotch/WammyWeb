# Local Source Guide

A complete guide to importing and reading offline manga chapters, comic archives, and EPUB light novels in Wammy.

---

## 1. Locating the Local Storage Directory

By default, Wammy creates a storage folder on your device:
`Internal Storage/Wammy/local/`

You can verify or change this path at any time in **Settings > Data and storage > Storage location**.

---

## 2. Preparing Comic Archives & Manga

Wammy recognizes comic archives packaged as `.cbz`, `.cbr`, `.zip`, or `.rar`, as well as uncompressed image folders.

Create a folder for the series inside `Wammy/local/`, and place chapter archives or image folders inside:

```text
Wammy/
  └── local/
      └── Berserk/
          ├── cover.jpg              <-- Optional series cover
          ├── Chapter 001.cbz
          ├── Chapter 002.cbz
          └── Chapter 003/           <-- Image folder chapter
              ├── page_001.jpg
              ├── page_002.jpg
              └── page_003.jpg
```

---

## 3. Preparing Light Novels (EPUB)

For light novels, place `.epub` files directly inside a series folder:

```text
Wammy/
  └── local/
      └── Monogatari/
          ├── cover.jpg
          ├── Volume 01 - Bakemonogatari.epub
          └── Volume 02 - Kizumonogatari.epub
```

---

## 4. Reading Local Series in Wammy

1. Open Wammy and tap **Browse** in the bottom dock.
2. Under **Manga Sources**, scroll down and tap **Local source**.
3. All properly structured series folders will appear in the list.
4. Tap any series to add it to your library, customize categories, and read offline without requiring an internet connection.
