module.exports = [
    // 我的信息
    {
        path: `/mine`,
        name: 'Mine',
        component: 'pages/member/mine/index.vue'
    },
    // 我的团队
    {
        path: `/mine/teamlist`,
        name: 'TeamList',
        component: 'pages/member/mine/teamList/index.vue'
    },
    // 机器设置
    {
        path: `/mine/machinerylist`,
        name: 'MachineryList',
        component: 'pages/member/mine/machineryList/index.vue'
    },
    // 我的业绩
    {
        path: `/mine/myperformance`,
        name: 'MyPerformance',
        component: 'pages/member/mine/myPerformance/index.vue'
    },
    // 佣金提现
    {
        path: `/mine/getcash`,
        name: 'GetCash',
        component: 'pages/member/mine/getCash/index.vue'
    },
    // 佣金提现明细
    {
        path: `/mine/cashlog`,
        name: 'CashLog',
        component: 'pages/member/mine/cashLog/index.vue'
    }
]
