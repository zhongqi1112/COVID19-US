import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

// Configuration VueAnalytics
Vue.use(VueAnalytics, {
  id: 'UA-117830086-2'
})

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
