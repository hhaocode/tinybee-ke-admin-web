export const mockMenus = [
  {
    id: 1,
    name: 'Dashboard',
    title: 'Dashboard',
    path: '/dashboard',
    icon: 'el-icon-s-home',
    initOpen: true
  },
  {
    id: 2,
    name: 'system-setting',
    title: '系统设置',
    path: '/system-setting',
    icon: 'el-icon-setting',
    children: [
      {
        id: 3,
        name: 'permission-manage',
        title: '权限管理',
        path: '/system-setting/permission-manage',
        icon: 'el-icon-warning',
        children: [
          {
            id: 4,
            name: 'user-manage',
            title: '系统用户管理',
            path: '/system-setting/permission-manage/user-manage',
            icon: ''
          },
          {
            id: 5,
            name: 'role-manage',
            title: '角色管理',
            path: '/system-setting/permission-manage/role-manage',
            icon: ''
          },
          {
            id: 6,
            name: 'resource-manage',
            title: '资源管理',
            path: '/system-setting/permission-manage/resource-manage',
            icon: ''
          }
        ]
      },
      {
        id: 7,
        name: 'system-monitor',
        title: '系统监控',
        path: '',
        icon: 'el-icon-video-camera',
        children: [
          {
            id: 8,
            name: 'service-monitor',
            title: '服务监控',
            path: '/serviceMonitor',
            icon: ''
          },
          {
            id: 9,
            name: 'druid-monitor',
            title: 'Druid监控',
            path: '/druid-monitor',
            icon: ''
          }
        ]
      },
      {
        id: 10,
        name: 'system-manage',
        title: '系统管理',
        path: '',
        icon: 'el-icon-s-help',
        children: [
          {
            id: 11,
            name: 'dictionary-manage',
            title: '字典管理',
            path: '/dictionaryManage',
            icon: ''
          }
        ]
      }
    ]
  }
]
