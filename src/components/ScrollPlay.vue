<template>
	<div class="audiobox" ref="audiobox">
		<div class="audiocontent">{{address}}</div>
	</div>
</template>

<script>
	import Bscroll from 'better-scroll';
	
	export default{
		name: 'ScrollPlay',
		props:['address',],
		data(){
			return {}
		},
		created: function(){
			this.$nextTick(() => {
				this.scroll = new Bscroll(this.$refs.audiobox, {
					startX: 0,
					click: true,
					scrollX: true,
					scrollY: false,
					eventPassthrough: 'vertical'
				});
			})	
		}
	}
</script>

<style>
.audiobox{
	width: 30rem;
	height: 3rem;
	line-height: 3rem;
	overflow: hidden;
}
.audiocontent{
	width: 100rem;
	overflow: hidden;
}
</style>