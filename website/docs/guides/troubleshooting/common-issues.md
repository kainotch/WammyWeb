---
title: Common issues
titleTemplate: Troubleshooting - Guides
description: Facing issues with a source or the app? Here's how to tackle common challenges.
---

# Common Issues

Facing unexpected behavior with a source, reading performance, or storage? Here is how to tackle common problems.

---

## Basic Issues

### Slow loading
If titles or chapters load slowly:
- **Source server congestion**: Many community manga and novel sites throttle bandwidth during peak hours.
- **Rate limiting / IP ban**: If too many chapters are requested in rapid succession, sources may temporarily restrict your IP. Enable **Downloads > Download delay** in Settings to throttle requests.
- **DNS resolution**: Change your device DNS provider (e.g. Cloudflare 1.1.1.1 or Google DNS 8.8.8.8) to prevent ISP-level CDN throttling.

### Reading performance is laggy
- High-resolution scans (e.g., 4K webtoon strips) consume substantial RAM during bitmap decompression.
- Navigate to **More > Settings > Reader**:
  - Set **Decoder** to standard Hardware Acceleration.
  - Enable **Split tall images** if viewing vertical webtoons on devices with limited RAM.
  - Close unused background applications.

### App not installed
Refer to the [Installation Issues Guide](/docs/guides/troubleshooting/#app-or-extension-installation-issues) for signature conflicts (`INSTALL_FAILED_UPDATE_INCOMPATIBLE`) and architecture mismatches.

---

## Storage Access Issues

### "Invalid location" error
This error indicates that Wammy cannot read or write to the designated directory.
Common causes:
- The app lacks filesystem permissions.
- The selected folder is in an Android-restricted root location.

**Resolutions**:
1. Go to your device **Settings > Apps > Wammy > Permissions** and ensure **Storage / All files access** is granted.
2. In Wammy, navigate to **More > Settings > Data and storage > Storage location**.
3. Select or create a dedicated folder located directly in internal storage (e.g., `Internal Storage/Wammy`).
4. **Do not** use system-protected directories such as `Android/data`, `Documents`, or device root `Download`, as Android 11+ Scoped Storage restricts third-party write access to those directories.

### Scoped Storage on Android 11+
Android 11 introduced strict Scoped Storage restrictions. When storing downloaded chapters or custom local sources, always place them in an accessible user directory:
- Recommended path: `/storage/emulated/0/Wammy/`
- For more information, read the [Storage FAQ](/docs/faq/storage).

### Cannot access SD Card
- Temporarily change your **Storage location** to internal storage, then switch back to your SD card path and re-grant directory permission when the system file picker opens.
- Make sure the SD card is formatted as exFAT or FAT32, and check that the card has not entered a hardware write-protected state.

---

## Source and Network Issues

### HTTP 403 Forbidden
The source is blocking automated requests via Cloudflare or an equivalent Web Application Firewall (WAF).
1. Tap the series or source.
2. Tap the **WebView** icon in the toolbar.
3. Solve the verification challenge manually.
4. Return to Wammy once the page loads.

### HTTP 429 Too Many Requests
The host server has placed a temporary rate limit on your IP address.
1. Pause your active download queue for 10 to 15 minutes.
2. Under **Settings > Downloads**, increase the download interval delay to prevent recurring bans.

### Missing chapters or decryption errors
Some modern manga aggregators use client-side JavaScript canvas or WebAssembly scramblers to protect page images.
1. Check if the source has an updated built-in parser in the latest Wammy update.
2. If the pages fail to unscramble, view the chapter using the built-in **WebView** reader.

---

## Google Drive Cloud Sync Issues

### Token expired or sync prompts repeatedly
1. Open **More > Profile / Cloud Sync**.
2. Tap your profile icon, select **Sign out**, then sign back in with your Google account.
3. Ensure background battery optimization is disabled for Wammy (**Device Settings > Apps > Wammy > Battery > Unrestricted**).
