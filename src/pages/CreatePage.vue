<template>
	<keep-alive v-if="isRow">
		<div class="box">
			<div class="header" ref="header">
				<div class="btng">
					<button class="btncss-while" @click="clash"><i class="iconfont icon-shuaxin" :class="isLoop?'loop':''"></i></button>
					<button class="btncss-play" @click="clickplay"><i :class="play ? 'iconfont icon-zanting' : 'iconfont icon-bofang' "></i></button>
				</div>
				<span class="header-title"><img src="../assets/music.png" style="width: 1.5rem; height: 1.5rem; margin-right: 1rem;" />创作页面</span>
				<button class="btn-my" @click="clickme">我的</button>
			</div>
			<div class="body">
				<div class="top-part" ref="topPart">
					<div>
						<button class="addbtn" @click="addMusic"><img src="../assets/add.png" style="width: 1.5rem; height: 1.5rem;"/></button>
					</div>
					<div>
						<div class="wrapper" ref="wrapper">
							<ul class="content" ref="content" style="list-style: none;">
								<li v-for="item in list">
									<p>{{item}}</p>
									<p>&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;</p>
								</li>
								<div class="both"></div>
							</ul>
						</div>
					</div>
				</div>
				<div class="buttom-part">
					<music-list :height="bodyHeight"></music-list>
				</div>
			</div>

			<div class="footer" ref="footer">
				<div>
					<button><i class="iconfont icon-iconset0174"></i></button>
					<button @click="startStudy">智 能 融 合</button>
				</div>
				<input type="range" ref="volume" @change="setVolume" />
			</div>
			<div v-transfer-dom>
				<loading :show="showLoad" :text="textLoad"></loading>
			</div>
			<div v-transfer-dom>
				<popup v-model="showSelect">
					<popup-header title="选择乐曲来源" :show-bottom-border='false'></popup-header>
					<ul class="mui-table-view mui-table-view-radio">
						<li class="mui-table-view-cell" @click="selSys">
							<a class="mui-navigate-right">系统音乐</a>
						</li>
						<!--@click="selLocal"-->
						<li class="mui-table-view-cell file-upload" @click="selLocal">
							<!--<a href='javascript:void(0);' class="blueButton">本地文件</a>-->
							<input type="file" ref="fileUpload" accept=".mp3,.mid" @change="selFileChange" />
						</li>
					</ul>
				</popup>
			</div>
			<div v-transfer-dom class="select-sys-music">
				<confirm v-model="showSysMusicSelect" title="系统音乐集" @on-cancel="onCancel" @on-confirm="onConfirm" :hide-on-blur="true">
					<sys-music-list @showDig="setDig" @on-confirm="onConfirm"></sys-music-list>
				</confirm>
			</div>
		</div>
	</keep-alive>
	<div v-else>
		<p style="text-align: center;">请将屏幕旋转至横屏</p>
	</div>
</template>

