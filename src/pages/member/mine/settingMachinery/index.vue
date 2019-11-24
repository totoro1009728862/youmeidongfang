<template>
    <div class="cont">
        <ym-header title="机器设置"></ym-header>
        <van-sticky :offset-top="50">
            <div class="tabs">
                <div v-for="(item, index) in allStatus" :key="index" :class="{ actived: index === status }" @click="linkTab(index)">
                    <span>{{ `${item.name}(${item.number})人` }}</span>
                </div>
            </div>
        </van-sticky>

        <van-pull-refresh v-model="reLoading" :immediate-check="false" class="mt10" @refresh="onRefresh(true)">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getUsers">
                <div v-if="users.length" class="list-box">
                    <div v-for="(user, i) in users" :key="i" class="item">
                        <div>{{ user.name }}</div>
                        <div class="rt">
                            机器
                            <span>{{ user.number }}</span>
                            台
                        </div>
                    </div>
                    <div v-if="!users.length && !isLoading" class="no-list">暂无{{ item.name }}，快去推广吧</div>
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>
<script>
export default {
    name: 'SettingMachinery',
    middleware: 'checkLogin',
    data() {
        return {
            tabIndex: 0, // 0一级，1二级
            allStatus: [
                { name: '一级代理', value: 0, number: 0 },
                { name: '二级代理', value: 1, number: 0 },
                { name: '店家', value: 2, number: 0 }
            ],
            users: [],
            total: 90, // 一共多少数据
            status: 0, // 当前选中的类型
            loading: false, // 数据加载loading
            reLoading: false, // 刷新数据中
            finished: false, // 拿到所有数据
            current: 1,
            pageSize: 10
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
    methods: {
        // 刷新
        onRefresh(v) {
            if (v) {
                setTimeout(() => {
                    this.reLoading = false
                    this.users = []
                    this.current = 1
                    this.getUsers()
                }, 500)
            } else {
                this.reLoading = false
                this.users = []
                this.current = 1
                this.getUsers()
            }
        },
        getUsers() {
            console.log('1111111111111111111111')
            setTimeout(() => {
                for (let i = 0; i < 15; i++) {
                    this.users.push({
                        name: '强',
                        number: this.current + '-' + i
                    })
                }
                this.loading = false
                console.log(this.loading)
                this.current++
                if (this.total && this.users.length >= this.total) {
                    this.finished = true
                }
            }, 500)
        },
        linkTab(index) {
            if (this.status != index) {
                this.status = index
                this.onRefresh()
            }
        }
    }
}
</script>
<style lang="less" scoped>
.cont {
    height: 100vh;
}
.tabs {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    background: #fff;
    height: 44px;
    align-items: center;
    div {
        font-size: 14px;
        font-weight: 500;
        color: rgba(34, 34, 34, 1);
        line-height: 44px;
        border-bottom: 2px solid #fff;
    }

    .actived {
        border-bottom-color: #ab1f26;
        font-weight: 600;
    }
}
.list-box {
    display: flex;
    flex-flow: column wrap;
    border-top: 10px solid #ececec;
    padding: 0 20px;
    color: #222;
    background: #fff;
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
