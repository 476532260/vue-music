import http from '@/utils/http'

/**
 * 获取 banner(轮播图) 数据
 * @param {*} query 
 * @returns 
 */
export function getBanner(params) {
  return http({
    url: '/banner',
    method: 'get',
    params: params
  })
}

/**
 * 推荐歌单
 * @returns 
 */
export function getRecPlaylist() {
  return http({
    url: '/personalized',
    method: 'get'
  })
}

/**
 * 最新 mv
 * @returns 
 */
export function getRecMv() {
  return http({
    url: '/mv/first',
    method: 'get'
  })
}

