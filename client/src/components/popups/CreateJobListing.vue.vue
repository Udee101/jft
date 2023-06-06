<template>
  <div class="pop-up-container">
    <div class="pop-up-box">
      <div class="pop-up-content">
        <div class="header">
          <p class="text-lg text-success font-bold">Post Job</p>
          <f-a-i 
            icon="fas fa-times" 
            size="xl" 
            class="icon cursor-pointer hover-opacity" 
            @click="$emit('close')"
          />
        </div>
        <form @submit="handleSubmit">
          <div class="form-group">
            <label for="">Title</label>
            <input
              :class="{ 'required': v$.title.$error }" 
              type="text"
              v-model="title"
            >
            <p v-for="error of v$.title.$errors" class="text-color-9 text-sm">{{ error.$message }}</p>
          </div>

          <div class="form-group">
            <label for="">Tags 
              <em class="text-color-3">e.g: js, css, html</em>
            </label>
            <input
              :class="{ 'required': v$.tags.$error }" 
              type="text"
              v-model="tags"
            >
            <p v-for="error of v$.tags.$errors" class="text-color-9 text-sm">{{ error.$message }}</p>
          </div>

          <div class="form-group">
            <label for="">Company</label>
            <input
              :class="{ 'required': v$.company.$error }" 
              type="text"
              v-model="company"
            >
            <p v-for="error of v$.company.$errors" class="text-color-9 text-sm">{{ error.$message }}</p>
          </div>

          <div class="form-group">
            <label for="">Location</label>
            <input
              :class="{ 'required': v$.location.$error }" 
              type="text"
              v-model="location"
            >
            <p v-for="error of v$.location.$errors" class="text-color-9 text-sm">{{ error.$message }}</p>
          </div>

          <div class="form-group">
            <label for="">Website</label>
            <input
              :class="{ 'required': v$.website.$error }" 
              type="text"
              v-model="website"
            >
            <p v-for="error of v$.website.$errors" class="text-color-9 text-sm">{{ error.$message }}</p>
          </div>

          <div class="form-group">
            <label for="">Email</label>
            <input
              :class="{ 'required': v$.email.$error }" 
              type="email"
              v-model="email"
            >
            <p v-for="error of v$.email.$errors" class="text-color-9 text-sm">{{ error.$message }}</p>
          </div>

          <div class="form-group">
            <label for="">Description</label>
            <textarea cols="30" rows="7" v-model="description" :class="{ 'required': v$.description.$error }"></textarea>
            <p v-for="error of v$.description.$errors" class="text-color-9 text-sm">{{ error.$message }}</p>
          </div>

          <div class="text-center mt-1">
            <button v-if="!isLoading" class="my-1 btn-create cursor-pointer hover-opacity text-white font-bold">Create</button>
            <f-a-i v-if="isLoading" icon="fas fa-circle-notch" spin size="2xl" class="text-success my-1" />
          </div>

          <div v-if="isSuccessful" class="text-center text-success">
            Job Created Successfully!
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { createJobListing } from '../../api/listings';
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers, url } from '@vuelidate/validators';
export default {
  setup() {
    return { v$: useVuelidate() }
  },  

  computed: {
    getUserId(){
      return this.$store.state.user.user.id
    }
  },

  data() {
    return {
      isLoading: false,
      isSuccessful: false,
      title: "",
      tags: "",
      company: "",
      location: "",
      website: "",
      email: "",
      description: "",
    };
  },

  methods: {
    createJobListing,
    handleSubmit(e){
      e.preventDefault();

      this.isLoading = true;
      this.v$.$touch();
      if (this.v$.$error) {
        this.isLoading = false;
        return;
      } else {
        
        const data = {
          userId: this.getUserId,
          title: this.title,
          tags: this.tags,
          company: this.company,
          location: this.location,
          website: this.website,
          email: this.email,
          description: this.description,
        }
        this.createJobListing(data).then((res) => {
          this.isSuccessful = true;
          this.$store.dispatch("jobListing/fetUserJobListings");
          setTimeout(() => {
            this.isLoading = false;
            this.isSuccessful = true;
            this.$emit('close')
          }, 2000)
        })
      }
    }
  },

  validations(){
    return {
      title: { required: helpers.withMessage("This field cannot be empty", required) },
      tags: { required: helpers.withMessage("This field cannot be empty", required) },
      company: { required: helpers.withMessage("This field cannot be empty", required) },
      location: { required: helpers.withMessage("This field cannot be empty", required) },
      website: { required: helpers.withMessage("This field cannot be empty", required), url: helpers.withMessage("Must be a valid URL", url) },
      email: { required: helpers.withMessage("This field cannot be empty", required), },
      description: { required: helpers.withMessage("Please input the job description", required) },
    }
  }

};
</script>

<style scoped>
.btn-create {
  padding: 1rem 2rem;
  background: var(--color-success);
  border: none;
  border-radius: 0.25rem;
}
.required {
  background: #ea91911e;
  border: 1px solid #ea91916b;
}
</style>
