<template>
  <div class="all-listings-wrapper">
    <div class="banner-container">
      <div class="banner">
        <div class="overlay">
          <p class="text-xxl text-white text-center font-bold my-0-5">Search Live Jobs</p>
          <p class="text-center text-white mb-1">Finding your new job just got easier</p>
        </div>
      </div>
      <div class="search-wrapper">
        <p class="text-md text-color-3">Find Your Desired Job</p>
        <div class="search-box">
          <search-box 
            v-model:search="search"
            @search-job="fetchJobs"
          >
          </search-box>
        </div>
      </div>
    </div>

    <section class="all-listings-container">
      <job-card
        v-if="!$_.isEmpty(listings.data)"
        v-for="(job, index) in listings.data" 
        :key="index"
        :job="job"
      >
      </job-card>
      <div v-if="$_.isEmpty(listings.data)" class="text-center text-color-3"><em>No Job(s) found</em></div>
		</section>
  </div>
</template>

<script>
import Search from '../../components/Search.vue';
import JobCard from '../../components/JobCard.vue';
import { mapState } from 'vuex';

  export default {
    components: {
      "search-box": Search,
      "job-card": JobCard
    },

    created() {
      this.fetchJobs()
    },

    computed: mapState({
      listings: (state) => state.jobListing.jobListings
    }),

    data() {
      return {
        currentPage: 1,
        limit: 5,
        search: ""
      }
    },

    methods: {
      fetchJobs(){
        this.$store.dispatch('jobListing/fetchJobListings', {
          page: this.currentPage,
          limit: this.limit,
          search: this.search
        })
      }
    },
  }
</script>

<style scoped>
</style>
