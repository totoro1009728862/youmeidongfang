// const year = new Date().getFullYear()
const LRU = require('lru-cache')
module.exports = {
    appTemplatePath: 'app.pro.html',
    render: {
        bundleRenderer: {
            cache: new LRU({
                max: 1000, // 最大的缓存个数
                maxAge: 1000 * 60 * 15 // 缓存15分钟
            })
        }
    },
    dev: false,
    build: {
        extractCSS: true,
        filenames: {
            app: ({ isDev }) => (isDev ? '[name].js' : 'js/[name].[chunkhash].js'),
            chunk: ({ isDev }) => (isDev ? '[name].js' : 'js/[name].[chunkhash].js'),
            css: ({ isDev }) => (isDev ? '[name].css' : 'css/[name].[contenthash].css')
        }
        // publicPath: `//oss.hxtrip.com/common/mobile/hx_touch/pro/${year}/`
    }
}
