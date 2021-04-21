export default [
  {
    path: '/data-center',
    component: () => import('@/views/data-center'),
    name: 'data-center',
    meta: { title: '数据中心' },
    redirect: '/data-center/user-manage',
    children: [
      {
        path: 'data-survey',
        component: () => import('@/views/data-center/data-survey'),
        name: 'data-survey',
        meta: { title: '数据总览' }
      }
    ]
  }
]
