<template>
  <div class="pop-up-container">
    <div class="pop-up-box">
      <div class="pop-up-content">
        <div class="header">
          <p class="text-lg text-color-4 font-bold">Edit Profile</p>
          <f-a-i 
            icon="fas fa-times" 
            size="xl" 
            class="icon cursor-pointer hover-opacity" 
            @click="$emit('close')"
          />
        </div>
        <form @submit="handleSubmit">
          <div class="form-group">
            <label for="">First Name</label>
            <input 
              type="text"
              v-model="user.first_name"
            >
          </div>

          <div class="form-group">
            <label for="">Last Name</label>
            <input 
              type="text"
              v-model="user.last_name"
            >
          </div>

          <div class="form-group">
            <label for="">Middle Name</label>
            <input 
              type="text"
              v-model="user.middle_name"
            >
          </div>

          <div class="form-group">
            <label for="">Username</label>
            <input 
              type="text"
              v-model="user.username"
            >
          </div>

          <div class="form-group">
            <label for="">Email</label>
            <input 
              type="email"
              v-model="user.email"
            >
          </div>

          <div class="form-group">
            <label for="">Phone Number</label>
            <input 
              type="tel"
              v-model="user.phone"
            >
          </div>

          <div class="text-center mt-1">
            <button v-if="!isLoading" class="my-1 btn-edit cursor-pointer hover-opacity text-white ">Submit</button>
            <f-a-i v-if="isLoading" icon="fas fa-circle-notch" spin size="2xl" class="text-color-1 my-1" />
          </div>

          <div v-if="isSuccessful" class="text-center text-success">
            Updated Successfully!
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      isLoading: false,
      isSuccessful: false,
    };
  },
  props: {
    user: {
      type: Object
    }
  },
  methods: {
    handleSubmit(e){
      e.preventDefault();

      this.isLoading = true;

      const data = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        middle_name: this.user.middle_name,
        username: this.user.username,
        email: this.user.email,
        phone: this.user.phone,
      }

      this.$store.dispatch("modifyUser", data).then(() => {
        this.isSuccessful = true;
        this.$store.dispatch("fetchUser")
        setTimeout(() => {
          this.isLoading = false
          this.isSuccessful = false
          this.$emit('close')
        }, 2000)
      }).catch(err => console.log(err.response))

    }
  },
};
</script>

<style scoped>
</style>
