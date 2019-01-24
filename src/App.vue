<template>
  <div>
    <div id="wrapper">
      <button
        @click.prevent="logout"
        v-if="logado"
        class="logout">
          Logout
      </button>

      <div id="main">
        <transition :name="transicao" mode="out-in">
          <router-view
            v-if="pronto"
            v-on-clickaway="cliqueFora"
            :mamatas="mamatas" />
        </transition>
      </div>

    </div>
    <div id="bg"></div>
  </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway'

export default {
  directives: {
    onClickaway
  },
  name: 'app',
  data() {
    return {
      pronto: false,
    }
  },
  computed: {
    transicao() {
      return this.$route.path === '/' ? 'header' : 'article'
    },
    logado() {
      return this.$store.getters.logado
    },
    mamatas() {
      return this.$store.getters.mamatas
    }
  },
  created() {
    this.$store.dispatch('checkUser')
    this.$store.dispatch('getMamatas', 'mamatas').then(() => {
      this.$store.dispatch('getMamatas', 'oldMamatas').then(() => {
        this.pronto = true
      })
    })
  },
  methods: {
    cliqueFora() {
      if (this.$route.path !== '/') {
        this.$router.push({ path: '/' })
      }
    },
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>
.logout {
  position: fixed;
  top: 1em;
  right: 1em;

}

.article-enter-active {
  animation: article-in 0.5s ease;
}
.article-leave-active {
  animation: article-out 0.5s ease;
}
@keyframes article-out {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.95);
    opacity: 0;
  }
  
}
@keyframes article-in {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.header-enter-active {
  animation: header-in 0.5s ease;
}
.header-leave-active {
  animation: header-out 0.5s ease;
}
@keyframes header-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(50px);
    opacity: 0;
  }
}
@keyframes header-in {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.inner-enter-active {
  animation: inner-in 2s ease-in-out;
}
.inner-leave-active {
  animation: inner-out 2s ease-in-out;
}
@keyframes inner-out {
  from {
    max-height: 40rem;
    padding: 3rem 2rem;
  }
  to {
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
    opacity: 0;
  }
}
@keyframes inner-in {
  from {
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
    opacity: 0;
  }
  to {
    max-height: 40rem;
    padding: 3rem 2rem;
  }
}

.fade-enter-active {
  animation: fade-in 0.5s ease;
}
.fade-leave-active {
  animation: fade-out 0.5s ease;
}
@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
  
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

</style>
