import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMeta from 'vue-meta'
require('./scss/main.scss');

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyrfSZlWsla7KHDhPM01foSoxiAG0tZLU",
  authDomain: "lor-preview.firebaseapp.com",
  projectId: "lor-preview",
  storageBucket: "lor-preview.appspot.com",
  messagingSenderId: "22965560262",
  appId: "1:22965560262:web:b2714c6f6b0030e130c8c7",
  measurementId: "G-RKDP9J0NPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

Vue.config.productionTip = false
Vue.use(VueMeta);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
