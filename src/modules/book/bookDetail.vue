<template>
    <div>
        <div class="hx-book-bottom">
            <div class="total-price">
                支付总额：
                <span>
                    &yen;
                    <strong>{{ totalPrice > 0 ? totalPrice : '--' }}</strong>
                </span>
            </div>
            <div class="box">
                <div class="detail-price" @click="showPriceDetail">
                    <span>费用明细</span>
                    <span class="icon" :class="{ 'icon-xiangshang': !isShowPriceDetail, 'icon-xiangxia': isShowPriceDetail }"></span>
                </div>
                <!-- <v-touch tag="button" :class="{ disable: !isNext }" @tap="triggerNext">{{ btnText }}</v-touch> -->
                <button v-if="preview == 0" :class="{ disable: !isNext }" @click="triggerNext">{{ btnText }}</button>
            </div>
        </div>
        <div class="popup-price" :class="{ open: isShowPriceDetail }">
            <div class="content">
                <div class="title">
                    费用明细
                    <i class="icon ym-chacha" @click="isShowPriceDetail = false"></i>
                </div>
                <template v-for="(item, index) in priceDetail">
                    <div :key="index" class="unit">
                        <p class="name">{{ item.name }}</p>
                        <p class="price">&yen;{{ item.value }} <em>x</em> {{ item.num }}</p>
                    </div>
                </template>
            </div>
        </div>
        <div
            v-show="isShowPriceDetail"
            class="layer"
            @click="
                () => {
                    isShowPriceDetail = false
                }
            "
        ></div>
    </div>
</template>

<script>
export default {
    props: {
        btnText: {
            type: String,
            default: '下一步'
        },
        totalPrice: {
            type: Number,
            default: 0
        },
        isNext: {
            type: Boolean,
            default: true
        },
        priceSys: {
            type: Array,
            default: () => []
        },
        mutilNum: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            isShowPriceDetail: false
        }
    },
    computed: {
        priceDetail() {
            let res = []
            this.priceSys.map(item => {
                if (item.type == 'adult' && this.mutilNum.adultNum > 0) {
                    res.push({
                        num: this.mutilNum.adultNum,
                        ...item
                    })
                } else if (item.type == 'children' && this.mutilNum.childrenNum > 0) {
                    res.push({
                        num: this.mutilNum.childrenNum,
                        ...item
                    })
                } else if (item.type == 'senior' && this.mutilNum.seniorNum > 0) {
                    res.push({
                        num: this.mutilNum.seniorNum,
                        ...item
                    })
                } else if (item.type == 'student' && this.mutilNum.studentNum > 0) {
                    res.push({
                        num: this.mutilNum.studentNum,
                        ...item
                    })
                } else if (item.type == 'family' && this.mutilNum.familyNum > 0) {
                    res.push({
                        num: this.mutilNum.familyNum,
                        ...item
                    })
                } else if (item.type == 'parentChild' && this.mutilNum.parentChildNum > 0) {
                    res.push({
                        num: this.mutilNum.parentChildNum,
                        ...item
                    })
                } else if (item.type == 'general' && this.mutilNum.busNum > 0) {
                    res.push({
                        num: this.mutilNum.busNum,
                        ...item
                    })
                }
            })
            return res
        },
        preview() {
            return this.$route.query.preview || 0
        }
    },
    watch: {
        totalPrice(newVal) {
            if (newVal <= 0) this.isShowPriceDetail = false
        }
    },
    methods: {
        showPriceDetail() {
            if (this.totalPrice > 0) {
                this.isShowPriceDetail = !this.isShowPriceDetail
            }
        },
        triggerNext() {
            this.$emit('next')
        }
    }
}
</script>

<style lang="less" scoped>
.hx-book {
    &-bottom {
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        padding: 10px 30px;
        position: relative;
        z-index: 999;

        .box {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            align-items: center;

            button {
                width: 240px;
                height: 80px;
                line-height: 80px;
                background-color: #04c71f;
                border-radius: 40px;
                border: none;
                font-size: 34px;
                font-weight: bold;
                color: #fff;

                &.disable {
                    background: #d8d8d8;
                }
            }
        }

        .total-price {
            font-size: 26px;
            vertical-align: baseline;
            padding: 22px 0;

            span {
                color: #fa4c1d;
                font-size: 24px;
            }

            strong {
                font-weight: 600;
                font-size: 32px;
            }
        }

        .detail-price {
            color: #555;
            font-size: 26px;
            display: flex;
            justify-content: baseline;

            span.icon {
                color: #555;
                padding: 6px 0 0 10px;
                font-size: 24px;
            }

            margin-right: 20px;
        }
    }
}

.popup-price {
    position: fixed;
    background-color: #fff;
    bottom: 100px;
    transition: 0.3s ease-out;
    transform: translate(0, 100%);
    width: 100%;
    max-width: 750px;
    z-index: 998;

    .content {
        padding: 0 30px 110px;
    }

    .title {
        position: relative;
        text-align: center;
        font-size: 32px;
        font-weight: bold;
        line-height: 46px;
        border-bottom: 2px solid #e6e6e6;
        padding: 27px 0;
        .icon-chacha {
            position: absolute;
            top: 24px;
            right: 0;
            color: #888;
            font-size: 60px;
        }
    }

    .unit {
        display: flex;
        justify-content: space-between;
        padding-top: 30px;
        line-height: 40px;
        font-size: 28px;

        .name {
            color: #888;
        }
    }

    .price {
        em {
            color: #888;
            font-style: normal;
        }
    }

    &.open {
        transform: translate(0, 0);
    }
}

.layer {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    left: 0;
    top: 0;
    z-index: 99;
}
</style>
