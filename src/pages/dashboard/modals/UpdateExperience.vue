
<script>
import useVuelidate from "@vuelidate/core";
import { required, helpers, numeric } from "@vuelidate/validators";
import { mapActions } from "vuex";

import DataProviderApis from '../../../services/dataapi.service'
// libs
import Multiselect from "@vueform/multiselect";
import moment from 'moment';
export default {
	emits: ["close"],
	components: {
		Multiselect,
	}, data() {
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
			experienceSkills:[],
			experienceSkillsOptions: [],
			isEditExperience: false,
			showEditSkills: false,
			currentStep: 1,
			 moment: moment,
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
		this.getExperiences()


		DataProviderApis.getSkillsList().then((res)=>{
			 this.experienceSkillsOptions=res.data.map((skill)=>{
				 return {
					 value:skill._id,
					 label:skill.name
				 }
			 })
		}).catch((err)=>{
			console.log(err)
			this.experienceSkillsOptions=[]
		})
	},
	computed: {
		skills() {
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
		calculateSteps() {
		console.log(this.currentStep)
			if (this.currentStep >= 4) return;
			this.currentStep++

			
		},

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
				})
				
			});
		},
		deleteExperience(experience) {
			this.isLoading = true;
			const data = { ...experience };

			// console.log(data);

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
			this.isEditExperience = true;
			this.experience = { ...experience };
			this.isEdit = true;

			// scroll top
			window.scrollTo(0, 0);
		},
		addSkills(){
			this.updateSkills({skills:this.experienceSkills}).then(async (res)=>{
			  	await this.getAuthUser();
				this.closeModal()
			}).catch((err) => {
				console.log(err);
			})
		},
		closeModal(){
			 this.isLoading = !this.isLoading;
			this.isEdit = false;
			this.$emit('close')
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
	<!-- -->
	<div id="modal" class="fixed z-10 inset-0 overflow-y-auto">
		<div
			class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
		>
			<div class="fixed inset-0 transition-opacity" aria-hidden="true">
				<div class="absolute inset-0 bg-opacity-modal opacity-75"></div>
			</div>
			<!--  -->
			<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
			<div
				class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full z-[1999px]"
				role="dialog"
				aria-modal="true"
				aria-labelledby="modal-headline"
			>
				<span class="text-2xl font-bold relative left-5 top-4 px-5">Update Experience</span>
				<div class="absolute right-5 top-4">
					<button
						v-on:click="$emit('close')"
						class="bg-fatou-gray-700 focus:outline-none rounded-full p-1"
					>
						<img src="/images/svg/timesicon.svg" alt="close" />
					</button>
				</div>

				<form @submit.prevent="AddExperience">
					<div v-if="currentStep == 1" class="space-y-3">
						<p class="text-sm text-fatou-gray-600 px-10 mt-8">Add Experience</p>
						<div class="bg-white mx-auto py-4 border-b px-7 mt-2">
							<div class="form-control md:col-span-2 mt-3">
								<input
									v-model="v$.experience.company.$model"
									type="text"
									class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
									
									placeholder="company"
									@keyup="companyChangeHandler"
								/>
							</div>
								<ul class="bg-slate-100  rounded-lg">
						<li class="cursor-pointer p-2 flex items-center text-xs" v-for="(company, index) in this.companiesList" @click="selectCompany(company)" >
						<img class="mr-4 w-7" :src="assetUrl+'companies-logo/'+company.image" />
							{{company.title}}
						</li>
					</ul>

							<div class="flex items-center justify-between space-x-6 mt-4">
								<div class="form-control w-full">
									<label class="label">
										<span class="label-text text-fatou-gray-400">Start Date</span>
									</label>
									<input
										type="date"
										v-model="v$.experience.date.start.$model"
										class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
										v-on:keyup="handleEdit"
									/>
								</div>
								<div class="form-control w-full">
									<label class="label">
										<span class="label-text text-fatou-gray-400">End Date</span>
									</label>
									<input
										type="date"
										:disabled="v$.experience.isCurrent.$model"
										v-model="v$.experience.date.end.$model"
										class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
										v-on:keyup="handleEdit"
									/>
								</div>	


								<div class="form-control ">
									<label class="label">
										<span class="label-text text-fatou-gray-400">Present</span> 
											
									</label>
									<input
										v-on:change="v$.experience.date.end.$model=''"
										type="checkbox"
										v-model="v$.experience.isCurrent.$model"
										class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
									/>	
								</div>
								



							</div>

							<div class="form-control md:col-span-2 mt-7">
								<input
									v-model="v$.experience.title.$model"
									type="text"
									class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
									v-on:keyup="handleEdit"
									placeholder="title"
								/>
							</div>

							<div class="py-2 flex items-center justify-center mt-3">
								<button
									type="submit"
									:disabled="v$.experience.$invalid || isLoading"
									class="btn bg-fatou-blue hover:bg-fatou-blue rounded-3xl border-0 text-white px-16"
								>
									<div
										v-if="isLoading"
										class="h-5 w-5 mr-3 loader ease-linear rounded-full border-2 border-t-2 border-gray-200"
									></div>Add Experience
								</button>
							</div>

							<div v-for="(exp ,index) in experiences " :key="exp._id" class="bg-white mx-auto w-full border-[1px] border-fatou-gray-400 border rounded-lg overflow-hidden mt-3">
								<div class="sm:flex sm:items-center px-4 py-4 align-center">
									<img
										class="block h-8 sm:h-12 rounded-full mx-auto mb-4 sm:mb-0 sm:mr-4 sm:ml-0"
										:src="assetUrl+'companies-logo/'+exp.company.image"
										alt
									/>
									<div class="px-4 sm:text-left sm:flex-grow">
										<div class="my-1">
											<p class="text-sm leading-tight font-medium text-fatou-gray">{{exp.company.title}}</p>
											<!-- <p class="text-xs leading-tightt text-fatou-gray-400">New York, NY</p> -->
											<p
												class="text-xs leading-tight text-fatou-gray-400"
											>Talent – {{exp.title}}, {{moment(exp.date.start).format('d MMM yyyy')}} –  {{moment(exp.date.end).format('d MMM yyyy')}}</p>
										</div>
										<div></div>
									</div>
								</div>
							</div>

							<div class="py-3 flex items-center justify-center mt-3">
								<button
									type="button"
									@click="calculateSteps"
									class="btn bg-fatou-blue hover:bg-fatou-blue rounded-3xl border-0 text-white px-24"
								>Next</button>
							</div>
						</div>
					</div>
					<div v-if="currentStep == 2" class="space-y-3">
						<p class="text-sm text-fatou-gray-600 px-10 mt-4">Add Skills</p>

						<div class="bg-white mx-auto py-4 border-b px-7 mt-2">
							<div class="w-full">
								<Multiselect
									mode="tags"
									:searchable="true"
									:options="experienceSkillsOptions"
									v-model="experienceSkills"
									@change="isEditExperience = true"
									placeholder="Select Skills"
								/>
							</div>

							<!-- <div class="form-control md:col-span-2 mt-1">
							<input
							type="text" class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3  border-[1px] rounded-md"
							v-on:keyup="handleEdit" placeholder="comapny"
							/>
							</div>-->
							<div class="py-3 flex items-center justify-center mt-3">
								<button
									type="button"
									@click="addSkills"
									class="btn bg-fatou-blue hover:bg-fatou-blue rounded-3xl border-0 text-white px-24"
								>Complete Experience</button>
						</div>

							<!-- <div class="py-3 flex items-center justify-center mt-3">
								<button
									type="button"
									@click="calculateSteps"
									class="btn bg-fatou-blue hover:bg-fatou-blue rounded-3xl border-0 text-white px-24"
								>Complete Experience</button>
							</div> -->

							<div class="py-3 flex items-center justify-center mt-3">
								<button type="button" class="rounded-3xl border-0 text-gray px-2 ml-auto" @click="closeModal">close</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<style scoped>
@import url("/src/assets/css/modal.css");
@import url("/src/assets/css/switch.css");
</style>
