<template>
    <div class="home">
        <background></background>

        <div class="home-box">
            <div class="user-header">
                <img :src="header || 'http://www.iumer.vip/ymkj/css/image/header.png'" alt="头像" />
            </div>
            <div class="count">
                <div>为TA代买次数</div>
                <div>
                    <van-stepper v-model="totalNum" />
                </div>
            </div>
            <div class="price">
                <div>单价</div>
                <div>￥{{ price }}</div>
            </div>
            <div class="price">
                <div>总金额</div>
                <div>
                    <span>￥{{ price * totalNum }}</span>
                </div>
            </div>
            <div class="account">
                <div class="item" @click="nameInputFcous('userNameRef')">
                    <div class="icon ym-account"></div>
                    <input
                        ref="userNameRef"
                        v-model.trim="userName"
                        type="tel"
                        maxlength="11"
                        placeholder="请输入门店帐号"
                    />
                </div>
                <div class="item" @click="nameInputFcous('passwordRef')">
                    <div class="icon ym-password"></div>
                    <input
                        ref="passwordRef"
                        v-model.trim="password"
                        :type="isPasswordShow ? 'text' : 'password'"
                        placeholder="请输入密码"
                    />
                    <span class="ege-warp" @click.stop="isPasswordShow = !isPasswordShow">
                        <van-icon :name="isPasswordShow ? 'eye-o' : 'closed-eye'" />
                    </span>
                </div>
            </div>

            <div class="bt" :class="{ submit: userName && password }" @click="goPay">立即支付</div>
        </div>
    </div>
</template>
<script>
import Background from '~/modules/assist/background'
import { debounce } from '~/common/utils/index.js'
import { phoneNumberReg, passwordReg } from '~/common/utils/checkForm.js'
export default {
    name: 'Pay',
    components: {
        Background
    },
    data() {
        return {
            userId: '',
            paymentMode: '', // 来源
            deviceId: '', // 设备id
            picks: [], // 套餐
            deviceNo: '', // 机器型号
            shopName: '', // 门点名称
            surplusNum: 0, // 剩余次数
            payMethod: '', // 微信支付方式
            totalNum: 1,
            price: 13,
            userName: '',
            password: '', //密码
            isPasswordShow: false, //密码是否可见
            header: ''
        }
    },
    computed: {
        noClick() {
            return !this.userName || !this.password
        }
    },
    created() {
        this.readyFunc()
    },
    methods: {
        async readyFunc() {
            const {
                $api: { product },
                $route: { query }
            } = this
            const params = {
                paymentMode: query.paymentMode,
                jsCode: query.code || query.auth_code,
                deviceId: query.deviceId
            }
            console.log(params)
            this.$cookies.set('userType', 3, {
                path: '/'
            })
            const { code, data } = await product.userLogin(params)
            const { code: code2, data: data2 } = await product.selectCustomerInfo({
                deviceId: query.deviceId,
                customerId: query.customerId
            })
            // 登录
            if (code === 200 && code2 === 200) {
                this.$cookies.set('userToken', data.token, {
                    path: '/'
                })
                this.$cookies.set('userId', data.userId, {
                    path: '/'
                })
                Object.assign(
                    {
                        ...query,
                        ...data,
                        ...data2
                    },
                    this
                )
            }
        },
        nameInputFcous(v) {
            this.$nextTick(function() {
                //DOM 更新了
                this.$refs[v].focus()
            })
        },
        async getNum() {
            const params = {
                deviceId: this.deviceId,
                userId: this.userId
            }
            const {
                $api: { product }
            } = this
            const { code, data } = await product.myUserNum(params)
            if (code === 200) {
                this.surplusNum = data.surplusNum
            }
        },
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
        // 初始化支付接口 JSAPI
        async confirmOrderApi(params) {
            const {
                $api: { product },
                deviceId,
                userId
            } = this
            const { code, data } = await product.wechatHelpSubmitPay(params)
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
                    this.onBridgeReady(data, deviceId, userId)
                }
            }
        },
        // 阿里支付
        async confirmOrderWithAliPayWebApi(params) {
            const {
                $api: { product }
            } = this
            const { data } = await product.alipayHelpSubmitPay(params)
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
            const {
                deviceId,
                customerId,
                userId,
                totalNum,
                userName,
                password
            } = this
            let phoneReg = phoneNumberReg(userName)
            let psReg = passwordReg(password)
            if (phoneReg) {
                this.$Toast(phoneReg)
                return
            }
            if (psReg) {
                this.$Toast(psReg)
                return
            }
            const params = {
                deviceId,
                customerId,
                userId,
                totalNum,
                phone: userName,
                password
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
        }, 500),

        //返回跳转详情
        goDetail() {
            window.location.href = this.detailLink
        },
        // 准备唤起微信支付
        onBridgeReady(v, deviceId, userId) {
            let value = v
            window.WeixinJSBridge.invoke(
                'getBrandWCPayRequest',
                {
                    appId: value.appId, //公众号名称，由商户传入
                    timeStamp: value.timeStamp, //时间戳，自1970年以来的秒数
                    nonceStr: value.nonceStr, //随机串
                    package: value.packAge,
                    signType: 'MD5', //微信签名方式：
                    paySign: value.sign //微信签名
                },
                function(res) {
                    if (res.err_msg == 'get_brand_wcpay_request:ok') {
                        window.location.href = `/home/mycount?deviceId=${deviceId}&userId=${userId}`
                    }
                }
            )
        },
        goMerchantsPay() {
            const { deviceId, userId, deviceNo, shopName } = this
            this.$router.push({
                name: 'MerchantsPay',
                query: { deviceId, userId, deviceNo, shopName }
            })
        }
        /* eslint-disable */
    }
}
</script>
<style lang="less" scoped>
.home {
    min-height: 100vh;
    background: #ececec;
}

.home-box {
    position: relative;
    margin: 0 20px;
    top: -40px;
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    color: #222;
    font-size: 14px;
    .user-header {
        position: absolute;
        top: -35px;
        left: 50%;
        margin-left: -35px;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        background: #fff;
        img {
            width: 100%;
            height: 100%;
            display: block;
            overflow: hidden;
        }
    }
    .count {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        margin-bottom: 15px;
    }
    .price {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        height: 30px;
        align-items: center;
        span {
            color: #ab1f26;
        }
    }
    .account {
        margin-top: 30px;
    }
    .item {
        position: relative;
        display: flex;
        flex-flow: row nowrap;
        padding: 15px 40px;
        border-bottom: 1px solid #f7f7f7;
        .icon,
        .ege-warp {
            position: absolute;
            display: flex;
            height: 100%;
            align-items: center;
            width: 40px;
            justify-content: center;

            top: 0;
            font-size: 20px;
            color: #bbb;
        }

        .icon {
            left: 0;
        }

        .ege-warp {
            right: 0;
        }
    }
    .bt {
        width: 160px;
        height: 40px;
        margin: 0 auto;
        border-radius: 50px;
        line-height: 40px;
        font-size: 14px;
        color: #888;
        background: #ddd;
        text-align: center;
        margin-top: 30px;
    }
    .submit {
        background: #ab1f26;
        color: #fff;
    }
}
</style>
