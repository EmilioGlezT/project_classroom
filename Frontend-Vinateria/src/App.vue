<template>
	<main class="app">
		<router-view></router-view>
	</main>
</template>

<style scoped>
.app {
	@apply w-full min-h-screen p-5 flex justify-center bg-gray-900 text-white;
}

.app > * {
	@apply w-full max-w-screen-xl;
}
</style>


