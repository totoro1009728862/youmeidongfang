<template>
    <!-- 门票须知 -->
    <van-popup :value="noticeShow" round position="bottom" class="popup" @click-overlay="close()">
        <div class="title">
            {{ explain.productName }}
            <i class="icon ym-chacha" @click="close()"></i>
        </div>
        <div class="ticket-notes">
            <div class="notes-box">
                <div>
                    <h5>购买说明</h5>
                    <div class="shop-notice">
                        <h6>{{ buyTime(dayAndTime) }}</h6>
                        <p>{{ timeExplain }}</p>
                    </div>
                    <div class="shop-notice">
                        <h6>{{ explain.isChangeTicket ? '换票入园' : '直接入园' }}</h6>
                        <p>{{ explain.entranceMode }}</p>
                    </div>
                    <div class="shop-notice">
                        <h6>{{ explain.refundType === 1 ? '随时退' : explain.refundType === 2 ? '有条件退' : '不可退' }}</h6>
                        <p v-if="explain.refundType === 1" class="refund-text">预订未使用可随时申请退款</p>
                        <p v-else-if="typeSwitch" class="refund-text">{{ explain.scenicTicketRefundRuleDto | ruleText }}</p>
                        <p v-else class="refund-text">产品一经预订不支持退改</p>
                    </div>
                </div>
                <div>
                    <h5>预订须知</h5>
                    <p v-html="transBr(explain.reserveNotice)"></p>
                </div>
                <div v-if="explain.isChangeTicket">
                    <h5>换票说明</h5>
                    <p v-show="explain.changeTicketBeginTime">换票时间:{{ explain.changeTicketBeginTime }}&nbsp;~&nbsp;{{ explain.changeTicketEndTime }}</p>
                    <p v-show="explain.changeTicketAddress">换票地点:{{ explain.changeTicketAddress }}</p>
                    <p>换票说明:{{ explain.changeTicketInfo }}</p>
                </div>
                <div v-if="explain.countLimit || explain.ageLimit">
                    <h5>限制说明</h5>
                    <p v-show="explain.countLimit">购买份数:{{ explain.countLimit }}</p>
                    <p v-show="explain.ageLimit">限制年龄:{{ explain.ageLimit }}</p>
                </div>
                <div v-if="showPrice">
                    <h5>商家信息</h5>
                    <div class="supplier-name">
                        <div>{{ explain.supplierName }}</div>
                        <div class="approve-link" @click="openCompanyApprove">认证资质</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showPrice" class="go-buy">
            <div class="price">
                <span class="new">￥{{ explain.minSalePrice }}</span>
                <span class="old">￥{{ explain.minMarkedPrice }}</span>
            </div>
            <a class="item" :href="`tel:${explain.operatorContactsTel || '0512-65336612'}`">
                <span class="icon ym-dianhua"></span>
                <span>咨询</span>
            </a>
            <div v-show="!preview" class="bt" @click="goPlaceOrder(explain.id)">立即预订</div>
        </div>
    </van-popup>
