<template>
    <div class="sm:px-8 mt-16">
        <div class="w-full bg-white sm:px-8 px-4 py-6 rounded-xl space-y-3">
            <h4 class="text-xl text-fatou-black font-medium">Chats</h4>

            <div class="border h-full border-fatou-black-50 rounded-xl divide-x divide-fatou-black-50 flex sm:flex-row flex-col">
                <div class="sm:w-1/4 w-full h-full divide-y divide-fatou-black-50">
                    <div class="px-4 py-3">
                            <div class="w-full input flex items-center pl-2 rounded-lg py-1">
                                <span>
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24.903 26.1428L17.283 18.5214C13.8932 20.9314 9.22222 20.3419 6.53746 17.1653C3.85271 13.9888 4.04984 9.28489 6.99097 6.34411C9.93131 3.40204 14.6357 3.20405 17.8128 5.88866C20.99 8.57327 21.5798 13.2447 19.1696 16.6348L26.7896 24.2561L24.9043 26.1414L24.903 26.1428ZM12.647 6.66676C10.1186 6.66619 7.93722 8.44101 7.4236 10.9167C6.90998 13.3924 8.20525 15.8885 10.5252 16.8938C12.8452 17.899 15.5522 17.1372 17.0073 15.0695C18.4624 13.0018 18.2657 10.1965 16.5363 8.35211L17.343 9.15211L16.4336 8.24544L16.4176 8.22944C15.42 7.22568 14.0622 6.66294 12.647 6.66676Z" fill="#ADB5BD"/>
                                    </svg>
                                </span>
                                <input type="search" class="w-full h-full bg-fatou-gray-200 focus:outline-none py-2 px-3" placeholder="Search Chats" />
                            </div>
                    </div>
                    <!--  -->

                    <!-- chats -->
                    <div class="py-6 space-y-2.5">
                        <!--  -->
                         <div class="flex items-center justify-between px-2 py-3 chat-active">
                            <div>
                                <img src="/images/png/chatUser3.png" class="h-12 w-12 rounded-full" alt="">
                            </div>
                                    <div class="flex h-full flex-col items-start justify-between">
                                        <h3 class="text-fatou-black font-medium">Theresa Webb</h3>
                                        <p class="text-sm fatou-text-black-opacity font-bold">Enter your message here</p>
                                    </div>
                                    <div class="space-y-1.5">
                                        <span>
                                            <h1 class="text-sm fatou-text-black-opacity font-medium">13m</h1>
                                        </span>
                                        <div class="flex items-center space-x-1 px-2.5 py-1 bg-fatou-gray-700 rounded-full">
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.08366 8.75V7.91667C7.08366 7.47464 6.90806 7.05072 6.5955 6.73816C6.28294 6.4256 5.85902 6.25 5.41699 6.25H2.08366C1.64163 6.25 1.21771 6.4256 0.905148 6.73816C0.592587 7.05072 0.416992 7.47464 0.416992 7.91667V8.75" stroke="#21BCD1" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M3.74967 4.58333C4.67015 4.58333 5.41634 3.83714 5.41634 2.91667C5.41634 1.99619 4.67015 1.25 3.74967 1.25C2.8292 1.25 2.08301 1.99619 2.08301 2.91667C2.08301 3.83714 2.8292 4.58333 3.74967 4.58333Z" stroke="#21BCD1" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M9.58301 8.75003V7.9167C9.58273 7.54742 9.45982 7.18869 9.23358 6.89683C9.00733 6.60497 8.69056 6.39652 8.33301 6.3042" stroke="#21BCD1" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M6.66699 1.3042C7.0255 1.39599 7.34326 1.60449 7.57017 1.89683C7.79709 2.18917 7.92026 2.54871 7.92026 2.91878C7.92026 3.28885 7.79709 3.6484 7.57017 3.94074C7.34326 4.23307 7.0255 4.44157 6.66699 4.53337" stroke="#21BCD1" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                            <span class="text-fatou-blue text-xs">Badge</span>
                                            </div>
                                    </div>
                        </div>
                        <!--  -->
                        <div class="flex items-center justify-between px-2 py-3">
                            <div>
                                <img src="/images/png/chatUser2.png" class="h-12 w-12 rounded-full" alt="">
                            </div>
                                    <div class="flex h-full flex-col items-start justify-between">
                                        <h3 class="text-fatou-black font-medium">Cameron Williamson</h3>
                                        <p class="text-sm fatou-text-black-opacity font-bold">Enter your message here</p>
                                    </div>
                                    <div class="space-y-1.5">
                                        <span>
                                            <h1 class="text-sm fatou-text-black-opacity font-medium">14m</h1>
                                        </span>
                                        <div class="flex items-center space-x-1 px-2.5 py-1 bg-fatou-gray-700 rounded-full">
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.08366 8.75V7.91667C7.08366 7.47464 6.90806 7.05072 6.5955 6.73816C6.28294 6.4256 5.85902 6.25 5.41699 6.25H2.08366C1.64163 6.25 1.21771 6.4256 0.905148 6.73816C0.592587 7.05072 0.416992 7.47464 0.416992 7.91667V8.75" stroke="#21BCD1" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M3.74967 4.58333C4.67015 4.58333 5.41634 3.83714 5.41634 2.91667C5.41634 1.99619 4.67015 1.25 3.74967 1.25C2.8292 1.25 2.08301 1.99619 2.08301 2.91667C2.08301 3.83714 2.8292 4.58333 3.74967 4.58333Z" stroke="#21BCD1" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M9.58301 8.75003V7.9167C9.58273 7.54742 9.45982 7.18869 9.23358 6.89683C9.00733 6.60497 8.69056 6.39652 8.33301 6.3042" stroke="#21BCD1" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M6.66699 1.3042C7.0255 1.39599 7.34326 1.60449 7.57017 1.89683C7.79709 2.18917 7.92026 2.54871 7.92026 2.91878C7.92026 3.28885 7.79709 3.6484 7.57017 3.94074C7.34326 4.23307 7.0255 4.44157 6.66699 4.53337" stroke="#21BCD1" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                            <span class="text-fatou-blue text-xs">Badge</span>
                                            </div>
                                    </div>
                        </div>
                        <!--  -->
                        <div class="flex items-center justify-between px-2 py-3">
                            <div>
                                <img src="/images/png/chatUser1.png" class="h-12 w-12 rounded-full" alt="">
                            </div>
                                    <div class="flex h-full flex-col items-start justify-between">
                                        <h3 class="text-fatou-black font-medium">Theresa Webb</h3>
                                        <p class="text-sm fatou-text-black-opacity font-bold">Enter your message here</p>
                                    </div>
                                    <div class="space-y-1.5">
                                        <span>
                                            <h1 class="text-sm fatou-text-black-opacity font-medium">14m</h1>
                                        </span>
                                        <div class="flex items-center space-x-1 px-2.5 py-1 bg-fatou-gray-700 rounded-full">
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.08366 8.75V7.91667C7.08366 7.47464 6.90806 7.05072 6.5955 6.73816C6.28294 6.4256 5.85902 6.25 5.41699 6.25H2.08366C1.64163 6.25 1.21771 6.4256 0.905148 6.73816C0.592587 7.05072 0.416992 7.47464 0.416992 7.91667V8.75" stroke="#21BCD1" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M3.74967 4.58333C4.67015 4.58333 5.41634 3.83714 5.41634 2.91667C5.41634 1.99619 4.67015 1.25 3.74967 1.25C2.8292 1.25 2.08301 1.99619 2.08301 2.91667C2.08301 3.83714 2.8292 4.58333 3.74967 4.58333Z" stroke="#21BCD1" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M9.58301 8.75003V7.9167C9.58273 7.54742 9.45982 7.18869 9.23358 6.89683C9.00733 6.60497 8.69056 6.39652 8.33301 6.3042" stroke="#21BCD1" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M6.66699 1.3042C7.0255 1.39599 7.34326 1.60449 7.57017 1.89683C7.79709 2.18917 7.92026 2.54871 7.92026 2.91878C7.92026 3.28885 7.79709 3.6484 7.57017 3.94074C7.34326 4.23307 7.0255 4.44157 6.66699 4.53337" stroke="#21BCD1" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                            <span class="text-fatou-blue text-xs">Badge</span>
                                            </div>
                                    </div>
                        </div>
                    </div>
                </div>
                <!--  -->
                <div class="sm:w-3/4 sm:block hidden w-full divide-y divide-fatou-black-50">
                    <div class="w-full px-4 py-x">
                            <div class="flex items-center space-x-4">
                                <div>
                                    <img src="/images/png/chatUser3.png" class="h-11 w-11 rounded-full" alt="">
                                </div>
                                <div class="flex h-full flex-col items-start justify-between">
                                    <h3 class="sm:text-lg text-sm font-medium">Leslie Alexander</h3>
                                    <div class="flex items-center space-x-1.5">
                                        <span class="h-2.5 w-2.5 rounded-full online-status"></span>
                                        <span class="sm:text-sm text-xs text-fatou-black">Online</span>
                                    </div>
                                </div>
                        </div>
                    </div>

                    <!--  -->

                    <div class="w-full h-70 flex flex-col">
                        <div class="w-full py-3.5 px-3 space-y-2.5 overflow-y-auto">
                            <!-- chat messaages -->
                            <div class="w-full flex-grow flex items-start justify-start space-x-2.5">
                                <!-- incoming -->
                                <img src="/images/png/chatUser3.png" class="sm:h-10 sm:w-10 w-8 h-8 rounded-full">
                                <div class="space-y-1 flex flex-col items-start">
                                    <span class="chat-bubble-incoming py-2 px-4 rounded-xl text-sm">Omg, this is amazing</span>
                                    <span class="chat-bubble-incoming py-2 px-4 rounded-xl text-sm">perfect! ✅</span>
                                    <span class="chat-bubble-incoming py-2 px-4 rounded-xl text-sm">Wow, this is really epic</span>
                                </div>
                            </div>

                            <!--  -->
                            <div class="w-full flex items-start justify-end space-x-1.5 sm:pr-6">
                                <!-- sent  -->
                                <div class="space-y-1 flex flex-col items-end">
                                    <span class="chat-bubble-sent py-2 px-4 rounded-xl text-sm">How are you?</span>
                                </div>
                            </div>

                            <!--  -->
                             <div class="w-full flex items-start justify-start space-x-2.5">
                                <!-- incoming -->
                                <img src="/images/png/chatUser3.png" class="sm:h-10 sm:w-10 w-8 h-8 rounded-full">
                                <div class="space-y-1 flex flex-col items-start">
                                    <span class="chat-bubble-incoming py-2 px-4 rounded-xl text-sm">just ideas for next time</span>
                                    <span class="chat-bubble-incoming py-2 px-4 rounded-xl text-sm">I'll be there in 2 mins ⏰</span>
                                </div>
                            </div>

                            <!--  -->
                            <div class="w-full flex items-start justify-end space-x-1.5 sm:pr-6">
                                <!-- sent  -->
                                <div class="space-y-1 flex flex-col items-end">
                                    <span class="chat-bubble-sent py-2 px-4 rounded-xl text-sm">woohoooo</span>
                                    <span class="chat-bubble-sent py-2 px-4 rounded-xl text-sm">Haha oh man</span>
                                    <span class="chat-bubble-sent py-2 px-4 rounded-xl text-sm">Haha that's terrifying 😂</span>
                                </div>
                            </div>

                            <!--  -->
                            <div class="w-full flex items-start justify-start space-x-2.5">
                                <!-- incoming -->
                                <img src="/images/png/chatUser3.png" class="sm:h-10 sm:w-10 w-8 h-8 rounded-full">
                                <div class="space-y-1 flex flex-col items-start">
                                    <span class="chat-bubble-incoming py-2 px-4 rounded-xl text-sm">aww</span>
                                    <span class="chat-bubble-incoming py-2 px-4 rounded-xl text-sm">omg, this is amazing</span>
                                    <span class="chat-bubble-incoming py-2 px-4 rounded-xl text-sm">woohoooo 🔥</span>
                                </div>
                            </div>

                            <!--  -->
                             <!--  -->
                             <div class="w-full flex items-start justify-start space-x-2.5">
                                <!-- incoming -->
                                <img src="/images/png/chatUser3.png" class="sm:h-10 sm:w-10 w-8 h-8 rounded-full">
                                <div class="space-y-1 flex flex-col items-start">
                                    <span class="chat-bubble-incoming py-2 px-4 rounded-xl text-sm">just ideas for next time</span>
                                    <span class="chat-bubble-incoming py-2 px-4 rounded-xl text-sm">I'll be there in 2 mins ⏰</span>
                                </div>
                            </div>

                            <!--  -->
                            <div class="w-full flex items-start justify-end space-x-1.5 sm:pr-6">
                                <!-- sent  -->
                                <div class="space-y-1 flex flex-col items-end">
                                    <span class="chat-bubble-sent py-2 px-4 rounded-xl text-sm">woohoooo</span>
                                    <span class="chat-bubble-sent py-2 px-4 rounded-xl text-sm">Haha oh man</span>
                                    <span class="chat-bubble-sent py-2 px-4 rounded-xl text-sm">Haha that's terrifying 😂</span>
                                </div>
                            </div>
                        </div>
                        <!-- input -->
                        <div class="w-full bg-white sm:py-6 py-4 px-2 sm:px-8 z-50">
                            <div class="w-full">
                                <!-- form -->
                                <form action="" class="w-full flex items-center sm:space-x-4">
                                    <div class="sm:block hidden">
                                       <button>
                                            <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M6.1875 20.5C2.82812 20.5 0.09375 17.7656 0.09375 14.3672C0.09375 12.7266 0.71875 11.1641 1.85156 10.0312L10.0938 1.78906C10.9531 0.96875 12.1641 0.5 13.3359 0.5C16.2656 0.5 17.9062 2.88281 17.9062 5.03125C17.9062 6.24219 17.3984 7.41406 16.5391 8.27344L9 15.8125C8.41406 16.3984 7.63281 16.6719 6.89062 16.6719C4.50781 16.6719 3.88281 14.5625 3.88281 13.7031C3.88281 12.9609 4.19531 12.1797 4.78125 11.5938L10.3281 6.04688C10.5625 5.8125 10.8359 5.73438 11.1094 5.73438C11.6953 5.73438 12.2031 6.20312 12.2031 6.82812C12.2031 7.10156 12.0859 7.375 11.8906 7.60938L6.30469 13.1562C6.14844 13.3125 6.07031 13.5078 6.07031 13.7031C6.07031 14.1719 6.46094 14.5234 6.89062 14.5234C7.08594 14.5234 7.28125 14.4453 7.4375 14.2891L15.0156 6.71094C15.4453 6.24219 15.6797 5.65625 15.6797 5.03125C15.6797 3.9375 14.8594 2.6875 13.3359 2.6875C12.7109 2.6875 12.0859 2.92188 11.6562 3.35156L3.41406 11.5938C2.67188 12.3359 2.28125 13.3125 2.28125 14.3672C2.28125 16.2422 3.64844 18.2734 6.1875 18.2734C7.24219 18.2734 8.25781 17.9219 9 17.1797L15.2109 10.9297C15.4453 10.7344 15.7188 10.6172 15.9922 10.6172C16.5781 10.6172 17.0859 11.0859 17.0859 11.7109C17.0859 11.9844 16.9688 12.2578 16.7734 12.4922L10.5234 18.7031C9.39062 19.875 7.82812 20.5 6.1875 20.5Z" fill="black"/>
                                        </svg>
                                       </button>
                                    </div>
                                    <!--  -->
                                    <div class="w-full sm:flex-grow flex items-center border-2 border-fatou-black-50 sm:px-4 px-2.5 py-0.5 rounded-xl">
                                        <input type="text" placeholder="Type a message" class="py-1.5 w-4/5 focus:outline-none sm:flex-grow">
                                        <div class="flex items-center justify-between sm:space-x-0 space-x-1.5 sm:w-auto w-1/5">
                                             <button class="sm:hidden">
                                            <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M6.1875 20.5C2.82812 20.5 0.09375 17.7656 0.09375 14.3672C0.09375 12.7266 0.71875 11.1641 1.85156 10.0312L10.0938 1.78906C10.9531 0.96875 12.1641 0.5 13.3359 0.5C16.2656 0.5 17.9062 2.88281 17.9062 5.03125C17.9062 6.24219 17.3984 7.41406 16.5391 8.27344L9 15.8125C8.41406 16.3984 7.63281 16.6719 6.89062 16.6719C4.50781 16.6719 3.88281 14.5625 3.88281 13.7031C3.88281 12.9609 4.19531 12.1797 4.78125 11.5938L10.3281 6.04688C10.5625 5.8125 10.8359 5.73438 11.1094 5.73438C11.6953 5.73438 12.2031 6.20312 12.2031 6.82812C12.2031 7.10156 12.0859 7.375 11.8906 7.60938L6.30469 13.1562C6.14844 13.3125 6.07031 13.5078 6.07031 13.7031C6.07031 14.1719 6.46094 14.5234 6.89062 14.5234C7.08594 14.5234 7.28125 14.4453 7.4375 14.2891L15.0156 6.71094C15.4453 6.24219 15.6797 5.65625 15.6797 5.03125C15.6797 3.9375 14.8594 2.6875 13.3359 2.6875C12.7109 2.6875 12.0859 2.92188 11.6562 3.35156L3.41406 11.5938C2.67188 12.3359 2.28125 13.3125 2.28125 14.3672C2.28125 16.2422 3.64844 18.2734 6.1875 18.2734C7.24219 18.2734 8.25781 17.9219 9 17.1797L15.2109 10.9297C15.4453 10.7344 15.7188 10.6172 15.9922 10.6172C16.5781 10.6172 17.0859 11.0859 17.0859 11.7109C17.0859 11.9844 16.9688 12.2578 16.7734 12.4922L10.5234 18.7031C9.39062 19.875 7.82812 20.5 6.1875 20.5Z" fill="black"/>
                                        </svg>
                                       </button>
                                        <button>
                                            <span>
                                                <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20.9609 1.94531L18.4609 18.1562C18.4219 18.5469 18.1875 18.8984 17.8359 19.0938C17.6406 19.1719 17.4453 19.25 17.2109 19.25C17.0547 19.25 16.8984 19.2109 16.7422 19.1328L11.9766 17.1406L9.98438 20.1094C9.82812 20.3828 9.55469 20.5 9.28125 20.5C8.85156 20.5 8.5 20.1484 8.5 19.7188V15.9688C8.5 15.6562 8.57812 15.3828 8.73438 15.1875L17.25 4.25L5.76562 14.6016L1.74219 12.9219C1.3125 12.7266 1 12.3359 1 11.8281C0.960938 11.2812 1.19531 10.8906 1.625 10.6562L19.125 0.695312C19.5156 0.460938 20.0625 0.460938 20.4531 0.734375C20.8438 1.00781 21.0391 1.47656 20.9609 1.94531Z" fill="#21BCD1"/>
                                                </svg>
                                            </span>
                                        </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.chat-active {
    background: rgba(211, 242, 246, 0.2);
}

.online-status {
    background: #68D391;
}

.py-x {
    padding-top: .69rem;
    padding-bottom: .69rem; 
}

.h-70 {
    height: 500px;
}
</style>
