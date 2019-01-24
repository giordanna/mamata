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
            {{ mamata.titulo }} <span v-if="mamata.extraHTML" v-html="mamata.extraHTML"></span>
        
            <template v-if="mamata.atualizacoes">
            <span v-for="(atualizacao, i) in mamata.atualizacoes" :key="'update-' + i">
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
        
        <template v-if="mamata.links">
            <ul>
                <li v-for="(link, i) in mamata.links" :key="'link-' + i">
                <a
                    :href="link.url"
                    target="_blank"
                    rel="noopener noreferrer">
                    {{ link.nome }}
                </a>
                </li>
            </ul>
        </template>
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