// 避免浮点数计算问题，使用精度计算方法

// 浮点数求和
export const add = function(a, b) {
    var c, d, e
    try {
        c = a.toString().split('.')[1].length
    } catch (f) {
        c = 0
    }
    try {
        d = b.toString().split('.')[1].length
    } catch (f) {
        d = 0
    }
    return (e = Math.pow(10, Math.max(c, d))), (mul(a, e) + mul(b, e)) / e
}

// 浮点数相减
export const sub = function(a, b) {
    var c, d, e
    try {
        c = a.toString().split('.')[1].length
    } catch (f) {
        c = 0
    }
    try {
        d = b.toString().split('.')[1].length
    } catch (f) {
        d = 0
    }
    return (e = Math.pow(10, Math.max(c, d))), (mul(a, e) - mul(b, e)) / e
}

// 浮点数相乘
export const mul = function(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString()
    try {
        c += d.split('.')[1].length
    } catch (f) {
        // console.info(f)
    }
    try {
        c += e.split('.')[1].length
    } catch (f) {
        // console.info(f)
    }
    return (Number(d.replace('.', '')) * Number(e.replace('.', ''))) / Math.pow(10, c)
}

// 浮点数相除
export const div = function(a, b) {
    var c,
        d,
        e = 0,
        f = 0
    try {
        e = a.toString().split('.')[1].length
    } catch (g) {
        // console.info(g)
    }
    try {
        f = b.toString().split('.')[1].length
    } catch (g) {
        // console.info(g)
    }
    return (c = Number(a.toString().replace('.', ''))), (d = Number(b.toString().replace('.', ''))), mul(c / d, Math.pow(10, f - e))
}
