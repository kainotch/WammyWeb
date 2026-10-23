# Shizuku Integration

Learn how Shizuku works with Wammy and when you might want to use it.

---

## Is Shizuku Required to Use Wammy?

**No.** For 99% of readers, Shizuku is completely unnecessary:
- Wammy ships with **over 20+ native built-in sources** (MangaDex, Webtoons, ComicK, Mangakakalot, NovelFire, FreeWebNovel, etc.) directly compiled into the app.
- Built-in sources run entirely inside Wammy's app sandbox without installing APK files on your phone.
- Shizuku is never needed to browse, read, or update built-in sources.

---

## When is Shizuku Useful?

Shizuku is only useful if you choose to install **external third-party Mihon/Tachiyomi APK extensions**:
- Normally, when you install or update an external APK extension on Android, the operating system prompts you with a system confirmation dialog for every single package.
- **With Shizuku enabled**: Wammy uses Android system-level ADB permissions to install, update, and remove external extension APKs silently in the background with a single tap, skipping the repetitive system installation prompts.

---

## How to Set Up Shizuku with Wammy

If you use external extension APKs and want silent background installation:
1. Install and start the **Shizuku** app on your device (via wireless debugging or root).
2. Open Wammy and go to **More > Settings > Advanced**.
3. Under the **Extension installer** section, select **Shizuku**.
4. A system prompt from Shizuku will appear asking to allow Wammy access.
5. Tap **Allow all the time**.

Now, whenever you install or batch-update external extension APKs from **Browse > Extensions**, the installations will occur silently in the background.
