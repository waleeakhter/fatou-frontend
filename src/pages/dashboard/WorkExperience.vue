<script>
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { mapActions } from 'vuex';

// libs
import ButtonOutline from '../../components/buttons/ButtonOutline.vue';
import ButtonBlue from '../../components/buttons/ButtonBlue.vue';
import EditSkills from './modals/EditSkills.vue';
import DataProviderApis from '../../services/dataapi.service';

export default {
	components: {
		ButtonOutline,
		ButtonBlue,
		EditSkills
	},
	data() {
		return {
			v$: useVuelidate(),
			experience: {
				company: '',
				title: '',
				date: {
					start: '',
					end: '',
				},
				isCurrent:false
			},
			experiences: [],
			isEdit: false,
			isLoading: false,
			isEditExperience: false,
			showEditSkills: false,
			companiesList:[],
			selectedCompany:{},
			assetUrl: import.meta.env.VITE_APP_SERVER_ASSET_URL,
		};
	},
	validations() {
		return {
			experience: {
				company: {
					required: helpers.withMessage('Company is required', required),
				},
				title: {
					required: helpers.withMessage('Role is required', required),
				},
				date: {
					start: {
						required: helpers.withMessage('required', required),
					},
					end: {
						requiredWithoutCurrent:helpers.withMessage('End date is required', function(val){
							if(this.experience.isCurrent){
								return true;
							}
							if(!this.experience.isCurrent && this.experience.date.end===''){
								return false;
							}else{
								return true;
							}
						})
					},
				},
				isCurrent:{}
			},
		};
	},
	created() {
		this.getExperiences();
	},
	computed: {
		skills(){
			console.log('skillls',this.$store.state.auth.currentUser.skills)
			return this.$store.state.auth.currentUser.skills
		}
	},
	methods: {
		...mapActions([
			'editWorkExperience',
			'getUserWorkExperiences',
			'deleteWorkExperience',
			'editSingleWorkExperience',
			'updateSkills',
			'getAuthUser',
		]),

		AddExperience(){
			
			if(this.selectedCompany._id){
				this.handleAddExperience()
			}else{
				DataProviderApis.createCompany(this.experience.company).then((res)=>{
					this.isLoading = true;
					this.selectedCompany=res.data.company
					this.handleAddExperience()
				}).catch((err) => {
					console.log(err);
				})
			}
		},

		handleAddExperience() {
			this.isLoading = true;
			let data = { ...this.experience,company:this.selectedCompany._id };

			
			if (this.isEditExperience) {
				this.editSingleWorkExperience(data)
					.then((res) => {
						this.getExperiences();
						setTimeout(() => {
							this.isLoading = !this.isLoading;
							this.isEdit = false;
						}, 1000);
						
						this.$notify({
							type: 'success',
							title: 'Success',
							text: 'Work experience was updated...',
						});

						this.isEditExperience = false;
						// clear form
						this.experience = {
							company: '',
							title: '',
							date: {
								start: '',
								end: '',
							},
							isCurrent:false
						};
						this.v$.experience.company.$reset();
						this.v$.experience.title.$reset();
						this.v$.experience.date.start.$reset();
						this.v$.experience.date.end.$reset();
						this.v$.experience.isCurrent.$reset();
						this.isEditExperience = false;
						this.selectedCompany={}

						// this.v$.experience.isvalid(false);

						// this.v$.experience.$isvalid(true);
					})
					.catch((err) => {
						console.log(err);
						setTimeout(() => {
							this.isLoading = !this.isLoading;
							this.isEdit = false;
						}, 1000);
						this.$notify({
							type: 'error',
							title: 'Error',
							text: 'Failed to edit work experience, try again',
						});
					});
			} else {
				this.editWorkExperience(data)
					.then((res) => {
						this.getExperiences();
						setTimeout(() => {
							this.isLoading = !this.isLoading;
							this.isEdit = false;
						}, 1000);
						this.$notify({
							type: 'success',
							title: 'Success',
							text: 'Work experience was added...',
						});

						// clear form
						this.experience = {
							company: '',
							title: '',
							date: {
								start: '',
								end: '',
							},
							isCurrent:false
						};
						this.v$.experience.company.$reset();
						this.v$.experience.title.$reset();
						this.v$.experience.date.start.$reset();
						this.v$.experience.date.end.$reset();
						this.v$.experience.isCurrent.$reset();
						this.isEditExperience = false;
						this.selectedCompany={}
						// this.v$.experience.isvalid(false);
					})
					.catch((err) => {
						setTimeout(() => {
							this.isLoading = !this.isLoading;
							this.isEdit = false;
						}, 1000);
						this.$notify({
							type: 'error',
							title: 'Error',
							text: 'Failed to add work experience, try again',
						});
					});
			}
		},
		getExperiences() {
			this.experiences = [];
			this.getUserWorkExperiences().then((res) => {
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
				});
			});
		},
		deleteExperience(experience) {
			this.isLoading = true;
			const data = { ...experience };
			if(experience.isCurrent) {
				data.date.end=''
			}
			this.deleteWorkExperience(data)
				.then((res) => {
					this.getExperiences();
					setTimeout(() => {
						this.isLoading = !this.isLoading;
					}, 1000);
					this.$notify({
						type: 'success',
						title: 'Success',
						text: 'Work experience was removed...',
					});
				})
				.catch((err) => {
					console.log(err);
					setTimeout(() => {
						this.isLoading = !this.isLoading;
					}, 800);
					this.$notify({
						type: 'error',
						title: 'Error',
						text: 'Failed to remove Work experience, try again',
					});
				});
		},
		editExperience(experience) {
			console.log(experience);
			this.selectedCompany=experience.company;
			this.isEditExperience = true;
			this.experience = { ...experience,company:experience.company.title };
			this.isEdit = true;
			
			// scroll top
			 window.scrollTo(0, 0);
		},
		companyChangeHandler(event){
			if(event.target.value!=''){
				DataProviderApis.getCompaniesListBySearch(event.target.value)
            .then((res) => {
                this.companiesList = [...res.data];
            })
            .catch((err) => {
                console.log(err);
            });
			}else{
				this.companiesList=[]
			}
			
		},
		selectCompany(company){
			this.experience.company=company.title
			this.selectedCompany=company
			this.companiesList=[]
		}
	}
};
</script>
<template>

	<div class="mt-16 card rounded-lg bg-white max-w-4xl mx-auto">
		<div class="card-body">
			<div class="text-xl font-bold flex items-center mb-4">
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
				My Experience
			</div>

			<form @submit.prevent="AddExperience">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
				<div class="form-control md:col-span-2">
					<input
						type="text"
						v-model="v$.experience.company.$model"
						class="
							w-full
							bg-fatou-gray-200
							focus:outline-none
							py-2
							px-3
							border-fatou-gray-400 border-[1px]
							rounded-md
						"
						placeholder="Company"
						@keyup="companyChangeHandler"
					/>
					<!-- error -->
					<div v-if="v$.experience.company.$error" class="text-red-600 text-xs">
						{{'* ' + v$.experience.company.$errors[0].$message }}
						</div>
				</div>
			
				<ul class="bg-slate-100  rounded-lg">
					<li class="cursor-pointer p-2 flex items-center text-xs" v-for="(company, index) in this.companiesList" @click="selectCompany(company)" >
						<img class="mr-4 w-7" :src="assetUrl+'companies-logo/'+company.image" />
						{{company.title}}
					</li>
				</ul>

