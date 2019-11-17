<template>
    <div class="hx-login">
        <background>
            <div class="logo">ANMOYI</div>
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
                <div class="item" @click="nameInputFcous('userNameRef')">
                    <div class="label">姓名</div>
                    <input ref="userNameRef" v-model.trim="userName" placeholder="请填写您的姓名" />
                </div>
                <div class="item pr180" @click="nameInputFcous('phoneNumberRef')">
                    <div class="label">手机号</div>
                    <input ref="phoneNumberRef" v-model.trim="phoneNumber" type="tel" maxlength="11" placeholder="请填写您的手机号" />
                    <div class="code-bt" @click.stop="getCode">{{ codeText }}</div>
                </div>
                <div class="item" @click="nameInputFcous('codeRef')">
                    <div class="label">验证码</div>
                    <input ref="codeRef" v-model.trim="code" type="tel" maxlength="4" placeholder="请填写您的手机验证码" />
                </div>
                <div class="item" @click.stop="showArea = true">
                    <div class="label">所在区域</div>
                    <span v-for="(item, index) in areaCodes" :key="index" :class="{ 'has-value': item.name }">
                        {{ item.name || `选择${index === 0 ? '省' : index === 1 ? '市' : '区/县'}` }}
                    </span>
                    <span class="ege-warp icon ym-down"></span>
                </div>
                <div v-show="tabIndex === 2" class="item" @click="nameInputFcous('machineNumberRef')">
                    <div class="label">机器数量</div>
                    <input ref="machineNumberRef" v-model.trim="machineNumber" type="tel" maxlength="4" placeholder="请输入购买的机器数量" />
                </div>
                <div class="item" @click="nameInputFcous('InviterNumberRef')">
                    <div class="label">邀请人</div>
                    <input ref="InviterNumberRef" v-model.trim="InviterNumber" type="tel" maxlength="11" placeholder="请填写邀请人的手机号" />
                </div>
                <div class="item" @click="nameInputFcous('passwordRef')">
                    <div class="label">登录密码</div>
                    <input ref="passwordRef" v-model.trim="password" :type="passwordShow ? 'text' : 'password'" placeholder="请填写您的登录密码" />
                    <span class="ege-warp" @click.stop="passwordShow = !passwordShow">
                        <van-icon :name="passwordShow ? 'eye-o' : 'closed-eye'" />
                    </span>
                </div>
                <div class="item" @click="nameInputFcous('repasswordRef')">
                    <div class="label">确认密码</div>
                    <input ref="repasswordRef" v-model.trim="repassword" :type="repasswordShow ? 'text' : 'password'" placeholder="请再次填写您的登录密码" />
                    <span class="ege-warp" @click.stop="repasswordShow = !repasswordShow">
                        <van-icon :name="repasswordShow ? 'eye-o' : 'closed-eye'" />
                    </span>
                </div>
                <div class="item" @click="nameInputFcous('cashwordRef')">
                    <div class="label">提现密码</div>
                    <input ref="cashwordRef" v-model.trim="cashword" :type="cashwordShow ? 'text' : 'password'" placeholder="请填写您的提现密码" />
                    <span class="ege-warp" @click.stop="cashwordShow = !cashwordShow">
                        <van-icon :name="cashwordShow ? 'eye-o' : 'closed-eye'" />
                    </span>
                </div>
                <div class="item" @click="nameInputFcous('recashwordRef')">
                    <div class="label">确认密码</div>
                    <input ref="recashwordRef" v-model.trim="recashword" :type="recashwordShow ? 'text' : 'password'" placeholder="请再次填写您的提现密码" />
                    <span class="ege-warp" @click.stop="recashwordShow = !recashwordShow">
                        <van-icon :name="recashwordShow ? 'eye-o' : 'closed-eye'" />
                    </span>
                </div>
            </div>
            <div class="login-bt">
                <div :class="{ 'no-click': noClick }" @click="submitReg">提交申请</div>
            </div>
        </div>
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
    </div>
</template>

