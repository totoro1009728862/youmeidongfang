<template>
    <div class="home"></div>
</template>
<script>
export default {
    name: 'CLogin',
    data() {
        return {
            userId: '',
            auth_code: '', // 来源令牌
            paymentMode: '', // 来源
            deviceId: '', // 设备id
            picks: [], // 套餐
            deviceNo: '', // 机器型号
            shopName: '', // 门点名称
            surplusNum: 0, // 剩余次数
            payMethod: '' // 微信支付方式
        }
    },
    async asyncData({ app, query, redirect }) {
        const params = {
            paymentMode: query.paymentMode,
            jsCode: query.code || query.auth_code
        }
        app.$cookies.set('userType', 3, {
            path: '/'
        })
        const {
            $api: { product }
        } = app
        const { code, data } = await product.userLogin(params)
        if (code === 200) {
            app.$cookies.set('userToken', data.token, {
                path: '/'
            })
            app.$cookies.set('userId', data.userId, {
                path: '/'
            })
            if (process.server) {
                redirect({
                    name: 'Home',
                    query: {
                        ...query,
                        surplusNum: data.surplusNum,
                        userId: data.userId
                    }
                })
            } else if (process.client) {
                app.router.push({
                    name: 'Login',
                    query: {
                        ...query,
                        surplusNum: data.surplusNum,
                        userId: data.userId
                    }
                })
            }
            return {}
        }
        return {}
    },
    created() {
        this.getPicks()
    },
    methods: {
        /* eslint-disable */
        goMyCount() {
            this.$router.push({
                name: 'MyCount',
                query: {
                    deviceId: this.deviceId,
                    userId: this.userId,
                    status: 1
                }
            })
        },
        async getPicks() {
            const {
                deviceId,
                $api: { product }
            } = this
            const { code, data } = await product.deviceSetList({
                deviceId
            })
            if (code === 200) {
                this.shopName = data.shopName
                this.deviceNo = data.deviceNo
                this.deviceSetId = data.deviceSetId
                this.picks = data.list
            }
        },
        // 初始化支付接口 JSAPI
        async confirmOrderApi(params) {
            const {
                $api: { product },
                deviceId,
                userId
            } = this
            const { code, data } = await product.wechatSubmitPay(params)
            if (code === 200) {
                if (typeof WeixinJSBridge == 'undefined') {
                    if (document.addEventListener) {
                        document.addEventListener(
                            'WeixinJSBridgeReady',
                            this.onBridgeReady(data, deviceId, userId),
                            false
                        )
                    } else if (document.attachEvent) {
                        document.attachEvent(
                            'WeixinJSBridgeReady',
                            this.onBridgeReady(data, deviceId, userId)
                        )
                        document.attachEvent(
                            'onWeixinJSBridgeReady',
                            this.onBridgeReady(data, deviceId, userId)
                        )
                    }
                } else {
                    this.onBridgeReady(data)
                }
            }
        },
        // 阿里支付
        async confirmOrderWithAliPayWebApi(params) {
            const {
                $api: { product }
            } = this
            const { data } = await product.alipaySubmitPay(params)
            if (data) {
                this.aliPayHtml = data
                const div = document.createElement('div')
                div.innerHTML = data //此处form就是后台返回接收到的数据
                document.body.appendChild(div)
                document.forms[0].submit()
            } else {
                this.$Toast('支付失败')
            }
        },
        // 支付事件
        goPay: debounce(async function(packId) {
            const params = {
                deviceId: this.deviceId,
                deviceSetId: packId,
                userId: this.userId
            }
            // 微信支付
            if (this.paymentMode === 'wechat') {
                this.payMethod = 'JSAPI'
                this.confirmOrderApi(params)
            } else if (this.paymentMode === 'alipay') {
                // 支付宝
                this.confirmOrderWithAliPayWebApi(params)
            } else {
                this.$Toast('未获取到支付方式！')
            }
        }, 500)

        /* eslint-disable */
    }
}
</script>
<style lang="less" scoped>
.home {
    height: 100vh;
    background: #fff;
}
</style>
