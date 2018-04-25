import axios from 'axios';
//数据部分
const state = {
	getSysUrl:'http://localhost:3000/system/musics',
	status: false,
	message: '',
	catelog: []
}

//操作部分
const mutations = {
	setCate(state, data){
		state.catelog = data.cate;
		state.status = data.status;
		console.log(state.catelog)
	},
	setErr(state, data){
		state.status = data.status;
		state.message = data.message;
	}
}

//action 部分
const actions = {
	getSysMusic({commit}){
		console.log("获取数据")
		axios.get(state.getSysUrl,{},{}).then(function(response){
			console.log("success")
			console.log(response)
			commit({
				type: 'setCate',
				cate: response.data.catelog,
				status: true,
			})
		}).catch(function(err){
			console.log(err)
			commit({
				type: 'setErr',
				status: false,
				message: '网络错误'
			})
		});
	}
}



export default {
	state,
	mutations,
	actions,
}