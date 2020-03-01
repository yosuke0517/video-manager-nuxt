import { Module } from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import { AuthenticatetState } from '~/types/authenticate/state'
import { RootState } from '~/types/state'

const state: AuthenticatetState = {
  token: null
}

const videoList: Module<AuthenticatetState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default videoList
