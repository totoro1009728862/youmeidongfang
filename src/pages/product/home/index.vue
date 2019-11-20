<template>
    <div class="home">
        <background>
            <div class="logo">ANMOYI</div>
        </background>

        <div class="home-box">
            <div class="pick-info">
                <div class="shop-info">
                    <div>{{ shopName }}</div>
                    <div>机器编号：{{ macNumber }}</div>
                </div>
            </div>
            <div class="pick">
                <div class="title">
                    <span>购买使用次数</span>
                    <span>(只限当前门店使用)</span>
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
    name: 'Home',
    components: {
        Background
    },
    data() {
        return {
            system: 0, // 系统0位店家
            picks: [], // 套餐
            macNumber: '', // 机器型号
            shopName: '', // 门点名称
            surplus: 90 // 剩余次数
        }
    },
    async asyncData() {
        const system = 0
        return {
            system,
            macNumber: 'SJ03202',
            shopName: '苏州SEE SKIN友福梅克'
        }
    },
    created() {
        this.picks = [
            { name: '单次', price: 49, count: 1 },
            { name: '套餐一', price: 1998, count: 50 },
            { name: '套餐二', price: 2998, count: 100 },
            { name: '套餐三', price: 3998, count: 200 }
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
.home {
    min-height: 100vh;
    background: #fff;
    .logo {
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: center;
        font-size: 40px;
        top: 30px;
        font-weight: 600;
        color: #fff;
    }
}

.home-box {
    position: relative;
    width: 100%;
    top: -40px;
    background: #fff;
    padding: 0 20px 30px;
    border-radius: 5px;
    height: calc(100vh - 35px);
    .pick-info {
        display: flex;
        flex-flow: column nowrap;
        padding: 30px 0 20px;
        .shop-info {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            color: #888;
            font-size: 14px;
        }
    }
    .pick {
        display: flex;
        flex-flow: column nowrap;
        .title {
            font-size: 12px;
            color: #888;
            span:nth-child(1) {
                font-size: 14px;
                color: #222;
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
