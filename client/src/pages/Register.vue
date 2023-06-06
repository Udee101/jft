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
              <p v-for="error of v$.first_name.$errors" :key="error.$uid" class="text-error text-sm">{{ error.$message }}</p>
            </div>

            <div class="form-input">
              <label for="">Last Name</label>
              <input type="text" placeholder="Enter Your Last Name" v-model="last_name">
              <p v-for="error of v$.last_name.$errors" :key="error.$uid" class="text-error text-sm">{{ error.$message }}</p>
            </div>

            <div class="form-input">
              <label for="">Username</label>
              <input type="text" placeholder="Enter Your Username" v-model="username">
              <p v-for="error of v$.username.$errors" :key="error.$uid" class="text-error text-sm">{{ error.$message }}</p>
            </div>

            <div class="form-input">
              <label for="">Email</label>
              <input type="email" placeholder="Enter Your Email" v-model="email">
              <p v-for="error of v$.email.$errors" :key="error.$uid" class="text-error text-sm">{{ error.$message }}</p>
            </div>

            <div class="form-input">
              <label for="">Phone</label>
              <input type="text" placeholder="Enter Your Phone Number" v-model="phone">
              <p v-for="error of v$.phone.$errors" :key="error.$uid" class="text-error text-sm">{{ error.$message }}</p>
            </div>

            <div class="form-input">
              <label for="">Password</label>
              <input type="password" placeholder="Enter Password" v-model="password">
              <p v-for="error of v$.password.$errors" :key="error.$uid" class="text-error text-sm">{{ error.$message }}</p>
            </div>

            <div class="form-input">
              <label for="">Confirm Password</label>
              <input type="password" placeholder="Confirm Password" v-model="confirm_password">
              <p v-for="error of v$.confirm_password.$errors" :key="error.$uid" class="text-error text-sm">{{ error.$message }}</p>
            </div>
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
            <a href="/" class="text-color-3 hover-opacity">Back home</a>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required, email, sameAs } from '@vuelidate/validators';
import { register } from '../api/auth';
import LogoImg from '../assets/img/logo.svg';
export default {
  setup() {
    return { v$: useVuelidate() }
  },

  data() {
    return{
      LogoImg,
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
      isSuccessful: false,
      isLoading: false,
    }
  },

  methods: {
    register,
    handleSubmit(){
      
      this.isLoading = true;
      this.v$.$touch();
      if (this.v$.$error) {
        this.isLoading = false;
        return;
      } else {
        
        const data = {
          first_name: this.first_name,
          last_name: this.last_name,
          username: this.username,
          email: this.email,
          phone: this.phone,
          password: this.password,
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
          console.log(error.response.data.errors)
        }) 
      }
    }
  },

  validations() {
    return {
      first_name: { required, $autoDirty: true },
      last_name: { required, $autoDirty: true },
      username: { required, $autoDirty: true },
      email: { required, $autoDirty: true, email },
      phone: { required, $autoDirty: true },
      password: { required, $autoDirty: true },
      confirm_password: { $autoDirty: true, sameAs: sameAs(this.password, "Password") }
    }
  }
};
</script>

<style scoped>
</style>
