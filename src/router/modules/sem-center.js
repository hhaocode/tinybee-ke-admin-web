
// 基础路由
const dynRoutes = [
  {
    path: '/sem-center',
    component: () => import('@/views/sem-center'),
    name: 'sem-center',
    meta: { title: '营销中心' },
    redirect: '/sem-center/order-center',
    children: [
      {
        path: 'order-center',
        component: () =>
          import('@/views/sem-center/order-center'),
        name: 'order-center',
        meta: { title: '订单中心' },
        redirect: '/sem-center/order-center/order-manage',
        children: [
          {
            path: 'order-manage',
            component: () =>
              import('@/views/sem-center/order-center/order-manage'),
            name: 'order-manage',
            meta: { title: '订单管理' }
          },
          {
            path: 'refund-manage',
            component: () =>
              import('@/views/sem-center/order-center/refund-manage'),
            name: 'refund-manage',
            meta: { title: '退款管理' }
          },
          {
            path: 'order-setting',
            component: () =>
              import('@/views/sem-center/order-center/order-setting'),
            name: 'order-setting',
            meta: { title: '订单设置' }
          }
        ]
      },
      {
        path: 'promotion-center',
        component: () =>
          import('@/views/sem-center/promotion-center'),
        name: 'promotion-center',
        meta: { title: '促销中心' },
        redirect: '/sem-center/promotion-center/recommend-sem',
        children: [
          {
            path: 'recommend-sem',
            component: () =>
              import('@/views/sem-center/promotion-center/recommend-sem'),
            name: 'recommend-sem',
            meta: { title: '推荐营销' }
          },
          {
            path: 'seckill',
            component: () =>
              import('@/views/sem-center/promotion-center/seckill'),
            name: 'seckill',
            meta: { title: '秒杀' }
          },
          {
            path: 'integral-sem',
            component: () =>
              import('@/views/sem-center/promotion-center/integral-sem'),
            name: 'integral-sem',
            meta: { title: '积分' }
          },
          {
            path: 'group-booking',
            component: () =>
              import('@/views/sem-center/promotion-center/group-booking'),
            name: 'group-booking',
            meta: { title: '拼团' }
          },
          {
            path: 'coupon',
            component: () =>
              import('@/views/sem-center/promotion-center/coupon'),
            name: 'coupon',
            meta: { title: '优惠券' }
          },
          {
            path: 'topic-sem',
            component: () =>
              import('@/views/sem-center/promotion-center/topic-sem'),
            name: 'topic-sem',
            meta: { title: '专题营销' }
          }
        ]
      },
      {
        path: 'micro-sem',
        component: () =>
          import('@/views/sem-center/micro-sem'),
        name: 'micro-sem',
        meta: { title: '微营销' },
        redirect: '/sem-center/micro-sem/micro-promote',
        children: [
          {
            path: 'micro-promote',
            component: () =>
              import('@/views/sem-center/micro-sem/micro-promote'),
            name: 'micro-promote',
            meta: { title: '推广' }
          },
          {
            path: 'micro-card',
            component: () =>
              import('@/views/sem-center/micro-sem/micro-card'),
            name: 'micro-card',
            meta: { title: '卡券' }
          }
        ]
      }, {
        // advertising-center
        path: 'advertising-center',
        component: () =>
          import('@/views/sem-center/advertising-center'),
        name: 'advertising-center',
        meta: { title: '广告中心' }
      }
    ]
  }
]

export default dynRoutes
