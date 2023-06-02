<template>
  <footer>
    <div class="footer-container py-1">
      <div class="logo">
        <a href="#"><img :src="LogoImg" alt="logo image" class="pt-1"></a>
      </div>

      <div class="other-links">
        <div v-for="(link, index) in footerLinks" :key="index" class="links pt-1">
          <a :href="link.href" class="text-color-3 hover-opacity">{{ link.name }}</a>
        </div>
      </div>

    </div>
      <hr>
      <div class="name text-center text-color-2 py-1 text-sm">Crafted by Frank Udeorah</div>
  </footer>
</template>

<script>
import LogoImg from '../assets/img/logo.svg'
  export default {
    data() {
      return {
        LogoImg
      }
    },
    setup() {
      const footerLinks = [
        {
          name: "About",
          href: "#"
        },
        {
          name: "Jobs",
          href: "#"
        },
        {
          name: "Contact",
          href: "#"
        },
        {
          name: "Terms",
          href: "#"
        },
        {
          name: "Policy",
          href: "#"
        },
      ]
      return { footerLinks }
    }
  }
</script>

<style scoped>
</style>
