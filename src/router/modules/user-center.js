// 基础路由
const dynRoutes = [
  {
    path: '/user-center',
    component: () => import('@/views/user-center'),
    name: 'user-center',
    meta: { title: '学员' },
    redirect: '/user-center/user-manage',
    children: [
      {
        path: 'user-manage',
        component: () => import('@/views/user-center/user-manage'),
        name: 'user-manage',
        meta: { title: '学员管理' }
      },
      {
        path: 'lecturer-manage',
        component: () => import('@/views/user-center/lecturer-manage'),
        name: 'lecturer-manage',
        meta: { title: '讲师管理' }
      },
      {
        path: 'study-overview',
        component: () => import('@/views/user-center/study-overview'),
        name: 'study-overview',
        meta: { title: '学习概览' }
      }
    ]
  }
]

export default dynRoutes
