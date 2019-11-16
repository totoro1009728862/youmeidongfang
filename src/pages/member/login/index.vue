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
                    <input v-model.trim="userName" placeholder="请输入手机号码或用户名" />
                </div>
                <div class="item">
                    <input v-model.trim="password" :type="isPasswordShow ? 'text' : 'password'" placeholder="请输入密码" />
                    <span class="ege-warp" @click="changePassShow">
                        <van-icon v-if="isPasswordShow" name="eye-o" />
                        <van-icon v-if="!isPasswordShow" name="closed-eye" />
                    </span>
                </div>
                <nuxt-link v-if="!isWechat" tag="div" class="item forgot" :to="{ name: 'ForgetPassword' }">
                    <span>忘记密码</span>
                </nuxt-link>
            </div>
            <van-button type="primary" class="btn" size="large" @click="submitLogin()">登 录</van-button>
            <div v-if="!isWechat" class="other-more">
                <nuxt-link tag="span" :to="{ name: 'LoginByPhone', query: { ...$route.query } }" replace>验证码登录</nuxt-link>
                <nuxt-link tag="span" :to="{ name: 'Registration', query: { ...$route.query } }">注册账号</nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
import routerBack from '~/common/minix/routerBack.js'
const domain = process.env.domain
export default {
    layout: 'keepalive',
    mixins: [routerBack],
    data() {
        return {
            isWechat: false, //是否在微信环境中
            userName: '', //用户名
            password: '', //密码
            isPasswordShow: false //密码是否可见
        }
    },
    async asyncData({ app }) {
        //进入当前页面---先清除userToken
        app.$cookies.remove('userToken', { domain, path: '/' }) //将之前的老cookie 先删除掉
        app.$cookies.removeAll()
        app.$cookies.remove('userToken', {
            domain: '.qa.hxtrip.com',
            path: '/'
        })
        app.$cookies.remove('userToken', {
            domain: 'm.qa.hxtrip.com',
            path: '/'
        })
        app.$cookies.remove('userToken', {
            domain: '.m.qa.hxtrip.com',
            path: '/'
        })
        app.$cookies.remove('userToken', {
            domain: '.m.hxtrip.com',
            path: '/'
        })
        app.$cookies.remove('userToken', {
            domain: '.hxtrip.com',
            path: '/'
        })
        app.$cookies.remove('userToken', {
            domain: 'www.m.hxtrip.com',
            path: '/'
        })
        app.$cookies.remove('userToken', {
            domain: '.www.m.hxtrip.com',
            path: '/'
        })
        app.$cookies.remove('userToken', {
            domain: '.qa.hxtrip.com'
        })
        app.$cookies.remove('userToken', {
            domain: 'm.qa.hxtrip.com'
        })
        app.$cookies.remove('userToken', {
            domain: '.m.qa.hxtrip.com'
        })
        app.$cookies.remove('userToken', {
            domain: '.m.hxtrip.com'
        })
        app.$cookies.remove('userToken', {
            domain: '.hxtrip.com'
        })
        app.$cookies.remove('userToken', {
            domain: 'www.m.hxtrip.com'
        })
        app.$cookies.remove('userToken', {
            domain: '.www.m.hxtrip.com'
        })
        //微信登录的处理   ---如果是微信的话 通过授权，而不是通过当前页面来注册的
        return await app.$wxLogin()
    },
    methods: {
        changePassShow() {
            //切换密码是否可见
            this.isPasswordShow = !this.isPasswordShow
        },
        submitLogin() {
            if (this.userName.trim() === '') {
                this.$Toast('请输入手机号码或用户名')
                return
            }
            if (this.password.trim() === '') {
                this.$Toast('请输入密码')
                return
            }
            if (/\s/.test(this.password)) {
                this.$Toast('密码格式不正确')
                return
            }
            this.$Toast.loading({
                mask: true,
                message: '登录中...',
                duration: 0
            })
            this.$store
                .dispatch('member/login/mLogin', {
                    phoneNumber: this.userName,
                    password: this.password
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
                                    //删除之前的cookie 过一段时间可以删除掉
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
                    //this.$Toast(res.msg)
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
        // font-size: 36px;
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
            color: #555;
        }
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
