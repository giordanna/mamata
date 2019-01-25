<template>
    <header id="header">
    <div class="logo">
        <span class="icon fa-hand-pointer-o"></span>
    </div>
    <div class="content">
        <transition name="inner" appear>
            <div class="inner">
                <h1>
                    <router-link to="/mamatas" tag="a">
                        O governo federal está há <span style="color: gold">{{ contador }}</span> dia{{ contador == 1 ? "" : "s" }} sem novas mamatas.
                    </router-link>
                </h1>
                <h3>
                    O recorde {{ recorde > contador ? "é" : "anterior era" }} de {{ recorde }}.
                    <br>
                    A contagem está em {{ total }}.
                </h3>

                <br>

                <h4>
                    Redes sociais são um câncer.
                    <br>
                    Mas, hey, nos divulgue:
                </h4>
                <ul class="icons">
                    <li><a href="https://twitter.com/share?url=http://www.acabouamamata.com.br&text=Quantos&#32;bolsonaros&#32;s&atilde;o&#32;necess&aacute;rios&#32;para&#32;sujar&#32;uma&#32;democracia?" class="icon fa-twitter"><span class="label">Twitter</span></a></li>
                    <li><a href="https://www.facebook.com/sharer/sharer.php?u=www.acabouamamata.com.br" class="icon fa-facebook"><span class="label">Facebook</span></a></li>
                    <li><a href="https://telegram.me/share/url?url=http://www.acabouamamata.com.br&text=Quantos&#32;bolsonaros&#32;s&atilde;o&#32;necess&aacute;rios&#32;para&#32;sujar&#32;uma&#32;democracia?" class="icon fa-telegram"><span class="label">Telegram</span></a></li>
                    <li><a href="whatsapp://send?text=Quantos&#32;bolsonaros&#32;s&atilde;o&#32;necess&aacute;rios&#32;para&#32;sujar&#32;uma&#32;democracia?&#32;www.acabouamamata.com.br" data-action="share/whatsapp/share" class="icon fa-whatsapp"><span class="label">Whatsapp</span></a></li>
                </ul>					

            </div>
        </transition>
    </div>
    <nav class="use-middle">
        <ul>
            <li><router-link :to="{name: 'mamatas'}" tag="a">Mamatas</router-link></li>
            <li><router-link :to="{name: 'definicao'}" tag="a">Definição</router-link></li>
            <li class="is-middle"><router-link :to="{name: 'formacao'}" tag="a">Formação</router-link></li>
            <li><router-link :to="{name: 'sobre'}" tag="a">Sobre</router-link></li>
        </ul>
    </nav>

    <p>
        Contato através do <a href="https://mobile.twitter.com/tuttigachimuchi" target="_blank" rel="noopener noreferrer">@tuttigachimuchi no Twitter</a>.
    </p>
    </header>
</template>

<script>
export default {
    props: ['mamatas'],
    name: 'v-header',
    computed: {
        total() {
            return this.mamatas.length + this.$store.getters.oldMamatas.length
        },
        contador() {
            if (this.mamatas.length > 0) {

                let hojeDate = new Date()
                let data = this.mamatas[0].data
                    .split("/")
                    .reverse()
                    .map(val => parseInt(val))
                let ultimaDate = new Date(data[0], data[1] - 1, data[2])
                return Math.floor((hojeDate - ultimaDate) / 8.64e7)
            } else {
                return 0
            }
        },
        recorde() {
            if (this.mamatas.length > 0) {
                let distanciaEntreDatas = []

                let data1,
                    data2

                for (let i = 0 ; i < this.mamatas.length - 1; i++) {
                    data1 = this.mamatas[i].data
                        .split("/")
                        .reverse()
                        .map(val => parseInt(val))

                    data2 = this.mamatas[i + 1].data
                        .split("/")
                        .reverse()
                        .map(val => parseInt(val))

                    const valor = Math.round(
                            (new Date(data1[0], data1[1] - 1, data1[2])
                            - new Date(data2[0], data2[1] - 1, data2[2]))
                            / 8.64e7) - 1

                    distanciaEntreDatas.push(valor < 0 ? 0 : valor)
                }

                distanciaEntreDatas.sort((a, b) => b - a)

                return distanciaEntreDatas[0]
            } else {
                return 0
            }
        }
    }
}
</script>