<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import MarkdownIt from 'markdown-it'
import { data as release } from '../data/releases.data'
import Contributors from './Contributors.vue'

const md = new MarkdownIt({ html: true, linkify: true })

const body = ref(release?.body || '')
const version = ref(release?.version || 'v0.1.3')
const author = ref(release?.author || 'kainotch')
const htmlUrl = ref(release?.html_url || 'https://github.com/kainotch/Wammy/releases/latest')

onMounted(async () => {
  try {
    const res = await fetch('https://api.github.com/repos/kainotch/Wammy/releases/latest')
    if (res.ok) {
      const data = await res.json()
      if (data.body) body.value = data.body
      if (data.tag_name) version.value = data.tag_name
      if (data.author?.login) author.value = data.author.login
      if (data.html_url) htmlUrl.value = data.html_url
    }
  } catch (e) {
    // Keep baked data
  }
})

const renderedChangelog = computed(() => {
  if (!body.value) return '<p>No changelog provided.</p>'
  
  // Format @mentions to GitHub links
  let text = body.value.replace(
    /(?<=\(|(, ))@(.*?)(?=\)|(, ))/g,
    '[@$2](https://github.com/$2)'
  )

  // Remove the redundant download table at the bottom of the changelog body
  text = text.replace(/### Download Guide[\s\S]*$/, '').trim()

  return md.render(text)
})
</script>

<template>
  <div class="changelog-container">
    <div class="changelog-card">
      <div class="changelog-header">
        <svg class="changelog-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
        <h2 class="changelog-heading">Changelog</h2>
      </div>

      <div class="changelog-body" v-html="renderedChangelog" />

      <!-- Komikku-style TIP Box -->
      <div class="custom-block tip changelog-tip">
        <p class="custom-block-title">TIP</p>
        <p>
          If you are unsure which version to download then go with
          <code>Wammy-arm64-v8a.apk</code> (or <code>Wammy-universal.apk</code> for 32-bit devices and emulators).
        </p>
      </div>

      <!-- Contributors Component -->
      <Contributors :body="body" :author="author" :tag="version" />
    </div>

    <div class="release-footer-link">
      <p>
        View the release page
        <a :href="htmlUrl" target="_blank" rel="noopener noreferrer">here</a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.changelog-container {
  margin: 2.5rem 0 1.5rem 0;
}

.changelog-card {
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 14px;
  padding: 2rem;
  transition: border-color 0.2s ease;
}

.changelog-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 1.25rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.changelog-icon {
  width: 24px;
  height: 24px;
  color: var(--vp-c-brand-1);
}

.changelog-heading {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
}

:deep(.changelog-body) {
  color: var(--vp-c-text-1);
  font-size: 0.95rem;
  line-height: 1.7;
}

:deep(.changelog-body h1) {
  display: none; /* Hide top duplicate title if present */
}

:deep(.changelog-body h2),
:deep(.changelog-body h3) {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  border: none;
  padding: 0;
}

:deep(.changelog-body ul) {
  padding-left: 1.25rem;
  margin: 0.5rem 0 1rem 0;
}

:deep(.changelog-body li) {
  margin: 0.4rem 0;
}

:deep(.changelog-body strong) {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

:deep(.changelog-body a) {
  color: var(--vp-c-brand-3);
  text-decoration: none;
}

:deep(.changelog-body a:hover) {
  text-decoration: underline;
}

:deep(.changelog-body hr) {
  border: none;
  border-top: 1px solid var(--vp-c-divider);
  margin: 1.5rem 0;
}

.changelog-tip {
  margin-top: 2rem;
}

.changelog-tip code {
  color: var(--vp-c-brand-3);
  background-color: rgba(0, 94, 211, 0.15);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
}

.release-footer-link {
  margin-top: 1.25rem;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
}

.release-footer-link a {
  color: var(--vp-c-brand-3);
  font-weight: 600;
  text-decoration: underline;
  margin-left: 4px;
}
</style>
