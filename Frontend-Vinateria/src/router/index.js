import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import LoginScreen from '../views/LoginScreen.vue'
import TestScreen from '../views/TestScreen.vue'
import CreateProduct from '../views/CreateProduct.vue'
import CreateSupplier from '../views/CreateSupplier.vue'
import EditProduct from '../views/EditProduct.vue'
import EditSupplier from '../views/EditSupplier.vue'

const routes = [
	{
		name: 'LoginScreen',
		path: '/',
		component: Home
	},
	{
		name: 'About',
		path: '/about',
		component: () => import('@/views/About.vue')
	},
	{
		name: 'Home',
		path: '/home',
		component: Home
	},

	{
		name: 'Blank',
		path: '/blank',
		component: () => import('@/views/Blank.vue')
	},
	{
		test: 'Test',
		path: '/test',
		component: TestScreen
	},
	{
		name: 'create',
		path: '/create',
		component: CreateProduct
	},
	{
		name: 'create-supplicer',
		path: '/create-supplier',
		component: CreateSupplier
	},
	{
		name: 'edit-product',
		path: '/edit-product/:id',
		component: EditProduct
	},
	{
		name: 'edit-provider',
		path: '/edit-provider/:id',
		component: EditSupplier
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
