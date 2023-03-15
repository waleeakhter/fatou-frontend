<script>
import useVuelidate from '@vuelidate/core';
import { required, helpers, url, alpha } from '@vuelidate/validators';
import { mapActions } from 'vuex';
// libs
import countryData from 'countrycitystatejson';

export default {
	data() {
		return {
			v$: useVuelidate(),
			form: {
				country: 'none',
				state: 'none',
				city: '',
			},
			isLoading: false,
			countries: [],
			states: [],
			cities: [],
			fullCountryDetails: {
				fullName: 'none',
				shortName: 'none',
			},
			isEdit: false,
			showEditPhoto: false,
			imageStorageUrl: import.meta.env.VITE_APP_SERVER_STORAGE_URL
		};
	},
	validations() {
		return {
			form: {
				country: {
					required: helpers.withMessage('Country is required', required),
				},
				state: {
					required: helpers.withMessage('State is required', required),
				},
				city: {
					required: helpers.withMessage('City is required', required),
				}
			},
		};
	},
	created() {
		this.getAuthUser().then((res)=>{
			this.countries = countryData.getCountries();

			let selectedCountry=this.countries.filter((country)=>{
				return country.name===res.data.user.address.country
			})
			if(selectedCountry.length>0){
				selectedCountry=selectedCountry[0]
				this.form.country=selectedCountry

			
				this.states = countryData.getStatesByShort(selectedCountry.shortName);
				this.states.forEach((state)=>{
					console.log(res.data.user.address,state)
					if(res.data.user.address.state==state){
						this.form.state=state
					}
				})
				
			}
			this.form.city=res.data.user.address.city

		})
	},
	computed: {
		currentUser() {
			return this.$store.state.auth.currentUser;
		},
	},
	watch: {
		// whenever currentUser data changes, update the user address data
		currentUser(newVal, oldVal) {

			// if (newVal.address != null && newVal.address.country != null) {
			// 	this.form.country = newVal.address.country.shortName;
			// 	this.form.city = newVal.address.city;
			// }

			// //   select state
			// var selectedCountry = this.v$.form.country.$model;
			// if (selectedCountry != null && selectedCountry != 'none') {
			// 	this.states = countryData.getStatesByShort(selectedCountry);
			// 	var country = this.countries.filter(
			// 		(country) =>
			// 			country.shortName.toString().toLowerCase() ===
			// 			selectedCountry.toString().toLowerCase()
			// 	);

			// 	this.fullCountryDetails.shortName = country[0].shortName;
			// 	this.fullCountryDetails.fullName = country[0].name;
			// 	this.form.state = newVal.address.state;
			// }

			this.isEdit = false;
		},
	},
	methods: {
		...mapActions(['getAuthUser', 'updateAddress']),
		handleForm() {
			this.isLoading = true;
			// initialize data
			const data = {
				address: {
					country: this.fullCountryDetails.fullName,
					state: this.v$.form.state.$model,
					city: this.v$.form.city.$model,
				},
			};

			this.updateAddress(data)
				.then((res) => {
					this.getAuthUser();
					setTimeout(() => {
						this.isLoading = !this.isLoading;
						this.isEdit = false;
					}, 1000);
					this.$notify({
						type: 'success',
						title: 'Success',
						text: 'Your address update was successful...',
					});
				})
				.catch((err) => {
					setTimeout(() => {
						this.isLoading = !this.isLoading;
						this.isEdit = false;
					}, 1000);
					this.$notify({ type: 'error', title: 'Error', text: 'Address Update failed, try again' });
				});
		},
		getStatesForCountry() {
			console.log(this.v$.form.country.$model.shortName)
			this.handleEdit();
			var selectedCountry = this.v$.form.country.$model.shortName;
			this.states = countryData.getStatesByShort(selectedCountry);
			this.form.state = 'none';
			var country = this.countries.filter(
				(country) =>
					country.shortName.toString().toLowerCase() === selectedCountry.toString().toLowerCase()
			);

			this.fullCountryDetails.shortName = country[0].shortName;
			this.fullCountryDetails.fullName = country[0].name;
		},
		getCityForState() {
			this.handleEdit();
			var selectedCountry = this.v$.form.country.$model;
			var selectedState = this.v$.form.state.$model;
			//   console.table({selectedCountry, selectedState})
			this.cities = countryData.getCities(selectedCountry, selectedState);
		},
		handleEdit() {
			this.isEdit = true;
		},
	},
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
				Location
			</div>
			<form @submit.prevent="handleForm" class="w-full">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
				<div class="form-control md:col-span-2">
					<select
						class=" w-full bg-fatou-gray-200 focus:outline-none py-2.5 px-3 border-fatou-gray-400 border-[1px] rounded-md"
						v-model="v$.form.country.$model" name="country" v-on:change="getStatesForCountry"
					>
						<option value="none" selected>Country</option>
                        <option v-for="country in countries" :key="country.name" :value="country">{{country.name}}</option>

					</select>
					<div v-if="v$.form.country.$error" class="text-red-600 text-xs">
						{{'* ' + v$.form.country.$errors[0].$message}}
					</div>
				</div>
				<div class="form-control">
					<label class="label">
						<span class="label-text text-fatou-gray-400">State</span>
					</label>
					<select
						class=" w-full bg-fatou-gray-200 focus:outline-none py-2.5 px-3 border-fatou-gray-400 border-[1px] rounded-md"
						v-model="v$.form.state.$model" name="state" v-on:change="getCityForState"
					>
						<option value="none" selected>State</option>
                        <option v-for="(state, index) in states" :key="index" :value="state">{{state}}</option>

					</select>
					<div v-if="v$.form.state.$error" class="text-red-600 text-xs">
						{{'* ' + v$.form.state.$errors[0].$message}}
					</div>
				</div>
				<div class="form-control">
					<label class="label">
						<span class="label-text text-fatou-gray-400">City</span>
					</label>
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
						list="city-list" v-model="v$.form.city.$model" v-on:keyup="handleEdit" placeholder="Enter city name"
					/>
					<datalist id="city-list">
                                        <option v-for="(city, index) in cities" :key="index" :value="city" />
                    </datalist> 
					<div v-if="v$.form.city.$error" class="text-red-600 text-xs">
						{{'* ' + v$.form.city.$errors[0].$message}}
					</div>
				</div>
			</div>
			<!-- <div class="mt-5">
				<img src="/images/png/map-img.png" alt="map" class="w-full" />
			</div> -->
			<button
				type="submit"
				:disabled="v$.form.$invalid || isLoading || !isEdit"
				class="btn bg-fatou-blue hover:bg-fatou-blue rounded-3xl border-0 text-white px-16 mt-4 flex items-center justify-center space-x-1"
			>
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
			</form>
		</div>
	</div>
</template>
