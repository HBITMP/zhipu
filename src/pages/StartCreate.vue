<template>
	<div class="container">
		<p>Welcome</p>
		<div @click="clickTurn"  class="link">开始作曲</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	
	export default {
		name:'StartCreate',
		computed: {
			...mapState({
				loginStatus : state  => state.user.loginStatus,
			})
		},
		mounted: function()	{
			
			this.$store.dispatch("loadStroge");
			function pludReady() {
				plus.navigator.setFullscreen(false);
				plus.screen.lockOrientation("portrait-primary");
			}
			if(window.plus) {
				pludReady();
			} else {
				document.addEventListener("plusready", pludReady, 'false');
			}
		},
		methods: {
			clickTurn: function(){
				if(this.loginStatus){
					this.$router.push({
					path: '/CreatePage'
				})
				} else {
					this.$router.push({
					path: '/Login'
				})
				}
			}
		}
	}
</script>

<style>
	.container{
		display: flex;
		flex: 1;
		flex-direction: column;
		background-image: url(../assets/startcreatebg.jpg);
		background-size: contain;
		background-position: center;
		justify-content: space-around;
	}
	.container > p {
		text-align: center;
		color: white;
		font-size: 3.5rem;
		font-weight: 500;
	} 
	.link{
		position: relative;
		height: 4rem;
		line-height: 4rem;
		border: 0;
		background: linear-gradient(to right, rgba(60,60,60,0), rgba(60,60,60,1), rgba(60,60,60,0));
		color: white;
	}
	@media screen and (orientation : landscape ) {
		/*纵向*/	
		.link{
			top: -3rem;
		}
	}
	@media screen and (orientation: portrait ) {
		.link{
			top: -10rem;
		}
	}
	a:active{
		color:white;
	}
	
</style>