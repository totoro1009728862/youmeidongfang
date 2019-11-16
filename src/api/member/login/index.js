export default $axios => ({
    mLogin: params => {
        return $axios.$post('/user/common/login/mLogin', params)
    },
    mSmsLogin: params => {
        return $axios.$post('/user/common/login/mSmsLogin', params)
    },
    ifOpenCaptcha: params => {
        return $axios.$get('/user/common/login/ifOpenCaptcha', params)
    },
    mLoginGetSmsCode: params => {
        return $axios.$post('/user/common/login/mLoginGetSmsCode', params)
    },
    getSmsCode: params => {
        return $axios.$post('/user/common/register/m/getSmsCode', params)
    },
    nextRegister: params => {
        return $axios.$post('/user/common/register/nextRegister', params)
    },
    customerRegister: params => {
        return $axios.$post('/user/common/register/customerRegister', params)
    },
    //获取忘记密码手机验证吗
    getPwdPhoneCode: params => {
        return $axios.$post('/user/common/password/getSmsCode', params)
    },
    //忘记密码校验手机号码和短信验证吗 重置密码
    checkPwdSmsCode: params => {
        return $axios.$post('/user/common/password/checkSmsCode', params)
    },
    //忘记密码 重置密码
    resetPwd: params => {
        return $axios.$post(`/user/common/password/resetPassword`, params)
    },
    // 发送验证码
    quickOrderGetSmsCode: params => {
        return $axios.$post(`/user/customer/user/quickOrderGetSmsCode`, params)
    }
})
