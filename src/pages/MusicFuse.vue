<template>
	<div class="fuse-box">
		<x-header :left-options="{backText: '',preventGoBack:true}" 
			style="background-color:#3a3a3a;" 
			@on-click-back="backCreate">
			<span slot="default">智能融合</span>
			<button class="mebtn" slot='right' @click="clickMe">我的</button>
		</x-header>
		<div class="info-box">
			<div class="info-left">
				<div>
					<span>音乐名称</span>
					<input type="text" v-model="musicName"/>
				</div>
				<div>
					<span>备注</span>
					<input type="text" v-model="musicOtherInfo"/>
				</div>
			</div>
			<div class="info-right">
				<button>生成</button>
				<button @click="playMusic">{{playtext}}</button>
				<button @click="saveMusic">保存</button>
			</div>
		</div>
		<div class="wave-box" id='newwave'></div>
		 <div v-transfer-dom>
      <confirm v-model="showSave"
      title="提示信息"
      @on-cancel="onCancel"
      @on-confirm="onConfirm">
        <p style="text-align:center;">歌曲保存成功，是否查看？</p>
      </confirm>
    </div>
	</div>
</template>

<script>
	import { XHeader, TransferDom,Confirm,  } from 'vux';
	import { mapState, } from 'vuex';
	import WaveSurfer from '../../static/js/wavesurfer.js';
	
	export default{
		name: "MusicFuse",
		directives: {
    		TransferDom
  		},
		data(){
			return {
				wavesurfer: null,
				newMusic: {},
				playtext: '播放',
				musicName: '',
				musicOtherInfo: '',
				showSave: false
			}
		},
		components:{XHeader, Confirm, },
		methods:{
			onCancel: function(){},
			onConfirm: function(){
				this.$router.push({path:'/MyMusic'});
			},
			saveMusic: function(){
				var data = this.$store.getters.getNew;
				if( this.musicName != '' ){
					data.name = this.musicName
				}
				data.other = this.musicOtherInfo
				data.time = new Date();
				this.$store.dispatch('addMyMusic',data)
				this.showSave = true;
			},
			backCreate: function(){
				this.$router.push({ path: '/CreatePage' })
			},
			clickMe: function(){
				console.log("點擊了我得")
				this.$router.push({path:'/MyMusic'})
			},
			playMusic: function(){
				this.wavesurfer.playPause();
				this.playtext = this.wavesurfer.isPlaying() ? "暂停" : "播放";
			}
		},
		computed:{
			...mapState({
				audioText: state => state.win.audiotext,
			})
		},
		mounted: function(){
			console.log(this.audioText)
			this.wavesurfer = WaveSurfer.create({
				audioContext: this.audioText,
				container: "#newwave",
				waveColor: 'black',
				progressColor: 'white',
				cursorColor: 'white',
				scrollParent: true,
				height: 160,
			});
			function temp(dispatch){
				dispatch("addLoad");
			}
			console.log("dasdadasasd")
			console.log(this.$store.getters.getNew)
			this.wavesurfer.load(this.$store.getters.getNew.address);
		},
	}
</script>

<style>
	.fuse-box{
		width: 100% !important;
		background-color: #3a3a3a;
	}
	.vux-header{
		width: 100% !important;
	}
	.vux-header .vux-header-right{
		top: 8px !important;
	}
	.mebtn{
		border: 0;
		background: #a0a0a0;
		color: white !important;
	}
	.info-box{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 2rem;
	}
	.info-left>div{
		white-space: nowrap;
	}
	.info-left>div>span{
		display: inline-block;
		width: 5rem;
		color: black;
		font-weight: 600;
		vertical-align: middle;
	}
	.info-left input{
		width: 13rem;
		height: 2rem;
		display: inline-block;
		margin: .3rem;
		border-radius: 0;
		background-color: #a0a0a0;
	}
	.info-right>button{
		border: 0;
		background-color: #9f9f9f;
		color: black;
		margin-left: 2rem;
	}
	.info-box >div{
		flex: 1;
		/*border: 1px solid red;*/
	}
	.wave-box{
		margin-top: 2rem;
		height: 10rem;
		width: 100%;
		background-color: #bababb;
		/*border: 1px solid red;*/
	}
</style>