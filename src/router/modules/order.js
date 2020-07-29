/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const orderRouter = {
  path: '/order',
  component: Layout,
  redirect: '/order/orderlist',
  name: '주문',
  meta: {
    title: '주문',
    icon: 'shopping'
  },
  children: [
    {
      path: 'orderList',
      component: () => import('@/views/order/orderList/index'),
      name: '주문 리스트',
      meta: { title: '주문 리스트' }
    },
    {
      path: 'returnclaimList',
      component: () => import('@/views/order/returnclaimList/index'),
      name: '교환/환불 리스트',
      meta: { title: '교환/환불 리스트' }
    },
    {
      path: 'shipList',
      component: () => import('@/views/order/shipList/index'),
      name: '배송 리스트',
      meta: { title: '배송 리스트' }
    }
  ]
}
export default orderRouter
