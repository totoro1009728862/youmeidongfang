import { mapGetters, mapActions } from 'vuex'
import * as utils from '../utils'
// const wx = window || {}
export default {
    data() {
        return {
            isWechat: false,
            hasConfig: false
        }
    },
    mounted() {
        this.isWechat = utils.isWechat(navigator.userAgent)
    },
    computed: {
        ...mapGetters(['wxConfig'])
    },
    methods: {
        ...mapActions(['setWxConfig']),
        async initWx() {
            this.hasConfig = true
            if (this.isWechat) {
                const res = await this.$api.wxGetConfig()
                if (res.code == 200) {
                    this.setWxConfig(res.data)
                    const { appId, nonceStr, signature, timestamp } = res.data
                    window.wx.config({
                        // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId, // 必填，公众号的唯一标识
                        timestamp, // 必填，生成签名的时间戳
                        nonceStr, // 必填，生成签名的随机串
                        signature, // 必填，签名
                        jsApiList: ['updateAppMessageShareData', 'getLocation', 'openLocation', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表
                    })
                } else {
                    this.hasConfig = false
                }
            }
        },
        async $wxShare(params) {
            const wx = (window && window.wx) || {}
            // 安卓安全域名内切换必须重新注册
            if (!this.hasConfig) {
                await this.initWx()
            }
            /*
                参数信息
                title: '页面分享', // 分享标题
                desc: '22222222222222222222', // 分享描述
                link: 'https://m.qa.hxtrip.com/www/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'http://qiniu.hxtrip.com/integration/image/admin/1/4298d82b08ea49fa852b4915c8ff52fc.jpg',
                success: function() {
                    // 设置成功
                }
            */
            wx.ready(function() {
                // if (utils.isAndroid) {
                //     wx.onMenuShareAppMessage(params)
                // }
                wx.updateAppMessageShareData(params)
                wx.onMenuShareTimeline(params)
            })
        },
        async $wxGetLocation() {
            const wx = (window && window.wx) || {}
            if (!this.hasConfig) {
                await this.initWx()
            }
            /*
                参数信息
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    var speed = res.speed; // 速度，以米/每秒计
                    var accuracy = res.accuracy; // 位置精度
                }
            */
            return new Promise((resolve, reject) => {
                wx.ready(() => {
                    wx.getLocation({
                        success: res =>
                            resolve({
                                lat: res.latitude,
                                lng: res.longitude
                            }),
                        fail: err => reject(err)
                    })
                })
            })
        },
        async $wxOpenMap(params) {
            const wx = (window && window.wx) || {}
            if (!this.hasConfig) {
                await this.initWx()
            }
            wx.ready(function() {
                wx.openLocation(params)
            })
            /*
                参数信息
                wx.openLocation({
                    latitude: 0, // 纬度，浮点数，范围为90 ~ -90
                    longitude: 0, // 经度，浮点数，范围为180 ~ -180。
                    name: '', // 位置名
                    address: '', // 地址详情说明
                    scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
                    infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
                });
            */
        }
    }
}
