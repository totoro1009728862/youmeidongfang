/**
 * 所有业务代码里的 配置信息
 * 敏感信息 切勿泄露
 */
const env = process.env.NODE_ENV || 'development'
//微信---APPId
export const AppID = 'wx7db0291ced506b56'

//微信--三方平台--APPId
export const componentAppId = env == 'pro' ? 'wx7db0291ced506b56' : env == 'rc' ? 'wx7db0291ced506b56' : 'wx7db0291ced506b56'
