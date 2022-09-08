import http from '@/utils/http'

export function getPlaylistDetail(params) {
  return http({
    url: '/playlist/detail',
    method: 'get',
    params: params
  })
}

/**
 * 热门歌单分类 
 * @returns 
 */
export function getPlaylistHot() {
  return http({
    url: '/playlist/hot',
    method: 'get',
  })
}

export function getTopPlaylist(params) {
  return http({
    url: '/top/playlist',
    method: 'get',
    params: params
  })
}