const proxyConfig = require('../../proxy.config.js')
module.exports = {
    server: {
        port: 9922,
        host: '0.0.0.0'
    },
    proxy: proxyConfig,
    modules: ['@nuxtjs/proxy'],
    build: {
        extend(config, ctx) {
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    }
}
