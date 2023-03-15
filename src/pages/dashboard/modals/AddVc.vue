<script>
import useVuelidate from '@vuelidate/core';
import { required, helpers, url } from '@vuelidate/validators';
import { mapActions } from 'vuex';
import countryData from 'countrycitystatejson';

export default {
  emits: ['close'],
  mounted() {
    this.countries = countryData.getCountries();
    this.country_list = this.countries;
  },
  data() {
    return {
      average_check_list: [
        '10k-100k',
        '100k-250k',
        '250k-500k',
        '500k-1M',
        '1M-5M',
        '5M-10M',
        '10M-20M',
        '20M-50M',
        'UNCAPPED'
      ],
      investment_type_list: [
        'Angel',
        'Family',
        'Incubator',
        'Corporate VC',
        'Others',
      ],
      investment_stages: [
        'Idea Stage',
        'Prototype Stage',
        'Early Revenue',
        'Scaling',
        'Growth',
        'Pre-IPO',
      ],
      selected_countries: [],
      countries: [],
      country_list: [],
      country: null,
      v$: useVuelidate(),
      isLoading: false,
      vcsForm: {
        logo: '',
        name: '',
        description: '',
        investmentCountries: [],
        investmentType: '',
        investmentStages: [],
       
        country:'',
        state:'',
        
        category: '',
        averageCheckSize: '10k-100k',
        region: 'none',
        website: '',
        facebook: '',
        instagram: '',
        twitter: '',
        linkdIn: '',
        crunchbase: '',
      },
    };
  },
  computed: {
    states() {
      if (this.vcsForm.country ) {
       
        const country = this.countries.find(country_ => {
          return country_.name == this.vcsForm.country
        })
        console.log(countryData.getStatesByShort(country.shortName))
        return countryData.getStatesByShort(country.shortName);
      } else {
        return []
      }
    }
  },
  validations() {
    return {
      vcsForm: {
        logo: {
          required: helpers.withMessage('please include a logo', required),
        },
        name: {
          required: helpers.withMessage('please include a vc name', required),
        },
        description: {
          required: helpers.withMessage(
            'please include a vc description',
            required
          ),
        },

        country: {
          required: helpers.withMessage(
            'please include a vc country',
            required
          ),
        },
        state: {
          required: helpers.withMessage(
            'please include a vc state',
            required
          ),
        },
        category: {
          required: helpers.withMessage(
            'please include a vc category',
            required
          ),
        },
        averageCheckSize: {
          required: helpers.withMessage(
            'please include anaverage check size',
            required
          ),
        },
        // region: {
        //   required: helpers.withMessage('please add your region', required),
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
        crunchbase: {
          url: helpers.withMessage('Url not valid', url),
        },
      },
    };
  },
  methods: {
    // load map actions form individual modules
    ...mapActions(['createVcs', 'getVcs']),
    // get form image
    onImageSelect(e) {
      var files = e.target.files || e.dataTransfer.files;
      this.vcsForm.logo = files[0];
      if (!files.length) return;
    },

    isCheckSelected(check) {
      if (this.v$.vcsForm.averageCheckSize.$model === check) {
        return true;
      }
      return false;
    },
    setCheckSize(check) {
      this.v$.vcsForm.averageCheckSize.$model = check;
    },

    isTypeSelected(type) {
      if (this.vcsForm.investmentType === type) {
        return true;
      }
      return false;
    },
    setInvestmentType(type) {
      this.vcsForm.investmentType = type;
    },

    searchCountries(e) {
      const value = e.target.value;
      this.country_list = JSON.parse(JSON.stringify(this.countries));
      if (value) {
        this.country_list = this.country_list.filter(
          (item) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
        );
      }
    },
    isCountryChecked(shortName) {
      const isCountryExists = this.selected_countries.find(
        (country) => country.shortName === shortName
      );
      if (isCountryExists) {
        return true;
      }
      return false;
    },
    setCountries(e, country) {
      const checked = e.target.checked;
      if (checked) {
        this.selected_countries.push(country);
      } else {
        this.selected_countries = this.selected_countries.filter(
          (item) => country.shortName !== item.shortName
        );
      }
    },

    isStageSelected(stage) {
      const isStageExists = this.vcsForm.investmentStages.find(
        (item) => item === stage
      );
      if (isStageExists) {
        return true;
      }
      return false;
    },
    setInvestmentStages(e, stage) {
      const checked = e.target.checked;
      if (checked) {
        this.vcsForm.investmentStages.push(stage);
      } else {
        this.vcsForm.investmentStages = this.vcsForm.investmentStages.filter(
          (item) => item !== stage
        );
      }
    },

    // declare function to fetch vcs
    addVcs() {
      // instantiate form data
      let formData = new FormData();
      // load data body
      let countriesList = []
      this.selected_countries.forEach(country => {
        countriesList.push(country.shortName)
      })
      formData.append('logo', this.vcsForm.logo);
      formData.append('investmentCountries', countriesList.toString());
      formData.append('investmentType', this.vcsForm.investmentType.toString());
      formData.append('investmentStages', this.vcsForm.investmentStages);
      formData.append('name', this.v$.vcsForm.name.$model);
      formData.append('description', this.v$.vcsForm.description.$model);
      formData.append('country', this.v$.vcsForm.country.$model);
    formData.append('state', this.v$.vcsForm.state.$model);
      formData.append('category', this.v$.vcsForm.category.$model);
      formData.append(
        'averageCheckSize',
        this.v$.vcsForm.averageCheckSize.$model
      );
      // formData.append('region', this.v$.vcsForm.averageCheckSize.$model);
      formData.append('website', this.v$.vcsForm.website.$model);
      formData.append('facebook', this.v$.vcsForm.facebook.$model);
      formData.append('twitter', this.v$.vcsForm.twitter.$model);
      formData.append('linkedIn', this.v$.vcsForm.linkdIn.$model);
      formData.append('crunchbase', this.v$.vcsForm.crunchbase.$model);
      formData.append('instagram', this.v$.vcsForm.instagram.$model);

      this.isLoading = !this.isLoading;

      this.createVcs(formData)
        .then((res) => {
          this.getVcs();
          
          // clear out all input fields
        this.vcsForm= {
          logo: '',
          name: '',
          description: '',
          investmentCountries: [],
          investmentType: '',
          investmentStages: [],
        
          country:'',
          state:'',
          
          category: '',
          averageCheckSize: '10k-100k',
          region: 'none',
          website: '',
          facebook: '',
          instagram: '',
          twitter: '',
          linkdIn: '',
          crunchbase: '',
      }
      this.v$.vcsForm.$reset()
      this.$refs.file.value=null;
          //  enable button after one second of positive response
          setTimeout(() => {
            this.isLoading = !this.isLoading;
          }, 1000);

          this.$notify({
            type: 'success',
            title: 'Success',
            text: 'Vc created successfully',
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
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true" >&#8203;</span >
      <div 
      class=" relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full z-[1999px] "
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
        <div class="bg-white mx-auto py-10 border-b sm:px-8 px-4">
          <h1 class="text-2xl font-medium">Add VC</h1>
          <form @submit.prevent="addVcs" enctype="multipart/form-data">
         
            <div
              class="
                flex
                items-center
                justify-between
                sm:space-x-6
                space-x-2
                py-1
              "
            >
              <div class="form-control w-full">
                <label class="label text-sm mb-0 p-0">
                  <span class="label-text text-fatou-gray-400 text-sm mb-0 p-1"
                    >Name</span
                  >
                </label>
                <!-- name error -->
                <div
                  v-if="v$.vcsForm.name.$error"
                  class="text-red-600 text-xs mt-0"
                >
                  {{ '* ' + v$.vcsForm.name.$errors[0].$message }}
                </div>

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
                  v-model="v$.vcsForm.name.$model"
                  placeholder="VC Name"
                />
              </div>

              <div class="form-control w-full">
             
              <div v-if="v$.vcsForm.country.$error" class="text-red-600 text-xs" >
                {{ '* ' + v$.vcsForm.country.$errors[0].$message }}
              </div>

                <label class="label text-sm mb-0 p-0">
                  <span class="label-text text-fatou-gray-400 text-sm mb-0 p-1" >Location</span >
                </label>
                <select name="coutries" v-model="this.vcsForm.country"  @change="v$.vcsForm.country.$touch" class="w-full px-3 py-2 input">
                  <option value="">Country</option>
                  <option v-for="(country,index) of countries"  :key="`country-${country.name}`" :value="country.name">{{ country.name }}</option>
                 </select>
               
              </div>
               <div class="form-control w-full">
               <div v-if="v$.vcsForm.state.$error" class="text-red-600 text-xs" >
                {{ '* ' + v$.vcsForm.state.$errors[0].$message }}
              </div>
                <label class="label text-sm mb-0 p-0">
                  <span class="label-text text-fatou-gray-400 text-sm mb-0 p-1" >State</span >
                </label>
                <select name="states" v-model="this.vcsForm.state" @change="v$.vcsForm.state.$touch" class="w-full px-3 py-2 input">
                    <option value="" checked>State</option>
                    <option v-for="state of states" :key="`state-${state}`" :value="state">{{ state }}</option>
                </select>
               
              </div>
            </div>
            
            <div class="py-1">
              <!-- description error -->
              <div
                v-if="v$.vcsForm.description.$error"
                class="text-red-600 text-xs"
              >
                {{ '* ' + v$.vcsForm.description.$errors[0].$message }}
              </div>
              <label class="label text-sm mb-0 p-0">
                <span class="label-text text-fatou-gray-400 text-sm mb-0 p-1"
                  >Description</span
                >
              </label>
              <textarea
                class="
                  w-full
                  bg-fatou-gray-200
                  focus:outline-none
                  py-2
                  px-3
                  border-fatou-gray-400 border-[1px]
                  rounded-md
                "
                name="biography"
                rows="3"
                placeholder="About Company"
                v-model="v$.vcsForm.description.$model"
              ></textarea>
            </div>

            <div
              class="
                mt-2
                dropdown
                flex-1 flex
                rounded-lg
                py-1
                bg-fatou-gray-200
                border-fatou-black-400 border-[1px]
              "
            >
              <label
                tabindex="0"
                class="
                  flex
                  justify-between
                  w-full
                  h-10
                  overflow-hidden
                  bg-fatou-gray-200
                  focus:outline-none
                  pt-2
                  mx-1
                  px-1
                  text-gray-400 text-md
                "
              >
                {{
                  selected_countries.length
                    ? selected_countries.map((c) => c.shortName).join(',')
                    : 'Countries of investment'
                }}
                <svg
                  class="-mr-1 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  /></svg
              ></label>

              <div
                class="
                  bg-white
                  rounded-box
                  dropdown-content
                  px-4
                  py-3
                  shadow
                  mt-10
                "
                tabindex="0"
              >
                <form class="flex mb-2" @submit.prevent>
                  <input
                    type="text"
                    class="
                      px-4
                      py-2
                      bg-transparent
                      rounded-md rounded-r-none
                      bg-fatou-gray-100
                      border-fatou-blue
                      focus:outline-none focus:border-fatou-blue
                    "
                    placeholder="Search here..."
                    style="width: 100%"
                    @input="searchCountries"
                  />
                  <button
                    type="submit"
                    class="
                      flex
                      items-center
                      justify-center
                      p-2
                      px-4
                      rounded-md rounded-l-none
                      bg-fatou-blue
                      rounded-2
                      group
                    "
                    aria-label="Search"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24.903 26.1428L17.283 18.5214C13.8932 20.9314 9.22222 20.3419 6.53746 17.1653C3.85271 13.9888 4.04984 9.28489 6.99097 6.34411C9.93131 3.40204 14.6357 3.20405 17.8128 5.88866C20.99 8.57327 21.5798 13.2447 19.1696 16.6348L26.7896 24.2561L24.9043 26.1414L24.903 26.1428ZM12.647 6.66676C10.1186 6.66619 7.93722 8.44101 7.4236 10.9167C6.90998 13.3924 8.20525 15.8885 10.5252 16.8938C12.8452 17.899 15.5522 17.1372 17.0073 15.0695C18.4624 13.0018 18.2657 10.1965 16.5363 8.35211L17.343 9.15211L16.4336 8.24544L16.4176 8.22944C15.42 7.22568 14.0622 6.66294 12.647 6.66676Z"
                        fill="#FFFFFF"
                      />
                    </svg>
                  </button>
                </form>
                <ul class="h-40 overflow-y-scroll">
                  <li v-for="(country, index) in country_list" :key="index">
                    <div class="flex items-center mb-2">
                      <input
                        type="checkbox"
                        :checked="isCountryChecked(country.shortName)"
                        @change="setCountries($event, country)"
                        class="checkbox checkbox-sm checkbox-primary"
                      />
                      <span
                        class="pl-2 pr-2 text-gray-500 text-sm lg:text-md"
                        >{{ country.name }}</span
                      >
                      <img
                        :src="`https://countryflagsapi.com/svg/${country.shortName}`"
                        :alt="country.shortName"
                        class="w-3 h-3"
                        srcset=""
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div
              v-if="v$.vcsForm.averageCheckSize.$error"
              class="text-red-600 text-xs"
            >
              {{ '* ' + v$.vcsForm.averageCheckSize.$errors[0].$message }}
            </div>
            <div
              class="
                mt-4
                dropdown
                flex-1 flex
                rounded-lg
                py-1
                bg-fatou-gray-200
                border-fatou-black-400 border-[1px]
              "
            >
              <label
                tabindex="1"
                class="
                  flex
                  justify-between
                  w-full
                  h-10
                  overflow-hidden
                  bg-fatou-gray-200
                  focus:outline-none
                  pt-2
                  mx-1
                  px-1
                  text-gray-400 text-md
                "
              >
                {{
                  v$.vcsForm.averageCheckSize.$model !== 'none' &&
                  v$.vcsForm.averageCheckSize.$model
                    ? v$.vcsForm.averageCheckSize.$model
                    : 'Average Check Size'
                }}
                <svg
                  class="-mr-1 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  /></svg
              ></label>

              <div
                class="
                  bg-white
                  rounded-box
                  dropdown-content
                  px-4
                  py-3
                  shadow
                  mt-10
                "
                tabindex="1"
              >
                <ul class="h-50">
                  <li v-for="(check, index) in average_check_list" :key="index">
                    <div class="flex items-center mb-2">
                      <input
                        type="checkbox"
                        :checked="isCheckSelected(check)"
                        @change="setCheckSize(check)"
                        class="checkbox checkbox-sm checkbox-primary"
                      />

                      <span class="pl-2">{{ check }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div
              class="
                mt-4
                dropdown
                flex-1 flex
                rounded-lg
                py-1
                bg-fatou-gray-200
                border-fatou-black-400 border-[1px]
              "
            >
              <label
                tabindex="2"
                class="
                  flex
                  justify-between
                  w-full
                  h-10
                  overflow-hidden
                  bg-fatou-gray-200
                  focus:outline-none
                  pt-2
                  mx-1
                  px-1
                  text-gray-400 text-md
                "
              >
                {{
                  vcsForm.investmentType
                    ? vcsForm.investmentType
                    : 'Investment Type'
                }}
                <svg
                  class="-mr-1 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  /></svg
              ></label>

              <div
                class="
                  bg-white
                  rounded-box
                  dropdown-content
                  px-4
                  py-3
                  shadow
                  mt-10
                "
                tabindex="2"
              >
                <ul class="h-50">
                  <li
                    v-for="(type, index) in investment_type_list"
                    :key="index"
                  >
                    <div class="flex items-center mb-2">
                      <input
                        type="checkbox"
                        :checked="isTypeSelected(type)"
                        @change="setInvestmentType(type)"
                        class="checkbox checkbox-sm checkbox-primary"
                      />

                      <span class="pl-2">{{ type }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div
              class="
                mt-4
                dropdown
                flex-1 flex
                rounded-lg
                py-1
                bg-fatou-gray-200
                border-fatou-black-400 border-[1px]
              "
            >
              <label
                tabindex="2"
                class="
                  flex
                  justify-between
                  w-full
                  h-10
                  overflow-hidden
                  bg-fatou-gray-200
                  focus:outline-none
                  pt-2
                  mx-1
                  px-1
                  text-gray-400 text-md
                "
              >
                {{
                  vcsForm.investmentStages.length
                    ? vcsForm.investmentStages.map((stage) => stage).join(',')
                    : 'Investment Stage'
                }}
                <svg
                  class="-mr-1 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  /></svg
              ></label>

              <div
                class="
                  bg-white
                  rounded-box
                  dropdown-content
                  px-4
                  py-3
                  shadow
                  mt-10
                "
                tabindex="2"
              >
                <ul class="h-50">
                  <li v-for="(stage, index) in investment_stages" :key="index">
                    <div class="flex items-center mb-2">
                      <input
                        type="checkbox"
                        :checked="isStageSelected(stage)"
                        @change="setInvestmentStages($event, stage)"
                        class="checkbox checkbox-sm checkbox-primary"
                      />

                      <span class="pl-2">{{ stage }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div class="mt-4">
              <!-- category error -->
              <div
                v-if="v$.vcsForm.category.$error"
                class="text-red-600 text-xs"
              >
                {{ '* ' + v$.vcsForm.category.$errors[0].$message }}
              </div>
              <!-- <label class="label text-sm mb-0 p-0">
                <span class="label-text text-fatou-gray-400 text-sm mb-0 p-1"
                  >Category</span
                >
              </label> -->
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
                placeholder="Invested Categories"
                v-model="v$.vcsForm.category.$model"
              />
            </div>

            <div class="mt-4">
              <!-- website error -->
              <div
                v-if="v$.vcsForm.website.$error"
                class="text-red-600 text-xs"
              >
                {{ '* ' + v$.vcsForm.website.$errors[0].$message }}
              </div>
              <!-- <label class="label text-sm mb-0 p-0">
                <span class="label-text text-fatou-gray-400 text-sm mb-0 p-1"
                  >Website</span
                >
              </label> -->
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
                placeholder="Website"
                v-model="v$.vcsForm.website.$model"
              />
            </div>

            <div class="mt-4">
              <!-- facebook error -->
              <div
                v-if="v$.vcsForm.facebook.$error"
                class="text-red-600 text-xs"
              >
                {{ '* ' + v$.vcsForm.facebook.$errors[0].$message }}
              </div>
              <!-- <label class="label text-sm mb-0 p-0">
                <span class="label-text text-fatou-gray-400 text-sm mb-0 p-1"
                  >Facebook Url</span
                >
              </label> -->
              <input
                v-model="v$.vcsForm.facebook.$model"
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
                placeholder="Facebook"
              />
            </div>

            <div class="mt-4">
              <!-- twitter error -->
              <div
                v-if="v$.vcsForm.twitter.$error"
                class="text-red-600 text-xs"
              >
                {{ '* ' + v$.vcsForm.twitter.$errors[0].$message }}
              </div>
              <!-- <label class="label text-sm mb-0 p-0">
                <span class="label-text text-fatou-gray-400 text-sm mb-0 p-1"
                  >Twitter Url</span
                >
              </label> -->
              <input
                v-model="v$.vcsForm.twitter.$model"
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
                placeholder="Twitter"
              />
            </div>

            <div class="mt-4">
              <!-- crunchbase error -->
              <div
                v-if="v$.vcsForm.crunchbase.$error"
                class="text-red-600 text-xs"
              >
                {{ '* ' + v$.vcsForm.crunchbase.$errors[0].$message }}
              </div>
              <!-- <label class="label text-sm mb-0 p-0">
                <span class="label-text text-fatou-gray-400 text-sm mb-0 p-1"
                  >Crunch Base Url</span
                >
              </label> -->
              <input
                v-model="v$.vcsForm.crunchbase.$model"
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
                placeholder="Crunchbase"
              />
            </div>
            <div class="mt-4">
              <!-- instagram error -->
              <div
                v-if="v$.vcsForm.instagram.$error"
                class="text-red-600 text-xs"
              >
                {{ '* ' + v$.vcsForm.instagram.$errors[0].$message }}
              </div>
              <!-- <label class="label text-sm mb-0 p-0">
                <span class="label-text text-fatou-gray-400 text-sm mb-0 p-1"
                  >Instagram</span
                >
              </label> -->
              <input
                v-model="v$.vcsForm.instagram.$model"
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
                placeholder="instagram"
              />
            </div>

            <div class="mt-4">
              <!-- linkdIn error -->
              <div
                v-if="v$.vcsForm.linkdIn.$error"
                class="text-red-600 text-xs"
              >
                {{ '* ' + v$.vcsForm.linkdIn.$errors[0].$message }}
              </div>
              <!-- <label class="label text-sm mb-0 p-0">
                <span class="label-text text-fatou-gray-400 text-sm mb-0 p-1"
                  >LinkedIn Url</span
                >
              </label> -->
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
                placeholder="Linkedin"
                v-model="v$.vcsForm.linkdIn.$model"
              />
            </div>

            <div class="py-1">
              <!-- logo error -->
              <div v-if="v$.vcsForm.logo.$error" class="text-red-600 text-xs">
                {{ '* ' + v$.vcsForm.logo.$errors[0].$message }}
              </div>
              <label class="label text-xs mb-0 p-0">
                <span class="label-text text-fatou-gray-400 text-sm mb-0 p-1"
                  >Add an Image</span
                >
              </label>
              <input
                @change="onImageSelect"
                accept="image/*"
                type="file"
                ref="file"
                class="
                  w-full
                  bg-fatou-gray-200
                  focus:outline-none
                  py-2
                  px-3
                  border-fatou-gray-400 border-[1px]
                  rounded-md
                "
                id="file"
                placeholder="logo"
              />
            </div>
            <div class="w-full py-3.5 flex items-center justify-center">
              <button
                :disabled="isLoading"
                class="
                  btn
                  bg-fatou-blue
                  hover:bg-fatou-blue
                  rounded-3xl
                  border-0
                  text-white
                  w-1/2
                "
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

<style scoped>
@import url('/src/assets/css/modal.css');
</style>
