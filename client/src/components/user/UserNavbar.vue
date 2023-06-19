<template>
  <transition name="fade">
    <confirm-action 
      :confirmationText="'Are you sure you want to log out'"
      v-if="confirmLogout"
      :action="'logout'"
      @logout="doLogout"
      @close="confirmLogout = false"
    >
    </confirm-action>
  </transition>
  <nav>
    <div class="nav-container">
      <div class="logo text-md font-bold">
        <a href="/"><img :src="LogoImg" alt="logo image"></a>
      </div>

      <div class="nav-menu">
        <ul>
          <router-link :to="{name: 'allListings'}" class="text-color-3 hover-opacity mr-1" active-class="active">Jobs</router-link>

          <router-link :to="{name: 'manageListings'}" class="text-color-3 hover-opacity mr-1" active-class="active">Manage Jobs</router-link>

          <router-link :to="{name: 'profile'}" class="text-color-3 hover-opacity" active-class="active">Profile</router-link>
        </ul>
      </div>

      <div class="user-container">
        <div class="user text-color-2 hover-opacity" @click="showLogout = !showLogout">
          <f-a-i icon="fas fa-user" size="xl" /> <f-a-i 
            icon="fas fa-angle-down" 
            size="sm" 
            :class="{ 'rotate-180': showLogout }" 
          />
        </div>
        <transition name="drop-down">
          <div v-if="showLogout" class="dropdown p-1">
            <p @click="confirmLogout = true" class="text-color-9 text-center hover-opacity cursor-pointer logout-text">
              <f-a-i 
                icon="fas fa-arrow-right-from-bracket" 
              /> Logout
            </p>
          </div>
        </transition>
      </div>

      <hamburger-menu></hamburger-menu>
      <transition name="user-nav">
        <div v-if="userNav" class="nav-block">
          <side-nav></side-nav>
        </div>
      </transition>
      
    </div>
  </nav>
</template>

<script>
import LogoImg from '../../assets/img/logo.svg'
import ConfirmationPopUp from '../popups/ConfirmationPopUp.vue';
import Hamburger from './Hamburger.vue';
import SideNav from './SideNav.vue';
import { logout } from '../../api/auth';

export default {
  components: {
    "hamburger-menu": Hamburger,
    "side-nav": SideNav,
    "confirm-action": ConfirmationPopUp
  },
  
  computed: {
    getUsername() {
      return this.$store.state.user.user.username
    },
    userNav(){
      return this.$store.state.user.userNav
    },
  },
  
  data() {
    return {
      LogoImg,
      showLogout: false,
      confirmLogout: false
    }
  },

  methods: {
    logout,
    doLogout() {
      this.logout();
      window.location.reload();
    }
  },
};
</script>

<style scoped>
.rotate-180{
  transform: rotate(180deg);
}
ul{
  list-style: none;
}
</style>
