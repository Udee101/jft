<template>

  <hero-section></hero-section>

	<categories-section></categories-section>

	<featured-jobs-section></featured-jobs-section>

	<news-letter></news-letter>

	<footer-section></footer-section>

</template>

<script>
import HeroSection from '../components/LandingPage/HeroSection.vue';
import CategoriesSection from '../components/LandingPage/CategoriesSection.vue';
import FeaturedJobsSection from '../components/LandingPage/FeaturedJobsSection.vue';
import NewsLetterSection from '../components/LandingPage/NewsLetterSection.vue'
import FooterSection from '../components/FooterSection.vue';

export default {
	components: {
		"hero-section": HeroSection,
		"categories-section": CategoriesSection,
		"featured-jobs-section": FeaturedJobsSection,
		"news-letter": NewsLetterSection,
		"footer-section": FooterSection
	},
};
</script>

<style scoped>
</style>
