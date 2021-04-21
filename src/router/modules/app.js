import Dashboard from '@/views/dashboard/Dashboard'

// 基础路由
const dynRoutes = [
  {
    path: '/',
    component: Dashboard,
    name: 'default',
    redirect: '/dashboard',
    meta: { title: '小蜜蜂课堂' }
  },
  {
    path: '/dashboard',
    component: Dashboard,
    name: 'Dashboard',
    meta: { title: 'Dashboard' }
  },
  {
    path: '/user-info',
    component: () => import('@/views/auth/user-info'),
    name: '个人信息',
    meta: { title: '个人信息' }
  }
]

export default dynRoutes
