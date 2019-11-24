<template>
    <div class="cont">
        <ym-header title="我的团队"></ym-header>
        <van-sticky :offset-top="50">
            <div class="tabs">
                <div
                    v-for="(item, index) in allStatus"
                    :key="index"
                    :class="{ actived: item.businessType === businessType }"
                    @click="linkTab(item.businessType)"
                >
                    <span>{{ `${item.name}(${item.totalNum})人` }}</span>
                </div>
            </div>
        </van-sticky>

        <van-list v-model="loading" :finished="finished" :finished-text="total != 0 ? '没有更多了' : ''" :offset="100" class="mt10" @load="getUsers">
            <div v-for="(user, i) in users" :key="i" class="item">
                <div>{{ user.name }}</div>
                <div class="rt">
                    机器
                    <span>{{ user.totalNum }}</span>
                    台
                </div>
            </div>
        </van-list>
        <div v-if="!users.length && !loading" class="no-list">暂无{{ typeName }}，快去推广吧</div>
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
            finished: false, // 拿到所有数据
            current: 1,
            pageSize: 12,
            listLoad: false
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
            allStatus: data,
            userId,
            businessType: data[0].businessType
        }
    },
    created() {},
    methods: {
        async getUsers() {
            const {
                userId,
                current,
                allStatus,
                businessType,
                pageSize,
                $api: { member }
            } = this
            const params = {
                userId,
                businessType,
                page: current,
                rows: pageSize
            }
            const { data } = await member.mine.myTeamGroupList(params)
            const total = allStatus[businessType - 1].totalNum
            this.users.push(...data)
            this.current++
            this.loading = false
            if (this.users.length === total) {
                this.finished = true
            }
        },
        linkTab(v) {
            if (this.businessType === v) return
            this.businessType = v
            this.users = []
            this.current = 1
            this.loading = false
            this.finished = false
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
.no-list {
    display: flex;
    min-height: calc(100vh - 200px);
    align-items: center;
    justify-content: center;
    color: #888;
    font-size: 14px;
}
</style>
