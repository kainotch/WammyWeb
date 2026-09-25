import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/WammyWeb/',
  title: "Wammy – Manga, Manhwa & Light Novel Reader",
  description: "A free, open-source Android reader for manga, manhwa, and light novels. No extensions required, with built-in high-quality sources.",
  
  sitemap: {
    hostname: 'https://kainotch.github.io/WammyWeb/'
  },

  head: [
    ['meta', { name: 'theme-color', content: '#a855f7' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'keywords', content: 'manga reader, manhwa reader, light novel reader, android manga app, wammy, tachiyomi alternative, mihon alternative, open source reader' }],
    ['meta', { property: 'og:title', content: 'Wammy Manga and Light Novel Reader' }],
    ['meta', { property: 'og:description', content: 'A free, open-source Android reader for manga, manhwa, and light novels. No extensions required, with built-in high-quality sources.' }],
    ['meta', { property: 'og:image', content: 'https://kainotch.github.io/WammyWeb/img/hero-bg.jpg' }],
    ['meta', { property: 'og:type', content: 'website' }]
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
  appearance: 'dark',
  
  themeConfig: {
    siteTitle: 'Wammy',
    logo: '/img/logo.jpg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Download', link: '/download/' },
      { text: 'Contribute', link: '/contribute' },
      { text: 'FAQ', link: '/docs/faq/general' }
    ],

    sidebar: [
      {
        text: 'Frequently Asked Questions',
        collapsed: false,
        items: [
          { text: 'General', link: '/docs/faq/general' },
          { text: 'Library', link: '/docs/faq/library' },
          { text: 'Browse', link: '/docs/faq/browse' },
          { text: 'Extensions', link: '/docs/faq/extensions' },
          { text: 'Local source', link: '/docs/faq/local-source' },
          { text: 'Reader', link: '/docs/faq/reader' }
        ]
      },
      {
        text: 'Guides',
        collapsed: false,
        items: [
          { text: 'Getting started', link: '/docs/guides/getting-started' },
          { text: 'Source migration', link: '/docs/guides/source-migration' },
          { text: 'Tracking', link: '/docs/guides/tracking' },
          { text: 'Categories', link: '/docs/guides/categories' },
          { text: 'Local source', link: '/docs/guides/local-source' },
          { text: 'Advanced editing', link: '/docs/guides/local-source-advanced' },
          { text: 'Reader settings', link: '/docs/guides/reader-settings' },
          { text: 'Shizuku', link: '/docs/guides/shizuku' }
        ]
      }
    ],

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kainotch/Wammy' },
      { icon: 'discord', link: 'https://discord.gg/qybFSATs7Q' }
    ],

    footer: {
      message: 'Free and open source software under the Apache License 2.0',
      copyright: 'Copyright c 2026 Wammy'
    }
  }
})



