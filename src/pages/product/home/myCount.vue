<template>
    <div class="count-box">
        <ym-header title="倒计时"></ym-header>
        <background></background>
        <div class="time-box">
            <div class="time">{{ surplusTime | setTime }}</div>
            <div class="begin-bt">
                <div :class="{ 'no-click': approveStatus === 3 }" @click="startDeviceFunc">{{ approveStatus === 3 ? '使用中' : '开始使用' }}</div>
            </div>
            <div class="tip">*实际运行时间以机器为准</div>
            <div class="count-info">
                <div>
                    <div class="ct">{{ surplusNum }}</div>
                    <div>剩余次数</div>
                </div>
                <div>
                    <div class="ct">{{ userNum }}</div>
                    <div>使用次数</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Background from '~/modules/assist/background'
export default {
    name: 'MyCount',
    components: {
        Background
    },
    filters: {
        setTime(v) {
            let mm = 15
            let ss = '0'
            if (v) {
                mm = parseInt(v / 60)
                ss = v % 60
            }
            return `${mm < 10 ? '0' + mm : mm.toString()}:${ss < 10 ? '0' + ss : ss.toString()}`
        }
    },
    data() {
        return {
            userNum: 0,
            surplusNum: 0,
            surplusTime: 900,
            approveStatus: 3,
            timeInt: ''
        }
    },
    watch: {
        surplusTime() {
            if (this.surplusTime <= 0) {
                clearInterval(this.timeInt)
            }
        }
    },
    async asyncData({ app, query }) {
        const params = {
            deviceId: query.deviceId,
            userId: query.userId
        }
        const {
            $api: { product }
        } = app
        const { code, data } = await product.myUserNum(params)
        if (code === 200) {
            return {
                ...data,
                deviceId: query.deviceId,
                userId: query.userId
            }
        }
        return {}
    },
    mounted() {
        if (this.approveStatus !== 3) this.startDevice()
    },
    methods: {
        startDeviceFunc() {
            if (this.approveStatus === 3) {
                this.$Toast('仪器正在运转中')
            } else {
                this.startDevice()
            }
        },
        async startDevice() {
            const {
                $api: { product },
                deviceId,
                userId
            } = this
            const params = {
                deviceId,
                userId
            }
            const { code, data } = await product.startDevice(params)
            if (code === 200) {
                Object.assign(this, data)

                if (data.surplusTime) {
                    this.timeInt = setInterval(() => {
                        this.surplusTime--
                    }, 1000)
                } else {
                    clearInterval(this.timeInt)
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>
.count-box {
    min-height: 100vh;
    background: #fff;
}

.time-box {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    top: -45px;
    background: #fff;
    padding: 0 20px 30px;
    border-radius: 5px;
    .tip {
        margin-top: 10px;
        color: #888;
        font-size: 12px;
    }
    .time {
        position: relative;
        top: -70px;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 140px;
        height: 140px;
        border-radius: 50%;
        color: rgba(171, 31, 38, 1);
        font-size: 24px;
        box-shadow: 0px 2px 6px 0px rgba(255, 219, 221, 1);
    }
    .begin-bt {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        > div {
            height: 40px;
            width: 120px;
            line-height: 40px;
            background: #ab1f26;
            color: #fff;
            font-size: 14px;
            text-align: center;
            border-radius: 20px;
        }
    }
    .count-info {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        margin-top: 40px;
        width: 100%;
        font-size: 14px;
        > div {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            .cts {
                color: #ab1f26;
                font-size: 20px;
            }
        }
    }
}
</style>
