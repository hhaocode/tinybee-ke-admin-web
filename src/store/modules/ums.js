import {
  pageLecturer
} from '@/api/ums'
const state = {
  categoryTree: []
}

const mutations = {
}

const actions = {
  pageLecturer ({ commit }, params) {
    return new Promise((resolve, reject) => {
      pageLecturer(params)
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
