<template>
	<div class="w-3/4 flex flex-col items-center justify-center h-screen gap-4">
		<CounterScore />
		<CardsGrid />
	</div>
</template>
<script setup lang="ts">
import CounterScore from "./components/CounterScore.vue";
import CardsGrid from "./layouts/CardsGrid.vue";
</script>
