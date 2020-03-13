<template>
    <div class="home">
        <background>
            <div class="logo">HUATAI</div>
        </background>

        <div class="home-box">
            <div class="tip">
                <div class="tip-icon">
                    <div class="ym-icon ym-seleted"></div>
                </div>
                <div class="tip-txt">代付成功</div>
            </div>
        </div>
    </div>
</template>
<script>
import Background from '~/modules/assist/background'
export default {
    name: 'Success',
    components: {
        Background
    },
    data() {
        return {}
    },

    created() {},
    methods: {}
}
</script>
<style lang="less" scoped>
.home {
    min-height: 100vh;
    overflow: hidden;
    .logo {
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: center;
        font-size: 40px;
        top: 30px;
        font-weight: 600;
        color: #fff;
    }
}

.home-box {
    position: relative;
    height: 300px;
    top: -50px;
    background: #fff;
    padding: 0 20px;
    margin: 0 20px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    .tip {
        display: flex;
        height: 100px;
        justify-content: center;
        align-items: center;
        &-txt {
            font-size: 24px;
            color: #333;
        }
        &-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #ab1f26;
            margin-right: 10px;
            .ym-icon {
                color: #fff;
            }
        }
    }
}
</style>
