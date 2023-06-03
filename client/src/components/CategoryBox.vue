<template>
  <div 
    class="category-box scale"
    :class="category.color"
  >
    <p class="mb-1 text-md">{{ category.title }}</p>
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
.category-box>p{
  max-width: 200px;
}
.border-left-color-1 {
  border-left: 5px solid #f77288;
}
.border-left-color-2 {
  border-left: 5px solid #bd2cb1;
}
.border-left-color-3 {
  border-left: 5px solid #5959ed;
}
.border-left-color-4 {
  border-left: 5px solid #ffff00;
}
.border-left-color-5 {
  border-left: 5px solid #0bba0b;
}
.border-left-color-6 {
  border-left: 5px solid #19e0b2;
}
</style>
