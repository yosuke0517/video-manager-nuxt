import { GetterTree } from 'vuex'
import { VideoListState } from '~/types/videoList/state'
import { RootState } from '~/types/state'

const getters: GetterTree<VideoListState, RootState> = {
  describe: (state) => state.describe
}

export default getters
