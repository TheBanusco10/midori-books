import { createRouter, createWebHistory } from 'vue-router'
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
    component: () => import(/* webpackChunkName: "books" */ '../views/BooksView.vue')
  },
  {
    path: '/books/add',
    name: 'addBook',
    component: () => import(/* webpackChunkName: "addBook" */ '../views/AddBookView.vue')
  },
  {
    path: '/books/edit/:id',
    name: 'books',
    component: () => import(/* webpackChunkName: "books" */ '../views/BooksView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
