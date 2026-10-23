<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { data as release } from '../data/releases.data'

const publishedAt = ref(release?.published_at || '')
const relativeTime = ref('recently')

function calculateRelativeTime(dateStr: string): string {
  if (!dateStr) return 'recently'
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return 'recently'
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays < 1) return 'today'
  if (diffDays === 1) return 'yesterday'
  if (diffDays < 30) return `${diffDays} days ago`
  const diffMonths = Math.floor(diffDays / 30)
  if (diffMonths === 1) return '1 month ago'
  if (diffMonths < 12) return `${diffMonths} months ago`
  const diffYears = Math.floor(diffMonths / 12)
  return diffYears === 1 ? '1 year ago' : `${diffYears} years ago`
}

onMounted(async () => {
  if (publishedAt.value) {
    relativeTime.value = calculateRelativeTime(publishedAt.value)
  }
  try {
    const res = await fetch('https://api.github.com/repos/kainotch/Wammy/releases/latest')
    if (res.ok) {
      const data = await res.json()
      if (data.published_at) {
        publishedAt.value = data.published_at
        relativeTime.value = calculateRelativeTime(data.published_at)
      }
    }
  } catch (e) {
    // Keep relative time
  }
})

if (publishedAt.value) {
  relativeTime.value = calculateRelativeTime(publishedAt.value)
}
</script>

<template>
  <span>{{ relativeTime }}</span>
</template>
