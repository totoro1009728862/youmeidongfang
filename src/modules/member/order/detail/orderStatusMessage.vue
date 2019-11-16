<template>
    <div v-if="orderStatus" class="status-warp">
        <div class="status-top">
            <div class="status-top-left">
                <i class="hx-icon" :class="orderStatus.icon"></i>
                <span>{{ orderStatus.name }}</span>
            </div>
            <div class="status-top-right" @click="showPopupFunc">
                金额：
                <span class="big-size">
                    <i>¥</i>
                    {{ orderDetail.payPrice }}
                </span>
                <i v-if="orderDetail.productType != 41" class="hx-icon hx-icon-guanyuwomen"></i>
            </div>
        </div>
        <div v-show="orderStatus.messsage" class="status-message">{{ orderStatus.messsage }}</div>
        <div v-show="[4, 5].includes(orderDetail.orderStatus)" class="refund-detail">
            <div>退款进度：{{ orderStatus.name }}</div>
            <div @click="goTicketRegressionDetail()">
                <div>查看详情</div>
                <span class="hx-icon hx-icon-xiangyou"></span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'OrderStatusMessage',
    props: {
        payLeftTime: {
            type: Number,
            default: 0
        },
        refundLink: {
            type: Array,
            default: () => {
                return []
            }
        },
        orderType: {
            type: String,
            default: ''
        },
        orderNo: {
            type: String,
            default: ''
        },
        orderDetail: {
            type: Object,
            default: () => {}
        }
    },

    data() {
        return {
            orderStatusMessage: [
                {
                    name: '已取消',
                    value: -1,
                    icon: 'hx-icon-yiquxiao',
                    messsage: ''
                },
                {
                    name: '待支付',
                    value: 0,
                    icon: 'hx-icon-daifukuancu',
                    messsage: ''
                },
                {
                    name: '待出行',
                    value: 1,
                    icon: 'hx-icon-daichuhangcu',
                    messsage: '请关注短信通知，出行当天按时到站点候车。'
                },
                {
                    name: '出行中',
                    value: 2,
                    icon: '',
                    messsage: ''
                },
                {
                    name: '已完成',
                    value: 3,
                    icon: 'hx-icon-yiwancheng',
                    messsage: ''
                },
                {
                    name: '退款中',
                    value: 4,
                    icon: 'hx-icon-tuikuanzhong',
                    messsage: '预计1-3个工作日原路退回到您所支付的账户中。'
                },
                {
                    name: '已退款',
                    value: 5,
                    icon: 'hx-icon-tuikuanzhong',
                    messsage: ''
                },
                {
                    name: '商家确认中',
                    value: 6,
                    icon: 'hx-icon-querenzhong',
                    messsage: '已通知商家确认您的订单，确认后会短信或电话告知您，请耐心等待！'
                },
                {
                    name: '出票中',
                    value: 7,
                    icon: 'hx-icon-chupiaozhong',
                    messsage: '商家出票中，请您留意出票短信。'
                }
            ],
            timeSetInterval: null //定时器
        }
    },
    computed: {
        orderStatus() {
            return this.orderStatusMessage[this.orderDetail.orderStatus + 1]
        }
    },
    watch: {
        payLeftTime() {
            if (this.payLeftTime && this.orderDetail.orderStatus === 0) {
                // 当前事件戳-下单时间戳转分钟
                let now = new Date().getTime()
                let t
                if (this.orderType) {
                    let m = 1000 * 60 * 30 //30分钟
                    t = m + this.payLeftTime - now //剩余时间
                } else {
                    t = this.payLeftTime - now //剩余时间
                }
                let mm = Math.round(t / 60000)
                if (t > 0) {
                    this.orderStatusMessage[1].messsage = `剩余支付时间：${mm === 0 ? '<1' : mm}分钟，请尽快支付，超时订单将自动取消。`
                    this.timeSetInterval = window.setInterval(() => {
                        mm--
                        if (mm <= 0) {
                            this.orderStatusMessage[1].messsage = ''
                            this.timeSetInterval = clearInterval(this.timeSetInterval)
                            this.$emit('timeOut')
                        } else {
                            this.orderStatusMessage[1].messsage = `剩余支付时间：${mm === 0 ? '<1' : mm}分钟，请尽快支付，超时订单将自动取消。`
                        }
                    }, 60000)
                }
            }
        }
    },
    methods: {
        showPopupFunc() {
            this.$emit('showPopupFunc', true)
        },
        // 跳转退款详情页
        goTicketRegressionDetail() {
            let { number, productType } = this.orderDetail
            this.$router.push({ name: 'RefundDetail', query: { orderNo: number, productType } })
        }
    }
}
</script>

<style lang="less" scoped>
.status-warp {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    background: #00b900;
    width: 100%;
    padding: 34px 20px 16px;
    color: #fff;
    min-height: 80px !important;
    .refund-detail {
        height: 80px;
        padding: 0 24px;
        background: #c4eca0;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        margin-top: 30px;
        border-radius: 4px;

        > div {
            font-size: 28px;
            display: flex;
            align-items: center;
            height: 80px;
        }

        > div:nth-child(2) {
            color: #00b900;

            > div {
                display: flex;
            }

            span {
                display: inline-block;
                position: relative;
                top: 2px;
                font-size: 40px;
            }
        }

        > div:nth-child(1) {
            color: #222;
        }
    }

    .status-top {
        width: 100%;
        height: 50px;
        display: flex;
        line-height: 50px;
        padding: 0 30px;
    }

    .status-top-left,
    .status-top-right {
        flex: 1;
        display: flex;
        justify-items: center;
    }

    .status-top-left {
        color: #fff;

        i {
            font-size: 36px;
            margin-right: 10px;
        }

        span {
            font-size: 32px;
            font-weight: bold;
        }
    }

    .status-top-right {
        font-size: 26px;
        display: flex;
        justify-content: flex-end;

        .big-size {
            font-size: 36px;
            padding-right: 10px;
            padding-left: 5px;
            font-weight: 600;
            color: #fff;

            i {
                font-size: 26px;
            }
        }

        > i {
            font-size: 26px;
            opacity: 0.8;
            color: #fff;
        }
    }

    .status-message {
        font-size: 24px;
        margin-top: 5px;
        opacity: 0.9;
        padding-left: 30px;
    }
}
</style>
