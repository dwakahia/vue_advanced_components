import Vue from "vue";
import VueTailwind from 'vue-tailwind';
Vue.use(VueTailwind);
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);
import moment from 'moment'
Vue.prototype.moment = moment

import './components'
import './assets/scss/app.scss'
import './assets/style.css'
import router from "./router";


new Vue({
    el: '#app',
    router
})