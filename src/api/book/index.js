export default $axios => ({
    //日历
    getPriceCalendar: params => {
        return $axios.$post('/newproduct/customer/scenicBus2/getPriceCalendar', params)
    },

    //套餐信息
    getGetOrderInfo: params => {
        return $axios.$get(`/newproduct/customer/scenicBus2/initGetOrderInfo?${params}`)
    },
    // 预览id转真实ID
    getRealId: params => {
        return $axios.$get(`/newproduct/customer/scenicBus2/getRealId?${params}`)
    },
    //订单上下车站点、班次时间
    getOrderLocaionInfo: params => {
        return $axios.$post(`/newproduct/customer/scenicBus2/initGetOrderLocationInfo`, params)
    },

    //订单价格详细
    getOrderPriceInfo: params => {
        return $axios.$post(`/newproduct/customer/scenicBus2/initGetOrderPriceInfo`, params)
    },

    //下单
    creatScenicBusOrder: params => {
        return $axios.$post(`/order/customer/scenicBusOrder/createScenicBusOrder`, params)
    },
    // 获取库存票数 POST /customer/scenicBus2/initGetSeatNum
    initGetSeatNum: params => {
        return $axios.$post(`/newproduct/customer/scenicBus2/initGetSeatNum`, params)
    },
    getRecentTravelPersonList: () => {
        return $axios.$get(`/user/customer/travelPerson/getRecentTravelPersonList`)
    },
    // 获取绑定手机号
    getPhoneNumber: () => {
        return $axios.$get(`/user/customer/user/getPhoneNumber`)
    },
    // 获取跟团游下单基础信息
    initCreateOrder: params => {
        return $axios.$get(`/newproduct/customer/groupTour/initCreateOrder?${params}`)
    },
    // 获取跟团游价格信息
    getGroupTourPrice: params => {
        return $axios.$post(`/newproduct/customer/groupTour/getPrice`, params)
    },
    // 跟团游下单
    groupTourCreateOrder: params => {
        return $axios.$post(`/order/customer/groupTourOrder/createOrder`, params)
    },
    // 获取openId
    getPayInfo: () => {
        return $axios.$get(`/user/customer/wxlogin/getPayInfo`)
    },
    //景点门票下单页初始化信息接口
    scenicTicketInitCreateOrder: params => {
        return $axios.$get(`/newproduct/customer/scenicTicket/initGetOrderInfo?id=${params}`)
    },
    // 门票获取价格日历list
    scenicTicketPriceCalendar: params => {
        return $axios.$post(`/newproduct/customer/scenicTicket/getPriceCalendar?id=${params}`)
    },
    // 门票获取价格
    scenicTicketGetPrice: params => {
        return $axios.$post(`/newproduct/customer/scenicTicket/getPrice`, params)
    },
    // 门票下单页
    createScenicTicketOrder: params => {
        return $axios.$post(`/order/customer/scenicTicketOrder/createScenicTicketOrder`, params)
    },
    // 下单页发送验证码
    quickOrderGetSmsCode: params => {
        return $axios.$post(`/user/customer/user/quickOrderGetSmsCode`, params)
    }
})
