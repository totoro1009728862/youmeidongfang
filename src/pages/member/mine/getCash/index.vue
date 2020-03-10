<template>
    <div class="mine">
        <ym-header title="提现"></ym-header>
        <background></background>
        <div class="header-info">
            <div class="cash-box">
                <div class="cash-tab">
                    <span :class="{ act: cashType === 1 }" @click="cashType = 1">推广佣金</span>
                    <span :class="{ act: cashType === 2 }" @click="cashType = 2">仪器分润</span>
                </div>
                <nuxt-link class="log" :to="{ name: 'CashLog', query: { cashType } }" tag="div">提现明细</nuxt-link>
            </div>

            <div class="price">￥{{ cashType === 1 ? brokeragePrice : price }}</div>
            <div class="txt">{{ cashType === 1 ? '可提现佣金' : '可提现收益' }}</div>
        </div>
        <div class="mine-box">
            <div class="cash-price">
                <div class="item" @click="nameInputFcous('cashPriceRef')">
                    <input ref="cashPriceRef" v-model.trim="cashPrice" type="tel" placeholder="请输入提现金额" />
                </div>
                <div class="tip">
                    <div class="txt">{{ cashType === 1 ? '提现收取3%的综合费用' : '提现收取0.6%的综合费用' }}</div>
                    <div class="rt" @click="setCashPrice">全部</div>
                </div>
            </div>
            <div v-show="cashType === 2" class="card-box">
                <div class="title">
                    <div>提现至微信</div>
                    <div class="icon ym-weixin"></div>
                </div>
            </div>
            <div v-show="cashType === 1" class="card-box">
                <div class="title">
                    <div>提现至银行卡</div>
                    <div class="icon ym-card"></div>
                </div>
                <div v-if="cards && cards.length">
                    <div v-for="(item, index) in cards" :key="index" class="card" @click="selectCard = item">
                        <div class="lf">
                            <div class="icon ym-radio-checked"></div>
                            <div class="number">{{ item.bankNo | hideNumber }}</div>
                            <div class="name">{{ item.bankName }}</div>
                        </div>
                        <div class="edit" @click="addCard(item.id)">更改</div>
                    </div>
                </div>
                <div v-show="!cards.length" class="add-line" @click="addCard">
                    <div class="lf">
                        <div class="icon ym-add"></div>
                        <div class="number">添加新的银行卡</div>
                    </div>
                    <div class="icon ym-right"></div>
                </div>
            </div>
            <div class="bt">
                <div :class="{ 'no-click': noClick }" @click="submitForm">确定</div>
            </div>
        </div>
        <!-- 绑定银行卡 -->
        <van-popup v-model="show" class="edit-card-box" position="right" :style="{ height: '100%', width: '100%' }">
            <div class="bind-header">
                <div class="icon ym-left" @click="show = false"></div>
                <div>{{ bankInfo.bankId ? '修改银行卡信息' : '新增银行卡卡号' }}</div>
            </div>
            <div class="card-form">
                <div class="tip">请绑定账户本人的银行卡</div>
                <div class="card-input">
                    <div class="label">持卡人</div>
                    <div class="card-number" @click="nameInputFcous('nameRef')">
                        <input ref="nameRef" v-model.trim="bankInfo.name" type="text" placeholder="持卡人姓名" />
                    </div>
                </div>
                <div class="card-input">
                    <div class="label">卡号</div>
                    <div class="card-number" @click="nameInputFcous('cardNumberRef')">
                        <input ref="cardNumberRef" v-model.trim="bankInfo.bankNo" placeholder="请输入银行卡卡号" />
                    </div>
                </div>
                <div class="card-input">
                    <div class="label">开户行地址</div>
                    <div class="card-number" @click="nameInputFcous('addressRef')">
                        <input
                            ref="addressRef"
                            v-model.trim="bankInfo.bankAddress"
                            type="text"
                            placeholder="请输入开户行地址"
                        />
                    </div>
                </div>
                <div v-if="bankInfo['bankName']" class="card-input">
                    <div class="label">银行</div>
                    <div class="card-number">{{ bankInfo.bankName }}</div>
                </div>
                <div v-if="bankInfo['cardTypeName']" class="card-input">
                    <div class="label">卡类型</div>
                    <div class="card-number">{{ bankInfo.cardTypeName }}</div>
                </div>
                <div class="form-bt">
                    <div @click="addEditBank">确定</div>
                </div>
            </div>
        </van-popup>
        <!-- 提现密码弹窗 -->
        <van-popup v-model="showSub" class="cashword-box" get-container="body">
            <div class="icon ym-close" @click.stop="showSub = false"></div>
            <div class="title">提现密码</div>
            <div class="item" @click="nameInputFcous('cashwordRef')">
                <input ref="cashwordRef" v-model.trim="cashword" type="password" placeholder="请输入提现密码" />
            </div>
            <div class="bt" @click="submitPass">
                <div :class="{ 'no-click': !cashword || cashword.length < 6 }">确定</div>
            </div>
        </van-popup>
    </div>
