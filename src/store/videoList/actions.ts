import { ActionTree } from 'vuex'
import { MetaTransfer } from '~/types/videoList'
import { VideoListState } from '~/types/videoList/state'
import { RootState } from '~/types/state'
import { createRequestClient } from '~/store/common/request-client-mixin'
import { videoListFilter } from '~/types/videoList/video-list-filter'

import '@nuxtjs/axios'

const actions: ActionTree<VideoListState, RootState> = {
  /** 初期情報取得 */
  async discribe({ commit }, payload: videoListFilter) {
    // const response = await this.$axios.$get<MetaTransfer>(
    //   '/sikbtmkmegh/meta'
    // )
    const client = createRequestClient(this.$axios)
    const res: MetaTransfer = await client.get(payload.uri, payload.params)
    // const response = await this.$axios.$get<MetaTransfer>('/video-list')
    commit('meta', { meta: res })
    commit('items', { items: res.items })
  }
}

export default actions
