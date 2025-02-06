<template>
	<div class="relative w-auto h-54 cursor-pointer" @click="flipCard">
		<!-- Front side -->
		<div
			v-if="turnCard"
			class="absolute inset-0 bg-red-900 text-white flex flex-col justify-center items-center rounded-xl transform transition duration-500 ease-in-out opacity-100 scale-100"
			:class="{ 'opacity-0 scale-0': !turnCard }"
		>
			Content
		</div>
		<!-- Back side -->
		<div
			v-else
			class="absolute inset-0 bg-slate-950 flex flex-col justify-center items-center rounded-xl transform transition duration-500 ease-in-out opacity-100 scale-100"
			:class="{ 'opacity-0 scale-0': turnCard }"
		>
			<span class="text-6xl font-black text-slate-800">?</span>
		</div>
	</div>
</template>

<script setup lang="ts">
/* Dependencies */
import { ref } from 'vue';

/* Data */
const turnCard = ref(false);

/* Methods */
const flipCard = () => turnCard.value = !turnCard.value;
</script>
<style scoped>
</style>