<template>
  <template v-if="isLoading">
    <page-loader></page-loader>
  </template>
  <template v-else>
    <div class="job-description">
      <div class="job-desc-wrapper">
        <div class="go-back px-1">
          <router-link :to="{name: 'allListings'}" class="text-color-3 hover-opacity"><f-a-i icon="fas fa-angle-left" size="lg" /> Back</router-link>
        </div>
        <job-details :listing="listing"></job-details>
      </div>
    </div>
  </template>
</template>

<script>
import { getListing } from '../../api/listings';
import JobDescription from '../../components/JobDescription.vue';
import Loader from '../../components/Loader.vue';
export default {
  components: {
    "job-details": JobDescription,
    "page-loader": Loader
  },

  created() {
    this.fetchJobListing();
  },

  data() {
    return {
      isLoading: false,
      listing: {}
    }
  },
  
  methods: {
    getListing,
    fetchJobListing(){
      this.isLoading = true
      this.getListing(this.$route.params.listingId).then((res) => {
        setTimeout(() => {
          this.isLoading = false
          this.listing = res.data.listing
        }, 2000)
      }).catch((error) => console.log(error.response))
    }
  },
}
</script>

<style scoped>
</style>
