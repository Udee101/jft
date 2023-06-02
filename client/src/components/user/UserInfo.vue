<template>
  <edit-profile-pop-up 
    v-if="showProfileEdit" 
    :user="user"
    @close="showProfileEdit = false"
  >
  </edit-profile-pop-up>
  <div class="user-info my-1">
    <p class="text-lg my-1">
      User Info<f-a-i 
        icon="fas fa-pen-to-square" class="text-color-4 cursor-pointer hover-opacity px-1"
        @click="showProfileEdit = true" 
      />
    </p>

    <div class="info">
      <div>
        <div class="text-color-2">First Name</div>
        <div class="text-color-3  text-md">{{user.first_name}}</div>
      </div>

      <div>
        <div class="text-color-2">Last Name</div>
        <div class="text-color-3 text-md">{{user.last_name}}</div>
      </div>

      <div>
        <div class="text-color-2">Middle Name</div>
        <div class="text-color-3 text-md">{{user.middle_name}}</div>
      </div>

      <div>
        <div class="text-color-2">Username</div>
        <div class="text-color-3 text-md">{{user.username}}</div>
      </div>

      <div>
        <div class="text-color-2">Email</div>
        <div class="text-color-3 text-md">{{user.email}}</div>
      </div>

      <div>
        <div class="text-color-2">Phone Number</div>
        <div class="text-color-3 text-md">{{ user.phone }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import EditProfilePopUp from '../popups/EditProfilePopUp.vue';
export default {
  components: {
    "edit-profile-pop-up": EditProfilePopUp
  },
  data() {
    return {
      showProfileEdit: false
    }
  },
  props: {
    user: {
      type: Object
    }
  },
  methods: {},
};
</script>

<style scoped>
</style>
