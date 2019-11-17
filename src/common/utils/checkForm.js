// 只能英文小写和数字
export const enAndNumberReg = str => {
    const reg = /^[a-z0-9]+$/
    if (!reg.test(str)) {
        return '只能是小写英文字母和数字！'
    }
    return false
}
// 只能英文小写和数字
export const passwordReg = str => {
    const reg = /^[a-zA-Z0-9]+$/
    if (!reg.test(str) || str.length < 6 || str.length > 10 || /\s/.test(str)) {
        return '密码必须为6-10位大小写英文或数字'
    }
    return false
}
// 只能是中文
export const cnReg = str => {
    var han = /^[\u4e00-\u9fa5]+$/
    if (!han.test(str)) {
        return '请输入中文'
    }
    return false
}

// 只能是数字 ^[0-9]+$
export const numberReg = str => {
    const reg = /^[0-9]+$/
    if (!reg.test(str)) {
        return '只能是数字！'
    }
    return false
}
// 手机号码验证;
export const phoneNumberReg = str => {
    const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
    if (!reg.test(str)) {
        return '请输入有效的手机号码！'
    }
    return false
}
// 电话号码
export const telReg = str => {
    const reg = /^0\d{2,3}-?\d{7,8}$/
    const regPhone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
    if (!reg.test(str) && !regPhone.test(str)) {
        return '请输入有效的电话号码！'
    }
    return false
}
