<script setup>
import { computed, watch, ref, onMounted } from "vue";
import { useStore } from "vuex";

// components
import ButtonBlue from "../../components/buttons/ButtonBlue.vue";
import UpdateBasicInfo from "../dashboard/modals/UpdateBasicInfo.vue";
import UpdateMentorship from "../dashboard/modals/UpdateMentorship.vue";
import UpdateWorkOptions from "../dashboard/modals/UpdateWorkOptions.vue";
import UpdateExperience from "../dashboard/modals/UpdateExperience.vue";
import ViewProfileModal from '../dashboard/modals/ViewProfile.vue'

const store = useStore();

const updateBasicInfoModal = ref(false);
const viewUpdateMentorShip = ref(false);
const viewUpdateWorkOptionsShip = ref(false);
const viewUpdateExperience = ref(false);


let isUserInfoCompleted = ref(false);
let isUserWorkCompleted = ref(false);
let isUserMentorShipProfileCompleted = ref(false);
let isUserWorkOptionCompleted = ref(false);


// let isUserInfoCompleted = ref(false)
let progress = ref(0);

// let viewUserModal = ref(false);

const userData = computed(() => store.state.auth.currentUser);
const userExperienceData = computed(() => store.state.user.userExperiences);
const userMentorshipData = computed(
  () => store.state.user.userMentorShipOptions
);
const userWorkOptionsData = computed(
  () => store.state.user.userWorkOptions
);


const checkUserInfoProgress = () => {
  if (
    userData.value.firstName != null &&
    userData.value.lastName != null &&
    userData.value.pronouns != null 
    // userData.value.phone != null 
  ) {
    progress.value += 25;
    isUserInfoCompleted.value = true;
    return true;
  } else {
    isUserInfoCompleted.value = false;
    return false;
  }
};

const checkUserWorkExperience = () => {
  if (userExperienceData.value.length >= 1 && userData.value.skills.length >= 1) {
    progress.value += 25;
    isUserWorkCompleted.value = true;
    return true;
  } else {
    isUserWorkCompleted.value = false;
    return false;
  }
};

const checkMentorShipProgress = () => {
  if (
    (userMentorshipData.value.seeking != null || userMentorshipData.value.open != null) &&
    ((userMentorshipData.value.seeking.isSeek === "yes" ||
      userMentorshipData.value.seeking.opportunities.length >= 1) ||
      (userMentorshipData.value.open.isOpen === "yes" ||
        userMentorshipData.value.open.opportunities.length >= 1))
  ) {
    progress.value += 25;
    isUserMentorShipProfileCompleted.value = true;
    return true;
  } else {
    isUserMentorShipProfileCompleted.value = false;
    return false;
  }
};

const checkUserWorkOption = () => {

  if (userData?.value?.reasonForJoining?.includes('seeking-employment')) {

    if (userWorkOptionsData.value.looking != null ||
      userWorkOptionsData.value.openToWorkBanner != null ||
      userWorkOptionsData.value.openToWorkRemotely != null ||
      userWorkOptionsData.value.preferredLocation != null ||
      userWorkOptionsData.value.yearsOfExperience != null ||
      userWorkOptionsData.value.salaryRange != null
    ) {
      progress.value += 25;
      isUserWorkOptionCompleted.value = true;
      return true;
    } else {
      isUserWorkOptionCompleted.value = false;
      return false;
    }


  } else {
    progress.value += 25;
    isUserWorkOptionCompleted.value = true;
  }

};
const updatedProgress = () => {
  checkUserInfoProgress();
  checkUserWorkExperience();
  checkMentorShipProgress();
  checkUserWorkOption();
}
watch(userExperienceData, (newData, oldData) => {
  progress.value = 0;
  updatedProgress()
});

watch(userMentorshipData, (newData, oldData) => {
  progress.value = 0;
  updatedProgress()
})

watch(userWorkOptionsData, (newData, oldData) => {
  progress.value = 0;
  updatedProgress()
})

