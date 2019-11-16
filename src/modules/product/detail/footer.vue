<template>
    <div class="product-footer">
        <div class="footer">
            <a class="item" :href="tel">
                <p>
                    <span class="hx-icon hx-icon-dianhua"></span>
                </p>
                <p>咨询</p>
            </a>
            <div class="item" @click="saveCollection">
                <p>
                    <span class="hx-icon" :class="{ 'hx-icon-yishoucang': collection, 'hx-icon-shoucang': !collection }"></span>
                </p>
                <p>收藏</p>
            </div>
            <div class="right">
                <div class="buttom" @click="openOrder">
                    <div>立即预订</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ProductFooter',
    props: {
        tel: {
            type: String,
            default: ''
        },
        collection: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {}
    },
    methods: {
        openOrder() {
            this.$emit('open-order')
        },
        saveCollection() {
            this.$emit('save-collection')
        }
    }
}
</script>
<style lang="less" scoped>
.product-footer {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 110px;
    width: 100%;
    z-index: 99;
    .footer {
        display: flex;
        margin: 0 auto;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        width: 100%;
        max-width: 750px;
        height: 110px;
        padding: 0 20px;
        background-color: #ffffff;
        border-top: 2px solid #e5e5e5;
    }

    .item {
        position: relative;
        display: flex;
        flex: 1;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 110px;

        color: #808080;

        p {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            color: #808080;
            font-size: 22px;

            span {
                color: #999;
                font-size: 36px;
            }
        }

        .hx-icon-yishoucang {
            color: #ff6138;
        }
    }

    .is-collection {
        color: #ff6138;

        i {
            color: #ff6138;
            font-size: 36px;
        }
    }

    .right {
        width: 480px;
        margin-left: 20px;

        .buttom {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 80px;
            width: 100%;
            background-color: #00b900;
            color: #ffffff;
            border-radius: 40px;
            border: none;

            div {
                font-size: 34px;
            }
        }
    }
}
</style>
