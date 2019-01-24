<template>
  <transition name="fade" mode="out-in">
    <div>
        <router-link
          v-if="logado"
          class="add"
          tag="button"
          to="/mamatas/new">
          + mamata
        </router-link>

        <v-mamata-item
          v-for="mamata in mamatas"
          :mamata="mamata"
          tipo="mamatas"
          :key="'new-mamata-' + mamata.id"
          @mouseover="mouseOver(mamata.id)" />

        <h3>Recordar é viver</h3>

        <v-mamata-item
          v-for="mamata in oldMamatas"
          :mamata="mamata"
          tipo="oldMamatas"
          :key="'old-mamata-' + mamata.id"
          @mouseover="mouseOver(mamata.id)" />
    </div>
  </transition>
</template>

<script>
import VMamataItem from './MamataItem.vue'

export default {
  components: { VMamataItem },
  props: ['mamatas'],
  name: 'v-mamatas',
  computed: {
    logado() {
      return !this.$store.getters.logado ? false : this.$store.getters.logado
    },
    oldMamatas() {
      return !this.$store.getters.dados.oldMamatas ? [] : this.$store.getters.dados.oldMamatas
    }
  },
  mounted() {
    this.$store.dispatch('getMamatas', 'oldMamatas')
  }
}

</script>

<style>
button.add {
  margin-bottom: 10px;
}

form.editing label,
form.editing h4,
form.editing button,
form.editing input {
  margin-top: 10px;
}

span.icon {
  cursor: pointer;
}

.excluir {
  float: right;
}
</style>
