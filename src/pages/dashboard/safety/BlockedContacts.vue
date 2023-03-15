<script>

export default {
    data(){
        return {
            contacts: []
        }
    }
}
</script>
<template>
        <div class="mt-16 card rounded-lg bg-white max-w-4xl mx-auto">
            <div class="card-body">
                <div class="flex items-center sm:space-x-3">
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
                    <h3 class="text-fatou-black text-lg font-medium">
                        People you have blocked
                    </h3>
                </div>

                <!--  -->

                <div class="w-full flex items-center justify-end sm:py-0 py-2">
                        <div class="input flex items-center pl-2 rounded-lg py-1">
                            <span>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24.903 26.1428L17.283 18.5214C13.8932 20.9314 9.22222 20.3419 6.53746 17.1653C3.85271 13.9888 4.04984 9.28489 6.99097 6.34411C9.93131 3.40204 14.6357 3.20405 17.8128 5.88866C20.99 8.57327 21.5798 13.2447 19.1696 16.6348L26.7896 24.2561L24.9043 26.1414L24.903 26.1428ZM12.647 6.66676C10.1186 6.66619 7.93722 8.44101 7.4236 10.9167C6.90998 13.3924 8.20525 15.8885 10.5252 16.8938C12.8452 17.899 15.5522 17.1372 17.0073 15.0695C18.4624 13.0018 18.2657 10.1965 16.5363 8.35211L17.343 9.15211L16.4336 8.24544L16.4176 8.22944C15.42 7.22568 14.0622 6.66294 12.647 6.66676Z" fill="#ADB5BD"/>
                                </svg>
                            </span>
                            <input type="search" class="w-full h-full bg-fatou-gray-200 focus:outline-none py-1.5 px-3" placeholder="Search blocked" />
                        </div>
                </div>


                <!-- cards -->
                  <!--  -->
               <div class="grid sm:grid-cols-3 grid-cols-1 gap-6 pt-8">
                    <div class="border border-fatou-black-50 text-fatou-gray-600 rounded-xl flex flex-col items-center space-y-3 px-4 py-6 relative">
                            <img @click="viewUserModal = !viewUserModal" src="/images/png/database1.png" class="rounded-full h-36 w-36 pt-2 cursor-pointer" alt="">
                            
                            <div>
                                <h2 class="text-fatou-black text-xl font-medium flex items-center">Cody Fisher
                                    &nbsp;<img src="/images/svg/linkedin.svg" alt="linkedin" class="h-5 w-5">
                                </h2>
                                <p class="text-fatou-black text-sm">Engineer @ Google</p>
                            </div>
                            <p class="text-sm text-fatou-black">Location: New York</p>

                            <div class="flex flex-col items-center justify-center">
                                <span class="text-fatou-black font-medium">Reason for joining?</span>
                                <div class="flex items-center space-x-1 px-3.5 py-1 bg-fatou-gray-700 rounded-full">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.08366 8.75V7.91667C7.08366 7.47464 6.90806 7.05072 6.5955 6.73816C6.28294 6.4256 5.85902 6.25 5.41699 6.25H2.08366C1.64163 6.25 1.21771 6.4256 0.905148 6.73816C0.592587 7.05072 0.416992 7.47464 0.416992 7.91667V8.75" stroke="#21BCD1" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M3.74967 4.58333C4.67015 4.58333 5.41634 3.83714 5.41634 2.91667C5.41634 1.99619 4.67015 1.25 3.74967 1.25C2.8292 1.25 2.08301 1.99619 2.08301 2.91667C2.08301 3.83714 2.8292 4.58333 3.74967 4.58333Z" stroke="#21BCD1" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9.58301 8.75003V7.9167C9.58273 7.54742 9.45982 7.18869 9.23358 6.89683C9.00733 6.60497 8.69056 6.39652 8.33301 6.3042" stroke="#21BCD1" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M6.66699 1.3042C7.0255 1.39599 7.34326 1.60449 7.57017 1.89683C7.79709 2.18917 7.92026 2.54871 7.92026 2.91878C7.92026 3.28885 7.79709 3.6484 7.57017 3.94074C7.34326 4.23307 7.0255 4.44157 6.66699 4.53337" stroke="#21BCD1" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                 <span class="text-fatou-blue text-xs ">Badge</span>
                            </div>
                                
                            </div>
                           <div class="w-full flex items-center justify-center">
                                <button class="bg-transparent text-fatou-red py-1.5 px-8 rounded-full font-medium border-2 border-fatou-red">
                                Unblock
                            </button>
                           </div>

                        </div>
                        <!--  -->
                        <div class="border border-fatou-black-50 text-fatou-gray-600 rounded-xl flex flex-col items-center space-y-3 px-4 py-6 relative">
                            <img @click="viewUserModal = !viewUserModal" src="/images/png/database3.png" class="rounded-full h-36 w-36 pt-2 cursor-pointer" alt="">
                            
                            <div>
                                <h2 class="text-fatou-black text-xl font-medium flex items-center">Cody Fisher
                                    &nbsp;<img src="/images/svg/linkedin.svg" alt="linkedin" class="h-5 w-5">
                                </h2>
                                <p class="text-fatou-black text-sm">Engineer @ Google</p>
                            </div>
                            <p class="text-sm text-fatou-black">Location: New York</p>

                            <div class="flex flex-col items-center justify-center">
                                <span class="text-fatou-black font-medium">Reason for joining?</span>
                                <div class="flex items-center space-x-1 px-3.5 py-1 bg-fatou-gray-700 rounded-full">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.08366 8.75V7.91667C7.08366 7.47464 6.90806 7.05072 6.5955 6.73816C6.28294 6.4256 5.85902 6.25 5.41699 6.25H2.08366C1.64163 6.25 1.21771 6.4256 0.905148 6.73816C0.592587 7.05072 0.416992 7.47464 0.416992 7.91667V8.75" stroke="#21BCD1" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M3.74967 4.58333C4.67015 4.58333 5.41634 3.83714 5.41634 2.91667C5.41634 1.99619 4.67015 1.25 3.74967 1.25C2.8292 1.25 2.08301 1.99619 2.08301 2.91667C2.08301 3.83714 2.8292 4.58333 3.74967 4.58333Z" stroke="#21BCD1" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9.58301 8.75003V7.9167C9.58273 7.54742 9.45982 7.18869 9.23358 6.89683C9.00733 6.60497 8.69056 6.39652 8.33301 6.3042" stroke="#21BCD1" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M6.66699 1.3042C7.0255 1.39599 7.34326 1.60449 7.57017 1.89683C7.79709 2.18917 7.92026 2.54871 7.92026 2.91878C7.92026 3.28885 7.79709 3.6484 7.57017 3.94074C7.34326 4.23307 7.0255 4.44157 6.66699 4.53337" stroke="#21BCD1" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                 <span class="text-fatou-blue text-xs ">Badge</span>
                            </div>
                                
                            </div>
                           <div class="w-full flex items-center justify-center">
                                <button class="bg-transparent text-fatou-red py-1.5 px-8 rounded-full font-medium border-2 border-fatou-red">
                                Unblock
                            </button>
                           </div>

                        </div>
                </div>
            </div>
        </div>
</template>