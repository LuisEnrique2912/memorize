<template>
	<div class="w-full h-full">
		<Teleport to="body">
			<div class="fixed inset-0 z-50 flex items-center gap-5 justify-center bg-slate-50/50 bg-opacity-90" v-if="memorizeStore.getRegisterModal">
				<div class="bg-slate-900 rounded-xl shadow-lg p-6 max-w-sm w-full flex flex-col gap-10">
					<div class="flex flex-col gap-0">
						<h2 class="text-4xl text-green-400 font-bold mb-4">¡Registrate!</h2>
						<p class="text-white font-medium">Guardaremos tu puntaje</p>
					</div>
					<div class="flex flex-col gap-4">
						<input
							type="text"
							class="px-6 py-4 bg-white text-slate-500 rounded-xl text-sm font-medium"
							placeholder="Ingresa tu nombre"
							v-model="name"
						/>
						<button
							class="px-6 py-3 bg-blue-900 text-white rounded-xl hover:bg-blue-950 hover:cursor-pointer text-sm font-medium"
							@click="registerUser()"
						>
							Registrarme
						</button>
					</div>
				</div>
			</div>
		</Teleport>
	</div>
</template>
<script setup lang="ts">
/* Dependencies */
import { ref } from "vue"

/* Stores */
import { useMemorizeStore } from "../stores/memorizeStore.ts";

/* Data */
let name = ref("");
const memorizeStore = useMemorizeStore();

/* Methods */
const registerUser = async () => {
	localStorage.setItem("user", name.value);
	memorizeStore.openRegisterModal = false;
	location.reload();
}
</script>
<style scoped>
</style>