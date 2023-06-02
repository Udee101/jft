<template>
  <confirm-action 
    :confirmationText="'Are you sure you want to log out'"
    v-if="confirmLogout"
    :action="'logout'"
    @logout="doLogout"
    @close="confirmLogout = false"
  >
  </confirm-action>
    <div class="user-nav-container">
      <f-a-i @click="closeNav" icon="fas fa-times" size="2xl" class="close-nav hover-opacity" />
      <div class="user-nav-links">
        <router-link 
          :to="{name: 'allListings'}" 
          class="text-color-3 text-md hover-opacity"
          @click="closeNav"
          active-class="active"
        >Jobs</router-link>

        <router-link 
          :to="{name: 'manageListings'}" 
          class="text-color-3 text-md hover-opacity"
          @click="closeNav"
          active-class="active"
        >Manage Jobs</router-link>

        <router-link
          :to="{name: 'profile'}" 
          class="text-color-3 text-md hover-opacity"
          @click="closeNav"
          active-class="active"
        >Profile</router-link>

        <div @click="confirmLogout = true" class="text-white text-center font-bold logout">
          <f-a-i 
            icon="fas fa-arrow-right-from-bracket" 
          /> Logout
        </div>
      </div>
    </div>
</template>

<script>
import { logout } from '../../api/auth';
import ConfirmationPopUp from '../popups/ConfirmationPopUp.vue';
export default {
  components: {
    "confirm-action": ConfirmationPopUp
  },
  data() {
    return {
      confirmLogout: false,
    }
  },
  methods: {
    logout,
    closeNav(){
      this.$store.commit('setUserNavClose')
    },
    doLogout(){
      this.logout();
      window.location.reload();
    }
  },
};
</script>

<style>
</style>
