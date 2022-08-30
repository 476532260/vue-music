<script setup>
import { ref } from 'vue'

const tabs = ref([
  { name: '我的', path: '/mine' },
  { name: '发现', path: '/discover' },
  { name: '云村', path: '/friends' },
  { name: '视频', path: '/video' }
])
</script>

<template>
  <div class="header">
    <svg-icon name="more-fill"></svg-icon>
    <div class="tab-list">
      <router-link
        class="tab-item"
        v-for="item in tabs"
        :key="item.path"
        :to="item.path"
        >{{ item.name }}</router-link
      >
    </div>
    <svg-icon name="search-line"></svg-icon>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  height: 44px;
  padding: 0 12px;
  .tab-list {
    flex: 1;
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tab-item {
      font-size: 15px;
      color: $color-text-l;
      &.router-link-active {
        font-size: 19px;
        font-weight: 800;
        color: $color-text;
      }
    }
  }
}
</style>