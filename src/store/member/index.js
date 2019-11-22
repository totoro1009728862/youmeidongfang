const state = () => ({
    hotSearchList: [],
    onStation: [],
    offStation: [],
    approveImg: []
})

const getters = {
    hotSearchList: state => state.hotSearchList,
    onStation: state => state.onStation,
    offStation: state => state.offStation,
    approveImg: state => state.approveImg
}

const mutations = {
    setHotSearchList(state, payload) {
        state.hotSearchList = payload
    },
    setOnStation(state, payload) {
        state.onStation = payload
    },
    setOffStation(state, payload) {
        state.offStation = payload
    },
    setApproveImg(state, payload) {
        state.approveImg = payload
    }
}

const actions = {
    setHotSearchList({ commit }, payload) {
        commit('setHotSearchList', payload)
    },
    setOnStation({ commit }, payload) {
        commit('setOnStation', payload)
    },
    setOffStation({ commit }, payload) {
        commit('setOffStation', payload)
    },
    setApproveImg({ commit }, payload) {
        commit('setApproveImg', payload)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
