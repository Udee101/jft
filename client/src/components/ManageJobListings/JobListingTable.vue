<template>
  <div v-if="isLoading" class="text-center text-color-1 mt-2 py-1">
    <f-a-i icon="fas fa-circle-notch" spin size="2xl" />
  </div>
  <table v-else>
    <thead>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Company</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody class="text-color-3">
      <jobs-table-row
        v-if="!$_.isEmpty(listings)"
        v-for="(listing, index) in listings.data"
        :listing="listing"
        :index="index"
        v-bind:key="index"
      >
      </jobs-table-row>
    </tbody>
  </table>
  <div v-if="$_.isEmpty(listings.data)" class="text-center text-color-3 my-1">
    <em>No Job(s) Found</em>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import JobListingTableRow from './JobListingTableRow.vue';
export default {
  components: {
    "jobs-table-row": JobListingTableRow,
  },

  created() {
    this.fetchUserJobs()
  },

  computed: {
    ...mapState({
      listings: (state) => state.jobListing.userListings
    })
  },

  data() {
    return {
      currentPage: 1,
      limit: 5,
      search: "",
      isLoading: false,
    }
  },

  methods: {
    fetchUserJobs() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
        this.$store.dispatch("jobListing/fetUserJobListings", {
          page: this.currentPage,
          search: this.search,
          limit: this.limit,
        })
      , 2000})
    }
  },
};
</script>

<style>
</style>
