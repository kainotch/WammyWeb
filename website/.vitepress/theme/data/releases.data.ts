export default {
  async load() {
    try {
      const response = await fetch('https://api.github.com/repos/kainotch/Wammy/releases/latest', {
        headers: { 'User-Agent': 'VitePress-Builder' }
      });
      if (!response.ok) throw new Error('Fetch failed');
      const data = await response.json();
      
      const version = data.tag_name || 'Coming soon';
      const body = data.body || '';
      const published_at = data.published_at ? new Date(data.published_at).toUTCString() : '';
      
      let universalUrl = '';
      let universalSize = '';
      const otherAssets = [];
      
      if (data.assets) {
        for (const asset of data.assets) {
          const sizeMB = (asset.size / 1024 / 1024).toFixed(1) + ' MB';
          if (asset.name.includes('universal') && asset.name.endsWith('.apk')) {
            universalUrl = asset.browser_download_url;
            universalSize = sizeMB;
          } else if (asset.name.endsWith('.apk')) {
            otherAssets.push({
              name: asset.name,
              url: asset.browser_download_url,
              size: sizeMB
            });
          }
        }
      }
      
      return {
        version,
        body,
        published_at,
        universalUrl: universalUrl || `https://github.com/kainotch/Wammy/releases/latest`,
        universalSize,
        otherAssets
      };
    } catch (e) {
      console.error(e);
      return {
        version: 'Coming soon',
        body: '',
        published_at: '',
        universalUrl: 'https://github.com/kainotch/Wammy/releases',
        universalSize: '',
        otherAssets: []
      };
    }
  }
}
