<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getPlaylistHot, getTopPlaylist } from '@/api/playlist'

const router = useRouter()
const currentIndex = ref(0)
const tags = ref([])
const playlists = ref([])

onMounted(() => {
  getPlaylistHot().then((res) => {
    tags.value = res.data.tags
  })
  getTopPlaylist({ cat: '全部' }).then((res) => {
    playlists.value = res.data.playlists
  })
})

const back = () => {
  router.back()
}

const switchItem = (index) => {
  currentIndex.value = index
}
</script>

<template>
  <div class="playlist">
    <div class="header">
      <svg-icon name="arrow-left-line" @click="back"></svg-icon>
      <span class="title">歌单广场</span>
    </div>
    <div class="switches-box">
      <ul class="switches">
        <li
          class="item"
          v-for="(item, index) in tags"
          :key="item.name"
          :class="{ active: currentIndex === index }"
          @click="switchItem(index)"
        >
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <div class="playlist-wrapper">
      <ul class="playlist-content">
        <li class="item" v-for="item in playlists" :key="item.id">
          <div class="top">
            <img :src="item.coverImgUrl" />
          </div>
          <div class="bottom"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.playlist {
  .header {
    height: 45px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    .title {
      margin-left: 5px;
    }
  }
  .switches-box {
    .switches {
      display: flex;
      align-items: center;
      height: 30px;
      overflow: hidden;
      .item {
        position: relative;
        flex-shrink: 0;
        padding: 0 12px;
        &.active {
          color: $color-theme;
          &::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 2px;
            background: $color-theme;
            transition: transform 0.3s;
          }
        }
      }
    }
  }
  .playlist-wrapper {
    position: fixed;
    top: 75px;
    bottom: 0;
    .playlist-content {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 0 12px;
      .item {
        width: 30%;

        img {
          width: 100%;
          height: 100%;
          border-radius: 12px;
        }
      }
    }
  }
}
</style>
