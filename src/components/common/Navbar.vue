<script>
import ViewProfileModal from '../../pages/dashboard/modals/ViewProfile.vue'
import usersService from '../../services/users.service';
import { getItem } from '../../core/utils/storage.helper';
import notificationService from '../../services/notification.service';
import moment from 'moment';

export default {
	components: {
		ViewProfileModal
	},
	emits: ['closeMobileMenu'],
	data() {
		return {
			imageStorageUrl: import.meta.env.VITE_APP_SERVER_STORAGE_URL,
			currentTab: 'notifications',
			userModalFromNetworkRequest: false,
			viewUserModal:false,
			connectionRequests:[],
			notifications:[],
			notificationsCount:0,
			userForModal:null,
			moment:moment
		};
	},
	created(){
		this.getConnectionRequests()
		this.getNotifications()
	},
	computed: {
		currentUserAvatar() {
			return this.$store.state.auth.currentUser.avatar ?? null;
		},
		userData() {
			return this.$store.state.auth.currentUser
		}
	},
	methods: {
		logoutUser() {
			this.$store
				.dispatch('logout')
				.then(() => {
					localStorage.clear();
					this.$notify({ type: 'info', title: 'Logged Out', text: 'redirecting...' });
					setTimeout(() => {
						window.location = '/auth/signin';
					}, 1000);
				})
				.catch(() => {
					localStorage.clear();
					this.$notify({ type: 'info', title: 'Logged Out', text: 'redirecting...' });
					setTimeout(() => {
						window.location = '/auth/signin';
					}, 1000);
				});
		},

		switchTab(tab) {
			this.currentTab = tab;
		},
		logoutUser() {
			localStorage.clear();
			this.$store.commit('LOGOUT_USER');
			this.$router.back()
		},
		getConnectionRequests(){
			const currentUser=getItem("_dsa")
			usersService.getConnectionRequests({
				limit:10,
				page:1,
				to:currentUser.user._id
			}).then(({data})=>{

				const users=data.results.filter((user)=>user.from!==null)
				this.connectionRequests=users
			}).catch((error)=>{
				console.log(error)
			})
		},
		acceptConnectionRequest(id){
			usersService.acceptConnection(id,{status:'accepted'}).then(({data})=>{
				console.log(data)
			}).catch((error)=>{
				console.log(error)
				this.$notify({ type: "error", title: 'Error', text: 'something went wrong'});          
			}).finally(()=>{
				this.getConnectionRequests()
			})
		},
		removeConnectionRequest(connectionRequest){
			const data = {
				to: connectionRequest.to._id,
				from: connectionRequest.from._id
			}
			usersService.removeConnectionRequest(data).then(({data})=>{
				console.log(data)
			}).catch((error)=>{
				this.$notify({ type: "error", title: 'Error', text: 'something went wrong'});
				console.log(error)
			}).finally(()=>{
				this.getConnectionRequests()
			})
		},
		openUserModal(user){
			this.userForModal=user
			console.log(user)
			this.userModalFromNetworkRequest=true

		},
		getNotifications(){
			notificationService.getNotifications({status:'unread'}).then((res)=>{
				this.notifications=res.data.results
				if(this.notifications.length>0){	
					this.notificationsCount=this.notifications.length
				}
				console.log(res)
			}).catch((err)=>{
				console.log(err)
			})
		},
		markReadNotification(index){
			const notification=this.notifications[index]
			notificationService.markRead(notification._id).then((res)=>{
				this.notifications.splice(index,1)
			}).catch((err)=>{
				console.log(err)
			})
		}
	},
};
</script>
<template>
	<ViewProfileModal v-if="userModalFromNetworkRequest" v-on:close="userModalFromNetworkRequest = !userModalFromNetworkRequest" :user="userForModal"
		:isSelf="false" :fromNotification="true"/>


		<ViewProfileModal v-if="viewUserModal" v-on:close="viewUserModal = !viewUserModal" :user="userData"
		:isSelf="true" />
	<nav class="fixed top-0 z-10 flex items-center justify-between w-full px-4 py-5 bg-white shadow-sm sm:px-10">
		<!-- brand & search -->
		<div class="flex items-center space-x-5">
			<span>
				<router-link to="/home">
					<img src="/images/png/logo.png" alt="" class="h-9 w-28 sm:h-auto" />
				</router-link>
			</span>
			<div class="items-center hidden w-full py-1 pl-2 rounded-lg input sm:flex">
				<span>
					<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M24.903 26.1428L17.283 18.5214C13.8932 20.9314 9.22222 20.3419 6.53746 17.1653C3.85271 13.9888 4.04984 9.28489 6.99097 6.34411C9.93131 3.40204 14.6357 3.20405 17.8128 5.88866C20.99 8.57327 21.5798 13.2447 19.1696 16.6348L26.7896 24.2561L24.9043 26.1414L24.903 26.1428ZM12.647 6.66676C10.1186 6.66619 7.93722 8.44101 7.4236 10.9167C6.90998 13.3924 8.20525 15.8885 10.5252 16.8938C12.8452 17.899 15.5522 17.1372 17.0073 15.0695C18.4624 13.0018 18.2657 10.1965 16.5363 8.35211L17.343 9.15211L16.4336 8.24544L16.4176 8.22944C15.42 7.22568 14.0622 6.66294 12.647 6.66676Z"
							fill="#ADB5BD" />
					</svg>
				</span>
				<input type="search" class="w-full h-full px-3 py-2 bg-fatou-gray-200 focus:outline-none"
					placeholder="Search" />
			</div>
		</div>

		<ul class="items-center hidden space-x-10 lg:flex">
			<li>
				<router-link to="/home" class="flex items-center space-x-1.5">
					<span v-if="$route.name === 'home.database'">
						<svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M8 10.0547C10.5888 10.0547 12.6875 7.95602 12.6875 5.36719C12.6875 2.77835 10.5888 0.679688 8 0.679688C5.41117 0.679688 3.3125 2.77835 3.3125 5.36719C3.3125 7.95602 5.41117 10.0547 8 10.0547Z"
								fill="#21BCD1" />
							<path
								d="M10.3438 11.5625H5.65625C4.20585 11.5625 2.81485 12.1387 1.78926 13.1643C0.763671 14.1898 0.1875 15.5808 0.1875 17.0312C0.1875 17.6529 0.43443 18.249 0.873969 18.6885C1.31351 19.1281 1.90965 19.375 2.53125 19.375H13.4688C14.0904 19.375 14.6865 19.1281 15.126 18.6885C15.5656 18.249 15.8125 17.6529 15.8125 17.0312C15.8125 15.5808 15.2363 14.1898 14.2107 13.1643C13.1852 12.1387 11.7942 11.5625 10.3438 11.5625Z"
								fill="#21BCD1" />
						</svg>
					</span>
					<span v-else>
						<svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M8 10.0547C10.5888 10.0547 12.6875 7.95602 12.6875 5.36719C12.6875 2.77835 10.5888 0.679688 8 0.679688C5.41117 0.679688 3.3125 2.77835 3.3125 5.36719C3.3125 7.95602 5.41117 10.0547 8 10.0547Z"
								fill="#C6C6C6" />
							<path
								d="M10.3438 11.5625H5.65625C4.20585 11.5625 2.81485 12.1387 1.78926 13.1643C0.763671 14.1898 0.1875 15.5808 0.1875 17.0312C0.1875 17.6529 0.43443 18.249 0.873969 18.6885C1.31351 19.1281 1.90965 19.375 2.53125 19.375H13.4688C14.0904 19.375 14.6865 19.1281 15.126 18.6885C15.5656 18.249 15.8125 17.6529 15.8125 17.0312C15.8125 15.5808 15.2363 14.1898 14.2107 13.1643C13.1852 12.1387 11.7942 11.5625 10.3438 11.5625Z"
								fill="#C6C6C6" />
						</svg>
					</span>
					<span :class="[
						$route.name === 'home.database' ? 'text-fatou-blue' : 'text-fatou-gray-400',
						'font-semibold',
					]">
						People
					</span>
				</router-link>
			</li>
			<li>
				<router-link to="/feeds" class="flex items-center space-x-1.5">
					<span v-if="$route.name === 'home.feeds'">
						<svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M2.03359 0.083717C1.20103 0.306846 0.548001 0.967005 0.328372 1.80748C0.264438 2.05212 0.254883 3.34185 0.254883 11.7268C0.254883 19.7559 0.266113 21.3916 0.322067 21.5252C0.409791 21.7344 0.657495 21.9388 0.872002 21.9789C1.26181 22.0518 1.27816 22.0406 3.58351 20.1268L5.77418 18.3081L6.03356 18.5217C6.17625 18.6392 7.03 19.3428 7.93078 20.0853C8.83161 20.8278 9.68146 21.4999 9.81932 21.5789C10.0201 21.6938 10.1448 21.7265 10.4451 21.7432C11.14 21.7819 11.034 21.8566 14.812 18.6597L15.2267 18.3089L17.4169 20.1272C19.7218 22.0406 19.7382 22.0518 20.128 21.9789C20.3425 21.9388 20.5902 21.7344 20.6779 21.5252C20.7338 21.3916 20.7451 19.7559 20.7451 11.7268C20.7451 3.23065 20.7362 2.05447 20.6697 1.80007C20.4484 0.953308 19.7919 0.301102 18.9378 0.0793476C18.5196 -0.0291979 2.43935 -0.025074 2.03359 0.083717ZM16.4409 4.05935C16.6994 4.2517 16.78 4.4086 16.78 4.71907C16.78 5.02953 16.6994 5.18644 16.4409 5.37878C16.3057 5.47947 16.2736 5.48011 10.6072 5.49455C6.7023 5.50456 4.85281 5.49278 4.72938 5.45714C4.22895 5.31275 4.03557 4.6305 4.37952 4.22308C4.63525 3.92017 4.2849 3.93578 10.558 3.94746C16.2772 3.95807 16.3056 3.95861 16.4409 4.05935ZM16.4409 7.98682C16.6994 8.17917 16.78 8.33607 16.78 8.64654C16.78 8.957 16.6994 9.11391 16.4409 9.30625C16.3057 9.40694 16.2736 9.40758 10.6072 9.42202C6.7023 9.43203 4.85281 9.42025 4.72938 9.38461C4.22895 9.24022 4.03557 8.55797 4.37952 8.15055C4.63525 7.84764 4.2849 7.86325 10.558 7.87494C16.2772 7.88554 16.3056 7.88608 16.4409 7.98682ZM16.4409 11.9143C16.6994 12.1066 16.78 12.2635 16.78 12.574C16.78 12.8845 16.6994 13.0414 16.4409 13.2337C16.3057 13.3344 16.2736 13.3351 10.6072 13.3495C6.7023 13.3595 4.85281 13.3477 4.72938 13.3121C4.22895 13.1677 4.03557 12.4854 4.37952 12.078C4.63525 11.7751 4.2849 11.7907 10.558 11.8024C16.2772 11.813 16.3056 11.8136 16.4409 11.9143Z"
								fill="#21BCD1" />
						</svg>
					</span>
					<span v-else>
						<svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M2.03359 0.083717C1.20103 0.306846 0.548001 0.967005 0.328372 1.80748C0.264438 2.05212 0.254883 3.34185 0.254883 11.7268C0.254883 19.7559 0.266113 21.3916 0.322067 21.5252C0.409791 21.7344 0.657495 21.9388 0.872002 21.9789C1.26181 22.0518 1.27816 22.0406 3.58351 20.1268L5.77418 18.3081L6.03356 18.5217C6.17625 18.6392 7.03 19.3428 7.93078 20.0853C8.83161 20.8278 9.68146 21.4999 9.81932 21.5789C10.0201 21.6938 10.1448 21.7265 10.4451 21.7432C11.14 21.7819 11.034 21.8566 14.812 18.6597L15.2267 18.3089L17.4169 20.1272C19.7218 22.0406 19.7382 22.0518 20.128 21.9789C20.3425 21.9388 20.5902 21.7344 20.6779 21.5252C20.7338 21.3916 20.7451 19.7559 20.7451 11.7268C20.7451 3.23065 20.7362 2.05447 20.6697 1.80007C20.4484 0.953308 19.7919 0.301102 18.9378 0.0793476C18.5196 -0.0291979 2.43935 -0.025074 2.03359 0.083717ZM16.4409 4.05935C16.6994 4.2517 16.78 4.4086 16.78 4.71907C16.78 5.02953 16.6994 5.18644 16.4409 5.37878C16.3057 5.47947 16.2736 5.48011 10.6072 5.49455C6.7023 5.50456 4.85281 5.49278 4.72938 5.45714C4.22895 5.31275 4.03557 4.6305 4.37952 4.22308C4.63525 3.92017 4.2849 3.93578 10.558 3.94746C16.2772 3.95807 16.3056 3.95861 16.4409 4.05935ZM16.4409 7.98682C16.6994 8.17917 16.78 8.33607 16.78 8.64654C16.78 8.957 16.6994 9.11391 16.4409 9.30625C16.3057 9.40694 16.2736 9.40758 10.6072 9.42202C6.7023 9.43203 4.85281 9.42025 4.72938 9.38461C4.22895 9.24022 4.03557 8.55797 4.37952 8.15055C4.63525 7.84764 4.2849 7.86325 10.558 7.87494C16.2772 7.88554 16.3056 7.88608 16.4409 7.98682ZM16.4409 11.9143C16.6994 12.1066 16.78 12.2635 16.78 12.574C16.78 12.8845 16.6994 13.0414 16.4409 13.2337C16.3057 13.3344 16.2736 13.3351 10.6072 13.3495C6.7023 13.3595 4.85281 13.3477 4.72938 13.3121C4.22895 13.1677 4.03557 12.4854 4.37952 12.078C4.63525 11.7751 4.2849 11.7907 10.558 11.8024C16.2772 11.813 16.3056 11.8136 16.4409 11.9143Z"
								fill="#C6C6C6" />
						</svg>
					</span>
					<span :class="[
						$route.name === 'home.feeds' ? 'text-fatou-blue' : 'text-fatou-gray-400',
						'font-semibold',
					]">
						Buzz
					</span>
				</router-link>
			</li>
			<li>
				<router-link to="/founders" class="flex items-center space-x-1.5">
					<span v-if="$route.name === 'home.founders' || $route.name === 'home.founders.create'">
						<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M10.6889 0.0791377C10.5908 0.131023 10.4947 0.229894 10.4419 0.333451C10.3604 0.493277 10.3555 0.585098 10.3555 1.94642C10.3555 3.3083 10.3604 3.39952 10.442 3.55956C10.5392 3.7503 10.7868 3.90234 11 3.90234C11.2132 3.90234 11.4608 3.7503 11.558 3.55956C11.6396 3.39952 11.6445 3.3083 11.6445 1.94642C11.6445 0.584539 11.6396 0.49332 11.558 0.333279C11.3995 0.0223515 11.0113 -0.0911351 10.6889 0.0791377ZM3.45159 3.12591C3.15541 3.26046 3.01258 3.55715 3.0953 3.86598C3.13835 4.02675 3.28075 4.18915 4.11722 5.03149C5.17443 6.09607 5.32778 6.21007 5.63338 6.1584C5.87443 6.11769 6.12455 5.86747 6.16524 5.62631C6.21689 5.32054 6.10298 5.16716 5.03882 4.10976C4.23805 3.3141 4.02935 3.12917 3.88867 3.0904C3.66725 3.02944 3.6633 3.02974 3.45159 3.12591ZM18.0898 3.09341C17.978 3.12543 17.6884 3.38611 16.9612 4.10915C15.8971 5.16716 15.7831 5.32067 15.8348 5.62631C15.8754 5.86747 16.1256 6.11769 16.3666 6.1584C16.6722 6.21007 16.8256 6.09607 17.8828 5.03149C18.7242 4.18417 18.8615 4.02739 18.9053 3.8637C18.9475 3.70606 18.9444 3.64429 18.8866 3.4928C18.8056 3.28057 18.7258 3.1995 18.5086 3.10871C18.3303 3.03417 18.3005 3.0331 18.0898 3.09341ZM10.5059 5.21775C9.05566 5.36451 7.87699 5.90998 6.89386 6.88923C6.22725 7.55326 5.75622 8.31843 5.48453 9.17882C5.28206 9.82006 5.22457 10.2287 5.22595 11.0167C5.22702 11.6505 5.24214 11.8117 5.33973 12.231C5.60545 13.3726 5.98559 14.0558 7.00812 15.2295C7.48456 15.7764 7.71371 16.3802 7.77146 17.241C7.79818 17.6396 7.82143 17.7541 7.89736 17.8608C8.09557 18.1392 8.00297 18.1311 11 18.1311C13.997 18.1311 13.9044 18.1392 14.1026 17.8608C14.1779 17.755 14.2021 17.6386 14.2289 17.2535C14.2643 16.745 14.3317 16.4357 14.4937 16.0369C14.6364 15.6855 14.7813 15.4703 15.1623 15.0435C15.5745 14.582 15.7852 14.2964 16.0403 13.8539C16.7019 12.7063 16.939 11.2864 16.6944 9.93716C16.2749 7.6232 14.4809 5.79409 12.1685 5.32264C11.7452 5.23633 10.8686 5.18104 10.5059 5.21775ZM11.3019 7.85773C11.4926 7.95506 11.6445 8.20271 11.6445 8.41601C11.6445 8.7563 11.3268 9.06005 10.9695 9.06147C10.7614 9.06228 10.3057 9.16936 10.1277 9.25925C9.66758 9.49177 9.3729 9.82926 9.17297 10.3527C8.93763 10.9688 8.41049 11.1369 8.03941 10.7141C7.86504 10.5154 7.8326 10.3124 7.92705 10.0112C8.27518 8.90091 9.2052 8.06773 10.3555 7.83564C10.7835 7.74928 11.104 7.75676 11.3019 7.85773ZM0.33348 10.4391C0.152066 10.5349 0 10.7885 0 10.9952C0 11.2086 0.15198 11.4562 0.342633 11.5535C0.502605 11.6352 0.593785 11.6401 1.95508 11.6401C3.31637 11.6401 3.40755 11.6352 3.56752 11.5535C3.75818 11.4562 3.91016 11.2086 3.91016 10.9952C3.91016 10.7819 3.75818 10.5343 3.56752 10.437C3.40725 10.3552 3.31848 10.3505 1.94605 10.3523C0.585492 10.3541 0.484043 10.3596 0.33348 10.4391ZM18.4233 10.4391C18.2419 10.5349 18.0898 10.7885 18.0898 10.9952C18.0898 11.2086 18.2418 11.4562 18.4325 11.5535C18.5924 11.6352 18.6836 11.6401 20.0449 11.6401C21.4062 11.6401 21.4974 11.6352 21.6574 11.5535C21.848 11.4562 22 11.2086 22 10.9952C22 10.7819 21.848 10.5343 21.6574 10.437C21.4971 10.3552 21.4083 10.3505 20.0359 10.3523C18.6753 10.3541 18.5739 10.3596 18.4233 10.4391ZM8.42188 19.8018C8.42188 20.0113 8.4416 20.2869 8.46575 20.4142C8.6121 21.1862 9.23532 21.8097 10.007 21.9561C10.1342 21.9803 10.5811 22 11 22C11.4189 22 11.8658 21.9803 11.993 21.9561C12.7647 21.8097 13.3879 21.1862 13.5343 20.4142C13.5584 20.2869 13.5781 20.0113 13.5781 19.8018V19.4208H11H8.42188V19.8018Z"
								fill="#21BCD1" />
						</svg>
					</span>
					<span v-else>
						<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M10.6889 0.0791377C10.5908 0.131023 10.4947 0.229894 10.4419 0.333451C10.3604 0.493277 10.3555 0.585098 10.3555 1.94642C10.3555 3.3083 10.3604 3.39952 10.442 3.55956C10.5392 3.7503 10.7868 3.90234 11 3.90234C11.2132 3.90234 11.4608 3.7503 11.558 3.55956C11.6396 3.39952 11.6445 3.3083 11.6445 1.94642C11.6445 0.584539 11.6396 0.49332 11.558 0.333279C11.3995 0.0223515 11.0113 -0.0911351 10.6889 0.0791377ZM3.45159 3.12591C3.15541 3.26046 3.01258 3.55715 3.0953 3.86598C3.13835 4.02675 3.28075 4.18915 4.11722 5.03149C5.17443 6.09607 5.32778 6.21007 5.63338 6.1584C5.87443 6.11769 6.12455 5.86747 6.16524 5.62631C6.21689 5.32054 6.10298 5.16716 5.03882 4.10976C4.23805 3.3141 4.02935 3.12917 3.88867 3.0904C3.66725 3.02944 3.6633 3.02974 3.45159 3.12591ZM18.0898 3.09341C17.978 3.12543 17.6884 3.38611 16.9612 4.10915C15.8971 5.16716 15.7831 5.32067 15.8348 5.62631C15.8754 5.86747 16.1256 6.11769 16.3666 6.1584C16.6722 6.21007 16.8256 6.09607 17.8828 5.03149C18.7242 4.18417 18.8615 4.02739 18.9053 3.8637C18.9475 3.70606 18.9444 3.64429 18.8866 3.4928C18.8056 3.28057 18.7258 3.1995 18.5086 3.10871C18.3303 3.03417 18.3005 3.0331 18.0898 3.09341ZM10.5059 5.21775C9.05566 5.36451 7.87699 5.90998 6.89386 6.88923C6.22725 7.55326 5.75622 8.31843 5.48453 9.17882C5.28206 9.82006 5.22457 10.2287 5.22595 11.0167C5.22702 11.6505 5.24214 11.8117 5.33973 12.231C5.60545 13.3726 5.98559 14.0558 7.00812 15.2295C7.48456 15.7764 7.71371 16.3802 7.77146 17.241C7.79818 17.6396 7.82143 17.7541 7.89736 17.8608C8.09557 18.1392 8.00297 18.1311 11 18.1311C13.997 18.1311 13.9044 18.1392 14.1026 17.8608C14.1779 17.755 14.2021 17.6386 14.2289 17.2535C14.2643 16.745 14.3317 16.4357 14.4937 16.0369C14.6364 15.6855 14.7813 15.4703 15.1623 15.0435C15.5745 14.582 15.7852 14.2964 16.0403 13.8539C16.7019 12.7063 16.939 11.2864 16.6944 9.93716C16.2749 7.6232 14.4809 5.79409 12.1685 5.32264C11.7452 5.23633 10.8686 5.18104 10.5059 5.21775ZM11.3019 7.85773C11.4926 7.95506 11.6445 8.20271 11.6445 8.41601C11.6445 8.7563 11.3268 9.06005 10.9695 9.06147C10.7614 9.06228 10.3057 9.16936 10.1277 9.25925C9.66758 9.49177 9.3729 9.82926 9.17297 10.3527C8.93763 10.9688 8.41049 11.1369 8.03941 10.7141C7.86504 10.5154 7.8326 10.3124 7.92705 10.0112C8.27518 8.90091 9.2052 8.06773 10.3555 7.83564C10.7835 7.74928 11.104 7.75676 11.3019 7.85773ZM0.33348 10.4391C0.152066 10.5349 0 10.7885 0 10.9952C0 11.2086 0.15198 11.4562 0.342633 11.5535C0.502605 11.6352 0.593785 11.6401 1.95508 11.6401C3.31637 11.6401 3.40755 11.6352 3.56752 11.5535C3.75818 11.4562 3.91016 11.2086 3.91016 10.9952C3.91016 10.7819 3.75818 10.5343 3.56752 10.437C3.40725 10.3552 3.31848 10.3505 1.94605 10.3523C0.585492 10.3541 0.484043 10.3596 0.33348 10.4391ZM18.4233 10.4391C18.2419 10.5349 18.0898 10.7885 18.0898 10.9952C18.0898 11.2086 18.2418 11.4562 18.4325 11.5535C18.5924 11.6352 18.6836 11.6401 20.0449 11.6401C21.4062 11.6401 21.4974 11.6352 21.6574 11.5535C21.848 11.4562 22 11.2086 22 10.9952C22 10.7819 21.848 10.5343 21.6574 10.437C21.4971 10.3552 21.4083 10.3505 20.0359 10.3523C18.6753 10.3541 18.5739 10.3596 18.4233 10.4391ZM8.42188 19.8018C8.42188 20.0113 8.4416 20.2869 8.46575 20.4142C8.6121 21.1862 9.23532 21.8097 10.007 21.9561C10.1342 21.9803 10.5811 22 11 22C11.4189 22 11.8658 21.9803 11.993 21.9561C12.7647 21.8097 13.3879 21.1862 13.5343 20.4142C13.5584 20.2869 13.5781 20.0113 13.5781 19.8018V19.4208H11H8.42188V19.8018Z"
								fill="#C6C6C6" />
						</svg>
					</span>
					<span :class="[
						$route.name === 'home.founders' || $route.name === 'home.founders.create'
							? 'text-fatou-blue'
							: 'text-fatou-gray-400',
						'font-semibold',
					]">
						Founders
					</span>
				</router-link>
			</li>
			<li>
				<router-link to="/vcs-founding" class="flex items-center space-x-1.5">
					<span v-if="$route.name === 'home.vcfounding'">
						<svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M21.3524 1.07199C20.019 0.512708 18.6845 0.299927 17.3508 0.299927C13.1168 0.299583 8.88319 2.44286 4.64922 2.44286C3.58737 2.44286 2.52622 2.30811 1.46437 1.97124C1.34509 1.93343 1.22547 1.91555 1.10859 1.91555C0.517 1.91555 0 2.37343 0 3.00902V13.9148C0 14.349 0.248531 14.7605 0.647625 14.9275C1.98103 15.4871 3.31547 15.6999 4.64922 15.6999C8.88319 15.6999 13.1172 13.5566 17.3511 13.5566C18.413 13.5566 19.4741 13.6914 20.536 14.0283C20.6552 14.0661 20.7749 14.084 20.8917 14.084C21.4833 14.084 22.0003 13.6261 22.0003 12.9905V2.08502C22 1.65052 21.7515 1.2394 21.3524 1.07199ZM11 11.2999C9.48097 11.2999 8.25 9.82215 8.25 7.99993C8.25 6.17736 9.48131 4.69993 11 4.69993C12.5187 4.69993 13.75 6.17736 13.75 7.99993C13.75 9.82283 12.5183 11.2999 11 11.2999Z"
								fill="#21BCD1" />
						</svg>
					</span>
					<span v-else>
						<svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M21.3524 1.07211C20.019 0.51283 18.6845 0.300049 17.3508 0.300049C13.1168 0.299705 8.88319 2.44299 4.64922 2.44299C3.58737 2.44299 2.52622 2.30824 1.46437 1.97136C1.34509 1.93355 1.22547 1.91567 1.10859 1.91567C0.517 1.91567 0 2.37355 0 3.00914V13.915C0 14.3491 0.248531 14.7606 0.647625 14.9276C1.98103 15.4873 3.31547 15.7 4.64922 15.7C8.88319 15.7 13.1172 13.5568 17.3511 13.5568C18.413 13.5568 19.4741 13.6915 20.536 14.0284C20.6552 14.0662 20.7749 14.0841 20.8917 14.0841C21.4833 14.0841 22.0003 13.6262 22.0003 12.9906V2.08514C22 1.65064 21.7515 1.23952 21.3524 1.07211ZM11 11.3C9.48097 11.3 8.25 9.82227 8.25 8.00005C8.25 6.17749 9.48131 4.70005 11 4.70005C12.5187 4.70005 13.75 6.17749 13.75 8.00005C13.75 9.82296 12.5183 11.3 11 11.3Z"
								fill="#C6C6C6" />
						</svg>
					</span>
					<span :class="[
						$route.name === 'home.vcfounding' ? 'text-fatou-blue' : 'text-fatou-gray-400',
						'font-semibold',
					]">
						VCs
					</span>
				</router-link>
			</li>
		</ul>

		<!-- mobile toggle menu -->
		<button @click="$emit('closeMobileMenu')" class="block lg:hidden">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-fatou-black" fill="none" viewBox="0 0 24 24"
				stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		</button>

		<!-- profile icon -->
		<div class="hidden lg:flex items-center space-x-2.5">
			<button @click="viewUserModal = true"
				class="p-3 rounded-full text-fatou-blue bg-fatou-blue-50 bg-opacity-50 active:scale-95 transform ease-in-out duration-200 hover:scale-105 focus:outline-none"
				title="See My Profile">
				<svg xmlns="http://www.w3.org/2000/svg" class="fill-current" viewBox="0 0 576 512" width="25"
					height="25">
					<path
						d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z" />
				</svg>
			</button>

			<button
				@click="this.$router.push({'path':'/auth/user/dashboard/contacts'})"
				class="p-3 rounded-full text-fatou-blue bg-fatou-blue-50 bg-opacity-50 active:scale-95 transform ease-in-out duration-200 hover:scale-105 focus:outline-none"
				title="Contacts">
				<svg  class="fill-current" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 512 512" width="25"
					height="25"><path class="cls-1" d="M361.91,49.28H148.09A44.78,44.78,0,0,0,103.36,94v21.13H85.59a11.34,11.34,0,0,0,0,22.68h17.77V244.66H85.59a11.34,11.34,0,0,0,0,22.68h17.77V374.19H85.59a11.34,11.34,0,0,0,0,22.68h17.77V418a44.78,44.78,0,0,0,44.73,44.72H361.91A44.78,44.78,0,0,0,406.64,418V94A44.78,44.78,0,0,0,361.91,49.28ZM384,418a22.07,22.07,0,0,1-22,22H148.09a22.07,22.07,0,0,1-22-22V396.87h17.77a11.34,11.34,0,0,0,0-22.68H126V267.34h17.77a11.34,11.34,0,1,0,0-22.68H126V137.81h17.77a11.34,11.34,0,1,0,0-22.68H126V94a22.07,22.07,0,0,1,22-22H361.91a22.07,22.07,0,0,1,22,22Z"/><path class="cls-1" d="M255,259.58a50,50,0,1,0-35.4-14.64A49.91,49.91,0,0,0,255,259.58Zm-19.36-69.4a27.38,27.38,0,1,1-8,19.36A27.33,27.33,0,0,1,235.64,190.18Z"/><path class="cls-1" d="M255,267.25a73.53,73.53,0,0,0-73.45,73.45A11.34,11.34,0,0,0,192.89,352H317.11a11.34,11.34,0,0,0,11.34-11.34A73.53,73.53,0,0,0,255,267.25Zm-49.49,62.11a50.77,50.77,0,0,1,99,0Z"/></svg>
				
			</button>


			<div class="dropdown dropdown-end dropdown-hover">
				<div tabindex="0">
					<div class="btn btn-clear !bg-fatou-light-200 p-2 px-4 rounded-full" @click="notificationsCount=0" >
						<span>
							<svg width="15" height="15" viewBox="0 0 13 15" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M6.15666 0.00652657C5.07126 0.113556 4.21791 0.428534 3.42919 1.01329C2.48582 1.71272 1.79875 2.73264 1.50805 3.86508C1.36299 4.43029 1.35045 4.67442 1.3498 6.94995L1.34916 9.0986L0.722159 10.0475C0.00878347 11.1273 -0.0161383 11.1828 0.00428155 11.6476C0.015826 11.9097 0.0306825 11.9701 0.135772 12.1816C0.332574 12.5777 0.706756 12.8573 1.15271 12.9414C1.40199 12.9884 11.5934 12.9862 11.8506 12.9391C12.3481 12.8479 12.7605 12.4978 12.931 12.0219C13.0251 11.7594 13.0227 11.3586 12.9256 11.1057C12.8852 11.0005 12.5836 10.5141 12.2462 10.0098L11.6395 9.10289L11.6388 6.9521C11.6382 4.67426 11.6257 4.43039 11.4806 3.86508C11.2439 2.94301 10.8144 2.20098 10.1142 1.50449C9.30993 0.704487 8.40921 0.24224 7.31432 0.0676221C7.00809 0.0188096 6.37241 -0.0147769 6.15666 0.00652657ZM4.56488 13.6659C4.56488 13.6769 4.60894 13.7749 4.66277 13.8837C4.8578 14.2778 5.18555 14.5934 5.60999 14.796C5.94195 14.9544 6.15335 15.0023 6.51039 14.9999C7.12826 14.9958 7.6685 14.7415 8.07532 14.2632C8.2016 14.1147 8.42375 13.7339 8.42375 13.6659C8.42375 13.6548 7.5555 13.6458 6.49431 13.6458C5.43313 13.6458 4.56488 13.6548 4.56488 13.6659Z"
									fill="#077685" />
							</svg>
						</span>
						<div style="background-color:#f55f5f;color:white;position:absolute;top:-8px" class="badge" v-if="notificationsCount>0">{{notificationsCount}}</div>
					</div>
				</div>
				<ul tabindex="0"
					class="p-2 border-2 shadow menu dropdown-content bg-base-100 rounded-box w-96 border-fatou-blue">
					<div class="flex justify-center w-full my-3">
						<div class="flex align-center ">
							<button class="text-1xl ml border-r-2 py-3 px-3  active "
								@click="switchTab('notifications')">Notifications</button>
							<button class="text-1xl py-3 px-3 active" @click="switchTab('networkRequest')">Network Request </button>
						</div>
						<!-- <div class="relative">
							
						</div> -->
					</div>

					<div v-if="currentTab === 'notifications'">
						<li v-for="(notification, index) in notifications">
							<div class="flex flex-col relative p-6">
								<div class="flex items-center w-full">
									<img src="/images/png/Minorityelect.png" alt="" class="w-12 h-12 mr-2" />
									<div class="flex flex-col flex-grow">
										<div class="flex justify-between">
											<span class="font-bold" style="font-weight: 600;">{{notification.title}}</span>
											<span class="text-xs text-fatou-gray" style="font-size:0.6rem">{{moment(notification.createdAt).fromNow()}}</span>
										</div>
										<div class="-mt-1 text-xs"></div>
										<div class="text-fatou-blue border-l-[3px] border-fatou-blue pl-2 text-xs">
											{{notification.description}}
										</div>
										
									</div>
									<div class="absolute right-5 top-1" @click="markReadNotification(index)">
										<button  class="bg-fatou-gray-700 focus:outline-none rounded-full ">
											<img style="height:15px" src="/images/svg/timesicon.svg" alt="close" />
										</button>
										</div>
								</div>
								<div class="w-full my-0 mt-2 divider"></div>
							</div>
						</li>
					
						<li class="mt-4">
							<a class="btn btn-primary !rounded-none hover:!text-fatou-blue !text-white">View all</a>
						</li>
					</div>

					<div v-else-if="currentTab === 'networkRequest'" class="overflow-y-scroll">
						<div class="hidden space-y-4 sm:w-full sm:block">
							<!--  -->
							<li>
								<div class="w-full px-8 py-6 mx-auto space-y-4 bg-white divide-y  rounded-xl divide-fatou-black-50">

									<!-- cards -->
									<div class="space-y-2 py-2.5">
										<!--  -->
										<div v-for="(cr,i) in connectionRequests"
											class="flex items-center justify-between px-6 py-4 border rounded-xl border-fatou-black-50">
											
												<img 
												@click='openUserModal(cr.from)'
													:src=" cr.from.avatar ? this.imageStorageUrl+'/'+cr.from.avatar : '/images/placeholder.jpg'"
													class=" box-content object-cover rounded-full cursor-pointer h-12 mx-auto my-4"
													:alt="`Profile Picture of ${cr.from.firstName} ${cr.from.lastName}`"
												/>
										
											<div>
												<h3 class="font-medium fs-15 text-fatou-black">{{cr.from.firstName+' '+cr.from.lastName}}</h3>
												<p class="fs-14 text-fatou-gray-600">{{cr.from.address.state+', '+cr.from.address.city}}</p>
											</div>
											<div class="space-y-1.5">
												<button v-if="cr.status==='pending'" @click="acceptConnectionRequest(cr._id)" class=" bg-transparent text-fatou-blue py-1.5 px-2 rounded-full font-medium border-2 border-fatou-blue flex items-center justify-center space-x-2 ">
													<span> <svg width="12" height="15" viewBox="0 0 12 13" fill="none"
															xmlns="http://www.w3.org/2000/svg">
															<path d="M6 3V10" stroke="#21BCD1" stroke-linecap="round"
																stroke-linejoin="round" />
															<path d="M2.5 6.5H9.5" stroke="#21BCD1" stroke-linecap="round"
																stroke-linejoin="round" />
														</svg> </span>
													<span class="fs-11"> Accept </span>
												</button>
												<button v-if="cr.status==='pending'" @click="removeConnectionRequest(cr)"
													class=" bg-fatou-blue text-white border-2 border-fatou-blue py-1.5 px-2 rounded-full font-medium flex items-center justify-center space-x-2 ">
													<span>
														<svg width="12" height="13" viewBox="0 0 12 13" fill="none"
															xmlns="http://www.w3.org/2000/svg">
															<path d="M1.5 3.5H2.5H10.5" stroke="white"
																stroke-linecap="round" stroke-linejoin="round" />
															<path
																d="M4 3.5V2.5C4 2.23478 4.10536 1.98043 4.29289 1.79289C4.48043 1.60536 4.73478 1.5 5 1.5H7C7.26522 1.5 7.51957 1.60536 7.70711 1.79289C7.89464 1.98043 8 2.23478 8 2.5V3.5M9.5 3.5V10.5C9.5 10.7652 9.39464 11.0196 9.20711 11.2071C9.01957 11.3946 8.76522 11.5 8.5 11.5H3.5C3.23478 11.5 2.98043 11.3946 2.79289 11.2071C2.60536 11.0196 2.5 10.7652 2.5 10.5V3.5H9.5Z"
																stroke="white" stroke-linecap="round"
																stroke-linejoin="round" />
															<path d="M5 6V9" stroke="white" stroke-linecap="round"
																stroke-linejoin="round" />
															<path d="M7 6V9" stroke="white" stroke-linecap="round"
																stroke-linejoin="round" />
														</svg>
													</span>
													<span class="fs-11"> Decline </span>
												</button>

												<button v-if="cr.status==='accepted'"
													class=" bg-fatou-blue text-white border-2 border-fatou-blue py-1.5 px-2 rounded-full font-medium flex items-center justify-center space-x-2 ">
													<span class="fs-11"> Added </span>
												</button>
											</div>
										</div>
									</div>
								</div>
							</li>
							<li>
								<a class="btn btn-primary !rounded-none hover:!text-fatou-blue !text-white" @click="this.$router.push({'path':'/auth/user/dashboard/contacts'})">View all</a>
							</li>
						</div>
					</div>
					<div>

					</div>
				</ul>
			</div>
			<!-- <div @click="$router.push({ name: 'user.dashboard.profile.settings' })" :class="[
				$route.name.includes('dashboard') ? 'border-[2px] border-fatou-blue rounded-full' : '',
				'cursor-pointer',
			]">
				<img v-if="currentUserAvatar != null" :src="imageStorageUrl+'/'+currentUserAvatar"
					class="rounded-full avatar" alt="User" />
				<img v-else src="/images/png/user_profile_pic.png" class="rounded-full avatar" alt="User" />
			</div> -->
			<div :class="[
				$route.name.includes('dashboard') ? ' dropdown  ' : '',
				'cursor-pointer dropdown',
			]">
				<label tabindex="0" class="m-1">
					<img v-if="currentUserAvatar != null" :src="imageStorageUrl + '/' + currentUserAvatar"
						class="border-[2px] border-fatou-blue rounded-full avatar cursor-pointer " alt="User" />
					<img v-else src="/images/png/user_profile_pic.png" class="border-[2px] border-fatou-blue rounded-full avatar cursor-pointer"
						alt="User" />
				</label>
				<ul tabindex="0" class="dropdown-content menu border-[2px] border-fatou-blue w-[10rem] shadow bg-base-100 rounded-box right-0 top-auto mt-3">
					<li class="hover:bg-fatou-blue-50 px-3 py-2" @click="$router.push({ name: 'user.dashboard.profile.settings' })">Settings</li>
					<li class="hover:bg-fatou-blue-50 px-3 py-2"  @click="logoutUser">Logout</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<style scoped>
.avatar {
	width: 50px;
	height: 50px;
}

.inactive {
	color: #92929D;
	font-weight: 600;
	border-bottom: 4px solid rgba(235, 228, 253, 0.4);
}

/* .active  { 
    color: #000;
    font-weight: 600;
    border-bottom: 4px solid #21BCD1;
} */

.active:active {
	color: #21BCD1;
	font-weight: 600;
	border-bottom: 1px solid #21BCD1;
}

.active:focus {
	color: #21BCD1;
	font-weight: 600;
	border-bottom: 1px solid #21BCD1;
}
</style>
