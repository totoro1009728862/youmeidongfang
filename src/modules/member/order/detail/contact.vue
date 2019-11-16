<template>
    <!-- 联系人 -->
    <div class="order-contact">
        <div class="order-traveler-title">联系人</div>
        <div class="order-traveler-one">
            <div class="title" :class="{ color333: contactName }">{{ contactName || '联系电话' }}</div>
            <div class="content">{{ contactTel }}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Contact',
    props: {
        contactName: {
            type: String,
            default: ''
        },
        contactTel: {
            type: String,
            default: ''
        }
    },
    data() {
        return {}
    }
}
</script>

<style lang="less" scoped>
.order-contact {
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
        font-size: 28px;
        border-bottom: 2px solid #e6e6e6;
        line-height: 52px;
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
        .color333 {
            color: #333;
        }
    }
}
</style>
