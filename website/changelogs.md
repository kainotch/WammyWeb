---
title: Changelogs
description: Changelogs of all Wammy releases.
lastUpdated: false
editLink: false
---

<script setup>
import Changelog from './.vitepress/theme/components/Changelog.vue'
import Contributors from './.vitepress/theme/components/Contributors.vue'
</script>

# Changelogs

Official changelogs for Wammy releases, also available directly on [GitHub Releases](https://github.com/kainotch/Wammy/releases).

<Changelog />

---

## Past Releases

### v0.1.2

- **Universal Novel Reader Engine**: Custom typography rendering with font family selection, adjustable margins, line height tuning, and dark mode contrast presets.
- **Split Tab Library Architecture**: Dedicated independent tabs for Manga and Novels in the bottom navigation dock.
- **Global Search Improvements**: Unified concurrent search across both manga scrapers and web novel scrapers with debounced query execution.
- **Bug Fixes**: Resolved race condition during concurrent chapter downloads; improved backup restoration for large archives.

<Contributors author="kainotch" tag="v0.1.2" />

---

### v0.1.1

- **Cloud User Profiles**: Added Firebase Firestore integration for custom usernames, public avatars, and personal bios.
- **Tracking Service Integration**: Multi-service tracking synchronization with AniList, MyAnimeList, Kitsu, Shikimori, and Bangumi.
- **Local Source Advanced Formatting**: Direct support for uncompressed folders, `.cbz`, `.cbr`, and `.zip` archives.

<Contributors author="kainotch" tag="v0.1.1" />

---

### v0.1.0 (Initial Beta Release)

- Modern Material You (Material 3) expressive user interface with dynamic tonal palette theming.
- Floating bottom navigation dock designed for comfortable one-handed mobile usage.
- Dual manga and novel reading engines.
- Full backup and restore compatibility with legacy Tachiyomi archives.

<Contributors author="kainotch" tag="v0.1.0" />
