<template>
    <div v-show="orderStatus !== 999" class="order-button">
        <div class="order-button-warp">
            <div v-show="canRefund" class="order-button-item w180" @click="btClick('refundPrice')">申请退款</div>
            <div v-show="orderStatus === 0" class="order-button-item w180" @click="btClick('cancelOrderApi')">取消订单</div>
            <div v-show="orderStatus === 0" class="order-button-item order-button-item-bg" @click="btClick('goPay')">立即支付</div>
            <div v-show="orderStatus !== 0" class="order-button-item order-button-item-bg" @click="btClick('goDetail')">再次预订</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'OrderButton',
    props: {
        orderStatus: {
            type: Number,
            default: 999
        },
        canRefund: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {}
    },
    methods: {
        btClick(v) {
            this.$emit('btClick', v)
        }
    }
}
</script>

<style lang="less" scoped>
.order-button {
    height: 110px;
    .order-button-warp {
        border-top: 2px solid #e6e6e6;
        background-color: #ffffff;
        height: 110px;
        width: 100%;
        max-width: 750px;
        position: fixed;
        // left: 0;
        bottom: 0;
        padding: 15px;
        display: flex;
        z-index: 2000;
        > div {
            font-size: 32px;
        }
        .order-button-item {
            background: rgba(250, 250, 250, 1);
            border-radius: 40px;
            border: 2px solid rgba(230, 230, 230, 1);
            height: 80px;
            line-height: 80px;
            text-align: center;
            margin: 0 10px;
        }
        .order-button-item-bg {
            flex: 1;
            border: none !important;
            background: #00b900;
            border-radius: 40px;
            color: #ffffff;
            font-weight: 500;
        }
        .w180 {
            width: 180px;
            color: #b1afaf;
        }
    }
}
</style>
