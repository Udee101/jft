<template>
  <transition name="fade">
    <edit-listing-pop-up 
      v-if="showModal"
      @close="showModal = false"
      :listingId="listing.id"
      :currentPage="currentPage"
      :limit="limit"
      :search="search"
    >
    </edit-listing-pop-up>
  </transition>
  
  <transition name="fade">
    <confirmation-pop-up 
      v-if="showConfirm" 
      :confirmationText="'Are you sure you want to delete this job'"
      :action="'proceed'"
      @close="showConfirm = false"
      @proceed="deleteJob"
    >
    </confirmation-pop-up>
  </transition>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>{{ listing.title }}</td>
    <td>{{ listing.company }}</td>
    <td>
      <div v-if="!isLoading" class="actions-col">
        <div 
          @click="showModal = true"
          class="edit text-color-4 text-center cursor-pointer hover-opacity"
        >
          <f-a-i icon="fas fa-pen-to-square" /> Edit
        </div>
        <p 
          @click="showConfirm = true"
          class="delete text-color-9 text-center cursor-pointer hover-opacity"
        >
          <f-a-i icon="fas fa-trash-alt" /> Delete
        </p>
      </div>
      <f-a-i 
        v-if="isLoading" 
        icon="fas fa-circle-notch" 
        spin
        size="lg"
        class="text-color-9 text-center my-1" 
      />
    </td>
  </tr>
</template>

<script>
import EditListingPopUp from '../popups/EditListingPopUp.vue'
import ConfirmationPopUp from '../popups/ConfirmationPopUp.vue'
import { deleteJobListing } from '../../api/listings'

export default {
  components: {
    "edit-listing-pop-up": EditListingPopUp,
    "confirmation-pop-up": ConfirmationPopUp
  },
  data() {
    return {
      showModal: false,
      showConfirm: false,
      isLoading: false
    }
  },
  methods: {
    deleteJobListing,
    deleteJob(){
      this.isLoading = true;
      this.showConfirm = false;
      this.deleteJobListing(this.listing.id).then((res) => {

        setTimeout(() => {
          this.isLoading = false
          this.$store.dispatch("jobListing/fetUserJobListings", {
            page: this.currentPage,
            search: this.search,
            limit: this.limit,
          })
        }, 2000)

      }).catch((err) => console.log(err.response))
    }
  },
  props: {
    listing: {
      type: Object
    },
    index: {
      type: Number
    },
    currentPage: {
      type: Number,
      required: true
    },
    limit: {
      type: Number,
      required: true
    },
    search: {
      type: String,
      required: true
    }
  },
};
</script>

<style scoped>
td>div>.edit, td>div>.delete{
  display: flex;
  align-items: center;
  gap: 0.2rem;
  padding: 0.1rem 0.5rem;
}
.actions-col{
  display: flex;
  flex-direction: row;
  column-gap: 1.5rem;
}
</style>
