import '@nuxtjs/axios'
export class RequestClient {
  axios: any
  constructor(axios) {
    this.axios = axios
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

  async retry(err) {}
}
export function createRequestClient(axios) {
  // ③
  return new RequestClient(axios)
}
