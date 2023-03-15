<script>
import AddVc from './dashboard/modals/AddVc.vue';
// import SingleVcDetails from './modals/SingleVcDetails.vue';
import { mapActions } from 'vuex';
import countryData from 'countrycitystatejson';

export default {
  components: { AddVc },
  data() {
    return {
      selected_countries: [],
      countries: [],
      country_list: [],
      country: null,
      investment_stages: [
        'Idea Stage',
        'Prototype Stage',
        'Early Revenue',
        'Scaling',
        'Growth',
        'Pre-IPO',
      ],
      selected_stages: [],
      average_check_list: [
        '10k-100k',
        '100k-250k',
        '250k-500k',
        '500k-1M',
        '1M-5M',
        '5M-10M',
        '10M-20M',
        '20M-50M',
        'UNCAPPED',
      ],
      investment_type_list: [
        'Angel',
        'Family',
        'Incubator',
        'Corporate VC',
        'Others',
      ],
      isAddVc: false,
      foundingRound: 'foundingRound',
      company: '',
      location: '',
      region: '',
      sector: '',
      gender: 'gender',
      website: '',
      facebook: '',
      instagram: '',
      twitter: '',
      linkdIn: '',
      crunchbase: '',
      query: '',
      investmentCountries: '',
      investmentStages: '',
      investmentType: '',
      averageCheckSize: '',
      vcsList: [],
      imageStorageUrl: import.meta.env.VITE_APP_SERVER_STORAGE_URL,
      currentVc: null,
    };
  },
  methods: {
    // load map actions form individual modules
    ...mapActions(['getVcs', 'filterVcs', 'saveVcs']),
    // declare function to fetch vcs
    getApprovedVcs() {
      this.getVcs()
        .then((res) => {
          this.vcsList = [];
          this.vcsList = res.data;
          console.log(this.vcsList);
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.error) {
            this.$notify({
              type: 'error',
              title: 'Error',
              text: 'Unable to fetch vcs ',
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
    openVcs(vcs) {
      this.currentVc = vcs;
    },
    getStages(vc) {
      if (vc.investmentStages) {
        return Array(vc.investmentStages).toString();
      }
      return 'N/A';
    },
    isStageChecked(name) {
      const isStageExists = this.selected_stages.find(
        (stage) => stage === name
      );
      if (isStageExists) {
        return true;
      }
      return false;
    },
    setStages(e, stage) {
      const checked = e.target.checked;
      if (checked) {
        this.selected_stages.push(stage);
      } else {
        this.selected_stages = this.selected_stages.filter(
          (item) => stage !== item
        );
      }
      if (this.selected_stages.length) {
        this.investmentStages = this.selected_stages.join();
      } else {
        this.investmentStages = '';
      }
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

      if (this.selected_countries.length) {
        this.investmentCountries = this.selected_countries
          .map((country) => country.shortName)
          .join();
      } else {
        this.investmentCountries = '';
      }
    },
    search() {
      // concat query depending on what field is available
      if (
        this.investmentCountries !== '' &&
        this.investmentStages === '' &&
        this.investmentType === '' &&
        this.averageCheckSize === ''
      ) {
        this.query = `investmentCountries=${this.investmentCountries}`;
      } else if (
        this.investmentCountries === '' &&
        this.investmentStages !== '' &&
        this.investmentType === '' &&
        this.averageCheckSize === ''
      ) {
        this.query = `investmentStages=${this.investmentStages}`;
      } else if (
        this.investmentCountries === '' &&
        this.investmentStages === '' &&
        this.investmentType !== '' &&
        this.averageCheckSize === ''
      ) {
        this.query = `investmentType=${this.investmentType}`;
      } else if (
        this.investmentCountries === '' &&
        this.investmentStages === '' &&
        this.investmentType === '' &&
        this.averageCheckSize !== ''
      ) {
        this.query = `averageCheckSize=${this.averageCheckSize}`;
      }

      // empty out fields
      this.investmentCountries = '';
      this.investmentStages = '';
      this.averageCheckSize = '';
      this.investmentType = '';
      console.log(this.query);
      this.filterVcs(this.query)
        .then((res) => {
          console.log(res);
          // store formal data
          var oldData = this.vcsList;
          if (res.data.length >= 1) {
            // if there wasnt any matching search revert to the formal data after 3 sec
            this.vcsList = res.data;
            // setTimeout(() => {
            //   this.vcsList = oldData;
            // }, 3000);
            // this.$notify({
            //   type: "success",
            //   title: "Vcs fetched",
            //   text: "There isnt  vcs that matches that query.",
            // });
          }
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.error) {
            this.$notify({
              type: 'error',
              title: 'Error',
              text: 'Unable to filter vcs ',
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
  mounted() {
    // fetch all approved vcs
    this.getApprovedVcs();
    this.countries = countryData.getCountries();
    this.country_list = this.countries;
  },
};
</script>
<template>
  <!--  -->
  <AddVc v-if="isAddVc" v-on:close="isAddVc = false" />
  <!--  -->
  <!--  -->
  <!-- <SingleVcDetails
    v-if="currentVc != null"
    :vcsData="currentVc"
    v-on:close_Single_Vc="currentVc = null"
  /> -->
  <!--  -->
  <div class="mt-16">
    <div class="max-w-4xl mx-auto space-y-8">
      <div class="w-full flex items-center justify-between">
        <span class="text-4xl text-[#C4C4C4] font-medium"
          >VCs Investing In
          <span class="text-fatou-blue">Minority</span> Founders</span
        >
        <span>
          <button
            @click="isAddVc = true"
            class="btn btn-primary border-0 text-white px-5 py-2.5 rounded-full"
          >
            Add Your VC
          </button>
        </span>
      </div>
      <div class="hidden sm:block">
        <form @keyup.enter="search" class="flex items-center space-x-6">
          <div
            class="
              dropdown
              flex-1 flex
              rounded-lg
              py-[3px]
              border-2 border-gray-200
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
                bg-transparent
                focus:outline-none
                pt-2
                mx-1
                px-1
                text-gray-400 text-sm
              "
            >
              {{ investmentCountries || 'Countries of investment' }}
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
                  style="width: 150px"
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
                    <span class="pl-2 pr-2 text-gray-500 text-sm lg:text-md">{{
                      country.name
                    }}</span>
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
            class="
              dropdown
              flex-1 flex
              rounded-lg
              py-[3px]
              border-2 border-gray-200
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
                focus:outline-none
                px-3
                text-gray-400 text-sm
                pt-2
                mx-1
                px-1
                text-gray-400 text-sm
              "
            >
              {{ investmentStages || 'Stages of investment' }}
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
                />
              </svg>
            </label>

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
              <ul>
                <li v-for="stage in investment_stages" :key="stage.id">
                  <div class="flex items-center mb-2">
                    <input
                      type="checkbox"
                      :checked="isStageChecked(stage)"
                      @change="setStages($event, stage)"
                      class="checkbox checkbox-sm checkbox-primary"
                    />
                    <span class="pl-2 text-gray-500 text-sm lg:text-md">{{
                      stage
                    }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div
            class="
              dropdown
              flex-1 flex
              rounded-lg
              py-[3px]
              border-2 border-gray-200
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
                focus:outline-none
                px-3
                text-sm text-gray-400
                pt-2
                mx-1
                px-1
                text-gray-400 text-sm
              "
            >
              {{ averageCheckSize || 'Average Check' }}
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
              <ul class="divide-y divide-solid">
                <li
                  v-for="(avg_check, index) in average_check_list"
                  :key="index + 'avg'"
                  class="cursor-pointer hover:bg-gray-100 p-1"
                >
                  <a
                    class="
                      divide-y divide-solid
                      text-gray-500 text-sm
                      lg:text-md
                    "
                    @click="averageCheckSize = avg_check"
                    >{{ avg_check }}</a
                  >
                </li>
              </ul>
            </div>
          </div>

          <div
            class="
              dropdown
              flex-1 flex
              rounded-lg
              py-[3px]
              border-2 border-gray-200
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
                focus:outline-none
                px-3
                text-gray-400 text-sm
                pt-2
                mx-1
                px-1
                text-gray-400 text-sm
              "
              >{{ investmentType || 'Investment Type' }}
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
              <ul class="divide-y divide-solid">
                <li
                  v-for="(type, index) in investment_type_list"
                  :key="index + 'inv_type'"
                  class="cursor-pointer hover:bg-gray-100 p-1"
                >
                  <a
                    @click="investmentType = type"
                    class="text-gray-500 text-sm lg:text-md"
                    >{{ type }}</a
                  >
                </li>
              </ul>
            </div>
          </div>

          <!-- <div class="flex-1 form-control">
            <select
              v-model="foundingRound"
              class="
                w-full
                bg-fatou-gray-200
                focus:outline-none
                py-2.5
                px-3
                border-fatou-gray-850 border-[1px]
                text-fatou-gray-400
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
            </select>
          </div> -->
          <!-- <div class="flex-1 form-control">
            <select
              v-model="gender"
              class="
                w-full
                bg-fatou-gray-200
                focus:outline-none
                py-2
                px-3
                border-fatou-gray-850 border-[1px]
                text-fatou-gray-400
                rounded-md
              "
            >
              <option value="gender" selected disabled>Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div> -->
        </form>
      </div>
      <!--  -->
      <div>
        <!-- grid -->
        <div class="space-y-4">
          <div
            v-for="vcs in vcsList"
            :key="vcs._id"
            @click="openVcs(vcs)"
            class="
              bg-white
              grid grid-cols-12
              px-3.5
              rounded-xl
              text-fatou-gray-600
              cursor-pointer
              relative
              divide-x divide-fatou-blue
            "
          >
            <!-- <div
              class="
                absolute
                right-1
                top-2
                flex
                items-center
                px-6
                py-0.5
                border border-fatou-blue
                rounded-full
              "
            >
              <span class="text-fatou-blue text-xs">VCs</span>
            </div> -->
            <div
              class="
                col-span-12
                md:col-span-3
                lg:col-span-2
                text-center
                overflow-wrap
                items-center
                px-2
              "
            >
              <h3 class="text-sm lg:text-lg font-medium text-fatou-black pt-3">
                {{ vcs.name }}
              </h3>
              <a v-if="vcs.website" target="_blank" :href="vcs.website" class="text-fatou-blue text-wrap text-sm lg:text-md">
                Website
              </a>
              <div class="flex justify-center items-center mt-3">
                <img
                  src="/images/svg/linkedin.svg"
                  class="w-6 h-6 rounded-full"
                />
              </div>
              <!-- <div class="block sm:hidden">
                <h3 class="text-xl font-medium truncate text-fatou-black">
                  {{ vcs.name }}
                </h3>
                <p>{{ vcs.description.substring(0, 30) }} . . .</p>
              </div> -->
            </div>
            <div class="px-3 col-span-12 md:col-span-9 lg:col-span-10">
              <div class="grid grid-cols-6 md:grid-cols-4 py-2">
                <div class="mb-3">
                  <h6
                    class="
                      text-fatou-black-100 text-sm
                      md:text-md
                      font-semibold
                    "
                  >
                    HQ
                  </h6>
                  <p class="text-gray-500 text-xs">
                    {{ vcs.location.country }}
                  </p>
                   <p class="text-gray-500 text-xs">
                    {{ vcs.location.state }}
                  </p>
                </div>
                <div class="mb-3">
                  <h6
                    class="
                      text-fatou-black-100 text-sm
                      md:text-md
                      font-semibold
                    "
                  >
                    Average Check
                  </h6>
                  <p class="text-gray-500 text-xs ">
                    {{ vcs.averageCheckSize }}
                  </p>
                </div>
                <div class="mb-3">
                  <h6
                    class="
                      text-fatou-black-100 text-xs
                      md:text-md
                      font-semibold
                    "
                  >
                    Investment Type
                  </h6>
                  <p class="text-gray-500 text-xs">
                    {{ vcs.investmentType || 'N/A' }}
                  </p>
                </div>
                <div class="mb-3">
                  <h6
                    class="
                      text-fatou-black-100 text-sm
                      md:text-md
                      font-semibold
                    "
                  >
                    Investment Stage
                  </h6>
                  <p class="text-gray-500 text-xs">
                    {{ getStages(vcs) }}
                  </p>
                </div>
              </div>
              <h3 class="text-fatou-black-100 text-sm md:text-md font-semibold">
                About Us
              </h3>
              <p class="hidden truncate sm:block text-xs text-gray-400">
                {{ vcs.description.substring(0, 50) }} . . .
              </p>
              <h3
                class="
                  text-fatou-black-100 text-sm
                  md:text-md
                  font-semibold
                  mt-4
                "
              >
                Investment Countries
              </h3>
              <div class="flex flex-wrap" v-if="vcs.investmentCountries">
                <img
                  v-for="country in vcs.investmentCountries"
                  :key="country"
                  :src="`https://countryflagsapi.com/svg/${country}`"
                  class="mr-2 w-5 h-5"
                  :alt="country"
                />
              </div>
              <div v-else>
                <p>N/A</p>
              </div>
            </div>
            <!--  -->
            <!-- <div class="flex flex-col items-end justify-end">
              
              <div class="flex items-center space-x-1.5">
                <a :href="vcs.social.instagram">
                  <img
                    src="/images/svg/instagram-dark.svg"
                    alt="instagram"
                    class="w-8 h-8"
                  />
                </a>
                <a :href="vcs.social.twitter">
                  <img
                    src="/images/svg/twitter-dark.svg"
                    alt="instagram"
                    class="h-8 w-8"
                  />
                </a>
                <a :href="vcs.social.linkedin">
                  <img
                    src="/images/svg/linkedin.svg"
                    alt="linkedin"
                    class="w-8 h-8"
                  />
                </a>
              </div>
            </div> -->
          </div>
          <!--  -->

          <!--  -->

          <!--  -->
        </div>
      </div>
    </div>
  </div>
</template>
