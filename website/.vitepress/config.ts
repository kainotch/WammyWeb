import { defineConfig } from 'vitepress'

let version = '';
try {
  const response = await fetch('https://api.github.com/repos/kainotch/Wammy/releases/latest', {
    headers: { 'User-Agent': 'VitePress-Builder' }
  });
  const data = await response.json();
  version = data.tag_name ? ` ${data.tag_name}` : '';
} catch (e) {
  console.error("Failed to fetch version for site title", e);
}

export default defineConfig({
  title: `Wammy${version}`,
  description: "Manga and novels, one shelf.",
  head: [
    ['meta', { name: 'theme-color', content: '#a855f7' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  cleanUrls: true,
  appearance: 'dark',
  
  themeConfig: {
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
      { icon: 'github', link: 'https://github.com/kainotch/Wammy' }
    ],

    footer: {
      message: 'Free and open source software under the Apache License 2.0',
      copyright: 'Copyright © 2026 Wammy'
    }
  }
})
