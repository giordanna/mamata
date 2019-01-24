<template>
    <form class="editing">

        <h3>
            Editar
            <span
            @click="$emit('desativouEdicao')"
            class="icon fa-times-circle"></span>
        </h3>

        <label class="requerido">Data</label>
        <input type="date" v-model="dataCrua">

        <label class="requerido">Título</label>
        <input type="text" v-model="mamataForm.titulo">

        <label>HTML extra para o título</label>
        <textarea v-model="mamataForm.extraHTML"></textarea>

        <h4>Atualizações</h4>
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
        <button
            @click.prevent="mamataForm.atualizacoes.push({ data: '', link: { url: '', nome: '' } })">
            + Atualização
        </button>

        <h4>Links</h4>
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

        <button
            @click.prevent="mamataForm.links.push({ url: '', nome: '' })">
            + Link
        </button>
        <br>
        <center>
            <button @click.prevent="atualizar" :disabled="valido">Salvar alterações</button>
            <button @click.prevent="$emit('desativouEdicao')">Cancelar</button>
            </center>
        <hr>

    </form>
</template>

<script>
export default {
    name: 'v-editar-mamata',
    props: ['mamata', 'tipo'],
    data() {
        return {
            dataCrua: '',
            mamataForm: {
                data: "",
                titulo: "",
                extraHTML: null,
                atualizacoes: [],
                links: []
            }
        }
    },
    computed: {
        valido() {
            return this.dataCrua === '' || this.mamataForm.titulo === ''
        }
    },
    created() {
        this.mamataForm = JSON.parse(JSON.stringify(this.mamata))
        this.dataCrua = this.mamataForm.data.split('/').reverse().join('-')
    },
    methods: {
        atualizar() {
            this.mamataForm.data = this.dataCrua.split('-').reverse().join('/')
            this.$store.dispatch('updateMamata', { mamata: this.mamataForm, tipo: this.tipo })
            this.$emit('desativouEdicao')
        }
    }
}
</script>