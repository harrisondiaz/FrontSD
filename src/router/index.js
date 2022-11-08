import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/login.vue'
const name_user = ''
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
      path: '/inscription',
      component: () => import('../views/inscription.vue')
    },{
      path: '/inscription/register',
      component:() => import('../views/inscription_register.vue')
    },{
      path: '/inscription/remove',
      component : () => import('../views/inscription_remove.vue')
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
    },{
      path: "/register",
      component : () => import('../views/register.vue')
    }
  ]
})


export default router
