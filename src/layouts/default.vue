<template>
    <div class="layout">
        <nuxt></nuxt>
    </div>
</template>

<script>
export default {
    beforeMount() {
        // 在这里种cookie可以本地模拟登陆状态
        // this.$cookies.set('userToken', 'e33c2a138d53404f8118bbd8e3f34f2a', {
        //     path: '/'
        //     // domain: '.hxtrip.com'
        // })
        // this.$cookies.set('userType', '3', {
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
