<script>
import { mapActions } from 'vuex'

export default {
  emits: ["close"],
  data(){
      return {
          pauseData: {
              takeBreak: false,
              privacyIssues: false,
              busyDistracting: false,
              connectionIssues: false,
              otherReasons: null,
          },
          isLoading: false,
          isSubmitted: false,
          isRedirecting: false,
          isEdit: false
      }
  },
  methods: {
      ...mapActions(['pauseAccount']),
		handleForm() {
			this.isLoading = true;
            let data = {...this.pauseData}
             if(data.otherReasons == null){
                 data.otherReasons = 'none'
             }

			this.pauseAccount(data)
				.then((res) => {
					setTimeout(() => {
						this.isLoading = !this.isLoading;
						this.isEdit = false;
                        this.isSubmitted = true;
					}, 1000);
					this.$notify({
						type: 'success',
						title: 'Success',
						text: 'Your account was paused successfully',
					});

            setTimeout(() => {
              this.$emit('close');
            }, 1000);
				})
				.catch((err) => {
					setTimeout(() => {
						this.isLoading = !this.isLoading;
						this.isEdit = false;
					}, 1000);
					this.$notify({ type: 'error', title: 'Error', text: 'Failed to pause your account, try again' });
				});
		},
		handleEdit() {
			this.isEdit = true;
		},
  }
}
</script>
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
        class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full z-[1999px]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="absolute right-5 top-4">
          <button v-on:click="$emit('close')" class="bg-fatou-gray-700 focus:outline-none rounded-full p-1">
            <img src="/images/svg/timesicon.svg" alt="close" />
          </button>
        </div>
       <!--  -->
       <div class="bg-white mx-auto py-16 border-b px-12 relative">
           <h1 class="text-2xl font-medium">
                {{isSubmitted ? 'Account Paused' :'Reason for pausing account'}}
            </h1>   
            <div v-if="isSubmitted" class="py-10">
                    <h1 class="text-2xl font-medium text-fatou-black text-center">Your Account has being paused, can be reactivated on next login</h1>
                    <p class="text-center font-medium text-lg py-2">Loading...</p>
            </div>

            <form v-else @submit.prevent="handleForm" class="space-y-3 pt-10">
                <div class="flex items-center space-x-3">
                    <input type="checkbox" class="h-6 w-6" v-model="pauseData.busyDistracting" @click="handleEdit">
                    <label for="" class="text-lg text-fatou-black-150">Too busy / Distracting</label>
                </div>
                <div class="flex items-center space-x-3">
                    <input type="checkbox" class="h-6 w-6" v-model="pauseData.takeBreak" @click="handleEdit">
                    <label for="" class="text-lg text-fatou-black-150">Just need a break</label>
                </div>
                <div class="flex items-center space-x-3">
                    <input type="checkbox" class="h-6 w-6"  v-model="pauseData.privacyIssues" @click="handleEdit">
                    <label for="" class="text-lg text-fatou-black-150">Privacy Concern</label>
                </div>
                <div class="flex items-center space-x-3">
                    <input type="checkbox" class="h-6 w-6" v-model="pauseData.connectionIssues" @click="handleEdit">
                    <label for="" class="text-lg text-fatou-black-150">Not enough connection</label>
                </div>
                <!--  -->
                <div class="py-2 space-y-1">
                    <p class="text-fatou-black-150 text-sm">Other</p>
                    <input type="text" v-model="pauseData.otherReasons" @click="handleEdit" class="focus:outline-none py-2 px-3 w-full rounded bg-[#F7F7FC] border border-[#EDEDED]" />
                </div>

                <!-- button -->
                <div class="mt-4 flex justify-end gap-x-2">
						<button v-on:click="$emit('close')" class="btn btn-outline btn-primary rounded-3xl px-7">Cancel</button>
						<button :disabled="isLoading || !isEdit" class="btn btn-primary rounded-3xl px-7 flex items-center justify-center space-x-1">
							<div
							v-if="isLoading"
								class="
								h-5
								w-5
								mr-3
								loader
								ease-linear
								rounded-full
								border-2 border-t-2 border-gray-200
								"
							></div>
						<span>
							Pause
						</span>
						</button>
					</div>
            </form>
       </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url("/src/assets/css/modal.css");
</style>