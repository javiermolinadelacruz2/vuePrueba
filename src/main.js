import Vue from 'vue';
import firebase from 'firebase';
import VueFire from 'vuefire';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

let app = '';
// Initialize Firebase


Vue.config.productionTip = false;
Vue.use(VueFire);


firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App),
    }).$mount('#app');
  }
});
