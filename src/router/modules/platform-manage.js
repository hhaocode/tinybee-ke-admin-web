// 基础路由
const dynRoutes = [
  {
    path: '/platform-manage',
    component: () => import('@/views/platform-manage'),
    name: 'platform-manage',
    meta: { title: '用户' },
    redirect: '/platform-manage/platform-info',
    children: [
      {
        path: 'platform-info',
        component: () => import('@/views/platform-manage/platform-info'),
        name: 'platform-info',
        meta: { title: '平台信息' }
      },
      {
        path: 'theme',
        component: () => import('@/views/platform-manage/theme'),
        name: 'theme',
        meta: { title: '主题' }
      },
      {
        path: 'download-center',
        component: () => import('@/views/platform-manage/download-center'),
        name: 'download-center',
        meta: { title: '下载中心' }
      },
      {
        path: 'home-decoration',
        component: () => import('@/views/platform-manage/home-decoration'),
        name: 'home-decoration',
        meta: { title: '首页装修' },
        redirect: '/platform-manage/home-decoration/pc-home-decoration',
        children: [
          {
            path: 'pc-home-decoration',
            component: () => import('@/views/platform-manage/home-decoration/pc-home-decoration'),
            name: 'pc-home-decoration',
            meta: { title: 'PC首页装修' }
          },
          {
            path: 'app-home-decoration',
            component: () => import('@/views/platform-manage/home-decoration/app-home-decoration'),
            name: 'app-home-decoration',
            meta: { title: 'APP首页装修' }
          },
          {
            path: 'h5-home-decoration',
            component: () => import('@/views/platform-manage/home-decoration/h5-home-decoration'),
            name: 'h5-home-decoration',
            meta: { title: 'H5首页装修' }
          },
          {
            path: 'mp-home-decoration',
            component: () => import('@/views/platform-manage/home-decoration/mp-home-decoration'),
            name: 'mp-home-decoration',
            meta: { title: '小程序首页装修' }
          }
        ]

      }
    ]
  }
]

export default dynRoutes
