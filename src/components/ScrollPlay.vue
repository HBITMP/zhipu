<template>
	<div class="audiobox" ref="audiobox">
		<div class="audiocontent" :id="id"></div>
	</div>
</template>

<script>
	import Bscroll from 'better-scroll';
	import { mapState } from 'vuex';
	import WaveSurfer from '../../static/js/wavesurfer.js'
	
	export default{
		name: 'ScrollPlay',
		props:['address', 'id', 'childaudio','index'],
		data(){
			return {
				wavesurfer: null,
			}
		},
		computed: {
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
		},
		
		mounted: function(){
			this.wavesurfer = WaveSurfer.create({
				audioContext: this.childaudio,
				container: "#"+this.id,
				waveColor: 'white',
				progressColor: 'black',
				cursorColor: 'white',
//				scrollParent: true
			});
			this.wavesurfer.load(this.address);
			this.wavesurfer.on('finish', function(){
				this.$store.dispatch("setPlayStop");
			})
			this.$store.dispatch('initWave', {index:this.index, wave: this.wavesurfer})
		},
		
		methods:{
			playPause: function(){
				this.wavesurfer.playPause()
			}
		}
	}
</script>

<style>
.audiobox{
	width: 31rem;
	height: 3rem;
	line-height: 3rem;
	overflow: hidden;
}
.audiocontent{
	width: 100rem;
	overflow: hidden;
	height: 3rem;
}
</style>