import DefaultTheme from 'vitepress/theme'
import './custom.css'
import DownloadGrid from './components/DownloadGrid.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DownloadGrid', DownloadGrid)
  }
}
