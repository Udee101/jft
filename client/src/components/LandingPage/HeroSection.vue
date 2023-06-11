<template>
  <section class="hero" id="home">
    <div class="component-wrapper">
      <div class="hero-intro text-center">
        <p class="hero-text text-xxl">Get The <span class="text-color-1">Right Job </span>You Deserve
        </p>

        <p class="hero-sub-text text-md my-1">Start your job search today and take the next step towards your professional goals.</p>
      </div>

      <div class="hero-cta text-center">
        <router-link :to="{ name: 'allListings' }" class="find-jobs font-bold hover-opacity" >Search jobs</router-link>

        <router-link :to="{ name: 'manageListings' }" class="sign-up hover-opacity">Post job</router-link>

      </div>
    </div>
  </section>
</template>

<script>
  export default {}
</script>

<style scoped>
</style>
