<template>
    <div class="home"></div>
</template>
<script>
export default {
    name: 'CLogin',
    data() {
        return {
            userId: '',
            auth_code: '', // 来源令牌
            paymentMode: '', // 来源
            deviceId: '', // 设备id
            picks: [], // 套餐
            deviceNo: '', // 机器型号
            shopName: '', // 门点名称
            surplusNum: 0, // 剩余次数
            payMethod: '' // 微信支付方式
        }
    },
    async asyncData({ app, query, redirect }) {
        const params = {
            paymentMode: query.paymentMode,
            jsCode: query.code || query.auth_code,
            deviceId: query.deviceId
        }
        // const params = {
        //     paymentMode: 'wechat',
        //     jsCode: '071PLhtW1je4BX0aWpuW1SwdtW1PLhtx',
        //     deviceId: '10376'
        // }
        // console.log('--------------------')
        console.log(params)
        app.$cookies.set('userType', 3, {
            path: '/'
        })
        const {
            $api: { product }
        } = app
        const { code, data } = await product.userLogin(params)
        console.log(code)
        if (code === 200) {
            app.$cookies.set('userToken', data.token, {
                path: '/'
            })
            app.$cookies.set('userId', data.userId, {
                path: '/'
            })
            let urlLink = {
                name: 'Home',
                query: {
                    ...query,
                    surplusNum: data.surplusNum,
                    userId: data.userId
                }
            }
            // 代付
            if (query.urlType && query.urlType == 2) {
                urlLink = {
                    name: 'Pay',
                    query: {
                        ...query,
                        userId: data.userId
                    }
                }
            }
            if (process.server) {
                redirect(urlLink)
            } else if (process.client) {
                app.router.push(urlLink)
            }
            return {}
        }
        return {}
    },
    methods: {}
}
</script>
<style lang="less" scoped>
.home {
    height: 100vh;
    background: #fff;
}
</style>
