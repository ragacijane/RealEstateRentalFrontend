import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Main.vue'
import AdminView from '../views/AdminView.vue'
import SearchProperties from '@/views/SearchProperties.vue'
import SingleProperty from '@/views/SingleProperty.vue'
import AboutUs from '@/views/AboutUs.vue'
import Contact from '@/views/Contact.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import('../views/AdminView.vue')
    },
    {
      path: '/o-nama',
      name: 'aboutUs',
      component: AboutUs
    },
    {
      path: '/pretraga',
      name: 'searchProperties',
      component: SearchProperties
    },
    {
      path: '/oglas/:id',
      name: 'singleProperty',
      component: SingleProperty
    },
    {
      path: '/kontakt',
      name: 'contact',
      component: Contact
    }
  ]
})

export default router
