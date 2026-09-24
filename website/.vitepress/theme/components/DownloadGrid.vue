<script setup lang="ts">
import { ref, onMounted } from 'vue'

const version = ref('Loading...')
const body = ref('')
const universalUrl = ref('https://github.com/kainotch/Wammy/releases/latest')
const otherAssets = ref([])
const loading = ref(true)
const error = ref(false)

onMounted(async () => {
  try {
    const response = await fetch('https://api.github.com/repos/kainotch/Wammy/releases/latest')
    if (!response.ok) throw new Error('Failed to fetch')
    
    const data = await response.json()
    version.value = data.tag_name || 'vUnknown'
    body.value = data.body || ''
    
    let uUrl = ''
    const others = []
    
    if (data.assets) {
      for (const asset of data.assets) {
        if (asset.name.includes('universal')) {
          uUrl = asset.browser_download_url
        } else if (asset.name.endsWith('.apk')) {
          others.push({
            name: asset.name,
            url: asset.browser_download_url,
            size: (asset.size / 1024 / 1024).toFixed(1) + ' MB'
          })
        }
      }
    }
    
    if (uUrl) universalUrl.value = uUrl
    otherAssets.value = others
    loading.value = false
  } catch (e) {
    console.error("Error fetching release data:", e)
    version.value = 'Latest'
    error.value = true
    loading.value = false
  }
})
</script>

<template>
  <div class="downloads-wrapper">
    <div v-if="loading" class="loading-state">
      <p>Fetching latest release info from GitHub...</p>
    </div>
    
    <div v-else class="download-card stable-card">
      <div class="badge-row">
        <span class="badge recommendation">Recommended for most users</span>
      </div>
      <h2>Wammy Universal {{ version }}</h2>
      <p class="requirements">The universal APK works on all Android 8.0+ devices.</p>
      
      <div class="action-row">
        <a :href="universalUrl" class="btn-download">
          Download Universal APK
        </a>
      </div>
    </div>

    <h2 class="subheading" v-if="!loading && otherAssets.length > 0">Specific Architectures</h2>
    <p v-if="!loading && otherAssets.length > 0" style="color: var(--vp-c-text-2); margin-bottom: 1rem;">
      Only download these if you know your device's specific architecture to save space.
    </p>

    <div class="download-grid" v-if="!loading">
      <div v-for="asset in otherAssets" :key="asset.name" class="download-card small-card">
        <h3>{{ asset.name }}</h3>
        <p class="size">{{ asset.size }}</p>
        <a :href="asset.url" class="btn-download btn-secondary">
          Download
        </a>
      </div>
    </div>
    
    <div class="changelog-container" v-if="!loading && body">
      <h2 class="subheading">Release Notes for {{ version }}</h2>
      <div class="changelog-body">
        <p>{{ body }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.downloads-wrapper { margin-top: 2rem; }
.loading-state { padding: 3rem; text-align: center; color: var(--vp-c-text-2); background: var(--vp-c-bg-soft); border-radius: 12px; }
.download-card { background-color: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-border); border-radius: 12px; padding: 2rem; margin-bottom: 1rem; }
.small-card { padding: 1.5rem; }
.download-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; }
.badge { display: inline-block; font-size: 0.75rem; font-weight: 600; padding: 4px 8px; border-radius: 6px; margin-bottom: 0.5rem; }
.recommendation { background: #313338; color: #a855f7; border: 1px solid #a855f7; }
.requirements { font-size: 0.875rem; color: var(--vp-c-text-2); margin-bottom: 1.5rem; margin-top: 0; }
.size { font-size: 0.875rem; color: var(--vp-c-text-2); margin-top: 0.5rem; margin-bottom: 1rem; }
.subheading { margin-top: 2.5rem; margin-bottom: 1rem; font-size: 1.5rem; font-weight: 600; border-top: 1px solid var(--vp-c-border); padding-top: 2rem;}
.changelog-body { background: var(--vp-c-bg-soft); padding: 1rem; border-radius: 8px; margin-top: 1rem; font-family: monospace; white-space: pre-wrap; }
.btn-download { display: inline-block; background-color: var(--vp-c-brand-1); color: white !important; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 600; text-decoration: none; transition: background-color 0.2s; }
.btn-download:hover { background-color: var(--vp-c-brand-2); }
.btn-secondary { background-color: transparent; border: 1px solid var(--vp-c-brand-1); color: var(--vp-c-brand-1) !important; }
.btn-secondary:hover { background-color: var(--vp-c-brand-1); color: white !important; }
</style>
