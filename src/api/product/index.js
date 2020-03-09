const api = 'ymkj/webService/customer/biz'
export default $axios => ({
    userLogin: params => {
        return $axios.$post(`${api}/user/userLogin`, params)
    },
    deviceSetList: params => {
        return $axios.$post(`${api}/device/deviceSetList`, params)
    },
    wechatSubmitPay: params => {
        return $axios.$post(`${api}/pay/wechatSubmitPay`, params)
    },
    alipaySubmitPay: params => {
        return $axios.$post(`${api}/pay/alipaySubmitPay`, params)
    },
    myUserNum: params => {
        return $axios.$post(`${api}/user/myUserNum`, params)
    },
    startDevice: params => {
        return $axios.$post(`${api}/device/startDevice`, params)
    },
    // 代付二维码
    userPayQr: params => {
        return $axios.$post(`${api}/user/userPayQr`, params)
    },
    // 查询用户头像
    selectCustomerInfo: params => {
        return $axios.$post(`${api}/user/selectCustomerInfo`, params)
    },
    wechatHelpSubmitPay: params => {
        return $axios.$post(`${api}/pay/wechatHelpSubmitPay`, params)
    },
    alipayHelpSubmitPay: params => {
        return $axios.$post(`${api}/pay/alipayHelpSubmitPay`, params)
    }
})
