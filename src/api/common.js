import http from '@/utils/http'

export const materialGroups = (type) => {
  return http.get(`/material/group/list/${type}`)
}

export const materialMapGroups = (type) => {
  return http.get(`/material/group/map/${type}`)
}
