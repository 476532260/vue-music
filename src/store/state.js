import { PLAY_MODE } from '@/config/constant'

const state = {
  currentIndex: 0,
  playing: false,
  playMode: PLAY_MODE.sequence,
  fullScreen: false,
  sequenceList: [],
  playlist: []
}

export default state