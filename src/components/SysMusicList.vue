<template>
	<div v-if="status" class="file-box" @click="data">
		<scroller lock-x  height="12rem" :bounce=true scrollbarY>
			<div class="box2">
				<ul class="mui-table-view mui-table-view-radio box2-item">
					<!--@click="addSysMusic(index)"-->
					<li class="mui-table-view-cell" v-for="(item, index) in sysMusicList" :key="index" @click="selectStyle(index)">
						<a class="mui-navigate-right">{{item.name}}</a>
					</li>
				</ul>
			</div>
		</scroller>
		<scroller lock-x  height="12rem" :bounce=true scrollbarY>
			<div class="box1">
				<ul class="mui-table-view box1-item">
					<li class="mui-table-view-cell" :id="text+index" v-for="(item, index) in nowMusicList" :key="index" @click="addSysMusic(index)">
						{{item.name}}
					</li>
				</ul>
			</div>
		</scroller>
		<div v-transfer-dom>
      		<alert v-model="showSelected" title="温馨提示">请不要重复选择歌曲</alert>
    	</div>
	</div>
	<div v-else>网络错误，请稍后重试</div>
</template>

<script>
	import { Scroller, Group, Radio, Alert, TransferDom } from 'vux';
	import { mapState } from 'vuex';
 
	export default({
		name: 'SysMusicList',
		directives: {
			TransferDom
		},
		data() {
			return {
				showSelected: false,
				text: 'sysMusic',
				nowMusicList:null,
			}
		},
		components: {
			Scroller,
			Group,
			Radio,
			Alert 
		},
		computed: {
			...mapState({
				SelectStyle: state => state.sysmusic.SelectStyle,
				sysMusicList: state => state.sysmusic.catelog,
				selectedMusic: state => state.music.musicInfo,
				status: state => state.sysmusic.status
			})
		},
		mounted:function(){
			console.log(this.sysMusicList)
		},
		methods:{
			selectStyle: function(index){
				this.$store.dispatch("setSelectStyle", index)
			},
			addSysMusic: function(index){
				console.log(this.sysMusicList[this.SelectStyle]);
				
				for (var i = 0; i < this.selectedMusic.length ;i++){
					if( this.selectedMusic[i].id == this.sysMusicList[this.SelectStyle].catelog[index].id ) {
						//选择的歌曲的重复了，提示一下
						this.showSelected = true;
						return ;
					}
				}
//				 mui-selected
				this.$store.dispatch('addMusic',this.sysMusicList[this.SelectStyle].catelog[index]);
				this.$emit('showDig',true, "音频解析中");
				this.$emit('on-confirm');
				document.getElementById(this.text+index).classList.add("mui-selected");
			},
			data: function(){
				console.log("dainji")
				console.log(this.sysMusicList)
				console.log(this.status)
			}
		},
		watch:{
			SelectStyle: function(){
				this.nowMusicList = this.$store.getters.getNowMusicList;
				console.log("----------")
				console.log(this.nowMusicList)
				console.log("----------")
			}
		}
	})
</script>

<style>
	.file-box {
		height: 12rem;
		/*border-top: 1px solid red;*/
		overflow: hidden;
		background-color: black;
		color: white;
		display: flex;
		flex-direction: row;
		width: 22rem;
	}
	.file-box>div:nth-of-type(1){
		flex: 2;
		background-color: #676466 !important;
	}
	.file-box>div:nth-of-type(2){
		flex: 3;
	}
	.box2{
		background-color: #676466 !important;
	}
	.box2-item{
		background-color: #676466 !important;
	}
	.box1-item{
		/*text-align: left !important;*/
		background-color: black !important;
	}
	.box1-item li{
		padding-left: 0 !important; 
		text-align: left !important;
		padding-left: 1rem !important;
	}
	.box1-item li:active, .box1-item li>a:active{
		/*background-color: red !important;*/
	}
	.box1-item .mui-table-view-cell:after ,.box2-item .mui-table-view-cell:after{
		left: 0 !important;
		height: 0;
	}{
		left: 0 !important;
		height: 0;
	}
	.select-sys-music .weui-dialog__bd{
		padding-left: 10px;
		padding-right: 9px;
		padding-bottom: 9px;
	}
	.file-box > div > div:nth-child(3){
		background-color: black !important;
	}
	.file-box > div > div:nth-child(3)>div{
		background-color: white !important;
	}
	.mui-table-view:after{
		height: 0;
	}
	.mui-navigate-right:after{
		color: rgb(238, 208, 206) !important;
	}
</style>