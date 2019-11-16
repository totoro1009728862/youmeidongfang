export default $axios => ({
    //首页初始化数据
    initHome: params => {
        return $axios.$post('/admin/common/home/initHome', params)
    },
    //分页加载产品
    productList: params => {
        return $axios.$post('/newproduct/common/product/m/list', params)
    },
    //景区直通车产品详情
    getCommonScenicBusDetailDto: params => {
        return $axios.$get(`/newproduct/common/scenicBus2/m/getCommonScenicBusDetailDto?${params}`)
    },
    // 收藏
    addCollection: params => {
        return $axios.$post('/newproduct/customer/userCollection/addUserCollection', params)
    },
    // 取消收藏
    cancelCollection: params => {
        return $axios.$post('/newproduct/customer/userCollection/cancelCollection', params)
    },
    //推荐景点
    listHotScenic: params => {
        return $axios.$get(`/newproduct/common/scenic/listHotScenic?cityCode=${params}`)
    },
    //推荐景点
    listFuzzyProductName: params => {
        return $axios.$post(`/newproduct/common/product/m/listFuzzyProductName`, params)
    },
    //城市
    searchCityList: params => {
        return $axios.$post(`/newproduct/common/product/m/searchCityList`, params)
    },
    // 景点门票景点主题
    searchScenicThemeList: params => {
        return $axios.$post(`/newproduct/common/product/m/searchScenicThemeList`, params)
    },
    // 获取产品列表
    getProductList: params => {
        return $axios.$post(`/newproduct/common/product/m/list`, params)
    },
    // 根据搜索条件查询数据
    searchList: params => {
        return $axios.$post(`/newproduct/common/product/m/searchList`, params)
    },
    // 获取全部产品列表
    searchListAll: params => {
        return $axios.$post(`/newproduct/common/product/m/searchListAll`, params)
    },
    //跟团游产品详情
    getDetailById: params => {
        return $axios.$get(`/newproduct/common/groupTour/getDetailById?${params}`)
    },
    // 跟团游套餐行程信息
    getTourPackDetailById: params => {
        return $axios.$get(`/newproduct/common/tourPack/getDetailById?id=${params}`)
    },
    // 获取跟团游价格日历
    getGroupTourPriceCalendar: params => {
        return $axios.$post(`/newproduct/common/groupTour/getPriceCalendar${params}`)
    },
    // 获取门票信息
    getCommonScenicTicket: params => {
        return $axios.$get(`/newproduct/common/scenic/m/getCommonScenicTicket?${params}`)
    },
    // 门票规则说明
    getByScenicTicketId: params => {
        return $axios.$get(`/newproduct/common/scenicTicketBookRule/getByScenicTicketId?scenicTicketId=${params}`)
    }
})
