//数据部分
const state = {
	mySelIndex:0,
	myPlayIndex:-1,
	myMusic: [],
}

//操作部分
const mutations = {
	addMyMusic(state, data){
		state.myMusic.push(data.data);
	},
	delMyMusic(state, data){
		state.myMusic.splice(data.data, 1)
	},
	setMySelIndex(state, data){
		state.mySelIndex = data.data;
	},
	setMyPlayIndex(state, data){
		state.myPlayIndex = data.data;
	}
}

//action 部分
const actions = {
	/**
	 * 添加歌曲操作
	 */
	addMyMusic({commit}, data){
		commit({
			type:'addMyMusic',
			data: data
		})
	},
	delMyMusic({commit}, data){
		commit({
			type:'delMyMusic',
			data: data
		})
	},
	setMySelIndex({commit},data){
		commit({
			type:"setMySelIndex",
			data:data,
		})
	},
	setMyPlayIndex({commit}, data){
		commit({
			type:"setMyPlayIndex",
			data:data,
		})
	}
}
const getters = {  // getters
	getMySelIndex(){
		return state.mySelIndex;
	},
	getMyPlayIndex(){
		return state.myPlayIndex;
	}
}


export default {
	state,
	mutations,
	actions,
	getters
}