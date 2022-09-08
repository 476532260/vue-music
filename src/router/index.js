import { createRouter, createWebHashHistory } from 'vue-router'

const Mine = () => import('@/views/mine/index.vue'/* webpackChunkName: 'mine' */)
const Discover = () => import('@/views/discover/index.vue'/* webpackChunkName: 'discover' */)
const Friends = () => import('@/views/friends/index.vue'/* webpackChunkName: 'friends' */)
const Video = () => import('@/views/video/index.vue'/* webpackChunkName: 'video' */)
const Search = () => import('@/views/search/index.vue'/* webpackChunkName: 'search' */)
const Playlist = () => import('@/views/playlist/index.vue'/* webpackChunkName: 'playlist' */)
const PlaylistDetail = () => import('@/views/playlist/detail.vue'/* webpackChunkName: 'playlistDetail' */)

const routes = [
  { path: '/', redirect: '/discover' },
  { path: '/mine', component: Mine, meta: { showHeader: true } },
  { path: '/discover', component: Discover, meta: { showHeader: true } },
  { path: '/friends', component: Friends, meta: { showHeader: true } },
  { path: '/video', component: Video, meta: { showHeader: true } },
  { path: '/search', component: Search, meta: { showHeader: false } },
  { path: '/playlist', component: Playlist, meta: { showHeader: false } },
  { path: '/playlist/detail', component: PlaylistDetail, meta: { showHeader: false } }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router