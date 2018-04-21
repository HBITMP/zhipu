//数据部分
const state = {
	index:0,
	playIndex: 0,
	isPlaying: false,
	musicInfo: [{
			id: "musicno1",
			name: "中国1111111111111111111111111",
			address: 'static/123.mp3',
			wavesurfer: null,
		},
		{
			id: "musicno2",
			name: "中国",
			address: 'static/123.mp3',
			wavesurfer: null,
		},
		{
			id: "musicno3",
			name: "中国",
			address: 'static/123.mp3',
			wavesurfer: null,
		},
		{
			id: "musicno4",
			name: "中国",
			address: 'static/123.mp3',
			wavesurfer: null,
		},
		{
			id: "musicno5",
			name: "中国",
			address: 'static/123.mp3',
			wavesurfer: null,
		},
		{
			id: "musicno6",
			name: "中国",
			address: 'static/123.mp3',
			wavesurfer: null,
		},
		{
			id: "musicno7",
			name: "中国",
			address: 'static/123.mp3',
			wavesurfer: null,
		},
		{
			id: "musicno8",
			name: "中国",
			address: 'static/123.mp3',
			wavesurfer: null,
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
	},
	rename(state, data){
		state.musicInfo[data.index].name = data.newName;
	},
	initWave(state, data){
		state.musicInfo[data.index].wavesurfer = data.wave;
	},
	setIndex(state, data){
		state.index = data.index;
	},
	setPlaying(state, data){
		state.playIndex = data.index;
		state.isPlaying = data.isPlaying;
	},
	setPlayStop(state){
		state.playIndex = -1;
		state.isPlaying = false;
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
	},
	/**
	 * 重命名歌曲的操作 
	 */
	rename({ commit }, data){
		commit({
			type: 'rename',
			newName: data.newName,
			index: data.index
		})
	},
	/**
	 * 初始化对应音乐的播放句柄
	 */
	initWave({commit}, data){
		commit({
			type: 'initWave',
			index: data.index,
			wave: data.wave,
		})
	},
	/**
	 * 设置选中下标
	 */
	setIndex({commit}, data){
		commit({
			type: 'setIndex',
			index: data
		})
	},
	/**
	 *  设置播放id以及确定有元素正在播放
	 */
	setPlaying({commit}, data){
		commit({
			type:'setPlaying',
			index: data.index,
			isPlaying: data.isPlaying,
		})
	},
	/**
	 * 设置播放结束，并且正在播放元苏下标为0
	 */
	setPlayStop({commit}){
		commit({
			type: "setPlayStop"
		})
	}
}

const getters = {  // getters
        getIndex: function (state) {
            return state.index;
        },
        getPlayIndex: function(state){
        		return state.playIndex;
        },
        getIsPlaying: function(state){
        		return state.isPlaying
        }
    }

export default {
	state,
	mutations,
	actions,
	getters
}