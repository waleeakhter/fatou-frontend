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
    <div class="w-full ">
        
        <div class="w-full">
            <!-- header -->
                <header class="w-full bg-white ">
                    <nav class="flex items-center justify-between px-4 py-5 sm:px-14">
                        <img src="/images/png/logo.png" alt="Fatou" class="w-24">
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
                                Get Started
                            </router-link>
                        </div>
                    </nav>
                </header> 

                <div  class="">
                    <div class="pt-4 pb-6 bg-white sm:pb-0">
                        <div class="sm:max-w-[90%] lg:ml-auto mx-auto flex justify-between ui-wrapper-large ">
                            <div class="relative flex flex-col items-start w-full py-10 text-center space-y-6 lg:w-2/4 px- sm:pt-6 ">
                                <!-- <div class="absolute z-0 hidden rounded-full lg:block bottom-56 -right-14 w-14 h-14 bg-fatou-blue">
                                </div> -->
                                    <h3 class="fs-35 font-bold sm:fs-43 text-black text-center l-height">Build a meaningful <span class="relative text-fatou-blue">
                                        network
                                        </span> 
                                            that understands you <span class="relative text-fatou-blue">
                                        best!
                                        </span></h3>
                                    <p class="sm:fs-15 fs-14 py-0 px-0 sm:text-center  -bottom-2">Fatou is the platform for diverse professionals to connect and
                                        support advancement around the globe. We welcome contributions to our community from members of all races, ethnicities, religious groups, spiritual beliefs,
                                        and genders that would join with us as we strive to create space for diversity.</p>
                                    
                                    <div v-if="!isAuthenticated" class="flex items-center w-full space-x-3 justify-center">
                                        <ButtonBox @click="routePage" btnText="Join Today" />
                                        <ButtonOutline @click="routePage" btnText="Signin" class="block px-12 sm:hidden" />
                                    </div>
                                    <div v-else class="items-center justify-center w-full space-x-3 sm:flex">
                                        <router-link  to="/home" class="bg-fatou-blue text-white py-2.5 px-8 font-light">
                                            Explore
                                        </router-link>
                                    </div>
                                </div>
            

                                <div class="relative z-10 items-end justify-end hidden lg:w-1/2 lg:flex p">
                                    <img src="/images/png/connect.png" class="absolute left-[7%] top-[-20%]" alt="">
                                    <!-- <img src="/images/png/banner2.png" class="absolute top-[10%]" alt="">
                                    <img src="/images/png/banner3.png" class="absolute top-[52%] left-[0%]" alt="">
                                    <img src="/images/png/banner4.png" class="absolute top-[32%] left-[30%]" alt="">
                                    <img src="/images/png/banner5.png" class="absolute bottom-[-5%] right-[5%]" alt=""> -->
                                </div>
                        </div>
                    </div>
                </div>
            </div>

 <div class="ui-wrapper-small">
            <div class="w-full px-4 py-6 mt-3 mb-8 sm:w-5/6 sm:mx-auto">
         <h3 class="fs-35 font-semibold text-center text-fatou-black sm:fs-35 mb-20">How it <span class="border-b-4 border-fatou-blue">Works</span></h3>
         <div class="flex flex-col w-full py-8 space-y-10 sm:flex-row sm:space-y-0">
                          <div class="relative flex flex-col items-center justify-center h-40 px-10 py-5  rounded-lg sm:flex-1 border-fatou-black-50">
                 <div class="absolute flex items-center justify-center w-24 h-24 rounded-full e -top-12">
                     <img src="/images/svg/note-2.svg" class="p-4 " alt="">
                 </div>
                 <span class="text-xl font-light text-fatou-black sm:text-1xl">Register</span>
             </div>
             
             <div class="relative flex flex-col items-center justify-center h-40 px-10 py-5  rounded-lg sm:flex-1 border-fatou-black-50">
                 <div class="absolute flex items-center justify-center w-24 h-24 rounded-full e -top-12">
                     <img src="/images/svg/shield-tick.svg" class="p-4 " alt="">
                 </div>
                 <span class="text-xl font-light text-fatou-black sm:text-1xl">Complete Profile</span>
             </div>
            
               <div class="relative flex flex-col items-center justify-center h-40 px-10 py-5  rounded-lg sm:flex-1 border-fatou-black-50">
                 <div class="absolute flex items-center justify-center w-24 h-24 rounded-full e -top-12">
                     <img src="/images/svg/people.svg" class="p-4 " alt="">
                 </div>
                 <span class="text-xl font-light text-fatou-black sm:text-1xl">Join Network</span>
             </div>
         </div>
    </div>
    </div> 


    <div class="ui-wrapper-xmini w-full px-8 bg-center bg-no-repeat  " style="background-image: url('/imaes/png/bg-abt.png')">
        <div class="w-full carousel">
        <div id="slide1" class="relative w-full carousel-item">
            <div class="flex flex-col  w-full px-4 py-4 space-y-8 sm:w-5/6 sm:mx-auto sm:py-2 sm:flex-row sm:space-y-0" >
                <div class="w-full sm:w-3/5">
                    <img src="/images/png/blacks.png" class="w-full sm:w-5/6 rounded-lg" alt="">
                </div>
                <div class="flex flex-col items-start justify-enter py-12 w-full  space-y-5 sm:w-1/2 ">
                    <div class="w-full m-0">
                        <h3 class="text-30 font-bold text-center text-fatou-black sm:fs-35 sm:space-y-0">Grow Your <span class="border-b-4 border-fatou-blue">Network</span></h3>
                    </div>
                    <p class="fs-16 text-fatou-black-100 sm:fs-17 text-center font-light leading-9 sm:space-y-0 mt-8">Diversify your network by connecting and building strong support systems that would help enable endless opportunities. </p>
                </div>
            </div>

            <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" class="btn btn-circle bg-fatou-blue-100 border-none">❮</a> 
                <a href="#slide2" class="btn btn-circle bg-fatou-blue-100 border-none">❯</a>
            </div>
        </div> 
        <div id="slide2" class="relative w-full carousel-item">
            <div class="flex flex-col  w-full px-4 py-4 space-y-8 sm:w-5/6 sm:mx-auto sm:py-2 sm:flex-row sm:space-y-0" >
                <div class="w-full sm:w-3/5">
                    <img src="/images/png/land.png" class="w-full sm:w-5/6 rounded-lg" alt="">
                </div>
                <div class="flex flex-col items-start justify-enter py-12 w-full  space-y-5 sm:w-1/2 ">
                    <div class="w-full m-0">
                        <h3 class="text-30 font-bold text-center text-fatou-black sm:fs-35 sm:space-y-0">Land Your Dream <span class="border-b-4 border-fatou-blue">Job</span></h3>
                    </div>
                    <p class="fs-16 text-fatou-black-100 sm:fs-17 text-center font-light leading-9 sm:space-y-0 mt-8">We partnered with trusted companies who valued diversity and inclusion. Rather than just submitting a resume, we allow users to apply with their profile, as well 
                        as allowing hiring companies to engage with candidates on the job market. </p>
                </div>
            </div>
            <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" class="btn btn-circle bg-fatou-blue-100 border-none">❮</a> 
                <a href="#slide3" class="btn btn-circle bg-fatou-blue-100 border-none">❯</a>
            </div>
        </div> 
        <div id="slide3" class="relative w-full carousel-item">
            <div class="flex flex-col  w-full px-4 py-4 space-y-8 sm:w-5/6 sm:mx-auto sm:py-2 sm:flex-row sm:space-y-0" >
                    <div class="w-full sm:w-3/5 -mt-16 ">
                        <img src="/images/png/find-mentor.png" class="w-full sm:w-5/6 rounded-lg -mt-16" alt="">
                    </div>
                    <div class="flex flex-col items-start justify-enter py-12 w-full  space-y-5 sm:w-1/2 ">
                        <div class="w-full m-0">
                            <h3 class="text-30 font-bold text-center text-fatou-black sm:fs-35 sm:space-y-0">Find A <span class="border-b-4 border-fatou-blue">Mentor</span></h3>
                        </div>
                        <p class="fs-16 text-fatou-black-100 sm:fs-17 text-center font-light leading-9 sm:space-y-0 mt-8">Our mentorship database will allow you to learn from the experiences of others through practical advice, encouragement and support of people within your field. </p>
                    </div>
                </div>
                    <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" class="btn btn-circle bg-fatou-blue-100 border-none">❮</a> 
            <a href="#slide4" class="btn btn-circle bg-fatou-blue-100 border-nonex">❯</a>
            </div>
        </div> 
        <div id="slide1" class="relative w-full carousel-item">
            <div class="flex flex-col  w-full px-4 py-4 space-y-8 sm:w-5/6 sm:mx-auto sm:py-2 sm:flex-row sm:space-y-0" >
                <div class="w-full sm:w-3/5 -mt-16">
                    <img src="/images/png/gorow.png" class="w-full sm:w-5/6 rounded-lg -mt-16" alt="">
                </div>
                <div class="flex flex-col items-start justify-enter py-12 w-full  space-y-5 sm:w-1/2 ">
                    <div class="w-full m-0">
                        <h3 class="text-30 font-bold text-center text-fatou-black sm:fs-35 sm:space-y-0">Get An <span class="border-b-4 border-fatou-blue">Internship</span></h3>
                    </div>
                    <p class="fs-16 text-fatou-black-100 sm:fs-17 text-center font-light leading-9 sm:space-y-0 mt-8">Diversify your network by connecting and building strong support systems that would help enable endless opportunities. </p>
                </div>
            </div>

            <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" class="btn btn-circle bg-fatou-blue-100 border-none">❮</a> 
                <a href="#slide1" class="btn btn-circle bg-fatou-blue-100 border-none">❯</a>
            </div>
        </div>
        </div>
    </div>

    <div class="py-5 lg:py-0">
    </div>
    
 

    <div class="py-5 sm:py-0">
    </div>
   
    <!--  -->
      <div class="ui-wrapper-small bg-gray-0" >
            <div class="px-4 py-6 mt-8 mb-8 sm:w-5/6 sm:mx-auto">
         <h3 class="mb-2 fs-26 font-semibold text-center text-fatou-black sm:fs-35">Why <span class="border-b-4 border-fatou-blue">Fatou?</span></h3>
         <!-- <h3 class="mb-10 fs-17 font-medium text-center text-fatou-black sm:fs-18 sm:mb-6">Marginalized People Need More <span class="text-fatou-blue">Support.</span></h3> -->
 
        <div class="container my-12 py-8 mx-auto px-4 md:px-12">
    <div class="flex flex-wrap -mx-1 lg:-mx-4">

      <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">

          <div class="overflow-hidden bg-white h-52 rounded-lg shadow-lg">

               <div class=" sm:py-18 py-8 px-10 flex flex-col items-center rounded-lg space-y-1.5">
                 <h3 class="fs-20 font-semibold py-4 text-blace">Lack of <span class="border-b-4 border-fatou-blue">Equity</span></h3>
                 <p class="text-center fs-15 font-light">
                     Minority issues have been on the agenda of the world for centuries
                 </p>
             </div>
      
          </div>

        </div>

           <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">

          <div class="overflow-hidden bg-white h-52 rounded-lg shadow-lg">

               <div class=" sm:py-18 py-8 px-10 flex flex-col items-center rounded-lg space-y-1.5">
                 <h3 class="fs-20 font-semibold py-4 text-blace">Lack of <span class="border-b-4 border-fatou-blue">Networking</span></h3>
                 <p class="text-center fs-15 font-light">
                    Existing platforms do not speak or cater to problems minorities face daily
                 </p>
             </div>
      
          </div>

        </div>

           <div class="my-1 px-1 w-full  md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">

                   <div class="overflow-hidden bg-white h-52 rounded-lg shadow-lg">

               <div class=" sm:py-18 py-8 px-10 flex flex-col items-center rounded-lg space-y-1.5">
                 <h3 class="fs-20 font-semibold py-4 text-blace">Lack of <span class="border-b-4 border-fatou-blue">Unity</span>
