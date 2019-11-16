//时间转义
export const parseTime = (str, param, obj) => {
    const rHourAndMin = /\s(\d+):?(\d+)?:?(\d+)?/
    let hourAndMinRes, y, m, d, h, mi, s
    if (typeof str === 'object' && str != null) {
        y = str.getFullYear()
        m = str.getMonth() + 1
        d = str.getDate()
        h = str.getHours()
        mi = str.getMinutes()
        s = str.getSeconds()
    } else {
        str = str ? str : ''
        hourAndMinRes = rHourAndMin.exec(str)
        s = str.split('-')
        y = parseInt(s[0], 10)
        m = parseInt(s[1], 10)
        d = parseInt(s[2], 10)
        h = 0
        mi = 0
        s = 0
        if (hourAndMinRes) {
            if (hourAndMinRes[1]) {
                h = parseInt(hourAndMinRes[1], 10)
            }
            if (hourAndMinRes[2]) {
                mi = parseInt(hourAndMinRes[2], 10)
            }
            if (hourAndMinRes[3]) {
                s = parseInt(hourAndMinRes[3], 10)
            }
        }
    }
    let date = new Date(),
        temp,
        _param = {
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            timeMode: null
        }
    if (y && m && d) {
        _param = Object.assign(_param, param)
        //增量
        y = y + _param.years
        m = m + _param.months
        d = d + _param.days
        h = h + _param.hours
        mi = mi + _param.minutes
        s = s + _param.seconds

        temp = new Date(y, m - 1, d, h, mi, s)
        y = temp.getFullYear()
        m = temp.getMonth() + 1
        d = temp.getDate()
        h = temp.getHours()
        mi = temp.getMinutes()
        s = temp.getSeconds()

        m = m < 10 ? '0' + m : m
        d = d < 10 ? '0' + d : d
        h = h < 10 ? '0' + h : h
        mi = mi < 10 ? '0' + mi : mi
        s = s < 10 ? '0' + s : s

        let rt
        //特使格式
        if (_param.timeMode) {
            rt = _param.timeMode
                .replace('YYYY', y)
                .replace('MM', m)
                .replace('DD', d)
                .replace('hh', h)
                .replace('mm', mi)
                .replace('ss', s)
        } else {
            rt = [y, m, d].join('-')
        }
        rt = obj
            ? {
                  y: y,
                  m: m,
                  d: d,
                  h: h,
                  mi: mi,
                  s: s
              }
            : rt
        return rt
    } else {
        //匿名函数传参
        //arguments.callee.hasCallOnce = true;
        return parseTime([date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-'), param, obj)
    }
}

//字符串时间转义成Date时间
export const parseDate = (str, param) => {
    //parseTime.hasCallOnce = false
    let obj = parseTime(str, param, true)
    return new Date(parseInt(obj.y, 10), parseInt(obj.m, 10) - 1, parseInt(obj.d, 10), parseInt(obj.h, 10), parseInt(obj.mi, 10), parseInt(obj.s, 10))
}

/*
 * 获取time在本周的索引（索引从0始）
 * time 时间
 * day 起始星期
 */
export const weekIdx = (time, day) => {
    let _day = parseDate(time).getDay(),
        len
    day = isNaN(parseInt(day)) ? 0 : parseInt(day, 10) >= 0 && parseInt(day, 10) <= 6 ? parseInt(day, 10) : 0
    len = _day - day
    return len == 0 ? 0 : len > 0 ? len : 7 + len
}
