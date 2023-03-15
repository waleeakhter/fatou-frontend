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
        class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full z-[1999px]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="absolute right-5 top-4">
          <button v-on:click="$emit('close')" class="bg-fatou-gray-700 focus:outline-none rounded-full p-1">
            <img src="/images/svg/timesicon.svg" alt="close" />
          </button>
        </div>
        <div class="bg-white mx-auto py-10 border-b sm:px-10 px-4">
            <h1 class="text-3xl font-medium">
                How can we <span class="text-fatou-blue">help</span> you ?
            </h1>
            <form action="">
        <div class="flex items-center justify-between space-x-6">
                <div class="form-control w-full">
					<label class="label">
						<span class="label-text text-fatou-gray-400">First Name</span>
					</label>
					<input
						type="text"
						class="
							w-full
							bg-fatou-gray-200
							focus:outline-none
							py-2
							px-3
							border-fatou-gray-400 border-[1px]
							rounded-md
						"
					/>
				</div>
				<div class="form-control w-full">
					<label class="label">
						<span class="label-text text-fatou-gray-400">Last Name</span>
					</label>
					<input
						type="text"
						class="
							w-full
							bg-fatou-gray-200
							focus:outline-none
							py-2
							px-3
							border-fatou-gray-400 border-[1px]
							rounded-md
						"
					/>
				</div>
            </div>
            <!--  -->
            <div class="flex items-center justify-between space-x-6">
                <div class="form-control w-full">
					<label class="label">
						<span class="label-text text-fatou-gray-400">Email</span>
					</label>
					<input
						type="email"
						class="
							w-full
							bg-fatou-gray-200
							focus:outline-none
							py-2
							px-3
							border-fatou-gray-400 border-[1px]
							rounded-md
						"
					/>
				</div>
            </div>
            <!--  -->
            <div class="flex items-center justify-between space-x-6">
                <div class="form-control w-full">
					<label class="label">
						<span class="label-text text-fatou-gray-400">Contact Number</span>
					</label>
					<input
						type="text"
						class="
							w-full
							bg-fatou-gray-200
							focus:outline-none
							py-2
							px-3
							border-fatou-gray-400 border-[1px]
							rounded-md
						"
					/>
				</div>
            </div>

            <!--  -->
            <div class="py-2">
                <div class="form-control">
					<select
						type="text"
						class="
							w-full
							bg-fatou-gray-200
							focus:outline-none
							py-2
							px-3
							border-fatou-gray-400 border-[1px]
							text-fatou-gray-400
							rounded-md
						"
					>
						<option value="Pronouns" selected disabled>Inquiry</option>
					</select>
				</div>
            </div>

            <div class="py-2">
                <div class="form-control">
					<textarea class="focus:outline-none bg-fatou-gray-200 border-fatou-gray-400 border-[1px] text-fatou-gray-400 rounded-md px-3 py-2 w-full" rows="8" placeholder="Message"></textarea>
				</div>
            </div>
            <div class="py-2">
					<button
						v-on:click="$emit('close')"
						class="btn bg-fatou-blue hover:bg-fatou-blue rounded-3xl border-0 text-white px-16"
					>
						Submit
					</button>
				</div>

            </form>
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