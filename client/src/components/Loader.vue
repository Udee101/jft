<template>
  <div class="loader-container">
    <div class="loader">
      <f-a-i icon="fas fa-circle-notch" spin />
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.loader-container{
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-1);
  font-size: 2.5rem;
}
.loader{
  padding: 1rem 2rem;
  border: 1px solid whitesmoke;
  border-radius: 1rem;
  box-shadow: 0rem 0rem 0.7rem 0.1rem whitesmoke;
}
</style>
