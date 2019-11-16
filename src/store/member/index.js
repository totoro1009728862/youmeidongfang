import login from './login'
import order from './order'

const state = () => ({
    userInfo: null
})

const getters = {
    userInfo: state => state.userInfo
}

const mutations = {
    setUserInfo: (state, payload) => {
        state.userInfo = payload
    }
}

const modules = {
    login,
    order
}

const actions = {
    setUserInfo({ commit }) {
        return new Promise((resolve, reject) => {
            this.$api.member.mine
                .userInfo()
                .then(res => {
                    if (res && res.code == 200) {
                        commit('setUserInfo', res.data)
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
