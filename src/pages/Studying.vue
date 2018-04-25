<template>
	<div class="load-box">
		<div>
			<p>{{text}}</p>
			<x-progress :percent="process" :show-cancel="false"></x-progress>
		</div>
	</div>
</template>

<script>
	import { XProgress } from 'vux'
	import { mapState } from 'vuex';
	
	export default{
		name:'Studying',
		data(){
			return{
				process:0,
				text:"正在学习中，请稍后",
				timer: null,
			}
		},
		components:{ XProgress },
		computed:{
			...mapState({
				time: state => state.study.time,
				isSuccess: state => state.study.isSuccess,
				isNewMusic: state => state.study.isNewMusic,
			})
		},
		mounted: function(){
			console.log("开始学习"+this.isSuccess)
			if(this.isSuccess){
				this.text = "正在学习中，请稍后"
				var funct = function(){
					this.process += 100/this.time;
					if(this.process >= 100){
						this.process = 100;
						clearInterval(this.timer);
						this.$store.dispatch('getNewMusic');	
					}
				}
				this.timer = window.setInterval(funct.bind(this),1000)
			}
		},
		watch:{
			isSuccess: function(){
				if(this.isSuccess){
					console.log("jianting"+this.isSuccess)
					this.text = "正在学习中，请稍后"
					var funct = function(){
						this.process += 100/this.time;
						if(this.process >= 100){
							this.process = 100;
							clearInterval(this.timer);
							this.$store.dispatch('getNewMusic');
						}
						console.log(this.process)
					}
					this.timer = setInterval(funct.bind(this),1000)
				} else {
					this.text = "正在提交数据"
				}
			},
			isNewMusic: function(){
				if(this.$store.getters.getIsNewMusic){
					this.text = "歌曲生成成功，正在跳转"
					this.$router.push({ path: '/MusicFuse' })
				} else {
					this.process = 0;
				}
			}
		}
	}
</script>

<style>
	.load-box{
		position:relative;
		width: 100%;
		height: 100%;
		background-color: white;
		/*display: flex;*/
		/*justify-content: center;*/
		/*align-items: center;*/
	}
	.load-box > div{
		width: 50%;
		position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
              
	}
	.weui-progress{
		border: .2rem solid black;
        padding: .3rem;
	}
	.weui-progress__bar{
		height: 1rem !important;
		background-color: white !important;
	}
	.weui-progress__inner-bar{

		background-color: black !important;
	}
</style>