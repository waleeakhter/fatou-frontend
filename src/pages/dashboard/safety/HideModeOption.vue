<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      hide:false,
	  isLoading:false,
	  user:{}
    };
  },
  methods: {
   ...mapActions(['updateProfile', 'getAuthUser']),
   async saveHideMode() {
	
	   this.isLoading = true;
		try {
			const payload={...this.user,hideMode:this.hide}
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
		this.hide=data.user.hideMode
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
                        Hide Mode
                    </h3>
                </div>
			<div class="mb-5 sm:w-2/3 w-full mx-auto py-3">
				<ul class="space-y-2">
					<li>
                        <div class="flex items-center justify-between w-full border border-fatou-black-50 px-6 py-2.5 rounded-lg">
                            <span class="text-fatou-black">Hide my profile from database</span>
                            <span>
                                <label class="switch">
                                <input v-model="hide" type="checkbox">
                                <span class="slider round"></span>
                                </label>
                            </span>
                        </div>
					</li>
				</ul>
                <div class="flex items-center justify-center py-2.5">
                    <button  :disabled="isLoading"  v-on:click="saveHideMode" class="bg-fatou-blue text-white px-12 py-2.5 rounded-full">
                    Save
                </button>
                </div>
			</div>
		</div>
	</div>
</template>

<style scoped>
@import url('../../../assets/css/switch.css');
</style>
