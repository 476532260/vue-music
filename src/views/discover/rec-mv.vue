<script setup>
import { formatPlayCount } from '@/utils/format'

const props = defineProps({
  mvs: {
    type: Array,
    default() {
      return []
    }
  }
})
</script>

<template>
  <div class="rec-mv">
    <card>
      <div class="top">
        <h2 class="title">推荐歌单</h2>
        <span class="more">查看更多</span>
      </div>
      <div class="mv-content">
        <div class="mv-item" v-for="item in mvs" :key="item.id">
          <div class="image">
            <img :src="item.cover" loading="lazy" />
          </div>
          <p class="name">{{ item.name }}</p>
          <div class="controls">
            <div class="info">
              <div class="creator">
                <svg-icon name="account-box-fill"></svg-icon>
                <span class="text">{{ item.artistName }}</span>
              </div>
              <div class="count">
                <svg-icon name="video-fill"></svg-icon>
                <span class="text">{{ formatPlayCount(item.playCount) }}</span>
              </div>
            </div>
            <div class="more">
              <svg-icon name="more-fill" class="more-fill"></svg-icon>
            </div>
          </div>
        </div>
      </div>
    </card>
  </div>
</template>

<style lang="scss" scoped>
.rec-mv {
  margin-top: 20px;
  svg {
    width: 20px;
    height: 20px;
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
  .mv-content {
    box-sizing: border-box;
    width: 100%;
    padding: 5px 12px;
    .mv-item {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 5px 0;
      .image {
        width: 100%;
        height: 214px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        height: 40px;
        line-height: 40px;
        padding: 0 12px;
        font-size: 14px;
        font-weight: 800;
        background: $color-background-d;
        @include ellipsis();
      }
      .controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        .info {
          display: flex;
          .creator {
            display: flex;
            align-items: center;
            font-size: $font-size-medium;
          }
          .count {
            display: flex;
            align-items: center;
            margin-left: 5px;
            font-size: $font-size-medium;
          }
        }
        .more {
          .more-fill {
            transform: rotate(90deg);
          }
        }
      }
    }
  }
}
</style>