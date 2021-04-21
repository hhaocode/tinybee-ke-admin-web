
// 基础路由
const dynRoutes = [
  {
    path: '/devops',
    component: () => import('@/views/devops'),
    name: 'devops',
    meta: { title: '运维' },
    redirect: '/devops/dictionary-manage',
    children: [
      {
        path: 'dictionary-manage',
        component: () => import('@/views/devops/dictionary-manage'),
        name: 'dictionary-manage',
        meta: { title: '字典' }
      },
      {
        path: 'service-monitor',
        component: () =>
          import('@/views/devops/service-monitor'),
        name: 'service-monitor',
        meta: { title: '服务监控' }
      },
      {
        path: 'druid-monitor',
        component: () =>
          import('@/views/devops/druid-monitor'),
        name: 'druid-monitor',
        meta: { title: 'Druid监控' }
      }
    ]
  }
]

export default dynRoutes
