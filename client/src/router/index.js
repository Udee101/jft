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

  if (elapsedTimeInSeconds > 600 ) {
    localStorage.removeItem('jft_jwt');
  }

}

router.beforeEach((to, from) => {

  invalidateJWT()

  const authenticated = localStorage.getItem('jft_jwt');

  if (to.meta.guest && authenticated) {
    return {
      name: 'landing'
    };
  }else if (to.meta.requiresAuth && !authenticated) {
    return {
      name: 'login'
    }
  }
})

export default router
