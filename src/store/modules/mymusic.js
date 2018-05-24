import axios from 'axios';
//数据部分
const state = {
	mySelIndex:0,
	muMusicListUrl:"http://47.106.112.13:5000/findmymusic",
	delmymusic:"http://47.106.112.13:5000/delmusic",
	myPlayIndex:-1,
	myMusic: [],
}

//操作部分
const mutations = {
	setMyMusic(state, data){
		state.myMusic = data.data;
	},
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
	 * 云端获取用户数据
	 */
	getMusicList({commit}, data){
		axios.post(state.muMusicListUrl,{
//			userId:"1",
			userId:localStorage.getItem('userid'),
		}).then(function(response){
			
			if(response.data.status == "200"){
				console.log(response.data.data)
				commit({
					type:'setMyMusic',
					data: response.data.data
				})
			} else {
				commit({
					type:'setMyMusic',
					data: []
				})
			}
		}).catch(function(err){
			commit({
					type:'setMyMusic',
					data: []
				})
		})
	},
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
		axios.post(state.delmymusic,{
//			userId:"1",
			userId:localStorage.getItem('userid'),
			musicId:data.musicId,
		}).then(function(response){}).catch(function(err){});
		commit({
			type:'delMyMusic',
			data: data.index
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