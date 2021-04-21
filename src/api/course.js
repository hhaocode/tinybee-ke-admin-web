import http from '@/utils/http'

export function categoryTableTree (params) {
  return http.get('/cms/category/table-tree', { params })
}

export function getCategoryTree () {
  return http.get('/cms/category/tree')
}

export function saveCategory (params) {
  return http.post('/cms/category/save', params)
}

export function saveCourse (params) {
  return http.post('/cms/course/save', params)
}

export function pageCourse (params) {
  return http.get('/cms/course/page', { params })
}

export function getCourseById (id) {
  return http.get(`/cms/course/get/${id}`)
}

export function saveChapter (params) {
  return http.post('/cms/chapter/save', params)
}

export function deleteChapterById (id) {
  return http.delete(`/cms/chapter/delete/${id}`)
}

export function getChapterPeriodsByCourseId (courseId) {
  return http.get(`/cms/chapter/periods/${courseId}`)
}

export function savePeriod (params) {
  return http.post('/cms/period/save', params)
}

export function deletPeriodById (id) {
  return http.delete(`/cms/period/delete/${id}`)
}
