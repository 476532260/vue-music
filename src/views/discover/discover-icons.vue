<script setup>
import { ref } from 'vue'

const icons = ref([
  { svg: 'recommend', name: '每日推荐' },
  { svg: 'radio', name: '私人FM' },
  { svg: 'album', name: '歌单' },
  { svg: 'rank', name: '排行榜' },
  { svg: 'book', name: '有声书' }
])
</script>
  
<template>
  <div class="discover-icons">
    <div class="icon-item" v-for="(item, index) in icons" :key="index">
      <div class="svg-wrapper">
        <svg-icon :name="item.svg"></svg-icon>
      </div>
      <span class="icon-name">{{ item.name }}</span>
    </div>
  </div>
</template>
  
<style lang="scss" scoped>
.discover-icons {
  padding-top: 5px;
  display: flex;
  justify-content: space-around;
  @include border-1px($color-text-ll);
  .icon-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100px;
    .svg-wrapper {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-bottom: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #ffdbe9;
    }
    .icon-name {
      font-size: $font-size-small;
    }
  }
}
</style>