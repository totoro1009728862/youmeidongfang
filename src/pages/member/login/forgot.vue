<template>
    <div class="hx-login">
        <ym-header title="修改密码"></ym-header>
        <background>
            <div class="logo">ANMOYI</div>
        </background>

        <div class="content">
            <div class="reset-title">密码重置</div>
            <!-- 第一步 -->
            <div v-if="step === 1">
                <div class="items">
                    <div class="item pr180" @click="nameInputFcous('phoneRef')">
                        <input ref="phoneRef" v-model.trim="phone" type="tel" maxlength="11" placeholder="请输入手机号" />
                        <div class="code-bt" @click.stop="getCode">{{ codeText }}</div>
                    </div>
                    <div class="item" @click="nameInputFcous('codeRef')">
                        <input ref="codeRef" v-model.trim="code" type="tel" maxlength="4" placeholder="请输入短信验证码" />
                    </div>
                </div>

                <div class="login-bt">
                    <div :class="{ 'no-click': noClick }" @click="goNext">下一步</div>
                </div>
            </div>
            <!-- 第二步 -->
            <div v-if="step === 2">
                <div class="items">
                    <div class="item" @click="nameInputFcous('passwordRef')">
                        <input ref="passwordRef" v-model.trim="password" :type="showpass1 ? 'text' : 'password'" placeholder="请输入新密码" />
                        <span class="ege-warp" @click.stop="showpass1 = !showpass1">
                            <van-icon :name="showpass1 ? 'eye-o' : 'closed-eye'" />
                        </span>
                    </div>
                    <div class="item" @click="nameInputFcous('repasswordRef')">
                        <input ref="repasswordRef" v-model.trim="repassword" :type="showpass2 ? 'text' : 'password'" placeholder="请再次输入新密码" />
                        <span class="ege-warp" @click.stop="showpass2 = !showpass2">
                            <van-icon :name="showpass2 ? 'eye-o' : 'closed-eye'" />
                        </span>
                    </div>
                    <div class="login-bt">
                        <div :class="{ 'no-click': noSet }" @click="resetPassword">确定</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Background from '~/modules/assist/background'
import { phoneNumberReg, passwordReg } from '~/common/utils/checkForm.js'
export default {
    components: {
        Background
    },

    data() {
        return {
            countdown: 60, // 倒计时重新获取
            codeText: '获取验证码', // 文案
            phone: '', //用户手机号
            code: '', // 验证码
            time: null,
            step: 1, // 2为下一步设置密码

            password: '',
            repassword: '',
            showpass1: false,
            showpass2: false
        }
    },
    computed: {
        noClick() {
            return !this.code || !this.phone
        },
        noSet() {
            return !this.password || !this.repassword
        }
    },
    methods: {
        // 点击’获取验证码’
        getCode() {
            const { phone, countdown } = this
            if (countdown !== 60) return false
            let phoneReg = phoneNumberReg(phone)
            if (!phone) {
                this.$Toast('请输入手机号码')
            } else if (phoneReg) {
                this.$Toast(phoneReg)
            } else {
                this.getSmsCodeChecked({
                    phone
                })
            }
        },

        // 发送验证码
        getSmsCodeChecked(params) {
            console.log(params)
            this.$Toast('验证码已发送到您手机')
            this.countdownFn()
            // const {
            //     $api: { member }
            // } = this
            // member.quickOrderGetSmsCode(params).then(res => {
            //     const { code } = res
            //     if (code === 200) {
            //         this.$Toast('验证码已发送到您手机')
            //         this.countdownFn()
            //     }
            // })
        },
        // 验证码倒计时计算
        countdownFn() {
            if (this.countdown === 0) {
                this.code = ''
                this.codeText = '重新获取'
                clearTimeout(this.time)
                return false
            } else {
                this.countdown--
                this.codeText = `${this.countdown}s重新获取`
                this.time = setTimeout(() => {
                    this.countdownFn()
                }, 1000)
            }
        },
        goNext() {
            if (this.noClick) return
            this.step = 2
        },
        resetPassword() {
            if (this.noSet) return
            let psReg = passwordReg(this.password)
            if (psReg) {
                this.$Toast(psReg)
                return
            }
            if (this.password !== this.repassword) {
                this.$Toast('两次输入的密码不一样')
                return
            }
            console.log('调接口')
            this.$Toast.success({
                message: '设置成功',
                duration: 1000,
                onClose: () => {
                    this.$router.replace({
                        name: 'Login',
                        query: {
                            userName: this.phone,
                            tabIndex: this.$route.query.tabIndex
                        }
                    })
                }
            })
        },
        nameInputFcous(v) {
            this.$nextTick(function() {
                //DOM 更新了
                this.$refs[v].focus()
            })
        }
    }
}
</script>
<style lang="less" scoped>
.hx-login {
    z-index: 9;
    .logo {
        position: absolute;
        top: 65px;
        letter-spacing: 2px;
        color: #fff;
        font-size: 30px;
        width: 100%;
        text-align: center;
        font-weight: 600;
    }
}

.content {
    position: relative;
    top: -35px;
    background: #fff;
    margin: 0 20px;
    padding: 20px 12px 30px;
    border-radius: 5px;
    .reset-title {
        width: 100%;
        text-align: center;
        color: #222;
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: bold;
    }
    .items {
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        margin-top: 20px;
        .item {
            position: relative;
            display: flex;
            flex-flow: row nowrap;
            padding: 15px 0;
            border-bottom: 1px solid #f7f7f7;
            .ege-warp {
                position: absolute;
                display: flex;
                height: 100%;
                align-items: center;
                width: 40px;
                justify-content: center;
                right: 0;
                top: 0;
                font-size: 20px;
                color: #bbb;
            }
        }
        .pr180 {
            padding-right: 90px;
            .code-bt {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                height: 100%;
                width: 90px;
                right: 0;
                top: 0;
                color: #bbb;
                font-size: 14px;
            }
        }
    }
    .login-bt {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        width: 100%;
        margin-top: 30px;
        div {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: center;
            height: 40px;
            width: 160px;
            background: #ab1f26;
            color: #fff;
            border-radius: 20px;
            font-size: 14px;
        }
        .no-click {
            color: #888;
            background: #ddd;
        }
    }
    input {
        font-size: 14px;
    }
}
</style>
