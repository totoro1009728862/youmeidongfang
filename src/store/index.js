import member from './member'
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
    async nuxtServerInit({ commit, dispatch, rootState }) {
        const routeName = this.app.context.route.name
        const domain = process.env.domain || '.zdserver.com'
        if (routeName && !/^login/.test(routeName.toLowerCase())) {
            if (routeName && routeName.length && routeName.toLowerCase().indexOf('login') == -1) {
                const userToken = this.$cookies.get('userToken')
                // console.log(userToken, '获取到cookie')
                // console.log(this.$cookies.getAll(), '获取所有cookie')
                if (rootState.member.login.userToken != userToken) {
                    commit('member/login/setUserToken', userToken)
                    if (userToken && userToken.length) {
                        await dispatch('member/setUserInfo')
                    } else {
                        commit('member/setUserInfo', null)
                    }
                } else {
                    if (!(rootState.member.userInfo && rootState.member.userInfo.id) && userToken && userToken.length) {
                        await dispatch('member/setUserInfo')
                    }
                }
            } else {
                this.$cookies.remove('userToken', {
                    domain,
                    path: '/'
                })
            }
        }
    },
    setCityCode({ commit }, payload) {
        commit('setCityCode', payload)
    },
    setWxConfig({ commit }, payload) {
        commit('setWxConfig', payload)
    },
    set_Rules({ commit }, payload) {
        commit('set_Rules', payload)
    }
}
