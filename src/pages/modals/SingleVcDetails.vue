<script>
export default {
  emits: ["close_Single_Vc"],
  props: {
    vcsData: {
      type: Object,
      required: true
    },
  },
  data(){
    return {
      imageStorageUrl: import.meta.env.VITE_APP_SERVER_STORAGE_URL,
    }
  }
};
</script>

<template>
  <div class="lg:mt-20 fixed z-10 inset-0 overflow-y-auto">
    <div class="fixed inset-0 transition-opacity" aria-hidden="true">
      <div class="absolute inset-0 bg-opacity-modal opacity-75"></div>
    </div>
    <div
      class="
        pb-1
        px-5
        max-w-4xl
        mx-auto
        space-y-8
        relative
        justify-center
        text-center
        flex
        align-bottom
        bg-white
        rounded-lg
             overflow-hidden
        shadow-xl
        transform
        transition-all
        sm:my-8
        sm:align-middle
        sm:max-w-4xl
        sm:w-full
        z-[1999px]
      "
    >
      <!--  -->
      <div class="absolute right-5 top-4">
        <button
          v-on:click="$emit('close_Single_Vc')"
          class="bg-fatou-gray-700 focus:outline-none rounded-full p-1 z-50"
        >
          <img src="/images/svg/timesicon.svg" alt="close" />
        </button>
      </div>
      <!--  -->

      <!-- grid -->
      <div class="space-y-4">
                        <!--  -->
                 <div class="bg-white mt-4 flex sm:block flex-col items justify-between py-3.5 px-3.5 rounded-xl text-fatou-gray-600 cursor-pointer relative">
                             <!-- <div class="absolute right-1 top-2 flex items-center px-6 py-0.5 border border-fatou-blue rounded-full">
                                    <span class="text-fatou-blue text-xs">VCs</span>
                                </div> -->
                                <div class="flex space-x-2">
                                    <img :src="imageStorageUrl + '/vc/' + vcsData.logo" class="sm:h-36 sm:w-36 h-32 w-32 rounded-xl mx-auto" alt="vc">
                                    <div class="sm:hidden block">
                                         <h3 class="text-fatou-black fs-35 font-semibold truncate">{{vcsData.name}}</h3>
                                    <p class="text-fatou-black">
                                        {{vcsData.description.substring(0, 30)}} 
                                    </p>
                                    </div>
                                </div>
                            <div class="flex-grow ml-4 flex flex-col items-center justify-between py-2">
                                <h3 class="text-fatou-black text-xl my-4 hidden sm:block fs-30 font-semibold ">{{vcsData.name}}</h3>
                                <!-- <p class="hidden sm:block truncate text-fatou-black " >
                                    {{vcsData.description.substring(0, 60)}}  
                                </p> -->
                            <div class="flex items-center space-x-5">
                                <div class="flex items-center space-x-1.5">
                                    <span>
                                        <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.5584 1.27641C13.6493 0.895078 12.7395 0.75 11.8301 0.75C8.94328 0.749766 6.05672 2.21109 3.16992 2.21109C2.44594 2.21109 1.72242 2.11922 0.998437 1.88953C0.917109 1.86375 0.835547 1.85156 0.755859 1.85156C0.3525 1.85156 0 2.16375 0 2.59711V10.0329C0 10.3289 0.169453 10.6095 0.441563 10.7234C1.3507 11.1049 2.26055 11.25 3.16992 11.25C6.05672 11.25 8.94352 9.78867 11.8303 9.78867C12.5543 9.78867 13.2778 9.88055 14.0018 10.1102C14.0831 10.136 14.1647 10.1482 14.2444 10.1482C14.6477 10.1482 15.0002 9.83602 15.0002 9.40266V1.96711C15 1.67086 14.8305 1.39055 14.5584 1.27641ZM7.5 8.25C6.4643 8.25 5.625 7.24242 5.625 6C5.625 4.75734 6.46453 3.75 7.5 3.75C8.53547 3.75 9.375 4.75734 9.375 6C9.375 7.24289 8.53523 8.25 7.5 8.25Z" fill="#b0b6bf"/>
                                        </svg>
                                    </span>
                                    <span class="text-gray-400 text-sm">{{vcsData.averageCheckSize}}</span>
                                </div>
                                <!--  -->
                                <div class="flex items-center space-x-1.5">
                                    <span>
                                        <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_396_5040)">
                                            <path d="M13.125 6.75C13.125 11.125 7.5 14.875 7.5 14.875C7.5 14.875 1.875 11.125 1.875 6.75C1.875 5.25816 2.46763 3.82742 3.52252 2.77252C4.57742 1.71763 6.00816 1.125 7.5 1.125C8.99184 1.125 10.4226 1.71763 11.4775 2.77252C12.5324 3.82742 13.125 5.25816 13.125 6.75Z" stroke="#b0b6bf" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M7.5 8.625C8.53553 8.625 9.375 7.78553 9.375 6.75C9.375 5.71447 8.53553 4.875 7.5 4.875C6.46447 4.875 5.625 5.71447 5.625 6.75C5.625 7.78553 6.46447 8.625 7.5 8.625Z" stroke="#b0b6bf" stroke-linecap="round" stroke-linejoin="round"/>
                                            </g>
                                            <defs>
                                            <clipPath id="clip0_396_5040">
                                            <rect width="15" height="15" fill="white" transform="translate(0 0.5)"/>
                                            </clipPath>
                                            </defs>
                                            </svg>
                                    </span>
                                    <span class="text-gray-400 text-sm">{{vcsData.location}}</span>
                                </div>
                                <!--  -->
                                <div class="flex items-center space-x-1.5">
                                    <span>
                                       <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.875 12.625L5.5 9.5L1.125 12.625V2.625C1.125 2.29348 1.2567 1.97554 1.49112 1.74112C1.72554 1.5067 2.04348 1.375 2.375 1.375H8.625C8.95652 1.375 9.27446 1.5067 9.50888 1.74112C9.7433 1.97554 9.875 2.29348 9.875 2.625V12.625Z" stroke="#b0b6bf" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </span>
                                    <span class="text-gray-400 text-sm" >{{vcsData.category}}</span>
                                </div>
                                <!--  -->
                            </div>
                        </div>
                        <!--  -->
                    </div>
                    <!-- about  -->
                    <div class="bg-white w-full py-8 px-10  rounded-xl space-y-6">
                            <div class="w-full space-y-3">
                                <h2 class="text-fatou-black text-1xl font-medium">About VC</h2>
                                <div class="text-fatou-black-150 w-full text-sm ">
                                   <p class="text-wrap">
                                      {{vcsData.description}}
                                   </p>
                                </div>
                            </div>
                            <!-- v-href="vcsData.social.twitter" -->
                            <div class="space-y-4r">
                                <h5 class="text-fatou-black text-1xl font-medium">Links</h5>
                                <div class="flex items-center space-x-1.5 justify-center mt-3 mb-3">
                                    <a  target="_blank">
                                      <img
                                      src="/images/svg/instagram-dark.svg"
                                      alt="instagram"
                                      class="h-8 w-8"
                                    />
                                    </a>
                                      <a  target="_blank">
                                        <img src="/images/svg/twitter-dark.svg" alt="twitter" class="h-8 w-8">
                                      </a>
                                      
                                        <a  target="_blank">
                                        <img src="/images/svg/linkedin.svg" alt="twitter" class="h-8 w-8">
                                      </a>
                                </div>
                                <div v-if="vcsData.website != null">
                                    <span class="text-[#077685] cursor-pointer">{{vcsData.website}}</span>
                                </div>
                            </div>
                    </div>
                    </div>


      <!--  -->
    </div>
  </div>
</template>
<style scoped>
@import url("/src/assets/css/modal.css");
</style>
