
<script>
import { io } from "socket.io-client";
import {mapActions} from 'vuex'
import DiscordPicker from 'vue3-discordpicker'
import usersService from "../../services/users.service";
import userService from "../../services/user.service";
import ViewProfileModal from "../dashboard/modals/ViewProfile.vue";
import moment from 'moment';

export default {
	components: {
    DiscordPicker,
	ViewProfileModal
  },	
	emits: ['close'],
	props:['isShowChatModal'],
	data() {
		return {
			moment: moment,
			activeChat: false,
			authUser: this.$store.state.auth.currentUser,
			chatListPagination: {
				limit: 10000000,
				page: 0
			},
			messagePagination: {
				limit: 10,
				page: 0
			},
			chatUsers: [],
			activeChatUser: null,
			imageStorageUrl: import.meta.env.VITE_APP_SERVER_STORAGE_URL,
			message: '',
			files:[],
			chat: [],
			socketId: null,
			socket: null,
			serverUrl:import.meta.env.VITE_APP_SERVER_BASE_URL,
			userTyping:false,
			isOnline:false,
			totalUnread:0,
			viewUserModal:false
		}
	},
	 watch:{
        '$store.state.chat.activeChatUser'(){
			
			if(this.$store.state.chat.activeChatUser){
				if (this.$store.state?.chat?.activeChatUser) {
					//if user donot exist in list already then add 
					{
						const exists = this.chatUsers.some((user) => {
							return user._id === this.$store.state?.chat?.activeChatUser._id
						})
						if (!exists) {
							this.chatUsers.push(this.$store.state?.chat?.activeChatUser)
						}
					}
					
					this.selectUserForChat(this.$store.state.chat.activeChatUser)
				 }
			}
        },
		'totalUnread'(){
			this.setTotalUnread(this.totalUnread)
		},
		'$store.state.auth.currentUser.hideMode'(){
			if(this.$store.state.auth.currentUser.hideMode){
				this.activeChat=false
				setTimeout(() => {
					this.unsetUser()
				}, 500);
				// setTimeout(() => {
				// 	console.log('setting chat user null')
				// 	this.setActiveChatUser({})
				// }, 1000);
			}
		},
		'isShowChatModal'(newVal,oldVal){
			console.log({newVal,oldVal})
		}
		
    },
	created() {
		
		this.socket = io(this.serverUrl, { query: "userId=" + this.$store.state.auth.currentUser._id+"&name="+this.authUser.firstName });
		// client-side
		this.socket.on("connect", () => {

			console.log(this.socket.id)
		});

		this.socket.on("disconnect", () => {
			console.log(this.socket.id); // undefined
		})

		this.socket.on('receiveMessage', ({ msg }) => {	
			console.log({msg})	
			if(this.activeChatUser && msg.from===this.activeChatUser._id){
				this.chat.push(msg)
				this.chatScrollDown()
				this.markRead(msg)
				
			}else{
				this.chatUsers=this.chatUsers.map((chatUser)=>{
				if(chatUser._id===msg.from){
					chatUser.unreadMsgCount=chatUser.unreadMsgCount+1
				}
				return chatUser
			})
				this.totalUnread++
			}

			//updating last msg
			const ind=this.chatUsers.findIndex((u)=>u._id===msg.from)
			this.chatUsers[ind]={...this.chatUsers[ind],lastMsg:msg}



			//adding user in list  if not already in list 
			const exists = this.chatUsers.some((user) => {
				console.log(user._id , msg.from)
				return user._id === msg.from
			})
			if (!exists) {
				userService.getUserById(msg.from).then((res)=>{
					res.lastMsg=msg
					res.unreadMsgCount=1
					this.chatUsers.unshift(res)
				})
			}
			
		})
		
		this.socket.on('receiveIsTyping', ({ typing,from }) => {

			if(typing && from===this.activeChatUser?._id  ){
				this.userTyping=true
				setTimeout(()=>{
					this.userTyping=false
				}, 1000);
			}
		})

		this.socket.emit('getPeople', { pageOptions: { ...this.chatListPagination },authUser:this.authUser }, (response) => {
			console.log({response})
			this.chatUsers = response.data
			this.chatUsers.forEach((user)=>{
				this.totalUnread+=user.unreadMsgCount
			})
			
		})

		// setInterval(() => {
		// 	if(this.activeChatUser && this.activeChatUser._id!=='' && this.activeChatUser._id!==null){
		// 		this.socket.emit('isOnline', { user:this.activeChatUser._id }, (response) => {
		// 			this.isOnline=response.isOnline
		// 		})
		// 	}
		// }, 500);

	},
	methods: {
		...mapActions(['setTotalUnread','setActiveChatUser','unsetUser']),
		async selectUserForChat(user) {
			this.isOnline=false
			this.messagePagination.limit = 10
			this.messagePagination.page = 0
			this.chat=[]
			this.activeChat = true
			this.activeChatUser = user
			await this.getMessages()
			this.chatScrollDown()
			const scrollDiv = this.$refs.chatbox
			scrollDiv.addEventListener('scroll', e => {
				if (scrollDiv.scrollTop === 0) {
					this.messagePagination.page++
					this.getMessages()
				}
			});
			this.markReadAll({from:user._id,to:this.authUser._id})
			this.chatUsers=this.chatUsers.map((chatUser)=>{
				if(chatUser._id===user._id){
					this.totalUnread-=chatUser.unreadMsgCount
					chatUser.unreadMsgCount=0
				}
				return chatUser
			})
			
			// console.log(this.activeChatUser)
		},
		getMessages() {
			return new Promise(resolve => {
				if(this.activeChatUser?._id){
					this.socket.emit('getMessages', { to: this.activeChatUser._id, from: this.authUser._id, pageOptions: this.messagePagination }, (response) => {
						// console.log(response.msg);
						response.msg.reverse()
						this.chat.unshift(...response.msg) 
						resolve(true)
					})
				}else{
					resolve(true)
				}
				
			});
		},
		async sendMessage() {
			console.log('chatUsers',this.chatUsers)
			if(this.$refs.file.files.length>0){
				let fd=new FormData();
				fd.append('to',this.activeChatUser._id)
				fd.append('from',this.authUser._id)
				fd.append('message',this.message)
				Array.from(this.$refs.file.files).forEach((file,index)=>{
					fd.append('files['+index+']',file)

				})
				try {
					let {data}=await usersService.sendChatFiles(fd)
					
				 	this.$refs.file.value=null;
					 this.files=[]
					 data.msg.withFileUploaded=true
					this.socket.emit('sendMessage', { message:data.msg }, (response) => {
							this.message = ''
							this.chat.push(response.msg)
							this.chatScrollDown()

							
							
						
					})
				} catch (error) {
					
				}
				 
			}else{
				if(this.message===''){ return }
				const message = { to: this.activeChatUser._id, from: this.authUser._id, message: this.message }
				this.socket.emit('sendMessage', { message }, (response) => {
					this.message = ''
					this.chat.push(response.msg)
					this.chatScrollDown()
					const ind=this.chatUsers.findIndex((u)=>u._id===this.activeChatUser._id)
					this.chatUsers[ind]={...this.chatUsers[ind],lastMsg:response.msg}
				})
			}
			
			

		},
		chatScrollDown() {
			setTimeout(() => {
				this?.$refs?.chatbox?.scroll({ top: this.$refs.chatbox.scrollHeight, behavior: 'smooth' })
			})
		},
		setEmoji (emoji) {
      		this.message+=emoji
    	},
		selectFile(e){
				this.files=Array.from(e.target.files).map(file=>URL.createObjectURL(file))

			// Do something with chosen file 
		},
		isTyping(){
				this.socket.emit('isTyping', {to: this.activeChatUser._id,from:this.authUser._id  } )
		},
		markRead(msg){
			msg.read=true
			this.socket.emit('markRead', {msg}, (response) => { })
		},
		markReadAll(msg){
			this.socket.emit('markReadAll',{msg})	
		},
		closeChatList(){
			
			this.$emit('close')
		},
		closeChatDialog(){
			this.activeChat = false
			this.activeChatUser=null
			console.log(this.activeChatUser)

		},
		async deleteChat(activeChatUserId){
		
			
			try {
				await usersService.deleteChat(activeChatUserId)
				this.chat=[]
				const index=this.chatUsers.findIndex((user)=>user._id===activeChatUserId)
				this.chatUsers.splice(index,1)
				this.activeChat=false
			} catch (error) {
				
			}
		},
		async blockConnection(friend){
			usersService.blockConnectionByFriendId(friend
			).then((res)=>{
				console.log(res)
			}).catch((err)=>{
				console.log(err)
			})
		},
		urlify(msg){
			const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  			return msg.replace(urlRegex, (url) => {
    			return `<i><a class="link" target="_blank" href="${url}">${url}</a></i>`;
  			})
		}

		
	},

	beforeDestroy() {
		
		console.log("beforeDestroy")
	},
};
</script>

