<script>
import Navbar from '../../components/common/Navbar.vue';
import Footer from '../../components/common/Footer.vue';
// mobile menu
import MobileMenu from "../../components/common/MobileMenu.vue";
import { mapActions } from 'vuex';
import ChatsModal from '../modals/ChatsModal.vue';

export default {
    components: {
    Navbar,
    Footer,
    MobileMenu,
    ChatsModal
},
    data(){
        return {
            isMobileMenu: false,
            isShowChatModal: false,
            hideMode:false
        }
    },
    watch:{
        $route(to, from){
             if(this.isMobileMenu) this.isMobileMenu = false;
        },
        '$store.state.chat.activeChatUser':function (){
          console.log(`$store.state.chat.activeChatUser`,this.$store.state?.chat?.activeChatUser)
          if(this.$store.state?.chat?.activeChatUser){
            this.isShowChatModal=true
          }else{
            this.isShowChatModal=false
          }
        }
    },
    created() {
      this.getUserWorkExperiences();
      this.getMentorshipProfile();
      this.getWorkOptions();
     
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.currentUser;
      },
	},
    methods: {
     ...mapActions(['getUserWorkExperiences', 'getMentorshipProfile', 'getWorkOptions']),
     closeMenu() {
          this.isMobileMenu = !this.isMobileMenu;
        },

        openChatModal(){
          if(this.currentUser.hideMode){
            this.$notify({ type: "warning", title: 'Opps!', text: 'Cannot Chat hide mode is enabled'});
          }else{
            this.isShowChatModal=!this.isShowChatModal;
          }
        }
    }
}

</script>
<template>
<!-- mobile menu -->
  <transition
    name="custom-classes-transition"
    enter-active-class="animate__animated animate__slideInLeft"
    leave-active-class="animate__animated animate__slideOutLeft"
  >
    <div
      v-if="isMobileMenu"
      id="menu"
      class="fixed w-3/5 h-screen bg-white lg:hidden z-50"
    >
      <MobileMenu />
    </div>
  </transition>

  <!-- end mobile menu -->

    <Navbar v-on:closeMobileMenu="closeMenu()" />
        <div class="sm:px-8 px-4 py-10 relative">
            <router-view />

           <transition
            name="custom-classes-transition"
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
           >
            <ChatsModal :isShowChatModal="isShowChatModal"  v-on:close="isShowChatModal=false" />
          </transition>
            <div class="flex justify-end fixed bottom-10 right-10">
              <button @click="openChatModal" class="btn btn-primary rounded-4xl mt-4 px-6 shadow-xl gap-1">
                <img src="/images/svg/chaticon.svg" alt="close" class="mr-2" /> Chat 
                  <div v-if="$store.state.chat.totalUnread" style="background-color:#f55f5f;color:white" class="badge">{{this.$store.state.chat.totalUnread}}</div>
              </button> 
				    </div>
        </div>
    <Footer />
</template>