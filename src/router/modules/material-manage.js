
// 基础路由
const dynRoutes = [
  {
    path: '/material-manage',
    component: () => import('@/views/material-manage'),
    name: 'material-manage',
    meta: { title: '素材管理' },
    redirect: '/material-manage/material-group',
    children: [
      {
        path: 'article-manage',
        component: () =>
          import('@/views/material-manage/article-manage'),
        name: 'article-manage',
        meta: { title: '文章' }
      },
      {
        path: 'article-edit/:id?',
        component: () =>
          import('@/views/material-manage/article-edit'),
        name: 'article-edit',
        meta: { title: '文章编辑' }
      },
      {
        path: 'file-manage',
        component: () =>
          import('@/views/material-manage/file-manage'),
        name: 'file-manage',
        meta: { title: '多媒体素材' }
      },
      {
        path: 'image-file',
        component: () =>
          import('@/views/material-manage/image-file'),
        name: 'image-file',
        meta: { title: '图片与文件' }
      },
      {
        path: 'vod-manage',
        component: () =>
          import('@/views/material-manage/vod-manage'),
        name: 'vod-manage',
        meta: { title: '音视频' }
      },
      {
        path: 'vod-classify',
        component: () =>
          import('@/views/material-manage/vod-classify'),
        name: 'vod-classify',
        meta: { title: '音视频分类' }
      },
      {
        path: 'material-group',
        component: () =>
          import('@/views/material-manage/material-group'),
        name: 'material-group',
        meta: { title: '素材分组' }
      }
    ]
  }
]

export default dynRoutes
