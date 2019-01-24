<template>
  <article id="login" class="active">
    <router-link
      class="close"
      to="/"
      tag="div">
        Close
    </router-link>

    <h2 class="major">Login</h2>

    <form>
      <h3>Email:</h3>
      <input type="email" v-model="usuario.email">
      <br>
      <h3>Senha:</h3>
      <input type="password" v-model="usuario.senha">
      <br>
      <input type="submit" @click.prevent="submit" value="Logar">
    </form>
  </article>
</template>

<script>

export default {
  name: 'v-login',
  data() {
    return {
      usuario: {
        email: '',
        senha: ''
      }
    }
  },
  methods: {
    submit() {
      this.$store.dispatch('login', this.usuario)
      this.$router.push('/')
    }
  }
}
</script>

<style>
</style>
