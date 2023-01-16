import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'auth'},
    component: () => import('../views/Login/Login.vue')
  },
  {
    path: '/registration',
    name: 'registration',
    meta: {layout: 'auth'},
    component: () => import('../views/Registration/Registration.vue')
  },
  {
    path: '/main',
    name: 'main',
    meta: {layout: 'main'},
    component: () => import('../views/Main.vue')
  },
  {
    path: '/invoices',
    name: 'invoices',
    meta: {layout: 'main'},
    component: () => import('../views/Invoices.vue')
  },
  {
    path: '/goods',
    name: 'goods',
    meta: {layout: 'main'},
    component: () => import('../views/Goods.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
