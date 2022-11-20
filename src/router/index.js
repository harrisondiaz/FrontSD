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
      path: '/inscription',
      component: () => import('../views/inscription.vue')
    },{
      path: '/inscription/register',
      component:() => import('../views/inscription_register.vue')
    },{
      path: '/assignature/register',
      component: () => import('../views/assignature_register.vue')
    },{
      path: '/assignature/view',
      component: () => import('../views/assigature.vue')
    },{
      path: "/register",
      component : () => import('../views/register.vue')
    },{
      path: '/studient',
      component : () => import('../views/studient.vue')
    },{
      path:'/studient/register',
      component : () => import('../views/studient_register.vue')
     }
  ]
})


export default router
