<script>
import Navbar from "../../components/common/Navbar.vue";
import Footer from "../../components/common/Footer.vue";
import CookieBar from "../../components/common/CookieBar.vue";
import { mapActions } from "vuex"

export default {
  components: {
    Navbar,
    Footer,
    CookieBar
  },
  created(){
    if(this.$store.state.auth.isAuthenticated) this.getAuthUser();
  },
  methods: {
     ...mapActions(["getAuthUser"]),
  }
}
</script>
<template>
  <!-- content -->
  <router-view />
  <!-- footer -->
  <Footer />

<!-- Cookie bar start here -->
  <CookieBar />
</template>
<style scoped>
  body {
    background: #2e90a8;
  }
</style>
