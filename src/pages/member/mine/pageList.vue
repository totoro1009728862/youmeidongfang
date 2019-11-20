<template>
    <div class="page-list">
        <nuxt-link v-if="system" :to="{ name: 'TeamList' }" tag="div" class="page">
            <div class="left-info">
                <div class="icon ym-team"></div>
                <div>我的团队</div>
            </div>
            <div class="icon ym-right"></div>
        </nuxt-link>
        <nuxt-link v-else :to="{ name: 'MachineryList' }" tag="div" class="page">
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
                <div v-if="!system" class="price-text">{{ price }}</div>
                <div class="icon ym-right"></div>
            </div>
        </nuxt-link>
        <div class="page" @click="show = true">
            <div class="left-info">
                <div class="icon ym-qianbao"></div>
                <div>{{ system ? '收益体现' : '佣金提现' }}</div>
            </div>
            <div class="icon ym-right"></div>
        </div>
        <!-- 提现密码弹窗 -->
        <van-popup v-model="show" class="cashword-box" get-container="body">
            <div class="icon ym-close" @click="show = false"></div>
            <div class="title">提现密码</div>
            <div class="item" @click="nameInputFcous('cashwordRef')">
                <input ref="cashwordRef" v-model.trim="cashword" type="password" placeholder="请输入提现密码" />
            </div>
            <div class="bt" @click="submitForm">
                <div :class="{ 'no-click': !cashword || cashword.length < 6 }">确定</div>
            </div>
        </van-popup>
    </div>
</template>
<script>
import { passwordReg } from '~/common/utils/checkForm.js'
export default {
    name: 'PageList',
    props: {
        system: {
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
        },
        submitForm() {
            let cashwordReg = passwordReg(this.cashword)
            if (cashwordReg) {
                this.$Toast(cashwordReg)
                return
            }
            let params = {
                cashword: this.cashword
            }
            console.log(params)
            this.$router.push({ name: 'GetCash' })
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
.cashword-box {
    justify-content: center;
    padding: 30px 70px 30px;
    width: 350px;
    border-radius: 4px;
    height: 240px;
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
        .no-click {
            background: #bbb;
        }
    }
}
</style>
