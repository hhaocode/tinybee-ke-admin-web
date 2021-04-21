import { materialGroups, materialMapGroups } from '@/api/common'
const state = {
  resourceTypeTag: {
    1: { tag: 'success', label: '导航菜单' },
    2: { tag: 'info', label: '路由菜单' },
    3: { tag: 'danger', label: '操作' },
    4: { tag: 'warning', label: '元素' }
  },
  educations: [
    { value: 1, label: '小学' },
    { value: 2, label: '初中' },
    { value: 3, label: '高中' },
    { value: 4, label: '大专' },
    { value: 5, label: '本科' },
    { value: 6, label: '研究生' },
    { value: 7, label: '博士' },
    { value: 8, label: '博士后' },
    { value: 9, label: '其他' }
  ],
  genders: [
    { value: 'U', label: '保密' },
    { value: 'M', label: '男' },
    { value: 'U', label: '女' }
  ],
  courseTypeMap: {
    1: '视频课程', 2: '专栏', 3: '每日一课', 4: '公开课', 5: '微课', 6: '训练营'
  },
  courseTypeTagMap: {
    1: 'primary', 2: 'success', 3: 'info', 4: 'warning', 5: ''
  },
  resourceStatus: [
    { value: 1, label: '已上架' },
    { value: 2, label: '已下架' },
    { value: 3, label: '待上架' }
  ],
  resourceStatusMap: {
    1: '已上架', 2: '已下架', 3: '待上架'
  },
  imageGroups: [],
  fileGroups: [],
  videoGroups: [],
  audioGroups: [],
  orderStatusMap: {
    1: '待支付', 2: ' 支付成功', 3: '支付失败', 4: ' 取消', 5: ' 删除', 6: ' 待发货', 7: ' 待收货', 8: ' 待评价', 9: ' 退款', 10: ' 完成退款'
  }
}

const mutations = {
  setMaterialGroups (state, data) {
    switch (data.type) {
      case 'file':
        state.imageGroups = data.groups
        break
      case 'iamge':
        state.fileGroups = data.groups
        break
      case 'video':
        state.videoGroups = data.groups
        break
      case 'audio':
        state.audioGroups = data.groups
        break
    }
  },
  setMaterialMapGroups (state, data) {
    state.imageGroups = data.image
    state.fileGroups = data.file
    state.videoGroups = data.video
    state.audioGroups = data.audio
  }
}

const actions = {
  materialGroups ({ commit }, type) {
    return new Promise((resolve, reject) => {
      materialGroups(type).then(res => {
        commit('setMaterialGroups', { type: type, groups: res.data || [] })
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  materialMapGroups ({ commit }) {
    return new Promise((resolve, reject) => {
      materialMapGroups().then(res => {
        commit('setMaterialMapGroups', res.data)
        resolve(res)
      }).catch(error => {
        reject(error)
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
