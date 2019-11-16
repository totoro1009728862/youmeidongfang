<template>
    <div>
        <div class="hx-header">
            <div class="hx-header-wrap" :style="css">
                <template v-if="$slots.left">
                    <slot name="left"></slot>
                </template>
                <div v-else class="left" @click="goback">
                    <i class="hx-icon hx-icon-fanhui"></i>
                </div>
                <template v-if="$slots.middle">
                    <slot name="middle"></slot>
                </template>
                <div v-else class="middle">{{ title }}</div>
                <template v-if="$slots.right">
                    <slot name="right"></slot>
                </template>
                <div v-else class="right"></div>
            </div>
        </div>
        <div class="hx-header-placeholder"></div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        css: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        goback() {
            this.$router.back()
        }
    }
}
</script>

<style lang="less" scoped>
.hx-header {
    position: fixed;
    top: 0;
    // left: 0;
    height: 100px;
    width: 100%;
    max-width: 750px;
    z-index: 99;

    &-placeholder {
        height: 100px;
        width: 100px;
    }
    &-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100px;
        line-height: 100px;
        background-color: #fff;
        .left {
            font-size: 50px;
            width: 100px;
            color: #555;
            text-align: center;
        }

        .middle {
            font-size: 36px;
            color: #222222;
        }

        .right {
            width: 100px;
            height: 100px;
        }
    }
}
</style>
