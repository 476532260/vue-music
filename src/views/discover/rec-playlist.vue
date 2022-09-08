<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import BScroll from '@better-scroll/core'
import { formatPlayCount } from '@/utils/format'

const props = defineProps({
  personalizeds: Array
})

const scrollRef = ref(null)
const contentRef = ref(null)
const scroll = ref(null)
// 每张图片的宽度
const picWidth = 90
// 每张图片的右边距
const picMargin = 12

onMounted(() => {
  const width = (picWidth + picMargin) * props.personalizeds.length + picMargin
  contentRef.value.style.width = width + 'px'
  scroll.value = new BScroll(scrollRef.value, {
    click: true,
    scrollX: true,
    scrollY: false,
    bounce: false,
    eventPassthrough: 'vertical'
  })
})

onUnmounted(() => {
  scroll.value.destroy()
})

const emits = defineEmits(['link'])
const more = () => {
  emits('link')
}
</script>

<template>
  <div class="rec-playlist">
    <card>
      <div class="top">
        <h2 class="title">推荐歌单</h2>
        <span class="more" @click="more">查看更多</span>
      </div>
      <div class="scroll-wrapper" ref="scrollRef">
        <div class="scroll-content" ref="contentRef">
          <div
            class="playlist-item"
            v-for="item in props.personalizeds"
            :key="item.id"
          >
            <router-link
              :to="{ path: '/playlist/detail', query: { id: item.id } }"
            >
              <div class="image">
                <img loading="lazy" :src="item.picUrl" />
              </div>
              <p class="name">{{ item.name }}</p>
              <div class="play-count">
                <svg-icon name="play-line" />
                <span class="count">{{ formatPlayCount(item.playCount) }}</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </card>
  </div>
</template>

<style lang="scss" scoped>
.rec-playlist {
  svg {
    width: 13px;
    height: 13px;
    fill: #fff;
  }
  .card {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  .top {
    padding: 0 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 35px;
    .title {
      font-size: $font-size-medium-x;
      font-weight: 800;
    }
    .more {
      padding: 5px 8px;
      border-radius: 20px;
      font-size: 12px;
      border: 1px solid $color-text-ll;
    }
  }
  .scroll-wrapper {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    .scroll-content {
      .playlist-item {
        display: inline-block;
        margin-right: 12px;
        margin-top: 5px;
        width: 90px;
        height: 115px;
        position: relative;

        &:first-child {
          padding-left: 12px;
        }
        .image {
          width: 90px;
          height: 90px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
          }
        }
        .name {
          line-height: 20px;
          width: 100%;
          font-size: $font-size-small;
          @include ellipsis();
        }
        .play-count {
          position: absolute;
          right: 0;
          top: 3px;
          padding: 2px 6px;
          border-radius: 10px;
          font-size: $font-size-small;
          color: #fff;
          background: rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
}
</style>