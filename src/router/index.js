import Vue from 'vue'
import VueRouter from 'vue-router'
import MapView from '../views/MapView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MapComp',
    component: MapView,
    meta: { requiresAuth: (process.env.VUE_APP_REQUIRE_AUTH == 'True') }
  },
  {
    path: '/login',
    name: 'LoginComp',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  }
]

const router = new VueRouter({
  routes
})

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !Vue.prototype.$is_authenticated.value) {
    next({ name: 'LoginComp' })
  } else {
    next()
  }
});

export default router
