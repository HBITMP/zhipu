<template>
	<div class="my-music">
		<div v-transfer-dom>
      		<loading :show="showLoad" :text="textLoad"></loading>
    	</div>
		<x-header :left-options="{backText: '',preventGoBack:true}" style="background-color:#4a4a4a;" @on-click-back="backCreate">
			<span slot="default">我的作品</span>
		</x-header>
		<div class="my-music-list">
			<div class="my-header">
		      	<span>名称</span>
		      	<span>时长</span>
		      	<span>备注</span>
		     </div>
			<scroller lock-x height="10rem" scrollbar-y ref="scrollerBottom">
		      
		      <swipeout class="my-swipeout">

		      <swipeout-item  transition-mode="follow" :class="index == mySelIndex ? 'select':''" v-for="(item, index) in myMusicList" :key="index" @click.native="Select(index)">
		        <div slot="right-menu">
		          <swipeout-button @click.native="deleteMusic('delete', index)" type="warn">删除</swipeout-button>
		        </div>
		        <div slot="content" class="my-header my-list">
		      		<span>{{item.name}}</span>
		      		<span>{{item.time}}</span>
		      		<span>{{item.other}}</span>
		     	</div>
		      </swipeout-item>
		      </swipeout>
		    </scroller>
		</div>
		<div class="music-way">
			<div>
				<button @click="clickMyPlay">{{playtext}}</button><br />
				<button>下载</button>
			</div>
			<div id="mywave"></div>
		</div>
	</div>
</template>

<script>
	import { XHeader, Scroller, Swipeout, SwipeoutItem, SwipeoutButton, TransferDom, Loading } from 'vux';
	import { mapState } from 'vuex';
	import WaveSurfer from '../../static/js/wavesurfer.js';

	export default {
		name: 'MyMusic',
		data() {
			return {
				playtext: '播放',
				showLoad:false,
				textLoad:"正在解析音频",
				wavesurfer: null,
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
		},
		computed: {
			...mapState({
				myMusicList: state => state.mymusic.myMusic,
				audioText: state => state.win.audiotext,
				mySelIndex: state => state.mymusic.mySelIndex,
				myPlayIndex: state => state.mymusic.myPlayIndex,
			})
		},
		beforeDestroy: function(){
			if( this.wavesurfer.isPlaying() ){
				this.wavesurfer.playPause();
			}
		},
		mounted: function(){
			this.wavesurfer = WaveSurfer.create({
				audioContext: this.audioText,
				container: "#mywave",
				waveColor: 'black',
				progressColor: 'white',
				cursorColor: 'white',
				scrollParent: true,
				normalize:true,
				height: 110,
				barHeight:4,
			});
//			console.log("dasdadasasd")
			var ready = function(){
				this.showLoad = false;
			}
			this.wavesurfer.on("ready", ready.bind(this))
			console.log(this.$store.getters.getNew)
			if( this.myMusicList.length > 0 ){
				this.showLoad = true;
				this.wavesurfer.load(this.myMusicList[this.mySelIndex].address);
			}	
		},
		methods: {
			clickMyPlay: function(){
				this.wavesurfer.playPause();
				this.playtext = this.wavesurfer.isPlaying()? "暂停" : '播放';
			},
			Select:function(index){
				this.$store.dispatch('setMySelIndex', index)
			},
			deleteMusic: function(type, index){
				this.$store.dispatch("delMyMusic", index);
				this.wavesurfer.empty();
			},
			backCreate: function() {
				this.$router.push({ path: '/CreatePage' })
			},
		},
		watch:{
			mySelIndex:function(){
				if(this.mySelIndex >= 0){
					this.showLoad = true;
					this.wavesurfer.load(this.myMusicList[this.mySelIndex].address);
				}
			}
		}

	}
</script>

<style>
	.my-music {
		width: 100% !important;
		background-color: #4a4a4a;
	}
	
	.vux-header {
		width: 100% !important;
	}
	
	.vux-header .vux-header-right {
		top: 8px !important;
	}
	.my-music-list{
		height: 10rem !important;
		overflow: hidden;
		border: 1.5px solid black;
		margin: 1rem 5rem 1rem 5rem;
		color: white;
	}
	.vux-swipeout-content{
		background-color: #4a4a4a !important;	
		text-align: left;
		height: 2rem;
		line-height: 2rem;
	}
	.my-header{
		height: 2rem;
		line-height: 2rem;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin:.3rem;
		/*margin-bottom: 0;*/
	}
	.my-list{margin-top: 0 !important;margin-bottom: 0 !important; background-color: #3a3a3a !important;}
	.my-header>span{
		background-color: #363636;
		border: 1.5px solid black;
		border-radius: 5px;
		line-height: 2rem;
	}
	.my-list>span{
		background-color: #3a3a3a;
		overflow: hidden;
		border: 0;
	}
	.my-header>span:nth-of-type(1){flex: 2;margin-right: 0.3rem;text-align: center;}
	.my-header>span:nth-of-type(2){flex: 2;margin-right: 0.3rem;text-align: center;}
	.my-header>span:nth-of-type(3){flex: 4;text-align: center;}

	.music-way{
		margin: 1rem 5rem;
		display: flex;
		flex-direction: row;
	}
	/*.music-way>div{border: 1px solid red;}*/
	.music-way>div:nth-of-type(1){
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		/*align-items: center;*/
	}
	.music-way>div:nth-of-type(2){flex: 4;background-color: #bababb;}
	.music-way button{
		width: 4rem;
		color: white;
		background-color: #363636;
		border: 1.5px solid black;
		border-radius: 2px;
	}
	.select{
		border: 1px solid #a0a0a0;
	}
</style>