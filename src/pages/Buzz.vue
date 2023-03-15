<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'

const isPostJob = ref(false)

// Post buzz
const topic = ref("");
const postTitle = ref("");
const postContent = ref("");
const file = ref();
const isSending = ref(false)
const sent = ref(false);
// Setup Topics
let buzzTopics = ref([])
axios
  .get('http://localhost:5000/api/v1/data/provider/feed-topics')
  .then((res) => {
    buzzTopics.value = res.data.data
  })

const store = useStore()

const users = [
	{
                "address": {
                    "country": {
                        "fullName": "United Kingdom"
                    },
                    "state": "Northamptonshire",
                    "city": "Brighton and Hove"
                },
                "favorites": {
                    "jobs": []
                },
                "isCommunityMember": true,
                "reasonForJoining": [
                    "seeking-mentor"
                ],
                "workExperience": [],
                "contacts": [],
                "groups": [],
                "skills": [],
                "accountPaused": false,
                "emailVerified": true,
                "isLocked": false,
                "_id": "6210aadc75e62f2bb41e2939",
                "firstName": "Johnny",
                "lastName": "Brown",
                "email": "johnny.brown.dummy@example.com",
                "avatar": "https://i.pravatar.cc/500?u=fakeJohnny-Brown",
                "company": "Fairview Road",
                "industry": "leisure_travel_and_tourism",
                "createdAt": "2022-02-19T08:31:24.864Z",
                "updatedAt": "2022-02-19T08:31:24.864Z",
                "__v": 0
            },
            {
                "address": {
                    "country": {
                        "fullName": "Brazil"
                    },
                    "state": "Rondônia",
                    "city": "Jequié"
                },
                "favorites": {
                    "jobs": []
                },
                "isCommunityMember": false,
                "reasonForJoining": [
                    "seeking-mentor"
                ],
                "workExperience": [],
                "contacts": [],
                "groups": [],
                "skills": [],
                "accountPaused": false,
                "emailVerified": true,
                "isLocked": false,
                "_id": "6210b97375e62f2bb41e41de",
                "firstName": "Patrizia",
                "lastName": "Rezende",
                "email": "patrizia.rezende.dummy@example.com",
                "avatar": "https://i.pravatar.cc/500?u=fakePatrizia-Rezende",
                "company": "Rua Duque de Caxias ",
                "industry": "maritime",
                "createdAt": "2022-02-19T09:33:39.688Z",
                "updatedAt": "2022-02-19T09:33:39.688Z",
                "__v": 0
            },
]

const feeds = [
	{
		title: "This is a demo title",
		body: "this is a very long text. How I so much love this experience. This feel so great. I hope buzz work. Go Fatou!!!. this is a very long text. How I so much love this experience. This feel so great. I hope buzz work. Go Fatou!!!this is a very long text. How I so much love this experience. This feel so great. I hope buzz work. Go Fatou!!!this is a very long text. How I so much love this experience. This feel so great. I hope buzz work. Go Fatou!!!this is a very long text. How I so much love this experience. This feel so great. I hope buzz work. Go Fatou!!!this is a very long text. How I so much love this experience. This feel so great. I hope buzz work. Go Fatou!!!this is a very long text. How I so much love this experience. This feel so great. I hope buzz work. Go Fatou!!!this is a very long text. How I so much love this experience. This feel so great. I hope buzz work. Go Fatou!!!this is a very long text. How I so much love this experience. This feel so great. I hope buzz work. Go Fatou!!!this is a very long text. How I so much love this experience. This feel so great. I hope buzz work. Go Fatou!!!",
		likes: 3,
		comments: 5,
		user: users[0],
		image: 'https://i.picsum.photos/id/1001/5616/3744.jpg?hmac=38lkvX7tHXmlNbI0HzZbtkJ6_wpWyqvkX4Ty6vYElZE'
	},
	{
		title: "Better work experiences",
		body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam accusantium aut quod fugit rem repellendus assumenda quia autem eum suscipit porro obcaecati, cupiditate, nam expedita, soluta amet corrupti ratione ipsum cumque aperiam optio perspiciatis dolores? Quas pariatur consequatur est. Accusantium eveniet dolor commodi sequi nemo doloremque autem itaque est. Cumque",
		likes: 34,
		comments: 15,
		user: users[1],
		image: 'https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ'
	},
]

