<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getPlaylistDetail } from '@/api/playlist'
import Scroll from '@/components/scroll/scroll.vue'

const route = useRoute()
const router = useRouter()
const store = useStore()
const info = ref({})
const songlist = ref([])

// loading
const loading = computed(() => {
  return !songlist.value.length
})

onMounted(() => {
  const id = route.query.id
  getPlaylistDetail({ id: id }).then((res) => {
    info.value = res.data.playlist
    songlist.value = info.value.tracks.map((item) => {
      return {
        id: item.id,
        name: item.name,
        singer: `${item.ar[0].name}-${item.al.name}`,
        mv: item.mv,
        pic: item.al.picUrl,
        duration: item.dt / 1000
      }
    })
  })
})

const back = () => {
  router.back()
}

const selectItem = (index) => {
  store.dispatch('selectPlay', {
    list: songlist.value,
    index
  })
}
</script>
  
  <template>
  <div class="palylist-detail" v-loading="loading">
    <div class="header">
      <svg-icon name="arrow-left-line" @click="back"></svg-icon>
      <div class="center">
        <span>歌单</span>
        <svg-icon name="search-line"></svg-icon>
      </div>
      <svg-icon name="more-fill" class="more"></svg-icon>
    </div>
    <div class="wrapper">
      <scroll class="content">
        <div>
          <div class="info">
            <div
              class="filter"
              :style="{
                backgroundImage: `url(${info.coverImgUrl}`
              }"
              ref="bgImage"
            ></div>
            <div class="top">
              <div class="image">
                <img :src="info.coverImgUrl" />
              </div>
              <div class="detail">
                <p class="title">{{ info.name }}</p>
                <div class="creator">
                  <div class="image">
                    <img :src="info.creator?.avatarUrl" />
                  </div>
                  <span class="nickname">{{ info.creator?.nickname }}</span>
                </div>
              </div>
            </div>
            <div class="center">{{ info.description }}</div>
            <div class="bottom">
              <div class="svg-button">
                <svg-icon name="share-fill"></svg-icon>
                <span class="count">{{ info.shareCount }}</span>
              </div>
              <div class="svg-button">
                <svg-icon name="message-3-line"></svg-icon>
                <span class="count">{{ info.commentCount }}</span>
              </div>
              <div class="svg-button">
                <svg-icon name="add-circle-fill"></svg-icon>
                <span class="count">{{ info.subscribedCount }}</span>
              </div>
            </div>
          </div>
          <div class="songlist-header">
            <svg-icon name="play-circle-fill" class="play-btn"></svg-icon>
            <div class="play-text">
              <span class="play-all">播放全部</span>
              <span class="play-count">({{ songlist.length }})</span>
            </div>
          </div>
          <ul class="songlist">
            <li
              class="item"
              v-for="(item, index) in songlist"
              :key="item.id"
              @click="selectItem(index)"
            >
              <span class="index">{{ index + 1 }}</span>
              <div class="right-wrapper">
                <div class="content">
                  <h2 class="song-name">{{ item.name }}</h2>
                  <p class="singer-name">{{ item.singer }}</p>
                </div>
                <div class="controls">
                  <svg-icon
                    name="play-circle-line"
                    class="video"
                    v-if="item.mv"
                  ></svg-icon>
                  <svg-icon name="more-fill" class="more"></svg-icon>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </scroll>
    </div>
  </div>
</template>
  
  <style lang="scss" scoped>
.palylist-detail {
  .header {
    svg {
      fill: #fff;
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    height: 44px;
    padding: 0 12px;
    background: #ff0000;
    .center {
      padding: 0 20px;
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: $font-size-medium-x;
      color: $color-background;
    }
    .more {
      transform: rotate(90deg);
    }
  }
  .wrapper {
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    z-index: -1;
    .content {
      height: 100%;
      overflow: hidden;
      .info {
        position: relative;
        padding: 65px 12px 35px;
        background-position: center;
        .filter {
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          background-size: cover;
          background-repeat: no-repeat;
          filter: blur(20px);
        }
        .top {
          display: flex;
          .image {
            width: 90px;
            height: 90px;
            flex-shrink: 0;
            img {
              width: 100%;
              height: 100%;
              border-radius: 10px;
            }
          }
          .detail {
            margin-left: 20px;
            .title {
              font-size: $font-size-medium-x;
              font-weight: 500;
              line-height: 1.5;
              color: $color-background;
              @include ellipsisMultiline();
            }
            .creator {
              display: flex;
              align-items: center;
              .image {
                width: 30px;
                height: 30px;
                margin: 10px 0;
                img {
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                }
              }
              .nickname {
                padding-left: 5px;
                font-size: $font-size-medium;
                color: $color-background;
              }
            }
          }
        }
        .center {
          margin: 10px 0;
          font-size: $font-size-medium;
          line-height: 20px;
          color: $color-background;
          @include ellipsisMultiline();
        }
        .bottom {
          display: flex;
          justify-content: space-between;
          .svg-button {
            svg {
              width: 20px;
              height: 20px;
              fill: #fff;
            }
            box-sizing: border-box;
            height: 40px;
            min-width: 100px;
            padding: 8px 12px;
            border-radius: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: $color-text-ll;
            &:last-child {
              background: $color-theme;
            }
            .count {
              margin-left: 5px;
              font-size: $font-size-medium;
              font-weight: 700;
              color: $color-background;
            }
          }
        }
      }
      .songlist-header {
        height: 45px;
        margin-top: -12px;
        padding: 0 12px;
        background: #fff;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .play-btn {
          width: 25px;
          height: 25px;
          fill: $color-theme;
        }
        .play-text {
          flex: 1;
          margin-left: 10px;
          .play-all {
            font-size: $font-size-large;
            font-weight: 700;
          }
          .play-count {
            margin-left: 5px;
            font-size: $font-size-medium;
          }
        }
      }
      .songlist {
        width: 100%;
        .item {
          display: flex;
          align-items: center;
          height: 65px;
          padding: 0 12px;
          .index {
            width: 25px;
            font-size: 17px;
            color: #818894;
            text-align: center;
          }
          .right-wrapper {
            flex: 1;
            width: 1%;
            display: flex;
            align-items: center;
            .content {
              flex: 1;
              width: 1%;
              padding-left: 10px;
              .song-name {
                font-size: 16px;
                color: #262338;
                @include ellipsis();
              }
              .singer-name {
                margin-top: 5px;
                font-size: 13px;
                color: #a1a4b3;
                @include ellipsis();
              }
            }
            .controls {
              svg {
                fill: $color-text-ll;
              }
              display: flex;
              justify-content: space-between;
              .video {
                margin-right: 15px;
              }
              .more {
                transform: rotate(90deg);
              }
            }
          }
        }
      }
    }
  }
}
</style>
  