<template>
    <div>
        <div class="ym-header">
            <div class="ym-header-wrap" :style="css">
                <template v-if="$slots.left">
                    <slot name="left"></slot>
                </template>
                <div v-else class="left" @click="goback">
                    <i class="icon ym-left"></i>
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
        <div class="ym-header-placeholder"></div>
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
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="less" scoped>
.ym-header {
    position: fixed;
    top: 0;
    // left: 0;
    height: 50px;
    width: 100%;
    max-width: 375px;
    z-index: 99;

    &-placeholder {
        height: 50px;
        width: 50px;
    }
    &-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        line-height: 50px;
        background-color: #fff;
        .left {
            width: 50px;
            color: #555;
            text-align: center;
            i {
                font-size: 28px;
            }
        }

        .middle {
            font-size: 18px;
            color: #222222;
        }

        .right {
            width: 50px;
            height: 50px;
        }
    }
}
</style>
