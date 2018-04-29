//数据部分
const state = {
	//横屏状态为true, 竖屏为false
	isRow:false,
	uploadUrl:'http://123.207.24.223:3000/upload',
	audiotext: null,
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
}


export default {
	state,
	mutations,
	actions,
	getters
}