---
layout: home

hero:
  name: "Wammy"
  text: "Manga, Manhwa & Light Novel Reader"
  tagline: "Wammy is a free, open-source Android app designed to unify your reading experience. It comes with high-quality content sources built directly into the app, meaning you don't need to hunt for third-party extensions to start reading."
  actions:
    - theme: brand
      text: Download APK
      link: /download/
    - theme: alt
      text: View on GitHub
      link: https://github.com/kainotch/Wammy

features:
  - title: Manga + Novels Together
    details: Manage your entire reading library in one single app. Seamlessly switch between reading a manga chapter and a light novel without missing a beat.
    link: /docs/guides/getting-started
    linkText: Get started

  - title: Sources Built In
    details: No more searching for extension repositories. Wammy comes with high-quality, curated manga and novel sources built right in so you can read immediately.
    link: /docs/faq/extensions
    linkText: Learn why

  - title: Global Search & Tracking
    details: Search across all sources at once to find exactly what you want to read. Automatically track your progress with MyAnimeList, AniList, and more.
    
  - title: Gesture Navigation
    details: Hold and slide the floating action button to effortlessly glide between your feeds and chapters. Intuitive and fast for one-handed reading.
---

<script setup>
import { onMounted } from 'vue'
import { data as bakedData } from './.vitepress/theme/data/releases.data'

onMounted(async () => {
  // First, set up the DOM element with baked data
  const nameEl = document.querySelector('.VPHero .name .clip');
  let currentVersion = bakedData.version !== 'Coming soon' ? bakedData.version : '';
  
  if (nameEl && !nameEl.innerHTML.includes('wammy-version')) {
    nameEl.innerHTML = `Wammy <span id="wammy-version" style="font-size: 0.5em; color: var(--vp-c-text-2); vertical-align: middle; margin-left: 8px; transition: opacity 0.3s;">${currentVersion}</span>`;
  }
  
  // Then fetch the latest version client-side
  try {
    const response = await fetch('https://api.github.com/repos/kainotch/Wammy/releases/latest', {
      headers: { 'Cache-Control': 'max-age=600' }
    });
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
