import * as types from './mutations-types'
import { PLAY_MODE } from '@/config/constant'
import shuffle from '@/utils/shuffle'

/**
 * 选择播放
 * @param {*} param0 
 * @param {*} param1 
 */
export function selectPlay({ commit }, { list, index }) {
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_PLAY_MODE, PLAY_MODE.sequence)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAY_LIST, list)
}

/**
 * 随机播放
 * @param {*} param0 
 * @param {*} list 
 */
export function randomPlay({ commit }, list) {
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_PLAY_MODE, PLAY_MODE.random)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAY_LIST, shuffle(list))
}