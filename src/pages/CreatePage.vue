<template>
	<div class="box">
		<div class="header" ref="header">
			<div class="btng">
				<button class="btncss"><i class="iconfont icon-shuaxin"></i></button>
				<button class="btncss" @click="clickplay"><i :class="play ? 'iconfont icon-bofang' : 'iconfont icon-zanting' "></i></button>
			</div>
			<span>创作页面</span>
			<button class="btncss">我的</button>
		</div>
		<div class="body">
			<div class="top-part" ref="topPart">
				<div>
					<button class="btncss">+</button>
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
				<button>智能学习</button>
			</div>
			<input type="range" value="10" max="100" min="0" />
		</div>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import { AlertModule } from 'vux';
	import Bscroll from 'better-scroll';
	import MusicList from '../components/musicList';


	export default {
		name: 'CreatePage',
		data() {
			return {
				play: true,
				list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
				bodyHeight:0
			}
		},
		components: {
			MusicList,
		},
		methods: {
			getClientHeight: function() {
				var clientHeight = 0;
				if(document.body.clientHeight && document.documentElement.clientHeight) {
					var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
				} else {
					var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
				}
				return clientHeight;
			},
			getHeight: function () {
				return (this.getClientHeight()-this.$refs.header.offsetHeight-this.$refs.footer.offsetHeight-this.$refs.topPart.offsetHeight) / 16;
			},
			clickplay: function() {
				console.log(this.play)
				console.log(this.getClientHeight())
				console.log(this.getHeight())
				this.play = !this.play;
				
				this.scroll.scrollTo(-120, 0, 3000)
			},
		},
		beforeMount: function() {
			console.log("开始创建")

			//			AlertModule.show({
			//				title: '提示',
			//				content: "请将屏幕旋转至横屏",
			//				onShow() {
			//					console.log('Module: I\'m showing')
			//				},
			//				onHide() {
			//					console.log('Module: I\'m hiding now')
			//				}
			//			})
			
		},
		mounted:function  () {
			this.bodyHeight = this.getHeight();
			console.log("计算高度是："+this.bodyHeight)
		},
		created: function() {
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
		color: white;
	}
	
	.btncss,
	.footer>div>button {
		background-color: #343434;
		border: 1px solid #1b1b1b;
		color: white;
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
</style>