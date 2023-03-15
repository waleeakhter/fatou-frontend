<script>
import useVuelidate from "@vuelidate/core";
import countryData from 'countrycitystatejson';
import SeekingModal from '../dashboard/modals/SeekingModal.vue'
import {
  required,
  email,
  helpers,
  minLength,
  sameAs,
  requiredIf,
  not
} from "@vuelidate/validators";
import { mapActions } from "vuex";




// components
import ButtonDark from "../../components/buttons/ButtonDark.vue";
import ButtonBlue from "../../components/buttons/ButtonBlue.vue";
import SelectChip from "../../components/SelectChip.vue";

import Multiselect from '@vueform/multiselect'
import { reasonForJoiningList } from "../../services/constants";
// Validation functions
const gdprNonApprovedCoutries = ['Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'the Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden']
const gdprApproved = (country) => {
 
  if(country === ''){
    return false;
  }
  if (!country) {
    
    return true
  }
  return !gdprNonApprovedCoutries.includes(country)
}

export default {
  components: {
 
    ButtonDark,
    SelectChip,
    ButtonBlue,
    Multiselect,
    SeekingModal
    
},
 setup () {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      v$: useVuelidate(),
      form: {
        
        firstName: '',
        lastName: '',
        email: null,
        password: '',
        confirmPassword: '',
        reasonForJoining: [],
        isCommunityMember: false,
        country: "",
        state: '',
        city: '',

        phone:'',
        hiringStatus:'',
        message:''
      },
      none: 'none',
      
      passwordFieldType1: 'password',
      passwordFieldType2: 'password',
      isAccept: false,
      isLoading: false,
      currentStep: 1,
      countries:countryData.getCountries(),
      maxReasonCount:3,
      reasonForJoiningList:reasonForJoiningList,
      showSeekingFields:false
    };
  },
  computed: {
    states() {
      if (this.form.country ) {
       
        const country = this.countries.find(country_ => {
          return country_.name == this.form.country
        })
        return countryData.getStatesByShort(country.shortName);
      } else {
        return []
      }
    }
  },
  watch: {
   'form.reasonForJoining':function (newVal,oldVal){
     console.log(newVal)
      this.showSeekingFields=newVal.includes('Seeking Talent')?true:false

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
        password: {
          required: helpers.withMessage("Password is required", required),
          min: helpers.withMessage(
            "Password cannot be less than 6 characters",
            minLength(6)
          ),
        },
        reasonForJoining: {
            required: helpers.withMessage("Please select an option", required)
        },
        isCommunityMember: {
            required: helpers.withMessage("Please select an option",required)
        },
        confirmPassword: {
          sameAs: helpers.withMessage(
            "Password does not match",
            sameAs(this.form.password)
          ),
        },
        country: {
          required: helpers.withMessage("Please select a country", required),
          gdprApproved:helpers.withMessage('We’re sorry, the following location is not supported on our platform at this moment. We will keep you posted.',
          gdprApproved)
        },
        state: {
          required: helpers.withMessage("Please select a state", required)
        },
         city: {
          required: helpers.withMessage("Please select a city", required)
        },
        message: { },
        phone: {
          required: requiredIf((curr, all) => {
            return all.reasonForJoining.includes('Seeking Talent')&& curr===''
          })
        },
        hiringStatus: {
          required: requiredIf((curr, all) => {
            return all.reasonForJoining.includes('Seeking Talent')&& curr===''
          })
        },
      },
    };
  },
  methods: {
    ...mapActions(["userRegister"]),
     onPhoneInput(phone, phoneObject, input) {
      if (phoneObject?.formatted) {

        this.form.phone = phoneObject.number;
      }
    },
    handleForm() {
      this.isLoading = true;
      // initialize data
      const data = {
        firstName: this.v$.form.firstName.$model,
        lastName: this.v$.form.lastName.$model,
        email: this.v$.form.email.$model,
        password: this.v$.form.password.$model,
        password_confirmation: this.v$.form.password.$model,
        reasonForJoining: this.form.reasonForJoining,
        isCommunityMember: this.form.isCommunityMember,
        address:{
          country: this.form.country,
        state: this.form.state,
        city: this.form.city
        },
         ...(this.showSeekingFields && {seekingAccess:true}),
         ...(this.showSeekingFields && {message:this.form.message}),
         ...(this.showSeekingFields && {phone:this.form.phone}),
         ...(this.showSeekingFields && {hiringStatus:this.form.hiringStatus}),
        
      };
      console.log(data)

      this.userRegister(data).then((res) => {
        
           setTimeout(()=> {this.isLoading = !this.isLoading}, 1000);

         
           this.$notify({ type: "info", title: 'Success', text: 'redirecting...'});

            // this.$router.push({name: 'home.auth.verify.account'})
            window.localStorage.setItem('userEmail', JSON.stringify(this.v$.form.email.$model));
             window.location = '/auth/signup/verify'
       
      }).catch((err) => {
          setTimeout(()=> {this.isLoading = !this.isLoading}, 1000);
          if(err.response.data.error.includes('already exists')){
             this.$notify({ type: "error", title: 'Error', text: 'Authentication failed,  address already exists'});          
          }else {
             this.$notify({ type: "error", title: 'Error', text: 'Authentication failed, try again'});          
          }
          // if(.)
      });
    },
    increaseStep() {
      if (this.currentStep === 4) {
        return;
      }

      this.currentStep++; 
    },
    // reasonChangeHandler(value){
    //   this.form.reasonForJoining=value
    // },
    // toggleSelect(selected){
    //   if(this.form.reasonForJoining.includes(selected)) {
    //     //  this.form.reasonForJoining.splice(selected)

    //     const newArray = this.form.reasonForJoining.filter((e) => e != selected);

    //     this.form.reasonForJoining = newArray
    //   }
    //   else {
    //     this.form.reasonForJoining.push(selected)
    //   }
    //   console.log(this.form.reasonForJoining)
    //   // clear list and add selected
    // },
    toggleIsCommunityMember(value){
      this.form.isCommunityMember = value
    },
    toggleShowPassword(field){
      if(field == 1){
        this.passwordFieldType1 = this.passwordFieldType1 === "password" ? "text" : "password";
      }else {
        this.passwordFieldType2 = this.passwordFieldType2 === "password" ? "text" : "password";
      }
    },
  },
  created() {
    // this.countries = countryData.getCountries();
  }
};
</script>

