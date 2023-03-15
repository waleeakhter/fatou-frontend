<script>
import { mapActions } from "vuex";
import FounderModal from "../pages/modals/FounderModal.vue";
import AddFounder from "./dashboard/modals/AddFounderModal.vue";
import ClaimIt from "./dashboard/modals/ClaimIt.vue";
// const viewFounderModal = ref(false);

export default {
  data() {
    return {
      founderInfo: null,
      isClaim: false,
      isAddCompany: false,
      foundingRound: "foundingRound",
      company: "",
      name: "",
      location: "",
      sector: "",
      gender: "gender",
      query: "",
      founderList: [],
      viewFounderModal: false,
      imageStorageUrl: import.meta.env.VITE_APP_SERVER_STORAGE_URL,

      totalPages: 0,
      limit: 12,
      page: 1,
      pagination: [],
      paginationLoading: false,
    };
  },
  methods: {
    // load map actions form individual modules
    ...mapActions(["getFounder", "filterFounder", "claimCompany"]),
    // declare function to fetch vcs
    getAllFounders() {
      this.paginationLoading = true;
      this.getFounder({ limit: this.limit, page: this.page })
        .then((res) => {
          console.log(res);
          this.founderList = res.results;
          this.totalPages = res.totalPages;
         
          //TODO:// not needed
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.paginationLoading = false;
        });
    },
    openFounder(founder) {
      this.currentCurrent = founder;
    },

    viewFounder(founder) {
      this.founderInfo = Object.assign({}, founder);
      console.log(this.founderInfo);
      this.viewFounderModal = true;
    },

    search() {
      // concat query depending on what field is available
      if (
        this.foundingRound !== "" &&
        this.company === "" &&
        this.location === "" &&
        this.sector === "" &&
        this.gender === ""
      ) {
        this.query = `foundinground=${this.foundingRound}`;
      } else if (
        this.foundingRound === "" &&
        this.company === "" &&
        this.location === "" &&
        this.sector === "" &&
        this.gender !== ""
      ) {
        this.query = `gender=${this.gender}`;
      } else if (
        this.foundingRound === "" &&
        this.company === "" &&
        this.location === "" &&
        this.sector !== "" &&
        this.gender === ""
      ) {
        this.query = `sector=${this.sector}`;
      } else if (
        this.foundingRound == "" &&
        this.company === "" &&
        this.location !== "" &&
        this.sector === "" &&
        this.gender === ""
      ) {
        this.query = `location=${this.location}`;
      } else if (
        this.foundingRound === "" &&
        this.company !== "" &&
        this.location === "" &&
        this.sector === "" &&
        this.gender === ""
      ) {
        this.query = `name=${this.company}`;
      }
      // empty out fields
      this.foundingRound = "";
      this.company = "";
      this.location = "";
      this.sector = "";
      this.gender = "";
      console.log(this.query);
      this.filterFounder(this.query)
        .then((res) => {
          console.log(res);
          // store formal data
          var oldData = this.founderList;
          this.founderList = res.data;
          if (res.data.length === 0) {
            // if there wasnt any matching search revert to the formal data after 3 sec
            setTimeout(() => {
              this.vcsList = oldData;
            }, 3000);
            this.$notify({
              type: "success",
              title: "Founder fetched",
              text: "There isnt  any founder that matches that query.",
            });
          }
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.error) {
            this.$notify({
              type: "error",
              title: "Error",
              text: "Unable to filter founders ",
            });
          } else {
            this.$notify({
              type: "error",
              title: "Error",
              text: "Network error, try again",
            });
          }
        });
    },

    claimCompany_(id, index) {
      this.$notify({
        type: "info",
        title: "Claim Request",
        text: "We're reviewing your submission. We will get back to you within 48 hours. Thanks",
      });
      this.claimCompany(id)
        .then((res) => {
          if (res.message.claimedBy != null) {
            this.founderList[index].claimedBy = res.message.claimedBy;
          }
          console.log(res);
        })
        .catch((err) => {
          this.$notify({
            type: "error",
            title: "Claim Request",
            text: "Something went wrong!",
          });

          console.log("err", err);
        });
    },

    computePagination(current_page, last_page, onSides = 2) {
      let pages = [];
      for (let i = 1; i <= last_page; i++) {
        let offset = i == 1 || last_page ? onSides + 1 : onSides;

        if (
          i == 1 ||
          (current_page - offset <= i && current_page + offset >= i) ||
          i == current_page ||
          i == last_page
        ) {
          pages.push(i);
        } else if (
          i == current_page - (offset + 1) ||
          i == current_page + (offset + 1)
        ) {
          pages.push("...");
        }
      }
      return pages;
    },

    onPageChange(nextPage) {
      this.page = nextPage;
      this.getAllFounders();
    },
  },
  created() {
    // fetch all founder
    this.pagination = this.computePagination(this.page, this.totalPages);
    this.getAllFounders();
  },
  watch: {
    totalPages: {
      handler: function () {
        this.pagination = this.computePagination(this.page, this.totalPages);
      },
      immediate: true,
    },
     page: {
            handler: function () {
                this.pagination = this.computePagination(this.page, this.totalPages)
            },
            immediate: true,
        },
  },
  components: { FounderModal, AddFounder, ClaimIt },
};
</script>
<template>
  <FounderModal v-if="viewFounderModal && founderInfo" :founder="founderInfo"
    v-on:close="viewFounderModal = !viewFounderModal" />

  <AddFounder v-if="isAddCompany" @close="isAddCompany = false" />

  <!-- <ClaimIt v-if="isClaim" @close="isClaim = false" /> -->

  <div class="mt-16">
    <div class="sm:w-4/5 mx-auto space-y-8">
      <div class="w-full flex items-center justify-between">
        <div class="flex-grow flex items-center justify-center">
          <span class="text-4xl text-[#C4C4C4] font-semibold text-center">
            <span class="text-fatou-blue text-4xl font-semibold">Minority</span>
            Founders List</span>
        </div>
        <span>
          <button @click="isAddCompany = !isAddCompany"
            class="btn btn-primary border-0 text-white px-5 py-2.5 rounded-full">
            Add Company
          </button>
        </span>
      </div>
      <div class="hidden sm:block">
        <form @keyup.enter="search" class="flex items-center space-x-6">
          <div
            class="flex-1 flex items-center pl-2 rounded-lg py-[1px] bg-fatou-gray-200 border-fatou-gray-850 border-[1px]">
            <span>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24.903 26.1428L17.283 18.5214C13.8932 20.9314 9.22222 20.3419 6.53746 17.1653C3.85271 13.9888 4.04984 9.28489 6.99097 6.34411C9.93131 3.40204 14.6357 3.20405 17.8128 5.88866C20.99 8.57327 21.5798 13.2447 19.1696 16.6348L26.7896 24.2561L24.9043 26.1414L24.903 26.1428ZM12.647 6.66676C10.1186 6.66619 7.93722 8.44101 7.4236 10.9167C6.90998 13.3924 8.20525 15.8885 10.5252 16.8938C12.8452 17.899 15.5522 17.1372 17.0073 15.0695C18.4624 13.0018 18.2657 10.1965 16.5363 8.35211L17.343 9.15211L16.4336 8.24544L16.4176 8.22944C15.42 7.22568 14.0622 6.66294 12.647 6.66676Z"
                  fill="#ADB5BD" />
              </svg>
            </span>
            <input type="search" class="w-full h-full bg-fatou-gray-200 focus:outline-none py-2 px-3"
              placeholder="Company" v-model="company" />
          </div>
          <div
            class="flex-1 flex items-center pl-2 rounded-lg py-[1px] bg-fatou-gray-200 border-fatou-gray-850 border-[1px]">
            <input type="search" class="w-full h-full bg-fatou-gray-200 focus:outline-none py-2 px-3"
              placeholder="Location" v-model="location" />
          </div>
          <div
            class="flex-1 flex items-center pl-2 rounded-lg py-[1px] bg-fatou-gray-200 border-fatou-gray-850 border-[1px]">
            <input type="search" class="w-full h-full bg-fatou-gray-200 focus:outline-none py-2 px-3"
              placeholder="Industry" v-model="sector" />
          </div>

          <div class="flex-1 form-control">
            <select v-model="foundingRound"
              class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-850 border-[1px] text-fatou-gray-400 rounded-md">
              <option value="foundingRound" selected disabled>
                Funding Round
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
          </div>
          <div class="flex-1 form-control">
            <select v-model="gender"
              class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-850 border-[1px] text-fatou-gray-400 rounded-md">
              <option value="gender" selected disabled>Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>
        </form>
      </div>
      <div class="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6">
        <div v-for="(founder, index) in founderList" :key="founder._id" class="w-full">
          <!-- cards -->

          <div
            class="bg-white text-fatou-gray-600 cursor-pointer rounded-xl flex flex-col items-center space-y-2 p-4 w-full">
            <div class="w-full flex items-center justify-end">
              <div v-if="!founder?.claimedBy"
                class="flex items-center px-3.5 py-0.5 border border-fatou-blue rounded-md">
                <span class="text-fatou-black text-xs font-medium" @click="claimCompany_(founder._id, index)">Claim
                  it</span>
              </div>
            </div>
            <div @click="viewFounder(founder)">
              <img src="/images/png/profile.png"
                class="box-content object-cover rounded-full cursor-pointer h-28 w-28 mx-auto my-2" alt="" />
              <div class="text-center">
                <h2
                  class="text-fatou-black truncate flex-[0_1_auto] max-w-[99%] capitalize font-medium text-[15px] mb-0 leading-none">
                  {{ founder?.claimedBy?.firstName }}
                  {{ founder?.claimedBy?.lastName }}
                </h2>

                <span class="text-xs max-w-[200px] text-[#9ca3af]">Founder &amp; CEO at {{ founder.company?.name
                  }}</span>
              </div>
              <div class="text-center py-3">
                <p class="font-medium text-sm text-fatou-blue">Funding Stage</p>
                <p class="text-sm text-fatou-black font-medium">
                  {{ founder.company?.foundingRound }}
                </p>
              </div>
              <div class="text-center">
                <!-- <span class="text-fatou-black text-sm">{{  founder.company?.website }}</span> -->
                <div class="flex justify-center space-x-3 py-2">
                  <a class="flex-[0_auto]" v-if="founder.company?.social?.instagram"
                    :href="founder.company?.social?.instagram" target="_blank">
                    <img src="/images/svg/instagram-dark.svg" alt="instagram" class="h-7 w-7" />
                  </a>

                  <a class="flex-[0_auto]" v-if="founder.company?.social?.twitter"
                    :href="founder.company?.social?.twitter" target="_blank">

                    <img src="/images/svg/twitter-dark.svg" alt="twitter" class="h-7 w-7" />
                  </a>
                  <a class="flex-[0_auto]" v-if="founder.company?.social?.linkedIn"
                    :href="founder.company?.social?.linkedIn" target="_blank">

                    <img src="/images/svg/linkedin.svg" alt="linkedin" class="h-7 w-7" />
                  </a>
                  <a class="flex-[0_auto]" v-if="founder.company?.social?.crunchbase"
                    :href="founder.company?.social?.crunchbase" target="_blank">
                    <img src="/images/svg/crunchbase.svg" alt="crunchbase" class="h-7 w-7" />
                  </a>

                </div>
              </div>
            </div>
          </div>

          <!--  -->

          <!--  -->
          <!-- <button>
          <div
            class="
              bg-white
              
              text-fatou-gray-600
              rounded-xl
              flex flex-col
              items-center
              space-y-2
              p-4
              w-full
            "
          >
            <div class="w-full flex items-center justify-end">
              <div
                class="
                  flex
                  items-center
                  px-3.5
                  py-0.5
                  border border-fatou-blue
                  rounded-full
                "
              >
                <span class="text-fatou-blue text-xs">I'm Hiring</span>
              </div>
            </div>
            <img src="/images/png/vanesa.png" class="rounded-full w-2/2 py-2" alt="" />
            <div class="text-center">
              <h2 class="text-fatou-black text-xl font-medium ">Savannah Nguyen</h2>
              <span class="text-sm text-fatou-black font-medium"
                >Founder & CEO at Vena</span
              >
            </div>
            <div class="text-center py-5">
              <p class="text-md text-fatou-blue">Funding Stage</p>
              <p class="text-md text-fatou-black mt-2">Series C</p>
            </div>
            <div class="text-center">
              <span class="text-fatou-black  text-sm">www.venno.com</span>
              <div class="flex items-center space-x-3 py-2">
                <img
                  src="/images/svg/instagram-dark.svg"
                  alt="instagram"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/twitter-dark.svg"
                  alt="twitter"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/linkedin.svg"
                  alt="linkedin"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/crunchbase.svg"
                  alt="crunchbase"
                  class="h-7 w-7"
                />
              </div>
            </div>
          </div>
          </button> -->

          <!--  -->
          <!-- <button >
           <div
            class="
              bg-white
              
              text-fatou-gray-600
              rounded-xl
              flex flex-col
              items-center
              space-y-2
              p-4
              w-full
            "
          >
            <div class="w-full flex items-center justify-end">
              <div
                class="
                  flex
                  items-center
                  px-3.5
                  py-0.5
                  border border-fatou-blue
                  rounded-full
                "
              >
                <span class="text-fatou-blue text-xs">I'm Hiring</span>
              </div>
            </div>
            <img src="/images/png/third-img.png" class="rounded-full w-2/2 py-2" alt="" />
            <div class="text-center">
              <h2 class="text-fatou-black text-xl font-medium ">Savannah Nguyen</h2>
              <span class="text-sm text-fatou-black font-medium"
                >Founder & CEO at Vena</span
              >
            </div>
            <div class="text-center py-5">
              <p class="text-md text-fatou-blue">Funding Stage</p>
              <p class="text-md text-fatou-black mt-2">Series C</p>
            </div>
            <div class="text-center">
              <span class="text-fatou-black  text-sm">www.venno.com</span>
              <div class="flex items-center space-x-3 py-2">
                <img
                  src="/images/svg/instagram-dark.svg"
                  alt="instagram"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/twitter-dark.svg"
                  alt="twitter"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/linkedin.svg"
                  alt="linkedin"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/crunchbase.svg"
                  alt="crunchbase"
                  class="h-7 w-7"
                />
              </div>
            </div>
          </div>
          </button> -->

          <!--  -->
          <!-- <button>
                      <div
            class="
              bg-white
              
              text-fatou-gray-600
              rounded-xl
              flex flex-col
              items-center
              space-y-2
              p-4
              w-full
            "
          >
            <div class="w-full flex items-center justify-end">
              <div
                class="
                  flex
                  items-center
                  px-3.5
                  py-0.5
                  border border-fatou-blue
                  rounded-full
                "
              >
                <span class="text-fatou-blue text-xs">I'm Hiring</span>
              </div>
            </div>
            <img src="/images/png/img@savannah.png" class="rounded-full w-2/2 py-2" alt="" />
            <div class="text-center">
              <h2 class="text-fatou-black text-xl font-medium ">Savannah Nguyen</h2>
              <span class="text-sm text-fatou-black font-medium"
                >Founder & CEO at Vena</span
              >
            </div>
            <div class="text-center py-5">
              <p class="text-md text-fatou-blue">Funding Stage</p>
              <p class="text-md text-fatou-black mt-2">Series C</p>
            </div>
            <div class="text-center">
              <span class="text-fatou-black  text-sm">www.venno.com</span>
              <div class="flex items-center space-x-3 py-2">
                <img
                  src="/images/svg/instagram-dark.svg"
                  alt="instagram"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/twitter-dark.svg"
                  alt="twitter"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/linkedin.svg"
                  alt="linkedin"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/crunchbase.svg"
                  alt="crunchbase"
                  class="h-7 w-7"
                />
              </div>
            </div>
          </div>
          </button> -->

          <!--  -->

          <!-- <button>
                      <div
            class="
              bg-white
              
              text-fatou-gray-600
              rounded-xl
              flex flex-col
              items-center
              space-y-2
              p-4
              w-full
            "
          >
            <div class="w-full flex items-center justify-end">
              <div
                class="
                  flex
                  items-center
                  px-3.5
                  py-0.5
                  border border-fatou-blue
                  rounded-full
                "
              >
                <span class="text-fatou-blue text-xs">I'm Hiring</span>
              </div>
            </div>
            <img src="/images/png/img@savannah.png" class="rounded-full w-2/2 py-2" alt="" />
            <div class="text-center">
              <h2 class="text-fatou-black text-xl font-medium ">Savannah Nguyen</h2>
              <span class="text-sm text-fatou-black font-medium"
                >Founder & CEO at Vena</span
              >
            </div>
            <div class="text-center py-5">
              <p class="text-md text-fatou-blue">Funding Stage</p>
              <p class="text-md text-fatou-black mt-2">Series C</p>
            </div>
            <div class="text-center">
              <span class="text-fatou-black  text-sm">www.venno.com</span>
              <div class="flex items-center space-x-3 py-2">
                <img
                  src="/images/svg/instagram-dark.svg"
                  alt="instagram"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/twitter-dark.svg"
                  alt="twitter"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/linkedin.svg"
                  alt="linkedin"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/crunchbase.svg"
                  alt="crunchbase"
                  class="h-7 w-7"
                />
              </div>
            </div>
          </div>
          </button> -->

          <!--  -->
          <!-- <button>
                      <div
            class="
              bg-white
              
              text-fatou-gray-600
              rounded-xl
              flex flex-col
              items-center
              space-y-2
              p-4
              w-full
            "
          >
            <div class="w-full flex items-center justify-end">
              <div
                class="
                  flex
                  items-center
                  px-3.5
                  py-0.5
                  border border-fatou-blue
                  rounded-full
                "
              >
                <span class="text-fatou-blue text-xs">I'm Hiring</span>
              </div>
            </div>
            <img src="/images/png/img@savannah.png" class="rounded-full w-2/2 py-2" alt="" />
            <div class="text-center">
              <h2 class="text-fatou-black text-xl font-medium ">Savannah Nguyen</h2>
              <span class="text-sm text-fatou-black font-medium"
                >Founder & CEO at Vena</span
              >
            </div>
            <div class="text-center py-5">
              <p class="text-md text-fatou-blue">Funding Stage</p>
              <p class="text-md text-fatou-black mt-2">Series C</p>
            </div>
            <div class="text-center">
              <span class="text-fatou-black  text-sm">www.venno.com</span>
              <div class="flex items-center space-x-3 py-2">
                <img
                  src="/images/svg/instagram-dark.svg"
                  alt="instagram"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/twitter-dark.svg"
                  alt="twitter"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/linkedin.svg"
                  alt="linkedin"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/crunchbase.svg"
                  alt="crunchbase"
                  class="h-7 w-7"
                />
              </div>
            </div>
          </div>

          </button> -->

          <!--  -->
          <!-- <button>
                      <div
            class="
              bg-white
              
              text-fatou-gray-600
              rounded-xl
              flex flex-col
              items-center
              space-y-2
              p-4
              w-full
            "
          >
            <div class="w-full flex items-center justify-end">
              <div
                class="
                  flex
                  items-center
                  px-3.5
                  py-0.5
                  border border-fatou-blue
                  rounded-full
                "
              >
                <span class="text-fatou-blue text-xs">I'm Hiring</span>
              </div>
            </div>
            <img src="/images/png/img@savannah.png" class="rounded-full w-2/2 py-2" alt="" />
            <div class="text-center">
              <h2 class="text-fatou-black text-xl font-medium ">Savannah Nguyen</h2>
              <span class="text-sm text-fatou-black font-medium"
                >Founder & CEO at Vena</span
              >
            </div>
            <div class="text-center py-5">
              <p class="text-md text-fatou-blue">Funding Stage</p>
              <p class="text-md text-fatou-black mt-2">Series C</p>
            </div>
            <div class="text-center">
              <span class="text-fatou-black  text-sm">www.venno.com</span>
              <div class="flex items-center space-x-3 py-2">
                <img
                  src="/images/svg/instagram-dark.svg"
                  alt="instagram"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/twitter-dark.svg"
                  alt="twitter"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/linkedin.svg"
                  alt="linkedin"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/crunchbase.svg"
                  alt="crunchbase"
                  class="h-7 w-7"
                />
              </div>
            </div>
          </div>
          </button> -->

          <!--  -->

          <!--  -->

          <!-- <button>
                      <div
            class="
              bg-white
              
              text-fatou-gray-600
              rounded-xl
              flex flex-col
              items-center
              space-y-2
              p-4
              w-full
            "
          >
            <div class="w-full flex items-center justify-end">
              <div
                class="
                  flex
                  items-center
                  px-3.5
                  py-0.5
                  border border-fatou-blue
                  rounded-full
                "
              >
                <span class="text-fatou-blue text-xs">I'm Hiring</span>
              </div>
            </div>
            <img src="/images/png/img@savannah.png" class="rounded-full w-2/2 py-2" alt="" />
            <div class="text-center">
              <h2 class="text-fatou-black text-xl font-medium ">Savannah Nguyen</h2>
              <span class="text-sm text-fatou-black font-medium"
                >Founder & CEO at Vena</span
              >
            </div>
            <div class="text-center py-5">
              <p class="text-md text-fatou-blue">Funding Stage</p>
              <p class="text-md text-fatou-black mt-2">Series C</p>
            </div>
            <div class="text-center">
              <span class="text-fatou-black  text-sm">www.venno.com</span>
              <div class="flex items-center space-x-3 py-2">
                <img
                  src="/images/svg/instagram-dark.svg"
                  alt="instagram"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/twitter-dark.svg"
                  alt="twitter"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/linkedin.svg"
                  alt="linkedin"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/crunchbase.svg"
                  alt="crunchbase"
                  class="h-7 w-7"
                />
              </div>
            </div>
          </div>
          </button> -->

          <!--  -->
          <!-- <button>
                      <div
            class="
              bg-white
              
              text-fatou-gray-600
              rounded-xl
              flex flex-col
              items-center
              space-y-2
              p-4
              w-full
            "
          >
            <div class="w-full flex items-center justify-end">
              <div
                class="
                  flex
                  items-center
                  px-3.5
                  py-0.5
                  border border-fatou-blue
                  rounded-full
                "
              >
                <span class="text-fatou-blue text-xs">I'm Hiring</span>
              </div>
            </div>
            <img src="/images/png/img@savannah.png" class="rounded-full w-2/2 py-2" alt="" />
            <div class="text-center">
              <h2 class="text-fatou-black text-xl font-medium ">Savannah Nguyen</h2>
              <span class="text-sm text-fatou-black font-medium"
                >Founder & CEO at Vena</span
              >
            </div>
            <div class="text-center py-5">
              <p class="text-md text-fatou-blue">Funding Stage</p>
              <p class="text-md text-fatou-black mt-2">Series C</p>
            </div>
            <div class="text-center">
              <span class="text-fatou-black  text-sm">www.venno.com</span>
              <div class="flex items-center space-x-3 py-2">
                <img
                  src="/images/svg/instagram-dark.svg"
                  alt="instagram"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/twitter-dark.svg"
                  alt="twitter"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/linkedin.svg"
                  alt="linkedin"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/crunchbase.svg"
                  alt="crunchbase"
                  class="h-7 w-7"
                />
              </div>
            </div>
          </div>
          </button> -->

          <!--  -->

          <!-- <button>
                    <div
            class="
              bg-white
              
              text-fatou-gray-600
              rounded-xl
              flex flex-col
              items-center
              space-y-2
              p-4
              w-full
            "
          >
            <div class="w-full flex items-center justify-end">
              <div
                class="
                  flex
                  items-center
                  px-3.5
                  py-0.5
                  border border-fatou-blue
                  rounded-full
                "
              >
                <span class="text-fatou-blue text-xs">I'm Hiring</span>
              </div>
            </div>
            <img src="/images/png/img@savannah.png" class="rounded-full w-2/2 py-2" alt="" />
            <div class="text-center">
              <h2 class="text-fatou-black text-xl font-medium ">Savannah Nguyen</h2>
              <span class="text-sm text-fatou-black font-medium"
                >Founder & CEO at Vena</span
              >
            </div>
            <div class="text-center py-5">
              <p class="text-md text-fatou-blue">Funding Stage</p>
              <p class="text-md text-fatou-black mt-2">Series C</p>
            </div>
            <div class="text-center">
              <span class="text-fatou-black  text-sm">www.venno.com</span>
              <div class="flex items-center space-x-3 py-2">
                <img
                  src="/images/svg/instagram-dark.svg"
                  alt="instagram"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/twitter-dark.svg"
                  alt="twitter"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/linkedin.svg"
                  alt="linkedin"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/crunchbase.svg"
                  alt="crunchbase"
                  class="h-7 w-7"
                />
              </div>
            </div>
          </div>
        </button> -->

          <!--  -->
          <!-- <button>
                      <div
            class="
              bg-white
              
              text-fatou-gray-600
              rounded-xl
              flex flex-col
              items-center
              space-y-2
              p-4
              w-full
            "
          >
            <div class="w-full flex items-center justify-end">
              <div
                class="
                  flex
                  items-center
                  px-3.5
                  py-0.5
                  border border-fatou-blue
                  rounded-full
                "
              >
                <span class="text-fatou-blue text-xs">I'm Hiring</span>
              </div>
            </div>
            <img src="/images/png/img@savannah.png" class="rounded-full w-2/2 py-2" alt="" />
            <div class="text-center">
              <h2 class="text-fatou-black text-xl font-medium ">Savannah Nguyen</h2>
              <span class="text-sm text-fatou-black font-medium"
                >Founder & CEO at Vena</span
              >
            </div>
            <div class="text-center py-5">
              <p class="text-md text-fatou-blue">Funding Stage</p>
              <p class="text-md text-fatou-black mt-2">Series C</p>
            </div>
            <div class="text-center">
              <span class="text-fatou-black  text-sm">www.venno.com</span>
              <div class="flex items-center space-x-3 py-2">
                <img
                  src="/images/svg/instagram-dark.svg"
                  alt="instagram"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/twitter-dark.svg"
                  alt="twitter"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/linkedin.svg"
                  alt="linkedin"
                  class="h-7 w-7"
                />
                <img
                  src="/images/svg/crunchbase.svg"
                  alt="crunchbase"
                  class="h-7 w-7"
                />
              </div>
            </div>
          </div>
          </button> -->
          <!--  -->
        </div>
      </div>

      <div class="btn-group" style="float: right">
        <svg v-if="paginationLoading" role="status"
          class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101"
          fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor" />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill" />
        </svg>
        <button v-for="(currPage, index) in pagination" :class="{ btn: true, 'btn-active': currPage === page }"
          @click="onPageChange(currPage)">
          {{ currPage }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("../assets/css/switch.css");
</style>
