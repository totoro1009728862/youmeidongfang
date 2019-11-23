<template>
    <div class="user-info">
        <div class="head">{{ info.name | getHead }}</div>
        <div class="user-name">
            <div>{{ info.name }}</div>
            <div v-if="info.InviterNumber">邀请人:{{ info.inviteBusinessName }}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'PageList',
    filters: {
        getHead(v) {
            return v ? v.charAt(0) : ''
        }
    },
    props: {
        info: {
            type: Object,
            default: () => {
                return {}
            }
        },
        price: {
            type: [String, Number],
            default: 0
        }
    },
    data() {
        return {}
    }
}
</script>
<style lang="less" scoped>
.user-info {
    position: absolute;
    height: 110px;
    top: 0;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    color: #fff;
    padding: 20px;
    .head {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
        margin-right: 10px;
        border-radius: 50%;
        background: #fff;
        overflow: hidden;
        color: #ab1f26;
        font-size: 30px;
    }
    .user-name {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        font-size: 12px;
        > div {
            line-height: 24px;
        }
        > div:nth-child(1) {
            font-size: 16px;
        }
    }
}
</style>
