<template>
    <div class="hx-regist">
        <hx-header :css="{ backgroundColor: 'transparent' }" :title="title">
            <div slot="left" class="left" @click="$routerBack">
                <i class="hx-icon hx-icon-fanhui"></i>
            </div>
        </hx-header>
        <div v-if="step == 1" class="hx-regist-content">
            <div class="input-warp">
                <div class="item">
                    <input v-model.trim="phoneNumber" maxlength="11" type="tel" placeholder="请输入手机号码" />
                </div>
                <div class="item">
                    <input v-model.trim="phoneCode" maxlength="4" type="tel" placeholder="请输入验证码" />
                    <span class="code-warp" @click="getCode">{{ countdownText }}</span>
                </div>
            </div>
            <van-button type="primary" class="btn" size="large" @click="submitNext">下一步</van-button>
        </div>
        <div v-if="step == 2" class="hx-regist-content">
            <div class="input-warp">
                <div class="item-title">
                    <span>请输入</span>
                    <span class="num">{{ phoneNumber }}</span>
                    <span>账号密码</span>
                </div>
                <div class="item">
                    <input v-model.trim="pwd" maxlength="18" minlength="6" :type="pwdType" placeholder="6-18位数字或字母" />
                    <span class="ege-warp" @click="isEyePwd = !isEyePwd">
                        <van-icon v-if="!isEyePwd" name="eye-o" />
                        <van-icon v-if="isEyePwd" name="closed-eye" />
                    </span>
                </div>
                <div class="item">
                    <input v-model.trim="pwdAgain" maxlength="18" minlength="6" :type="pwdTypeAgain" placeholder="确认密码" />
                    <span class="ege-warp" @click="isEyePwdAgain = !isEyePwdAgain">
                        <van-icon v-if="!isEyePwdAgain" name="eye-o" />
                        <van-icon v-if="isEyePwdAgain" name="closed-eye" />
                    </span>
                </div>
            </div>
            <van-button type="primary" class="btn" size="large" @click="submitRegist">完成</van-button>
        </div>
    </div>
</template>

<script>
import { useTencentCaptcha } from '~/common/utils/index.js'
import routerBack from '~/common/minix/routerBack.js'

const phoneReg = /^1[3-9][0-9]{9}$/
const pwdReg = /^[a-zA-Z0-9_]+$/
export default {
    layout: 'keepalive',
    mixins: [routerBack],
    data() {
        return {
            phoneNumber: '',
            phoneCode: '',
            pwd: '',
            pwdAgain: '',
            countdown: 60,
            countdownText: '获取验证码',
            step: 1,
            isEyePwd: true,
            isEyePwdAgain: true
        }
    },
    computed: {
        title() {
            return this.step == 1 ? '注册账号' : '设置密码'
        },
        pwdType() {
            return this.isEyePwd ? 'password' : 'text'
        },
        pwdTypeAgain() {
            return this.isEyePwdAgain ? 'password' : 'text'
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
                    useTencentCaptcha().then(async res => {
                        await this.getSmsCode({
                            phoneNumber: this.phoneNumber,
                            ticket: res.ticket,
                            rand: res.randstr
                        })
                    })
                } else {
                    await this.getSmsCode({
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
            const res = await this.$api.member.login.getSmsCode(params)
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
        async submitNext() {
            if (this.phoneNumber == '') {
                this.$Toast('请输入手机号码')
                return
            }
            if (!phoneReg.test(this.phoneNumber)) {
                this.$Toast('手机号码格式不正确')
                return
            }
            if (this.phoneCode == '') {
                this.$Toast('验证码不能为空')
                return
            }
            this.$Toast.loading({
                mask: true,
                message: '校验中...',
                duration: 0
            })
            const res = await this.$api.member.login.nextRegister({
                phoneNumber: this.phoneNumber,
                smsCode: this.phoneCode
            })
            this.$Toast.clear()
            if (res.code == 200) {
                this.step = 2
            }
        },
        async submitRegist() {
            {
                if (this.phoneNumber === '') {
                    this.$Toast('请输入手机号码')
                    return
                }
                if (!phoneReg.test(this.phoneNumber)) {
                    this.$Toast('手机号码格式不正确')
                    return
                }
                if (this.phoneCode === '') {
                    this.$Toast('验证码不能为空')
                    return
                }
                if (this.pwd === '') {
                    this.$Toast('请输入密码')
                    return
                }
                if (this.pwd.length < 6) {
                    this.$Toast('密码长度不能小于6位')
                    return
                }
                if (!pwdReg.test(this.pwd)) {
                    this.$Toast('密码格式不正确')
                    return
                }
                if (this.pwd !== this.pwdAgain) {
                    this.$Toast('两次输入密码不统一')
                    return
                }
            }
            this.$Toast.loading({
                mask: true,
                message: '注册中...',
                duration: 0
            })
            const res = await this.$api.member.login.customerRegister({
                phoneNumber: this.phoneNumber,
                password: this.pwd,
                passCode: this.phoneCode
            })
            this.$Toast.clear()
            if (res.code == 200) {
                this.$Toast.success('注册成功')
                setTimeout(() => {
                    this.$Toast.clear()
                    this.$routerBack()
                }, 800)
            }
        }
    }
}
</script>
<style lang="less" scoped>
.hx-regist {
    background-color: #f5f5f5;
    overflow: auto;
    min-height: 100vh;
    &-content {
        padding: 0 20px;
        .input-warp {
            padding: 150px 0;

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
        }
        .item {
            height: 110px;
            border-bottom: 2px solid #d4d4d4;
            position: relative;
        }
        .btn {
            height: 80px;
            line-height: 80px;
            cursor: pointer;
            border-radius: 56px;
            border: none;
            background: #1aad19;
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
        .item-title {
            font-size: 34px;
            margin-bottom: 20px;
            span.num {
                color: #00b900;
                padding: 0 5px;
            }
        }
        .ege-warp {
            position: absolute;
            top: 0;
            right: 0;
            width: 110px;
            height: 110px;
            text-align: center;
            i {
                font-size: 48px;
                margin-top: 30px;
                color: #555555;
            }
        }
    }
}
</style>