<template>

  <div class="w-full space-y-8">

    <!-- progress -->
    <div class="flex items-center pt-2 pb-4">
      <div class="progress-b rounded-full p-0.5 flex items-center justify-center">
        <span class="w-6 h-6 border border-fatou-blue-dark flex items-center justify-center rounded-full p-0.5">
          <span :class="[
          currentStep <= 1 ? 'bg-fatou-blue-dark text-white' : 'text-fatou-blue-dark',
          'w-full h-full flex items-center justify-center text-sm rounded-full',
        ]">1</span>
        </span>
      </div>
      <div class="flex-grow border border-fatou-light-200"></div>
      <div class="progress-b rounded-full p-0.5 flex items-center text-sm justify-center">
        <span class="w-6 h-6 border border-fatou-blue-dark flex items-center justify-center rounded-full p-0.5">
          <span :class="[
          currentStep === 2 ? 'bg-fatou-blue-dark text-white' : 'text-fatou-blue-dark',
          'w-full h-full flex items-center justify-center rounded-full',
        ]">
            2</span>
        </span>
      </div>
      <div class="flex-grow border border-fatou-light-200"></div>
      <div class="progress-b rounded-full p-0.5 flex items-center text-sm justify-center">
        <span class="w-6 h-6 border border-fatou-blue-dark flex items-center justify-center rounded-full p-0.5">
          <span :class="[
          currentStep === 3 ? 'bg-fatou-blue-dark text-white' : 'text-fatou-blue-dark',
          'w-full h-full flex items-center justify-center text-sm rounded-full',
        ]">3</span>
        </span>
      </div>
      <div class="flex-grow border border-fatou-light-200"></div>
      <div class="progress-b rounded-full p-0.5 flex items-center text-sm justify-center">
        <span class="w-6 h-6 border border-fatou-blue-dark flex items-center justify-center rounded-full p-0.5">
          <span :class="[
          currentStep === 4 ? 'bg-fatou-blue-dark text-white' : 'text-fatou-blue-dark',
          'w-full h-full flex items-center justify-center text-sm rounded-full',
        ]">4</span>
        </span>
      </div>
    </div>

    <!-- form -->
    <form class="w-full" @submit.prevent="handleForm">
      <div v-if="currentStep === 1" class="space-y-2.5">
        <input type="text" v-model="v$.form.firstName.$model" class="w-full px-3 py-2 input focus:outline-none"
          placeholder="Enter First Name" />
        <!-- error -->
        <div v-if="v$.form.firstName.$error" class="text-xs text-red-600">
          {{'* ' + v$.form.firstName.$errors[0].$message }}
        </div>
        <input type="text" v-model="v$.form.lastName.$model" class="w-full px-3 py-2 input focus:outline-none"
          placeholder="Enter Last Name" />
        <!-- error -->
        <div v-if="v$.form.lastName.$error" class="text-xs text-red-600">
          {{'* ' + v$.form.lastName.$errors[0].$message }}
        </div>
        <input type="text" v-model="v$.form.email.$model" class="w-full px-3 py-2 input focus:outline-none"
          placeholder="Email address" />
        <!-- error -->
        <div v-if="v$.form.$error" class="text-xs text-red-600">
          {{'* ' + v$.form.$errors[0].$message }}
        </div>
        <div class="flex items-center w-full pr-2 input">
          <input :type="passwordFieldType1" v-model="v$.form.password.$model"
            class="w-full py-2 bg-fatou-gray-200 focus:outline-none" placeholder="Password" />
          <span v-if="passwordFieldType1.includes('password')" @click="toggleShowPassword(1)" class="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#92929D]" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          </span>
          <span v-else @click="toggleShowPassword(1)" class="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#92929D]" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </span>
        </div>
        <!-- error -->
        <div v-if="v$.form.password.$error" class="text-xs text-red-600">
          {{'* ' + v$.form.password.$errors[0].$message }}
        </div>
        <div class="flex items-center w-full pr-2 input">
          <input :type="passwordFieldType2" v-model="v$.form.confirmPassword.$model"
            class="w-full py-2 bg-fatou-gray-200 focus:outline-none" placeholder="Confirm password" />
          <span v-if="passwordFieldType2.includes('password')" @click="toggleShowPassword(2)" class="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#92929D]" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          </span>
          <span v-else @click="toggleShowPassword(2)" class="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#92929D]" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </span>
        </div>
        <!-- error -->
        <div v-if="v$.form.confirmPassword.$error" class="text-xs text-red-600">
          {{'* ' + v$.form.confirmPassword.$errors[0].$message }}
        </div>

        <div class="flex items-start space-x-2">
          <input type="checkbox" name="agree" v-model="form.isAccept" class="w-5 h-5">
          <label for="terms" class="text-base font-light fs-14">By checking the Box you agree to the
            <a href="#" class="underline fs-14 font-light text-[#077685]">
              terms & conditions
            </a>
          </label>
        </div>
        <ButtonDark
          :disabled="v$.form.email.$invalid || v$.form.password.$invalid || v$.form.confirmPassword.$invalid || !form.isAccept"
          btnText="Next" @click="increaseStep" class="w-full" />

      </div>

      <div v-if="currentStep === 2" class="space-y-2.5">
        <select name="coutries" v-model="this.form.country" @change="v$.form.country.$touch"
          class="w-full px-3 py-2 input">
          <option value="">Country</option>
          <option v-for="(country,index) of countries" :key="`country-${country.name}`" :value="country.name">{{
            country.name }}</option>
        </select>
        <div v-if="v$.form.country.required.$invalid && v$.form.country.$dirty" class="text-xs text-red-600">
          {{'* ' + v$.form.country.required.$message }}
        </div>
        <div v-if="v$.form.country.gdprApproved.$invalid && v$.form.country.$dirty" class="text-xs text-red-600">
          {{'* ' + v$.form.country.gdprApproved.$message }}
        </div>



        <select name="states" v-model="this.form.state" @change="v$.form.state.$touch" class="w-full px-3 py-2 input">
          <option value="" checked>State</option>
          <option v-for="state of states" :key="`state-${state}`" :value="state">{{ state }}</option>
        </select>
        <div v-if="v$.form.state.required.$invalid && v$.form.state.$dirty" class="text-xs text-red-600">
          {{'* ' + v$.form.state.required.$message }}
        </div>


        <input type="text" v-model="this.form.city" @change="v$.form.city.$touch" placeholder="City" aria-label="City"
          class="w-full px-3 py-2 input focus:outline-none">

        <ButtonDark :disabled="v$.form.country.$invalid||v$.form.state.$invalid||v$.form.city.$invalid" btnText="Next"
          @click="increaseStep" class="w-full" />


        <!-- back -->
        <div class="w-full">
          <button @click="currentStep--"
            class="flex items-center px-3 py-2 space-x-2 border rounded-md border-fatou-blue">
            <span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="black" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </span>
            <span>
              Back
            </span>
          </button>
        </div>
        <!--  -->
      </div>
      <!-- second step -->
      <div v-if="currentStep === 3" class="flex flex-col items-center justify-center space-y-6">
        <div class="space-y-2 text-center">
          <p class="text-lg text-fatou-black-150">Reason for joining? </p>
          <p class="text-sm text-fatou-black-150">Please Select Top 3 Reasons For Joining</p>
        </div>

        <Multiselect v-model="this.form.reasonForJoining" mode="tags" :searchable="true" :options="reasonForJoiningList"
          placeholder="Select" :max="maxReasonCount" />
        <template v-if="showSeekingFields">
          <h1 class=" font-medium"> Please submit inquiry to gain access to this database. </h1>
          <vue-tel-input :value="v$.form.phone.$model" @input="onPhoneInput" @change="v$.form.phone.$touch"
            class="w-full px-3 py-2 input focus:outline-none"></vue-tel-input>
         
         <div v-if="v$.form.phone.required.$invalid && v$.form.phone.$dirty" class="text-xs text-red-600">
            {{'* ' + v$.form.phone.required.$message }}
          </div>

          <select name="hiringStatus" v-model="v$.form.hiringStatus.$model" @change="v$.form.hiringStatus.$touch"
            class="w-full px-3 py-2 input">
            <option value="">Hiring Status</option>
            <option value="inHouseRecruiter">In House Recruiter</option>
            <option value="inHouseHiringManager">In House Hiring Manager</option>
            <option value="externalRecruiter">External Recruiter</option>
          </select>
        
          <div v-if="v$.form.hiringStatus.required.$invalid && v$.form.hiringStatus.$dirty"
            class="text-xs text-red-600">
            {{'* ' + v$.form.hiringStatus.required.$message }}
          </div>
        
        <textarea type="text" v-model="v$.form.message.$model" @change="v$.form.message.$touch"
            class="w-full px-3 py-2 input focus:outline-none" placeholder="Add Custom Message [Optional]"></textarea>
        </template>
        <!-- 
      <div class="w-full space-y-2" v-for="reason in reasonForJoiningList" :key="reason.slug">
          <SelectChip :isActive="form.reasonForJoining.includes(reason.slug)" @click="toggleSelect(reason.slug)" :chipText="reason.title" class="w-full" />
      </div> -->
