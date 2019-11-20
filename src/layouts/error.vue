<template>
    <div class="container">
        <template v-if="error.statusCode === 404">
            <div class="err-wrapper">
                <img
                    class="err-img"
                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574271258355&di=83165a1117053180fc2caaef16c37a32&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b70459d8cdc1a80120446320a183.jpg"
                    alt="404"
                />
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
                <img
                    class="err-img"
                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574271258355&di=83165a1117053180fc2caaef16c37a32&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b70459d8cdc1a80120446320a183.jpg"
                    alt="404"
                />
                <div class="err-msg">
                    <h3>系统正在升级维护中...</h3>
                    <p>相关服务已经暂停，给您带来的不便</p>
                    <p>敬请谅解！</p>
                </div>
            </div>
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
        margin: 100px 15% 40px 15%;
    }
    &-msg {
        h3 {
            font-size: 24px;
            color: #222;
        }
        p {
            font-size: 16px;
            color: #555;
            padding: 20px 0;
        }
    }
    &-link {
        font-size: 16px;
        line-height: 16px;
        display: block;
        span {
            color: #00b900;
            border-bottom: 2px solid #00b900;
        }
    }
}
</style>
