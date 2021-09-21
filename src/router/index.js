import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '../components/dashboard.vue';
import Home from '../components/views/Home.vue';
import Login from '../components/views/backstage/Login.vue';
import Bdashboard from '../components/views/backstage/Bdashboard.vue';
import Mainpage from '../components/views/backstage/Mainpage.vue';
import Coupon from '../components/views/backstage/Coupon.vue';
import Order from '../components/views/CustomerOrder.vue';
import Service from '../components/views/Service.vue';
import About from '../components/views/About.vue';
import Checkout from '../components/views/CustomerCheckout.vue';
import OrderList from '../components/views/backstage/OrderList.vue';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/index',
    },
    {
      path: '/',
      redirect: '/index',
      component: Dashboard,
      children: [
        {
          path: 'index',
          name: 'Home',
          component: Home,
        },
        {
          path: 'service',
          name: 'service',
          component: Service,
        },
        {
          path: 'about',
          name: 'about',
          component: About,
        },
      ],
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
    },
    {
      path: '/checkout/:orderId',
      name: 'checkout',
      component: Checkout,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'Bdashboard',
      component: Bdashboard,
      children: [
        {
          path: 'main',
          name: 'main',
          components: {
            default: Mainpage,
            meta: { requiresAuth: true },
          },
        },
        {
          path: 'coupon',
          name: 'coupon',
          component: Coupon,
          meta: { requiresAuth: true },
        },
        {
          path: 'orderlist',
          name: 'orderlist',
          component: OrderList
        },
      ]
    },
  ]
})
