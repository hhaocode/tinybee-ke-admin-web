import { login, administrator, logout, getMenuInfo } from '@/api/app'
// import { mockMenus } from '../../mock/app'
import { setToken, removeToken } from '@/utils/auth'
import {
  listToMapHandler,
  treeNodeToArrForChildToParentReverse
} from '@/utils/handler'

const state = {
  hasLogo: true,
  hasNavTab: true,
  hasFooter: false,
  isCollapse: false,
  uniqueOpened: false,
  settingDrawer: false,
  menuTree: [],
  defaultActive: '/dashboard',
  visitedViews: [{
    path: '/dashboard',
    fullPath: '/dashboard',
    // component: Dashboard,
    title: 'Dashboard',
    name: 'Dashboard',
    meta: { title: 'Dashboard' }
  }],
  cachedViews: [],
  token: '',
  administrator: '',
  menuTreeMap: {},
  breadcrumbNav: [],
  transitionName: 'slide-right' // 'slide-left'
}

const mutations = {
  toggleLogo: state => {
    state.hasLogo = !state.hasLogo
  },
  togglehNavTab: state => {
    state.hasNavTab = !state.hasNavTab
  },
  toggleFooter: state => {
    state.hasFooter = !state.hasFooter
  },
  toggleMenu: state => {
    state.isCollapse = !state.isCollapse
  },
  toggleSetting: state => {
    state.settingDrawer = !state.settingDrawer
  },
  fillMenuTreeInfo: (state, menuTreeInfo) => {
    state.menuTree = menuTreeInfo.menuTree
    state.menuTreeMap = listToMapHandler(menuTreeInfo.allMenuTree, 'permissionCode')
  },
  activeMenu: (state, visit) => {
    state.defaultActive = visit.path
    state.breadcrumbNav = treeNodeToArrForChildToParentReverse(
      state.menuTreeMap[visit.name]
    )
  },
  defaultOpenMenu: (state, menu) => {
    state.visitedViews = [menu]
    state.defaultActive = menu.path
  },
  addVisit: (state, visit) => {
    if (state.visitedViews.some(v => v.name === visit.name)) {
      return
    }
    state.visitedViews.push(
      Object.assign({}, visit, {
        title: visit.meta.title || visit.title
      })
    )
    // 面包屑导航
    // console.log('state.breadcrumbNav ==> ', state.breadcrumbNav)
  },
  removeVisit: (state, visit) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.name === visit.name) {
        state.visitedViews.splice(i, 1)
        break
      }
      // const lastNav = this.navs.splice(-1)[0]
    }
  },
  removeAllVisit: (state) => {
    state.visitedViews = [state.visitedViews[0]]
  },
  setLoginInfo: (state, loginResult) => {
    state.token = loginResult.token
    setToken(loginResult.token)
    // 其他信息
    state.administrator = loginResult.user
  },
  setToken: (state, token) => {
    state.token = token
  },
  setAdministrator: (state, administrator) => {
    state.administrator = administrator
  },
  removeLoginInfo: state => {
    state.token = ''
    state.administrator = ''
    removeToken()
  }
}

const actions = {
  toggleLogo ({ commit }) {
    commit('toggleLogo')
  },
  togglehNavTab ({ commit }) {
    commit('togglehNavTab')
  },
  toggleFooter ({ commit }) {
    commit('toggleFooter')
  },
  toggleMenu ({ commit }) {
    commit('toggleMenu')
  },
  toggleSetting ({ commit }) {
    commit('toggleSetting')
  },
  refreshPermission ({ commit }) {
    return new Promise((resolve, reject) => {
      getMenuInfo().then(res => {
        const menuTreeInfo = res.data || { menuTree: [], allMenuTree: [] }
        commit('fillMenuTreeInfo', menuTreeInfo)
      })
    })
  },
  initMenuTree ({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      getMenuInfo()
        .then(res => {
          const menuTreeInfo = res.data || { menuTree: [], allMenuTree: [] }
          commit('fillMenuTreeInfo', menuTreeInfo)
          menuTreeInfo.menuTree.forEach(menu => {
            if (menu.name === 'Dashboard') {
              commit('defaultOpenMenu', menu)
              return false
            }
          })
          resolve(resolve)
        })
        .catch(e => {
          commit('fillMenuTreeInfo', { menuTree: [], allMenuTree: [] })
          reject(e)
        })
    })
  },
  reourceChangeTrigger () {},
  activeMenu ({ commit }, index) {
    commit('activeMenu', { path: index })
  },
  addVisit ({ commit }, visit) {
    commit('addVisit', visit)
    commit('activeMenu', visit)
  },
  removeVisit ({ commit, state }, visit) {
    return new Promise(resolve => {
      commit('removeVisit', visit)
      resolve([...state.visitedViews])
    })
  },
  removeAllVisit  ({ commit, state }) {
    return new Promise(resolve => {
      commit('removeAllVisit')
      commit('activeMenu', state.visitedViews[0])
      resolve([...state.visitedViews])
    })
  },
  login ({ commit }, loginInfo) {
    return new Promise((resolve, reject) => {
      login(loginInfo)
        .then(res => {
          if (res.code === 0) {
            commit('setLoginInfo', res.data)
            resolve(res)
          } else {
            reject(new Error())
          }
        })
        .catch(err => {
          reject(err)
        })
      // 请求登录
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(res => {
          commit('removeLoginInfo')
          setTimeout(() => {
            window.location.href = '/login'
          }, 500)
          // resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  setToken ({ commit }, token) {
    return new Promise((resolve, reject) => {
      commit('setToken', token)
      administrator()
        .then(res => {
          commit('setAdministrator', res.data)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  removeLoginInfo ({ commit }) {
    commit('removeLoginInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
