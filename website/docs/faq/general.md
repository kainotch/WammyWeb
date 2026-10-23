# General FAQ

Frequently asked questions about Wammy, its architecture, and supported features.

---

## What is Wammy?

Wammy is a free, high-performance, open-source Android reader built from the ground up for manga, manhwa, manhua, webtoons, and light novels. It combines a unified reading interface, custom comic and novel reader engines, native built-in scrapers, and Google Drive cloud synchronization into a single modern Material 3 application.

---

## What formats and content types are supported?

Wammy supports reading both visual comics and text-based novels:
- **Online Manga & Comics**: Manga, Manhwa, Manhua, and Webtoons from over 20+ built-in community sources and external extensions.
- **Online Light Novels & Web Novels**: Direct scraping of online web novels with an integrated reading engine and Text-to-Speech (TTS) narration.
- **Local Files**: Offline archives including `.cbz`, `.cbr`, `.zip`, `.rar`, `.epub`, and folder-based image directories.

---

## Is Wammy a fork of Mihon or Tachiyomi?

Wammy is built upon the solid foundation and database structure of the Mihon/Tachiyomi ecosystem, but has diverged significantly with modern architectural improvements:
- **Full Jetpack Compose & Material 3 UI**: The entire user interface, floating dock navigation, settings, and browsing feeds are written natively in Jetpack Compose.
- **Built-In Native Sources**: Core sources work out of the box with zero APK installation required.
- **Unified Manga & Novel Library**: Full native novel reader engine, light novel source integration, and LNReader plugin support alongside traditional manga.
- **Sub-Second Cold Starts**: Optimized with non-blocking database migrations, deferred warmup, and phased rendering.

---

## Is Wammy completely free?

Yes. Wammy is 100% free and open-source under the Apache License 2.0. There are no paid tiers, paywalls, third-party advertisements, or tracking telemetry.

---

## What are the system requirements?

- **Operating System**: Android 8.0 (Oreo) or newer (API level 26+).
- **Supported Architectures**: 64-bit ARM (`arm64-v8a`), 32-bit ARM (`armeabi-v7a`), and x86/x86_64 for emulators.
- **Storage**: ~50 MB of free storage for the base application, with additional storage depending on your downloaded chapters and offline reading cache.

---

## How is my reading data and privacy handled?

Wammy does not collect, transmit, or monetize your personal reading habits:
- All library databases, reading history, and bookmarks reside locally on your device.
- Optional Cloud Sync connects directly to your private Google Drive AppData folder using Google's official OAuth tokens. The developers never have access to your Google account or backups.
- Tracker integrations (AniList, MyAnimeList, Kitsu, etc.) communicate directly with the respective third-party APIs from your device.
