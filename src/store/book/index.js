const state = () => ({
    rules: {}
})

const getters = {
    rules: state => state.rules
}

const mutations = {
    set_Rules(state, payload) {
        state.rules = payload
    }
}

const actions = {
    set_Rules({ commit }, payload) {
        commit('set_Rules', payload)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