</template>
<script>
export default {
    name: 'TicketNotes',
    filters: {
        ruleText({ refundLimitationType, refundLimitationDay, refundLimitationHour, refundLimitationMinute, serviceChargeType, serviceCharge, isPartRefund }) {
            const str1 =
                refundLimitationType === 1
                    ? '游玩日期开始前'
                    : refundLimitationType === 2
                    ? '游玩日期截止前'
                    : refundLimitationType === 3
                    ? '游玩日期截止后'
                    : '无限制'
            const dayText = refundLimitationDay === 0 ? '当' : refundLimitationDay
            const mText = refundLimitationMinute === 0 ? '' : refundLimitationMinute + '分'
            const str2 = `${dayText}天${refundLimitationHour}点${mText}后申请退款，`
            const str3 = serviceChargeType === 1 ? '每张票退款需扣手续费' : serviceChargeType === 2 ? '每次票退款需扣手续费' : '无手续费'
            const str4 = isPartRefund ? '，支持部分退' : '，不支持部分退'
            return str1 + str2 + str3 + serviceCharge + '元' + str4
        }
    },
    model: {
        prop: 'noticeShow',
        event: 'change'
    },
    props: {
        noticeShow: {
            type: Boolean,
            default: false
        },
        explain: {
            type: Object,
            default: () => {
                return {
                    qualificationRewardDetailList: [],
                    advanceDay: '',
                    advanceHour: ''
                }
            }
        },
        showPrice: {
            type: Boolean,
            default: true
        },
        routeName: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            timeExplain: '', //可订说明
            preview: false
        }
    },
    computed: {
        dayAndTime() {
            let dateTime = new Date()
            dateTime = dateTime.setDate(dateTime.getDate() + this.explain.advanceDay)
            dateTime = new Date(dateTime)
            return dateTime.toLocaleDateString() + ' ' + this.explain.advanceHour
        },
        typeSwitch() {
            const { refundType, scenicTicketRefundRuleDto } = this.explain
            return refundType && refundType === 2 && scenicTicketRefundRuleDto
        }
    },
    created() {
        const { preview } = this.$route.query
        this.preview = preview ? true : false
    },
    methods: {
        close() {
            this.$emit('change', false)
        },
        // 资质认证跳转 this.explain.qualificationRewardDetailList
        openCompanyApprove() {
            this.close()
            this.$router.push({
                name: this.routeName,
                query: {
                    productId: this.$route.query.productId
                }
            })
        },
        buyTime(time) {
            if (time) {
                const nd = new Date(time) //可订日期
                const now = new Date()
                const t = now.getTime() - nd.getTime() //当前日期减去可订日期的值
                let text = ''
                if (this.explain.advanceDay === 0) {
                    // 可订当日
                    if (t >= 0) {
                        text = `可订明日`
                        this.timeExplain = `当前最早可订明日票，需出行当天的${this.explain.advanceHour}前购买`
                    } else {
                        text = `可订当日`
                        this.timeExplain = `${this.explain.advanceHour}前可订今日票`
                    }
                } else if (this.explain.advanceDay === 1) {
                    text = `可订明日`
                    if (t >= 0) {
                        this.timeExplain = `最早可订${nd.getMonth() + 1}月${nd.getDate()}日票，需出行前1天的${this.explain.advanceHour}前购买`
                    } else {
                        this.timeExplain = `最早可订明日票，需出行前1天的${this.explain.advanceHour}前购买`
                    }
                } else {
                    if (t >= 0) {
                        let dateTime = nd.setDate(nd.getDate() + 1)
                        dateTime = new Date(dateTime)
                        this.timeExplain = `最早可订${dateTime.getMonth() + 1}月${dateTime.getDate()}日票，需出行前${this.explain.advanceDay}天的${
                            this.explain.advanceHour
                        }前购买`
                    } else {
                        this.timeExplain = `最早可订${nd.getMonth() + 1}月${nd.getDate()}日票，需出行前${this.explain.advanceDay}天的${
                            this.explain.advanceHour
                        }前购买`
                    }
                    text = `可订${nd.getMonth() + 1}.${nd.getDate()}`
                }
                return text
            } else {
                return '暂不可订'
            }
        },
        transBr(value) {
            return value ? value.replace(/\n/g, '<br />') : ''
        },
        // 跳转下单页
        goPlaceOrder(id) {
            const { query } = this.$route
            this.$router.push({
                name: 'Book_spotTicket',
                query: {
                    productId: id,
                    introducerId: query.userId || '',
                    spotId: query.productId
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.popup {
    display: flex;
    flex-flow: column nowrap;
    max-height: 70%;

    .title {
        position: relative;
        width: 100%;
        font-size: 32px;
        font-weight: 600;
        padding: 30px;
        top: 0;
        left: 0;

        .icon {
            position: absolute;
            display: block;
            top: 20px;
            right: 30px;
            font-size: 50px;
            color: #555;
            font-weight: 400;
        }
    }

    .ticket-notes {
        position: relative;
        display: flex;
        flex-flow: column nowrap;
        padding: 0 30px;
        height: calc(100% - 100px);
        overflow: auto;
        .notes-box {
            height: auto;

            > div {
                margin-bottom: 30px;
            }
        }

        h5 {
            font-size: 30px;
            font-weight: 600;
            color: #444444;
            margin-bottom: 20px;
        }

        h5::before {
            content: '|';
            width: 4px;
            background: #00b900;
            border-radius: 4px;
            color: #00b900;
            margin-right: 10px;
        }

        .shop-notice {
            position: relative;
            padding-left: 150px;
            margin-bottom: 20px;
            min-height: 40px;

            > h6 {
                position: absolute;
                top: 0;
                left: 10px;
                color: #00b900;
                font-size: 18px;
                border: 2px solid #00b900;
                padding: 2px 6px;
                border-radius: 6px;
            }

            p {
                font-size: 26px;
            }
        }

        p {
            color: #888;
            font-size: 28px;
            line-height: 40px;
        }
    }
}

.go-buy {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 30px;
    height: 120px;
    border-top: 2px solid #e9e9e9;
    .price {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        height: 120px;

        .new {
            color: #ff6138;
            font-size: 38px;
            font-weight: 600;
            padding-right: 20px;
        }

        .old {
            color: #888;
            font-size: 26px;
            font-weight: 500;
            text-decoration: line-through;
        }
    }

    .item {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        margin: 0 30px;
        align-items: center;

        i {
            font-size: 30px;
            color: #888;
        }

        span {
            color: #888;
            font-size: 20px;
        }
    }

    .bt {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
        width: 370px;
        height: 70px;
        background: #00b900;
        text-align: center;
        color: #fff;
        font-size: 34px;
        font-weight: 500;
        border-radius: 40px;
    }
}

.supplier-name {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    > div {
        color: #888;
        font-size: 28px;
        line-height: 40px;
    }

    > div:nth-child(2) {
        color: #00b900;
        width: 200px;
        text-align: right;
    }
}
</style>
