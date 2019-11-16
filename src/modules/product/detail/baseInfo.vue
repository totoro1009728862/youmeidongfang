<template>
    <div class="mb20">
        <div class="product-name product-base">
            <div class="product-name-title">{{ baseInfo.productName }}</div>
            <div class="product-name-other">
                <div class="left">
                    <div class="tag-list-warp">
                        <span v-for="(item, index) in baseInfo.labelNames" :key="index" class="tag-list">{{ item }}</span>
                    </div>
                    <div class="price-warp">
                        <span class="small-size main-color">¥</span>
                        <span class="big-size main-color">{{ price ? price : baseInfo.singleSalePrice }}</span>
                        <span class="small-size">起/人</span>
                    </div>
                </div>
                <div class="right" @click="shareItem">
                    <div>
                        <i class="hx-icon hx-icon-fenxiang"></i>
                    </div>
                    <p>分享</p>
                </div>
            </div>
        </div>
        <!-- 微信分享遮罩层 -->
        <transition name="van-fade">
            <div v-show="shareShow" class="share-mask">
                <div class="share-arrow">
                    <img src="https://oss.hxtrip.com/common/mobile/Arrow.png" alt />
                </div>
                <div class="share-message">请点击右上角将它分享给指定好友或分享到朋友圈</div>
            </div>
        </transition>
        <!-- 浏览器分享 -->
        <van-action-sheet v-model="ontWXShareShow" title="分享" :get-container="getContainer">
            <div class="share-warp">
                <div class="share-item" @click="copyLink">
                    <div class="share-item-icon">
                        <i class="hx-icon hx-icon-fuzhilianjie"></i>
                    </div>
                    <p>复制链接</p>
                </div>
            </div>
        </van-action-sheet>
    </div>
</template>
<script>
import { isWechat } from '~/common/utils/index.js'
export default {
    name: 'BaseInfo',
    props: {
        baseInfo: {
            type: Object,
            default: () => {
                return {}
            }
        },
        price: {
            type: [String, Number],
            default: ''
        }
    },
    data() {
        return {
            shareShow: false,
            ontWXShareShow: false,
            shareLink: '',
            getContainer: () => {
                return document.body
            }
        }
    },
    watch: {
        ontWXShareShow(val) {
            if (!val) {
                this.clearUser()
            }
        }
    },
    mounted() {
        this.shareLink = window.location.href
    },
    methods: {
        // 分享给朋友
        shareItem() {
            if (isWechat(navigator.userAgent)) {
                // 微信内分享
                this.shareShow = true
                setTimeout(() => {
                    this.shareShow = false
                }, 2000)
            } else {
                this.shareLink = `${window.location.href}&userId=${this.baseInfo.id || ''}`
                this.ontWXShareShow = true
            }
        },
        // 复制链接
        copyLink() {
            this.$copyText(this.shareLink).then(
                e => {
                    e.clearSelection()
                    this.ontWXShareShow = false
                    this.$Toast.success('复制成功')
                },
                () => {
                    this.$Notify('当前浏览器不支持此功能，请手动复制。')
                    this.ontWXShareShow = false
                }
            )
        },
        // 清空分享信息
        clearUser() {
            const { query } = this.$route
            this.$router.push({
                query: {
                    ...query,
                    userId: ''
                }
            })
            this.shareLink = window.location.href
        }
    }
}
</script>
<style lang="less" scoped>
.main-color {
    color: #fa4c1d;
}

.product-base {
    width: 100%;
    padding: 20px;
    background-color: #ffffff;

    .product-name-title {
        font-size: 32px;
        font-weight: 600;
        color: #222;
        line-height: 46px;
    }

    .product-name-other {
        display: flex;
        flex-flow: row nowrap;
        align-items: flex-end;
        height: 130px;

        .left {
            flex: 1;
            .price-warp {
                font-size: 0;
            }
            .small-size {
                font-size: 25px;
                padding: 0 5px;
            }

            .big-size {
                font-size: 50px;
                font-weight: 600;
            }

            .tag-list-warp {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                height: 60px;
            }
        }

        .right {
            display: flex;
            flex-flow: column nowrap;
            justify-content: flex-end;
            width: 100px;
            flex: 0 100px;
            height: 140px;
            color: #888888;
            text-align: center;
            padding: 8px;
            font-size: 26px;
            > div {
                i.hx-icon {
                    font-size: 32px;
                }
            }
            p {
                margin-top: 10px;
            }
        }
    }

    .tag-list {
        display: inline-block;
        text-align: center;
        min-width: 110px;
        padding: 4px 8px;
        border-radius: 10px;
        border: 2px solid #e6e6e6;
        font-size: 20px;
        color: #888;
        margin-right: 20px;
    }
}

.share-warp {
    height: 200px;
    width: 100%;
    display: flex;

    .share-item {
        flex: 33.3%;
        width: 0 33.3%;
        text-align: center;

        .share-item-icon {
            height: 80px;
            width: 80px;
            background-color: #00b900;
            color: #ffffff;
            border-radius: 40px;
            margin: 30px auto 10px auto;
            line-height: 80px;

            i {
                font-size: 60px;
            }
        }

        p {
            font-size: 28px;
        }
    }
}

.share-mask {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.8);
    color: #ffffff;
    z-index: 9999;

    .share-arrow {
        position: absolute;
        width: 300px;
        top: 80px;
        right: 80px;
        text-align: right;

        img {
            width: 200px;
        }
    }

    .share-message {
        position: absolute;
        width: 300px;
        top: 120px;
        right: 350px;
        font-size: 32px;
    }
}

.mb20 {
    margin-bottom: 20px;
}
</style>
