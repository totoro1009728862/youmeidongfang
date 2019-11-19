<template>
    <div class="user-info">
        <div class="head">
            <img :src="info.img" alt="用户头像" />
        </div>
        <div class="user-name">
            <div>{{ info.userName }}</div>
            <div v-if="info.InviterNumber">邀请人:{{ info.InviterNumber }}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'PageList',
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
        width: 60px;
        height: 60px;
        margin-right: 10px;
        border-radius: 50%;
        overflow: hidden;
        img {
            display: block;
            height: 100%;
            width: 100%;
        }
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
