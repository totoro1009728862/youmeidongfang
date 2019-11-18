<template>
    <div>
        <div class="traveler-time top30">
            <div class="traveler-time-left">出行时间</div>
            <div class="traveler-time-right">
                <h4>{{ detailInfo.travelTime | getWeek }}</h4>
            </div>
        </div>
        <!-- 新直通车字段 -->
        <div v-if="detailInfo.productType === 10" class="traveler-time">
            <div class="traveler-time-left">出行人数</div>
            <div class="traveler-time-right">
                <h4>{{ detailInfo.travelNumberStr }}</h4>
            </div>
        </div>
        <div v-else class="traveler-time">
            <div class="traveler-time-left">出行人数</div>
            <div class="traveler-time-right">
                <h4>
                    <span>{{ detailInfo.adultNumber }}{{ detailInfo.childrenNumber ? '位成' : '' }}人</span>
                    <span v-show="detailInfo.childrenNumber">{{ detailInfo.childrenNumber }}位儿童</span>
                </h4>
            </div>
        </div>

        <div v-if="detailInfo.showRoom" class="traveler-time">
            <div class="traveler-time-left">房间数量</div>
            <div class="traveler-time-right">
                <h4>
                    <span>{{ detailInfo.roomNumber }}间</span>
                </h4>
            </div>
        </div>

        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'OrderDetailInfo',
    filters: {
        getWeek: function(value) {
            let text = ''
            let showText = ''
            if (value && value.length > 10) {
                text = value.slice(0, 10) + ' '
                showText = text + '星期' + '日一二三四五六 '.charAt(new Date(value.replace(/-/g, '/')).getDay())
            }
            return showText
        },
        getTime: function(value) {
            let text = ''
            if (value && value.length > 10) {
                text = value.slice(11, 16)
            }
            return text
        }
    },
    props: {
        detailInfo: {
            type: Object,
            default: () => {
                return {
                    travelTime: '',
                    adultNumber: 0,
                    childrenNumber: 0,
                    showRoom: false,
                    gathers: [],
                    backgathers: [],
                    productType: -1,
                    roomNumber: 0,
                    travelNumberStr: '',
                    ticketType: ''
                }
            }
        }
    },
    data() {
        return {}
    }
}
</script>

<style lang="less" scoped>
.traveler-time {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding-top: 20px;
    color: #888;
    font-size: 26px;
    z-index: 2;

    .traveler-time-left {
        min-width: 160px;
        flex: 0 160px;
        font-size: 28px;
    }

    .traveler-time-right {
        display: flex;
        flex-flow: row nowrap;
        flex: 1;
        align-items: center;

        .traveler-old-location {
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            font-size: 28px;

            p {
                font-size: 24px;
            }
        }

        h4 {
            color: #333;
            font-weight: normal;
        }
    }

    .traveler-time-location {
        display: flex;
        align-items: center;
        height: 100%;

        .title {
            display: flex;
            color: #333;
            width: 90px;

            // flex: 0 80px;
        }

        a {
            display: flex;
            flex: 1;
            color: #00b900;
        }

        i {
            padding-left: 20px;
            width: 60px;
            // flex: 0 60px;
            color: #00b900;
            font-size: 26px;
            text-align: right;
        }
    }

    .t-time {
        width: 70px;
        color: #333;
    }

    .t-address {
        display: flex;
        flex: 1;
        flex-flow: row nowrap;
        align-items: center;
        margin-left: 40px;

        .shang-icon {
            position: relative;
            margin-right: 20px;
            background: #888;
            font-size: 14px;
            color: #fff;
            border-radius: 50%;

            > div:nth-child(1) {
                text-align: center;

                width: 30px;
                height: 30px;
                line-height: 30px;
            }

            .clear-up,
            .clear-down {
                position: absolute;
                left: 0;
                width: 30px;
                height: 40px;
                background: #fff;
            }

            .clear-up {
                top: -60px;
                background: transparent;
            }

            .clear-down {
                top: 30px;
            }
        }

        .location {
            display: flex;
            width: 100%;
            flex-flow: column nowrap;

            > div {
                min-height: 40px;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                width: 100%;
            }

            > div:nth-child(1) {
                font-size: 28px;
                color: #04c71f;
            }

            > div:nth-child(2) {
                font-size: 22px;
                color: #888;
            }
        }
    }

    .baidu {
        display: flex;
        flex-flow: row nowrap;
        width: 60px;
        align-items: center;
        justify-content: flex-end;

        a {
            color: #00b900;
            font-size: 28px;
        }
        .icon-dingwei {
            font-size: 34px;
        }
    }

    .top30 {
        padding-top: 30px !important;
    }
}
</style>
