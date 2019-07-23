import Login from './components/Login/index.js'
import App from './App.js'

const routes = [
	{
		path: '/',
		component: App,
	},
	{
		path: '/login',
		component: Login,
	}
]

export default routes;