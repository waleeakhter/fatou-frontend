<script >
import { mapActions } from 'vuex';


// import ChangePassword from "../modals/ChangePassword.vue";
export default {
  data() {
    return {
      twoFactorAuth:false,
	  isLoading:false,
	  user:{}
    };
  },
  methods: {
   ...mapActions(['updateProfile', 'getAuthUser']),
   async saveTwoFactorAuth() {
	
	   this.isLoading = true;
		try {
			const payload={...this.user,twoFactorAuth:this.twoFactorAuth}
			if(this?.user?.college?._id){
				payload.college=this.user.college._id
			}
			await this.updateProfile(payload)
			this.getAuthUser()		
			this.isLoading = false;
			this.$notify({ type: 'success', title: 'Saved' });
		} catch (error) {
			this.isLoading	 = false;
		}

   }

  },
  mounted() {
    this.getAuthUser().then(({ data }) => {
		this.user=data.user
		this.twoFactorAuth=data.user.twoFactorAuth
	})
  },
};

</script>
<template>
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
                        Advance Security
                    </h3>
                </div>
			<div class="mb-5 sm:w-2/3 w-full mx-auto py-3">
				<ul class="space-y-2">
					<li>
                        <div class="flex items-center justify-between w-full border border-fatou-black-50 px-6 py-2.5 rounded-lg">
                            <span class="text-fatou-black">Use Two Factor Authentication</span>
                            <span>
                                <label class="switch">
                                <input v-model="twoFactorAuth" type="checkbox">
                                <span class="slider round"></span>
                                </label>
                            </span>
                        </div>
					</li>
					<!-- <li>
						<a class="!px-0">
							<div class="flex items-center justify-between w-full border border-fatou-black-50 px-6 py-2.5 rounded-lg">
								<span class="text-fatou-black">Change Password</span>
								<span
									>
                                    <button @click="isChangePasswordModal = true" class="btn px-6 btn-primary text-white text-xs rounded-full font-medium">
                                       Change
                                    </button>
								</span>
							</div>
						</a>
					</li> -->
				</ul>

                <div class="flex items-center justify-center py-2.5">
                    <button  :disabled="isLoading"  v-on:click="saveTwoFactorAuth" class="bg-fatou-blue text-white px-12 py-2.5 rounded-full">
                    Save
                </button>
                </div>
			</div>
		</div>
	</div>

	<!-- modals -->
	<!-- <ChangePassword v-if="isChangePasswordModal" v-on:close="isChangePasswordModal = false" /> -->
</template>

<style scoped>
@import url('../../../assets/css/switch.css');
</style>
