import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { routes } from './routes'
import { store } from './store'
import firebase from 'firebase/app'

Vue.config.productionTip = false

import './assets/css/main.css'
import './assets/css/noscript.css'
import './assets/css/font-awesome.min.css'

Vue.use(VueRouter)
 
const router = new VueRouter({
  routes
});

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGINGSENDERID
}

firebase.initializeApp(config)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
