<template>
  <div class="all-listings-wrapper">
    <page-banner></page-banner>
    <section class="all-listings-container">
      <job-card
        v-for="(job, index) in listings.data" 
        :key="index"
        :job="job"
      >
      </job-card>
		</section>
  </div>
</template>

<script>
import Banner from '../../components/Banner.vue';
import JobCard from '../../components/JobCard.vue';
import { mapState } from 'vuex';

  export default {
    components: {
      "page-banner": Banner,
      "job-card": JobCard
    },

    created() {
      this.$store.dispatch('jobListing/fetchJobListings', {
        page: this.currentPage,
        limit: this.limit
      })
    },

    computed: mapState({
      listings: (state) => state.jobListing.jobListings
    }),

    data() {
      return {
        currentPage: 1,
        limit: 5
      }
    },
  }
</script>

<style scoped>
</style>
