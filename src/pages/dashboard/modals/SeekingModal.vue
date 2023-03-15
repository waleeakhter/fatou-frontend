<script>
import { mapActions } from 'vuex';
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import accessRequestService from '../../../services/accessRequest.service';
import userService from '../../../services/user.service.js'

export default {
  emits: ["close"],
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      user: {},
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        hiringStatus: ''
      }

    }
  },
  validations() {
    return {
      form: {
        firstName: {
          required: helpers.withMessage("Firstname is required", required),
        },
        lastName: {
          required: helpers.withMessage("Lastname is required", required),
        },
        email: {
          required: helpers.withMessage("Email address is required", required),
          email: helpers.withMessage("Email is not valid", email),
        },
        phone: {
          required: helpers.withMessage("Phone Number is required", required)
        },
        hiringStatus: {
          required: helpers.withMessage("Hiring Status is required", required)
        },
        message: {}
      },
    };
  },
  created() {
    this.getAuthUser().then(({ data }) => {
      this.user = { ...data.user }
      this.form.firstName = this.user.firstName
      this.form.lastName = this.user.lastName
      this.form.email = this.user.email
      this.form.phone = this.user.phone
      this.v$.form.firstName.$dirty = true
      this.v$.form.lastName.$dirty = true
      this.v$.form.phone.$dirty = true
      this.v$.form.email.$dirty = true
    })
  },
  methods: {
    ...mapActions(['getAuthUser']),
    async handleForm() {
      console.log(this.user);

      if (this.user.phone == '' || this.user.phone !== this.form.phone) {
        await userService.updateProfile({firstName:this.form.firstName,lastName:this.form.lastName,phone: this.form.phone })
      }
      this.acccessSubmitCall()
    },

    acccessSubmitCall() {
      accessRequestService.create({ user: this.user._id, message: this.form.message, type: 'recruiterConfirmation',hiringStatus:this.form.hiringStatus })
        .then((response) => {
          this.$notify({ type: 'info', title: 'Request Sent', text: 'You will get the access once admin approves it.' });
          this.$emit('close')
        }).catch((error) => {
          this.$notify({ type: 'error', title: 'Cannot Request', text: 'Your request is already in process' });
        })
    },



    onPhoneInput(phone, phoneObject, input) {
      if (phoneObject?.formatted) {

        this.form.phone = phoneObject.number;
      }
    },
  },


};
</script>
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
        class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full z-[1999px]"
        role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <div class="absolute right-5 top-4">
          <button v-on:click="$emit('close')" class="bg-fatou-gray-700 focus:outline-none rounded-full p-1"> <img
              src="/images/svg/timesicon.svg" alt="close" /> </button>
        </div>
        <div class="bg-white mx-auto py-10 border-b px-8 space-y-2">
          <h1 class="text-xl font-medium">
            Please submit inquiry to gain access to this database.
          </h1>
          <p class="text-sm text-fatou-gray-600">User Info</p>
          <div>
            <form class="w-full m-2 mt-5" @submit.prevent="handleForm">

              <div class="flex flex-wrap -mx-3 mb-6">

                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label class="block text-gray-700 text-sm mb-2" for="firstname"> First Name </label>
                  <input type="text" v-model="v$.form.firstName.$model" readonly="readonly" disabled
                    class="w-full px-3 py-2 input focus:outline-none" id="firstname" />
                  <div v-if="v$.form.firstName.$error" class="text-xs text-red-600">
                    {{ '* ' + v$.form.firstName.$errors[0].$message }}
                  </div>
                </div>

                <div class="w-full md:w-1/2 px-3">
                  <label class="block text-gray-700 text-sm mb-2" for="lastname"> Last Name </label>
                  <input type="text" v-model="v$.form.lastName.$model" readonly="readonly" disabled
                    class="w-full px-3 py-2 input focus:outline-none" id="lastname" />
                  <div v-if="v$.form.lastName.$error" class="text-xs text-red-600">
                    {{ '* ' + v$.form.lastName.$errors[0].$message }}
                  </div>
                </div>

              </div>

              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <input type="text" v-model="v$.form.email.$model" readonly="readonly" disabled
                    class="w-full px-3 py-2 input focus:outline-none" id="email" placeholder="Email" />
                  <div v-if="v$.form.email.$error" class="text-xs text-red-600">
                    {{ '* ' + v$.form.email.$errors[0].$message }}
                  </div>
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <select name="hiringStatus" v-model="v$.form.hiringStatus.$model" class="w-full px-3 py-2 input">
                    <option value="">Hiring Status</option>
                    <option value="inHouseRecruiter">In House Recruiter</option>
                    <option value="inHouseHiringManager">In House Hiring Manager</option>
                    <option value="externalRecruiter">External Recruiter</option>
                  </select>

                </div>


              </div>





              <div class="mb-4">
                <vue-tel-input :value="v$.form.phone.$model" @input="onPhoneInput"
                  class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md">
                </vue-tel-input>
                <!-- <input type="text" v-model="v$.form.phone.$model"  class="w-full px-3 py-2 input focus:outline-none" id="phoneNumber" placeholder="Phone Number" /> -->

                <!-- <div v-if="v$.form.phone.$error" class="text-xs text-red-600">
                      {{'* ' + v$.form.phone.$errors[0].$message }}
                  </div> -->
              </div>

              <div class="mb-4">
                <textarea type="text" v-model="v$.form.message.$model"
                  class="w-full px-3 py-2 input focus:outline-none h-32" id="customMessage"
                  placeholder="Add Custom Message [Optional]"></textarea>
              </div>
              <div v-if="v$.form.$invalid" class="bg-red-100 border-t border-b border-red-500 -700 px-4 py-3"
                role="alert">
                <p class="font-bold text-red-900">Cant submit inquiry </p>
                <p class="text-sm">Please complete you basic information.</p>
              </div>


              <div class="py-3.5 flex items-center justify-center">
                <button type="submit" :disabled="v$.form.$invalid"
                  class="btn bg-fatou-blue hover:bg-fatou-blue rounded-3xl border-0 text-white px-28"> Submit Request
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>




<style scoped>
@import url("/src/assets/css/modal.css");
</style>