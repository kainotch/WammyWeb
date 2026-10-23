<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'

const props = withDefaults(
  defineProps<{
    body?: string
    author?: string
    tag?: string
  }>(),
  {
    body: '',
    author: 'kainotch',
    tag: ''
  }
)

const { body, author } = toRefs(props)

const nonExistent = ref<string[]>([])

const contributors = computed(() => {
  const matches = [...body.value.matchAll(/(?<=\(|(, ))@(.*?)(?=\)|(, ))/g)].map(m => m[2])
  const baseAuthor = author.value && !author.value.includes('[bot]') ? [author.value] : ['kainotch']
  const combined = [...new Set([...baseAuthor, ...matches])].filter(
    u => u && !nonExistent.value.includes(u) && !u.includes('[bot]')
  )
  return combined.length > 0 ? combined : ['kainotch']
})

const listFormatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction'
})

const contributorsText = computed(() => {
  if (contributors.value.length <= 3) {
    return listFormatter.format(contributors.value)
  }
  return listFormatter.format([
    ...contributors.value.slice(0, 2),
    `${contributors.value.length - 2} other contributors`
  ])
})

function onAvatarError(user: string) {
  if (!nonExistent.value.includes(user)) {
    nonExistent.value.push(user)
  }
}
</script>

<template>
  <div v-if="contributors.length > 0" class="contributors-section">
    <h3 class="contributors-title">Contributors</h3>
    <ul class="contributors-list">
      <li v-for="user in contributors" :key="user" class="contributor-item">
        <a
          :href="`https://github.com/${user}`"
          target="_blank"
          rel="noopener noreferrer"
          :title="`${user} on GitHub`"
        >
          <img
            :src="`https://github.com/${user}.png?size=64`"
            :alt="user"
            class="contributor-avatar"
            loading="lazy"
            @error="onAvatarError(user)"
          />
        </a>
      </li>
    </ul>
    <p class="contributors-names">{{ contributorsText }}</p>
  </div>
</template>

<style scoped>
.contributors-section {
  margin-top: 1.75rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.contributors-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
}

.contributors-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0 0 0.5rem 0;
}

.contributor-item {
  margin: 0 !important;
  padding: 0 !important;
}

.contributor-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--vp-c-border);
  display: block;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.contributor-avatar:hover {
  transform: scale(1.1);
  border-color: var(--vp-c-brand-1);
}

.contributors-names {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin: 0;
}
</style>
