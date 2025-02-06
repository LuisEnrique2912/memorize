<template>
	<div class="w-fit flex flex-row justify-center items-center rounded-xl gap-20 bg-slate-900 p-2">
		<div class="w-fit h-full flex flex-col justify-center items-start rounded-xl pl-4 text-slate-400">
			<p>Bienvenido</p>
			<b>{{ name || 'Juan Alberto' }}</b>
		</div>
		<div class="w-fit flex flex-row justify-center items-center rounded-xl">
			<div class="w-fit flex flex-col justify-center items-center rounded-l-xl py-2 px-10 bg-green-900 text-green-400">
				<p class="text-sm font-regular">
					Aciertos
				</p>
				<p class="text-3xl font-bold">
					24
				</p>
			</div>
			<div class="w-fit flex flex-col justify-center items-center rounded-r-xl py-2 px-10 bg-red-900 text-red-400">
				<p class="text-sm font-regular">
					Errores
				</p>
				<p class="text-3xl font-bold">
					24
				</p>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
defineProps({
	name: String
})
</script>
<style scoped>
</style>