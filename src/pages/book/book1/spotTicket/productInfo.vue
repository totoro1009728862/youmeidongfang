<template>
    <div class="product-info">
        <div class="title">{{ scenicName + ' - ' + productName }}</div>
        <div class="tip-box">
            <div class="tip-left">
                <div class="time-tip">
                    <div class="icon ym-yuanxuanzhong"></div>
                    <div>{{ isChangeTicket ? '换票入园' : '无需换票' }}</div>
                </div>
                <div class="time-tip">
                    <div class="icon ym-yuanxuanzhong"></div>
                    <div>{{ refundType === 1 ? '随时退' : refundType === 2 ? '有条件退' : '不可退' }}</div>
                </div>
            </div>

            <div class="notice" @click="getByScenicTicketIdApi()">
                更多须知
                <i class="icon ym-xiangyou"></i>
            </div>
        </div>
        <div v-show="minuteNum < 60 && minuteNum > 0" class="tip">
            仅剩{{ minuteNum }}分钟可买{{ advanceDay | timeValue }}票
        </div>
    </div>
</template>
<script>
export default {
    name: 'ProductInfo',
    filters: {
        timeValue: function(day) {
            let text = ''
            if (day === 0) {
                text = '当天'
            } else if (day === 1) {
                text = '明天'
            } else {
                let dateTime = new Date()
                dateTime = dateTime.setDate(dateTime.getDate() + day)
                dateTime = new Date(dateTime)
                text = dateTime.getMonth() + 1 + '月' + dateTime.getDate() + '日'
            }
            return text
        }
    },
    props: {
        scenicName: {
            type: String,
            default: ''
        },
        productName: {
            type: String,
            default: ''
        },
        isChangeTicket: {
            type: Number,
            default: 0
        },
        minuteNum: {
            type: Number,
            default: 0
        },
        advanceDay: {
            type: Number,
            default: 0
        },
        refundType: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {}
    },
    methods: {
        getByScenicTicketIdApi() {
            this.$emit('getByScenicTicketIdApi')
        }
    }
}
</script>
<style lang="less" scoped>
.product-info {
    width: 100%;
    height: auto;
    background: #fff;
    margin-top: 20px;
    padding: 20px 30px;
    font-size: 30px;
    color: #222;

    .title {
        display: flex;
        flex-flow: row nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 40px;
        font-weight: 500;
        color: #222;
        font-size: 32px;
    }

    .tip {
        font-size: 24px;
        color: #ff6138;
    }
}
.tip-box {
    display: flex;
    flex-flow: row nowrap;
    margin-top: 10px;
    justify-content: space-between;

    .tip-left {
        display: flex;
        flex-flow: row nowrap;

        .time-tip {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            height: 34px;
            margin: 0 30px 6px 0;

            > div:nth-child(1) {
                // height: 24px;
                // width: 24px;
                // border-radius: 50%;
                // background: #00b900;
                // color: #fff;
                font-size: 24px;
                margin-right: 10px;
                color: #00b900;
            }

            > div:nth-child(2) {
                color: #555;
                font-size: 24px;
                overflow: hidden;
            }
        }
    }

    .notice {
        color: #00b900;
        font-size: 24px;

        i {
            font-size: 20px;
        }
    }
}
</style>
