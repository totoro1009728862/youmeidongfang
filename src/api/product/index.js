const api = 'ymkj/webService'
export default $axios => ({
    userLogin: params => {
        return $axios.$post(`${api}/customer/biz/user/userLogin`, params)
    },
    deviceSetList: params => {
        return $axios.$post(`${api}/customer/biz/device/deviceSetList`, params)
    },
    wechatSubmitPay: params => {
        return $axios.$post(`${api}/customer/biz/pay/wechatSubmitPay`, params)
    },
    alipaySubmitPay: params => {
        return $axios.$post(`${api}/customer/biz/pay/alipaySubmitPay`, params)
    }
})
