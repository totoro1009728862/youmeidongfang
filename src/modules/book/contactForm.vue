<template>
    <div class="contact-people">
        <div class="go-title">联系人</div>
        <div>
            <div v-if="needContactName" class="go-tip" @click="nameInputFcous('inputVal')">
                <div>姓名</div>
                <div>
                    <input ref="inputVal" :value="contactInfo.contactName" maxlength="16" placeholder="请输入姓名" @input="changeInfo()" />
                </div>
            </div>
            <div class="go-tip" @click="nameInputFcous('telVal')">
                <div>手机号码</div>
                <div>
                    <input
                        ref="telVal"
                        :value="contactInfo.contactPhone"
                        autocomplete="off"
                        maxlength="11"
                        type="tel"
                        placeholder="请输入手机号码"
                        @input="changeInfo()"
                    />
                </div>
            </div>
            <div v-show="!hasBind" class="go-tip2 go-tip">
                <div>验证码</div>
                <div>
                    <input ref="codeVal" v-model.trim="code" type="tel" maxlength="4" placeholder="请输入短信验证码" />
                </div>
                <div class="code" @click="getCode">{{ countdownText }}</div>
            </div>
        </div>
    </div>
</template>
<script>
import { useTencentCaptcha } from '~/common/utils/index.js'
export default {
    name: 'ContactForm',
    model: {
        prop: 'contactInfo',
        event: 'change'
    },
    props: {
        hasBind: {
            type: String,
            default: ''
        },
        contactInfo: {
            type: Object,
            default: () => {
                return {}
            }
        },
        needContactName: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            countdown: 60,
            code: '',
            countdownText: '获取验证码',
            time: null
        }
    },
    destroyed() {
        this.time = clearInterval(this.time)
    },
    methods: {
        // 点击’获取验证码’
        getCode() {
            const phone = this.$refs.telVal.value
            const {
                $api: { member }
            } = this
            if (this.countdown !== 60) return false
            if (phone === '') {
                this.$Toast('请输入手机号码')
            } else {
                member.mine.ifOpenCaptcha().then(res => {
                    const { code, data } = res
                    if (code === 200) {
                        if (data) {
                            //开启防水墙验证
                            useTencentCaptcha().then(res => {
                                this.getSmsCodeChecked({
                                    phoneNumber: phone,
                                    ticket: res.ticket,
                                    rand: res.randstr
                                })
                            })
                        } else {
                            this.getSmsCodeChecked({
                                phoneNumber: phone,
                                ticket: '1',
                                rand: '1'
                            })
                        }
                    }
                })
            }
        },
        // 发送验证码
        getSmsCodeChecked(params) {
            const {
                $api: { book }
            } = this
            book.quickOrderGetSmsCode(params).then(res => {
                const { code } = res
                if (code === 200) {
                    this.$Toast('验证码已发送到您手机')
                    this.countdownFn()
                }
            })
        },
        // 验证码倒计时计算
        countdownFn() {
            if (this.countdown === 0) {
                this.countdown_text = '重新获取'
                this.countdown = 60
                this.code = ''
                clearTimeout(this.time)
                return false
            } else {
                this.countdown--
                if (this.countdown === 0) {
                    this.countdownText = '重新获取'
                } else {
                    this.countdownText = this.countdown + 's重新获取'
                }
                this.time = setTimeout(() => {
                    this.countdownFn()
                }, 1000)
            }
        },
        nameInputFcous(v) {
            this.$nextTick(function() {
                //DOM 更新了
                this.$refs[v].focus()
            })
        },
        // $event.target.value
        changeInfo() {
            const info = {
                contactName: this.$refs.inputVal ? this.$refs.inputVal.value : '',
                contactPhone: this.$refs.telVal.value
            }
            this.$emit('change', info)
        }
    }
}
</script>
<style lang="less" scoped>
.contact-people {
    position: relative;
    padding: 0 30px 20px;
    background: #fff;
    font-size: 28px;
    margin-top: 20px;
    .go-title {
        position: relative;
        display: flex;
        flex-flow: row nowrap;
        height: 100px;
        line-height: 100px;
        align-items: center;
        font-weight: bold;
        font-size: 32px;
        .iconfont {
            position: absolute;
            right: 0;
            line-height: 100px;
            top: 0;
            font-size: 36px;
            color: #04c71f;
            font-weight: 400;
        }
    }

    .go-tip {
        position: relative;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        color: #555;
        width: 100%;

        div:nth-child(1) {
            display: flex;
            min-width: 140px;
        }

        input {
            color: #222;
            font-size: 30px;
        }
        & + .go-tip {
            border-top: 2px solid #f5f5f5;
            margin-top: 20px;
            padding-top: 20px;
        }
    }

    .go-tip2 {
        div:nth-child(2) {
            padding-right: 230px;
            overflow: hidden;
        }

        .code {
            position: absolute;
            right: 0;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 220px;
            color: #04c71f;
        }
    }
}

input::-webkit-input-placeholder {
    /* placeholder字体大小  */
    font-size: 30px;
    color: #888;
}
</style>
