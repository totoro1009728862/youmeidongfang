<template>
    <div class="mine">
        <background></background>
        <div class="mine-box">我是倒计时页面</div>
    </div>
</template>
<script>
import Background from '~/modules/assist/background'
export default {
    name: 'MyCount',
    components: {
        Background
    },
    data() {
        return {}
    },
    created() {
        this.getCount()
    },
    methods: {
        async getCount() {
            console.log('调接口')
        }
    }
}
</script>
<style lang="less" scoped>
.mine {
    min-height: 100vh;
    background: #fff;
}

.mine-box {
    position: relative;
    width: 100%;
    top: -45px;
    background: #fff;
    padding: 0 20px 30px;
    border-radius: 5px;
}
</style>
