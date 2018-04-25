<template>
	<div v-if="status" class="file-box" @click="data">
		<scroller lock-x  height="12rem" :bounce=true scrollbarY>
			<div class="box1">
				<ul class="mui-table-view mui-table-view-radio box1-item">
					<li class="mui-table-view-cell" :id="text+index" v-for="(item, index) in sysMusicList" :key="index" @click="addSysMusic(index)">
						<a class="mui-navigate-right">{{item.name}}</a>
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
				text: 'sysMusic'
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
				sysMusicList: state => state.sysmusic.catelog,
				selectedMusic: state => state.music.musicInfo,
				status: state => state.sysmusic.status
			})
		},
		mounted:function(){
			console.log(this.sysMusicList)
		},
		methods:{
			addSysMusic: function(index){
				console.log(index);
				for (var i = 0; i < this.selectedMusic.length ;i++){
					if( this.selectedMusic[i].id == this.sysMusicList[index].id ) {
						//选择的歌曲的重复了，提示一下
						this.showSelected = true;
						return ;
					}
				}
//				 mui-selected
				this.$store.dispatch('addMusic',this.sysMusicList[index]);
				this.$emit('showDig',true, "音频解析中");
				this.$emit('on-confirm');
				document.getElementById(this.text+index).classList.add("mui-selected");
			},
			data: function(){
				console.log("dainji")
				console.log(this.sysMusicList)
				console.log(this.status)
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
	.box1-item .mui-table-view-cell:after{
		left: 0 !important;
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
</style>