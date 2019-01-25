import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

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
        checkUser({commit}) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    firebase.auth().currentUser.getIdToken()
                        .then((token) => {
                            commit('authUser', {
                                idToken: token,
                                userId: firebase.auth().currentUser.uid,
                                logado: true
                            })
                        })
                }
            })
        },
        login({commit}, authData) {
            firebase.auth()
                .signInWithEmailAndPassword(authData.email, authData.senha)
                .then(() => {
                    firebase.auth().currentUser.getIdToken()
                        .then((token) => {
                            commit('authUser', {
                                idToken: token,
                                userId: firebase.auth().currentUser.uid
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
                firebase.database().ref().child(tipo).on('value', (snapshot) => {
                    if (tipo === 'mamatas') {
                        commit('updateMamatas', 
                            Object.values(snapshot.val()).reverse()
                        )
                    } else {
                        commit('updateOldMamatas',
                        Object.values(snapshot.val())
                        )
                    }
                    resolve()
                })
            })
        },
        addMamata({dispatch}, dados) {
            let key = firebase.database().ref(dados.tipo).push().key
            dados.mamata.id = key
            firebase.database().ref(dados.tipo + '/' + key).set(dados.mamata, (erro) => {
                if (erro) {
                    console.error(erro)
                } else {
                    dispatch('getMamatas', dados.tipo)
                }
            })
        },
        updateMamata({dispatch}, dados) {
            firebase.database().ref(dados.tipo + '/' + dados.mamata.id)
                .set(dados.mamata, (erro) => {
                    if (erro) {
                        console.error(erro)
                    } else {
                        dispatch('getMamatas', dados.tipo)
                    }
                }
            )
        },
        deleteMamata({dispatch}, dados) {
            firebase.database().ref(dados.tipo + '/' + dados.id)
                .set(null, (erro) => {
                    if (erro) {
                        console.error(erro)
                    } else {
                        dispatch('getMamatas', dados.tipo)
                    }
                }
            )
        },
    },
    getters: {
        logado(state) {
            return state.logado
        },
        mamatas(state) {
            return state.dados.mamatas
        },
        oldMamatas(state) {
            return state.dados.oldMamatas
        }
    }
})