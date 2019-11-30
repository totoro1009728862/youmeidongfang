<template>
    <div class="tabs">
        <div v-for="(item, index) in tabs" :key="index" @click="changeTab(index)">
            <div :class="{ actived: tabIndex === index }">{{ item }}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Tabs',
    model: {
        prop: 'tabIndex',
        event: 'change'
    },

    props: {
        tabIndex: {
            type: Number,
            default: 0
        },
        tabs: {
            type: Array,
            default: () => {
                return ['合伙人', '服务商', '店家']
            }
        }
    },
    methods: {
        changeTab(index) {
            this.$emit('change', index)
        }
    }
}
</script>
<style lang="less" scoped>
.tabs {
    display: flex;
    width: 100%;
    flex-flow: row nowrap;
    justify-content: space-around;
    div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90px;
        height: 30px;
        overflow: hidden;
        color: #222;
        font-size: 14px;
        border-radius: 15px;
    }
    .actived {
        background: #ab1f26;
        color: #fff;
    }
}
</style>
