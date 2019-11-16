<template>
    <div v-show="productFeature" class="outline">
        <div class="content-item-title">产品亮点</div>
        <div class="content-item-text" v-html="productFeature"></div>
    </div>
</template>
<script>
export default {
    name: 'HighLight',
    props: {
        productFeature: {
            type: String,
            default: ''
        }
    },
    data() {
        return {}
    },

    methods: {}
}
</script>
<style lang="less" scoped>
.outline {
    width: 100%;
    background: #fff;
    margin-top: 20px;
    padding: 20px;

    .content-item-title {
        margin-top: 30px;
        margin-bottom: 20px;
        text-align: center;
        font-size: 34px;
        font-weight: 600;
    }

    .content-item-text {
        color: #444444;
        font-size: 28px;
        line-height: 50px;
        width: 100%;
        overflow: hidden;
        white-space: pre-line;
        background: #f5f5f5;
        padding: 10px;

        img {
            width: 100%;
        }
    }
}
</style>
