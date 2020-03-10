<template>
    <div class="home">
        <background>
            <div class="logo">HUATAI</div>
        </background>

        <div class="home-box">
            <div class="pick-info">
                <div class="shop-info">
                    <div>{{ shopName }}</div>
                    <div>机器编号：{{ deviceNo }}</div>
                </div>
            </div>
            <div class="erweima">
                <div class="erweima-img">
                    <img :src="qrPath" alt="二维码" />
                </div>
                <div class="erweima-tip">
                    <span>店家微信扫描此二维码可代付</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Background from '~/modules/assist/background'
// import QRCode from 'qrcode'
export default {
    name: 'MerchantsPay',
    components: {
        Background
    },
    data() {
        return {
            userId: '',
            deviceId: '', // 设备id
            deviceNo: '', // 机器型号
            shopName: '', // 门点名称
            qrPath: '' // 二维码
        }
    },

    async asyncData({ app, query }) {
        const {
            $api: { product }
        } = app
        const { code, data } = await product.userPayQr({
            deviceId: query.deviceId || 10376,
            userId: query.userId || 4
        })
        if (code === 200) {
            console.log(data)
            // let qrImgData = ''
            // QRCode.toDataURL(data.qrPath)
            //     .then(url => {
            //         qrImgData = url
            //     })
            //     .catch(err => {
            //         console.error(err)
            //     })

            return {
                ...query,
                qrPath: data.qrPath
            }
        }
        return {}
    },
    created() {
        this.getNum()
    },
    methods: {
        async getNum() {
            const params = {
                deviceId: this.deviceId,
                userId: this.userId
            }
            const {
                $api: { product }
            } = this
            console.log('---------测试老街口')
            const { code, data } = await product.myUserNum(params)
            console.log(code)
            console.log(data)
            if (code === 200) {
                this.surplusNum = data.surplusNum
            }
        }
    }
}
</script>
<style lang="less" scoped>
.home {
    min-height: 100vh;
    background: #fff;
    overflow: hidden;
    .logo {
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: center;
        font-size: 40px;
        top: 30px;
        font-weight: 600;
        color: #fff;
    }
}

.home-box {
    position: relative;
    width: 100%;
    top: -40px;
    background: #fff;
    padding: 0 20px;
    border-radius: 5px;
    .pick-info {
        display: flex;
        flex-flow: column nowrap;
        padding: 30px 0 20px;
        .shop-info {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            color: #888;
            font-size: 14px;
        }
    }
    .erweima {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        width: 100%;
        &-tip {
            width: 200px;
            color: #222;
            margin-top: 10px;
            font-size: 14px;
            text-align: center;
        }
        &-img {
            width: 200px;
            height: 200px;
            background: #888;
            margin-top: 20px;
        }
    }
}
</style>
