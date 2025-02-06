<template>
	<div class="w-full h-fit bg-slate-900 p-4 grid grid-cols-6 rounded-xl gap-4">
		<Card
			v-for="i in 18"
			:key="i"
		/>
	</div>
</template>
<script setup lang="ts">
import Card from "../components/Card.vue";
</script>
<style scoped>
</style>