<template>
    <div class="order-info">
        <div class="order-traveler-title">订单信息</div>
        <div class="order-traveler-one">
            <div class="title">订单号</div>
            <div class="content">{{ number }}</div>
        </div>
        <div class="order-traveler-one">
            <div class="title">下单日期</div>
            <div class="content">{{ orderTime }}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'OrderInfo',
    props: {
        number: {
            type: String,
            default: '未知'
        },
        orderTime: {
            type: String,
            default: '未知'
        }
    },
    data() {
        return {}
    }
}
</script>

<style lang="less" scoped>
.order-info {
    padding: 0 30px;
    border-radius: 6px;
    background-color: #ffffff;
    margin-bottom: 20px;
    .order-traveler-title {
        font-size: 34px;
        font-weight: bold;
        padding: 30px 0 0;
        position: relative;
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
