<script setup>
import ButtonBlue from '../buttons/ButtonBlue.vue';
import ButtonOutline from '../buttons/ButtonOutline.vue';

import { ref } from 'vue';
import ContactUs from '../../pages/modals/ContactUs.vue';
import FounderModal from '../../pages/modals/FounderModal.vue';

// libs
import { useStore } from 'vuex';
import { computed } from 'vue';
import NotifyModal from '../../pages/modals/NotifyModal.vue';

const store = useStore();
const isAuthenticated = computed(() => store.state.auth.isAuthenticated);

const isContactUs = ref(false);
const isContactUsSuccess = ref(false);


const routePage = (route) => {
        window.location = '/auth/signin'
}

const contactUsMessageSuccess = () => {
	isContactUs.value = false
	isContactUsSuccess.value = true;

	setTimeout(() => {
		isContactUsSuccess.value = false
	}, 8000)
}
</script>
<template>
	<div class="py-2"></div>
	<footer class="md:px-32 sm:px-16 px-8 py-14 border-t-6 border-gray-100 border-4">
		<div
			class="flex md:flex-row flex-col items-start justify-between sm:space-x-32 py-3 space-y-7 sm:space-y-0"
		>
			<!-- first div -->
			<div class="sm:flex-1 w-full flex items-start justify-between">
				<div class="space-y-5">
					<img src="/images/png/logo.png" class="w-24" alt="Fatou" />
					<div class="flex items-center space-x-1.5">
						<a href=""><img src="/images/svg/twitter-dark.svg" alt="twitter" /></a>
					    <a href=""><img src="/images/svg/linkedin.svg" alt="linkedin" /></a>
					</div>
				</div>
				<div class="space-y-2.5">
					<h5 class="font-bold text-dark">Coming soon</h5>
					<div>
						<a href=""><img src="/images/png/gplay.png" alt="gplay" /></a>
						<a href="" class="py-8"><img  class="py-4" src="/images/png/appstore.png" alt="gplay" /></a>
					</div>
				</div>
			</div>

			<!-- second div -->	<!-- second div -->
			<div
				class="sm:flex-1 flex sm:flex-row flex-col items-start justify-between space-y-5 sm:space-y-0"
			>
				<div class="space-y-2.5">
					<h5 class="font-bold text-dark">Community</h5>
					<ul>
						<li>
							<a href="" class="text-dark fs-16 font-light">Jobs</a>
						</li>
						<li>
							<a href="" class="text-dark py-4 fs-16 font-light">Feeds</a>
						</li>
					</ul>
				</div>
				<div class="space-y-2.5">
					<h5 class="font-bold text-dark">Company</h5>
					<ul>
						<li>
							<button @click="isContactUs = !isContactUs" class="text-dark fs-16 font-light">Contact us</button>
						</li>
						<li>
							<button @click="routePage" class="text-dar fs-16 font-lightk">Join us</button>
						</li>
					</ul>
				</div>
				<div v-if="!isAuthenticated" class="flex flex-col space-y-2.5">
					<!-- <ButtonBlue @click="routePage" btnText="Signup Up" />
					<ButtonOutline @click="routePage" btnText="Log In" /> -->
				</div>
				<div v-else>
					<!-- fill extra space -->
				</div>
			</div>
		</div>
		<hr class="hr" />
		<div class="py-1.5 text-center">
			<p class="text-dark text-sm">©Fatou, 2021. We love our users!</p>
		</div>
	</footer>

	<!-- modals -->
	<ContactUs v-if="isContactUs" v-on:close="contactUsMessageSuccess" />
	<!-- contact success -->
	<NotifyModal v-if="isContactUsSuccess" notification="We will get back to you soon" v-on:close="isContactUsSuccess = false" />
</template>
