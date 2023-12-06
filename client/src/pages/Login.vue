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

        <div v-if="this.$route.query.isReg" class="text-success text-center" >Registration Successful, Please login</div>

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
          
          <div v-if="!isLoading" class="btn-submit">
            <button type="submit" class="text-base font-bold hover-opacity">Login</button>
            <button @click="loginAsTestUser" class="text-base font-bold hover-opacity">Login as test user</button>
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
import { validationMessage } from '../helpers';

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
      validationMessage
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
        this.makeLoginRequest(data)
      }
    },

    loginAsTestUser() {
      this.isLoading = true;
      // this.invalidCredentials = "";
      const data = {
        usernameOrEmail: "testuser",
        password: "Password"
      }
      this.makeLoginRequest(data)
    },

    makeLoginRequest(data) {
      this.login(data).then((response) => {
        
        const token = response.data.token;
        
        localStorage.setItem('jft_user', JSON.stringify(response.data.user));
        localStorage.setItem('jft_jwt', token);
        localStorage.setItem(
          'jft_jwt_creation_time', Date.now()
        );

        if (localStorage.getItem('jft_jwt') != null) {
          this.$store.dispatch("fetchUser")

          if (this.$route.query.nextUrl != null) {
            this.$router.push(this.$route.query.nextUrl);
            this.$store.commit("setUserAuthTrue")
          } else {
            this.$router.push({ name: 'allListings' });
            this.$store.commit("setUserAuthTrue")
          }
        }
      }).catch((error) => {
        this.isLoading = false;
        this.invalidCredentials = error.response.data.error
      })
    }
  },


  validations(){
    return {
      loginField: { required: helpers.withMessage(validationMessage.EMAIL_OR_USERNAME_REQUIRED, required) },
      password: { required: helpers.withMessage(validationMessage.PASSWORD_REQUIRED, required) }
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
