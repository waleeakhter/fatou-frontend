<template>
  <!-- -->
  <div id="modal" class="fixed z-10 inset-0 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >

      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-opacity-modal opacity-75"></div>
      </div>
      <!--  -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full z-[1999px]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="absolute right-5 top-4">
          <button v-on:click="$emit('close')" class="bg-fatou-gray-700 focus:outline-none rounded-full p-1">
            <img src="/images/svg/timesicon.svg" alt="close" />
          </button>
        </div>
        <div class="bg-white mx-auto py-10 border-b px-8 space-y-2">
            <h1 class="text-xl font-medium">
               Alison’s Resume Preview
            </h1>
            <div>
                <img src="/images/png/resume1.png" alt="resume">
            </div>
            <div class="py-3.5 flex items-center justify-center">
					<button
						class="btn bg-fatou-blue hover:bg-fatou-blue rounded-3xl border-0 text-white px-28"
					>
						Download
					</button>
				</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["close"],
};
</script>

<style scoped>
@import url("/src/assets/css/modal.css");
</style>