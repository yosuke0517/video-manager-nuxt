import { Module } from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import { VideoListState } from '~/types/videoList/state'
import { RootState } from '~/types/state'

const state: VideoListState = {
  describe: null
}

const videoList: Module<VideoListState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default videoList
