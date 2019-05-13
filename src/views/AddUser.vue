<template>
	<div class="row">
		<div class="col-12 pb-3">
			<h1>Adicionar Usuário</h1>
		</div>
		<div class="col-12 pb-3">
			<router-link to="/" class="btn btn-outline-dark">Voltar</router-link>
		</div>
		<div class="col-12">
			<b-form @submit="onSubmit" @reset="onReset" v-if="show">
				<b-form-group id="input-group-name" label="Your Name:" label-for="name">
					<b-form-input
						id="name"
						v-model="form.name"
						required
						placeholder="Enter name"
					></b-form-input>
				</b-form-group>

				<b-form-group id="input-group-job" label="Job:" label-for="job">
					<b-form-input
						id="job"
						v-model="form.job"
						required
						placeholder="Enter Job"
					></b-form-input>
				</b-form-group>

				<b-button type="submit" variant="primary" class="mr-3">Submit</b-button>
				<b-button type="reset" variant="danger">Reset</b-button>
			</b-form>
		</div>
		<div class="col-12 mt-5">
			<h3 class="mb-3">Usuários recentimente adicionados</h3>

			<table class="table table-bordered table-hover">
				<thead>
				<tr>
					<th>ID</th>
					<th>Usuario</th>
					<th>Função</th>
					<th>Ações</th>
				</tr>
				</thead>
				<tbody>
				<tr v-show="usersCreated.length == 0">
					<td colspan="4" class="text-center">
						Nunhum usuário adicionado até o momento!
					</td>
				</tr>
				<tr v-for="user in usersCreated" :key="user.id">
					<td>{{ user.id }}</td>
					<td>{{ user.name }}</td>
					<td>{{ user.job }}</td>
					<td>
						<button type="button" class="btn btn-outline-primary mr-3" @click="updateUser(user.id)">Editar</button>
						<button type="button" class="btn btn-outline-danger" @click="deleteUser(user.id)">Remover</button>
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
		name: 'add-user',
		data() {
			return {
				form: {
					name: '',
					job: '',
				},
				show: true,
				usersCreated: []
			}
		},
		methods: {
			onSubmit(evt) {
				evt.preventDefault()

				if (this.form.name == '' && this.form.job == '') {
					this.$toast.error('Todos os campos devem ser preenchidos!', 'Obigatório!');

					return false
				}

				axios.post('https://reqres.in/api/users', {
					name: this.form.name,
					job: this.form.job
				})
					.then(response => {
						console.log(response);
						this.usersCreated.push(response.data);
						this.$toast.success('Usuário adicionado com sucesso!', 'Sucesso!');
						this.resetForm();
					})
					.catch(e => {
						console.log(e);
						alert("error");
					})
			},
			onReset(evt) {
				evt.preventDefault()
				// Reset our form values
				this.form.job = ''
				this.form.name = ''
				// Trick to reset/clear native browser form validation state
				this.show = false
				this.$nextTick(() => {
					this.show = true
				})
			},
			resetForm() {
				this.form.job = ''
				this.form.name = ''
			},
			updateUser(userId) {
				var idx = this.usersCreated.find(function (value, index) {
					if(value.id == userId) return index
				});
			},
			updateUserSave() {

			},
			deleteUser(userId) {
				var idx = this.usersCreated.find(function (value, index) {
					if(value.id == userId) return index
				});

				axios.delete('https://reqres.in/api/users/' + userId)
					.then(response => {
						console.log(response);
						this.$toast.warning('Usuário removido com sucesso!', 'Removido!');
						this.usersCreated.splice(idx, 1);
					})
					.catch(e => {
						console.log(e);
						alert("error");
					})
			},

		}
	}
</script>