</template>
<script>
import Background from '~/modules/assist/background'
import { bankCardAttribution } from '~/common/utils/bank.js'
import { passwordReg } from '~/common/utils/checkForm.js'
export default {
    name: 'GetCash',
    middleware: 'checkLogin',
    components: {
        Background
    },
    filters: {
        hideNumber(v) {
            if (!v) {
                return ''
            } else {
                const v1 = v.substring(0, 4)
                const v2 = v.substring(v.length - 4, v.length)
                return `${v1}*********${v2}`
            }
        }
    },
    data() {
        return {
            cashType: 1, // 1为佣金银行卡2为微信红包
            userType: 1, // 2为店家
            userId: '',
            price: '', // 可提现收益
            brokeragePrice: '', // 可提现佣金
            cashPrice: '', // 用户输入的提现金额
            cards: [], // 卡信息
            selectCard: {}, // 选择银行卡

            show: false, // 是否弹出表单
            showSub: false, // 密码弹窗
            bankInfo: {
                name: '',
                bankNo: '',
                bankAddress: ''
            }, // 卡信息
            cardCheck: false, // 卡号是否正确
            cashword: '' // 提现密码
        }
    },
    computed: {
        noClick() {
            if (this.cashType === 1) {
                const v = !this.selectCard || !this.selectCard.bankNo || !this.cashPrice
                return v
            } else {
                return !this.cashPrice
            }
        }
    },
    watch: {
        'bankInfo.bankNo'(newV) {
            this.$nextTick(() => {
                let newv = newV.replace(/\s/g, '')
                this.bankInfo.bankNo = newv.replace(/....(?!$)/g, '$& ')
            })
            if (newV && newV.length >= 15) {
                // 去掉空格
                const v = bankCardAttribution(newV.replace(/\s/g, ''))
                if (v !== 'error') {
                    this.cardCheck = true
                    this.bankInfo = Object.assign(this.bankInfo, v)
                } else {
                    this.cardCheck = false
                }
            }
        }
    },
    async asyncData({ app }) {
        const userType = app.$cookies.get('userType')
        const userId = app.$cookies.get('userId')
        const {
            $api: { member }
        } = app
        const { data } = await member.mine.myPerformance({ userId })
        console.log(data.brokeragePrice)
        return {
            userType,
            userId,
            price: data.price,
            brokeragePrice: data.brokeragePrice
        }
    },
    created() {
        this.getCards()
    },
    methods: {
        async getCards() {
            const {
                userId,
                $api: { member }
            } = this
            const params = {
                userId
            }
            const { code, data } = await member.mine.bankList(params)
            if (code === 200) {
                this.selectCard = data[0]
                this.cards = data
            }
        },
        async getPriceInfo() {
            const {
                userId,
                $api: { member }
            } = this
            const { code, data } = await member.mine.myPerformance({ userId })
            if (code === 200) {
                this.price = data.price
                this.brokeragePrice = data.brokeragePrice
            }
        },

        addCard() {
            this.bankInfo = {
                name: '',
                bankNo: '',
                bankName: '',
                cardTypeName: '',
                cardType: '',
                bankCode: '',
                bankAddress: ''
            }
            this.show = true
        },
        editCard(item) {
            this.bankInfo = item
            this.show = true
        },
        submitForm() {
            if (this.noClick) return
            this.showSub = true
        },
        nameInputFcous(v) {
            this.$nextTick(function() {
                //DOM 更新了
                this.$refs[v].focus()
            })
        },
        setCashPrice() {
            this.cashPrice = this.cashType === 1 ? this.brokeragePrice : this.price
        },
        async addEditBank() {
            if (!this.bankInfo.name) {
                this.$Toast('请输入持卡人姓名')
            } else if (!this.cardCheck) {
                this.$Toast('请输入正确的银行卡号')
            } else if (!this.bankInfo.bankAddress) {
                this.$Toast('请输入开户行地址')
            } else {
                const {
                    userId,
                    bankInfo: { name, bankNo, bankName, bankAddress },
                    $api: { member }
                } = this
                const params = {
                    userId,
                    name,
                    bankNo,
                    bankName,
                    bankAddress
                }
                const { code, data } = await member.mine.addbank(params)
                if (code === 200) {
                    this.selectCard = data
                    this.cards = [data]

                    this.show = false
                }
            }
            // 验证通过卡号,调接口
            // if (this.cardCheck) {
            //     if (this.bankInfo.bankId) {
            //         for (const i in this.cards) {
            //             if (this.cards[i].id === this.bankInfo.bankId) {
            //                 this.$set(this.cards, i, this.bankInfo)
            //             }
            //         }
            //         this.$Toast('修改成功')
            //         this.show = false
            //     }
            // }
        },
        submitPass() {
            let cashwordReg = passwordReg(this.cashword)
            if (cashwordReg) {
                this.$Toast(cashwordReg)
                return
            }
            let params = {
                payPassword: this.cashword,
                price: this.cashPrice,
                userId: this.userId
            }
            // 非微信需要提供银行卡帐号
            if (this.cashType === 1) {
                params.bankId = this.selectCard.bankId || ''
            }
            this.submit(params)
        },
        async submit(params) {
            const {
                $api: { member }
            } = this
            const { code } =
                this.cashType === 1
                    ? await member.mine.brokerageSubmitPrice(params)
                    : await member.mine.submitPrice(params)
            if (code === 200) {
                this.$Toast.success({
                    message:
                        this.cashType === 1
                            ? '提交成功，资金将在3-5个工作日内到账，请注意查收'
                            : '已提现到微信零钱，请在微信钱包中查看',
                    duration: 2000,
                    onClose: () => {
                        this.getPriceInfo()
                        this.showSub = false
                    }
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.mine {
    font-size: 14px;
    min-height: 100vh;
    background: #fff;
}
.header-info {
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    height: 140px;
    color: #fff;
    .cash-box {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        width: 100%;
        padding: 10px 20px;
        margin-bottom: 15px;
        .cash-tab {
            span {
                padding: 3px 10px;
                font-size: 12px;
                border-radius: 10px;
                color: #fff;
            }
            .act {
                background: #fff;
                color: #ab1f26;
            }
        }
        .log {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            div {
                font-size: 14px;
            }
        }
    }

    .price,
    .txt {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .price {
        height: 30px;
        font-size: 28px;
        margin-bottom: 5px;
        &::after {
            content: '元';
        }
    }
    .txt {
        font-size: 14px;
    }
}
.mine-box {
    position: relative;
    width: 100%;
    top: -40px;
    background: #fff;
    padding: 0 20px 30px;
    border-radius: 5px;
    .cash-price {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        padding: 30px 60px;
        .item {
            display: flex;
            justify-content: center;
            border-bottom: 2px solid #ab1f26;
            height: 40px;
            width: 100%;
            input {
                text-align: center;
                font-size: 16px;
            }
        }
        .tip {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 40px;
            font-size: 12px;
            color: #222;
            .txt {
                &::before {
                    content: '*';
                    padding-right: 4px;
                    color: #ab1f26;
                }
            }
            .rt {
                font-size: 14px;
                color: #ab1f26;
            }
        }
    }
    .card-box {
        display: flex;
        flex-flow: column nowrap;
        font-size: 14px;
        .title,
        .card {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            height: 60px;
            font-size: 14px;
            border-bottom: 1px solid #f7f7f7;
            .icon {
                font-size: 24px;
                color: #ab1f26;
            }
            .ym-weixin {
                color: #259b24;
            }
            .ym-radio {
                color: #888;
            }
            .edit {
                font-size: 12px;
                color: #ab1f26;
            }
        }
        .title {
            font-weight: 600;
        }
        .card {
            .lf {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                .number {
                    color: #222;
                    font-weight: 600;
                    margin: 10px;
                }
                .name {
                    color: #888;
                }
            }
            .ym-right {
                font-size: 30px;
                color: #888;
            }
        }
        .add-line {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: space-between;
            height: 50px;
            .lf {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                .number {
                    color: #222;
                    font-weight: 600;
                    margin: 10px;
                }
                .name {
                    color: #888;
                }
            }
            .ym-right {
                font-size: 30px;
                color: #888;
            }
        }
    }
    .bt {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 40px;
        margin-top: 50px;
        div {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 200px;
            border-radius: 40px;
            background: #ab1f26;
            color: #fff;
            font-size: 14px;
        }
    }
}
.edit-card-box {
    width: 100%;
    background: #fff;
    height: 100vh;
    .bind-header {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 50px;
        background: #fff;
        font-size: 16px;
        .icon {
            position: absolute;
            left: 10px;
            top: 0;
            line-height: 50px;
            height: 50px;
            width: 50px;
            font-size: 24px;
        }
    }
    .card-form {
        display: flex;
        flex-flow: column nowrap;
        width: 100%;
        font-size: 16px;
        color: #222;
        padding: 15px;
        .tip {
            font-size: 12px;
            margin: 10px 0;
            color: #888;
        }
        .card-input {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            width: 100%;
            height: 50px;
            > div {
                display: flex;
                height: 100%;
                align-items: center;
            }
            .label {
                width: 100px;
            }
            .card-number {
                flex: 1;
                input {
                    width: 90%;
                }
            }
        }
    }
    .form-bt {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 40px;
        margin-top: 50px;
        div {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 200px;
            border-radius: 40px;
            background: #ab1f26;
            color: #fff;
            font-size: 14px;
        }
    }
}
.cashword-box {
    justify-content: center;
    padding: 30px 70px 30px;
    width: 350px;
    border-radius: 4px;
    height: 240px;
    overflow: hidden;
    .icon {
        position: absolute;
        right: 10px;
        top: 0;
        line-height: 43px;
        color: #222;
        font-size: 16px;
        font-weight: 500;
    }
    .title {
        font-size: 16px;
        font-weight: 600;
        color: #222;
        width: 100%;
        margin-bottom: 30px;
        text-align: center;
    }
    .item {
        display: flex;
        justify-content: center;
        border-bottom: 2px solid #bbb;
        height: 40px;
        margin-bottom: 40px;
        input {
            text-align: center;
            font-size: 16px;
        }
    }
    .bt {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 40px;
        margin-top: 50px;
        div {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 200px;
            border-radius: 40px;
            background: #ab1f26;
            color: #fff;
            font-size: 14px;
        }
    }
}
</style>
