<template>
    <div class="mine">
        <background></background>
        <div class="header-info">
            <div class="log">提现明细</div>
            <div class="price">{{ price }}</div>
            <div class="txt">{{ system ? '可提现佣金' : '可提现收益' }}</div>
        </div>
        <div class="mine-box">
            <div class="cash-price"></div>
            <div class="card-box">
                <div class="title">
                    <div>提现至银行卡</div>
                    <div class="icon ym-card"></div>
                </div>
                <div v-if="cards && cards.length">
                    <div v-for="(item, index) in cards" :key="index" class="card" @click="selectCard = item">
                        <div class="lf">
                            <div class="icon" :class="{ 'ym-radio': item.id !== selectCard.id, 'ym-radio-checked': item.id === selectCard.id }"></div>
                            <div class="number">{{ item.number | hideNumber }}</div>
                            <div class="name">{{ item.name }}</div>
                        </div>
                        <div v-if="false" class="icon ym-right"></div>
                    </div>
                    <div class="add-line" @click="addCard">
                        <div class="lf">
                            <div class="icon ym-add"></div>
                            <div class="number">添加新的银行卡</div>
                        </div>
                        <div class="icon ym-right"></div>
                    </div>
                </div>
            </div>
            <div class="bt">
                <div @click="submitForm">确定</div>
            </div>
        </div>
    </div>
</template>
<script>
import Background from '~/modules/assist/background'
export default {
    name: 'Mine',
    components: {
        Background
    },
    filters: {
        hideNumber(v) {
            if (!v) {
                return ''
            } else {
                return v.substring(0, 4) + '**********' + v.substring(v.length - 4, v.length)
            }
        }
    },
    data() {
        return {
            system: 0, // 系统0位店家
            price: '', // 可提现收益
            cashPrice: '', // 用户输入的提现金额
            cards: [], // 卡信息
            selectCard: {} // 选择银行卡
        }
    },
    async asyncData() {
        const system = 0
        return {
            system,
            price: '￥28,888.00'
        }
    },
    created() {
        this.cards = [
            { number: '234235345456454', id: 1, name: '招商银行' },
            { number: '999999999999999', id: 2, name: '浦发银行' }
        ]
    },
    methods: {
        submitForm() {
            const { price, system, selectCard, cashPrice } = this
            let params = {
                system,
                price,
                cashPrice,
                ...selectCard
            }
            console.log(params)
        },
        addCard() {}
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
    top: 0;
    left: 0;
    width: 100%;
    height: 140px;
    color: #fff;
    .log {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        width: 100%;
        padding: 10px 20px;
        div {
            font-size: 14px;
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
    }
    .txt {
        font-size: 14px;
    }
}
.mine-box {
    position: relative;
    width: 100%;
    top: -35px;
    background: #fff;
    padding: 0 20px 30px;
    border-radius: 5px;
    .cash-price {
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
            .icon {
                font-size: 24px;
                color: #ab1f26;
            }
            .ym-radio {
                color: #888;
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
