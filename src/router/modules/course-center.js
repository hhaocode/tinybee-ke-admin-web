
// 基础路由
const dynRoutes = [
  {
    path: '/course-center',
    component: () => import('@/views/course-center'),
    name: 'course-center',
    meta: { title: '课程中心' },
    redirect: '/course-center/course-manage',
    children: [
      {
        path: 'course-manage',
        component: () =>
          import('@/views/course-center/course-manage'),
        name: 'course-manage',
        meta: { title: '课程管理' }
      },
      {
        path: 'cms-classify',
        component: () =>
          import('@/views/course-center/cms-classify'),
        name: 'cms-classify',
        meta: { title: '分类' }
      },
      {
        path: 'course-category',
        component: () =>
          import('@/views/course-center/course-category'),
        name: 'course-category',
        meta: { title: '课程分类' }
      },
      {
        path: 'course-detail',
        component: () =>
          import('@/views/course-center/course-detail'),
        name: 'course-detail',
        meta: { title: '课程详情' }
      },
      {
        path: 'edit-course',
        component: () =>
          import('@/views/course-center/edit-course'),
        name: 'edit-course',
        meta: { title: '编辑课程' }
      },
      {
        path: 'image-text',
        component: () =>
          import('@/views/course-center/image-text'),
        name: 'image-text',
        meta: { title: '图文' }
      },
      // {
      //   path: 'audio',
      //   component: () =>
      //     import('@/views/course-center/audio'),
      //   name: 'audio',
      //   meta: { title: '音频' }
      // },
      {
        path: 'video',
        component: () =>
          import('@/views/course-center/video'),
        name: 'video',
        meta: { title: '视频' }
      },
      {
        path: 'live',
        component: () =>
          import('@/views/course-center/live'),
        name: 'live',
        meta: { title: '直播' }
      },
      {
        path: 'e-book',
        component: () =>
          import('@/views/course-center/e-book'),
        name: 'e-book',
        meta: { title: '电子书' }
      },
      {
        path: 'material',
        component: () =>
          import('@/views/course-center/material'),
        name: 'material',
        meta: { title: '素材' }
      },
      {
        path: 'subject',
        component: () =>
          import('@/views/course-center/subject'),
        name: 'subject',
        meta: { title: '训练营' }
      },
      {
        path: 'learning-path',
        component: () =>
          import('@/views/course-center/learning-path'),
        name: 'learning-path',
        meta: { title: '学习路径' }
      },
      {
        path: 'learning-path-editor',
        component: () =>
          import('@/views/course-center/learning-path-editor'),
        name: 'learning-path-editor',
        meta: { title: '编辑学习路径' }
      }
    ]
  }
]

export default dynRoutes
