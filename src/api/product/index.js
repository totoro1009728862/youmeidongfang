const api = 'ymkj/webService'
export default $axios => ({
    userLogin: params => {
        return $axios.$post(`${api}/customer/biz/user/userLogin`, params)
    },
    deviceSetList: params => {
        return $axios.$post(`${api}/customer/biz/device/deviceSetList`, params)
    }
})
