<template>
    <div class="hx-product-item" @click="goDetail">
        <div class="img-box">
            <img v-if="item.imgUrl" v-lazy="`${item.imgUrl}/mlist`" alt />
            <img v-else v-lazy="defaultImg" alt />
            <div v-if="type == 'home'" class="category" :class="typeEnName">
                <span>{{ typeZhName }}</span>
            </div>
            <div v-if="type == 'list'" class="go-station">{{ item.productType != 41 ? item.fromCitySimpleName + '出发' : item.fromCitySimpleName }}</div>
        </div>
        <div class="info">
            <div class="top">
                <div class="product-name">{{ item.productName }}</div>
                <div v-if="type != 'mycollection'" class="tags">
                    <span v-if="item.scenicLevel && item.scenicLevel === '5A'" class="scenic-level">5A景区</span>
                    <span v-for="(itemName, index) in item.labelNameList || []" :key="index">{{ itemName }}</span>
                </div>
            </div>
            <div class="price">
                <div v-show="item.productStatus === 1">
                    <i>&yen;</i>
                    {{ item.minSalePrice }}
                    <em>起</em>
                </div>
                <div v-show="item.productStatus !== 1">
                    <em>暂无售价</em>
                </div>
                <i v-show="false" class="buy">200人已购买</i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        //产品详细
        item: {
            type: Object,
            default: () => ({})
        },
        //列表类显示的样式 'home'：首页 'mycollection'：我的收藏 等等
        type: {
            type: String,
            default: 'home'
        }
    },
    data() {
        return {
            defaultImg: 'https://oss.hxtrip.com/common/mobile/product_default.png',
            routerName: ''
        }
    },
    computed: {
        typeZhName() {
            //产品中文名称
            const settings = {
                '1': '景区直通车', //景区直通车
                '10': '景区直通车', //新景区直通车
                '3': '汽车游', //汽车游
                '2': '一日游', //一日游
                '41': '景点门票' //门票 (可能有变，后期改一下)
            }
            let res = settings[this.item.productType]
            return !res ? '未知' : res
        },
        typeEnName() {
            //产品英文名称
            const settings = {
                '1': 'scenicBus', //景区景区直通车
                '10': 'scenicBus', //新景区直通车
                '3': 'bus', //汽车游
                '2': 'tour', //一日游
                '41': 'ticket' //门票 (可能有变，后期改一下)
            }
            let res = settings[this.item.productType]
            return !res ? 'unknown' : res
        }
    },
    methods: {
        goDetail() {
            const { productType: type, productId } = this.item
            const name = type === 1 || type === 10 ? 'ScenicBus' : type === 41 ? 'SpotTicket' : 'GroupTour'
            this.$router.push({
                name,
                query: {
                    productId
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.hx-product-item {
    display: flex;
    height: 180px;
    background: #fff;
    border-radius: 10px;
    margin-bottom: 20px;
    justify-content: space-between;
    width: 100%;
    .img-box {
        position: relative;
        width: 216px;
        height: 162px;
        border-radius: 10px;
        overflow: hidden;
        flex-shrink: 0;

        img {
            width: 100%;
            height: 100%;
        }

        .category {
            position: absolute;
            top: 0;
            left: -16px;
            transform: skew(-30deg);
            padding: 4px 16px 4px 30px;
            color: #fff;
            font-size: 20px;

            span {
                display: block;
                transform: skew(30deg);
            }

            &.scenicBus {
                background: #79ca00;
            }

            &.tour {
                background: #f77163;
            }

            &.bus {
                background: #fb9400;
            }

            &.ticket {
                background: #00b900;
            }
        }
    }

    .info {
        width: 454px;
        height: 162px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .tags {
        position: relative;
        display: flex;
        flex-flow: row wrap;
        height: 40px;
        font-size: 20px;
        width: 100%;
        overflow: hidden;
        margin-top: 6px;
        .scenic-level {
            background: #00b900;
            color: #fff;
            border: #00b900;
        }
        i {
            position: absolute;
            color: #00b900;
            left: 0;
            top: 0;
            height: 48px;
            line-height: 48px;
            font-size: 24px;
        }

        div {
            padding-left: 40px;
            height: 60px;
            line-height: 60px;
            height: 60px;
            width: 100%;
            color: #555;
            font-size: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        span {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: center;
            color: #888;
            height: 40px;
            padding: 0 12px;
            margin-right: 10px;
            border: 2px solid #e6e6e6;
            border-radius: 10px;
            overflow: hidden;
        }
    }

    .product-name {
        max-height: 80px;
        line-height: 40px;
        color: #222;
        font-size: 28px;
        font-weight: 500;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .price {
        position: relative;
        height: 48px;
        font-size: 36px;
        font-weight: 500;
        color: rgba(255, 102, 0, 1);

        i {
            font-style: normal;
            font-size: 24px;
        }

        em {
            font-style: normal;
            color: #555;
            font-size: 24px;
            padding-left: 4px;
        }

        .buy {
            position: absolute;
            line-height: 48px;
            right: 10px;
            color: #555;
            top: 0;
            font-size: 28px;
        }
    }
    .list {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 40px;
        line-height: 40px;
        color: #fff;
        text-align: center;
        background: rgba(0, 0, 0, 0.5);
        overflow: hidden;
        font-size: 24px;
    }
    .go-station {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 40px;
        line-height: 40px;
        color: #fff;
        text-align: center;
        background: rgba(0, 0, 0, 0.5);
        overflow: hidden;
        font-size: 24px;
    }
}
</style>
