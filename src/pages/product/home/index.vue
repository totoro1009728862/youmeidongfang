<template>
    <div class="home">
        <background>
            <div class="logo">HUATAI</div>
        </background>

        <div class="home-box">
            <div class="pick-info">
                <div class="shop-info">
                    <div>{{ shopName }}</div>
                    <div>机器编号：{{ macNumber }}</div>
                </div>
            </div>
            <div class="pick">
                <div class="title">
                    <span>购买使用次数</span>
                    <span>(只限当前门店使用)</span>
                </div>
                <div class="list">
                    <div>
                        <div v-for="(item, index) in picks" :key="index" class="item">
                            <div>{{ item.name }}</div>
                            <div>{{ item.price }}</div>
                            <div>{{ item.count }}</div>
                            <div class="buy-bt">
                                <div>购买</div>
                            </div>
                        </div>
                        <div class="item">占位</div>
                    </div>
                </div>
                <div class="title mt20">
                    <span>我的次数</span>
                </div>
                <div class="count-box">
                    <div class="border">100</div>
                    <div>剩余次数</div>
                    <div class="begin-bt">
                        <div>开始使用</div>
                    </div>
                    <div class="tip">每次只能单次使用</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Background from '~/modules/assist/background'
export default {
    name: 'Home',
    components: {
        Background
    },
    data() {
        return {
            auth_code: '', // 来源令牌
            paymentMode: '', // 来源
            deviceId: '', // 设备id
            picks: [], // 套餐
            macNumber: '', // 机器型号
            shopName: '', // 门点名称
            surplus: 90 // 剩余次数
        }
    },
    async asyncData() {
        // const { auth_code, paymentMode, deviceId } = query
        // app.$cookies.set('userType', 3, {
        //     path: '/'
        // })
        // const {
        //     $api: { product }
        // } = app
        // const { code, data } = await product.userLogin({
        //     paymentMode,
        //     jsCode: auth_code
        // })
        // const { data: dataList } = await product.deviceSetList({ deviceId })
        // if (code === 200) {
        //     app.$cookies.set('userToken', data.token, {
        //         path: '/'
        //     })
        //     app.$cookies.set('userId', data.userId, {
        //         path: '/'
        //     })
        // }
        // console.log(data)
        // console.log(dataList)
        // return {
        //     auth_code: auth_code || '',
        //     paymentMode: paymentMode || 'wechat',
        //     deviceId,
        //     shopName: dataList.shopName,
        //     deviceNo: dataList.deviceNo,
        //     deviceSetId: dataList.deviceSetId
        // }
    },
    created() {
        this.auth_code = this.$route.query.auth_code || '6e3d8d9eff16495080cf95aa00ecTX78'
        // this.getPicks()
    },
    methods: {
        // 初始化支付接口 JSAPI
        // async confirmOrderApi() {
        //     if (this.paymentMode === 'wechat') {
        //         this.payMethod = 'JSAPI'
        //     }
        //     const openId = this.$route.query.openId ? this.$route.query.openId : ''
        //     const params = `orderId=${this.orderNo}&type=3&payMethod=${this.payMethod}&openId=${openId}&businessType=${this.businessType}`
        //     const res = await confirmOrder(params)
        //     if (res.code === 200) {
        //         if (isWeXinCheck()) {
        //             if (typeof WeixinJSBridge == 'undefined') {
        //                 if (document.addEventListener) {
        //                     document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(res.data, this.orderNo, this.businessType), false)
        //                 } else if (document.attachEvent) {
        //                     document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(res.data, this.orderNo, this.businessType))
        //                     document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady(res.data, this.orderNo, this.businessType))
        //                 }
        //             } else {
        //                 this.onBridgeReady(res.data, this.orderNo, this.businessType)
        //             }
        //         } else {
        //             window.location.href = res.data.mwebUrl
        //         }
        //     } else {
        //         this.$Notify(res.msg)
        //     }
        // },
        // 阿里支付
        // async confirmOrderWithAliPayWebApi() {
        //     const params = `orderId=${this.orderNo}&type=2&payMethod=${this.payMethod}&businessType=${this.businessType}`
        //     const res = await confirmOrderWithAliPayWeb(params)
        //     if (res) {
        //         console.log(res)
        //         if (res.msg) {
        //             this.$Notify(res.msg)
        //         } else {
        //             this.aliPayHtml = res
        //             const div = document.createElement('div')
        //             div.innerHTML = res //此处form就是后台返回接收到的数据
        //             document.body.appendChild(div)
        //             document.forms[0].submit()
        //         }
        //     }
        // },
        // 支付事件
        goPay() {
            // 微信支付
            if (this.payType === 1) {
                this.confirmOrderApi()
            }
            // 支付宝
            if (this.payType === 2) {
                this.confirmOrderWithAliPayWebApi()
            }
        },

        //返回跳转详情
        goDetail() {
            window.location.href = this.detailLink
        },
        // 准备唤起微信支付
        onBridgeReady(v, orderNo, businessType) {
            let value = v.brandWcVo
            console.log(value)
            console.log(orderNo + businessType)
            //支付回调跳转
            //     if (typeof WeixinJSBridge == 'undefined') {
            //         this.$Notify('不在微信浏览器内。')
            //         return
            //     }
            //     WeixinJSBridge.invoke(
            //         'getBrandWCPayRequest',
            //         {
            //             appId: value.appId, //公众号名称，由商户传入
            //             timeStamp: value.timeStamp, //时间戳，自1970年以来的秒数
            //             nonceStr: value.nonceStr, //随机串
            //             package: value.packageData,
            //             signType: value.signType, //微信签名方式：
            //             paySign: value.paySign //微信签名
            //         },
            //         function(res) {
            //             if (res.err_msg == 'get_brand_wcpay_request:ok') {
            //                 window.location.href = `/paySuccess?orderNo=${orderNo}&businessType=${businessType}`
            //             }
            //         }
            //     )
        }
    }
}
</script>
<style lang="less" scoped>
.home {
    height: 100vh;
    background: #fff;
    .logo {
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: center;
        font-size: 40px;
        top: 30px;
        font-weight: 600;
        color: #fff;
    }
}

