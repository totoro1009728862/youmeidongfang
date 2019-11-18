<template>
    <div class="bind-title">
        <div v-show="canShow" class="cont">
            <div v-if="!hasBind">
                <span class="icon ym-guanyuwomen"></span>
                <span>
                    <span>点击“去支付”表示您已阅读并同意</span>
                    <i @click="goAgreement('服务协议')">服务协议</i>
                    <span>和</span>
                    <i @click="goAgreement('隐私政策')">隐私政策</i>
                </span>
            </div>
            <div v-if="elecProtocolUrl">
                <span class="icon ym-guanyuwomen"></span>
                <span>提交订单前请确认您已阅读并同意</span>
                <a :href="elecProtocolUrl">
                    <i>合同条款</i>
                </a>
                <span v-if="rules.refundType">
                    和
                    <i @click="goAgreement('退改说明')">退改说明</i>
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'Agreement',
    props: {
        rules: {
            type: Object,
            default: () => {
                return {}
            }
        },
        elecProtocolUrl: {
            type: String,
            default: ''
        },
        hasBind: {
            type: [String, Boolean],
            default: ''
        }
    },
    data() {
        return {}
    },
    computed: {
        canShow() {
            return !this.hasBind || this.elecProtocolUrl
        }
    },
    methods: {
        ...mapActions(['set_Rules']),

        //跳转协议
        goAgreement(v) {
            if (v === '退改说明') {
                //退改说明存入状态机
                this.set_Rules(this.rules)
            }
            this.$router.push({
                name: 'Agreement',
                query: {
                    title: v,
                    productId: this.$route.query.productId
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.bind-title {
    font-weight: 400;
    color: #222;
    font-size: 30px;
    margin: 40px 30px 140px;
    .cont {
        > div {
            display: flex;
            flex-flow: row nowrap;
            line-height: 48px;
            color: #888;

            span,
            a {
                padding-right: 10px;
                font-size: 24px;
            }

            i {
                color: #008ad4;
            }
        }
    }
}
</style>
