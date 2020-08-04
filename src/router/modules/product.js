/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const productRouter = {
  path: '/product',
  component: Layout,
  redirect: '/product/productlist',
  name: '상품',
  meta: {
    title: '상품',
    icon: 'shopping'
  },
  children: [
    {
      path: 'productList',
      component: () => import('@/views/product/productList/index'),
      name: '상품 리스트',
      meta: { title: '상품 리스트' }
    },
    {
      path: 'qna',
      component: () => import('@/views/product/qna/index'),
      name: '상품 문의',
      meta: { title: '상품 문의' }
    }
  ]
}
export default productRouter
