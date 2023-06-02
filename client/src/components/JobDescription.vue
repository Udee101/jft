<template>
  <div class="listing-wrapper">
    <div class="listing-header mt-1">
      <img :src="CompImg" alt="">

      <div class="listing-intro">
        <p class="listing-title text-lg">{{ listing.title }}</p>

        <p class="company-name text-md text-color-3 font-bold">{{ listing.company }}</p>

      </div>
    </div>

    <div class="comp-tags py-1">
      <div v-for="(tag, i) in formatedJobTags" :key="i">
        <p class="text-base text-color-3">{{ tag }}</p>
      </div>
    </div>

    <div class="listing-loc text-color-3">
      <p>
        <f-a-i icon="fas fa-clock-rotate-left" class="text-color-4" /> 
        Fulltime
      </p>

      <p class="location">
        <f-a-i icon="fas fa-location-dot" class="text-color-9" /> 
        {{ listing.location }}
      </p>
    </div>

    <div class="desc my-1 pt-1">
      <p class="desc-head text-md font-bold text-color-3 pb-1">Job description</p>
      <p class="job-desc">{{ listing.description }}</p>
    </div>

    <div class="listing-cta">

      <a href="" class="contact text-white font-bold hover-opacity">
        <f-a-i icon="fas fa-envelope" /> 
        Contact Employer
      </a>

      <a :href="listing.website" class="website text-white font-bold hover-opacity">
        <f-a-i icon="fas fa-globe" /> 
        Visit Website
      </a>
    </div>
  </div>
</template>

<script>
import CompImg from '../assets/img/j4logo.svg'
  export default {
    computed: {
      formatedJobTags() {
        const tagsArray = this.listing.tags?.split(',');
        return tagsArray;
      }
    },

    data() {
      return {
        CompImg
      }
    },

    props: {
      listing: {
        type: Object
      }
    }
  }
</script>

<style scoped>
</style>
