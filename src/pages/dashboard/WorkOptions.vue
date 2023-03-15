<script>
import useVuelidate from "@vuelidate/core";
import { required, helpers, numeric } from "@vuelidate/validators";
import { mapActions } from "vuex";
import countryData from 'countrycitystatejson';
import {currencyOptions} from '../../services/constants'
import userService from '../../services/users.service'

// libs
import Multiselect from "@vueform/multiselect";

import currencyFormatter from '../../core/utils/currencyFormatter'

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      v$: useVuelidate(),
      formatter: currencyFormatter,
      workOptions: {
        // disabled: false,
        looking: false,
        openToWorkBanner: false,
        openToWorkRemotely: false,
        preferredLocation: {
          country:'',
          state:'',
          city:''
        },
        yearsOfExperience: "",
        seeking: [],
        salaryRange: {min:'',max:'',currency:''},
        resumeUrl: null
      },
      isSalaryChange: false,
      resumeFileData: null,
      isFileSelected: false,
      isLoading: false,
      isEdit: false,
      resumeFileName: null,
      // locations: ["Remote", "Netherlands", "Uk", "USA", "Nigeria"],
      countries:countryData.getCountries(),
      seekingOptions:[
         {
					 value:'Remote',
					 label:'Remote'
				 },
         {
					 value:'Hybrid',
					 label:'Hybrid'
				 },
         {
					 value:'Visa Sponsorship',
					 label:'Visa Sponsorship'
				 },
         {
					 value:'Bonus/Commission',
					 label:'Bonus/Commission'
				 },
         {
					 value:'Relocation',
					 label:'Relocation'
				 },
         {
					 value:'Startup',
					 label:'Startup'
				 },
         {
					 value:'Open to work Remotely',
					 label:'Open to work Remotely'
				 }
      ],
      currencyOptions:currencyOptions.map((cur)=>{
        return {
          value:cur.code,
          label:cur.code+' - '+cur.symbol
        }
      })

    };
  },
  validations() {
    return {
      workOptions: {
        preferredLocation: {
          country:{
              required: helpers.withMessage("Country is required", required),
          },
          state:{
              required: helpers.withMessage("State is required", required),
          },
          city:{
              required: helpers.withMessage("City is required", required),
          }
        },
        yearsOfExperience: {
          required: helpers.withMessage(
            "Years of experience is required",
            required
          ),
          numeric: helpers.withMessage("Only numbers are allowed", numeric),
        }
      },
    };
  },
  computed: {
    states() {
      if (this.workOptions.preferredLocation.country ) {
       
        const country = this.countries.find(country_ => {
          return country_.name == this.workOptions.preferredLocation.country
        })
        return countryData.getStatesByShort(country.shortName);
      } else {
        return []
      }
    }
  },
  created() {
    this.getWorkOptions().then((res) => {
      console.log(res)
      if (res.data.workOption != null) {
        this.workOptions = res.data.workOption;

        if(this.workOptions.resumeUrl != null){
          this.resumeFileName = this.workOptions.resumeUrl.split('/')[1];
        }
      }
    });


    // await userService.getFilterData()
  },
  methods: {
    ...mapActions(["editWorkOptions", "getWorkOptions"]),
    handleForm() {
      this.isLoading = true;
      const data = { ...this.workOptions };

      // transform to form data
      let formData = new FormData();

      if (this.resumeFileData != null && this.isFileSelected) {
        formData.append("resume", this.resumeFileData);
      }

      formData.append("looking", this.workOptions.looking);
      // formData.append("disabled", this.workOptions.disabled);
      formData.append("openToWorkBanner", this.workOptions.openToWorkBanner);
      formData.append("preferredLocation",JSON.stringify(this.workOptions.preferredLocation));
      formData.append("yearsOfExperience", this.workOptions.yearsOfExperience);
      formData.append("seeking",JSON.stringify( this.workOptions.seeking));
      formData.append("openToWorkRemotely", this.workOptions.openToWorkRemotely);
      formData.append("salaryRange", JSON.stringify(this.workOptions.salaryRange));

      this.editWorkOptions(formData)
        .then((res) => {
          setTimeout(() => {
            this.isLoading = !this.isLoading;
            this.isEdit = false;
            this.isFileSelected = false;
            this.resumeFileData = null;
          }, 1000);
          this.$notify({
            type: "success",
            title: "Success",
            text: "Your work options update was successful...",
          });
        })
        .catch((err) => {
          setTimeout(() => {
            this.isLoading = !this.isLoading;
            this.isEdit = false;
          }, 1000);
          this.$notify({
            type: "error",
            title: "Error",
            text: "Your work options update failed, try again",
          });
        });
    },
    selectFileFromMem() {
      	this.$refs.fileSelector.click();
    },
    onSalaryChange(){
      this.isEdit = true
      this.isSalaryChange = true;

      setTimeout(() => {
        this.isSalaryChange = !this.isSalaryChange
      }, 2500)
    },
    handleFile(e) {
      var files = e.target.files || e.dataTransfer.files;
      this.resumeFileData = files[0];
      this.resumeFileName = this.resumeFileData.name;
      this.isFileSelected = true;
      this.isEdit = true
      if (!files.length) return;
    },
  },
};
</script>
<template>
  <div class="mt-16 card rounded-lg bg-white max-w-4xl mx-auto">
    <div class="card-body">
      <div class="w-full flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <span @click="$router.back()" class="mr-4 cursor-pointer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="black" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </span>
          <!--  -->
          <h3 class="text-lg font-medium">Work Options</h3>
        </div>
        <!--  -->
        <!-- <div class="flex items-center justify-between space-x-2">
                        <span class="text-fatou-black">Opt-Out</span>
                        <span>
                            <label class="switch">
                            <input type="checkbox" v-model="workOptions.disabled" @change="isEdit = true">
                            <span class="slider round"></span>
                            </label>
                        </span>
                  </div> -->
      </div>
      <div class="w-5/6 mx-auto py-3 text-center">
        <p class="text-fatou-red">
          To protect your privacy, individuals who work at your organization will not have visibility of your profile
          while seeking new employment.
        </p>
      </div>
      <form @submit.prevent="handleForm">

        <div class="mb-5 sm:w-2/3 w-full mx-auto py-3">
          <ul class="space-y-2">
            <!-- <li>
            <div
              class="
                flex
                items-center
                justify-between
                w-full
                border border-fatou-black-50
                px-6
                py-2.5
                rounded-lg
              "
            >
              <span class="text-fatou-black">Actively looking For work</span>
              <span>
                <label class="switch">
                  <input type="checkbox" v-model="workOptions.looking" @change="isEdit = true" :disabled="workOptions.disabled" />
                  <span class="slider round"></span>
                </label>
              </span>
            </div>
          </li> -->
            <!-- <li>
            <div
              class="
                flex
                items-center
                justify-between
                w-full
                border border-fatou-black-50
                px-6
                py-2.5
                rounded-lg
              "
            >
              <span class="text-fatou-black">Add open for work on profile</span>
              <span>
                <label class="switch">
                  <input type="checkbox" v-model="workOptions.openToWorkBanner" @change="isEdit = true" :disabled="workOptions.disabled" />
                  <span class="slider round"></span>
                </label>
              </span>
            </div>
          </li> -->
            <li>
              <a class="!px-0">
                <div class="
                  flex flex-col
                  items-start
                  space-y-1.5
                  justify-between
                  w-full
                  border border-fatou-black-50
                  px-6
                  py-2.5
                  rounded-lg
                ">
                  <span class="text-fatou-black">Preferred work location</span>
                  <!-- <span>
                  <button
                    class="
                      px-6
                      py-1.5
                      bg-fatou-blue
                      text-white text-sm
                      rounded-full
                      font-medium
                    "
                  >
                    Add
                  </button>
                </span> -->
                  <div class="w-full">
                    <select name="coutries" v-model="this.workOptions.preferredLocation.country"
                      class="w-full px-3 py-2 input mb-2">
                      <option value="">Country</option>
                      <option v-for="(country,index) of countries" :key="`country-${country.name}`"
                        :value="country.name">{{ country.name }}</option>
                    </select>


                    <select name="states" v-model="this.workOptions.preferredLocation.state"
                      class="w-full px-3 py-2 input mb-2">
                      <option value="" checked>State</option>
                      <option v-for="state of states" :key="`state-${state}`" :value="state">{{ state }}</option>
                    </select>


                    <input type="text" v-model="this.workOptions.preferredLocation.city" placeholder="City"
                      aria-label="City" class="w-full px-3 py-2 input focus:outline-none">



                    <!-- <Multiselect
                    v-model="workOptions.preferredLocation"
                    mode="tags"
                    :searchable="true"
                    :options="locations"
                    @change="isEdit = true"
                    placeholder="Select location"
                    :disabled="workOptions.disabled"
                  /> -->
                  </div>
                  <!-- <div v-if="v$.workOptions.preferredLocation.$error" class="text-red-600 text-xs">
				    {{'* ' + v$.workOptions.preferredLocation.$errors[0].$message }}
			    </div> -->
                </div>
              </a>
            </li>
              <!-- <li>
                <div
                  class=" flex items-center justify-between w-full border border-fatou-black-50 px-6 py-2.5 rounded-lg">
                  <span class="text-fatou-black">Open to work Remotely</span>
                  <span>
                    <label class="switch">
                      <input type="checkbox" v-model="workOptions.openToWorkRemotely" @change="isEdit = true" />
                      <span class="slider round"></span>
                    </label>
                  </span>
                </div>
              </li> -->
            <li>
              <div class="
                flex
                items-center
                justify-between
                w-full
                border border-fatou-black-50
                px-6
                py-2.5
                rounded-lg
              ">
                <span class="text-fatou-black">Years of Experience</span>
                <span>
                  <input type="text" class="
                w-full
                focus:outline-none
                border border-fatou-black-50
                rounded-md
                py-2.5
                px-4
              " placeholder="Years of experience" v-model.number="v$.workOptions.yearsOfExperience.$model" />
                </span>
              </div>
              <div v-if="v$.workOptions.yearsOfExperience.$error" class="text-red-600 text-xs">
                {{'* ' + v$.workOptions.yearsOfExperience.$errors[0].$message }}
              </div>
            </li>
            <li>
              <div class="w-full border border-fatou-black-50 px-6 py-2.5 rounded-lg">

                <div
                  class=" flex items-center justify-between mb-3">
                  <span class="text-fatou-black">Seeking</span>
                  <span style="flex: 1;max-width: 200px">
                    <Multiselect mode="tags" :searchable="true" :options="seekingOptions" v-model="workOptions.seeking"
                      @change="isEdit = true" placeholder="Select Work Options" />
                  </span>
                </div>
                <!-- <div
                  class=" flex items-center justify-between ">
                  <span class="text-fatou-black">Open to work Remotely</span>
                  <span>
                    <label class="switch">
                      <input type="checkbox" v-model="workOptions.openToWorkRemotely" @change="isEdit = true" />
                      <span class="slider round"></span>
                    </label>
                  </span>
                </div> -->
              </div>
            </li>
            <li>
              <div class="
                flex
                items-center
                justify-between
                w-full
                border border-fatou-black-50
                px-6
                py-2.5
                rounded-lg
              ">
                <span class="text-fatou-black">Salary Requirement
                </span>
                <span>
                  <div class="flex items-center flex-grow ml-10">
                    <!-- <span class="font-bold text-sm">$500</span>
                <div data-tip="" class="relative">
                  <input
                    type="range"
                    max="50000"
                    min="1000"
                    v-model="workOptions.salaryRange"
                    @change="onSalaryChange"
                    :disabled="workOptions.disabled"
                    class="range range-white range-sm mx-4"
                  />
                  <div v-if="isSalaryChange" class="absolute top-[-38px] left-[50px] py-2 px-2 text-white bg-fatou-blue text-sm rounded-md">
                    {{formatter.format(workOptions.salaryRange)}}
                  </div>





              </div>
								<span class="font-bold text-sm">$500,000</span> -->


                    <input type="number"
                      class=" w-full focus:outline-none border border-fatou-black-50 rounded-md py-2.5 px-4"
                      placeholder="Min" v-model.number="this.workOptions.salaryRange.min" />-
                    <input type="number"
                      class=" w-full focus:outline-none border border-fatou-black-50 rounded-md py-2.5 px-4"
                      placeholder="Max" v-model.number="this.workOptions.salaryRange.max" />
                    <!--  v-model="workOptions.seeking"
                  @change="isEdit = true"
                  :disabled="workOptions.disabled" -->
                    <select class=" w-full focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md "
                      v-model="this.workOptions.salaryRange.currency">
                      <option v-for="(currency) in currencyOptions" :value="currency.value">{{currency.label}}</option>
                    </select>




                  </div>
                  <!-- <select
              name="salary"
              class="
                bg-transparent
                w-full
                focus:outline-none
                border border-fatou-black-50
                px-6
                py-3.5
                rounded-lg
              "
              v-model="workOptions.salaryRange"
              @change="isEdit = true"
            >
              <option value="none" selected disabled>
                Salary Range <small>(per month)</small>
              </option>
              <option value="1500-3500">$1,500 - $3,500</option>
              <option value="4000-6500">$4,000 - $6,500</option>
              <option value="7000-1000">$7,000 - $10,000</option>
              <option value="1000-above">$10,000 Above</option>
            </select> -->
                </span>
              </div>

            </li>

            <li>
              <a class="!px-0">
                <div class="border border-fatou-black-50 py-2.5 rounded-lg">
                  <div class="
                  flex
                  items-center
                  justify-between
                  w-full
                  px-6
                ">
                    <span class="text-fatou-black">Upload Resume</span>
                    <span>
                      <input type="file" ref="fileSelector" v-on:change="handleFile" hidden accept=".pdf">
                      <button type="button" @click="selectFileFromMem" class="
                      px-6
                      py-1.5
                      bg-fatou-blue
                      text-white text-sm
                      rounded-full
                      font-medium
                    ">
                        Upload
                      </button>
                    </span>
                  </div>
                  <!--  -->
                  <div v-if="resumeFileName != null"
                    class="w-1/2 mx-auto border border-fatou-black-50 px-6 py-2.5 flex items-center rounded-lg">
                    <span class="text-sm text-ellipsis">
                      <i>{{ resumeFileName }}</i>
                    </span>
                  </div>
                </div>

              </a>
            </li>
          </ul>

          <div class="flex items-center justify-center py-2.5">
            <button type="submit" class="btn btn-primary px-12 rounded-full flex items-center justify-center space-x-1"
              :disabled="v$.workOptions.$invalid || isLoading || !isEdit || resumeFileName === null">
              <div v-if="isLoading" class="
                h-5
                w-5
                mr-3
                loader
                ease-linear
                rounded-full
                border-2 border-t-2 border-gray-200
                "></div>
              <span>SAVE</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
@import url("../../assets/css/switch.css");
</style>