watch(userData, (newData, oldData) => {
  progress.value = 0;
  updatedProgress()
})


onMounted(() => {
  updatedProgress()
});
</script>
<template>
  <!-- <ViewProfileModal v-if="viewUserModal" v-on:close="viewUserModal = !viewUserModal" :user="userData" :isSelf="true" /> -->
  <UpdateBasicInfo v-if="updateBasicInfoModal" v-on:close="updateBasicInfoModal = !updateBasicInfoModal" />
  <UpdateMentorship v-if="viewUpdateMentorShip" v-on:close="viewUpdateMentorShip = !viewUpdateMentorShip" />
  <UpdateWorkOptions v-if="viewUpdateWorkOptionsShip"
    v-on:close="viewUpdateWorkOptionsShip = !viewUpdateWorkOptionsShip" />
  <UpdateExperience v-if="viewUpdateExperience" v-on:close="viewUpdateExperience = !viewUpdateExperience" />

  <div
    :class="[isUserInfoCompleted && isUserWorkCompleted && isUserMentorShipProfileCompleted && isUserWorkOptionCompleted ? 'hidden' : 'mb-6', 'bg-white mx-auto py-10 sm:px-8 px-4 rounded-xl space-y-6']">
    <div class="flex justify-between items-center">
      <h2 class="font-semibold text-fatou-black">Complete your signup</h2>
      <!-- <button @click="viewUserModal = true"
        class="p-3 rounded-full text-fatou-blue bg-fatou-blue-50 bg-opacity-50 active:scale-95 transform ease-in-out duration-200 hover:scale-105"
        title="See My Profile">
        <svg xmlns="http://www.w3.org/2000/svg" class="fill-current" viewBox="0 0 576 512" width="25" height="25">
          <path
            d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z" />
        </svg>
      </button> -->
    </div>

    <div class="space-y-2">
      <h6 class="mb-5 text-fatou-gray-600 text-md">Signup Progress</h6>

      <div class="flex items-center space-x-2 !mb-8">
        <!-- progress bar -->
        <div class="flex-grow">
          <div class="w-full h-6 rounded-full bg-fatou-gray-500">
            <div :class="[
              progress === 0 ? 'w-0' : progress === 25 ? 'w-1/4 ' : progress === 50 ? 'w-2/4' : progress === 75 ? 'w-3/4' : 'w-4/4',
              'h-full rounded-full bg-fatou-blue ',
            ]"></div>
          </div>
        </div>
        <!-- progress percent -->
        <h4 class="text-lg font-semibold text-fatou-black sm:text-xl">{{ progress + "%" }}</h4>
      </div>
      <div
        v-if="isUserInfoCompleted && isUserWorkCompleted && isUserWorkOptionCompleted && isUserMentorShipProfileCompleted"
        class="flex items-cente justify-center py-6">
        <div class="flex flex-col items-center">
          <span>
            <svg class="w-16 h-16" viewBox="0 0 61 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30.5" cy="30" r="30" fill="#D3F2F6" />
              <path d="M38.1406 24.3884L27.1406 35.3884L22.1406 30.3884" stroke="#21BCD1" stroke-width="9"
                stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span>Signup Completed</span>
        </div>
      </div>
      <div v-else class="grid grid-cols-1 gap-6 mt-10 lg:grid-cols-4 sm:grid-cols-2">
        <!--  -->
        <div
          class="flex flex-col items-center justify-between h-56 p-2-1 space-y-3 border rounded-xl border-fatou-black-50">
          <div class="p-6 rounded-full bg-fatou-light-200">
            <span v-if="!isUserInfoCompleted">
              <svg width="25" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.6522 12.4192C14.029 12.4192 16.7663 9.68179 16.7663 6.30505C16.7663 2.92831 14.029 0.190918 10.6522 0.190918C7.27548 0.190918 4.53809 2.92831 4.53809 6.30505C4.53809 9.68179 7.27548 12.4192 10.6522 12.4192Z"
                  fill="#21BCD1" />
                <path
                  d="M13.7092 14.386H7.59507C5.70324 14.386 3.88889 15.1375 2.55117 16.4752C1.21344 17.813 0.461914 19.6273 0.461914 21.5191C0.461914 22.3299 0.783997 23.1075 1.35731 23.6808C1.93062 24.2541 2.7082 24.5762 3.51898 24.5762H17.7853C18.5961 24.5762 19.3736 24.2541 19.947 23.6808C20.5203 23.1075 20.8423 22.3299 20.8424 21.5191C20.8424 19.6273 20.0908 17.813 18.7531 16.4752C17.4154 15.1375 15.601 14.386 13.7092 14.386Z"
                  fill="#21BCD1" />
              </svg>
            </span>
            <span v-else>
              <svg width="25" height="25" viewBox="0 0 61 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30.5" cy="30" r="30" fill="#D3F2F6" />
                <path d="M38.1406 24.3884L27.1406 35.3884L22.1406 30.3884" stroke="#21BCD1" stroke-width="9"
                  stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </div>
          <p class="mb-0 c-text text-center text-fatou-black">Update Basic Info</p>

          <ButtonBlue :disabled="isUserInfoCompleted" @click="updateBasicInfoModal = !updateBasicInfoModal"
            :btnText="isUserInfoCompleted ? 'Updated' : 'Update'" />
        </div>
        <!--  -->
        <div
          class="flex-col items-center justify-between hidden p-6 space-y-3 border rounded-xl border-fatou-black-50 md:flex">
          <div class="p-6 rounded-full bg-fatou-light-200">
            <span v-if="!isUserWorkCompleted">
              <svg width="25" height="25" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M10.4272 0.0933804C9.29443 0.417396 8.36909 1.33615 8.00988 2.49354C7.8517 3.00318 7.8517 3.9576 8.00988 4.46724C8.30457 5.41678 9.00152 6.23586 9.86652 6.64921C10.2212 6.81867 10.6921 6.95786 10.9109 6.95786C11.1465 6.95786 10.9888 7.01623 10.5736 7.08272C8.68785 7.3847 7.13605 8.80379 6.6211 10.6971L6.49422 11.1637L6.4781 13.3136L6.46198 15.4636H11.3989H16.3357V13.676C16.3357 11.8779 16.2961 11.1945 16.1642 10.7173C15.7553 9.23753 14.8343 8.1324 13.4617 7.47469C13.0794 7.29156 12.2649 7.05255 12.0181 7.05114C11.9503 7.05072 11.8632 7.0299 11.8244 7.00485C11.7708 6.97022 11.7899 6.95913 11.9042 6.95857C11.9868 6.95819 12.2195 6.90509 12.4211 6.84061C13.4017 6.52708 14.1824 5.83539 14.6032 4.90742C14.8089 4.45389 14.8932 4.0389 14.8932 3.48039C14.8932 3.18443 14.8625 2.86041 14.8165 2.6707C14.5211 1.45317 13.59 0.474821 12.3716 0.101604C11.9414 -0.0301638 10.8749 -0.0346751 10.4272 0.0933804ZM3.67112 17.3433C3.31003 18.067 3.00185 18.6591 2.98625 18.6591C2.9707 18.6591 2.29555 18.7542 1.48596 18.8705C0.676365 18.9869 0.00770328 19.082 9.04405e-05 19.082C-0.0075224 19.082 0.466448 19.5416 1.05329 20.1032C1.6626 20.6863 2.12638 21.1665 2.13441 21.2225C2.14212 21.2765 2.04169 21.9042 1.9112 22.6174C1.7807 23.3305 1.67393 23.9359 1.67393 23.9625C1.67393 23.9891 2.27356 23.7188 3.00646 23.3617L4.33903 22.7124L5.6733 23.3591C6.40719 23.7148 7.01109 24.0029 7.01537 23.9993C7.01965 23.9957 6.90898 23.3689 6.76946 22.6065C6.62994 21.844 6.51546 21.2074 6.51499 21.1917C6.51457 21.1761 6.81889 20.8746 7.19131 20.5218L7.86843 19.8802L8.51886 20.5015C8.87892 20.8455 9.17554 21.167 9.18334 21.2218C9.19105 21.2762 9.09062 21.9042 8.96012 22.6174C8.82962 23.3305 8.72286 23.9359 8.72286 23.9625C8.72286 23.9891 9.32248 23.7188 10.0554 23.3617L11.388 22.7124L12.7222 23.3591C13.4561 23.7148 14.06 24.0029 14.0643 23.9993C14.0686 23.9957 13.9579 23.3689 13.8184 22.6065C13.6789 21.844 13.5644 21.2074 13.5639 21.1917C13.5635 21.1761 13.8678 20.8746 14.2402 20.5218L14.9174 19.8802L15.5678 20.5015C15.9278 20.8455 16.2245 21.167 16.2323 21.2218C16.24 21.2762 16.1395 21.9042 16.0091 22.6174C15.8786 23.3305 15.7718 23.9359 15.7718 23.9625C15.7718 23.9891 16.3716 23.7187 17.1046 23.3615L18.4374 22.7121L19.7714 23.3597C20.5051 23.7158 21.1086 24.004 21.1124 24C21.1162 23.996 21.0056 23.3689 20.8667 22.6065C20.7278 21.844 20.6137 21.2073 20.6131 21.1915C20.6125 21.1757 21.0985 20.7017 21.693 20.1382C22.2876 19.5747 22.7648 19.1044 22.7536 19.0932C22.7389 19.0786 19.8771 18.6613 19.7781 18.6593C19.7717 18.6592 19.4677 18.0618 19.1025 17.3319L18.4386 16.0046L17.7814 17.3201C17.4199 18.0436 17.1212 18.6391 17.1176 18.6433C17.0967 18.6681 15.0679 18.9409 14.9079 18.9405C14.8015 18.9402 14.2704 18.8768 13.7276 18.7995C13.1849 18.7223 12.7356 18.6591 12.7292 18.6591C12.7228 18.6591 12.4188 18.0618 12.0536 17.3319L11.3897 16.0046L10.7325 17.3201C10.3709 18.0436 10.0723 18.6391 10.0687 18.6433C10.0477 18.6681 8.01895 18.9409 7.85894 18.9405C7.75255 18.9402 7.22148 18.8768 6.67871 18.7995C6.13599 18.7223 5.6867 18.6591 5.6803 18.6591C5.67387 18.6591 5.37245 18.067 5.01042 17.3433C4.64839 16.6196 4.34669 16.0275 4.33993 16.0275C4.33321 16.0275 4.03222 16.6196 3.67112 17.3433Z"
                  fill="#21BCD1" />
              </svg>
            </span>
            <span v-else>
              <svg width="25" height="25" viewBox="0 0 61 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30.5" cy="30" r="30" fill="#D3F2F6" />
                <path d="M38.1406 24.3884L27.1406 35.3884L22.1406 30.3884" stroke="#21BCD1" stroke-width="9"
                  stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </div>
          <p class="c-text text-center text-fatou-black">Update My Experience</p>

          <ButtonBlue :disabled="isUserWorkCompleted" @click="viewUpdateExperience = !viewUpdateExperience"
            :btnText="isUserWorkCompleted ? 'Updated' : 'Update'" />
        </div>
        <!--  -->
        <div
          class="flex flex-col items-center justify-between h-56 p-2-1 space-y-3 border rounded-xl border-fatou-black-50">
          <div class="p-6 rounded-full bg-fatou-light-200">
            <span v-if="!isUserWorkOptionCompleted">
              <svg width="25" height="25" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M8.61278 0.0683982C8.09628 0.248543 7.7335 0.57169 7.50339 1.05658C7.37257 1.3322 7.3666 1.36918 7.34594 2.02937L7.32445 2.71563L4.63928 2.73708L1.9541 2.75852L1.66715 2.87004C1.04574 3.11157 0.539848 3.57398 0.256079 4.15984C0.0255832 4.6356 -0.00543602 4.89264 0.00865579 6.20796L0.0207713 7.34129L5.50927 9.16706L10.9978 10.9928L16.4863 9.16706L21.9748 7.34129L21.9872 6.20796C22.0014 4.90337 21.9724 4.66245 21.7425 4.17232C21.4654 3.5817 20.9586 3.115 20.3284 2.87004L20.0415 2.75852L17.3563 2.73708L14.6711 2.71563L14.6496 2.02696L14.6281 1.33829L14.4681 1.01515C14.2724 0.619986 13.9864 0.33986 13.5851 0.150064L13.2963 0.013454L11.0622 0.00337443C9.02857 -0.0058044 8.80882 2.88276e-05 8.61278 0.0683982ZM12.8237 2.26527V2.71563H10.9978H9.17186L9.1594 2.31138C9.15257 2.08903 9.15686 1.88135 9.16898 1.84982C9.18698 1.80303 9.52381 1.79458 11.0074 1.80371L12.8237 1.81491V2.26527ZM2.02564e-05 12.3939C0.000879513 16.4067 -0.0038464 16.3313 0.280868 16.8963C0.492203 17.3157 0.981635 17.8091 1.3741 17.9986C1.96338 18.283 1.27052 18.2639 10.9978 18.2639C20.725 18.2639 20.0322 18.283 20.6215 17.9986C21.0475 17.793 21.5206 17.3019 21.7355 16.8423C21.8277 16.6451 21.9241 16.3694 21.9497 16.2294C22.0212 15.8387 22.0144 8.76894 21.9426 8.79545C21.913 8.80634 19.5205 9.60336 16.6259 10.5667L11.363 12.3181H10.9978H10.6326L5.36964 10.5667C2.47502 9.60336 0.0825519 8.80634 0.0529934 8.79545C0.0102884 8.77971 -0.000538261 9.51706 2.02564e-05 12.3939Z"
                  fill="#21BCD1" />
              </svg>
            </span>
            <span v-else>
              <svg width="25" height="25" viewBox="0 0 61 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30.5" cy="30" r="30" fill="#D3F2F6" />
                <path d="M38.1406 24.3884L27.1406 35.3884L22.1406 30.3884" stroke="#21BCD1" stroke-width="9"
                  stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </div>
          <p class="c-text text-center text-fatou-black">Update work options</p>

          <ButtonBlue :disabled="isUserWorkOptionCompleted"
            @click="viewUpdateWorkOptionsShip = !viewUpdateWorkOptionsShip"
            :btnText="isUserWorkOptionCompleted ? 'Updated' : 'Update'" />
        </div>
        <!--  -->
        <div
          class="flex flex-col items-center justify-between h-56 p-2-1 space-y-3 border rounded-xl border-fatou-black-50">
          <div class="p-6 rounded-full bg-fatou-light-200">
            <span v-if="!isUserMentorShipProfileCompleted">
              <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 0L13.09 6.26L20 7.27L15 12.14L16.18 19.02L10 15.77L3.82 19.02L5 12.14L0 7.27L6.91 6.26L10 0Z"
                  fill="#21BCD1" />
              </svg>
            </span>
            <span v-else>
              <svg width="25" height="25" viewBox="0 0 61 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30.5" cy="30" r="30" fill="#D3F2F6" />
                <path d="M38.1406 24.3884L27.1406 35.3884L22.1406 30.3884" stroke="#21BCD1" stroke-width="9"
                  stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </div>
          <p class="c-text text-center text-fatou-black">Update mentorship options</p>

          <ButtonBlue :disabled="isUserMentorShipProfileCompleted" @click="viewUpdateMentorShip = !viewUpdateMentorShip"
            :btnText="isUserMentorShipProfileCompleted ? 'Updated' : 'Update'" />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.c-text {
  font-size: 12px
}

@media only screen and (min-width : 1140px) {
  .c-text {
    font-size: 1vw;
  }
}

.p-2-1{
  padding:2rem 1rem;
}
</style>