const api = 'ymkj/webService'
export default $axios => ({
    userLogin: params => {
        return $axios.$post(`${api}/customer/biz/user/userLogin`, params)
    },
    updatePassword: params => {
        return $axios.$post(`${api}/business/biz/user/updatePassword`, params)
    }
})
