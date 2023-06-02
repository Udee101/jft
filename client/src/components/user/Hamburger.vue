<template>
  <div class="hamburger" @click="openNav">
    <f-a-i icon="fas fa-grip-lines" size="2xl" class="hover-opacity cursor-pointer" />
  </div>
</template>

<script>
export default {
  methods: {
    openNav(){
      this.$store.commit('setUserNavOpen')
    },
  },
};
</script>

<style>
</style>
