---
layout: home

hero:
  name: "Wammy"
  text: "Manga and novels, one shelf."
  tagline: "A free, open-source Android reader with built-in sources. No extensions required."
  actions:
    - theme: brand
      text: Download APK
      link: /download/
    - theme: alt
      text: View on GitHub
      link: https://github.com/kainotch/Wammy

features:
  - title: Manga + Novels together
    details: Manage your entire reading library in one app. Seamlessly switch between manga and novels.
    link: /docs/guides/getting-started
    linkText: Get started

  - title: Sources built in
    details: No more hunting for extensions. Wammy comes with high-quality content sources built right in.
    link: /docs/faq/extensions
    linkText: Learn why

  - title: Gesture navigation
    details: Hold and slide the floating action button to effortlessly glide between your feeds. Intuitive and fast.
---

<script setup>
import { onMounted } from 'vue'

onMounted(async () => {
  // First, set up the DOM element
  const nameEl = document.querySelector('.VPHero .name .clip');
  if (nameEl && !nameEl.innerHTML.includes('wammy-version')) {
    nameEl.innerHTML = `Wammy <span id="wammy-version" style="font-size: 0.5em; color: var(--vp-c-text-2); vertical-align: middle; margin-left: 8px; transition: opacity 0.3s;"></span>`;
  }
  
  // Then fetch the latest version client-side
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
