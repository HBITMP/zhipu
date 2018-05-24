<template>
	<div class="my-music">
		<div v-transfer-dom>
			<loading :show="showLoad" :text="textLoad"></loading>
		</div>
		<x-header :left-options="{backText: '',preventGoBack:true}" style="background-color:#4a4a4a;" @on-click-back="backCreate">
			<span slot="default" class="title">我的作品</span>
			<span slot="right" @click="logout" class="logout">退出登录</span>
		</x-header>
		<div class="my-music-list">
			<div class="my-header">
				<span>名称</span>
				<span>时长</span>
				<span>备注</span>
			</div>
			<scroller lock-x height="10rem" scrollbar-y ref="scrollerBottom">

				<swipeout class="my-swipeout">

					<swipeout-item transition-mode="follow" :class="index == mySelIndex ? 'select':''" v-for="(item, index) in myMusicList" :key="index" @click.native="Select(index)">
						<div slot="right-menu">
							<swipeout-button @click.native="deleteMusic('delete', index)" type="warn">删除</swipeout-button>
						</div>
						<div slot="content" class="my-header my-list">
							<span>{{item.name}}</span>
							<span>90s</span>
							<span>{{item.other}}</span>
						</div>
					</swipeout-item>
				</swipeout>
			</scroller>
		</div>
		<div class="music-way">
			<div>
				<button @click="clickMyPlay" class="myplay"><i :class="thisplay ? 'iconfont icon-zanting' : 'iconfont icon-bofang' "></i></button><br />
				<button @click="createDownload"><img src="../assets/down.png" style="height: 2rem; width: 2rem;"/></button>
			</div>
			<div id="mywave"></div>
		</div>
		<div v-transfer-dom>
      		<loading :show="showdown" :text="downtext"></loading>
    	</div>
	</div>
</template>

<script>
	import { XHeader, Scroller, Swipeout, SwipeoutItem, SwipeoutButton, TransferDom, Loading, Alert } from 'vux';
	import { mapState } from 'vuex';
	import WaveSurfer from '../../static/js/wavesurfer.js';

	export default {
		name: 'MyMusic',
		data() {
			return {
				playtext: '播放',
				thisplay: false,
				showLoad: false,
				textLoad: "正在解析音频",
				wavesurfer: null,
				downtext:"下载失败",
				showdown: false,
			}
		},
		directives: {
			TransferDom,
		},
		components: {
			XHeader,
			Scroller,
			Swipeout,
			SwipeoutItem,
			SwipeoutButton,
			Loading,
			Alert,
		},
		computed: {
			...mapState({
				myMusicList: state => state.mymusic.myMusic,
				audioText: state => state.win.audiotext,
				mySelIndex: state => state.mymusic.mySelIndex,
				myPlayIndex: state => state.mymusic.myPlayIndex,
			})
		},
		beforeDestroy: function() {
			if(this.wavesurfer.isPlaying()) {
				this.wavesurfer.playPause();
			}
		},
		mounted: function() {
			var onback = function(){
				console.log("返回到在创作页面");
				this.$router.push({
					path: '/CreatePage'
				})
			}
			
			if(this.myMusicList.length == 0){
				this.$store.dispatch("getMusicList");
			}
			plus.key.removeEventListener("backbutton", onback);
			plus.key.addEventListener("backbutton",onback.bind(this));
			this.wavesurfer = WaveSurfer.create({
				audioContext: this.audioText,
				container: "#mywave",
				waveColor: 'black',
				progressColor: 'white',
				cursorColor: 'white',
				scrollParent: true,
				normalize: true,
				height: 110,
				barHeight: 4,
			});
			//			console.log("dasdadasasd")
			var ready = function() {
				this.showLoad = false;
			}
			this.wavesurfer.on("ready", ready.bind(this))
			console.log(this.$store.getters.getNew)
			if(this.myMusicList.length > 0) {
				this.showLoad = true;
				console.log("http://47.106.112.13:5000/"+this.myMusicList[this.mySelIndex].address);
				this.wavesurfer.load("http://47.106.112.13:5000/"+this.myMusicList[this.mySelIndex].address);
			}
		},
		methods: {
			// 创建下载任务
			createDownload: function() {
				this.showdown = true;
				this.downtext = "准备下载";
				var dtask = plus.downloader.createDownload(this.myMusicList[this.mySelIndex].address, {}, function(d, status) {
					// 下载完成
					this.downtext = "开始下载";
					if(status == 200) {
						console.log("Download success: " + d.filename);
						this.downtext = "下载成功,"+d.filename;
					} else {
						console.log("Download failed: " + status);
						this.downtext = "下载失败，请检查网络";
					}
					var temp  = function(){
						this.showdown = false;
					}
					setTimeout(temp.bind(this), 2000)
				}.bind(this));
				//dtask.addEventListener( "statechanged", onStateChanged, false );
				dtask.start();
			},
			clickMyPlay: function() {
				this.wavesurfer.playPause();
				this.thisplay = this.wavesurfer.isPlaying() ? true : false;
			},
			Select: function(index) {
				this.$store.dispatch('setMySelIndex', index)
			},
			deleteMusic: function(type, index) {
				this.$store.dispatch("delMyMusic", {"musicId":this.myMusicList[index].id,"index":index});
				this.wavesurfer.empty();
			},
			backCreate: function() {
				this.$router.push({
					path: '/CreatePage'
				})
			},
			logout:function(){
				console.log("asda")
				this.$store.dispatch("logout");
				this.$router.push({
					path: '/Login'
				})
			}
		},
		watch: {
			mySelIndex: function() {
				if(this.mySelIndex >= 0) {
					this.showLoad = true;
					console.log("http://47.106.112.13:5000/"+this.myMusicList[this.mySelIndex].address);
					this.wavesurfer.load("http://47.106.112.13:5000/"+this.myMusicList[this.mySelIndex].address);
				}
			}
		}

	}
