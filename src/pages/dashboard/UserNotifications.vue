<script>
import { mapActions } from 'vuex';

export default {
	data() {
		return {
			settings: {
				receiveEmails: {
					partners: false,
					blackpeer: false,
					message: false,
					answer: false,
					newPosts: false,
					jobPosts: false,
					newMessages: false,
					updateAboutFatou: false,
					receiveMessageFrom: {
						fromEveryone: false,
						fromNetwork: false,
						oldAccount: false
					}
				},
			},
			isLoading: false,
			isEdit: false,
		};
	},
	created() {
		this.getPreferences()
			.then((res) => {
				this.settings.receiveEmails = res.data.userPreferences.receiveEmails;
			})
			.catch((err) => {
				console.log(err.response);
			});
	},
	mounted() {
		// console.log(this.currentSettings);
	},
	methods: {
		...mapActions(['updatePreferences', 'getPreferences']),
		handleSetingsChange() {
			this.isLoading = true;
			const data = { ...this.settings };
            console.log(data);
			this.updatePreferences(data)
				.then((res) => {
					setTimeout(() => {
						this.isLoading = !this.isLoading;
						this.isEdit = false;
					}, 1000);
					this.$notify({
						type: 'success',
						title: 'Success',
						text: 'Your preferences update was successful...',
					});
				})
				.catch((err) => {
					setTimeout(() => {
						this.isLoading = !this.isLoading;
						this.isEdit = false;
					}, 1000);
					this.$notify({
						type: 'error',
						title: 'Error',
						text: 'Your Preferences update failed, try again',
					});
				});
		},
	},
};
</script>
<template>
	<div class="mt-16 card rounded-lg bg-white max-w-4xl mx-auto">
		<div class="card-body">
			<div class="flex items-center space-x-3">
                   <span @click="$router.back()" class="mr-4  cursor-pointer">
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
                        Notification
                    </h3>
                </div>
			<div class="mb-5 sm:w-2/3 w-full mx-auto py-3">
				<ul class="space-y-2">
					<li>
                        <div class="flex items-center justify-between w-full border border-fatou-black-50 px-6 py-2.5 rounded-lg">
                            <span class="text-fatou-black">Please send me occasional offer from my partners</span>
                            <span>
                                <label class="switch">
                                <input type="checkbox" v-model="settings.receiveEmails.partners" @change="handleSetingsChange">
                                <span class="slider round"></span>
                                </label>
                            </span>
                        </div>
					</li>
                     <li>
                        <div class="flex items-center justify-between w-full border border-fatou-black-50 px-6 py-2.5 rounded-lg">
                            <span class="text-fatou-black">I am happy to receive communictaions updates regarding Fatou</span>
                            <span>
                                <label class="switch">
                                <input type="checkbox" v-model="settings.receiveEmails.updateAboutFatou" @change="handleSetingsChange">
                                <span class="slider round"></span>
                                </label>
                            </span>
                        </div>
					</li>
                <!-- <li>
                        <div class="flex items-center justify-between w-full border border-fatou-black-50 px-6 py-2.5 rounded-lg">
                            <span class="text-fatou-black">I would like to receive notifications when someone message me</span>
                            <span>
                                <label class="switch">
                                <input type="checkbox">
                                <span class="slider round"></span>
                                </label>
                            </span>
                        </div>
				</li> -->
                <li>
                        <div class="flex items-center justify-between w-full border border-fatou-black-50 px-6 py-2.5 rounded-lg">
                            <span class="text-fatou-black">I would like to receive notification when someone answers one of my questions in the nest</span>
                            <span>
                                <label class="switch">
                                <input type="checkbox" v-model="settings.receiveEmails.answer" @change="handleSetingsChange">
                                <span class="slider round"></span>
                                </label>
                            </span>
                        </div>
				</li>
                <li>
                        <div class="flex items-center justify-between w-full border border-fatou-black-50 px-6 py-2.5 rounded-lg">
                            <span class="text-fatou-black">I would like to receive message notifications</span>
                            <span>
                                <label class="switch">
                                <input type="checkbox" v-model="settings.receiveEmails.newMessages" @change="handleSetingsChange">
                                <span class="slider round"></span>
                                </label>
                            </span>
                        </div>
				</li>
                <li>
                        <div class="flex items-center justify-between w-full border border-fatou-black-50 px-6 py-2.5 rounded-lg">
                            <span class="text-fatou-black">I would like to receive new post notifications</span>
                            <span>
                                <label class="switch">
                                <input type="checkbox" v-model="settings.receiveEmails.newPosts" @change="handleSetingsChange">
                                <span class="slider round"></span>
                                </label>
                            </span>
                        </div>
				</li>
                <li>
                        <div class="flex items-center justify-between w-full border border-fatou-black-50 px-6 py-2.5 rounded-lg">
                            <span class="text-fatou-black">I would like to receive new job notifications</span>
                            <span>
                                <label class="switch">
                                <input type="checkbox" v-model="settings.receiveEmails.jobPosts" @change="handleSetingsChange">
                                <span class="slider round"></span>
                                </label>
                            </span>
                        </div>
				</li>
                <!-- <li>
                    <div class="border border-fatou-black-50 py-2.5 space-y-2 rounded-lg">
                         <div class="flex items-center justify-between w-full px-6 py-2.5">
                            <span class="text-fatou-black">I would like to receive message from</span>
                            <span>
                                <label class="switch">
                                <input type="checkbox" disabled :checked="settings.receiveEmails.receiveMessageFrom.fromEveryone || settings.receiveEmails.receiveMessageFrom.fromNetwork || settings.receiveEmails.receiveMessageFrom.oldAccount">
                                <span class="slider round"></span>
                                </label>
                            </span>
                        </div>
                        <div class="px-6 space-y-2">
                            <div class="flex items-center justify-between w-full border border-fatou-black-50 px-6 py-2.5 rounded-lg">
                            <span class="text-fatou-black">Everyone</span>
                            <span>
                                <label class="switch">
                                <input type="checkbox" v-model="settings.receiveEmails.receiveMessageFrom.fromEveryone" @change="handleSetingsChange">
                                <span class="slider round"></span>
                                </label>
                            </span>
                        </div>
                        <div class="flex items-center justify-between w-full border border-fatou-black-50 px-6 py-2.5 rounded-lg">
                            <span class="text-fatou-black">My Network</span>
                            <span>
                                <label class="switch">
                                <input type="checkbox" v-model="settings.receiveEmails.receiveMessageFrom.fromNetwork" @change="handleSetingsChange">
                                <span class="slider round"></span>
                                </label>
                            </span>
                        </div>
                        <div class="flex items-center justify-between w-full border border-fatou-black-50 px-6 py-2.5 rounded-lg">
                            <span class="text-fatou-black">Account older than 30 days</span>
                            <span>
                                <label class="switch">
                                <input type="checkbox" v-model="settings.receiveEmails.receiveMessageFrom.oldAccount" @change="handleSetingsChange">
                                <span class="slider round"></span>
                                </label>
                            </span>
                        </div>
                        </div>
                    </div>
				</li> -->

				</ul>
               
			</div>
		</div>
	</div>
</template>

<style scoped>
@import url('../../assets/css/switch.css');
</style>
