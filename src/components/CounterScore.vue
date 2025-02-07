<template>
	<div class="w-full grid grid-cols-1 justify-center items-center rounded-xl gap-10 bg-slate-900 p-6 sm:grid-cols-2 xl:grid-cols-4">
		<div class="w-full h-full flex flex-col justify-center items-start rounded-xl gap-1 text-slate-400">
			<p class="text-sm">Bienvenido</p>
			<b class="text-sm">{{ memorizeStore.getPlayerName || 'Sin Nombre Asignado' }}</b>
		</div>
		<div class="w-full h-full flex flex-col justify-center items-start rounded-xl gap-1 text-slate-400">
			<div class="w-full flex flex-row justify-between items-start gap-8">
				<p class="text-sm font-regular">
					Nivel de Dificultad
				</p>
				<b class="text-sm font-bold" :class="memorizeStore.getGameLevelColor">
					{{ memorizeStore.getGameLevelName || 'Sin Nivel Asignado' }}
				</b>
			</div>

			<div class="w-full flex flex-col justify-center items-start">
				<select id="difficulty" @change="updateDifficulty" class="w-full bg-slate-900 text-sm text-slate-400">
					<option value="1">Fácil</option>
					<option value="2">Medio</option>
					<option value="3">Difícil</option>
				</select>
			</div>
		</div>
		<div class="w-full h-full flex flex-col justify-center items-start rounded-xl gap-1 text-slate-400">
			<p class="text-sm">Mejor Puntaje</p>
			<b class="text-sm" v-if="memorizeStore.gameLevel == 1">
				{{ memorizeStore.getEasyMaxScore + ' Movimientos Totales' }}
			</b>
			<b class="text-sm" v-if="memorizeStore.gameLevel == 2">
				{{ memorizeStore.getMediumMaxScore + ' Movimientos Totales' }}
			</b>
			<b class="text-sm" v-if="memorizeStore.gameLevel == 3">
				{{ memorizeStore.getHardMaxScore + ' Movimientos Totales' }}
			</b>
		</div>
		<div class="w-full flex flex-row justify-center items-center rounded-xl">
			<div class="w-full flex flex-col justify-center items-center rounded-l-xl py-2 px-10 bg-green-900 text-green-400">
				<p class="text-sm font-medium">Aciertos</p>
				<p class="text-xl font-bold">{{ memorizeStore.getHits }}</p>
			</div>
			<div class="w-full flex flex-col justify-center items-center rounded-r-xl py-2 px-10 bg-red-900 text-red-400">
				<p class="text-sm font-medium">Errores</p>
				<p class="text-xl font-bold">{{ memorizeStore.getMisses }}</p>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
/* Dependencies */

/* Stores */
import { useMemorizeStore } from "../stores/memorizeStore.ts";

/* Data */
const memorizeStore = useMemorizeStore();
defineProps({
	name: String
})

/* Methods */
const updateDifficulty = async (event: Event) => {
	let target = event.target as HTMLSelectElement;
	let level = parseInt(target.value);
	await memorizeStore.getImages(level);
}
</script>
<style scoped>
</style>