// functions
function postBuzz() {
  // await this.$store.dispatch('newPost', {
	// 	topic: this.topic,
	// 	title: this.postTitle,
	// 	body: this.postContent
	// })
	this.isSending = true;
	setTimeout(() => {
		this.isSending = false
		this.sent = true
	}, 2000)
}
</script>
<template>
   <div class="block mt-16">
      <div class="bg-white w-full sm:w-64 py-6 px-6 rounded-xl absolute space-y-3.5">
          <div class="space-y-1.5">
            <h2 class="font-medium text-fatou-blue">Buzz Guidelines</h2>
             <p class="text-sm italic">The Buzz was created to allow 
                        People to be free and open to
                        share or discuss any topics that may be beneficial to this
                        community.
              </p>
          </div>
          <div class="space-y-1.5">
            <h2 class="font-medium text-fatou-blue">Buzz Rules</h2>
              <ul type="disc" class="ml-6 list-disc">
                  <li class="text-sm italic font-light">No Profanity</li>
                  <li class="text-sm italic font-light">No Bullying</li>
                  <li class="text-sm italic font-light">Be Respectful</li>
              </ul>
          </div>
      </div>
      <div class="w-5/6 mx-auto space-y-8 sm:max-w-3xl">
      	<div class="space-y-4">
            <!-- form -->
            <div class="bg-white py-6 px-6 rounded-xl space-y-3.5">
                <!-- header -->
							<div class="flex items-center space-x-2">
									<span class="p-2 rounded-full bg-fatou-gray-100">
											<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M12.75 2.24998C12.947 2.053 13.1808 1.89674 13.4382 1.79014C13.6956 1.68353 13.9714 1.62866 14.25 1.62866C14.5286 1.62866 14.8044 1.68353 15.0618 1.79014C15.3192 1.89674 15.553 2.053 15.75 2.24998C15.947 2.44697 16.1032 2.68082 16.2098 2.93819C16.3165 3.19556 16.3713 3.47141 16.3713 3.74998C16.3713 4.02856 16.3165 4.30441 16.2098 4.56178C16.1032 4.81915 15.947 5.053 15.75 5.24998L5.625 15.375L1.5 16.5L2.625 12.375L12.75 2.24998Z" stroke="#21BCD1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>
									</span>
									<span class="text-lg font-medium text-fatou-black">
											{{!isPostJob ? "Create buzz" : "Post Job"}}
									</span>
							</div>
							<!-- buzz form -->
							<form v-if="!isPostJob" action="" class="space-y-2">
									<div>
											<select v-model="topic" :class="{ 'text-[#333]' : topic != ''}" name="topic" class="w-full py-2.5 px-2 bg-transparent text-[#ADB5BD] border border-fatou-black-50 rounded-md focus:outline-none">
													<option value="" selected disabled>Topic</option>
													<option :value="topic" v-for="topic in buzzTopics" :key="`topic-${topic}`" >{{topic}}</option>
											</select>
									</div>
									<div>
											<input v-model="postTitle" type="text" class="w-full py-1.5 px-2 border border-fatou-black-50 rounded-md focus:outline-none text-md" placeholder="Whats the post title">
									</div>
									<div>
											<textarea v-model="postContent" name="discussion" class="w-full px-2 pt-2 border rounded-md border-fatou-black-50 focus:outline-none" rows="4" placeholder="What do you want to add to the Buzz"></textarea>
									</div>
									
							</form>
							<!-- job form -->
							<form v-else action="" class="space-y-2">
								<div>
										<input type="text" class="w-full py-1.5 px-2 border border-fatou-black-50 rounded-md focus:outline-none" placeholder="Whats the job title">
								</div>
								<div>
											<textarea name="discussion" class="w-full px-2 pt-2 border rounded-md border-fatou-black-50 focus:outline-none" rows="4" placeholder="Whats the Job Description"></textarea>
									</div>
									<div class="flex sm:flex-row flex-col items-center sm:space-x-1.5 sm:space-y-0 space-y-1.5">
											<select name="topic" class="w-full py-2.5 px-2 bg-transparent text-[#ADB5BD] border border-fatou-black-50 rounded-md focus:outline-none">
													<option value="" selected disabled>Location</option>
											</select>
											<!--  -->
											<select name="topic" class="w-full py-2.5 px-2 bg-transparent text-[#ADB5BD] border border-fatou-black-50 rounded-md focus:outline-none">
													<option value="" selected disabled>Job Category</option>
											</select>
											<!--  -->
											<select name="topic" class="w-full py-2.5 px-2 bg-transparent text-[#ADB5BD] border border-fatou-black-50 rounded-md focus:outline-none">
													<option value="" selected disabled>Experience Level</option>
											</select>
											<!--  -->
											<select name="topic" class="w-full py-2.5 px-2 bg-transparent text-[#ADB5BD] border border-fatou-black-50 rounded-md focus:outline-none">
													<option value="" selected disabled>Type</option>
											</select>
									</div>
							</form>
							<!--  -->
							<div class="flex flex-col items-start sm:flex-row sm:items-center sm:space-x-3">
								<div class="flex items-center space-x-1 cursor-pointer">
										<!--  -->
										<span>
												<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M23.75 3.75H6.25C4.86929 3.75 3.75 4.86929 3.75 6.25V23.75C3.75 25.1307 4.86929 26.25 6.25 26.25H23.75C25.1307 26.25 26.25 25.1307 26.25 23.75V6.25C26.25 4.86929 25.1307 3.75 23.75 3.75Z" stroke="#21BCD1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
														<path d="M10.625 12.5C11.6605 12.5 12.5 11.6605 12.5 10.625C12.5 9.58947 11.6605 8.75 10.625 8.75C9.58947 8.75 8.75 9.58947 8.75 10.625C8.75 11.6605 9.58947 12.5 10.625 12.5Z" stroke="#21BCD1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
														<path d="M26.25 18.75L20 12.5L6.25 26.25" stroke="#21BCD1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
										</svg>
										</span>
										<span class="text-sm font-medium">Photo/Video</span>
								</div>
								<!--  -->
								<div class="flex items-center justify-between w-full sm:flex-grow">
											<button @click="isPostJob = !isPostJob" :class="[isPostJob ? 'bg-fatou-blue' : 'bg-fatou-gray-700','flex items-center space-x-1.5 px-5 py-1.5 rounded-full cursor-pointer']">
														<svg v-if="!isPostJob" width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path fill-rule="evenodd" clip-rule="evenodd" d="M8.22129 0.563664C7.72827 0.731341 7.38198 1.03212 7.16233 1.48345C7.03746 1.73999 7.03176 1.77441 7.01203 2.3889L6.99152 3.02767L4.4284 3.04763L1.86528 3.06759L1.59137 3.17139C0.998202 3.3962 0.51531 3.82661 0.244439 4.37192C0.0244203 4.81474 -0.00518893 5.054 0.00826234 6.27828L0.0198272 7.33316L5.25885 9.03257L10.4979 10.732L15.7369 9.03257L20.9759 7.33316L20.9877 6.27828C21.0013 5.06398 20.9737 4.83974 20.7542 4.38353C20.4897 3.8338 20.006 3.39939 19.4044 3.17139L19.1305 3.06759L16.5674 3.04763L14.0042 3.02767L13.9837 2.38667L13.9632 1.74566L13.8104 1.44488C13.6236 1.07707 13.3507 0.816337 12.9676 0.639678L12.6919 0.512523L10.5594 0.503141C8.61819 0.494597 8.40842 0.500027 8.22129 0.563664ZM12.2408 2.60848V3.02767H10.4979H8.75495L8.74306 2.6514C8.73654 2.44444 8.74064 2.25113 8.75221 2.22179C8.76939 2.17823 9.09091 2.17036 10.507 2.17887L12.2408 2.18929V2.60848ZM1.93356e-05 12.036C0.000839535 15.7711 -0.00367156 15.7009 0.268102 16.2268C0.46983 16.6172 0.937015 17.0765 1.31164 17.2528C1.87413 17.5175 1.21277 17.4998 10.4979 17.4998C19.783 17.4998 19.1216 17.5175 19.6841 17.2528C20.0908 17.0614 20.5424 16.6043 20.7475 16.1765C20.8355 15.9931 20.9275 15.7364 20.952 15.606C21.0202 15.2424 21.0137 8.662 20.9452 8.68667C20.917 8.69681 18.6332 9.43866 15.8702 10.3353L10.8465 11.9655H10.4979H10.1493L5.12557 10.3353C2.36252 9.43866 0.0787995 8.69681 0.0505846 8.68667C0.00982072 8.67202 -0.000513794 9.35834 1.93356e-05 12.036Z" fill="#21BCD1"/>
														</svg>
														<svg v-else width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path fill-rule="evenodd" clip-rule="evenodd" d="M8.22129 0.563664C7.72827 0.731341 7.38198 1.03212 7.16233 1.48345C7.03746 1.73999 7.03176 1.77441 7.01203 2.3889L6.99152 3.02767L4.4284 3.04763L1.86528 3.06759L1.59137 3.17139C0.998202 3.3962 0.51531 3.82661 0.244439 4.37192C0.0244203 4.81474 -0.00518893 5.054 0.00826234 6.27828L0.0198272 7.33316L5.25885 9.03257L10.4979 10.732L15.7369 9.03257L20.9759 7.33316L20.9877 6.27828C21.0013 5.06398 20.9737 4.83974 20.7542 4.38353C20.4897 3.8338 20.006 3.39939 19.4044 3.17139L19.1305 3.06759L16.5674 3.04763L14.0042 3.02767L13.9837 2.38667L13.9632 1.74566L13.8104 1.44488C13.6236 1.07707 13.3507 0.816337 12.9676 0.639678L12.6919 0.512523L10.5594 0.503141C8.61819 0.494597 8.40842 0.500027 8.22129 0.563664ZM12.2408 2.60848V3.02767H10.4979H8.75495L8.74306 2.6514C8.73654 2.44444 8.74064 2.25113 8.75221 2.22179C8.76939 2.17823 9.09091 2.17036 10.507 2.17887L12.2408 2.18929V2.60848ZM1.93356e-05 12.036C0.000839535 15.7711 -0.00367156 15.7009 0.268102 16.2268C0.46983 16.6172 0.937015 17.0765 1.31164 17.2528C1.87413 17.5175 1.21277 17.4998 10.4979 17.4998C19.783 17.4998 19.1216 17.5175 19.6841 17.2528C20.0908 17.0614 20.5424 16.6043 20.7475 16.1765C20.8355 15.9931 20.9275 15.7364 20.952 15.606C21.0202 15.2424 21.0137 8.662 20.9452 8.68667C20.917 8.69681 18.6332 9.43866 15.8702 10.3353L10.8465 11.9655H10.4979H10.1493L5.12557 10.3353C2.36252 9.43866 0.0787995 8.69681 0.0505846 8.68667C0.00982072 8.67202 -0.000513794 9.35834 1.93356e-05 12.036Z" fill="white"/>
																</svg>

												<span :class="[isPostJob ? 'text-white' : 'text-fatou-blue', 'text-sm font-medium']">Job</span>
											</button>
										<div>
												<button class="px-12 text-white border-0 btn bg-fatou-blue hover:bg-fatou-blue rounded-3xl flex space-x-3 items-center"
												@click="postBuzz()" v-if="!sent">
        								<div v-if="isSending" class="w-5 h-5 ease-linear border-2 border-t-2 text-fatou-blue-700 rounded-full loader"></div>
														<span>POST</span>
												</button>
												<button v-else class="px-12 text-white border-0 btn bg-fatou-blue hover:bg-fatou-blue rounded-3xl flex space-x-3 items-center">
														<span>Sent</span>
												</button>
										</div>
                </div>
            	</div>
        		</div>
        <!-- explore -->
        <div class="space-y-3">
            <h2>Explore Topics</h2>
            <div class="flex items-start space-x-3 divide-x divide-black">
                <div>
                    <button @click="isPostJob = !isPostJob" :class="[isPostJob ? 'bg-fatou-blue' : 'bg-fatou-gray-900','flex items-center space-x-1.5 px-5 py-1.5 rounded-full cursor-pointer']">
                        <span class="text-sm font-medium text-white">Job</span>
                    </button>
                </div>
                <!--  -->
                <div class="flex flex-wrap items-center flex-grow gap-2 px-2 sm:justify-between">
                    <button class="bg-fatou-gray-900 flex items-center space-x-1.5 px-5 py-1.5 rounded-full cursor-pointer">
                        <span class="text-sm font-medium text-white">Tech</span>
                    </button>
                     <button class="bg-fatou-gray-900 flex items-center space-x-1.5 px-5 py-1.5 rounded-full cursor-pointer">
                        <span class="text-sm font-medium text-white">Culture</span>
                    </button>
                     <button class="bg-fatou-gray-900 flex items-center space-x-1.5 px-5 py-1.5 rounded-full cursor-pointer">
                        <span class="text-sm font-medium text-white">Tech</span>
                    </button>
                     <button class="bg-fatou-gray-900 flex items-center space-x-1.5 px-5 py-1.5 rounded-full cursor-pointer">
                        <span class="text-sm font-medium text-white">Design</span>
                    </button>
                     <!-- <button class="bg-fatou-gray-900 flex items-center space-x-1.5 px-5 py-1.5 rounded-full cursor-pointer">
                        <span class="text-sm font-medium text-white">Oss</span>
                    </button>
                     <button class="bg-fatou-gray-900 flex items-center space-x-1.5 px-5 py-1.5 rounded-full cursor-pointer">
                        <span class="text-sm font-medium text-white">Open Source</span>
                    </button> -->
                     <button class="bg-fatou-gray-900 flex items-center space-x-1.5 px-5 py-1.5 rounded-full cursor-pointer">
                        <span class="text-sm font-medium text-white">Coding</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- buzz -->
        <div class="space-y-4">
            <!-- headline -->
            <h2 class="text-xl font-medium text-fatou-black">Buzz</h2>

            <div class="space-y-6">

            <!-- cards -->
                <div v-for="feed of feeds" class="w-full px-6 py-4 space-y-2 bg-white rounded-xl">
                 <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <img :src="feed.user.avatar" alt="" class="w-16 h-16 rounded-full object-cover">
                        <span class="font-normal text-fatou-black">{{ feed.user.firstName }} {{ feed.user.lastName }}</span>
                    </div>
                    <!--  -->
                    <button class="border border-fatou-blue sm:px-10 sm:py-2 px-6 py-1.5 sm:text-base text-sm text-fatou-blue font-medium rounded-full">
                        Add
                    </button>
                    </div>
                    <!--  -->
                    <div class="space-y-2">
                    <h3 class="text-xl font-medium text-fatou-black">{{feed.title}}</h3>
                    <div>
                        <img :src="feed.image" class="w-full h-92" alt="" />
                    </div>
                    <p class="text-sm text-fatou-black-150">
											{{feed.body}}
										</p>
										</div>
                <!--  -->
                <div class="flex flex-col justify-between py-2 space-y-2 sm:flex-row sm:items-center sm:space-y-0">
                    <div class="flex items-center space-x-8">
                        <div class="flex items-center space-x-2">
                            <span class="p-2 rounded-full bg-fatou-gray-100">
                            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.8933 2.07333C13.5528 1.73267 13.1485 1.46243 12.7036 1.27805C12.2586 1.09368 11.7817 0.998779 11.3 0.998779C10.8183 0.998779 10.3414 1.09368 9.89643 1.27805C9.45145 1.46243 9.04717 1.73267 8.70666 2.07333L8 2.78L7.29333 2.07333C6.60554 1.38553 5.67269 0.999136 4.7 0.999136C3.72731 0.999136 2.79446 1.38553 2.10666 2.07333C1.41887 2.76112 1.03247 3.69397 1.03247 4.66666C1.03247 5.63935 1.41887 6.5722 2.10666 7.26L2.81333 7.96666L8 13.1533L13.1867 7.96666L13.8933 7.26C14.234 6.91949 14.5042 6.51521 14.6886 6.07023C14.873 5.62526 14.9679 5.14832 14.9679 4.66666C14.9679 4.185 14.873 3.70807 14.6886 3.26309C14.5042 2.81812 14.234 2.41383 13.8933 2.07333V2.07333Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                        <span class="font-medium text-fatou-black">{{feed.likes}}</span>
                        </div>
                       <div class="flex items-center space-x-2">
                            <span class="p-2 rounded-full bg-fatou-gray-100">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 6.66666C13.0023 7.54657 12.7967 8.41458 12.4 9.19999C11.9296 10.1412 11.2065 10.9328 10.3116 11.4862C9.41677 12.0396 8.3855 12.3329 7.33333 12.3333C6.45342 12.3356 5.58541 12.13 4.8 11.7333L1 13L2.26667 9.19999C1.86995 8.41458 1.66437 7.54657 1.66667 6.66666C1.66707 5.61449 1.96041 4.58322 2.51381 3.68836C3.06722 2.79349 3.85884 2.07037 4.8 1.59999C5.58541 1.20328 6.45342 0.997694 7.33333 0.999988H7.66667C9.05623 1.07665 10.3687 1.66316 11.3528 2.64723C12.3368 3.63129 12.9233 4.94376 13 6.33332V6.66666Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                        <span class="font-medium text-fatou-black">{{feed.comments}}</span>
                       </div>
                    </div>
                    <div class="flex items-center space-x-3">
                        <span>
                            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28.5 12.6667C31.1234 12.6667 33.25 10.54 33.25 7.91666C33.25 5.2933 31.1234 3.16666 28.5 3.16666C25.8766 3.16666 23.75 5.2933 23.75 7.91666C23.75 10.54 25.8766 12.6667 28.5 12.6667Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9.5 23.75C12.1234 23.75 14.25 21.6234 14.25 19C14.25 16.3766 12.1234 14.25 9.5 14.25C6.87665 14.25 4.75 16.3766 4.75 19C4.75 21.6234 6.87665 23.75 9.5 23.75Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M28.5 34.8333C31.1234 34.8333 33.25 32.7067 33.25 30.0833C33.25 27.46 31.1234 25.3333 28.5 25.3333C25.8766 25.3333 23.75 27.46 23.75 30.0833C23.75 32.7067 25.8766 34.8333 28.5 34.8333Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.6008 21.3908L24.415 27.6925" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M24.3992 10.3075L13.6008 16.6092" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                        <span class="font-medium text-fatou-black">
                            Share
                        </span>
                    </div>
                </div>
            </div>
            </div>
        </div>

        <!-- jobs -->
         <div v-if="false" class="space-y-4">
            <!-- headline -->
            <h2 class="text-xl font-medium text-fatou-black">Jobs</h2>

            <div class="space-y-6">
                <!-- cards -->
                <div class="w-full px-6 py-4 space-y-2 bg-white rounded-xl">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <img src="/images/png/buzzp.png" alt="">
                        <span class="font-normal text-fatou-black">Floyd Miles</span>
                    </div>
                    <!--  -->
                    <button class="border border-fatou-blue sm:px-10 sm:py-2 sm:text-base px-4 py-1.5 text-sm text-fatou-blue font-medium rounded-full">
                        Share Resume
                    </button>
                </div>
                <!--  -->
                <div class="space-y-2">
                    <h3 class="text-xl font-medium text-fatou-black">Hiring a Product Designer</h3>
                    <div>
                        <img src="/images/png/buzzpp.png" class="w-full h-92" alt="">
                    </div>
                    <p class="text-sm text-fatou-black-150">
                        Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi........</p>
                </div>
                <!--  -->
                <div class="flex flex-col justify-between py-2 space-y-2 sm:flex-row sm:items-center sm:space-y-0">
                    <div class="flex items-center space-x-8">
                        <div class="flex items-center space-x-2">
                            <span class="p-2 rounded-full bg-fatou-gray-100">
                            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.8933 2.07333C13.5528 1.73267 13.1485 1.46243 12.7036 1.27805C12.2586 1.09368 11.7817 0.998779 11.3 0.998779C10.8183 0.998779 10.3414 1.09368 9.89643 1.27805C9.45145 1.46243 9.04717 1.73267 8.70666 2.07333L8 2.78L7.29333 2.07333C6.60554 1.38553 5.67269 0.999136 4.7 0.999136C3.72731 0.999136 2.79446 1.38553 2.10666 2.07333C1.41887 2.76112 1.03247 3.69397 1.03247 4.66666C1.03247 5.63935 1.41887 6.5722 2.10666 7.26L2.81333 7.96666L8 13.1533L13.1867 7.96666L13.8933 7.26C14.234 6.91949 14.5042 6.51521 14.6886 6.07023C14.873 5.62526 14.9679 5.14832 14.9679 4.66666C14.9679 4.185 14.873 3.70807 14.6886 3.26309C14.5042 2.81812 14.234 2.41383 13.8933 2.07333V2.07333Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                        <span class="font-medium text-fatou-black">24 Likes</span>
                        </div>
                       <div class="flex items-center space-x-2">
                            <span class="p-2 rounded-full bg-fatou-gray-100">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 6.66666C13.0023 7.54657 12.7967 8.41458 12.4 9.19999C11.9296 10.1412 11.2065 10.9328 10.3116 11.4862C9.41677 12.0396 8.3855 12.3329 7.33333 12.3333C6.45342 12.3356 5.58541 12.13 4.8 11.7333L1 13L2.26667 9.19999C1.86995 8.41458 1.66437 7.54657 1.66667 6.66666C1.66707 5.61449 1.96041 4.58322 2.51381 3.68836C3.06722 2.79349 3.85884 2.07037 4.8 1.59999C5.58541 1.20328 6.45342 0.997694 7.33333 0.999988H7.66667C9.05623 1.07665 10.3687 1.66316 11.3528 2.64723C12.3368 3.63129 12.9233 4.94376 13 6.33332V6.66666Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                        <span class="font-medium text-fatou-black">2 Comments</span>
                       </div>
                    </div>
                    <div class="flex items-center space-x-3">
                        <span>
                            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28.5 12.6667C31.1234 12.6667 33.25 10.54 33.25 7.91666C33.25 5.2933 31.1234 3.16666 28.5 3.16666C25.8766 3.16666 23.75 5.2933 23.75 7.91666C23.75 10.54 25.8766 12.6667 28.5 12.6667Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9.5 23.75C12.1234 23.75 14.25 21.6234 14.25 19C14.25 16.3766 12.1234 14.25 9.5 14.25C6.87665 14.25 4.75 16.3766 4.75 19C4.75 21.6234 6.87665 23.75 9.5 23.75Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M28.5 34.8333C31.1234 34.8333 33.25 32.7067 33.25 30.0833C33.25 27.46 31.1234 25.3333 28.5 25.3333C25.8766 25.3333 23.75 27.46 23.75 30.0833C23.75 32.7067 25.8766 34.8333 28.5 34.8333Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.6008 21.3908L24.415 27.6925" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M24.3992 10.3075L13.6008 16.6092" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                        <span class="font-medium text-fatou-black">
                            Share
                        </span>
                    </div>
                </div>
            </div>
            <!--  -->
            </div>
        </div>
    </div>
    	</div>
   </div>
</template>