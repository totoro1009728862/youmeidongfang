<template>
    <!-- 联系人 -->
    <div v-show="orderStatus === 3 || orderStatus === 2" class="order-invoice">
        <div class="order-traveler-title">
            申请发票
            <a class="phone-icon" :href="`tel:${supplierContactsTel}`"><i class="icon ym-dianhua"></i></a>
        </div>
        <div class="order-traveler-one">发票由中道旅游发展有限公司开具</div>
    </div>
</template>
<script>
export default {
    name: 'Invoice',
    props: {
        orderStatus: {
            type: [String, Number],
            default: ''
        },
        supplierContactsTel: {
            type: String,
            default: '0512-65336612'
        }
    },
    data() {
        return {}
    }
}
</script>

<style lang="less" scoped>
.order-invoice {
    padding: 0 20px;
    border-radius: 6px;
    background-color: #ffffff;
    margin-bottom: 20px;
    .order-traveler-title {
        font-size: 34px;
        font-weight: bold;
        padding: 30px 0 0;
        position: relative;
        .phone-icon {
            position: absolute;
            padding: 30px;
            top: 0;
            right: 0;
            text-align: center;
            i {
                color: #00b900;
                font-size: 34px;
            }
        }
    }
    .order-traveler-one {
        padding: 20px 0;
        display: flex;
        border-bottom: 2px solid #e6e6e6;
        line-height: 52px;
        font-size: 28px;
        &:last-child {
            border-bottom: none;
        }
        .title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 160px;
            flex: 0 160px;
            color: #888;
            padding-right: 5px;
        }
    }
}
</style>
