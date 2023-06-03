<template>
  <div  class="component-wrapper">
    <router-link :to="{name: 'listing.id', params: { listingId: job.id }}" class="job-box scale text-black">

      <div class="comp-img">
        <img :src="CompImg" alt="job-svg" width="80" height="80">
      </div>

      <div class="detail-wrapper">
        <p class="comp-title text-md">{{ job.title }}</p>
        <p class="comp-name text-md text-color-3 my-0-5">{{ job.company }}</p>
        <p class="job-loc text-color-2">
          <f-a-i icon="fas fa-location-dot" /> 
          {{ job.location }}
        </p>
      </div>
    </router-link>
  </div>
</template>

<script>
import CompImg from '../assets/img/patternpad.svg'
  export default {
    data() {
      return {
        CompImg
      }
    },
    props: {
      job: {
        type: Object
      }
    },
  }
</script>

<style scoped>
</style>
