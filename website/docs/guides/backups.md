---
title: Backups & Cloud Sync
titleTemplate: Guides
description: Safeguard your library, reading history, and custom categories using Google Drive cloud sync and local backups.
---

# Backups & Cloud Sync

Wammy provides two robust methods for protecting and transferring your reading library: automated Google Drive cloud synchronization and manual local backup archives.

---

## 1. Automated Google Drive Cloud Sync

Wammy features built-in, zero-effort synchronization with your personal Google Drive account. Unlike manual exports, changes to your reading status, categories, and newly bookmarked titles synchronize automatically in the background.

### Setting Up Cloud Sync
1. Navigate to **More** from the bottom dock.
2. Tap your **Profile** card or **Cloud Sync**.
3. Tap **Sign in with Google** and choose your Google account.
4. Grant the requested Drive AppData permissions.

### How Google Drive Sync Operates
- **Private AppData Folder**: Wammy stores synchronization snapshots inside a private, hidden application container within your Google Drive. These files do not clutter your standard Google Drive folders and cannot be accessed by unauthorized third parties.
- **Background Synchronization**: Sync tasks execute via Android WorkManager during idle periods or when network connectivity is detected.
- **Cross-Device Continuity**: Log in to the same Google account on a secondary phone, tablet, or Android TV device to access your library, categories, and reading history across all devices.

---

## 2. Local Backup Files (`.tachibk`)

If you prefer offline storage or need to migrate between different reader applications, Wammy generates standard `.tachibk` (gzipped Protobuf) archives.

### Creating a Manual Backup
1. Navigate to **More > Settings > Data and storage**.
2. Tap **Create backup**.
3. Choose the backup destination folder via the system storage picker.
4. Select the components you wish to include:
   - Manga and novel library entries
   - Custom categories
   - Reading history and progress
   - Source tracking credentials
5. Tap **Create**. The generated file will be saved with a timestamped filename (e.g. `wammy_2026-10-23_19-30.tachibk`).

### Restoring from a Backup
1. Navigate to **More > Settings > Data and storage**.
2. Tap **Restore backup**.
3. Locate and select your `.tachibk` file.
4. Wammy will parse the archive and display a confirmation dialog showing the number of titles, categories, and tracking accounts detected.
5. Tap **Restore** and allow the background restoration process to complete.

---

## 3. Compatibility with Tachiyomi and Mihon

Wammy's local backup engine preserves schema compatibility with upstream Tachiyomi and Mihon backup files:
- You can import existing backups from Tachiyomi, Mihon, TachiyomiSY, or Komikku directly into Wammy without conversion.
- All tracked sources, chapter read flags, bookmarks, and custom category arrangements are preserved.
- When imported, Wammy automatically links entries to its native built-in scrapers whenever matched by source name or ID.

---

## 4. Automatic Periodic Backups

You can configure Wammy to generate periodic offline backups automatically:

1. Navigate to **More > Settings > Data and storage**.
2. Under **Automatic backups**, set your preferred interval:
   - Every 6 hours
   - Every 12 hours
   - Daily (recommended)
   - Every 2 days
   - Weekly
3. Set the **Backup limit** (e.g., retain the last 5 backups). Older automated backups beyond this threshold will be pruned automatically to conserve storage space.
