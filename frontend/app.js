import Vue from "vue";
import VueTailwind from 'vue-tailwind';
import VueToast from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast);

Vue.use(VueTailwind);
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import '@themesberg/flowbite';

Vue.use(VueSweetalert2);
import moment from 'moment'

Vue.prototype.moment = moment

import './components'
import './assets/scss/app.scss'
import './assets/style.css'
import router from "./router";
import store from './store'



new Vue({
    el: '#app',
    router,
    store
})