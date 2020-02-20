import { MutationTree } from 'vuex'
import { VideoListState } from '~/types/videoList/state'

const mutations: MutationTree<VideoListState> = {
  /** 初期表示時情報 */
  describe(state, { describe }) {
    state.describe = describe
  }
}

export default mutations
