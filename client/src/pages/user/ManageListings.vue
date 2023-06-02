<template>
  <create-job-pop-up
    v-if="showCreate"
    @close="showCreate = false"
  ></create-job-pop-up>
  <div class="manage-jobs-wrapper">
    <div class="page-container">
      <div class="page-title my-1">
        <p class="text-xxl text-center">Manage Jobs</p>
      </div>

      <div class="create-job">
        <button @click="showCreate = true" class="btn-post text-white font-bold hover-opacity cursor-pointer p-0-5 mt-1">Post Job</button>
      </div>

      <div class="overflow-x-auto py-1">
        <job-listing-table></job-listing-table>
      </div>
    </div>
  </div>
</template>

<script>
import JobListingTable from '../../components/ManageJobListings/JobListingTable.vue';
import CreateJobListingVue from '../../components/popups/CreateJobListing.vue.vue';
export default {
  components: {
    "job-listing-table": JobListingTable,
    "create-job-pop-up": CreateJobListingVue
  },
  data() {
    return {
      showCreate: false
    }
  },
}
</script>

<style>
</style>
