export default async ({ app, route }) => {
    const { $cookies, store } = app
    if (route.name && !/^login/.test(route.name.toLowerCase())) {
        const cookieUserToken = $cookies.get('userToken')
        const storeUserToken = store.getters['member/login/userToken']
        const userInfo = store.getters['member/userInfo']
        if (cookieUserToken != storeUserToken) {
            store.commit('member/login/setUserToken', cookieUserToken)
            if (cookieUserToken && cookieUserToken.length) {
                await store.dispatch('member/setUserInfo')
            } else {
                store.commit('member/setUserInfo', null)
            }
        } else if (!(userInfo && userInfo.id) && cookieUserToken && cookieUserToken.length) {
            await store.dispatch('member/setUserInfo')
        }
    }
}
