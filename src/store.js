import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import axios from './axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        idToken: null,
        userId: null,
        logado: false,
        dados: {
            mamatas: [],
            oldMamatas: []
        }
    },
    mutations: {
        authUser(state, userData) {
            state.idToken = userData.idToken
            state.userId = userData.userId
            state.logado = userData.logado
        },
        updateMamatas(state, mamatas) {
            state.dados.mamatas = mamatas 
        },
        updateOldMamatas(state, oldMamatas) {
            state.dados.oldMamatas = oldMamatas 
        }
    },
    actions: {
        login({commit}, authData) {
            firebase.auth()
                .signInWithEmailAndPassword(authData.email, authData.senha)
                .then(() => {
                    firebase.auth().currentUser.getIdToken()
                        .then((token) => {
                            commit('authUser', {
                                idToken: token,
                                userId: firebase.auth().currentUser.uid,
                                logado: true
                            })
                        })
                }, (erro) => console.log(erro))
        },
        logout({commit}) {
            firebase.auth().signOut()
                .then(() => {
                    commit('authUser', {
                        idToken: null,
                        userId: null,
                        logado: false
                    })
                }, (erro) => console.log(erro))
        },
        getMamatas({commit}, tipo) {
            return new Promise((resolve) => {
                axios.get(tipo)
                    .then((resposta) => {
                        if (tipo === 'mamatas') {
                            commit('updateMamatas', 
                                resposta.data.sort((a, b) => b.id - a.id)
                            )
                        } else {
                            commit('updateOldMamatas', 
                                resposta.data.sort((a, b) => a.id - b.id)
                            )
                        }
                        resolve()
                    })
                    .catch(erro => console.error(erro))
            })
        },
        addMamata({dispatch}, dados) {
            axios.post(dados.tipo, dados.mamata)
                .then(() => {
                    dispatch('getMamatas', dados.tipo)
                })
                .catch(erro => console.error(erro))
        },
        updateMamata({dispatch}, dados) {
            axios.put(dados.tipo + '/' + dados.mamata.id, dados.mamata)
                .then(() => {
                    dispatch('getMamatas', dados.tipo)
                })
                .catch(erro => console.error(erro))
        },
        deleteMamata({dispatch}, dados) {
            axios.delete(dados.tipo + '/' + dados.id)
                .then(() => {
                    dispatch('getMamatas', dados.tipo)
                })
                .catch(erro => console.error(erro))
        },
    },
    getters: {
        logado(state) {
            return state.logado
        },
        dados(state) {
            return state.dados
        }
    }
})