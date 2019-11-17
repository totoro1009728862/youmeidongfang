<template>
    <!-- 多迁出组件，这样便于后期有页面公用功能时 可以迁至modules文件夹中 -->
    <div class="hx-home" @click="goLogin">我是首页</div>
</template>

<script>
import wxAPI from '~/common/minix/wxApi.js'
import { isWechat } from '~/common/utils'
// import { mapGetters, mapActions } from 'vuex'
export default {
    mixins: [wxAPI],
    data() {
        return {}
    },
    computed: {},

    async asyncData({ req }) {
        let userAgent = process.server ? req.headers['user-agent'] : navigator.userAgent
        // const { $api } = app
        // const {
        //     code,
        //     data: { advertisementList, headImgUrl, hotScenicList, hotCityDto, showScenicTicket }
        // } = await $api.product.initHome({
        //     positionType: 3,
        //     cityCode: store.getters.cityCode || ''
        // })
        // if (code == 200) {
        //     store.dispatch('product/setHotSearchList', hotScenicList)
        //     store.dispatch('setCityCode', hotCityDto.cityCode)
        //     return {
        //         cityName: hotCityDto.cityName, //热门城市名称
        //         //cityCode: hotCityDto.cityCode, //热门城市Code
        //         headImgUrl, //用户头像
        //         hotScenicList, //热门景点列表
        //         isWechat: isWechat(userAgent),
        //         showScenicTicket,
        //         advList: advertisementList //banner广告图
        //     }
        // }
        return {
            isWechat: isWechat(userAgent)
        }
    },
    mounted() {
        this.$wxShare({
            title: 'anmoyi', // 分享标题
            desc: '优美东方', // 分享描述
            link: `${window.location.href}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://www.iumer.cn/image/umer_qrcode.png'
        })
    },
    methods: {
        // ...mapActions['setCityCode'],
        goLogin() {
            this.$router.push({ name: 'Login' })
        }
    }
}
</script>

<style lang="less" scoped>
// 这里就不要用另外引用less样式了
.hx-home {
    background-color: #fff;
    min-height: 100vh;
    position: relative;
}
</style>
