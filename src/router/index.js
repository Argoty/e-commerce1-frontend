import Vue from 'vue'
import VueRouter from 'vue-router'

import Products from '../views/ProductsPage.vue'
import ProductDetail from '../views/ProductDetailPage.vue'
import Cart from '../views/CartPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/products',
    name: 'products',
    component: Products
  },
  {
    path: '/products/:id',
    name: 'productDetail',
    component: ProductDetail
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: "/",
    redirect: "/products"
  },
  { path: '*', component: NotFoundPage},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
