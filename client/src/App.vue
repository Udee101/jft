<template>
  <template v-if="!isNoNavRoute">
    <header v-if="!isAuth">
      <guest-nav-bar></guest-nav-bar>
    </header>
  </template>

  <template v-if="!isNoNavRoute">
    <header v-if="isAuth">
      <user-nav-bar></user-nav-bar>
    </header>
  </template>
  
  <router-view></router-view>
  
</template>

<script>
import Topbar from "./components/Topbar.vue";
import UserNavbar from "./components/user/UserNavbar.vue";

export default {
  components: {
    "guest-nav-bar": Topbar,
    "user-nav-bar": UserNavbar
  },
  computed: {
    isAuth(){
      return this.$store.state.user.isUserAuth
    },
    isNoNavRoute(){
      return [
        'login',
        'register'
      ].includes(this.$route.name);
    }
  },
  created(){
    if (localStorage.getItem('jft_jwt')) {
      return this.$store.commit("setUserAuthTrue")
    }
    else {
      return this.$store.commit("setUserAuthFalse")
    }
  },
  
};
</script>

<style scoped></style>
