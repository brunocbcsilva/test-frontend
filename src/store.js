import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		users: []
	},
	mutations: {
		setUsers: (state, payload) => {
			state.users = payload
		},
		pushUsers: (state, payload) => {
			window.console.log(payload)
			state.users.push(payload)
		},
	},
	actions: {}
})
