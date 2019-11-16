import * as utils from '../common/utils'
import * as config from '../common/utils/config'

import crypto from 'crypto' //md5加密用的包

export default (context, inject) => {
    inject('wxLogin', async () => {
        //const env = process.env.NODE_ENV
        const { app, req, redirect } = context
        const { $cookies, $axios } = app
        const userAngent = process.server ? req.headers['user-agent'] : navigator.userAgent
        const isWechat = utils.isWechat(userAngent)
        const domain = process.env.domain || '.zdserver.com'
        const env = process.env.NODE_ENV || 'development'
        const url = process.server ? `${req.headers.host}/${req.url}` : location.href
        const { urlToken, code, originUrl, promoterId } = utils.serializeUrl(url)
        let _originUrl = originUrl && originUrl.length ? originUrl : $cookies.get('originUrl')
        const unionId = $cookies.get('unionCode')
        _originUrl = _originUrl || `/`

        const prefixHostName = env == 'pro' ? 'https://m.hxtrip.com/' : env == 'rc' ? 'https://m.t.hxtrip.com/' : 'https://m.qa.hxtrip.com/'
        if (!urlToken && isWechat) {
            if (!code) {
                let return_url = encodeURIComponent(`${prefixHostName}/login?originUrl=${_originUrl}`),
                    wxOpenOauthUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize',
                    wxParams = {
                        scope: unionId && unionId.length ? 'snsapi_base' : 'snsapi_userinfo',
                        appid: config.AppID,
                        redirect_uri: return_url,
                        response_type: 'code',
                        state: 'STATE',
                        component_appid: config.componentAppId
                    }
                redirect(`${wxOpenOauthUrl}?${utils.deserializeUrl(wxParams)}#wechat_redirect`)
            } else {
                const noSilentLoginFn = async () => {
                    const userInfo = await $axios.$get(`/user/common/wechatLogin/${config.AppID}/getUserInfoByCode?code=${code}&state=${promoterId || ''}`)
                    if (userInfo.code == '200') {
                        $cookies.set('userToken', userInfo.data.token || '', { domain, path: '/' })
                        //userInfo.data.userDataDto 用户信息
                        $cookies.set(
                            'unionCode',
                            crypto
                                .createHash('md5')
                                .update(userInfo.data.unionId || 'userInfo.data.token' || 'hxtrip')
                                .digest('base64'),
                            { domain, path: '/' }
                        )
                        redirect(decodeURIComponent(_originUrl))
                    }
                }
                if (unionId && unionId.length) {
                    const userInfo = await $axios.$get(`/user/common/wechatLogin/silentLogin/${config.AppID}?code=${code}&state=${promoterId || ''}`)
                    if (userInfo.code == '200') {
                        $cookies.set('userToken', userInfo.data.token || '', { domain, path: '/' })
                        //userInfo.data.userDataDto 用户信息
                        redirect(decodeURIComponent(_originUrl))
                    } else {
                        await noSilentLoginFn()
                    }
                } else {
                    await noSilentLoginFn()
                }
            }
        }
        return { isWechat }
    })
}
