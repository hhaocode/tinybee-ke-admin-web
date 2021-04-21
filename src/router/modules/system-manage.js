
// 基础路由
const dynRoutes = [
  {
    path: '/system-manage',
    component: () => import('@/views/system-manage'),
    name: 'system-manage',
    meta: { title: '系统管理' },
    redirect: '/system-manage/user-manage',
    children: [
      {
        path: 'user-manage',
        component: () =>
          import('@/views/system-manage/user-manage'),
        name: 'system-user-manage',
        meta: { title: '系统用户管理' }
      },
      {
        path: 'role-manage',
        component: () =>
          import('@/views/system-manage/role-manage'),
        name: 'role-manage',
        meta: { title: '角色管理' }
      },
      {
        path: 'permission-manage',
        component: () =>
          import('@/views/system-manage/permission-manage'),
        name: 'permission-manage',
        meta: { title: '权限管理' }
      },
      {
        path: 'dept-manage',
        component: () =>
          import('@/views/system-manage/dept-manage'),
        name: 'dept-manage',
        meta: { title: '部门管理' }
      },
      {
        path: 'post-manage',
        component: () =>
          import('@/views/system-manage/post-manage'),
        name: 'post-manage',
        meta: { title: '岗位管理' }
      },
      {
        path: 'emp-manage',
        component: () =>
          import('@/views/system-manage/emp-manage'),
        name: 'emp-manage',
        meta: { title: '员工管理' }
      },
      {
        path: 'operation-log',
        component: () =>
          import('@/views/system-manage/operation-log'),
        name: 'operation-log',
        meta: { title: '操作日志' }
      },
      {
        path: 'system-setting',
        component: () =>
          import('@/views/system-manage/system-setting'),
        name: 'system-setting',
        meta: { title: '系统设置' }
      }
    ]
  }
]

export default dynRoutes
