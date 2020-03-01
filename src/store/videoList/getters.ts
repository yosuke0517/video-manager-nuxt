import { GetterTree } from 'vuex'
import { VideoListState } from '~/types/videoList/state'
import { RootState } from '~/types/state'

const getters: GetterTree<VideoListState, RootState> = {
  meta: (state) => state.meta,
  items: (state) => state.items,
  item: (state) => state.item,
  relatedItems: (state) => state.relatedItems,
  searchMeta: (state) => state.searchMeta,
  searchItems: (state) => state.searchItems
}

export default getters
