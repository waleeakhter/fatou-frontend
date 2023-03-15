<script>
import Edit from '../components/Edit.vue';
import ResumePreview from '../components/ResumePreview.vue';
import { mapActions } from "vuex";
import moment from 'moment';
import { highestEducationOptions } from '../../../services/constants';
import usersService from '../../../services/user.service';



export default {
  components: {
    Edit,
    ResumePreview
  },
  props: ['user', 'isConnecting', 'connectionSent', 'isSelf', 'forRecruiter', 'actionType','fromNotification','connectionRequestType','requestCallLoading','connectionRequestStatus'],
  emits: ["close","addConnectionRequest","removeConnectionRequest","acceptConnectionRequest"],
  created() {
		this.getExperiences()
    
	},
  data() {
    return {
      showResume: false,
      imageStorageUrl: import.meta.env.VITE_APP_SERVER_STORAGE_URL,
      experiences: [],
      moment: moment,
      assetUrl: import.meta.env.VITE_APP_SERVER_ASSET_URL,
      workOptions: {},
      vcs: [],
      interview: {
        message: '',
        jobLink: '',
        calenderLink: ''
      },
      showModalClass: 'fixed z-10 inset-0 overflow-y-auto',
      showInterviewModal: false,
      showReportModal:false,
      report:{
        reasons:[]
      }
    }
  },
  mounted() {
   
    usersService.getWorkOptions(this.user._id).then((res) => {
       this.workOptions =res.data.workOption
    }).catch((error)=>{
      
    })

    this.getApprovedVcs()
  },
  computed: {
    actionMessage() {
      let x = '';
      switch (this.actionType) {
        case "Open to mentoring peer":
          x = 'Request Mentorship'
          break;
        case "Hiring":
          x = 'Request Interview'
          break;
        case "Seeking Cofounder":
          x = 'Show Interest'
          break;
        case "Internship":
          x = 'Request Interview'
          break;
      
        default:
          x = "Chat"
          break;
      }
       return x;
    },
    highestEducation(){
      return highestEducationOptions.filter((edu)=>edu.value===this.user.highestEducation)[0]
      }
  },
  methods: {
    ...mapActions(['getUserWorkExperiences','getVcs','setActiveChatUser']),
    getExperiences() {
			this.experiences = [];
     
      const id=this.isSelf?null:this.user._id
			this.getUserWorkExperiences(id).then((res) => {
				res.data.experiences.forEach((element) => {
					if (!element.date || element.date == null) {
						this.experiences.push({
							...element,
							date: {
								start: '',
								end: '',
							},
						});
					} else {
						this.experiences.push(element);
					}
				})
				
			});
		}
    ,
    getApprovedVcs() {
      this.getVcs()
        .then((res) => {
          this.vcs = res.data;

          console.log(this.vcs);
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
     selectUserForChat(){
       console.log('first')
      this.setActiveChatUser(this.user)
      this.$emit('close')
    },
    sendInterviewMesssage(){
      const data={
        to:this.user._id,
        from:this.$store.state.auth.currentUser._id,
        message:this.interview.message,
        type:'interview',
        jobLink:this.interview.jobLink,
        calenderLink:this.interview.calenderLink
      }
      
      usersService.sendInterviewMessage(data).then((res)=>{
          this.$notify({ type: 'success', title: 'Interview message', text: 'Interview message has been sent! ' });
          this.showInterviewModal=false
        console.log(res)
      }).catch((err)=>{
        console.log(err)
          this.$notify({ type: 'error', title: 'Error', text: 'Something went wrong ' });

      })
    },
    reportUser(){
      const data={
        reportedUser:this.user._id,
        reportedBy:this.$store.state.auth.currentUser._id,
        reasons:this.report.reasons,
        actionTaken:'none'
      }
      
      usersService.reportUser(data).then((res)=>{
        this.$notify({ type: 'info', title: 'Thank You for protecting the community', text: 'User has been reported' });
        this.showReportModal=false
        console.log(res)
      }).catch((err)=>{
        console.log(err)
        this.$notify({ type: 'error', title: 'Error', text: 'Something went wrong ' });

      })
    }
  }
};
</script>

<template>
  <ResumePreview :resumeSrc="workOptions?.resumeUrl||''" v-if="showResume" @close="showResume = false" />
  <!-- -->
  <div id="modal" class="fixed inset-0 overflow-y-auto" style="z-index: 11;">
    <div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">

      <div class="fixed inset-0 transition-opacity" @click="$emit('close')" aria-hidden="true">
        <div class="absolute inset-0 opacity-75 bg-opacity-modal"></div>
      </div>
      <!--  -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full
        z-[1999px]" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <div class="absolute right-5 top-4">
          <div class="dropdown">

            <div tabindex="0" class="cursor-pointer vertical-dots"></div>
            <ul tabindex="0" class="dropdown-content menu p-2 right-0 shadow bg-base-100 rounded-box w-52">
              <li><a @click="showReportModal=true">Report</a></li>
              <!-- <li><a @click="blockConnection(activeChatUser._id)">Block User</a></li> -->
            </ul>
          </div>
        </div>
        <div class="py-10 mx-auto bg-white border-b">
          <div class="flex flex-col items-center p-4 space-y-2 text-center text-fatou-black rounded-xl">
            <img :src="imageStorageUrl+'/'+user.avatar"
              class="rounded-full w-[150px] h-[150px] object-cover hover:scale-105 transform ease-in-out duration-300"
              :alt="`Profile Picture of ${user.firstName} ${user.lastName}`">
            <div class="flex items-center space-x-0">
              <p class="text-lg font-medium text-fatou-black">
                {{ user.firstName }} {{ user.lastName }}

              </p>
              <small class=" text-lg font-medium leading-none">{{user.pronouns ? '(' : ''}}{{ user.pronouns || ''
                }}{{user.pronouns ? ')' : ''}}</small>&nbsp;
              <a v-if="user.linkedInUrl" :href="user.linkedInUrl" target="_blank"><img src="/images/svg/linkedin.svg"
                  alt="linkedin" class="w-6 h-6" /></a>

              <a v-if="user.website" :href="user.website" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 24">
                  <path
                    d="M13.723 18.654l-3.61 3.609c-2.316 2.315-6.063 2.315-8.378 0-1.12-1.118-1.735-2.606-1.735-4.188 0-1.582.615-3.07 1.734-4.189l4.866-4.865c2.355-2.355 6.114-2.262 8.377 0 .453.453.81.973 1.089 1.527l-1.593 1.592c-.18-.613-.5-1.189-.964-1.652-1.448-1.448-3.93-1.51-5.439-.001l-.001.002-4.867 4.865c-1.5 1.499-1.5 3.941 0 5.44 1.517 1.517 3.958 1.488 5.442 0l2.425-2.424c.993.284 1.791.335 2.654.284zm.161-16.918l-3.574 3.576c.847-.05 1.655 0 2.653.283l2.393-2.389c1.498-1.502 3.94-1.5 5.44-.001 1.517 1.518 1.486 3.959 0 5.442l-4.831 4.831-.003.002c-1.438 1.437-3.886 1.552-5.439-.002-.473-.474-.785-1.042-.956-1.643l-.084.068-1.517 1.515c.28.556.635 1.075 1.088 1.528 2.245 2.245 6.004 2.374 8.378 0l4.832-4.831c2.314-2.316 2.316-6.062-.001-8.377-2.317-2.321-6.067-2.313-8.379-.002z" />
                </svg>
              </a>
            </div>
            <div class="flex flex-wrap gap-3 justify-center " v-if="forRecruiter">

              <div
                class="block px-5 py-[5px] flex justify-center items-center  bg-fatou-gray-700 rounded text-xs capitalize">
                <span class=" fatou-black font-bold">{{user?.workOption?.yearsOfExperience}} Years</span>

              </div>
              <div v-if="user?.workOption?.openToWorkRemotely"
                class="block px-5 py-[5px] flex justify-center items-center  bg-fatou-gray-700 rounded text-xs capitalize">
                <span class=" fatou-black font-bold">{{user?.workOption?.openToWorkRemotely?'Remote':''}}</span>

              </div>
              <div v-for="seeking in user?.workOption?.seeking"
                class="block px-5 py-[5px] flex justify-center items-center  bg-fatou-gray-700 rounded text-xs capitalize">
                <span class=" fatou-black font-bold">{{seeking}}</span>

              </div>
              <div
                class="block px-5 py-[5px] flex justify-center items-center  bg-fatou-gray-700 rounded text-xs capitalize">
                <span class=" fatou-black font-bold">{{user?.workOption?.salaryRange?.min}} -
                  {{user?.workOption?.salaryRange?.max}} | {{user?.workOption?.salaryRange?.currency}}</span>

              </div>
            </div>






            <!-- <p class="px-10 mt-3 font-medium text-fatou-black">{{ user.jobTitle || 'Works' }} @ {{ user.company }}</p> -->
            <p class="flex items-center text-[0.7rem]">
              {{ user.address.state }}, {{ user.address.country.fullName }}
              <img width="30" class="inline-block ml-2 rounded"
                :src="`https://countryflagsapi.com/svg/${user.address.country }`"
                :title="`Based in ${user.address.country}`" />
            </p>
            <h3 class="text-lg font-medium text-fatou-black flex items-center gap-2">Seeking
              <Edit v-if="isSelf" :link="'/auth/user/dashboard/profile'" />
            </h3>
            <div class="py-2 flex gap-2 flex-wrap ">
              <div v-for="reason in user.reasonForJoining"
                class="block px-5 py-[5px] flex justify-center items-center  bg-fatou-gray-700 rounded-full text-xs capitalize ">
                <span class=" text-fatou-blue">{{reason}}</span>
              </div>
            </div>
            <p v-if="user.bio"
              class="max-w-md text-[13px] py-5 text-center text-fatou-black-150 text-justify tracking-tighter break-words">
              {{user.bio.length > 1000 ? user.bio.slice(0 , 1000)+'...' : user.bio }}
            </p>





            <div class="flex flex-col items-center pb-5 space-y-2">

              <div class="flex items-center space-x-1.5">
                <!-- <img src="/images/svg/instagram-dark.svg" alt="instagram" class="w-6 h-6">
                            <img src="/images/svg/twitter-dark.svg" alt="twitter" class="w-6 h-6"> -->
              </div>
            </div>

            <div class="flex items-center space-x-2" v-if="!isSelf && !forRecruiter && !fromNotification">
                
              <button v-if="connectionRequestStatus===null && connectionRequestType===null"
                :disabled="requestCallLoading" @click="$emit('addConnectionRequest',user)"
                class="focus:outline-0 h-8 w-24 bg-transparent  text-fatou-blue py-1.5 px-2 rounded-full font-medium border-2 border-fatou-blue flex items-center justify-center space-x-1">
                <span v-if="!requestCallLoading">
                  <svg class="plus" width="18" height="18" viewBox="0 0 28 28" fill="red"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 5.83325V22.1666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M5.83301 14H22.1663" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
                <div v-else class="w-5 h-5 ease-linear border-2 border-t-2 border-gray-100 rounded-full loader"></div>
                <span class="text-sm">Add</span>
              </button>


              <template v-if="connectionRequestStatus==='pending'">
                <template v-if="connectionRequestType==='received'">
                  <button :disabled="requestCallLoading" @click="$emit('acceptConnectionRequest',user)"
                    class="focus:outline-0 h-8 w-24 bg-transparent  text-fatou-blue py-1.5 px-2 rounded-full font-medium border-2 border-fatou-blue flex items-center justify-center space-x-1">
                    <span v-if="!requestCallLoading">
                      <svg class="plus" width="18" height="18" viewBox="0 0 28 28" fill="red"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 5.83325V22.1666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5.83301 14H22.1663" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <div v-else class="w-5 h-5 ease-linear border-2 border-t-2 border-gray-100 rounded-full loader">
                    </div>
                    <span class="text-sm">Approve</span>
                  </button>
                </template>
                <button :disabled="requestCallLoading" @click="$emit('removeConnectionRequest',user)"
                  class="focus:outline-0 h-8 w-24 bg-transparent  text-fatou-blue py-1.5 px-2 rounded-full font-medium border-2 border-fatou-blue flex items-center justify-center space-x-1">
                  <span v-if="!requestCallLoading">
                    <svg class="plus" width="18" height="18" viewBox="0 0 28 28" fill="red"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 5.83325V22.1666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M5.83301 14H22.1663" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </span>
                  <div v-else class="w-5 h-5 ease-linear border-2 border-t-2 border-gray-100 rounded-full loader"></div>
                  <span v-if="connectionRequestType==='received'" class="text-sm">Decline</span>
                  <span v-else class="text-sm">Withdraw</span>
                </button>
              </template>







              <button @click="selectUserForChat"
                class="focus:outline-0 h-8 w-24 bg-transparent  text-fatou-blue py-1.5 px-2 rounded-full font-medium border-2 border-fatou-blue flex items-center justify-center space-x-1">
                <svg class="flex-shrink-0 chat" width="18" height="18" viewBox="0 0 28 28" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M24.5 17.5C24.5 18.1188 24.2542 18.7123 23.8166 19.1499C23.379 19.5875 22.7855 19.8333 22.1667 19.8333H8.16667L3.5 24.5V5.83333C3.5 5.21449 3.74583 4.621 4.18342 4.18342C4.621 3.74583 5.21449 3.5 5.83333 3.5H22.1667C22.7855 3.5 23.379 3.74583 23.8166 4.18342C24.2542 4.621 24.5 5.21449 24.5 5.83333V17.5Z"
                    stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span class="text-sm">{{ actionMessage }}</span>
              </button>
            </div>
            <div class="flex items-center space-x-2" v-if="!isSelf && forRecruiter">

              <a :disabled="isConnecting" v-if="!connectionSent" :href="imageStorageUrl + '/' + workOptions?.resumeUrl" target="_blank" download
                class="flex items-center justify-center flex-shrink-0 px-8 py-2 space-x-2 font-medium bg-transparent border-2 rounded-full text-fatou-blue border-fatou-blue">
                <span>Download Resume</span>
              </a>

              <!-- <button :disabled="isConnecting" @click="showResume = true" v-if="!connectionSent"
                class="flex items-center justify-center flex-shrink-0 px-8 py-2 space-x-2 font-medium bg-transparent border-2 rounded-full text-fatou-blue border-fatou-blue">
                <span>
                  <svg class="plus" width="18" height="18" viewBox="0 0 13 16" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.125 1.75H2.75C2.41848 1.75 2.10054 1.8817 1.86612 2.11612C1.6317 2.35054 1.5 2.66848 1.5 3V13C1.5 13.3315 1.6317 13.6495 1.86612 13.8839C2.10054 14.1183 2.41848 14.25 2.75 14.25H10.25C10.5815 14.25 10.8995 14.1183 11.1339 13.8839C11.3683 13.6495 11.5 13.3315 11.5 13V6.125L7.125 1.75Z"
                      stroke="#21BCD1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
                <span class="text-sm">View Resume</span>
              </button> -->
              <!-- <button @click="selectUserForChat"
                class="flex items-center justify-center flex-shrink-0 px-8 py-2 space-x-2 font-medium text-white border-2 rounded-full bg-fatou-blue border-fatou-blue">
                <svg class="flex-shrink-0 chat" width="18" height="18" viewBox="0 0 28 28" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M24.5 17.5C24.5 18.1188 24.2542 18.7123 23.8166 19.1499C23.379 19.5875 22.7855 19.8333 22.1667 19.8333H8.16667L3.5 24.5V5.83333C3.5 5.21449 3.74583 4.621 4.18342 4.18342C4.621 3.74583 5.21449 3.5 5.83333 3.5H22.1667C22.7855 3.5 23.379 3.74583 23.8166 4.18342C24.2542 4.621 24.5 5.21449 24.5 5.83333V17.5Z"
                    stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span  class="text-sm">Message</span>
              </button> -->
              <!-- interview Modal -->

              <button @click="showInterviewModal=true"
                class="flex items-center justify-center flex-shrink-0 px-8 py-2 space-x-2 font-medium text-white border-2 rounded-full bg-fatou-blue border-fatou-blue">
                <svg class="flex-shrink-0 chat" width="18" height="18" viewBox="0 0 28 28" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M24.5 17.5C24.5 18.1188 24.2542 18.7123 23.8166 19.1499C23.379 19.5875 22.7855 19.8333 22.1667 19.8333H8.16667L3.5 24.5V5.83333C3.5 5.21449 3.74583 4.621 4.18342 4.18342C4.621 3.74583 5.21449 3.5 5.83333 3.5H22.1667C22.7855 3.5 23.379 3.74583 23.8166 4.18342C24.2542 4.621 24.5 5.21449 24.5 5.83333V17.5Z"
                    stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span class="text-sm">Request Interview</span>
              </button>
            </div>
          </div>
          <!-- work -->
          <div class="mt-3 md:w-[80%] md:mx-auto flex flex-col gap-y-4">
            <h2 class="text-[0.7rem] font-bold flex items-center justify-between">Work Experience
              <Edit v-if="isSelf" :link="'/auth/user/dashboard/experiences'" />
            </h2>

            <div v-for="(exp ,index) in experiences " :key="exp._id"
              class="card border-[1px] border-fatou-gray-150 border-fatou-gray-400 border-[1px] rounded-md ">
              <div class="flex flex-row justify-between items-center p-2 card-body">
                <div class="flex items-center">

                  <img :src="assetUrl+'companies-logo/'+exp?.company?.image" alt="experience" class="w-12 h-12 mr-4" />
                  <div>
                    <p class="text-[0.7rem] font-bold">{{exp.company?.title}}</p>
                    <p class=" text-xs text-fatou-gray-400">
                      Talent – {{exp.title}}, {{moment(exp.date.start).format('d MMM yyyy')}} –
                      {{moment(exp.date.end).format('d MMM yyyy')}}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <!-- education -->
          <div class="mt-3 md:w-[80%] md:mx-auto flex flex-col gap-y-4">
            <h2 class="text-[0.7rem] font-bold flex items-center justify-between">Education
              <Edit v-if="isSelf" :link="'/auth/user/dashboard/profile'" />
            </h2>
            <div v-if="this.user.college?.title" class="card border-[1px] border-fatou-gray-150 border-fatou-gray-400 border-[1px] rounded-md">
              <div class="flex flex-row justify-between px-3 py-2 card-body">
                <div class="flex">
                  <img :src="assetUrl+'schools-logo/'+this.user?.college?.image" alt="experience"
                    class="w-12 h-12 mr-4" />
                  <div>
                    <p class="text-[0.7rem] font-bold">{{this.user.college?.title}}</p>
                    <p class=" text-xs mb-0 text-fatou-gray-400">Highest Education: {{highestEducation?.label}}</p>
                    <p class="mt-1 text-xs text-fatou-gray-400">
                      <!-- Talent – SaaS, September 2018 – Present -->
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="card border-[1px] border-fatou-gray-150 rounded-xl">
					<div class="flex flex-row justify-between p-4 card-body">
						<div class="flex">
							<img src="/images/png/experience-2.png" alt="experience" class="w-24 h-24 mr-4" />
							<div>
								<p class="text-lg font-bold">Eckelkamp College of Global Business</p>
								<p class="mt-2 text-[0.7rem] text-fatou-gray-400">Saint Louis</p>
								<p class="mt-2 text-[0.7rem] text-fatou-gray-400">
									Talent – SaaS, September 2018 – Present
								</p>
							</div>
						</div>
					</div>
				</div> -->
          </div>


          <div class="flex flex-wrap gap-6 items-center  w-[80%] my-4 mt-8 mx-auto capitalize">

            <div class="flex">
              <p class="text-[0.7rem]"><span class="text-[0.7rem] font-bold">Industry: </span> {{ user.industry }}</p>
            </div>
            <div class="flex">
              <p class="text-[0.7rem]"><span class="text-[0.7rem] font-bold">Sector: </span> {{ user.sector }}</p>
            </div>
            <h2 class="flex items-center justify-end flex-1">
              <Edit v-if="isSelf" :link="'/auth/user/dashboard/experiences'" />
            </h2>
          </div>

          <!--  -->
          <div class="mt-3 md:w-[80%] md:mx-auto flex flex-col gap-y-1">
            <h2 class="my-4 text-[0.7rem] font-bold flex items-center justify-between">Skills
              <Edit v-if="isSelf" :link="'/auth/user/dashboard/experiences'" />
            </h2>
            <div class="flex gap-2 flex-wrap">
              <div v-for="(skill ,index) in user.skills "
                class="p-5 text-[0.7rem] text-white border-0 badge bg-fatou-blue">{{skill.name}}</div>
            </div>
          </div>


        </div>

        <!-- interview message modal -->
        <div id="modal" :class="[showInterviewModal ? showModalClass : 'hidden']">
          <div class=" flex items-end justify-center min-h-screen pt-4 px-2 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
              <div class="absolute inset-0 bg-opacity-modal opacity-75"></div>
            </div>
            <!--  -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div
              class=" relative inline-block align-bottom bg-white rounded-4xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-[40rem] max-w-md z-[1999px]"
              role="dialog" aria-modal="true" aria-labelledby="modal-headline">
              <div class="absolute right-5 top-4">
                <button v-on:click="showInterviewModal=false"
                  class="bg-fatou-gray-700 focus:outline-none rounded-full p-1">
                  <img src="/images/svg/timesicon.svg" alt="close" />
                </button>
              </div>
              <p  style="color:rgb(33 188 209 / var(--tw-bg-opacity));margin-top: 9px;text-align: center;font-size: larger;font-weight: bold;">Interview Invite</p>
              <div class="bg-white mx-auto py-10 pb-20 border-b px-16">
                <form @submit.prevent>
                  <div class="flex flex-wrap">

                    <div class="w-full py-2 px-2">
                      <textarea v-model="interview.message"
                        class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
                        placeholder="I am writing for....." rows="3"></textarea>
                    </div>

                    <div class="w-full py-2 px-2">
                      <input v-model="interview.jobLink"
                        class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
                        placeholder="Job Link" />
                    </div>

                    <div class="w-full py-2 px-2">
                      <input v-model="interview.calenderLink"
                        class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
                        placeholder="Calender Link" />
                    </div>


                    <div class="w-full pt-4 flex items-center justify-center">
                      <button @click="sendInterviewMesssage"
                        class=" btn bg-fatou-blue hover:bg-fatou-blue rounded-md border-0 text-white w-1/2"> Send
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- Report Modal  -->
        <div id="modal" :class="[showReportModal ? showModalClass : 'hidden']">
          <div class=" flex items-end justify-center min-h-screen pt-4 px-2 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
              <div class="absolute inset-0 bg-opacity-modal opacity-75"></div>
            </div>
            <!--  -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div
              class=" relative inline-block align-bottom bg-white rounded-4xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-[40rem] max-w-md z-[1999px]"
              role="dialog" aria-modal="true" aria-labelledby="modal-headline">
              <div class="absolute right-5 top-4">
                <button v-on:click="showReportModal=false"
                  class="bg-fatou-gray-700 focus:outline-none rounded-full p-1">
                  <img src="/images/svg/timesicon.svg" alt="close" />
                </button>
              </div>
              <div class="bg-white mx-auto py-10 pb-20 border-b px-16">
                <form @submit.prevent>
                  <div class="flex flex-wrap">

                    <div class="w-full py-2 px-2">
                      <label class="switch">
                        <input type="checkbox" v-model="report.reasons" value='Being-Disrespectful-Offensive' class=" bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"/>
                        Being disrespectful or Offensive
                      </label>
                    </div>

                     <div class="w-full py-2 px-2">
                      <label class="switch">
                        <input type="checkbox" v-model="report.reasons" value='Harassment-Targeting' class=" bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"/>
                        Harassment / Targeting
                      </label>
                    </div>

                     <div class="w-full py-2 px-2">
                      <label class="switch">
                        <input type="checkbox" v-model="report.reasons" value='Threatening-Voilence-Physical-Harm' class=" bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"/>
                        Threatening voilence / Physical harm
                      </label>
                    </div>

                    <div class="w-full py-2 px-2">
                      <label class="switch">
                        <input type="checkbox" v-model="report.reasons" value='Suicide-Self-Injury' class=" bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"/>
                        Suicide / Self-injury
                      </label>
                    </div>

                    <div class="w-full py-2 px-2">
                      <label class="switch">
                        <input type="checkbox" v-model="report.reasons" value='Mis-Information' class=" bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"/>
                        Mis-information
                      </label>
                    </div>




                    <div class="w-full pt-4 flex items-center justify-center">
                      <button @click="reportUser"
                        class=" btn bg-fatou-blue hover:bg-fatou-blue rounded-md border-0 text-white w-1/2"> Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("/src/assets/css/modal.css");

.plus > path,
.chat > path {
  stroke: currentColor;
}

button{
  @apply transform duration-200 ease-in-out active:scale-95 hover:bg-fatou-blue-100 hover:border-fatou-blue-100 hover:text-fatou-blue-700;
}
.vertical-dots {
   width: 5px;
    height: 20px;
    background-image: radial-gradient(circle, black 2px, transparent 3px);
    background-size: 100% 33.33%;
  }
</style>