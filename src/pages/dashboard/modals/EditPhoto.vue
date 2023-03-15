<script>
import { mapActions } from 'vuex';
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

function getMimeType(file, fallback = null) {
	const byteArray = new Uint8Array(file).subarray(0, 4);
	let header = '';
	for (let i = 0; i < byteArray.length; i++) {
		header += byteArray[i].toString(16);
	}
	switch (header) {
		case '89504e47':
			return 'image/png';
		case '47494638':
			return 'image/gif';
		case 'ffd8ffe0':
		case 'ffd8ffe1':
		case 'ffd8ffe2':
		case 'ffd8ffe3':
		case 'ffd8ffe8':
			return 'image/jpeg';
		default:
			return fallback;
	}
}
export default {
	emits: ['close'],
	components: {
		Cropper,
	},
	data() {
		return {
			isLoading: false,
			isUploading: false,
		
			isPhotoSelected: false,
			isEdit: false,
		

			image: {
				src: null,
				type: null,
			},
			
		};
	},
	created() {
		this.getAuthUser();
	},
	computed: {
		currentUser() {
			return this.$store.state.auth.currentUser;
		},
	},
	watch: {},
	methods: {
		...mapActions(['getAuthUser', 'updateProfileAvatar']),
		handleAvatarUpload() {



			const { canvas } = this.$refs.cropper.getResult();
			if (canvas) {

				canvas.toBlob((blob) => {


					this.isUploading = true;
					// create  form data
					let userForm = new FormData();
					userForm.append('photo', blob);

					this.updateProfileAvatar(userForm)
						.then((res) => {
							setTimeout(() => {
								this.isUploading = !this.isUploading;
								this.isPhotoSelected = false;
								this.image={
									src: null,
									type: null,
								}
							}, 2000);

							// refresh user
							this.getAuthUser();

							this.$notify({
								type: 'success',
								title: 'Success',
								text: 'Your profile avatar upload was successful...',
							});
						})
						.catch((err) => {
							setTimeout(() => {
								this.isUploading = !this.isUploading;
								this.isPhotoSelected = false;
							}, 1000);
							if (err.response && err.response.data.error.includes('please')) {
								this.$notify({
									type: 'error',
									title: 'Error',
									text: 'Cannot upload avatar, update your profile details to proceed , try again',
								});
							} else {
								this.$notify({
									type: 'error',
									title: 'Error',
									text: 'Profile avatar upload failed, try again',
								});
							}
						});

				}, 'image/jpeg');
			}



		},
	
		
	

		loadImage(event) {

			// Reference to the DOM input element
			const { files } = event.target;
			// Ensure that you have a file before attempting to read it
			if (files && files[0]) {
				// 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
				if (this.image.src) {
					URL.revokeObjectURL(this.image.src);
				}
				// 2. Create the blob link to the file to optimize performance:
				const blob = URL.createObjectURL(files[0]);
				// 3. The steps below are designated to determine a file mime type to use it during the
				// getting of a cropped image from the canvas. You can replace it them by the following string,
				// but the type will be derived from the extension and it can lead to an incorrect result:
				//
				// this.image = {
				//    src: blob;
				//    type: files[0].type
				// }
				// Create a new FileReader to read this image binary data
				const reader = new FileReader();
				// Define a callback function to run, when FileReader finishes its job
				reader.onload = (e) => {
					// Note: arrow function used here, so that "this.image" refers to the image of Vue component
					this.image = {
						// Read image as base64 and set it as src:
						src: blob,
						// Determine the image type to preserve it during the extracting the image from canvas:
						type: getMimeType(e.target.result, files[0].type),
					};
					this.isPhotoSelected = true;
				};
				// Start the reader job - read file as a data url (base64 format)
				reader.readAsArrayBuffer(files[0]);
			}
		},
		destroyed() {
			// Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
			if (this.image.src) {
				URL.revokeObjectURL(this.image.src);
			}
		}
	},
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
			<div class="
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
					sm:my-8 sm:align-middle sm:max-w-xl sm:w-full
					z-[1999px]
				" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
				<div class="absolute right-5 top-4">
					<button v-on:click="$emit('close')" class="bg-fatou-gray-700 focus:outline-none rounded-full p-1">
						<img src="/images/svg/timesicon.svg" alt="close" />
					</button>
				</div>
				<div class="bg-white mx-auto py-10 border-b px-16">

					<cropper ref="cropper" class="upload-example__cropper" check-orientation :src="image.src" />

					<div v-if="!isPhotoSelected" class="flex items-center justify-center h-80">
						<button @click="$refs.file.click()" class="btn btn-primary rounded-3xl px-7">Select Photo</button>
					</div>
					<input ref="file" type="file" accept="image/*" @change="loadImage($event)" hidden />




					<div class="mt-4 flex justify-center gap-x-4">
						<button v-on:click="$emit('close')"
							class="btn btn-outline btn-primary rounded-3xl px-7">Cancel</button>
						<button v-if="isPhotoSelected" @click="$refs.file.click()"
							class="btn btn-primary rounded-3xl px-7">Change</button>
						<button v-if="isPhotoSelected" :disabled="isLoading || isUploading" @click="handleAvatarUpload"
							class="btn btn-primary rounded-3xl px-7 flex items-center justify-center space-x-1">
							<div v-if="isUploading" class="h-5 w-5 mr-3 loader ease-linear rounded-full border-2 border-t-2 border-gray-200 "></div>
							<span> Save </span>
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
