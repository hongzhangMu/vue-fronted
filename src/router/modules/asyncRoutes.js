/*
 * @Descripttion:
 * @version:
 * @Author: kdsec
 * @Date: 2022-05-04 10:24:20
 * @LastEditors: kdsec
 * @LastEditTime: 2023-01-12 11:28:39
 */
import Layout from '@/layouts/tabs/TabsView'
// import Layout from '@/layout'

const asyncRoutes = [
  // 打开首页
  {
    path: '/',
    component: Layout,
    name: 'main',
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard/index'),
        name: '首页',
        meta: {
          icon: 'dashboard'
        }
      }
    ]
  }
]
export default asyncRoutes