<script>
	import axios from 'axios';
	import { Alert, TransferDom, Loading, Confirm, PopupHeader, Popup, Group, Radio } from 'vux';
	import { mapState } from 'vuex';
	import Bscroll from 'better-scroll';
	import MusicList from '../components/musicList';
	import SysMusicList from '../components/SysMusicList';

	export default {
		name: 'CreatePage',
		directives: {
			TransferDom
		},
		data() {
			return {
				//				play: true,
				list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
				bodyHeight: 0,
				textLoad: '音频解析中',
				showLoad: true,
				showSysMusicSelect: false,
				showSelect: false,
				selFile: "",
			}
		},
		components: {
			MusicList,
			Alert,
			Loading,
			Confirm,
			SysMusicList,
			PopupHeader,
			Popup,
			Group,
			Radio
		},
		methods: {
			clickme: function() {
				this.$router.push({
					path: '/MyMusic'
				})
			},
			setDig: function(show, title) {
				console.log("触发显示时间")
				this.showLoad = true;
				this.textLoad = title;
			},
			selFileChange: function() {
				//				this.showSelect = false;
				var file = this.$refs.fileUpload.files[0];
				var music;
				//创建一个FormDate
				var formData = new FormData();
				//将文件信息追加到其中
				formData.append('file', file);
				//开始上传文件，提示文件上传中
				this.showLoad = true;
				this.textLoad = "文件上传中";
				var succFun = function(response) {
					if(response.status == 200) {
						console.log(response)
						//文件上传成功
						this.showLoad = true;
						this.textLoad = "正在解析音频";
						var newm = {
							id: response.data.result.id,
							name: response.data.result.filename,
							address: response.data.result.url,
							wavesurfer: null,
						};
						this.$store.dispatch('addMusic', newm)
					} else {

					}
				}
				axios.post(this.$store.getters.getUploadUrl, formData, {}).then(succFun.bind(this)).catch(function(err) {
					console.log(err);
				});
			},
			onCancel: function() {},
			onConfirm: function() {
				console.log("触犯确定事件")
				this.showSysMusicSelect = false;
			},
			//选择系统音乐
			selSys: function() {
				this.showSelect = false;
				this.showSysMusicSelect = true;
				this.$store.dispatch('getSysMusic');
			},
			//选择本地音乐
			selLocal: function() {
				this.showSelect = false;
			},
			//设置循环播放
			clash: function() {
				this.$store.dispatch("setLoop");
			},
			//设置音乐播放音量
			setVolume: function() {
				if(this.$store.getters.getPlayIndex >= 0) {
					this.musicList[this.$store.getters.getPlayIndex].wavesurfer.setVolume(this.$refs.volume.value / 100)
				}
			},
			//开始学习
			startStudy: function() {
				//初始化学习数据
				this.$store.dispatch('initStudy');
				//提交学习请求
				this.$store.dispatch('StartStudy', this.musicList);
				//页面跳转
				this.$router.push({
					path: '/StartStudy'
				})
			},
			//添加音乐
			addMusic: function() {
				console.log("添加音乐")
				//				this.showSysMusicSelect = true;
				this.showSelect = true;
			},
			//点击播放按钮
			clickplay: function() {
				//				this.play = this.$store.getters.getIsPlaying;
				var cindex = this.$store.getters.getIndex;
				//判断当前是否在播放
				if(this.$store.getters.getIsPlaying) {
					//正在播放，关闭原来正在播放的元素
					this.musicList[this.$store.getters.getPlayIndex].wavesurfer.playPause();

					//判断是否是当前元素在播放
					if(!(this.$store.getters.getIndex == this.$store.getters.getPlayIndex)) {
						//设置停止播放元素
						this.$store.dispatch("setPlayStop");

						//开启新的播放
						this.musicList[cindex].wavesurfer.playPause();
						console.log("原本是正在播放，关闭第" + this.$store.getters.getPlayIndex + '首歌曲的播放');

						this.$store.dispatch('setPlaying', {
							index: cindex,
							isPlaying: true
						});
						console.log("立刻重新开始第" + cindex + '首歌曲的播放');
					} else {
						//设置停止播放元素
						this.$store.dispatch("setPlayStop");
						console.log("关闭第" + this.$store.getters.getPlayIndex + '首歌曲的播放');
					}
				} else {
					console.log("开启第" + cindex + "首歌曲的播放")
					this.musicList[cindex].wavesurfer.playPause();
					this.$store.dispatch('setPlaying', {
						index: cindex,
						isPlaying: true
					});
				}
				//				this.scroll.scrollTo(-120, 0, 3000)
			},
			onHide: function() {},
		},
		beforeMount: function() {
			console.log("开始创建");
		},
		computed: {
			...mapState({
				musicList: state => state.music.musicInfo,
				play: state => state.music.isPlaying,
				successLoad: state => state.music.successLoad,
				isLoop: state => state.music.isLoop,
				isRow: state => state.win.isRow,
			})
		},
		mounted: function() {
			function pludReady() {
				var onback = function(){
					this.$router.push({
						path: '/StartCreate'
					})
				}
				plus.key.addEventListener("backbutton",onback.bind(this));
				plus.navigator.setFullscreen(true);
				plus.screen.lockOrientation("landscape-primary");
			}
			if(window.plus) {
				pludReady().bind(this);
			} else {
				document.addEventListener("plusready", pludReady.bind(this), 'false');
			}
			//设施是否开始解析音乐
			if(this.isRow && this.musicList.length > 0) {
				this.showLoad = true;
				//				if (this.MusicList.length <= 0){
				//					this.showLoad=f;
				//				}
			} else {
				this.showLoad = false;
			}
		},
		created: function() {
			if(this.isRow) {
				this.$nextTick(() => {
					this.scroll = new Bscroll(this.$refs.wrapper, {
						startX: 0,
						click: true,
						scrollX: true,
						scrollY: false,
						eventPassthrough: 'vertical',
						//					disableTouch: true
					});
				})
			}
		},

		watch: {
			successLoad: function() {
				//				console.log("解析成功"+this.successLoad);
				if(this.successLoad >= this.musicList.length) {
					this.showLoad = false;
				}
			},
		}

	}
</script>

