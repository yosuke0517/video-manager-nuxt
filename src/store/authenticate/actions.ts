import { ActionTree } from 'vuex'
import { AuthenticatetState } from '~/types/authenticate/state'
import { RootState } from '~/types/state'
import fireApp from '~/plugins/firebase'
import '@nuxtjs/axios'
// eslint-disable-next-line import/order
import Cookies from 'universal-cookie'

const actions: ActionTree<AuthenticatetState, RootState> = {
  async signUp({ commit }, payload) {
    await fireApp
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
    const res = await fireApp
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
    const token = await res.user.getIdToken()
    const cookies = new Cookies()
    cookies.set('jwt_token', JSON.stringify(token))

    // リフレッシュトークンを取得しcookieにセット
    const refreshToken = res.user.refreshToken
    cookies.set('refresh_token', refreshToken)
    commit('token', { token })
    this.$router.push('/')
  },
  async login({ commit }, payload) {
    const res = await fireApp
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
    const token = await res.user.getIdToken()
    const cookies = new Cookies()
    cookies.set('jwt_token', JSON.stringify(token))
    // リフレッシュトークンを取得しcookieにセット
    const refreshToken = res.user.refreshToken
    cookies.set('refresh_token', refreshToken)
    commit('token', { token })
    this.$router.push('/')
  },
  async logout({ commit }) {
    await fireApp.auth().signOut()
    commit('token', { token: null })
    const cookies = new Cookies()
    cookies.remove('jwt_token')
    this.$router.push('/login')
  },
  setToken({ commit }, token) {
    commit('token', { token })
  }
}

export default actions
