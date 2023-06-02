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
              type="text"
              v-model="title"
            >
          </div>

          <div class="form-group">
            <label for="">Tags 
              <em class="text-color-3">e.g: js, css, html</em>
            </label>
            <input 
              type="text"
              v-model="tags"
            >
          </div>

          <div class="form-group">
            <label for="">Company</label>
            <input 
              type="text"
              v-model="company"
            >
          </div>

          <div class="form-group">
            <label for="">Location</label>
            <input 
              type="text"
              v-model="location"
            >
          </div>

          <div class="form-group">
            <label for="">Website</label>
            <input 
              type="text"
              v-model="website"
            >
          </div>

          <div class="form-group">
            <label for="">Email</label>
            <input 
              type="email"
              v-model="email"
            >
          </div>

          <div class="form-group">
            <label for="">Description</label>
            <textarea cols="30" rows="7" v-model="description"></textarea>
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
export default {
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
  },

};
</script>

<style>
.btn-create {
  padding: 1rem 2rem;
  background: var(--color-success);
  border: none;
  border-radius: 0.25rem;
}
</style>
