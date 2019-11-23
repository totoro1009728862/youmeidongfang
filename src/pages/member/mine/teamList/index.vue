<template>
    <div class="cont">
        <ym-header title="我的团队"></ym-header>
        <van-sticky :offset-top="50">
            <div class="tabs">
                <div v-for="(item, index) in allStatus" :key="index" :class="{ actived: item.businessType === businessType }" @click="linkTab(item)">
                    <span>{{ `${item.name}(${item.totalNum})人` }}</span>
                </div>
            </div>
        </van-sticky>

        <van-pull-refresh v-model="reLoading" @refresh="onRefresh(true)">
            <van-list v-model="loading" :finished="finished" :immediate-check="false" finished-text="没有更多了" @load="getUsers">
                <div class="list-box">
                    <div v-for="(user, i) in users" :key="i" class="item">
                        <div>{{ user.name }}</div>
                        <div class="rt">
                            机器
                            <span>{{ user.totalNum }}</span>
                            台
                        </div>
                    </div>
                </div>
            </van-list>
            <!-- <div v-if="!users.length && loading" class="no-list">暂无{{ typeName }}，快去推广吧</div> -->
        </van-pull-refresh>
    </div>
</template>
<script>
export default {
    name: 'TeamList',
    middleware: 'checkLogin',
    data() {
        return {
            userId: null,
            businessType: 1, // 一级，二级
            allStatus: [],
            users: [],
            loading: false, // 数据加载loading
            reLoading: false, // 刷新数据中
            finished: false, // 拿到所有数据
            current: 1,
            pageSize: 10
        }
    },
    computed: {
        typeName() {
            if (this.allStatus && this.allStatus.length) {
                let v = this.allStatus[this.businessType - 1]
                return v.name
            } else {
                return ''
            }
        }
    },
    async asyncData({ app }) {
        const userId = app.$cookies.get('userId')
        const {
            $api: { member }
        } = app
        const { data } = await member.mine.myTeamGroup({ userId })
        return {
            businessType: data[0].businessType,
            allStatus: data,
            userId
        }
    },
    created() {
        this.onRefresh()
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
        async getUsers() {
            console.log('loading:' + this.loading)
            const {
                userId,
                businessType,
                current,
                allStatus,
                $api: { member }
            } = this
            const params = {
                userId,
                businessType,
                page: current,
                rows: 10
            }
            const { data } = await member.mine.myTeamGroupList(params)
            const total = allStatus[businessType - 1].totalNum
            this.users.push(...data)
            this.loading = false
            console.log('---------------------------------')
            console.log('total:' + total)
            console.log(total && this.users && this.users.length >= total)
            if (total && this.users && this.users.length >= total) {
                this.finished = true
            } else {
                this.current++
            }
        },
        linkTab(item) {
            if (this.businessType != item) {
                this.businessType = item.businessType
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
    // display: flex;
    // flex-flow: column wrap;
    // border-top: 10px solid #ececec;
    // padding: 0 20px;
    // color: #222;
    // background: #fff;
    .item {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        border-bottom: 1px solid #f7f7f7;
        height: 60px;
        padding: 0 20px;
        background: #fff;
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
}
.no-list {
    display: flex;
    min-height: calc(100vh - 200px);
    align-items: center;
    justify-content: center;
    color: #888;
    font-size: 14px;
}
</style>
