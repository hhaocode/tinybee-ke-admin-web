import http from '@/utils/http'

export function pageLecturer (params) {
  return http.get('/ums/lecturer/page', { params })
}
