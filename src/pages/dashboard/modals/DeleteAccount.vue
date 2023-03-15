<script>
import useVuelidate from '@vuelidate/core';
import { required, helpers, email } from '@vuelidate/validators';
import { mapActions } from 'vuex';

export default {
  emits: ["close"],
  data(){
      return {
          v$: useVuelidate(),
          deleteData: {
              email: '',
              password: '',
              notUseful: false,
              dontUnderstand: false,
              safetyIssues: false,
              privacyIssues: false,
              otherReasons: null,
          },
          isLoading: false,
          isSubmitted: false,
          isRedirecting: false,
          isEdit: false
      }
  },
  validations() {
		return {
			deleteData: {
				 email: {
                    required: helpers.withMessage("Email address is required", required),
                    email: helpers.withMessage("Must be a valid email", email),
                },
                password: {
                    required: helpers.withMessage("Password is required", required),
                },
			},
		};
	},
  methods: {
      ...mapActions(['deleteAccount']),
		handleForm() {
			this.isLoading = true;
            let data = {...this.deleteData}
             if(data.otherReasons == null){
                 data.otherReasons = 'none'
             }

			this.deleteAccount(data)
				.then((res) => {
					setTimeout(() => {
						this.isLoading = !this.isLoading;
						this.isEdit = false;
                        this.isSubmitted = true;
					}, 1000);
					this.$notify({
						type: 'success',
						title: 'Success',
						text: 'Your account was deleted successfully',
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
                    if(err.response && err.response.data && err.response.data.error.toString().toLowerCase().includes("password")){
                        this.$notify({ type: 'error', title: 'Error', text: 'Wrong email or password, check and try again' });
                    } else { 
					    this.$notify({ type: 'error', title: 'Error', text: 'Failed to delete your account, try again' });
                    }
				});
		},
		handleEdit() {
			this.isEdit = true;
		}
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
       <div class="bg-white mx-auto py-10 border-b px-12 relative">
           <h1 class="text-2xl font-medium">
                {{isSubmitted ? 'Account Disabled' : "We're sorry that you're leaving!"}}
            </h1>
            <p v-if="!isSubmitted" class="text-sm">Before you delete your account, can you tell us why you're leaving?</p>

             <div v-if="isSubmitted" class="py-10">
                <h1 class="text-2xl font-medium text-fatou-black text-center">Your Account has being deleted</h1>
                <p class="text-center font-medium text-lg py-2">Loading...</p>
             </div>

            <form v-else @submit.prevent="handleForm" class="space-y-3 pt-10">
                <div class="flex items-center space-x-3">
                    <input type="checkbox" class="h-6 w-6" v-model="deleteData.notUseful" @click="handleEdit">
                    <label for="" class="text-lg text-fatou-black-150">I don't find it useful</label>
                </div>
                <div class="flex items-center space-x-3">
                    <input type="checkbox" class="h-6 w-6" v-model="deleteData.dontUnderstand" @click="handleEdit">
                    <label for="" class="text-lg text-fatou-black-150">I don't understand how it works</label>
                </div>
                <div class="flex items-center space-x-3">
                    <input type="checkbox" class="h-6 w-6" v-model="deleteData.safetyIssues" @click="handleEdit">
                    <label for="" class="text-lg text-fatou-black-150">I have safety concerns</label>
                </div>
                <div class="flex items-center space-x-3">
                    <input type="checkbox" class="h-6 w-6" v-model="deleteData.privacyIssues" @click="handleEdit">
                    <label for="" class="text-lg text-fatou-black-150">I have privacy concerns</label>
                </div>
                <!--  -->
                <div class="py-2 space-y-1">
                    <p class="text-fatou-black-150 text-sm">Please list any other reasons why you might be leaving:</p>
                    <input type="text" v-model="deleteData.otherReasons" @click="handleEdit" class="focus:outline-none py-2 px-3 w-full rounded bg-[#F7F7FC] border border-[#EDEDED]" />
                </div>
                <div class="space-y-1">
                    <input type="email" v-model="v$.deleteData.email.$model" @click="handleEdit" class="focus:outline-none py-2 px-3 w-full rounded bg-[#F7F7FC] border border-[#EDEDED]" placeholder="Email" />
                    <!-- error -->
                    <div v-if="v$.deleteData.email.$error" class="text-red-600 text-xs">
                        {{'* ' + v$.deleteData.email.$errors[0].$message }}
                        </div>
                    <input type="password" v-model="v$.deleteData.password.$model" @click="handleEdit" class="focus:outline-none py-2 px-3 w-full rounded bg-[#F7F7FC] border border-[#EDEDED]" placeholder="Password" />
                     <!-- error -->
                    <div v-if="v$.deleteData.password.$error" class="text-red-600 text-xs">
                        {{'* ' + v$.deleteData.password.$errors[0].$message }}
                        </div>
                </div>

                <!-- button -->
                <div class="mt-4 flex justify-end gap-x-2">
						<button type="button" v-on:click="$emit('close')" class="btn btn-primary rounded-3xl px-7">Cancel</button>
						<button :disabled="v$.deleteData.$invalid || isLoading || !isEdit" type="submit" class="btn btn-error rounded-3xl px-7 flex items-center justify-center space-x-1">
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
							Delete Account
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