
// 基础路由
const dynRoutes = [
  {
    path: '/education',
    component: () => import('@/views/education'),
    name: 'education',
    meta: { title: '教务' },
    redirect: '/education/lecturer',
    children: [
      {
        path: 'timetable',
        component: () => import('@/views/education/timetable'),
        name: 'timetable',
        meta: { title: '课程表' }
      },
      {
        path: 'lecturer',
        component: () => import('@/views/education/lecturer'),
        name: 'lecturer',
        meta: { title: '讲师' }
      },
      {
        path: 'attendance',
        component: () => import('@/views/education/attendance'),
        name: 'attendance',
        meta: { title: '签到' }
      }
    ]
  }
]

export default dynRoutes
