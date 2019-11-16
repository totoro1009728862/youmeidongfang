export default $axios => ({
    //city页面，获取城市列表
    cityList: params => {
        return $axios.$get(`/admin/common/home/getHotCity?type=${params}`)
    },
    //查询车位置
    getBusLocation: params => {
        return $axios.$get(`/order/common/scenicBusOrder/getBusLocation?vehicleNumber=${params}`)
    },
    //查询车轨迹
    getBusTrajectory: params => {
        return $axios.$get(`/order/common/scenicBusOrder/getBusTrajectory?vehicleNumber=${params}`)
    },
    //判断用户是否有手机号
    ifHavePhone: () => {
        return $axios.$get(`/user/customer/user/ifHavePhone`)
    },
    //申请消息通知提交接口
    templateMsgApply: params => {
        return $axios.$post(`/user/customer/user/templateMsgApply`, params)
    },
    //申请消息通知绑定手机获取短信验证码
    templateMsgGetSmsCode: params => {
        return $axios.$post(`/user/customer/user/templateMsgGetSmsCode`, params)
    }
})
