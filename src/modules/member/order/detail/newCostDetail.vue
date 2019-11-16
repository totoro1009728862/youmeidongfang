<template>
    <div>
        <van-popup v-model="showPopup" position="bottom" class="reason-box" :class="{ mb100: costDetailsData.hasClass }" @click-overlay="close()">
            <!-- 费用明细 -->
            <div class="cancel-title">
                <span>费用明细</span>
                <i class="hx-icon hx-icon-chacha" @click="close()"></i>
            </div>
            <div class="radios">
                <div>
                    <div v-for="(item, index) in costDetailsData" :key="index">
                        <span>{{ item.priceTypeDesc }}</span>
                        <span class="color222">
                            ￥{{ item.salePrice }}
                            <i>&times;</i>
                            {{ item.saleNumber }}
                        </span>
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
export default {
    name: 'NewCostDetail',
    props: {
        costDetailsData: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {
            showPopup: false
        }
    },
    methods: {
        close() {
            this.showPopup = false
        },
        open() {
            this.showPopup = true
        }
    }
}
</script>

<style lang="less" scoped>
.reason-box {
    padding: 0 30px;
    .cancel-title {
        position: relative;
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 34px;
        color: #222;
        font-weight: 500;
        border-bottom: 2px solid #e6e6e6;
        i {
            position: absolute;
            right: 0;
            top: 0;
            line-height: 100px;
            color: #888;
            font-size: 60px;
            font-weight: 400;
        }
    }
    .radios {
        padding: 30px 0;
        > div {
            > div {
                position: relative;
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                line-height: 70px;
                font-size: 30px;
                color: #888;

                span {
                    line-height: 70px;
                    font-size: 30px;
                    color: #222;
                    i {
                        font-size: 26px;
                        color: #888;
                        padding-right: 6px;
                    }
                }
            }
        }
    }
}
.mb100 {
    margin-bottom: 100px;
}
</style>
