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
  <div class="page-container">
    <div class="user-profile-container">
      <div class="profile-cta mb-1">
        <div @click="confirmLogout = true" class="cursor-pointer hover-opacity text-error logout">
          <f-a-i 
            icon="fas fa-arrow-right-from-bracket" 
          /> Logout
        </div>
      </div>

      <div class="user-details">
        <div class="user-initials">
          <f-a-i 
            icon="fas fa-user" 
            class="user-icon"
          />
          <p class="text-center text-md">{{ user.username }}</p>
        </div>

        <user-info :user="user"></user-info>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import UserInfo from '../../components/user/UserInfo.vue';
import ConfirmationPopUp from '../../components/popups/ConfirmationPopUp.vue'
import { logout } from '../../api/auth'
export default {
  created() {
    this.$store.dispatch("fetchUser")
  },
  components: {
    "user-info": UserInfo,
    "confirm-action": ConfirmationPopUp
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user
    })
  },
  data() {
    return {
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
}
</script>

<style>
</style>
