<template>
    <transition name="fade" mode="out-in">
        <form class="editing">

            <h3>Adicionar</h3>

            <label class="requerido">Data</label>
            <input required type="date" v-model="dataCrua">
            <label class="requerido">Título</label>
            <input required type="text" v-model="mamataForm.titulo">

            <label>HTML extra para o título</label>
            <textarea v-model="mamataForm.extraHTML"></textarea>

            <h4>Atualizações</h4>
            <template v-if="mamataForm.atualizacoes">
                <div v-for="(atualizacao, i) in mamataForm.atualizacoes" :key="'update-' + i">
                    <label>Atualização {{ i + 1 }} 
                    <span
                        @click="mamataForm.atualizacoes.splice(i, 1)"
                        class="icon fa-times-circle"></span>
                    </label>
                    <label>Data</label>
                    <input type="text" v-model="atualizacao.data">

                    <label>URL</label>
                    <input type="text" v-model="atualizacao.link.url">

                    <label>Texto na URL</label>
                    <input type="text" v-model="atualizacao.link.nome">

                </div>
            </template>
            <button
                @click.prevent="criarAtualizacao">
                + Atualização
            </button>

            <h4>Links</h4>
            <template v-if="mamataForm.links">
                <div v-for="(link, i) in mamataForm.links" :key="'link-' + i">

                    <label>Link {{ i + 1 }}
                    <span
                        @click="mamataForm.links.splice(i, 1)"
                        class="icon fa-times-circle"></span>
                    </label>
                    <label>URL</label>
                    <input type="text" v-model="link.url">

                    <label>Texto na URL</label>
                    <input type="text" v-model="link.nome">
                </div>
            </template>

            <button
                @click.prevent="criarLink">
                + Link
            </button>

            <label>Tipo de mamata:</label>
            <select v-model="tipoMamata">
                <option value="mamatas">Nova</option>
                <option value="oldMamatas">Antiga</option>
            </select>

            <br>
            <center>
                <button @click.prevent="enviar" :disabled="valido">Adicionar mamata</button>
                <router-link tag="button" to="/mamatas">Cancelar</router-link>
            </center>

        </form>
    </transition>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
    data() {
        return {
            dataCrua: '',
            mamataForm: {
                data: '',
                titulo: '',
                extraHTML: null,
                atualizacoes: [],
                links: [
                    { url: '', nome: '' },
                    { url: '', nome: '' },
                    { url: '', nome: '' }
                ]
            },
            tipoMamata: 'mamatas'
        }
    },
    computed: {
        valido() {
            return this.dataCrua === '' || this.mamataForm.titulo === ''
        }
    },
    methods: {
        enviar() {
            this.mamataForm.data = this.dataCrua.split('-').reverse().join('/')
            this.$store.dispatch('addMamata', { mamata: this.mamataForm, tipo: this.tipoMamata })
            this.$router.push('/mamatas')
        },
        criarAtualizacao() {
            if (!this.mamataForm.atualizacoes) {
                this.mamataForm.atualizacoes = []
            }
            this.mamataForm.atualizacoes.push({ data: '', link: { url: '', nome: '' } })
        },
        criarLink() {
            if (!this.mamataForm.links) {
                this.mamataForm.links = []
            }
            this.mamataForm.links.push({ url: '', nome: '' })
        }
    },
    beforeRouteEnter(to, from, next) {
        if (firebase.auth().currentUser) {
            next()
        } else {
            next(false)
        }
    }
}
</script>

<style>
.requerido::after {
    content: '*';
    color: red;
}
</style>
