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
        password: "",
      },
      passType: 'password',
      isLoading: false,
    };
  },
  validations() {
    return {
      form: {
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
    ...mapActions(["userLogin"]),
    handleForm() {
      this.isLoading = true;
      // initialize data
      const data = {
        email: this.v$.form.email.$model.toString().toLowerCase(),
        password: this.v$.form.password.$model,
      };

      this.userLogin(data).then((res) => {
       
           setTimeout(()=> {this.isLoading = !this.isLoading}, 1000);
          //  this.$notify({ type: "info", title: 'Authenticated', text: 'redirecting...'});
           if(res.twoFactorAuth){
             window.location = '/auth/two-factor-authentication'
           }else{
             window.location = '/home'
           }
      }).catch((err) => {
        console.log(err)
          setTimeout(()=> {this.isLoading = !this.isLoading}, 1000);
          if(err.response && err.response.data && err.response.data.error.includes("Invalid credentials")){
            this.$notify({ type: "error", title: 'Error', text: 'Authentication failed, provide a valid email or password'});
          }else {
            console.log(err.response.data)
             this.$notify({ type: "error", title: 'Error', text: err.response.data.error});
          }
            
      });
     
    },
    toggleShowPassword(){
      
        if(this.passType.includes('password'))
        {
           this.passType = 'text';
        } else this.passType = 'password'
    }
  },
};
</script>
<template>
  <div class="w-full space-y-8">
    <!-- form -->
    <form @submit.prevent="handleForm" class="w-full space-y-3">
      <input type="text" v-model="v$.form.email.$model" class="w-full px-3 py-2 input focus:outline-none" placeholder="Email address" />
       <!-- error -->
       <div v-if="v$.form.email.$error" class="text-xs text-red-600">
          {{'* ' + v$.form.email.$errors[0].$message }}
        </div>
      <!-- input -->
        <div class="flex items-center w-full pr-2 input">
          <input :type="passType" v-model="v$.form.password.$model"  class="w-full py-2 bg-fatou-gray-200 focus:outline-none" placeholder="Password" />
          <span v-if="passType.includes('password')" @click="toggleShowPassword" class="cursor-pointer">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#92929D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
          </span>
          <span v-else @click="toggleShowPassword" class="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#92929D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </span>
        </div>
        <p class="text-sm font-bold text-fatou-blue-dark">
          <router-link to="/auth/forgot/password">
            Forgot password?
          </router-link>
        </p>
        <ButtonDark btnText="Login" btnType="submit" :disabled="v$.form.$invalid || isLoading" :isLoading="isLoading" class="w-full" />
    </form>

    <!-- divider -->
  <div class="flex items-center justify-center w-1/2 mx-auto space-x-1">
    <span class="flex-1 h-0.1 bg-fatou-gray-300"></span>  <span class="text-fatou-gray-300">or</span> <span class="flex-1 h-0.1 bg-fatou-gray-300"></span>
  </div>
    <!-- login with social account -->
    <div class="pb-3 space-y-2">
      <button class="flex items-center justify-center w-full py-2 space-x-2 border-2 rounded-full border-fatou-blue-dark">
        <span>
          <img src="/images/png/social-g.png" alt="G">
        </span>
        <span class="font-medium text-fatou-blue-dark">
          Continue With google
        </span>
      </button>
      <button class="flex items-center justify-center w-full py-2 space-x-2 border-2 rounded-full border-fatou-blue-dark">
        <span>
          <img src="/images/svg/social-l.svg" alt="G">
        </span>
        <span class="font-medium text-fatou-blue-dark">
          Continue With Linkedin
        </span>
      </button>
    </div>
  </div>
</template>