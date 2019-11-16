<template>
    <div class="container">
        <template v-if="error.statusCode === 404">
            <div class="err-wrapper">
                <!-- <img class="err-img" src="//oss.hxtrip.com/common/mobile/err_404.png" alt="404" /> -->
                <div class="err-msg">
                    <h3>抱歉...</h3>
                    <p>您打开的页面不存在，请搜索新的页面！</p>
                    <nuxt-link to="/" class="err-link">
                        <span>返回首页逛逛</span>
                    </nuxt-link>
                </div>
            </div>
        </template>

        <template v-else>
            <div class="err-wrapper">
                <!-- <img class="err-img" src="//oss.hxtrip.com/common/mobile/err_500.png" alt="404" /> -->
                <div class="err-msg">
                    <h3>系统正在升级维护中...</h3>
                    <p>相关服务已经暂停，给您带来的不便</p>
                    <p>敬请谅解！</p>
                </div>
            </div>
        </template>
        <template>
            <div>{{ error }}</div>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        error: {
            type: Object,
            default: () => {}
        }
    }
}
</script>
<style lang="less" scoped>
.err {
    &-wrapper {
        text-align: center;
        width: 100%;
        height: 100vh;
        background-color: #fff;
    }
    &-img {
        width: 70%;
        margin: 200px 15% 80px 15%;
    }
    &-msg {
        h3 {
            font-size: 48px;
            color: #222;
        }
        p {
            font-size: 32px;
            color: #555;
            padding: 20px 0;
        }
    }
    &-link {
        font-size: 34px;
        line-height: 34px;
        display: block;
        span {
            color: #00b900;
            border-bottom: 2px solid #00b900;
        }
    }
}
</style>