<script>
import Background from './background'
import Tabs from './tabs'
import { phoneNumberReg, passwordReg } from '~/common/utils/checkForm.js'
import { area } from '~/common/utils/area.js'
export default {
    components: {
        Background,
        Tabs
    },

    data() {
        return {
            tabIndex: 0, // tab下标
            countdown: 60, // 倒计时重新获取
            codeText: '获取验证码', // 文案
            time: null,
            code: '', // 验证码
            shopName: '', // 门店数量
            userName: '', //用户名
            phoneNumber: '', // 手机号
            areaCode: '', // 用于显示的
            areaCodes: [
                { code: '', name: '' },
                { code: '', name: '' },
                { code: '', name: '' }
            ], // 省市区编码
            machineNumber: '', // 机器数量
            InviterNumber: '', // 邀请人手机号
            password: '',
            passwordShow: false,
            repassword: '',
            repasswordShow: false,
            cashword: '',
            cashwordShow: false,
            recashword: '',
            recashwordShow: false,
            areaList: [], // 省市区信息
            showArea: false // 地区选择开关
        }
    },
    computed: {
        noClick() {
            const { shopName, userName, phoneNumber, code, areaCode, machineNumber, password, repassword, cashword, recashword, tabIndex } = this
            const v = !phoneNumber || !code || !userName || !areaCode || !password || !repassword || !cashword || !recashword
            const v2 = !shopName || !machineNumber || v
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
            const { phoneNumber, countdown } = this
            if (countdown !== 60) return false
            let phoneReg = phoneNumberReg(phoneNumber)
            if (!phoneNumber) {
                this.$Toast('请输入手机号码')
            } else if (phoneReg) {
                this.$Toast(phoneReg)
            } else {
                this.getSmsCodeChecked({
                    phoneNumber
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

        submitReg() {
            if (this.noClick) return
            const {
                code, // 验证码
                shopName, // 门店数量
                userName, //用户名
                phoneNumber, // 手机号
                areaCode, // 用于显示的
                areaCodes, // 省市区编码
                machineNumber, // 机器数量
                InviterNumber, // 邀请人手机号
                password,
                repassword,
                cashword,
                recashword
            } = this
            let phoneReg = phoneNumberReg(phoneNumber)
            let InviterReg = InviterNumber ? phoneNumberReg(InviterNumber) : ''
            let psReg = passwordReg(password)
            let cashwordReg = passwordReg(cashword)
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
            if (password !== repassword) {
                this.$Toast('两次输入的登录密码不一样')
                this.nameInputFcous('repasswordRef')
                return
            }
            if (cashwordReg) {
                this.$Toast(cashwordReg)
                return
            }
            if (cashword !== recashword) {
                this.$Toast('两次输入的提现密码不一样')
                this.nameInputFcous('recashwordRef')
                return
            }
            let params = {
                code, // 验证码
                shopName, // 门店数量
                userName, //用户名
                phoneNumber, // 手机号
                areaCode, // 用于显示的
                areaCodes, // 省市区编码
                machineNumber, // 机器数量
                InviterNumber, // 邀请人手机号
                password,
                repassword,
                cashword,
                recashword
            }
            console.log(params)
            this.$Toast.success({
                message: '注册成功',
                duration: 1000,
                onClose: () => {
                    this.$router.replace({
                        name: 'Home'
                    })
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.hx-login {
    padding-bottom: 120px;
    .logo {
        position: absolute;
        top: 130px;
        letter-spacing: 4px;
        color: #fff;
        font-size: 60px;
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
    top: -80px;
    height: 160px;
    width: 100%;
    div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 160px;
        height: 160px;
        background: #fff;
        border-radius: 50%;
        box-shadow: 0px 8px 12px 0px rgba(255, 239, 240, 1);
        .icon {
            font-size: 120px;
            color: #ab1f26;
        }
    }
}
.tab-box {
    position: relative;
    margin: 0 40px;
    top: -40px;
}
.content {
    position: relative;
    background: #fff;
    margin: 0 40px 120px;
    padding: 40px 24px 60px;
    border-radius: 10px;
    .items {
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        margin-top: 40px;
        .item {
            position: relative;
            display: flex;
            flex-flow: row nowrap;
            padding: 30px 80px 30px 200px;
            border-bottom: 2px solid #f7f7f7;
            font-size: 28px;
            color: #bbb;
            .label,
            .ege-warp {
                position: absolute;
                display: flex;
                height: 100%;
                align-items: center;
                justify-content: center;
                top: 0;
                font-size: 28px;
            }
            .label {
                font-size: 28px;
                font-weight: 600;
                color: #222;
                left: 40px;
            }
            .ege-warp {
                width: 80px;
                font-size: 40px;
                right: 0;
                color: #bbb;
            }
            span {
                padding-right: 20px;
                font-size: 26px;
            }
            .has-value {
                color: #222;
            }
        }
        .pr180 {
            padding-right: 180px;
            .code-bt {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                height: 100%;
                width: 180px;
                right: 0;
                top: 0;
                color: #bbb;
                font-size: 28px;
            }
        }
        .forgot-box {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
        }
        .forgot {
            display: block;
            font-size: 24px;
            color: #bbb;
            margin: 20px 0 40px;
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
            height: 80px;
            width: 320px;
            background: #ab1f26;
            color: #fff;
            border-radius: 40px;
            font-size: 28px;
        }
        .no-click {
            color: #888;
            background: #ddd;
        }
    }
    input {
        width: 100%;
        font-size: 30px;
    }
}
</style>
