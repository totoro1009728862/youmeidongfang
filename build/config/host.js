const year = new Date().getFullYear()
module.exports = {
    build: {
        cssSourceMap: true,
        extend(config, { isClient }) {
            if (isClient) {
                config.devtool = '#source-map'
            }
        },
        extractCSS: true,
        filenames: {
            app: ({ isDev }) => (isDev ? '[name].js' : 'js/[name].[chunkhash].js'),
            chunk: ({ isDev }) => (isDev ? '[name].js' : 'js/[name].[chunkhash].js'),
            css: ({ isDev }) => (isDev ? '[name].css' : 'css/[name].[contenthash].css')
        }
        // publicPath: `//oss.hxtrip.com/common/mobile/hx_touch/host/${year}/`
    },
    plugins: [
        {
            src: '~/plugins/vconsole.js',
            ssr: false
        }
    ]
}
