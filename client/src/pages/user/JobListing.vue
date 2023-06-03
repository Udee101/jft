<template>
  <div class="job-description">
    <div class="job-desc-wrapper">
      <div class="go-back px-1">
        <router-link :to="{name: 'allListings'}" class="text-color-3 hover-opacity"><f-a-i icon="fas fa-angle-left" size="lg" /> Back</router-link>
      </div>
      <job-details :listing="listing"></job-details>
    </div>
  </div>
</template>

<script>
import { getListing } from '../../api/listings';
import JobDescription from '../../components/JobDescription.vue';
export default {
  components: {
    "job-details": JobDescription
  },

  created() {
    this.fetchJobListing();
  },

  data() {
    return {
      listing: {}
    }
  },
  
  methods: {
    getListing,
    fetchJobListing(){
      this.getListing(this.$route.params.listingId).then((res) => {
        this.listing = res.data.listing
      }).catch((error) => console.log(error.response))
    }
  },
}
</script>

<style scoped>
</style>
