import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局样式文件
import '@/assets/scss/index.scss'

// 指令
import loadingDirective from '@/components/loading/loading-directive'
// 全局组件
import Card from '@/components/ui/card.vue'
import SvgIcon from '@/components/ui/svg-icon.vue'

const app = createApp(App)
app.use(router)
app.use(store)
app.directive('loading', loadingDirective)
app.component('card', Card)
app.component('svg-icon', SvgIcon)
app.mount('#app')
