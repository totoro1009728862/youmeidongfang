<template>
    <div class="layout">
        <nuxt></nuxt>
    </div>
</template>

<script>
export default {
    beforeMount() {
        // 在这里种cookie可以本地模拟登陆状态
        // this.$cookies.set('userToken', '449737205ce54e5a9445c6d8ba1bb5c6', {
        //     path: '/'
        //     // domain: '.hxtrip.com'
        // })
    }
}
</script>

<style>
.layout {
    background-color: #f5f5f5;
    overflow: auto;
    min-height: 100vh;
    position: relative;
}
</style>
