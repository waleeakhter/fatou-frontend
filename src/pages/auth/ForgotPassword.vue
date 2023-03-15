<script>
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { mapActions } from "vuex";


// components
import ButtonDark from "../../components/buttons/ButtonDark.vue";
export default {
  components: {
    ButtonDark
  },
  data() {
    return {
      v$: useVuelidate(),
      form: {
        email: "",
      },
      isLoading: false,
    };
  },
  validations() {
    return {
      form: {
        email: {
          required: helpers.withMessage("Email address is required", required),
          email: helpers.withMessage("Must be a valid email", email),
        }
      },
    };
  },
  methods: {
    ...mapActions(["forgotPassword"]),
    handleForm() {
      this.isLoading = true;
      // initialize data
      const data = {
        email: this.v$.form.email.$model,
      };

      this.forgotPassword(data).then((res) => {
           setTimeout(()=> {this.isLoading = !this.isLoading}, 1000);
          //  this.$notify({ type: "info", title: 'Success', text: 'Reset password link has being sent to entered email address.'});
            this.$router.push({name: 'home.auth.forgot.password.completed'})
      }).catch((err) => {
          setTimeout(()=> {this.isLoading = !this.isLoading}, 1000);
          this.$notify({ type: "error", title: 'Error', text: 'Failed to send email, try again'})
          
      });
     
    },
  },
};
</script>
<template>
   <div class="w-full space-y-6">
    <!-- form -->
    <form @submit.prevent="handleForm" class="w-full space-y-4">
      <input type="text" v-model="v$.form.email.$model" class="w-full input focus:outline-none py-2 px-3" placeholder="Email address" />
       <!-- error -->
       <div v-if="v$.form.email.$error" class="text-red-600 text-xs">
          {{'* ' + v$.form.email.$errors[0].$message }}
        </div>
        <ButtonDark btnType="submit" :disabled="v$.form.$invalid || isLoading" :isLoading="isLoading"  btnText="Reset Password" class="w-full" />
    </form>
    <!-- login with social account -->
    <div class="space-y-2 pb-3">
      <button @click="$router.go(-1)" class="flex items-center justify-center space-x-2 w-full border-2 border-fatou-blue-dark rounded-full py-2">
        <span class="text-fatou-blue-dark font-medium">
          Back
        </span>
      </button>
    </div>
  </div>
</template>