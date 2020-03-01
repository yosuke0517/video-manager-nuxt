import { MutationTree } from 'vuex'
import { VideoListState } from '~/types/videoList/state'

const mutations: MutationTree<VideoListState> = {
  /** 初期表示時情報 */
  meta(state, { meta }) {
    state.meta = meta
  },
  items(state, { items }) {
    if (typeof items.items !== 'undefined') {
      items.items.forEach((item) => {
        state.items.push(item)
      })
    } else {
      state.items = items
    }
  },
  item(state, { payload }) {
    const params =
      payload.items && payload.items.length > 0 ? payload.items[0] : {}
    state.item = params
  },
  mutateRelatedVideos(state, { payload }) {
    state.relatedItems = payload.items || []
  },
  // mutateSearchVideos(state, { payload }) {
  //   if (typeof payload.items !== 'undefined') {
  //     payload.items.forEach((item) => {
  //       state.items.push(item)
  //     })
  //   } else {
  //     state.searchItems = payload
  //   }
  //   state.searchItems = payload.items
  //   state.searchMeta = payload
  // }
  searchMeta(state, { meta }) {
    state.searchMeta = meta
  },
  searchItems(state, { items }) {
    if (typeof items.items !== 'undefined') {
      items.items.forEach((item) => {
        state.searchItems.push(item)
      })
    } else {
      state.searchItems = items
    }
  }
}

export default mutations
