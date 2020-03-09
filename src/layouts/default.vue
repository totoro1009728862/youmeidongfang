<template>
    <div class="layout">
        <nuxt></nuxt>
    </div>
</template>

<script>
export default {
    beforeMount() {
        // 在这里种cookie可以本地模拟登陆状态
        this.$cookies.set('userToken', 'df4765c7ecc548308811e241b1986f71', {
            path: '/'
            // domain: '.hxtrip.com'
        })
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
