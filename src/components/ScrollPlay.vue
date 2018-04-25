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
			});
			function temp(dispatch){
				dispatch("addLoad");
			}
			this.wavesurfer.load(this.address);
			this.wavesurfer.on('ready',temp.bind(this, this.$store.dispatch));

			function finishPlay(){
				if( this.$store.getters.getIsLoop ){
					this.wavesurfer.play(0);
					
				} else {
					this.$store.dispatch("setPlayStop");
				}
				
			}
			this.wavesurfer.on('finish', finishPlay.bind(this));
			
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
	width: 30rem;
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