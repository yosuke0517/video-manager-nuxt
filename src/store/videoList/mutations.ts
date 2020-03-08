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
    // この式は左辺値がundefinedだった場合に右辺値が返る
    params.isFavorite = payload.isFavorite || false
  },
  mutateRelatedVideos(state, { payload }) {
    // nullのときは空の配列を返す
    state.relatedItems = payload || []
  },
  searchMeta(state, { meta }) {
    state.searchMeta = meta
  },
  searchItems(state, { items }) {
    if (state.searchItems !== null && items.isMore) {
      items.items.forEach((item) => {
        state.searchItems.push(item)
      })
    } else {
      state.searchItems = items
    }
  },
  mutateToggleFavorite(state, { isFavorite }) {
    state.isFavorite = isFavorite
  },
  mutateFavoriteVideos(state, { favoriteItems }) {
    // nullのときは空の配列を返す
    state.favoriteItems = favoriteItems || []
  }
}

export default mutations
