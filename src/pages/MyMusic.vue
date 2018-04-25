<template>
	<div class="my-music">
		<x-header :left-options="{backText: '',preventGoBack:true}" style="background-color:#3a3a3a;" @on-click-back="backCreate">
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
		          <swipeout-button @click.native="onButtonClick('delete')" type="warn">删除</swipeout-button>
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
				<button @click="play">{{playtext}}</button><br />
				<button>下载</button>
			</div>
			<div id="mywave"></div>
		</div>
	</div>
</template>

<script>
	import { XHeader, Scroller, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux';
	import { mapState } from 'vuex';
	import WaveSurfer from '../../static/js/wavesurfer.js';

	export default {
		name: 'MyMusic',
		data() {
			return {
				playtext: '播放'
			}
		},
		components: {
			XHeader,
			Scroller,
			Swipeout,
    		SwipeoutItem,
    		SwipeoutButton,
		},
		computed: {
			...mapState({
				myMusicList: state => state.mymusic.myMusic,
				audioText: state => state.win.audiotext,
				mySelIndex: state => state.mymusic.mySelIndex,
				myPlayIndex: state => state.mymusic.myPlayIndex,
			})
		},
		mounted: function(){
			console.log(this.audioText)
			this.wavesurfer = WaveSurfer.create({
				audioContext: this.audioText,
				container: "#mywave",
				waveColor: 'black',
				progressColor: 'white',
				cursorColor: 'white',
				scrollParent: true,
				height: 110,
			});
			console.log("dasdadasasd")
			console.log(this.$store.getters.getNew)
			this.wavesurfer.load(this.myMusicList[this.mySelIndex].address);
		},
		methods: {
			play: function(){
				this.wavesurfer.playPause();
				this.playtext = this.wavesurfer.isPlaying()? "暂停" : '播放';
			},
			Select:function(index){
				this.$store.dispatch('setMySelIndex', index)
			},
			onButtonClick: function(){},
			backCreate: function() {
				this.$router.push({ path: '/CreatePage' })
			},
		},
		watch:{
			mySelIndex:function(){
				if(this.mySelIndex >= 0){
					this.wavesurfer.load(this.myMusicList[this.mySelIndex].address);
				}
			}
		}

	}
</script>

<style>
	.my-music {
		width: 100% !important;
		background-color: #3a3a3a;
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
		border: 2px solid #a0a0a0;
		margin: 1rem 5rem 1rem 5rem;
		color: white;
	}
	.vux-swipeout-content{
		background-color: #3a3a3a !important;	
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
		background-color: #a0a0a0;
	}
	.my-list>span{
		background-color: #3a3a3a;
		overflow: hidden;
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
		color: black;
		background-color: #a0a0a0;
		border: 0;
		border-radius: 0;
	}
	.select{
		border: 1px solid #a0a0a0;
	}
</style>