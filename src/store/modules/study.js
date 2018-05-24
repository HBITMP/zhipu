import axios from 'axios';

//数据部分
const state = {
	studyUrl: "http://47.106.112.13:5000/createmusic",
//	studyUrl: "http://localhost:3000/createmusic",
	getNewMusicUrl: 'http://47.106.112.13:5000/getnewmusic',
//	getNewMusicUrl: 'http://localhost:3000/getnewmusic',
	isSuccess: "falsed",
	isNewMusic: "false",
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
		state.isSuccess = "false";
		state.time = 0;
		state.isNewMusic = "false";
	},
	getNewMusic(state, data){
		state.newMusic = data.music;
		state.isNewMusic = data.isNew;
	},
	setIsSuccessState(state, data){
		console.log("设置为false");
		state.isSuccess = "1234";
	},
	setIsNewSuccess(state, data){
		state.isNewMusic = data.data;
	}
}

//action 部分
const actions = {
	StartStudy({commit}, musicList){
		for(var i = 0; i < musicList.length; i++){
			musicList[i].wavesurfer = null;
		}
		axios.post(state.studyUrl,{
			userId:localStorage.getItem('userid'),
//			userId:"1",
			musicList:musicList
		}).then(function(response){
			console.log(response)
			if(response.data.status == "200"){
				commit({
					type:'upSuccess',
					isSuccess: "true",
					time: parseInt(response.data.time),
				})
			} else {
				console.log("没有学习成功");
				commit({
					type:'upSuccess',
					isSuccess: "false",
					time: parseInt(response.data.time),
				});
			}
		}).catch(function(err){
			commit({
				type:'upSuccess',
				isSuccess: "false",
				time: 12,
			});
		})
	},
	initStudy({commit}){
		commit({
			type: 'initStudy'
		})
	},
	getNewMusic({commit}, data){
		console.log(data);
		axios.post(state.getNewMusicUrl,{
			userId:localStorage.getItem('userid'),
//			userId:"1",
			musicName:data.musicName, 
			comments:data.other,
		}).then(function(response){
			console.log(response);
			//获取到歌曲
			if(response.data.newMusic){
				commit({
					type:'getNewMusic',
					music: response.data.music,
					isNew: 'true'
				});
			}else{
				commit({
					type:'getNewMusic',
					music: null,
					isNew: 'newfalse'
				});
			}
		}).catch(function(err){
			commit({
				type:'getNewMusic',
				music: null,
				isNew: 'newfalse'
			});
		})
	},
	//重置issuccess，方便生成音乐的时间重新更改
	setIsSuccessState({commit}){
		commit({
			type:"setIsSuccessState",
		})
	},
	setIsNewSuccess({commit}, data){
		commit({
			type:"setIsNewSuccess",
			data:data
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