<template>
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

      <div class="user">
        {{ $_.lowerCase(getUsername) }} <f-a-i icon="fas fa-user" class="text-color-1" />
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
import Hamburger from './Hamburger.vue';
import SideNav from './SideNav.vue';

export default {
  created() {
    this.$store.dispatch("fetchUser")
  },
  
  components: {
    "hamburger-menu": Hamburger,
    "side-nav": SideNav
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
    }
  },
};
</script>

<style>
</style>
