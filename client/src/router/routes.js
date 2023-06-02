import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import LandingPage from '../pages/LandingPage.vue'
import AllListings from '../pages/user/AllListings.vue'
import JobListing from '../pages/user/JobListing.vue'
import UserProfile from '../pages/user/Profile.vue'
import ManageListings from '../pages/user/ManageListings.vue'

const routes = [
  {
    path: '/',
    redirect: to => {
      return { 
        name: 'landing',
      }
    }
  },
  {
    path: '/',
    name: 'landing',
    component: LandingPage,
    // meta: {
    //   requiresAuth: false
    // }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      guest: true
    }
  },
  {
    path: '/all-listings',
    name: 'allListings',
    component: AllListings,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/listing/:listingId',
    name: 'listing',
    component: JobListing,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/manage-listings',
    name: 'manageListings',
    component: ManageListings,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: UserProfile,
    meta: {
      requiresAuth: true
    }
  },

]

export default routes
