import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/common/Index'
import BookDetail from '@/components/page/BookDetail'
import BookList from '@/components/page/BookList'
import UserCenter from '@/components/page/UserCenter'
import Login from '@/components/page/Login'
import Register from '@/components/page/Register'
import Cart from '@/components/page/Cart'
import Affirm from '@/components/page/Affirm'
import Manage from '@/components/page/Manage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '',
          redirect: '/index'
        },
        {
          path: '/bookdetail/:bookid',
          name: '详情',
          component: BookDetail
        },
        {
          path: '/index',
          name: '首页',
          component: BookList
        },
        {
          path: '/usercenter/:menu',
          name: '用户中心',
          component: UserCenter
        },
        {
          path: '/cart',
          name: '购物车',
          component: Cart
        },
        {
          path: '/affirm',
          name: '确认订单',
          component: Affirm
        },
        {
          path: '/register',
          name: '注册',
          component: Register
        },
        {
          path: '/login',
          name: '登录',
          component: Login
        },
      ]
    },

    {
      path: '/manage',
      name: '管理',
      component: Manage
    }
  ]
})
