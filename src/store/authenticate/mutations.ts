import { MutationTree } from 'vuex'
import Cookies from 'universal-cookie'
import { AuthenticatetState } from '~/types/authenticate/state'

const mutations: MutationTree<AuthenticatetState> = {
  /** 初期表示時情報 */
  token(state, { token }) {
    const cookies = new Cookies()
    cookies.set('jwt_token', JSON.stringify(token))
    state.token = token
  }
}

export default mutations
