---
title: Troubleshooting
titleTemplate: Guides
description: Facing source or app issues? Here's how to troubleshoot.
---

# Troubleshooting

Facing source or app issues? Here is how to diagnose and resolve common challenges.

Make sure to check the [Frequently Asked Questions](/docs/faq/general) for additional information on general usage.

---

## WebView

### Accessing websites via WebView
When a source fails to load or requires Cloudflare verification, open the website directly using the built-in WebView.

1. Open **Browse** from the bottom navigation dock.
2. Select the problematic source or series.
3. Tap the **WebView** (globe) icon in the top toolbar.
4. Complete any interactive **Cloudflare** turnstile or **CAPTCHA** challenge.
5. Once the page renders properly, tap the back arrow or close button to return to Wammy.

### Clearing cookies and WebView data
If a source continues to fail after verification, reset the WebView cache to clear stale session tokens:

1. Open **More** from the bottom dock and select **Settings**.
2. Tap **Advanced**.
3. Tap **Clear cookies**.
4. Tap **Clear WebView data**.

### WebView updates
Sources rely on the system WebView engine to parse web pages and JavaScript. Keeping your WebView updated prevents rendering bugs and security blocks:

- **Android 10 and above**: Update [Android System WebView](https://play.google.com/store/apps/details?id=com.google.android.webview) via Google Play.
- **Android 7 to 9**: Update [Google Chrome](https://play.google.com/store/apps/details?id=com.android.chrome), which serves as the system WebView engine.
- **Android 6 and below**: Update [Android System WebView](https://play.google.com/store/apps/details?id=com.google.android.webview).

::: tip Developer Options Check
On Android 7 and higher, you can verify which WebView implementation is active under **Device Settings > System > Developer Options > WebView Implementation**.
:::

::: warning Caution with Non-Standard WebView
Custom third-party WebViews (such as Bromite or modified GeckoView builds) can cause crashes or fail modern bot-detection scripts. We recommend the official Android System WebView or Google Chrome.
:::

---

## Cloudflare

Cloudflare anti-bot security is employed by many online reading sites. Some websites maintain aggressive security thresholds to discourage automated scrapers.

### Dealing with Cloudflare looping
If the WebView constantly reloads in a loop during Cloudflare verification:
1. Open the source in **WebView** using the top toolbar icon.
2. Complete the challenge manually.
3. Wait 5 seconds after the page loads before returning to the app so that session cookies can be committed to disk.

### Changing your user agent
Websites detect requests by analyzing the HTTP user agent header. Changing this string to mimic a standard mobile browser often resolves Cloudflare verification blocks:

::: info Changing your user agent
1. Go to **More > Settings > Advanced**.
2. Tap **Default user agent string**.
3. Replace the field with an updated standard Chrome user agent string (e.g. from a mobile Chrome browser).
4. Restart Wammy and reopen the source in WebView to verify.
:::

::: tip Protection level unchanged?
If a website raises its protection level to an extreme setting, you may need to wait until the webmaster adjusts their firewall rules, or migrate your series to an alternate built-in source.
:::

---

## General

### Obtaining crash and error logs
If Wammy crashes or produces unexpected behavior, export the diagnostic logs:

1. Go to **More > Settings > Advanced**.
2. Tap **Dump crash logs**.
3. Choose a destination folder or share the generated text file directly to our GitHub Issues tracker or Discord support channel.

### Obtaining detailed device logs
For subtle background sync errors or network failures, capture system logs with a Logcat tool:
1. Connect your device to a computer via ADB or use a rootless log reader application like [Logcat Reader](https://github.com/darshanparajuli/LogcatReader/releases).
2. Filter the output by tag `Wammy` or package `eu.kanade.tachiyomi`.
3. Reproduce the bug and attach the filtered log to your bug report.

---

## App or Extension Installation Issues

Encountering errors when attempting to install or update the Wammy APK or external extensions? Follow these diagnostic steps:

1. Download and install the latest [Split APKs Installer (SAI)](https://github.com/Aefyr/SAI/releases) from GitHub.
2. Open SAI, tap **Install APKs**, and select the downloaded `.apk` file.
3. SAI will parse the package and display the exact Android package installer error code if the installation fails.

::: info Common installation error codes:
Split APKs Installer surfaces specific system codes to help diagnose installation barriers.

::: details `INSTALL_FAILED_UPDATE_INCOMPATIBLE: Package apk.file_name signatures do not match the previously installed version; ignoring!`
**Cause**: The application or extension is already installed on your device, but signed with a different cryptographic signature (e.g., switching from Tachiyomi, Mihon, or an unofficial build to Wammy).

**Solution**:
1. Create a backup of your data (**More > Settings > Data and storage > Create backup**) and verify your Google Drive sync is active.
2. Uninstall the existing version of the conflicting app or extension from your Android app settings.
3. Install the new Wammy APK.
4. Restore your backup.
:::

::: details `INSTALL_FAILED_NO_MATCHING_ABIS: Failed to extract native libraries, res=-113`
**Cause**: You downloaded an architecture-specific build (e.g. `arm64-v8a`) that is incompatible with your device's processor (such as a 32-bit ARM device or an x86 emulator).

**Solution**:
Download the **Universal** APK from our [Download Page](/download/), which bundles native libraries for all hardware architectures (`arm64-v8a`, `armeabi-v7a`, `x86`, `x86_64`).
:::

::: details `INSTALL_PARSE_FAILED_NOT_APK` or `There was a problem parsing the package`
**Cause**: The APK file was partially downloaded or corrupted during the transfer.

**Solution**:
1. Clear your mobile browser download cache.
2. Redownload the APK directly from [GitHub Releases](https://github.com/kainotch/Wammy/releases) or the [Wammy Download Page](/download/).
3. Ensure your device has at least 500 MB of free internal storage space before initiating the installation.
:::

::: details `INSTALL_FAILED_CONFLICTING_PROVIDER`
**Cause**: Another application installed on the device uses the same internal Android ContentProvider authority string.

**Solution**:
Uninstall obsolete forks or older duplicate builds of the application before installing Wammy.
:::
:::
