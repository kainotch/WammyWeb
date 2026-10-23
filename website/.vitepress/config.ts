import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  base: '/WammyWeb/',
  title: "Wammy – Manga, Manhwa & Light Novel Reader",
  description: "A free, open-source Android reader for manga, manhwa, and light novels. No extensions required, with built-in high-quality sources.",
  
  sitemap: {
    hostname: 'https://kainotch.github.io/WammyWeb/'
  },

  head: [
    ['meta', { name: 'theme-color', content: '#005ed3' }],
    ['meta', { name: 'color-scheme', content: 'dark' }],
    ['meta', { name: 'application-name', content: 'Wammy' }],
    ['meta', { property: 'og:site_name', content: 'Wammy' }],
    ['link', { rel: 'icon', href: '/WammyWeb/favicon.ico', sizes: '48x48' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/WammyWeb/favicon-48x48.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/WammyWeb/favicon-96x96.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/WammyWeb/favicon-192x192.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '192x192', href: '/WammyWeb/favicon-192x192.png' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'keywords', content: 'manga reader, manhwa reader, light novel reader, android manga app, wammy, tachiyomi alternative, mihon alternative, open source reader' }],
    ['meta', { property: 'og:title', content: 'Wammy Manga and Light Novel Reader' }],
    ['meta', { property: 'og:description', content: 'A free, open-source Android reader for manga, manhwa, and light novels. No extensions required, with built-in high-quality sources.' }],
    ['meta', { property: 'og:image', content: 'https://kainotch.github.io/WammyWeb/img/hero-bg.jpg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Wammy',
      alternateName: ['Wammy Reader', 'Kainotch Wammy'],
      url: 'https://kainotch.github.io/WammyWeb/'
    })]
  ],

  transformPageData(pageData) {
    const canonicalUrl = `https://kainotch.github.io/WammyWeb/${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '')
    
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:url', content: canonicalUrl }]
    )
  },

  cleanUrls: true,
  // Enforce dark mode only across the site - light mode is completely disabled
  appearance: 'force-dark',
  
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPNavBarMenu\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/CustomNavBarMenu.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPNavScreenMenu\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/CustomNavScreenMenu.vue', import.meta.url)
          )
        }
      ]
    }
  },

  themeConfig: {
    siteTitle: 'Wammy',
    logo: '/img/logo.png',
    outline: [2, 3],
    
    nav: [
      {
        text: 'Get {app_version}',
        activeMatch: '^/*?(download|changelogs)/*?$',
        items: [
          { text: 'Download', link: '/download/' },
          { text: 'Changelogs', link: '/changelogs' }
        ]
      },
      { text: 'Docs', link: '/docs/guides/getting-started' },
      { text: 'Contribute', link: '/contribute' },
      { text: 'FAQ', link: '/docs/faq/general' }
    ],

    sidebar: [
      {
        items: [
          { text: 'Download', link: '/download/' },
          { text: 'Changelogs', link: '/changelogs' },
          { text: 'Contribute', link: '/contribute' }
        ]
      },
      {
        text: 'Frequently Asked Questions',
        collapsed: false,
        items: [
          { text: 'General', link: '/docs/faq/general' },
          { text: 'Library', link: '/docs/faq/library' },
          { text: 'Browse', link: '/docs/faq/browse' },
          { text: 'Extensions', link: '/docs/faq/extensions' },
          { text: 'Local source', link: '/docs/faq/local-source' },
          { text: 'Reader', link: '/docs/faq/reader' },
          { text: 'Storage', link: '/docs/faq/storage' }
        ]
      },
      {
        text: 'Guides',
        collapsed: false,
        items: [
          { text: 'Getting started', link: '/docs/guides/getting-started' },
          {
            text: 'Troubleshooting',
            collapsed: false,
            items: [
              { text: 'Overview', link: '/docs/guides/troubleshooting/' },
              { text: 'Common issues', link: '/docs/guides/troubleshooting/common-issues' },
              { text: 'Diagnosis', link: '/docs/guides/troubleshooting/diagnosis' }
            ]
          },
          { text: 'Source migration', link: '/docs/guides/source-migration' },
          { text: 'Backups & Cloud Sync', link: '/docs/guides/backups' },
          { text: 'Tracking', link: '/docs/guides/tracking' },
          { text: 'Categories', link: '/docs/guides/categories' },
          {
            text: 'Local source',
            collapsed: true,
            items: [
              { text: 'Standard format', link: '/docs/guides/local-source' },
              { text: 'Advanced editing', link: '/docs/guides/local-source-advanced' }
            ]
          },
          { text: 'Reader settings', link: '/docs/guides/reader-settings' },
          { text: 'Shizuku', link: '/docs/guides/shizuku' }
        ]
      }
    ],

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kainotch/Wammy', ariaLabel: 'Project GitHub' },
      { icon: 'discord', link: 'https://discord.gg/qybFSATs7Q', ariaLabel: 'Discord Community' }
    ],

    editLink: {
      pattern: 'https://github.com/kainotch/Wammy/edit/main/website/:path',
      text: 'Help us improve this page'
    },

    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        forceLocale: true,
        dateStyle: 'long',
        timeStyle: 'short'
      }
    },

    docFooter: {
      prev: 'Previous page',
      next: 'Next page'
    },

    footer: {
      message: 'Free and open-source software under the Apache License 2.0',
      copyright: 'Copyright © 2026 Wammy'
    }
  }
})
