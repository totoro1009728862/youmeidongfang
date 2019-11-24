<template>
    <div class="macs-box">
        <div v-for="(item, index) in macsArr" :key="index" class="mac">
            <div class="l-info">
                <div class="mac-no">编号：{{ item.name }}</div>
                <div class="mac-price">{{ item.price }}</div>
            </div>
            <div class="r-info">
                <i>{{ item.totalNum }}</i>
            </div>
        </div>
        <nuxt-link v-show="macsArr.length && macsArr.length > 5" :to="{ name: 'MachineryList' }" tag="div" class="mac-more">查看更多</nuxt-link>
    </div>
</template>
<script>
export default {
    name: 'MacsList',
    props: {
        macsArr: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {}
    }
}
</script>
<style lang="less" scoped>
.macs-box {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    padding: 0 20px;
    font-size: 14px;
    color: #222;
    .mac {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        height: 66px;
        width: 100%;
        justify-content: space-between;
        .l-info {
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            .mac-price {
                font-size: 12px;
                line-height: 30px;
                color: #888;
                &::after {
                    content: '元/次';
                }
            }
        }
        .r-info {
            font-size: 16px;
            color: #222;
            font-weight: bold;
            i {
                color: #ab1f26;
                &::before {
                    content: '已使用';
                }
                &::after {
                    content: '次';
                }
            }
        }
    }
    .mac-more {
        width: 100%;
        line-height: 40px;
        text-align: center;
    }
}
</style>
