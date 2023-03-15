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
				class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full z-[1999px]"
				role="dialog"
				aria-modal="true"
				aria-labelledby="modal-headline"
			>
				<span class="text-2xl font-bold absolute left-5 top-4">New Chat</span>
				<div class="absolute right-5 top-4">
					<button
						v-on:click="$emit('close')"
						class="bg-fatou-gray-700 focus:outline-none rounded-full p-1"
					>
						<img src="/images/svg/timesicon.svg" alt="close" />
					</button>
				</div>
				<div class="bg-white mx-auto py-10 border-b px-5">
					<p class="text-sm text-fatou-gray-300 my-3">Chat your contact</p>
					<input
						type="text"
						name=""
						id=""
						class="input input-bordered input-md !border-fatou-gray-500 !text-fatou-gray-900 w-full mb-3"
						value="Network"
						disabled
					/>
					<textarea
						name=""
						id=""
						class="textarea textarea-bordered !border-fatou-gray-500 !text-fatou-gray-800 resize-none h-32 w-full mb-3"
						placeholder="Type a message"
					/>
					<button class="btn btn-primary rounded-4xl w-full">
						Chat <img src="/images/svg/paper-plane.svg" alt="" class="ml-2" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	emits: ['close'],
};
</script>

<style scoped>
@import url('/src/assets/css/modal.css');
</style>
