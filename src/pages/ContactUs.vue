<script setup>
import ButtonBlue from '../components/buttons/ButtonBlue.vue';
import ButtonOutline from '../components/buttons/ButtonOutline.vue';
import ButtonDark from '../components/buttons/ButtonDark.vue';
import ButtonBox from '../components/buttons/ButtonBox.vue';
import ButtonBoxOutline from '../components/buttons/ButtonBoxOutline.vue';

// libs
import { useStore } from "vuex";
import { computed } from 'vue';

const store =  useStore();
const isAuthenticated = computed(() => store.state.auth.isAuthenticated)


const routePage = (route) => {
    window.location = '/auth/signin'
}

</script>
<template>
    <div class="w-full  ">
        <div class="w-full">
            <!-- header -->
                <header class="w-full bg-white px-12">
                    <nav class="flex items-center justify-between px-4 py-5 sm:px-14">
                         <a href="/"><img src="/images/png/logo.png" alt="Fatou" class="w-24"></a>
                        <div class="mr-auto px-16">
                        <a href="/auth/signup" class= 'text-black py-2.5 px-3 rounded-full font-light'>People</a>
                        <a href="/auth/signup"  class= 'text-black py-2.5 px-3 rounded-full font-light'>Buzz</a>
                        <a  href="/auth/signup" class= 'text-black py-2.5 px-3 rounded-full font-light'>VCs</a>
                        <a href="/auth/signup" class= 'text-black py-2.5 px-3 rounded-full font-light'>Founders</a>
                        <a href="/about" class= 'text-black py-2.5 px-3 rounded-full font-light'>About Us</a>
                        <a href="/contact " class= 'text-black py-2.5 px-3 rounded-full font-light'>Contact Us</a>
                        </div>
                        <div v-if="!isAuthenticated" class="items-center hidden space-x-3 sm:flex">

                            <!-- <ButtonBlue @click="routePage" btnText="Join Today" /> -->
                             <a  href="/auth/Signin"  :disabled="disabled" :class="[disabled ? ' bg-transparent' : ' bg-transparent border border-fatou-blue', 'text-black py-2.5 px-8  font-light']">Login</a>
                            <a href="/auth/signup" class=" text-white py-2.5 px-8  font-light border bg-fatou-blue ">Sign up</a>
                            <!-- <ButtonOutline @click="routePage" btnText="Signin" /> -->
                        </div>
                        <div v-else class="items-center hidden space-x-3 sm:flex">
                            <router-link  to="/home" class="bg-fatou-blue text-white py-2.5 px-8 font-light">
                                Database
                            </router-link>
                        </div>
                    </nav>
                </header> 

                
                <div  class="">
                    <div class="pt-4 pb-6 bg-white sm:pb-0">
                        <div class="sm:max-w-[90%] lg:ml-auto mx-auto flex justify-between ui-wrapper-large ">

                            
                            <div class="relative flex flex-col items-start w-full py-2 r space-y-6 lg:w-2/4 px- sm:pt-1 ">

                                 <div class="w-full m-0">
                                    <h3 class="text-30 font-bold text-left text-fatou-black sm:fs-35 sm:space-y-0 mb-8">Get in touch</h3>
                                </div>

                                 <form class="w-3/4">
                                    <div class="flex flex-wrap -mx-3 mb-6">
                                    
                                        <div class="w-full md:w-full px-3">

                                        <input class="appearance-none block w-full bg-gray-100 text-gray-100 border rounded py-4 px-4 leading-tight focus:outline-none focus:text-gray-700 focus:bg-gray-100  focus:border-gray-500 text-sm" id="grid-last-name" type="text" placeholder="Name">
                                        </div>
                                    </div>
                                    <div class="flex flex-wrap -mx-3 mb-6">
                                        <div class="w-full px-3">
                                        <input class="appearance-none block w-full bg-gray-100 text-gray-100 border rounded py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-100 focus:text-gray-700 focus:border-gray-500 text-sm" id="grid-email" type="email" placeholder="Email">
                                        </div>
                                    </div>
                                        
                                        <div class="flex flex-wrap -mx-3 mb-6">
                                        <div class="w-full px-3">
                                            <textarea rows="10" class="appearancenone  w-full tex-sm bg-gray-100 text-gray-100 border rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:text-gray-700 focus:bg-gray-100  focus:border-gray-400" placeholder="Email">
                                                
                                            </textarea>
                                        </div>
                                        <div class="flex justify-between w-full px-3">
                                        
                                        <button class="shadow  bg-fatou-blue font-medium  focus:shadow-outline focus:outline-none text-white  py-4 px-12 rounded" type="submit">
                                            Message 
                                        </button>
                                        </div>
                                        
                                    </div>
                                        
                                </form>
                            </div>
            

                                <div class="relative z-10 items-end justify-end hidden lg:w-1/2 lg:flex p">
                                    <img src="/images/png/map.png" class="absolute left-[7%] top-[18%]" alt="">
                                    <!-- <img src="/images/png/banner2.png" class="absolute top-[10%]" alt="">
                                    <img src="/images/png/banner3.png" class="absolute top-[52%] left-[0%]" alt="">
                                    <img src="/images/png/banner4.png" class="absolute top-[32%] left-[30%]" alt="">
                                    <img src="/images/png/banner5.png" class="absolute bottom-[-5%] right-[5%]" alt=""> -->
                                </div>
                        </div>
                    </div>
                </div>


            <div class="">
                <div class="w-full  mb-8 sm:w-5/6 sm:mx-auto">
        
                    <div class="flex flex-col w-full sm:flex-row sm:space-y-0">
                        <div class="relative  items-center justify-center h-40 px-10   rounded-lg sm:flex border-fatou-black-50">
                        
                            <img src="/images/svg/Send.svg" class="p-4 " alt="">
                            <span class="text-xl font-bold text-fatou-black sm:text-sm">New York, USA</span>
                        </div>

                        <div class="  items-center justify-center h-40 px-10 py-1  rounded-lg sm:flex border-fatou-black-50">
            
                            <div>
                                <img src="/images/svg/message-icon.svg" class="p-4 " alt="">
                            </div>
                            <div class="block">
                                <a href='mailto:info@fatou.com' class="text-xl font-bold text-fatou-black sm:text-xs">info@fatou.com</a>
                                <a href='mailto:info@fatou.com' class="text-xl font-bold text-fatou-black sm:text-xs">support@fatou.com</a>
                            </div>
                        </div>
             
                    </div>
                </div>
            </div> 
        </div>


    </div>
