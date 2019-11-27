<template>
    <div class="page-list">
        <nuxt-link v-if="userType === 1" :to="{ name: 'TeamList' }" tag="div" class="page">
            <div class="left-info">
                <div class="icon ym-team"></div>
                <div>我的团队</div>
            </div>
            <div class="icon ym-right"></div>
        </nuxt-link>
        <nuxt-link v-else :to="{ name: 'SettingMachinery' }" tag="div" class="page">
            <div class="left-info">
                <div class="icon ym-setting"></div>
                <div>机器设置</div>
            </div>
            <div class="icon ym-right"></div>
        </nuxt-link>
        <nuxt-link :to="{ name: 'MyPerformance' }" tag="div" class="page">
            <div class="left-info">
                <div class="icon ym-yeji"></div>
                <div>我的业绩</div>
            </div>
            <div class="right-info">
                <!-- <div v-if="userType === 2" class="price-text">{{ price }}</div> -->
                <div class="icon ym-right"></div>
            </div>
        </nuxt-link>
        <nuxt-link :to="{ name: 'GetCash' }" tag="div" class="page">
            <div class="left-info">
                <div class="icon ym-qianbao"></div>
                <div>{{ userType === 2 ? '收益提现' : '佣金提现' }}</div>
            </div>
            <div class="right-info">
                <div class="icon ym-right"></div>
            </div>
        </nuxt-link>
    </div>
</template>
<script>
export default {
    name: 'PageList',
    props: {
        userType: {
            type: Number,
            default: 0
        },
        price: {
            type: [String, Number],
            default: 0
        }
    },
    data() {
        return {
            cashword: '',
            show: false,
            canSubmit: false
        }
    },
    methods: {
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
.page-list {
    display: flex;
    flex-flow: column nowrap;
    color: #222;
    font-size: 14px;
    .page {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        border-bottom: 1px solid #f7f7f7;
        .left-info,
        .right-info {
            display: flex;
            flex-flow: row nowrap;
            height: 100%;
            align-items: center;
        }
        .right-info {
            .price-text {
                display: flex;
                height: 100%;
                align-items: center;
                font-size: 12px;
                color: #ab1f26;
                &::after {
                    content: '元';
                }
            }
        }
        .icon {
            display: flex;
            height: 100%;
            align-items: center;
            color: #ab1f26;
            font-size: 20px;
            padding-right: 10px;
        }
        .ym-right {
            padding-right: 0;
            font-size: 24px;
            text-align: right;
            color: #bbb;
        }
    }
}
</style>
