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
              :class="{'required': v$.user.first_name.$error}" 
              type="text"
              v-model="user.first_name"
            >
            <p v-for="error of v$.user.first_name.$errors" class="text-color-9 text-sm">{{ error.$message }}</p>
          </div>

          <div class="form-group">
            <label for="">Last Name</label>
            <input
              :class="{'required': v$.user.last_name.$error}" 
              type="text"
              v-model="user.last_name"
            >
            <p v-for="error of v$.user.last_name.$errors" class="text-color-9 text-sm">{{ error.$message }}</p>
          </div>

          <div class="form-group">
            <label for="">Middle Name</label>
            <input 
              type="text"
              v-model="user.middle_name"
            >
          </div>

          <div class="form-group">
            <label for="">Email</label>
            <input
              :class="{'required': v$.user.email.$error}" 
              type="email"
              v-model="user.email"
            >
            <p v-for="error of v$.user.email.$errors" class="text-color-9 text-sm">{{ error.$message }}</p>
          </div>

          <div class="form-group">
            <label for="">Phone Number</label>
            <input
              :class="{'required': v$.user.phone.$error}" 
              type="tel"
              v-model="user.phone"
            >
            <p v-for="error of v$.user.phone.$errors" class="text-color-9 text-sm">{{ error.$message }}</p>
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
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from '@vuelidate/validators';
export default {
  setup() {
    return { v$: useVuelidate() }
  },
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
      
      this.v$.$touch();
      if (this.v$.$error) {
        this.isLoading = false;
        return;
      } else {
        
        const data = {
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          middle_name: this.user.middle_name,
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
    }
  },

  validations(){
    return {
      user: {
        first_name: { required: helpers.withMessage("First Name is required", required) },
        last_name: { required: helpers.withMessage("Last Name is required", required) },
        email: { required: helpers.withMessage("Email is required", required), email },
        phone: { required: helpers.withMessage("Phone number is required", required) },
      }
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
