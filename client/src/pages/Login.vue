<template>
  <div class="form-container">
    <div class="form-section">
      <div class="text-center logo my-1">
        <img :src="LogoImg" alt="logo image">
      </div>
        <p class="font-normal text-center text-lg">Log in to your Account</p>
        <p class="font-normal text-center text-color-3">Welcome back, Please enter your details</p>
      <div class="login-form">
      
        <div v-if="invalidCredentials" class="text-center text-error text-sm">{{ invalidCredentials }}</div>

        <form @submit.prevent="handleSubmit">
          <div class="form-input">
            <label for="">Email or Username</label>
            <input type="text" placeholder="Enter Email or Username" v-model="loginField" :class="{ 'required': v$.loginField.$error }">
            <p v-for="error of v$.loginField.$errors" class="text-color-9 text-sm">{{ error.$message }}</p>
          </div>

          <div class="form-input">
            <label for="">Password</label>
            <input type="password" placeholder="Enter Password" v-model="password" :class="{ 'required': v$.password.$error }">
            <p v-for="error of v$.password.$errors" class="text-color-9 text-sm">{{ error.$message }}</p>
          </div>
          
          <div v-if="!isLoading" class="btn-submit hover-opacity">
            <button type="submit" class="text-base font-bold">Login</button>
          </div>

          <div v-if="isLoading" class="text-center my-1">
            <f-a-i icon="fas fa-circle-notch" spin size="2xl" class="text-color-1 mt-1" />
          </div>

          <div class="back-home text-color-6">
            Don't have an account ? <router-link :to="{name: 'register'}" class="text-color-3 hover-opacity">Register</router-link>
          </div>

          <div class="back-home">
            <a href="/" class="text-color-3 hover-opacity">Back home</a>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { login } from "../api/auth";
import LogoImg from '../assets/img/logo.svg'

export default {
  setup(){
    return { v$: useVuelidate() }
  },

  data() {
    return{
      LogoImg,
      loginField: "",
      password: "",
      isSuccessful: false,
      invalidCredentials: "",
      isLoading: false,
    }
  },

  methods: {
    login,
    handleSubmit(){

      this.isLoading = true;
      this.invalidCredentials = "";
      this.v$.$touch();

      if (this.v$.$error) {
        this.isLoading = false;
        return;
      } else {

        const data = {
          usernameOrEmail: this.loginField,
          password: this.password
        }

        this.login(data).then((response) => {
          
          const token = response.data.token;
          
          localStorage.setItem('jft_user', JSON.stringify(response.data.user));
          localStorage.setItem('jft_jwt', token);
          localStorage.setItem(
            'jft_jwt_creation_time', Date.now()
          );
          
          setTimeout(() => {
            this.isLoading = false;
            this.$router.push({name: 'allListings'});
            this.$store.commit("setUserAuthTrue")
          }, 2000)
          
        }).catch((error) => {
          this.isLoading = false;
          this.invalidCredentials = error.response.data.message
        })
      }
    }
  },

  validations(){
    return {
      loginField: { required: helpers.withMessage("Email or Username is reqiured", required) },
      password: { required: helpers.withMessage("Password is required", required) }
    }
  }
};
</script>

<style scoped>
.required {
  background: #ea91911e;
  border: 1px solid #ea91916b;
}
</style>
