import Vue from 'vue'
import Vuex from 'vuex'

import win from './modules/win' 
import music from './modules/music'
import sysmusic from './modules/sysmusic'
import study from './modules/study'
import mymusic from './modules/mymusic'
import user from './modules/user'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
  	win,
    music,
    sysmusic,
    study,
    mymusic,
    user,
  }
})