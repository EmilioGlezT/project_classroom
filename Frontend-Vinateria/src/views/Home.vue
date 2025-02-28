<template>
	<main>
		<NavbarDropdown></NavbarDropdown>

		
		<section>
			<Productos></Productos>
		</section>
		
		

		<section>
		</section>

		<Footer />
	</main>
</template>

<script setup>
	import { useCount } from '@/stores/counter'
	import { useRouter } from 'vue-router'
	import Pill from '@/components/Pill.vue'
	import Productos from '../components/Productos.vue'
	

	import Footer from '@/components/Footer.vue'
	import NavbarDropdown from '../components/NavBar.vue'
	
	const count = useCount()
	const router = useRouter()

	const movePage = to => router.push({ name: to })
	
	const dependencies = [
		"Vue v.3.2.25",
		"Tailwindcss v.3.0.18",
		"Vue router v.4.0.12",
		"Pinia v.2.0.10",
		"Vite v.2.7.2",
		"Postcss v.8.4.5",
		"Autoprefixer v.10.4.2"
	]

	const routes = [
		{
			name: 'About',
			to: 'About'
		},
		{
			name: 'Blank screen',
			to: 'Blank'
		}
	]
</script>

<style scoped>
	.section {
		@apply w-full bg-gray-50 py-8 px-5 rounded mb-8;
	}

	.btn-count {
		@apply px-3 py-1 bg-indigo-400 text-gray-50 rounded;
	}
</style>