</script>

<style>
	.my-music {
		width: 100% !important;
		background-color: #4a4a4a;
		overflow: hidden;
	}
	
	.vux-header {
		width: 100% !important;
	}
	
	.vux-header .vux-header-right {
		top: 8px !important;
	}
	
	.my-music-list {
		height: 10rem !important;
		overflow: hidden;
		border: 1.5px solid black;
		margin: 1rem 5rem 1rem 5rem;
		color: white;
	}
	
	.vux-swipeout-content {
		background-color: #4a4a4a !important;
		text-align: left;
		height: 2rem;
		line-height: 2rem;
	}
	
	.my-header {
		height: 2rem;
		line-height: 2rem;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin: .3rem;
		/*margin-bottom: 0;*/
	}
	
	.my-list {
		margin-top: 0 !important;
		margin-bottom: 0 !important;
		background-color: rgb(238, 208, 206) !important;
	}
	
	.my-header>span {
		background-color: rgb(238, 208, 206);
		border: 1.5px solid black;
		border-radius: 5px;
		line-height: 2rem;
		color: black !important;
	}
	
	.my-list>span {
		background-color: rgb(238, 208, 206);
		overflow: hidden;
		border: 0;
	}
	
	.my-header>span:nth-of-type(1) {
		flex: 2;
		margin-right: 0.3rem;
		text-align: center;
	}
	
	.my-header>span:nth-of-type(2) {
		flex: 2;
		margin-right: 0.3rem;
		text-align: center;
	}
	
	.my-header>span:nth-of-type(3) {
		flex: 4;
		text-align: center;
	}
	.vux-header-right{
		display: inline-block;
		/*line-height: 100%;*/
		/*height: 100%*/
		margin-top: .3rem;
	}
	.logout{
		font-size: 1rem;
		color: rgb(238, 208, 206);
		font-family: fzytk;
	}
	.title{
		color: rgb(238, 208, 206) !important;
		font-family: fzytk !important;
	}
	.music-way {
		margin: 1rem 5rem;
		display: flex;
		flex-direction: row;
	}
	/*.music-way>div{border: 1px solid red;}*/
	
	.music-way>div:nth-of-type(1) {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		/*align-items: center;*/
	}
	
	.music-way>div:nth-of-type(2) {
		flex: 4;
		background-color: #bababb;
	}
	
	.music-way button {
		width: 4rem;
		color: white;
		background-color: transparent;
		/*border: 1.5px solid black;*/
		border: 0;
		border-radius: 2px;
	}
	
	.select {
		border: 1px solid #a0a0a0;
	}
	
	.myplay>i {
		font-size: 2rem;
		color: rgb(238, 208, 206) !important;
	}
	.vux-loading .weui-toast {
  		top: 50% !important;
  		transform: translateX(-50%) translateY(-50%) !important;;
	}
</style>