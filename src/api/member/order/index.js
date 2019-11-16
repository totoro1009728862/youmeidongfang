export default $axios => ({
    getGroupTourOrderInfo: params => {
        return $axios.$get(`/order/customer/groupTourOrder/getGroupTourOrderInfo?id=${params}`)
    },
    getScenicBusOrderInfo: params => {
        return $axios.$get(`/order/customer/scenicBusOrder/getScenicBusOrderInfo?id=${params}`)
    },
    getScenicTicketOrderInfo: params => {
        return $axios.$get(`/order/customer/scenicTicketOrder/getScenicTicketOrderInfo?id=${params}`)
    },
    orderUpdateRewardList: params => {
        return $axios.$post(`/order/customer/orderUpdateReward/list`, params)
    },
    // 退票相关
    refundTicketOrder: ({ params, productType }) => {
        let url
        if (productType == 1 || productType == 10) {
            url = 'scenicBusOrder'
        } else if (productType == 41) {
            return $axios.$post(`/order/customer/scenicTicketOrder/refundTicketOrder`, params)
        } else {
            url = 'groupTourOrder'
        }
        return $axios.$post(`/order/customer/${url}/refundOrder`, params)
    },
    // 取消订单
    cancelOrder: ({ params, productType }) => {
        let url
        if (productType == 1 || productType == 10) {
            url = 'scenicBusOrder'
        } else if (productType == 41) {
            url = 'scenicTicketOrder'
        } else {
            url = 'groupTourOrder'
        }
        return $axios.$post(`/order/customer/${url}/cancelOrder`, params)
    },
    getCustomerTicketRefundMoney: params => {
        return $axios.$get(`/order/customer/scenicTicketOrder/getCustomerRefundMoney?orderNo=${params}`)
    },
    getCustomerGroupTourRefundMoney: params => {
        return $axios.$get(`/order/customer/groupTourOrder/getCustomerRefundMoney?orderNo=${params}`)
    },
    getCustomerRefundMoney: ({ productType, orderNo }) => {
        let url
        if (productType == 1 || productType == 10) {
            url = 'scenicBusOrder'
        } else if (productType == 41) {
            url = 'scenicTicketOrder'
        } else {
            url = 'groupTourOrder'
        }
        return $axios.$get(`/order/customer/${url}/getCustomerRefundMoney?orderNo=${orderNo}`)
    },

    // 获取订单列表
    selectScenicBusOrderList: params => {
        return $axios.$post(`/order/customer/order/list`, params)
    },

    // 获取退款详情
    getCustomerRefundDetail: ({ productType, orderNo }) => {
        let url = productType == 1 || productType == 10 ? 'scenicBusOrder' : productType == 41 ? 'scenicTicketOrder' : 'groupTourOrder'
        return $axios.$get(`/order/customer/${url}/getCustomerRefundDetail?orderNo=${orderNo}`)
    },

    // 获取电子票信息
    getTicketInfo: params => {
        return $axios.$get(`/order/common/scenicBusOrder/smsQuery?content=${params}`)
    }
})
