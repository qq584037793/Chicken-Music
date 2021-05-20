import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// グローバルスタイルファイルを導入する
import '@/assets/scss/index.scss'

createApp(App).use(store).use(router).mount('#app')
