//注意：router文件夹内代码，都是运行在服务端的代码，所以只能使用require/exports
//所以当前文件夹内的代码 不能使用import/export
//这里server端的代码 目前只能require
const login = require('./login')
const product = require('./product')
const mine = require('./mine')

module.exports = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: `/home`,
        name: 'Home',
        component: 'pages/product/home/index.vue'
    },
    {
        path: `/home/mycount`,
        name: 'MyCount',
        component: 'pages/product/home/myCount.vue'
    },

    ...login,
    ...product,
    ...mine
]
