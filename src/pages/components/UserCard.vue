<script>
import ViewProfileModal from "../dashboard/modals/ViewProfile.vue";
import userService from "../../services/users.service";
import { mapActions } from "vuex";


export default {
  components: {
    ViewProfileModal,
  },
  data() {
    return {
      connectionSent: false,
      isConnecting: false,
      viewUserModal: false,
      imageStorageUrl: import.meta.env.VITE_APP_SERVER_STORAGE_URL,
      requestCallLoading: false,
      connectionRequestStatus: this.user.connectionRequest?.status ?? null,
      connectionRequestType: this.getConnectionRequestType(),
    };
  },
  props: ["user", "forRecruiter", "actionType"],
  computed: {},
  methods: {
    ...mapActions(["setActiveChatUser"]),
    buildReasons(reasons) {
      let reasonsText = "";
      const MAX_REASON_COUNT = 3;

      if (reasons[0]) {
        for (let i = 0; i < reasons.length; i++) {
          const reason = reasons[i];

          if (i >= MAX_REASON_COUNT) {
            break;
          } else {
            const s_ = reason.replace("-", " ");
            reasonsText += s_[0].toUpperCase() + s_.slice(1);
          }

          // Remove final ", " for the last reason
          if (i + 1 < reasons.length && i + 1 != MAX_REASON_COUNT) {
            reasonsText = reasonsText.slice(0, reasonsText.length - 2);
          }
          // Add elipses for final reason when there's more
          else if (reasons.length > MAX_REASON_COUNT) {
            reasonsText += "...";
          }
        }

        return reasonsText;
      } else {
        return "";
      }
    },
    addConnectionRequest(user) {
      const data = {
        from: this.$store.state.auth.currentUser._id,
        to: user._id,
        status: "pending",
      };
      this.requestCallLoading = true;
      userService
        .addConnectionRequest(data)
        .then(({ data }) => {
          this.requestCallLoading = false;
          this.connectionRequestStatus = "pending";
          this.connectionRequestType = "sent";
        })
        .catch((err) => {
          this.requestCallLoading = false;
          console.log(err);
        });
    },
    removeConnectionRequest(user) {
      let data = {
        to: this.$store.state.auth.currentUser._id,
        from: user._id,
      };
      if (this.connectionRequestType === "sent") {
        data = {
          from: this.$store.state.auth.currentUser._id,
          to: user._id,
        };
      }
      userService
        .removeConnectionRequest(data)
        .then(({ data }) => {
          this.requestCallLoading = false;
          this.connectionRequestStatus = null;
          this.connectionRequestType = null;
        })
        .catch((err) => {
          this.requestCallLoading = false;
          console.log(err);
        });
    },
    acceptConnectionRequest(user) {
      userService
        .acceptConnection(user.connectionRequest._id, { status: "accepted" })
        .then(({ data }) => {
          this.requestCallLoading = false;
          this.connectionRequestStatus = "accepted";
        })
        .catch((err) => {
          this.requestCallLoading = false;
          console.log(err);
        });
    },
    async selectUserForChat() {
      try {
        
        await this.setActiveChatUser(this.user);
      } catch (error) {
       this.$notify({ type: "warning", title: 'Opps!', text: 'Cannot Chat hide mode is enabled'});
      }
    },
    getConnectionRequestType() {
      if (
        this.user.connectionRequest !== null &&
        this.user.connectionRequest !== undefined
      ) {
        console.log("connectionRequest", this.user.connectionRequest);
        if (
          this.user.connectionRequest.from._id ===
          this.$store.state.auth.currentUser._id
        ) {
          return "sent";
        } else {
          return "received";
        }
      }

      return null;
    },
  },
  mounted() {},
};
</script>

