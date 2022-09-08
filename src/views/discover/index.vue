<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swiper from './swiper.vue'
import RecIcons from './discover-icons.vue'
import RecPlaylist from './rec-playlist.vue'
import RecMv from './rec-mv.vue'
import Scroll from '@/components/scroll/scroll.vue'
import { getBanner, getRecPlaylist, getRecMv } from '@/api/discover'

const router = useRouter()
// 轮播图
const banners = ref([])
// 推荐歌单
const personalizeds = ref([])
// 最新mv
const mvFirst = ref([])

// loading
const loading = computed(() => {
  return (
    !banners.value.length &&
    !personalizeds.value.length &&
    !mvFirst.value.length
  )
})

onMounted(() => {
  getBanner({ type: 2 }).then((res) => {
    if (res.data.code === 200) {
      banners.value = res.data.banners
    }
  })
  getRecPlaylist().then((res) => {
    if (res.data.code === 200) {
      personalizeds.value = res.data.result
    }
  })
  getRecMv().then((res) => {
    if (res.data.code === 200) {
      mvFirst.value = res.data.data
    }
  })
})

const getMorePlaylist = () => {
  router.push('/playlist')
}
</script>

<template>
  <div class="discover" v-loading="loading">
    <scroll class="discover-content">
      <div>
        <div class="swiper-wrapper">
          <div class="swiper-content">
            <swiper v-if="banners.length" :banners="banners"></swiper>
          </div>
        </div>
        <rec-icons></rec-icons>
        <div class="rec-content">
          <rec-playlist
            v-if="personalizeds.length"
            :personalizeds="personalizeds"
            @link="getMorePlaylist"
          ></rec-playlist>
          <rec-mv :mvs="mvFirst"></rec-mv>
        </div>
      </div>
    </scroll>
  </div>
</template>

<style lang="scss" scoped>
.discover {
  position: fixed;
  top: 45px;
  bottom: 0;
  width: 100%;
  .discover-content {
    height: 100%;
    overflow: hidden;
    .swiper-wrapper {
      position: relative;
      margin: 0 12px;
      overflow: hidden;
      background: $color-background;
      height: 0;
      padding-top: 36.4%;
      border-radius: 12px;
      .swiper-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    .rec-content {
      background: $color-background-d;
    }
  }
}
</style>