.home-box {
    position: relative;
    width: 100%;
    top: -40px;
    background: #fff;
    padding: 0 20px 30px;
    border-radius: 5px;
    height: calc(100vh - 130px);
    .pick-info {
        display: flex;
        flex-flow: column nowrap;
        padding: 30px 0 20px;
        .shop-info {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            color: #888;
            font-size: 14px;
        }
    }
    .pick {
        display: flex;
        flex-flow: column nowrap;
        width: 100%;
        .title {
            font-size: 12px;
            color: #888;
            span:nth-child(1) {
                font-size: 14px;
                color: #222;
            }
        }
        .mt20 {
            margin-top: 20px;
        }
        .count-box {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            width: 100%;
            justify-content: center;
            margin-top: 10px;
            > div:nth-child(1) {
                height: 40px;
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                align-items: center;
                font-size: 20px;
                color: #ab1f26;
                width: 180px;
            }
            > div:nth-child(2) {
                widows: 100%;
                text-align: center;
                color: #222;
                font-size: 14px;
                margin: 10px 0;
            }
            > .begin-bt {
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                > div {
                    height: 30px;
                    width: 120px;
                    line-height: 30px;
                    background: #ab1f26;
                    color: #fff;
                    font-size: 14px;
                    text-align: center;
                    border-radius: 15px;
                }
            }
            .tip {
                margin-top: 5px;
                color: #888;
                font-size: 12px;
                &::before {
                    content: '*';
                    color: #ab1f26;
                    font-size: 12px;
                    padding-right: 5px;
                }
            }
        }
        .list {
            width: calc(100% + 20px);
            overflow: scroll;
            height: auto;
            margin-top: 20px;
            padding: 10px;
            > div {
                display: flex;
                flex-flow: row nowrap;
                width: auto;
                .item:nth-last-child(1) {
                    border: none;
                    width: 20px;
                    background: #fff;
                    box-shadow: none;
                    color: #fff;
                }
                .item {
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: center;
                    height: 200px;
                    width: 140px;
                    margin-right: 10px;
                    padding: 20px 0;
                    left: 20px;
                    border-radius: 8px;
                    box-shadow: 0px 2px 6px 0px rgba(187, 187, 187, 1);
                    > div:nth-child(1) {
                        font-size: 18px;
                        color: #222;
                    }
                    > div:nth-child(2) {
                        color: #ab1f26;
                        font-size: 18px;
                        margin: 10px;
                    }
                    > div:nth-child(3) {
                        font-size: 14px;
                        color: #888;
                        margin-bottom: 20px;
                    }
                    > .buy-bt {
                        display: flex;
                        flex-flow: row nowrap;
                        justify-content: center;
                        > div {
                            background: #ab1f26;
                            color: #fff;
                            font-size: 14px;
                            text-align: center;
                            border-radius: 20px;
                            height: 40px;
                            width: 120px;
                            line-height: 40px;
                            margin: 0 20px;
                        }
                    }
                }
            }
        }
    }
    .bt {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 40px;
        margin-top: 50px;
        div {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 200px;
            border-radius: 40px;
            background: #ab1f26;
            color: #fff;
            font-size: 14px;
        }
    }
}
</style>
