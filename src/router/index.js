import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/assigature',
      component: () => import('../views/Home.vue')
    },{
      path: '/assignature/register',
      component: () => import('../views/assignature_register.vue')
    },{
      path: '/assignature/view',
      component: () => import('../views/assigature.vue')
    },{
      path: '/assignature/remove',
      component : () => import('../views/assigature_remove.vue')
    },{
      path: '/assignature/updata',
      component : () => import('../views/assigature_updata.vue')
    }
  ]
})


export default router
