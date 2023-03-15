import { createApp } from 'vue'
import App from './App.vue'
import router from './core/router';
import store from './store/index';
import './assets/css/index.css'



// libs/plugins
import Notifications from '@kyvg/vue3-notification'


import VueTelInput from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'
import "animate.css";

import moment from "moment";


// instance
const FatouApp = createApp(App);



FatouApp.config.globalProperties.$filters = {
    formatExperienceDate(dateString) {
      return moment(dateString, "YYYYMMDD").format('MMMM YYYY')
    },
    formateDate(dateString) {
      return moment(dateString).format('MMMM Do, YYYY')
    },
    formateTime(dateString) {
        return moment(dateString).format('LT');
    }
    
  }

FatouApp.use(store);
FatouApp.use(router);
FatouApp.use(Notifications);
FatouApp.use(VueTelInput);
FatouApp.mount('#app');
