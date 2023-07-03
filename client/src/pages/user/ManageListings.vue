<template>
  <transition name="fade">
    <create-job-pop-up
      v-if="showCreate"
      @close="showCreate = false"
    ></create-job-pop-up>
  </transition>
  <template v-if="isLoading">
    <page-loader></page-loader>
  </template>
  <template v-else>
    <div class="manage-jobs-wrapper">
      <div class="page-container">
        <div class="page-title mt-1">
          <p class="text-lg">Manage Jobs</p>
        
          <button @click="showCreate = true" class="btn-post text-white font-bold hover-opacity cursor-pointer p-0-5">
            <f-a-i icon="fas fa-plus" /> Post Job
          </button>
        </div>
        
        <div class="overflow-x-auto py-1">
          <job-listing-table></job-listing-table>
        </div>
      </div>
    </div>
  </template>
</template>

<script>
import JobListingTable from '../../components/ManageJobListings/JobListingTable.vue';
import CreateJobListingVue from '../../components/popups/CreateJobListing.vue.vue';
import Loader from '../../components/Loader.vue'
export default {
  created() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000)
  },
  components: {
    "job-listing-table": JobListingTable,
    "create-job-pop-up": CreateJobListingVue,
    "page-loader": Loader
  },
  data() {
    return {
      showCreate: false,
      isLoading: false
    }
  },
}
</script>

<style>
</style>
