<template>
  <div class="all-listings-wrapper">
    <page-banner></page-banner>
    <section class="all-listings-container">
      <job-card
        v-for="(job, index) in listings" 
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
      this.$store.dispatch('jobListing/fetchJobListings')
    },

    computed: mapState({
      listings: (state) => state.jobListing.jobListings
    })

  }
</script>

<style scoped>
</style>
