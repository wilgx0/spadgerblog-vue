import types from '../types.js'
import axios from 'axios'
import Tool from '@/common.js'

const state ={
	isLogin : false,   //标记用户是否登录
    active  : 0,        //首页底部导航菜单的索引
}

const getters = {
    isLogin(state){
		return state.isLogin;
	}
}

const actions = {
    isLoginAction({commit,state},data){
        commit(types.IS_LOGIN,data);
	},
}

const mutations = {
	[types.IS_LOGIN](state,data){
		state.isLogin = data
	}
}

export default {
	state,
	getters,
	actions,
	mutations,
}
