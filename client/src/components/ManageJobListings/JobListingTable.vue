<template>
  <table>
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
    this.$store.dispatch("jobListing/fetUserJobListings", {
      page: this.currentPage,
      limit: this.limit
    })
  },

  computed: {
    ...mapState({
      listings: (state) => state.jobListing.userListings
    })
  },

  data() {
    return {
      currentPage: 1,
      limit: 5
    }
  },
};
</script>

<style>
</style>
