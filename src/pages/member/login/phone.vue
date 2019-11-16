<template>
    <div class="hx-login">
        <hx-header :css="{ backgroundColor: 'transparent' }">
            <div slot="left" class="left" @click="$routerBack">
                <i class="hx-icon hx-icon-fanhui"></i>
            </div>
        </hx-header>
        <div class="logo">
            <img src="//hxtrip.oss-cn-shanghai.aliyuncs.com/common/mobile/logo.png" alt />
        </div>
        <div class="content">
            <div class="items">
                <div class="item">
                    <input v-model.trim="phoneNumber" maxlength="11" placeholder="请输入手机号码" />
                </div>
                <div class="item">
                    <input v-model.trim="phoneCode" maxlength="4" type="tel" placeholder="请输入验证码" />
                    <span class="code-warp" @click="getCode">{{ countdownText }}</span>
                </div>
                <nuxt-link tag="div" class="item forgot" :to="{ name: 'ForgetPassword' }">
                    <span>忘记密码</span>
                </nuxt-link>
            </div>
            <van-button type="primary" class="btn" size="large" @click="submitLogin()">登 录</van-button>
            <div class="other-more">
                <nuxt-link tag="span" :to="{ name: 'Login', query: { ...$route.query } }" replace>账号密码登录</nuxt-link>
                <nuxt-link tag="span" :to="{ name: 'Registration', query: { ...$route.query } }">注册账号</nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
import { useTencentCaptcha } from '~/common/utils/index.js'
import routerBack from '~/common/minix/routerBack.js'

const domain = process.env.domain
const phoneReg = /^1[3-9][0-9]{9}$/
export default {
    layout: 'keepalive',
    mixins: [routerBack],
    data() {
        return {
            phoneNumber: '',
            phoneCode: '',
            countdown: 60,
            countdownText: '获取验证码'
        }
    },
    methods: {
        async getCode() {
            if (this.countdown != 60) return false
            if (!(this.phoneNumber && this.phoneNumber.length)) {
                this.$Toast('请输入手机号码')
                return
            }
            if (!phoneReg.test(this.phoneNumber)) {
                this.$Toast('手机号码格式不正确')
                return
            }
            this.$Toast.loading({
                mask: true,
                message: '获取中...',
                duration: 0
            })
            this.phoneCode = ''
            const { code, data } = await this.$api.member.login.ifOpenCaptcha()
            this.$Toast.clear()
            if (code == 200) {
                if (data) {
                    useTencentCaptcha().then(res => {
                        this.getSmsCode({
                            phoneNumber: this.phoneNumber,
                            ticket: res.ticket,
                            rand: res.randstr
                        })
                    })
                } else {
                    this.getSmsCode({
                        phoneNumber: this.phoneNumber,
                        ticket: '1',
                        rand: '1'
                    })
                }
            }
        },
        async getSmsCode(params) {
            this.$Toast.loading({
                mask: true,
                message: '发送中...',
                duration: 0
            })
            const res = await this.$api.member.login.mLoginGetSmsCode(params)
            this.$Toast.clear()
            if (res.code == 200) {
                this.$Toast('验证码已发送到您手机')
                this.countdownFn()
            }
        },
        countdownFn() {
            this.countdown--
            if (this.countdown == 0) {
                this.countdown = 60
                this.countdownText = '重新获取'
                return false
            } else {
                this.countdownText = this.countdown + 's后重新获取'
            }
            setTimeout(() => {
                this.countdownFn()
            }, 1000)
        },
        submitLogin() {
            if (this.phoneNumber === '') {
                this.$Toast('请输入手机号码')
                return
            }
            if (!phoneReg.test(this.phoneNumber)) {
                this.$Toast('手机号码格式不正确')
                return
            }
            if (this.phoneCode === '') {
                this.$Toast('请输入短信验证码')
                return
            }
            this.$Toast.loading({
                mask: true,
                message: '登录中...',
                duration: 0
            })
            this.$store
                .dispatch('member/login/mSmsLogin', {
                    phoneNumber: this.phoneNumber,
                    passCode: this.phoneCode
                })
                .then(res => {
                    this.$Toast.clear()
                    let { originUrl } = this.$route.query
                    if (res.userToken) {
                        this.$cookies.set('userToken', res.userToken, {
                            domain,
                            path: '/'
                        })
                        this.$store.dispatch('member/setUserInfo').then(() => {
                            if (originUrl && originUrl.length) {
                                this.$router.replace({
                                    path: decodeURIComponent(originUrl)
                                })
                            } else {
                                originUrl = this.$cookies.get('originUrl')
                                if (originUrl && originUrl.length) {
                                    this.$cookies.remove('originUrl', {
                                        domain,
                                        path: '/'
                                    })
                                    this.$router.replace({
                                        path: decodeURIComponent(originUrl)
                                    })
                                } else {
                                    this.$router.replace({ name: 'Home' })
                                }
                            }
                        })
                    }
                })
                .catch(() => {
                    this.$Toast.clear()
                })
        }
    }
}
</script>

<style lang="less" scoped>
.hx-login {
    background-color: #f5f5f5;
    overflow: auto;
    min-height: 100vh;
}
.logo {
    padding: 100px 0 50px;
    text-align: center;
    img {
        width: 300px;
    }
}
.content {
    padding: 0 20px;
    .items {
        padding: 50px 0;
    }
    .btn {
        height: 80px;
        line-height: 80px;
        cursor: pointer;
        border-radius: 56px;
        border: none;
        background: #1aad19;
    }
    .item {
        height: 110px;
        border-bottom: 2px solid #d4d4d4;
        position: relative;
        &.forgot {
            border-bottom: none;
            display: flex;
            flex-direction: row-reverse;
            padding-top: 50px;
            font-size: 32px;
            color: #555;
        }
    }
    input {
        height: 110px;
        border: none;
        width: 100%;
        background: none;
        font-size: 34px;
        &::-webkit-input-placeholder {
            color: #aab2bd;
            font-size: 34px;
        }
    }
    .code-warp {
        position: absolute;
        top: 0;
        right: 0;
        width: 220px;
        height: 110px;
        line-height: 110px;
        color: #00b900;
        text-align: right;
        font-size: 32px;
    }
    .other-more {
        display: flex;
        justify-content: space-between;
        color: #555;
        height: 120px;
        line-height: 120px;
        font-size: 32px;
        color: #555;
    }
}
</style>
