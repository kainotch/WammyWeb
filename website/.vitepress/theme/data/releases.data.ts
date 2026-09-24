export default {
  async load() {
    try {
      const response = await fetch('https://api.github.com/repos/kainotch/Wammy/releases/latest', {
        headers: { 'User-Agent': 'VitePress-Builder' }
      });
      const data = await response.json();
      
      const version = data.tag_name || 'vUnknown';
      const body = data.body || '';
      
      let universalUrl = '';
      const otherAssets = [];
      
      if (data.assets) {
        for (const asset of data.assets) {
          if (asset.name.includes('universal')) {
            universalUrl = asset.browser_download_url;
          } else if (asset.name.endsWith('.apk')) {
            otherAssets.push({
              name: asset.name,
              url: asset.browser_download_url,
              size: (asset.size / 1024 / 1024).toFixed(1) + ' MB'
            });
          }
        }
      }
      
      return {
        version,
        body,
        universalUrl: universalUrl || `https://github.com/kainotch/Wammy/releases/latest`,
        otherAssets
      };
    } catch (e) {
      console.error(e);
      return {
        version: 'vLatest',
        body: '',
        universalUrl: 'https://github.com/kainotch/Wammy/releases/latest',
        otherAssets: []
      };
    }
  }
}
