<template>
  <div class="listing-wrapper">
    <div class="listing-header">
      <p class="listing-title text-lg my-0-5">{{ listing.title }}</p>

      <p class="company-name text-md text-color-3">
        {{ listing.company }}
      </p>
    </div>

    <div class="listing-loc text-color-2 my-0-5">
      <p>
        <f-a-i icon="fas fa-briefcase" size="lg" /> 
        Fulltime.
      </p>

      <p class="location">
        <f-a-i icon="fas fa-location-dot" size="lg" /> 
        {{ listing.location }}
      </p>
    </div>

    <div class="comp-tags my-1">
      <div v-for="(tag, i) in formatedJobTags" :key="i">
        <p class="text-base text-color-3">{{ tag }}</p>
      </div>
    </div>


    <div class="desc pt-1">
      <p class="desc-head text-md text-color-3 pb-1">Job description</p>
      <div v-html="listing.description" class="job-desc"></div>
    </div>

    <div class="listing-cta my-1">

      <a href="" class="contact text-white font-bold hover-opacity">
        <f-a-i icon="fas fa-envelope" /> 
        Contact Employer
      </a>

      <a :href="listing.website" class="website text-white font-bold hover-opacity">
        <f-a-i icon="fas fa-up-right-from-square" /> 
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
