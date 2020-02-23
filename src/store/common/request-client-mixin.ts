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
    return await this.axios.$get(query)
  }
}
export function createRequestClient(axios) {
  // ③
  return new RequestClient(axios)
}
