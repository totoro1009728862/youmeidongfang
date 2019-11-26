<template>
    <div class="hx-login">
        <ym-header title="登录"></ym-header>
        <background>
            <div class="logo">HUATAI</div>
        </background>

        <div class="content">
            <tabs v-model="tabIndex" :tabs="['代理', '店家']"></tabs>
            <div class="items">
                <div class="item" @click="nameInputFcous('userNameRef')">
                    <div class="icon ym-account"></div>
                    <input ref="userNameRef" v-model.trim="userName" type="tel" maxlength="11" placeholder="请输入登录手机号" />
                </div>
                <div class="item" @click="nameInputFcous('passwordRef')">
                    <div class="icon ym-password"></div>
                    <input ref="passwordRef" v-model.trim="password" :type="isPasswordShow ? 'text' : 'password'" placeholder="请输入密码" />
                    <span class="ege-warp" @click.stop="isPasswordShow = !isPasswordShow">
                        <van-icon :name="isPasswordShow ? 'eye-o' : 'closed-eye'" />
                    </span>
                </div>
                <div class="forgot-box">
                    <nuxt-link v-if="!isWechat" tag="div" class="forgot" :to="{ name: 'ForgetPassword', query: { tabIndex } }">
                        <span>忘记密码?</span>
                    </nuxt-link>
                    <nuxt-link tag="div" class="forgot" :to="{ name: 'Registration', query: { ...$route.query } }">
                        <span>注册账号</span>
                    </nuxt-link>
                </div>
            </div>
            <div class="login-bt">
                <div :class="{ 'no-click': noClick }" @click="submitLogin">登录</div>
            </div>
            <!-- <div v-if="!isWechat" class="other-more">
                <nuxt-link tag="span" :to="{ name: 'LoginByPhone', query: { ...$route.query } }" replace>验证码登录</nuxt-link>
                <nuxt-link tag="span" :to="{ name: 'Registration', query: { ...$route.query } }">注册账号</nuxt-link>
            </div>-->
        </div>
    </div>
</template>

<script>
import Background from '~/modules/assist/background'
import Tabs from './tabs'
import { phoneNumberReg, passwordReg } from '~/common/utils/checkForm.js'
import { mapActions } from 'vuex'
const domain = process.env.domain
export default {
    components: {
        Background,
        Tabs
    },

    data() {
        return {
            tabIndex: 0, // tab下标
            isWechat: false, //是否在微信环境中
            userName: '', //用户名
            password: '', //密码
            isPasswordShow: false //密码是否可见
        }
    },
    computed: {
        noClick() {
            return !this.userName || !this.password
        }
    },
    async asyncData({ app, query }) {
        //进入当前页面---先清除userToken
        app.$cookies.remove('userToken', {
            domain,
            path: '/'
        }) //将之前的老cookie 先删除掉
        app.$cookies.removeAll()
        const { tabIndex, userName } = query
        return {
            tabIndex: tabIndex ? Number(tabIndex) : 0,
            userName
        }
    },
    created() {},
    methods: {
        ...mapActions(['set_userInfo']),
        nameInputFcous(v) {
            this.$nextTick(function() {
                //DOM 更新了
                this.$refs[v].focus()
            })
        },
        async submitLogin() {
            if (this.noClick) return
            const { userName, password, tabIndex } = this
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
            let params = {
                phone: userName,
                loginPassword: password
            }
            const userType = tabIndex ? 2 : 1
            console.log(userType)
            this.$cookies.set('userType', userType, {
                path: '/'
            })
            const {
                $api: { member }
            } = this
            const { code, data } = await member.login.userLogin(params)
            if (code === 200) {
                this.set_userInfo(data)
                this.$cookies.set('userToken', data.token, {
                    path: '/'
                })
                this.$cookies.set('userId', data.userId, {
                    path: '/'
                })

                if (this.$route.query.originUrl) {
                    this.$router.replace(decodeURIComponent(this.$route.query.originUrl))
                } else {
                    this.$router.replace({
                        name: 'Mine'
                    })
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>
.hx-login {
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

    .items {
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        margin-top: 20px;

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

        .forgot-box {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
        }

        .forgot {
            display: block;
            font-size: 12px;
            color: #bbb;
            margin: 10px 0 20px;
        }
    }

    .login-bt {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        width: 100%;

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
