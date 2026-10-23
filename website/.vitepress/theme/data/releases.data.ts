export interface ReleaseAsset {
  name: string
  url: string
  size: string
}

export interface ReleaseData {
  version: string
  author: string
  body: string
  published_at: string
  html_url: string
  primaryUrl: string
  primarySize: string
  primaryName: string
  arm64Url: string
  universalUrl: string
  otherAssets: ReleaseAsset[]
  allAssets: ReleaseAsset[]
}

declare const data: ReleaseData
export { data }

export default {
  async load(): Promise<ReleaseData> {
    try {
      const response = await fetch('https://api.github.com/repos/kainotch/Wammy/releases/latest', {
        headers: { 'User-Agent': 'VitePress-Builder' }
      })
      if (!response.ok) throw new Error(`GitHub API returned ${response.status}`)
      const release = await response.json()
      
      const version = release.tag_name || 'v0.1.3'
      const author = release.author?.login || 'kainotch'
      const body = release.body || ''
      const published_at = release.published_at || ''
      const html_url = release.html_url || 'https://github.com/kainotch/Wammy/releases/latest'
      
      let primaryUrl = ''
      let primarySize = ''
      let primaryName = ''
      let arm64Url = ''
      let universalUrl = ''
      
      const otherAssets: ReleaseAsset[] = []
      const allAssets: ReleaseAsset[] = []
      
      if (release.assets && Array.isArray(release.assets)) {
        const arm64 = release.assets.find((a: any) => a.name.includes('arm64-v8a') && a.name.endsWith('.apk'))
        const universal = release.assets.find((a: any) => a.name.includes('universal') && a.name.endsWith('.apk'))
        
        if (arm64) {
          arm64Url = arm64.browser_download_url
        }
        if (universal) {
          universalUrl = universal.browser_download_url
        }
        
        const primary = arm64 || universal || release.assets.find((a: any) => a.name.endsWith('.apk'))
        
        if (primary) {
          primaryUrl = primary.browser_download_url
          primarySize = (primary.size / 1024 / 1024).toFixed(1) + ' MB'
          primaryName = primary.name
        }
        
        for (const asset of release.assets) {
          if (asset.name.endsWith('.apk')) {
            const assetObj = {
              name: asset.name,
              url: asset.browser_download_url,
              size: (asset.size / 1024 / 1024).toFixed(1) + ' MB'
            }
            allAssets.push(assetObj)
            if (asset.browser_download_url !== primaryUrl) {
              otherAssets.push(assetObj)
            }
          }
        }
      }
      
      return {
        version,
        author,
        body,
        published_at,
        html_url,
        primaryUrl: primaryUrl || `https://github.com/kainotch/Wammy/releases/latest`,
        primarySize,
        primaryName,
        arm64Url: arm64Url || primaryUrl,
        universalUrl: universalUrl || primaryUrl,
        otherAssets,
        allAssets
      }
    } catch (e) {
      console.warn('Failed to fetch latest GitHub release at build time:', e)
      return {
        version: 'v0.1.3',
        author: 'kainotch',
        body: '',
        published_at: '',
        html_url: 'https://github.com/kainotch/Wammy/releases',
        primaryUrl: 'https://github.com/kainotch/Wammy/releases',
        primarySize: '',
        primaryName: '',
        arm64Url: 'https://github.com/kainotch/Wammy/releases',
        universalUrl: 'https://github.com/kainotch/Wammy/releases',
        otherAssets: [],
        allAssets: []
      }
    }
  }
}
