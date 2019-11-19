<template>
    <div class="mine">
        <background></background>
        <!-- 用户信息 -->
        <user-info :info="userInfo"></user-info>
        <div class="mine-box">
            <div class="price-info">
                <div class="price-v">{{ price }}</div>
                <div class="price-t">{{ priceText }}</div>
                <div v-if="!system" class="show-macs" @click="showMacs = !showMacs">
                    <div class="icon" :class="{ 'ym-down': !showMacs, 'ym-up': showMacs }"></div>
                </div>
                <!-- 机器列表 -->
                <div v-if="!system && macsArr && macsArr.length">
                    <macs-list v-show="showMacs" :macs-arr="macsArr"></macs-list>
                </div>
            </div>
            <!-- 导航 -->
            <page-list :system="system" :price="price"></page-list>
            <div class="bt">
                <div @click="clearToken">退出登录</div>
            </div>
        </div>
    </div>
</template>
<script>
import Background from '~/modules/assist/background'
import UserInfo from './userInfo'
import MacsList from './macsList'
import PageList from './pageList'
export default {
    name: 'Mine',
    components: {
        Background,
        UserInfo,
        MacsList,
        PageList
    },
    data() {
        return {
            system: 0, // 系统0位店家
            userInfo: {
                userName: '',
                img: ''
            },
            macsArr: [],
            price: '0',
            priceText: '',
            showMacs: false
        }
    },
    async asyncData() {
        const system = 0
        return {
            userInfo: {
                img: 'http://b-ssl.duitang.com/uploads/item/201812/28/20181228170011_yhmnc.jpg',
                userName: '隔壁老王',
                InviterNumber: '13451977774'
            },
            system,
            price: system ? '￥28,888.00' : '3',
            priceText: system ? '推广仪器累计佣金' : '已拥有机器数'
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
    min-height: 100vh;
    background: #fff;
}

.mine-box {
    position: relative;
    width: 100%;
    top: -45px;
    background: #fff;
    padding: 0 20px 30px;
    border-radius: 5px;
    .price-info {
        padding: 44px 0 32px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        width: 100%;
        left: 20px;
        box-shadow: 0px 2px 8px 0px rgba(227, 227, 227, 1);
        border: 1px solid rgba(255, 255, 255, 0);
        border-radius: 5px;

        > div {
            display: flex;
            justify-content: center;
        }
        .price-v {
            font-size: 24px;
            color: #ab1f26;
        }
        .price-t {
            margin-top: 20px;
            font-size: 14px;
            color: #222;
        }
        .show-macs {
            padding: 10px;
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
