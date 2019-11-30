<template>
    <div class="cont">
        <ym-header title="机器设置"></ym-header>
        <van-tabs v-model="active" sticky @click="onClick">
            <van-tab v-for="(item, index) in devices" :key="index" :title="item.deviceId.toString()">
                <div class="item-box">
                    <div v-if="pack" class="jichu">
                        <div>设备号：{{ item.deviceNo }}</div>
                        <div class="title">基础设置</div>
                        <div>单次金额：{{ pack.price }}元</div>
                        <div>单次时长：15分钟/次</div>
                        <div class="bt">
                            <div @click="setPackId(pack)">修改</div>
                        </div>
                    </div>
                    <div v-if="packs && packs.length">
                        <div
                            v-for="(itm, indx) in packs"
                            :key="indx"
                            class="pack-info"
                            :class="{ open: itm.approveStatus }"
                        >
                            <div class="title">{{ itm.name }}</div>
                            <div class="price">
                                <span>套餐总金额:</span>
                                <span>{{ itm.price }}</span>
                            </div>
                            <div class="total">
                                <span>套餐次数:</span>
                                <span>{{ itm.totalNum }}</span>
                            </div>
                            <div class="switch">
                                <div @click="changeStatus(itm)">{{ itm.approveStatus ? '暂停使用' : '开始使用' }}</div>
                                <div @click="setPackId(itm)">修改</div>
                            </div>
                        </div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
        <van-popup v-model="show" class="form-box" get-container="body">
            <div class="icon ym-close" @click="show = false"></div>
            <div class="title">{{ packInfo.name }}修改</div>
            <div class="item" @click="nameInputFcous('priceRef')">
                <input ref="priceRef" v-model.trim="price" type="tel" placeholder="请输入金额" />
            </div>
            <div v-show="!packInfo.noChangeNum" class="item" @click="nameInputFcous('totalNumRef')">
                <input ref="totalNumRef" v-model.trim="totalNum" type="tel" placeholder="请输入次数" />
            </div>
            <div class="bt">
                <div :class="{ 'no-click': noClick }" @click="save">保存</div>
            </div>
        </van-popup>
    </div>
</template>
<script>
export default {
    name: 'SettingMachinery',
    middleware: 'checkLogin',
    data() {
        return {
            show: false, // 弹窗
            devices: [], // 设备tabs
            pack: {}, // 基础套餐
            packs: [], // 套餐
            packInfo: {}, // 修改的套餐信息
            userId: '',
            deviceId: '', // 当前套餐id
            active: 0, // tab下标
            price: '', // 修改金额
            totalNum: '' // 修改次数
        }
    },
    computed: {
        noClick() {
            // 是否是基础套餐
            const noChangeNum = this.packInfo && this.packInfo.noChangeNum ? true : false
            return noChangeNum ? !this.totalNum || !this.price : !this.price
        }
    },
    async asyncData({ app }) {
        const {
            $cookies,
            $api: { member }
        } = app
        let userId = $cookies.get('userId')
        const { data } = await member.mine.myDeviceList({ userId })
        return {
            userId,
            devices: data.list,
            deviceId: data.list ? data.list[0].deviceId : ''
        }
    },
    created() {
        this.getDeviceSetList()
    },
    methods: {
        onClick(index, title) {
            this.deviceId = title
            this.getDeviceSetList()
        },
        async getDeviceSetList() {
            const {
                $api: { member },
                deviceId
            } = this
            const { data } = await member.mine.deviceSetList({ deviceId })
            this.pack = Object.assign(data[0], { noChangeNum: true })
            this.packs = data.slice(1)
        },
        async changeStatus(item) {
            const {
                $api: { member }
            } = this
            item.approveStatus = item.approveStatus ? 0 : 1
            const { code } = await member.mine.updateDeviceSet(item)
            if (code === 200) {
                this.getDeviceSetList()
            }
            this.show = false
        },
        setPackId(item) {
            this.price = item.price
            this.totalNum = item.totalNum
            this.packInfo = item
            this.show = true
        },
        async save() {
            if (this.noClick) return
            const {
                $api: { member },
                packInfo,
                price,
                totalNum
            } = this
            const params = {
                ...packInfo,
                price,
                totalNum
            }
            if (params.noChangeNum) delete params.noChangeNum
            const { code } = await member.mine.updateDeviceSet(params)
            if (code === 200) {
                this.getDeviceSetList()
            }
            this.show = false
        },
        nameInputFcous(v) {
            this.$nextTick(function() {
                //DOM 更新了
                this.$refs[v].focus()
            })
        }
    }
}
</script>
<style lang="less" scoped>
.cont {
    height: 100vh;
}
.item-box {
    display: flex;
    flex-flow: column nowrap;
    margin-top: 10px;
    padding: 20px;
    width: 100%;
    background: #fff;
    font-size: 14px;
    .jichu {
        font-size: 14px;
        color: #222;
        > div {
            margin-bottom: 20px;
        }
        > .title {
            font-weight: 600;
        }
        > .bt {
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            margin: 30px;
            > div {
                height: 40px;
                width: 120px;
                line-height: 40px;
                background: #ab1f26;
                color: #fff;
                text-align: center;
                border-radius: 20px;
            }
        }
    }
    .pack-info {
        position: relative;
        display: flex;
        flex-flow: column nowrap;
        background: #ddd;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 0px 8px 0px rgba(221, 221, 221, 1);
        font-size: 14px;
        margin-bottom: 20px;
        .title {
            width: 100%;
            text-align: center;
            font-weight: 600;
            margin-bottom: 10px;
        }
        .price,
        .total {
            margin-bottom: 16px;
            > span:nth-child(2) {
                color: #ab1f26;
                font-size: 16px;
                padding: 0 5px;
            }
        }
        .total {
            > span:nth-child(2) {
                font-size: 14px;
            }
        }
        .switch {
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-end;
            color: #888;
            > div:nth-child(1) {
                color: #ab1f26;
                margin-right: 10px;
            }
        }
    }
    .open {
        background: #fff;
    }
}
.form-box {
    justify-content: center;
    padding: 30px 70px 30px;
    width: 350px;
    border-radius: 4px;
    min-height: 240px;
    overflow: hidden;
    .icon {
        position: absolute;
        right: 10px;
        top: 0;
        line-height: 43px;
        color: #222;
        font-size: 16px;
        font-weight: 500;
    }
    .title {
        font-size: 16px;
        font-weight: 600;
        color: #222;
        width: 100%;
        margin-bottom: 30px;
        text-align: center;
    }
    .item {
        display: flex;
        justify-content: center;
        border-bottom: 2px solid #bbb;
        height: 40px;
        margin-bottom: 40px;
        input {
            text-align: center;
            font-size: 16px;
        }
    }
    .bt {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 40px;
        margin-top: 50px;
        div {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 200px;
            border-radius: 40px;
            background: #ab1f26;
            color: #fff;
            font-size: 14px;
        }
    }
}
</style>
