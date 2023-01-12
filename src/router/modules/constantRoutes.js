/*
 * @Descripttion: 公共路由
 * @version:
 * @Author: kdsec
 * @Date: 2021-08-20 11:12:38
 * @LastEditors: kdsec
 * @LastEditTime: 2023-01-12 11:00:03
 */

// import Layout from '@/layouts/tabs/TabsView'
import Layout from '@/layout'

const constantRoutes = [
  // 处理网页重定向
  {
    path: '/redirect',
    component: Layout,
    name: 'redirect',
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    name: '404',
    hidden: true
  }
]
export default constantRoutes
