<template lang="html">
    <div v-if="loading" class="loading-page">
        <img class="londing-warp-img" src="http://oss.hxtrip.com/common/mobile/londing_min.gif" alt="" />
    </div>
</template>

<script>
export default {
    data: () => ({
        loading: false
    }),
    methods: {
        start() {
            this.loading = true
        },
        finish() {
            this.loading = false
        }
    }
}
</script>

<style lang="less" scoped>
.loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.7);
    text-align: center;
    padding-top: 200px;
    font-size: 30px;
    font-family: sans-serif;
    z-index: 9;
    img {
        opacity: 0.7;
    }
}
</style>