<template>
  <ViewProfileModal
    v-if="viewUserModal"
    v-on:close="viewUserModal = !viewUserModal"
    :user="user"
    :isConnecting="isConnecting"
    :connectionSent="connectionSent"
    @addConnectionRequest="addConnectionRequest"
    @removeConnectionRequest="removeConnectionRequest"
    @acceptConnectionRequest="acceptConnectionRequest"
    :forRecruiter = 'forRecruiter'
    :actionType= "actionType"
    
    :connectionRequestStatus="connectionRequestStatus"
    :connectionRequestType="connectionRequestType"
    :requestCallLoading="requestCallLoading"
  />
 <!-- <pre> {{user}}</pre> -->
  <div class="relative  p-6 space-y-3 text-center bg-white border border-fatou-black-50 text-fatou-gray-600 rounded-xl">
    <div class=" text-center">
      <div class="w-full flex items-center justify-end absolute top-2.5 right-2">
        <!-- <button @click="viewUserResumeModal = !viewUserResumeModal" v-if="false" class="flex items-center px-3.5 py-0.5 border border-fatou-blue rounded-full">
          <span class="text-xs text-fatou-blue">View Resume</span>
        </button> -->
      </div>
    
      <country-flag country="us" size="big" />

      <div class="absolute left-[20px] top-[20px] !mt-0 group tooltip tooltip-primary" :data-tip="`Based in ${user.address.country}`">
        <img width="30" height="20" 
        :src="`https://countryflagsapi.com/svg/${user.address.country }`" 
        class=" rounded transition-all ease-in-out opacity-100 duration-300 object-cover w-[30px] h-[20px]"   />
  
      </div>
     

        
        <span style="height:26px"  data-tip="Verified Recruiter" class="  tooltip tooltip-primary absolute right-[20px] top-[20px] flex-[0_auto] text-sm text-fatou-black"  v-if="user.isRecruiter" ><svg xmlns="http://www.w3.org/2000/svg" height="40p" viewBox="0 0 512 512" width="40"><path d="m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z" fill="#1da1f2"/></svg></span>
     
     <img
        @click="viewUserModal = true"
        :src=" user.avatar ? this.imageStorageUrl+'/'+user.avatar : '/images/placeholder.jpg'"
        class=" box-content object-cover rounded-full cursor-pointer h-20 w-20 mx-auto my-4"
        :alt="`Profile Picture of ${user.firstName} ${user.lastName}`"
      />
      <div>
        <h2 class="flex items-center justify-center   text-fatou-black">
         <span class=" truncate flex-[0_1_auto] max-w-[60%]  font-medium text-sm"> {{ user.firstName }} {{ user.lastName }} </span>
         <small class="text-sm font-medium">{{ user.pronouns? '('+user.pronouns +')':'' }}</small>&nbsp;
         <a class="flex-[0_auto]" v-if="user.linkedInUrl" :href="user.linkedInUrl" target="_blank"><img src="/images/svg/linkedin.svg" alt="linkedin" class="w-4 h-4"  /></a>
         
         
        </h2>
        <p class="px-10 mt-1 text-sm font-medium text-fatou-black">
          <!-- {{ user.jobTitle || 'Works' }} @ {{ user.company }} -->
        </p>
         
      </div>
      <p class="flex items-center justify-center space-x-1 text-sm text-fatou-black-150">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <div class="max-w-[200px] text-[#9ca3af]">
          {{ user.address.state }}
        </div>
      </p>
  
      <div class=" text-sm text-fatou-black  mt-2">
        <span class="font-medium text-sm">
          Seeking
        </span>
        <div class="flex items-center space-x-1 px-3.5 py-1  justify-center  text-fatou-blue text-[0.675rem] flex-wrap gap-[4px_0px] whitespace-nowrap ">
          <span v-for="(reason,i) in user.reasonForJoining" class="block snap-center  flex justify-center items-center  text-xs capitalize ">
          {{reason}}  {{ user.reasonForJoining.length > 1 && (i + 1) !== user.reasonForJoining.length   ? '|' : "" }}
          </span>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center  w-full space-x-2">
  
      <button v-if="connectionRequestStatus===null && connectionRequestType===null"  :disabled="requestCallLoading"  @click="addConnectionRequest(user)"  class="focus:outline-0 h-8 w-24 bg-transparent  text-fatou-blue py-1.5 px-2 rounded-full font-medium border-2 border-fatou-blue flex items-center justify-center space-x-1">
        <span v-if="!requestCallLoading">
          <svg class="plus" width="18" height="18" viewBox="0 0 28 28" fill="red" xmlns="http://www.w3.org/2000/svg"> <path d="M14 5.83325V22.1666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.83301 14H22.1663" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </span>
        <div v-else class="w-5 h-5 ease-linear border-2 border-t-2 border-gray-100 rounded-full loader"></div>
        <span class="text-xs">Add</span>

      </button>
 
      <template v-if="connectionRequestStatus==='pending'">
        
        <template v-if="connectionRequestType==='received'">
              <button  :disabled="requestCallLoading"  @click="acceptConnectionRequest(user)"  class="focus:outline-0 h-8 w-24 bg-transparent  text-fatou-blue py-1.5 px-2 rounded-full font-medium border-2 border-fatou-blue flex items-center justify-center space-x-1">
                <span v-if="!requestCallLoading">
                  <svg class="plus" width="18" height="18" viewBox="0 0 28 28" fill="red" xmlns="http://www.w3.org/2000/svg"> <path d="M14 5.83325V22.1666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.83301 14H22.1663" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
                </span>
                <div v-else class="w-5 h-5 ease-linear border-2 border-t-2 border-gray-100 rounded-full loader"></div>
                <span class="text-xs">Approve</span>
              </button>
        </template>

        <button  :disabled="requestCallLoading"  @click="removeConnectionRequest(user)"  class="focus:outline-0 h-8 w-24 bg-transparent  text-fatou-blue py-1.5 px-2 rounded-full font-medium border-2 border-fatou-blue flex items-center justify-center space-x-1">
          <span v-if="!requestCallLoading">
            <svg class="plus" width="18" height="18" viewBox="0 0 28 28" fill="red" xmlns="http://www.w3.org/2000/svg"> <path d="M14 5.83325V22.1666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.83301 14H22.1663" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
          <div v-else class="w-5 h-5 ease-linear border-2 border-t-2 border-gray-100 rounded-full loader"></div>
          <span  v-if="connectionRequestType==='received'" class="text-sm">Decline</span>
          <span v-else class="text-xs">Withdraw</span>
        </button>
      </template>




     
      <button
        @click="selectUserForChat"
        class="focus:outline-0 h-8 w-24 bg-fatou-blue text-white py-1.5 px-2 rounded-full border-2 border-fatou-blue font-medium flex items-center justify-center space-x-2">
        <span>
          <svg class="chat" width="18" height="18" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.5 17.5C24.5 18.1188 24.2542 18.7123 23.8166 19.1499C23.379 19.5875 22.7855 19.8333 22.1667 19.8333H8.16667L3.5 24.5V5.83333C3.5 5.21449 3.74583 4.621 4.18342 4.18342C4.621 3.74583 5.21449 3.5 5.83333 3.5H22.1667C22.7855 3.5 23.379 3.74583 23.8166 4.18342C24.2542 4.621 24.5 5.21449 24.5 5.83333V17.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span class="text-xs"> Chat </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
button {
  @apply transform duration-200 ease-in-out active:scale-95 hover:bg-fatou-blue-100 hover:border-fatou-blue-100 hover:text-fatou-blue-700;
}

.plus > path,
.chat > path {
  stroke: currentColor;
}
</style>