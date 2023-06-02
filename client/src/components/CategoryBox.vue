<template>
  <div class="category-box">
    <img :src="category.imgSrc" alt="image" class="py-1">
    <p class="mb-1 text-md ">{{ category.title }}</p>
  </div>
</template>

<script>
  export default {
    props: {
      category: {
        type: Object
      }
    }
  }
</script>

<style scoped>
</style>
