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
    }
})
