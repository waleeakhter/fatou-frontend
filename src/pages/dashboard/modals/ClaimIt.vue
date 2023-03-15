<script>
import useVuelidate from '@vuelidate/core';
import { required, helpers, url, email } from '@vuelidate/validators';
export default {
  emits: ['close'],
  mounted() {
    this.user = Object.assign({}, this.$store.state.auth.currentUser)
    if(this.user) {
      this.v$.claimForm.fullName.$model = this.user.firstName + ' ' + this.user.lastName
      this.v$.claimForm.email.$model = this.user.email
      this.claimForm.profileImage = this.user.avatar || null
      this.v$.claimForm.linkedIn.$model = this.user.linkedIn || ''
    }
  },
  data() {
    return {
      v$: useVuelidate(),
      user: null,
      claimForm: {
        fullName: '',
        email: '',
        linkedIn: '',
        profileImage: '',
        companyLogo: '',
      },
    };
  },
  validations() {
    return {
      claimForm: {
        fullName: {
          required: helpers.withMessage(
            'please enter your full name.',
            required
          ),
        },
        email: {
          required: helpers.withMessage('Email address is required', required),
          email: helpers.withMessage('Must be a valid email', email),
        },
        linkedIn: {
          url: helpers.withMessage('Url not valid', url),
        },
      },
    };
  },
};
</script>

<template>
  <!-- -->
  <div id="modal" class="fixed z-10 inset-0 overflow-y-auto">
    <div
      class="
        flex
        items-end
        justify-center
        min-h-screen
        pt-4
        px-2
        pb-20
        text-center
        sm:block sm:p-0
      "
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
        class="
          relative
          inline-block
          align-bottom
          bg-white
          rounded-4xl
          text-left
          overflow-hidden
          shadow-xl
          transform
          transition-all
          sm:my-8 sm:align-middle sm:w-[40rem]
          max-w-md
          z-[1999px]
        "
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
        <div class="bg-white mx-auto py-10 pb-20 border-b px-16">
          <form @submit.prevent>
            <div class="flex flex-wrap">
              <div class="w-full py-2 px-2">
                <!-- Full name error -->
                <div
                  v-if="v$.claimForm.fullName.$error"
                  class="text-red-600 text-xs"
                >
                  {{ '* ' + v$.claimForm.fullName.$errors[0].$message }}
                </div>
                <input
                  v-model="v$.claimForm.fullName.$model"
                  class="
                    w-full
                    focus:outline-none
                    py-2
                    px-3
                    border-fatou-gray-400 border-[1px]
                    rounded-md
                  "
                  placeholder="Full Name"
                />
              </div>
              <div class="w-full py-2 px-2">
                <!-- Full name error -->
                <div
                  v-if="v$.claimForm.email.$error"
                  class="text-red-600 text-xs"
                >
                  {{ '* ' + v$.claimForm.email.$errors[0].$message }}
                </div>
                <input
                  v-model="v$.claimForm.email.$model"
                  class="
                    w-full
                    focus:outline-none
                    py-2
                    px-3
                    border-fatou-gray-400 border-[1px]
                    rounded-md
                  "
                  placeholder="Company Domain Email"
                />
              </div>
              <div class="w-full py-2 px-2">
                <!-- Full name error -->
                <div
                  v-if="v$.claimForm.linkedIn.$error"
                  class="text-red-600 text-xs"
                >
                  {{ '* ' + v$.claimForm.linkedIn.$errors[0].$message }}
                </div>
                <input
                  v-model="v$.claimForm.linkedIn.$model"
                  class="
                    w-full
                    focus:outline-none
                    py-2
                    px-3
                    border-fatou-gray-400 border-[1px]
                    rounded-md
                  "
                  placeholder="Person Linkedin"
                />
              </div>
              <div class="w-full py-2 px-2">
                <label class="text-gray-400" for="">Upload Profile Picture</label>
                <input type="file" class="mt-3" />
              </div>
              <!-- <div class="w-full md:1/2 py-2 px-2">
                <button>Upload Logo</button>
              </div> -->
              <div class="w-full pt-4 flex items-center justify-center">
                <button
                  class="
                    btn
                    bg-fatou-blue
                    hover:bg-fatou-blue
                    rounded-md
                    border-0
                    text-white
                    w-1/2
                  "
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('/src/assets/css/modal.css');
</style>
