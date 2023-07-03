<template>
  <template v-if="isLoading">
    <page-loader></page-loader>
  </template>
  <template v-else>
    <div class="page-container">
      <div class="user-profile-container">
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
</template>

<script>
import { mapState } from 'vuex';
import UserInfo from '../../components/user/UserInfo.vue';
import ConfirmationPopUp from '../../components/popups/ConfirmationPopUp.vue'
import Loader from '../../components/Loader.vue'
import { logout } from '../../api/auth'
export default {
  created() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.$store.dispatch("fetchUser")
    }, 2000)
  },
  components: {
    "page-loader": Loader,
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
      isLoading: false,
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
