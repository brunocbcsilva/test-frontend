<template>
	<div class="row">
		<div class="col-12 pb-3">
			<h1>Lista de Usuários</h1>
		</div>
		<div class="col-12 pb-3">
			<router-link to="/adduser" class="btn btn-outline-dark">Adicionar Usuário</router-link>
		</div>
		<div class="col-12">
			<b-table striped hover :items="users"></b-table>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'

	export default {
		name: 'home',
		data() {
			return {
				users: [],
			}
		},
		mounted() {
			this.fetchUsers();
		},
		methods: {
			fetchUsers() {
				axios.get('https://reqres.in/api/users')
					.then(response => {
						this.users = response.data.data
					})
					.catch(e => {
						console.log(e);
					})
			}
		}
	}
</script>
