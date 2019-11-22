import { Promise } from 'es6-promise'
export default ({ $axios, app, redirect }) => {
    //环境变量
    const env = process.env.NODE_ENV
    const domain = process.env.domain
    //是否是开发环境
    const isDev = env === 'development'

    //是否调试
    const isDebug = !!process.env.IS_DEBUG

    //是否服务端
    const isServer = !!process.server

    //默认超时时间 30秒
    $axios.defaults.timeout = 30 * 1000

    //请求头配置
    $axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
    if (!isServer) {
        $axios.defaults.baseURL = '/api'
    } else {
        if (isDev) {
            $axios.defaults.baseURL = 'http://127.0.0.1:9922/api'
        } else {
            if (env === 'development' || env === 'host') $axios.defaults.baseURL = 'http://192.168.0.32:8081'
            else $axios.defaults.baseURL = 'https://www.iumer.vip'
            // if (env === 'pro') $axios.defaults.baseURL = 'http://hxtrip-zuul'
            // else if (env === 'rc') $axios.defaults.baseURL = 'http://hxtrip-zuul'
            // else if (env === 'integration') $axios.defaults.baseURL = 'http://hx-trip-zuul-integration'
            // else $axios.defaults.baseURL = 'http://192.168.205.6:8769'
        }
    }
    //post传参数列化
    $axios.interceptors.request.use(
        config => {
            config.headers.userToken = app.$cookies.get('userToken') || ''
            config.headers.userType = app.$cookies.get('userType') || ''
            config.headers.site = ''
            return config
        },
        err => {
            isDebug && console.log('错误的传参')
            return Promise.reject(err)
        }
    )

    //code 状态码200的判断
    $axios.interceptors.response.use(
        res => {
            const { data, status } = res
            const { code } = data
            if (status != 200) {
                isDebug && console.group()
                isDebug && console.log('请求失败处理,根据请求响应信息查找错误点：')
                isDebug && console.log(`option = ${JSON.stringify(res)}`)
                isDebug && console.groupEnd()
                //app.nuxt.error.call(app, new Error(desc || '请求响应错误'))
                return Promise.reject(res)
            } else {
                if (code == 302) {
                    //未登录或者登录过期
                    app.$cookies.remove('userToken', {
                        domain,
                        path: '/'
                    }) //清除登录cookie
                    app.$cookies.remove('userType', {
                        domain,
                        path: '/'
                    }) //清除登录cookie
                    const { query, fullPath } = app.context.route
                    if (process.server) {
                        app.$cookies.set('originUrl', encodeURIComponent(fullPath), {
                            domain,
                            path: '/'
                        })
                        redirect({
                            name: 'Login',
                            query: {
                                ...query,
                                originUrl: encodeURIComponent(fullPath)
                            }
                        })
                    } else if (process.client) {
                        app.$cookies.set('originUrl', encodeURIComponent(fullPath), {
                            domain,
                            path: '/'
                        })
                        app.router.push({
                            name: 'Login',
                            query: {
                                ...query,
                                originUrl: encodeURIComponent(fullPath)
                            }
                        })
                    }
                    return Object.assign(res, {
                        data: handleWarnMessage(data)
                    })
                }
                // if (process.server && code == 600) {
                //     redirect({
                //         path: '/home'
                //     })
                // }
            }
            return code == 200
                ? res
                : Object.assign(res, {
                      data: handleWarnMessage(data, app)
                  })
        },
        err => {
            isDebug && console.log(JSON.stringify(err))
            // app.nuxt.error.call(app, err)
            return Promise.reject(err)
        }
    )
}

const handleWarnMessage = (res, app) => {
    //处理自定义错误信息
    // const error_enum = {
    //     '302': '未登录',
    //     '500': '系统异常，请稍后再试',
    //     '600': '数据异常，操作失败',
    //     '805': '无权查看'
    // }
    const { code, data, desc } = res
    let rs = {
            code,
            desc
        },
        _message = `${desc}`
    if (code == '302') return res
    if (process.client) {
        if (code == '0') {
            if (data && data.length) {
                _message = data[0]['message'] || res.desc || '抱歉，出现个异常，请稍后重试！'
            } else _message = res.desc || '抱歉，出现个异常，请稍后重试！'
        }
        // else {
        //     _message = error_enum[code] || _message || '抱歉，出现个异常，请稍后重试！'
        // }
        setTimeout(() => {
            app.$Toast(_message)
        }, 100)
    }
    // if (process.server) {
    //     if (/^5[0-9]+$/.test(`${code}`)) app.nuxt.err.call(app, new Error('请求返回结果非200情况'))
    // }
    return rs
}
