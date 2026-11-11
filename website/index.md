---
layout: home

hero:
  name: "Wammy"
  text: "Manga, Manhwa & Light Novel Reader"
  tagline: "A free, high-performance open-source Android reader designed to unify your reading experience. Features over 20+ native built-in sources, live star ratings, sub-second cold starts, and full extension support."
  actions:
    - theme: brand
      text: Download APK
      link: /download/
    - theme: alt
      text: View on GitHub
      link: https://github.com/kainotch/Wammy

features:
  - title: 20+ Built-In Sources
    details: Read immediately without hunting for external extension APKs. Native scrapers for MangaDex, Webtoons, ComicK, Mangakakalot, NovelFire, FreeWebNovel, and more.
    link: /docs/faq/extensions
    linkText: View supported sources

  - title: Manga + Light Novels Together
    details: Manage your entire manga, manhwa, and web novel collection in one app. Features custom typography, dark themes, and built-in Text-to-Speech (TTS) narration.
    link: /docs/guides/getting-started
    linkText: Get started

  - title: Live Ratings & View Counts
    details: Star ratings and total view counts parsed directly from sources and rendered onto cards across browse catalogs, search feeds, and your personal library.
    link: /docs/faq/browse
    linkText: Learn more

  - title: Fast Cold Starts & 120Hz UI
    details: Sub-second startup speeds with non-blocking migrations, zero-allocation cache revision, and buttery smooth 120Hz/90Hz Material 3 Jetpack Compose scrolling.

  - title: Google Drive Cloud Sync
    details: Automated, background cloud synchronization for your library, reading progress, categories, and custom Top 5 favorites directly to your private Google Drive.
    link: /docs/faq/general
    linkText: How sync works

  - title: Universal Extension Support
    details: Full compatibility with external Mihon/Tachiyomi APK extensions, LNReader JavaScript novel plugins, and optional Shizuku background installations.
    link: /docs/guides/shizuku
    linkText: Extension guide
---

<div class="screenshot-section">
  <h2 class="screenshot-title">Modern Material 3 Interface</h2>
  <p class="screenshot-subtitle">Fast, fluid, and designed for comfortable one-handed reading</p>
  
  <div class="screenshot-grid">
    <div class="screenshot-card">
      <img :src="withBase('/img/screenshots/home_v2.jpg')" alt="Home and Discover Screen" />
      <div class="screenshot-caption">Home & Discover</div>
    </div>
    <div class="screenshot-card">
      <img :src="withBase('/img/screenshots/library.jpg')" alt="Library Grid" />
      <div class="screenshot-caption">Library Grid</div>
    </div>
    <div class="screenshot-card">
      <img :src="withBase('/img/screenshots/details.jpg')" alt="Details and Recommendations" />
      <div class="screenshot-caption">Details & Suggestions</div>
    </div>
    <div class="screenshot-card">
      <img :src="withBase('/img/screenshots/profile.jpg')" alt="User Profile and Cloud Sync" />
      <div class="screenshot-caption">Profile & Cloud Sync</div>
    </div>
    <div class="screenshot-card">
      <img :src="withBase('/img/screenshots/reader.jpg')" alt="3D Page Curl Reader" />
      <div class="screenshot-caption">3D Page Curl</div>
    </div>
  </div>
</div>

<script setup>
import { onMounted } from 'vue'
import { withBase } from 'vitepress'
import { data as bakedData } from './.vitepress/theme/data/releases.data'

onMounted(async () => {
  // Set up version badge with baked data
  const nameEl = document.querySelector('.VPHero .name .clip');
  let currentVersion = bakedData.version !== 'Coming soon' ? bakedData.version : '';
  
  if (nameEl && !nameEl.innerHTML.includes('wammy-version')) {
    nameEl.innerHTML = `Wammy <span id="wammy-version" style="font-size: 0.5em; color: var(--vp-c-text-2); vertical-align: middle; margin-left: 8px; transition: opacity 0.3s;">${currentVersion}</span>`;
  }
  
  // Fetch latest version client-side from GitHub
  try {
    const response = await fetch('https://api.github.com/repos/kainotch/Wammy/releases/latest');
    if (response.ok) {
      const data = await response.json();
      const versionEl = document.getElementById('wammy-version');
      if (versionEl && data.tag_name) {
        versionEl.innerText = data.tag_name;
      }
    }
  } catch (e) {
    console.error("Failed to fetch version", e);
  }
})
</script>
