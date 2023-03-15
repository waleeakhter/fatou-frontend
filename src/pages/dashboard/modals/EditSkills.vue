<script>
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { mapActions } from 'vuex';
import dataService from '../../../services/dataapi.service'
// libs
import Multiselect from '@vueform/multiselect';

export default {
	emits: ['close'],
	props: {
		userSkills: {
			type: Array,
			default: []
		}
	},
	components: {
		Multiselect,
	},
	data() {
		return {
			v$: useVuelidate(),
			skills: [],
			isEditSkills: false,
			isLoading: false,
			skillsOptions: []
		};
	},
	validations() {
		return {
			skills: {
				required: helpers.withMessage('Skills is required', required),
			},
		};
	},
	mounted(){
		
		this.skills = this.userSkills.map((skill)=>{
				 return skill._id
			 })
			 console.log(this.skills)
		
		dataService.getSkillsList().then((res)=>{
			 this.skillsOptions=res.data.map((skill)=>{
				 return {
					 value:skill._id,
					 label:skill.name
				 }
			 })
		}).catch((err)=>{
			console.log(err)
			this.skillsOptions=[]
		})


	},
	methods: {
		...mapActions([
			'updateSkills',
			'getAuthUser',
				]),
		updateSkillSet() {
			this.isLoading = true;
			const data = {
				skills: this.skills,
			};
			
			 console.log(data);

			this.updateSkills(data)
				.then((res) => {
					this.getAuthUser();
					setTimeout(() => {
						this.isLoading = !this.isLoading;
					}, 1000);
					this.$notify({
						type: 'success',
						title: 'Success',
						text: 'Skills Successfully updated...',
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
						text: 'Failed to update your skills, try again',
					});
				});
		},
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
					sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full
					z-[1999px]
				"
				role="dialog"
				aria-modal="true"
				aria-labelledby="modal-headline"
			>
				<span class="text-2xl font-bold absolute left-5 top-4">Edit Skills</span>
				<div class="absolute right-5 top-4">
					<button
						v-on:click="$emit('close')"
						class="bg-fatou-gray-700 focus:outline-none rounded-full p-1"
					>
						<img src="/images/svg/timesicon.svg" alt="close" />
					</button>
				</div>
				<div class="py-5">

				</div>
				<div class="bg-white mx-auto py-10 border-b px-7">
					 <Multiselect
						v-model="v$.skills.$model"
						mode="tags"
						:searchable="true"
						:createTag="true"
						:options="skillsOptions"
						@change="isEdit=true"
						placeholder="Select skill from options"
						/>
						<div v-if="v$.skills.$error" class="text-red-600 text-xs">
						{{'* ' + v$.skills.$errors[0].$message }}
						</div>

					<!-- <div
						class="
							bg-fatou-gray-200
							border-fatou-gray-300 border-2
							rounded-md
							p-3
							flex flex-wrap
							mt-10
							gap-x-2
						"
					>
						<div class="badge bg-fatou-blue text-white border-0 p-3 md:p-5">UI Design</div>
						<div class="badge bg-fatou-blue text-white border-0 p-3 md:p-5">Product Design</div>
						<div class="badge bg-fatou-blue text-white border-0 p-3 md:p-5">Leadership</div>
					</div> -->
					<div class="mt-10 flex justify-center gap-x-4">
						<button class="btn btn-outline btn-primary rounded-3xl px-7">Cancel</button>
						<button class="btn btn-primary rounded-3xl px-7" @click="updateSkillSet" :disabled="v$.skills.$invalid || isLoading">
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
			</div>
		</div>
	</div>
</template>
<style scoped>
@import url('/src/assets/css/modal.css');
</style>
