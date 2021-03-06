import { ActionTree } from 'vuex'
import Cookies from 'universal-cookie'
import { MetaTransfer } from '~/types/videoList'
import { VideoListState } from '~/types/videoList/state'
import { RootState } from '~/types/state'
import { createRequestClient } from '~/store/common/request-client-mixin'
import { videoListFilter } from '~/types/videoList/video-list-filter'

import '@nuxtjs/axios'

const actions: ActionTree<VideoListState, RootState> = {
  /** 初期情報取得 */
  async discribe({ commit }, payload: videoListFilter) {
    const cookies = new Cookies()
    const client = createRequestClient(this.$axios, cookies, this)
    const res: MetaTransfer = await client.get(payload.uri, payload.params)
    commit('meta', { meta: res })
    commit('items', { items: res.items })
  },
  async more({ commit }, payload: videoListFilter) {
    const cookies = new Cookies()
    const client = createRequestClient(this.$axios, cookies, this)
    const res: MetaTransfer = await client.get(payload.uri, payload.params)
    const morePayload = {
      items: res.items,
      isMore: true
    }
    commit('meta', { meta: res })
    commit('items', { items: morePayload })
  },
  // 詳細画面
  async findVideo({ commit }, payload) {
    const cookies = new Cookies()
    const client = createRequestClient(this.$axios, cookies, this)
    const res = await client.get(payload.uri)
    const params = {
      ...res.video_list
    }
    params.isFavorite = res.is_favorite || false
    commit('item', { payload: params })
  },
  // 関連動画
  async fetchRelatedVideos({ commit }, payload) {
    const cookies = new Cookies()
    const client = createRequestClient(this.$axios, cookies, this)
    const res = await client.get(payload.uri)
    commit('mutateRelatedVideos', { payload: res })
  },
  // 検索
  async searchVideos({ commit }, payload: videoListFilter) {
    const cookies = new Cookies()
    const client = createRequestClient(this.$axios, cookies, this)
    const res = await client.get(payload.uri, payload.params)
    commit('searchMeta', { meta: res })
    commit('searchItems', { items: res.items })
  },
  async searchMore({ commit }, payload: videoListFilter) {
    const cookies = new Cookies()
    const client = createRequestClient(this.$axios, cookies, this)
    const res: MetaTransfer = await client.get(payload.uri, payload.params)
    const morePayload = {
      items: res.items,
      isMore: true
    }
    commit('searchMeta', { meta: res })
    commit('searchItems', { items: morePayload })
  },
  async toggleFavorite({ commit }, payload) {
    const cookies = new Cookies()
    const client = createRequestClient(this.$axios, cookies, this)
    const res = await client.post(payload.uri)
    commit('mutateToggleFavorite', { isFavorite: res.is_favorite })
  },
  // お気に入り
  async fetchFavoriteVideos({ commit }, payload) {
    const cookies = new Cookies()
    const client = createRequestClient(this.$axios, cookies, this)
    const res = await client.get(payload.uri)
    commit('mutateFavoriteVideos', { favoriteItems: res.items })
  }
}

export default actions