</template>
<style>
body {
    background: #fff;
}

.mapbg {
    background-image: url('/images/svg/map.svg');
    background-repeat: no-repeat;
    background-position: 100%;
    background-size: 100%;
    width: 100%;
    height: 44rem;
}

@media (max-width: 640px) {
    .mapbg {
        height: 24rem;
    }
}

.mapbg-points {
    position: absolute;
}

.mapbg .mp1 {
    top: 25.5%;
    left: 13%;
}

.mapbg .mp2 {
    top: 15%;
    left: 17%;
}

.mapbg .mp3 {
    top: 29%;
    left: 21%;
}

.mapbg .mp4 {
    top: 12%;
    left: 26.5%;
}

.mapbg .mp5 {
    top: 21.5%;
    right: 40%;
}

.mapbg .mp6 {
    top: 48.5%;
    left: 45.6%;
}

.mapbg .mp7 {
    top: 39.5%;
    right: 37.9%;
}

.mapbg .mp8 {
    bottom: 25%;
    right: 39.7%;
}

.mapbg .mp9 {
    bottom: 25%;
    right: 9.7%;
}

.mapbg .mp10 {
    bottom: 55%;
    right: 30.7%;
}

.mapbg .mp11 {
    bottom: 55%;
    right: 20.7%;
}

.mapbg .mp12 {
    bottom: 70%;
    right: 25.7%;
}

.mapbg .mp13 {
    top: 62%;
    left: 24.5%;
}



.drop-shadow-comment {
    box-shadow: 0px 89.761px 145.862px rgba(0, 0, 0, 0.05);
}
</style>







 