<div class=" md:col-span-2 grid grid-cols-1 md:grid-cols-7 gap-4 items-center ">



				<div class="form-control md:col-span-3">
					<label class="label">
						<span class="label-text text-fatou-gray-400">Start Date</span>
					</label>
					<input
						type="date"
						v-model="v$.experience.date.start.$model"
						class="
							w-full
							bg-fatou-gray-200
							focus:outline-none
							py-2
							px-3
							border-fatou-gray-400 border-[1px]
							rounded-md
						"
						
					/>
				
					
					<!-- error -->
					<div v-if="v$.experience.date.start.$error" class="text-red-600 text-xs">
						{{'* ' + v$.experience.date.start.$errors[0].$message }}
						</div>
				</div>
				<div  class="form-control md:col-span-3">
					<label class="label">
						<span class="label-text text-fatou-gray-400">End Date</span>
					</label>
					<input
						:disabled="v$.experience.isCurrent.$model"
						type="date"
						v-model="v$.experience.date.end.$model"
						class="
							w-full
							bg-fatou-gray-200
							focus:outline-none
							py-2
							px-3
							border-fatou-gray-400 border-[1px]
							rounded-md
						"
					/>
					<!-- error -->
					<div v-if="v$.experience.date.end.$error" class="text-red-600 text-xs">
						{{'* ' + v$.experience.date.end.$errors[0].$message }}
						</div>
				</div>

				<div class="form-control ">
					<label class="label">
						<span class="label-text text-fatou-gray-400">Present</span> 
							
					</label>
					<input
						
						v-on:change="v$.experience.date.end.$model=''"
						type="checkbox"
						v-model="v$.experience.isCurrent.$model"
						class=" w-auto ml-5 bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
					/>
					<!-- error -->
					<!-- <div v-if="v$.experience.date.end.$error" class="text-red-600 text-xs">
						{{'* ' + v$.experience.date.end.$errors[0].$message }}
						</div> -->
				</div>

