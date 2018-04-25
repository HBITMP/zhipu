// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import vueg from 'vueg'
import 'vueg/css/transition-min.css'

Vue.config.productionTip = false

const options={
    duration: '0.3', //转场动画时长，默认为0.3，单位秒
    firstEntryDisable: false, //值为true时禁用首次进入应用时的渐现动画，默认为false
    firstEntryDuration: '.6', //首次进入应用时的渐现动画时长，默认为.6
    forwardAnim: 'fadeIn', //前进动画，默认为fadeInRight
    backAnim: 'fedeIn', //后退动画，默认为fedeInLeft
    sameDepthDisable: false, //url深度相同时禁用动画，默认为false
    shadow:true, //值为false，转场时没有阴影的层次效果
    disable: false, //禁用转场动画，默认为false，嵌套路由默认为true
}    
Vue.use(vueg, router,options)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

