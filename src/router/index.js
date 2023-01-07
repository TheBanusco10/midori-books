import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store";

import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/books',
    name: 'books',
    component: () => import(/* webpackChunkName: "books" */ '../views/books/BooksView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/ProfileView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/books/add',
    name: 'addBook',
    component: () => import(/* webpackChunkName: "addBook" */ '../views/books/AddBookView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/books/edit/:id',
    name: 'editBook',
    component: () => import(/* webpackChunkName: "editBook" */ '../views/books/EditBookView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(to => {
  if (to.meta.requiresAuth && !store.getters.user) return { name: 'home' }
});

export default router
