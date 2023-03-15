<script setup>
import { ref } from 'vue'
import {useStore} from 'vuex';

import PauseAccount from '../modals/PauseAccount.vue';
import DeleteAccount from '../modals/DeleteAccount.vue';
import NotifyModal from '../../modals/NotifyModal.vue';


const store = useStore();
// 
const isPauseModal = ref(false)
const isDeleteModal = ref(false)

const message  = ref('');
const isNotificationModal = ref(false);

const saveNotification = (msg) => {
		message.value = msg;
		isNotificationModal.value = true;

		setTimeout(() => {
			isNotificationModal.value = false;
		}, 5000)

		logoutUser();
}

const closePause = () => {
	isPauseModal.value=false

	saveNotification('You Account has being paused, would be re-activated onces logged in');
}

const closeDelete = () => {
	isDeleteModal.value=false

	saveNotification('You Account has being deleted, thanks for being with us, we will miss you');
}

 const logoutUser = () => {
            localStorage.clear();
            store.commit('LOGOUT_USER');
            window.location = '/';
        }


</script>
<template>
	<PauseAccount v-if="isPauseModal" v-on:close="closePause" />
	<DeleteAccount v-if="isDeleteModal" v-on:close="closeDelete" />

	<NotifyModal v-if="isNotificationModal" :notification="message" />
	<div class="mt-16 card rounded-lg bg-white max-w-4xl mx-auto">
		<div class="card-body">
			<div class="flex items-center space-x-3">
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
                    <!--  -->
                    <h3 class="text-lg font-medium">
                        Account Options
                    </h3>
                </div>
			<div class="mb-5 sm:w-2/3 w-full mx-auto py-3">
				<ul class="space-y-2">
					<li>
						<a class="!px-0">
							<div class="flex items-center justify-between w-full border border-fatou-black-50 px-6 py-2.5 rounded-lg">
								<span class="text-fatou-black">Delete Account</span>
								<span
									>
                                    <button @click="isDeleteModal=true" class="btn btn-error px-6 bg-fatou-red text-white text-xs rounded-full font-medium">
                                        Delete Account
                                    </button>
								</span>
							</div>
						</a>
					</li>
                    <!-- <li>
						<a class="!px-0">
							<div class="flex items-center justify-between w-full border border-fatou-black-50 px-6 py-2.5 rounded-lg ">
								<span class="text-fatou-black">Pause Account</span>
								<span
									>
                                    <button @click="isPauseModal=true" class="btn btn-primary px-6 bg-fatou-blue text-white text-xs rounded-full font-medium">
                                        Pause Account
                                    </button>
								</span>
							</div>
						</a>
					</li> -->
				</ul>
			</div>
		</div>
	</div>
</template>
