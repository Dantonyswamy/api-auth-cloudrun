import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import GAuth from 'vue-google-oauth2'

Vue.config.productionTip = false
const gauthOption = {
  clientId: '735423714813-lu86p7bdssuc841bp9h1cctt996pf49t.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
