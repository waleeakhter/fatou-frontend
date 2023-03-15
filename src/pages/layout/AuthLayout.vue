<template>
    <div class="w-full flex flex-col items-center justify-center space-y-10">
            <div class="w-full flex flex-col items-center justify-center pt-8 space-y-5">
                    <img src="/images/png/logo.png" alt="zshift logo" class="w-28" />
                    <h3 v-if="!$route.meta.description" class="text-fatou-black fs-16 font-semibold text-center">Build a meaningful network that understands you the <span class="text-fatou-blue">best!</span></h3>
                </div>
            <div v-if="$route.meta.description" class="w-full flex flex-col items-center justify-center">
                    <h3 class="text-fatou-black text-2xl font-medium">
                        {{
                            $route.meta.description 
                        }}
                    </h3>
                </div>
            <div class="w-full px-4 sm:px-0 sm:w-1/3">
                <div class=" bg-white rounded-lg">
                    <nav>
                        <ul v-if="$route.name === 'home.auth.signin' || $route.name === 'home.auth.signup'" class="flex items-center justify-between pt-8 pb-2">
                            <router-link to="/auth/signin" class="w-1/2 text-center py-2 border-b-4 inactive">
                                <li class="">
                                        Log In
                                </li>
                            </router-link>
                             <router-link to="/auth/Signup" class="w-1/2 text-center py-2 border-b-4 inactive">
                            <li class="">
                            Signup</li>
                            </router-link>
                        </ul>
                        <ul v-else-if="$route.name === 'home.auth.forgot.password'" class="flex items-center justify-between pt-8 pb-2">
                            <router-link to="/auth/signin" class="w-full text-center py-2 border-b-4 active">
                                <li class="">
                                        Reset password
                                </li>
                            </router-link>
                        </ul>
                        <ul v-else-if="$route.name === 'home.auth.verify.account'" class=" flex items-center justify-between pt-8 pb-2">
                            <router-link to="/auth/signup/verify" class="w-full text-center py-2 border-b-4 active">
                                <li class="">
                                   Activate Account
                                </li>
                            </router-link>
                        </ul>
                    </nav>
                    <!-- forms -->
                    <div class="p-4">
                        <div class="sm:w-4/5 w-full mx-auto">
                            <router-view />
                        </div>
                    </div>

                    
                </div>
            </div>

    </div>
</template>
<style scoped>
body {
    background: #F0F4F5;
}
.inactive {
    color: #92929D;
    font-weight: 600;
    border-bottom: 4px solid rgba(235, 228, 253, 0.4);
}

 .active, a.router-link-exact-active  { 
    color: #000;
    font-weight: 600;
    border-bottom: 4px solid #21BCD1;
}

</style>