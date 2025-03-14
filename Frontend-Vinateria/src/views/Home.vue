<template>
	<main>
		<NavbarDropdown></NavbarDropdown>

		<section class="MT-4">
			<h1 class="text-3xl font-semibold text-gray-800 dark:text-gray-200">Proveedores</h1>
			<Proveedores></Proveedores>
		</section>
		
		<section class="mt-4">
			<h1 class="text-3xl font-semibold text-gray-800 dark:text-gray-200">Productos</h1>
			<Productos></Productos>
		</section>

		<section class="mt-4">
			<h1 class="text-3xl font-semibold text-gray-800 dark:text-gray-200">Clientes</h1>
			<Clientes></Clientes>
		</section>
		
		<section class="mt-4">
			<h1 class="text-3xl font-semibold text-gray-800 dark:text-gray-200">Empleados</h1>
			<Empleados></Empleados>
		</section>

		<section class="mt-4">
			<h1 class="text-3xl font-semibold text-gray-800 dark:text-gray-200">Ventas</h1>
			<Ventas></Ventas>
		</section>

		<section>
		</section>
	</main>
</template>

<script setup>
	import { useCount } from '@/stores/counter'
	import { useRouter } from 'vue-router'
	import Pill from '@/components/Pill.vue'
	import Productos from '../components/Productos.vue'
	

	import Footer from '@/components/Footer.vue'
	import NavbarDropdown from '../components/NavBar.vue'
import Clientes from '../components/Clientes.vue'
import Empleados from '../components/Empleados.vue'
import Proveedores from '../components/Proveedores.vue'
import Ventas from '../components/Ventas.vue'
	
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
