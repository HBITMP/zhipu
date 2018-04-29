import axios from 'axios';

//数据部分
const state = {
	studyUrl: "http://123.207.24.223:3000/createmusic",
	getNewMusicUrl: 'http://123.207.24.223:3000/getnewmusic',
	isSuccess: false,
	isNewMusic: false,
	newMusic:{},
	time:0,
}

//操作部分
const mutations = {
	upSuccess(state, data){
		state.isSuccess = data.isSuccess
		state.time = data.time
		console.log(state.isSuccess)
	},
	initStudy(state){
		state.isSuccess = false;
		state.time = 0;
		state.isNewMusic = false;
	},
	getNewMusic(state, data){
		state.newMusic = data.music;
		state.isNewMusic = data.isNew;
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
	initStudy({commit}){
		commit({
			type: 'initStudy'
		})
	},
	getNewMusic({commit}){
		axios.get(state.getNewMusicUrl).then(function(response){
			//获取到歌曲
			if(response.data.newMusic){
				commit({
					type:'getNewMusic',
					music: response.data.music,
					isNew: response.data.newMusic
				})
			} else {
				//没有获取到歌曲
			}
		}).catch(function(err){
			
		})
	}
}
const getters = {  // getters
	getIsSuccess(){
		return state.isSuccess;
	},
	getIsNewMusic(){
		return state.isNewMusic;
	},
	getNew(){
		return state.newMusic;
	}
}


export default {
	state,
	mutations,
	actions,
	getters
}