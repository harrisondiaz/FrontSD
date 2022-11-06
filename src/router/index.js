import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/assigature',
      name: 'assigature',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/assigature.vue')
    },{
      path: '/materia/registro',
      name: 'registro_materia',
      component: () => import('../views/assignature_register.vue')
    }
  ]
})


export default router
