import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import './assets/formulate.css'
import VueFormulate from '@braid/vue-formulate'
import {firestorePlugin} from 'vuefire';
import {rtdbPlugin } from 'vuefire';





Vue.use(VueFormulate)
Vue.use(firestorePlugin)
Vue.use(rtdbPlugin )




Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  
  render: h => h(App)
}).$mount('#app')
