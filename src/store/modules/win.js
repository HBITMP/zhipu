//数据部分
const state = {
	//横屏状态为true, 竖屏为false
	isRow:false,
	uploadUrl:'http://localhost:3000/upload',
}

//操作部分
const mutations = {
	setRow(state, data){
		state.isRow = data.isRow
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