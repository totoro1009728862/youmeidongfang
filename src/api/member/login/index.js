export default $axios => ({
    userLogin: params => {
        return $axios.$post('ymkj/webService/business/biz/user/userLogin', params)
    }
})
