const path = require('path')

const px2rem = require('postcss-px2rem')

const routes = require('../../src/router/')

const srcDir = 'src/'
const reslove = pathUrl => path.resolve(__dirname, '../../', srcDir, pathUrl)

const resloveRoutes = routes => {
    return routes.map(route => {
        return {
            ...route,
            component: route.component && reslove(route.component),
            children: route.children && route.children.length && resloveRoutes(route.children)
        }
    })
}

module.exports = {
    mode: 'universal',

    srcDir,
    // loading: '~/modules/common/loading/index.vue',
    loading: {
        color: '#00b900',
        height: '4px'
    },
    env: {
        ...process.env
    },
    head: {
        title: '华肽',
        meta: [
            {
                name: 'google',
                value: 'notranslate'
            },
            {
                charset: 'utf-8'
            },
            {
                'http-equiv': 'X-UA-Compatible',
                'content': 'IE=edge,chrome=1'
            },
            {
                name: 'renderer',
                content: 'webkit'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1, user-scalable=no, minimal-ui'
            },
            {
                hid: 'description',
                name: 'description',
                content: '华肽,按摩仪'
            },
            {
                name: 'Keywords',
                content: '华肽,按摩仪'
            },
            {
                name: 'author',
                content: '华肽,按摩仪'
            },
            {
                name: 'copyright',
                content: '华肽,按摩仪'
            }
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            },
            {
                rel: 'stylesheet',
                href: '//at.alicdn.com/t/font_1513744_hy91s6izaom.css'
            }
        ],
        script: [
            // {
            //     src: '/ff.js',
            //     type: 'text/javascript',
            //     charset: 'utf-8'
            // },
            {
                src: '//www.iumer.vip/files/flexible.min.js',
                type: 'text/javascript',
                charset: 'utf-8'
            },
            // {
            //     src: 'https://ssl.captcha.qq.com/TCaptcha.js',
            //     type: 'text/javascript',
            //     charset: 'utf-8'
            // },
            {
                src: '//res.wx.qq.com/open/js/jweixin-1.4.0.js',
                type: 'text/javascript',
                charset: 'utf-8'
            },
            {
                src: '//3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js',
                type: 'text/javascript',
                charset: 'utf-8'
            }
        ]
    },
    hooks: {
        build: {
            extendRoutes: nuxtRoutes => {
                nuxtRoutes.splice(0, nuxtRoutes.length, ...resloveRoutes(routes))
            }
        }
    },
    css: ['~/assets/css/base.css'],
    router: {
        base: '/'
        // middleware: ['getUserInfo']
    },
    plugins: [
        {
            src: '~/plugins/axios.js'
        },
        {
            src: '~/plugins/api.js',
            ssr: true
        },
        {
            src: '~/plugins/vant.js',
            ssr: true
        },
        {
            src: '~/plugins/storage.js',
            ssr: false
        },
        {
            src: '~/plugins/wxLogin.js',
            ssr: true
        },
        {
            src: '~/plugins/common.js',
            ssr: true
        },
        {
            src: '~/plugins/fastclick.js',
            ssr: false
        }
    ],
    modules: ['@nuxtjs/axios', 'cookie-universal-nuxt'],
    build: {
        postcss: {
            preset: {
                autoprefixer: {
                    grid: true,
                    browsers: ['Android >= 4.0', 'iOS >= 7']
                }
            },
            plugins: [
                px2rem({
                    remUnit: 37.5
                })
            ]
        }
    },
    messages: {
        loading: '加载中...',
        error_404: '啊哦，您来晚了，该页面已失效~',
        server_error: '抱歉！程序加载失败',
        nuxtjs: '华肽',
        back_to_home: '返回首页',
        server_error_details: '程序发生错误，工程师们正在紧急抢修，请稍后再试',
        client_error: '抱歉！页面渲染失败',
        client_error_details: '页面加载失败了，工程师们正在紧急抢修，请稍后再试'
    }
}
