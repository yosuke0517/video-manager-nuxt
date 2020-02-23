import { GetterTree } from 'vuex'
import { VideoListState } from '~/types/videoList/state'
import { RootState } from '~/types/state'

const getters: GetterTree<VideoListState, RootState> = {
  meta: (state) => state.meta,
  items: (state) => state.items
}

export default getters
