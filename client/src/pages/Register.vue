<template>
  <div class="form-container">
    <div class="reg-form-section">
      <div class="text-center logo my-1">
        <img :src="LogoImg" alt="logo image">
      </div>
        <p class="font-normal text-center text-lg">Create an Account</p>
        <p class="font-normal text-center text-color-3">Sign up now to get started with an account</p>
      <div class="register-form">

        <form @submit.prevent="handleSubmit">
          <div class="form-input-container">
            <div class="form-input">
              <label for="">First Name</label>
              <input type="text" placeholder="Enter Your First Name" v-model="first_name">
              <span v-if="errors.first_name" class="text-error">{{ errors.first_name[0] }}</span>
            </div>

            <div class="form-input">
              <label for="">Last Name</label>
              <input type="text" placeholder="Enter Your Last Name" v-model="last_name">
              <span v-if="errors.last_name" class="text-error">{{ errors.last_name[0] }}</span>
            </div>

            <div class="form-input">
              <label for="">Username</label>
              <input type="text" placeholder="Enter Your Username" v-model="username">
              <span v-if="errors.username" class="text-error">{{ errors.username[0] }}</span>
            </div>

            <div class="form-input">
              <label for="">Email</label>
              <input type="email" placeholder="Enter Your Email" v-model="email">
              <span v-if="errors.email" class="text-error">{{ errors.email[0] }}</span>
            </div>

            <div class="form-input">
              <label for="">Phone</label>
              <input type="text" placeholder="Enter Your Phone Number" v-model="phone">
              <span v-if="errors.phone" class="text-error">{{ errors.phone[0] }}</span>
            </div>

            <div class="form-input">
              <label for="">Password</label>
              <input type="password" placeholder="Enter Password" v-model="password">
              <span v-if="errors.password" class="text-error">{{ errors.password[0] }}</span>
            </div>

            <!-- <div class="form-input">
              <label for="">Confirm Password</label>
              <input type="password" placeholder="Confirm Password" v-model="confirm_password">
              <span v-if="errors.password_confirmed" class="text-error">{{ errors.password_confirmed[0] }}</span>
            </div> -->
          </div>
          <div v-if="!isLoading" class="btn-submit">
            <button type="submit" class="text-base font-bold hover-opacity">Register</button>
          </div>

          <div v-if="isLoading" class="text-center py-1">
            <f-a-i icon="fas fa-circle-notch" spin size="2xl" class="text-color-1 mt-1" />
          </div>

          <div v-if="isSuccessful" class="reg-success text-success text-base">Registration Successful, please login</div>

          <div class="back-home text-color-6">
            Already have an account ? <router-link :to="{name: 'login'}" class="text-color-3 hover-opacity">Login</router-link>
          </div>

          <div class="back-home">
            <a href="/" class="text-color-3 hover-opacity">Go back home</a>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
import { register } from '../api/auth';
import LogoImg from '../assets/img/logo.svg'
export default {
  data() {
    return{
      LogoImg,
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      // confirm_password: "",
      isSuccessful: false,
      isLoading: false,
      errors: {}
    }
  },
  methods: {
    register,
    handleSubmit(){

      this.isLoading = true;
      this.errors = {};
      
      const data = {
        first_name: this.first_name,
        last_name: this.last_name,
        username: this.username,
        email: this.email,
        phone: this.phone,
        password: this.password,
        // password_confirmation: this.confirm_password,
      }

      this.register(data).then(() => {
        this.isSuccessful = true;
        setTimeout(() => {
          this.isSuccessful = false;
          this.isLoading = false;
          this.$router.push({
            name: 'login'
          })
        }, 2000)
      }).catch((error) => {
        this.isLoading = false;
        this.errors = {...error.response.data.errors};
      }) 
    }
  },
};
</script>

<style scoped>
</style>
