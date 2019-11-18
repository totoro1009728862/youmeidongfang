<template>
    <div>
        <van-popup v-model="showPopup" position="bottom" class="reason-box" :class="{ mb100: costDetailsData.hasClass }" @click-overlay="close()">
            <!-- 费用明细 -->
            <div class="cancel-title">
                <span>费用明细</span>
                <i class="icon ym-chacha" @click="close()"></i>
            </div>
            <div class="radios">
                <div>
                    <div>
                        <span>成人价</span>
                        <span>
                            ￥{{ costDetailsData.scenicSaleAdultPrice }}
                            <i>&times;</i>
                            {{ costDetailsData.adultNumber }}
                        </span>
                    </div>
                    <div v-show="costDetailsData.childrenNumber">
                        <span>儿童价</span>
                        <span>
                            ￥{{ costDetailsData.scenicSaleChildrenPrice }}
                            <i>&times;</i>
                            {{ costDetailsData.childrenNumber }}
                        </span>
                    </div>
                    <div
                        v-show="
                            costDetailsData.travelCycle > 1 &&
                                costDetailsData.roomNumber &&
                                costDetailsData.singleRoomSalePrice &&
                                costDetailsData.roomDifferNumber
                        "
                    >
                        <span>单房差</span>
                        <span>
                            ￥{{ costDetailsData.singleRoomSalePrice }}
                            <i>&times;</i>
                            {{ costDetailsData.roomDifferNumber }}
                        </span>
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
export default {
    name: 'CostDetail',
    model: {
        prop: 'showPopup',
        event: 'change'
    },
    props: {
        showPopup: {
            type: Boolean,
            default: false
        },
        costDetailsData: {
            type: Object,
            default: () => {
                return {
                    scenicSaleAdultPrice: '',
                    adultNumber: '',
                    scenicSaleChildrenPrice: '',
                    childrenNumber: '',
                    travelCycle: 1,
                    roomNumber: '',
                    singleRoomSalePrice: '',
                    roomDifferNumber: '',
                    hasClass: false
                }
            }
        }
    },
    data() {
        return {}
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
                    i {
                        font-size: 26px;
                        color: #888;
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
