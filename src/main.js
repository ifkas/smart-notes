// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// Firebase
import firebase from 'firebase'
import firebaseApp from '@/auth/init'

Vue.config.productionTip = false

// At-ui kit
import ATUI from 'at-ui'
import ATUIStyle from 'at-ui-style'
Vue.use(ATUI)
Vue.use(ATUIStyle)


/* eslint-disable no-new */
let app;
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
  app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>',
    //   beforeCreate: function() {
    //     firebase.auth().onAuthStateChanged((user) => {
    //       if (user) {
    //         // this.user = user
    //         console.log(firebase.auth().currentUser)
    //       }
    //     })
    // },
    })
  }
  })