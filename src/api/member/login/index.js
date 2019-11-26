const api = 'ymkj/webService'
export default $axios => ({
    userLogin: params => {
        return $axios.$post(`${api}/business/biz/user/userLogin`, params)
    },
    registerUser: params => {
        return $axios.$post(`${api}/business/biz/user/registerUser`, params)
    },
    authPhone: params => {
        return $axios.$post(`${api}/common/authPhone`, params)
    },
    updatePassword: params => {
        return $axios.$post(`${api}/business/biz/user/updatePassword`, params)
    }
})
