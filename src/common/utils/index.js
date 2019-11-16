import Promise from 'es6-promise'

//通过userAngent 判断是否为微信
export const isWechat = userAgent => {
    userAgent = userAgent || ''
    return /MicroMessenger/i.test(userAgent)
}

//序列化url的query值
export const serializeUrl = url => {
    url = decodeURIComponent(url || '')
    var reg = /(?:[?&]+)([^&]+)=([^&]+)/g
    var data = {}

    function fn(str, pro, value) {
        data[decodeURIComponent(pro)] = decodeURIComponent(value)
    }
    url.replace(reg, fn)
    return data
}

//反序列化url的query
export const deserializeUrl = query => {
    query = query || {}
    let res = []
    for (let key in query) {
        if (Object.prototype.hasOwnProperty.call(query, key)) {
            res.push(`${key}=${query[key]}`)
        }
    }
    return res.join('&')
}
// 获取支付地址
export const getField = () => {
    let href = ''
    const link = window.location.href
    if (link.indexOf('.qa.') > -1) {
        href = `http://pay.qa.hxtrip.com`
    } else if (link.indexOf('.t.') > -1) {
        href = `http://pay.t.hxtrip.com`
    } else if (link.indexOf('.zdserver.') > -1) {
        href = `http://pay.zdserver.com`
    } else {
        href = `https://pay.hxtrip.com`
    }
    return href
}
//点击延迟
export function debounce(fn, delay) {
    var _delay = delay || 0
    var timer
    return function() {
        var th = this
        var args = arguments
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(function() {
            timer = null
            fn.apply(th, args)
        }, _delay)
    }
}

// 存储回调的跳转连接
export const LoginLinkStore = data => {
    if (/\/login/.test(data)) return
    localStorage.setItem('returnLink', data)
}

//倒计时
export const handleTimer = (callback, time) => {
    // 判断是否执行
    let isExecute = false
    let timeItem = setTimeout(() => {
        if (typeof callback == 'function') {
            if (isExecute) {
                clearTimeout(timeItem)
                timeItem = null
            } else {
                isExecute = true
                callback()
            }
        }
    }, time || 600)
}

//调用腾讯防水墙
export const useTencentCaptcha = (appid = '2084346730') => {
    return new Promise((reslove, reject) => {
        if (window && window.TencentCaptcha) {
            window.hxCaptcha = new window.TencentCaptcha(
                appid,
                res => {
                    if (res.ret == 0) {
                        reslove(res)
                    } else {
                        reject(res)
                        window.hxCaptcha && window.hxCaptcha.destroy()
                    }
                },
                null
            )
            window.hxCaptcha.show()
        } else reject(new Error('未找到TCaptcha.js脚本'))
    })
}

//H5 获取用户地理定位方法
export const getLocation = () => {
    var geolocation = new window.qq.maps.Geolocation('YTMBZ-A7DKQ-YGK5T-GS3FV-LARBK-OBFYU', '好行网-订单详情')
    return new Promise((reslove, reject) => {
        geolocation.getLocation(
            pos => {
                reslove(pos)
            },
            err => {
                reject(err)
            }
        )
    })
}

// 手机号码验证;
export const phoneNumberReg = str => {
    const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
    if (!reg.test(str)) {
        return '请输入有效的手机号码！'
    }
    return false
}

export const openMap = item => {
    // 打开百度地图
    const location = `location=${item.latitude},${item.longitude}`
    const title = `title=${item.station || item.address || item.busLocation || item.stationName || item.name}`
    const content = `content=上车地点`
    const src = `src=webapp.baidu.openAPIdemo`
    const output = `output=html`
    return `http://api.map.baidu.com/marker?${location}&${title}&${content}&${output}&${src}`
}

// 判断安卓
export const isAndroid = userAgent => {
    var u = userAgent || navigator.userAgent
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
        if (window.ShowFitness !== undefined) return true
    }
    return false
}
// 判断设备为 ios
export const isIos = userAgent => {
    var u = userAgent || navigator.userAgent
    if (u.indexOf('iPhone') > -1 || u.indexOf('iOS') > -1) {
        return true
    }
    return false
}
// 百度经纬度转腾讯
export const bMapTransQQMap = (lng, lat) => {
    let x_pi = (3.14159265358979324 * 3000.0) / 180.0
    let x = lng - 0.0065
    let y = lat - 0.006
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi)
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi)
    let lngs = z * Math.cos(theta)
    let lats = z * Math.sin(theta)
    return {
        lng: lngs,
        lat: lats
    }
}
// 手机号码验证;
export const regPhoneNumber = str => {
    const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
    if (!reg.test(str)) {
        return '请输入有效的手机号码！'
    }
    return false
}
