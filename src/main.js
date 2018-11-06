import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import BuyModal from '@/components/Shared/BuyModal.vue'

import fb from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.component('Buy-Modal', BuyModal)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    fb.initializeApp({
      apiKey: 'AIzaSyCkM2SnAEaZc-dcaqwGp1qYUgoppcCRcjU',
      authDomain: 'l-vuetify.firebaseapp.com',
      databaseURL: 'https://l-vuetify.firebaseio.com',
      projectId: 'l-vuetify',
      storageBucket: 'l-vuetify.appspot.com',
      messagingSenderId: '78523827701'
    })
    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autologinUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
}).$mount('#app')
