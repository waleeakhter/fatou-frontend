<script>
import useVuelidate from '@vuelidate/core';
import { required, helpers, url, alpha } from '@vuelidate/validators';
import { mapActions } from 'vuex';
import {highestEducationOptions,sectorOptions,industryOptions} from '../../../services/constants.js'
// services
import DataProviderApis from '../../../services/dataapi.service';

export default {
    emits: ["close"],
    data() {
        return {
            v$: useVuelidate(),
            form: {
                email: '',
                firstname: 'asda',
                lastname: '',
                pronouns: '',
                bio: '',
                // contactNumber: '',
            
             
                industry: 'none',
                sector: 'none',
                college: '',
                highestEducation: 'none',
                linkedInUrl: '',
                website: '',
                
            },
            isLoading: false,
           	schools: [],
            isEdit: false,
            currentStep: 1,
            industryOptions: industryOptions,
            highestEducationOptions:highestEducationOptions,
            sectorOptions:sectorOptions,
            assetUrl: import.meta.env.VITE_APP_SERVER_ASSET_URL,
            selectedSchool:{} 
        }
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
                bio: {
                    required: helpers.withMessage('Bio is required', required),
                },
                pronouns: {
                    required: helpers.withMessage('Pronouns is required', required),
                },
                // contactNumber: {
                //     required: helpers.withMessage('Contact is required', required),
                // },
               
               
                linkedInUrl: {
                    url: helpers.withMessage('Url not valid', url),
                },
                website: {
                    url: helpers.withMessage('Url not valid', url),
                },
            },
        };
    },
    created() {
       

        this.getAuthUser().then(({ data }) => {
            const { user } = data
            this.form.firstname = user.firstName
            this.form.lastname = user.lastName
        }).catch((err) => {
            console.log(err)
        })


    },
    methods: {
        ...mapActions(['updateProfile', 'getAuthUser']),
        calculateSteps() {
            if (this.currentStep >= 4) return;
            this.currentStep++

            console.log(this.currentStep)
        },
        handleForm() {
            this.isLoading = true;
            // initialize data
            if(!this.selectedSchool?.title){

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
        submitForm(){
             const data = {
                firstName: this.v$.form.firstname.$model,
                lastName: this.v$.form.lastname.$model,
                pronouns: this.v$.form.pronouns.$model,
                // phone: this.v$.form.contactNumber.$model,
              
             
                industry: this.form.industry,
                sector: this.form.sector,
                college: this.selectedSchool._id,
                highestEducation: this.form.highestEducation,
                linkedInUrl: this.form.linkedInUrl,
                website: this.form.website,
                bio: this.form.bio,
            };

            this.updateProfile(data)
                .then((res) => {
                    this.getAuthUser();
                    setTimeout(() => {
                        this.isLoading = !this.isLoading;
                        this.isEdit = false;
                        this.$emit('close')
                    }, 1000);
                    this.$notify({
                        type: 'success',
                        title: 'Success',
                        text: 'Your profile update was successful...',
                    });


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
        //     if (phoneObject?.formatted) {
        //         this.handleEdit();
        //         this.form.contactNumber = phoneObject.number;
        //     }
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
    }
};
</script>

<style scoped>
@import url("/src/assets/css/modal.css");
</style>
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
            <span
                class="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
            >&#8203;</span>
            <div
                class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full z-[1999px]"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
            >
                <div class="absolute right-5 top-4">
                    <button
                        v-on:click="$emit('close')"
                        class="bg-fatou-gray-700 focus:outline-none rounded-full p-1"
                    >
                        <img src="/images/svg/timesicon.svg" alt="close" />
                    </button>
                </div>
                <form @submit.prevent="handleForm">
                    <div class="bg-white mx-auto py-10 border-b px-12 relative">
                        <h1 class="text-xl font-medium">Info</h1>
                        <div class="absolute right-5 top-4">
                            <button
                                v-on:click="$emit('close')"
                                class="bg-fatou-gray-700 focus:outline-none rounded-full p-1"
                            >
                                <img src="/images/svg/timesicon.svg" alt="close" />
                            </button>
                        </div>
                        <div v-if="currentStep == 1" class="space-y-3">
                            <p class="text-sm text-fatou-gray-600">User Info</p>
                            <div class="flex items-center justify-between space-x-6">
                                <div class="form-control w-full">
                                    <label class="label">
                                        <span class="label-text text-fatou-gray-400">First Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        v-model="v$.form.firstname.$model"
                                        class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
                                        v-on:keyup="handleEdit"
                                    />
                                    <div
                                        v-if="v$.form.firstname.$error"
                                        class="text-red-600 text-xs"
                                    >{{ '* ' + v$.form.firstname.$errors[0].$message }}</div>
                                </div>
                                <div class="form-control w-full">
                                    <label class="label">
                                        <span class="label-text text-fatou-gray-400">Last Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        v-model="v$.form.lastname.$model"
                                        class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
                                        v-on:keyup="handleEdit"
                                    />
                                    <div
                                        v-if="v$.form.lastname.$error"
                                        class="text-red-600 text-xs"
                                    >{{ '* ' + v$.form.lastname.$errors[0].$message }}</div>
                                </div>
                            </div>
                            <!--  -->
                            <div class="py-2">
                                <div class="form-control">
                                    <input
                                        type="text"
                                        class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
                                        list="pronouns-list"
                                        v-model="v$.form.pronouns.$model"
                                        placeholder="Pronouns e.g He, she, his, her"
                                    />
                                    <datalist id="pronouns-list">
                                        <option value="He/Him" />
                                        <option value="She/Her" />
                                        <option value="They/Them" />
                                    </datalist>
                                    <div
                                        v-if="v$.form.pronouns.$error"
                                        class="text-red-600 text-xs"
                                    >{{ '* ' + v$.form.pronouns.$errors[0].$message }}</div>
                                </div>
                            </div>
                            <!--  -->
                            <!-- <div class="form-control md:col-span-2">
                                <vue-tel-input
                                    :value="v$.form.contactNumber.$model"
                                    @input="onPhoneInput"
                                    class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
                                ></vue-tel-input>
                                <div
                                    v-if="v$.form.contactNumber.$error"
                                    class="text-red-600 text-xs"
                                >{{ '* ' + v$.form.contactNumber.$errors[0].$message }}</div>
                            </div> -->
                            <!--  -->
                            <div class="form-control w-full">
                                <label class="label">
                                    <span class="label-text text-fatou-gray-400">Bio</span>
                                </label>
                                <textarea
                                    rows="6"
                                    v-model="v$.form.bio.$model"
                                    class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
                                    v-on:keyup="handleEdit"
                                ></textarea>
                                <div
                                    v-if="v$.form.bio.$error"
                                    class="text-red-600 text-xs"
                                >{{ '* ' + v$.form.bio.$errors[0].$message }}</div>
                            </div>
                            <div class="py-2 flex items-center justify-center">
                                <button
                                    :disabled="v$.form.firstname.$invalid || v$.form.pronouns.$invalid || v$.form.lastname.$invalid || v$.form.bio.$invalid"
                                    type="button"
                                    @click="calculateSteps"
                                    class="btn bg-fatou-blue hover:bg-fatou-blue rounded-3xl border-0 text-white px-28"
                                >Next</button>
                            </div>
                        </div>
                        <!--  -->
                        <div v-if="currentStep == 2" class="space-y-3">
                            <p class="text-sm text-fatou-gray-600">Work Info</p>
                         

                            <!--  -->
                            <div class="py-2">
                                <div class="form-control">
                                    <select
                                        class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
                                        v-model="form.industry"
                                        v-on:change="handleEdit"
                                    >
                                        <option
                                            value="Select Industry"
                                            selected
                                            disabled
                                        >Select Industry</option>
                                        <option value="none" selected>Select Industry</option>
                                        <option
                                            v-for="(option, index) in industryOptions"
                                            :key="index"
                                            :value="industryOptions[index].value"
                                        >{{ industryOptions[index].label }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="flex items-center justify-between space-x-6">
                                <div class="form-control w-full">
                                    <select
                                        class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
                                        v-model="form.sector"
                                        v-on:change="handleEdit"
                                    >
                                        <option value="none">Select Sector</option>
                                        <option
                                            v-for="(option, index) in sectorOptions"
                                            :key="index"
                                            :value="sectorOptions[index].value"
                                        >{{ sectorOptions[index].label }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="py-2 flex items-center justify-center space-x-2">
                                <button
                                    @click="currentStep--"
                                    class="border border-fatou-blue py-2 px-3 rounded-md flex items-center space-x-2"
                                >
                                    <span>
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
                                    <span>Back</span>
                                </button>
                                <button
                                    :disabled="form.industry == 'none' "
                                    type="button"
                                    @click="calculateSteps"
                                    class="btn bg-fatou-blue hover:bg-fatou-blue rounded-3xl border-0 text-white px-28"
                                >Next</button>
                            </div>
                        </div>
                        <!--  -->
                        <div v-if="currentStep == 3" class="space-y-3">
                            <p class="text-sm text-fatou-gray-600">Education info</p>
                            <!--  -->
                            <div class="flex items-center justify-between space-x-6">
                                <div class="form-control w-full">
                                    <input
                                        type="text"
                                        class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
                                        placeholder="Collage Attend"
                                        v-model="form.college"
                                        v-on:keyup="handleEdit"
                                        name="school"
                                    />
                                   

                                    <ul class="bg-slate-100  rounded-lg max-h-36 overflow-y-scroll	">
					                    <li class="cursor-pointer p-2 flex items-center text-xs" v-for="(school, index) in this.schools" @click="selectSchool(school)" >
						                    <img class="mr-4 w-7" :src="assetUrl+'schools-logo/'+school.image" /> {{school.title}}
					                    </li>
                                    </ul>


                                </div>
                            </div>

                            <!--  -->
                            <div class="flex items-center justify-between space-x-6">
                                <div class="form-control w-full">
                                    <select
                                        class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
                                        v-model="form.highestEducation"
                                        v-on:change="handleEdit"
                                    >
                                        <option
                                            value="Select Higest Education"
                                            selected
                                            disabled
                                        >Highest Education</option>
                                        <option
                                            v-for="(option, index) in highestEducationOptions"
                                            :key="index"
                                            :value="highestEducationOptions[index].value"
                                        >{{ highestEducationOptions[index].label }}</option>
                                    </select>
                                </div>
                            </div>
                            <!--  -->
                            

                            <div class="py-2 flex items-center justify-center space-x-2">
                                <button
                                    @click="currentStep--"
                                    class="border border-fatou-blue py-2 px-3 rounded-md flex items-center space-x-2"
                                >
                                    <span>
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
                                    <span>Back</span>
                                </button>
                                <button
                                    :disabled="form.college == '' || form.highestEducation == 'none'"
                                    type="button"
                                    @click="calculateSteps"
                                    class="btn bg-fatou-blue hover:bg-fatou-blue rounded-3xl border-0 text-white px-28"
                                >Next</button>
                            </div>
                        </div>
                        <!--  -->
                        <div v-if="currentStep == 4" class="space-y-3">
                            <p class="text-sm text-fatou-gray-600">External Link</p>
                            <!--  -->
                            <div class="flex items-center justify-between space-x-6">
                                <div class="form-control w-full">
                                    <input
                                        type="url"
                                        class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
                                        v-model="v$.form.linkedInUrl.$model"
                                        v-on:keyup="handleEdit"
                                        placeholder="LinkedIn"
                                    />
                                </div>
                            </div>

                            <div class="flex items-center justify-between space-x-6">
                                <div class="form-control w-full">
                                    <input
                                        type="url"
                                        class="w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
                                        v-model="v$.form.website.$model"
                                        v-on:keyup="handleEdit"
                                        placeholder="Website"
                                    />
                                </div>
                            </div>
                            <!--  -->
                            <div class="py-2 flex items-center justify-center space-x-2">
                                <button
                                    @click="currentStep--"
                                    class="border border-fatou-blue py-2 px-3 rounded-md flex items-center space-x-2"
                                >
                                    <span>
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
                                    <span>Back</span>
                                </button>
                                <button
                                    type="submit"
                                    :disabled="v$.form.$invalid || isLoading"
                                    class="btn bg-fatou-blue hover:bg-fatou-blue rounded-3xl border-0 text-white px-28 flex items-center justify-center space-x-1"
                                >
                                    <div
                                        v-if="isLoading"
                                        class="h-5 w-5 mr-3 loader ease-linear rounded-full border-2 border-t-2 border-gray-200"
                                    ></div>
                                    <span>Submit</span>
                                </button>
                            </div>
                        </div>
                        <!--  -->
                        <button
                            v-if="currentStep > 1 && currentStep <= 4"
                            v-on:click="$emit('close')"
                            class="text-fatou-blue font-medium absolute bottom-4 right-6 cursor-pointer"
                        >Skip</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>