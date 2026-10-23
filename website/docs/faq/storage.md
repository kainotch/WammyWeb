---
title: Storage FAQ
titleTemplate: Frequently Asked Questions
description: Understanding Android storage permissions, Scoped Storage rules, and directory choices in Wammy.
---

# Storage FAQ

Answers to frequently asked questions regarding storage directories, Scoped Storage permissions on modern Android versions, and SD card configuration.

---

## What is Scoped Storage?

Starting with Android 10 and enforced strictly in Android 11 and newer, Google introduced **Scoped Storage** to protect user privacy. Applications can no longer freely read and write to arbitrary folders on internal storage without explicit user authorization via the system Storage Access Framework (SAF).

In practical terms:
- Wammy requires you to pick an authorized directory when configuring your storage location.
- Protected system folders (such as Android system roots, `Documents`, and system `Download`) are restricted by Android OS policies.

---

## Recommended Storage Location

To avoid access permission denials or file conflicts:
1. Open Wammy and go to **More > Settings > Data and storage**.
2. Tap **Storage location**.
3. Create and select a new dedicated folder at the root of your internal storage, such as:
   ```text
   /storage/emulated/0/Wammy/
   ```
4. Confirm folder access when prompted by the Android system file dialog.

Do **not** place your storage location inside:
- `Android/data/` (heavily restricted in Android 11+)
- `Android/obb/`
- Device root `Download/` or `Documents/`

---

## Can I use an external MicroSD card?

Yes. Wammy fully supports external SD cards for storing downloaded chapters, local comic archives, and backups.

To configure an SD card:
1. Ensure the card is formatted with exFAT or FAT32.
2. In Wammy, tap **Settings > Data and storage > Storage location**.
3. In the system file picker, open the navigation drawer and select your MicroSD card.
4. Create a folder (for example, `Wammy`) and tap **Use this folder**.
5. Grant write access when prompted by Android.

::: tip SD Card Performance
Because external microSD card read/write speeds are substantially slower than high-speed UFS internal flash storage, heavy chapter downloading or large local library indexing may take slightly longer on older SD cards.
:::

---

## How do I free up storage space?

If Wammy consumes significant storage:
- **Downloaded Chapters**: Go to **More > Settings > Downloads** to manage downloaded chapters or remove completed series.
- **Image Cache**: Go to **More > Settings > Advanced > Clear image cache** to purge cached thumbnails. This does not delete any downloaded chapters or library entries.
- **Chapter Cache**: Go to **More > Settings > Advanced > Clear chapter cache** to remove transient online reader buffers.
