import member from './member'
import product from './product'
export const state = () => ({
    //originUrl: null,
    userInfo: {},
    wxConfig: null,
    // book2参数
    remark: {
        remarkSwitch: false,
        remarkInfo: ''
    }
})

export const getters = {
    //originUrl: state => state.originUrl,
    userInfo: state => state.userInfo,
    wxConfig: state => state.wxConfig,
    rules: state => state.rules
}

export const mutations = {
    // setOriginUrl: (state, payload) => {
    //     state.originUrl = payload
    // },
    set_userInfo: (state, payload) => {
        state.userInfo = payload
    },
    setWxConfig: (state, payload) => {
        state.wxConfig = payload
    },
    set_Rules(state, payload) {
        state.rules = payload
    }
}

export const modules = {
    member,
    product
}

export const actions = {
    set_userInfo({ commit }, payload) {
        commit('set_userInfo', payload)
    },
    set_Rules({ commit }, payload) {
        commit('set_Rules', payload)
    }
}