</div>



				<div class="form-control md:col-span-2">
					<input
						type="text"
						v-model="v$.experience.title.$model"
						class="
							w-full
							bg-fatou-gray-200
							focus:outline-none
							py-2
							px-3
							border-fatou-gray-400 border-[1px]
							rounded-md
						"
						placeholder="Role"
					/>
					<!-- error -->
					<div v-if="v$.experience.title.$error" class="text-red-600 text-xs">
						{{'* ' + v$.experience.title.$errors[0].$message }}
						</div>
				</div>
				<div>
					<button class="btn btn-primary px-8 rounded-4xl flex items-center justify-center space-x-1" :disabled="v$.experience.$invalid || isLoading">
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
							SAVE
						</span>
					</button>
				</div>
			</div>
			</form>
			<p class="text-xl font-bold my-4">My Experiences</p>
			<div class="w-full">
				<div class="w-full" v-if="experiences.length >= 1">
					<div class="mt-4 md:w-[80%] md:mx-auto flex flex-col gap-y-4" v-for="experience in experiences" :key="experience._id">
						<div class="card border-[1px] border-fatou-gray-400">
							<div class="card-body flex md:flex-row md:justify-between p-4">
								<div class="flex">

								
									<img
										:src="assetUrl+'companies-logo/'+experience?.company?.image"
										alt="experience"
										class="w-10 h-10 md:w-24 md:h-24 mr-4"
									/>
									<div>
										<p class="font-bold text-md md:text-lg">{{experience?.company?.title}}</p>
										<p class="text-fatou-gray-400 mt-1 md:mt-2 text-sm md:text-base">
											{{experience.title}}
										</p>
										<p class="text-fatou-gray-400 mt-1 md:mt-2 text-sm md:text-base">
											{{$filters.formatExperienceDate(experience.date.start)}} – {{experience.isCurrent ? 'Present': $filters.formatExperienceDate(experience.date.end)}}
										</p>
									</div>
								</div>
								<div class="flex items-center mt-4 md:mt-0">
									<div class="flex flex-col gap-y-2 w-full">
										<button
											@click="editExperience(experience)"
											class="btn btn-outline btn-primary md:px-8 btn-xs md:btn-sm rounded-2xl"
										>
											Edit
										</button>
										<button @click="deleteExperience(experience)" class="btn btn-danger md:px-8 btn-xs md:btn-sm rounded-2xl">
											Delete
										</button>
									</div>
								</div>
							</div>
						</div>
					<!-- <div class="text-center">
						<button class="btn btn-primary px-8 rounded-4xl">Add Experience</button>
					</div> -->
				</div>
				</div>
				<div v-else>
					No experience yet, add experience above
				</div>
			</div>
			<p class="text-xl font-bold my-4">My Skills</p>
			<div class="w-full">
				<div class="w-full flex gap-2 flex-wrap" v-if="skills.length >= 1">
					<div v-for="(skill, index) in skills" :key="index">
						<div class="badge bg-fatou-blue text-white border-0 p-3 md:p-5">{{skill.name}}</div>
					</div>
				</div>
				<div v-else>
					No skills yet, add skills below
				</div>
			</div>
			<div class="mt-4 text-center">
				<button class="btn btn-primary px-8 rounded-4xl" @click="showEditSkills = !showEditSkills">
					Edit Skills
				</button>
			</div>
		</div>
	</div>

	<!-- Modals -->
	<EditSkills v-if="showEditSkills" v-on:close="showEditSkills = !showEditSkills" :userSkills="skills" />
</template>
