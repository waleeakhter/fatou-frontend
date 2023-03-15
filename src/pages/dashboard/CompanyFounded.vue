<script>
// libs
import ButtonOutline from '../../components/buttons/ButtonOutline.vue';
import ButtonBlue from '../../components/buttons/ButtonBlue.vue';
import foundersService from '../../services/founders.service';
import AddFounderModal from './modals/AddFounderModal.vue';
import moment from 'moment';
export default {
	components: {
    ButtonOutline,
    ButtonBlue,
    AddFounderModal
},
	data() {
		return {
			founders:[],
			moment:moment,
			openModal:false,
			founderToEdit:null,
			imageStorageUrl: import.meta.env.VITE_APP_SERVER_STORAGE_URL,
        }
    },
	mounted(){
		foundersService.getMyFounder({limit:100,page:1}).then((res)=>{
			this.founders=res.results
		}).catch((err)=>{

		})
	},
	methods: {
		selectForEdit(index){
			this.founderToEdit=this.founders[index]
			this.openModal=true

		},
		closeModal(){
			this.founderToEdit=null
			this.openModal=false
		}
	}
};
</script>
<template>

	<AddFounderModal v-if="openModal"  @close="closeModal" :founderInfo="founderToEdit"  />

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
				Company Founded 
			</div>
			<div class="w-full">
				<div class="w-full">
					<div v-for="(founder,index) in founders " class="mt-4 md:w-[80%] md:mx-auto flex flex-col gap-y-4">
						<div class="card border-[1px] border-fatou-gray-400">
							<div class="card-body flex md:flex-row md:justify-between p-4">
								<div class="flex">
									<img
										:src="founder.company?.logo?imageStorageUrl+'/company/'+founder.company?.logo:'/images/png/experience-1.png'"
										alt="experience"
										class="w-10 h-10 md:w-24 md:h-24 mr-4"
									/>
									<div>
										<p class="font-bold text-md md:text-lg">{{founder?.company?.name}}</p>
										<p class="text-fatou-gray-400 mt-1 md:mt-2 text-sm md:text-base">
											{{founder?.claimedBy?.address?.state+' '+founder?.claimedBy?.address?.country}}
										</p>
											<p class="text-fatou-gray-400 mt-1 md:mt-2 text-sm md:text-base">
												Additional Founders: {{
												(founder.company?.additionalFounder||founder.company?.additionalFounderTwo)?
												founder.company?.additionalFounder+' | '+founder.company?.additionalFounderTwo:''
												}}
											</p>
										<p class="text-fatou-gray-400 mt-1 md:mt-2 text-sm md:text-base">
											Founded: {{this.moment(founder.company?.founded).format('yyy')}}
										</p>
									</div>
								</div>
								<div class="flex items-center mt-4 md:mt-0">
									<div class="flex flex-col gap-y-2 w-full">
										<button
										@click="selectForEdit(index)"
											class="btn btn-outline btn-primary md:px-8 btn-xs md:btn-sm rounded-2xl"
										>
											Edit
										</button>
										<button  class="btn btn-danger md:px-8 btn-xs md:btn-sm rounded-2xl">
											Delete
										</button>
									</div>
								</div>
							</div>
						</div>
				</div>
				</div>
				
			</div>
		</div>
	</div>
</template>
