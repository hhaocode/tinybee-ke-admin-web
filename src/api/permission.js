import http from '@/utils/http'

/**
 * 用户相关
 */
// 获取当前用户已有的资源树
export function getAccessResourceTree () {
  return http.get('/auth/resource/tree')
}

export function getAccessRoleList () {
  return http.get('/auth/role/list')
}

/**
 * 权限资源相关
 *
 */
export function saveResource (param) {
  return http.post('/system-resource/save', param)
}

export function deleteResourceById (id) {
  return http.delete(`/system-resource/${id}`)
}

export function getResourceById (id) {
  return http.get(`/system-resource/${id}`)
}

export function getResourceTree (param) {
  return http.get('/system-resource/tree', { params: param })
}

export function getResourceTableTree (param) {
  return http.get('/system-resource/table-tree', { params: param })
}

/**
 * 角色相关
 *
 */
export function saveRole (param) {
  return http.post('/system-role/save', param)
}

export function deleteRoleById (id) {
  return http.delete(`/system-role/${id}`)
}

export function getRoleById (id) {
  return http.get(`/system-role/${id}`)
}

export function listRole (param) {
  return http.get('/system-role/list', { params: param })
}

export function switchRoleAvaliable (param) {
  return http.put(`/system-role/${param.id}`, param)
}

export function pageRole (param) {
  return http.get('/system-role/page', { params: param })
}

export function saveRoleResources (param) {
  return http.put('/system-role/save/role-resources', param)
}

// 获取角色已有的资源
export function getRoleResourceIds (id) {
  return http.get(`/system-role/resource-ids/${id}`)
}

/**
 * 系统用户管理
 *
 */
export function saveUser (param) {
  return http.post('/system-user', param)
}

export function switchUserAvaliable (param) {
  return http.put(`/system-user/${param.id}`, param)
}

/**
 * 岗位相关
 *
 */
export function savePost (param) {
  return http.post('/system-post/save', param)
}

export function deletePostById (id) {
  return http.delete(`/system-post/${id}`)
}

export function getPostById (id) {
  return http.get(`/system-post/${id}`)
}

export function listPost (param) {
  return http.get('/system-post/list', { params: param })
}

export function switchPostAvaliable (param) {
  return http.put(`/system-post/${param.id}`, param)
}

export function pagePost (param) {
  return http.get('/system-post/page', { params: param })
}

/**
 * 部门相关
 *
 */
export function saveDept (param) {
  return http.post('/system-dept/save', param)
}

export function deleteDeptById (id) {
  http.delete(`/system-dept/${id}`)
}

export function getDeptById (id) {
  http.get(`/system-dept/${id}`)
}

export function getDeptTree (param) {
  return http.get('/system-dept/tree', { params: param })
}

export function getDeptTableTree (param) {
  return http.get('/system-dept/table-tree', { params: param })
}

/**
 * 员工
 */
export function saveEmp (param) {
  return http.post('/system-emp/save', param)
}

export function deleteEmpById (id) {
  return http.delete(`/system-emp/${id}`)
}

export function getEmpById (id) {
  return http.get(`/system-emp/${id}`)
}

export function listEmp (param) {
  return http.get('/system-emp/list', { params: param })
}

// export function switchEmpAvaliable (param) {
//   return http.put(`/system-emp/${param.id}`, param)
// }

export function pageEmp (param) {
  return http.get('/system-emp/page', { params: param })
}

export function turnLecturer (params) {
  return http.post(`/system-emp/turn-lecturer/${params.empId}`, params)
}

/**
 * 用户相关
 */

export function createUser (id) {
  return http.get(`/system-user/create/${id}`)
}

export function pageUser (param) {
  return http.get('/system-user/page', { params: param })
}

export function getUserRoleIds (id) {
  return http.get(`/system-user/role-ids/${id}`)
}

export function saveUserRoles (param) {
  console.log('param=>', param)
  return http.put('/system-user/save/user-roles', param)
}

export function pageDict (param) {
  return http.get('/base/dict/page', { params: param })
}

export function saveDict (param) {
  return http.post('/base/dict/save', param)
}

export function saveDictItemBatch (param) {
  return http.post(`/base/dict-item/saveBatch/${param.id}`, param.dictItems)
}
