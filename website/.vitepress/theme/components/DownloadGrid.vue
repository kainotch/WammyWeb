<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { data as bakedData } from '../data/releases.data'

const version = ref(bakedData.version)
const body = ref(bakedData.body)
const published_at = ref(bakedData.published_at)
const universalUrl = ref(bakedData.universalUrl)
const universalSize = ref(bakedData.universalSize)
const otherAssets = ref(bakedData.otherAssets)

onMounted(async () => {
  try {
    const response = await fetch('https://api.github.com/repos/kainotch/Wammy/releases/latest', {
      headers: { 'Cache-Control': 'max-age=600' } // cache 10 mins
    })
    if (!response.ok) return; // fallback to baked data
    
    const data = await response.json()
    version.value = data.tag_name || 'Coming soon'
    body.value = data.body || ''
    published_at.value = data.published_at ? new Date(data.published_at).toUTCString() : ''
    
    let uUrl = ''
    let uSize = ''
    const others = []
    
    if (data.assets) {
      for (const asset of data.assets) {
        const sizeMB = (asset.size / 1024 / 1024).toFixed(1) + ' MB';
        if (asset.name.includes('universal') && asset.name.endsWith('.apk')) {
          uUrl = asset.browser_download_url
          uSize = sizeMB
        } else if (asset.name.endsWith('.apk')) {
          others.push({
            name: asset.name,
            url: asset.browser_download_url,
            size: sizeMB
          })
        }
      }
    }
    
    if (uUrl) {
      universalUrl.value = uUrl
      universalSize.value = uSize
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
        <span class="badge recommendation">Recommended for most users</span>
      </div>
      <h2>Wammy Universal {{ version }}</h2>
      <p class="requirements">Requires Android 8.0+</p>
      
      <ul class="meta-list">
        <li v-if="published_at"><strong>Release Date:</strong> {{ published_at }}</li>
        <li v-if="universalSize"><strong>File Size:</strong> {{ universalSize }}</li>
      </ul>
      
      <div class="action-row">
        <a :href="universalUrl" class="btn-download">
          Download APK
        </a>
      </div>
    </div>
    
    <div class="download-card stable-card" v-else>
      <h2>Wammy</h2>
      <p class="requirements">Coming soon! No releases available yet.</p>
    </div>

    <h2 class="subheading" v-if="otherAssets.length > 0">Other downloads</h2>
    <p v-if="otherAssets.length > 0" style="color: var(--vp-c-text-2); margin-bottom: 1rem;">
      Specific architectures and variants.
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
      <h2 class="subheading">Changelog</h2>
      <div class="changelog-body">
        <p>{{ body }}</p>
      </div>
      <a href="https://github.com/kainotch/Wammy/releases" class="all-changelogs-link">View all past changelogs on GitHub &rarr;</a>
    </div>
  </div>
</template>

<style scoped>
.downloads-wrapper { margin-top: 2rem; }
.download-card { background-color: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-border); border-radius: 12px; padding: 2rem; margin-bottom: 1rem; }
.small-card { padding: 1.5rem; }
.download-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; }
.badge { display: inline-block; font-size: 0.75rem; font-weight: 600; padding: 4px 8px; border-radius: 6px; margin-bottom: 0.5rem; }
.recommendation { background: #313338; color: #a855f7; border: 1px solid #a855f7; }
.requirements { font-size: 0.875rem; color: var(--vp-c-text-2); margin-top: 0.5rem; margin-bottom: 1rem; }
.meta-list { list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.875rem; color: var(--vp-c-text-2); }
.meta-list li { margin-bottom: 0.25rem; }
.size { font-size: 0.875rem; color: var(--vp-c-text-2); margin-top: 0.5rem; margin-bottom: 1rem; }
.subheading { margin-top: 2.5rem; margin-bottom: 1rem; font-size: 1.5rem; font-weight: 600; border-top: 1px solid var(--vp-c-border); padding-top: 2rem;}
.changelog-body { background: var(--vp-c-bg-soft); padding: 1rem; border-radius: 8px; margin-top: 1rem; font-family: monospace; white-space: pre-wrap; margin-bottom: 1rem;}
.all-changelogs-link { font-size: 0.875rem; color: var(--vp-c-brand-1); text-decoration: none; font-weight: 500; }
.all-changelogs-link:hover { text-decoration: underline; }
.btn-download { display: inline-block; background-color: var(--vp-c-brand-1); color: white !important; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 600; text-decoration: none; transition: background-color 0.2s; }
.btn-download:hover { background-color: var(--vp-c-brand-2); }
.btn-secondary { background-color: transparent; border: 1px solid var(--vp-c-brand-1); color: var(--vp-c-brand-1) !important; padding: 0.5rem 1rem; }
.btn-secondary:hover { background-color: var(--vp-c-brand-1); color: white !important; }
</style>
