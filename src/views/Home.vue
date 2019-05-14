<template>
	<div class="row pt-3">
		<div class="col-12 pb-3">
			<h1>Lista de Usuários</h1>
		</div>
		<div class="col-12 pb-3">
			<!-- card add new user -->
			<div class="card" v-show="showFormNewUser">
				<div class="card-header">Adicionar um usuário</div>
				<div class="card-body">
					<b-form @submit.prevent="onSubmitNewUser">
						<div class="container-fluid">
							<div class="row">
								<div class="col-12 col-lg-6">
									<b-form-group
										id="first-name-group"
										label="Primeiro Nome:"
										label-for="first-name-model"
									>
										<b-form-input
											id="first-name-model"
											v-model="form.firstName"
											type="text"
											required
											placeholder="Primeiro nome"
										></b-form-input>
									</b-form-group>
								</div>
								<div class="col-12 col-lg-6">
									<b-form-group
										id="last-name-group"
										label="Primeiro Nome:"
										label-for="last-name-model"
									>
										<b-form-input
											id="last-name-model"
											v-model="form.lastName"
											type="text"
											required
											placeholder="Ultimo nome"
										></b-form-input>
									</b-form-group>
								</div>
								<div class="col-12">
									<b-form-group
										id="email-group"
										label="Email:"
										label-for="email-model"
									>
										<b-form-input
											id="email-model"
											v-model="form.email"
											type="email"
											required
											placeholder="E-mail"
										></b-form-input>
									</b-form-group>
									<b-form-group
										class="text-lg-right"
									>
										<b-button type="submit" variant="outline-primary">Adicionar Usuário</b-button>
									</b-form-group>
								</div>
							</div>
						</div>
					</b-form>
				</div>
			</div>

			<!-- card update user -->
			<div class="card" v-show="!showFormNewUser">
				<div class="card-header">Atualizar usuário</div>
				<div class="card-body">
					<b-form @submit.prevent="saveUpdateUser">
						<div class="container-fluid">
							<div class="row">
								<input type="hidden" v-model="update.id">
								<input type="hidden" v-model="update.idx">
								<div class="col-12 col-lg-6">
									<b-form-group
										id="first-name-group-update"
										label="Primeiro Nome:"
										label-for="first-name-model"
									>
										<b-form-input
											id="first-name-model-update"
											v-model="update.firstName"
											type="text"
											required
											placeholder="Primeiro nome"
										></b-form-input>
									</b-form-group>
								</div>
								<div class="col-12 col-lg-6">
									<b-form-group
										id="last-name-group-update"
										label="Primeiro Nome:"
										label-for="last-name-model"
									>
										<b-form-input
											id="last-name-model-update"
											v-model="update.lastName"
											type="text"
											required
											placeholder="Ultimo nome"
										></b-form-input>
									</b-form-group>
								</div>
								<div class="col-12">
									<b-form-group
										id="email-group-update"
										label="Email:"
										label-for="email-model"
									>
										<b-form-input
											id="email-model-update"
											v-model="update.email"
											type="email"
											required
											placeholder="E-mail"
										></b-form-input>
									</b-form-group>
									<b-form-group
										class="text-lg-right"
									>
										<b-button type="button" variant="outline-dark" @click="resetUpdateUser" class="mr-3">Cancelar</b-button>
										<b-button type="submit" variant="outline-primary">Atualizar Usuário</b-button>
									</b-form-group>
								</div>
							</div>
						</div>
					</b-form>
				</div>
			</div>
		</div>
		<div class="w-100 mt-5"></div>
		<div class="col-12 col-md-8 col-lg-4">
			<div class="form-group">
				<label>Buscar por: </label>
				<input type="text" class="form-control" v-model="search">
			</div>
		</div>
		<div class="w-100"></div>
		<div class="col-12">
			<!-- Lista de usuarios -->
			<table class="table table-hover table-bordered">
				<thead>
				<tr>
					<th>Primeiro Nome</th>
					<th>Ultimo Nome</th>
					<th>E-mail</th>
					<th class="text-right">Ações</th>
				</tr>
				</thead>
				<tbody>
				<tr v-if="users.length === 0">
					<td colspan="4" class="text-center">
						Nenhum registro encontrado.
					</td>
				</tr>
				<tr v-else v-for="user in users" :key="user.id">
					<td>{{user.first_name}}</td>
					<td>{{user.last_name}}</td>
					<td>{{user.email}}</td>
					<td class="text-right">
						<button class="btn btn-sm btn-outline-info mr-3" @click="updateUser(user.id)">Editar</button>
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
				form: {
					firstName: '',
					lastName: '',
					email: '',
				},
				update: {
					id: '',
					idx: '',
					firstName: '',
					lastName: '',
					email: '',
				},
				search: '',
				showFormNewUser: true
			}
		},
		computed: {
			users() {
				var userList = this.$store.state.users;
				var filterKey = this.search && this.search.toLowerCase()

				if(filterKey.length > 2) {
					var filter = userList.filter(user => {
						return user.first_name.toLowerCase().indexOf(filterKey) > -1 ||
							user.last_name.toLowerCase().indexOf(filterKey) > -1 ||
							user.email.toLowerCase().indexOf(filterKey) > -1
					})

					return filter
				} else {
					return userList
				}
			}
		},
		mounted() {
			this.fetchUsers();
		},
		methods: {
			fetchUsers() {
				axios.get('https://reqres.in/api/users')
					.then(response => {
						this.$store.commit('setUsers', response.data.data)
						// this.users = response.data.data
					})
					.catch(() => {
						this.$toast.error('Ocorreu um erro!', 'Erro!');
					})
			},
			deleteUser(id) {
				axios.delete('https://reqres.in/api/users/' + id)
					.then(() => {
						var idx = this.users.find((value, i) => {
							if (value['id'] === id) return i
						});

						this.$toast.warning('Usuário removido com sucesso!', 'Removido!');
						this.users.splice(idx, 1);
					})
					.catch(() => {
						this.$toast.error('Ocorreu um erro!', 'Erro!');
					})
			},
			onSubmitNewUser() {
				var that = this;
				if(this.form.firstName === '' && this.form.lastName === '' && this.form.email === '') {
					this.$toast.error('Todos os campos são obrigatórios!', 'Obigatório!');
					return false
				}

				axios.post('https://reqres.in/api/users')
					.then(response => {

						var newUser = {
							id: response.data.id,
							first_name: that.form.firstName,
							last_name: that.form.lastName,
							email: that.form.email,
						}

						this.$store.commit('pushUsers', newUser)
						this.$toast.success('Usuário cadastrado com sucesso!', 'Sucesso!');
						this.resetFormAdd()
					})
					.catch(() => {
						return this.$toast.error('Desculpe! Ocorreu um erro.', 'Ops!');
					})
			},
			updateUser(id){
				let index = null;

				this.users.map(function(user, i){
					if(user.id == id) index = i
				})

				this.update = {
					id: this.users[index].id,
					idx: index,
					firstName: this.users[index].first_name,
					lastName: this.users[index].last_name,
					email: this.users[index].email,
				}

				this.$toast.info('Registro aguardando alterações!', 'Aguardando!');
				this.showFormNewUser = !this.showFormNewUser;
			},
			saveUpdateUser() {
				let id = this.update.id;
				let i = this.update.idx;

				axios.put('https://reqres.in/api/users/' + id, {
					first_name: this.update.firstName,
					last_name: this.update.lastName,
					email_name: this.update.email,
				})
					.then(() => {
						this.users[i].first_name = this.update.firstName;
						this.users[i].last_name = this.update.lastName;
						this.users[i].email = this.update.email;

						this.resetUpdateUser();

						this.$toast.success('Registro editado com sucesso!', 'sucesso!');
					})
			},
			resetFormAdd(){
				this.form = {
					firstName: '',
					lastName: '',
					email: '',
				}
			},
			resetUpdateUser() {
				this.showFormNewUser = !this.showFormNewUser;

				Object.keys(this.update).map(key => {
					this.update[key]= '';
				})
			}
		}
	}
</script>
