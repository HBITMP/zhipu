//数据部分
const state = {
	//横屏状态为true, 竖屏为false
	isRow:false,
	uploadUrl:'http://47.106.112.13:5000/upload',
	audiotext: null,
	musicurl:"http://47.106.112.13:5000",
}

//操作部分
const mutations = {
	setRow(state, data){
		state.isRow = data.isRow;
	},
	setAudio(state, data){
		state.audiotext = data.data;
	}
}

//action 部分
const actions = {
	/**
	 * 设为横屏
	 */
	setRow({commit}, isRow){
		commit({
			type: 'setRow',
			isRow: isRow
		})
	},
	setAudio({commit}, data){
		commit({
			type:'setAudio',
			data: data
		})
	}
}
const getters = {  // getters
    getUploadUrl: function (state) {
        return state.uploadUrl;
    },
    getFinaUrl: function (state) {
        return state.musicurl;
    },
}


export default {
	state,
	mutations,
	actions,
	getters
}