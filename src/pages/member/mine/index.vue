<template>
    <div class="mine">
        <background></background>
        <!-- 用户信息 -->
        <user-info :info="userInfo"></user-info>
        <div class="mine-box">
            <div class="price-info">
                <div v-if="userType === 1" class="val-dom price-box">
                    <div>
                        <div class="price-v">{{ brokeragePrice }}</div>
                        <div>推广累计佣金</div>
                    </div>
                    <div>
                        <div class="price-v">{{ price }}</div>
                        <div>仪器累计分润</div>
                    </div>
                </div>
                <div v-else class="val-dom">{{ totalNum }}</div>
                <div v-if="userType === 2" class="macs-dom">
                    <div class="price-t">已拥有机器数</div>
                    <div class="show-macs" @click="showMacs = !showMacs">
                        <div class="icon" :class="{ 'ym-down': !showMacs, 'ym-up': showMacs }"></div>
                    </div>
                    <!-- 机器列表 -->
                    <div v-if="macsArr && macsArr.length">
                        <macs-list v-show="showMacs" :macs-arr="macsArr"></macs-list>
                    </div>
                </div>
            </div>
            <!-- 导航 -->
            <page-list :user-type="userType" :price="price" :total-num="totalNum"></page-list>
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
            userType: 0, // 1代理2门店
            macsArr: [],
            price: '0',
            brokeragePrice: '0',
            priceText: '',
            showMacs: false,
            totalNum: 0 // 机器数量
        }
    },
    computed: {
        ...mapGetters(['userInfo'])
    },
    created() {
        this.getUserInfo()
    },
    mounted() {
        this.getMyDeviceList()
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
                userId: userInfo.userId
            }
            const { data } = await member.mine.myPerformance(Object.assign(params, { operation: 0 }))
            this.price = data.price
            this.brokeragePrice = data.brokeragePrice
            // 机器数量
            if (this.userType == 2) {
                const { code, data } = await member.mine.myDeviceNum(params)
                if (code && code === 200) {
                    this.totalNum = data.totalNum
                }
            }
        },
        async getMyDeviceList() {
            const {
                userInfo,
                userType,
                $api: { member }
            } = this
            // 如果不为门店则不调该接口
            if (userType === 1) return
            let params = {
                page: 1,
                rows: 6,
                userId: userInfo.userId
            }
            const { data } = await member.mine.myDeviceList(params)
            this.macsArr = data.list
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

        .val-dom {
            display: flex;
            justify-content: center;
            font-size: 24px;
            color: #ab1f26;
        }
        .price-box {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            font-size: 12px;
            color: #222;
            > div {
                width: 50%;
                display: flex;
                flex-flow: column nowrap;
                justify-content: center;
                align-items: center;
                padding: 10px 0;
            }
            > div:nth-child(1) {
                border-right: 2px solid #ededed;
            }
            .price-v {
                color: #ab1f26;
                font-weight: 600;
                font-size: 16px;
                margin-bottom: 15px;
                &::before {
                    content: '￥';
                    padding-right: 5px;
                }
                &::after {
                    content: '元';
                }
            }
        }
        .macs-dom {
            display: block;
            width: 100%;
            padding: 0 30px;
            margin: 0 auto;
            .price-t {
                text-align: center;
                margin-top: 20px;
                font-size: 14px;
                color: #222;
            }
            .show-macs {
                padding: 10px;
                .icon {
                    text-align: center;
                }
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
