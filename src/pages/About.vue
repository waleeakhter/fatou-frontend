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
                        <a href="/home"><img src="/images/png/logo.png" alt="Fatou" class="w-24"></a>
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

                
                <div  class="px-16">
                   <div class="pt-4 pb-6 bg-white sm:pb-0">
                        <div class="sm:max-w-[100%] lg:ml-auto mx-auto flex justify-between ui-wrapper-large ">

                            <div class="hidden lg:w-1/2 lg:flex">
                                <div class="w-full sm:w-full -mt-16 ">
                                <img src="/images/png/about-head.png" class="w-full sm:w-5/6 rounded-lg" alt="">
                            </div>

                            
                        </div>

                    <div class=" flex flex-col items-start w-full py-10 space-y-6 lg:w-2/4 px- sm:pt-6 ">
                        <!-- <div class="absolute z-0 hidden rounded-full lg:block bottom-56 -right-14 w-14 h-14 bg-fatou-blue">
                        </div> -->
                            <h3 class="fs-35 font-bold sm:fs-35 text-black  l-height mb-12">
                               Creating space where minorities can express themselves 
                            
                                  <span class="border-b-4 border-fatou-blue">freely</span></h3>

                                    <div class="grid grid-cols-2 gap-1 w-full">

                                    <div class="overflow-idden bg-white pb-4   w-4/5 rounded-lg shadow-md h-full">
                                    <span class="bg-fatou-light  text-white px-6 py-3 fs-22 font-bold -mt-10 rounded-full bg-border">1</span>
                                        <div class=" sm:py-18 py-8  px-4 flex flex-col items-center rounded-lg space-y-1.5">
                                            
                                            <p class=" fs-13 font-light">
                                                Networking can be really challenging for professionals of colors
                                                who may not only experience discomfort but also face unique challenges
                                                from not being perceived as powerful credile and resources
                                            </p>
                                        </div>
                                
                                    </div>

                                     <div class="overflow-dden bg-white pb-4   w-4/5  rounded-lg shadow-md mt-8 h-full">

                                        <span class="bg-fatou-light  text-white px-6 py-4 fs-22 font-bold -mt-10 rounded-full bg-border">2</span>

                                        <div class=" sm:py-18 py-8  px-4 flex flex-col items-center rounded-lg space-y-1.5">
                                            
                                            <p class=" fs-13 font-light">
                                                Professionals are also at higher risk of becoming isolated, Struggling to
                                                 navigate Racial boundries for being vocal about workplace injustice 
                                            </p>
                                        </div>
                                
                                    </div>
  

                                    </div>   


                                    <div class="grid grid-cols-2 gap-1 w-full mt-20">

                                    <div class="overflow-idden bg-white pb-4   w-4/5 rounded-lg shadow-md h-full">
                                    <span class="bg-fatou-light  text-white px-6 py-3 fs-22 font-bold -mt-10 rounded-full bg-border">3</span>
                                        <div class=" sm:py-18 py-8  px-4 flex flex-col items-center rounded-lg space-y-1.5">
                                            
                                            <p class=" fs-13 font-light">
                                                Networking can be really challenging for professionals of colors
                                                who may not only experience discomfort but also face unique challenges
                                                from not being perceived as powerful credile and resources
                                            </p>
                                        </div>
                                
                                    </div>

                                     <div class="overflow-dden bg-white pb-4   w-4/5  rounded-lg shadow-md mt-8 h-full">

                                        <span class="bg-fatou-light  text-white px-6 py-4 fs-22 font-bold -mt-10 rounded-full bg-border">4</span>

                                        <div class=" sm:py-18 py-8  px-4 flex flex-col items-center rounded-lg space-y-1.5">
                                            
                                            <p class=" fs-13 font-light">
                                                Professionals are also at higher risk of becoming isolated, Struggling to
                                                 navigate Racial boundries for being vocal about workplace injustice 
                                            </p>
                                        </div>
                                
                                    </div>
  

                                    </div>                       
                            </div>

                        </div>
                    </div>
                </div>


                <div class=" w-full px-16">
                    <div class="flex flex-col  w-full px-4 py-4 space-y-8 sm:w-6/6 sm:mx-auto sm:py-2 sm:flex-row sm:space-y-0" >
                    <div class="w-full sm:w-3/5">
                    <div class="w-4/5 m-0">
                            <h3 class="text-30 font-bold text-fatou-black sm:fs-35 sm:space-y-0">Our  <span class="border-b-4 border-fatou-blue">Goal</span></h3>
                        </div>
                        <p class="fs-15 text-fatou-black-100 sm:fs-16 font-medium  leading-9 sm:space-y-0 mt-8">
                            At Fatou, we want to create space for inclusion to help and enable people of color to engage with each other and allies for mutual growth. We want all our users to feel free about sharing any beneficial information, 
                            whether good, bad and ugly– warning signs can help prevent future mental trauma.  </p>
                        <!-- <img src="/images/png/blacks.png" class="w-full sm:w-5/6 rounded-lg" alt=""> -->
                    </div>
                    <div class="flex flex-col items-start justify-enter py-12 w-full space-y-5 sm:w-5/6 ">
                        <img src="/images/png/grow-2.png" class="w-full sm:w-5/6 rounded-lg relative left-24 -top-24" alt="">
                    </div>
                </div>
                
                </div>

                 <div class=" w-full px-16">
                    <div class="flex flex-col  w-full px-4 py-4 space-y-8 sm:w-6/6 sm:mx-auto sm:py-2 sm:flex-row sm:space-y-0" >
                        <div class="w-full sm:w-3/5">
                            <div class="w-4/5 m-0">
                                <h3 class="text-30 font-bold text-fatou-black sm:fs-35 sm:space-y-0">Why  <span class="border-b-4 border-fatou-blue">Fatou</span></h3>
                            </div>
   
                        </div>
                   
                    </div>
                

                    <div class="mt-8">

                         <div class="grid grid-cols-4 gap-1 w-full">

                                    <div class="overflow-idden bg-white pb-4   w-3/4 rounded-lg shadow-lg h-64">
                                
                                        <div class=" sm:py-18 py-8  px-4 flex flex-col items-center rounded-lg space-y-1.5">
                                                <div class=" flex items-center justify-center w-24 h-24 rounded-full e -top-12">
                                                    <img src="/images/svg/user-edit.svg" class="p-4 " alt="">
                                                </div>
                                                <h5 class="fs-15 font-semibold text-center">Meaningful Connection</h5>
                                                <p class=" fs-13 font-light text-center">
                                                Build your ideal profile based on your needs

                                                </p>
                                        </div>
                                
                                    </div>

                                     <div class="overflow-dden bg-white pb-4   w-3/4  rounded-lg shadow-lg mt-8 h-64">

                                        <div class=" sm:py-18 py-8  px-4 flex flex-col items-center rounded-lg space-y-1.5">
                                                <div class=" flex items-center justify-center w-24 h-24 rounded-full e -top-12">
                                                    <img src="/images/svg/refresh-2.svg" class="p-4 " alt="">
                                                </div>
                                                <h5 class="fs-15 font-semibold text-center">Buzz</h5>
                                                <p class=" fs-13 font-light text-center">
                                                Build your ideal profile based on your needs

                                                </p>
                                        </div>
                                
                                    </div>
  
  
                                    <div class="overflow-idden bg-white pb-4   w-3/4 rounded-lg shadow-lg h-64">
                                
                                        <div class=" sm:py-18 py-8  px-4 flex flex-col items-center rounded-lg space-y-1.5">
                                                <div class=" flex items-center justify-center w-24 h-24 rounded-full e -top-12">
                                                    <img src="/images/svg/flash.svg" class="p-4 " alt="">
                                                </div>
                                                <h5 class="fs-15 font-semibold text-center">Recruiter Connection</h5>
                                                <p class=" fs-13 font-light text-center">
                                                Build your ideal profile based on your needs

                                                </p>
                                        </div>
                                
                                    </div>

                                     <div class="overflow-dden bg-white pb-4   w-3/4  rounded-lg shadow-lg mt-8 h-64">

                                        <div class=" sm:py-18 py-8  px-4 flex flex-col items-center rounded-lg space-y-1.5">
                                                <div class=" flex items-center justify-center w-24 h-24 rounded-full e -top-12">
                                                    <img src="/images/svg/maximize-circle.svg" class="p-4 " alt="">
                                                </div>
                                                <h5 class="fs-15 font-semibold text-center">Customized Profile</h5>
                                                <p class=" fs-13 font-light text-center">
                                                Build your ideal profile based on your needs

                                                </p>
                                        </div>
                                
                                    </div>

                        </div>
                    </div>
                </div>


                <div  class="px-16 mt-8">
                   <div class="pt-4 pb-6 bg-white sm:pb-0">
                        <div class="sm:max-w-[100%] lg:ml-auto mx-auto flex justify-between ui-wrapper-large ">

                            <div class="hidden lg:w-1/2 lg:flex">
                                  <div class="w-4/5 m-0">
                                <h3 class="text-30 font-bold text-fatou-black sm:fs-35 sm:space-y-0">Our  <span class="border-b-4 border-fatou-blue">Team</span></h3>
                            </div>

                            
                        </div>

                            <div class=" flex flex-col items-start w-full py-10 space-y-6 lg:w-2/4 px- sm:pt-6 ">
                                    <!-- <div class="absolute z-0 hidden rounded-full lg:block bottom-56 -right-14 w-14 h-14 bg-fatou-blue">
                                    </div> -->

                                    <div class="grid grid-cols-2 gap-1 w-full">

                                     <div class="overflow-dden bg-white pb-1   w-3/4  rounded-md shadow-md">

                                        <img src="/images/png/blacks.jpg" class="w-full h-32 sm:w-full" alt="">
                                        <div class=" sm:py-2 py-8  px-4 flex flex-col rounded-lg ">
                                            
                                            <p class=" fs-13 font-bold mt-3">
                                                Saliou “Lou” Dioum
                                            </p>

                                            <p class=" fs-13 sm:py-8 py-2 font-bold">
                                                Co-Founder 
                                            </p>
                                        </div>
                                
                                    </div>

                                     <div class="overflow-dden bg-white pb-1   w-3/4  rounded-md shadow-md mt-8">

                                        <img src="/images/png/blacks.jpg" class="w-full h-32 sm:w-full" alt="">
                                        <div class=" sm:py-2 py-8  px-4 flex flex-col rounded-lg ">
                                            
                                            <p class=" fs-13 font-bold mt-3">
                                                Saliou “Lou” Dioum
                                            </p>

                                            <p class=" fs-13 sm:py-8 py-2 font-bold">
                                                Co-Founder 
                                            </p>
                                        </div>
                                
                                    </div>
  

                                    </div>   


                                    <div class="grid grid-cols-2 gap-1 w-full mt-20">

                                     <div class="overflow-dden bg-white pb-1   w-3/4  rounded-md shadow-md">

                                        <img src="/images/png/blacks.jpg" class="w-full h-32 sm:w-full" alt="">
                                        <div class=" sm:py-2 py-8  px-4 flex flex-col rounded-lg ">
                                            
                                            <p class=" fs-13 font-bold mt-3">
                                                Saliou “Lou” Dioum
                                            </p>

                                            <p class=" fs-13 sm:py-8 py-2 font-bold">
                                                Co-Founder 
                                            </p>
                                        </div>
                                
                                    </div>

                                    <div class="overflow-dden bg-white pb-1   w-3/4  rounded-md shadow-md mt-8">

                                        <img src="/images/png/blacks.jpg" class="w-full h-32 sm:w-full" alt="">
                                        <div class=" sm:py-2 py-8  px-4 flex flex-col rounded-lg ">
                                            
                                            <p class=" fs-13 font-bold mt-3">
                                                Saliou “Lou” Dioum
                                            </p>

                                            <p class=" fs-13 sm:py-8 py-2 font-bold">
                                                Co-Founder 
                                            </p>
                                        </div>
                                
                                    </div>
  

                                    </div>                       
                            </div>




                        </div>
                    </div>
                </div>


            <div class="ui-wrapper-xmini w-full px-8">
               <div class="flex flex-col  w-full px-4 py-4 space-y-8 sm:w-5/6 sm:mx-auto sm:py-2 sm:flex-row sm:space-y-0" >
                    <div class="w-full sm:w-3/5">
                        <img src="/images/png/Testimo.png" class="w-full sm:w-2/3 rounded-lg" alt="">
                    </div>
                    <div class="flex flex-col items-start justify-enter py-12 w-full  space-y-5 sm:w-1/2 ">
                        <div class="w-full m-0 bg-gray-100 rounded-md px-8 py-4">
                            <h6 class="font-bold fs-17">Adeola Daniel</h6>
                            <p class="font-bold fs-17">Product designer</p>
                             <p class="fs-16 text-fatou-black-100 sm:fs-15 font-light leading-9 sm:space-y-0 mt-8 pr-12">At Fatou, we want to create space for inclusion to help and enable people of color to engage with each other </p>
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







 