<script>
import useVuelidate from '@vuelidate/core';
import { required, helpers, url, alpha } from '@vuelidate/validators';
import { mapActions } from 'vuex';
import {highestEducationOptions,sectorOptions,industryOptions} from '../../services/constants'

import EditPhoto from './modals/EditPhoto.vue';
import userService from '../../services/user.service'
import { reasonForJoiningList } from '../../services/constants';
import Multiselect from '@vueform/multiselect'

// services
import DataProviderApis from '../../services/dataapi.service';

export default {
	components: { EditPhoto,Multiselect },
	data() {
		return {
			v$: useVuelidate(),
			form: {
				email: '',
				firstname: '',
				lastname: '',
				pronouns: '',
				contactNumber: '',
			
			
				industry: 'none',
				sector: 'none',
				college: '',
				highestEducation: 'none',
				linkedInUrl: '',
				website: '',
				bio: '',
				experienceLevel:'',
				reasonForJoining:[]
			},
			isLoading: false,
			schools: [],
			isEdit: false,
			showEditPhoto: false,
			imageStorageUrl: import.meta.env.VITE_APP_SERVER_STORAGE_URL,
		    industryOptions: industryOptions,
            highestEducationOptions:highestEducationOptions,
            sectorOptions:sectorOptions,
			assetUrl: import.meta.env.VITE_APP_SERVER_ASSET_URL,
            selectedSchool:{},
			experienceLevelsOptions:[],
			reasonForJoiningOptions:reasonForJoiningList,
			maxReasonCount:3

		};
	},
	validations() {
		return {
			form: {
				firstname: {
					required: helpers.withMessage('Firstname is required', required),
					alpha: helpers.withMessage('invalid', alpha),
				},
				lastname: {
					required: helpers.withMessage('Lastname is required', required),
					alpha: helpers.withMessage('invalid', alpha),
				},
				pronouns: {
					// required: helpers.withMessage('Pronouns is required', required)
				},
				bio: {
					// required: helpers.withMessage('Bio is required', required)
				},
				contactNumber: {
					// required: helpers.withMessage('Contact is required', required),
				},
				
			
				linkedInUrl: {
					// url: helpers.withMessage('Url not valid', url),
				},
				website: {
					// url: helpers.withMessage('Url not valid', url),
				},
				experienceLevel: {
					// url: helpers.withMessage('Url not valid', url),
				},
				reasonForJoining:{

				}
			},
		};
	},
	created() {
		this.getAuthUser();

		console.log(this.currentUser.pronouns)
		 userService.getFilterData().then((res)=>{
			 this.experienceLevelsOptions=res.experienceLevels
		 })
		// DataProviderApis.getUniversities()
		// 	.then((res) => {
		// 		this.universities = res.data;
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
	},
    
	computed: {
		currentUser() {
			return this.$store.state.auth.currentUser;
		},
	},
	watch: {
		// whenever currentUser data changes, update the user state data
		currentUser(newVal, oldVal) {
			console.log(newVal, oldVal);
			this.form.email = newVal.email;
			this.form.firstname = newVal.firstName ?? '';
			this.form.bio = newVal.bio ?? '';
			this.form.lastname = newVal.lastName ?? '';
			this.form.pronouns = newVal.pronouns ?? '';
			// this.form.contactNumber = newVal.phone ?? '';
			this.form.sector = newVal.sector ?? 'none';
			this.form.industry = newVal.industry ?? 'none';
		
			
			this.form.linkedInUrl = newVal.linkedInUrl ?? '';
			this.form.website = newVal.website ?? '';

			this.form.college = newVal.college ?newVal.college.title: '';
			this.form.highestEducation = newVal.highestEducation ?? 'none';
			this.form.experienceLevel = newVal.experienceLevel ?? 'none';
			this.selectedSchool=newVal.college
			this.form.reasonForJoining=newVal.reasonForJoining
			this.isEdit = false;
		},
	},
	methods: {
		...mapActions(['updateProfile', 'getAuthUser', 'updateProfileAvatar']),
		handleForm() {
			this.isLoading = true;
			// initialize data

			if(this.form.college!=''&&!this.selectedSchool?.title){

				DataProviderApis.createSchool(this.form.college).then((res) => {
					this.selectedSchool=res.data.school
					this.submitForm()
				}).catch((err) =>{
					console.log({err});
				})
				
			}else{
				this.submitForm()
			}
		},
		submitForm() {
			const data = {
				firstName: this.v$.form.firstname.$model,
				lastName: this.v$.form.lastname.$model,
				pronouns: this.v$.form.pronouns.$model,
				bio: this.v$.form.bio.$model,
				// phone: this.v$.form.contactNumber.$model,
			
				...(this.form.industry!=='none'         && this.form.industry!==''         && {industry: this.form.industry}),
				...(this.form.sector!=='none'           && this.form.sector!==''           && {sector: this.form.sector}),
				...(this.form.highestEducation!=='none' && this.form.highestEducation!=='' && {highestEducation: this.form.highestEducation}) ,

				...(this.selectedSchool?._id && {college: this.selectedSchool._id}) ,

				linkedInUrl: this.form.linkedInUrl,
				website: this.form.website,

				...(this.form.experienceLevel!=='none' && this.form.experienceLevel!==''  && {experienceLevel: this.v$.form.experienceLevel.$model}),
				reasonForJoining: this.form.reasonForJoining,
			};


			this.updateProfile(data)
				.then((res) => {
					this.getAuthUser();
					setTimeout(() => {
						this.isLoading = !this.isLoading;
						this.isEdit = false;
					}, 1000);
					this.$notify({
						type: 'success',
						title: 'Success',
						text: 'Your profile update was successfull...',
					});

					 window.scrollTo(0, 0);
				})
				.catch((err) => {
					setTimeout(() => {
						this.isLoading = !this.isLoading;
						this.isEdit = false;
					}, 1000);
					this.$notify({ type: 'error', title: 'Error', text: 'Profile Update failed, try again' });
				});
		},
		// onPhoneInput(phone, phoneObject, input) {
		// 	if (phoneObject?.formatted) {
		// 		this.handleEdit();
		// 		this.form.contactNumber = phoneObject.number;
		// 	}
		// },
		handleEdit(e) {
            if(e?.target?.name==='school'){
				this.selectedSchool={}
                this.getSchools(e.target.value)
            }
			this.isEdit = true;
		},
        getSchools(search) {
            if(search===''){
                this.schools =[]
                return
            }
              DataProviderApis.getSchoolsListBySearch(search)
			.then((res) => {
				this.schools = res.data;
			})
			.catch((err) => {
				console.log(err);
			});
        },
        selectSchool(school){
	        this.form.college=school.title
			this.selectedSchool={...school}
			this.schools=[]
        }
	},
};
</script>
<template>
	<div class="max-w-4xl mx-auto mt-16 bg-white rounded-lg card">
		<div class="card-body">
			<div class="flex items-center mb-4 text-xl font-bold">
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
				Account Information
			</div>
			<div class="flex justify-center">
				<div class="relative">
					<div class="avatar">
						<div class="w-40 h-40 rounded-full">
							<img v-if="currentUser.avatar != null" :src="imageStorageUrl+'/'+currentUser.avatar" />
							<img v-else src="/images/png/user_profile_avatar.png" class="w-full h-full" />
						</div>
					</div>
					<button
						class="absolute px-2 py-1 border-0 rounded-full  btn btn-primary btn-sm bottom-2 right-4"
						@click="showEditPhoto = !showEditPhoto"
					>
						<span
							><svg
								width="15"
								height="15"
								viewBox="0 0 15 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M6.875 2.5H2.5C2.16848 2.5 1.85054 2.6317 1.61612 2.86612C1.3817 3.10054 1.25 3.41848 1.25 3.75V12.5C1.25 12.8315 1.3817 13.1495 1.61612 13.3839C1.85054 13.6183 2.16848 13.75 2.5 13.75H11.25C11.5815 13.75 11.8995 13.6183 12.1339 13.3839C12.3683 13.1495 12.5 12.8315 12.5 12.5V8.125"
									stroke="#D3F2F6"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M11.5625 1.56252C11.8111 1.31388 12.1484 1.17419 12.5 1.17419C12.8516 1.17419 13.1889 1.31388 13.4375 1.56252C13.6861 1.81116 13.8258 2.14839 13.8258 2.50002C13.8258 2.85165 13.6861 3.18888 13.4375 3.43752L7.5 9.37502L5 10L5.625 7.50002L11.5625 1.56252Z"
									stroke="#D3F2F6"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</span>
					</button>
				</div>
			</div>
			<div class="text-center">
				<div class="text-2xl font-bold" v-if="currentUser.lastName != null || currentUser.firstName != null">
					{{currentUser.firstName + ' ' + currentUser.lastName}}
					<span v-if="currentUser.pronouns">
						({{currentUser.pronouns}})
					</span>
				</div>
			</div>
			<form @submit.prevent="handleForm" class="w-full">
				<div class="grid grid-cols-1 gap-4 mt-5 md:grid-cols-2">
				<div class="form-control">
					<label class="label">
						<span class="label-text text-fatou-gray-400">First Name</span>
					</label>
					<input
						type="text"
						v-model="v$.form.firstname.$model"
						class="
							w-full
							bg-fatou-gray-200
							focus:outline-none
							py-2
							px-3
							border-fatou-gray-400 border-[1px]
							rounded-md
						"
						v-on:keyup="handleEdit"
                        
					/>
					 <div v-if="v$.form.firstname.$error" class="text-xs text-red-600">
							{{'* ' + v$.form.firstname.$errors[0].$message}}
						</div>
				</div>
				<div class="form-control">
					<label class="label">
						<span class="label-text text-fatou-gray-400">Last Name</span>
					</label>
					<input
						type="text"
						v-model="v$.form.lastname.$model"
						class="
							w-full
							bg-fatou-gray-200
							focus:outline-none
							py-2
							px-3
							border-fatou-gray-400 border-[1px]
							rounded-md
						"
						v-on:keyup="handleEdit"
					/>
					<div v-if="v$.form.lastname.$error" class="text-xs text-red-600">
							{{'* ' + v$.form.lastname.$errors[0].$message}}
						</div>
				</div>
				<div class="form-control md:col-span-2">
					<textarea class="
							w-full
							bg-fatou-gray-200
							focus:outline-none
							py-2
							px-3
							border-fatou-gray-400 border-[1px]
							rounded-md
						" name="biography" v-model="v$.form.bio.$model" v-on:keyup="handleEdit" cols="30" rows="3" placeholder="Bio"></textarea>
					<div v-if="v$.form.bio.$error" class="text-xs text-red-600">
							{{'* ' + v$.form.bio.$errors[0].$message}}
						</div>
				</div>
				<div class="form-control md:col-span-2">
					<input
						type="text"
						class="
							w-full
							bg-fatou-gray-200
							focus:outline-none
							py-2
							px-3
							border-fatou-gray-400 border-[1px]
							rounded-md
						"
						list="pronouns-list" v-model="v$.form.pronouns.$model"
						placeholder="Pronouns e.g He, she, his, her"
					>
					 <datalist id="pronouns-list">
                        <option value="He/Him" />
                        <option value="She/Her" />
                        <option value="They/Them" />
					</datalist>
					<div v-if="v$.form.pronouns.$error" class="text-xs text-red-600">
							{{'* ' + v$.form.pronouns.$errors[0].$message}}
						</div>
				</div>
				<!-- <div class="form-control md:col-span-2">
					 <vue-tel-input :value="v$.form.contactNumber.$model" @input="onPhoneInput" class="w-full
							bg-fatou-gray-200
							focus:outline-none
							py-2
							px-3
							border-fatou-gray-400 border-[1px]
							rounded-md"></vue-tel-input>
					<div v-if="v$.form.contactNumber.$error" class="text-xs text-red-600">
							{{'* ' + v$.form.contactNumber.$errors[0].$message}}
						</div>
				</div> -->
				
				
				<div class="form-control md:col-span-2">
					<select
						class="
							w-full
							bg-fatou-gray-200
							focus:outline-none
							py-2
							px-3
							border-fatou-gray-400 border-[1px]
							rounded-md
						"
						 v-model="form.industry"
						  v-on:change="handleEdit"
					>
						<option value="Select Industry" selected disabled>Select Industry</option>
						 <option value="none" selected>Select one</option>
						                                        <option
                                            v-for="(option, index) in industryOptions"
                                            :key="index"
                                            :value="industryOptions[index].value"
                                        >{{ industryOptions[index].label }}</option>

					</select>
				</div>
				<div class="form-control md:col-span-2">
					<input
						type="text"
						class="
							w-full
							bg-fatou-gray-200
							focus:outline-none
							py-2
							px-3
							border-fatou-gray-400 border-[1px]
							rounded-md
						"
						placeholder="College Attended"
						v-model="form.college"
						v-on:keyup="handleEdit" 
                        name="school"
						
					/>
					<ul class="bg-slate-100  rounded-lg max-h-36 overflow-y-scroll	">
					<li class="cursor-pointer p-2 flex items-center text-xs" v-for="(school, index) in this.schools" @click="selectSchool(school)" >
						<img class="mr-4 w-7" :src="assetUrl+'schools-logo/'+school.image" />
						{{school.title}}
					</li>
				</ul>
				</div>
				<div class="form-control md:col-span-2">
					<select
						class="
							w-full
							bg-fatou-gray-200
							focus:outline-none
							py-2
							px-3
							border-fatou-gray-400 border-[1px]
							rounded-md
						"
						v-model="form.highestEducation" v-on:change="handleEdit"
					>
						<option value="Select Industry" selected disabled>Highest Education</option>
						<option
                                            v-for="(option, index) in highestEducationOptions"
                                            :key="index"
                                            :value="highestEducationOptions[index].value"
                                        >{{ highestEducationOptions[index].label }}</option>

					</select>
				</div>

                <div class="form-control md:col-span-2">
					<select
						class="
							w-full
							bg-fatou-gray-200
							focus:outline-none
							py-2
							px-3
							border-fatou-gray-400 border-[1px]
							rounded-md
						"
						v-model="form.sector" v-on:change="handleEdit"
					>
						<option value="None" selected disabled>Select Sector</option>
						<option
                                v-for="(option, index) in sectorOptions"
                                :key="index"
                                :value="sectorOptions[index].value"
                            >{{ sectorOptions[index].label }}</option>

					</select>
				</div>



				<div class="form-control md:col-span-2">
					<input
						type="text"
						class="
							w-full
							bg-fatou-gray-200
							focus:outline-none
							py-2
							px-3
							border-fatou-gray-400 border-[1px]
							rounded-md
						"
						v-model="v$.form.linkedInUrl.$model" 
						v-on:keyup="handleEdit"
						placeholder="LinkedIn"
					/>
				</div>
				<div class="form-control md:col-span-2">
					<input
						type="text"
						class="
							w-full
							bg-fatou-gray-200
							focus:outline-none
							py-2
							px-3
							border-fatou-gray-400 border-[1px]
							rounded-md
						"
						 v-model="v$.form.website.$model" 
						 v-on:keyup="handleEdit" 
						 placeholder="www.thedev.com"
					/>
				</div>
 				<!-- <label for="experience">Experience Level</label>
                  <select v-model="filters.experience" name="experience" id="experience" class="bg-none">
                    <option value="">Select One</option>
                    <option v-if="filterData" v-for="experienceLevel in filterData.experienceLevels" :value="experienceLevel">{{ experienceLevel }}</option>
                  </select> -->

				<div class="form-control md:col-span-2">
					<select class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
						v-model="form.experienceLevel" v-on:change="handleEdit"
					>
						<option value="None" selected disabled>Select Experience</option>
						<option
                                v-for="(exp, index) in experienceLevelsOptions"
                                :key="index"
                                :value="exp"
                            >{{ exp }}</option>

					</select>
				</div>



				<div class="form-control md:col-span-2">
					 <Multiselect
						v-model="this.form.reasonForJoining"
						mode="tags"
						:searchable="true"
						:options="reasonForJoiningOptions"
						v-on:change="handleEdit"
						placeholder="Select"
						:max="maxReasonCount"
						
					/>
				</div>







				<div>
					<button
					 v-if="isEdit" :disabled=" isLoading"
						class="flex items-center justify-center px-16 space-x-1 text-white border-0 btn bg-fatou-blue hover:bg-fatou-blue rounded-3xl"
					>
						<div
							v-if="isLoading"
							class="w-5 h-5 mr-3 ease-linear border-2 border-t-2 border-gray-200 rounded-full  loader"
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

	<!-- Modals -->
	<EditPhoto v-if="showEditPhoto" v-on:close="showEditPhoto = !showEditPhoto" />
</template>

<style>
.vti__input {
	background-color: transparent;
}
.multiselect.is-open {
    margin-bottom: 170px;
}
</style>
