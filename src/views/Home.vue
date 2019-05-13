<template>
	<div class="row">
		<div class="col-12 pb-3">
			<h1>Lista de Usuários</h1>
		</div>
		<div class="col-12 pb-3">
			<router-link to="/adduser" class="btn btn-outline-dark">Adicionar Usuário</router-link>
		</div>
		<div class="col-12">
			<table class="table table-hover table-bordered">
				<thead>
				<tr>
					<th>Primeiro Nome</th>
					<th>Ultimo Nome</th>
					<th>E-mail</th>
					<th>Ações</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="user in users" :key="user.id">
					<td>{{user.first_name}}</td>
					<td>{{user.last_name}}</td>
					<td>{{user.email}}</td>
					<td>
						<button class="btn btn-sm btn-outline-info mr-3">Editar</button>
						<button class="btn btn-sm btn-outline-danger" @click="deleteUser(user.id)">Remover</button>
					</td>
				</tr>
				</tbody>
			</table>
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
			},
			deleteUser(id) {
				axios.delete('https://reqres.in/api/users/' + id)
					.then(response => {
						window.console.log(response);

						var idx = this.users.find((value, i) => {
							if(value[id] === id) return i
						});

						this.$toast.warning('Usuário removido com sucesso!', 'Removido!');
						this.users.splice(idx, 1);
					})
					.catch(() => {
						this.$toast.error('Ocorreu um erro!', 'Erro!');
					})
			},
		}
	}
</script>
