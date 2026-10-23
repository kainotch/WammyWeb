# Extensions & Built-In Sources FAQ

Understanding how built-in sources, external APK extensions, and LNReader novel plugins work in Wammy.

---

## Does Wammy require extension APKs to read?

**No.** Unlike traditional forks that require hunting down third-party repository URLs and installing individual APK files for every site, Wammy includes over 20+ popular manga and light novel sources natively built into the app. You can install Wammy, open the Browse tab, and immediately start reading without downloading any extension APKs.

---

## Can I still install external third-party extensions?

**Yes.** Wammy maintains full universal compatibility with:
- **Mihon / Tachiyomi APK Extensions**: You can add standard extension repository JSON URLs in **Browse > Extensions > Extension Stores** and install APK extensions for niche or localized sources.
- **LNReader JavaScript Plugins**: You can install community-curated JavaScript novel plugins in **Browse > Novel Extensions** for additional web novel sites.
- **Shizuku Integration**: If you have Shizuku installed, Wammy can silently install and update extension APKs in the background without prompting you for Android package manager approvals every time.

---

## Which built-in sources are included out of the box?

Wammy includes native scrapers for widely used community platforms:

### Built-In Manga Sources
- MangaDex
- Webtoons
- ComicK
- Mangakakalot
- Atsumaru
- ManhuaPlus
- WeebCentral
- Aster Scans
- MangaReader
- MangaPill
- ReiManga
- Bato
- MangaThemesia and Madara engine sources

### Built-In Light Novel Sources
- FreeWebNovel
- NovelFire
- NovelBuddy
- WuxiaBox
- WuxiaClick
- NovelCool
- Baka-Tsuki
- MVLEMPYR
- Novel Bin
- Wuxiaworld
- NovelFull

---

## How do built-in sources handle website layout changes or Cloudflare?

- **Direct In-App Updates**: Built-in scraper engines are maintained natively within the app codebase. When an upstream site changes its HTML structure or API endpoints, updates are rolled out directly with app releases.
- **Autonomous Cloudflare Solver**: For sources protected by Cloudflare or anti-bot verification challenges, Wammy utilizes an integrated WebView challenge clearance mechanism to store session cookies without requiring external browser redirections.

---

## What is the difference between Built-In Sources and Extensions?

| Feature | Built-In Sources | External Extensions |
| :--- | :--- | :--- |
| **Installation** | Included directly in Wammy (Zero setup) | Downloaded as separate APKs or JS plugins |
| **Storage Overhead** | Minimal (compiled into app code) | Consumes storage per installed extension APK |
| **Permissions** | Runs within Wammy's app sandbox | Requires Android package installation permissions |
| **Updates** | Updated automatically with app releases | Updated via repository stores |
| **Catalog** | Curated popular sources | Thousands of community-created extensions |