<style>
	.both {
		clear: both;
		height: 0;
		overflow: hidden;
	}
	
	.box {
		background-image: none;
		background-color: #494949;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		width: 100%;
	}
	
	.header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0.5rem;
		border-bottom: 1px solid black;
	}
	
	.header span {
		display: flex;
		/*Flex布局*/
		display: -webkit-flex;
		/* Safari */
		align-items: center;
		/*指定垂直居中*/
		color: rgb(238, 208, 206);
		font-size: 1.2rem;
		font-family: fzytk;
	}
	
	.footer {
		background-color: #494949;
	}
	
	.btncss {
		background-color: #343434;
		border: 1px solid #1b1b1b;
		color: white;
	}
	
	.btncss-while {
		background-color: transparent;
		border: 0;
		padding: 0 !important;
		/*height: 5px;*/
		/*margin-top: -.4rem;*/
		margin-left: 1rem;
		margin-right: 1rem;
		vertical-align: middle;
	}
	
	.btncss-while>i:before {
		color: rgb(238, 208, 206);
		font-size: 24px !important;
	}
	
	.btncss-play {
		background-color: rgb(238, 208, 206);
		border-radius: 50%;
		/*padding: 6px  9px !important;*/
		padding: 0 !important;
		vertical-align: middle;
		border: 0;
		height: 1.6rem;
		width: 1.6rem;
		margin-top: .1rem;
	}
	
	.btncss-play>i {
		display: inline-block;
		height: 12px;
	}
	
	.btncss-play>i:before {
		font-size: 12px;
		position: relative;
		top: -1px;
	}
	
	.btn-my {
		background-color: rgb(238, 208, 206);
		border: 0;
		padding: 6px 24px !important;
		font-size: 1rem;
		color: black;
		font-family: fzytk;
	}
	
	.addbtn {
		background-color: transparent;
		border: 0;
		margin-left: 1rem !important;
	}
	
	.body {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
	
	.top-part {
		width: 100%;
		height: 2.1875rem;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		border-bottom: 1px solid black;
	}
	
	.top-part>div:nth-of-type(1) {
		text-align: start;
		padding: .2rem 0;
		/*padding-left: .5rem;*/
		border-right: 1px solid black;
		flex: 1;
	}
	
	.top-part>div:nth-of-type(1)>button {
		padding: 0.1875rem 0.375rem;
		margin-left: .5rem;
	}
	
	.top-part>div:nth-of-type(2) {
		flex: 3;
	}
	
	.wrapper {
		width: 30rem;
		/*height: 2rem;*/
		/*border: 1px solid red;*/
		overflow: hidden;
	}
	
	.content {
		padding: 0;
		margin: 0;
		height: 100%;
		width: 100rem;
		height: 2.125rem;
		overflow: hidden;
		white-space: nowrap;
		border-bottom: 1px solid black;
	}
	
	.content>li {
		float: left;
		text-align: start;
		width: 2.6rem;
		color: white;
		font-size: 0;
		border-right: 1px solid #8f8f94;
	}
	
	.content>li>p {
		margin: 0;
	}
	
	.content>li>p:nth-of-type(1) {
		color: white;
		padding-left: .3rem;
		border-bottom: 1px solid black;
	}
	
	.buttom-part {
		width: 100%;
		background-color: #272727;
	}
	
	.footer {
		position: fixed;
		bottom: 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0.5rem;
		width: 100%;
		border-top: 1px solid black;
	}
	
	.footer>div>button {
		background-color: rgb(238, 208, 206);
		border: 0;
		font-family: fzytk;
	}
	
	.footer>div>button:nth-of-type(2) {
		margin-left: 3rem;
		font-size: 1rem;
	}
	
	.footer>input {
		position: relative;
		height: 2rem;
		color: white;
		background-color: red;
	}
	
	.loop {
		color: red;
	}
	
	.bottombox input {
		display: none;
	}
	
	.blueButton {
		position: absolute !important;
		height: 40px !important;
	}
	/*.file-upload{
		height: 40px !important;
	}
	.file-upload>input{
		opacity: 0;
		position: absolute;
	}*/
	/*骚操作0.0*/
	
	.select-sys-music .weui-dialog {
		max-width: 350px !important;
	}
	
	.select-sys-music .weui-dialog__ft {
		display: none !important;
	}
	
	.select-sys-music .weui-dialog__title {
		color: white;
		border: 2px solid black;
		padding: .6rem 2rem;
		border-radius: 0.5rem;
		font-size: 0.8rem;
	}
	
	.select-sys-music .weui-dialog__hd {
		margin-bottom: 9px;
	}
	
	.select-sys-music .weui-dialog {
		background-color: #414141;
	}
	
	.vux-popup-show {
		overflow-y: hidden !important;
	}
	.vux-loading .weui-toast {
  		top: 50% !important;
  		transform: translateX(-50%) translateY(-50%) !important;;
	}
</style>