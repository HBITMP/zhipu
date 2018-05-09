import axios from 'axios';

//数据部分
const state = {
	verLoginUrl : 'http://123.207.24.223:3000/user/login',
	registerUrl : 'http://123.207.24.223:3000/user/register',
	userName : "",
	userId: "",
	loginStatus: false,
	registerStatus: false,
}

//操作部分
const mutations = {
	setLogin(state, data){
		state.userName = data.userName;
		state.userId = data.userId;
		state.loginStatus = data.status;
		localStorage.setItem('username',data.userName);
		localStorage.setItem('userid',data.userId);

	},
	setLoginFailed(state, data){
		state.loginStatus = data.status;
	},
	setReg(state, data){
		state.registerStatus = data.status;
	},
	logout(state, data){
		state.loginStatus = false;
		state.registerStatus = false;
		localStorage.clear();
	}
}

//action 部分
const actions = {
	/**
	 *  登陆验证
	 */
	verLogin({commit}, data){
		axios.post(state.verLoginUrl,{
			username: data.username,
			userpwd: data.userpwd,
		}).then(function(response){
			console.log("success")
			console.log(response)
			commit({
				type: 'setLogin',
				userId: response.userId,
				username:response.username,
				status: true,
			})
		}).catch(function(err){
			console.log(err)
			commit({
				type: 'setLoginFailed',
				status: false,
			})
		});
	},
	/**
	 * 注册验证
	 */
		register({commit}, data){
		axios.post(state.verLoginUrl,{
			username: data.username,
			userpwd: data.userpwd,
			email: data.email,
			phone: data.phone,
		}).then(function(response){
			console.log("success")
			console.log(response)
			commit({
				type: 'setReg',
				status: true,
			})
		}).catch(function(err){
			console.log(err)
			commit({
				type: 'setReg',
				status: false,
			})
		});
	},
	/**
	 * 从本地加载数据
	 */
	loadStroge({commit}){
		if ( localStorage.getItem('userid')){
			console.log(localStorage.getItem('userid'));
			commit({
				type: 'setLogin',
				userId: localStorage.getItem('userid'),
				username:localStorage.getItem('username'),
				status: true,
			})
		} else {
			commit({
				type: 'setLoginFailed',
				status: false,
			})
		}
		
	},
	/**
	 *  退出登陆
	 */
	logout({commit}){
		commit({
			type:"logout",
		})
	}

	
}
const getters = {  // getters
 
}


export default {
	state,
	mutations,
	actions,
	getters
}