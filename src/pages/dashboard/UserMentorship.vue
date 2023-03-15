<script>
import { mapActions } from "vuex"
// libs
import Multiselect from '@vueform/multiselect'
import {
  required,
  helpers,
  requiredIf
} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

export default {
    components: {
      Multiselect,
    },
    data() {
        return {
            v$: useVuelidate(),
            mentoring: {
                disabled: false,
                seeking: {
                    seek: false,
                    opportunities: []
                },
                openTo: {
                    open: false,
                    opportunities: []
                }
            },
            isEditMentorship: false,
            isLoading: false,
            mentorshipOpportunities: [
                'Career Advice',
                'Professional Development',
                'Life Change',
                'Personal Growth',
                'Life Coach',
                'Mental Health',
                'Problem Solving',
                'Conflict Resolution',
                'Work-life Balance',
                'Grief',
            ]
        }
    },
    validations(){
        return {
                mentoring:{
                    'seeking': {
                        seek:{},
                        opportunities:{
                            required: requiredIf((curr,all)=>{
                                return all.seek
                            })
                        }
                    },
                    'openTo': {
                        open:{},
                        opportunities:{
                            required: requiredIf((curr,all)=>{
                                return all.open
                            })
                        }
                    }
                }
            }
    },
  created() {
        this.getMentorshipDetails();
    },
    methods: {
        ...mapActions(["changeWorkMentorship", "getMentorshipProfile"]),
        handleMentorShipForm(){
            // console.log(this.mentoring);
            this.isLoading = true

            this.mentoring.seeking.seek = this.mentoring.seeking.seek == false ? 'no' :  'yes'
            this.mentoring.openTo.open = this.mentoring.openTo.open == false ? 'no' : 'yes'

            if(this.mentoring.seeking.seek === 'no'){
                this.mentoring.seeking.opportunities = []
            } else if(this.mentoring.openTo.open === 'no'){
                this.mentoring.openTo.opportunities = []
            }

            const data = {...this.mentoring};
            this.changeWorkMentorship(data).then((res) => {
                    this.getMentorshipDetails();
                    setTimeout(()=> {
                        this.isLoading = !this.isLoading; 
                        this.isEditMentorship = false;
                    }, 1000);
                    this.$notify({ type: "info", title: 'Success', text: 'Mentorship details updated...'});

                }).catch((err) => {
                    console.log(err)
                    setTimeout(()=> {this.isLoading = !this.isLoading; this.isEditMentorship = false;}, 800);
                    this.$notify({ type: "error", title: 'Error', text: 'Failed to update mentorship details, try again'});      
                })
        },

        getMentorshipDetails(){

            this.getMentorshipProfile().then((res) => {
            if(res.data.mentorshipProfile != null) {
               this.mentoring.seeking.seek = res.data.mentorshipProfile.seeking.isSeeking === 'no' ? false : true;
               this.mentoring.seeking.opportunities = res.data.mentorshipProfile.seeking.opportunities;
               this.mentoring.openTo.open = res.data.mentorshipProfile.open.isOpen === 'no' ? false : true;
               this.mentoring.openTo.opportunities = res.data.mentorshipProfile.open.opportunities
               this.mentoring.disabled = res.data.mentorshipProfile.disabled
            }
        });
        }

    }
}
</script>
<template>
	<div class="mt-16 card rounded-lg bg-white max-w-4xl mx-auto">
		<div class="card-body space-y-2.5">
			<div class="w-full flex items-center justify-between">
                <div class="flex items-center space-x-3">
                   <span @click="$router.back()" class="mr-4 cursor-pointer">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M15 18L9 12L15 6"
							stroke="black"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</span>
                    <!--  -->
                    <h3 class="text-lg font-medium">
                        Mentorship Options
                    </h3>
                </div>
                <!--  -->
                <!-- <div class="flex items-center justify-between space-x-2">
                            <span class="text-fatou-black">Opt-Out</span>
                            <span>
                                <label class="switch">
                                <input type="checkbox" v-model="mentoring.disabled" @change="isEditMentorship=true" :disabled="mentoring.disabled">
                                <span class="slider round"></span>
                                </label>
                            </span>
                        </div> -->
            </div>
			<form class="w-full" @submit.prevent="handleMentorShipForm">
                <div class="mb-5 sm:w-2/3 w-full mx-auto py-3">
				<ul class="space-y-2">
					<li>
                     <div class="w-full border border-fatou-black-50 px-6 py-2.5 rounded-lg space-y-2.5">
                         <div class="flex items-center justify-between">
                            <span class="text-fatou-black">Are you seeking a mentor?</span>
                            <span>
                                <label class="switch">
                                <input type="checkbox" v-model="v$.mentoring.seeking.seek.$model" @change="isEditMentorship=true">
                                <span class="slider round"></span>
                                </label>
                               
                            </span>
                        </div>
                        <!-- select -->
                        <div id="seekingForMentorTags" class="mb-4" v-if="mentoring.seeking.seek">
                            <div class="w-full">
                                <Multiselect
                                    v-model="v$.mentoring.seeking.opportunities.$model"
                                    mode="tags"
                                    :searchable="true"
                                    :options="mentorshipOpportunities"
                                    @change="isEditMentorship=true"
                                    placeholder="Select Areas"
                                    :disabled="mentoring.disabled"
                                />
                               
                                <div v-if="v$.mentoring.seeking.opportunities.$error" class="text-xs text-red-600">
                                    {{'* ' + v$.mentoring.seeking.opportunities.$errors[0].$message }}
                                </div>
                            </div>
                        </div>
                     </div>
                     <div>

                     </div>
					</li>
                    <li>
                        <div class="w-full border border-fatou-black-50 px-6 py-2.5 rounded-lg space-y-2.5">
                         <div class="flex items-center justify-between">
                            <span class="text-fatou-black">Are you open to mentoring?</span>
                            <span>
                                <label class="switch">
                                <input type="checkbox" v-model="v$.mentoring.openTo.open.$model" @change="isEditMentorship=true" :disabled="mentoring.disabled">
                                <span class="slider round"></span>
                                </label>
                            </span>
                        </div>
                        <!--  -->
                        <div id="openToMentoringTags" class="mb-3 w-full" v-if="mentoring.openTo.open">
                            <div class="w-full">
                                <Multiselect
                                    v-model="v$.mentoring.openTo.opportunities.$model"
                                    mode="tags"
                                    :searchable="true"
                                    :options="mentorshipOpportunities"
                                    @change="isEditMentorship=true"
                                    placeholder="Select Areas"
                                    :disabled="mentoring.disabled"
                                />
                                <div v-if="v$.mentoring.openTo.opportunities.$error" class="text-xs text-red-600">
                                    {{'* ' + v$.mentoring.openTo.opportunities.$errors[0].$message }}
                                </div>
                            </div>

                        </div>
                        </div>
					</li>
				</ul>

                <div class="flex items-center justify-center py-2.5">
                    <button  v-if="isEditMentorship" :disabled="v$.mentoring.$invalid ||isLoading"  class="bg-fatou-blue text-white px-12 py-2.5 rounded-full flex items-center justify-center space-x-1">
                        <div
							v-if="isLoading"
							class="
							h-5
							w-5
							mr-3
							loader
							ease-linear
							rounded-full
							border-2 border-t-2 border-gray-200
							"
						></div>
                    <span>
                        Save
                    </span>
                </button>
                </div>
			</div>
            </form>
		</div>
	</div>
</template>

<style scoped>
@import url('../../assets/css/switch.css');
</style>