<template>
    <div class="ticket-prod">
        <van-sticky :offset-top="showTab ? 40 : 0">
            <div class="tabs">
                <div v-for="(item, index) in tabs" :key="index" :class="{ actived: index === checked }" @click="linkTab(index)">{{ item }}</div>
            </div>
        </van-sticky>

        <div class="cont">
            <div v-for="(item, index) in tabs" :key="index">
                <div :id="`tab${index}`" class="tab-a"></div>
                <slot :name="`tab${index}`"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ProductTab',
    props: {
        isTop: {
            type: Number,
            default: 0
        },
        tabs: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {
            checked: 0,
            tabsTop: [] // 每个锚点位置
        }
    },
    computed: {
        showTab() {
            return this.isTop && this.isTop > 60 ? true : false
        }
    },
    watch: {
        isTop() {
            this.tabsTop = []
            const clientHeight = document.documentElement.clientHeight
            for (let i = 0; i < this.tabs.length; i++) {
                // 计算滚动
                const top = this.$el.querySelector(`#tab${i}`).offsetTop
                this.tabsTop.push(top)
            }

            for (let i = this.tabsTop.length - 1; i > 0; i--) {
                this.checked = 0
                if (this.isTop >= this.tabsTop[i]) {
                    this.checked = i
                    break
                }
            }
            if (clientHeight + this.isTop >= document.body.scrollHeight) {
                this.checked = this.tabsTop.length - 1
            }
        }
    },

    methods: {
        linkTab(index) {
            this.checked = index
            const anchor = this.$el.querySelector(`#tab${index}`)
            document.body.scrollTop = anchor.offsetTop
            document.documentElement.scrollTop = anchor.offsetTop // firefox
        }
    }
}
</script>
<style lang="less" scoped>
/deep/ .van-sticky--fixed {
    max-width: 750px;
    margin: 0 auto;
}

.tab-a {
    position: relative;
    top: -200px;
}

.ticket-prod {
    margin-top: 20px;
    background: #fff;
    width: 100%;
    overflow: hidden;

    .tabs {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        background: #fff;
        padding: 10px 30px 20px;
        height: 100px;
        div {
            font-size: 30px;
            font-weight: 500;
            color: rgba(34, 34, 34, 1);
            line-height: 48px;
            padding-bottom: 18px;
            border-bottom: 4px solid #fff;
        }

        .actived {
            border-bottom-color: #00b900;
            font-weight: 600;
        }
    }

    .cont {
        width: 100%;
        overflow: hidden;
        font-size: 28px;
        color: #666;

        img {
            display: block !important;
            width: 100% !important;
            overflow: hidden;
        }
    }
}
</style>
