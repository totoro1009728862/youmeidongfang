<template>
    <div class="cont">
        <van-tabs v-model="status" sticky class="tabs" color="#ab1f26" @change="onRefresh()">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh(true)">
                <van-tab v-for="(item, index) in allStatus" :key="index" :title="`${item.name}(${item.number}人)`">
                    <div class="list-box">
                        <div v-for="(user, i) in users" :key="i" class="item">
                            <div>{{ user.name }}</div>
                            <div class="rt">
                                机器
                                <span>{{ user.number }}</span>
                                台
                            </div>
                        </div>
                        <div v-show="users.length === total" class="end">没了</div>
                        <div v-if="!users.length" class="no-list">暂无{{ item.name }}，快去推广吧</div>
                    </div>
                </van-tab>
            </van-pull-refresh>
        </van-tabs>
    </div>
</template>
<script>
export default {
    name: 'TeamList',
    data() {
        return {
            tabIndex: 0, // 0一级，1二级
            allStatus: [
                { name: '一级代理', value: 0, number: 0 },
                { name: '二级代理', value: 1, number: 0 },
                { name: '店家', value: 2, number: 0 }
            ],
            users: [],
            total: 10, // 一共多少数据
            status: 0, // 当前选中的类型
            isLoading: false,
            current: 1,
            pageSize: 10,
            scrollFinished: false,
            isEnd: false // 滚动条是否到底
        }
    },
    watch: {
        isEnd() {
            if (this.scrollFinished) {
                this.scrollFinished = false
                if (this.total > this.orders.length) {
                    this.current++
                    this.getUsers()
                }
            }
        }
    },
    async asyncData() {
        return { tabIndex: 1 }
    },
    created() {
        const v1 = [
            { name: '一级代理', value: 0, number: 0 },
            { name: '二级代理', value: 1, number: 0 },
            { name: '店家', value: 2, number: 0 }
        ]
        const v2 = [
            { name: '二级代理', value: 1, number: 0 },
            { name: '店家', value: 2, number: 0 }
        ]
        this.allStatus = this.tabIndex ? v2 : v1
        this.status = this.allStatus[0].value
    },
    mounted() {},
    methods: {
        // 刷新
        onRefresh(v) {
            this.getTotal()
            if (v) {
                setTimeout(() => {
                    this.isLoading = false
                    this.users = []
                    this.current = 1
                    this.getUsers()
                }, 500)
            } else {
                this.isLoading = false
                this.users = []
                this.current = 1
                this.getUsers()
            }
        },
        getTotal() {
            this.allStatus[0].number = 0
            this.allStatus[1].number = 12
            // this.allStatus[2].number = 6
        },
        getUsers() {
            while (this.users.length < 10) {
                this.users.push({ name: '强', number: 6 })
            }
            this.total = 10
            this.scrollFinished = true
        }
    }
}
</script>
<style lang="less" scoped>
.cont {
    min-height: 100vh;
    background: #fff;
}
.list-box {
    display: flex;
    flex-flow: column wrap;
    border-top: 10px solid #ececec;
    padding: 0 20px;
    color: #222;
    .item {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        border-bottom: 1px solid #f7f7f7;
        height: 60px;
        .rt {
            color: #888;
            span {
                padding: 0 8px;
                color: #ab1f26;
            }
        }
    }
    .end {
        width: 100%;
        line-height: 100px;
        color: #888;
        text-align: center;
        font-size: 14px;
    }
    .no-list {
        display: flex;
        min-height: calc(100vh - 200px);
        align-items: center;
        justify-content: center;
        color: #888;
        font-size: 14px;
    }
}
</style>
