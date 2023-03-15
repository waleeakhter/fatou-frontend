<script>
import { mapActions } from 'vuex';
import useVuelidate from '@vuelidate/core';
import authHeader from '../../../core/utils/auth.header';
import {sectorOptions,industryOptions} from '../../../services/constants'
import {
  required,
  helpers,
  url,
  email,
  maxLength,
  numeric,
} from '@vuelidate/validators';
import foundersService from '../../../services/founders.service';

export default {
  name: 'AddFounderModal',
  emits: ['close'],
  props:['founderInfo'],
  data() {
    return {
      user: null,
      v$: useVuelidate(),
      isLoading: false,
      genders: [
        { name: 'Female', value: 'female' },
        { name: 'Male', value: 'male' },
        { name: 'Other', value: 'other' }
      ],
      foundingRounds: [
        'Private',
        'Angel',
        'Seed',
        'Series A',
        'Series B',
        'Series C',
        'Series E',
        'Series F',
        'Public'
      ],
      founderForm: {
        email: '',
        name: '',
        industry: 'none',
				sector: 'none',
        founded: '',
        gender: 'gender',
        employeeCount: '',
        bio: '',
        foundingRound: 'Founding Round',
        additionalFounder: '',
        additionalFounderTwo: '',
        website: '',
        facebook: '',
        instagram: '',
        twitter: '',
        linkdIn: '',

        crunchbase: '',

        logo: '',
        user: '',
        hiring: false,
        
      },
       industryOptions: industryOptions,
        sectorOptions:sectorOptions,

        
    };
  },
  validations() {
    return {
      founderForm: {
        email: {
          required: helpers.withMessage('Email is required', required),
          email: helpers.withMessage('Must be a valid email', email),
        },
        name: {
          required: helpers.withMessage(
            'please include a company name',
            required
          ),
        },
        sector: {
          required: helpers.withMessage('please include a sector', required),
        },
        industry: {
          required: helpers.withMessage('please include a industry', required),
        },

        gender: {
          required: helpers.withMessage('please include a gender', required),
        },
        founded: {
          required: helpers.withMessage(
            'please include a year founded',
            required
          ),
        },
        foundingRound: {
          required: helpers.withMessage(
            'please include a founding round',
            required
          ),
        },
        employeeCount: {
          required: helpers.withMessage( 'please include an employee number',  required ),
          numeric,
        },
        bio: {
          required: helpers.withMessage('please include a bio', required),
        },
        additionalFounder: {
          // required: helpers.withMessage(
          //   'please include an additional founder',
          //   required
          // ),
        },
         additionalFounderTwo: {
          // required: helpers.withMessage(
          //   'please include an additional founder',
          //   required
          // ),
        },
        hiring: {
          required: helpers.withMessage(
            'The hiring field is required',
            required
          ),
        },
        // user: {
        //   required: helpers.withMessage('The user field is required', required),
        // },

        website: {
          url: helpers.withMessage('Url not valid', url),
        },

        facebook: {
          url: helpers.withMessage('Url not valid', url),
        },
        twitter: {
          url: helpers.withMessage('Url not valid', url),
        },
        instagram: {
          url: helpers.withMessage('Url not valid', url),
        },
        linkdIn: {
          url: helpers.withMessage('Url not valid', url),
        },
        mediaLink: {
          url: helpers.withMessage('Url not valid', url),
        },
        crunchbase: {
          url: helpers.withMessage('Url not valid', url),
        },
      },
    };
  },
  created() {

console.log('founderInfo',this.founderInfo)

    // load userId and save it in the user  data variable
    // console.log('Add...');
    // var id = authHeader();
    // id = id.Authorization.split(' ')[1];
    // this.founderForm.user = id;

    // this.user = Object.assign({}, this.$store.state.auth.currentUser);
    // if (this.user) {
    //   //this.v$.founderForm.email.$model = this.user.firstName + ' ' + this.user.lastName;
    // }
  if(this.founderInfo){
        this.founderForm.email=this.founderInfo.company?.email
        this.founderForm.name=this.founderInfo.company?.name
        this.founderForm.industry=this.founderInfo.company?.industry
				this.founderForm.sector=this.founderInfo.company?.sector
        this.founderForm.founded=this.founderInfo.company?.founded
        this.founderForm.gender=this.founderInfo.company?.gender
        this.founderForm.employeeCount=this.founderInfo.company?.employeeCount
        this.founderForm.bio=this.founderInfo.company?.bio
        this.founderForm.foundingRound=this.founderInfo.company?.foundingRound
        this.founderForm.additionalFounder=this.founderInfo.company?.additionalFounder
        this.founderForm.additionalFounderTwo=this.founderInfo.company?.additionalFounderTwo
        this.founderForm.website=this.founderInfo.company?.website
        this.founderForm.facebook=this.founderInfo.company?.social?.facebook
        this.founderForm.instagram=this.founderInfo.company?.social?.instagram
        this.founderForm.twitter=this.founderInfo.company?.social.twitter
        this.founderForm.linkdIn=this.founderInfo.company?.social.linkedIn
        this.founderForm.crunchbase=this.founderInfo.company?.social.crunchbase
        this.founderForm.logo=this.founderInfo.company?.logo
        // tthis.founderFormhis.user=this.founderInfo.company?. ''
        this.founderForm.hiring=this.founderInfo.company?.hiring
  }



  },
  methods: {
    onImageSelect(e) {
      var files = e.target.files || e.dataTransfer.files;
      this.founderForm.logo = files[0];
      if (!files.length) return;
    },
    // load map actions form individual modules
    ...mapActions(['createFounder']),
    setGender(e, gender) {
      const isChecked = e.target.checked
      if(isChecked) {
        this.v$.founderForm.gender.$model = gender.value
      } else {
        this.v$.founderForm.gender.$model = null
      }
    },
    isRoundSelected(round) {
      return this.v$.founderForm.foundingRound.$model === round ? true : false
    },
    setRound(e, round) {
      const isChecked = e.target.checked
      if(isChecked) {
        this.v$.founderForm.foundingRound.$model = round
      } else {
        this.v$.founderForm.foundingRound.$model = null
      }
    },
    isHiring() {
      if(this.founderForm.hiring) {
        return true
      }
      return false
    },
    addFounder() {
      // instantiate form
      let formData = new FormData();
      // load data body

      formData.append('logo', this.founderForm.logo);
      formData.append('name', this.v$.founderForm.name.$model);
      formData.append('email', this.v$.founderForm.email.$model);
      formData.append('sector', this.v$.founderForm.sector.$model);
      formData.append('industry', this.v$.founderForm.industry.$model);
      formData.append('founded', this.v$.founderForm.founded.$model);
      formData.append('gender', this.v$.founderForm.gender.$model);
      formData.append('user', this.founderForm.user);
      formData.append(
        'foundingRound',
        this.v$.founderForm.foundingRound.$model
      );
      formData.append(
        'employeeCount',
        this.v$.founderForm.employeeCount.$model
      );
      formData.append('bio', this.v$.founderForm.bio.$model);
      formData.append(
        'additionalFounder',
        this.v$.founderForm.additionalFounder.$model
      );
      formData.append(
        'additionalFounderTwo',
        this.v$.founderForm.additionalFounderTwo.$model
      );
      formData.append('hiring', this.v$.founderForm.hiring.$model);
      formData.append('website', this.v$.founderForm.website.$model);
      formData.append('facebook', this.v$.founderForm.facebook.$model);
      formData.append('twitter', this.v$.founderForm.twitter.$model);
      formData.append('linkedIn', this.v$.founderForm.linkdIn.$model);
      formData.append('crunchbase', this.v$.founderForm.crunchbase.$model);
      formData.append('instagram', this.v$.founderForm.instagram.$model);

      this.isLoading = !this.isLoading;
      // clear out all input fields
      
      // send data to the backend
      // debugger
      if(this.founderInfo){
          foundersService.updateFounder(formData,this.founderInfo._id).then(()=>{
            setTimeout(() => {
            this.isLoading = !this.isLoading;
            this.$emit('close')
          }, 1000);
          }).catch((err)=>{
            setTimeout(() => {
              this.isLoading = !this.isLoading;
            }, 1000);
            if (err.response && err.response.data && err.response.data.error) {
              this.$notify({
                type: 'error',
                title: 'Error',
                text: err.response.data.error,
              });
            } else {
              this.$notify({
                type: 'error',
                title: 'Error',
                text: 'Network error, try again',
              });
            }
          })
      }else{
        this.createFounder(formData).then((res) => {
          this.founderForm = {
            email: '',
            name: '',
            industry: 'none',
            sector: 'none',
            founded: '',
            gender: 'gender',
            employeeCount: '',
            bio: '',
            foundingRound: 'foundingRound',
            additionalFounder: '',
            additionalFounderTwo: '',
            website: '',
            facebook: '',
            instagram: '',
            twitter: '',
            linkdIn: '',
  
            crunchbase: '',
  
            logo: '',
            user: '',
            hiring: false,
          }
          this.v$.founderForm.$reset()
          this.$refs.file.value = null;
          //  enable button after one second of positive response
          setTimeout(() => {
            this.isLoading = !this.isLoading;
            this.$emit('close')
          }, 1000);
          this.$notify({
            type: 'success',
            title: 'Success',
            text: 'founder created successfully',
          });
        })
        .catch((err) => {
            //  enable button after one second of negative response
            setTimeout(() => {
              this.isLoading = !this.isLoading;
            }, 1000);
            if (err.response && err.response.data && err.response.data.error) {
              this.$notify({
                type: 'error',
                title: 'Error',
                text: err.response.data.error,
              });
            } else {
              this.$notify({
                type: 'error',
                title: 'Error',
                text: 'Network error, try again',
              });
            }
        });
        
      }


    },
  },
};
</script>

