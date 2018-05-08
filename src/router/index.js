import Vue from 'vue'
import Router from 'vue-router'
import PageTransition from '@/pages/PageTransition'
import HelloWorld from '@/components/HelloWorld'
import StartCreate from '@/pages/StartCreate'
import CreatePage from '@/pages/CreatePage'
import Studying from '@/pages/Studying'
import MusicFuse from '@/pages/MusicFuse'
import MyMusic from '@/pages/MyMusic'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

Router.prototype.goback = function() {
	this.isBack = true
	window.history.go(-1)
}

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/StartCreate' 
		},
		{
			path: '/StartCreate',
			component: StartCreate,
		},
		{
			path: '/CreatePage',
			name: 'CreatePage',
			component: CreatePage
		},
		{
			path: '/StartStudy',
			name: 'Studying',
			component: Studying
		},
		{
			path: '/MusicFuse',
			name: 'MusicFuse',
			component: MusicFuse
		},
		{
			path: '/MyMusic',
			name: 'MyMusic',
			component: MyMusic
		},
		{
			path: '/Login',
			name: 'LOGIN',
			component: Login
		},
		{
			path: '/Register',
			name: 'REGISTER',
			component: Register
		}
	]
})

//routes: [{
//		path: '/',
//		component: PageTransition,
//		children: [{
//				path: '',
//				name: 'StartCreate',
//				component: StartCreate
//			},
//			{
//				path: '/CreatePage',
//				name: 'CreatePage',
//				component: CreatePage
//			}
//		]
//	}]