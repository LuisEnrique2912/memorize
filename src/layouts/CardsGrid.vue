<template>
	<div class="w-full h-fit bg-slate-900 p-4 grid grid-cols-2 rounded-xl gap-4 lg:grid-cols-4 xl:grid-cols-5">
		<Card
			v-for="image in images"
			:key="image.id"
			:image="image"
		/>
	</div>
</template>
<script setup lang="ts">
/* Components */
import Card from "../components/Card.vue";

/* Data */
interface MemorizeImage {
	id: number,
	title: string,
	url: string,
	uuid: string,
	active: boolean,
	keep: boolean
}
defineProps<{
	images: MemorizeImage[]
}>()
</script>
<style scoped>
</style>