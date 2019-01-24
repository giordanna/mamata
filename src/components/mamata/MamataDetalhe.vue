<template>
    <div>
        <h3>
            {{ mamata.data }}
            <template v-if="logado">
                <span
                title="Editar"
                @click="$emit('ativouEdicao')"
                class="icon fa-edit"></span>
                <span
                title="Excluir"
                @click="confirmarExclusao"
                class="icon fa-times-circle excluir"></span>
            </template>
        </h3>

        <p>
            {{ mamata.titulo }} <span v-if="mamata.extraHTML !== null" v-html="mamata.extraHTML"></span>
        
            <template v-if="mamata.atualizacoes.length !== 0 ">
            <span v-for="atualizacao in mamata.atualizacoes" :key="atualizacao.id">
                <br>
                Atualização de {{ atualizacao.data }}: 
                <a
                :href="atualizacao.link.url"
                target="_blank"
                rel="noopener noreferrer">
                {{ atualizacao.link.nome }}</a>.
            </span>
            </template>
        </p>
        
        <ul>
            <li v-for="link in mamata.links" :key="link.id">
            <a
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer">
                {{ link.nome }}
            </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'v-mamata-detalhe',
    props: ['mamata', 'tipo'],
    computed: {
        logado() {
            return !this.$store.getters.logado ? false : this.$store.getters.logado
        }
    },
    methods: {
        confirmarExclusao() {
            let confirmacao = confirm("Tem certeza que deseja excluir?")
            if (confirmacao) {
                this.$store.dispatch('deleteMamata', { id: this.mamata.id, tipo: this.tipo })
                this.$router.push('/mamatas')
            }
        }
    }
}
</script>