<template>
    <div class="mine">
        <background></background>
        <!-- 用户信息 -->
        <user-info :info="userInfo"></user-info>
        <div class="mine-box">
            <div class="price-info">
                <div class="price-v">{{ price }}</div>
                <div class="price-t">{{ priceText }}</div>
                <div v-if="userType === 2" class="show-macs" @click="showMacs = !showMacs">
                    <div class="icon" :class="{ 'ym-down': !showMacs, 'ym-up': showMacs }"></div>
                </div>
                <!-- 机器列表 -->
                <div v-if="userType === 2 && macsArr && macsArr.length">
                    <macs-list v-show="showMacs" :macs-arr="macsArr"></macs-list>
                </div>
            </div>
            <!-- 导航 -->
            <page-list :id="userInfo.businessType" :user-type="userType" :price="price"></page-list>
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
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'Mine',
    middleware: 'checkLogin',
    components: {
        Background,
        UserInfo,
        MacsList,
        PageList
    },
    data() {
        return {
            userType: 1, // 1代理2门店
            macsArr: [],
            price: '0',
            priceText: '',
            showMacs: false
        }
    },
    computed: {
        ...mapGetters(['userInfo'])
    },
    created() {
        this.getUserInfo()
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
        ...mapActions(['set_userInfo']),
        async getUserInfo() {
            const {
                userInfo,
                $api: { member }
            } = this
            this.userType = userInfo.userType || 1
            this.priceText = this.userType === 1 ? '推广仪器累计佣金' : '已拥有机器数'
            let params = {
                operation: 0,
                userId: userInfo.userId
            }
            const { data } = this.userType === 1 ? await member.mine.myPerformance(params) : await member.mine.myDeviceNum(params)
            this.price = data.price || data.totalNum || 0
        },
        clearToken() {
            this.$cookies.removeAll()
            this.set_userInfo({})
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
