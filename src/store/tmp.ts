export class RequestClient {
  async get(uri, params = {}) {
    // ①
    const queryString = Object.keys(params)
      .map((key) => key + '=' + params[key])
      .join('&') // ②
    const query = queryString.length > 0 ? `${uri}?${queryString}` : uri
    return await this.$axios.$get(query)
  }
}
export function createRequestClient(axios) {
  // ③
  return new RequestClient(axios)
}
