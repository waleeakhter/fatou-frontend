
<script>
export default {
  emits: ['close'],
  props: {
    founder: Object,
  },
  data() {
    return {
      imageStorageUrl: import.meta.env.VITE_APP_SERVER_STORAGE_URL,
    };
  },
  created(){
    console.log(this.founder)
  },
  methods: {
    getTeam() {
      if (this.founder.company.team && this.founder.company.team.length) {
        return this.founder.company.team.map(team => team.name).join();
      } else if (this.founder.company.additionalFounder) {
        return this.founder.company.additionalFounder;
      } else {
        return this.founder.claimedBy.firstName + ' ' + this.founder.claimedBy.lastName;
      }
    },
  },
};
</script>

<template>
  <!-- -->
  <div id="modal" class="fixed z-10 inset-0 overflow-y-auto">
    <div
      class="
        flex
        items-end
        justify-center
        min-h-screen
        pt-4
        px-4
        pb-20
        text-center
        sm:block sm:p-0
      "
    >
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-opacity-modal opacity-75"></div>
      </div>
      <!--  -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="
          relative
          inline-block
          align-bottom
          bg-white
          rounded-lg
          text-left
          overflow-hidden
          shadow-xl
          transform
          transition-all
          sm:my-8 sm:align-middle sm:w-[40rem]
          max-w-4xl
          z-[1999px]
        "
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
        <div class="bg-white mx-auto py-10 pb-20 border-b px-16">
          <div>
            <strong class="text-fatou-blue" v-if="founder.company.hiring"
              >We're hiring</strong
            >
          </div>
          <div class="flex flex-col items-center mt-3">
            <img
              :src="imageStorageUrl + '/company/' + founder.company.logo"
              class="h-20 w-20"
              :alt="founder.company.name"
            />
            <p class="font-bold mt-2">{{ founder.company.name }}</p>
            <div class="flex items-center space-x-1.5">
              <img
                v-if="founder.company.social.instagram"
                src="/images/svg/instagram-dark.svg"
                alt="instagram"
                class="h-4"
              />
              <img
                v-if="founder.company.social.twitter"
                src="/images/svg/twitter-dark.svg"
                alt="twitter"
                class="h-4"
              />
              <img
                v-if="founder.company.social.linkedIn"
                src="/images/svg/linkedin.svg"
                alt="linkedin"
                class="h-4"
              />
            </div>
            <a
              :href="founder.company.website"
              target="_blank"
              class="text-fatou-gray-900 text-sm"
              >{{ founder.company.website }}</a
            >
          </div>
          <div class="flex justify-between mt-6">
            <div class="flex flex-col items-center font-bold gap-y-4 text-sm">
              Year
              <span
                class="
                  w-ful
                  border-2 border-fatou-blue
                  rounded-2xl
                  text-fatou-blue
                  px-5
                  text-sm
                "
              >
                {{ founder.company.founded.split('-')[0] }}
              </span>
            </div>
            <div class="flex flex-col items-center font-bold gap-y-4 text-sm">
              HQ
              <span
                class="
                  w-ful
                  border-2 border-fatou-blue
                  rounded-2xl
                  text-fatou-blue
                  px-5
                  text-sm
                "
              >
                New York
              </span>
            </div>
            <div class="flex flex-col items-center font-bold gap-y-4 text-sm">
              Funding Stage
              <span
                class="
                  w-ful
                  border-2 border-fatou-blue
                  rounded-2xl
                  text-fatou-blue
                  px-5
                  text-sm
                "
              >
                {{ founder.company.foundingRound }}
              </span>
            </div>
            <div class="flex flex-col items-center font-bold gap-y-4 text-sm">
              Category
              <span
                class="
                  w-ful
                  border-2 border-fatou-blue
                  rounded-2xl
                  text-fatou-blue
                  px-5
                  text-sm
                "
              >
                Internet
              </span>
            </div>
          </div>
          <div class="flex flex-col items-center mt-6">
            <p class="font-bold mt-2">Founding Team</p>
            <p class="text-sm">
              {{ getTeam() }}
            </p>
          </div>
          <div class="flex flex-col items-center mt-6">
            <p class="font-bold mt-2">About Us</p>
            <p class="text-center mx-8 text-xs">
              {{ founder.company.bio }}
            </p>
          </div>
          <div class="flex flex-col items-center mt-6">
            <p class="font-bold mt-2">Media Spotlight</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('/src/assets/css/modal.css');
</style>
