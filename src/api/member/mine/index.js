export default $axios => ({
    // 获取用户信息
    userInfo: params => {
        return $axios.$get(`/user/customer/user/getUserData`, params)
    },
    // 修改昵称
    updatedNickName: params => {
        return $axios.$put(`/user/customer/user/updateNickname?nickname=${params}`)
    },
    // 保存用户名
    saveUserName: params => {
        return $axios.$put(`/user/customer/user/saveUserName?userName=${params}`)
    },
    // 上传图片
    uploadBinary: params => {
        return $axios.$post(`/admin/customer/upload/uploadBinary`, params)
    },
    // 修改头像URL
    updateHeadImgUrl: params => {
        return $axios.$put(`/user/customer/user/updateHeadImgUrl?headImgUrl=${params}`)
    },
    // 验证码获取是否要出防水墙
    ifOpenCaptcha: params => {
        return $axios.$get(`/user/common/login/ifOpenCaptcha`, params)
    },

    /* --------- 绑定手机号码 -------------  */
    // 微信浏览器内绑定手机号
    WXBindPhone: params => {
        return $axios.$post(`/user/customer/user/bindPhone`, params)
    },
    // 微信浏览器内绑定手机，获取短信验证码
    bindPhoneGetSmsCode: params => {
        return $axios.$post(`/user/customer/user/bindPhoneGetSmsCode`, params)
    },

    /* --------- 验证手机号码 ------------- */
    // 原手机号码获取短信验证码
    getSmsCodeChecked: params => {
        return $axios.$post(`/user/customer/user/getSmsCodeChecked`, params)
    },
    // 验证原手机号码的验证码
    validateOldPhoneNumber: params => {
        return $axios.$post(`/user/customer/user/validateOldPhoneNumber`, params)
    },
    /* --------- 修改手机号码 -------------  */
    // 新手机号码获取短信验证码
    newPhoneNumberGetSmsCode: params => {
        return $axios.$post(`/user/customer/user/newPhoneNumberGetSmsCode`, params)
    },
    // 验证短信验证码,并设置新手机号码
    modifyPhoneNumber: params => {
        return $axios.$post(`/user/customer/user/modifyPhoneNumber`, params)
    },
    // 退出登录
    outLogin: params => {
        return $axios.$post(`/user/common/login/logout`, params)
    },

    // 修改密码
    updatePassword: params => {
        return $axios.$put(`/user/customer/password/modifyPassword`, params)
    },
    // 保存密码
    setPassword: params => {
        return $axios.$post(`/user/common/wxlogin/setPassword`, params)
    },

    // 常用旅客列表
    selectTravelPersonList: params => {
        return $axios.$post('/user/customer/travelPerson/selectTravelPersonList', params)
    },
    ///user/customer/travelPerson/selectTravelPerson/48
    selectTravelPerson: travelerid => {
        return $axios.$get(`/user/customer/travelPerson/selectTravelPerson/${travelerid}`)
    },
    // 添加或编辑常用旅客
    saveTraveler: params => {
        return $axios.$post(`/user/customer/travelPerson/saveTravelPerson`, params)
    },
    // 删除常用旅客
    deleteTraveler: params => {
        return $axios.$delete(`/user/customer/travelPerson/deleteTravelPerson/${params}`)
    },
    // 获取收藏列表
    selectUserCollectionList: params => {
        return $axios.$post(`/newproduct/customer/userCollection/selectUserCollectionList`, params)
    },
    // 取消收藏
    cancelCollection: params => {
        return $axios.$delete(`/newproduct//customer/userCollection/cancelUserCollection/${params}`)
    },

    // 意见反馈
    saveSuggestion: params => {
        return $axios.$post(`/admin/customer/suggestion/save`, params)
    }
})
