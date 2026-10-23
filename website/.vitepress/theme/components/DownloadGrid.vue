<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { data as bakedData } from '../data/releases.data'

const version = ref(bakedData.version)
const body = ref(bakedData.body)
const published_at = ref(bakedData.published_at)
const primaryUrl = ref(bakedData.primaryUrl)
const primarySize = ref(bakedData.primarySize)
const primaryName = ref(bakedData.primaryName)
const otherAssets = ref(bakedData.otherAssets)

onMounted(async () => {
  try {
    const response = await fetch('https://api.github.com/repos/kainotch/Wammy/releases/latest')
    if (!response.ok) return; // fallback to baked data
    
    const data = await response.json()
    version.value = data.tag_name || 'Coming soon'
    body.value = data.body || ''
    published_at.value = data.published_at ? new Date(data.published_at).toUTCString() : ''
    
    let pUrl = ''
    let pSize = ''
    let pName = ''
    const others = []
    
    if (data.assets && data.assets.length > 0) {
      // Find arm64-v8a as recommended primary
      const arm64 = data.assets.find((a: any) => a.name.includes('arm64-v8a') && a.name.endsWith('.apk'))
      const universal = data.assets.find((a: any) => a.name.includes('universal') && a.name.endsWith('.apk'))
      const primary = arm64 || universal || data.assets.find((a: any) => a.name.endsWith('.apk'))
      
      if (primary) {
        pUrl = primary.browser_download_url
        pSize = (primary.size / 1024 / 1024).toFixed(1) + ' MB'
        pName = primary.name
      }
      
      for (const asset of data.assets) {
        if (asset.name.endsWith('.apk') && asset.browser_download_url !== pUrl) {
          others.push({
            name: asset.name,
            url: asset.browser_download_url,
            size: (asset.size / 1024 / 1024).toFixed(1) + ' MB'
          })
        }
      }
    }
    
    if (pUrl) {
      primaryUrl.value = pUrl
      primarySize.value = pSize
      primaryName.value = pName
    }
    otherAssets.value = others
  } catch (e) {
    console.error("Client fetch failed, using baked data", e)
  }
})
</script>

<template>
  <div class="downloads-wrapper">
    <div class="download-card stable-card" v-if="version !== 'Coming soon'">
      <div class="badge-row">
        <span class="badge recommendation">Recommended for modern devices (64-bit ARM)</span>
      </div>
      <h2>Wammy {{ version }} ({{ primaryName.includes('arm64') ? 'ARM64' : 'Universal' }})</h2>
      <p class="requirements">Requires Android 8.0+ &bull; Best performance and smallest download size</p>
      
      <ul class="meta-list">
        <li v-if="published_at"><strong>Release Date:</strong> {{ published_at }}</li>
        <li v-if="primarySize"><strong>File Size:</strong> {{ primarySize }}</li>
        <li v-if="primaryName"><strong>Package:</strong> {{ primaryName }}</li>
      </ul>
      
      <div class="action-row">
        <a :href="primaryUrl" class="btn-download">
          Download APK
        </a>
      </div>
    </div>
    
    <div class="download-card stable-card" v-else>
      <h2>Wammy</h2>
      <p class="requirements">Coming soon! No releases available yet.</p>
    </div>

    <h2 class="subheading" v-if="otherAssets.length > 0">Other Architectures & Packages</h2>
    <p v-if="otherAssets.length > 0" style="color: var(--vp-c-text-2); margin-bottom: 1rem;">
      Choose <strong>Universal</strong> if you are unsure of your device architecture, or specific builds for older 32-bit devices and emulators.
    </p>

    <div class="download-grid" v-if="otherAssets.length > 0">
      <div v-for="asset in otherAssets" :key="asset.name" class="download-card small-card">
        <h3>{{ asset.name }}</h3>
        <p class="size">{{ asset.size }}</p>
        <a :href="asset.url" class="btn-download btn-secondary">
          Download
        </a>
      </div>
    </div>
    
    <div class="changelog-container" v-if="body">
      <h2 class="subheading">Latest Release Notes</h2>
      <div class="changelog-body">
        <pre>{{ body }}</pre>
      </div>
      <a href="https://github.com/kainotch/Wammy/releases" class="all-changelogs-link">View all past changelogs on GitHub &rarr;</a>
    </div>
  </div>
</template>

<style scoped>
.downloads-wrapper { margin-top: 1.5rem; }
.download-card { background-color: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-border); border-radius: 14px; padding: 2rem; margin-bottom: 1.5rem; }
.small-card { padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; }
.download-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem; }
.badge { display: inline-block; font-size: 0.75rem; font-weight: 600; padding: 4px 10px; border-radius: 6px; margin-bottom: 0.75rem; }
.recommendation { background: rgba(0, 94, 211, 0.15); color: #388bfd; border: 1px solid rgba(0, 94, 211, 0.4); }
.requirements { font-size: 0.875rem; color: var(--vp-c-text-2); margin-top: 0.5rem; margin-bottom: 1rem; }
.meta-list { list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.875rem; color: var(--vp-c-text-2); }
.meta-list li { margin-bottom: 0.35rem; }
.size { font-size: 0.875rem; color: var(--vp-c-text-2); margin-top: 0.25rem; margin-bottom: 1rem; }
.subheading { margin-top: 2.5rem; margin-bottom: 0.75rem; font-size: 1.4rem; font-weight: 600; border-top: 1px solid var(--vp-c-border); padding-top: 1.75rem; }
.changelog-body { background: var(--vp-c-bg-soft); padding: 1.25rem; border-radius: 10px; margin-top: 1rem; margin-bottom: 1rem; border: 1px solid var(--vp-c-border); overflow-x: auto; }
.changelog-body pre { font-family: var(--vp-font-family-mono, monospace); white-space: pre-wrap; font-size: 0.875rem; line-height: 1.5; color: var(--vp-c-text-1); margin: 0; }
.all-changelogs-link { font-size: 0.9rem; color: var(--vp-c-brand-1); text-decoration: none; font-weight: 500; display: inline-block; margin-top: 0.5rem; }
.all-changelogs-link:hover { text-decoration: underline; }
.btn-download { display: inline-block; background-color: var(--vp-c-brand-1); color: white !important; padding: 0.75rem 1.75rem; border-radius: 8px; font-weight: 600; text-decoration: none; transition: background-color 0.2s, transform 0.1s; text-align: center; }
.btn-download:hover { background-color: var(--vp-c-brand-2); transform: translateY(-1px); }
.btn-secondary { background-color: transparent; border: 1px solid var(--vp-c-brand-1); color: var(--vp-c-brand-1) !important; padding: 0.5rem 1rem; font-size: 0.875rem; }
.btn-secondary:hover { background-color: var(--vp-c-brand-1); color: white !important; }
</style>
