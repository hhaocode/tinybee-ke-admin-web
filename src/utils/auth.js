import Cookies from 'js-cookie'

const TOKEN_KEY = 'arcus_ke_admin_token'

export function getToken () {
  return Cookies.get(TOKEN_KEY)
}

export function setToken (token) {
  return Cookies.set(TOKEN_KEY, token)
}

export function removeToken () {
  return Cookies.remove(TOKEN_KEY)
}

export function tokenHeaders (headers) {
  headers = headers || {}
  headers.Authorization = getToken()
  return headers
}
