import '@nuxtjs/axios'
import qs from 'qs'
import Cookies from 'universal-cookie'
export class RequestClient {
  axios: any
  cookies: any
  store: any
  hasRetried: boolean // リトライしたかを管理
  constructor(axios, cookies, store) {
    this.axios = axios
    this.cookies = cookies
    this.store = store
    this.hasRetried = false
  }

  async get(uri, params = {}) {
    const queryString = Object.keys(params)
      .map((key) => key + '=' + params[key])
      .join('&') // ②
    const query = queryString.length > 0 ? `${uri}?${queryString}` : uri
    // eslint-disable-next-line no-return-await
    return await this.axios.$get(query).catch((err) => {
      // トークンの有効期限が切れていたらここに入ってきて再取得をする
      return this.retry(err)
    })
  }

  async post(uri) {
    // eslint-disable-next-line no-return-await
    return await this.axios.$post(uri).catch((err) => {
      // トークンの有効期限が切れていたらここに入ってきて再取得をする
      return this.retry(err)
    })
  }

  async retry(err) {
    const code = parseInt(err.response && err.response.status)
    const cookies = new Cookies()
    const refreshToken = cookies.get('refresh_token') || null
    // ステータスコードとリフレッシュトークンの存在チェックに加え、まだリトライしていないか どうかも条件に含める。
    if (code === 401 && refreshToken && this.hasRetried === false) {
      this.hasRetried = true

      if (refreshToken) {
        const data = {
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        }
        // Firebase Auth REST API*2を使用してトークンを再取得する処理
        const res = await this.axios.$request({
          method: 'POST',
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: qs.stringify(data),
          url:
            'https://securetoken.googleapis.com/v1/token?key=' +
            process.env.YOUTUBE_API_KEY
        })

        this.store.commit('authenticate/token', res.id_token)

        // eslint-disable-next-line no-return-await
        return await this.axios.$request({
          method: err.response.config.method,
          headers: {
            Authorization: `Bearer ${res.id_token}`
          },
          url: err.response.config.url,
          data: err.response.config.data
        })
      }
    }
  }
}
export function createRequestClient(axios, cookies, store) {
  return new RequestClient(axios, cookies, store)
}

// curl 'https://securetoken.googleapis.com/v1/token?key=AIzaSyA9Pb1lqCb3HbnQ4cV4lM2G_tOviPfOyMQ' \
// -H 'Content-Type: application/x-www-form-urlencoded' \
// --data 'grant_type=refresh_token&refresh_token=AEu4IL1st-Sy37dnirYbiGmqv7MUz3zb9bSZFKNt8mkLdw4hNsf3IDuM5WSRfmIDGkN4BzC2k6oVvN0LN8aLH-Fkyrz9bbS1Azf7Bda6WtDQgCo9PC3_zKOlqdTBB15PWCW8XWjKBLaRGD50l8ynwSz63fUQnwuY0-L71qHbLO95iIvNEIzjFVqiE-rj2qXenh9-epNRwM5GpKdrfI5DFK8v62j7UjZF5Q'
