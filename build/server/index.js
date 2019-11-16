const Koa = require('koa')
const consola = require('consola')
const moment = require('moment')

// const send = require('koa-send')
// const path = require('path')

const { Nuxt, Builder } = require('nuxt')

const env = process.env.NODE_ENV || 'development'

//文件
let config = require('../config/')

let isDev = env === 'development'

const app = new Koa()
const start = async () => {
    let nuxt = new Nuxt(config) //启用nuxt

    if (!isDev) {
        nuxt.options.server.host = process.env.HOST || '0.0.0.0'
        nuxt.options.server.port = (process.env.PORT0 && Number(process.env.PORT0)) || 80
    }
    const { host, port } = nuxt.options.server
    if (isDev) {
        const builder = new Builder(nuxt)
        await builder.build()
    } else {
        await nuxt.ready()
    }

    //favicon.ico
    // app.use(async (ctx, next) => {
    //     if (ctx.path == '/favicon.ico') {
    //         await send(ctx, '/favicon.ico', {
    //             root: path.join(__dirname, '../../src/static/')
    //         })
    //     } else {
    //         await next()
    //     }
    // })
    //404 & 访问记录
    app.use(async (ctx, next) => {
        try {
            if (!isDev && !ctx.href.match(/favicon.ico$/gi)) {
                consola.success(`${moment().format('YYYY-MM-DD HH:mm:ss SS')} request with path ${ctx.href}`)
            }
            await next()
        } catch (err) {
            consola.error(moment().format('YYYY-MM-DD HH:mm:ss SS'), err)
            ctx.status = 500
            if (isDev) {
                ctx.body = err.message
            } else {
                ctx.redirect('/404.html')
            }
        }
    })

    //config
    app.use(ctx => {
        ctx.status = 200
        ctx.respond = false
        ctx.req.ctx = ctx
        nuxt.render(ctx.req, ctx.res)
    })
    //start
    app.listen(port, host, () => {
        consola.ready({
            message: `Server listening on http://${host}:${port}`,
            badge: true
        })
    })
}

start()
