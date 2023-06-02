<template>
  <div class="pop-up-container">
    <div class="pop-up-box">
      <div class="pop-up-content">
        <div class="header">
          <p class="text-lg text-color-4 font-bold">Edit Job Details</p>
          <f-a-i 
            icon="fas fa-times" 
            size="xl" 
            class="icon cursor-pointer hover-opacity" 
            @click="$emit('close')"
          />
        </div>
        <form @submit="handleSubmit">
          <div class="form-group">
            <label for="">Tilte</label>
            <input 
              type="text"
              v-model="listing.title"
            >
          </div>

          <div class="form-group">
            <label for="">Tags 
              <em class="text-color-3">e.g: js, css, html</em>
            </label>
            <input 
              type="text"
              v-model="listing.tags"
            >
          </div>

          <div class="form-group">
            <label for="">Company</label>
            <input 
              type="text"
              v-model="listing.company"
            >
          </div>

          <div class="form-group">
            <label for="">Location</label>
            <input 
              type="text"
              v-model="listing.location"
            >
          </div>

          <div class="form-group">
            <label for="">Website</label>
            <input 
              type="text"
              v-model="listing.website"
            >
          </div>

          <div class="form-group">
            <label for="">Email</label>
            <input 
              type="email"
              v-model="listing.email"
            >
          </div>

          <div class="form-group">
            <label for="">Description</label>
            <textarea cols="30" rows="7" v-model="listing.description"></textarea>
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
import { getListing, updateJobListing } from '../../api/listings';
export default {
  data() {
    return {
      listing: {},
      isLoading: false,
      isSuccessful: false
    };
  },

  methods: {
    getListing,
    updateJobListing,
    fetchListing(){
      this.getListing(this.listingId).then((res) => {
        this.listing = res.data.listing
      }).catch((err) => console.log(err.response))
    },

    handleSubmit(e){
      e.preventDefault();
      this.isLoading = true;

      const payload = {
        listingId: this.listingId,
        data: {
          title: this.listing.title,
          tags: this.listing.tags,
          company: this.listing.company,
          location: this.listing.location,
          website: this.listing.website,
          email: this.listing.email,
          description: this.listing.description
        }
      }
      this.updateJobListing(payload).then((res) => {
        this.isSuccessful = true; 
        setTimeout(() => {
          this.isLoading = false;
          this.isSuccessful = false;
          window.location.reload()
        }, 2000)
      }).catch((err) => console.log(err.response))
    }
  },

  mounted() {
    this.fetchListing();
  },

  props: {
    listingId: {
      type: Number
    },
  },
};
</script>

<style>
</style>
