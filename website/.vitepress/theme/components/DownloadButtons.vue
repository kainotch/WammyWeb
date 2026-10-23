<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { data as release } from '../data/releases.data'

const version = ref(release?.version || 'v0.1.3')
const arm64Url = ref(release?.arm64Url || release?.primaryUrl || 'https://github.com/kainotch/Wammy/releases/latest')
const universalUrl = ref(release?.universalUrl || release?.primaryUrl || 'https://github.com/kainotch/Wammy/releases/latest')
const allAssets = ref(release?.allAssets || [])

const isAndroid = ref(true)
const showOtherArch = ref(false)

onMounted(async () => {
  if (typeof navigator !== 'undefined') {
    isAndroid.value = /android/i.test(navigator.userAgent)
  }
  
  // Real-time update from GitHub API
  try {
    const res = await fetch('https://api.github.com/repos/kainotch/Wammy/releases/latest')
    if (res.ok) {
      const data = await res.json()
      if (data.tag_name) version.value = data.tag_name
      if (data.assets && Array.isArray(data.assets)) {
        const arm64 = data.assets.find((a: any) => a.name.includes('arm64-v8a') && a.name.endsWith('.apk'))
        const universal = data.assets.find((a: any) => a.name.includes('universal') && a.name.endsWith('.apk'))
        if (arm64) arm64Url.value = arm64.browser_download_url
        if (universal) universalUrl.value = universal.browser_download_url
        
        allAssets.value = data.assets
          .filter((a: any) => a.name.endsWith('.apk'))
          .map((a: any) => ({
            name: a.name,
            url: a.browser_download_url,
            size: (a.size / 1024 / 1024).toFixed(1) + ' MB'
          }))
      }
    }
  } catch (e) {
    // Graceful fallback to baked data
  }
})
</script>

<template>
  <div class="download-container">
    <!-- Non-Android OS Warning Callouts -->
    <div v-if="!isAndroid" class="custom-block danger">
      <p class="custom-block-title">Unsupported operating system</p>
      <p>
        <strong>Wammy</strong> is an <strong>Android app</strong> only. Use an
        <strong>Android device</strong> to download and install the app.
      </p>
    </div>

    <div v-if="!isAndroid" class="custom-block warning">
      <p class="custom-block-title">Caution</p>
      <p>
        Any app for any operating systems other than Android called
        <strong>Wammy</strong> is not affiliated with this project.
      </p>
      <p style="margin-top: 0.5rem;">
        For more information, read the
        <a href="/WammyWeb/docs/faq/general">General FAQ</a>.
      </p>
    </div>

    <!-- Centered Download Pill Buttons -->
    <div class="download-button-row">
      <a
        class="dl-pill-btn primary"
        :href="arm64Url"
        :download="`Wammy-${version}-arm64-v8a.apk`"
      >
        <svg class="dl-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/>
        </svg>
        <span class="btn-text">Wammy</span>
        <span class="btn-version">{{ version }}</span>
      </a>

      <a
        class="dl-pill-btn secondary"
        :href="universalUrl"
        :download="`Wammy-${version}-universal.apk`"
      >
        <svg class="dl-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
        <span class="btn-text">Wammy Universal</span>
      </a>
    </div>

    <p class="requirements-text">
      Requires <strong>Android 8.0</strong> or higher.
    </p>

    <!-- Collapsible Other Architectures -->
    <div class="other-arch-toggle-wrap">
      <button class="arch-toggle-btn" @click="showOtherArch = !showOtherArch">
        {{ showOtherArch ? 'Hide' : 'Show' }} other architectures (armeabi-v7a, x86, x86_64)
      </button>

      <div v-if="showOtherArch" class="other-arch-grid">
        <a
          v-for="asset in allAssets"
          :key="asset.name"
          :href="asset.url"
          class="arch-card"
        >
          <span class="arch-name">{{ asset.name }}</span>
          <span class="arch-size">{{ asset.size }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.download-container {
  margin: 1.5rem 0;
}

.download-button-row {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 2rem 0 0.75rem 0;
}

.dl-pill-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.75rem 1.6rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none !important;
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid transparent;
}

.dl-pill-btn.primary {
  background-color: var(--vp-c-brand-1);
  color: #ffffff !important;
  box-shadow: 0 4px 14px rgba(0, 94, 211, 0.35);
}

.dl-pill-btn.primary:hover {
  background-color: var(--vp-c-brand-2);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 94, 211, 0.45);
}

.dl-pill-btn.secondary {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1) !important;
  border-color: var(--vp-c-border);
}

.dl-pill-btn.secondary:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-3) !important;
  transform: translateY(-2px);
}

.dl-icon {
  width: 20px;
  height: 20px;
}

.btn-version {
  font-size: 0.85em;
  opacity: 0.85;
  margin-left: 2px;
}

.requirements-text {
  text-align: center;
  font-size: 0.825rem;
  color: var(--vp-c-text-2);
  margin: 0.75rem 0 2rem 0;
}

.other-arch-toggle-wrap {
  text-align: center;
  margin-top: 1.5rem;
}

.arch-toggle-btn {
  background: none;
  border: none;
  color: var(--vp-c-brand-3);
  font-size: 0.875rem;
  cursor: pointer;
  text-decoration: underline;
  padding: 0.25rem 0.5rem;
}

.other-arch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
  text-align: left;
}

.arch-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  text-decoration: none !important;
  color: var(--vp-c-text-1) !important;
  font-size: 0.85rem;
  transition: border-color 0.2s ease;
}

.arch-card:hover {
  border-color: var(--vp-c-brand-1);
}

.arch-name {
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.arch-size {
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  margin-left: 0.5rem;
}
</style>
