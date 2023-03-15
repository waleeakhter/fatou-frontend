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
	emits: ['close'],
	components: {
		Multiselect
	},
	 data() {
        return {
            v$: useVuelidate(),
            mentoring: {
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
						this.$emit('close')
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
            }
        });
        }

    }
};
</script>
<template>
	<!-- -->
	<div id="modal" class="fixed z-10 inset-0 overflow-y-auto">
		<div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
			<div class="fixed inset-0 transition-opacity" aria-hidden="true">
				<div class="absolute inset-0 bg-opacity-modal opacity-75"></div>
			</div>
			<!--  -->
			<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
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
					sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full
					z-[1999px]
				"
				role="dialog"
				aria-modal="true"
				aria-labelledby="modal-headline"
			>
				<span class="text-2xl font-bold absolute left-5 top-4">Update My Mentorship Options</span>
				<div class="absolute right-5 top-4">
					<button
						v-on:click="$emit('close')"
						class="bg-fatou-gray-700 focus:outline-none rounded-full p-1"
					>
						<img src="/images/svg/timesicon.svg" alt="close" />
					</button>
				</div>
				<form class="w-full" @submit.prevent="handleMentorShipForm">
					<div class="bg-white mx-auto py-10 border-b px-7">
					<div class="p-3 flex flex-col mt-10 gap-y-2">
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
                                />
                                <div v-if="v$.mentoring.seeking.opportunities.$error" class="text-xs text-red-600">
                                    {{'* ' + v$.mentoring.seeking.opportunities.$errors[0].$message }}
                                </div>
                            </div>
                        </div>
                     </div>
						 <div class="w-full border border-fatou-black-50 px-6 py-2.5 rounded-lg space-y-2.5">
                         <div class="flex items-center justify-between">
                            <span class="text-fatou-black">Are you open to mentoring?</span>
                            <span>
                                <label class="switch">
                                <input type="checkbox" v-model="v$.mentoring.openTo.open.$model" @change="isEditMentorship=true">
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
                                />
                                <div v-if="v$.mentoring.openTo.opportunities.$error" class="text-xs text-red-600">
                                    {{'* ' + v$.mentoring.openTo.opportunities.$errors[0].$message }}
                                </div>
                            </div>

                        </div>
                        </div>
					</div>
					<div class="mt-10 flex justify-center gap-x-4">
						<button class="btn btn-primary rounded-3xl px-7" v-if="isEditMentorship" :disabled="v$.mentoring.$invalid || isLoading">
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
								Complete Mentorship Options
							</span>
						</button>
					</div>
				</div>
				</form>
			</div>
		</div>
	</div>
</template>

<style scoped>
@import url('/src/assets/css/modal.css');
@import url('/src/assets/css/switch.css');
</style>
