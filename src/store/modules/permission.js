import {
  getAccessRoleList,
  getAccessResourceTree,
  getRoleResourceIds,
  saveResource,
  deleteResourceById,
  getResourceTree,
  getResourceTableTree,
  pageRole,
  saveRole,
  deleteRoleById,
  saveRoleResources,
  pagePost,
  savePost,
  listPost,
  saveDept,
  getDeptTree,
  getDeptTableTree,
  saveEmp,
  pageEmp,
  deleteEmpById,
  turnLecturer,
  createUser,
  pageUser,
  getUserRoleIds,
  saveUserRoles,
  pageDict,
  saveDict,
  saveDictItemBatch
} from '@/api/permission'
import { Notification } from 'element-ui'
const state = {
  resourceTree: [],
  resourceTableTree: [],
  deptTree: [],
  deptTableTree: [],
  accessResourceTree: [],
  accessRoleList: [],
  postList: []
}

const mutations = {
  setAccessResourceTree: (state, accessResourceTree) => {
    state.accessResourceTree = accessResourceTree
  },
  setAccessRoleList: (state, accessRoleList) => {
    state.accessRoleList = accessRoleList
  },
  setResourceTree: (state, resourceTree) => {
    state.resourceTree = resourceTree
  },
  setResourceTableTree: (state, resourceTableTree) => {
    state.resourceTableTree = resourceTableTree
  },
  setDeptTree: (state, deptTree) => {
    state.deptTree = deptTree
  },
  setDeptTableTree: (state, deptTableTree) => {
    state.deptTableTree = deptTableTree
  },
  setPostList: (state, postList) => {
    state.postList = postList
  }
}

const actions = {
  getAccessRoleList ({ commit }) {
    return new Promise((resolve, reject) => {
      getAccessRoleList()
        .then(res => {
          if (res.code === 0) {
            commit('setAccessRoleList', res.data)
          }
          resolve(res.data || [])
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  getAccessResourceTree ({ commit }) {
    return new Promise((resolve, reject) => {
      getAccessResourceTree()
        .then(res => {
          if (res.code === 0) {
            commit('setAccessResourceTree', res.data)
          }
          resolve(res.data || [])
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  /**
   * 资源
   */
  saveResource ({ commit }, param) {
    return new Promise((resolve, reject) => {
      saveResource(param)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  deleteResourceById ({ commit }, id) {
    return new Promise((resolve, reject) => {
      deleteResourceById(id)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getResourceTree ({ commit }, param) {
    return new Promise((resolve, reject) => {
      getResourceTree()
        .then(res => {
          if (res.code === 0) {
            commit('setResourceTree', res.data)
          }
          resolve(res.data || [])
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  getResourceTableTree ({ commit }, param) {
    return new Promise((resolve, reject) => {
      getResourceTableTree()
        .then(res => {
          if (res.code === 0) {
            commit('setResourceTableTree', res.data)
          }
          resolve(res.data || [])
        })
        .catch(e => {
          reject(e)
        })
    })
  },

  /**
   * 角色
   */
  saveRole ({ commit }, param) {
    return new Promise((resolve, reject) => {
      saveRole(param)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  pageRole ({ commit }, param) {
    return new Promise((resolve, reject) => {
      pageRole(param)
        .then(res => {
          if (res.code === 0) {
            resolve(res.data)
          } else {
            Notification.error(res.message)
          }
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  deleteRoleById ({ commit }, id) {
    return new Promise((resolve, reject) => {
      deleteRoleById(id)
        .then(res => {
          if (res.code === 0) {
            resolve(res)
          }
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  saveRoleResources ({ commit }, param) {
    return new Promise((resolve, reject) => {
      saveRoleResources(param)
        .then(res => {
          resolve(res)
        })
        .catch(e => {
          reject(e)
        })
    })
  },

  getRoleResourceIds ({ commit }, id) {
    return new Promise((resolve, reject) => {
      getRoleResourceIds(id)
        .then(res => {
          if (res.code === 0) {
            resolve(res.data)
          }
        })
        .catch(e => {
          reject(e)
        })
    })
  },

  /**
   * 岗位
   */
  savePost ({ commit }, param) {
    return new Promise((resolve, reject) => {
      savePost(param)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  pagePost ({ commit }, param) {
    return new Promise((resolve, reject) => {
      pagePost(param)
        .then(res => {
          if (res.code === 0) {
            resolve(res.data)
          } else {
            Notification.error(res.message)
          }
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  listPost ({ commit }) {
    return new Promise((resolve, reject) => {
      listPost()
        .then(res => {
          if (res.code === 0) {
            commit('setPostList', res.data)
          }
        })
        .catch(e => {
          reject(e)
        })
    })
  },

  /**
   * 部门
   */
  saveDept ({ commit }, param) {
    return new Promise((resolve, reject) => {
      saveDept(param)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getDeptTree ({ commit }, param) {
    return new Promise((resolve, reject) => {
      getDeptTree()
        .then(res => {
          if (res.code === 0) {
            commit('setDeptTree', res.data)
          }
          resolve(res.data || [])
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  getDeptTableTree ({ commit }, param) {
    return new Promise((resolve, reject) => {
      getDeptTableTree()
        .then(res => {
          if (res.code === 0) {
            commit('setDeptTableTree', res.data)
          }
          resolve(res.data || [])
        })
        .catch(e => {
          reject(e)
        })
    })
  },

  /**
   * 员工
   */
  saveEmp ({ commit }, param) {
    return new Promise((resolve, reject) => {
      saveEmp(param)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  pageEmp ({ commit }, param) {
    return new Promise((resolve, reject) => {
      pageEmp(param)
        .then(res => {
          if (res.code === 0) {
            resolve(res.data)
          } else {
            Notification.error(res.message)
          }
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  deleteEmpById ({ commit }, id) {
    return new Promise((resolve, reject) => {
      deleteEmpById(id)
        .then(res => {
          if (res.code === 0) {
            resolve(res)
          }
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  turnLecturer ({ commit }, params) {
    return new Promise((resolve, reject) => {
      turnLecturer(params)
        .then(res => {
          if (res.code === 0) {
            resolve(res)
          }
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  /**
   * 用户相关
   */
  createUser ({ commit }, id) {
    return new Promise((resolve, reject) => {
      createUser(id)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  pageUser ({ commit }, param) {
    return new Promise((resolve, reject) => {
      pageUser(param)
        .then(res => {
          if (res.code === 0) {
            resolve(res.data)
          } else {
            resolve(res.data || {})
          }
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  getUserRoleIds ({ commit }, id) {
    return new Promise((resolve, reject) => {
      getUserRoleIds(id)
        .then(res => {
          if (res.code === 0) {
            resolve(res.data)
          }
        })
        .catch(e => {
          reject(e)
        })
    })
  },

  saveUserRoles ({ commit }, param) {
    return new Promise((resolve, reject) => {
      saveUserRoles(param)
        .then(res => {
          resolve(res)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  pageDict ({ commit }, param) {
    return new Promise((resolve, reject) => {
      pageDict(param)
        .then(res => {
          if (res.code === 0) {
            resolve(res.data)
          } else {
            resolve(res.data || {})
          }
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  saveDict ({ commit }, param) {
    return new Promise((resolve, reject) => {
      saveDict(param)
        .then(res => {
          resolve(res)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  saveDictItemBatch ({ commit }, param) {
    return new Promise((resolve, reject) => {
      saveDictItemBatch(param)
        .then(res => {
          resolve(res)
        })
        .catch(e => {
          reject(e)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
