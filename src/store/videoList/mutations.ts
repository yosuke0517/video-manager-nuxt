import { MutationTree } from 'vuex'
import { VideoListState } from '~/types/videoList/state'

const mutations: MutationTree<VideoListState> = {
  /** 初期表示時情報 */
  meta(state, { meta }) {
    state.meta = meta
  },
  items(state, { items }) {
    state.items = items
  }
}

export default mutations
