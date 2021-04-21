import http from '@/utils/http'

// 登录
export function login (param) {
  return http.post('/auth/login', param)
}

export function logout () {
  return http.get('/auth/logout')
}

// 获取登录信息
export function administrator () {
  return http.get('/auth/administrator')
}

export function changePassword (param) {
  return http.put('/auth/changePassword', param)
}

export function getMenuTree () {
  return http.get('/auth/menuTree')
}

export function getAllMenuTree () {
  return http.get('/auth/allMenuTree')
}

export function getMenuInfo () {
  return http.get('/auth/menuInfo')
}