</h3>
                 <p class="text-center fs-15 font-light">
                    There are too many groups and communities but no one central place for all minorities
                 </p>
             </div>
    
          </div>

        </div>
    

    </div>
</div>
                <!-- <div class="flex flex-col py-6 space-y-6 sm:flex-row sm:space-x-8 sm:space-y-0">
             <div class="bg-white sm:py-18 py-10 px-10 flex flex-col items-center rounded-lg space-y-1.5 w-1/2">
                 <h3 class="fs-17 font-semibold text-blace">Lack of Equality</h3>
                 <p class="text-center fs-15 font-light">
                     Minority issues have been on the agenda of the world for centuries
                 </p>
             </div>
                <div class="bg-white sm:py-18 py-10 px-10 flex flex-col items-center rounded-lg space-y-1.5">
                 <h3 class="fs-17 font-semibold text-blace">Lack of Equality</h3>
                 <p class="text-center fs-15 font-light">
                     Minority issues have been on the agenda of the world for centuries
                 </p>
             </div>
                    <div class="bg-white sm:py-18 py-10 px-10 flex flex-col items-center rounded-lg space-y-1.5">
                 <h3 class="fs-17 font-semibold text-blace">Lack of Equality</h3>
                 <p class="text-center fs-15 font-light">
                     Minority issues have been on the agenda of the world for centuries
                 </p>
             </div>
         </div> -->
        </div>
      </div>



    <!--  -->
    <div class="w-full mt-8 sm:py-12">
         <h3 class="mb-8 fs-35 font-bold text-center text-black sm:mb-0">Creating space for <span class="border-b-4 border-fatou-blue">inclusion...</span></h3>
            <div class="px-4 mapbg sm:px-0">
                <!-- comments images -->
                <div class="relative hidden w-full h-full sm:block">
                    <img src="/images/png/mp1.png" class="mapbg-points mp1 w-24" alt="">
                    <img src="/images/png/mp2.png" class="mapbg-points mp2 w-24" alt="">
                    <img src="/images/png/mp3.png" class="mapbg-points mp3 w-24" alt="">
                    <img src="/images/png/mp4.png" class="mapbg-points mp4 w-24" alt="">
                    <img src="/images/png/mp5.png" class="mapbg-points mp5 w-12" alt="">
                    <img src="/images/png/mp6.png" class="mapbg-points mp6 w-12" alt="">
                    <img src="/images/png/vanesa.png" class="mapbg-points mp7 w-12" alt="">
                    <img src="/images/png/mp8.png" class="mapbg-points mp8 w-12" alt="">
                    <img src="/images/png/mp9.png" class="mapbg-points mp9 w-12"  alt="">
                    <img src="/images/png/mp11.png" class="mapbg-points mp11 w-12" alt="">
                    <img src="/images/png/mp12.png" class="mapbg-points mp12 w-12" alt="">
                     <img src="/images/png/mp13.png" class="mapbg-points mp13 w-12" alt="">
                    
                </div>

                <div class="block w-full h-full sm:hidden pt-28">
                        <div class="relative flex flex-col items-center justify-center h-40 px-10 py-5 bg-white sm:flex-1 rounded-xl drop-shadow-comment">
                            <div class="absolute flex items-center justify-center w-24 h-24 bg-transparent rounded-full -top-14">
                                <img src="/images/png/mp6.png" class="" alt="">
                            </div>
                            <span class="text-[#2D3150] font-semibold sm:text-1xl  text-xl">Rocky Dixon</span>
                            <p class="text-[#3C405F] text-lg text-center">“The features on fatou.com make  easy to connect”</p>
                        </div>
                </div>

         </div>
    </div>

    <div class="flex flex-col items-center justify-center w-full py-20 space-y-6 sm:w-5/6 sm:mx-auto bg-fatou--light rounded-2xl sm:space-y-14">
        <h3 class="text-2xl font-bold text-center sm:fs-35 text-fatou-black">Subscribe to Our <span class="border-b-4 border-fatou-blue">Newsletter</span></h3>
        <form action="" class="flex flex-col items-center justify-center space-y-2">
           <div class="flex bg-white  items-center pl-4 p-1.5">
                <span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M19 4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V17C2 17.7956 2.31607 18.5587 2.87868 19.1213C3.44129 19.6839 4.20435 20 5 20H19C19.7956 20 20.5587 19.6839 21.1213 19.1213C21.6839 18.5587 22 17.7956 22 17V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4ZM19 6L12.5 10.47C12.348 10.5578 12.1755 10.604 12 10.604C11.8245 10.604 11.652 10.5578 11.5 10.47L5 6H19Z" fill="#27D1E8"/>
                </svg>
            </span>
            <input type="text" class="focus:outline-none py-1.5 px-2" placeholder="Your email here" />
            <ButtonBox btnText="Subscribe" class="hidden sm:block" />
           </div>
           <ButtonBox btnText="Subscribe" class="block sm:hidden" />
        </form>
    </div>
    <div class="py-12">
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







 