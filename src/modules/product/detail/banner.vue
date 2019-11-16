<template>
    <div class="banner-warp">
        <van-swipe indicator-color="#00B900" @change="onChange">
            <van-swipe-item v-for="(image, index) in imgList" :key="index">
                <img :src="image" @error="defaultImg" />
            </van-swipe-item>
        </van-swipe>
        <div class="return-icon" @click="closePage">
            <i class="hx-icon hx-icon-fanhui"></i>
        </div>
        <div class="return-icon-home" @click="goHoemPage">
            <i class="hx-icon hx-icon-shouye1"></i>
        </div>
        <div slot="indicator" class="custom-indicator">
            <i class="hx-icon hx-icon-tupian"></i>
            <span>&nbsp;{{ bannerCurrent + 1 }}</span>
            <span>/&nbsp;{{ list.length }}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Banner',
    props: {
        list: {
            type: Array,
            default() {
                return []
            }
        },
        param: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            bannerCurrent: 0,
            defaultImg: 'https://oss.hxtrip.com/common/mobile/product_default.png/m_product_detail'
        }
    },
    computed: {
        imgList() {
            if (this.list && this.list.length > 0) {
                const list = []
                this.list.forEach(item => {
                    list.push(`${item}`)
                })
                return list
            } else {
                return []
            }
        }
    },
    mounted() {},
    methods: {
        // 图片切换
        onChange(index) {
            this.bannerCurrent = index
        },
        // 关闭当前页面
        closePage() {
            if (document.referrer) {
                if (document.referrer === window.location.href) {
                    this.$router.replace({
                        name: 'Home'
                    })
                } else {
                    this.$router.back()
                }
            } else {
                this.$router.back()
            }
            this.$emit('on-close')
        },
        // 回到首页
        goHoemPage() {
            this.$router.replace({
                name: 'Home'
            })
        }
    }
}
</script>
<style lang="less" scoped>
/deep/ .van-swipe-item > img {
    width: 100%;
    height: 500px;
}
/deep/ .van-swipe__indicators {
    bottom: 54px;
}

.banner-warp {
    width: 100%;
    background-color: #ffffff;
    overflow: hidden;
    position: relative;
    height: 500px;

    .image-item {
        height: 500px;
        width: 100%;
    }

    .custom-indicator {
        position: absolute;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
        width: 120px;
        height: 44px;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 20px;
        text-align: center;
        color: #ffffff;
        right: 40px;
        bottom: 30px;

        i,
        span {
            font-size: 26px;
            padding-right: 6px;
        }
    }

    .return-icon,
    .return-icon-home {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 40px;
        height: 60px;
        width: 60px;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 30px;
        color: #ffffff;
        text-align: center;
        line-height: 60px;

        i {
            font-size: 36px;
        }
    }

    .return-icon {
        left: 40px;
    }

    .return-icon-home {
        right: 40px;
    }
}
</style>
