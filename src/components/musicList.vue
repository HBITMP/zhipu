<template>
	<div class="music-list-box" ref="musicListBox" @click="maopao">
		<ul class="music-content" ref="musicContent">
			<li v-for="(item, index) in musicList" :key="item.id">
				<div>
					<swipeout class='music-swipout'>
						<swipeout-item transition-mode="follow">
							<div slot="right-menu">
								<swipeout-button class="swipout-button" @click.native="onButtonClick('rename', index)" type="primary">重命名</swipeout-button>
								<swipeout-button class="swipout-button" @click.native="onButtonClick('dele', index)" type="warn">删除</swipeout-button>
							</div>
							<div slot="content" class="music-context vux-1px-t" :class="num == index ? 'active' : 'notactive'" @click="active(index)">
								<span :class="num == index ? 'spanactive' : 'spannotactive'">{{index+1}}</span>
								<span><i class="iconfont icon-yinpin"></i>{{item.name}}</span>
							</div>
						</swipeout-item>
					</swipeout>
				</div>
				<div>
					<scroll-play :address="item.address"></scroll-play>
				</div>
			</li>

		</ul>
		<div v-transfer-dom>
			<confirm v-show="show" 
				show-input=true 
				:title="请输入新的名称" 
				:input-attrs="{type: 'string'}" 
					
				<!--@on-cancel="onCancel" @on-confirm="onConfirm" @on-show="onShow" @on-hide="onHide">-->
			</confirm>
		</div>
	</div>
</template>

<script>
	import Bscroll from 'better-scroll';
	import { Swipeout, SwipeoutItem, SwipeoutButton, Confirm, TransferDom } from 'vux';
	import { mapState } from 'vuex';
	import ScrollPlay from './ScrollPlay';

	export default {
		name: 'musicList',
		props: ["height"],
		directives: {
			TransferDom
		},
		components: {
			Swipeout,
			SwipeoutItem,
			SwipeoutButton,
			ScrollPlay,
			Confirm,

		},
		data() {
			return {
				isactive: false,
				num: 0,
				show: false
			}
		},
		computed: {
			...mapState({
				musicList: state => state.music.musicInfo
			})
		},
		methods: {
			active: function(index) {
				this.isactive = !this.isactive;
				this.num = index;
			},
			onButtonClick: function(type, index) {
				console.log(type + "--" + index)
				if(type === 'dele') {
					//删除歌曲的操作

				} else {
					//重命名歌曲的操作
					this.show = true;
					console.log(this.show)
				}
			},
			maopao: function() {
				console.log("z345678")
			}
		},
		created: function() {
			console.log("孩子的数据" + this.height)

			this.$nextTick(() => {
				this.scroll = new Bscroll(this.$refs.musicListBox, {
					startY: 0,
					click: true,
					scrollX: false,
					scrollY: true,
					eventPassthrough: 'horizontal',
				});
			})
		},
		watch: {
			height: function() {
				this.$refs.musicListBox.style.height = this.height + 'rem';
			}
		},
		mounted: function() {

		}
	}
</script>

<style>
	.music-list-box {
		height: 10rem;
		width: 100%;
		overflow: hidden;
	}
	
	.music-content {
		list-style: none;
		text-align: start;
		margin: 0;
		padding: 0;
		height: 200rem;
	}
	
	.music-content>li {
		display: flex;
		color: white;
		background-color: #272727;
		border: 0;
		height: 3rem;
	}
	
	.music-content>li>div:nth-of-type(1) {
		flex: 1;
		/*padding-right: .7rem;*/
		height: 100%;
		background-color: #676367;
		/*border-bottom: .1rem solid #3a383b;*/
	}
	
	.music-content>li>div:nth-of-type(1)>.music-swipout {
		background-color: #676367;
		height: 100%;
	}
	
	.music-content>li>div:nth-of-type(2) {
		flex: 3;
		border-bottom: .1rem solid #2c2c2c;
	}
	
	.swipout-button {
		/*width: 4rem !important;*/
	}
	
	.music-context {
		height: 3rem;
		line-height: 3rem;
	}
	
	.music-context>span:nth-of-type(1) {
		position: relative;
		display: inline-block;
		width: 1.2rem;
		height: 2.9rem;
		top: -.1rem;
		text-align: center;
		background-color: #1a1a1a;
	}
	
	.spannotactive {
		border-top: .1rem solid #1a1a1a;
	}
	
	.spanactive {
		border-top: .1rem solid #a4a394;
	}
	
	.music-context>span:nth-of-type(2) {
		display: inline-block;
		vertical-align: top;
		font-size: .8rem;
		width: 8rem;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.music-context>span:nth-of-type(2)>i {
		font-size: 1rem;
		margin: 0 .2rem;
	}
	
	.notactive {
		background-color: #676367;
		border-top: .1rem solid #676367;
		border-bottom: .1rem solid #3a383b;
	}
	
	.active {
		background-color: #858185;
		border: .1rem solid #a4a394;
		border-left: 0;
	}
	
	.activemusic-context {
		height: 100%;
	}
</style>