import axios from 'axios';
//数据部分
const state = {
	getSysUrl:'http://47.106.112.13:5000/system/musics',
//	getSysUrl:'http://localhost:3000/system/musics',
	status: false,
	message: '',
	SelectStyle:-1,
	catelog:  []
}


//操作部分
const mutations = {
	setCate(state, data){
		state.catelog = data.cate;
		state.status = data.status;
		state.SelectStyle = 0;
		console.log(state.catelog)
	},
	setErr(state, data){
		state.status = data.status;
		state.message = data.message;
	},
	setSelectStyle(state, data){
		state.SelectStyle = data.index;
		console.log("change："+state.SelectStyle)
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
	},
	setSelectStyle({commit}, index){
		console.log("commit："+index)
		commit({
			type: "setSelectStyle",
			index: index,
		})
	}
}

const getters = {  // getters
    getNowMusicList: function (state) {
        return state.catelog[state.SelectStyle].catelog;
    },
}


export default {
	state,
	mutations,
	actions,
	getters,
}