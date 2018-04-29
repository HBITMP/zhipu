<template>
  <div id="app">
    <router-view v-transition/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted: function() {
			let self = this; // 这里
			window.addEventListener(
				"onorientationchange" in window ? "orientationchange" : "resize",
				function() {
					console.log("监听屏幕旋转")
					if(window.orientation == 90 || window.orientation == -90) {
						self.$store.dispatch('setRow', true)
					} else {
						self.$store.dispatch('setRow', false)
					}
				},
				false
			);
//			self.$store.dispatch('setRow', true)
			//这段代码用来实现初始化相关数据
			if(window.orientation == 90 || window.orientation == -90){
				self.$store.dispatch('setRow', true)
			} else {
				self.$store.dispatch('setRow', false)
			}
	}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex: 1;
  height: 100%;
  /*margin-top: 60px;*/
}
</style>
