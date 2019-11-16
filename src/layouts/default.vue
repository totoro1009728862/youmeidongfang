<template>
    <div class="layout">
        <!-- <div class="offline-tip" v-if="$nuxt.isOffline">貌似还未链接网络</div> -->
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

<style></style>
