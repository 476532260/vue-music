import { createRouter, createWebHashHistory } from 'vue-router'

const Mine = () => import('@/views/mine/index.vue'/* webpackChunkName: 'mine' */)
const Discover = () => import('@/views/discover/index.vue'/* webpackChunkName: 'discover' */)
const Friends = () => import('@/views/friends/index.vue'/* webpackChunkName: 'friends' */)
const Video = () => import('@/views/video/index.vue'/* webpackChunkName: 'video' */)
const Search = () => import('@/views/search/index.vue'/* webpackChunkName: 'search' */)

const routes = [
  { path: '/', redirect: '/discover' },
  { path: '/mine', component: Mine },
  { path: '/discover', component: Discover },
  { path: '/friends', component: Friends },
  { path: '/video', component: Video },
  { path: '/search', component: Search }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router