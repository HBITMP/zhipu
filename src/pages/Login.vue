<template>
	<div class="login-box">
		<p class="login-tilte">智谱</p>
		<group class="login-form">
			<x-input v-model="username" placeholder="Username">
				<img slot="label" style="padding-left:10px;display:block;" src="../assets/user.png" height="24">
			</x-input>
			<x-input v-model="password" placeholder="Password" type="password">
				<img slot="label" style="padding-left:10px;display:block;" src="../assets/pwd.png" height="24">
			</x-input>
			<x-button @click.native="clickLogin">Login</x-button>
		</group>
		<p class="link-p">Don't hava an account?
			<router-link to="/Register" class="sign-link">Sign up</router-link>
		</p>
		<div v-transfer-dom>
			<loading :show="show2" :text="logintext"></loading>
		</div>
	</div>
</template>

<script>
	import { XButton, XInput, Group, Loading, TransferDom } from 'vux';
	import {mapState} from 'vuex';
	export default {
		name: 'Login',
		directives: {
    		TransferDom,
  		},
		data() {
			return {
				username: "",
				password: "",
				logintext:"正在登录",
				show2:false,
			}
		},
		components: {
			XButton,
			XInput,
			Group,
			Loading
		},
		computed:{
			...mapState({
				loginStatus: state => state.user.loginStatus,
			})
		},
		mounted: function() {
			function plusReady() {
				var onback = function(){
					this.$router.push({
						path: '/StartCreate'
					})
				}
				plus.key.addEventListener("backbutton",onback.bind(this));
				plus.navigator.setStatusBarStyle( "light" );
				// 设置系统状态栏背景为红色
				plus.navigator.setFullscreen(false);
				plus.screen.lockOrientation("portrait-primary");
			}
			if(window.plus) {
				plusReady();
			} else {
				document.addEventListener('plusready', plusReady.bind(this), false);
			}
		},
		methods: {
			clickLogin: function() {
				console.log("asd")
				this.show2 = true;
				this.$store.dispatch("verLogin", {
					username: this.username,
					userpwd: this.password
				})
			}
		},
		watch:{
			loginStatus: function(){
				if( this.loginStatus ){
					this.show2 = false;
					this.$router.push({
					path: '/CreatePage'
				})
				}
			}
		}
	}
</script>

<style>
	.login-box {
		width: 100%;
		height: 100%;
		background-color: black;
		padding-top: 40%;
		background-image: url(../assets/login.jpg);
		background-size: contain;
		background-position: center;
	}
	
	.login-tilte {
		font-family: fzytk;
		color: white;
		font-size: 3rem;
		height: 3rem;
		line-height: 3rem;
	}
	
	.login-form {
		margin: 4rem 2.5rem 0 2.5rem;
		background-color: transparent;
		border: 0;
	}
	
	.login-form div {
		background-color: transparent;
		padding: 0;
		border: 0;
	}
	
	.login-form .vux-x-input {
		background-color: white !important;
	}
	
	.login-form input {
		margin-bottom: 0;
		border: 0;
		outline: none;
	}
	
	.login-form button {
		background-color: rgb(238, 208, 206);
		font-weight: bolder;
		margin-top: 4rem;
		border: 0;
		border-radius: 0;
	}
	
	.link-p {
		position: absolute;
		bottom: 5rem;
		color: white;
		left: 0;
		right: 0;
		margin: 0 auto;
		font-size: 1rem;
	}
	
	.sign-link {
		color: white;
		border-bottom: 1px solid white;
	}
	.vux-loading .weui-toast {
  		top: 50%;
  		transform: translateX(-50%) translateY(-50%);
	}
</style>