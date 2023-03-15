<script >
export default {
  components: {

  },
  props: ['resumeSrc'],
  emits: ["close"],

  data() {
    return {
      imageStorageUrl: import.meta.env.VITE_APP_SERVER_STORAGE_URL,

    }
  },
  mounted() { },

  methods: {}
};
</script>

<template>
  <div id="modal" class="fixed inset-0 z-20 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" @click="$emit('close')" aria-hidden="true">
        <div class="absolute inset-0 opacity-75 bg-opacity-modal"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full
        z-[1999px]" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <div v-if="resumeSrc">
          <div class="absolute right-5 top-4">
            <button c class="p-1 rounded-full bg-fatou-gray-700 focus:outline-none" v-on:click="$emit('close')">
              <img src="/images/svg/timesicon.svg" alt="close" />
            </button>
          </div>
          <div class="p-5 pt-16">
            <iframe :src="imageStorageUrl + '/' + resumeSrc + '#toolbar=0&scrollbar=0'" scrolling="auto" width="100%"
              height="600px"></iframe>

          </div>
          <div class="flex justify-center mt-5 mb-10">
            <a :href="imageStorageUrl + '/' + resumeSrc" target="_blank" download
              class="flex items-center justify-center flex-shrink-0 px-8 py-2 space-x-2 font-medium text-white border-2 rounded-full bg-fatou-blue border-fatou-blue">
              <span>Download Resume</span>
            </a>
          </div>
        </div>
        <div v-else >
          <div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md animate-pulse" role="alert">
            <div class="flex">
              <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path
                    d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg></div>
              <div>
                <p class="font-bold">No Resume</p>
                <p class="text-sm">This user has not uploaded resume yet.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>


<style scoped>
@import url("/src/assets/css/modal.css");
</style>