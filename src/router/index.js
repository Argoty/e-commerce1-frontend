import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import Products from '../views/ProductsPage.vue'
import ProductDetail from '../views/ProductDetailPage.vue'
import Cart from '../views/CartPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'
import Login from '../views/Login.vue'
import Me from '../views/Me.vue'
import Success from '../views/Success.vue'
import Contact from '../views/Contact.vue'
import Admin from '../views/Admin.vue'
import AdminCategorias from '../views/AdminCategorias.vue'
import Users from '../views/Users.vue'
import UserCart from '../views/UserCart.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/contact',
        name: 'contact',
        component: Contact
    },
    {
        path: '/me',
        name: 'me',
        component: Me,
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/success',
        name: 'success',
        component: Success
    }, {
        path: '/products',
        name: 'products',
        component: Products
    }, {
        path: '/products/:id',
        name: 'productDetail',
        component: ProductDetail,
        meta: {
            requireLogin: true
        }
    }, {
        path: '/cart',
        name: 'cart',
        component: Cart,
        meta: {
            requireLogin: true
        }
    }, {
        path: '/admin',
        name: 'admin',
        component: Admin,
        meta: {
            requireLogin: true,
            requireAdmin: true
        }
    }, 
    {
        path: '/admin/categorias',
        name: 'adminCategorias',
        component: AdminCategorias,
        meta: {
            requireLogin: true,
            requireAdmin: true
        }
    }, 
    {
        path: '/admin/users',
        name: 'users',
        component: Users,
        meta: {
            requireLogin: true,
            requireAdmin: true
        }
    },
    {
        path: '/admin/users/:id',
        name: 'usercart',
        component: UserCart,
        meta: {
            requireLogin: true,
            requireAdmin: true
        }
    },
    {
        path: "/",
        redirect: "/products"
    }, {
        path: '*',
        component: NotFoundPage
    },
]

const router = new VueRouter({mode: 'history', base: process.env.BASE_URL, routes})

router.beforeEach((to, from, next) => {
  const isAdminRequired = to.matched.some(record => record.meta.requireAdmin);
  const isLoginRequired = to.matched.some(record => record.meta.requireLogin);
  const isAuthenticated = store.state.isAuthenticated;
  const isAdmin = store.state.isAdmin;

  if ((isAdminRequired || isLoginRequired) && !isAuthenticated) {
      next({ name: 'login', query: { to: to.path } });
  } else if (isAdminRequired && isAuthenticated && !isAdmin) {
      next({ name: 'login', query: { to: to.path } });
  } else {
      next();
  }
});
export default router
