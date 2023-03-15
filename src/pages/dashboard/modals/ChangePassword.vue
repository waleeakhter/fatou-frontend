<script>
import useVuelidate from '@vuelidate/core'
import { required, helpers, sameAs } from '@vuelidate/validators'
import { mapActions } from "vuex"; 
export default {
	emits: ["close"],
	setup() {
		return { v$: useVuelidate() }
	},
	data() {
		return {
			oldPassword: '',
			newPassword: '',
			confirmNewPassword: ''
		}
	},
	validations() {
		return {
			oldPassword: { required: helpers.withMessage('Old Password is required', required), },
			newPassword: { required: helpers.withMessage('New Password is required', required), },
			confirmNewPassword: {
				required: helpers.withMessage('Confirm Password is required', required),
				// sameAs :helpers.withMessage('Confirm Password is not same new password',sameAs('newPassword'))
			},
		}
	},
	methods: {

		...mapActions(["changePassword"]),

		handleSubmit() {
			

				this.changePassword({'currentPassword':this.oldPassword,'newPassword':this.newPassword,newPassword_confirmation:this.confirmNewPassword})
					.then((res) => {
						this.$notify({ type: "info", title: 'Successfull', text: 'Password updated successfully'});
						this.$emit('close')
					}).catch((err) => {
							this.$notify({ type: "error", title: 'Failed', text: err.response.data.error});
						console.log(err.response.data.error)
					})
		}

	}
};
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
			<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
			<div
				class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full z-[1999px]"
				role="dialog"
				aria-modal="true"
				aria-labelledby="modal-headline"
			>
				<div class="absolute right-5 top-4">
					<button
						v-on:click="$emit('close')"
						class="bg-fatou-gray-700 focus:outline-none rounded-full p-1"
					>
						<img src="/images/svg/timesicon.svg" alt="close" />
					</button>
				</div>
				<div class="bg-white mx-auto py-10 border-b sm:px-8 px-4">
					<h1 class="text-2xl font-medium">Change Password</h1>
					<form @submit.prevent="handleSubmit">
						<div class="flex items-center justify-between sm:space-x-6 space-x-2 py-2">
							<div class="form-control w-full">
								<label class="label">
									<span class="label-text text-fatou-gray-400 font-bold">Old Password</span>
								</label>
								<input
											@change="v$.oldPassword.$touch"
											type="password"
											v-model="v$.oldPassword.$model"
											class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
										/>
										<div v-if="v$.oldPassword.$error" class="text-red-600 text-xs" >{{ '* ' + v$.oldPassword.$errors[0].$message }}</div>
							</div>
							
						</div>
						<!--  -->
						<div class="flex items-center justify-between space-x-6">
							<div class="form-control w-full">
								<label class="label">
									<span class="label-text text-fatou-gray-400">New Password</span>
								</label>
								<input
											@change="v$.newPassword.$touch"
											type="password"
											v-model="v$.newPassword.$model"
											class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
										/>
										<div v-if="v$.newPassword.$error" class="text-red-600 text-xs" >{{ '* ' + v$.newPassword.$errors[0].$message }}</div>
							</div>
							
						</div>
						<!--  -->
						<div class="flex items-center justify-between space-x-6">
							<div class="form-control w-full">
								<label class="label">
									<span class="label-text text-fatou-gray-400">Confirm Password</span>
								</label>
								<input
											@change="v$.confirmNewPassword.$touch"
											type="password"
											v-model="v$.confirmNewPassword.$model"
											class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
										/>

										<!-- error -->
										<div v-if="v$.confirmNewPassword.$error" class="text-red-600 text-xs" >{{ '* ' + v$.confirmNewPassword.$errors[0].$message }}</div>
							</div>
						</div>
						<div class="w-full py-3.5 flex items-center justify-center">
							<button type="submit"
							:disabled="v$.oldPassword.$invalid || v$.newPassword.$invalid || v$.confirmNewPassword.$invalid"
								class="btn bg-fatou-blue hover:bg-fatou-blue rounded-3xl border-0 text-white w-full"
							>Change Password</button>
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