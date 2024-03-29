<template>
  <div class="pop-up-container">
    <div class="pop-up-box">
      <div class="pop-up-content">
        <div class="header">
          <p class="text-lg text-color-4 font-bold">Edit Job Details</p>
          <f-a-i 
            icon="fas fa-times" 
            size="xl" 
            class="icon cursor-pointer hover-opacity" 
            @click="$emit('close')"
          />
        </div>
        <form @submit="handleSubmit">
          <div class="form-group">
            <label for="">Tilte</label>
            <input
              :class="{ 'required': v$.listing.title.$error }" 
              type="text"
              v-model="listing.title"
            >
            <p v-for="error of v$.listing.title.$errors" class="text-color-9 text-sm">{{ error.$message }}</p>
          </div>

          <div class="form-group">
            <label for="">Tags 
              <em class="text-color-3">e.g: js, css, html</em>
            </label>
            <input
              :class="{ 'required': v$.listing.tags.$error }" 
              type="text"
              v-model="listing.tags"
            >
            <p v-for="error of v$.listing.tags.$errors" class="text-color-9 text-sm">{{ error.$message }}</p>
          </div>

          <div class="form-group">
            <label for="">Company</label>
            <input
              :class="{ 'required': v$.listing.company.$error }" 
              type="text"
              v-model="listing.company"
            >
            <p v-for="error of v$.listing.company.$errors" class="text-color-9 text-sm">{{ error.$message }}</p>
          </div>

          <div class="form-group">
            <label for="">Location</label>
            <input
              :class="{ 'required': v$.listing.location.$error }" 
              type="text"
              v-model="listing.location"
            >
            <p v-for="error of v$.listing.location.$errors" class="text-color-9 text-sm">{{ error.$message }}</p>
          </div>

          <div class="form-group">
            <label for="">Website</label>
            <input
              :class="{ 'required': v$.listing.website.$error }" 
              type="text"
              v-model="listing.website"
            >
            <p v-for="error of v$.listing.website.$errors" class="text-color-9 text-sm">{{ error.$message }}</p>
          </div>

          <div class="form-group">
            <label for="">Email</label>
            <input
              :class="{ 'required': v$.listing.email.$error }" 
              type="email"
              v-model="listing.email"
            >
            <p v-for="error of v$.listing.email.$errors" class="text-color-9 text-sm">{{ error.$message }}</p>
          </div>

          <div class="form-group">
            <label for="">Description</label>
            <quill-editor 
              v-model:content="listing.description"
              contentType="html"
              theme="snow"
              toolbar="essential"
            ></quill-editor>
            <p v-for="error of v$.listing.description.$errors" class="text-color-9 text-sm">{{ error.$message }}</p>
          </div>

          <div class="text-center mt-1">
            <button v-if="!isLoading" class="my-1 btn-edit cursor-pointer hover-opacity text-white ">Submit</button>
            <f-a-i v-if="isLoading" icon="fas fa-circle-notch" spin size="2xl" class="text-color-1 my-1" />
          </div>

          <div v-if="isSuccessful" class="text-center text-success">
            Updated Successfully!
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { getListing, updateJobListing } from '../../api/listings';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers, url } from '@vuelidate/validators';
import { validationMessage } from '../../helpers';
export default {
  setup() {
    return { v$: useVuelidate() }
  },

  components: {
    "quill-editor": QuillEditor
  },

  data() {
    return {
      listing: {},
      isLoading: false,
      isSuccessful: false,
      validationMessage
    };
  },

  methods: {
    getListing,
    updateJobListing,
    fetchListing(){
      this.getListing(this.listingId).then((res) => {
        this.listing = res.data.listing
      }).catch((err) => console.log(err.response))
    },

    handleSubmit(e){
      e.preventDefault();
      this.isLoading = true;

      this.v$.$touch();
      if (this.v$.$error) {
        this.isLoading = false;
        return;
      } else {
        
        const payload = {
          listingId: this.listingId,
          data: {
            title: this.listing.title,
            tags: this.listing.tags,
            company: this.listing.company,
            location: this.listing.location,
            website: this.listing.website,
            email: this.listing.email,
            description: this.listing.description
          }
        }
        this.updateJobListing(payload).then((res) => {
          this.isSuccessful = true; 
          this.$store.dispatch("jobListing/fetUserJobListings", {
            page: this.currentPage,
            search: this.search,
            limit: this.limit,
          });
          setTimeout(() => {
            this.isLoading = false;
            this.isSuccessful = false;
            this.$emit('close')
          }, 2000)
        }).catch((err) => console.log(err.response))
      }
    }
  },

  validations(){
    return {
      listing: {
        title: { required: helpers.withMessage(validationMessage.JOB_TITLE_REQUIRED, required) },
        tags: { required: helpers.withMessage(validationMessage.FIELD_CANNOT_BE_EMPTY, required) },
        company: { required: helpers.withMessage(validationMessage.COMPANY_NAME_REQUIRED, required) },
        location: { required: helpers.withMessage(validationMessage.FIELD_CANNOT_BE_EMPTY, required) },
        website: { required: helpers.withMessage(validationMessage.FIELD_CANNOT_BE_EMPTY, required), url: helpers.withMessage(validationMessage.VALID_URL, url) },
        email: { required: helpers.withMessage(validationMessage.FIELD_CANNOT_BE_EMPTY, required), email },
        description: { required: helpers.withMessage(validationMessage.FIELD_CANNOT_BE_EMPTY, required) },
      }
    }
  },

  mounted() {
    this.fetchListing();
  },

  props: {
    listingId: {
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
.required {
  background: #ea91911e;
  border: 1px solid #ea91916b;
}
</style>
