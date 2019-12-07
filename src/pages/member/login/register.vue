<template>
    <div class="hx-login">
        <ym-header title="注册"></ym-header>
        <background>
            <div class="logo">HUATAI</div>
        </background>
        <div class="header-box">
            <div>
                <div class="icon ym-order"></div>
            </div>
        </div>
        <div class="tab-box">
            <tabs v-model="tabIndex"></tabs>
        </div>

        <div class="content">
            <div class="items">
                <div v-show="tabIndex === 2" class="item" @click="nameInputFcous('shopNameRef')">
                    <div class="label">门店名称</div>
                    <input ref="shopNameRef" v-model.trim="shopName" placeholder="请填写您的门店全称" />
                </div>
                <div class="item" @click="nameInputFcous('nameRef')">
                    <div class="label">姓名</div>
                    <input ref="nameRef" v-model.trim="name" placeholder="请填写您的姓名" />
                </div>
                <div class="item pr180" @click="nameInputFcous('phoneNumberRef')">
                    <div class="label">手机号</div>
                    <input
                        ref="phoneNumberRef"
                        v-model.trim="phone"
                        type="tel"
                        maxlength="11"
                        placeholder="请填写您的手机号"
                    />
                    <div class="code-bt" @click.stop="getCode">{{ codeText }}</div>
                </div>
                <div class="item" @click="nameInputFcous('codeRef')">
                    <div class="label">验证码</div>
                    <input
                        ref="codeRef"
                        v-model.trim="authCode"
                        type="tel"
                        maxlength="6"
                        placeholder="请填写您的手机验证码"
                    />
                </div>
                <div class="item" @click.stop="showArea = true">
                    <div class="label">所在区域</div>
                    <span v-for="(item, index) in areaCodes" :key="index" :class="{ 'has-value': item.name }">
                        {{ item.name || `选择${index === 0 ? '省' : index === 1 ? '市' : '区/县'}` }}
                    </span>
                    <span class="ege-warp icon ym-down"></span>
                </div>
                <div class="item" @click="nameInputFcous('InviterNumberRef')">
                    <div class="label">邀请人</div>
                    <input
                        ref="InviterNumberRef"
                        v-model.trim="inviteBusinessPhone"
                        type="tel"
                        maxlength="11"
                        placeholder="请填写邀请人的手机号"
                    />
                </div>
                <div class="item" @click="nameInputFcous('passwordRef')">
                    <div class="label">登录密码</div>
                    <input
                        ref="passwordRef"
                        v-model.trim="loginPassword"
                        :type="passwordShow ? 'text' : 'password'"
                        placeholder="请填写您的登录密码"
                    />
                    <span class="ege-warp" @click.stop="passwordShow = !passwordShow">
                        <van-icon :name="passwordShow ? 'eye-o' : 'closed-eye'" />
                    </span>
                </div>
                <div class="item" @click="nameInputFcous('repasswordRef')">
                    <div class="label">确认密码</div>
                    <input
                        ref="repasswordRef"
                        v-model.trim="repassword"
                        :type="repasswordShow ? 'text' : 'password'"
                        placeholder="请再次填写您的登录密码"
                    />
                    <span class="ege-warp" @click.stop="repasswordShow = !repasswordShow">
                        <van-icon :name="repasswordShow ? 'eye-o' : 'closed-eye'" />
                    </span>
                </div>
                <div class="item" @click="nameInputFcous('cashwordRef')">
                    <div class="label">提现密码</div>
                    <input
                        ref="cashwordRef"
                        v-model.trim="payPassword"
                        :type="cashwordShow ? 'text' : 'password'"
                        placeholder="请填写您的提现密码"
                    />
                    <span class="ege-warp" @click.stop="cashwordShow = !cashwordShow">
                        <van-icon :name="cashwordShow ? 'eye-o' : 'closed-eye'" />
                    </span>
                </div>
                <div class="item" @click="nameInputFcous('recashwordRef')">
                    <div class="label">确认密码</div>
                    <input
                        ref="recashwordRef"
                        v-model.trim="recashword"
                        :type="recashwordShow ? 'text' : 'password'"
                        placeholder="请再次填写您的提现密码"
                    />
                    <span class="ege-warp" @click.stop="recashwordShow = !recashwordShow">
                        <van-icon :name="recashwordShow ? 'eye-o' : 'closed-eye'" />
                    </span>
                </div>
            </div>
            <div class="reg-footer">
                <div class="xieyi" @click="checked = !checked">
                    <span class="icon" :class="{ 'ym-checked': checked, 'ym-check': !checked }"></span>
                    <span>
                        请仔细阅读
                        <i @click.stop="showXY = true">注册协议</i>
                    </span>
                </div>
                <div class="bt" :class="{ 'no-click': noClick }" @click="submitReg">提交申请</div>
            </div>
        </div>
        <!-- 城市选择 -->
        <van-popup v-model="showArea" position="bottom">
            <van-area
                :area-list="areaList"
                :value="areaCode"
                :columns-placeholder="['请选择', '请选择', '请选择']"
                title="省市区选择"
                @cancel="cancelArea"
                @confirm="getArea"
            />
        </van-popup>
        <!-- 协议 -->
        <van-popup v-model="showXY" class="agree-box">
            <div class="agree-title">
                注册协议
                <i class="icon ym-close" @click="showXY = false"></i>
            </div>
            <agreement></agreement>
        </van-popup>
    </div>
