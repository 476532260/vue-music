import { createApp } from 'vue'
import App from './App.vue'

// 引入全局样式文件
import '@/assets/scss/index.scss'

const app = createApp(App)
app.mount('#app')
