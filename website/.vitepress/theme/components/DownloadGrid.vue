<script setup lang="ts">
import { data } from '../data/releases.data'
</script>

<template>
  <div class="downloads-wrapper">
    <div class="download-card stable-card">
      <div class="badge-row">
        <span class="badge recommendation">Recommended for most users</span>
      </div>
      <h2>Wammy Universal {{ data.version }}</h2>
      <p class="requirements">The universal APK works on all Android 8.0+ devices.</p>
      
      <div class="action-row">
        <a :href="data.universalUrl" class="btn-download">
          Download Universal APK
        </a>
      </div>
    </div>

    <h2 class="subheading" v-if="data.otherAssets.length > 0">Specific Architectures</h2>
    <p v-if="data.otherAssets.length > 0" style="color: var(--vp-c-text-2); margin-bottom: 1rem;">
      Only download these if you know your device's specific architecture to save space.
    </p>

    <div class="download-grid">
      <div v-for="asset in data.otherAssets" :key="asset.name" class="download-card small-card">
        <h3>{{ asset.name }}</h3>
        <p class="size">{{ asset.size }}</p>
        <a :href="asset.url" class="btn-download btn-secondary">
          Download
        </a>
      </div>
    </div>
    
    <div class="changelog-container" v-if="data.body">
      <h2 class="subheading">Release Notes for {{ data.version }}</h2>
      <div class="changelog-body">
        <p>{{ data.body }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.downloads-wrapper {
  margin-top: 2rem;
}
.download-card {
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 1rem;
}
.small-card {
  padding: 1.5rem;
}
.download-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}
.badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}
.recommendation { background: #313338; color: #a855f7; border: 1px solid #a855f7; }
.requirements { font-size: 0.875rem; color: var(--vp-c-text-2); margin-bottom: 1.5rem; margin-top: 0; }
.size { font-size: 0.875rem; color: var(--vp-c-text-2); margin-top: 0.5rem; margin-bottom: 1rem; }
.subheading { margin-top: 2.5rem; margin-bottom: 1rem; font-size: 1.5rem; font-weight: 600; border-top: 1px solid var(--vp-c-border); padding-top: 2rem;}
.changelog-body { background: var(--vp-c-bg-soft); padding: 1rem; border-radius: 8px; margin-top: 1rem; font-family: monospace; white-space: pre-wrap; }
.btn-download {
  display: inline-block;
  background-color: var(--vp-c-brand-1);
  color: white !important;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s;
}
.btn-download:hover {
  background-color: var(--vp-c-brand-2);
}
.btn-secondary {
  background-color: transparent;
  border: 1px solid var(--vp-c-brand-1);
  color: var(--vp-c-brand-1) !important;
}
.btn-secondary:hover {
  background-color: var(--vp-c-brand-1);
  color: white !important;
}
</style>
