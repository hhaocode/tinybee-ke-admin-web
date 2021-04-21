import axios from 'axios'
import store from '@/store'
import { getToken } from './auth'
import { Notification } from 'element-ui'
// Loading
import qs from 'qs'

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API + process.env.VUE_APP_BASE_API_PREFIX,
  timeout: 100000 // 10秒
})

// const loadingOptions = {
//   lock: true,
//   text: '正在请求',
//   spinner: 'el-icon-loading',
//   background: 'rgba(0, 0, 0, 0.5)'
//   // target: '#_app-main'
// }

// var loadingInstance

http.interceptors.request.use(
  config => {
    // can set some setting before request is sent
    // get token for authentication
    const token = getToken()
    if (token) {
      config.headers.Authorization = token
    }
    // config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    if (config.method === 'get' || config.method === 'delete') {
      config.paramsSerializer = function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    }

    // config.headers['x-access-token'] = ''
    // loadingOptions.target = '#_app-main'
    // loadingInstance = Loading.service(loadingOptions)

    return config
  },
  error => {
    console.log('request error: => ', error)
    return Promise.reject(error)
  }
)
const NO_DATA_FOUND = 'not data found'
const UNAUTHENTICATION = 'unauthentication'
/**
 * 401未登录或者登录失效
 * 402无权访问
 * 0 成功
 * 1 业务失败
 * 500 服务器错误
 */
http.interceptors.response.use(
  response => {
    // loadingInstance.close()
    const res = response.data
    if (!res) {
      Notification.warning('服务器无数据')
      return Promise.reject(NO_DATA_FOUND)
    }
    // 401
    if (res.code === 401) {
      Notification.error(res.message)
      store.dispatch('app/removeLoginInfo')
      setTimeout(() => {
        window.location.href = '/login'
      }, 500)
      return Promise.reject(UNAUTHENTICATION)
    }
    if (res.code === 402) {
      // 无权操作
    }
    if (res.code === 1) {
      Notification.error(res.message)
    }
    if (res.code === 500) {
      Notification.error('服务器错误')
    }
    return res
  },
  error => {
    // loadingInstance.close()
    Notification.error('服务不可用')
    console.log('response error: => ', error)
    // UI notice
    return Promise.reject(error)
  }
)

export default http
