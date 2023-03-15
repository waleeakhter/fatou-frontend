<script>
import usersService from '../../services/users.service'
import ViewProfileModal from '../dashboard/modals/ViewProfile.vue'
import { mapActions } from 'vuex'
import  _  from 'lodash';

export default {
     components: {
    ViewProfileModal,
  },
    data() {
        return {
            contacts: [],
            showMenu: false,
            activeTab: 'myContacts',
            selectedUser:null,
            totalPages: 0,
            limit: 5,
            page: 1,
            pagination: [],
            completeData:null,
            search:'',
            imageStorageUrl: import.meta.env.VITE_APP_SERVER_STORAGE_URL,
            loading:false,
            viewUserModal:false
        }
    },
    created(){
        this.pagination=this.computePagination(this.page,this.totalPages)
        this.getMyContacts()
    },
    watch:{
         totalPages: {
            handler: function () {
                this.pagination = this.computePagination(this.page, this.totalPages)
            },
            immediate: true,
        },
        search: {
            handler: _.debounce(function()  {
                     if ( this.activeTab=== 'myContacts') {
                    this.getMyContacts()
                    return
                }
            }, 1000),
            immediate: true,
        }
    },
    methods: {
        	...mapActions(['setActiveChatUser']),
         computePagination(current_page, last_page, onSides = 2) {
            let pages = [];
            for (let i = 1; i <= last_page; i++) {

                let offset = (i == 1 || last_page) ? onSides + 1 : onSides;

                if (i == 1 || (current_page - offset <= i && current_page + offset >= i) ||
                    i == current_page || i == last_page) {
                    pages.push(i);
                } else if (i == current_page - (offset + 1) || i == current_page + (offset + 1)) {
                    pages.push('...');
                }
            }
            return pages;
        },
        setActiveTab(tab) {
            this.page=1
            // this.totalPages=0
            // this.pagination=0
            // this.contacts=[]
            this.activeTab = tab
            if (tab === 'myContacts') {
                this.getMyContacts()
                return
            }
            if (tab === 'pendingRequests') {
                this.getMyPendingRequests()
                return
            }
            if (tab === 'sentRequests') {
                this.getMySentRequests()
                return
            }
            if (tab === 'blocked') {
                this.getMyBlocked()
                return
            }
        },
        getMyContacts() {
           this.loading=true
            usersService.getConnections({
                limit: this.limit,
                page: this.page,
                user: this.$store.state.auth.currentUser._id,
                q:this.search
            }).then(({ data }) => {
                this.completeData=data.results
                this.totalPages=data.totalPages
                const users=data.results.filter((user)=>user.friend!==null)
                console.log(users)
                this.contacts=users.map((u)=>u.friend)
            }).catch((error) => {
                this.$notify({ type: "error", title: 'Error', text: 'something went wrong'});
                console.log(error)
            }).finally(()=>{
                this.loading=false
            })
        },
        getMyPendingRequests() {
            this.loading=true
            usersService.getConnectionRequests({
                limit: this.limit,
                page: this.page,
                to:this.$store.state.auth.currentUser._id,
                status:'pending'
            }).then(({ data }) => {
                this.totalPages=data.totalPages
                this.contacts=data.results.map((u)=>u.from)
                this.completeData=data.results
            }).catch((error) => {
                this.$notify({ type: "error", title: 'Error', text: 'something went wrong'});
                console.log(error)
            }).finally(()=>{
                this.loading=false
            })
        },
        getMySentRequests() {
            this.loading=true
            usersService.getConnectionRequests({
                limit: this.limit,
                page: this.page,
                from:this.$store.state.auth.currentUser._id,
                status:'pending'
            }).then(({ data }) => {
                this.totalPages=data.totalPages
                this.contacts=data.results.map((u)=>u.to)
                this.completeData=data.results
            }).catch((error) => {
                this.$notify({ type: "error", title: 'Error', text: 'something went wrong'});
                console.log(error)
            }).finally(()=>{
                this.loading=false
            })
        },
        getMyBlocked() {
            this.loading=true
            usersService.getBlockedConnections  ({
                limit: this.limit,
                page: this.page,
                user:this.$store.state.auth.currentUser._id,
            }).then(({ data }) => {
                this.totalPages=data.totalPages
                this.contacts=data.results.map((u)=>u.friend)
                this.completeData=data.results
            }).catch((error) => {
                this.$notify({ type: "error", title: 'Error', text: 'something went wrong'});
                console.log(error)
            }).finally(()=>{
                this.loading=false
            })
        },
        onPageChange(nextPage){
            if (nextPage !== '...') {
                this.page = nextPage
                if (this.activeTab === 'myContacts') {
                    this.getMyContacts()
                }
                if (tab === 'pendingRequests') {
                this.getMyPendingRequests()
                return
                }
                if (tab === 'sentRequests') {
                    this.getMySentRequests()
                    return
                }
                if (tab === 'blocked') {
                    this.getMyBlocked()
                    return
                }
            }
              
        },
        blockUser(index){
            usersService.blockConnection(this.completeData[index]._id).then((res)=>{
                this.getMyContacts()
            }).catch((err)=>{
                console.log(err)
                this.$notify({ type: "error", title: 'Error', text: 'something went wrong'});
            })
        },
        unblockUser(index){
            console.log(this.completeData)
            usersService.unblockConnection(this.completeData[index]._id).then((res)=>{
                this.getMyBlocked()
            }).catch((err)=>{
                console.log(err)
                this.$notify({ type: "error", title: 'Error', text: 'something went wrong'});

            })
        },
        removeConnection(index){
            usersService.removeConnection(this.completeData[index]._id).then((res)=>{
                this.getMyContacts()
            }).catch((err)=>{
                console.log(err)
                this.$notify({ type: "error", title: 'Error', text: 'something went wrong'});

            })
        },
        removeConnectionRequest(index){
            console.log(this.completeData[index])
            let data=this.completeData[index]
            usersService.removeConnectionRequest({to:data.to._id,from:data.from._id}).then(()=>{
                this.getMySentRequests()
            }).catch(()=>{
                console.log(err)
                this.$notify({ type: "error", title: 'Error', text: 'something went wrong'});

            })
        },
        declineConnectionRequest(index){
            console.log(this.completeData[index])
            let data=this.completeData[index]
            usersService.removeConnectionRequest({to:data.to._id,from:data.from._id}).then(()=>{
                this.getMyPendingRequests()
            }).catch(()=>{
                console.log(err)
                this.$notify({ type: "error", title: 'Error', text: 'something went wrong'});

            })
        },
        acceptConnectionRequest(index){
            let data=this.completeData[index]
            usersService.acceptConnection(data._id,{status:'accepted'}).then((result) => {
                this.getMyPendingRequests()
            }).catch((err) => {
                console.log(err)
                this.$notify({ type: "error", title: 'Error', text: 'something went wrong'});

            });
        },
        selectUserForChat(user){
            this.setActiveChatUser(user).then(()=>{}).catch((err)=>{
                this.$notify({ type: "warning", title: 'Opps!', text: 'Cannot Chat hide mode is enabled'});
            })
        },
        openUserModal(user){
            this.selectedUser=user
            this.viewUserModal = !this.viewUserModal
        }


    }
}
</script>
<template>
<ViewProfileModal
    v-if="viewUserModal"
    v-on:close="viewUserModal = !viewUserModal"
    :user="selectedUser"

  />
    <div class="mt-16 card rounded-lg bg-white  mx-auto">
        <div class="card-body">
            <div class="flex items-center ">
                <span @click="$router.back()" class="mr-4 cursor-pointer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="black" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </span>
                <!--  -->
                <h3 class="text-fatou-black text-xl font-medium"> Contacts </h3>
            </div>

            <!--  -->

            <div class="w-full flex items-center justify-end py-2 sm:py-0">
                <div class="input flex items-center pl-2 rounded-lg py-1">
                    <span>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M24.903 26.1428L17.283 18.5214C13.8932 20.9314 9.22222 20.3419 6.53746 17.1653C3.85271 13.9888 4.04984 9.28489 6.99097 6.34411C9.93131 3.40204 14.6357 3.20405 17.8128 5.88866C20.99 8.57327 21.5798 13.2447 19.1696 16.6348L26.7896 24.2561L24.9043 26.1414L24.903 26.1428ZM12.647 6.66676C10.1186 6.66619 7.93722 8.44101 7.4236 10.9167C6.90998 13.3924 8.20525 15.8885 10.5252 16.8938C12.8452 17.899 15.5522 17.1372 17.0073 15.0695C18.4624 13.0018 18.2657 10.1965 16.5363 8.35211L17.343 9.15211L16.4336 8.24544L16.4176 8.22944C15.42 7.22568 14.0622 6.66294 12.647 6.66676Z"
                                fill="#ADB5BD" />
                        </svg>
                    </span>
                    <input type="search" v-model="search" class="w-full h-full bg-fatou-gray-200 focus:outline-none py-1.5 px-3"
                        placeholder="Search Contact" />
                </div>
            </div>
            <div class="flex md:flex-nowrap flex-wrap">
                <ul class="menu p-4 overflow-y-auto lg:w-1/4 bg-base-100 text-base-content">
                    <!-- Sidebar content here -->
                    <li @click="setActiveTab('myContacts')"
                        :class="{'w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 cursor-pointer':true,'bg-fatou-blue':activeTab==='myContacts'}">My
                        Contacts</li>
                    <li @click="setActiveTab('pendingRequests')"
                        :class="{'w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 cursor-pointer':true,'bg-fatou-blue':activeTab==='pendingRequests'}">Pending
                        Requests</li>
                    <li @click="setActiveTab('sentRequests')"
                        :class="{'w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 cursor-pointer':true,'bg-fatou-blue':activeTab==='sentRequests'}">Sent
                        Request</li>
                    <li @click="setActiveTab('blocked')"
                        :class="{'w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 cursor-pointer':true,'bg-fatou-blue':activeTab==='blocked'}">Blocked
                        Users</li>

                </ul>
                <div class="grid sm:grid-cols-3 grid-cols-1 gap-6 py-8">


                    <svg v-if="loading" role="status" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <!--  -->
                    <div v-for="(friend,index) in contacts"
                    
                        class="border border-fatou-black-50 text-fatou-gray-600 rounded-xl flex flex-col items-center space-y-3 p-6 relative">

                       
                        <!-- menus -->
                      <div class="dropdown absolute right-3 top-4" v-if="activeTab==='myContacts'">
                         <div tabindex="0">
                            <button class="text-fatou-blue">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"> <path  d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /> </svg>
                            </button>
                        </div>
                            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <button  @click="blockUser(index)" class="bg-transparent text-fatou-red py-2  rounded-full font-medium border-2 border-fatou-red flex items-center justify-center space-x-2">
                                        <span>
                                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.0002 25.6668C20.4435 25.6668 25.6668 20.4435 25.6668 14.0002C25.6668 7.55684 20.4435 2.3335 14.0002 2.3335C7.55684 2.3335 2.3335 7.55684 2.3335 14.0002C2.3335 20.4435 7.55684 25.6668 14.0002 25.6668Z" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M17.5 10.5L10.5 17.5" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M10.5 10.5L17.5 17.5" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>

                                        </span>
                                        <span> Block </span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                            
                      
                        <!--  -->
                        <img @click="openUserModal(friend)"  :src=" friend?.avatar ? this.imageStorageUrl+'/'+friend.avatar : '/images/placeholder.jpg'"
                            class="rounded-full h-36 w-36 pt-2 cursor-pointer" alt="">

                        <div>
                            <h2 class="text-fatou-black text-xl font-medium flex items-center">{{friend.firstName+' '+friend.lastName}}
                                &nbsp; <a v-if="friend.linkedInUrl" :href="friend.linkedInUrl"  target="_blank" >
                                 <img  src="/images/svg/linkedin.svg" alt="linkedin" class="h-5 w-5" />
                                 </a>
                            </h2>
                            <!-- <p class="text-fatou-black text-sm">Engineer @ Google</p> -->
                        </div>
                        <p class="text-sm text-fatou-black">Location: {{friend.address.state+', '+friend.address.city}}</p>

                        <!-- <div class="flex flex-col items-center justify-center">
                            <span class="text-fatou-black font-medium">Reason for joining?</span>
                            <div v-for="(r) in friend.reasonForJoining" class="flex items-center space-x-1 px-3.5 py-1 bg-fatou-gray-700 rounded-full">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.08366 8.75V7.91667C7.08366 7.47464 6.90806 7.05072 6.5955 6.73816C6.28294 6.4256 5.85902 6.25 5.41699 6.25H2.08366C1.64163 6.25 1.21771 6.4256 0.905148 6.73816C0.592587 7.05072 0.416992 7.47464 0.416992 7.91667V8.75"
                                        stroke="#21BCD1" stroke-width="0.8" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M3.74967 4.58333C4.67015 4.58333 5.41634 3.83714 5.41634 2.91667C5.41634 1.99619 4.67015 1.25 3.74967 1.25C2.8292 1.25 2.08301 1.99619 2.08301 2.91667C2.08301 3.83714 2.8292 4.58333 3.74967 4.58333Z"
                                        stroke="#21BCD1" stroke-width="0.8" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M9.58301 8.75003V7.9167C9.58273 7.54742 9.45982 7.18869 9.23358 6.89683C9.00733 6.60497 8.69056 6.39652 8.33301 6.3042"
                                        stroke="#21BCD1" stroke-width="0.8" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M6.66699 1.3042C7.0255 1.39599 7.34326 1.60449 7.57017 1.89683C7.79709 2.18917 7.92026 2.54871 7.92026 2.91878C7.92026 3.28885 7.79709 3.6484 7.57017 3.94074C7.34326 4.23307 7.0255 4.44157 6.66699 4.53337"
                                        stroke="#21BCD1" stroke-width="0.8" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <span class="text-fatou-blue text-xs ">{{r}}</span>
                            </div>
                        </div> -->





                        <template v-if="activeTab==='myContacts'">
                            
                            <button
                              @click="removeConnection(index)"
                                class="h-8 w-2/3 bg-transparent text-fatou-blue py-1.5 px-2 rounded-full font-medium border-2 border-fatou-blue flex items-center justify-center space-x-1">
                               Remove
                            </button>
                            <button
                                @click="selectUserForChat(friend)"
                                class="bg-fatou-blue w-2/3 text-white py-2 px-8 rounded-full font-medium flex items-center justify-center space-x-2">
                               Message
                            </button>

                        </template>


                         <template v-if="activeTab==='pendingRequests'">
                            <button
                            @click="acceptConnectionRequest(index)"
                                class="h-8 w-2/3 bg-transparent text-fatou-blue py-1.5 px-2 rounded-full font-medium border-2 border-fatou-blue flex items-center justify-center space-x-1">
                               Accept
                            </button>
                            <button
                                @click='declineConnectionRequest(index)'
                                class="bg-fatou-blue w-2/3 text-white py-2 px-8 rounded-full font-medium flex items-center justify-center space-x-2">
                               Decline
                            </button>
                        </template>


                        <template v-if="activeTab==='sentRequests'">
                            <button
                                @click='removeConnectionRequest(index)'
                                class="h-8 w-2/3 bg-transparent text-fatou-blue py-1.5 px-2 rounded-full font-medium border-2 border-fatou-blue flex items-center justify-center space-x-1">
                               Withdraw 
                            </button>
                        </template>


                         <template v-if="activeTab==='blocked'">
                            <button
                                @click="unblockUser(index)"
                                class="h-8 w-2/3 bg-transparent text-fatou-blue py-1.5 px-2 rounded-full font-medium border-2 border-fatou-blue flex items-center justify-center space-x-1">
                               Unblock
                            </button>
                        </template>




                    </div>
                    
                </div>
            </div>

            <!-- cards -->
            <!--  -->

           <div class="btn-group">
                <button v-for="(currPage, index) in pagination"
                    :class="{ 'btn': true, 'btn-active': currPage === page }" @click="onPageChange(currPage)">{{
                    currPage
                    }}</button>

            </div>
        </div>
    </div>
</template>