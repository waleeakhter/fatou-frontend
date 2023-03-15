<template>
	<!-- -->
	<div id="modal" class="fixed z-10 inset-0 overflow-y-auto">
		<div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
			<div class="fixed inset-0 transition-opacity" aria-hidden="true">
				<div class="absolute inset-0 bg-opacity-modal opacity-75"></div>
			</div>
			<!--  -->
			<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
			<div
				class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
				role="dialog"
				aria-modal="true"
				aria-labelledby="modal-headline"
			>
				<img src="/images/svg/blob-top-left.svg" class="absolute w-32" alt="" />
				<img src="/images/svg/blob-bottom-right.svg" class="absolute bottom-0 right-0" alt="" />
				<div class="absolute right-5 top-4">
					<button
						v-on:click="$emit('close')"
						class="bg-fatou-gray-700 focus:outline-none rounded-full p-1"
					>
						<img src="/images/svg/timesicon.svg" alt="close" />
					</button>
				</div>
				<div class="bg-white mx-auto py-10 border-b px-7">
					<div class="flex justify-center">
						<img src="/images/png/logo.png" class="w-52 mt-20" alt="close" />
					</div>

					<div class="my-16 text-center text-xl font-medium">{{ notification }}</div>

					<div class="flex justify-center text-fatou-blue text-4xl font-bold mb-10">Team Fatou</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	emits: ['close'],
	props: {
		notification: '',
	},
};
</script>

<style scoped>
@import url('/src/assets/css/modal.css');
</style>
