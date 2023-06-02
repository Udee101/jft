<template>
  <div class="pop-up-container">
    <div class="confirm-pop-up">
      <div class="text-lg text-center my-1">
        {{ confirmationText }}?
      </div>
      <div class="cta-confirm text-center">
        <button 
          class="mt-1 yes font-bold text-white cursor-pointer hover-opacity"
          @click="$emit(action)"
        > {{ $_.startCase(action) }}
        </button>
        <button 
          class="mt-1 cancel font-bold text-white cursor-pointer hover-opacity"
          @click="$emit('close')"
        > Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    confirmationText: {
      type: String,
    },
    action: {
      type: String,
    }
  },
};
</script>

<style scoped>
.confirm-pop-up{
  background: white;
  width: 80%;
  max-width: 350px;
  min-height: 120px;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 0 1.5rem grey;
}
.cta-confirm{
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}
.cta-confirm>button{
  display: flex;
  place-content: center;
  padding: 1rem 2rem;
  width: 100px;
  border: none;
  border-radius: 1.5rem;
}
.cta-confirm>.yes{
  background: var(--color-success);
}
.cta-confirm>.cancel{
  background: var(--color-9);
}
</style>
