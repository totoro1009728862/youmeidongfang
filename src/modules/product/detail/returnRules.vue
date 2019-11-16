<template>
    <div>
        <div v-if="needTitle" class="sub-title">退改规则</div>
        <div class="text">
            <p class="info-item">
                <span>{{ refundCont.type }}</span>
            </p>
            <div v-if="rules.refundType === 1 || rules.refundType == 3" class="info-item">
                <p v-if="isGroupTour" class="description-item">1.用户取消</p>
                <div>{{ refundCont.content }}</div>
            </div>

            <!-- 用户规则 -->
            <div v-if="rules.refundType === 2" class="info-item">
                <p v-if="isGroupTour" class="description-item">1.用户取消</p>
                <p>{{ refundCont.content[0] }}</p>
                <table class="tour-table">
                    <tbody>
                        <tr v-for="(item, index) in refundCont.refundRuleDtoList" :key="index">
                            <td>{{ item.beforeTravelDay | showTravelDay }}</td>
                            <td>手续费{{ item.refundRate }}%</td>
                        </tr>
                    </tbody>
                </table>
                <p v-if="refundCont.customerRemark" class="info-item" v-html="transBr(refundCont.customerRemark)"></p>
                <!-- 直通车商家规则 -->
                <p v-if="!isGroupTour" class="info-item">{{ refundCont.content[1] }}</p>
                <p class="info-item">{{ refundCont.companyContent }}</p>
            </div>
            <!-- 商家规则 -->
            <div v-if="isGroupTour" class="info-item">
                <p class="description-item">2.商家取消</p>
                <p>供应商在规定时间内违约，除退还全额旅游费用外，另支付违约金比例如下：</p>
                <table class="tour-table">
                    <tbody>
                        <tr v-for="(item, index) in refundCont.supplierRefundRuleDtoList" :key="index">
                            <td>{{ item.beforeTravelDay | showTravelDay }}</td>
                            <td>手续费{{ item.refundRate }}%</td>
                        </tr>
                    </tbody>
                </table>
                <p v-if="refundCont.supplierRemark" class="info-item" v-html="transBr(refundCont.supplierRemark)"></p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ReturnRules',
    filters: {
        showTravelDay(v) {
            return v === '0-0' ? '当天' : v.indexOf('31') > -1 ? '30日以上' : v.indexOf('-') > -1 ? v + '日' : v
        }
    },
    props: {
        rules: {
            type: Object,
            default: () => {
                return {}
            }
        },
        needTitle: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {}
    },
    computed: {
        refundCont() {
            const { refundType, refundRuleDtoList, supplierRefundRuleDtoList, customerRemark, supplierRemark } = this.rules
            let value = {}
            switch (refundType) {
                case 1:
                    value = {
                        type: '随时退',
                        content: '未使用可随时申请退款。',
                        supplierRefundRuleDtoList: supplierRefundRuleDtoList || [],
                        supplierRemark: supplierRemark || ''
                    }
                    break
                case 2:
                    value = {
                        type: '有条件退',
                        content: ['顾客在行程前申请取消订单 ，必要的费用扣除标准为：', '如需改期，请申请取消后重新预订。'],
                        companyContent: '供应商取消行程，除退还全额费用外，将按同时段用户取消手续费比例进行赔付（不可抗因素除外）',
                        refundRuleDtoList,
                        supplierRefundRuleDtoList: supplierRefundRuleDtoList || [],
                        customerRemark: customerRemark || '',
                        supplierRemark: supplierRemark || ''
                    }
                    break
                case 3:
                    value = {
                        type: '不可退',
                        content: '该产品一经预订成功，不支持退改，敬请谅解。',
                        supplierRefundRuleDtoList: supplierRefundRuleDtoList || [],
                        supplierRemark: supplierRemark || ''
                    }
                    break
                default:
                    break
            }
            return value
        },
        isGroupTour() {
            return this.rules.supplierRefundRuleDtoList ? true : false
        }
    },
    methods: {
        transBr(value) {
            return value ? value.replace(/\n/g, '<br />') : ''
        }
    }
}
</script>
<style lang="less" scoped>
.sub-title {
    font-size: 28px;
    color: #444;
    position: relative;
    height: 50px;
    line-height: 50px;
    font-weight: 600;
}

.text {
    color: #444444;
    font-size: 28px;
    line-height: 50px;
    width: 100%;
    overflow: hidden;

    .info-item {
        color: #555;
        font-size: 26px;
        line-height: 50px;
        .description-item {
            font-weight: 500;
            color: #555;
        }
        span {
            color: #444;
            background: #f5f5f5;
            padding: 6px 16px;
            font-size: 22px;
            border-radius: 28px;
        }
    }

    .tour-table {
        width: 100%;
        table-layout: fixed;
        margin: 12px 0 15px;
        border-collapse: collapse;
        border-spacing: 0;

        tr {
            width: 100%;
        }

        td {
            border: 2px solid #e2e2e2;
            text-align: center;
            vertical-align: middle;
            padding: 3px 5px;
            font-size: 26px;
            padding: 10px;

            &:first-child {
                background-color: #f5f5f5;
                width: 35%;
            }
        }
    }
}
</style>
