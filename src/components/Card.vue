<template>
	<div class="relative w-auto h-54 cursor-pointer" @click="flipCard">
		<!-- Front side -->
		<div v-if="props.image.active" class="absolute inset-0 bg-transparent text-white flex flex-col justify-center items-center rounded-xl">
			<img :src="props.image.url" alt="Card image" class="w-full h-full rounded-xl object-cover">
		</div>
		<!-- Back side -->
		<div v-else class="absolute inset-0 bg-slate-950 flex flex-col justify-center items-center rounded-xl">
			<span class="text-8xl font-black text-slate-800">?</span>
		</div>
	</div>
</template>

<script setup lang="ts">
/* Dependencies */
/* Stores */
import { useMemorizeStore } from "../stores/memorizeStore.ts";

/* Data */
interface MemorizeImage {
	id: number,
	title: string,
	url: string,
	uuid: string,
	active: boolean,
	keep: boolean
}

const memorizeStore = useMemorizeStore()
const props = defineProps<{
	image: MemorizeImage,
}>()

/* Methods */
const flipCard = () => {

	if (props.image.keep) {
		alert("Esta carta ya la adivinaste, intenta con otra");
		return
	}

	memorizeStore.openCard(props.image.uuid, props.image.id);

	if (memorizeStore.firstSelection == null) {
		memorizeStore.setFirstSelection(props.image);
	} else if (memorizeStore.secondSelection == null) {
		memorizeStore.setSecondSelection(props.image);
		memorizeStore.checkMatchSelection();
	}
};
</script>
<style scoped>
</style>