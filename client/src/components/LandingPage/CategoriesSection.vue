<template>
	<section class="categories" id="categories">
		<div class="categories-container">
			<p class="text-center text-xl pb-1 section-header">Categories</p>
			<div class="sub-text">
				<p class="text-center text-color-3 text-md">
					Discover exciting opportunities accross industries and find your
					perfect career fit. Start your job search today and take the next step
					towards your professional goals.
				</p>
			</div>

			<div class="category-wrapper">
				<div class="category">
					<category-box
						v-for="(category, index) in categories"
						:category="category"
						:key="index"
					></category-box>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import CategoryBox from "../CategoryBox.vue";

	export default {
		components: {
			"category-box": CategoryBox,
		},

		setup() {
			const categories = [
				{
					title: "Design & Development",
					color: "border-left-color-1",
				},
				{
					title: "Marketing & Communication",
					color: "border-left-color-2",
				},
				{
					title: "Project Management",
					color: "border-left-color-3",
				},
				{
					title: "Human Research & Development",
					color: "border-left-color-4",
				},
				{
					title: "Finance Management",
					color: "border-left-color-5",
				},
				{
					title: "Business & Consulting",
					color: "border-left-color-6",
				},
			];

			return { categories };
		},
	};
</script>

<style scoped>

</style>
