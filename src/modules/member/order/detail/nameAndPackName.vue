<template>
    <div>
        <div class="product-warp" @click="goLink()">
            <div class="product-title">
                <div v-if="nameInfo.scenicSpot">{{ nameInfo.scenicSpot }}&nbsp;-&nbsp;</div>
                <div>{{ nameInfo.productName }}</div>
            </div>
            <div class="product-icon"><i class="icon ym-xiangyou"></i></div>
        </div>
        <div v-show="nameInfo.packName" class="spec-warp">{{ nameInfo.packName }}</div>
    </div>
</template>
<script>
export default {
    name: 'Contact',
    props: {
        nameInfo: {
            type: Object,
            default: () => {
                return {
                    packName: '',
                    productName: '未知'
                }
            }
        }
    },
    data() {
        return {}
    },
    methods: {
        goLink() {
            this.$emit('onClick')
        }
    }
}
</script>

<style lang="less" scoped>
.product-warp {
    position: relative;
    display: flex;
    padding: 20px 0 10px;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    .product-title {
        display: flex;
        flex-flow: row wrap;
        font-size: 32px;
        font-weight: bold;
        min-height: 50px;
    }
    .product-icon {
        width: 100px;
        text-align: right;
        i {
            font-size: 40px;
            color: #888;
        }
    }
}
.spec-warp {
    font-size: 26px;
    color: #555;

    padding-bottom: 20px;
}
</style>
