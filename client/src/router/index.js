import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/counter1',
      name: 'counter1',
      component: () => import('../views/Counter1.vue')
    },
    {
      path: '/counter2',
      name: 'counter2',
      component: () => import('../views/Counter2.vue')
    },
    {
      path: '/halkartyak',
      name: 'halkartyak',
      component: () => import('../views/HalkartyakView.vue')
    },
    {
      path: '/haltablazat',
      name: 'haltablazat',
      component: () => import('../views/HaltablazatView.vue')
    },
    {
      path: '/halkonyv',
      name: 'halkonyv',
      component: () => import('../views/HalkonyvView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'PageNotFound',
      component: () => import('../views/404View.vue')
    }
  ]
})

export default router
