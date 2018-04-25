import axios from 'axios';

//数据部分
const state = {
	studyUrl: "http://localhost:3000/createmusic",
	isSuccess: false,
	time:0,
}

//操作部分
const mutations = {
	upSuccess(state, data){
		state.isSuccess = data.isSuccess
		state.time = data.time
		console.log(state.isSuccess)
	}
}

//action 部分
const actions = {
	StartStudy({commit}, musicList){
		axios.post(state.studyUrl,{
			list:musicList
		}).then(function(response){
			console.log(response)
			if(response.data.status == 200){
				commit({
					type:'upSuccess',
					isSuccess: true,
					time: response.data.time,
				})
			} else {
				commit({
					type:'upSuccess',
					isSuccess: true,
					time:response.data.time,
				})
			}
		}).catch(function(err){
			console.log(err)
			commit({
				type:'upSuccess',
				isSuccess: false,
				time: 0,
			})
		})
	},
}
const getters = {  // getters
	getIsSuccess(){
		return state.isSuccess;
	}
}


export default {
	state,
	mutations,
	actions,
	getters
}