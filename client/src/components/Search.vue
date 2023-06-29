<template>
  <input
    type="text"
    placeholder="search"
    :value="search"
    @input="$emit('update:search', $event.target.value)"
  >
  <f-a-i 
    @click="$emit('search-job')"
    icon="fas fa-magnifying-glass"
    class="text-white search-btn hover-opacity"
    size="lg"
  />
</template>

<script>
  export default {
    props: {
      search: {
        type: String
      }
    },
    emits: ['update:search', 'search-job'],
  }
</script>

<style scoped>
</style>
