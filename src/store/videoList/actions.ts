import { ActionTree } from 'vuex'
import { DescribeTransfer } from '~/types/videoList'
import { VideoListState } from '~/types/videoList/state'
import { RootState } from '~/types/state'
import '@nuxtjs/axios'

const actions: ActionTree<VideoListState, RootState> = {
  /** 初期情報取得 */
  async describe({ commit }) {
    // const response = await this.$axios.$get<DescribeTransfer>(
    //   '/sikbtmkmegh/describe'
    // )
    const response = await this.$axios.$get<DescribeTransfer>('/video-list')
    commit('describe', { describe: response })
  }
}

export default actions
