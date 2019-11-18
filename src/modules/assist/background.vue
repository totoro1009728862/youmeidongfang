<template>
    <div class="cont">
        <img src="../../assets/image/login-bg.png" alt="背景图" />
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'Background',

    data() {
        return {}
    }
}
</script>
<style lang="less" scoped>
.cont {
    position: relative;
    height: 150px;
    width: 100%;
    img {
        display: block;
        margin: 0 auto;
        height: 100%;
        width: 100%;
    }
}
</style>
