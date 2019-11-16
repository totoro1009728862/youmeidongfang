<template>
    <!-- 联系人 -->
    <div v-show="ticketNoInfo.queryNo || ticketNoInfo.backQueryNo" class="order-change">
        <div class="order-traveler-title">换票信息</div>
        <div class="order-traveler">
            <div class="ticket-passinfo">
                <div v-show="ticketNoInfo.queryNo" class="number-pass-box">
                    <div>
                        <span>去程</span>
                    </div>
                    <div>取票号：{{ ticketNoInfo.queryNo }}</div>
                    <div>取票密码：{{ ticketNoInfo.random }}</div>
                </div>
                <div v-show="ticketNoInfo.backQueryNo" class="number-pass-box">
                    <div>
                        <span>返程</span>
                    </div>
                    <div>取票号：{{ ticketNoInfo.backQueryNo }}</div>
                    <div>取票密码：{{ ticketNoInfo.backRandom }}</div>
                </div>
            </div>
            <div v-show="changeTicketInfoDto.changeTicketContent" class="change-address">
                <h5>换票地点</h5>
                <p v-for="(item, index) in changeTicketInfoDto.changeTicketAddress" :key="index" class="address" @click="openMap(item)">
                    {{ item.name }}
                    <i class="hx-icon hx-icon-dingwei"></i>
                </p>
            </div>
            <div v-show="changeTicketInfoDto.changeTicketContent" class="change-address">
                <h5>换票说明</h5>
                <p>{{ changeTicketInfoDto.changeTicketContent }}</p>
            </div>
        </div>
    </div>
</template>
<script>
import wxAPI from '~/common/minix/wxApi.js'
import { isWechat, openMap, bMapTransQQMap } from '~/common/utils/index.js'
export default {
    name: 'ChangeTicket',
    mixins: [wxAPI],
    props: {
        changeTicketInfoDto: {
            type: Object,
            default: () => {
                return {
                    changeTicketContent: '',
                    changeTicketAddress: [
                        {
                            latitude: '',
                            longitude: '',
                            name: ''
                        }
                    ]
                }
            }
        },
        ticketNoInfo: {
            type: Object,
            default: () => {
                return {
                    queryNo: '22',
                    random: '33',
                    backQueryNo: '44',
                    backRandom: '55'
                }
            }
        }
    },
    data() {
        return {}
    },
    methods: {
        // 打开百度地图
        openMap(item) {
            const { lat, lng } = bMapTransQQMap(item.longitude, item.latitude)
            if (isWechat(navigator.userAgent)) {
                this.$wxOpenMap({
                    latitude: lat, // 纬度，浮点数，范围为90 ~ -90
                    longitude: lng, // 经度，浮点数，范围为180 ~ -180。
                    name: item.address, // 位置名
                    address: '', // 地址详情说明
                    scale: 14 // 地图缩放级别,整形值,范围从1~28。默认为最大
                    // infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
                })
            } else {
                window.location.href = openMap(item)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.order-change {
    padding: 0 20px 20px;
    border-radius: 6px;
    background-color: #ffffff;
    margin-bottom: 20px;
    .order-traveler-title {
        font-size: 34px;
        font-weight: bold;
        padding: 30px 0 0;
        position: relative;
    }

    .order-traveler {
        .ticket-passinfo {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            padding: 30px;
            justify-content: space-between;
            border: 2px solid #e6e6e6;
            border-radius: 10px;
            margin-bottom: 40px;

            .number-pass-box {
                > div:nth-child(1) {
                    position: relative;
                    top: -4px;
                    margin-top: 0;

                    span {
                        padding: 2px 18px;
                        border: 2px solid #00b900;
                        font-size: 20px;
                        color: #00b900;
                        border-radius: 16px;
                    }
                }

                > div {
                    font-size: 28px;
                    color: #222222;
                    margin-top: 20px;
                    // font-weight: 600
                }
            }
        }

        .change-address {
            margin-bottom: 20px;

            h5 {
                font-size: 30px;
                line-height: 50px;
                color: #222;
            }

            p {
                line-height: 50px;
                font-size: 28px;
                color: #444;
            }

            .address {
                padding-right: 80px;
                position: relative;

                i {
                    position: absolute;
                    display: block;
                    right: 0;
                    top: -2px;
                    line-height: 50px;
                    font-size: 28px;
                    color: #00b900;
                }
            }
        }
    }
}
</style>
