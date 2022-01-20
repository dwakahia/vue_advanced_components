import Vue from "vue";
Vue.component('main-component', require('./components/Main').default)
Vue.component('bread-crumbs', require('./components/common/BreadCrumbs').default)

//Vue.component('bread-crumbs', ()=> import('./components/common/BreadCrumbs'))

Vue.component('custom-button', require('./components/common/CustomButton').default)