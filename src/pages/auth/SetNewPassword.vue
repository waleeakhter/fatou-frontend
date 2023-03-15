<script>
import useVuelidate from "@vuelidate/core";
import {
  required,
  helpers,
  minLength,
  sameAs,
} from "@vuelidate/validators";
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
        password: "",
        confirmPassword: "",
      },
      isAccept: false,
      isLoading: false,
      passwordFieldType1: 'password',
      passwordFieldType2: 'password'
    };
  },
  validations() {
    return {
      form: {
       password: {
          required: helpers.withMessage("New Password is required", required),
          min: helpers.withMessage(
            "Password cannot be less than 6 characters",
            minLength(6)
          ),
        },
        confirmPassword: {
          sameAs: helpers.withMessage(
            "Passwords does not match",
            sameAs(this.form.password)
          ),
        }
      },
    };
  },
  mounted(){
      console.log(this.$route.params.token);
  },
  methods: {
    ...mapActions(["resetPasswordToken"]),
    handleForm() {
      this.isLoading = true;
      // initialize data
      const data = {
        data: {
            password: this.v$.form.password.$model,
            password_confirmation: this.v$.form.password.$model
        },
        token: this.$route.params.token
      };

      this.resetPasswordToken(data).then((res) => {
           setTimeout(()=> {this.isLoading = !this.isLoading}, 1000);
           this.$notify({ type: "info", title: 'Success', text: 'Password reset successful, redirecting to login...'});
           setTimeout(() => {window.location = '/auth/signin'}, 2000);
      }).catch((err) => {
          setTimeout(()=> {this.isLoading = !this.isLoading}, 1000);
          if(err.response && err.response.data.error.toString().toLowerCase().includes("token")) {
              this.$notify({ type: "error", title: 'Error', text: 'Invalid or expired password reset link, please generate a new password reset link'});
          }else {
            this.$notify({ type: "error", title: 'Error', text: 'Reset password failed, try again'});          
          }
      });
    },
    toggleShowPassword(field){
      if(field == 1){
        this.passwordFieldType1 = this.passwordFieldType1 === "password" ? "text" : "password";
      }else {
        this.passwordFieldType2 = this.passwordFieldType2 === "password" ? "text" : "password";
      }
    }
  },
};
</script>
<template>
<div class="py-10">
   <!-- form -->
    <form @submit.prevent="handleForm" class="w-full space-y-7">
       <p class="text-fatou-black text-lg">Create new password below.</p>
      <div class="space-y-2.5">
        <div class="w-full input flex items-center pr-2">
          <input :type="passwordFieldType1" v-model="v$.form.password.$model" class="w-full bg-fatou-gray-200 focus:outline-none py-2" placeholder="New Password" />
          <span v-if="passwordFieldType1.includes('password')" @click="toggleShowPassword(1)" class="cursor-pointer">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#92929D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
          </span>
          <span v-else @click="toggleShowPassword(1)" class="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#92929D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </span>
        </div>
         <!-- error -->
            <div v-if="v$.form.password.$error" class="text-red-600 text-xs">
                {{'* ' + v$.form.password.$errors[0].$message }}
              </div>
              <!--  -->
        <div class="w-full input flex items-center pr-2">
          <input :type="passwordFieldType2" v-model="v$.form.confirmPassword.$model" class="w-full bg-fatou-gray-200 focus:outline-none py-2" placeholder="Confirm password" />
         <span v-if="passwordFieldType2.includes('password')" @click="toggleShowPassword(2)" class="cursor-pointer">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#92929D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
          </span>
          <span v-else @click="toggleShowPassword(2)" class="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#92929D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </span>
        </div>
         <!-- error -->
            <div v-if="v$.form.confirmPassword.$error" class="text-red-600 text-xs">
                {{'* ' + v$.form.confirmPassword.$errors[0].$message }}
              </div>
        <ButtonDark btnType="submit" :disabled="v$.form.$invalid || isLoading" :isLoading="isLoading" class="w-full" btnText="Reset Password" />
      </div>
    </form>
</div>
</template>