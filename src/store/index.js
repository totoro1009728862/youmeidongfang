import member from './member'
import product from './product'
export const state = () => ({
    //originUrl: null,
    cityCode: '',
    wxConfig: null,
    // book2参数
    remark: {
        remarkSwitch: false,
        remarkInfo: ''
    },
    // 退改说明
    rules: {}
})

export const getters = {
    //originUrl: state => state.originUrl,
    cityCode: state => state.cityCode,
    wxConfig: state => state.wxConfig,
    rules: state => state.rules
}

export const mutations = {
    // setOriginUrl: (state, payload) => {
    //     state.originUrl = payload
    // },
    setCityCode: (state, payload) => {
        state.cityCode = payload
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
    setWxConfig({ commit }, payload) {
        commit('setWxConfig', payload)
    },
    set_Rules({ commit }, payload) {
        commit('set_Rules', payload)
    }
}