<template>
  <!-- -->
  <div id="modal" class="fixed z-10 inset-0 overflow-y-auto">
    <div class=" flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-opacity-modal opacity-75"></div>
      </div>
      <!--  -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class=" relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full z-[1999px]" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <div class="absolute right-5 top-4">
          <button v-on:click="$emit('close')" class="bg-fatou-gray-700 focus:outline-none rounded-full p-1">
            <img src="/images/svg/timesicon.svg" alt="close" />
          </button>
        </div>
        <div class="bg-white mx-auto py-10 border-b sm:px-8 px-4">
          <h1 class="text-2xl font-medium mb-3">Add Founder</h1>
          <form @submit.prevent="addFounder">
            <div class="flex flex-wrap">
              <div class="w-full md:w-1/2 py-2 px-2">
                <!-- company error -->
                <div v-if="v$.founderForm.name.$error" class="text-red-600 text-xs">
                  {{ '* ' + v$.founderForm.name.$errors[0].$message }}
                </div>
                <input v-model="v$.founderForm.name.$model" class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md" placeholder="Company’s Name" />
              </div>
              <div class="w-full md:w-1/2 py-2 px-2">
                <!-- email error -->
                <div v-if="v$.founderForm.email.$error" class="text-red-600 text-xs">
                  {{ '* ' + v$.founderForm.email.$errors[0].$message }}
                </div>
                <input type="email" class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md" v-model="v$.founderForm.email.$model" placeholder="Email" />
              </div>

              <div class="w-full md:w-1/2 py-2 px-2">
                <!-- sector error -->
                <div v-if="v$.founderForm.industry.$error" class="text-red-600 text-xs">
                  {{ '* ' + v$.founderForm.industry.$errors[0].$message }}
                </div>
                <select class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md "
                  v-model="founderForm.industry" v-on:change="handleEdit">
                  <option value="none" selected>Select Industry</option>

                  <option v-for="(option, index) in industryOptions" :key="index" :value="option.value">{{ option.label }}</option>
                </select>
              </div>

             



              <div class="w-full md:w-1/2 py-2 px-2">
                <!-- sector error -->
                <div v-if="v$.founderForm.sector.$error" class="text-red-600 text-xs">
                  {{ '* ' + v$.founderForm.sector.$errors[0].$message }}
                </div>
                <select v-model="founderForm.sector" v-on:change="handleEdit" class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md ">
                  <option value="none" selected>Select Sector</option>
                  <option v-for="(option, index) in sectorOptions" :key="index" :value="option.value">{{ option.label }}
                  </option>
                </select>
              </div>





              <div class="w-full md:w-1/2 py-2 px-2">
                <!--founded error -->
                <div v-if="v$.founderForm.founded.$error" class="text-red-600 text-xs">
                  {{ '* ' + v$.founderForm.founded.$errors[0].$message }}
                </div>
                <input type="number" v-model="v$.founderForm.founded.$model" class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md" placeholder="Year Founded" />
              </div>
              <div class="w-full md:w-1/2 py-2 px-2">
                <!-- gender error -->
                <div v-if="v$.founderForm.gender.$error" class="text-red-600 text-xs">
                  {{ '* ' + v$.founderForm.gender.$errors[0].$message }}
                </div>
                <!-- <select
                  v-model="v$.founderForm.gender.$model"
                  class="
                    w-full
                    bg-fatou-gray-200
                    focus:outline-none
                    py-2
                    px-3
                    border-fatou-gray-400 border-[1px]
                    rounded-md
                  "
                >
                  <option value="gender" selected disabled>Gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select> -->
                <div class=" dropdown flex-1 flex rounded-lg py-1 bg-fatou-gray-200 border-fatou-black-400 border-[1px]">
                  <label tabindex="1" class=" flex justify-between w-full h-10 overflow-hidden bg-fatou-gray-200 focus:outline-none pt-2 mx-1 px-1 text-gray-400 text-md">
                    {{ v$.founderForm.gender.$model || 'Gender' }}
                    <svg class="-mr-1 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                      fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                    </svg></label>

                  <div class=" bg-white rounded-box dropdown-content px-4 py-3 shadow mt-10" tabindex="1">
                    <ul class="h-50">
                      <li v-for="(gender, index) in genders" :key="index+'GR'">
                        <div class="flex items-center mb-2">
                          <input type="checkbox" :checked="v$.founderForm.gender.$model === gender.value"
                            @change="setGender($event, gender)" class="checkbox checkbox-sm checkbox-primary" />

                          <span class="pl-2">{{ gender.name }}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="w-full md:w-1/2 py-2 px-2">
                <!-- foundingRound error -->
                <div v-if="v$.founderForm.foundingRound.$error" class="text-red-600 text-xs">
                  {{ '* ' + v$.founderForm.foundingRound.$errors[0].$message }}
                </div>
                <!-- <select
                  v-model="v$.founderForm.foundingRound.$model"
                  class="
                    w-full
                    bg-fatou-gray-200
                    focus:outline-none
                    py-2
                    px-3
                    border-fatou-gray-400 border-[1px]
                    rounded-md
                  "
                >
                  <option value="foundingRound" selected disabled>
                    foundingRound
                  </option>
                  <option value="Private">Private</option>
                  <option value="Angel">Angel</option>
                  <option value="Seed">Seed</option>
                  <option value="Series A">Series A</option>
                  <option value="Series B">Series B</option>
                  <option value="Series C">Series C</option>
                  <option value="Series D">Series D</option>
                  <option value="Series E">Series E</option>
                  <option value="Series F">Series F</option>
                  <option value="Public">Public</option>
                </select> -->
                <div
                  class=" dropdown flex-1 flex rounded-lg py-1 bg-fatou-gray-200 border-fatou-black-400 border-[1px]">
                  <label tabindex="1"
                    class=" flex justify-between w-full h-10 overflow-hidden bg-fatou-gray-200 focus:outline-none pt-2 mx-1 px-1 text-gray-400 text-md">
                    {{
                    v$.founderForm.foundingRound.$model || 'Founding Round'
                    }}
                    <svg class="-mr-1 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                      fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                    </svg></label>

                  <div class=" bg-white rounded-box dropdown-content px-4 py-3 shadow mt-10" tabindex="1">
                    <ul class="h-50">
                      <li v-for="(round, index) in foundingRounds" :key="index+'FR'">
                        <div class="flex items-center mb-2">
                          <input type="checkbox" :checked="isRoundSelected(round)" @change="setRound($event, round)"
                            class="checkbox checkbox-sm checkbox-primary" />

                          <span class="pl-2">{{ round }}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="w-full md:w-1/2 py-2 px-2">
                <!-- employeeCount error -->
                <div v-if="v$.founderForm.employeeCount.$error" class="text-red-600 text-xs">
                  {{ '* ' + v$.founderForm.employeeCount.$errors[0].$message }}
                </div>
                <input v-model="v$.founderForm.employeeCount.$model" class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md" placeholder="# of employee" />
              </div>
              <div class="w-full md:w-1/2 py-2 px-2">
                <!-- additionalFounder error -->
                <div v-if="v$.founderForm.additionalFounder.$error" class="text-red-600 text-xs">
                  {{
                  '* ' + v$.founderForm.additionalFounder.$errors[0].$message
                  }}
                </div>
                <input v-model="v$.founderForm.additionalFounder.$model" class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md" placeholder="Add additional Founder" />
              </div>

              <div class="w-full md:w-1/2 py-2 px-2">
                <!-- additionalFounder error -->
                <div v-if="v$.founderForm.additionalFounderTwo.$error" class="text-red-600 text-xs">
                  {{
                  '* ' + v$.founderForm.additionalFounderTwo.$errors[0].$message
                  }}
                </div>
                <input v-model="v$.founderForm.additionalFounderTwo.$model" class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md" placeholder="Add additional Founder" />
              </div>

              <div class="w-full py-2 px-2">
                <!-- bio error -->
                <div v-if="v$.founderForm.bio.$error" class="text-red-600 text-xs">
                  {{ '* ' + v$.founderForm.bio.$errors[0].$message }}
                </div>
                <textarea v-model="v$.founderForm.bio.$model" class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md" name="bio" rows="3" placeholder="Brief Bio"></textarea>
              </div>

              <div class="w-full md:w-1/2 py-2 px-2">
                <!-- website error -->
                <div v-if="v$.founderForm.website.$error" class="text-red-600 text-xs">
                  {{ '* ' + v$.founderForm.website.$errors[0].$message }}
                </div>
                <input v-model="v$.founderForm.website.$model" class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md" placeholder="Website" />
              </div>
              <div class="w-full md:w-1/2 py-2 px-2">
                <!-- linkdIn error -->
                <div v-if="v$.founderForm.linkdIn.$error" class="text-red-600 text-xs">
                  {{ '* ' + v$.founderForm.linkdIn.$errors[0].$message }}
                </div>
                <input v-model="v$.founderForm.linkdIn.$model" class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md" placeholder="LinkedIn URL" />
              </div>
              <div class="w-full md:w-1/2 py-2 px-2">
                <!-- instagram error -->
                <div v-if="v$.founderForm.instagram.$error" class="text-red-600 text-xs">
                  {{ '* ' + v$.founderForm.instagram.$errors[0].$message }}
                </div>
                <input v-model="v$.founderForm.instagram.$model" class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md" placeholder="Instagram URL" />
              </div>
              <div class="w-full md:w-1/2 py-2 px-2">
                <!-- twitter error -->
                <div v-if="v$.founderForm.twitter.$error" class="text-red-600 text-xs">
                  {{ '* ' + v$.founderForm.twitter.$errors[0].$message }}
                </div>
                <input v-model="v$.founderForm.twitter.$model" class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md" placeholder="Twitter URL" />
              </div>
              <div class="w-full md:w-1/2 py-2 px-2">
                <!-- crunchbase error -->
                <div v-if="v$.founderForm.crunchbase.$error" class="text-red-600 text-xs">
                  {{ '* ' + v$.founderForm.crunchbase.$errors[0].$message }}
                </div>
                <input v-model="v$.founderForm.crunchbase.$model" class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md" placeHolder="crunchbase URL" />
              </div>
              <div class="w-full md:w-1/2 py-2 px-2">
                <!-- mediaLink error -->
                <div v-if="v$.founderForm.facebook.$error" class="text-red-600 text-xs">
                  {{ '* ' + v$.founderForm.facebook.$errors[0].$message }}
                </div>
                <input v-model="v$.founderForm.facebook.$model" class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md" placeholder="facebook URL" />
              </div>
              <div class="w-full py-2 px-2">
                <!-- hiring error -->
                <div v-if="v$.founderForm.hiring.$error" class="text-red-600 text-xs">
                  {{ '* ' + v$.founderForm.hiring.$errors[0].$message }}
                </div>
                <div class=" mt-4 dropdown flex-1 flex rounded-lg py-1 bg-fatou-gray-200 border-fatou-black-400 border-[1px]">
                  <label tabindex="1" class=" flex justify-between w-full h-10 overflow-hidden bg-fatou-gray-200 focus:outline-none pt-2 mx-1 px-1 text-gray-400 text-md
                    ">
                    Are you Hiring?
                    {{
                    v$.founderForm.hiring.$model && v$.founderForm.hiring.$model !== '' ? ' - Yes' : ' - No'
                    }}
                    <svg class="-mr-1 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                      fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                    </svg></label>

                  <div class=" bg-white rounded-box dropdown-content px-4 py-3 shadow mt-10" tabindex="1">
                    <ul class="h-50">
                      <li>
                        <div class="flex items-center mb-2">
                          <input type="checkbox" :checked="isHiring()"
                            @change="founderForm.hiring = !founderForm.hiring"
                            class="checkbox checkbox-sm checkbox-primary" />

                          <span class="pl-2">Yes</span>
                        </div>
                      </li>
                      <li>
                        <div class="flex items-center mb-2">
                          <input type="checkbox" :checked="!isHiring()"
                            @change="founderForm.hiring = !founderForm.hiring"
                            class="checkbox checkbox-sm checkbox-primary" />

                          <span class="pl-2">No</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="w-full py-2 px-2">
                <input @change="onImageSelect" accept="image/*" type="file" ref="file" class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md" id="founderFile" placeholder="logo" />
              </div>
              <div class="w-full py-3.5 flex items-center justify-center">
                <button :disabled="isLoading" class=" btn bg-fatou-blue hover:bg-fatou-blue rounded-3xl border-0 text-white w-1/2">
                  Submit Request
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
