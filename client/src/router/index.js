import { createRouter, createWebHistory } from "vue-router"
import routes from "./routes"


const router = createRouter({
  history: createWebHistory(),
  routes
})

const invalidateJWT = () => {
  if (localStorage.getItem('jft_jwt_creation_time') == null) {
    localStorage.removeItem('jft_jwt');
  }

  const createdAt = parseInt(localStorage.getItem('jft_jwt_creation_time'));

  const elapsedTimeInSeconds = (Date.now() - createdAt) / 1000;

  if (elapsedTimeInSeconds > 1000 ) {
    localStorage.removeItem('jft_jwt');
  }

}

router.beforeEach((to, from, next) => {

  invalidateJWT()

  const authenticated = localStorage.getItem('jft_jwt');

  if (to.matched.some((record) => record.meta.doesNotRequireAuth)) {
    if (authenticated) {
      next()
    } else {
      next()
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (authenticated) {
      next({
        name: 'landing',
      })
    } else {
      next()
    }
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authenticated) {
      next({
        name: 'login',
        query: { nextUrl: to.fullPath }
      })
    } else {
      next()
    } 
  } else {
    next()
  }
})

export default router
