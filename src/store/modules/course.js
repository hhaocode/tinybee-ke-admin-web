import {
  categoryTableTree,
  getCategoryTree,
  saveCategory,
  saveCourse,
  pageCourse,
  getCourseById,
  saveChapter,
  getChapterPeriodsByCourseId,
  savePeriod,
  deletePeriodById,
  deleteChapterById
} from '@/api/course'
const state = {
  categoryTree: []
}

const mutations = {
  setCategoryTree: (state, categoryTree) => {
    state.categoryTree = categoryTree
  }
}

const actions = {
  categoryTableTree ({ commit }, params) {
    return new Promise((resolve, reject) => {
      categoryTableTree(params)
        .then(res => {
          resolve(res)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  getCategoryTree ({ commit }) {
    return new Promise((resolve, reject) => {
      getCategoryTree()
        .then(res => {
          if (res.code === 0) {
            resolve(res.data)
            commit('setCategoryTree', res.data)
          } else {
            resolve([])
          }
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  saveCategory ({ commit }, params) {
    return new Promise((resolve, reject) => {
      saveCategory(params)
        .then(res => {
          resolve(res)
        })
        .catch(e => {
          reject(e)
        })
    })
  },

  saveCourse ({ commit }, params) {
    return new Promise((resolve, reject) => {
      saveCourse(params)
        .then(res => {
          resolve(res)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  pageCourse ({ commit }, params) {
    return new Promise((resolve, reject) => {
      pageCourse(params)
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
  getCourseById ({ commit }, params) {
    return new Promise((resolve, reject) => {
      getCourseById(params)
        .then(res => {
          resolve(res)
        })
        .catch(e => {
          reject(e)
        })
    })
  },

  saveChapter ({ commit }, params) {
    return new Promise((resolve, reject) => {
      saveChapter(params)
        .then(res => {
          resolve(res)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  deleteChapterById ({ commit }, id) {
    return new Promise((resolve, reject) => {
      deleteChapterById(id)
        .then(res => {
          resolve(res)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  getChapterPeriodsByCourseId ({ commit }, contentId) {
    return new Promise((resolve, reject) => {
      getChapterPeriodsByCourseId(contentId)
        .then(res => {
          resolve(res)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  savePeriod ({ commit }, params) {
    return new Promise((resolve, reject) => {
      savePeriod(params)
        .then(res => {
          resolve(res)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  deletePeriodById ({ commit }, id) {
    return new Promise((resolve, reject) => {
      deletePeriodById(id)
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
