<script>
import useVuelidate from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import { mapActions } from 'vuex'

// components
import ButtonDark from '../../components/buttons/ButtonDark.vue'
export default {
  components: {
    ButtonDark,
  },

  data() {
    return {
      v$: useVuelidate(),
      form: {
        code: '',
      },
      isLoading: false,
    }
  },

  
  validations() {
    return {
      form: {
        code: {
          required: helpers.withMessage('code address is required', required),
        },
      },
    }
  },
  mounted() {
    this.form.code = this.$route.query.code || '';
    if (this.form.code) {
      this.handleForm();
    }
  },
  methods: {
    ...mapActions(['verifyTwoFactorAuth']),
    handleForm() {
      this.isLoading = true
      // initialize data
      const data = {
        code: this.v$.form.code.$model,
        email: window.localStorage.userEmail
      }

      this.verifyTwoFactorAuth(data)
        .then((res) => {
          console.log(res)
          setTimeout(() => {
            this.isLoading = !this.isLoading
          }, 1000)
          this.$notify({
            type: 'success',
            title: 'Authenticated',
            text: 'redirecting...',
          })
          window.location = '/home'
          
        })
        .catch((err) => {
          console.log(err)
          setTimeout(() => {
            this.isLoading = !this.isLoading
          }, 1000)
          this.$notify({
            type: 'error',
            title: 'Error',
            text: err.response.data.error,
          })
        })
    },
  },
}
</script>
<template>
   <div class="w-full space-y-6">
    <!-- form -->
    <form @submit.prevent="handleForm()"  class="w-full py-10 space-y-4">
      <input type="text"  v-model="v$.form.code.$model" class="w-full px-3 py-2 input focus:outline-none" placeholder="Enter verification code" />
       <!-- error -->
          <div v-if="v$.form.code.$error" class="text-xs text-red-600">
          {{'* ' + v$.form.code.$errors[0].$message }}
        </div>
       
        <ButtonDark btnType="Verify Account" :disabled="v$.form.$invalid || isLoading" :isLoading="isLoading"   btnText="Submit 2FA Code" class="w-full" />
    </form>
    <!-- login with social account -->

  </div>
</template>