<template>
  <div  class="component-wrapper">
    <router-link :to="{name: 'listing.id', params: { listingId: job.id }}" class="job-box scale text-black">

      <div class="comp-img">
        <div v-html="setImg"></div>
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
import { toSvg } from "jdenticon"

  export default {
    computed: {
      setImg(){
        return toSvg(this.job.company, 80)
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