<!-- <div class="flex">
  <pre>{{ v$.form.hiringStatus.$model}}</pre>
  <pre>{{ v$.form.phone}}</pre>
  <pre>{{ v$.form.hiringStatus}}</pre>
  
</div> -->

        <ButtonDark btnType="button" btnText="Next" :disabled="v$.form.reasonForJoining.$invalid ||
        (v$.form.reasonForJoining.$model.includes('Seeking Talent') && (v$.form.phone.$invalid || v$.form.hiringStatus.$invalid))" @click="increaseStep"
          class="w-full" />
        <!-- back -->
        <div class="w-full">
          <button @click="currentStep--"
            class="flex items-center px-3 py-2 space-x-2 border rounded-md border-fatou-blue">
            <span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="black" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </span>
            <span>
              Back
            </span>
          </button>
        </div>
        <!--  -->
      </div>
      <!-- last step -->
      <div v-if="currentStep === 4" class="flex flex-col items-center justify-center space-y-6">
        <div class="space-y-2 text-center">
          <p class="text-lg text-fatou-black-150">Are you a member of a minority community?</p>
          <p class="text-sm text-fatou-black-150">Tap to select</p>
        </div>

        <div class="flex items-center w-full space-x-6 space-y-2">
          <SelectChip :isActive="form.isCommunityMember" chipText="Yes" @click="toggleIsCommunityMember(true)"
            class="w-full" />
          <SelectChip :isActive="!form.isCommunityMember" chipText="No" @click="toggleIsCommunityMember(false)"
            class="w-full" />
        </div>
          <!-- <pre>{{v$.form}}</pre> -->
        <ButtonDark btnType="submit" btnText="Complete Signup" :disabled="v$.form.$invalid || isLoading"
          :isLoading="isLoading" class="w-full" />
        <!-- back -->
        <div class="w-full">
          <button @click="currentStep--"
            class="flex items-center px-3 py-2 space-x-2 border rounded-md border-fatou-blue">
            <span> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="black" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg></span>
            <span> Back </span>
          </button>
        </div>
        <!--  -->
      </div>
    </form>

    <!-- divider -->
    <div class="flex items-center justify-center w-1/2 mx-auto space-x-1">
      <span class="flex-1 h-0.1 bg-fatou-gray-300"></span> <span class="text-fatou-gray-300">or</span> <span
        class="flex-1 h-0.1 bg-fatou-gray-300"></span>
    </div>
    <!-- login with social account -->
    <div class="pb-3 space-y-2">
      <button
        class="flex items-center justify-center w-full py-2 space-x-2 border-2 rounded-full border-fatou-blue-dark">
        <span>
          <img src="/images/png/social-g.png" alt="G">
        </span>
        <span class="font-medium text-fatou-blue-dark">
          Continue With google
        </span>
      </button>
      <button
        class="flex items-center justify-center w-full py-2 space-x-2 border-2 rounded-full border-fatou-blue-dark">
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

