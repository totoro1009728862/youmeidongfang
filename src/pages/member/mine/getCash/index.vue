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
            </div>
            <div class="bt">
                <div @click="clearToken">退出登录</div>
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
    data() {
        return {
            system: 0, // 系统0位店家
            price: '', // 可提现收益
            showMacs: false
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
        this.macsArr = [
            { number: 'SJ04011', price: 260, count: 27 },
            { number: 'SJ04011', price: 260, count: 27 },
            { number: 'SJ04011', price: 260, count: 27 },
            { number: 'SJ04011', price: 260, count: 27 },
            { number: 'SJ04011', price: 260, count: 27 },
            { number: 'SJ04011', price: 260, count: 27 }
        ]
    },
    methods: {
        clearToken() {
            this.$cookies.remove('userToken')
            this.$cookies.removeAll()
            this.$router.replace({ name: 'Login' })
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
        .title {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            height: 60px;
            font-weight: 600;
            .icon {
                font-size: 24px;
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
