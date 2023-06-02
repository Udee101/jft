<template>
  <section class="hero" id="home">
    <div class="component-wrapper">
      <div class="hero-intro text-center">
        <p class="hero-text text-xxl">Get The <span class="text-color-1">Right Job </span>You Deserve
        </p>

        <p class="hero-sub-text text-md my-1">Lots of jobs &amp; Several candidates are registered</p>
      </div>

      <div class="hero-cta text-center">
        <a href="#jobs" class="find-jobs font-bold hover-opacity" >Find Jobs</a>

        <router-link :to="{name: 'register'}" class="sign-up hover-opacity">Become a member</router-link>

      </div>
    </div>
  </section>
</template>

<script>
  export default {}
</script>

<style scoped>
</style>
