<script>

export default {
  emits: ['close'],
	data() {
		return {
			firstName: '',
			lastName: '',
			company: '',
			title: '',
			email: '',
			phone: '',
			requestSent: false,
			isSending: false
		}
	},
	methods: {
		async requestAccess() {
			this.isSending = true
			await this.$store.dispatch("requestAccess", {
				firstName: this.firstName,
				lastName: this.lastName,
				companyName: this.company, 
				title: this.title,
				email: this.email,
				phone: this.phone
			})
				.then((data) => {
					console.log(data)
					this.requestSent = true;
				})
				.catch((err) => {
					if (err.response && err.response.data && err.response.data.error) {
            this.$notify({
              type: "error",
              title: "Error",
              text: err.response.data.error,
            });
          } else {
            this.$notify({
              type: "error",
              title: "Error",
              text: "Network error, try again",
            });
          }
				})
				.finally(() => {
					this.isSending = false;
				})
		}
	}
}
</script>


<template>
  <!-- -->
  <div id="modal" class="fixed inset-0 z-10 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
    >
      <div
        class="fixed inset-0 transition-opacity"
        aria-hidden="true"
        @click="$emit('close')"
      >
        <div class="absolute inset-0 opacity-75 bg-opacity-modal"></div>
      </div>
      <!--  -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
      >
        &#8203;
      </span>
      <div
        class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full z-[1999px]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
				<div>
					<div class="absolute right-5 top-4">
						<button
							v-on:click="$emit('close')"
							class="p-1 rounded-full bg-fatou-gray-700 focus:outline-none"
						>
							<img src="/images/svg/timesicon.svg" alt="close" />
						</button>
					</div>
					<div v-if="!requestSent" class="px-4 py-10 mx-auto bg-white border-b sm:px-8">
						<div class="my-3 space-y-2 text-center">
							<h1 class="text-2xl font-bold text-fatou-blue">
								Request Recruiter Access
							</h1>
							<p>Please submit an inquiry to gain access to the talent database</p>
						</div>
						<form @submit.prevent="requestAccess()">
							<div
								class="flex items-center justify-between space-x-2 sm:space-x-6"
							>
								<div class="w-full form-control">
									<label class="label">
										<span class="label-text text-fatou-gray-400">First Name</span>
									</label>
									<input v-model="firstName" required
										type="text"
										class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
									/>
								</div>
								<div class="w-full form-control">
									<label class="label">
										<span class="label-text text-fatou-gray-400">Last Name</span>
									</label>
									<input v-model="lastName" required
										type="text"
										class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
									/>
								</div>
							</div>
							<div
								class="flex items-center justify-between space-x-2 sm:space-x-6"
							>
								<div class="w-full form-control">
									<label class="label">
										<span class="label-text text-fatou-gray-400">Company</span>
									</label>
									<input v-model="company" required
										type="text"
										class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
									/>
								</div>
								<div class="w-full form-control">
									<label class="label">
										<span class="label-text text-fatou-gray-400">Title</span>
									</label>
									<input v-model="title" required
										type="text"
										class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
									/>
								</div>
							</div>
							<!--  -->
							<div class="flex items-center justify-between space-x-6">
								<div class="w-full form-control">
									<label class="label">
										<span class="label-text text-fatou-gray-400">Work Email</span>
									</label>
									<input v-model="email" required
										type="email"
										class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
									/>
								</div>
							</div>
							<!--  -->
							<div class="flex items-center justify-between space-x-6">
								<div class="w-full form-control">
									<label class="label">
										<span class="label-text text-fatou-gray-400">
											Phone Number
										</span>
									</label>
									<input v-model="phone" required
										type="text"
										class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
									/>
								</div>
							</div>
							<div class="py-3.5 flex items-center justify-center">
								<button type="submit"
									class="space-x-3 text-white border-0 btn bg-fatou-blue hover:bg-fatou-blue rounded-3xl px-28"
								>
									<div v-if="isSending" class="w-5 h-5 ease-linear border-2 border-t-2 border-gray-100 rounded-full text-fatou-blue-700 loader"></div>
									<span>Request</span>
								</button>
							</div>
						</form>
					</div>
					<div v-else class="px-4 py-16 pt-20 space-y-6 text-center">
						<p class="text-lg">Your request has been sent for processing. You will hear back from us in 24 hours. Thank you.</p>
						<div class="flex items-center justify-center ">
							<button @click.prevent="$emit('close')"
								class="space-x-3 text-white border-0 btn bg-fatou-blue hover:bg-fatou-blue rounded-3xl px-28"
							>
								<span>Okay</span>
							</button>
						</div>
					</div>
				</div>

      </div>
    </div>
  </div>
</template>


<style scoped>
@import url('/src/assets/css/modal.css');
</style>
