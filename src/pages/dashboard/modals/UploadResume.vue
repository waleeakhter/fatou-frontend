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
				class="
					relative
					inline-block
					align-bottom
					bg-white
					rounded-lg
					text-left
					overflow-hidden
					shadow-xl
					transform
					transition-all
					sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full
					z-[1999px]
				"
				role="dialog"
				aria-modal="true"
				aria-labelledby="modal-headline"
			>
				<span class="text-2xl font-bold absolute left-5 top-4">Upload your resume</span>
				<div class="absolute right-5 top-4">
					<button
						v-on:click="$emit('close')"
						class="bg-fatou-gray-700 focus:outline-none rounded-full p-1"
					>
						<img src="/images/svg/timesicon.svg" alt="close" />
					</button>
				</div>
				<div class="bg-white mx-auto py-10 border-b px-16">
					<div
						class="
							border-2 border-dashed border-gray-400
							flex
							items-center
							justify-center
							py-16
							mt-10
							rounded-lg
							btn
							bg-transparent
							text-black
							hover:bg-transparent
							h-auto
							capitalize
						"
					>
						<div class="text-center my-5">
							<div class="flex justify-center mb-10">
								<svg
									width="51"
									height="44"
									viewBox="0 0 51 44"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M24.5 28C24.5 28.8284 25.1716 29.5 26 29.5C26.8284 29.5 27.5 28.8284 27.5 28H24.5ZM27.0607 0.939341C26.4749 0.353554 25.5251 0.353554 24.9393 0.939341L15.3934 10.4853C14.8076 11.0711 14.8076 12.0208 15.3934 12.6066C15.9792 13.1924 16.9289 13.1924 17.5147 12.6066L26 4.12132L34.4853 12.6066C35.0711 13.1924 36.0208 13.1924 36.6066 12.6066C37.1924 12.0208 37.1924 11.0711 36.6066 10.4853L27.0607 0.939341ZM27.5 28V2H24.5V28H27.5Z"
										fill="#8D8D8D"
									/>
									<path
										d="M50.5 15C50.5 14.1716 49.8284 13.5 49 13.5C48.1716 13.5 47.5 14.1716 47.5 15H50.5ZM3.5 15C3.5 14.1716 2.82843 13.5 2 13.5C1.17157 13.5 0.5 14.1716 0.5 15H3.5ZM47.5 15V39H50.5V15H47.5ZM46 40.5H5V43.5H46V40.5ZM3.5 39V15H0.5V39H3.5ZM5 40.5C4.17157 40.5 3.5 39.8284 3.5 39H0.5C0.5 41.4853 2.51472 43.5 5 43.5V40.5ZM47.5 39C47.5 39.8284 46.8284 40.5 46 40.5V43.5C48.4853 43.5 50.5 41.4853 50.5 39H47.5Z"
										fill="#8D8D8D"
									/>
								</svg>
							</div>
							Drag & Drop your resume or Browse
						</div>
					</div>
					<div
						class="
							border-2 border-dashed border-gray-400
							flex flex-col
							gap-y-4
							py-16
							mt-10
							rounded-lg
							px-4
						"
					>
						Resume.pdf
						<progress class="progress progress-success" value="100" max="100"></progress>
						Ready to share
					</div>
					<div class="mt-10 flex justify-center gap-x-4">
						<button
							class="
								btn
								bg-gray-400
								hover:bg-gray-500
								border-gray-400
								hover:border-gray-500
								rounded-3xl
								px-7
								btn-block
							"
						>
							Share
						</button>
					</div>
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
