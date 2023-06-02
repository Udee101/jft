<template>
  <nav>
    <div class="nav-container">
      <div class="logo text-md font-bold">
        <a href="/"><img :src="LogoImg" alt="logo image"></a>
      </div>

      <div class="nav-menu">
        <ul>
          <a href="#home" class="text-color-3"><li>Home</li></a>
          <a href="#categories" class="text-color-3"
            ><li>Categories</li></a
          >
          <a href="#jobs" class="text-color-3"><li>Jobs</li></a>
        </ul>
      </div>

      <div class="authenticate">
        <router-link :to="{ name: 'login' }" class="text-color-3 hover-opacity"
          >Sign in</router-link
        >
        <router-link :to="{ name: 'register' }" class="register hover-opacity"
          >Sign up</router-link
        >
      </div>
    </div>
  </nav>
</template>

<script>
import LogoImg from '../assets/img/logo.svg'
export default {
  data() {
    return {
      LogoImg,
    }
  },
};
</script>

<style scoped></style>
