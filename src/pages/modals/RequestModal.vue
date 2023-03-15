<template>
	<!-- -->
	<div id="modal" class="fixed z-10 inset-0 overflow-y-auto">
		<div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
			<div class="fixed inset-0 transition-opacity" aria-hidden="true">
				<div class="absolute inset-0 bg-opacity-modal opacity-75" v-on:click="$emit('close')"></div>
			</div>
			<!--  -->
			<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
			<div
				class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-80 max-w-4xl w-full"
				role="dialog"
				aria-modal="true"
				aria-labelledby="modal-headline"
			>
				<div class="bg-white mx-auto py-2 border-b px-7 flex flex-col justify-center gap-y-1">
					<p class="text-center font-bold text-xl">{{ title }}</p>
					<p class="text-center font-bold text-lg text-fatou-gray-300">Submit intro message</p>
					<input
						type="text"
						name=""
						id=""
						class="input input-bordered input-md !border-fatou-gray-500 !text-fatou-gray-900"
						value="{{disabledText}}"
						disabled
					/>
					<textarea
						name=""
						id=""
						class="textarea textarea-bordered !border-fatou-gray-500 !text-fatou-gray-800 resize-none h-32"
						placeholder="{{textAreaPlaceholder}}"
					/>
					<input
						type="text"
						name=""
						id=""
						class="input input-bordered input-md !border-fatou-gray-500 !text-fatou-gray-800"
						v-if="showLinkInput"
						placeholder="{{linkInputPlaceholder}}"
					/>
					<button class="btn btn-primary rounded-4xl mx-4 mt-2">
						{{ btnText }} <img src="/images/svg/paper-plane.svg" alt="" class="ml-2" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	emits: ['close'],
	props: {
		title: '',
		disabledText: '',
		textAreaPlaceholder: '',
		showLinkInput: true,
		linkInputPlaceholder: '',
		btnText: '',
	},
};
</script>

<style scoped>
@import url('/src/assets/css/modal.css');
</style>
