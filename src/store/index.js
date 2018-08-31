import Vue from 'vue'
import Vuex from 'vuex'
//import actions from './actions'
//import getters from './getters'
//import mutations from './mutations'
import Login from './modules/Login.js'

Vue.use(Vuex)

export default new Vuex.Store({
//	getters,
//	actions,
//	mutations,
	modules:{
        Login,
	}
})
