<template>
	<div class="w-full flex flex-col items-center justify-center gap-4 md:w-3/4">
		<CounterScore />
		<CardsGrid :images="memorizeStore.getDoubleRandomizedImages" />
		<CongratsModal />
		<RegisterModal />
	</div>
</template>
<script setup lang="ts">
/* Dependencies */
import {onMounted} from "vue";

/* Components */
import CongratsModal from "./components/CongratsModal.vue";
import RegisterModal from "./components/RegisterModal.vue";
import CounterScore from "./components/CounterScore.vue";
import CardsGrid from "./layouts/CardsGrid.vue";

/* Stores */
import {useMemorizeStore} from "./stores/memorizeStore.ts";

/* Data */
const memorizeStore = useMemorizeStore()

/* Lifecycle */
onMounted(() => {
	memorizeStore.getImages(1);
	let user = localStorage.getItem("user");
	if (!user) {
		localStorage.setItem("easy", "0");
		localStorage.setItem("medium", "0");
		localStorage.setItem("hard", "0");
		memorizeStore.openRegisterModal = true
	}
})
</script>
