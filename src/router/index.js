import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress'
import { getToken } from '@/utils/auth'
import Layout from '@/views/layout/Layout'
import Login from '@/views/auth/Login'

const originalPush = Router.prototype.push
Router.prototype.push = function (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const modulesFiles = require.context('./modules', true, /\.js$/)
const childrenRoutes = modulesFiles.keys().reduce((routes, modulePath) => {
  routes.push(...modulesFiles(modulePath).default)
  return routes
}, [])

// const mallModulesFiles = require.context('./mall-modules', true, /\.js$/)
// const mallChildrenRoutes = mallModulesFiles.keys().reduce((routes, modulePath) => {
//   routes.push(...mallModulesFiles(modulePath).default)
//   return routes
// }, [])

const routes = [
  { path: '/login', component: Login, meta: { title: '登录' } },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: 'arcus-admin', tag: false, icon: ['fa', 'cog'] },
    children: [...childrenRoutes]
  },
  // {
  //   path: '/mall',
  //   component: () => import('@/views/mall/layout'),
  //   redirect: '/mall/dashboard',
  //   meta: { title: 'arcus-admin', tag: false, icon: ['fa', 'cog'] },
  //   children: [...mallChildrenRoutes]
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   meta: { title: 'about' },
  //   component: () => import('@/views/About')
  // },
  {
    path: '/test1',
    name: 'Test1',
    meta: { title: 'Test1' },
    component: () => import('@/views/test/Test1')
  },
  {
    path: '*',
    name: 'noFound',
    meta: { title: '404' },
    component: () => import('@/views/error/404')
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  // console.log(store)

  if (to.meta.title) {
    document.title = '小蜜蜂课堂-' + to.meta.title
  }
  NProgress.start()
  const token = getToken()

  if (token) {
    if (!store.state.app.token) {
      store.dispatch('app/setToken', token)
    }

    if (to.path === '/login') {
      next('/')
      // NProgress.done()
    } else {
      // 判断权限  如果没有权限 则跳到无权限操作页面 暂时不加权限
      next()
      // determine whether the user has obtained his permission roles through getInfo
      // const hasRoles = store.getters.roles && store.getters.roles.length > 0
      // if (hasRoles) {
      //   next()
      // } else {
      //   NProgress.done()
      // }

      // store.app.
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      // from.path !== '/login' && next('/login')
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

export default router
