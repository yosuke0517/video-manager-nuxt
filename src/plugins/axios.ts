import Cookies from 'universal-cookie'

export default ({ $axios, req }) => {
  // リクエスト時にクッキーからトークンを取得してヘッダーにセットするß
  $axios.onRequest((config) => {
    let token
    if (process.browser) {
      const Allcookies = document.cookie // 全てのcookieを取り出して
      const cookiesArray = Allcookies.split(';') // ;で分割し配列に
      for (const c of cookiesArray) {
        // 一つ一つ取り出して
        const cArray = c.split('=') // さらに=で分割して配列に
        if (cArray[0] === 'jwt_token') {
          // 取り出したいkeyと合致したら
          const cookies = new Cookies(cArray)
          token = cookies.get('jwt_token')
        }
      }
    } else {
      const cookies = new Cookies(req.headers.cookie)
      token = cookies.get('jwt_token')
    }

    if (token) {
      // サーバサイドでtokenを検証する（firebase）
      config.headers.common.Authorization = `Bearer ${token}`
    }
  })
}
