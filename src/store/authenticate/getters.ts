import { GetterTree } from 'vuex'
import { AuthenticatetState } from '~/types/authenticate/state'
import { RootState } from '~/types/state'

const getters: GetterTree<AuthenticatetState, RootState> = {
  token: (state) => state.token,
  isLoggedIn: (state) => state.isLoggedIn
}

export default getters