<template>

<ViewProfileModal
    v-if="viewUserModal"
    v-on:close="viewUserModal = !viewUserModal"
    :user="activeChatUser"

  />
	<div class="fixed bottom-16 right-20 sm:my-8 sm:align-bottom sm:w-[22rem]  w-full z-[1999] shadow-2xl rounded-xl">
		<!-- <transition
            name="custom-classes-transition"
            enter-active-class="animate__animated animate__slideInRight"
           > -->
		<div  :class="`${isShowChatModal &&!activeChat ? 'relative bg-white rounded-xl text-left  transform transition-all' : 'hidden'}`" >
		<div class="flex justify-between p-3">
			<span class="text-2xl font-bold ">Chats</span>
					<button v-on:click="closeChatList" class="bg-fatou-gray-700 focus:outline-none rounded-full p-1 py-3">
					<img src="/images/svg/minusicon.svg" alt="close" />
				</button>
		</div>
			<div class="bg-white mx-auto border-b shadow-xl overflow-y-auto h-[400px]">
				<div v-for="(user, index) in chatUsers" @click="selectUserForChat(user)"
					class="rounded-lg flex mt-5 hover:bg-fatou-blue-50 hover:cursor-pointer px-2 py-1">

					<img  :src="imageStorageUrl + '/' + user?.avatar" alt="close" class="w-12 rounded-full"  />
					<div class="flex flex-col flex-grow ml-4 gap-y-2">
						<div class="flex justify-between">
							<span class="font-bold fs-14">
								{{ user.firstName + ' ' + user.lastName }}
								<span v-if="user.isBlocked" class="text-fatou-red"> -Blocked</span>
							</span>
							<span style="font-size: 10px;color:#adb5bd" class="font-bold text-xs text-fatou-gray-850" v-if="user?.lastMsg?.createdAt">{{moment(user?.lastMsg?.createdAt).format('MMM Do YY hh:mm A')}}</span>
						</div>
						<div class="flex justify-between">
							<span v-if="user?.lastMsg?.message" 
							style="
								display: inline-block;
    							width: 180px;
    							white-space: nowrap;
    							overflow: hidden !important;
    							text-overflow: ellipsis;"
								class="font-bold text-fatou-gray-900 fs-12">{{user?.lastMsg?.message}}</span>
								<span v-if="!user?.lastMsg?.message"
								class="font-bold text-fatou-gray-900 fs-12">Write a new message</span>
							
							<div style="background-color:#f55f5f;color:white" class="badge" v-if="user.unreadMsgCount>0">{{user.unreadMsgCount}}</div>
							
						</div>
					</div>
				</div>

			</div>
		</div>

		<div v-if="activeChat" class="relative bg-white rounded-lg text-left  transform transition-all">
			<div class="absolute top-4 w-full flex items-center justify-between px-5">
				<div class="">
					<button @click="activeChat = false"
						class="bg-fatou-gray-700 focus:outline-none rounded-full px-4 py-[13px]">
						<img src="/images/svg/caret-left-icon.svg" alt="back" class="h-3" />
					</button>
				</div>
				
				<div v-if="activeChatUser?.firstName" class="text-xl font-bold flex"  @click="viewUserModal = true" >
				
					<img :src="imageStorageUrl + '/' + activeChatUser?.avatar" alt="close" class="w-8 mr-2 rounded-full" />{{activeChatUser?.firstName}}
				</div>

				<div  v-if="isOnline && !activeChatUser.isBlocked" class="w-auto">
					<span  class="h-2 w-2 rounded-full text-sm text-white p-1" style="background:green;">Online</span>
				</div>

				<div v-if="(!activeChatUser.isBlocked)">
					<div class="dropdown">
					
					<div tabindex="0" class="vertical-dots cursor-pointer" ></div>
					<ul tabindex="0" class="dropdown-content menu p-2 right-0 shadow bg-base-100 rounded-box w-52">
						<li><a @click="deleteChat(activeChatUser._id)">Delete Conversation</a></li>
						<li><a @click="blockConnection(activeChatUser._id)">Block User</a></li>
					</ul>
					</div>
				</div>
				
				<div class=" ">
					<button @click="closeChatDialog"
						class="bg-fatou-gray-700 focus:outline-none rounded-full p-1 py-3">
						<img src="/images/svg/minusicon.svg" alt="close"  />
					</button>
				</div>
			</div>
			<div class="bg-white mx-auto pt-20 pb-10 border-b shadow-xl px-5 ">
				<div class="flex flex-col gap-y-2 overflow-y-auto h-[250px]" ref="chatbox">
					<!-- their message -->
					<div class="mt-3" v-for="(msg, index ) in chat">

						<!-- <pre>{{msg}}</pre> -->
						<div v-if="msg.from === authUser._id" class="flex justify-end">
											
							<span v-if="msg.message!==''" class="bg-fatou-blue text-white rounded-lg p-2"> 
								<span v-if="msg.type==='simple'" v-html="urlify(msg.message)"> </span>
								<div v-if="msg.type==='interview'"> 
									
									<div  v-html="urlify(msg.message)"></div>
									<div >Here is the job link:</div>
									<div style="color:#1449df" v-html="urlify(msg.jobLink)"></div>
									<div >Here is the Calender link:</div>
									<div style="color:#1449df" v-html="urlify(msg.calenderLink)"></div>
								</div>

								<div style="font-size: xx-small">{{moment(msg.createdAt).format('ddd hh:mm A')}}</div>
								
							</span>

							<div class="flex flex-wrap">
								<div v-if="msg.files" v-for="(file, fileIndex ) in msg.files" >
									<a :href="imageStorageUrl+'/'+file" target="_blank">
										<object :data="imageStorageUrl+'/'+file" class="h-20 p-1 rounded-lg"> </object>
									</a>
								</div>
								
							</div>
							
						</div>

						<div v-else>
						
							<!-- <span class="bg-fatou-gray-700 rounded-lg p-2"> {{ msg.message }} </span> -->
								
							<span v-if="msg.message!==''" class=" items-end text-white  flex  w-[90%]">
								<img :src="imageStorageUrl + '/' + activeChatUser?.avatar"  class="w-8 h-8 mr-2 rounded-full" /> 
								<span class="rounded-lg bg-base-300 p-[4px_10px] whitespace-normal">
									
									<span v-if="msg.type==='simple'" style="color:#444242" v-html="urlify(msg.message)"></span>
									<div v-if="msg.type==='interview'"> 
									
										<div  v-html="urlify(msg.message)"></div>
										<div >Here is the job link:</div>
										<div style="color:rgb(33 188 209 /1)" v-html="urlify(msg.jobLink)"></div>
										<div >Here is the Calender link:</div>
										<div style="color:rgb(33 188 209 /1)" v-html="urlify(msg.calenderLink)"></div>
									</div>
									
								<div style="font-size: xx-small">{{moment(msg.createdAt).format('ddd hh:mm A')}}</div>
								</span>
							 </span>

								<div class="flex flex-wrap">
									
								<div v-if="msg.files" v-for="(file, fileIndex ) in msg.files" >
									<a :href="imageStorageUrl+'/'+file" target="_blank">
										<object :data="imageStorageUrl+'/'+file" class="h-20 p-1 rounded-lg"> </object>
									</a>
								</div>
							</div>
						</div>

					</div>
					

				</div>
				<div class="h-4" >
					<p v-if="userTyping" class="text-sm italic" style="color:grey">is typing...</p>
				</div>
				<i  style="background-color: rgb(0 0 0 / 60%);
    					color: white;
    					padding: 5px;
    					border-radius: 5px;
						justify-content: center;
    					display: flex;" 
					v-if="(activeChatUser.isBlocked)">You cannot reply to this Conversation</i>
				<div class="flex  mt-4" v-if="(!activeChatUser.isBlocked)">
					<input ref="file" type="file" multiple hidden @change="selectFile">
					<button class="btn btn-ghost"  @click="$refs.file.click()">
						<img src="/images/svg/paperclip.svg" alt="" />
					</button>
					<div>
						<div class="flex flex-wrap" >
							<img class="h-12 p-1" v-for="(file,index) in files" :src="file" />
						</div>
						
						<input 
							
							v-model="message"
							 v-on:keyup.enter="sendMessage"
							 v-on:keyup="isTyping" 
							 type="text"
							 class="input input-bordered w-full !rounded-xl !pr-12" 
							 placeholder="Type a message" />
					</div>
						<discord-picker
							:value="message"
							@update:value="message = $event"
							@emoji="setEmoji"
						/>
						<button class="btn btn-clear " @click="sendMessage">
							<img src="/images/svg/blue-paper-plane.svg" class="" alt="" />
						</button>
				</div>
			</div>
		</div>
		<!-- </transition> -->
	</div>

</template>


<style scoped>
@import url('/src/assets/css/modal.css');

.vertical-dots {
   width: 5px;
    height: 20px;
    background-image: radial-gradient(circle, black 2px, transparent 3px);
    background-size: 100% 33.33%;
  }
</style>
