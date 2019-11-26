const api = 'ymkj/webService'
export default $axios => ({
    myPerformance: params => {
        return $axios.$post(`${api}/business/biz/account/myPerformance`, params)
    },
    myPerformanceList: params => {
        return $axios.$post(`${api}/business/biz/account/myPerformanceList`, params)
    },
    myDeviceNum: params => {
        return $axios.$post(`${api}/business/biz/device/myDeviceNum`, params)
    },
    myDeviceList: params => {
        return $axios.$post(`${api}/business/biz/device/myDeviceList`, params)
    },
    myTeamGroup: params => {
        return $axios.$post(`${api}/business/biz/device/myTeamGroup`, params)
    },
    myTeamGroupList: params => {
        return $axios.$post(`${api}/business/biz/device/myTeamGroupList`, params)
    },
    myPayPassword: params => {
        return $axios.$post(`${api}/business/biz/account/myPayPassword`, params)
    },
    addbank: params => {
        return $axios.$post(`${api}/business/biz/account/addbank`, params)
    },
    bankList: params => {
        return $axios.$post(`${api}/business/biz/account/bankList`, params)
    },
    submitPrice: params => {
        return $axios.$post(`${api}/business/biz/account/submitPrice`, params)
    },
    deviceSetList: params => {
        return $axios.$post(`${api}/business/biz/device/deviceSetList`, params)
    },
    updateDeviceSet: params => {
        return $axios.$post(`${api}/business/biz/device/updateDeviceSet`, params)
    }
})
