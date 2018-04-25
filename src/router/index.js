import Vue from 'vue'
import Router from 'vue-router'
import PageTransition from '@/pages/PageTransition'
import HelloWorld from '@/components/HelloWorld'
import StartCreate from '@/pages/StartCreate'
import CreatePage from '@/pages/CreatePage'
import Studying from '@/pages/Studying'
import MusicFuse from '@/pages/MusicFuse'

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