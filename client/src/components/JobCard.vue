<template>
  <div  class="component-wrapper">
    <router-link :to="{name: 'listing.id', params: { listingId: job.id }}" class="job-box scale text-black">

      <div class="comp-img">
        <div v-html="setImg"></div>
      </div>

      <div class="detail-wrapper">
        <p class="comp-title text-md">{{ job.title }}</p>
        <p class="comp-name text-md text-color-3 my-0-5">{{ job.company }}</p>
        <p class="job-loc text-color-2">
          <f-a-i icon="fas fa-location-dot" /> 
          {{ job.location }}
        </p>
      </div>
    <p :class="`date-posted ${styleDaysPosted}`">{{ getTimeDifferenceSinceWhenPosted }} {{ getDateText(getTimeDifferenceSinceWhenPosted) }} </p>
    </router-link>
  </div>
</template>

<script>
import { toSvg } from "jdenticon"

  export default {
    computed: {
      setImg(){
        return toSvg(this.job.company, 80)
      },

      getTimeDifferenceSinceWhenPosted() {
        let today = new Date();
        let jobDate = new Date(this.job.created_at);

        let differenceInTime = today.getTime() - jobDate.getTime();
        return Math.floor(differenceInTime / (1000 * 3600 * 24))
      },

      styleDaysPosted() {
        if (this.getTimeDifferenceSinceWhenPosted <= 7 ) {
          return "new"
        } else if (this.getTimeDifferenceSinceWhenPosted <= 14 ) {
          return "recent"
        }
        return "old"
      }
    },

    methods: {
      getDateText(days) {
        if (days < 1) {
          return "Today"
        } else if ( days === 1 ) {
          return "day ago"
        } else {
          return "days ago"
        }
      },
    },

    props: {
      job: {
        type: Object
      }
    },
  }
</script>

<style scoped>
.date-posted {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  border-radius: 0.7rem;
  padding: 0 0.5rem 0.25rem;
  font-size: 0.85rem;
}
.new {
  background: #c5f0c57a;
  color: #159615;
}
.recent {
  background: #f3e59573;
  color: #ccb054;
}
.old {
  background: #dddddd81;
  color: #8f8d8d;
}
</style>
