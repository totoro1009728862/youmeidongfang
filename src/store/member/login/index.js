// import api from '../../api'
import Promise from 'es6-promise'
const state = () => ({
    userToken: null
})

const getters = {
    userToken: state => state.userToken
}

const mutations = {
    setUserToken: (state, payload) => {
        state.userToken = payload
    }
}

const modules = {}

const actions = {
    mLogin({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$api.member.login
                .mLogin(payload)
                .then(res => {
                    if (res.code == 200) {
                        commit('setUserToken', res.data.userToken)
                        resolve(res.data)
                    } else {
                        reject(res)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    mSmsLogin({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$api.member.login
                .mSmsLogin(payload)
                .then(res => {
                    if (res.code == 200) {
                        commit('setUserToken', res.data.userToken)
                        resolve(res.data)
                    } else {
                        reject(res)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}

export default {
    state,
    getters,
    mutations,
    modules,
    actions
}