</template>

<script>
import Background from '~/modules/assist/background'
import Tabs from './tabs'
import Agreement from './agreement'
import { phoneNumberReg, passwordReg } from '~/common/utils/checkForm.js'
import { area } from '~/common/utils/area.js'
export default {
    components: {
        Background,
        Tabs,
        Agreement
    },

    data() {
        return {
            tabIndex: 0, // tab下标
            countdown: 60, // 倒计时重新获取
            codeText: '获取验证码', // 文案
            time: null,
            authCode: '', // 验证码
            shopName: '', // 门店数量
            name: '', //用户名
            phone: '', // 手机号
            areaCode: '', // 用于显示的
            areaCodes: [
                { code: '', name: '' },
                { code: '', name: '' },
                { code: '', name: '' }
            ], // 省市区编码
            inviteBusinessPhone: '', // 邀请人手机号
            loginPassword: '',
            passwordShow: false,
            repassword: '',
            repasswordShow: false,
            payPassword: '',
            cashwordShow: false,
            recashword: '',
            recashwordShow: false,
            checked: false, // 协议是否确定
            showXY: false, // 协议内容开关
            areaList: [], // 省市区信息
            showArea: false, // 地区选择开关
            loading: false
        }
    },
    computed: {
        noClick() {
            const {
                shopName,
                name,
                phone,
                authCode,
                areaCode,
                loginPassword,
                repassword,
                payPassword,
                recashword,
                checked,
                tabIndex
            } = this
            const v =
                !phone ||
                !authCode ||
                !name ||
                !areaCode ||
                !loginPassword ||
                !repassword ||
                !payPassword ||
                !recashword ||
                !checked

            const v2 = !shopName || v
            return tabIndex === 2 ? v2 : v
        }
    },
    mounted() {
        this.areaList = area
    },
    methods: {
        nameInputFcous(v) {
            this.$nextTick(function() {
                //DOM 更新了
                this.$refs[v].focus()
            })
        },
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
        async getSmsCodeChecked(params) {
            const {
                $api: { member }
            } = this
            const { code } = await member.login.authPhone(params)
            if (code === 200) {
                this.$Toast('验证码已发送到您手机')
                this.countdownFn()
            }
        },
        // 验证码倒计时计算
        countdownFn() {
            if (this.countdown === 0) {
                this.codeText = '重新获取'
                clearTimeout(this.time)
                this.countdown = 60
                return false
            } else {
                this.countdown--
                this.codeText = `${this.countdown}s重新获取`
                this.time = setTimeout(() => {
                    this.countdownFn()
                }, 1000)
            }
        },
        // 取消area
        cancelArea() {
            this.showArea = false
        },
        //  area
        getArea(e) {
            e.forEach((item, index) => {
                if (item) this.areaCodes[index] = item
            })
            this.areaCode = this.areaCodes[2].code || this.areaCodes[1].code || this.areaCodes[0].code
            this.showArea = false
        },

        async submitReg() {
            if (this.noClick) return
            const {
                $api: { member },
                tabIndex,
                authCode, // 验证码
                shopName, // 门店数量
                name, //用户名
                phone, // 手机号
                areaCodes, // 省市区编码
                inviteBusinessPhone, // 邀请人手机号
                loginPassword,
                repassword,
                payPassword,
                recashword
            } = this
            let phoneReg = phoneNumberReg(phone)
            let InviterReg = inviteBusinessPhone ? phoneNumberReg(inviteBusinessPhone) : ''
            let psReg = passwordReg(loginPassword)
            let cashwordReg = passwordReg(payPassword)
            if (phoneReg) {
                this.$Toast(phoneReg)
                this.nameInputFcous('phoneNumberRef')
                return
            }
            if (InviterReg) {
                this.$Toast(InviterReg)
                this.nameInputFcous('InviterNumberRef')
                return
            }
            if (!areaCodes[2].code || !areaCodes[1].code || !areaCodes[0].code) {
                this.$Toast('请选择所在区域')
                return
            }
            if (psReg) {
                this.$Toast(psReg)
                return
            }
            if (loginPassword !== repassword) {
                this.$Toast('两次输入的登录密码不一样')
                this.nameInputFcous('repasswordRef')
                return
            }
            if (cashwordReg) {
                this.$Toast(cashwordReg)
                return
            }
            if (payPassword !== recashword) {
                this.$Toast('两次输入的提现密码不一样')
                this.nameInputFcous('recashwordRef')
                return
            }
            const userType = tabIndex === 2 ? 2 : 1
            this.$cookies.set('userType', userType, {
                path: '/'
            })
            let params = {
                businessType: tabIndex === 2 ? 0 : tabIndex === 1 ? 1 : 2,
                authCode, // 验证码
                shopName, // 门店数量
                name, //用户名
                phone, // 手机号
                inviteBusinessPhone, // 邀请人手机号
                loginPassword,
                payPassword,
                cityName: areaCodes[1].name,
                provinceName: areaCodes[0].name,
                areaName: areaCodes[2].name
            }
            this.loading = true
            this.$Toast.loading({
                mask: true,
                message: '提交中...',
                duration: 0
            })
            const { code } = await member.login.registerUser(params)
            this.loading = false
            this.$Toast.clear()
            if (code === 200) {
                this.$Toast.success({
                    message: '申请已发送，请等待客服审核！',
                    duration: 2000,
                    onClose: () => {
                        this.$router.replace({
                            name: 'Login'
                        })
                    }
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.hx-login {
    padding-bottom: 60px;
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
.header-box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -40px;
    height: 80px;
    width: 100%;
    div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        background: #fff;
        border-radius: 50%;
        box-shadow: 0px 4px 6px 0px rgba(255, 239, 240, 1);
        .icon {
            font-size: 60px;
            color: #ab1f26;
        }
    }
}
.tab-box {
    position: relative;
    margin: 0 20px;
    top: -20px;
}
.content {
    position: relative;
    background: #fff;
    margin: 0 20px 60px;
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
            padding: 15px 40px 15px 100px;
            border-bottom: 1px solid #f7f7f7;
            font-size: 14px;
            color: #bbb;
            .label,
            .ege-warp {
                position: absolute;
                display: flex;
                height: 100%;
                align-items: center;
                justify-content: center;
                top: 0;
                font-size: 14px;
            }
            .label {
                font-size: 14px;
                font-weight: 600;
                color: #222;
                left: 20px;
            }
            .ege-warp {
                width: 40px;
                font-size: 20px;
                right: 0;
                color: #bbb;
            }
            span {
                padding-right: 10px;
                font-size: 13px;
            }
            .has-value {
                color: #222;
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
    }
    input {
        width: 100%;
        font-size: 15px;
    }
    .reg-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        padding: 0 20px;
        color: #555;
        font-size: 14px;
        .bt {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            width: 120px;
            font-size: 14px;
            color: #fff;
            background: #ab1f26;
        }
        .no-click {
            background: #ddd;
        }
        .xieyi {
            display: flex;
            height: 100%;
            align-items: center;
            flex-flow: row nowrap;
            .icon {
                font-size: 18px;
                margin-right: 5px;
            }
            .ym-check {
                color: #bbb;
            }
            .ym-checked {
                color: #ab1f26;
            }
            span {
                display: inline-block;
                color: #222;
                font-size: 14px;
                i {
                    padding-left: 5px;
                    color: #ab1f26;
                    text-decoration: underline;
                }
            }
        }
    }
}
.agree-box {
    padding: 50px 10px 0;
    width: 300px;
    border-radius: 3px;
    max-height: 400px;
    min-height: 150px;
    overflow: hidden;
    .agree-title {
        position: absolute;
        left: 0;
        top: 0;
        font-size: 15px;
        font-weight: 600;
        color: #222;
        width: 100%;
        height: 43px;
        line-height: 43px;
        text-align: center;
        i {
            position: absolute;
            right: 10px;
            top: 0;
            line-height: 43px;
            color: #222;
            font-size: 16px;
            font-weight: 500;
        }
    }
}
</style>
