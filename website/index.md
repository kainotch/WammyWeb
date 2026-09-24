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
import { data } from './.vitepress/theme/data/releases.data'

onMounted(() => {
  const nameEl = document.querySelector('.VPHero .name .clip');
  if (nameEl && !nameEl.innerHTML.includes(data.version)) {
    nameEl.innerHTML = `Wammy <span style="font-size: 0.5em; color: var(--vp-c-text-2); vertical-align: middle; margin-left: 8px;">${data.version}</span>`;
  }
})
</script>


