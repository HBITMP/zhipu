import Vue from 'vue'
import Router from 'vue-router'
import PageTransition from '@/pages/PageTransition'
import HelloWorld from '@/components/HelloWorld'
import StartCreate from '@/pages/StartCreate'
import CreatePage from '@/pages/CreatePage'

Router.prototype.goback = function() {
	this.isBack = true
	window.history.go(-1)
}

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		component: PageTransition,
		children: [{
				path: '',
				name: 'StartCreate',
				component: StartCreate
			},
			{
				path: '/CreatePage',
				name: 'CreatePage',
				component: CreatePage
			}
		]
	}]
})