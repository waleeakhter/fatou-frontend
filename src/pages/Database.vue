<script>
import { ref, onMounted, registerRuntimeCompiler } from 'vue'
import axios from 'axios'
import { http } from '../core/http.request'

import UsersService from '../services/users.service'
import DataProviderApis from '../services/dataapi.service'
// components
import ResumeModal from './dashboard/modals/ResumeModal.vue'
import GainAccessModal from './dashboard/modals/GainAccessModal.vue'
import SeekingModal from './dashboard/modals/SeekingModal.vue'
import SignupProgress from './components/SignupProgress.vue'
import UserCard from './components/UserCard.vue'
import Skeleton from './components/Skeleton.vue'
import userService from '../services/user.service'
import Multiselect from '@vueform/multiselect'
import countryData from 'countrycitystatejson';
import { mapActions } from 'vuex';

export default {
  components: {
    UserCard,
    SignupProgress,
    ResumeModal,
    GainAccessModal,
    Skeleton,
    SeekingModal,
    Multiselect
  },
  data() {
    return {
      viewUserModal: false,
      viewUserResumeModal: false,
      gainSeekingAccessModal: false,
      isExploreConnects: false,
      userSuggestions: [],
      filterData: '',
      searchQuery: '',
      filters: {
        searchQuery: '',
        country: '',
        state: '',
        industry: [],
        sector: [],
        education: [],
        experience: [],
        seeking: [],
        skills:[]
      },
      searchResults: [],
      searchEmpty: false,
      showSeekingModal:false
    }
  },
  computed: {
    states() {
      if (this.filters.country) {
        const country = this.countries.find(country_ => {
          return country_.name == this.filters.country
        })
        return countryData.getStatesByShort(country.shortName);
      } else {
        return []
      }
    },
    isRecruiter() {
      return this.$store.state.auth.isRecruiter;
    },
    currentUser() {
      return this.$store.state.auth.currentUser;
    },
    countries() {
      return countryData.getCountries().filter(c => {
        return !(['Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'the Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden'].includes(c.name))
      })
    },
    combinedFilters() {
      return (
        this.filters.country +
        this.filters.state +
        this.filters.industry +
        this.filters.sector +
        this.filters.education +
        this.filters.experience +
        this.filters.seeking + 
        this.filters.skills 
      )
    }
  },
  watch: {
    states () {
      this.filters.state = ''

    },
    'filters.seeking':function (newVal,oldVal){
      console.log('seekingSearchAccess',this.$store.state.auth.seekingSearchAccess);
      if(!this.$store.state.auth.seekingSearchAccess){
          if(newVal.includes('Employment')|| newVal.includes('Internship')){
          this.showSeekingModal=true
        }else{
          this.showSeekingModal=false
        }
      }
      
    },
    combinedFilters() {
      this.filters.searchQuery = ''
      this.filterSearch();
    },
  },
  async mounted() {
    this.getAuthUser()
    this.getUserSuggestions();
    this.getFitlerData();
this.search()


  },
  methods: {
    	...mapActions(['getAuthUser']),
    async getUserSuggestions () {
      this.userSuggestions = await UsersService.getConnectSuggestions();
      this.searchResults = this.userSuggestions
    },
    async getFitlerData() {
      this.filterData = await userService.getFilterData();



    DataProviderApis.getSkillsList().then((res)=>{
			 this.filterData.skills=res.data.map((skill)=>( { value:skill._id, label:skill.name } ))
		}).catch((err)=>{
		
		})

    },
    async filterSearch() {
      // if (this.filters.seeking == "Employment" && !this.isRecruiter) {
      //   this.gainSeekingAccessModal = true;
      //   this.filters.seeking = '';
      //   return
      // }

      // if (this.combinedFilters == '' && this.filters.searchQuery == '') {
      //   this.searchResults = this.userSuggestions.slice(8, 16);
      //   return
      // }
      console.log(this.filters)
      this.searchEmpty = false;
      this.searchResults = [];
      let searchResults = await UsersService.getFilterData({
        ...this.filters,
        industry:this.filters.industry.toString(),
        sector:this.filters.sector.toString(),
        education:this.filters.education.toString(),
        experience:this.filters.experience.toString(),
        seeking:this.filters.seeking.toString(),
        skills:this.filters.skills.toString()
        });

      // if (this.filters.seeking == "Employment") [
      //   searchResults = searchResults.filter(user => {
      //     return user.company != this.currentUser.company
      //   })
      // ]

      this.searchResults = searchResults
      
      if (this.searchResults.length == 0) {
        this.searchEmpty = true;
      }
    },

    async search() {
      this.filters.searchQuery = this.searchQuery;
      await this.filterSearch();
    },
    
    resetFilters() {
      for (const [key, value] of Object.entries(this.filters)) {
        this.filters[key] = '';
      }
      this.searchQuery = '';
    }

  }
}

// const viewUserModal = ref(false);
// const viewUserResumeModal = ref(false);
// const gainSeekingAccessModal = ref(false);
// const isExploreConnects = ref(false);

// Get connect suggestions
// let userSuggestions = ref([])
</script>
<template>
  <!-- <div class="relative"> -->
  <!-- modals -->
  <!-- <ResumeModal
    v-if="viewUserResumeModal"
    v-on:close="viewUserResumeModal = !viewUserResumeModal"
  /> -->
  <GainAccessModal
    v-if="gainSeekingAccessModal"
    v-on:close="gainSeekingAccessModal = !gainSeekingAccessModal"
  />

   <SeekingModal
    v-if="showSeekingModal"
    v-on:close="showSeekingModal = !showSeekingModal"
  />
  
  <div class="flex mt-16 space-x-8 w-5/6 mx-auto max-w-[1400px]">
    <div class="flex-grow">
      <SignupProgress />

      <!-- Suggestions -->
      <div class="px-4 pb-10 mx-auto space-y-6 sm:px-0 rounded-xl">
        <div class="p-5 space-y-2 bg-white rounded-xl sm:px-8">
          <h2 class="font-semibold text-fatou-black">
            Top matches based on your profile
          </h2>
          <p class="text-fatou-gray-800">Expand your network</p>
        </div>
        <div class="space-y-2.5">
          <div class="grid w-full grid-cols-1 gap-8 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2"
            v-if="userSuggestions.length">  
            <UserCard v-for="suggestion in userSuggestions.slice(0, 8)" :forRecruiter="this.$store.state.auth.seekingSearchAccess" :user="suggestion"/>
          </div>
          <Skeleton v-else />
        </div>
      </div>

      <!-- Search Connections -->
      <div class="relative">
        <div id="search" class="hidden p-5 mx-auto space-y-2 bg-white sm:px-8 rounded-xl sm:block">
          <h2 class="text-fatou-black">
            Explore Connects through search
          </h2>
          <p class="text-fatou-gray-800">Discover New Connections</p>
        </div>
        <div id="filter" class="mt-5 sticky top-[6rem] z-[1]">
          <button class="flex items-center justify-center px-8 py-3 space-x-2 font-medium text-white bg-transparent rounded-full shadow-xl bg-fatou-blue-500">
            <img src="/images/svg/filter.svg" width="20" alt="">
            <span>Filter</span>
          </button>
          <div id="filter-elements">
            <div class="flex justify-between items-center px-2 pt-2 !font-medium text-fatou-blue">
              <span class="inline-block">Filter</span>
              <button @click="resetFilters()" class="inline-block px-2 font-medium rounded-md bg-fatou-gray-100">Reset</button>
            </div>
            <form @submit.prevent="search()" class="flex p-2">
              <input type="text" class="flex-grow w-auto px-4 py-2 bg-transparent rounded-md rounded-r-none bg-fatou-gray-100 border-fatou-gray-300 focus:outline-none focus:border-fatou-blue" placeholder="Search name, company, and more..." v-model="searchQuery"/>
              <button type="submit" class="flex items-center justify-center p-2 px-4 rounded-md rounded-l-none bg-fatou-blue rounded-2 group" aria-label="Search">
                <img src="/images/svg/search-white.svg" class="w-[23px] group-active:scale-75 transform transition-all ease-in-out duration-200" alt="">
              </button>
            </form>
            <div class="px-2 space-y-2">
              <div id="filter-selects" class="flex flex-wrap gap-1">
                 <div>
                  <label for="seeking">Seeking</label>
                   <Multiselect
                        v-model="filters.seeking"
                        mode="tags"
                        :searchable="true"
                        :options="filterData.interests"
                        placeholder="Select Seeking"
                        class="mt-2"
                    />
                  
                
                </div>
                <div>
                  <label for="country">Country</label>
                  <select v-model="filters.country" name="country" id="country" class="bg-none">
                    <option value="">Select One</option>
                    <option v-if="countries" v-for="country in countries" :value="country.name">{{country.name}}</option>
                  </select>
                </div>
                <div>
                  <label for="State">State</label>
                  <select v-model="filters.state " name="state" id="state" class="bg-none">
                    <option value="">Select One</option>
                    <option v-if="states" v-for="state in states" :value="state">{{state}}</option>
                  </select>
                </div>
                <div>
                  <label for="industry">Industry</label>

                    <Multiselect
                        v-model="filters.industry"
                        mode="tags"
                        :searchable="true"
                        :options="filterData.industries"
                        placeholder="Select Industries"
                        class="mt-2"
                    />
                </div>
                <div>
                  <label for="sector">Sector</label>
                  <Multiselect
                        v-model="filters.sector"
                        mode="tags"
                        :searchable="true"
                        :options="filterData.sectors"
                        placeholder="Select sectors"
                        class="mt-2"
                    />
                 
                </div>
                <div>
                  <label for="education">Education Level</label>
                   <Multiselect
                        v-model="filters.education"
                        mode="tags"
                        :searchable="true"
                        :options="filterData.educationLevels"
                        placeholder="Select sectors"
                        class="mt-2"
                    />
                  
                </div>
                <div>
                  <label for="experience">Experience Level</label>

                    <Multiselect
                        v-model="filters.experience"
                        mode="tags"
                        :searchable="true"
                        :options="filterData.experienceLevels"
                        placeholder="Select Experiences"
                        class="mt-2"
                    />

                  
                </div>
               



                <div>
                  <label for="skills">Skills</label>
                  <!-- <select v-model="filters.skills" name="skills" id="" class="bg-none">
                    <option value="">Select One</option>
                    <option v-if="filterData" v-for="skill in filterData.skills" :value="skill.value">{{ skill.label }}</option>
                  </select> -->

                  <Multiselect
                        v-model="filters.skills"
                        mode="tags"
                        :searchable="true"
                        :options="filterData.skills"
                        placeholder="Select Skills"
                        class="mt-2"
                    />
                </div>


              </div>
            </div>
          </div>
        </div>
        <div class="px-4 py-10 mx-auto space-y-6 sm:px-0 rounded-xl">
        
          <div class="space-y-2.5">
            <Skeleton v-if="!searchResults.length && !searchEmpty" />
            
            <div v-else-if="searchResults.length" class="grid w-full grid-cols-1 gap-8 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
              <UserCard  v-for="result in searchResults" :user="result" :forRecruiter="this.$store.state.auth.seekingSearchAccess" :actionType="this.filters.seeking"/>
            </div>
            <div class="mt-12 space-y-5 text-center" v-else>
              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 512 512" class="w-20 mx-auto fill-current text-fatou-blue"><path d="M352 493.4C322.4 505.4 289.9 512 256 512C222.1 512 189.6 505.4 160 493.4V288C160 279.2 152.8 272 144 272C135.2 272 128 279.2 128 288V477.8C51.48 433.5 0 350.8 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 350.8 460.5 433.5 384 477.8V288C384 279.2 376.8 272 368 272C359.2 272 352 279.2 352 288V493.4zM217.6 236.8C224.7 231.5 226.1 221.5 220.8 214.4C190.4 173.9 129.6 173.9 99.2 214.4C93.9 221.5 95.33 231.5 102.4 236.8C109.5 242.1 119.5 240.7 124.8 233.6C142.4 210.1 177.6 210.1 195.2 233.6C200.5 240.7 210.5 242.1 217.6 236.8zM316.8 233.6C334.4 210.1 369.6 210.1 387.2 233.6C392.5 240.7 402.5 242.1 409.6 236.8C416.7 231.5 418.1 221.5 412.8 214.4C382.4 173.9 321.6 173.9 291.2 214.4C285.9 221.5 287.3 231.5 294.4 236.8C301.5 242.1 311.5 240.7 316.8 233.6zM208 368C208 394.5 229.5 416 256 416C282.5 416 304 394.5 304 368V336C304 309.5 282.5 288 256 288C229.5 288 208 309.5 208 336V368z"/></svg>
              <p>Nothing found. Try changing some filters.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  #search select {
    @apply py-[.4rem] bg-fatou-gray-200 text-fatou-blue border-0 px-2 rounded flex-grow text-center capitalize w-full;
  }

  option:first-of-type {
    @apply opacity-10;
  }

  #filter-elements select {
    @apply py-2;
  }
  
  option {
    @apply capitalize text-left absolute px-4 py-2;
  }

  #filter-selects > div {
    @apply flex flex-col max-w-[25%] flex-[1_1_24%];
   
  }

  #filter {
    /* @apply w-[200px]; */
    width: fit-content;
  }

  #filter-elements {
    @apply invisible opacity-0 absolute top-0 left-0 max-h-[80vh]  bg-white rounded-xl shadow-2xl transition-all ease-in-out duration-200 w-[80vw] transform scale-90 origin-top-left;
  }

  #filter-elements > div{
    @apply w-full;
    
  }

  #filter label {
    @apply bg-fatou-blue text-white block px-4 py-2 font-medium rounded-md;
  }

  #filter select {
    @apply  my-2 bg-white border;
  }

  #filter:hover #filter-elements,
  #filter:focus #filter-elements {
    @apply opacity-100 visible scale-100;
  }
  
</style>
