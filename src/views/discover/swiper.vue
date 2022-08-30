<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
BScroll.use(Slide)

const props = defineProps({
  banners: {
    type: Array,
    default() {
      return []
    }
  }
})

const swiperRef = ref(null)
const swiper = ref(null)
const currentPageIndex = ref(0)

onMounted(() => {
  swiper.value = new BScroll(swiperRef.value, {
    click: true,
    scrollX: true,
    scrollY: false,
    momentum: false,
    bounce: false,
    probeType: 2,
    slide: true
  })

  swiper.value.on('slideWillChange', (page) => {
    currentPageIndex.value = page.pageX
  })
})

onUnmounted(() => {
  swiper.value.destroy()
})
</script>
  
  <template>
  <div class="swiper" ref="swiperRef">
    <div class="swiper-group">
      <div
        class="swiper-page"
        v-for="item in props.banners"
        :key="item.bannerId"
      >
        <a :href="item.url">
          <img :src="item.pic" />
          <div
            class="swiper-title"
            :style="{ backgroundColor: item.titleColor }"
          >
            <span>{{ item.typeTitle }}</span>
          </div>
        </a>
      </div>
    </div>
    <div class="dots-wrapper">
      <span
        class="dot"
        v-for="(item, index) in props.banners"
        :key="item.id"
        :class="{ active: currentPageIndex === index }"
      ></span>
    </div>
  </div>
</template>
  
  <style lang="scss" scoped>
.swiper {
  min-height: 1px;
  font-size: 0;
  touch-action: y;
  position: relative;
  .swiper-group {
    overflow: hidden;
    white-space: nowrap;
    .swiper-page {
      display: inline-block;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      a {
        position: relative;
        display: block;
        width: 100%;
      }
      img {
        display: block;
        width: 100%;
      }
      .swiper-title {
        position: absolute;
        right: 0;
        bottom: 0;
        padding: 5px 8px;
        font-size: 12px;
        border-top-left-radius: 12px;
        color: #fff;
      }
    }
  }
  .dots-wrapper {
    position: absolute;
    left: 50%;
    bottom: 5%;
    line-height: 12px;
    transform: translateX(-50%);
    .dot {
      display: inline-block;
      margin: 0 5px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-ll;
      &.active {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: $color-text-l;
      }
    }
  }
}
</style>