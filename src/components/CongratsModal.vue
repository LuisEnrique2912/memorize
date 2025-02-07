<template>
	<div class="w-full h-full">
		<Teleport to="body">
			<div class="fixed inset-0 z-50 flex items-center gap-5 justify-center bg-slate-50/50 bg-opacity-90" v-if="memorizeStore.getCongratsModal">
				<div class="bg-slate-900 rounded-xl shadow-lg p-6 max-w-sm w-full flex flex-col gap-10">
					<div class="flex flex-col gap-0">
						<h2 class="text-4xl text-amber-400 font-bold mb-4">
							{{ '!! Felicidades ' + memorizeStore.getPlayerName + ' !!' }}
						</h2>
						<p class="text-white font-medium">Completaste el memorama.</p>
					</div>
					<div class="flex justify-end">
						<button
							class="px-6 py-2 bg-blue-900 text-white rounded-xl hover:bg-blue-950 hover:cursor-pointer text-sm font-medium"
							@click="finishGame()"
						>
							Nuevo Juego
						</button>
					</div>
				</div>
			</div>
		</Teleport>
	</div>
</template>
<script setup lang="ts">
/* Stores */
import { useMemorizeStore } from "../stores/memorizeStore.ts";

/* Data */
const memorizeStore = useMemorizeStore();

/* Methods */
const finishGame = () => memorizeStore.resetGame();
</script>
<style scoped>
</style>