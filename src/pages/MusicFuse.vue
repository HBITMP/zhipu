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
					<input type="text" />
				</div>
				<div>
					<span>备注</span>
					<input type="text" />
				</div>
			</div>
			<div class="info-right">
				<button>生成</button>
				<button>播放</button>
				<button>保存</button>
			</div>
		</div>
		<div class="wave-box"></div>
	</div>
</template>

<script>
	import { XHeader,   } from 'vux';
	export default{
		name: "MusicFuse",
		data(){
			return {}
		},
		components:{XHeader, },
		methods:{
			backCreate: function(){
				this.$router.push({ path: '/CreatePage' })
			},
			clickMe: function(){
				console.log("點擊了我得")
			}
		}
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
		border: 1px solid red;
	}
</style>