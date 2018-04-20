//数据部分
const state = {
	musicInfo: [{
			id: "000001",
			name: "中国1111111111111111111111111",
			address: 'http://123.207.24.223:8080/123.mp3'
		},
		{
			id: "000002",
			name: "中国",
			address: 'http://123.207.24.223:8080/123.mp3'
		},
		{
			id: "000003",
			name: "中国",
			address: 'http://123.207.24.223:8080/123.mp3'
		},
		{
			id: "000004",
			name: "中国",
			address: 'http://123.207.24.223:8080/123.mp3'
		},
		{
			id: "000005",
			name: "中国",
			address: 'http://123.207.24.223:8080/123.mp3'
		},
		{
			id: "000006",
			name: "中国",
			address: 'http://123.207.24.223:8080/123.mp3'
		},
		{
			id: "000007",
			name: "中国",
			address: 'http://123.207.24.223:8080/123.mp3'
		},
		{
			id: "000008",
			name: "中国",
			address: ''
		},
		{
			id: "000009",
			name: "中国",
			address: 'http://123.207.24.223:8080/123.mp3'
		},
	],
}

//操作部分
const mutations = {
	addMusic(state, payload) {
		state.musicInfo = state.musicInfo.contact(payload.list)
	},
	dele(state, data){
		//删除原数组中的数据
		state.musicInfo.splice(data.index, 1)
	}
}

//action 部分
const actions = {
	/**
	 * 添加音乐的操作
	 */
	addMusic({ commit }, mlist) {
		commit({
			type: 'addMusic', //表示提交需要执行的方法类型 
			list: mlist
		})
	},
	/**
	 * 删除某项音乐的操作
	 */
	dele({ commit }, index){
		commit({
			type: 'deleByIndex',
			index: index
		})
	}
}

export default {
	state,
	mutations,
	actions
}