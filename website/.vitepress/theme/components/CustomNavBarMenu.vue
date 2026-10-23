<script setup lang="ts">
import type { DefaultTheme } from 'vitepress'
import { useData } from 'vitepress'
import VPNavBarMenuGroup from 'vitepress/dist/client/theme-default/components/VPNavBarMenuGroup.vue'
import VPNavBarMenuLink from 'vitepress/dist/client/theme-default/components/VPNavBarMenuLink.vue'
import { computed, onMounted, ref } from 'vue'
import { data as release } from '../data/releases.data'

const { theme } = useData<DefaultTheme.Config>()

// Initialized with build-time baked release data
const currentVersion = ref(release?.version || 'v0.1.3')

onMounted(async () => {
  try {
    const res = await fetch('https://api.github.com/repos/kainotch/Wammy/releases/latest', {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    })
    if (res.ok) {
      const data = await res.json()
      if (data.tag_name) {
        currentVersion.value = data.tag_name
      }
    }
  } catch (err) {
    // Network error: gracefully preserve baked build-time tag
  }
})

const nav = computed(() => {
  return theme.value.nav?.map((item) => {
    if (typeof item.text === 'string' && item.text.includes('{app_version}')) {
      const formattedVersion = currentVersion.value.startsWith('v')
        ? currentVersion.value
        : `v${currentVersion.value}`
      return {
        ...item,
        text: item.text.replace('{app_version}', formattedVersion)
      }
    }
    return item
  })
})
</script>

<template>
  <nav v-if="nav" aria-labelledby="main-nav-aria-label" class="VPNavBarMenu">
    <span id="main-nav-aria-label" class="visually-hidden">Main Navigation</span>
    <template v-for="item in nav" :key="JSON.stringify(item)">
      <VPNavBarMenuLink v-if="'link' in item" :item="item" />
      <component
        v-else-if="'component' in item"
        :is="item.component"
        v-bind="item.props"
      />
      <VPNavBarMenuGroup v-else :item="item" />
    </template>
  </nav>
</template>

<style scoped>
.VPNavBarMenu {
  display: none;
}

@media (min-width: 768px) {
  .VPNavBarMenu {
    display: flex;
  }
}
</style>
