---
title: Diagnosis
titleTemplate: Troubleshooting - Guides
description: Step-by-step diagnostic workflows for identifying app, source, and network anomalies.
---

# Diagnosis

A structured technical workflow for isolating whether an issue is caused by your device environment, local network, application configuration, or an upstream source outage.

---

## 1. Network vs Source Isolation

Before submitting a bug report or clearing application data, determine if the failure originates from your connection or the target website:

1. **Test in a standard browser**:
   Open Chrome or Firefox on your device and navigate to the source website directly.
   - If the site fails to open, times out, or returns a 502/503 Cloudflare gateway error, the source itself is undergoing downtime or maintenance.
   - If the site opens cleanly in your browser but fails inside Wammy, an anti-bot check or outdated User Agent is likely intercepting API calls.

2. **Test across alternate networks**:
   Switch from Wi-Fi to mobile cellular data (or vice versa). If the error disappears, your Wi-Fi router DNS or ISP is filtering the domain.

---

## 2. Common Exception Codes

When inspecting error toasts or crash dump files, look for these standard exceptions:

### `SSLHandshakeException` / `CertPathValidatorException`
- **Cause**: Your device cannot verify the remote server's SSL/TLS certificate.
- **Occurrence**: Common on older Android versions (Android 7 and below) missing modern Let's Encrypt ISRG Root X1 certificates.
- **Remedy**: Update your system security components, or verify that your device date and time are accurately set to network synchronization.

### `SocketTimeoutException`
- **Cause**: The remote server failed to respond within the configured timeout window (usually 30 seconds).
- **Remedy**: The source is experiencing heavy load. Retry in a few minutes or throttle background downloads.

### `JsonSyntaxException` / `NullPointerException` during search
- **Cause**: The source website changed its HTML layout or JSON API schema.
- **Remedy**: Aggregator websites update their CSS classes and frontend endpoints regularly. Check the [Changelogs](/changelogs) or update to the latest Wammy release to obtain updated scrapers.

---

## 3. Isolating Storage & Permissions

If downloads fail instantly with an IO error:
1. Verify available device storage: Wammy requires at least 500 MB of free internal space for image caching and zip archive generation.
2. Check directory write permissions under **Settings > Data and storage > Storage location**.
3. If using an external microSD card, confirm the card has not mounted as read-only due to hardware filesystem errors.

---

## 4. Resetting Application Caches Safely

When an unexpected state persists across reboots, reset internal caches in order without losing your library or reading history:

1. **Clear Image Cache**:
   Navigate to **More > Settings > Advanced > Clear image cache**. This removes cached thumbnail bitmaps without deleting reading progress.
2. **Clear Chapter Cache**:
   Navigate to **More > Settings > Advanced > Clear chapter cache**. This purges temporary reader buffer files.
3. **Clear Cookies & WebView Data**:
   Navigate to **More > Settings > Advanced > Clear cookies** and **Clear WebView data**.
4. **Backup before full reset**:
   If a full reinstallation is necessary, always create a fresh backup file via **More > Settings > Data and storage > Create backup** or verify your Google Drive cloud sync status first.
