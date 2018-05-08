<template>
	<div class="register-box">
		<p class="reg-title">智谱</p>
		<div class="reg-logo"><img src="../assets/adduser.png" alt="" /></div>
		<group class="reg-form">
			<x-input v-model="username" placeholder-align="center" text-align="center" placeholder="Username"></x-input>
			<x-input v-model="email" placeholder-align="center" text-align="center"  placeholder="Email"></x-input>
			<x-input v-model="phone" placeholder-align="center" text-align="center"  placeholder="Phone"></x-input>
			<x-input v-model="password" type="password" placeholder-align="center" text-align="center"  placeholder="Password"></x-input>
			<x-button @click.native="clickReg">Create account</x-button>
		</group>
		<div v-transfer-dom>
			<loading :show="showReg" :text="regtext"></loading>
		</div>
	</div>
</template>

<script>
	import { XButton, XInput, Group, Loading, TransferDom } from 'vux';
	import {mapState} from 'vuex';
	
	export default {
		name: 'Register',
		directives: {
		TransferDom,
  		},
		data() {
			return {
				username: "",
				password: "",
				email:"",
				phone:"",
				showReg: false,
				regtext:"正在注册",
			}
		},
		computed:{
			...mapState({
				registerStatus: state => state.user.registerStatus,
			})
		},
		components:{ XButton, XInput, Group, Loading },
		mounted: function() {
			function plusReady() {
				// 设置系统状态栏背景为红色
				plus.navigator.setStatusBarStyle( "dark" );
				plus.navigator.setFullscreen(false);
				plus.screen.lockOrientation("portrait-primary");
			}
			if(window.plus) {
				plusReady();
			} else {
				document.addEventListener('plusready', plusReady, false);
			}
		},
		methods:{
			clickReg: function(){
				this.showReg = true;
				this.$store.dispatch("register",{username:this.username,userpwd:this.password,email:this.email,phone:this.phone})
			}
		},
		watch: {
			registerStatus: function(){
				if(this.registerStatus){
					this.showReg = false;
					this.$router.push({
					path: '/Login'
				})
				}
			}
		}
	}
</script>

<style>
	.register-box{
		width: 100%;
		height: 100%;
		background-color: white;
	}
	.reg-title{
		text-align: center;
		font-family: fzytk;
		color: black;
		font-size: 1.5rem;
		line-height: 2rem;
		margin-top: 3rem;
	}
	.reg-logo{
		margin-top: 2rem;
	}
	.reg-logo > img{
		display: inline-block;
		width: 5rem;
		height: 5rem;
		padding: 1rem;
		border-radius: 50%;
		background-color:  rgb(238,208,206);
	}
	.reg-form{
		margin: 0 2rem;
		border: 0;
	}
	.reg-form .weui-cells:before{border: 0;}
	.reg-form .vux-x-input{
		margin-top: 1rem;
		border-top: 0;
		border-bottom: 1px solid rgb(225,229,235);
	}
	.reg-form .vux-x-input:before{
		border: 0;
	}
	.reg-form div{
		background-color: transparent;
		margin: 0;
		padding: 0;
		border: 0;
	}
	.reg-form input{
		
		height: 3rem;
		margin: 0;
		border: 0;
	}
	.reg-form button{
		margin-top: 3rem;
		border: 0 !important;
		background-color: rgb(148,167,195);
		color: white;
		font-weight: bold;
	}
	.vux-loading .weui-toast {
  		top: 50%;
  		transform: translateX(-50%) translateY(-50%);
	}
</style>