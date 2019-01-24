<template>
    <div v-if="mamata">
        <transition name="fade" mode="out-in">
            <div @mouseover="mouseSobre = true">
                <transition name="fade" mode="out-in">
                    <v-mamata-detalhe
                        v-if="!ativarEdicao"
                        :mamata="mamata"
                        :tipo="tipo"
                        v-on:ativouEdicao="ativarEdicao = true" />
                    <v-editar-mamata
                        v-else
                        :mamata="mamata"
                        :tipo="tipo"
                        v-on:desativouEdicao="ativarEdicao = false" />
                </transition>
            </div>
        </transition>
    </div>
</template>

<script>
import VMamataDetalhe from './MamataDetalhe.vue'
import VEditarMamata from './EditarMamata.vue'

export default {
    components: { VMamataDetalhe, VEditarMamata },
    props: ['mamata', 'tipo'],
    data() {
        return {
            mouseSobre: false,
            ativarEdicao: false
        }
    }
}
</script>
