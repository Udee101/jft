<template>
  <section class="featured-jobs" id="jobs">
		<div class="feat-job-container">
			<p class="text-center text-xl pb-1 section-header">Featured Jobs</p>

			<div class="jobs">
				<job-card
					v-for="(job, index) in listings.data" 
					:key="index"
					:job="job"
				>
				</job-card>
			</div>

			<div class="text-center my-1">
				<router-link 
					:to="{name: 'allListings'}"
					class="more-jobs hover-opacity font-bold text-color-1" 
				>
					Find More Jobs
				</router-link>
			</div>
		</div>
	</section>
</template>

<script>
import JobCard from '../JobCard.vue'; 
import { mapState } from 'vuex';

  export default {
    components: {
      "job-card": JobCard
    },
    
    created() {
      this.$store.dispatch('jobListing/fetchJobListings', {
				page: this.currentPage,
				limit: this.limit,
				search: this.search
			})
    },

    computed: mapState({
      listings: (state) => state.jobListing.jobListings
    }),

		data() {
			return {
				currentPage: 1,
				limit: 3,
				search: ""
			}
		},

  }
</script>

<style scoped>

</style>
