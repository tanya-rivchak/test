import { createRouter, createWebHistory } from 'vue-router'
import BanksView from '../views/BanksView.vue'
import CalculatorView from '../views/CalculatorView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: BanksView
  },
  {
    path: '/calculator',
    name: 'calculator',
    component: CalculatorView
  },
  {
    path: '/:catchAll(.*)',
    name: 'not found',
    component: () => import('../views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
