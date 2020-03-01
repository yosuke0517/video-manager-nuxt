import { MutationTree } from 'vuex'
import { AuthenticatetState } from '~/types/authenticate/state'

const mutations: MutationTree<AuthenticatetState> = {
  /** 初期表示時情報 */
  token(state, { token }) {
    state.token = token
  }
}

export default mutations
