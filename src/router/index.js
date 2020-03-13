//注意：router文件夹内代码，都是运行在服务端的代码，所以只能使用require/exports
//所以当前文件夹内的代码 不能使用import/export
//这里server端的代码 目前只能require
const login = require('./login')
const product = require('./product')
const mine = require('./mine')

module.exports = [
    {
        path: '',
        redirect: '/login'
    },
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: `/home`,
        name: 'Home',
        component: 'pages/product/home/index.vue'
    },
    {
        path: `/clogin`,
        name: 'CLogin',
        component: 'pages/product/home/cLogin.vue'
    },
    {
        path: `/home/mycount`,
        name: 'MyCount',
        component: 'pages/product/home/myCount.vue'
    },
    {
        path: `/merchantsPay`,
        name: 'MerchantsPay',
        component: 'pages/product/home/merchantsPay.vue'
    },
    {
        path: `/home/pay`,
        name: 'Pay',
        component: 'pages/product/home/pay.vue'
    },
    {
        path: `/home/success`,
        name: 'success',
        component: 'pages/product/home/success.vue'
    },

    ...login,
    ...product,
    ...mine
]
