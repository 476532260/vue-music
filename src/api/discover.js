import http from '@/utils/http'

/**
 * 
 * @param {*} query 
 * @returns 
 */
export function getBanner(query) {
  return http({
    url: '/banner',
    method: 'get',
    params: query
  })
}